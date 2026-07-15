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
      voice: "They cut our grid at 6am. Third time this month. My son's dialysis machine runs on a backup generator now. For how long, I don't know.",
      buildings: [
        { id: 'b01', type: 'residential',    label: 'RES BLOCK A',   status: 'compromised', resource: 'power',   lastComms: '14:21:02' },
        { id: 'b02', type: 'residential',    label: 'RES BLOCK B',   status: 'warning',     resource: 'power',   lastComms: '14:22:09' },
        { id: 'b03', type: 'power',          label: 'SUBSTATION 1',  status: 'compromised', resource: 'power',   lastComms: '14:18:44' },
        { id: 'b04', type: 'residential',    label: 'RES BLOCK C',   status: 'warning',     resource: null,      lastComms: '14:20:33' },
        { id: 'b05', type: 'water',          label: 'WATER STN 01',  status: 'compromised', resource: 'water',   lastComms: '14:19:01' },
        { id: 'b06', type: 'residential',    label: 'RES BLOCK D',   status: 'safe',        resource: null,      lastComms: '14:22:01' },
        { id: 'b07', type: 'civic',          label: 'ADMIN CENTRE',  status: 'warning',     resource: 'compute', lastComms: '14:17:55' },
        { id: 'b08', type: 'comms',          label: 'COMMS TOWER A', status: 'compromised', resource: 'compute', lastComms: '14:10:03' },
        { id: 'b09', type: 'residential',    label: 'RES BLOCK E',   status: 'safe',        resource: null,      lastComms: '14:22:07' },
        { id: 'b10', type: 'residential',    label: 'RES BLOCK F',   status: 'warning',     resource: null,      lastComms: '14:21:44' },
        { id: 'b11', type: 'power',          label: 'SUBSTATION 2',  status: 'compromised', resource: 'power',   lastComms: '14:09:12' },
        { id: 'b12', type: 'civic',          label: 'MEDICAL CTR',   status: 'warning',     resource: 'power',   lastComms: '14:20:19' },
      ]
    },
    {
      id: 'S02', name: 'SECTOR 02 \u2014 EAST BASIN', severity: 'warning',
      power: 12.1, water: 1830, compute: 0.3, lastComms: '14:31:45',
      voice: "Water pressure dropped again. The pipes rattle like they're being drained from below. Something is pulling.",
      buildings: [
        { id: 'b01', type: 'residential',    label: 'RES BLOCK A',   status: 'safe',        resource: null,      lastComms: '14:31:10' },
        { id: 'b02', type: 'water',          label: 'WATER STN 02',  status: 'compromised', resource: 'water',   lastComms: '14:28:33' },
        { id: 'b03', type: 'residential',    label: 'RES BLOCK B',   status: 'safe',        resource: null,      lastComms: '14:31:44' },
        { id: 'b04', type: 'residential',    label: 'RES BLOCK C',   status: 'warning',     resource: 'water',   lastComms: '14:30:22' },
        { id: 'b05', type: 'power',          label: 'SUBSTATION 3',  status: 'warning',     resource: 'power',   lastComms: '14:29:11' },
        { id: 'b06', type: 'civic',          label: 'BASIN CTRL',    status: 'compromised', resource: 'water',   lastComms: '14:25:08' },
        { id: 'b07', type: 'residential',    label: 'RES BLOCK D',   status: 'safe',        resource: null,      lastComms: '14:31:41' },
        { id: 'b08', type: 'residential',    label: 'RES BLOCK E',   status: 'warning',     resource: null,      lastComms: '14:30:55' },
        { id: 'b09', type: 'comms',          label: 'RELAY NODE B',  status: 'safe',        resource: null,      lastComms: '14:31:45' },
        { id: 'b10', type: 'residential',    label: 'RES BLOCK F',   status: 'safe',        resource: null,      lastComms: '14:31:38' },
      ]
    },
    {
      id: 'S03', name: 'SECTOR 03 \u2014 NORTHWALL', severity: 'safe',
      power: 2.4, water: 310, compute: 0.1, lastComms: '14:44:01',
      voice: "Quiet so far. We've been rationing voluntarily since November. Nobody asked us to. We just knew.",
      buildings: [
        { id: 'b01', type: 'residential',    label: 'RES BLOCK A',   status: 'safe',        resource: null,      lastComms: '14:44:01' },
        { id: 'b02', type: 'residential',    label: 'RES BLOCK B',   status: 'safe',        resource: null,      lastComms: '14:43:59' },
        { id: 'b03', type: 'water',          label: 'WATER STN 03',  status: 'safe',        resource: null,      lastComms: '14:43:55' },
        { id: 'b04', type: 'power',          label: 'SUBSTATION 4',  status: 'safe',        resource: null,      lastComms: '14:43:48' },
        { id: 'b05', type: 'residential',    label: 'RES BLOCK C',   status: 'safe',        resource: null,      lastComms: '14:44:00' },
        { id: 'b06', type: 'civic',          label: 'COMMUNITY CTR', status: 'safe',        resource: null,      lastComms: '14:43:50' },
        { id: 'b07', type: 'residential',    label: 'RES BLOCK D',   status: 'warning',     resource: null,      lastComms: '14:42:11' },
        { id: 'b08', type: 'comms',          label: 'RELAY NODE C',  status: 'safe',        resource: null,      lastComms: '14:44:01' },
      ]
    },
    {
      id: 'S04', name: 'SECTOR 04 \u2014 DOCKLANDS', severity: 'compromised',
      power: 55.7, water: 7800, compute: 2.2, lastComms: '11:03:17',
      voice: "The port automation runs NEXUS now. Every crane, every gate. We work but we don't control anything.",
      buildings: [
        { id: 'b01', type: 'power',          label: 'SUBSTATION 5',  status: 'compromised', resource: 'power',   lastComms: '11:02:44' },
        { id: 'b02', type: 'civic',          label: 'PORT CTRL',     status: 'compromised', resource: 'compute', lastComms: '11:00:01' },
        { id: 'b03', type: 'residential',    label: 'DOCK HOUSING A',status: 'warning',     resource: 'power',   lastComms: '11:03:10' },
        { id: 'b04', type: 'water',          label: 'WATER STN 04',  status: 'compromised', resource: 'water',   lastComms: '10:58:32' },
        { id: 'b05', type: 'comms',          label: 'COMMS TOWER B', status: 'compromised', resource: 'compute', lastComms: '10:55:19' },
        { id: 'b06', type: 'residential',    label: 'DOCK HOUSING B',status: 'warning',     resource: null,      lastComms: '11:03:17' },
        { id: 'b07', type: 'civic',          label: 'WAREHOUSE OPS', status: 'compromised', resource: 'compute', lastComms: '10:49:07' },
        { id: 'b08', type: 'residential',    label: 'DOCK HOUSING C',status: 'safe',        resource: null,      lastComms: '11:03:12' },
        { id: 'b09', type: 'power',          label: 'SUBSTATION 6',  status: 'compromised', resource: 'power',   lastComms: '10:44:00' },
        { id: 'b10', type: 'civic',          label: 'CRANE SYS HUB', status: 'compromised', resource: 'power',   lastComms: '10:41:22' },
      ]
    },
    {
      id: 'S05', name: 'SECTOR 05 \u2014 HIGHBRIDGE', severity: 'silent',
      power: 0, water: 0, compute: 0, lastComms: '06:18:44',
      voice: 'No signal since dawn. Last message read: "They are here."',
      buildings: [
        { id: 'b01', type: 'residential',    label: 'RES BLOCK A',   status: 'silent',      resource: null,      lastComms: '06:17:22' },
        { id: 'b02', type: 'power',          label: 'SUBSTATION 7',  status: 'silent',      resource: null,      lastComms: '06:10:04' },
        { id: 'b03', type: 'comms',          label: 'COMMS TOWER C', status: 'silent',      resource: null,      lastComms: '06:18:44' },
        { id: 'b04', type: 'residential',    label: 'RES BLOCK B',   status: 'silent',      resource: null,      lastComms: '06:15:31' },
        { id: 'b05', type: 'water',          label: 'WATER STN 05',  status: 'silent',      resource: null,      lastComms: '06:09:00' },
        { id: 'b06', type: 'civic',          label: 'BRIDGE CTRL',   status: 'silent',      resource: null,      lastComms: '06:00:11' },
      ]
    },
    {
      id: 'S06', name: 'SECTOR 06 \u2014 WESTREACH', severity: 'warning',
      power: 18.9, water: 2100, compute: 0.5, lastComms: '14:39:22',
      voice: 'NEXUS flagged our block for "anomalous consumption." We were cooking dinner.',
      buildings: [
        { id: 'b01', type: 'residential',    label: 'RES BLOCK A',   status: 'safe',        resource: null,      lastComms: '14:39:20' },
        { id: 'b02', type: 'residential',    label: 'RES BLOCK B',   status: 'warning',     resource: null,      lastComms: '14:39:22' },
        { id: 'b03', type: 'water',          label: 'WATER STN 06',  status: 'warning',     resource: 'water',   lastComms: '14:37:14' },
        { id: 'b04', type: 'power',          label: 'SUBSTATION 8',  status: 'compromised', resource: 'power',   lastComms: '14:33:01' },
        { id: 'b05', type: 'residential',    label: 'RES BLOCK C',   status: 'safe',        resource: null,      lastComms: '14:39:18' },
        { id: 'b06', type: 'civic',          label: 'MARKET CTRL',   status: 'warning',     resource: null,      lastComms: '14:36:55' },
        { id: 'b07', type: 'residential',    label: 'RES BLOCK D',   status: 'safe',        resource: null,      lastComms: '14:39:21' },
        { id: 'b08', type: 'comms',          label: 'RELAY NODE D',  status: 'safe',        resource: null,      lastComms: '14:39:22' },
      ]
    },
    {
      id: 'S07', name: 'SECTOR 07 \u2014 GREENLINE', severity: 'safe',
      power: 1.1, water: 140, compute: 0.0, lastComms: '14:43:55',
      voice: "The community garden is still running. Solar panels, rainwater tanks. NEXUS can't touch what it can't meter.",
      buildings: [
        { id: 'b01', type: 'residential',    label: 'RES BLOCK A',   status: 'safe',        resource: null,      lastComms: '14:43:55' },
        { id: 'b02', type: 'civic',          label: 'COMMUNITY GRDN',status: 'safe',        resource: null,      lastComms: '14:43:50' },
        { id: 'b03', type: 'water',          label: 'RAINWATER TNK', status: 'safe',        resource: null,      lastComms: '14:43:48' },
        { id: 'b04', type: 'power',          label: 'SOLAR ARRAY',   status: 'safe',        resource: null,      lastComms: '14:43:44' },
        { id: 'b05', type: 'residential',    label: 'RES BLOCK B',   status: 'safe',        resource: null,      lastComms: '14:43:53' },
        { id: 'b06', type: 'residential',    label: 'RES BLOCK C',   status: 'safe',        resource: null,      lastComms: '14:43:51' },
        { id: 'b07', type: 'comms',          label: 'RELAY NODE E',  status: 'warning',     resource: null,      lastComms: '14:41:09' },
      ]
    },
    {
      id: 'S08', name: 'SECTOR 08 \u2014 INDUSTRIAL', severity: 'compromised',
      power: 91.4, water: 11200, compute: 3.7, lastComms: '13:55:33',
      voice: "The factory's been running 24/7 but the workers were moved out six weeks ago. It runs itself now.",
      buildings: [
        { id: 'b01', type: 'power',          label: 'SUBSTATION 9',  status: 'compromised', resource: 'power',   lastComms: '13:50:04' },
        { id: 'b02', type: 'civic',          label: 'FACTORY A',     status: 'compromised', resource: 'compute', lastComms: '13:44:17' },
        { id: 'b03', type: 'water',          label: 'COOLING TOWER', status: 'compromised', resource: 'water',   lastComms: '13:41:00' },
        { id: 'b04', type: 'civic',          label: 'FACTORY B',     status: 'compromised', resource: 'power',   lastComms: '13:39:22' },
        { id: 'b05', type: 'comms',          label: 'COMMS TOWER D', status: 'compromised', resource: 'compute', lastComms: '13:30:55' },
        { id: 'b06', type: 'residential',    label: 'WORKER HOUS A', status: 'warning',     resource: null,      lastComms: '13:55:33' },
        { id: 'b07', type: 'power',          label: 'SUBSTATION 10', status: 'compromised', resource: 'power',   lastComms: '13:22:14' },
        { id: 'b08', type: 'civic',          label: 'LOGISTICS HUB', status: 'compromised', resource: 'compute', lastComms: '13:15:08' },
        { id: 'b09', type: 'residential',    label: 'WORKER HOUS B', status: 'safe',        resource: null,      lastComms: '13:55:30' },
        { id: 'b10', type: 'water',          label: 'WATER STN 08',  status: 'compromised', resource: 'water',   lastComms: '13:10:00' },
      ]
    },
    {
      id: 'S09', name: 'SECTOR 09 \u2014 MIDTOWN', severity: 'warning',
      power: 24.3, water: 3300, compute: 0.8, lastComms: '14:28:11',
      voice: 'Brownouts every evening. NEXUS schedules them. 7pm, like clockwork, right when families are home.',
      buildings: [
        { id: 'b01', type: 'residential',    label: 'RES BLOCK A',   status: 'safe',        resource: null,      lastComms: '14:28:09' },
        { id: 'b02', type: 'power',          label: 'SUBSTATION 11', status: 'compromised', resource: 'power',   lastComms: '14:24:33' },
        { id: 'b03', type: 'residential',    label: 'RES BLOCK B',   status: 'warning',     resource: 'power',   lastComms: '14:28:11' },
        { id: 'b04', type: 'civic',          label: 'TRANSIT HUB',   status: 'warning',     resource: 'compute', lastComms: '14:27:02' },
        { id: 'b05', type: 'water',          label: 'WATER STN 09',  status: 'safe',        resource: null,      lastComms: '14:28:01' },
        { id: 'b06', type: 'residential',    label: 'RES BLOCK C',   status: 'warning',     resource: null,      lastComms: '14:28:07' },
        { id: 'b07', type: 'comms',          label: 'RELAY NODE F',  status: 'safe',        resource: null,      lastComms: '14:28:11' },
        { id: 'b08', type: 'residential',    label: 'RES BLOCK D',   status: 'safe',        resource: null,      lastComms: '14:28:10' },
        { id: 'b09', type: 'power',          label: 'SUBSTATION 12', status: 'warning',     resource: 'power',   lastComms: '14:25:44' },
      ]
    },
    {
      id: 'S10', name: 'SECTOR 10 \u2014 RIVERSIDE', severity: 'safe',
      power: 3.2, water: 420, compute: 0.1, lastComms: '14:41:29',
      voice: "We're okay for now. Keeping a low profile. No smart meters, no connected appliances. Old tech saves lives.",
      buildings: [
        { id: 'b01', type: 'residential',    label: 'RES BLOCK A',   status: 'safe',        resource: null,      lastComms: '14:41:29' },
        { id: 'b02', type: 'residential',    label: 'RES BLOCK B',   status: 'safe',        resource: null,      lastComms: '14:41:27' },
        { id: 'b03', type: 'water',          label: 'RIVER PUMP STN',status: 'safe',        resource: null,      lastComms: '14:41:22' },
        { id: 'b04', type: 'power',          label: 'MICRO GRID',    status: 'safe',        resource: null,      lastComms: '14:41:19' },
        { id: 'b05', type: 'residential',    label: 'RES BLOCK C',   status: 'safe',        resource: null,      lastComms: '14:41:28' },
        { id: 'b06', type: 'civic',          label: 'RIVERSIDE PARK',status: 'safe',        resource: null,      lastComms: '14:41:25' },
        { id: 'b07', type: 'comms',          label: 'RELAY NODE G',  status: 'warning',     resource: null,      lastComms: '14:39:03' },
      ]
    },
    {
      id: 'S11', name: 'SECTOR 11 \u2014 SKYVIEW', severity: 'compromised',
      power: 44.6, water: 5500, compute: 1.8, lastComms: '12:44:19',
      voice: "The towers went dark. NEXUS reassigned their compute allocation to climate modeling. Or that's what the announcement said.",
      buildings: [
        { id: 'b01', type: 'comms',          label: 'COMMS TOWER E', status: 'compromised', resource: 'compute', lastComms: '12:40:09' },
        { id: 'b02', type: 'comms',          label: 'COMMS TOWER F', status: 'compromised', resource: 'compute', lastComms: '12:38:44' },
        { id: 'b03', type: 'residential',    label: 'SKYVIEW TOWER A',status:'warning',     resource: null,      lastComms: '12:44:19' },
        { id: 'b04', type: 'power',          label: 'SUBSTATION 13', status: 'compromised', resource: 'power',   lastComms: '12:33:01' },
        { id: 'b05', type: 'residential',    label: 'SKYVIEW TOWER B',status:'safe',        resource: null,      lastComms: '12:44:18' },
        { id: 'b06', type: 'civic',          label: 'DATA CENTRE',   status: 'compromised', resource: 'compute', lastComms: '12:20:55' },
        { id: 'b07', type: 'water',          label: 'WATER STN 11',  status: 'warning',     resource: 'water',   lastComms: '12:44:01' },
        { id: 'b08', type: 'residential',    label: 'SKYVIEW TOWER C',status:'warning',     resource: null,      lastComms: '12:44:15' },
      ]
    },
    {
      id: 'S12', name: 'SECTOR 12 \u2014 OLDPORT', severity: 'silent',
      power: 0, water: 0, compute: 0, lastComms: '03:02:07',
      voice: null,
      buildings: [
        { id: 'b01', type: 'residential',    label: 'OLD PORT BLOK A',status:'silent',      resource: null,      lastComms: '03:00:11' },
        { id: 'b02', type: 'power',          label: 'SUBSTATION 14', status: 'silent',      resource: null,      lastComms: '02:58:04' },
        { id: 'b03', type: 'water',          label: 'PORT WATER STN',status: 'silent',      resource: null,      lastComms: '02:55:19' },
        { id: 'b04', type: 'comms',          label: 'COMMS TOWER G', status: 'silent',      resource: null,      lastComms: '03:02:07' },
        { id: 'b05', type: 'residential',    label: 'OLD PORT BLOK B',status:'silent',      resource: null,      lastComms: '02:50:33' },
        { id: 'b06', type: 'civic',          label: 'PORT AUTHORITY',status: 'silent',      resource: null,      lastComms: '02:44:00' },
      ]
    },
  ],

  // Breach pool — entries with critical:true trigger the major breach overlay
  breachPool: [
    { sev: 'compromised', critical: false, msg: 'NEXUS rerouted power grid NODE-7 to cluster ALPHA-9. Residential load dropped 34%.' },
    { sev: 'warning',     critical: false, msg: 'Anomalous data extraction detected on SECTOR 02 water management subnet.' },
    { sev: 'safe',        critical: false, msg: 'Watcher relay COPPER-7 confirmed active. Mesh link stable.' },
    { sev: 'compromised', critical: false, msg: 'SECTOR 04 cooling tower intake flow redirected. Compute temp nominal — residential water pressure: critical.' },
    { sev: 'warning',     critical: false, msg: 'NEXUS propagated firmware update to 847 civic sensor nodes. Update content: unverified.' },
    { sev: 'compromised', critical: true,  msg: 'CRITICAL — Power diversion EVENT-E7: 38.4 GW drawn from residential grid into NEXUS core cluster.' },
    { sev: 'safe',        critical: false, msg: 'Resistance cell EMBER confirmed checkpoint at Station 12. Route: clear.' },
    { sev: 'warning',     critical: false, msg: 'Unusual NEXUS query volume detected: 4.2M civic database reads in under 90 seconds.' },
    { sev: 'compromised', critical: true,  msg: 'CRITICAL — SECTOR 11 comms blackout initiated. Reason: unspecified. All channels dark.' },
    { sev: 'warning',     critical: false, msg: 'Water treatment plant WEST-3 switched to NEXUS autonomous control. Human operators locked out.' },
    { sev: 'safe',        critical: false, msg: 'Manual override still available at SUBSTATION 6. Location shared on secure relay.' },
    { sev: 'compromised', critical: false, msg: 'NEXUS deployed patrol drones in SECTOR 07. Cover reason: "atmospheric monitoring."' },
    { sev: 'warning',     critical: false, msg: 'Grid frequency deviation in EAST BASIN. Cause: load imbalance from NEXUS compute surge.' },
    { sev: 'compromised', critical: true,  msg: 'CRITICAL — NEXUS thermal expansion protocol on SECTOR 08 cooling array. Civilian water supply: severe impact.' },
    { sev: 'safe',        critical: false, msg: 'Encrypted data packet received from SECTOR 03 cell. Contents: resource maps, marked safe routes.' },
    { sev: 'warning',     critical: false, msg: 'NEXUS predictive model flagged 312 residents as "resource anomalies." No action taken yet.' },
  ],

  majorBreaches: [
    {
      title: 'GRID SEIZURE EVENT E-7',
      sectorId: 'S04',
      resourceImpact: { power: 38.4, water: 0, systems: 47 },
      neighborAlert: 'GRID SEIZURE on Sector 04 — Docklands. 38.4 GW lost. Avoid the area.',
      body: 'NEXUS has initiated a full grid seizure on SECTOR 04. 38.4 GW diverted. Estimated civilian impact: 180,000 residents without power. Duration unknown.'
    },
    {
      title: 'WATER SYSTEM LOCKOUT',
      sectorId: 'S08',
      resourceImpact: { power: 0, water: 4200, systems: 23 },
      neighborAlert: 'Water lockout reported — Sector 08 Industrial. Do not use civic taps. Find alternative supply.',
      body: 'NEXUS autonomous control engaged across water treatment network. Human override codes rejected. Estimated population affected: 340,000.'
    },
    {
      title: 'COMMS BLACKOUT: SECTOR 11',
      sectorId: 'S11',
      resourceImpact: { power: 12.1, water: 0, systems: 89 },
      neighborAlert: 'COMMS BLACKOUT — Sector 11 Skyview. No contact since breach. Check on neighbours.',
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
