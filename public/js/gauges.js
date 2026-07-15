// ============================================
// OVERRIDE - RADIAL GAUGE RENDERER
// ============================================

function drawGauge(canvasId, pct, color) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;
  const cx = w / 2;
  const cy = h / 2;
  const r = Math.min(w, h) / 2 - 16;

  ctx.clearRect(0, 0, w, h);

  // Track
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0.75 * Math.PI, 2.25 * Math.PI);
  ctx.strokeStyle = "rgba(255,255,255,0.06)";
  ctx.lineWidth = 10;
  ctx.lineCap = "butt";
  ctx.stroke();

  // Fill
  const startAngle = 0.75 * Math.PI;
  const endAngle = startAngle + (1.5 * Math.PI * Math.min(pct, 100)) / 100;
  ctx.beginPath();
  ctx.arc(cx, cy, r, startAngle, endAngle);
  ctx.strokeStyle = color;
  ctx.lineWidth = 10;
  ctx.lineCap = "butt";
  ctx.shadowColor = color;
  ctx.shadowBlur = 8;
  ctx.stroke();
  ctx.shadowBlur = 0;

  // Tick marks
  for (let i = 0; i <= 10; i++) {
    const angle = startAngle + (1.5 * Math.PI * i) / 10;
    const innerR = r - 12;
    const outerR = r + 2;
    const sx = cx + Math.cos(angle) * innerR;
    const sy = cy + Math.sin(angle) * innerR;
    const ex = cx + Math.cos(angle) * outerR;
    const ey = cy + Math.sin(angle) * outerR;
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(ex, ey);
    ctx.strokeStyle = "rgba(255,255,255,0.1)";
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}

function getGaugeColor(id) {
  if (id === "gauge-power") return "#3FE0C5";
  if (id === "gauge-water") return "#FFB347";
  if (id === "gauge-exposure") return "#FF3366";
  return "#3FE0C5";
}

function updateGauges() {
  const s = OVERRIDE_STATE.watcher;
  drawGauge("gauge-power", s.power, "#3FE0C5");
  drawGauge("gauge-water", s.water, "#FFB347");
  drawGauge("gauge-exposure", s.exposure, "#FF3366");

  const pEl = document.getElementById("gauge-power-val");
  const wEl = document.getElementById("gauge-water-val");
  const eEl = document.getElementById("gauge-exposure-val");
  if (pEl) pEl.textContent = s.power + "%";
  if (wEl) wEl.textContent = s.water + "%";
  if (eEl) eEl.textContent = s.exposure + "%";

  // Complicity
  const bar = document.getElementById("complicity-bar");
  const pct = document.getElementById("complicity-pct");
  if (bar) bar.style.width = s.complicity + "%";
  if (pct) pct.textContent = s.complicity + "%";

  // Slight drift
  OVERRIDE_STATE.watcher.power = Math.max(
    5,
    Math.min(95, s.power + (Math.random() - 0.55) * 0.3),
  );
  OVERRIDE_STATE.watcher.water = Math.max(
    5,
    Math.min(95, s.water + (Math.random() - 0.6) * 0.3),
  );
  OVERRIDE_STATE.watcher.exposure = Math.max(
    50,
    Math.min(99, s.exposure + (Math.random() - 0.4) * 0.2),
  );
}
