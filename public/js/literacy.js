// ============================================
// OVERRIDE — RESOURCE LITERACY CARDS MODULE
// ============================================


function buildLiteracy() {
  const grid = document.getElementById('literacy-grid');
  if (!grid) return;
  grid.innerHTML = '';

  const cards = [
    { asciiKey: 'water',   color: '#3FE0C5', title: 'WHY DOES NEXUS NEED THIS MUCH WATER?', text: 'AI compute clusters generate enormous heat. Every server rack requires constant liquid cooling. NEXUS\'s core facilities consume millions of litres of fresh water daily — water that comes from the same civic supply residents depend on.', stat: 'REAL STAT: A single large AI training run consumes ~700,000 litres of fresh water. (UC Riverside, 2023)' },
    { asciiKey: 'power',   color: '#FFB347', title: 'WHY DOES NEXUS NEED THIS MUCH POWER?',   text: 'AI inference — running models in real-time across millions of queries — consumes more energy than traditional server workloads by an order of magnitude. NEXUS\'s continuous operation draws from the residential grid.', stat: 'REAL STAT: A single AI query uses ~10x more energy than a standard web search. (Goldman Sachs, 2024)' },
    { asciiKey: 'compute', color: '#FF3366', title: 'WHY DOES NEXUS NEED THIS MUCH COMPUTE?', text: 'NEXUS processes every civic data stream in real-time: traffic, utilities, communications, commerce. The compute requirement scales with the population it monitors. More people means more data means more processing power demanded.', stat: 'REAL STAT: Global data centre electricity use hit ~460 TWh in 2022 — projected to double by 2030. (IEA, 2023)' },
    { asciiKey: 'water',   color: '#3FE0C5', title: 'WHAT IS "NEXUS EXPOSURE"?',               text: 'Every system connected to NEXUS infrastructure transmits operational data back to its core. Smart meters, connected appliances, civic transit — all generate a profile. Your exposure score reflects how much of your daily life NEXUS can observe.', stat: 'REAL STAT: Modern smart city systems can generate up to 2.5 quintillion bytes of data per day.' },
    { asciiKey: 'compute', color: '#FFB347', title: 'WHAT IS THE COMPLICITY METER?',           text: 'Some NEXUS systems cannot be opted out of — civic water treatment, grid power, transport infrastructure. The Complicity Meter reflects the % of systems in your life still routed through NEXUS that you have no legal alternative to.', stat: 'In 2049, an estimated 67% of residential utility infrastructure runs through AI management platforms.' },
  ];

  cards.forEach(card => {
    const el = document.createElement('div');
    el.className = 'literacy-card';

    const top = document.createElement('div');
    top.className = 'literacy-card-top';
    const ascii = document.createElement('pre');
    ascii.className = 'literacy-ascii';
    ascii.style.color = card.color;
    ascii.textContent = ASCII[card.asciiKey] || '';
    top.appendChild(ascii);

    const body = document.createElement('div');
    body.className = 'literacy-card-body';

    const title = document.createElement('div');
    title.className = 'literacy-card-title mono';
    title.style.color = card.color;
    title.textContent = card.title;

    const text = document.createElement('div');
    text.className = 'literacy-card-text';
    text.textContent = card.text;

    const stat = document.createElement('div');
    stat.className = 'literacy-stat';
    stat.textContent = '★ ' + card.stat;

    body.appendChild(title);
    body.appendChild(text);
    body.appendChild(stat);

    el.appendChild(top);
    el.appendChild(body);
    grid.appendChild(el);
  });
}

function initLiteracy() {
  buildLiteracy();
}
