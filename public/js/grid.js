// ============================================
// OVERRIDE — SECTOR GRID DRILL-DOWN MODULE
// Clustered map layout with SVG connective lines
// ============================================

const BLDG_GLYPHS = {
  residential: '\u2302',  // ⌂
  power:       '\u26a1',  // ⚡
  water:       '\ud83d\udca7', // 💧
  comms:       '\u25c9',  // ◉
  civic:       '\u25a3',  // ▣
};

const BLDG_LABELS = {
  residential: 'RESIDENTIAL',
  power:       'POWER SUBSTATION',
  water:       'WATER STATION',
  comms:       'COMMS TOWER',
  civic:       'CIVIC BUILDING',
};

// Infrastructure = larger cells, anchor positions
const INFRA_TYPES = new Set(['power', 'water', 'comms']);

// Cell sizes (px) — infra is ~1.6x residential
const SIZE_INFRA = 88;
const SIZE_STD   = 56;

// Severity line colors (reuse palette)
const LINE_COLOR = {
  safe:        'rgba(63,224,197,0.35)',
  warning:     'rgba(255,179,71,0.55)',
  compromised: 'rgba(255,51,102,0.7)',
  silent:      'rgba(107,114,128,0.2)',
};

let _activeSector   = null;
let _activeBuilding = null;
let _svgEl          = null;

// ── Open the sector grid overlay ─────────────
function openSectorGrid(sector) {
  _activeSector = sector;
  hideBuildingTooltip();

  // Breadcrumb
  document.getElementById('grid-breadcrumb').innerHTML =
    `<span class="muted">SECTOR MAP</span>` +
    `<span class="breadcrumb-sep"> \u203a </span>` +
    `<span class="muted">${sector.name}</span>` +
    `<span class="breadcrumb-sep"> \u203a </span>` +
    `<span class="safe">BUILDING GRID</span>`;

  document.getElementById('grid-sector-name').textContent = sector.name;
  const sevEl = document.getElementById('grid-sector-severity');
  sevEl.textContent = 'SECTOR STATUS: ' + sector.severity.toUpperCase();
  sevEl.className   = 'mono ' + sector.severity;

  // Build the canvas
  _buildClusterCanvas(sector);

  // Sharp-cut transition
  document.getElementById('sector-modal').classList.add('hidden');
  document.getElementById('sector-grid-overlay').classList.remove('hidden');
}

// ── Build the cluster canvas ──────────────────
function _buildClusterCanvas(sector) {
  const canvas = document.getElementById('building-canvas');
  canvas.innerHTML = '';

  if (!sector.buildings || sector.buildings.length === 0) {
    canvas.innerHTML = '<div class="empty-state mono" style="position:absolute;top:40%;left:50%;transform:translate(-50%)">NO BUILDING DATA</div>';
    return;
  }

  // Canvas dimensions
  const W = canvas.offsetWidth  || 800;
  const H = canvas.offsetHeight || 520;

  // ── SVG layer for connective lines (behind buildings) ──
  _svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  _svgEl.setAttribute('width',  '100%');
  _svgEl.setAttribute('height', '100%');
  _svgEl.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:1;overflow:visible;';
  canvas.appendChild(_svgEl);

  // ── Build building elements and track positions ──
  const posMap = {}; // id → {cx, cy} center pixels

  sector.buildings.forEach(bldg => {
    const isInfra = INFRA_TYPES.has(bldg.type);
    const size    = isInfra ? SIZE_INFRA : SIZE_STD;

    // Convert percentage pos to pixel, clamped to keep inside canvas
    const px = _posToPixel(bldg.pos || { x: 50, y: 50 }, W, H, size);

    // Track center for SVG lines
    posMap[bldg.id] = { cx: px.left + size / 2, cy: px.top + size / 2 };

    const cell = document.createElement('div');
    cell.className = `bldg-cell ${bldg.status}${isInfra ? ' bldg-infra' : ''}`;
    cell.dataset.id = bldg.id;
    cell.setAttribute('tabindex', '0');
    cell.setAttribute('role', 'button');
    cell.setAttribute('aria-label', `${bldg.label} — ${BLDG_LABELS[bldg.type]} — ${bldg.status}`);
    cell.style.cssText = `
      position: absolute;
      left: ${px.left}px;
      top:  ${px.top}px;
      width:  ${size}px;
      height: ${size}px;
      z-index: 2;
    `;

    const glyph = document.createElement('div');
    glyph.className   = 'bldg-glyph mono';
    glyph.textContent = BLDG_GLYPHS[bldg.type] || '\u25aa';

    const name = document.createElement('div');
    name.className   = 'bldg-name mono';
    name.textContent = bldg.label;

    cell.appendChild(glyph);
    cell.appendChild(name);

    cell.addEventListener('click', (e) => {
      e.stopPropagation();
      openBuildingTooltip(bldg, cell);
    });
    cell.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openBuildingTooltip(bldg, cell);
      }
    });

    canvas.appendChild(cell);
  });

  // ── Draw SVG connective lines ──────────────
  // Wait one frame so posMap center coords are final
  requestAnimationFrame(() => {
    sector.buildings.forEach(bldg => {
      if (!bldg.servedBy) return;
      const from = posMap[bldg.id];
      const to   = posMap[bldg.servedBy];
      if (!from || !to) return;

      // Determine line status: use the infrastructure node's status
      const infraBldg = sector.buildings.find(b => b.id === bldg.servedBy);
      const lineSev   = infraBldg ? infraBldg.status : bldg.status;

      _drawLine(from.cx, from.cy, to.cx, to.cy, lineSev);
    });
  });
}

