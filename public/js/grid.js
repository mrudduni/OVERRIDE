// ============================================
// OVERRIDE — SECTOR GRID DRILL-DOWN MODULE
// Layer 3: individual buildings within a sector
// ============================================

// Building type glyphs — reuse monospace icon language
const BLDG_GLYPHS = {
  residential: '⌂',
  power:       '⚡',
  water:       '💧',
  comms:       '◉',
  civic:       '▣',
};

const BLDG_LABELS = {
  residential: 'RESIDENTIAL',
  power:       'POWER SUBSTATION',
  water:       'WATER STATION',
  comms:       'COMMS TOWER',
  civic:       'CIVIC BUILDING',
};

// Infrastructure types — get heavier border + larger cell
const INFRA_TYPES = new Set(['power', 'water', 'comms']);

let _activeSector    = null;   // currently open sector in the grid view
let _activeBuilding  = null;   // currently open building tooltip

// ── Open the sector grid overlay ─────────────
function openSectorGrid(sector) {
  _activeSector = sector;
  const overlay = document.getElementById('sector-grid-overlay');

  // Breadcrumb
  document.getElementById('grid-breadcrumb').innerHTML =
    `<span class="muted">SECTOR MAP</span>` +
    `<span class="breadcrumb-sep"> &rsaquo; </span>` +
    `<span class="muted">${sector.name}</span>` +
    `<span class="breadcrumb-sep"> &rsaquo; </span>` +
    `<span class="safe">BUILDING GRID</span>`;

  // Header
  document.getElementById('grid-sector-name').textContent = sector.name;
  const sevEl = document.getElementById('grid-sector-severity');
  sevEl.textContent = 'SECTOR STATUS: ' + sector.severity.toUpperCase();
  sevEl.className   = 'mono ' + sector.severity;

  // Build cells
  const grid = document.getElementById('building-grid');
  grid.innerHTML = '';
  _activeBuilding = null;
  hideBuildingTooltip();

  if (!sector.buildings || sector.buildings.length === 0) {
    grid.innerHTML = '<div class="empty-state mono">NO BUILDING DATA FOR THIS SECTOR</div>';
  } else {
    sector.buildings.forEach(bldg => {
      const isInfra = INFRA_TYPES.has(bldg.type);
      const cell    = document.createElement('div');
      cell.className = `bldg-cell ${bldg.status}${isInfra ? ' bldg-infra' : ''}`;
      cell.dataset.id = bldg.id;
      cell.setAttribute('tabindex', '0');
      cell.setAttribute('role', 'button');
      cell.setAttribute('aria-label', `${bldg.label} — ${bldg.type} — ${bldg.status}`);

      const glyph = document.createElement('div');
      glyph.className = 'bldg-glyph mono';
      glyph.textContent = BLDG_GLYPHS[bldg.type] || '▪';

      const name = document.createElement('div');
      name.className = 'bldg-name mono';
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

      grid.appendChild(cell);
    });
  }

  // Sharp-cut transition: hide modal, show grid overlay
  document.getElementById('sector-modal').classList.add('hidden');
  overlay.classList.remove('hidden');
}

// ── Open building tooltip ─────────────────────
function openBuildingTooltip(bldg, anchorEl) {
  hideBuildingTooltip();
  _activeBuilding = bldg;

  const tip = document.getElementById('building-tooltip');

  const resourceStr = bldg.resource
    ? `RESOURCE AFFECTED: <span class="compromised">${bldg.resource.toUpperCase()}</span>`
    : `RESOURCE AFFECTED: <span class="muted">NONE DETECTED</span>`;

  tip.innerHTML = `
    <div class="tip-close mono muted" id="tip-close" role="button" tabindex="0" aria-label="Close tooltip">✕</div>
    <div class="tip-type mono muted">${BLDG_LABELS[bldg.type] || bldg.type.toUpperCase()}</div>
    <div class="tip-name mono ${bldg.status}">${bldg.label}</div>
    <div class="tip-status mono">STATUS: <span class="${bldg.status}">${bldg.status.toUpperCase()}</span></div>
    <div class="tip-resource mono">${resourceStr}</div>
    <div class="tip-comms mono muted">LAST COMMS: ${bldg.lastComms}</div>
  `;

  // Position tooltip near anchor, but keep within overlay bounds
  const gridOverlay = document.getElementById('sector-grid-overlay');
  const overlayRect = gridOverlay.getBoundingClientRect();
  const anchorRect  = anchorEl.getBoundingClientRect();

  tip.style.display = 'block';
  let top  = anchorRect.bottom - overlayRect.top + 8;
  let left = anchorRect.left   - overlayRect.left;

  // Clamp to right edge
  const tipW = 240;
  if (left + tipW > overlayRect.width - 16) {
    left = overlayRect.width - tipW - 16;
  }
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

// ── Close grid → back to sector modal ─────────
function closeSectorGrid() {
  hideBuildingTooltip();
  document.getElementById('sector-grid-overlay').classList.add('hidden');
  if (_activeSector) {
    openSectorModal(_activeSector);
  }
}

// ── Close grid → back to sector map ──────────
function closeSectorGridToMap() {
  hideBuildingTooltip();
  document.getElementById('sector-grid-overlay').classList.add('hidden');
  _activeSector = null;
}

// ── Init ──────────────────────────────────────
function initGrid() {
  document.getElementById('grid-back-btn').addEventListener('click', closeSectorGrid);
  document.getElementById('grid-map-btn').addEventListener('click', closeSectorGridToMap);

  // Clicking overlay background closes tooltip
  document.getElementById('sector-grid-overlay').addEventListener('click', (e) => {
    if (e.target === document.getElementById('sector-grid-overlay') ||
        e.target === document.getElementById('grid-inner')) {
      hideBuildingTooltip();
    }
  });
}
