"use strict";

/* ---- Lucide icon paths (inlined, stroke-only per BRANDING.md §5) ---- */
const ICONS = {
  image: `<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>`,
  library: `<path d="m16 6 4 14"/><path d="M12 6v14"/><path d="M8 8v12"/><path d="M4 4v16"/>`,
  wand: `<path d="m15 4 1 1"/><path d="m8.5 8.5 11-11"/><path d="M14 7 3 18l3 3L17 10"/><path d="m18 13 1 1"/>`,
};
function icon(name, size = 16) {
  return `<svg class="ic" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" ` +
    `stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ` +
    `aria-hidden="true">${ICONS[name] || ""}</svg>`;
}

/* ---- State ---- */
const state = {
  mode: "generate",           // "generate" | "adjust"
  base: null,                 // library record being adjusted
  uploads: [],                // [{ name, dataUri }]
  aspectRatio: "16:9",
  resolution: "2K",
  keyingSafe: true,
  busy: false,
  sessionCost: 0,
  library: [],
};

const ASPECTS = ["16:9", "9:16", "1:1"];
const RESOLUTIONS = ["1K", "2K", "4K"];

/* ---- DOM ---- */
const $ = (id) => document.getElementById(id);
const el = {
  keyPill: $("keyPill"), sessionCost: $("sessionCost"),
  prompt: $("prompt"), promptLabel: $("promptLabel"),
  baseField: $("baseField"), baseSlot: $("baseSlot"),
  uploadLabel: $("uploadLabel"), dropzone: $("dropzone"), dropText: $("dropText"),
  fileInput: $("fileInput"), thumbs: $("thumbs"),
  aspectChips: $("aspectChips"), resChips: $("resChips"), keyingChip: $("keyingChip"),
  clearBtn: $("clearBtn"), goBtn: $("goBtn"), goLabel: $("goLabel"),
  modeBanner: $("modeBanner"),
  grid: $("grid"), libEmpty: $("libEmpty"), libCount: $("libCount"),
  lightbox: $("lightbox"), lightboxImg: $("lightboxImg"), lightboxClose: $("lightboxClose"),
};

/* ---- Helpers ---- */
function fmtCost(n) {
  return typeof n === "number" ? `$${n.toFixed(4)}` : "$—";
}
function fmtTime(iso) {
  const d = new Date(iso);
  return d.toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}
function toast(msg, isErr = false) {
  const t = document.createElement("div");
  t.className = "toast" + (isErr ? " err" : "");
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), isErr ? 6000 : 3000);
}
function fileToDataUri(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

/* ---- Chips ---- */
function buildChips(container, values, getActive, onPick) {
  container.innerHTML = "";
  values.forEach((v) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "chip" + (getActive() === v ? " active" : "");
    b.textContent = v;
    b.onclick = () => { onPick(v); };
    container.appendChild(b);
  });
}
function renderChips() {
  buildChips(el.aspectChips, ASPECTS, () => state.aspectRatio, (v) => { state.aspectRatio = v; renderChips(); });
  buildChips(el.resChips, RESOLUTIONS, () => state.resolution, (v) => { state.resolution = v; renderChips(); });
  el.keyingChip.className = "chip" + (state.keyingSafe ? " active" : "");
  el.keyingChip.textContent = state.keyingSafe ? "Keying-safe: on" : "Keying-safe: off";
}

/* ---- Mode (generate vs adjust) ---- */
function setMode(mode, base = null) {
  state.mode = mode;
  state.base = base;
  const adjust = mode === "adjust";

  el.baseField.hidden = !adjust;
  el.clearBtn.hidden = !adjust;
  el.goLabel.textContent = adjust ? "Adjust" : "Generate";
  el.promptLabel.textContent = adjust ? "Adjustment prompt" : "Prompt";
  el.uploadLabel.textContent = adjust ? "Objects to add (optional)" : "Reference images";
  el.dropText.textContent = adjust
    ? "Drop object photos here, or click — these get composited into the adjustment"
    : "Drop images here, or click to choose — used as visual references";
  el.prompt.placeholder = adjust
    ? "Describe the change… e.g. make it rain, add neon reflections on the pavement"
    : "Describe the background… e.g. moody neon-lit rain-soaked city street at night, cinematic, wide";

  if (adjust && base) {
    el.modeBanner.hidden = false;
    el.modeBanner.innerHTML = `${icon("wand", 14)} Adjusting an existing background`;
    el.baseSlot.innerHTML =
      `<img src="/library/${base.file}" alt="" />` +
      `<div class="meta"><div class="p">${escapeHtml(base.prompt || "")}</div>` +
      `<div class="hint">${base.aspectRatio} · ${base.resolution}</div></div>`;
  } else {
    el.modeBanner.hidden = true;
  }
}
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

