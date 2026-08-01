<!-- Replace the placeholder images below with your own screenshots when ready. -->
<p align="center">
  <img src="https://placehold.co/1200x360/0d0e12/e8a24a/png?text=Background+Studio" alt="Background Studio banner" width="100%" />
</p>

<h1 align="center">Background Studio</h1>

<p align="center">
  Generate custom background photos for green-screen video — from text prompts and reference images —
  powered by Google's <strong>Nano Banana Pro</strong> (Gemini 3 Pro Image) via OpenRouter.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/license-MIT-e8a24a.svg" alt="License: MIT" />
  <img src="https://img.shields.io/badge/node-%E2%89%A518-4fc8bd.svg" alt="Node >= 18" />
  <img src="https://img.shields.io/badge/model-Nano%20Banana%20Pro-e8a24a.svg" alt="Nano Banana Pro" />
</p>

---

## About

**Background Studio** is a small web app for creating **background images** to sit behind green‑screen
(chroma‑key) footage — the kind of custom backdrops YouTubers and video creators composite themselves
into. Describe a scene with a guided **pill‑based prompt builder** (or free text) and generate at up to
**4K**, then **edit** any result: adjust it with a prompt, draw a box to **add / replace / remove**
objects, composite in an uploaded photo, **reframe** it into a new aspect ratio (e.g. vertical for
Shorts), or **upscale** it to higher resolution. Then **preview yourself over it** with an in‑browser
green‑screen keyer, compare edits with a **before/after slider**, and **export at exact broadcast sizes**
(1080p / 4K UHD) — all kept in a searchable, favouritable local **library**.

