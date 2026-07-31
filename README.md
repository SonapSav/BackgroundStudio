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
into. You describe the scene with a guided **pill‑based prompt builder** (or free text), generate at up
to **4K**, then **adjust** any result with a follow‑up prompt or **drop in an object photo** to composite
it into the scene. Everything you make lands in a local **library** you can sort, revisit, and reuse.

It runs on your own machine and talks to **Google's Nano Banana Pro** (`google/gemini-3-pro-image-preview`)
through **[OpenRouter](https://openrouter.ai)**, so all you need is an OpenRouter API key with some credit.

---

## ✨ Features

- **Guided prompt builder** — pills for scene, objects/props, style, light & time, mood & colour,
  camera & composition, and detail. Your pills and free text merge into one editable prompt.
- **Text‑to‑image generation** with optional reference images to steer the look.
- **Adjust** any library image with a new prompt — drag a card onto the base slot, or hit **Adjust**.
- **Add objects** — upload a product/prop photo and composite it into an existing background.
- **Real resolution & aspect control** — 1K / 2K / 4K at 16:9, 9:16, or 1:1 (true pixel sizes, not hints).
- **Keying‑safe mode** — steers backgrounds away from chroma green/blue so they key cleanly.
- **Batch** — generate 1–4 variations per run, in parallel.
- **Library** — sort (newest / oldest / cost), pagination (persists across refreshes), per‑image metadata
  (ratio · tier · dimensions · megapixels · cost), one‑click prompt copy, download, and delete.
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
- **Model:** `google/gemini-3-pro-image-preview` (Nano Banana Pro) via OpenRouter's Image API
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

1. Pick pills (or type freely), then **Preview prompt** to see the merged prompt — edit it if you like.
2. Choose **aspect ratio**, **resolution**, **image count**, and **keying‑safe** as needed.
3. Hit **Generate**. Results appear in the library.
4. To iterate, **Adjust** a library image with a new prompt, or drag it onto the base slot.
5. To composite an object, enter Adjust, upload the object photo, and describe where it goes.
6. **Download** finished backgrounds and drop them behind your keyed footage.

---

## ⚙️ Configuration

| Variable | Required | Default | Description |
| --- | --- | --- | --- |
| `OPENROUTER_API_KEY` | Yes | — | Your OpenRouter API key. |
| `PORT` | No | `3016` | Port the local server listens on. |

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
