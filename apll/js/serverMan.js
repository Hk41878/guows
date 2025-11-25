// ==============================
// serverMan.js — FULL FIXED VERSION
// ==============================

// ---------- CONFIGURATION ----------
const SERVER_URL = "https://app.apll.it/ping";   // Ping endpoint
const TIMEOUT_MS = 2000;                         // How long to wait for server response
const CHECK_INTERVAL_MS = 25000;                 // Background check interval

const ENABLE_RELOAD_DETECTION = true;            // If true => reload.js will be triggered



// ---------- INTERNAL VARIABLES ----------
let initialStatus = null;     // null = not checked yet, true = online, false = offline
let currentStatus = null;


// ---------- MAIN INITIAL CHECK ----------
(async function () {
    const status = await checkServer();

    initialStatus = status;
    currentStatus = status;

    console.log(`[serverMan] Initial status: ${status ? "ONLINE" : "OFFLINE"}`);

    // 🔥 FIXED: Update the floating ball here
    updateStatusBall(status);

    // Load appropriate form
    if (status) {
        loadScript("/js/advancedForm.js", true);   // Load from server
    } else {
        loadScript("/js/reservation.js");          // Fallback form
    }

    // Start continuous monitoring
    startBackgroundCheck();
})();



// ---------- FUNCTION: CHECK SERVER ----------
function checkServer() {
    return new Promise(resolve => {
        let didRespond = false;

        // Timeout fail-safe
        const timeout = setTimeout(() => {
            if (!didRespond) resolve(false);
        }, TIMEOUT_MS);

        fetch(SERVER_URL, { method: "GET" })
            .then(() => {
                didRespond = true;
                clearTimeout(timeout);
                resolve(true);
            })
            .catch(() => {
                didRespond = true;
                clearTimeout(timeout);
                resolve(false);
            });
    });
}



// ---------- FUNCTION: LOAD EXTERNAL JS ----------
function loadScript(src, isAdvanced = false) {
    const script = document.createElement("script");
    script.src = src;

    script.onload = () => {
        console.log(`[serverMan] Loaded: ${src}`);
    };

    script.onerror = () => {
        console.error(`[serverMan] Failed to load: ${src}`);

        // Fallback if advanced form fails to load
        if (isAdvanced) {
            console.warn("[serverMan] Loading fallback reservation form...");
            loadScript("/js/reservation.js");
        }
    };

    document.body.appendChild(script);
}



// ---------- BACKGROUND MONITOR LOOP ----------
function startBackgroundCheck() {
    setInterval(async () => {
        const newStatus = await checkServer();

        // 🔥 FIXED: Always update floating ball
        updateStatusBall(newStatus);

        // If status changed
        if (newStatus !== currentStatus) {
            console.log(`[serverMan] Status changed: ${currentStatus} → ${newStatus}`);

            const previousStatus = currentStatus;
            currentStatus = newStatus;

            // Reload overlay trigger
            if (ENABLE_RELOAD_DETECTION) {
                if (previousStatus === false && newStatus === true && initialStatus === false) {
                    console.log("[serverMan] Triggering reload overlay...");
                    triggerReloadOverlay();
                }
            }
        }

    }, CHECK_INTERVAL_MS);
}



// ---------- TRIGGER RELOAD (calls reload.js) ----------
function triggerReloadOverlay() {
    if (typeof window.showReloadOverlay === "function") {
        window.showReloadOverlay();
    } else {
        console.error("[serverMan] reload.js not loaded or showReloadOverlay() missing.");
    }
}
