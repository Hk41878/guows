// js/share-links.js
// Separate Share Popup (Option 1 — simple box, Harry's Pub theme)

const hpShareCSS = `
.hp-share-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.55);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 60000;
}

.hp-share-overlay.hp-share-visible {
    display: flex;
}

.hp-share-card {
    width: min(420px, 92vw);
    background: #0b2317;
    border-radius: 18px;
    padding: 16px 16px 14px;
    border: 1px solid rgba(242,198,84,0.55);
    box-shadow: 0 18px 40px rgba(0,0,0,0.7);
    color: #f7f0cf;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    position: relative;
}

/* header */
.hp-share-close {
    position: absolute;
    top: 8px;
    right: 10px;
    width: 32px;
    height: 32px;
    border-radius: 10px;
    border: 1px solid rgba(242,198,84,0.7);
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
}

.hp-share-close img {
    width: 18px;
    height: 18px;
}

.hp-share-logo-wrap {
    display: flex;
    justify-content: center;
    margin-top: 18px;
    margin-bottom: 10px;
}

.hp-share-logo {
    width: 62px;
    height: 62px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid rgba(242,198,84,0.7);
}

.hp-share-title {
    text-align: center;
    font-size: 0.9rem;
    margin-bottom: 2px;
    letter-spacing: 0.04em;
    color: #f7f0cf;
}

.hp-share-sub {
    text-align: center;
    font-size: 0.76rem;
    margin-bottom: 12px;
    color: #f1e8c4;
}

/* buttons row */
.hp-share-actions {
    display: flex;
    gap: 8px;
    margin-bottom: 10px;
}

.hp-share-btn {
    flex: 1;
    border-radius: 12px;
    border: 1px solid rgba(242,198,84,0.65);
    background: rgba(7,24,16,0.95);
    color: #f7f0cf;
    font-size: 0.78rem;
    padding: 8px 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
}

.hp-share-btn span {
    white-space: nowrap;
}

.hp-share-btn-copy {
    background: rgba(242,198,84,0.18);
    color: #f2c654;
}

/* link row */
.hp-share-link-row {
    background: rgba(7,24,16,0.9);
    border-radius: 10px;
    border: 1px solid rgba(242,198,84,0.4);
    padding: 4px 8px;
}

#hpShareLinkInput {
    width: 100%;
    border: 0;
    outline: 0;
    background: transparent;
    color: #f7f0cf;
    font-size: 0.76rem;
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}
`;

(function initSharePopup() {
    // inject CSS
    const styleId = "hp-share-style";
    if (!document.getElementById(styleId)) {
        const st = document.createElement("style");
        st.id = styleId;
        st.textContent = hpShareCSS;
        document.head.appendChild(st);
    }

    // inject HTML
    const overlay = document.createElement("div");
    overlay.className = "hp-share-overlay";
    overlay.id = "hpShareOverlay";
    overlay.innerHTML = `
      <div class="hp-share-card">
          <button class="hp-share-close" type="button">
              <img src="assets/svg/close.png" alt="Close">
          </button>

          <div class="hp-share-logo-wrap">
              <img src="assets/img/logo.png" alt="Harrys Pub" class="hp-share-logo">
          </div>

          <div class="hp-share-title">Share Harry's Pub</div>
          <div class="hp-share-sub">Choose how you want to share this page.</div>

          <div class="hp-share-actions">
              <button class="hp-share-btn hp-share-btn-copy" type="button">
                  <span>Copy link</span>
              </button>
              <button class="hp-share-btn hp-share-btn-wa" type="button">
                  <span>WhatsApp</span>
              </button>
              <button class="hp-share-btn hp-share-btn-mail" type="button">
                  <span>Email</span>
              </button>
          </div>

          <div class="hp-share-link-row">
              <input id="hpShareLinkInput" type="text" readonly>
          </div>
      </div>
    `;
    document.body.appendChild(overlay);

    const linkInput = overlay.querySelector("#hpShareLinkInput");
    const btnCopy  = overlay.querySelector(".hp-share-btn-copy");
    const btnWa    = overlay.querySelector(".hp-share-btn-wa");
    const btnMail  = overlay.querySelector(".hp-share-btn-mail");
    const btnClose = overlay.querySelector(".hp-share-close");

    let lastShareData = {
        title: document.title || "Harry's Pub",
        text: "Check out Harry's Pub",
        url: window.location.href
    };

    function buildShareData(trigger) {
        const titleAttr = trigger?.getAttribute("data-share-title");
        const textAttr  = trigger?.getAttribute("data-share-text");
        const urlAttr   = trigger?.getAttribute("data-share-url");

        const title = titleAttr || document.title || "Harry's Pub";
        const text  = textAttr  || "Check out Harry's Pub";
        let url     = urlAttr   || window.location.href;
        try {
            url = new URL(url, window.location.href).href;
        } catch {
            url = window.location.href;
        }

        return { title, text, url };
    }

    async function openNativeOrFallback(trigger) {
        const data = buildShareData(trigger);
        lastShareData = data;

        // native share try
        if (navigator.share) {
            try {
                await navigator.share({
                    title: data.title,
                    text: data.text,
                    url: data.url
                });
                return;
            } catch (err) {
                // ignore and fallback
            }
        }

        // fallback popup
        linkInput.value = data.url;
        overlay.classList.add("hp-share-visible");
    }

    function closeOverlay() {
        overlay.classList.remove("hp-share-visible");
    }

    // document-level click: trigger = .sl-share OR [data-share]
    document.addEventListener("click", (e) => {
        const trigger = e.target.closest(".sl-share, [data-share]");
        if (!trigger) return;

        e.preventDefault();
        openNativeOrFallback(trigger);
    });

    // inside popup
    overlay.addEventListener("click", (e) => {
        const target = e.target;

        if (target === overlay) {
            closeOverlay();
            return;
        }

        if (target.closest(".hp-share-close")) {
            closeOverlay();
            return;
        }

        if (target.closest(".hp-share-btn-copy")) {
            const url = lastShareData.url;
            if (navigator.clipboard?.writeText) {
                navigator.clipboard.writeText(url).catch(() => {});
            } else {
                linkInput.select();
                try { document.execCommand("copy"); } catch {}
            }
            return;
        }

        if (target.closest(".hp-share-btn-wa")) {
            const waText = `${lastShareData.title}\n${lastShareData.url}`;
            const waUrl = "https://wa.me/?text=" + encodeURIComponent(waText);
            window.open(waUrl, "_blank");
            return;
        }

        if (target.closest(".hp-share-btn-mail")) {
            const subject = encodeURIComponent(lastShareData.title);
            const body = encodeURIComponent((lastShareData.text || "") + "\n\n" + lastShareData.url);
            const mailUrl = `mailto:?subject=${subject}&body=${body}`;
            window.location.href = mailUrl;
            return;
        }
    });
})();