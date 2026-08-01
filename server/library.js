// Disk-backed library of generated images.
//   data/library/<id>.png   image files
//   data/library.json       metadata index (array, newest first)
// Deliberately simple: the whole index is small (one record per image) so we
// read/write the JSON file wholesale rather than pulling in a database.

import { promises as fs } from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, "..", "data");
const IMAGES_DIR = path.join(DATA_DIR, "library");
const INDEX_FILE = path.join(DATA_DIR, "library.json");

const EXT_BY_TYPE = { "image/png": "png", "image/jpeg": "jpg", "image/webp": "webp" };

async function ensureDirs() {
  await fs.mkdir(IMAGES_DIR, { recursive: true });
}

async function readIndex() {
  try {
    const raw = await fs.readFile(INDEX_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    if (err.code === "ENOENT") return [];
    throw err;
  }
}

async function writeIndex(records) {
  await ensureDirs();
  // Write to a temp file then rename — rename is atomic on the same volume, so a
  // concurrent reader (list/get, which run outside the lock) never sees a
  // half-written / truncated library.json.
  const tmp = `${INDEX_FILE}.${crypto.randomUUID()}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(records, null, 2), "utf8");
  try {
    await fs.rename(tmp, INDEX_FILE);
  } catch (err) {
    // On Windows a rename can fail (EPERM/EBUSY) if a reader holds the file open;
    // don't leave the temp file behind.
    await fs.unlink(tmp).catch(() => {});
    throw err;
  }
}

// Newest first.
// Read pixel dimensions straight from image bytes (PNG / JPEG / WebP) — no deps.
export function imageSize(buf) {
  if (!buf || buf.length < 24) return null;
  // PNG: IHDR width/height are big-endian at offsets 16/20.
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }
  // JPEG: scan markers for a Start-Of-Frame segment.
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let off = 2;
    const len = buf.length;
    while (off + 9 < len) {
      if (buf[off] !== 0xff) { off++; continue; }
      let marker = buf[off + 1];
      while (marker === 0xff && off + 1 < len) { off++; marker = buf[off + 1]; }
      off += 2;
      if (marker === 0xd8 || marker === 0xd9 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) continue;
      if (off + 1 >= len) break;
      const segLen = buf.readUInt16BE(off);
      const isSOF = marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc;
      if (isSOF) return { height: buf.readUInt16BE(off + 3), width: buf.readUInt16BE(off + 5) };
      off += segLen;
    }
    return null;
  }
  // WebP (RIFF....WEBP)
  if (buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") {
    const fmt = buf.toString("ascii", 12, 16);
    if (fmt === "VP8 ") return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
    if (fmt === "VP8X") return { width: 1 + (buf[24] | (buf[25] << 8) | (buf[26] << 16)), height: 1 + (buf[27] | (buf[28] << 8) | (buf[29] << 16)) };
  }
  return null;
}

// Serialize index read-modify-write so concurrent adds/removes (e.g. a batch of
// N images generated in parallel) can't clobber each other's library.json write.
let indexQueue = Promise.resolve();
function withIndexLock(fn) {
  const result = indexQueue.then(() => fn());
  indexQueue = result.then(() => {}, () => {}); // keep the chain alive on error
  return result;
}

export async function list() {
  const records = await readIndex();
  return [...records].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export async function get(id) {
  const records = await readIndex();
  return records.find((r) => r.id === id) || null;
}

// Absolute path to an image file, for reading its bytes back (e.g. when adjusting).
export function imagePath(record) {
  return path.join(IMAGES_DIR, record.file);
}

export async function readImageBytes(record) {
  return fs.readFile(imagePath(record));
}

// meta: everything except id/file/createdAt (those are assigned here).
// bytes: Buffer of the image. mediaType: e.g. "image/png".
export async function add(meta, bytes, mediaType = "image/png") {
  await ensureDirs();
  const id = crypto.randomUUID();
  const ext = EXT_BY_TYPE[mediaType] || "png";
  const file = `${id}.${ext}`;
  const filePath = path.join(IMAGES_DIR, file);
  await fs.writeFile(filePath, bytes);

  const dims = imageSize(bytes) || {};
  const record = {
    id,
    file,
    createdAt: new Date().toISOString(),
    ...meta,
    width: dims.width ?? null,
    height: dims.height ?? null,
  };

  try {
    await withIndexLock(async () => {
      const records = await readIndex();
      records.push(record);
      await writeIndex(records);
    });
  } catch (err) {
    // Index write failed — don't leave an orphaned image file on disk.
    await fs.unlink(filePath).catch(() => {});
    throw err;
  }
  return record;
}

// Toggle/set the favorite flag on a record. Returns the updated record or null.
export async function setFavorite(id, fav) {
  return withIndexLock(async () => {
    const records = await readIndex();
    const rec = records.find((r) => r.id === id);
    if (!rec) return null;
    rec.favorite = !!fav;
    await writeIndex(records);
    return rec;
  });
}

// Fill in width/height for any records missing them, read from the actual files.
// Runs once at startup so pre-existing library entries get corrected dimensions.
export async function backfillDimensions() {
  return withIndexLock(async () => {
    const records = await readIndex();
    let fixed = 0;
    for (const r of records) {
      if (typeof r.width === "number" && typeof r.height === "number") continue;
      try {
        const dims = imageSize(await fs.readFile(path.join(IMAGES_DIR, r.file)));
        if (dims) { r.width = dims.width; r.height = dims.height; fixed++; }
      } catch { /* file missing — leave as-is */ }
    }
    if (fixed) await writeIndex(records);
    return fixed;
  });
}

// Removes the metadata record and its image file. Returns true if something was removed.
export async function remove(id) {
  const record = await withIndexLock(async () => {
    const records = await readIndex();
    const found = records.find((r) => r.id === id);
    if (!found) return null;
    await writeIndex(records.filter((r) => r.id !== id));
    return found;
  });
  if (!record) return false;

  // The index entry is already gone (the durable source of truth), so the delete
  // has logically succeeded. Removing the file is best-effort: an ENOENT means it
  // was already gone, and any other error just leaves a harmless orphan rather
  // than failing the request after the record has been removed.
  try {
    await fs.unlink(path.join(IMAGES_DIR, record.file));
  } catch (err) {
    if (err.code !== "ENOENT") {
      console.warn(`[library] could not delete image file ${record.file}: ${err.message}`);
    }
  }
  return true;
}

export { IMAGES_DIR };
