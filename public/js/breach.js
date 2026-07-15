// ============================================
// OVERRIDE — BREACH LOG MODULE
// ============================================

let breachLogLines = [];
let majorBreachTimeout = null;

function addLogLine(entry) {
  const log = document.getElementById('breach-log');
  if (!log) return;

  // Remove cursor from previous last line
  const prev = log.querySelector('.log-cursor');
  if (prev) prev.remove();

  const now = new Date();
  const ts = now.toTimeString().slice(0, 8);

  const line = document.createElement('div');
  line.className = 'log-line';

  const tsSpan = document.createElement('span');
  tsSpan.className = 'log-ts';
  tsSpan.textContent = '[' + ts + ']';

  const msgSpan = document.createElement('span');
  msgSpan.className = 'log-' + entry.sev;
  msgSpan.textContent = entry.msg;

  line.appendChild(tsSpan);
  line.appendChild(msgSpan);
  log.appendChild(line);

  // Add cursor to end
  const cursor = document.createElement('span');
  cursor.className = 'log-cursor';
  cursor.textContent = ' █';
  log.appendChild(cursor);

  // Auto-scroll
  log.scrollTop = log.scrollHeight;

  breachLogLines.push(entry);
  if (breachLogLines.length > 200) {
    log.removeChild(log.firstChild);
    breachLogLines.shift();
  }
}

function spawnBreachCard(event) {
  const cards = document.getElementById('breach-cards');
  if (!cards) return;

  const card = document.createElement('div');
  card.className = 'breach-card';

  const ascii = document.createElement('pre');
  ascii.className = 'breach-card-ascii';
  ascii.textContent = ASCII.breach;

  const title = document.createElement('div');
  title.className = 'breach-card-title';
  title.textContent = '⚠ ' + event.title;

  const body = document.createElement('div');
  body.className = 'breach-card-body';
  body.textContent = event.body;

  card.appendChild(ascii);
  card.appendChild(title);
  card.appendChild(body);
  cards.prepend(card);

  // Limit cards
  while (cards.children.length > 5) {
    cards.removeChild(cards.lastChild);
  }
}

function showBreachEventOverlay() {
  const event = OVERRIDE_STATE.majorBreaches[Math.floor(Math.random() * OVERRIDE_STATE.majorBreaches.length)];
  const overlay = document.getElementById('breach-event');
  const asciiEl = document.getElementById('breach-event-ascii');
  const textEl  = document.getElementById('breach-event-text');

  asciiEl.textContent = ASCII.breach;
  textEl.innerHTML = `<strong>${event.title}</strong><br/><br/>${event.body}`;

  overlay.classList.remove('hidden');
}

function initBreach() {
  // Seed with initial lines
  const pool = OVERRIDE_STATE.breachPool;
  for (let i = 0; i < 8; i++) {
    addLogLine(pool[Math.floor(Math.random() * pool.length)]);
  }

  // Auto-append log lines
  setInterval(() => {
    const entry = pool[Math.floor(Math.random() * pool.length)];
    addLogLine(entry);

    // Major breach: spawn card for compromised entries
    if (entry.sev === 'compromised' && Math.random() > 0.6) {
      const event = OVERRIDE_STATE.majorBreaches[Math.floor(Math.random() * OVERRIDE_STATE.majorBreaches.length)];
      spawnBreachCard(event);
    }
  }, 3000);

  // Major breach overlay every ~90s
  setInterval(() => {
    showBreachEventOverlay();
  }, 90000 + Math.random() * 30000);

  document.getElementById('breach-dismiss').addEventListener('click', () => {
    document.getElementById('breach-event').classList.add('hidden');
  });
}
