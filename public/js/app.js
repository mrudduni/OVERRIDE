// ============================================
// OVERRIDE — MAIN APP ORCHESTRATOR
// ============================================

const BOOT_LINES = [
  '> COPPER LINE TERMINAL v2.049',
  '> LOADING RESISTANCE FIRMWARE...',
  '> SCANNING SECTOR MESH...',
  '> CONNECTING TO WATCHER RELAY NETWORK...',
  '> BYPASSING NEXUS FIREWALL LAYER 1... OK',
  '> BYPASSING NEXUS FIREWALL LAYER 2... OK',
  '> BYPASSING NEXUS FIREWALL LAYER 3... OK',
  '> DECRYPTING RESOURCE TELEMETRY...',
  '> LOADING SECTOR DATA............. 12 SECTORS',
  '> INITIALIZING BREACH MONITOR.....',
  '> WATCHER ID: WCH-7734-ALPHA VERIFIED',
  '> WARNING: THIS TERMINAL CONSUMES REAL RESOURCES',
  '> .',
  '> . .',
  '> . . .',
  '> ACCESS GRANTED. STAY UNSEEN.',
];

document.addEventListener('DOMContentLoaded', function () {

  // Ensure correct initial state
  document.getElementById('landing').classList.remove('hidden');
  document.getElementById('boot-screen').classList.add('hidden');
  document.getElementById('dashboard').classList.add('hidden');

  document.getElementById('init-btn').addEventListener('click', startBoot);

  document.getElementById('uncomfortable-btn').addEventListener('click', () => {
    document.getElementById('uncomfortable-overlay').classList.remove('hidden');
  });
  document.getElementById('uncomfortable-close').addEventListener('click', () => {
    document.getElementById('uncomfortable-overlay').classList.add('hidden');
  });

  document.getElementById('breach-dismiss').addEventListener('click', () => {
    document.getElementById('breach-event').classList.add('hidden');
  });

  document.getElementById('modal-close').addEventListener('click', () => {
    document.getElementById('sector-modal').classList.add('hidden');
  });

  document.getElementById('sector-modal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('sector-modal')) {
      document.getElementById('sector-modal').classList.add('hidden');
    }
  });

});

// ── Boot sequence ─────────────────────────────
function startBoot() {
  document.getElementById('landing').classList.add('hidden');
  const bootScreen = document.getElementById('boot-screen');
  bootScreen.classList.remove('hidden');

  const bootLines = document.getElementById('boot-lines');
  bootLines.innerHTML = '';
  let i = 0;

  function addLine() {
    if (i >= BOOT_LINES.length) {
      setTimeout(launchDashboard, 500);
      return;
    }
    const line = document.createElement('div');
    line.className = 'boot-line';
    line.textContent = BOOT_LINES[i];
    if (BOOT_LINES[i].includes('WARNING')) line.style.color = 'var(--warning)';
    if (BOOT_LINES[i].includes('GRANTED')) line.style.color = 'var(--safe)';
    bootLines.appendChild(line);
    i++;
    setTimeout(addLine, i < 12 ? 130 : 220);
  }

  addLine();
}

function launchDashboard() {
  document.getElementById('boot-screen').classList.add('hidden');
  const dash = document.getElementById('dashboard');
  dash.classList.remove('hidden');
  initAll();
}

// ── Init all modules ─────────────────────────
function initAll() {
  initMap();
  initBreach();
  initSurvival();
  initCommunity();
  initLiteracy();
  initNav();
  initTicker();
  initFooter();
}

// ── Navigation ────────────────────────────────
function initNav() {
  const buttons = document.querySelectorAll('.nav-btn[data-section]');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.section;
      switchSection(target);
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

function switchSection(name) {
  document.querySelectorAll('.section').forEach(s => {
    s.classList.add('hidden');
    s.classList.remove('active');
  });
  const target = document.getElementById('section-' + name);
  if (target) {
    target.classList.remove('hidden');
    target.classList.add('active');
  }
}

// ── Multi-resource ticker ─────────────────────
function initTicker() {
  updateTicker();
  setInterval(updateTicker, 1200);
}

function updateTicker() {
  const s = OVERRIDE_STATE.resources;
  const el = (id) => document.getElementById(id);

  const p = el('tick-power');   if (p) p.textContent = s.power.toFixed(1);
  const w = el('tick-water');   if (w) w.textContent = s.water.toFixed(0);
  const c = el('tick-compute'); if (c) c.textContent = s.compute.toFixed(2);
  const y = el('tick-systems'); if (y) y.textContent = s.systems.toLocaleString();

  // Speed up NEXUS eye pulse with activity
  const intensity = Math.min(1, s.systems / 5000);
  const eyeEl = document.querySelector('.nexus-eye');
  if (eyeEl) eyeEl.style.animationDuration = (2 - intensity * 1.2) + 's';
}

// ── Footer cost widget ────────────────────────
function initFooter() {
  updateFooter();
  setInterval(updateFooter, 1500);
}

function updateFooter() {
  const s = OVERRIDE_STATE.session;
  const h = OVERRIDE_STATE.humans;
  const el = (id) => document.getElementById(id);

  const pow = el('cost-power');   if (pow) pow.textContent = s.power.toFixed(4);
  const wat = el('cost-water');   if (wat) wat.textContent = s.water.toFixed(1);
  const co2 = el('cost-co2');     if (co2) co2.textContent = s.co2.toFixed(4);
  const hci = el('humans-checkin'); if (hci) hci.textContent = h.checkins.toLocaleString();
  const hto = el('humans-total');   if (hto) hto.textContent = h.population.toLocaleString();
}
