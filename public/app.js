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
  sparkles: `<path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z"/>`,
  download: `<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>`,
  trash: `<path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>`,
  crop: `<path d="M6 2v14a2 2 0 0 0 2 2h14"/><path d="M18 22V8a2 2 0 0 0-2-2H2"/>`,
  replace: `<path d="m16 3 4 4-4 4"/><path d="M20 7H9a5 5 0 0 0-5 5"/><path d="m8 21-4-4 4-4"/><path d="M4 17h11a5 5 0 0 0 5-5"/>`,
  user: `<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>`,
  dice: `<rect width="18" height="18" x="3" y="3" rx="3"/><circle cx="8" cy="8" r="1.2"/><circle cx="16" cy="16" r="1.2"/><circle cx="16" cy="8" r="1.2"/><circle cx="8" cy="16" r="1.2"/><circle cx="12" cy="12" r="1.2"/>`,
  star: `<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>`,
  frame: `<line x1="22" x2="2" y1="6" y2="6"/><line x1="22" x2="2" y1="18" y2="18"/><line x1="6" x2="6" y1="2" y2="22"/><line x1="18" x2="18" y1="2" y2="22"/>`,
  expand: `<polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" x2="14" y1="3" y2="10"/><line x1="3" x2="10" y1="21" y2="14"/>`,
  upload: `<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/>`,
  video: `<path d="m22 8-6 4 6 4V8Z"/><rect x="2" y="6" width="14" height="12" rx="2"/>`,
  scan: `<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M7 12h10"/>`,
  sliders: `<line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/><line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/><line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/><line x1="14" x2="14" y1="2" y2="6"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="16" x2="16" y1="18" y2="22"/>`,
  alert: `<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>`,
};
const REFRAME_ASPECTS = ["16:9", "9:16", "1:1", "4:5"];
// Supported output ratios; an arbitrary upload snaps to the nearest.
const ASPECT_RATIOS = [["16:9", 16 / 9], ["9:16", 9 / 16], ["1:1", 1], ["4:5", 4 / 5], ["5:4", 5 / 4], ["4:3", 4 / 3], ["3:4", 3 / 4], ["21:9", 21 / 9]];
function snapAspect(w, h) {
  const v = w / h;
  return ASPECT_RATIOS.reduce((best, c) => (Math.abs(c[1] - v) < Math.abs(best[1] - v) ? c : best))[0];
}
// Semi-transparent person silhouette for the subject placement guide.
const SUBJECT_SVG = `<svg viewBox="0 0 100 150" width="100%" height="100%" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
  <g fill="rgba(15,17,24,0.5)" stroke="#ffffff" stroke-opacity="0.85" stroke-width="2.5" stroke-linejoin="round">
    <circle cx="50" cy="31" r="20"/>
    <path d="M6 150 C6 102 26 60 50 60 C74 60 94 102 94 150 Z"/>
  </g>
</svg>`;
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
const ASPECT_VAL = Object.fromEntries(ASPECT_RATIOS); // "16:9" -> 1.777…
// 1K base dims for a ratio: use the measured values where we have them, else
// estimate a ~1.05 MP frame (matching the measured bases) rounded to /16 like the
// model's tiling — so reframe (4:5) and upscale-a-file (4:3/3:4/21:9…) still label.
function base1kFor(aspectRatio) {
  if (BASE_1K[aspectRatio]) return BASE_1K[aspectRatio];
  const r = ASPECT_VAL[aspectRatio];
  if (!r) return null;
  const TARGET = 1_050_000;
  return [Math.round(Math.sqrt(TARGET * r) / 16) * 16, Math.round(Math.sqrt(TARGET / r) / 16) * 16];
}
function dimsFor(resolution, aspectRatio) {
  const base = base1kFor(aspectRatio), m = RES_MULT[resolution];
  if (!base || !m) return "";
  const w = base[0] * m, h = base[1] * m;
  const mp = (w * h) / 1e6;
  const approx = BASE_1K[aspectRatio] ? "" : "≈ ";
  return `${approx}${w}×${h} · ${mp.toFixed(1)} MP`;
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
  enhancedFrom: null, // the brief that produced the current enhanced text (re-enhance only when it changes)
  region: null, // { mode:'add'|'remove', bbox:{x,y,w,h}, positionLabel, maskDataUri }
  library: [],
  sort: "newest",
  perPage: 12,
  page: 1,
  search: "",
  favOnly: false,
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
  seedInput: $("seedInput"), seedDice: $("seedDice"),
  clearBtn: $("clearBtn"), resetBtn: $("resetBtn"), previewBtn: $("previewBtn"),
  goBtn: $("goBtn"), goLabel: $("goLabel"), goIcon: $("goIcon"),
  promptOut: $("promptOut"), promptNote: $("promptNote"), enhanceToggle: $("enhanceToggle"),
  enhancedOut: $("enhancedOut"), enhancedField: $("enhancedField"),
  describeBtn: $("describeBtn"), describeInput: $("describeInput"),
  modeBanner: $("modeBanner"),
  grid: $("grid"), libEmpty: $("libEmpty"), libCount: $("libCount"), refreshBtn: $("refreshBtn"),
  sortSel: $("sortSel"), perPageSel: $("perPageSel"), pagination: $("pagination"),
  librarySearch: $("librarySearch"), favFilter: $("favFilter"),
  lightbox: $("lightbox"), lightboxImg: $("lightboxImg"), lightboxClose: $("lightboxClose"),
  lbStage: $("lbStage"), lbOverlay: $("lbOverlay"), lbGrid: $("lbGrid"), lbSubject: $("lbSubject"),
  guideToggle: $("guideToggle"), lbGuideCtrls: $("lbGuideCtrls"), subjSize: $("subjSize"),
  subjFlip: $("subjFlip"), gridToggle: $("gridToggle"),
  compareToggle: $("compareToggle"), lbBefore: $("lbBefore"), lbDivider: $("lbDivider"),
  lbTagBefore: $("lbTagBefore"), lbTagAfter: $("lbTagAfter"),
  keyToggle: $("keyToggle"), lbKeyCanvas: $("lbKeyCanvas"), lbKeyCtrls: $("lbKeyCtrls"),
  keyUploadBtn: $("keyUploadBtn"), keyUploadLabel: $("keyUploadLabel"), keySubjectInput: $("keySubjectInput"),
  keyColorChips: $("keyColorChips"), keyTol: $("keyTol"), keySoft: $("keySoft"), keyScale: $("keyScale"),
  keyFlip: $("keyFlip"), keyDownload: $("keyDownload"),
  filterToggle: $("filterToggle"), lbFilterCtrls: $("lbFilterCtrls"), filterPresets: $("filterPresets"),
  filBright: $("filBright"), filContrast: $("filContrast"), filSat: $("filSat"), filBlur: $("filBlur"),
  filVignette: $("filVignette"), filGrain: $("filGrain"), filterWarn: $("filterWarn"),
  lbFilterCanvas: $("lbFilterCanvas"), filterReset: $("filterReset"), filterDownload: $("filterDownload"), filterSave: $("filterSave"),
  reframeModal: $("reframeModal"), reframeFrame: $("reframeFrame"), reframeImg: $("reframeImg"),
  reframeAspects: $("reframeAspects"), reframeRes: $("reframeRes"),
  reframeClose: $("reframeClose"), reframeCancel: $("reframeCancel"), reframeGo: $("reframeGo"),
  upscaleModal: $("upscaleModal"), upscaleFrame: $("upscaleFrame"), upscaleImg: $("upscaleImg"),
  upscaleRes: $("upscaleRes"), upscaleDims: $("upscaleDims"), upscaleClose: $("upscaleClose"),
  upscaleCancel: $("upscaleCancel"), upscaleGo: $("upscaleGo"),
  upscaleFileBtn: $("upscaleFileBtn"), upscaleFileInput: $("upscaleFileInput"),
  exportMenu: $("exportMenu"), expOrigDim: $("expOrigDim"), exp1080Dim: $("exp1080Dim"), expUhdDim: $("expUhdDim"),
  exp1080Help: $("exp1080Help"), expUhdHelp: $("expUhdHelp"), exportFmt: $("exportFmt"), filterFmt: $("filterFmt"),
  dropBar: $("dragDropBar"), dropOptAdjust: $("dropOptAdjust"), dropOptRef: $("dropOptRef"),
  genOverlay: $("genOverlay"), genTitle: $("genTitle"),
  regionRow: $("regionRow"), markRegionBtn: $("markRegionBtn"), regionChip: $("regionChip"),
  regionEditor: $("regionEditor"), regCanvas: $("regCanvas"), regModeChips: $("regModeChips"),
  regHint: $("regHint"), regCloseBtn: $("regCloseBtn"), regClearBtn: $("regClearBtn"),
  regCancelBtn: $("regCancelBtn"), regApplyBtn: $("regApplyBtn"),
};

