import "dotenv/config";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { generateImage, enhancePrompt, describeImage, MODEL } from "./server/openrouter.js";
import * as library from "./server/library.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3016;

const DEFAULTS = { aspectRatio: "16:9", resolution: "2K", keyingSafe: false };

// Instruction for generative upscaling — re-render the same image at higher resolution.
function buildUpscaleInstruction() {
  return "Recreate this exact image at a higher resolution. Keep the composition, framing, subject, " +
    "colours, and every detail identical — do not add, remove, move, or restyle anything, and do not change " +
    "the crop. Enhance fine detail, sharpness, and texture as though re-captured with a higher-resolution " +
    "camera. Output a clean, photorealistic, high-resolution version of the same image.";
}

// Instruction for reframing/outpainting a source image to a new aspect ratio.
function buildReframeInstruction(target) {
  const orient = target === "9:16" ? "tall vertical" : target === "1:1" ? "square" : target === "4:5" ? "portrait" : "wide horizontal";
  return `Reframe this photograph into a ${target} ${orient} composition as one seamless, continuous single image. ` +
    `Keep every existing element, subject, and detail exactly as they are — do not crop, stretch, distort, or move them. ` +
    `Extend and continue the scene naturally to fill the new frame (adding more sky, ground, or sides as needed), matching the ` +
    `lighting, colours, perspective, textures, and style perfectly, with no visible seams, bands, or borders.`;
}

// Compose an edit instruction when the user marked a region (add/remove).
function buildEditInstruction({ userPrompt, region, hasMask, hasObjects }) {
  const where = region?.positionLabel ? ` in the ${region.positionLabel} area of the image` : "";
  const p = (userPrompt || "").trim();
  const pInline = p.replace(/[.\s]+$/, ""); // no trailing period when embedded mid-sentence
  const parts = [];
  if (region?.mode === "remove") {
    parts.push(`Remove the main object located${where} and realistically fill that area with the surrounding background so the removal is seamless.`);
    if (p) parts.push(p);
  } else if (region?.mode === "add") {
    parts.push(`Add ${pInline || "the provided element"}${where}.`);
    if (hasObjects) parts.push("Use the provided object photo(s) as the item to add, matching the scene's lighting, perspective, and shadows.");
  } else if (region?.mode === "replace") {
    parts.push(`Replace whatever is currently located${where} with ${pInline || "the provided element"}, matching the scene's perspective, lighting, and shadows.`);
    if (hasObjects) parts.push("Use the provided object photo(s) as the replacement item.");
  } else if (p) {
    parts.push(p);
  }
  if (hasMask) {
    parts.push("A mask image is also provided: apply the change only within the white region of the mask and keep everything else in the scene identical. Do not render the mask or any black-and-white shapes in the output.");
  }
  parts.push("Preserve the overall composition, camera angle, and all untouched areas exactly.");
  return parts.filter(Boolean).join(" ");
}

const REGION_MODES = ["add", "remove", "replace"];

// A stored file's ext -> a *valid* MIME type. Note "jpg" -> "image/jpeg"
// ("image/jpg" is not a real MIME type and can trip up the model).
const MIME_BY_EXT = { png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", webp: "image/webp" };
function fileDataUri(file, bytes) {
  const ext = (file.split(".").pop() || "").toLowerCase();
  const mime = MIME_BY_EXT[ext] || "image/png";
  return `data:${mime};base64,${bytes.toString("base64")}`;
}

// Read a source image's bytes and build its data URI, turning a missing-on-disk
// file into a clear 410 instead of a raw ENOENT 500.
async function loadSourceUri(source) {
  let bytes;
  try {
    bytes = await library.readImageBytes(source);
  } catch (err) {
    if (err.code === "ENOENT") {
      const e = new Error("The source image file is missing from disk.");
      e.status = 410;
      e.code = "SOURCE_MISSING";
      throw e;
    }
    throw err;
  }
  return fileDataUri(source.file, bytes);
}

const badRequest = (msg) => Object.assign(new Error(msg), { status: 400, code: "BAD_INPUT" });

// Validate a caller-supplied list of image data URIs (references / objects).
function cleanImageList(list, field) {
  if (list === undefined || list === null) return [];
  if (!Array.isArray(list)) throw badRequest(`${field} must be an array of image data URIs.`);
  for (const u of list) {
    if (typeof u !== "string" || !u.startsWith("data:")) {
      throw badRequest(`${field} must contain image data URIs.`);
    }
  }
  return list;
}

// Validate a single optional image data URI (mask / uploaded image).
function cleanImage(value, field) {
  if (value === undefined || value === null || value === "") return null;
  if (typeof value !== "string" || !value.startsWith("data:")) {
    throw badRequest(`${field} must be an image data URI.`);
  }
  return value;
}

// Accept a number or numeric string ("123"); anything else -> undefined (random).
function parseSeed(seed) {
  if (seed === undefined || seed === null || seed === "") return undefined;
  const n = Number(seed);
  return Number.isFinite(n) ? n : undefined;
}

const app = express();
app.use(express.json({ limit: "25mb" })); // base64 image uploads

// --- API ------------------------------------------------------------------

app.get("/api/config", (_req, res) => {
  res.json({
    hasKey: Boolean(process.env.OPENROUTER_API_KEY),
    model: MODEL,
    defaults: DEFAULTS,
  });
});

// Remaining OpenRouter credit (key stays server-side).
app.get("/api/balance", async (_req, res) => {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) return res.json({ hasKey: false, remaining: null });
  try {
    const r = await fetch("https://openrouter.ai/api/v1/credits", {
      headers: { Authorization: `Bearer ${key}` },
    });
    const j = await r.json();
    if (!r.ok) return res.json({ hasKey: true, remaining: null, error: j?.error?.message || `HTTP ${r.status}` });
    const total = j?.data?.total_credits;
    const used = j?.data?.total_usage;
    const remaining = typeof total === "number" && typeof used === "number" ? total - used : null;
    res.json({ hasKey: true, remaining });
  } catch (err) {
    res.json({ hasKey: true, remaining: null, error: err.message });
  }
});

