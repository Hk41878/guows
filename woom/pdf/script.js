const pdfFile = "Merceologia_20alimentare_20e_20igiene_20alimenti_20CORSO_20BAR.pdf";


// DOWNLOAD (Safari fix)
document.getElementById("downloadBtn").addEventListener("click", () => {
  const link = document.createElement("a");
  link.href = pdfFile;
  link.download = pdfFile;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});


// SHARE
document.getElementById("shareBtn").addEventListener("click", async () => {

  const url = window.location.origin + "/" + pdfFile;

  if (navigator.share) {
    try {
      await navigator.share({
        title: "Merceologia Alimentare PDF",
        url: url
      });
    } catch {}
  } else {
    navigator.clipboard.writeText(url);
    alert("Link copiato!");
  }
});


// QR CODE
const qrBtn = document.getElementById("qrBtn");
const qrModal = document.getElementById("qrModal");
const qrImage = document.getElementById("qrImage");

qrBtn.addEventListener("click", () => {

  const url = window.location.origin + "/" + pdfFile;

  qrImage.src =
    "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" +
    encodeURIComponent(url);

  qrModal.style.display = "flex";
});


// CLOSE ON OUTSIDE CLICK
qrModal.addEventListener("click", (e) => {
  if (e.target === qrModal) {
    qrModal.style.display = "none";
  }
});
