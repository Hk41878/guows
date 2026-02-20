(() => {
  const PDF_FILE = "./Merceologia_20alimentare_20e_20igiene_20alimenti_20CORSO_20BAR.pdf";

  const shareBtn = document.getElementById("sharePdf");
  const hintEl = document.getElementById("hint");

  function setHint(msg) {
    if (!hintEl) return;
    hintEl.textContent = msg;
    if (msg) {
      window.clearTimeout(setHint._t);
      setHint._t = window.setTimeout(() => (hintEl.textContent = ""), 3500);
    }
  }

  async function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "true");
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  }

  shareBtn?.addEventListener("click", async () => {
    const absoluteUrl = new URL(PDF_FILE, window.location.href).toString();

    const shareData = {
      title: "Merceologia alimentare e igiene degli alimenti",
      text: "Apri o scarica il PDF.",
      url: absoluteUrl
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setHint("Condivisione avviata.");
        return;
      }

      const ok = await copyToClipboard(absoluteUrl);
      setHint(ok ? "Link copiato negli appunti." : "Impossibile copiare il link. Copialo manualmente.");
    } catch (err) {
      const ok = await copyToClipboard(absoluteUrl);
      setHint(ok ? "Link copiato negli appunti." : "Condivisione annullata.");
    }
  });

  // Prevent double-tap zoom feeling on some browsers by avoiding selectable text on buttons
  document.querySelectorAll(".btn").forEach((el) => {
    el.addEventListener("pointerdown", () => {});
  });
})();