It runs on your own machine and talks to **Google's Nano Banana Pro** (`google/gemini-3-pro-image-preview`)
through **[OpenRouter](https://openrouter.ai)**, so all you need is an OpenRouter API key with some credit.

---

## ✨ Features

### Create
- **Guided prompt builder** — pills for scene, objects/props, style, light & time, mood & colour,
  camera & composition, keying, and detail. Your pills and typed text merge into one editable prompt.
- **Text‑to‑image generation** with optional reference images to steer the look.
- **Real resolution & aspect control** — 1K / 2K / 4K at 16:9, 9:16, or 1:1 (true pixel sizes, not hints;
  hover a resolution to see exact dimensions + megapixels).
- **Keying‑safe mode** — steers backgrounds away from chroma green/blue so they key cleanly.
- **Batch** — generate 1–4 variations per run, in parallel.
- **Seed control** — leave blank for random, or set/reuse a seed to reproduce a look; every card shows its
  seed (click to reuse it).
- **Prompt enhancer** — a toggle that expands your brief into a rich, detailed background‑scene prompt
  (via a cheap text model) in a separate, editable field, before generating.
- **Describe an image** — the **Describe an image** button (in the action bar, next to *Preview prompt*)
  lets you upload any reference photo; a multimodal model then writes a reusable background‑scene prompt
  into the box, to seed variations on that look.

### Edit
- **Adjust** any library image with a new prompt — click **Adjust**, or drag a card onto the base slot
  (a floating drop bar makes it easy). Drop it in as a reference too.
- **Region editor** — draw a box on the image and **Add**, **Replace**, or **Remove** whatever's there;
  a generated mask + positional hint target the edit precisely.
- **Add objects** — upload a product/prop photo and composite it into an existing background.
- **Reframe / outpaint** — extend a background into a new aspect ratio (e.g. 16:9 → 9:16 for Shorts)
  instead of regenerating.
- **Upscale** — generatively re‑render an image at a higher resolution (2K / 4K) with enhanced detail;
  works on a **library image or any file from your computer**, and the result is saved to your library.

### Review & organise
- **Live keying preview** — upload a green‑screen frame of yourself, chroma‑key it in the browser, and
  composite it over any background to preview the real shot: pick green/blue, tune the key & edge, drag,
  scale, flip, and save the composite as a PNG. Fully client‑side, no API cost.
- **Before/after slider** — compare any edit against the version it came from with a draggable divider.
- **Subject placement guide** — drop a draggable, resizable silhouette (with a rule‑of‑thirds grid) onto a
  background to check the negative space fits your keyed subject.
- **Export presets** — download at exact broadcast sizes — **1080p** (1920×1080) or **4K UHD** (3840×2160)
  for the image's aspect ratio — or the Original; sizes larger than the source are disabled (Upscale first).
- **Library** — **search** by prompt, **favourite** ⭐, sort (newest / oldest / cost), pagination (persists
  across refreshes), per‑image metadata (ratio · tier · dimensions · megapixels · cost · seed), one‑click
  prompt copy, download, and delete.
- **Live OpenRouter balance** in the header, updated after each run.
- **Dark, glassmorphic UI** with a full‑screen "Generating" overlay.

---

## 📸 Screenshots

> Placeholder images — swap these for real screenshots.

<p align="center">
  <img src="https://placehold.co/900x520/15161d/969cae/png?text=Prompt+Builder" alt="Prompt builder" width="49%" />
  <img src="https://placehold.co/900x520/15161d/969cae/png?text=Library" alt="Library" width="49%" />
</p>

---

## 🧰 Tech stack

- **Backend:** Node.js + Express (no build step)
- **Frontend:** vanilla HTML / CSS / JavaScript
- **Image model:** `google/gemini-3-pro-image-preview` (Nano Banana Pro) via OpenRouter's Image API
- **Storage:** generated images + metadata on local disk

---

## ✅ Prerequisites

- **[Node.js](https://nodejs.org) 18 or newer** (tested on 24)
- **[Git](https://git-scm.com)**
- An **[OpenRouter](https://openrouter.ai) account** and an **API key with credits**
  (image generation is paid — see [Model, licensing & commercial use](#-model-licensing--commercial-use))

---

## 🚀 Getting started

### 1. Clone the repository

**SSH**

```bash
git clone git@github.com:SonapSav/BackgroundStudio.git
```

**HTTPS**

```bash
git clone https://github.com/SonapSav/BackgroundStudio.git
```

Then enter the folder:

```bash
cd BackgroundStudio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure your environment

Copy the example env file, then add your OpenRouter key.

**Windows (PowerShell)**

```powershell
Copy-Item .env.example .env
```

**Windows (Command Prompt)**

```bat
copy .env.example .env
```

**macOS / Linux**

```bash
cp .env.example .env
```

Open `.env` and set your key:

```ini
OPENROUTER_API_KEY=sk-or-...your key...
# Optional — the port the app listens on (default 3016)
PORT=3016
```

Get a key at **https://openrouter.ai/keys**.

### 4. Run the app

```bash
npm start
```

For auto‑reload during development:

```bash
npm run dev
```

Then open **http://localhost:3016** in your browser.

> The Node commands are identical on Windows, macOS, and Linux — only the file‑copy command in step 3 differs.

---

## 🎛️ Usage

**Generate**

1. Pick pills (or type freely) — or click **Describe an image** in the action bar to turn a reference photo
   into a prompt. Optionally flip on **Enhance prompt** to expand your brief, and **Preview prompt** to see/edit it.
2. Set **aspect ratio**, **resolution**, **image count**, **seed**, and **keying‑safe**.
3. Hit **Generate** — results land in the library.

**Edit** (from any library card)

- **Adjust** — describe a change, or drag the card onto the base slot. Upload an object photo to composite
  something in.
- **Region** — in Adjust, click **Mark region**, choose **Add / Replace / Remove**, draw a box, and Adjust.
- **Reframe** — pick a new aspect ratio to outpaint the scene (great for 9:16 Shorts).
- **Upscale** — bump a library image to 2K/4K with the **Upscale** action, or enlarge any file from your
  computer via **Upscale a file** in the library header.

**Review & export**

- Click an image to open it, then use **Keying preview** (upload a green‑screen shot of yourself),
  **Compare** (on edited images), or the **Subject guide** to check placement.
- **Search**, **favourite**, and **sort** in the library.
- **Download** → choose **Original**, **1080p**, or **4K UHD**, and drop the file behind your keyed footage.

---

## ⚙️ Configuration

| Variable | Required | Default | Description |
| --- | --- | --- | --- |
| `OPENROUTER_API_KEY` | Yes | — | Your OpenRouter API key. |
| `PORT` | No | `3016` | Port the local server listens on. |
| `ENHANCE_MODEL` | No | `google/gemini-2.5-flash` | Cheap text model used by the **Enhance prompt** toggle. |
| `DESCRIBE_MODEL` | No | `ENHANCE_MODEL` | Multimodal model used by **Describe an image**. |

---

## 🗂️ Project structure

```
server.js              Express app: static serving + JSON API
server/openrouter.js   The single module that talks to OpenRouter (Image API)
server/library.js      Disk‑backed image library + metadata
public/                Frontend (index.html, styles.css, app.js)
docs/BRANDING.md       Design system reference
data/                  Generated images + library.json (created at runtime, git‑ignored)
```

Generated images and their metadata are stored **locally** under `data/` and are **not** committed to
the repository.

---

## 🎨 Design system

The visual language ("studio console after dark" — a dark theme with an amber accent) is documented in
[`docs/BRANDING.md`](docs/BRANDING.md).

---

## 📋 Changelog

### Audit & hardening — 2026-08-01

An end-to-end correctness and reliability pass (no new features):

- **Concurrency** — *Describe*, *Preview*, and *Generate* can no longer overlap. `Ctrl`/`⌘`+`Enter`
  and rapid re-clicks can't fire duplicate (billed) API calls or dismiss the "Generating" overlay
  mid‑batch.
- **Resolution labels** — every aspect ratio now shows dimensions + megapixels (exact for 16:9 / 9:16 /
  1:1, an estimated `≈` for reframe/upload ratios like 4:5, 4:3, 3:4, 21:9) instead of a blank.
- **Editing fidelity** — JPEG source images are now sent with the correct MIME type (`image/jpeg`) on
  adjust / reframe / upscale.
- **Robustness** — atomic library‑index writes (no truncated reads under concurrent access, and no
  leftover temp file on a failed rename), clearer 400/404/410/413 error messages, request validation
  that rejects malformed input **before** any billable call, numeric‑string seeds honoured instead of
  silently dropped, and no orphaned image files if a write fails.
- **Polish** — the subject‑placement guide resets between images, the *Replace* region label is correct,
  and the model is labelled **Image model** (the enhancer/describe features use a separate text model).

---

## 📝 Model, licensing & commercial use

**This project's code** is released under the **MIT License** (see [`LICENSE`](LICENSE)) —
you're free to use, modify, and distribute it, including commercially.

**The images you generate are a separate matter.** They are produced by **Google's Nano Banana Pro
(`gemini-3-pro-image`)**, accessed through **OpenRouter**, and are governed by Google's and OpenRouter's
terms — *not* by this project's MIT license. In summary (not legal advice — read the sources yourself):

- **Ownership & commercial use.** Google does not claim ownership of images you generate, and commercial
  use (ads, products, videos, thumbnails, etc.) is permitted with no per‑image royalty to Google. **You
  are responsible** for what you generate and for complying with the applicable policies.
- **Prohibited uses.** Your prompts and outputs must comply with Google's
  [Generative AI Prohibited Use Policy](https://policies.google.com/terms/generative-ai/use-policy).
- **SynthID watermark.** Every image the model produces contains an **invisible SynthID watermark** that
  marks it as AI‑generated. This is permanent and does not block commercial use — do not attempt to
  strip provenance signals.
- **Paid, API‑only.** Image generation is billed per use through OpenRouter; there is no free tier. Keep
  credit on your OpenRouter account.
- **Applicable terms** (review before commercial use):
  - Google — [Gemini API Additional Terms of Service](https://ai.google.dev/gemini-api/terms)
  - OpenRouter — [Terms of Service](https://openrouter.ai/terms) and the
    [Nano Banana Pro model page](https://openrouter.ai/google/gemini-3-pro-image-preview)
  - [SynthID overview](https://deepmind.google/technologies/synthid/)

If you plan to use generated backgrounds commercially, confirm the current terms above for your region and
use case — they can change.

---

## 📄 License

**MIT © Panos Vasilopoulos** — see [`LICENSE`](LICENSE).
