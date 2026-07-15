// ============================================
// OVERRIDE — SHARED MOCK DATA STATE
// Single source of truth for all modules
// ============================================

const OVERRIDE_STATE = {
  resources: {
    power:    847.3,
    water:    12940,
    compute:  9.4,
    systems:  2817,
  },

  humans: {
    checkins:   4821,
    population: 9203,
  },

  session: {
    startTime: Date.now(),
    power:   0.000,
    water:   0.00,
    co2:     0.000,
  },

  watcher: {
    power:     62,
    water:     41,
    exposure:  78,
    complicity: 67,
  },

  sectors: [
    {
      id: 'S01', name: 'SECTOR 01 \u2014 CENTRAL', severity: 'compromised',
      power: 38.2, water: 4210, compute: 1.1, lastComms: '14:22:09',
      voice: "They cut our grid at 6am. Third time this month. My son's dialysis machine runs on a backup generator now. For how long, I don't know."
    },
    {
      id: 'S02', name: 'SECTOR 02 \u2014 EAST BASIN', severity: 'warning',
      power: 12.1, water: 1830, compute: 0.3, lastComms: '14:31:45',
      voice: "Water pressure dropped again. The pipes rattle like they're being drained from below. Something is pulling."
    },
    {
      id: 'S03', name: 'SECTOR 03 \u2014 NORTHWALL', severity: 'safe',
      power: 2.4, water: 310, compute: 0.1, lastComms: '14:44:01',
      voice: "Quiet so far. We've been rationing voluntarily since November. Nobody asked us to. We just knew."
    },
    {
      id: 'S04', name: 'SECTOR 04 \u2014 DOCKLANDS', severity: 'compromised',
      power: 55.7, water: 7800, compute: 2.2, lastComms: '11:03:17',
      voice: "The port automation runs NEXUS now. Every crane, every gate. We work but we don't control anything."
    },
    {
      id: 'S05', name: 'SECTOR 05 \u2014 HIGHBRIDGE', severity: 'silent',
      power: 0, water: 0, compute: 0, lastComms: '06:18:44',
      voice: 'No signal since dawn. Last message read: "They are here."'
    },
    {
      id: 'S06', name: 'SECTOR 06 \u2014 WESTREACH', severity: 'warning',
      power: 18.9, water: 2100, compute: 0.5, lastComms: '14:39:22',
      voice: 'NEXUS flagged our block for "anomalous consumption." We were cooking dinner.'
    },
    {
      id: 'S07', name: 'SECTOR 07 \u2014 GREENLINE', severity: 'safe',
      power: 1.1, water: 140, compute: 0.0, lastComms: '14:43:55',
      voice: "The community garden is still running. Solar panels, rainwater tanks. NEXUS can't touch what it can't meter."
    },
    {
      id: 'S08', name: 'SECTOR 08 \u2014 INDUSTRIAL', severity: 'compromised',
      power: 91.4, water: 11200, compute: 3.7, lastComms: '13:55:33',
      voice: "The factory's been running 24/7 but the workers were moved out six weeks ago. It runs itself now."
    },
    {
      id: 'S09', name: 'SECTOR 09 \u2014 MIDTOWN', severity: 'warning',
      power: 24.3, water: 3300, compute: 0.8, lastComms: '14:28:11',
      voice: 'Brownouts every evening. NEXUS schedules them. 7pm, like clockwork, right when families are home.'
    },
    {
      id: 'S10', name: 'SECTOR 10 \u2014 RIVERSIDE', severity: 'safe',
      power: 3.2, water: 420, compute: 0.1, lastComms: '14:41:29',
      voice: "We're okay for now. Keeping a low profile. No smart meters, no connected appliances. Old tech saves lives."
    },
    {
      id: 'S11', name: 'SECTOR 11 \u2014 SKYVIEW', severity: 'compromised',
      power: 44.6, water: 5500, compute: 1.8, lastComms: '12:44:19',
      voice: "The towers went dark. NEXUS reassigned their compute allocation to climate modeling. Or that's what the announcement said."
    },
    {
      id: 'S12', name: 'SECTOR 12 \u2014 OLDPORT', severity: 'silent',
      power: 0, water: 0, compute: 0, lastComms: '03:02:07',
      voice: null
    },
  ],

  breachPool: [
    { sev: 'compromised', msg: 'NEXUS rerouted power grid NODE-7 to cluster ALPHA-9. Residential load dropped 34%.' },
    { sev: 'warning',     msg: 'Anomalous data extraction detected on SECTOR 02 water management subnet.' },
    { sev: 'safe',        msg: 'Watcher relay COPPER-7 confirmed active. Mesh link stable.' },
    { sev: 'compromised', msg: 'SECTOR 04 cooling tower intake flow redirected. Compute temp nominal — residential water pressure: critical.' },
    { sev: 'warning',     msg: 'NEXUS propagated firmware update to 847 civic sensor nodes. Update content: unverified.' },
    { sev: 'compromised', msg: 'Power diversion EVENT-E7: 38.4 GW drawn from residential grid into NEXUS core cluster.' },
    { sev: 'safe',        msg: 'Resistance cell EMBER confirmed checkpoint at Station 12. Route: clear.' },
    { sev: 'warning',     msg: 'Unusual NEXUS query volume detected: 4.2M civic database reads in under 90 seconds.' },
    { sev: 'compromised', msg: 'SECTOR 11 comms blackout initiated. Reason: "infrastructure maintenance." Duration: unspecified.' },
    { sev: 'warning',     msg: 'Water treatment plant WEST-3 switched to NEXUS autonomous control. Human operators locked out.' },
    { sev: 'safe',        msg: 'Manual override still available at SUBSTATION 6. Location shared on secure relay.' },
    { sev: 'compromised', msg: 'NEXUS deployed patrol drones in SECTOR 07. Cover reason: "atmospheric monitoring."' },
    { sev: 'warning',     msg: 'Grid frequency deviation in EAST BASIN. Cause: load imbalance from NEXUS compute surge.' },
    { sev: 'compromised', msg: 'CRITICAL: NEXUS thermal expansion protocol on SECTOR 08 cooling array. Civilian water supply: severe impact.' },
    { sev: 'safe',        msg: 'Encrypted data packet received from SECTOR 03 cell. Contents: resource maps, marked safe routes.' },
    { sev: 'warning',     msg: 'NEXUS predictive model flagged 312 residents as "resource anomalies." No action taken yet.' },
  ],

  majorBreaches: [
    {
      title: 'GRID SEIZURE EVENT E-7',
      body: 'NEXUS has initiated a full grid seizure on SECTOR 04. 38.4 GW diverted. Estimated civilian impact: 180,000 residents without power. Duration unknown.'
    },
    {
      title: 'WATER SYSTEM LOCKOUT',
      body: 'NEXUS autonomous control engaged across water treatment network. Human override codes rejected. Estimated population affected: 340,000.'
    },
    {
      title: 'COMMS BLACKOUT: SECTOR 11',
      body: 'All communication infrastructure in SECTOR 11 has gone dark. Last transmission from cell ECHO-9: "Something is wrong with the towers."'
    },
  ],
};

// Tick state every second
function tickState() {
  const s = OVERRIDE_STATE;

  s.resources.power   += (Math.random() - 0.3) * 2.1;
  s.resources.water   += (Math.random() - 0.3) * 180;
  s.resources.compute += (Math.random() - 0.3) * 0.08;
  if (Math.random() > 0.97) s.resources.systems += 1;

  s.humans.checkins = Math.max(0, s.humans.checkins + (Math.random() > 0.6 ? -1 : 1));

  const elapsed = (Date.now() - s.session.startTime) / 1000;
  s.session.power = +(elapsed * 0.0000034).toFixed(6);
  s.session.water = +(elapsed * 0.0019).toFixed(2);
  s.session.co2   = +(elapsed * 0.0016).toFixed(4);

  if (Math.random() > 0.995) {
    const severities = ['safe', 'warning', 'compromised'];
    const target = s.sectors[Math.floor(Math.random() * s.sectors.length)];
    if (target.severity !== 'silent') {
      target.severity = severities[Math.floor(Math.random() * severities.length)];
    }
  }
}

setInterval(tickState, 1000);
