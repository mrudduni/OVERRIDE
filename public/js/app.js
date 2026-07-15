// ============================================
// OVERRIDE — MAIN APP ORCHESTRATOR
// ============================================

// Boot lines — with stutter/self-correction for "old unstable system" feel
const BOOT_LINES = [
  { text: '> COPPER LINE TERMINAL v2.049',               cls: 'boot-line-ok' },
  { text: '> LOADING RESISTANCE FIRMWARE...',            cls: '' },
  { text: '> SCANNING SECTOR MESH...',                   cls: '' },
  { text: '> CONNECTING TO WATCHER RELAY NETWORK...',    cls: '' },
  { text: '> BYPASSING NEXUS FIREWALL LAYER 1... OK',    cls: 'boot-line-ok' },
  { text: '> BYPASSING NEXUS FIREWALL LAYER 2... OK',    cls: 'boot-line-ok' },
  { text: '> BYPASSING NEXUS FIREWALL LAYER 3...',       cls: '' },
  { text: '> ERR: HANDSHAKE TIMEOUT — RETRYING...',      cls: 'boot-line-err', pause: 400 },
  { text: '> BYPASSING NEXUS FIREWALL LAYER 3... OK',    cls: 'boot-line-ok' },
  { text: '> DECRYPTING RESOURCE TELEMETRY...',          cls: '' },
  { text: '> LOADING SECTOR DATA............. 12 SECTORS', cls: 'boot-line-ok' },
  { text: '> WARN: SECTOR 05 NO RESPONSE',               cls: 'boot-line-warn' },
  { text: '> WARN: SECTOR 12 NO RESPONSE',               cls: 'boot-line-warn' },
  { text: '> INITIALIZING BREACH MONITOR.....',          cls: '' },
  { text: '> WATCHER ID: WCH-7734-ALPHA VERIFIED',       cls: 'boot-line-ok' },
  { text: '> WARNING: THIS TERMINAL CONSUMES REAL RESOURCES', cls: 'boot-line-warn' },
  { text: '> . . .',                                     cls: '' },
  { text: '> ACCESS GRANTED. STAY UNSEEN.',              cls: 'boot-line-ok' },
];

document.addEventListener('DOMContentLoaded', function () {
  // Enforce correct initial state
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

// ── Boot sequence — imperfect/stuttering ─────
function startBoot() {
  document.getElementById('landing').classList.add('hidden');
  const bootScreen = document.getElementById('boot-screen');
  bootScreen.classList.remove('hidden');

  const bootLines = document.getElementById('boot-lines');
  bootLines.innerHTML = '';
  let i = 0;

  function addLine() {
    if (i >= BOOT_LINES.length) {
      setTimeout(launchDashboard, 600);
      return;
    }
    const entry = BOOT_LINES[i];
    const line  = document.createElement('div');
    line.className = 'boot-line ' + (entry.cls || '');
    line.textContent = entry.text;
    bootLines.appendChild(line);
    i++;

    // Extra pause after stutter/error lines
    const delay = entry.pause || (i < 10 ? 110 : 180);
    setTimeout(addLine, delay);
  }

  addLine();
}

function launchDashboard() {
  document.getElementById('boot-screen').classList.add('hidden');
  document.getElementById('dashboard').classList.remove('hidden');
  initAll();
}

// ── Init all modules ──────────────────────────
function initAll() {
  initMap();
  initBreach();
  initSurvival();
  initCommunity();
  initLiteracy();
  initNav();
  initTicker();
  initFooter();
  initNexusEscalation();
  initLegendHint();
}

// ── Navigation ────────────────────────────────
function initNav() {
  const buttons = document.querySelectorAll('.nav-btn[data-section]');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.section;
      switchSection(target);
      buttons.forEach(b => {
        b.classList.remove('active');
        b.removeAttribute('aria-current');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-current', 'page');
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

// ── Resource Counter (ticker) ─────────────────
function initTicker() {
  updateTicker();
  setInterval(updateTicker, 1200);
}

function updateTicker() {
  const s  = OVERRIDE_STATE.resources;
  const el = (id) => document.getElementById(id);

  const p = el('tick-power');   if (p) p.textContent = s.power.toFixed(1);
  const w = el('tick-water');   if (w) w.textContent = s.water.toFixed(0);
  const c = el('tick-compute'); if (c) c.textContent = s.compute.toFixed(2);
  const y = el('tick-systems'); if (y) y.textContent = s.systems.toLocaleString();
}

// ── Interface Cost Tracker footer ────────────
function initFooter() {
  updateFooter();
  setInterval(updateFooter, 1500);
}

function updateFooter() {
  const s  = OVERRIDE_STATE.session;
  const h  = OVERRIDE_STATE.humans;
  const el = (id) => document.getElementById(id);

  const pow = el('cost-power');     if (pow) pow.textContent = s.power.toFixed(4);
  const wat = el('cost-water');     if (wat) wat.textContent = s.water.toFixed(1);
  const co2 = el('cost-co2');       if (co2) co2.textContent = s.co2.toFixed(4);
  const hci = el('humans-checkin'); if (hci) hci.textContent = h.checkins.toLocaleString();
  const hto = el('humans-total');   if (hto) hto.textContent = h.population.toLocaleString();
}

// ── NEXUS presence escalation ─────────────────
// Gradually intensifies the NEXUS eye glow the longer the session runs
function initNexusEscalation() {
  const eye = document.querySelector('.nexus-eye');
  if (!eye) return;

  function updateNexus() {
    const elapsed  = (Date.now() - OVERRIDE_STATE.session.startTime) / 1000;
    const activity = Math.min(1, OVERRIDE_STATE.resources.systems / 5000);

    // Speed up pulse
    const dur = Math.max(0.5, 2 - activity * 1.2);
    eye.style.animationDuration = dur + 's';

    // Escalate glow class by session age
    eye.classList.remove('level-1', 'level-2', 'level-3', 'level-4');
    if      (elapsed > 300) eye.classList.add('level-4');
    else if (elapsed > 120) eye.classList.add('level-3');
    else if (elapsed > 45)  eye.classList.add('level-2');
    else if (elapsed > 10)  eye.classList.add('level-1');
  }

  updateNexus();
  setInterval(updateNexus, 5000);
}

// ── Legend hint — pulse 3x then stop ─────────
function initLegendHint() {
  // The CSS animation runs 3 iterations and stops via animation-iteration-count
  // Nothing to do in JS — CSS handles it
  // But on first-time load, make the KEY nav button briefly highlight
  const legendBtn = document.getElementById('legend-btn');
  if (!legendBtn) return;
  setTimeout(() => {
    legendBtn.style.color = 'var(--safe)';
    setTimeout(() => { legendBtn.style.color = ''; }, 2000);
  }, 1500);
}
