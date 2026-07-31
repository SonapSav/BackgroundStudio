"use strict";

/* ---- Lucide icon paths (inlined, stroke-only per BRANDING.md §5) ---- */
const ICONS = {
  image: `<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>`,
  library: `<path d="m16 6 4 14"/><path d="M12 6v14"/><path d="M8 8v12"/><path d="M4 4v16"/>`,
  wand: `<path d="m15 4 1 1"/><path d="m8.5 8.5 11-11"/><path d="M14 7 3 18l3 3L17 10"/><path d="m18 13 1 1"/>`,
  eye: `<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>`,
  eraser: `<path d="m7 21-4.3-4.3a1 1 0 0 1 0-1.4L14 4a2 2 0 0 1 2.8 0l4.2 4.2a2 2 0 0 1 0 2.8L11 21"/><path d="M22 21H7"/>`,
  wallet: `<path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/>`,
  check: `<path d="M20 6 9 17l-5-5"/>`,
  copy: `<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>`,
  grip: `<circle cx="9" cy="6" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="9" cy="18" r="1"/><circle cx="15" cy="6" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="18" r="1"/>`,
};
function icon(name, size = 16) {
  return `<svg class="ic" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" ` +
    `stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ` +
    `aria-hidden="true">${ICONS[name] || ""}</svg>`;
}

/* ---- Prompt-builder taxonomy (pills). Easy to tweak — just data. ---- */
const SECTIONS = [
  {
    title: "Scene & Subject", hint: "setting · environment", open: true,
    groups: [{ key: "scene", label: "Setting", pills: [
      "Cityscape", "City street", "Alley", "Rooftop", "Skyline", "Neon city", "Cyberpunk city",
      "Interior room", "Living room", "Home office", "Corporate office", "Open-plan office",
      "Conference room", "Office cubicle", "Office lobby", "Studio backdrop", "Kitchen", "Cafe", "Bar",
      "Library", "Warehouse", "Stage", "Forest", "Jungle", "Mountains", "Beach", "Coastline",
      "Desert", "Countryside", "Open field", "Garden", "Park", "Waterfall", "Cave", "Underwater",
      "Sky & clouds", "Outer space", "Nebula", "Abstract", "Gradient wash", "Bokeh lights",
      "Sci-fi interior", "Fantasy landscape", "Ancient ruins", "Snowy landscape",
    ] }],
    custom: { key: "sceneText", ph: "Describe the scene — e.g. rain-soaked rooftop overlooking a neon skyline" },
  },
  {
    title: "Objects & Props", hint: "furniture · vehicles · decor", open: false,
    groups: [{ key: "props", label: "Accessories in the scene", pills: [
      "Couch", "Armchair", "Desk", "Office chair", "Bookshelf", "Coffee table", "Bed", "Stool",
      "Cabinet", "Rug", "Table lamp", "Floor lamp", "Neon sign", "String lights", "Chandelier",
      "Candles", "Fireplace", "TV", "Monitor setup", "Microphone", "Studio camera", "Speakers",
      "Gaming setup", "Potted plant", "Hanging plants", "Flowers", "Framed art", "Posters",
      "Mirror", "Wall clock", "Curtains", "Vase", "Stack of books", "Guitar", "Piano",
      "Vinyl records", "Globe", "Coffee cup", "Car", "Sports car", "Motorcycle", "Bicycle", "Boat",
    ] }],
    custom: { key: "propsText", ph: "Other objects, comma-separated — e.g. vintage radio, ladder" },
  },
  {
    title: "Style & Medium", hint: "look · rendering", open: false,
    groups: [{ key: "style", label: "Medium / style", pills: [
      "Photorealistic", "Cinematic film still", "Studio photography", "3D render", "Octane render",
      "Digital painting", "Concept art", "Illustration", "Anime", "Watercolor", "Oil painting",
      "Matte painting", "Minimalist", "Flat vector", "Isometric", "Low-poly", "Pixel art",
      "Vintage film", "Analog photo", "Product shot",
    ] }],
    custom: { key: "styleText", ph: "Or type a style — e.g. 90s VHS look, Studio Ghibli" },
  },
  {
    title: "Light & Time", hint: "lighting · time · weather", open: false,
    groups: [
      { key: "lighting", label: "Lighting", pills: [
        "Golden hour", "Blue hour", "Soft studio light", "Softbox", "Hard light", "Dramatic shadows",
        "Backlit", "Rim light", "Volumetric light", "God rays", "Neon glow", "Moonlight", "Candlelight",
        "Firelight", "Overcast", "High-key", "Low-key", "Spotlight", "Bioluminescent", "Ambient",
      ] },
      { key: "timeweather", label: "Time & weather", pills: [
        "Day", "Night", "Sunrise", "Sunset", "Dusk", "Dawn", "Foggy", "Misty", "Rainy", "Wet",
        "Snowy", "Stormy", "Clear sky", "Cloudy", "Hazy",
      ] },
    ],
  },
  {
    title: "Mood & Color", hint: "atmosphere · palette", open: false,
    groups: [
      { key: "mood", label: "Mood / atmosphere", pills: [
        "Moody", "Bright & airy", "Cozy", "Epic", "Serene", "Calm", "Mysterious", "Dreamy", "Ethereal",
        "Energetic", "Melancholic", "Whimsical", "Dark", "Nostalgic", "Futuristic", "Luxurious",
        "Gritty", "Minimal", "Romantic", "Ominous", "Uplifting",
      ] },
      { key: "color", label: "Color palette", pills: [
        "Warm tones", "Cool tones", "Monochrome", "Black & white", "Pastel", "Vibrant", "Muted",
        "Earth tones", "Neon", "Sepia", "Teal & orange", "Jewel tones", "High contrast", "Duotone",
        "Desaturated", "Golden",
      ] },
    ],
  },
  {
    title: "Camera & Composition", hint: "angle · framing · keying", open: false,
    groups: [
      { key: "composition", label: "Camera / composition", pills: [
        "Wide angle", "Ultra-wide", "Panoramic", "Telephoto", "Aerial view", "Drone shot", "Eye-level",
        "Low angle", "High angle", "Top-down", "Shallow depth of field", "Deep focus", "Bokeh",
        "Symmetrical", "Rule of thirds", "Leading lines", "Centered composition",
      ] },
      { key: "keying", label: "Framing for keying (green-screen)", pills: [
        "Empty center for subject", "Negative space left", "Negative space right",
        "Clear foreground", "Depth for parallax", "Unobtrusive focal point",
      ] },
    ],
  },
  {
    title: "Detail & Extras", hint: "quality · keywords", open: false,
    groups: [{ key: "detail", label: "Quality", pills: [
      "Highly detailed", "Ultra-detailed", "Sharp focus", "8K", "Photoreal textures", "Intricate",
      "Clean", "Ray-traced", "Realistic materials", "Subtle film grain",
    ] }],
    custom: { key: "extraText", ph: "Additional details / keywords, comma-separated" },
  },
];

