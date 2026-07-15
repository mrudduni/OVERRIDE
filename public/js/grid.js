// ============================================
// OVERRIDE - SECTOR GRID DRILL-DOWN MODULE
// Clustered map layout with SVG connective lines
// ============================================

const BLDG_GLYPHS = {
  residential: "\u2302",
  power: "\u26a1",
  water: "\ud83d\udca7",
  comms: "\u25c9",
  civic: "\u25a3",
};

const BLDG_LABELS = {
  residential: "RESIDENTIAL",
  power: "POWER SUBSTATION",
  water: "WATER STATION",
  comms: "COMMS TOWER",
  civic: "CIVIC BUILDING",
};

const INFRA_TYPES = new Set(["power", "water", "comms"]);
const SIZE_INFRA = 90;
const SIZE_STD = 60;
const GAP = 20; // minimum gap between any two cells

const LINE_COLOR = {
  safe: "rgba(63,224,197,0.35)",
  warning: "rgba(255,179,71,0.55)",
  compromised: "rgba(255,51,102,0.7)",
  silent: "rgba(107,114,128,0.2)",
};

let _activeSector = null;
let _activeBuilding = null;
let _svgEl = null;

// ── Open the sector grid overlay ─────────────
function openSectorGrid(sector) {
  _activeSector = sector;
  hideBuildingTooltip();

  document.getElementById("grid-breadcrumb").innerHTML =
    `<span class="muted">SECTOR MAP</span>` +
    `<span class="breadcrumb-sep"> \u203a </span>` +
    `<span class="muted">${sector.name}</span>` +
    `<span class="breadcrumb-sep"> \u203a </span>` +
    `<span class="safe">BUILDING GRID</span>`;

  document.getElementById("grid-sector-name").textContent = sector.name;
  const sevEl = document.getElementById("grid-sector-severity");
  sevEl.textContent = "SECTOR STATUS: " + sector.severity.toUpperCase();
  sevEl.className = "mono " + sector.severity;

  _buildClusterCanvas(sector);

  document.getElementById("sector-modal").classList.add("hidden");
  document.getElementById("sector-grid-overlay").classList.remove("hidden");
}

// ── Auto-layout: place infra as anchors, cluster residents around them ──
function _computeLayout(buildings, W, H) {
  const PAD = 24;
  const infra = buildings.filter((b) => INFRA_TYPES.has(b.type));
  const rest = buildings.filter((b) => !INFRA_TYPES.has(b.type));

  const placed = {}; // id → {left, top, w, h}

  // ── Step 1: distribute infra nodes evenly across canvas ──
  const cols = Math.ceil(Math.sqrt(infra.length));
  const rows = Math.ceil(infra.length / cols);
  const cellW = (W - PAD * 2) / cols;
  const cellH = (H - PAD * 2) / rows;

  infra.forEach((b, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    // Centre of each zone, with a small deterministic offset per index
    const jitter = ((i * 37) % 28) - 14;
    const cx = PAD + col * cellW + cellW / 2 + jitter;
    const cy = PAD + row * cellH + cellH / 2 + jitter * 0.5;
    placed[b.id] = {
      left: Math.round(cx - SIZE_INFRA / 2),
      top: Math.round(cy - SIZE_INFRA / 2),
      w: SIZE_INFRA,
      h: SIZE_INFRA,
    };
  });

  // ── Step 2: orbit non-infra around their servedBy anchor ──
  // Group by servedBy
  const groups = {};
  rest.forEach((b) => {
    const key = b.servedBy || "__unanchored__";
    if (!groups[key]) groups[key] = [];
    groups[key].push(b);
  });

  Object.entries(groups).forEach(([anchorId, members]) => {
    const anchor = placed[anchorId];
    const anchorCX = anchor ? anchor.left + anchor.w / 2 : W / 2;
    const anchorCY = anchor ? anchor.top + anchor.h / 2 : H / 2;
    const orbitR = SIZE_INFRA / 2 + SIZE_STD / 2 + GAP + 24;
    const angleStep = (2 * Math.PI) / members.length;

    // Start angle offset per anchor to avoid all clusters pointing same way
    const startAngle =
      anchorId === "__unanchored__"
        ? 0
        : anchorId.charCodeAt(anchorId.length - 1) * 0.8;

    members.forEach((b, i) => {
      const angle = startAngle + i * angleStep;
      const cx = anchorCX + orbitR * Math.cos(angle);
      const cy = anchorCY + orbitR * Math.sin(angle);
      placed[b.id] = {
        left: Math.round(cx - SIZE_STD / 2),
        top: Math.round(cy - SIZE_STD / 2),
        w: SIZE_STD,
        h: SIZE_STD,
      };
    });
  });

  // ── Step 3: clamp all cells inside canvas bounds ──
  Object.values(placed).forEach((p) => {
    p.left = Math.max(PAD, Math.min(W - p.w - PAD, p.left));
    p.top = Math.max(PAD, Math.min(H - p.h - PAD, p.top));
  });

  // ── Step 4: collision resolution - push overlapping cells apart ──
  const ids = Object.keys(placed);
  const ITERS = 12;
  for (let iter = 0; iter < ITERS; iter++) {
    for (let a = 0; a < ids.length; a++) {
      for (let b = a + 1; b < ids.length; b++) {
        const pa = placed[ids[a]];
        const pb = placed[ids[b]];
        const overlapX = pa.left + pa.w + GAP - pb.left;
        const overlapY = pa.top + pa.h + GAP - pb.top;
        if (
          overlapX > 0 &&
          overlapY > 0 &&
          pb.left < pa.left + pa.w &&
          pb.top < pa.top + pa.h
        ) {
          // Push along the smaller overlap axis
          const pushX = overlapX / 2;
          const pushY = overlapY / 2;
          if (overlapX < overlapY) {
            pa.left -= pushX;
            pb.left += pushX;
          } else {
            pa.top -= pushY;
            pb.top += pushY;
          }
          // Re-clamp
          pa.left = Math.max(PAD, Math.min(W - pa.w - PAD, pa.left));
          pa.top = Math.max(PAD, Math.min(H - pa.h - PAD, pa.top));
          pb.left = Math.max(PAD, Math.min(W - pb.w - PAD, pb.left));
          pb.top = Math.max(PAD, Math.min(H - pb.h - PAD, pb.top));
        }
      }
    }
  }

  return placed;
}

