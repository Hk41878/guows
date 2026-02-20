const pdfFile = "Merceologia_20alimentare_20e_20igiene_20alimenti_20CORSO_20BAR.pdf";


// SAFARI COMPATIBLE DOWNLOAD
document.getElementById("downloadBtn").addEventListener("click", async () => {

  try {
    const response = await fetch(pdfFile);
    const blob = await response.blob();

    const blobUrl = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = "Merceologia_BAR.pdf";
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    window.URL.revokeObjectURL(blobUrl);

  } catch (err) {
    alert("Download failed.");
  }

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
const closeQr = document.getElementById("closeQr");

qrBtn.addEventListener("click", () => {

  const url = window.location.origin + "/" + pdfFile;

  qrImage.src =
    "https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=" +
    encodeURIComponent(url);

  qrModal.style.display = "flex";

});


// CLOSE BUTTON
closeQr.addEventListener("click", () => {
  qrModal.style.display = "none";
});


// CLOSE OUTSIDE CLICK
qrModal.addEventListener("click", (e) => {
  if (e.target === qrModal) {
    qrModal.style.display = "none";
  }
});