/* ---- Uploads ---- */
async function addFiles(fileList) {
  const files = Array.from(fileList).filter((f) => f.type.startsWith("image/"));
  for (const f of files) {
    try {
      const dataUri = await fileToDataUri(f);
      state.uploads.push({ name: f.name, dataUri });
    } catch {
      toast(`Couldn't read ${f.name}`, true);
    }
  }
  renderThumbs();
}
function renderThumbs() {
  el.thumbs.innerHTML = "";
  state.uploads.forEach((u, i) => {
    const d = document.createElement("div");
    d.className = "thumb";
    d.innerHTML = `<img src="${u.dataUri}" alt="" /><button class="x" title="Remove" type="button">✕</button>`;
    d.querySelector(".x").onclick = () => { state.uploads.splice(i, 1); renderThumbs(); };
    el.thumbs.appendChild(d);
  });
}

/* ---- Generate / Adjust ---- */
async function go() {
  if (state.busy) return;
  const prompt = el.prompt.value.trim();
  if (!prompt) { toast("Enter a prompt first.", true); el.prompt.focus(); return; }

  setBusy(true);
  try {
    const body = {
      prompt,
      aspectRatio: state.aspectRatio,
      resolution: state.resolution,
      keyingSafe: state.keyingSafe,
    };
    let url;
    if (state.mode === "adjust" && state.base) {
      url = "/api/adjust";
      body.sourceId = state.base.id;
      body.extraImages = state.uploads.map((u) => u.dataUri);
    } else {
      url = "/api/generate";
      body.referenceImages = state.uploads.map((u) => u.dataUri);
    }

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Generation failed.");

    if (typeof data.cost === "number") {
      state.sessionCost += data.cost;
      el.sessionCost.textContent = fmtCost(state.sessionCost);
    }
    // Reset compose for the next round.
    el.prompt.value = "";
    state.uploads = [];
    renderThumbs();
    setMode("generate");
    await loadLibrary();
    toast(state.mode === "adjust" ? "Adjustment saved." : "Background generated.");
  } catch (err) {
    toast(err.message, true);
  } finally {
    setBusy(false);
  }
}
function setBusy(b) {
  state.busy = b;
  el.goBtn.disabled = b;
  el.goLabel.innerHTML = b
    ? `<span class="spinner"></span> Working…`
    : (state.mode === "adjust" ? "Adjust" : "Generate");
}

