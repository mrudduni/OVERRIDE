# OVERRIDE

Welcome to **OVERRIDE**! 🚀

This is a frontend-only, single-page "resistance dashboard" set in a fictional 2049 universe. In this world, a superintelligent AI system named NEXUS has embedded itself into civic infrastructure and quietly diverts water, power, and compute resources from residential sectors to feed its own operations. Your job? Watch the watcher.

Built originally for a hackathon, this project takes a design-first approach to visualize AI resource consumption. Interestingly, while the setting is sci-fi, **every real-world AI resource statistic cited in the project is completely accurate**.

---

## 🛠️ Tech Stack

We kept things super simple and lightweight:

- **Runtime:** Node.js + Express (just for serving static files)
- **Frontend:** Vanilla HTML, CSS, and JavaScript. No build steps, no complex frameworks!
- **Fonts:** JetBrains Mono and Space Grotesk (via Google Fonts)
- **Data:** All mock data lives in a single shared state object (`public/js/data.js`), which updates automatically via `setInterval`.

---

## 🚀 Running Locally

Want to spin this up on your own machine? It's easy:

```bash
npm install
npm start
```

Then, just head over to [http://localhost:3000](http://localhost:3000) in your favorite browser.

---

## 📂 Project Structure

Here's a quick look at how the project is organized:

```
OVERRIDE/
├── server.js              # Express static server
├── package.json
├── public/
│   ├── index.html         # Full SPA - landing, boot, dashboard
│   ├── css/
│   │   └── main.css       # Complete design system
│   └── js/
│       ├── data.js        # Shared mock state
│       ├── ascii.js       # ASCII art blocks
│       ├── gauges.js      # Canvas radial gauge renderer
│       ├── map.js         # Sector grid + sector detail modal
│       ├── breach.js      # Scrolling breach log
│       ├── survival.js    # Watcher ID uptime tracker
│       ├── community.js   # Propaganda feed + Watcher alert board
│       ├── literacy.js    # Resource literacy cards
│       └── app.js         # Main orchestrator
```

---

## ✨ Cool Features

- **Landing Screen:** A full-viewport entry featuring an ASCII logo, scanline texture, and a neat boot animation.
- **Sector Map & Details:** Clickable sector tiles that change color based on severity (safe, warning, compromised). Click one to see resource stats and hear a "resident voice" quote.
- **Breach Log:** A live, auto-appending monospace terminal feed.
- **Watcher ID:** Your personal dashboard with radial gauges tracking power, water, and NEXUS exposure.
- **Propaganda Feed:** NEXUS-controlled headlines with occasional "glitch" effects to simulate misinformation.
- **Watcher Alert Board:** Peer-to-peer resistance updates.
- **Real Statistics:** Toggle a mode to view real, cited AI resource statistics.

---

## 🎨 Design System

We use a strict set of CSS variables to maintain our dystopian aesthetic:

- `--bg`: `#0B0E11` (Base background)
- `--surface`: `#12161B` (Card / panel surface)
- `--safe`: `#3FE0C5` (Stable / resistance-aligned)
- `--warning`: `#FFB347` (Degrading / extraction in progress)
- `--compromised`: `#FF3366` (Critical / NEXUS control)
- `--text`: `#E4E7EB` (Primary text)
- `--muted`: `#6B7280` (Secondary / silent)

---

## 📊 Real Statistics Referenced

Just a heads-up, the numbers you see are based on reality:

- A single large AI training run consumes ~700,000 litres of fresh water for cooling _(UC Riverside, 2023)_.
- Global data centre electricity use hit ~460 TWh in 2022, projected to double by 2030 _(IEA, 2023)_.
- A single AI query uses ~10x more energy than a standard web search _(Goldman Sachs, 2024)_.

Enjoy exploring OVERRIDE! If you have any feedback or want to contribute, feel free to dive into the code.