// Expand a short prompt into a richer one via a cheap text model.
app.post("/api/enhance", async (req, res, next) => {
  try {
    const { prompt } = req.body || {};
    if (!prompt || !prompt.trim()) return res.status(400).json({ error: "A prompt is required." });
    const enhanced = await enhancePrompt(prompt);
    res.json({ enhanced });
  } catch (err) {
    next(err);
  }
});

// Describe an uploaded image as a reusable prompt.
app.post("/api/describe", async (req, res, next) => {
  try {
    const { image } = req.body || {};
    if (!image) return res.status(400).json({ error: "An image is required." });
    const prompt = await describeImage(image);
    res.json({ prompt });
  } catch (err) {
    next(err);
  }
});

app.get("/api/library", async (_req, res, next) => {
  try {
    res.json(await library.list());
  } catch (err) {
    next(err);
  }
});

// Generate a new background from a text prompt (+ optional reference images).
app.post("/api/generate", async (req, res, next) => {
  try {
    const {
      prompt,
      aspectRatio = DEFAULTS.aspectRatio,
      resolution = DEFAULTS.resolution,
      keyingSafe = DEFAULTS.keyingSafe,
      seed,
    } = req.body || {};
    const referenceImages = cleanImageList(req.body?.referenceImages, "referenceImages");
    const seedNum = parseSeed(seed);

    const result = await generateImage({
      prompt,
      images: referenceImages,
      aspectRatio,
      resolution,
      keyingSafe,
      seed: seedNum,
    });

    const record = await library.add(
      {
        kind: "generate",
        prompt,
        seed: seedNum ?? null,
        parentId: null,
        aspectRatio,
        resolution,
        keyingSafe: Boolean(keyingSafe),
        cost: result.cost,
        model: MODEL,
        extraImageCount: referenceImages.length,
      },
      result.bytes,
      result.mediaType
    );

    res.json(record);
  } catch (err) {
    next(err);
  }
});

// Adjust an existing library image via a new prompt (+ optional object photos).
app.post("/api/adjust", async (req, res, next) => {
  try {
    const {
      sourceId,
      prompt,
      region = null,
      aspectRatio = DEFAULTS.aspectRatio,
      resolution = DEFAULTS.resolution,
      keyingSafe = DEFAULTS.keyingSafe,
      seed,
    } = req.body || {};
    const extraImages = cleanImageList(req.body?.extraImages, "extraImages");
    const mask = cleanImage(req.body?.mask, "mask");
    const seedNum = parseSeed(seed);
    // Only honour a region with a recognised mode; otherwise fall back to the
    // plain prompt (a bogus region would otherwise bill a low-value generation).
    const validRegion = region && REGION_MODES.includes(region.mode) ? region : null;

    const source = await library.get(sourceId);
    if (!source) return res.status(404).json({ error: "Source image not found." });

    const sourceDataUri = await loadSourceUri(source);

    // base image first, then the mask (if any), then object photos to add
    const images = [sourceDataUri, ...(mask ? [mask] : []), ...extraImages];
    const instruction = validRegion
      ? buildEditInstruction({ userPrompt: prompt, region: validRegion, hasMask: Boolean(mask), hasObjects: extraImages.length > 0 })
      : prompt;

    const result = await generateImage({
      prompt: instruction,
      images,
      aspectRatio,
      resolution,
      keyingSafe,
      seed: seedNum,
    });

    const record = await library.add(
      {
        kind: "adjust",
        prompt: instruction,
        seed: seedNum ?? null,
        parentId: sourceId,
        aspectRatio,
        resolution,
        keyingSafe: Boolean(keyingSafe),
        cost: result.cost,
        model: MODEL,
        extraImageCount: extraImages.length,
        edit: validRegion ? { mode: validRegion.mode, position: validRegion.positionLabel || null } : null,
      },
      result.bytes,
      result.mediaType
    );

    res.json(record);
  } catch (err) {
    next(err);
  }
});

