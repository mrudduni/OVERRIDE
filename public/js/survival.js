// ============================================
// OVERRIDE - SURVIVAL / WATCHER ID MODULE
// ============================================

function initSurvival() {
  updateWatcherUptime();
  setInterval(updateWatcherUptime, 1000);
  setInterval(updateGauges, 2000);
  updateGauges();
}

function updateWatcherUptime() {
  const el = document.getElementById("watcher-uptime");
  if (!el) return;
  const elapsed = Math.floor(
    (Date.now() - OVERRIDE_STATE.session.startTime) / 1000,
  );
  const h = Math.floor(elapsed / 3600)
    .toString()
    .padStart(2, "0");
  const m = Math.floor((elapsed % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const s = (elapsed % 60).toString().padStart(2, "0");
  el.textContent = `${h}:${m}:${s}`;
}
