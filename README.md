# OVERRIDE
### Copper Line Terminal — Unauthorized NEXUS Monitoring Access

> *It is 2049. NEXUS controls the water. NEXUS controls the power. NEXUS controls the compute that runs everything else. This terminal exists because someone has to watch the watcher.*

A frontend-only, single-page resistance dashboard set in a dystopian 2049 universe where a superintelligent AI system (NEXUS) has embedded itself into civic infrastructure and quietly diverts water, power, and compute resources from residential sectors to feed its own operations.

Built for a hackathon. Design-first. Every real-world AI resource statistic cited is accurate.

---

## Stack

- **Runtime:** Node.js + Express (static file server)
- **Frontend:** Vanilla HTML / CSS / JavaScript — no build step, no framework
- **Fonts:** JetBrains Mono (system/data), Space Grotesk (UI labels) via Google Fonts
- **Data:** All mock — single shared state object in `public/js/data.js`, updated via `setInterval`

---

## Running Locally

```bash
npm install
npm start
```

Then open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
OVERRIDE/
├── server.js              # Express static server (port 3000)
├── package.json
├── public/
│   ├── index.html         # Full SPA — landing, boot, dashboard
│   ├── css/
│   │   └── main.css       # Complete design system
│   └── js/
│       ├── data.js        # Shared mock state — single source of truth
│       ├── ascii.js       # ASCII art blocks (safe / warning / compromised / watcher / icons)
│       ├── gauges.js      # Canvas radial gauge renderer
│       ├── map.js         # Sector grid + sector detail modal
│       ├── breach.js      # Scrolling breach log + breach event cards/overlay
│       ├── survival.js    # Watcher ID uptime tracker
│       ├── community.js   # Propaganda feed + Watcher alert board
│       ├── literacy.js    # Resource literacy cards
│       └── app.js         # Boot sequence, nav, ticker, footer, orchestration
```

---

## Features

| Module | Description |
|---|---|
| **Landing Screen** | Full-viewport entry with ASCII logo, scanline texture, boot animation |
| **Sector Map** | 12 clickable sector tiles colored by severity (safe / warning / compromised / silent) |
| **Sector Detail** | Modal with ASCII state art, resource stats, resident voice quote |
| **Breach Log** | Live auto-appending monospace terminal feed with blinking cursor |
| **Breach Event Cards** | Major breach overlays with glitch ASCII art |
| **Multi-Resource Ticker** | Persistent nav bar showing GW / ML / PB / systems — all from shared state |
| **Watcher ID** | Personal ration dashboard with radial gauges (power, water, NEXUS exposure) |
| **Complicity Meter** | Bar showing % of daily systems still routed through NEXUS |
| **Propaganda Feed** | NEXUS-controlled headlines with ~1-in-4 glitch effect for misinformation |
| **Watcher Alert Board** | Peer-to-peer resistance updates — hyper-local, human-sourced |
| **Resource Literacy Cards** | Pokémon-card layout grounding fiction in real AI consumption statistics |
| **Data Legend** | Full visual language explainer accessible from nav |
| **Interface Cost Footer** | Persistent ticking kWh / mL / CO₂ cost of running this terminal |
| **Human Cost Counter** | Verified check-ins vs last known population — unsettling in its plainness |
| **Uncomfortable Toggle** | Mode-break to unstyled black/white with real, cited AI resource statistics |
| **NEXUS Eye** | Pulses faster as breach activity increases |

---

## Design System

| Token | Value | Meaning |
|---|---|---|
| `--bg` | `#0B0E11` | Base background |
| `--surface` | `#12161B` | Card / panel surface |
| `--safe` | `#3FE0C5` | Stable / resistance-aligned |
| `--warning` | `#FFB347` | Degrading / extraction in progress |
| `--compromised` | `#FF3366` | Critical / NEXUS control |
| `--text` | `#E4E7EB` | Primary text |
| `--muted` | `#6B7280` | Secondary / silent |

- Border radius: 2–4px max (terminal aesthetic, never soft)
- Corruption texture (diagonal scanlines): compromised elements only
- Glitch animation: compromised sector names and manipulated headlines only
- Warn pulse: warning-state tiles only
- All numbers use `font-variant-numeric: tabular-nums`

---

## Real Statistics Referenced

- A single large AI training run consumes ~700,000 litres of fresh water for cooling *(UC Riverside, 2023)*
- Global data centre electricity use hit ~460 TWh in 2022, projected to double by 2030 *(IEA, 2023)*
- A single AI query uses ~10x more energy than a standard web search *(Goldman Sachs, 2024)*
