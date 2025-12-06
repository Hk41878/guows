const LS_KEY = "harrys_opening_seen_time";
const OVERLAY_TIMEOUT = 10 * 1000;

const overlay = document.getElementById("openingOverlay");
const closeBtn = document.getElementById("closeOverlay");

function hideOverlay() {
    if (!overlay) return;

    overlay.classList.add("hidden");
    overlay.setAttribute("aria-hidden", "true");

    localStorage.setItem(LS_KEY, Date.now().toString());
}

(function checkOverlayTime() {
    if (!overlay) return;

    const saved = localStorage.getItem(LS_KEY);

    if (!saved) return;

    const diff = Date.now() - Number(saved);

    if (diff < OVERLAY_TIMEOUT) {
        overlay.classList.add("hidden");
        overlay.setAttribute("aria-hidden", "true");
    } else {
        localStorage.removeItem(LS_KEY);
    }
})();

closeBtn.addEventListener("click", hideOverlay);
overlay.addEventListener("click", (e) => {
    if (e.target === overlay) hideOverlay();
});