import "dotenv/config";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { generateImage, MODEL } from "./server/openrouter.js";
import * as library from "./server/library.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3016;

const DEFAULTS = { aspectRatio: "16:9", resolution: "2K", keyingSafe: false };

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
      referenceImages = [],
      aspectRatio = DEFAULTS.aspectRatio,
      resolution = DEFAULTS.resolution,
      keyingSafe = DEFAULTS.keyingSafe,
      seed,
    } = req.body || {};

    const result = await generateImage({
      prompt,
      images: referenceImages,
      aspectRatio,
      resolution,
      keyingSafe,
      seed,
    });

    const record = await library.add(
      {
        kind: "generate",
        prompt,
        seed: Number.isFinite(seed) ? seed : null,
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
      extraImages = [],
      mask = null,
      region = null,
      aspectRatio = DEFAULTS.aspectRatio,
      resolution = DEFAULTS.resolution,
      keyingSafe = DEFAULTS.keyingSafe,
      seed,
    } = req.body || {};

    const source = await library.get(sourceId);
    if (!source) return res.status(404).json({ error: "Source image not found." });

    const sourceBytes = await library.readImageBytes(source);
    const sourceDataUri = `data:image/${source.file.split(".").pop()};base64,${sourceBytes.toString("base64")}`;

    // base image first, then the mask (if any), then object photos to add
    const images = [sourceDataUri, ...(mask ? [mask] : []), ...extraImages];
    const instruction = region
      ? buildEditInstruction({ userPrompt: prompt, region, hasMask: Boolean(mask), hasObjects: extraImages.length > 0 })
      : prompt;

    const result = await generateImage({
      prompt: instruction,
      images,
      aspectRatio,
      resolution,
      keyingSafe,
      seed,
    });

    const record = await library.add(
      {
        kind: "adjust",
        prompt: instruction,
        seed: Number.isFinite(seed) ? seed : null,
        parentId: sourceId,
        aspectRatio,
        resolution,
        keyingSafe: Boolean(keyingSafe),
        cost: result.cost,
        model: MODEL,
        extraImageCount: extraImages.length,
        edit: region ? { mode: region.mode, position: region.positionLabel || null } : null,
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

    const source = await library.get(sourceId);
    if (!source) return res.status(404).json({ error: "Source image not found." });
    if (!targetAspect) return res.status(400).json({ error: "A target aspect ratio is required." });

    const bytes = await library.readImageBytes(source);
    const uri = `data:image/${source.file.split(".").pop()};base64,${bytes.toString("base64")}`;
    const instruction = buildReframeInstruction(targetAspect);

    const result = await generateImage({
      prompt: instruction,
      images: [uri],
      aspectRatio: targetAspect,
      resolution,
      keyingSafe,
      seed,
    });

    const record = await library.add(
      {
        kind: "reframe",
        prompt: instruction,
        seed: Number.isFinite(seed) ? seed : null,
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
  const status =
    err.code === "NO_API_KEY" || err.code === "NO_PROMPT" ? 400 : err.status || 500;
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
