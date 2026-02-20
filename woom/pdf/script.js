const pdfFile = "Merceologia_20alimentare_20e_20igiene_20alimenti_20CORSO_20BAR.pdf";


// DOWNLOAD (Safe for Safari + Chrome)
async function downloadPDF() {
    try {
        let blob = await getCachedFile();

        if (!blob) {
            blob = await fetchWithProgress(pdfFile);
        }

        const blobUrl = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = "Merceologia_Alimentare.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        setTimeout(() => {
            URL.revokeObjectURL(blobUrl);
        }, 1000);

    } catch (error) {
        alert("Errore durante il download.");
    }
}


// OPEN (Direct file — no popup)
function openPDF(e) {
    e.preventDefault();
    window.location.href = pdfFile;
}


// BUTTON EVENTS
document.getElementById("downloadBtn").addEventListener("click", downloadPDF);

const openLink = document.querySelector(`a[href="${pdfFile}"]`);
if (openLink) {
    openLink.addEventListener("click", openPDF);
}


// SHARE
document.getElementById("shareBtn").addEventListener("click", async () => {

    const baseUrl = window.location.origin + window.location.pathname.replace(/\/[^\/]*$/, "/");
    const url = baseUrl + pdfFile;

    if (navigator.share) {
        try {
            await navigator.share({
                title: "PDF Merceologia",
                url: url
            });
        } catch {}
    } else {
        await navigator.clipboard.writeText(url);
        alert("Link copiato!");
    }
});


// QR CODE
const qrModal = document.getElementById("qrModal");
const qrImage = document.getElementById("qrImage");

document.getElementById("qrBtn").addEventListener("click", () => {

    const baseUrl = window.location.origin + window.location.pathname.replace(/\/[^\/]*$/, "/");
    const url = baseUrl + pdfFile;

    qrImage.src =
        "https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=" +
        encodeURIComponent(url);

    qrModal.style.display = "flex";
});

document.getElementById("closeQr").addEventListener("click", () => {
    qrModal.style.display = "none";
});

qrModal.addEventListener("click", (e) => {
    if (e.target === qrModal) {
        qrModal.style.display = "none";
    }
});