// Flatten pills per group key so prompt assembly preserves pill order.
const PILLS = {};
SECTIONS.forEach((s) => s.groups.forEach((g) => { PILLS[g.key] = g.pills; }));

const ASPECTS = ["16:9", "9:16", "1:1"];
const RESOLUTIONS = ["1K", "2K", "4K"];
const COUNTS = ["1", "2", "3", "4"];
// Measured 1K output per aspect ratio; 2K = ×2, 4K = ×4 on each side.
const BASE_1K = { "16:9": [1376, 768], "9:16": [768, 1376], "1:1": [1024, 1024] };
const RES_MULT = { "1K": 1, "2K": 2, "4K": 4 };
function dimsFor(resolution, aspectRatio) {
  const base = BASE_1K[aspectRatio], m = RES_MULT[resolution];
  return base && m ? `${base[0] * m}×${base[1] * m}` : "";
}
// Rough per-image estimates (USD), from observed /images pricing. Actual cost is returned per image.
const EST_COST = { "1K": 0.13, "2K": 0.14, "4K": 0.24 };

/* ---- State ---- */
const state = {
  mode: "generate",
  base: null,
  uploads: [],
  aspectRatio: "16:9",
  resolution: "2K",
  count: 1,
  keyingSafe: false,
  busy: false,
  balance: null,
  library: [],
  sort: "newest",
  perPage: 12,
  page: 1,
  sel: {},            // { groupKey: Set(labels) }
  text: {},           // { sceneText, styleText, extraText }
};
Object.keys(PILLS).forEach((k) => { state.sel[k] = new Set(); });

