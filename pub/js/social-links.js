// js/social-links.js
// Social links popup — full HTML + CSS + JS in one file

/* ==============================
   1) INJECT CSS
============================== */
const slStyles = `
.sl-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.65);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 50000;
}

.sl-overlay.sl-visible {
    display: flex;
}

.sl-card {
    position: relative;
    width: min(420px, 92vw);
    background: #0b2317;
    border-radius: 20px;
    padding: 18px 14px 20px;
    border: 1px solid rgba(242, 198, 84, 0.5);
    box-shadow: 0 18px 40px rgba(0,0,0,0.7);
    color: #f7f0cf;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

/* close + share */
.sl-close,
.sl-share {
    position: absolute;
    top: 10px;
    width: 34px;
    height: 34px;
    border-radius: 10px;
    border: 1px solid rgba(242,198,84,0.7);
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
}

.sl-close {
    left: 10px;
}

.sl-share {
    right: 10px;
}

.sl-close img,
.sl-share img {
    width: 18px;
    height: 18px;
}

/* logo */
.sl-logo-wrap {
    display: flex;
    justify-content: center;
    margin-top: 26px;
    margin-bottom: 10px;
}

.sl-logo {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid rgba(242,198,84,0.7);
}

/* slogan */
.sl-slogan {
    text-align: center;
    font-size: 0.78rem;
    color: #f7f0cf;
    margin-bottom: 14px;
    letter-spacing: 0.03em;
}

/* main row */
.sl-main-row {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 8px;
    border-radius: 14px;
    border: 1px solid rgba(242,198,84,0.55);
    margin-bottom: 10px;
}

.sl-main-icon {
    width: 34px;
    height: 34px;
    border-radius: 10px;
    border: 1px solid rgba(242,198,84,0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(7,24,16,0.9);
    flex-shrink: 0;
}

.sl-main-icon img {
    width: 20px;
    height: 20px;
}

.sl-main-text {
    flex: 1;
    font-size: 0.8rem;
    line-height: 1.3;
}

.sl-open-btn {
    flex-shrink: 0;
    border-radius: 10px;
    border: 1px solid rgba(242,198,84,0.8);
    background: rgba(242,198,84,0.12);
    color: #f2c654;
    font-size: 0.78rem;
    padding: 4px 8px;
}

/* bottom icons row */
.sl-icons-row {
    margin-top: 8px;
    padding-top: 8px;
    border-top: 1px solid rgba(242,198,84,0.35);
    display: flex;
    justify-content: space-between;
    gap: 6px;
}

.sl-icon-btn {
    width: 42px;
    height: 42px;
    border-radius: 12px;
    border: 1px solid rgba(242,198,84,0.45);
    background: rgba(7,24,16,0.9);
    display: flex;
    align-items: center;
    justify-content: center;
}

.sl-icon-btn img {
    width: 22px;
    height: 22px;
}

.sl-icon-btn.sl-active {
    background: rgba(242,198,84,0.18);
    box-shadow: 0 0 0 1px rgba(242,198,84,0.65);
}
`;

const slStyleTag = document.createElement("style");
slStyleTag.textContent = slStyles;
document.head.appendChild(slStyleTag);

/* ==============================
   2) INJECT HTML
============================== */
const slOverlay = document.createElement("div");
slOverlay.className = "sl-overlay";
slOverlay.innerHTML = `
  <div class="sl-card">
      <button class="sl-close">
          <img src="assets/svg/close.png" alt="Close">
      </button>
      <button class="sl-share">
          <img src="assets/svg/share.png" alt="Share">
      </button>

      <div class="sl-logo-wrap">
          <img src="assets/img/logo.png" alt="Harrys Pub" class="sl-logo">
      </div>

      <div class="sl-slogan">
          LETS DRINK EAT AND HAVE FUN TOGETHER
      </div>

      <div class="sl-main-row">
          <div class="sl-main-icon">
              <img id="slMainIcon" src="assets/svg/email.svg" alt="">
          </div>
          <div class="sl-main-text" id="slSmartText">
              Stay in touch with us!
          </div>
          <button class="sl-open-btn">Open</button>
      </div>

      <div class="sl-icons-row">
          <button class="sl-icon-btn" data-sl-type="email">
              <img src="assets/svg/email.svg" alt="">
          </button>
          <button class="sl-icon-btn" data-sl-type="facebook">
              <img src="assets/svg/facebook.svg" alt="">
          </button>
          <button class="sl-icon-btn" data-sl-type="call">
              <img src="assets/svg/call.svg" alt="">
          </button>
          <button class="sl-icon-btn" data-sl-type="instagram">
              <img src="assets/svg/instagram.svg" alt="">
          </button>
          <button class="sl-icon-btn" data-sl-type="map">
              <img src="assets/svg/map.svg" alt="">
          </button>
      </div>
  </div>
`;
document.body.appendChild(slOverlay);