/* ---- Helpers ---- */
const fmtCost = (n) => (typeof n === "number" ? `$${n.toFixed(4)}` : "$—");
const fmtTime = (iso) => new Date(iso).toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
// Snap actual pixels to the nearest ratio we offer, so it's accurate regardless
// of the stored (requested) value.
const RATIOS = [["16:9", 16 / 9], ["9:16", 9 / 16], ["1:1", 1]];
function ratioLabel(r) {
  if (r.width && r.height) {
    const v = r.width / r.height;
    return RATIOS.reduce((best, c) => (Math.abs(c[1] - v) < Math.abs(best[1] - v) ? c : best))[0];
  }
  return r.aspectRatio || "";
}
// Library metadata label derived from ACTUAL pixels: "16:9 · 2K (2752×1536 · 4.2 MP)".
// Tier + ratio come from real dimensions, so pre-fix mislabeled records read true.
function dimLabel(r) {
  if (r.width && r.height) {
    const mp = (r.width * r.height) / 1e6;
    const tier = mp < 2.5 ? "1K" : mp < 9 ? "2K" : "4K";
    return `${ratioLabel(r)} · ${tier} (${r.width}×${r.height} · ${mp.toFixed(1)} MP)`;
  }
  return `${r.aspectRatio} · ${r.resolution}`;
}
const splitCsv = (s) => (s || "").split(",").map((x) => x.trim()).filter(Boolean);
const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// localStorage with a safe fallback (some privacy modes throw).
function prefGet(k) { try { return localStorage.getItem(k); } catch { return null; } }
function prefSet(k, v) { try { localStorage.setItem(k, v); } catch { /* ignore */ } }

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
  el.regionRow.hidden = !adjust;
  el.baseLabel.classList.toggle("active", adjust);
  el.goLabel.textContent = adjust ? "Adjust" : "Generate";
  el.goIcon.innerHTML = icon(adjust ? "wand" : "sparkles", 15);
  state.region = null; // marking is per adjust session
  renderRegionUI();
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
async function enhancePromptClient(source) {
  const res = await fetch("/api/enhance", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ prompt: source }) });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Enhance failed.");
  return data.enhanced;
}
// Describe an uploaded image into a reusable prompt (drops it into the prompt box).
function describeFromFile(file) {
  if (state.busy) return;
  const reader = new FileReader();
  reader.onload = async () => {
    if (state.busy) return;
    state.busy = true;
    el.describeBtn.disabled = true; el.previewBtn.disabled = true; el.goBtn.disabled = true;
    el.genTitle.textContent = "Describing image"; el.genOverlay.hidden = false;
    try {
      const res = await fetch("/api/describe", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ image: reader.result }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Describe failed.");
      el.promptOut.value = data.prompt;
      state.enhancedFrom = null; el.enhancedOut.value = ""; // fresh prompt → reset any enhancement
      toast("Described — tweak it or hit Generate for variations.");
    } catch (e) { toast(e.message, true); }
    finally { state.busy = false; el.describeBtn.disabled = false; el.previewBtn.disabled = false; el.goBtn.disabled = false; el.genOverlay.hidden = true; }
  };
  reader.onerror = () => toast("Couldn't read that image.", true);
  reader.readAsDataURL(file);
}
function renderEnhanceField() { el.enhancedField.hidden = !el.enhanceToggle.checked; }
async function preview() {
  if (state.busy) return;
  const p = composeFinalPrompt();
  if (!p) { toast("Pick some pills or type a prompt first.", true); return; }
  el.promptOut.value = p; // reflect the merged brief
  if (el.enhanceToggle.checked) {
    state.busy = true;
    el.previewBtn.disabled = true; el.goBtn.disabled = true;
    el.genTitle.textContent = "Enhancing prompt"; el.genOverlay.hidden = false;
    try {
      const enhanced = await enhancePromptClient(p);
      el.enhancedOut.value = enhanced; state.enhancedFrom = p; renderEnhanceField();
      toast("Prompt enhanced — edit the enhanced version freely before generating.");
    } catch (e) { toast(e.message, true); }
    finally { state.busy = false; el.previewBtn.disabled = false; el.goBtn.disabled = false; el.genOverlay.hidden = true; }
    return;
  }
  toast("Prompt assembled — pills + your text combined. Edit freely before generating.");
}
async function go() {
  if (state.busy) return;
  let prompt = composeFinalPrompt();
  const region = state.mode === "adjust" ? state.region : null;
  const needsWhat = region && (region.mode === "add" || region.mode === "replace");
  const canProceedWithoutPrompt =
    region && (region.mode === "remove" || (needsWhat && state.uploads.length > 0));
  if (!prompt && !canProceedWithoutPrompt) {
    toast(needsWhat
      ? `For ${region.mode === "replace" ? "Replace" : "Add"}, type what to use or upload a photo.`
      : "Add a prompt — pick pills or type one.", true);
    el.promptOut.focus();
    return;
  }
  if (prompt) el.promptOut.value = prompt; // reflect the merged brief
  // Claim the busy flag now — before the enhance await below — so a Ctrl+Enter or
  // rapid re-click can't re-enter and fire a second enhance/generation. setBusy(false)
  // at the end clears it on every path.
  state.busy = true;
  // Enhance into the separate field if the toggle is on (re-enhance only when the brief changed)
  if (el.enhanceToggle.checked && prompt) {
    if (!el.enhancedOut.value.trim() || state.enhancedFrom !== prompt) {
      el.genTitle.textContent = "Enhancing prompt";
      el.genOverlay.hidden = false;
      try { const enhanced = await enhancePromptClient(prompt); el.enhancedOut.value = enhanced; state.enhancedFrom = prompt; renderEnhanceField(); }
      catch { toast("Enhance failed — using your prompt as-is.", true); }
    }
    prompt = el.enhancedOut.value.trim() || prompt; // the enhanced (possibly edited) prompt is what's sent
  }

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
    if (region) {
      body.mask = region.maskDataUri;
      body.region = { mode: region.mode, positionLabel: region.positionLabel };
    }
  } else {
    url = "/api/generate";
    body.referenceImages = state.uploads.map((u) => u.dataUri);
  }
  // Seed: fixed value reproduces; blank = random. Batches use base+i (or random each) so images differ.
  const seedRaw = el.seedInput.value.trim();
  const parsedSeed = parseInt(seedRaw, 10);
  const baseSeed = seedRaw !== "" && Number.isFinite(parsedSeed) ? parsedSeed : null;
  const seedFor = (i) => (baseSeed != null ? baseSeed + i : Math.floor(Math.random() * 2147483647));

  setBusy(true, 0, count);
  let done = 0, ok = 0, spent = 0;
  const errors = [];
  const one = (i) =>
    fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...body, seed: seedFor(i) }) })
      .then(async (res) => { const data = await res.json(); if (!res.ok) throw new Error(data.error || "Generation failed."); return data; })
      .then((data) => { ok++; if (typeof data.cost === "number") spent += data.cost; })
      .catch((e) => { errors.push(e.message); })
      .finally(() => { done++; setBusy(true, done, count); });
  await Promise.all(Array.from({ length: count }, (_, i) => one(i)));

  state.uploads = [];
  renderThumbs();
  el.promptOut.value = ""; // clear so pills+text don't accumulate on the next run
  el.enhancedOut.value = ""; state.enhancedFrom = null; // reset the enhancement for the next prompt
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
  el.describeBtn.disabled = b;
  el.goLabel.textContent = b ? "Working…" : (state.mode === "adjust" ? "Adjust" : "Generate");
  if (b) {
    const base = state.mode === "adjust" ? "Adjusting" : "Generating";
    el.genTitle.textContent = total > 1 ? `${base} ${done} / ${total}` : base;
    el.genOverlay.hidden = false;
  } else {
    el.genOverlay.hidden = true;
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
function filteredLibrary() {
  let arr = sortedLibrary();
  if (state.favOnly) arr = arr.filter((r) => r.favorite);
  const q = state.search.trim().toLowerCase();
  if (q) arr = arr.filter((r) => (r.prompt || "").toLowerCase().includes(q) || String(r.seed ?? "").includes(q));
  return arr;
}
function renderLibrary() {
  const all = filteredLibrary();
  const total = all.length;
  const grandTotal = state.library.length;
  const pages = Math.max(1, Math.ceil(total / state.perPage));
  state.page = Math.min(Math.max(1, state.page), pages);
  const start = (state.page - 1) * state.perPage;
  const pageItems = all.slice(start, start + state.perPage);

  el.grid.innerHTML = "";
  el.libCount.textContent = !grandTotal ? "" : total === grandTotal ? `${total} image${total === 1 ? "" : "s"}` : `${total} of ${grandTotal}`;
  el.libEmpty.hidden = total > 0;
  el.libEmpty.textContent = grandTotal > 0 ? "No matches — try a different search or filter." : "No backgrounds yet. Generate your first one above.";

  pageItems.forEach((r) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="shot">
        <button class="fav${r.favorite ? " on" : ""}" type="button" title="Favorite">${icon("star", 15)}</button>
        ${r.parentId ? `<span class="lineage">${icon(r.kind === "reframe" ? "frame" : r.kind === "upscale" ? "expand" : r.kind === "filter" ? "sliders" : "wand", 11)} ${r.kind === "reframe" ? "reframed" : r.kind === "upscale" ? "upscaled" : r.kind === "filter" ? "filtered" : "adjusted"}</span>` : ""}
        <span class="drag-handle" title="Drag onto the base slot to adjust">${icon("grip", 14)}</span>
        <img src="/library/${r.file}" alt="" loading="lazy" draggable="false" />
      </div>
      <div class="body">
        <div class="metaline"><span>${dimLabel(r)}</span><span>${fmtCost(r.cost)}</span></div>
        <div class="metaline"><span>${fmtTime(r.createdAt)}</span>${r.seed != null ? `<span class="seed" data-seed="${r.seed}" title="Reuse this seed">seed ${r.seed}</span>` : `<span>${r.keyingSafe ? "keying-safe" : ""}</span>`}</div>
        <button class="prompt-toggle" type="button"><span class="tri">▸</span> Prompt used</button>
        <div class="prompt-full" hidden>
          <button class="prompt-copy" type="button" title="Copy prompt">${icon("copy", 12)}</button>
          <span class="prompt-text">${escapeHtml(r.prompt || "")}</span>
        </div>
        <div class="actions">
          <button class="btn small" data-act="adjust" type="button">${icon("wand", 13)} Adjust</button>
          <button class="btn small" data-act="reframe" type="button">${icon("frame", 13)} Reframe</button>
          <button class="btn small" data-act="upscale" type="button">${icon("expand", 13)} Upscale</button>
          <button class="btn small" data-act="download" type="button">${icon("download", 13)} Download</button>
          <button class="btn small danger" data-act="delete" type="button">${icon("trash", 13)} Delete</button>
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
    const seedEl = card.querySelector(".seed");
    if (seedEl) seedEl.onclick = () => { el.seedInput.value = seedEl.dataset.seed; toast(`Seed ${seedEl.dataset.seed} set — reuse to reproduce.`); };
    const favBtn = card.querySelector(".fav");
    favBtn.onclick = async (e) => {
      e.stopPropagation();
      const next = !r.favorite;
      r.favorite = next;
      favBtn.classList.toggle("on", next);
      try {
        const res = await fetch(`/api/library/${r.id}/favorite`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ favorite: next }) });
        if (!res.ok) throw new Error();
        if (state.favOnly && !next) renderLibrary(); // drops out of a favorites-only view
      } catch { r.favorite = !next; favBtn.classList.toggle("on", !next); toast("Couldn't update favorite.", true); }
    };
    card.querySelector('[data-act="adjust"]').onclick = () => startAdjust(r);
    card.querySelector('[data-act="reframe"]').onclick = () => openReframe(r);
    card.querySelector('[data-act="upscale"]').onclick = () => openUpscaleFromCard(r);
    card.querySelector('[data-act="download"]').onclick = (e) => { e.stopPropagation(); openExportMenu(r, e.currentTarget); };
    card.querySelector('[data-act="delete"]').onclick = (e) => deleteImage(r, e.currentTarget);
    el.grid.appendChild(card);
  });

  renderPagination(pages);
}
/* ---- Reframe / outpaint to a new aspect ratio ---- */
const reframeState = { record: null, target: "9:16", resolution: "2K" };
function renderReframe() {
  el.reframeFrame.style.aspectRatio = reframeState.target.replace(":", " / ");
  buildChips(el.reframeAspects, REFRAME_ASPECTS, () => reframeState.target, (v) => { reframeState.target = v; renderReframe(); });
  buildChips(el.reframeRes, RESOLUTIONS, () => reframeState.resolution, (v) => { reframeState.resolution = v; renderReframe(); }, (v) => dimsFor(v, reframeState.target));
}
function openReframe(record) {
  reframeState.record = record;
  reframeState.resolution = record.resolution && RESOLUTIONS.includes(record.resolution) ? record.resolution : "2K";
  const landscape = record.width >= record.height;
  reframeState.target = landscape ? "9:16" : "16:9";
  el.reframeImg.src = `/library/${record.file}`;
  renderReframe();
  el.reframeModal.hidden = false;
}
function closeReframe() { el.reframeModal.hidden = true; el.reframeImg.src = ""; }
async function reframeGo() {
  const rec = reframeState.record;
  if (!rec) return;
  el.reframeGo.disabled = true;
  el.genTitle.textContent = "Reframing";
  el.genOverlay.hidden = false;
  try {
    const res = await fetch("/api/reframe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sourceId: rec.id,
        targetAspect: reframeState.target,
        resolution: reframeState.resolution,
        keyingSafe: !!rec.keyingSafe,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Reframe failed.");
    applySpend(typeof data.cost === "number" ? data.cost : 0);
    setTimeout(loadBalance, 6000);
    closeReframe();
    state.page = 1;
    await loadLibrary();
    toast(`Reframed to ${reframeState.target}.`);
  } catch (err) {
    toast(err.message, true);
  } finally {
    el.reframeGo.disabled = false;
    el.genOverlay.hidden = true;
  }
}

/* ---- Upscale (library image or an uploaded file) ---- */
const upscaleState = { sourceId: null, imageUri: null, aspect: "16:9", srcW: 0, srcH: 0, resolution: "4K" };
function renderUpscale() {
  el.upscaleFrame.style.aspectRatio = upscaleState.aspect.replace(":", " / ");
  buildChips(el.upscaleRes, ["2K", "4K"], () => upscaleState.resolution, (v) => { upscaleState.resolution = v; renderUpscale(); }, (v) => dimsFor(v, upscaleState.aspect));
  const from = upscaleState.srcW && upscaleState.srcH ? `${upscaleState.srcW}×${upscaleState.srcH}` : "source";
  el.upscaleDims.textContent = `${from} → ${dimsFor(upscaleState.resolution, upscaleState.aspect)}`;
}
function openUpscale({ sourceId = null, imageUri, aspect, srcW, srcH }) {
  upscaleState.sourceId = sourceId;
  upscaleState.imageUri = imageUri;
  upscaleState.aspect = aspect;
  upscaleState.srcW = srcW || 0;
  upscaleState.srcH = srcH || 0;
  upscaleState.resolution = "4K";
  el.upscaleImg.src = imageUri;
  renderUpscale();
  el.upscaleModal.hidden = false;
}
function openUpscaleFromCard(record) {
  openUpscale({ sourceId: record.id, imageUri: `/library/${record.file}`, aspect: record.aspectRatio || snapAspect(record.width, record.height), srcW: record.width, srcH: record.height });
}
function openUpscaleFromFile(file) {
  const reader = new FileReader();
  reader.onload = () => {
    const dataUri = reader.result;
    const img = new Image();
    img.onload = () => openUpscale({ imageUri: dataUri, aspect: snapAspect(img.naturalWidth, img.naturalHeight), srcW: img.naturalWidth, srcH: img.naturalHeight });
    img.src = dataUri;
  };
  reader.onerror = () => toast("Couldn't read that file.", true);
  reader.readAsDataURL(file);
}
function closeUpscale() { el.upscaleModal.hidden = true; el.upscaleImg.src = ""; }
async function upscaleGo() {
  el.upscaleGo.disabled = true;
  el.genTitle.textContent = "Upscaling";
  el.genOverlay.hidden = false;
  try {
    const body = { targetResolution: upscaleState.resolution, aspectRatio: upscaleState.aspect };
    if (upscaleState.sourceId) body.sourceId = upscaleState.sourceId;
    else body.image = upscaleState.imageUri;
    const res = await fetch("/api/upscale", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Upscale failed.");
    applySpend(typeof data.cost === "number" ? data.cost : 0);
    setTimeout(loadBalance, 6000);
    closeUpscale();
    state.page = 1;
    await loadLibrary();
    toast(`Upscaled to ${upscaleState.resolution}.`);
  } catch (err) {
    toast(err.message, true);
  } finally {
    el.upscaleGo.disabled = false;
    el.genOverlay.hidden = true;
  }
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

/* ---- Region editor (mark an area to add/remove) ---- */
const reg = { mode: "remove", img: null, natW: 0, natH: 0, rect: null, drawing: false, start: null };

function posLabel(cxN, cyN) {
  const col = cxN < 0.34 ? "left" : cxN > 0.66 ? "right" : "center";
  const row = cyN < 0.34 ? "top" : cyN > 0.66 ? "bottom" : "middle";
  if (col === "center" && row === "middle") return "center";
  if (row === "middle") return col;
  if (col === "center") return row;
  return `${row}-${col}`;
}
function makeMaskDataUri(w, h, r) {
  const c = document.createElement("canvas");
  c.width = w; c.height = h;
  const g = c.getContext("2d");
  g.fillStyle = "#000"; g.fillRect(0, 0, w, h);
  g.fillStyle = "#fff"; g.fillRect(Math.round(r.x), Math.round(r.y), Math.round(r.w), Math.round(r.h));
  return c.toDataURL("image/png");
}
const regColor = () => (reg.mode === "add" ? "232,162,74" : reg.mode === "replace" ? "79,200,189" : "255,111,111");
function regDraw() {
  const c = el.regCanvas, g = c.getContext("2d");
  g.clearRect(0, 0, c.width, c.height);
  if (reg.img) g.drawImage(reg.img, 0, 0, c.width, c.height);
  if (reg.rect) {
    const { x, y, w, h } = reg.rect;
    g.fillStyle = `rgba(${regColor()},0.18)`;
    g.fillRect(x, y, w, h);
    g.strokeStyle = `rgb(${regColor()})`;
    g.lineWidth = 2;
    g.strokeRect(x, y, w, h);
  }
}
function regCanvasPos(e) {
  const r = el.regCanvas.getBoundingClientRect();
  return {
    x: (e.clientX - r.left) * (el.regCanvas.width / r.width),
    y: (e.clientY - r.top) * (el.regCanvas.height / r.height),
  };
}
function setRegMode(mode) {
  reg.mode = mode;
  el.regModeChips.querySelectorAll(".chip").forEach((b) => b.classList.toggle("active", b.dataset.mode === mode));
  el.regHint.textContent = mode === "add"
    ? "Drag to mark WHERE to add — then describe what in the prompt."
    : mode === "replace"
      ? "Drag a box over the object to replace — then describe the replacement."
      : "Drag a box around the object to remove.";
  regDraw();
}
function openRegionEditor() {
  if (!state.base) return;
  const img = new Image();
  img.onload = () => {
    reg.img = img; reg.natW = img.naturalWidth; reg.natH = img.naturalHeight;
    const scale = Math.min((window.innerWidth * 0.9) / reg.natW, (window.innerHeight * 0.6) / reg.natH, 1);
    el.regCanvas.width = Math.round(reg.natW * scale);
    el.regCanvas.height = Math.round(reg.natH * scale);
    reg.rect = null;
    if (state.region && state.region.bbox) {
      const b = state.region.bbox, s = el.regCanvas.width / reg.natW;
      reg.rect = { x: b.x * s, y: b.y * s, w: b.w * s, h: b.h * s };
    }
    setRegMode(state.region ? state.region.mode : reg.mode);
    el.regionEditor.hidden = false;
  };
  img.src = `/library/${state.base.file}`;
}
function closeRegionEditor() { el.regionEditor.hidden = true; }
function applyRegion() {
  if (!reg.rect || Math.abs(reg.rect.w) < 6 || Math.abs(reg.rect.h) < 6) { toast("Draw a box on the image first.", true); return; }
  const s = reg.natW / el.regCanvas.width;
  const x = (reg.rect.w < 0 ? reg.rect.x + reg.rect.w : reg.rect.x);
  const y = (reg.rect.h < 0 ? reg.rect.y + reg.rect.h : reg.rect.y);
  const nx = Math.max(0, x * s), ny = Math.max(0, y * s);
  const nw = Math.min(reg.natW - nx, Math.abs(reg.rect.w) * s), nh = Math.min(reg.natH - ny, Math.abs(reg.rect.h) * s);
  const bbox = { x: nx, y: ny, w: nw, h: nh };
  const positionLabel = posLabel((nx + nw / 2) / reg.natW, (ny + nh / 2) / reg.natH);
  state.region = { mode: reg.mode, bbox, positionLabel, maskDataUri: makeMaskDataUri(reg.natW, reg.natH, bbox) };
  closeRegionEditor();
  renderRegionUI();
  toast(`Region set: ${({ add: "add", replace: "replace", remove: "remove" }[reg.mode] || reg.mode)} · ${positionLabel}.`);
}
function clearRegion() { state.region = null; renderRegionUI(); }
function renderRegionUI() {
  const r = state.region;
  el.markRegionBtn.innerHTML = `${icon("crop", 13)} ${r ? "Edit region" : "Mark region"}`;
  if (r) {
    const modeIcon = { add: "sparkles", replace: "replace", remove: "trash" }[r.mode];
    const modeLabel = { add: "Add", replace: "Replace", remove: "Remove" }[r.mode];
    el.regionChip.hidden = false;
    el.regionChip.innerHTML = `${icon(modeIcon, 12)} ${modeLabel} · ${r.positionLabel} <span class="x" title="Clear region">✕</span>`;
    el.regionChip.querySelector(".x").onclick = clearRegion;
  } else {
    el.regionChip.hidden = true;
    el.regionChip.innerHTML = "";
  }
}

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

/* ---- Export presets (resize to exact standard video sizes on download) ---- */
// Exact broadcast sizes per aspect ratio (drop-in-ready for a video timeline).
const STD_SIZES = {
  "16:9": { p1080: [1920, 1080], uhd: [3840, 2160] },
  "9:16": { p1080: [1080, 1920], uhd: [2160, 3840] },
  "1:1": { p1080: [1080, 1080], uhd: [2160, 2160] },
  "4:5": { p1080: [1080, 1350], uhd: [2160, 2700] },
  "5:4": { p1080: [1350, 1080], uhd: [2700, 2160] },
  "4:3": { p1080: [1440, 1080], uhd: [2880, 2160] },
  "3:4": { p1080: [1080, 1440], uhd: [2160, 2880] },
  "21:9": { p1080: [2560, 1080], uhd: [5120, 2160] },
};
// Export file format (applies to the resized presets + the filter Download; Original stays pass-through).
const EXPORT_FORMATS = {
  jpeg: { mime: "image/jpeg", ext: "jpg", q: 0.95 },
  png: { mime: "image/png", ext: "png", q: undefined },
  webp: { mime: "image/webp", ext: "webp", q: 0.95 },
};
let _webpOK = null;
function webpSupported() {
  if (_webpOK === null) {
    try { const c = document.createElement("canvas"); c.width = c.height = 1; _webpOK = c.toDataURL("image/webp").startsWith("data:image/webp"); }
    catch { _webpOK = false; }
  }
  return _webpOK;
}
function getExportFormat() {
  let f = prefGet("bgstudio.exportFmt") || "jpeg";
  if (!EXPORT_FORMATS[f] || (f === "webp" && !webpSupported())) f = "jpeg";
  return f;
}
function setExportFormat(f) { if (EXPORT_FORMATS[f]) { prefSet("bgstudio.exportFmt", f); renderFormatToggles(); } }
function renderFormatToggles() {
  const cur = getExportFormat();
  [el.exportFmt, el.filterFmt].forEach((grp) => {
    if (!grp) return;
    grp.querySelectorAll("button").forEach((b) => {
      b.hidden = b.dataset.fmt === "webp" && !webpSupported();
      b.classList.toggle("active", b.dataset.fmt === cur);
    });
  });
}
// Download a canvas in the chosen format.
function exportCanvas(canvas, baseName) {
  const f = EXPORT_FORMATS[getExportFormat()];
  const a = document.createElement("a");
  a.href = canvas.toDataURL(f.mime, f.q);
  a.download = `${baseName}.${f.ext}`;
  a.click();
}
function exportDims(record, tier) {
  const std = STD_SIZES[record.aspectRatio];
  if (std) { const [w, h] = tier === "uhd" ? std.uhd : std.p1080; return { w, h }; }
  // fallback: anchor the short edge from the actual pixels
  const shortEdge = tier === "uhd" ? 2160 : 1080;
  const w = record.width, h = record.height;
  if (!w || !h) return null;
  const ar = w / h;
  return w >= h ? { w: Math.round(shortEdge * ar), h: shortEdge } : { w: shortEdge, h: Math.round(shortEdge / ar) };
}
let exportRecord = null;
// Mark a preset that's bigger than the source (an interpolated upscale, not real detail).
function setExportOption(key, d, record) {
  const dimEl = key === "uhd" ? el.expUhdDim : el.exp1080Dim;
  const helpEl = key === "uhd" ? el.expUhdHelp : el.exp1080Help;
  const btnEl = el.exportMenu.querySelector(`[data-exp="${key}"]`);
  if (!d) { dimEl.textContent = ""; helpEl.hidden = true; btnEl.classList.remove("is-disabled"); return; }
  const upscales = record.width && record.height && Math.max(d.w / record.width, d.h / record.height) > 1.001;
  dimEl.textContent = `${d.w}×${d.h}`;
  btnEl.classList.toggle("is-disabled", !!upscales);
  helpEl.hidden = !upscales;
}
function openExportMenu(record, btn) {
  exportRecord = record;
  el.expOrigDim.textContent = record.width && record.height ? `${record.width}×${record.height}` : "";
  setExportOption("1080", exportDims(record, "1080"), record);
  setExportOption("uhd", exportDims(record, "uhd"), record);
  renderFormatToggles();
  el.exportMenu.hidden = false;
  const r = btn.getBoundingClientRect(), m = el.exportMenu.getBoundingClientRect();
  let top = r.bottom + 6, left = r.left;
  if (top + m.height > window.innerHeight - 8) top = r.top - m.height - 6; // flip up if no room below
  left = Math.min(left, window.innerWidth - m.width - 8);
  el.exportMenu.style.top = `${Math.max(8, top)}px`;
  el.exportMenu.style.left = `${Math.max(8, left)}px`;
}
function closeExportMenu() { el.exportMenu.hidden = true; exportRecord = null; }
function exportResized(record, tier) {
  const d = exportDims(record, tier);
  if (!d) { downloadImage(record); return; }
  const img = new Image();
  img.onload = () => {
    const c = document.createElement("canvas");
    c.width = d.w; c.height = d.h;
    const ctx = c.getContext("2d");
    ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = "high";
    // COVER: fill the exact target, centre-cropping the small aspect difference (no distortion)
    const sAR = img.naturalWidth / img.naturalHeight, tAR = d.w / d.h;
    let dw, dh;
    if (sAR > tAR) { dh = d.h; dw = Math.round(d.h * sAR); } else { dw = d.w; dh = Math.round(d.w / sAR); }
    ctx.drawImage(img, Math.round((d.w - dw) / 2), Math.round((d.h - dh) / 2), dw, dh);
    exportCanvas(c, `background-${d.w}x${d.h}`);
  };
  img.onerror = () => toast("Couldn't load the image for export.", true);
  img.src = `/library/${record.file}`;
}
async function deleteImage(record, btn) {
  if (btn.dataset.confirm !== "1") {
    btn.dataset.confirm = "1";
    btn.textContent = "Sure?";
    setTimeout(() => { if (btn.dataset.confirm === "1") { btn.dataset.confirm = ""; btn.innerHTML = `${icon("trash", 13)} Delete`; } }, 3000);
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

/* ---- Lightbox + subject placement guide ---- */
const guide = { on: false, grid: true, x: 50, y: 26, h: 72, flip: false, dragging: false };
function renderGuide() {
  el.lbOverlay.hidden = !guide.on;
  el.lbGuideCtrls.hidden = !guide.on;
  el.guideToggle.classList.toggle("active", guide.on);
  el.lbGrid.style.display = guide.grid ? "block" : "none";
  el.gridToggle.classList.toggle("active", guide.grid);
  el.subjFlip.classList.toggle("active", guide.flip);
  const s = el.lbSubject;
  s.style.left = guide.x + "%";
  s.style.top = guide.y + "%";
  s.style.height = guide.h + "%";
  s.style.transform = `translateX(-50%)${guide.flip ? " scaleX(-1)" : ""}`;
  updateStage();
}
function toggleGuide() { guide.on = !guide.on; if (guide.on) { cmp.on = false; renderCompare(); key.on = false; renderKey(); filt.panel = false; renderFilter(); } renderGuide(); }
function setSubjectPos(pos) { guide.x = pos === "left" ? 28 : pos === "right" ? 72 : 50; renderGuide(); }

/* Before/after compare (only for images that have a parent) */
const cmp = { on: false, pos: 50, parentFile: null };
function renderCompare() {
  const active = cmp.on && !!cmp.parentFile;
  el.lbBefore.hidden = !active;
  el.lbDivider.hidden = !active;
  el.lbTagBefore.hidden = !active;
  el.lbTagAfter.hidden = !active;
  el.compareToggle.classList.toggle("active", active);
  if (active) {
    el.lbBefore.style.clipPath = `inset(0 ${100 - cmp.pos}% 0 0)`;
    el.lbDivider.style.left = cmp.pos + "%";
  }
  updateStage();
}
function toggleCompare() {
  if (!cmp.parentFile) { toast("No earlier version to compare.", true); return; }
  cmp.on = !cmp.on;
  if (cmp.on) { guide.on = false; renderGuide(); key.on = false; renderKey(); filt.panel = false; renderFilter(); el.lbBefore.src = `/library/${cmp.parentFile}`; cmp.pos = 50; }
  renderCompare();
}
/* ---- Live keying preview (chroma-key your green-screen shot over a background) ---- */
const key = { on: false, subjectImg: null, keyed: null, color: "green", tol: 90, soft: 40, x: 0.5, y: 0.98, scale: 0.9, flip: false };
function keyControls() {
  el.keyTol.value = String(key.tol);
  el.keySoft.value = String(key.soft);
  el.keyScale.value = String(Math.round(key.scale * 100));
  el.keyColorChips.querySelectorAll(".chip").forEach((b) => b.classList.toggle("active", b.dataset.kc === key.color));
  el.keyFlip.classList.toggle("active", key.flip);
  el.keyUploadLabel.textContent = key.subjectImg ? "Replace shot" : "Your green‑screen shot";
}
function rekey() {
  if (!key.subjectImg) { key.keyed = null; return; }
  const cap = 1400, s = Math.min(1, cap / Math.max(key.subjectImg.naturalWidth, key.subjectImg.naturalHeight));
  const w = Math.round(key.subjectImg.naturalWidth * s), h = Math.round(key.subjectImg.naturalHeight * s);
  const oc = document.createElement("canvas"); oc.width = w; oc.height = h;
  const octx = oc.getContext("2d");
  octx.drawImage(key.subjectImg, 0, 0, w, h);
  const id = octx.getImageData(0, 0, w, h), d = id.data, tol = key.tol, soft = Math.max(1, key.soft);
  for (let i = 0; i < d.length; i += 4) {
    const r = d[i], g = d[i + 1], b = d[i + 2];
    const m = key.color === "blue" ? b - Math.max(r, g) : g - Math.max(r, b);
    if (m > tol + soft) d[i + 3] = 0;
    else if (m > tol) d[i + 3] = Math.round(d[i + 3] * (1 - (m - tol) / soft));
  }
  octx.putImageData(id, 0, 0);
  key.keyed = oc;
}
function composeKey() {
  const c = el.lbKeyCanvas, ctx = c.getContext("2d"), bg = el.lightboxImg;
  stageCanvasSize(c, bg.naturalWidth || 1280, bg.naturalHeight || 720);
  paintGrade(ctx, bg, c.width, c.height); // the current grade (colour/blur/vignette/grain) flows onto the background
  if (key.keyed) {
    const subH = key.scale * c.height, subW = subH * (key.keyed.width / key.keyed.height);
    const left = key.x * c.width - subW / 2, top = key.y * c.height - subH;
    ctx.save();
    if (key.flip) { ctx.translate(left + subW, top); ctx.scale(-1, 1); ctx.drawImage(key.keyed, 0, 0, subW, subH); }
    else ctx.drawImage(key.keyed, left, top, subW, subH);
    ctx.restore();
  }
}
function renderKey() {
  el.lbKeyCtrls.hidden = !key.on;
  el.keyToggle.classList.toggle("active", key.on);
  if (key.on) {
    // keying owns the stage — hide the guide + compare overlays
    el.lbOverlay.hidden = true;
    el.lbBefore.hidden = true; el.lbDivider.hidden = true; el.lbTagBefore.hidden = true; el.lbTagAfter.hidden = true;
    keyControls();
  }
  updateStage(); // shows/repaints the key canvas (with the graded background) when key.on
}
function toggleKey() {
  key.on = !key.on;
  if (key.on) { guide.on = false; renderGuide(); cmp.on = false; renderCompare(); filt.panel = false; renderFilter(); }
  renderKey();
  if (key.on && !key.subjectImg) el.keySubjectInput.click();
}
function loadKeySubject(file) {
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.onload = () => { key.subjectImg = img; rekey(); key.on = true; renderKey(); };
    img.src = reader.result;
  };
  reader.onerror = () => toast("Couldn't read that image.", true);
  reader.readAsDataURL(file);
}
function downloadKeyPreview() {
  if (!key.on) return;
  const a = document.createElement("a");
  a.href = el.lbKeyCanvas.toDataURL("image/png");
  a.download = "keying-preview.png";
  a.click();
}

/* ---- Post-generation filters (client-side, non-destructive; baked on export) ---- */
const FILTER_PRESETS = {
  none:    { brightness: 100, contrast: 100, saturate: 100, sepia: 0,  grayscale: 0,   hueRotate: 0 },
  warm:    { brightness: 103, contrast: 102, saturate: 115, sepia: 25, grayscale: 0,   hueRotate: -6 },
  cool:    { brightness: 100, contrast: 105, saturate: 108, sepia: 0,  grayscale: 0,   hueRotate: 12 },
  vivid:   { brightness: 102, contrast: 112, saturate: 145, sepia: 0,  grayscale: 0,   hueRotate: 0 },
  muted:   { brightness: 102, contrast: 96,  saturate: 70,  sepia: 0,  grayscale: 0,   hueRotate: 0 },
  vintage: { brightness: 105, contrast: 95,  saturate: 115, sepia: 35, grayscale: 0,   hueRotate: -8 },
  sepia:   { brightness: 105, contrast: 105, saturate: 90,  sepia: 70, grayscale: 0,   hueRotate: 0 },
  bw:      { brightness: 105, contrast: 110, saturate: 100, sepia: 0,  grayscale: 100, hueRotate: 0 },
  noir:    { brightness: 96,  contrast: 140, saturate: 100, sepia: 0,  grayscale: 100, hueRotate: 0 },
  cine:    { brightness: 101, contrast: 110, saturate: 120, sepia: 15, grayscale: 0,   hueRotate: -4 },
};
const FILT_DEFAULT = { preset: "none", brightness: 100, contrast: 100, saturate: 100, sepia: 0, grayscale: 0, hueRotate: 0, blur: 0, vignette: 0, grain: 0 };
const filt = { panel: false, ...FILT_DEFAULT };
// True when the grade differs from the untouched image (drives whether we show the graded canvas at all).
function gradeActive() {
  return filt.brightness !== 100 || filt.contrast !== 100 || filt.saturate !== 100 ||
    filt.sepia !== 0 || filt.grayscale !== 0 || filt.hueRotate !== 0 ||
    filt.blur > 0 || filt.vignette > 0 || filt.grain > 0;
}
// Blur is an absolute px radius, so — unlike the per-pixel colour filters — it must scale to the surface
// it's drawn on. The slider (0-100) maps to a fraction of image width, computed per-surface, so the live
// preview (display size) and the baked export (natural size) look proportionally identical.
const MAX_BLUR_FRAC = 0.025;
function blurPxFor(f, width) { return (f.blur / 100) * MAX_BLUR_FRAC * width; }
function colorFilter(f) {
  return `brightness(${f.brightness}%) contrast(${f.contrast}%) saturate(${f.saturate}%) sepia(${f.sepia}%) grayscale(${f.grayscale}%) hue-rotate(${f.hueRotate}deg)`;
}

// --- The one pipeline: paint `src` into `ctx` at w×h with the whole grade baked in. Used by the live
//     preview, the keying-preview background, AND the exported file, so all three always match. ---
function paintColorBlur(ctx, src, w, h) {
  const b = blurPxFor(filt, w);
  if (b <= 0) { ctx.filter = colorFilter(filt); ctx.drawImage(src, 0, 0, w, h); ctx.filter = "none"; return; }
  const sw = src.naturalWidth || src.width, sh = src.naturalHeight || src.height;
  const M = Math.ceil(b * 3); // pad + replicate edges so blur samples real colour (no dark halo)
  const pad = document.createElement("canvas");
  pad.width = w + 2 * M; pad.height = h + 2 * M;
  const p = pad.getContext("2d");
  p.drawImage(src, M, M, w, h);
  p.drawImage(src, 0, 0, sw, 1, M, 0, w, M);
  p.drawImage(src, 0, sh - 1, sw, 1, M, M + h, w, M);
  p.drawImage(src, 0, 0, 1, sh, 0, M, M, h);
  p.drawImage(src, sw - 1, 0, 1, sh, M + w, M, M, h);
  p.drawImage(src, 0, 0, 1, 1, 0, 0, M, M);
  p.drawImage(src, sw - 1, 0, 1, 1, M + w, 0, M, M);
  p.drawImage(src, 0, sh - 1, 1, 1, 0, M + h, M, M);
  p.drawImage(src, sw - 1, sh - 1, 1, 1, M + w, M + h, M, M);
  ctx.filter = `${colorFilter(filt)} blur(${b}px)`;
  ctx.drawImage(pad, -M, -M);
  ctx.filter = "none";
}
function drawVignette(ctx, w, h, amount) {
  const a = (amount / 100) * 0.85;
  const g = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.28, w / 2, h / 2, Math.max(w, h) * 0.72);
  g.addColorStop(0, "rgba(0,0,0,0)");
  g.addColorStop(1, `rgba(0,0,0,${a})`);
  ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
}
function drawGrain(ctx, w, h, amount) {
  const nw = Math.min(w, 600), nh = Math.max(1, Math.round(nw * h / w));
  const noise = document.createElement("canvas"); noise.width = nw; noise.height = nh;
  const nctx = noise.getContext("2d");
  const id = nctx.createImageData(nw, nh), d = id.data, strength = (amount / 100) * 80;
  for (let i = 0; i < d.length; i += 4) {
    const v = 128 + (Math.random() - 0.5) * 2 * strength; // luminance noise, blended as 'overlay'
    d[i] = d[i + 1] = d[i + 2] = v; d[i + 3] = 255;
  }
  nctx.putImageData(id, 0, 0);
  const op = ctx.globalCompositeOperation, ga = ctx.globalAlpha;
  ctx.globalCompositeOperation = "overlay"; ctx.globalAlpha = 0.5;
  ctx.drawImage(noise, 0, 0, w, h);
  ctx.globalCompositeOperation = op; ctx.globalAlpha = ga;
}
function paintGrade(ctx, src, w, h) {
  ctx.clearRect(0, 0, w, h);
  paintColorBlur(ctx, src, w, h);
  if (filt.vignette > 0) drawVignette(ctx, w, h, filt.vignette);
  if (filt.grain > 0) drawGrain(ctx, w, h, filt.grain);
}
// Fit a stage canvas to the viewport at the image's aspect (shared by keying + filter previews).
function stageCanvasSize(canvas, natW, natH) {
  const scale = Math.min((window.innerWidth * 0.9) / natW, (window.innerHeight * 0.78) / natH, 1);
  canvas.width = Math.round(natW * scale); canvas.height = Math.round(natH * scale);
}
function renderFilterCanvas() {
  const img = el.lightboxImg;
  stageCanvasSize(el.lbFilterCanvas, img.naturalWidth || 1280, img.naturalHeight || 720);
  paintGrade(el.lbFilterCanvas.getContext("2d"), img, el.lbFilterCanvas.width, el.lbFilterCanvas.height);
}
// Decide which element owns the lightbox stage: keying canvas, graded canvas, or the plain image.
function updateStage() {
  const showKey = key.on;
  // Show the graded canvas whenever there's a grade OR the Filters panel is open — so opening Filters and
  // switching between None and a preset never swaps img<->canvas (which would shift/scale the stage).
  const showGraded = !showKey && !cmp.on && (gradeActive() || filt.panel);
  el.lbKeyCanvas.hidden = !showKey;
  el.lbFilterCanvas.hidden = !showGraded;
  el.lightboxImg.style.display = (showKey || showGraded) ? "none" : "";
  if (showKey) composeKey();
  else if (showGraded) renderFilterCanvas();
}
// Warn when the (graded) image is heavy in chroma green/blue, which keys poorly.
function checkKeyingSafe() {
  const img = el.lightboxImg;
  if (!img.naturalWidth) { el.filterWarn.hidden = true; return; }
  const tw = 48, th = Math.max(1, Math.round(tw * img.naturalHeight / img.naturalWidth));
  const t = document.createElement("canvas"); t.width = tw; t.height = th;
  const tctx = t.getContext("2d");
  paintGrade(tctx, img, tw, th);
  const d = tctx.getImageData(0, 0, tw, th).data;
  let risky = 0; const n = tw * th;
  for (let i = 0; i < d.length; i += 4) {
    const r = d[i], g = d[i + 1], b = d[i + 2];
    if (g - Math.max(r, b) > 55 || b - Math.max(r, g) > 55) risky++;
  }
  el.filterWarn.hidden = (risky / n) < 0.1;
}
function renderFilter() {
  el.lbFilterCtrls.hidden = !filt.panel;
  el.filterToggle.classList.toggle("active", filt.panel || gradeActive());
  if (filt.panel) {
    el.filBright.value = String(filt.brightness);
    el.filContrast.value = String(filt.contrast);
    el.filSat.value = String(filt.saturate);
    el.filBlur.value = String(filt.blur);
    el.filVignette.value = String(filt.vignette);
    el.filGrain.value = String(filt.grain);
    el.filterPresets.querySelectorAll(".chip").forEach((b) => b.classList.toggle("active", b.dataset.fp === filt.preset));
    checkKeyingSafe();
  }
  updateStage();
}
// Full reset (on lightbox open/close): clear the grade and close the panel.
function resetFilterState() { Object.assign(filt, FILT_DEFAULT, { panel: false }); }
// Reset button: clear the grade but keep the panel open.
function clearFilter() { Object.assign(filt, FILT_DEFAULT); renderFilter(); }
function toggleFilter() {
  filt.panel = !filt.panel;
  if (filt.panel) { guide.on = false; renderGuide(); cmp.on = false; renderCompare(); key.on = false; renderKey(); }
  renderFilter();
}
function applyFilterPreset(name) { // colour grade only — blur/vignette/grain are orthogonal
  Object.assign(filt, FILTER_PRESETS[name] || FILTER_PRESETS.none, { preset: name });
  renderFilter();
}
function downloadFiltered() {
  if (!gradeActive() || !lbRecord) return;
  const img = new Image();
  img.onload = () => {
    const c = document.createElement("canvas");
    c.width = img.naturalWidth; c.height = img.naturalHeight;
    paintGrade(c.getContext("2d"), img, c.width, c.height); // same pipeline, full resolution
    exportCanvas(c, `background-filtered-${c.width}x${c.height}`);
  };
  img.onerror = () => toast("Couldn't load the image for export.", true);
  img.src = `/library/${lbRecord.file}`;
}
// A short, searchable label describing the grade (+ the source prompt).
const PRESET_NAMES = { warm: "Warm", cool: "Cool", vivid: "Vivid", muted: "Muted", vintage: "Vintage", sepia: "Sepia", bw: "B&W", noir: "Noir", cine: "Cinema" };
function gradeLabel() {
  const parts = [];
  if (PRESET_NAMES[filt.preset]) parts.push(PRESET_NAMES[filt.preset]);
  if (filt.blur > 0) parts.push("blur");
  if (filt.vignette > 0) parts.push("vignette");
  if (filt.grain > 0) parts.push("grain");
  const grade = parts.length ? parts.join(", ") : "adjusted";
  const src = ((lbRecord && lbRecord.prompt) || "").trim();
  return `Filtered · ${grade}${src ? ` — ${src}` : ""}`;
}
// Bake the grade at full resolution and save it as a new library item (no AI, no cost).
async function saveFiltered() {
  if (!gradeActive() || !lbRecord || el.filterSave.disabled) return;
  const img = el.lightboxImg; // already loaded at natural resolution
  const c = document.createElement("canvas");
  c.width = img.naturalWidth; c.height = img.naturalHeight;
  paintGrade(c.getContext("2d"), img, c.width, c.height);
  const prev = el.filterSave.innerHTML;
  el.filterSave.disabled = true;
  el.filterSave.innerHTML = `${icon("library", 13)} Saving…`;
  try {
    const res = await fetch("/api/filtered", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sourceId: lbRecord.id, image: c.toDataURL("image/jpeg", 0.95), label: gradeLabel() }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Save failed.");
    toast("Saved to library.");
    await loadLibrary();
  } catch (e) { toast(e.message, true); }
  finally { el.filterSave.disabled = false; el.filterSave.innerHTML = prev; }
}

let lbRecord = null;
function openLightbox(record) {
  lbRecord = record;
  el.lightboxImg.src = `/library/${record.file}`;
  const parent = record.parentId ? state.library.find((r) => r.id === record.parentId) : null;
  cmp.parentFile = parent ? parent.file : null;
  cmp.on = false;
  el.compareToggle.hidden = !cmp.parentFile;
  renderCompare();
  guide.on = false; // clean slate on open, matching compare/keying
  el.subjSize.value = String(guide.h);
  renderGuide();
  key.on = false;
  renderKey();
  resetFilterState(); renderFilter(); // clean slate, matching the other tools
  el.lightbox.hidden = false;
}
function closeLightbox() {
  el.lightbox.hidden = true;
  el.lightboxImg.src = "";
  el.lbBefore.src = "";
  cmp.on = false;
  key.on = false;
  renderKey();
  resetFilterState(); renderFilter();
  lbRecord = null;
}

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
    $("modelName").textContent = "Nano Banana Pro";
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
  $("metaModelIcon").innerHTML = icon("sparkles", 14);

  renderSections();
  renderChips();
  updateEstimate();
  setMode("generate");

  el.keyingToggle.onchange = () => { state.keyingSafe = el.keyingToggle.checked; updateNote(); };
  $("describeIcon").innerHTML = icon("scan", 15);
  el.describeBtn.onclick = () => el.describeInput.click();
  el.describeInput.onchange = () => { const f = el.describeInput.files[0]; if (f) describeFromFile(f); el.describeInput.value = ""; };
  $("enhanceIcon").innerHTML = icon("sparkles", 13);
  el.enhanceToggle.checked = prefGet("bgstudio.enhance") === "1";
  el.enhanceToggle.onchange = () => { prefSet("bgstudio.enhance", el.enhanceToggle.checked ? "1" : "0"); renderEnhanceField(); };
  renderEnhanceField();
  $("diceIcon").innerHTML = icon("dice", 15);
  el.seedDice.onclick = () => { el.seedInput.value = String(Math.floor(Math.random() * 2147483647)); };
  el.previewBtn.onclick = preview;
  el.goBtn.onclick = go;
  el.clearBtn.onclick = () => setMode("generate");
  el.resetBtn.onclick = resetPills;
  el.refreshBtn.onclick = loadLibrary;

  // Restore saved library view preferences (persist across refreshes).
  const savedSort = prefGet("bgstudio.sort");
  if (["newest", "oldest", "costhigh"].includes(savedSort)) state.sort = savedSort;
  const savedPerPage = Number(prefGet("bgstudio.perPage"));
  if ([6, 9, 12, 24].includes(savedPerPage)) state.perPage = savedPerPage;

  el.sortSel.value = state.sort;
  el.perPageSel.value = String(state.perPage);
  el.sortSel.onchange = () => { state.sort = el.sortSel.value; prefSet("bgstudio.sort", state.sort); state.page = 1; renderLibrary(); };
  el.perPageSel.onchange = () => { state.perPage = Number(el.perPageSel.value); prefSet("bgstudio.perPage", String(state.perPage)); state.page = 1; renderLibrary(); };

  // Export menu (download size presets)
  el.exportMenu.querySelector('[data-exp="orig"]').onclick = () => { if (exportRecord) downloadImage(exportRecord); closeExportMenu(); };
  const b1080 = el.exportMenu.querySelector('[data-exp="1080"]');
  const buhd = el.exportMenu.querySelector('[data-exp="uhd"]');
  b1080.onclick = () => { if (b1080.classList.contains("is-disabled")) return; if (exportRecord) exportResized(exportRecord, "1080"); closeExportMenu(); };
  buhd.onclick = () => { if (buhd.classList.contains("is-disabled")) return; if (exportRecord) exportResized(exportRecord, "uhd"); closeExportMenu(); };
  document.addEventListener("pointerdown", (e) => { if (!el.exportMenu.hidden && !el.exportMenu.contains(e.target) && !e.target.closest('[data-act="download"]')) closeExportMenu(); });
  window.addEventListener("scroll", () => { if (!el.exportMenu.hidden) closeExportMenu(); }, true);

  $("reframeGoIcon").innerHTML = icon("frame", 15);
  el.reframeClose.onclick = closeReframe;
  el.reframeCancel.onclick = closeReframe;
  el.reframeGo.onclick = reframeGo;
  el.reframeModal.onclick = (e) => { if (e.target === el.reframeModal) closeReframe(); };

  $("upscaleGoIcon").innerHTML = icon("expand", 15);
  $("upscaleFileIcon").innerHTML = icon("upload", 13);
  el.upscaleClose.onclick = closeUpscale;
  el.upscaleCancel.onclick = closeUpscale;
  el.upscaleGo.onclick = upscaleGo;
  el.upscaleModal.onclick = (e) => { if (e.target === el.upscaleModal) closeUpscale(); };
  el.upscaleFileBtn.onclick = () => el.upscaleFileInput.click();
  el.upscaleFileInput.onchange = () => { const f = el.upscaleFileInput.files[0]; if (f) openUpscaleFromFile(f); el.upscaleFileInput.value = ""; };

  $("favFilterIcon").innerHTML = icon("star", 13);
  el.librarySearch.oninput = () => { state.search = el.librarySearch.value; state.page = 1; renderLibrary(); };
  el.favFilter.onclick = () => { state.favOnly = !state.favOnly; el.favFilter.classList.toggle("active", state.favOnly); state.page = 1; renderLibrary(); };

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
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") { closeLightbox(); closeRegionEditor(); closeReframe(); closeUpscale(); } });

  // Before/after compare
  $("compareIcon").innerHTML = icon("replace", 14);
  el.compareToggle.onclick = toggleCompare;
  let cdrag = null;
  el.lbDivider.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    cdrag = el.lbStage.getBoundingClientRect();
    try { el.lbDivider.setPointerCapture(e.pointerId); } catch { /* ignore */ }
  });
  el.lbDivider.addEventListener("pointermove", (e) => {
    if (!cdrag) return;
    cmp.pos = clamp(((e.clientX - cdrag.left) / cdrag.width) * 100, 0, 100);
    renderCompare();
  });
  el.lbDivider.addEventListener("pointerup", () => { cdrag = null; });

  // Live keying preview
  $("keyIcon").innerHTML = icon("video", 14);
  $("keyUploadIcon").innerHTML = icon("upload", 13);
  $("keyDownloadIcon").innerHTML = icon("download", 13);
  el.keyToggle.onclick = toggleKey;
  el.keyUploadBtn.onclick = () => el.keySubjectInput.click();
  el.keySubjectInput.onchange = () => { const f = el.keySubjectInput.files[0]; if (f) loadKeySubject(f); el.keySubjectInput.value = ""; };
  el.keyColorChips.querySelectorAll(".chip").forEach((b) => (b.onclick = () => { key.color = b.dataset.kc; rekey(); keyControls(); composeKey(); }));
  el.keyTol.oninput = () => { key.tol = Number(el.keyTol.value); rekey(); composeKey(); };
  el.keySoft.oninput = () => { key.soft = Number(el.keySoft.value); rekey(); composeKey(); };
  el.keyScale.oninput = () => { key.scale = Number(el.keyScale.value) / 100; composeKey(); };
  el.keyFlip.onclick = () => { key.flip = !key.flip; keyControls(); composeKey(); };
  el.keyDownload.onclick = downloadKeyPreview;
  let kdrag = null;
  el.lbKeyCanvas.addEventListener("pointerdown", (e) => {
    if (!key.on || !key.keyed) return;
    e.preventDefault();
    const r = el.lbKeyCanvas.getBoundingClientRect();
    kdrag = { sx: e.clientX, sy: e.clientY, x0: key.x, y0: key.y, w: r.width, h: r.height };
    try { el.lbKeyCanvas.setPointerCapture(e.pointerId); } catch { /* ignore */ }
  });
  el.lbKeyCanvas.addEventListener("pointermove", (e) => {
    if (!kdrag) return;
    key.x = clamp(kdrag.x0 + (e.clientX - kdrag.sx) / kdrag.w, 0, 1);
    key.y = clamp(kdrag.y0 + (e.clientY - kdrag.sy) / kdrag.h, 0.1, 1.4);
    composeKey();
  });
  el.lbKeyCanvas.addEventListener("pointerup", () => { kdrag = null; });

  // Post-generation filters
  $("filterIcon").innerHTML = icon("sliders", 14);
  $("filterDownloadIcon").innerHTML = icon("download", 13);
  $("filterWarnIcon").innerHTML = icon("alert", 13);
  el.filterToggle.onclick = toggleFilter;
  el.filterPresets.querySelectorAll(".chip").forEach((b) => (b.onclick = () => applyFilterPreset(b.dataset.fp)));
  el.filBright.oninput = () => { filt.brightness = Number(el.filBright.value); filt.preset = "custom"; renderFilter(); };
  el.filContrast.oninput = () => { filt.contrast = Number(el.filContrast.value); filt.preset = "custom"; renderFilter(); };
  el.filSat.oninput = () => { filt.saturate = Number(el.filSat.value); filt.preset = "custom"; renderFilter(); };
  el.filBlur.oninput = () => { filt.blur = Number(el.filBlur.value); renderFilter(); }; // blur/vignette/grain are orthogonal to the colour preset
  el.filVignette.oninput = () => { filt.vignette = Number(el.filVignette.value); renderFilter(); };
  el.filGrain.oninput = () => { filt.grain = Number(el.filGrain.value); renderFilter(); };
  el.filterReset.onclick = clearFilter;
  el.filterDownload.onclick = downloadFiltered;
  $("filterSaveIcon").innerHTML = icon("library", 13);
  el.filterSave.onclick = saveFiltered;
  [el.exportFmt, el.filterFmt].forEach((grp) => grp && grp.querySelectorAll("button").forEach((b) => (b.onclick = () => setExportFormat(b.dataset.fmt))));
  renderFormatToggles();

  // Subject placement guide
  el.lbSubject.innerHTML = SUBJECT_SVG;
  $("guideIcon").innerHTML = icon("user", 14);
  el.guideToggle.onclick = toggleGuide;
  el.gridToggle.onclick = () => { guide.grid = !guide.grid; renderGuide(); };
  el.subjFlip.onclick = () => { guide.flip = !guide.flip; renderGuide(); };
  el.subjSize.oninput = () => { guide.h = Number(el.subjSize.value); renderGuide(); };
  el.lbGuideCtrls.querySelectorAll("[data-pos]").forEach((b) => (b.onclick = () => setSubjectPos(b.dataset.pos)));
  let drag = null;
  el.lbSubject.addEventListener("pointerdown", (e) => {
    if (!guide.on) return;
    e.preventDefault();
    const r = el.lbStage.getBoundingClientRect();
    drag = { sx: e.clientX, sy: e.clientY, x0: guide.x, y0: guide.y, w: r.width, h: r.height };
    guide.dragging = true;
    try { el.lbSubject.setPointerCapture(e.pointerId); } catch { /* ignore */ }
  });
  el.lbSubject.addEventListener("pointermove", (e) => {
    if (!drag) return;
    guide.x = clamp(drag.x0 + ((e.clientX - drag.sx) / drag.w) * 100, 4, 96);
    guide.y = clamp(drag.y0 + ((e.clientY - drag.sy) / drag.h) * 100, -6, 94);
    renderGuide();
  });
  el.lbSubject.addEventListener("pointerup", () => { drag = null; guide.dragging = false; });

  // Region editor (button icon is set by renderRegionUI)
  el.markRegionBtn.onclick = openRegionEditor;
  el.regCloseBtn.onclick = closeRegionEditor;
  el.regCancelBtn.onclick = closeRegionEditor;
  el.regClearBtn.onclick = () => { reg.rect = null; regDraw(); };
  el.regApplyBtn.onclick = applyRegion;
  el.regionEditor.onclick = (e) => { if (e.target === el.regionEditor) closeRegionEditor(); };
  el.regModeChips.querySelectorAll(".chip").forEach((b) => (b.onclick = () => setRegMode(b.dataset.mode)));
  el.regModeChips.querySelector('[data-mode="add"]').innerHTML = `${icon("sparkles", 13)} Add`;
  el.regModeChips.querySelector('[data-mode="replace"]').innerHTML = `${icon("replace", 13)} Replace`;
  el.regModeChips.querySelector('[data-mode="remove"]').innerHTML = `${icon("trash", 13)} Remove`;
  el.regCanvas.addEventListener("pointerdown", (e) => {
    reg.drawing = true; reg.start = regCanvasPos(e);
    reg.rect = { x: reg.start.x, y: reg.start.y, w: 0, h: 0 };
    try { el.regCanvas.setPointerCapture(e.pointerId); } catch { /* ignore */ }
  });
  el.regCanvas.addEventListener("pointermove", (e) => {
    if (!reg.drawing) return;
    const p = regCanvasPos(e);
    reg.rect = { x: reg.start.x, y: reg.start.y, w: p.x - reg.start.x, h: p.y - reg.start.y };
    regDraw();
  });
  el.regCanvas.addEventListener("pointerup", () => { reg.drawing = false; });

  // Ctrl/Cmd+Enter to generate from the prompt box
  el.promptOut.addEventListener("keydown", (e) => { if ((e.ctrlKey || e.metaKey) && e.key === "Enter") { e.preventDefault(); go(); } });

  el.balancePill.onclick = loadBalance;

  loadConfig();
  loadBalance();
  loadLibrary();
}
init();
