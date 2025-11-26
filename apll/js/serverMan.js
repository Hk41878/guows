// ==============================
// serverMan.js — STATUS ONLY
// ==============================

// ---------- CONFIG ----------
const STATUS_URL = "https://app.apll.it/status";
const TIMEOUT_MS = 2000;
const CHECK_INTERVAL_MS = 15000;

// Global status object
window.apllServerStatus = {
  state: "unknown",    // "online" | "offline" | "unknown"
  lastChecked: 0,
  raw: null
};

// Helper for other scripts
window.getApllServerState = function () {
  return (window.apllServerStatus && window.apllServerStatus.state) || "unknown";
};

// ---------- INTERNAL: CHECK WITH TIMEOUT ----------
function checkStatusOnce() {
  return new Promise(resolve => {
    let finished = false;

    const timer = setTimeout(() => {
      if (finished) return;
      finished = true;
      resolve({ ok: false, raw: null });
    }, TIMEOUT_MS);

    fetch(STATUS_URL, { method: "GET" })
      .then(res => res.text())
      .then(text => {
        if (finished) return;
        finished = true;
        clearTimeout(timer);
        resolve({ ok: true, raw: (text || "").trim().toLowerCase() });
      })
      .catch(() => {
        if (finished) return;
        finished = true;
        clearTimeout(timer);
        resolve({ ok: false, raw: null });
      });
  });
}

// ---------- MAIN LOOP ----------
async function updateServerStatus() {
  const prevState = window.apllServerStatus.state;

  const result = await checkStatusOnce();
  const raw = result.raw;
  let newState = "offline";

  if (result.ok && raw === "online") {
    newState = "online";
  } else if (!result.ok && prevState === "unknown") {
    newState = "unknown";
  }

  window.apllServerStatus = {
    state: newState,
    lastChecked: Date.now(),
    raw
  };

  console.log(`[serverMan] Status: ${newState} (raw: ${raw})`);

  // Update ball if available
  if (typeof window.updateStatusBall === "function") {
    window.updateStatusBall(newState === "online");
  }

  // Trigger reload overlay on transitions:
  // 1) unknown -> online
  // 2) online -> NOT online
  if (typeof window.showReloadOverlay === "function") {
    if (prevState === "unknown" && newState === "online") {
      console.log("[serverMan] Transition unknown → online → reload overlay");
      window.showReloadOverlay();
    } else if (prevState === "online" && newState !== "online") {
      console.log("[serverMan] Transition online → not-online → reload overlay");
      window.showReloadOverlay();
    }
  }
}

// Init + interval
(function () {
  updateServerStatus();
  setInterval(updateServerStatus, CHECK_INTERVAL_MS);
})();