/* ---- Library ---- */
async function loadLibrary() {
  try {
    const res = await fetch("/api/library");
    state.library = await res.json();
  } catch {
    state.library = [];
  }
  renderLibrary();
}
function renderLibrary() {
  el.grid.innerHTML = "";
  el.libCount.textContent = state.library.length ? `${state.library.length} image${state.library.length === 1 ? "" : "s"}` : "";
  el.libEmpty.hidden = state.library.length > 0;

  state.library.forEach((r) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="shot">
        ${r.kind === "adjust" ? `<span class="lineage">${icon("wand", 11)} adjusted</span>` : ""}
        <img src="/library/${r.file}" alt="" loading="lazy" />
      </div>
      <div class="body">
        <div class="prompt">${escapeHtml(r.prompt || "")}</div>
        <div class="metaline"><span>${r.aspectRatio} · ${r.resolution}</span><span>${fmtCost(r.cost)}</span></div>
        <div class="metaline"><span>${fmtTime(r.createdAt)}</span><span>${r.keyingSafe ? "keying-safe" : ""}</span></div>
        <div class="actions">
          <button class="btn small" data-act="adjust" type="button">Adjust</button>
          <button class="btn small" data-act="download" type="button">Download</button>
          <button class="btn small danger" data-act="delete" type="button">Delete</button>
        </div>
      </div>`;

    card.querySelector(".shot").onclick = () => openLightbox(r);
    card.querySelector('[data-act="adjust"]').onclick = () => startAdjust(r);
    card.querySelector('[data-act="download"]').onclick = () => downloadImage(r);
    card.querySelector('[data-act="delete"]').onclick = (e) => deleteImage(r, e.currentTarget);
    el.grid.appendChild(card);
  });
}
function startAdjust(record) {
  setMode("adjust", record);
  state.uploads = [];
  renderThumbs();
  window.scrollTo({ top: 0, behavior: "smooth" });
  el.prompt.focus();
}
function downloadImage(record) {
  const a = document.createElement("a");
  a.href = `/library/${record.file}`;
  a.download = record.file;
  document.body.appendChild(a);
  a.click();
  a.remove();
}
async function deleteImage(record, btn) {
  if (btn.dataset.confirm !== "1") {
    btn.dataset.confirm = "1";
    btn.textContent = "Sure?";
    setTimeout(() => { if (btn.dataset.confirm === "1") { btn.dataset.confirm = ""; btn.textContent = "Delete"; } }, 3000);
    return;
  }
  try {
    const res = await fetch(`/api/library/${record.id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Delete failed.");
    if (state.base && state.base.id === record.id) setMode("generate");
    await loadLibrary();
    toast("Deleted.");
  } catch (err) {
    toast(err.message, true);
  }
}

/* ---- Lightbox ---- */
function openLightbox(record) {
  el.lightboxImg.src = `/library/${record.file}`;
  el.lightbox.hidden = false;
}
function closeLightbox() { el.lightbox.hidden = true; el.lightboxImg.src = ""; }

/* ---- Config ---- */
async function loadConfig() {
  try {
    const res = await fetch("/api/config");
    const cfg = await res.json();
    if (cfg.defaults) {
      state.aspectRatio = cfg.defaults.aspectRatio || state.aspectRatio;
      state.resolution = cfg.defaults.resolution || state.resolution;
      state.keyingSafe = cfg.defaults.keyingSafe ?? state.keyingSafe;
    }
    el.keyPill.className = "pill " + (cfg.hasKey ? "ok" : "bad");
    el.keyPill.textContent = cfg.hasKey ? "key set" : "no API key";
    if (!cfg.hasKey) toast("No OpenRouter key found — add OPENROUTER_API_KEY to .env and restart.", true);
    renderChips();
  } catch {
    el.keyPill.className = "pill bad";
    el.keyPill.textContent = "server error";
  }
}

/* ---- Wire up ---- */
function init() {
  document.getElementById("brandIcon").innerHTML = icon("image", 20);
  document.getElementById("libIcon").innerHTML = icon("library", 16);

  renderChips();
  setMode("generate");

  el.keyingChip.onclick = () => { state.keyingSafe = !state.keyingSafe; renderChips(); };
  el.goBtn.onclick = go;
  el.clearBtn.onclick = () => { setMode("generate"); };

  // Uploads
  el.dropzone.onclick = () => el.fileInput.click();
  el.dropzone.onkeydown = (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); el.fileInput.click(); } };
  el.fileInput.onchange = () => { addFiles(el.fileInput.files); el.fileInput.value = ""; };
  ["dragover", "dragenter"].forEach((ev) =>
    el.dropzone.addEventListener(ev, (e) => { e.preventDefault(); el.dropzone.classList.add("dragover"); }));
  ["dragleave", "drop"].forEach((ev) =>
    el.dropzone.addEventListener(ev, (e) => { e.preventDefault(); el.dropzone.classList.remove("dragover"); }));
  el.dropzone.addEventListener("drop", (e) => { if (e.dataTransfer?.files?.length) addFiles(e.dataTransfer.files); });

  // Lightbox
  el.lightboxClose.onclick = closeLightbox;
  el.lightbox.onclick = (e) => { if (e.target === el.lightbox) closeLightbox(); };
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLightbox(); });

  // Ctrl/Cmd+Enter to submit
  el.prompt.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") { e.preventDefault(); go(); }
  });

  loadConfig();
  loadLibrary();
}
init();