// ── Build the cluster canvas ──────────────────
function _buildClusterCanvas(sector) {
  const canvas = document.getElementById("building-canvas");
  canvas.innerHTML = "";

  if (!sector.buildings || sector.buildings.length === 0) {
    canvas.innerHTML =
      '<div class="empty-state mono" style="position:absolute;top:40%;left:50%;transform:translate(-50%)">NO BUILDING DATA</div>';
    return;
  }

  const W = canvas.offsetWidth || 860;
  const H = canvas.offsetHeight || 500;

  // SVG layer behind buildings
  _svgEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  _svgEl.setAttribute("width", "100%");
  _svgEl.setAttribute("height", "100%");
  _svgEl.style.cssText =
    "position:absolute;inset:0;pointer-events:none;z-index:1;overflow:visible;";
  canvas.appendChild(_svgEl);

  // Compute collision-free layout
  const layout = _computeLayout(sector.buildings, W, H);

  // Build posMap (center coords) for SVG lines
  const posMap = {};
  Object.entries(layout).forEach(([id, p]) => {
    posMap[id] = { cx: p.left + p.w / 2, cy: p.top + p.h / 2 };
  });

  // Create building cells
  sector.buildings.forEach((bldg) => {
    const isInfra = INFRA_TYPES.has(bldg.type);
    const p = layout[bldg.id];
    if (!p) return;

    const cell = document.createElement("div");
    cell.className = `bldg-cell ${bldg.status}${isInfra ? " bldg-infra" : ""}`;
    cell.dataset.id = bldg.id;
    cell.setAttribute("tabindex", "0");
    cell.setAttribute("role", "button");
    cell.setAttribute(
      "aria-label",
      `${bldg.label} \u2014 ${BLDG_LABELS[bldg.type]} \u2014 ${bldg.status}`,
    );
    cell.style.cssText = `
      position: absolute;
      left: ${p.left}px;
      top:  ${p.top}px;
      width:  ${p.w}px;
      height: ${p.h}px;
      z-index: 2;
    `;

    const glyph = document.createElement("div");
    glyph.className = "bldg-glyph mono";
    glyph.textContent = BLDG_GLYPHS[bldg.type] || "\u25aa";

    const name = document.createElement("div");
    name.className = "bldg-name mono";
    name.textContent = bldg.label;

    cell.appendChild(glyph);
    cell.appendChild(name);

    cell.addEventListener("click", (e) => {
      e.stopPropagation();
      openBuildingTooltip(bldg, cell);
    });
    cell.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openBuildingTooltip(bldg, cell);
      }
    });

    canvas.appendChild(cell);
  });

  // Draw SVG lines after DOM paint
  requestAnimationFrame(() => {
    sector.buildings.forEach((bldg) => {
      if (!bldg.servedBy) return;
      const from = posMap[bldg.id];
      const to = posMap[bldg.servedBy];
      if (!from || !to) return;
      const infraBldg = sector.buildings.find((b) => b.id === bldg.servedBy);
      const lineSev = infraBldg ? infraBldg.status : bldg.status;
      _drawLine(from.cx, from.cy, to.cx, to.cy, lineSev);
    });
  });
}