/* ---- DOM ---- */
const $ = (id) => document.getElementById(id);
const el = {
  keyPill: $("keyPill"), balancePill: $("balancePill"), estCost: $("estCost"),
  baseField: $("baseField"), baseSlot: $("baseSlot"), baseLabel: $("baseLabel"),
  uploadLabel: $("uploadLabel"), dropzone: $("dropzone"), dropText: $("dropText"),
  fileInput: $("fileInput"), thumbs: $("thumbs"),
  sections: $("sections"),
  aspectChips: $("aspectChips"), resChips: $("resChips"), countChips: $("countChips"), keyingToggle: $("keyingToggle"),
  clearBtn: $("clearBtn"), resetBtn: $("resetBtn"), previewBtn: $("previewBtn"),
  goBtn: $("goBtn"), goLabel: $("goLabel"),
  promptOut: $("promptOut"), promptNote: $("promptNote"),
  modeBanner: $("modeBanner"),
  grid: $("grid"), libEmpty: $("libEmpty"), libCount: $("libCount"), refreshBtn: $("refreshBtn"),
  sortSel: $("sortSel"), perPageSel: $("perPageSel"), pagination: $("pagination"),
  lightbox: $("lightbox"), lightboxImg: $("lightboxImg"), lightboxClose: $("lightboxClose"),
  dropBar: $("dragDropBar"), dropOptAdjust: $("dropOptAdjust"), dropOptRef: $("dropOptRef"),
};

/* ---- Helpers ---- */
const fmtCost = (n) => (typeof n === "number" ? `$${n.toFixed(4)}` : "$—");
const fmtTime = (iso) => new Date(iso).toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);
const splitCsv = (s) => (s || "").split(",").map((x) => x.trim()).filter(Boolean);
const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

function toast(msg, isErr = false) {
  const t = document.createElement("div");
  t.className = "toast" + (isErr ? " err" : "");
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), isErr ? 6000 : 3000);
}
// Copy text with a fallback for contexts where the async Clipboard API is unavailable.
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch { /* fall through to legacy path */ }
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  } catch {
    return false;
  }
}
function fileToDataUri(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}
function selected(key) {
  const set = state.sel[key];
  return (PILLS[key] || []).filter((p) => set.has(p));
}

/* ---- Prompt assembly (tuned for Gemini 3 Pro Image) ---- */
function buildPrompt() {
  const parts = [];

  const styleAll = [...selected("style"), ...splitCsv(state.text.styleText)];
  const sceneDesc = [selected("scene").map((s) => s.toLowerCase()).join(", "), (state.text.sceneText || "").trim()]
    .filter(Boolean).join(", ");

  // Lead: "<medium> of <scene>"
  if (styleAll.length === 1 && sceneDesc) {
    const m = styleAll[0];
    const art = /^[aeiou]/i.test(m) ? "An" : "A";
    parts.push(`${art} ${m.toLowerCase()} of ${sceneDesc}`);
  } else if (styleAll.length > 1 && sceneDesc) {
    parts.push(`${cap(sceneDesc)}, in the style of ${styleAll.join(", ").toLowerCase()}`);
  } else if (sceneDesc) {
    parts.push(cap(sceneDesc));
  } else if (styleAll.length) {
    parts.push(cap(styleAll.join(", ")));
  }

  const props = [...selected("props"), ...splitCsv(state.text.propsText)];
  if (props.length) parts.push(`featuring ${props.map((s) => s.toLowerCase()).join(", ")}`);

  const lighting = selected("lighting");
  if (lighting.length) parts.push(`${lighting.join(", ").toLowerCase()} lighting`);

  const tw = selected("timeweather");
  if (tw.length) parts.push(tw.join(", ").toLowerCase());

  const mood = selected("mood");
  if (mood.length) parts.push(`${mood.join(", ").toLowerCase()} atmosphere`);

  const color = selected("color");
  if (color.length) parts.push(`${color.join(", ").toLowerCase()} color palette`);

  const comp = selected("composition");
  if (comp.length) parts.push(comp.join(", ").toLowerCase());

  const keying = selected("keying");
  if (keying.length) parts.push(keying.join(", ").toLowerCase());

  const detail = selected("detail");
  if (detail.length) parts.push(detail.join(", ").toLowerCase());

  const extra = (state.text.extraText || "").trim();
  if (extra) parts.push(extra);

  let prompt = parts.map((s) => s.trim()).filter(Boolean).join(". ");
  if (prompt && !/[.!?]$/.test(prompt)) prompt += ".";
  return prompt;
}
function selectionCount() {
  return Object.values(state.sel).reduce((n, set) => n + set.size, 0);
}