/* ==============================
   3) LOGIC
============================== */

const slMainIcon = slOverlay.querySelector("#slMainIcon");
const slSmartText = slOverlay.querySelector("#slSmartText");
const slOpenBtn   = slOverlay.querySelector(".sl-open-btn");
const slIconButtons = Array.from(slOverlay.querySelectorAll(".sl-icon-btn"));

let slCurrentType = null;

const SL_CONFIG = {
    email: {
        icon: "assets/svg/email.svg",
        text: "Send us an email — we reply quickly!",
        url: "mailto:info@harryspub.it",
        button: "Write Email"
    },
    facebook: {
        icon: "assets/svg/facebook.svg",
        text: "Follow us on Facebook for events & offers.",
        url: "https://facebook.com/",
        button: "Open Page"
    },
    call: {
        icon: "assets/svg/call.svg",
        text: "Call us — your table is waiting!",
        url: "tel:+390000000000",
        button: "Call Now"
    },
    instagram: {
        icon: "assets/svg/instagram.svg",
        text: "Check our Instagram for today’s vibes.",
        url: "https://instagram.com/",
        button: "View Profile"
    },
    map: {
        icon: "assets/svg/map.svg",
        text: "Come fast, we are waiting for you!",
        urlGoogle: "https://maps.google.com",
        urlApple: "http://maps.apple.com/?q=Harrys%20Pub",
        button: "Let's Go"
    },
    contact: {
        icon: "assets/svg/call.svg",
        text: "Have a question? Contact us now.",
        url: "tel:+390000000000",
        button: "Contact Now"
    }
};

function slIsAppleDevice() {
    const ua = navigator.userAgent || "";
    return /iPhone|iPad|iPod|Macintosh/i.test(ua);
}

function slSetType(type) {
    const cfg = SL_CONFIG[type];
    if (!cfg) return;
    slCurrentType = type;

    slMainIcon.src = cfg.icon;
    slSmartText.textContent = cfg.text;
    slOpenBtn.textContent = cfg.button || "Open";

    slIconButtons.forEach(btn => {
        btn.classList.toggle("sl-active", btn.dataset.slType === type);
    });
}

function slOpenOverlay(type) {
    slSetType(type);
    slOverlay.classList.add("sl-visible");
}

function slOpenLink() {
    if (!slCurrentType) return;
    const cfg = SL_CONFIG[slCurrentType];
    if (!cfg) return;

    if (slCurrentType === "map") {
        const url = slIsAppleDevice() ? cfg.urlApple : cfg.urlGoogle;
        if (url) window.open(url, "_blank");
        return;
    }

    if (cfg.url) {
        window.open(cfg.url, "_blank");
    }
}

function slCloseOverlay(openLinkFirst) {
    if (openLinkFirst) slOpenLink();
    slOverlay.classList.remove("sl-visible");
}

/* ==============================
   4) EVENT HANDLERS
============================== */

// Footer icons + contact buttons
document.addEventListener("click", (e) => {
    const target = e.target;

    // FOOTER ICONS
    const footerBtn = target.closest(".f-item");
    if (footerBtn) {
        const img = footerBtn.querySelector("img");
        if (img && img.src) {
            if (img.src.includes("email.svg")) slOpenOverlay("email");
            else if (img.src.includes("facebook.svg")) slOpenOverlay("facebook");
            else if (img.src.includes("call.svg")) slOpenOverlay("call");
            else if (img.src.includes("instagram.svg")) slOpenOverlay("instagram");
            else if (img.src.includes("map.svg")) slOpenOverlay("map");
        }
        return;
    }

    // CONTACT BUTTON (Navbar / floating) — text se detect
    const btn = target.closest("button");
    if (btn && btn.textContent.trim().toLowerCase() === "contact") {
        slOpenOverlay("contact");
        return;
    }
});

// Popup ke andar clicks
slOverlay.addEventListener("click", (e) => {
    const target = e.target;

    // card ke bahar click = link open + close
    if (target === slOverlay) {
        slCloseOverlay(false);
        return;
    }

    // close button
    if (target.closest(".sl-close")) {
        slCloseOverlay(false);
        return;
    }

    // main Open button
    if (target.closest(".sl-open-btn")) {
        slCloseOverlay(true);
        return;
    }

    // bottom icons
    const iconBtn = target.closest(".sl-icon-btn");
    if (iconBtn) {
        const type = iconBtn.dataset.slType;
        slSetType(type);
    }

    // NOTE: .sl-share ka click ab yahan handle nahi ho raha,
    // usko naya share-links.js handle karega.
});

// default type
slSetType("email");