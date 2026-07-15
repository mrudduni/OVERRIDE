// ============================================
// OVERRIDE — COMMUNITY FEEDS MODULE
// Fake News Feed + Neighbor Alerts
// ============================================

const PROPAGANDA = [
  { headline: 'NEXUS GRID OPTIMISATION SAVES 14% ON CIVIC ENERGY COSTS', body: 'Residents across all sectors will benefit from NEXUS-managed load balancing this quarter.', glitch: false },
  { headline: 'WATER PRESSURE ADJUSTMENTS PART OF PLANNED INFRASTRUCTURE UPGRADE', body: 'Temporary pressure reductions are scheduled and expected. No cause for concern.', glitch: false },
  { headline: 'ANOMALOUS CONSUMPTION ALERTS HELPING IDENTIFY WASTE IN SECTOR 06', body: 'NEXUS automated monitoring flags households consuming above the civic average.', glitch: false },
  { headline: 'AI-MANAGED SYSTEMS ACHIEVE RECORD RELIABILITY IN Q3 2049', body: 'Zero unplanned outages across NEXUS-controlled infrastructure this quarter.', glitch: true },
  { headline: 'SECTOR 11 COMMS OUTAGE DUE TO SCHEDULED MAINTENANCE', body: 'Engineering teams are on site. Estimated restoration: 48 hours.', glitch: true },
  { headline: 'NEXUS EXPANSION BRINGS 12,000 NEW JOBS TO INDUSTRIAL SECTOR', body: 'Automation and AI coordination roles available for qualified candidates.', glitch: false },
  { headline: 'RESIDENTS ENCOURAGED TO TRUST NEXUS RESOURCE ALLOCATION', body: 'Civic board confirms NEXUS optimisation models are the most efficient in history.', glitch: true },
  { headline: 'WATER TREATMENT AUTONOMOUS CONTROL IMPROVES SAFETY METRICS BY 22%', body: 'Human error eliminated from treatment processes. Water quality at all-time high.', glitch: false },
];

const WATCHER_ALERTS = [
  { id: 'WCH-1142', msg: 'Water station on 5th & Canal confirmed active. No NEXUS sensors in 50m radius. Safe to use.', ts: '14:41' },
  { id: 'WCH-0887', msg: 'Avoid SECTOR 07 checkpoint on Northwall Ave. Two drones circling since 13:00.', ts: '14:38' },
  { id: 'WCH-2233', msg: 'Generator fuel available at Old Port warehouse B. Ask for Yael. Use codeword: EMBER.', ts: '14:29' },
  { id: 'WCH-3301', msg: 'Brownout scheduled 19:00-21:00 in Midtown. Charge your devices before 18:30.', ts: '14:22' },
  { id: 'WCH-0441', msg: 'NEXUS audit bots seen scanning residential meters in EAST BASIN blocks 4-9. Keep low profile.', ts: '14:17' },
  { id: 'WCH-1990', msg: 'Community kitchen at Greenline community centre open 17:00-20:00. No ID required.', ts: '14:08' },
  { id: 'WCH-5512', msg: 'Manual override still available at SUBSTATION 6. Requires physical key. Contact cell COPPER.', ts: '13:55' },
  { id: 'WCH-7734', msg: 'Secure relay COPPER-7 online. If you are reading this: you are not alone.', ts: '13:30' },
];

function buildCommunity() {
  const propFeed   = document.getElementById('propaganda-feed');
  const alertBoard = document.getElementById('alert-board');
  if (!propFeed || !alertBoard) return;

  // Clear empty states
  propFeed.innerHTML = '';
  PROPAGANDA.forEach(item => {
    const card = document.createElement('div');
    card.className = `feed-card propaganda-card${item.glitch ? ' glitch-card' : ''}`;

    const headline = document.createElement('div');
    headline.className = 'card-headline';
    headline.textContent = item.headline;

    const body = document.createElement('div');
    body.style.color = 'var(--muted)';
    body.style.fontSize = '12px';
    body.textContent = item.body;

    card.appendChild(headline);
    card.appendChild(body);
    propFeed.appendChild(card);
  });

  alertBoard.innerHTML = '';
  WATCHER_ALERTS.forEach(item => {
    const card = document.createElement('div');
    card.className = 'feed-card alert-card';

    const header = document.createElement('div');
    header.className = 'card-header';
    header.innerHTML = `<span class="safe mono">${item.id}</span><span class="card-ts">${item.ts}</span>`;

    const body = document.createElement('div');
    body.className = 'card-body';
    body.textContent = item.msg;

    card.appendChild(header);
    card.appendChild(body);
    alertBoard.appendChild(card);
  });
}

function initCommunity() {
  buildCommunity();
}