/* ---- Sections render ---- */
function renderSections() {
  el.sections.innerHTML = "";
  SECTIONS.forEach((sec) => {
    const d = document.createElement("details");
    d.className = "sec";
    d.open = !!sec.open;

    const sum = document.createElement("summary");
    sum.innerHTML = `<span class="sec-title">${sec.title}</span><span class="sec-hint">${sec.hint}</span>` +
      `<span class="selcount" data-sec></span><span class="chev"></span>`;
    d.appendChild(sum);

    const body = document.createElement("div");
    body.className = "sec-body";

    sec.groups.forEach((g) => {
      const grp = document.createElement("div");
      grp.className = "subgroup";
      grp.innerHTML = `<p class="microlabel">${g.label}</p>`;
      const chips = document.createElement("div");
      chips.className = "chips";
      g.pills.forEach((p) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "chip" + (state.sel[g.key].has(p) ? " active" : "");
        b.textContent = p;
        b.onclick = () => {
          const set = state.sel[g.key];
          set.has(p) ? set.delete(p) : set.add(p);
          b.classList.toggle("active");
          updateSecCounts();
        };
        chips.appendChild(b);
      });
      grp.appendChild(chips);
      body.appendChild(grp);
    });

    if (sec.custom) {
      const wrap = document.createElement("div");
      wrap.className = "subgroup";
      const inp = document.createElement("input");
      inp.type = "text";
      inp.placeholder = sec.custom.ph;
      inp.value = state.text[sec.custom.key] || "";
      inp.oninput = () => { state.text[sec.custom.key] = inp.value; };
      wrap.appendChild(inp);
      body.appendChild(wrap);
    }

    d.appendChild(body);
    d._sec = sec;
    el.sections.appendChild(d);
  });
  updateSecCounts();
}
function updateSecCounts() {
  el.sections.querySelectorAll("details.sec").forEach((d) => {
    const n = d._sec.groups.reduce((acc, g) => acc + state.sel[g.key].size, 0);
    const badge = d.querySelector("[data-sec]");
    if (badge) badge.textContent = n ? `${n}` : "";
  });
}

/* ---- Output chips + estimate ---- */
function buildChips(container, values, getActive, onPick, tipFn) {
  container.innerHTML = "";
  values.forEach((v) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "chip" + (getActive() === v ? " active" : "");
    b.textContent = v;
    if (tipFn) {
      const t = tipFn(v);
      if (t) { b.setAttribute("data-tip", t); b.setAttribute("aria-label", `${v} — ${t}`); }
    }
    b.onclick = () => onPick(v);
    container.appendChild(b);
  });
}
function renderChips() {
  buildChips(el.aspectChips, ASPECTS, () => state.aspectRatio, (v) => { state.aspectRatio = v; renderChips(); });
  buildChips(el.resChips, RESOLUTIONS, () => state.resolution, (v) => { state.resolution = v; renderChips(); updateEstimate(); }, (v) => dimsFor(v, state.aspectRatio));
  buildChips(el.countChips, COUNTS, () => String(state.count), (v) => { state.count = Number(v); renderChips(); updateEstimate(); });
  el.keyingToggle.checked = state.keyingSafe;
  updateNote();
}
function updateEstimate() {
  const per = EST_COST[state.resolution];
  if (!per) { el.estCost.textContent = "≈ $—"; return; }
  const n = state.count;
  el.estCost.textContent = n > 1
    ? `≈ $${(per * n).toFixed(2)} (${n} × $${per.toFixed(2)})`
    : `≈ $${per.toFixed(2)}`;
}
function updateNote() {
  el.promptNote.textContent =
    `Applied at generation: ${state.aspectRatio} · ${state.resolution}` +
    (state.keyingSafe ? " · keying-safe (avoids chroma green/blue)" : "");
}

