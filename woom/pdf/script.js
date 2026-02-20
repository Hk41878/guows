// 1. File ka sahi path (Variable name fix: const small letters mein)
const pdfFile = "Merceologia_20alimentare_20e_20igiene_20alimenti_20CORSO_20BAR.pdf";

// 2. DOWNLOAD PDF LOGIC (Safari Compatible)
document.getElementById("downloadBtn").addEventListener("click", async () => {
  try {
    const response = await fetch(pdfFile);
    
    // Agar server allow nahi kar raha (CORS issue), toh seedha link par bhej do
    if (!response.ok) throw new Error('Network response was not ok');

    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    // Temporary link create karna
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = "Merceologia_Alimentare_BAR.pdf"; // Download file name
    
    // Safari ke liye body mein add karna zaroori hai
    document.body.appendChild(a);
    a.click();

    // Cleanup: Memory bachane ke liye
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);
    }, 100);

  } catch (err) {
    // Agar upar wala logic fail ho (Safari Security), toh ye backup chalega:
    console.log("Blob download failed, using fallback...");
    const link = document.createElement("a");
    link.href = pdfFile;
    link.download = "Merceologia_Alimentare_BAR.pdf";
    link.target = "_blank";
    link.click();
  }
});

// 3. SHARE LOGIC
document.getElementById("shareBtn").addEventListener("click", async () => {
  const url = window.location.href.substring(0, window.location.href.lastIndexOf('/')) + "/" + pdfFile;

  if (navigator.share) {
    try {
      await navigator.share({
        title: "Dispensa Merceologia Alimentare",
        text: "Scarica la dispensa completa del corso BAR",
        url: url
      });
    } catch (err) {
      console.log("Share cancelled");
    }
  } else {
    // Clipboard copy backup
    navigator.clipboard.writeText(url).then(() => {
      alert("Link copiato negli appunti!");
    });
  }
});

// 4. QR CODE LOGIC
const qrBtn = document.getElementById("qrBtn");
const qrModal = document.getElementById("qrModal");
const qrImage = document.getElementById("qrImage");
const closeQr = document.getElementById("closeQr");

qrBtn.addEventListener("click", () => {
  const url = window.location.href.substring(0, window.location.href.lastIndexOf('/')) + "/" + pdfFile;
  
  qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(url)}`;
  qrModal.style.display = "flex";
});

// 5. MODAL CLOSE LOGIC
closeQr.addEventListener("click", () => {
  qrModal.style.display = "none";
});

qrModal.addEventListener("click", (e) => {
  if (e.target === qrModal) {
    qrModal.style.display = "none";
  }
});
