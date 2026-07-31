// The ONE module that talks to OpenRouter. Everything model-specific lives here
// so the rest of the app never needs to know the wire format. If OpenRouter's
// dedicated /api/v1/images endpoint becomes the better path later, only this
// file changes — the exported generateImage() signature stays the same.

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
export const MODEL = "google/gemini-3-pro-image-preview"; // Nano Banana Pro

// Build the text instruction we send alongside any images. Aspect ratio and
// resolution are conveyed as prompt hints (Nano Banana Pro honors these), and
// the keying-safe steer keeps backgrounds off the chroma-key hues.
export function composePrompt({ prompt, aspectRatio, resolution, keyingSafe }) {
  const parts = [prompt.trim()];
  if (aspectRatio) parts.push(`Aspect ratio ${aspectRatio}.`);
  if (resolution) parts.push(`Render at ${resolution} resolution, high detail.`);
  if (keyingSafe) {
    parts.push(
      "This image is a background that will be composited behind green-screen " +
        "footage, so it must NOT contain any pure chroma-key green or blue. " +
        "Avoid saturated green/blue key colors anywhere in the scene."
    );
  }
  return parts.join(" ");
}

// images: array of data-URI strings ("data:image/png;base64,...") — reference
// images, a base image being adjusted, and/or object photos to add.
export async function generateImage({
  prompt,
  images = [],
  aspectRatio,
  resolution,
  keyingSafe = true,
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

  const content = [
    { type: "text", text: composePrompt({ prompt, aspectRatio, resolution, keyingSafe }) },
    ...images.map((url) => ({ type: "image_url", image_url: { url } })),
  ];

  const res = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      // Optional attribution headers OpenRouter recommends for app ranking.
      "HTTP-Referer": "http://localhost",
      "X-Title": "BackgroundStudio",
    },
    body: JSON.stringify({
      model: MODEL,
      modalities: ["image", "text"],
      messages: [{ role: "user", content }],
    }),
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

  const message = data?.choices?.[0]?.message ?? {};
  const dataUri = message?.images?.[0]?.image_url?.url;
  if (!dataUri || typeof dataUri !== "string" || !dataUri.startsWith("data:")) {
    const err = new Error(
      "No image was returned by the model. It may have replied with text only: " +
        String(message?.content || "").slice(0, 300)
    );
    err.code = "NO_IMAGE";
    throw err;
  }

  const { bytes, mediaType } = decodeDataUri(dataUri);
  return {
    bytes,
    mediaType,
    cost: typeof data?.usage?.cost === "number" ? data.usage.cost : null,
    rawText: typeof message?.content === "string" ? message.content : "",
  };
}

// "data:image/png;base64,AAAA..." -> { bytes: Buffer, mediaType: "image/png" }
export function decodeDataUri(dataUri) {
  const match = /^data:([^;,]+)?(;base64)?,(.*)$/s.exec(dataUri);
  if (!match) throw new Error("Malformed data URI.");
  const mediaType = match[1] || "image/png";
  const isBase64 = Boolean(match[2]);
  const payload = match[3];
  const bytes = isBase64
    ? Buffer.from(payload, "base64")
    : Buffer.from(decodeURIComponent(payload), "utf8");
  return { bytes, mediaType };
}