/* ---- Mode (generate vs adjust) ---- */
function setMode(mode, base = null) {
  state.mode = mode;
  state.base = base;
  const adjust = mode === "adjust";

  el.clearBtn.hidden = !adjust;
  el.baseLabel.classList.toggle("active", adjust);
  el.goLabel.textContent = adjust ? "Adjust" : "Generate";
  el.uploadLabel.innerHTML = adjust
    ? `Objects to add <span class="hint narrow-hide">optional — composited into the adjustment</span>`
    : `Reference images <span class="hint narrow-hide">optional — steers the look</span>`;
  el.dropText.textContent = adjust
    ? "Drop object photos here, or click — these get composited into the adjustment"
    : "Drop images here, or click to choose — used as visual references";
  el.promptOut.placeholder = adjust
    ? "Describe the change — e.g. make it rain, add neon reflections. Pills above still apply."
    : "Pick some pills above and click “Preview prompt”, or just type your prompt directly here.";

  if (adjust && base) {
    el.modeBanner.hidden = false;
    el.modeBanner.innerHTML = `${icon("wand", 14)} Adjusting an existing background`;
    el.baseSlot.className = "base-slot filled";
    el.baseSlot.innerHTML =
      `<img src="/library/${base.file}" alt="" />` +
      `<div class="meta"><div class="p">${escapeHtml(base.prompt || "")}</div>` +
      `<div class="hint">${base.width && base.height ? `${base.width}×${base.height}` : `${base.aspectRatio} · ${base.resolution}`}</div></div>`;
  } else {
    el.modeBanner.hidden = true;
    el.baseSlot.className = "base-slot empty";
    el.baseSlot.innerHTML = `<div class="base-empty">${icon("image", 15)} Drag a library image here to adjust it</div>`;
  }
}

/* ---- Uploads ---- */
async function addFiles(fileList) {
  const files = Array.from(fileList).filter((f) => f.type.startsWith("image/"));
  for (const f of files) {
    try {
      state.uploads.push({ name: f.name, dataUri: await fileToDataUri(f) });
    } catch { toast(`Couldn't read ${f.name}`, true); }
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

/* ---- Preview / Generate / Adjust ---- */
function endDot(s) { s = (s || "").trim(); return s && !/[.!?]$/.test(s) ? s + "." : s; }
// Final prompt = your pills AND your typed text, combined. Avoids double-counting
// pills that are already present in the box (e.g. after you clicked Preview).
function composeFinalPrompt() {
  const pills = buildPrompt();
  const box = el.promptOut.value.trim();
  if (!box) return pills;
  if (!pills) return endDot(box);
  if (box.includes(pills)) return endDot(box); // pills already merged into the box
  // Adjust: your instruction leads, pill modifiers follow. Generate: pill scene leads, your text follows.
  const [first, second] = state.mode === "adjust" ? [box, pills] : [pills, box];
  return `${endDot(first)} ${second}`;
}
function preview() {
  const p = composeFinalPrompt();
  if (!p) { toast("Pick some pills or type a prompt first.", true); return; }
  el.promptOut.value = p;
  toast("Prompt assembled — pills + your text combined. Edit freely before generating.");
}
async function go() {
  if (state.busy) return;
  const prompt = composeFinalPrompt();
  if (!prompt) { toast("Add a prompt — pick pills or type one.", true); el.promptOut.focus(); return; }
  el.promptOut.value = prompt; // reflect exactly what will be sent

  const count = state.count;
  const wasAdjust = state.mode === "adjust" && !!state.base;

  const body = {
    prompt,
    aspectRatio: state.aspectRatio,
    resolution: state.resolution,
    keyingSafe: state.keyingSafe,
  };
  let url;
  if (wasAdjust) {
    url = "/api/adjust";
    body.sourceId = state.base.id;
    body.extraImages = state.uploads.map((u) => u.dataUri);
  } else {
    url = "/api/generate";
    body.referenceImages = state.uploads.map((u) => u.dataUri);
  }
  const payload = JSON.stringify(body);

  setBusy(true, 0, count);
  let done = 0, ok = 0, spent = 0;
  const errors = [];
  const one = () =>
    fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: payload })
      .then(async (res) => { const data = await res.json(); if (!res.ok) throw new Error(data.error || "Generation failed."); return data; })
      .then((data) => { ok++; if (typeof data.cost === "number") spent += data.cost; })
      .catch((e) => { errors.push(e.message); })
      .finally(() => { done++; setBusy(true, done, count); });
  await Promise.all(Array.from({ length: count }, one));

  state.uploads = [];
  renderThumbs();
  el.promptOut.value = ""; // clear so pills+text don't accumulate on the next run
  setMode("generate");
  state.page = 1; // jump to the page showing the newest results
  await loadLibrary();
  applySpend(spent);                 // instant, accurate deduction from what was just spent
  setTimeout(loadBalance, 6000);     // reconcile once OpenRouter's usage accounting catches up
  setBusy(false);

  const noun = wasAdjust ? "Adjustment" : "Background";
  if (ok > 0 && errors.length === 0) toast(`${ok} ${noun.toLowerCase()}${ok === 1 ? "" : "s"} saved.`);
  else if (ok > 0) toast(`${ok} of ${count} succeeded — ${errors.length} failed: ${errors[0]}`, true);
  else toast(errors[0] || "Generation failed.", true);
}
function setBusy(b, done = 0, total = 0) {
  state.busy = b;
  el.goBtn.disabled = b;
  el.previewBtn.disabled = b;
  if (b) {
    const prog = total > 1 ? ` ${done}/${total}` : "";
    el.goLabel.innerHTML = `<span class="spinner"></span> Working…${prog}`;
  } else {
    el.goLabel.textContent = state.mode === "adjust" ? "Adjust" : "Generate";
  }
}
function resetPills() {
  Object.values(state.sel).forEach((set) => set.clear());
  state.text = {};
  renderSections();
  el.sections.querySelectorAll("input").forEach((i) => (i.value = ""));
  toast("Pills cleared.");
}