// Reframe/outpaint an existing image to a new aspect ratio.
app.post("/api/reframe", async (req, res, next) => {
  try {
    const {
      sourceId,
      targetAspect,
      resolution = DEFAULTS.resolution,
      keyingSafe = DEFAULTS.keyingSafe,
      seed,
    } = req.body || {};
    const seedNum = parseSeed(seed);

    const source = await library.get(sourceId);
    if (!source) return res.status(404).json({ error: "Source image not found." });
    if (!targetAspect) return res.status(400).json({ error: "A target aspect ratio is required." });

    const uri = await loadSourceUri(source);
    const instruction = buildReframeInstruction(targetAspect);

    const result = await generateImage({
      prompt: instruction,
      images: [uri],
      aspectRatio: targetAspect,
      resolution,
      keyingSafe,
      seed: seedNum,
    });

    const record = await library.add(
      {
        kind: "reframe",
        prompt: instruction,
        seed: seedNum ?? null,
        parentId: sourceId,
        aspectRatio: targetAspect,
        resolution,
        keyingSafe: Boolean(keyingSafe),
        cost: result.cost,
        model: MODEL,
        extraImageCount: 0,
        edit: { mode: "reframe", to: targetAspect },
      },
      result.bytes,
      result.mediaType
    );

    res.json(record);
  } catch (err) {
    next(err);
  }
});

// Generative upscale — re-render a library image OR an uploaded image at a higher resolution.
app.post("/api/upscale", async (req, res, next) => {
  try {
    const { sourceId, image, aspectRatio, targetResolution = "4K", seed } = req.body || {};
    const seedNum = parseSeed(seed);

    let uri, aspect, parentId = null;
    if (sourceId) {
      const source = await library.get(sourceId);
      if (!source) return res.status(404).json({ error: "Source image not found." });
      uri = await loadSourceUri(source);
      aspect = source.aspectRatio || aspectRatio;
      parentId = sourceId;
    } else if (image) {
      uri = cleanImage(image, "image");
      aspect = aspectRatio;
    } else {
      return res.status(400).json({ error: "Provide a library sourceId or an uploaded image." });
    }

    const instruction = buildUpscaleInstruction();
    const result = await generateImage({
      prompt: instruction,
      images: [uri],
      aspectRatio: aspect,
      resolution: targetResolution,
      keyingSafe: false, // preserve the image exactly; don't steer colours
      seed: seedNum,
    });

    const record = await library.add(
      {
        kind: "upscale",
        prompt: instruction,
        seed: seedNum ?? null,
        parentId,
        aspectRatio: aspect,
        resolution: targetResolution,
        keyingSafe: false,
        cost: result.cost,
        model: MODEL,
        extraImageCount: 0,
        edit: { mode: "upscale", to: targetResolution },
      },
      result.bytes,
      result.mediaType
    );

    res.json(record);
  } catch (err) {
    next(err);
  }
});

app.post("/api/library/:id/favorite", async (req, res, next) => {
  try {
    const rec = await library.setFavorite(req.params.id, Boolean(req.body && req.body.favorite));
    if (!rec) return res.status(404).json({ error: "Not found." });
    res.json(rec);
  } catch (err) {
    next(err);
  }
});

app.delete("/api/library/:id", async (req, res, next) => {
  try {
    const ok = await library.remove(req.params.id);
    if (!ok) return res.status(404).json({ error: "Not found." });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

// --- Static ----------------------------------------------------------------

app.use("/library", express.static(library.IMAGES_DIR));
app.use(express.static(path.join(__dirname, "public")));

// --- Error handler ---------------------------------------------------------

app.use((err, _req, res, _next) => {
  // Body-parser failures: return a clean message instead of leaking parser internals.
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: "Malformed JSON body.", code: "BAD_JSON" });
  }
  if (err.type === "entity.too.large") {
    return res.status(413).json({ error: "Upload too large (max 25 MB).", code: "TOO_LARGE" });
  }
  const status =
    err.code === "NO_API_KEY" || err.code === "NO_PROMPT" || err.code === "BAD_INPUT"
      ? 400
      : err.status || 500;
  console.error(`[error] ${err.code || "UNKNOWN"}: ${err.message}`);
  res.status(status).json({ error: err.message, code: err.code || "UNKNOWN" });
});

app.listen(PORT, () => {
  console.log(`BackgroundStudio running at http://localhost:${PORT}`);
  console.log(`Model: ${MODEL}`);
  console.log(
    process.env.OPENROUTER_API_KEY
      ? "OpenRouter key: detected"
      : "OpenRouter key: MISSING — add OPENROUTER_API_KEY to .env"
  );
  library
    .backfillDimensions()
    .then((n) => { if (n) console.log(`Backfilled dimensions for ${n} existing image(s).`); })
    .catch((err) => console.error("[backfill] failed:", err.message));
});
