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
  await fs.writeFile(INDEX_FILE, JSON.stringify(records, null, 2), "utf8");
}

// Newest first.
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
  await fs.writeFile(path.join(IMAGES_DIR, file), bytes);

  const record = {
    id,
    file,
    createdAt: new Date().toISOString(),
    ...meta,
  };

  await withIndexLock(async () => {
    const records = await readIndex();
    records.push(record);
    await writeIndex(records);
  });
  return record;
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

  try {
    await fs.unlink(path.join(IMAGES_DIR, record.file));
  } catch (err) {
    if (err.code !== "ENOENT") throw err; // already gone is fine
  }
  return true;
}

export { IMAGES_DIR };
