// The ONE module that talks to OpenRouter. Everything model-specific lives here
// so the rest of the app never needs to know the wire format.
//
// Uses OpenRouter's dedicated Image API (/api/v1/images), which — unlike the
// chat-completions path — honors real `resolution` (1K/2K/4K) and `aspect_ratio`
// params, and supports editing/compositing via `input_references`. Verified:
//   2K 16:9 -> 2752x1536, 4K 16:9 -> 5504x3072, edit w/ reference -> full res.

const IMAGES_URL = "https://openrouter.ai/api/v1/images";
export const MODEL = "google/gemini-3-pro-image-preview"; // Nano Banana Pro

// A cheap, fast text model used to expand a short brief into a rich image prompt.
export const ENHANCE_MODEL = process.env.ENHANCE_MODEL || "google/gemini-2.5-flash";

// Expand the user's brief into a vivid, detailed background-scene prompt.
export async function enhancePrompt(userPrompt) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) { const e = new Error("OPENROUTER_API_KEY is not set."); e.code = "NO_API_KEY"; throw e; }
  const system =
    "You are a prompt engineer for a photorealistic image model that generates BACKGROUND scenes to sit " +
    "behind green-screen video. Rewrite the user's brief into a single vivid, detailed image prompt of " +
    "2-4 sentences. Describe the scene and setting, lighting and time of day, mood and colour palette, " +
    "camera angle / lens and composition, and key materials and textures. Keep it an empty background " +
    "scene with natural negative space (do NOT add foreground people unless the brief explicitly asks). " +
    "Do not mention resolution, aspect ratio, megapixels, or camera brand names. " +
    "Output ONLY the rewritten prompt — no preamble, quotes, labels, or explanation.";

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "http://localhost",
      "X-Title": "BackgroundStudio",
    },
    body: JSON.stringify({
      model: ENHANCE_MODEL,
      messages: [{ role: "system", content: system }, { role: "user", content: userPrompt.trim() }],
      temperature: 0.7,
      max_tokens: 400,
    }),
  });
  const text = await res.text();
  let data;
  try { data = JSON.parse(text); } catch { const e = new Error("Enhancer returned non-JSON."); e.code = "BAD_RESPONSE"; throw e; }
  if (!res.ok || data.error) { const e = new Error(data?.error?.message || "Prompt enhancer failed."); e.code = "OPENROUTER_ERROR"; throw e; }
  const out = data?.choices?.[0]?.message?.content?.trim();
  if (!out) { const e = new Error("Enhancer returned an empty result."); e.code = "NO_TEXT"; throw e; }
  return out.replace(/^["'\s]+|["'\s]+$/g, "");
}

// The prompt carries only creative direction now; size/ratio are real params.
// The keying-safe steer keeps backgrounds off the chroma-key hues.
export function composePrompt({ prompt, keyingSafe }) {
  const parts = [prompt.trim()];
  if (keyingSafe) {
    parts.push(
      "This image is a background that will be composited behind green-screen " +
        "footage, so it must NOT contain any pure chroma-key green or blue. " +
        "Avoid saturated green/blue key colors anywhere in the scene."
    );
  }
  return parts.join(" ");
}

// images: array of data-URI strings ("data:image/...;base64,...") — reference
// images, a base image being adjusted, and/or object photos to add. When present
// they become `input_references`, which makes this an edit/compose instead of a
// pure text-to-image generation.
export async function generateImage({
  prompt,
  images = [],
  aspectRatio,
  resolution,
  keyingSafe = true,
  seed,
}) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    const err = new Error("OPENROUTER_API_KEY is not set. Add it to .env.");
    err.code = "NO_API_KEY";
    throw err;
  }
  if (!prompt || !prompt.trim()) {
    const err = new Error("A prompt is required.");
    err.code = "NO_PROMPT";
    throw err;
  }

  const body = {
    model: MODEL,
    prompt: composePrompt({ prompt, keyingSafe }),
  };
  if (aspectRatio) body.aspect_ratio = aspectRatio;
  if (resolution) body.resolution = resolution;
  if (Number.isFinite(seed)) body.seed = seed;
  if (images.length) {
    body.input_references = images.map((url) => ({ type: "image_url", image_url: { url } }));
  }

  const res = await fetch(IMAGES_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "http://localhost",
      "X-Title": "BackgroundStudio",
    },
    body: JSON.stringify(body),
  });

  const text = await res.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    const err = new Error(`OpenRouter returned non-JSON (HTTP ${res.status}): ${text.slice(0, 300)}`);
    err.code = "BAD_RESPONSE";
    throw err;
  }

  if (!res.ok || data.error) {
    const msg = data?.error?.message || `OpenRouter error (HTTP ${res.status}).`;
    const err = new Error(msg);
    err.code = "OPENROUTER_ERROR";
    err.status = res.status;
    throw err;
  }

  const d = data?.data?.[0];
  const b64 = extractBase64(d);
  if (!b64) {
    const err = new Error("No image was returned by the model.");
    err.code = "NO_IMAGE";
    throw err;
  }

  return {
    bytes: Buffer.from(b64, "base64"),
    mediaType: d?.media_type || "image/jpeg",
    cost: typeof data?.usage?.cost === "number" ? data.usage.cost : null,
    rawText: "",
  };
}

// The Image API returns base64 in `b64_json`; tolerate a data-URI `url` too.
function extractBase64(d) {
  if (!d) return null;
  if (typeof d.b64_json === "string") return d.b64_json;
  const url = d.url || d.image_url?.url;
  if (typeof url === "string" && url.startsWith("data:")) return url.split(",")[1];
  return null;
}
