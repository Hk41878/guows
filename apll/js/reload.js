// ==============================
// reload.js — Part 1 (FINAL)
// ==============================

// Prevent multiple overlays
let overlayActive = false;

window.showReloadOverlay = function () {
    if (overlayActive) return;     // Already visible → do nothing
    overlayActive = true;

    console.log("[reload.js] Reload overlay activated.");

    // ---------- Overlay Container ----------
    const overlay = document.createElement("div");
    overlay.id = "reloadOverlay";
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.background = "rgba(0,0,0,0.75)";
    overlay.style.backdropFilter = "blur(4px)";
    overlay.style.zIndex = "999999";
    overlay.style.display = "flex";
    overlay.style.flexDirection = "column";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.fontFamily = "Arial, sans-serif";
    overlay.style.color = "#ffffff";
    overlay.style.textAlign = "center";
    overlay.style.padding = "20px";
    overlay.style.boxSizing = "border-box";



    // ---------- Message ----------
    const msg = document.createElement("div");
    msg.textContent = "A better version of this form is available.";
    msg.style.fontSize = "22px";
    msg.style.marginBottom = "12px";

    const msg2 = document.createElement("div");
    msg2.textContent = "Please reload for the best experience.";
    msg2.style.fontSize = "16px";
    msg2.style.marginBottom = "25px";



    // ---------- Reload Button ----------
    const btn = document.createElement("button");
    btn.textContent = "Reload Now";
    btn.style.fontSize = "18px";
    btn.style.padding = "12px 28px";
    btn.style.border = "none";
    btn.style.borderRadius = "8px";
    btn.style.cursor = "pointer";
    btn.style.background = "#28a745";
    btn.style.color = "#fff";
    btn.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)";
    btn.style.transition = "0.2s";

    btn.onmouseenter = () => btn.style.opacity = "0.85";
    btn.onmouseleave = () => btn.style.opacity = "1";

    btn.onclick = () => {
        console.log("[reload.js] User clicked reload.");
        location.reload();
    };



    // ---------- Append to overlay ----------
    overlay.appendChild(msg);
    overlay.appendChild(msg2);
    overlay.appendChild(btn);

    // ---------- Add to document ----------
    document.body.appendChild(overlay);
};