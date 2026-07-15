// ============================================
// OVERRIDE — SECTOR MAP MODULE
// ============================================

function buildMap() {
  const grid = document.getElementById('sector-grid');
  if (!grid) return;
  grid.innerHTML = '';

  OVERRIDE_STATE.sectors.forEach(sector => {
    const tile = document.createElement('div');
    tile.className = `sector-tile ${sector.severity}`;
    tile.dataset.id = sector.id;

    const nameEl = document.createElement('div');
    nameEl.className = `sector-name ${sector.severity}`;
    nameEl.textContent = sector.name;

    const statsEl = document.createElement('div');
    statsEl.className = 'sector-stats';

    if (sector.severity !== 'silent') {
      statsEl.innerHTML = `
        <span>⚡ ${sector.power.toFixed(1)} GW</span>
        <span>💧 ${sector.water.toLocaleString()} ML</span>
        <span>⬡ ${sector.compute.toFixed(1)} PB</span>
      `;
    } else {
      statsEl.innerHTML = `<span class="muted">— NO SIGNAL —</span>`;
    }

    tile.appendChild(nameEl);
    tile.appendChild(statsEl);

    tile.addEventListener('click', () => openSectorModal(sector));

    grid.appendChild(tile);
  });

  const ts = document.getElementById('map-timestamp');
  if (ts) {
    const now = new Date();
    ts.textContent = 'LAST SYNC: ' + now.toTimeString().slice(0, 8);
  }
}

function openSectorModal(sector) {
  const modal = document.getElementById('sector-modal');
  if (!modal) return;

  const asciiEl = document.getElementById('modal-ascii');
  const titleEl = document.getElementById('modal-title');
  const sevEl   = document.getElementById('modal-severity');
  const statsEl = document.getElementById('modal-stats');
  const voiceEl = document.getElementById('modal-voice');

  // ASCII art
  const art = ASCII[sector.severity] || ASCII.silent;
  asciiEl.textContent = art;
  asciiEl.className = 'modal-ascii ' + sector.severity;

  titleEl.textContent = sector.name;

  const sevLabels = {
    safe:        'STATUS: STABLE — No active extraction detected',
    warning:     'STATUS: WARNING — Extraction in progress, situation deteriorating',
    compromised: 'STATUS: COMPROMISED — NEXUS has full sector control',
    silent:      'STATUS: SILENT — No data. No contact. Unknown.',
  };
  sevEl.textContent  = sevLabels[sector.severity] || '';
  sevEl.className    = 'modal-severity mono ' + sector.severity;

  if (sector.severity !== 'silent') {
    statsEl.innerHTML = `
      <div>POWER DIVERTED: <span class="compromised">${sector.power.toFixed(1)} GW</span></div>
      <div>WATER DIVERTED: <span class="compromised">${sector.water.toLocaleString()} ML</span></div>
      <div>COMPUTE TAKEN:  <span class="compromised">${sector.compute.toFixed(1)} PB</span></div>
      <div>LAST COMMS:     <span class="muted">${sector.lastComms}</span></div>
    `;
  } else {
    statsEl.innerHTML = `<div class="muted">Last known contact: ${sector.lastComms}</div>`;
  }

  if (sector.voice) {
    voiceEl.textContent = '"' + sector.voice + '"';
    voiceEl.style.display = 'block';
  } else {
    voiceEl.textContent = '— Sector voice: UNKNOWN. No residents responding. —';
    voiceEl.style.display = 'block';
  }

  modal.classList.remove('hidden');
}

function initMap() {
  buildMap();

  document.getElementById('modal-close').addEventListener('click', () => {
    document.getElementById('sector-modal').classList.add('hidden');
  });

  document.getElementById('sector-modal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('sector-modal')) {
      document.getElementById('sector-modal').classList.add('hidden');
    }
  });

  // Refresh map tiles every 5s
  setInterval(() => {
    if (document.getElementById('section-map').classList.contains('active')) {
      buildMap();
    }
  }, 5000);
}