// ── Draw a single SVG line ────────────────────
function _drawLine(x1, y1, x2, y2, severity) {
  if (!_svgEl) return;
  const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line.setAttribute('x1', x1);
  line.setAttribute('y1', y1);
  line.setAttribute('x2', x2);
  line.setAttribute('y2', y2);
  line.setAttribute('stroke', LINE_COLOR[severity] || LINE_COLOR.safe);
  line.setAttribute('stroke-width', severity === 'compromised' ? '1.5' : '1');
  line.setAttribute('stroke-linecap', 'round');

  if (severity === 'warning') {
    line.classList.add('conn-line-warning');
  } else if (severity === 'compromised') {
    line.classList.add('conn-line-compromised');
    // Dashed flow effect
    line.setAttribute('stroke-dasharray', '6 4');
    line.classList.add('conn-line-flow');
  }

  _svgEl.appendChild(line);
}

// ── Convert percentage pos to absolute pixels ─
function _posToPixel(pos, W, H, size) {
  const padding = 16;
  const usableW = W - padding * 2 - size;
  const usableH = H - padding * 2 - size;
  return {
    left: padding + Math.round((pos.x / 100) * usableW),
    top:  padding + Math.round((pos.y / 100) * usableH),
  };
}

// ── Building tooltip ──────────────────────────
function openBuildingTooltip(bldg, anchorEl) {
  hideBuildingTooltip();
  _activeBuilding = bldg;

  const tip = document.getElementById('building-tooltip');
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
  tip.style.display = 'block';

  // Position relative to the overlay
  const overlay    = document.getElementById('sector-grid-overlay');
  const overlayRect = overlay.getBoundingClientRect();
  const anchorRect  = anchorEl.getBoundingClientRect();

  let top  = anchorRect.bottom - overlayRect.top + 8;
  let left = anchorRect.left   - overlayRect.left;
  const tipW = 240;
  const tipH = 130;

  // Clamp right edge
  if (left + tipW > overlayRect.width - 16)  left = overlayRect.width - tipW - 16;
  // Clamp bottom edge — flip above anchor
  if (top + tipH > overlayRect.height - 16)  top  = anchorRect.top - overlayRect.top - tipH - 8;

  tip.style.top  = top  + 'px';
  tip.style.left = left + 'px';

  document.getElementById('tip-close').addEventListener('click', hideBuildingTooltip);
  document.getElementById('tip-close').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') hideBuildingTooltip();
  });
}

function hideBuildingTooltip() {
  const tip = document.getElementById('building-tooltip');
  if (tip) tip.style.display = 'none';
  _activeBuilding = null;
}

// ── Navigation ────────────────────────────────
function closeSectorGrid() {
  hideBuildingTooltip();
  document.getElementById('sector-grid-overlay').classList.add('hidden');
  if (_activeSector) openSectorModal(_activeSector);
}

function closeSectorGridToMap() {
  hideBuildingTooltip();
  document.getElementById('sector-grid-overlay').classList.add('hidden');
  _activeSector = null;
}

// ── Init ──────────────────────────────────────
function initGrid() {
  document.getElementById('grid-back-btn').addEventListener('click', closeSectorGrid);
  document.getElementById('grid-map-btn').addEventListener('click', closeSectorGridToMap);

  // Close tooltip on canvas background click
  document.getElementById('building-canvas').addEventListener('click', (e) => {
    if (e.target === document.getElementById('building-canvas')) hideBuildingTooltip();
  });
}
