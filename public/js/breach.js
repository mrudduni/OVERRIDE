// ============================================
// OVERRIDE — BREACH FEED MODULE
// Major breach overlay wired into all modules
// ============================================

let breachLogLines      = [];
let lastMajorBreachTime = 0;       // pacing: min 60s between overlays
const MAJOR_BREACH_COOLDOWN = 60000;

// ── Active breach event (set when overlay opens) ──
let _activeBreach = null;

// ── Add a line to the Breach Feed ────────────
function addLogLine(entry) {
  const log = document.getElementById('breach-log');
  if (!log) return;

  const emptyState = log.querySelector('.empty-state');
  if (emptyState) emptyState.remove();

  const prev = log.querySelector('.log-cursor');
  if (prev) prev.remove();

  const now = new Date();
  const ts  = now.toTimeString().slice(0, 8);

  const line    = document.createElement('div');
  line.className = 'log-line';

  const tsSpan  = document.createElement('span');
  tsSpan.className = 'log-ts';
  tsSpan.textContent = '[' + ts + ']';

  const msgSpan = document.createElement('span');
  msgSpan.className = 'log-' + entry.sev;
  msgSpan.textContent = entry.msg;

  line.appendChild(tsSpan);
  line.appendChild(msgSpan);
  log.appendChild(line);

  const cursor = document.createElement('span');
  cursor.className = 'log-cursor';
  cursor.textContent = ' █';
  log.appendChild(cursor);

  log.scrollTop = log.scrollHeight;

  breachLogLines.push(entry);
  if (breachLogLines.length > 200) {
    log.removeChild(log.firstChild);
    breachLogLines.shift();
  }
}

// ── Spawn a breach card in the side panel ────
function spawnBreachCard(event) {
  const cards = document.getElementById('breach-cards');
  if (!cards) return;

  const card  = document.createElement('div');
  card.className = 'breach-card';

  const ascii = document.createElement('pre');
  ascii.className = 'breach-card-ascii';
  ascii.textContent = ASCII.breach;

  const title = document.createElement('div');
  title.className = 'breach-card-title';
  title.textContent = '⚠ ' + event.title;

  const body  = document.createElement('div');
  body.className = 'breach-card-body';
  body.textContent = event.body;

  card.appendChild(ascii);
  card.appendChild(title);
  card.appendChild(body);
  cards.prepend(card);

  while (cards.children.length > 5) cards.removeChild(cards.lastChild);
}

// ── Flash a sector tile to link popup ↔ map ──
function flashSectorTile(sectorId) {
  const tile = document.querySelector(`.sector-tile[data-id="${sectorId}"]`);
  if (!tile) return;
  tile.classList.add('breach-flash');
  // Remove after animation completes (4 flashes × 300ms = ~1.2s + buffer)
  setTimeout(() => tile.classList.remove('breach-flash'), 2000);
}

// ── Jump resource counters for the breach ────
function jumpResourceCounters(impact) {
  if (!impact) return;
  const s = OVERRIDE_STATE.resources;

  if (impact.power)   s.power   += impact.power;
  if (impact.water)   s.water   += impact.water;
  if (impact.systems) s.systems += impact.systems;

  // Visual flash on the ticker elements
  ['tick-power', 'tick-water', 'tick-systems'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.add('ticker-jump');
    setTimeout(() => el.classList.remove('ticker-jump'), 1000);
  });
}

// ── Show the major breach overlay ────────────
function showBreachEventOverlay(event) {
  _activeBreach = event;

  const overlay = document.getElementById('breach-event');
  const asciiEl = document.getElementById('breach-event-ascii');
  const textEl  = document.getElementById('breach-event-text');

  asciiEl.textContent = ASCII.breach;
  textEl.innerHTML    = `<strong>${event.title}</strong><br/><br/>${event.body}`;

  // 1. Mark sector as compromised in shared state
  if (event.sectorId) {
    const sector = OVERRIDE_STATE.sectors.find(s => s.id === event.sectorId);
    if (sector && sector.severity !== 'silent') sector.severity = 'compromised';
  }

  // 2. Rebuild map immediately so tile reflects breach now
  buildMap();

  // 3. Flash the sector tile even while overlay is open
  if (event.sectorId) flashSectorTile(event.sectorId);

  // 4. Jump resource counters
  jumpResourceCounters(event.resourceImpact);

  overlay.classList.remove('hidden');
  lastMajorBreachTime = Date.now();
}

// ── Acknowledge — log to Breach Feed ─────────
function acknowledgeBreach() {
  if (!_activeBreach) return;
  const ts = new Date().toTimeString().slice(0, 8);
  addLogLine({
    sev: 'safe',
    msg: `Acknowledged by Watcher WCH-7734 — [${ts}] — ${_activeBreach.title}`
  });
  // Sector tile stays compromised — not silently reverted
  _activeBreach = null;
  document.getElementById('breach-event').classList.add('hidden');
}

// ── Flag to Neighbor Alerts ──────────────────
function flagBreachToNeighbors() {
  if (!_activeBreach) return;
  const ts = new Date().toTimeString().slice(0, 8);

  // Write acknowledgment line to Breach Feed
  addLogLine({
    sev: 'warning',
    msg: `Flagged to Neighbor Alerts by Watcher WCH-7734 — [${ts}] — ${_activeBreach.title}`
  });

  // Prepend to Neighbor Alerts immediately (no refresh needed)
  addNeighborAlert({
    id:  'WCH-7734',
    msg: '⚠ ' + (_activeBreach.neighborAlert || _activeBreach.title + ' — ' + _activeBreach.body.slice(0, 80) + '...'),
    ts:  ts,
  });

  _activeBreach = null;
  document.getElementById('breach-event').classList.add('hidden');
}

// ── Init ──────────────────────────────────────
function initBreach() {
  const pool = OVERRIDE_STATE.breachPool;

  // Seed initial feed lines
  for (let i = 0; i < 8; i++) {
    addLogLine(pool[Math.floor(Math.random() * pool.length)]);
  }

  // Auto-append log lines every 3s
  setInterval(() => {
    const entry = pool[Math.floor(Math.random() * pool.length)];
    addLogLine(entry);

    // Critical entries trigger the overlay — with pacing cap
    if (entry.critical) {
      const now = Date.now();
      if (now - lastMajorBreachTime >= MAJOR_BREACH_COOLDOWN) {
        // Pick the matching major breach or a random one
        const candidates = OVERRIDE_STATE.majorBreaches;
        const event = candidates[Math.floor(Math.random() * candidates.length)];
        spawnBreachCard(event);
        showBreachEventOverlay(event);
      }
    }
  }, 3000);

  // Wire up the two action buttons
  document.getElementById('breach-acknowledge').addEventListener('click', acknowledgeBreach);
  document.getElementById('breach-flag').addEventListener('click', flagBreachToNeighbors);
}