/* ---- Library ---- */
async function loadLibrary() {
  try {
    const res = await fetch("/api/library");
    state.library = await res.json();
  } catch { state.library = []; }
  renderLibrary();
}
function sortedLibrary() {
  const arr = [...state.library]; // server returns newest first
  if (state.sort === "oldest") arr.reverse();
  else if (state.sort === "costhigh") arr.sort((a, b) => (b.cost || 0) - (a.cost || 0));
  return arr;
}
// Compact page-number window with ellipses, e.g. [1, "...", 4, 5, 6, "...", 12].
function pageWindow(cur, pages) {
  const keep = new Set([1, pages, cur, cur - 1, cur + 1]);
  const nums = [...keep].filter((p) => p >= 1 && p <= pages).sort((a, b) => a - b);
  const out = [];
  let prev = 0;
  nums.forEach((p) => { if (p - prev > 1) out.push("…"); out.push(p); prev = p; });
  return out;
}
function renderPagination(pages) {
  el.pagination.innerHTML = "";
  if (pages <= 1) { el.pagination.hidden = true; return; }
  el.pagination.hidden = false;

  const mkBtn = (label, page, { active = false, disabled = false } = {}) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "btn small pg" + (active ? " active" : "");
    b.textContent = label;
    b.disabled = disabled;
    if (!disabled && !active) b.onclick = () => { state.page = page; renderLibrary(); };
    return b;
  };

  el.pagination.appendChild(mkBtn("‹ Prev", state.page - 1, { disabled: state.page <= 1 }));
  pageWindow(state.page, pages).forEach((p) => {
    if (p === "…") {
      const s = document.createElement("span");
      s.className = "ellipsis";
      s.textContent = "…";
      el.pagination.appendChild(s);
    } else {
      el.pagination.appendChild(mkBtn(String(p), p, { active: p === state.page }));
    }
  });
  el.pagination.appendChild(mkBtn("Next ›", state.page + 1, { disabled: state.page >= pages }));
}
function renderLibrary() {
  const all = sortedLibrary();
  const total = all.length;
  const pages = Math.max(1, Math.ceil(total / state.perPage));
  state.page = Math.min(Math.max(1, state.page), pages);
  const start = (state.page - 1) * state.perPage;
  const pageItems = all.slice(start, start + state.perPage);

  el.grid.innerHTML = "";
  el.libCount.textContent = total ? `${total} image${total === 1 ? "" : "s"}` : "";
  el.libEmpty.hidden = total > 0;

  pageItems.forEach((r) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="shot">
        ${r.kind === "adjust" ? `<span class="lineage">${icon("wand", 11)} adjusted</span>` : ""}
        <span class="drag-handle" title="Drag onto the base slot to adjust">${icon("grip", 14)}</span>
        <img src="/library/${r.file}" alt="" loading="lazy" draggable="false" />
      </div>
      <div class="body">
        <div class="metaline"><span>${r.width && r.height ? `${r.width}×${r.height}` : `${r.aspectRatio} · ${r.resolution}`}</span><span>${fmtCost(r.cost)}</span></div>
        <div class="metaline"><span>${fmtTime(r.createdAt)}</span><span>${r.keyingSafe ? "keying-safe" : ""}</span></div>
        <button class="prompt-toggle" type="button"><span class="tri">▸</span> Prompt used</button>
        <div class="prompt-full" hidden>
          <button class="prompt-copy" type="button" title="Copy prompt">${icon("copy", 12)}</button>
          <span class="prompt-text">${escapeHtml(r.prompt || "")}</span>
        </div>
        <div class="actions">
          <button class="btn small" data-act="adjust" type="button">Adjust</button>
          <button class="btn small" data-act="download" type="button">Download</button>
          <button class="btn small danger" data-act="delete" type="button">Delete</button>
        </div>
      </div>`;
    const ptoggle = card.querySelector(".prompt-toggle");
    const pfull = card.querySelector(".prompt-full");
    ptoggle.onclick = () => { const open = pfull.hidden; pfull.hidden = !open; ptoggle.classList.toggle("open", open); };
    const pcopy = card.querySelector(".prompt-copy");
    pcopy.onclick = async (e) => {
      e.stopPropagation();
      if (await copyText(r.prompt || "")) {
        pcopy.classList.add("done");
        pcopy.innerHTML = icon("check", 12);
        setTimeout(() => { pcopy.classList.remove("done"); pcopy.innerHTML = icon("copy", 12); }, 1500);
        toast("Prompt copied.");
      } else {
        toast("Copy failed.", true);
      }
    };
    const shot = card.querySelector(".shot");
    shot.onclick = () => openLightbox(r);
    shot.setAttribute("draggable", "true");
    shot.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/bgstudio-id", r.id);
      e.dataTransfer.effectAllowed = "copy";
      showDropBar();
    });
    shot.addEventListener("dragend", hideDropBar);
    card.querySelector(".drag-handle").addEventListener("click", (e) => e.stopPropagation());
    card.querySelector('[data-act="adjust"]').onclick = () => startAdjust(r);
    card.querySelector('[data-act="download"]').onclick = () => downloadImage(r);
    card.querySelector('[data-act="delete"]').onclick = (e) => deleteImage(r, e.currentTarget);
    el.grid.appendChild(card);
  });

  renderPagination(pages);
}
function isCardDrag(e) {
  return !!e.dataTransfer && Array.from(e.dataTransfer.types).includes("text/bgstudio-id");
}
function cardRecFromDrag(e) {
  const id = e.dataTransfer?.getData("text/bgstudio-id");
  return id ? state.library.find((r) => r.id === id) : null;
}
function blobToDataUri(blob) {
  return new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = rej; r.readAsDataURL(blob); });
}
// Add an existing library image to the uploads (reference in Generate, object in Adjust).
async function addLibraryImageRef(rec) {
  try {
    const res = await fetch(`/library/${rec.file}`);
    const dataUri = await blobToDataUri(await res.blob());
    state.uploads.push({ name: rec.file, dataUri });
    renderThumbs();
    toast(state.mode === "adjust" ? "Added as object to composite." : "Added as reference image.");
  } catch { toast("Couldn't add that image.", true); }
}
function showDropBar() { el.dropBar.hidden = false; }
function hideDropBar() { el.dropBar.hidden = true; el.dropOptAdjust.classList.remove("over"); el.dropOptRef.classList.remove("over"); }

function startAdjust(record) {
  setMode("adjust", record);
  state.uploads = [];
  renderThumbs();
  el.promptOut.value = "";
  window.scrollTo({ top: 0, behavior: "smooth" });
  el.promptOut.focus();
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
  } catch (err) { toast(err.message, true); }
}

/* ---- Lightbox ---- */
function openLightbox(record) { el.lightboxImg.src = `/library/${record.file}`; el.lightbox.hidden = false; }
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
    if (cfg.model) el && ($("modelName").textContent = "Nano Banana Pro");
    el.keyPill.className = "pill " + (cfg.hasKey ? "ok" : "bad");
    el.keyPill.innerHTML = cfg.hasKey ? `${icon("check", 13)} API key` : "no API key";
    if (!cfg.hasKey) toast("No OpenRouter key found — add OPENROUTER_API_KEY to .env and restart.", true);
  } catch {
    el.keyPill.className = "pill bad";
    el.keyPill.textContent = "server error";
  }
  renderChips();
  updateEstimate();
}
function renderBalance() {
  el.balancePill.style.cursor = "pointer";
  if (typeof state.balance === "number") {
    el.balancePill.className = "pill ok";
    el.balancePill.innerHTML = `${icon("wallet", 13)} <span class="num">$${state.balance.toFixed(2)}</span>`;
  } else {
    el.balancePill.className = "pill";
    el.balancePill.innerHTML = `${icon("wallet", 13)} <span class="num">$—</span>`;
  }
}
// Authoritative refresh from OpenRouter (their usage accounting lags a few seconds).
async function loadBalance() {
  try {
    const res = await fetch("/api/balance");
    const b = await res.json();
    state.balance = typeof b.remaining === "number" ? b.remaining : null;
  } catch {
    state.balance = null;
  }
  renderBalance();
}
// Instant, accurate update using the cost each generation reports back.
function applySpend(amount) {
  if (typeof state.balance === "number" && amount > 0) {
    state.balance = Math.max(0, state.balance - amount);
    renderBalance();
  }
}

/* ---- Wire up ---- */
function init() {
  $("brandIcon").innerHTML = icon("image", 20);
  $("libIcon").innerHTML = icon("library", 16);
  $("eyeIcon").innerHTML = icon("eye", 15);
  $("resetIcon").innerHTML = icon("eraser", 15);
  $("dropAdjIcon").innerHTML = icon("wand", 15);
  $("dropRefIcon").innerHTML = icon("image", 15);

  renderSections();
  renderChips();
  updateEstimate();
  setMode("generate");

  el.keyingToggle.onchange = () => { state.keyingSafe = el.keyingToggle.checked; updateNote(); };
  el.previewBtn.onclick = preview;
  el.goBtn.onclick = go;
  el.clearBtn.onclick = () => setMode("generate");
  el.resetBtn.onclick = resetPills;
  el.refreshBtn.onclick = loadLibrary;

  el.sortSel.value = state.sort;
  el.perPageSel.value = String(state.perPage);
  el.sortSel.onchange = () => { state.sort = el.sortSel.value; state.page = 1; renderLibrary(); };
  el.perPageSel.onchange = () => { state.perPage = Number(el.perPageSel.value); state.page = 1; renderLibrary(); };

  // Uploads
  el.dropzone.onclick = () => el.fileInput.click();
  el.dropzone.onkeydown = (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); el.fileInput.click(); } };
  el.fileInput.onchange = () => { addFiles(el.fileInput.files); el.fileInput.value = ""; };
  ["dragover", "dragenter"].forEach((ev) => el.dropzone.addEventListener(ev, (e) => { e.preventDefault(); el.dropzone.classList.add("dragover"); }));
  ["dragleave", "drop"].forEach((ev) => el.dropzone.addEventListener(ev, (e) => { e.preventDefault(); el.dropzone.classList.remove("dragover"); }));
  el.dropzone.addEventListener("drop", (e) => {
    if (isCardDrag(e)) { e.preventDefault(); const rec = cardRecFromDrag(e); if (rec) addLibraryImageRef(rec); return; }
    if (e.dataTransfer?.files?.length) addFiles(e.dataTransfer.files);
  });

  // Card drop targets: base slot = adjust, reference dropzone / bar option = reference.
  const dropTarget = (elm, overClass, onDrop) => {
    elm.addEventListener("dragover", (e) => { if (isCardDrag(e)) { e.preventDefault(); elm.classList.add(overClass); } });
    elm.addEventListener("dragleave", () => elm.classList.remove(overClass));
    elm.addEventListener("drop", (e) => {
      if (!isCardDrag(e)) return;
      e.preventDefault();
      elm.classList.remove(overClass);
      const rec = cardRecFromDrag(e);
      if (rec) onDrop(rec);
    });
  };
  dropTarget(el.baseSlot, "dragover", (rec) => startAdjust(rec));
  dropTarget(el.dropOptAdjust, "over", (rec) => { hideDropBar(); startAdjust(rec); });
  dropTarget(el.dropOptRef, "over", (rec) => { hideDropBar(); addLibraryImageRef(rec); });

  // While dragging a card, auto-scroll when the cursor nears the top/bottom edge
  document.addEventListener("dragover", (e) => {
    if (!isCardDrag(e)) return;
    const margin = 70, step = 16;
    if (e.clientY < margin) window.scrollBy(0, -step);
    else if (e.clientY > window.innerHeight - margin) window.scrollBy(0, step);
  });

  // Lightbox
  el.lightboxClose.onclick = closeLightbox;
  el.lightbox.onclick = (e) => { if (e.target === el.lightbox) closeLightbox(); };
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLightbox(); });

  // Ctrl/Cmd+Enter to generate from the prompt box
  el.promptOut.addEventListener("keydown", (e) => { if ((e.ctrlKey || e.metaKey) && e.key === "Enter") { e.preventDefault(); go(); } });

  el.balancePill.onclick = loadBalance;

  loadConfig();
  loadBalance();
  loadLibrary();
}
init();