// ── Draw a single SVG line ────────────────────
function _drawLine(x1, y1, x2, y2, severity) {
  if (!_svgEl) return;
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", x1);
  line.setAttribute("y1", y1);
  line.setAttribute("x2", x2);
  line.setAttribute("y2", y2);
  line.setAttribute("stroke", LINE_COLOR[severity] || LINE_COLOR.safe);
  line.setAttribute("stroke-width", severity === "compromised" ? "1.5" : "1");
  line.setAttribute("stroke-linecap", "round");
  if (severity === "warning") {
    line.classList.add("conn-line-warning");
  } else if (severity === "compromised") {
    line.setAttribute("stroke-dasharray", "6 4");
    line.classList.add("conn-line-compromised", "conn-line-flow");
  }
  _svgEl.appendChild(line);
}

// ── Building tooltip ──────────────────────────
function openBuildingTooltip(bldg, anchorEl) {
  hideBuildingTooltip();
  _activeBuilding = bldg;

  const tip = document.getElementById("building-tooltip");
  const resourceStr = bldg.resource
    ? `RESOURCE AFFECTED: <span class="compromised">${bldg.resource.toUpperCase()}</span>`
    : `RESOURCE AFFECTED: <span class="muted">NONE DETECTED</span>`;

  tip.innerHTML = `
    <div class="tip-close mono muted" id="tip-close" role="button" tabindex="0" aria-label="Close tooltip">\u2715</div>
    <div class="tip-type mono muted">${BLDG_LABELS[bldg.type] || bldg.type.toUpperCase()}</div>
    <div class="tip-name mono ${bldg.status}">${bldg.label}</div>
    <div class="tip-status mono">STATUS: <span class="${bldg.status}">${bldg.status.toUpperCase()}</span></div>
    <div class="tip-resource mono">${resourceStr}</div>
    <div class="tip-comms mono muted">LAST COMMS: ${bldg.lastComms}</div>
  `;
  tip.style.display = "block";

  const overlay = document.getElementById("sector-grid-overlay");
  const overlayRect = overlay.getBoundingClientRect();
  const anchorRect = anchorEl.getBoundingClientRect();

  let top = anchorRect.bottom - overlayRect.top + 8;
  let left = anchorRect.left - overlayRect.left;
  const tipW = 240;
  const tipH = 140;

  if (left + tipW > overlayRect.width - 16)
    left = overlayRect.width - tipW - 16;
  if (top + tipH > overlayRect.height - 16)
    top = anchorRect.top - overlayRect.top - tipH - 8;

  tip.style.top = top + "px";
  tip.style.left = left + "px";

  document
    .getElementById("tip-close")
    .addEventListener("click", hideBuildingTooltip);
  document.getElementById("tip-close").addEventListener("keydown", (e) => {
    if (e.key === "Enter") hideBuildingTooltip();
  });
}

function hideBuildingTooltip() {
  const tip = document.getElementById("building-tooltip");
  if (tip) tip.style.display = "none";
  _activeBuilding = null;
}

// ── Navigation ────────────────────────────────
function closeSectorGrid() {
  hideBuildingTooltip();
  document.getElementById("sector-grid-overlay").classList.add("hidden");
  if (_activeSector) openSectorModal(_activeSector);
}

function closeSectorGridToMap() {
  hideBuildingTooltip();
  document.getElementById("sector-grid-overlay").classList.add("hidden");
  _activeSector = null;
}

// ── Init ──────────────────────────────────────
function initGrid() {
  document
    .getElementById("grid-back-btn")
    .addEventListener("click", closeSectorGrid);
  document
    .getElementById("grid-map-btn")
    .addEventListener("click", closeSectorGridToMap);

  document.getElementById("building-canvas").addEventListener("click", (e) => {
    if (e.target === document.getElementById("building-canvas"))
      hideBuildingTooltip();
  });
}
