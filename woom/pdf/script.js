const pdfFile = "Merceologia_20alimentare_20e_20igiene_20alimenti_20CORSO_20BAR.pdf";


// DOWNLOAD (Safari Compatible)
async function downloadPDF() {
    try {
        let originalBlob = await getCachedFile();

        if (!originalBlob) {
            originalBlob = await fetchWithProgress(pdfFile);
        }

        // 🔥 Convert to octet-stream to force download in Safari
        const forceDownloadBlob = new Blob(
            [originalBlob],
            { type: "application/octet-stream" }
        );

        const blobUrl = URL.createObjectURL(forceDownloadBlob);

        // Safari safe download trigger
        window.location.href = blobUrl;

        setTimeout(() => {
            URL.revokeObjectURL(blobUrl);
        }, 3000);

    } catch (error) {
        alert("Errore durante il download.");
    }
}


// BUTTON EVENT
document.getElementById("downloadBtn")
    .addEventListener("click", downloadPDF);


// SHARE
document.getElementById("shareBtn")
    .addEventListener("click", async () => {

        const baseUrl =
            window.location.origin +
            window.location.pathname.replace(/\/[^\/]*$/, "/");

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


// QR
const qrModal = document.getElementById("qrModal");
const qrImage = document.getElementById("qrImage");

document.getElementById("qrBtn")
    .addEventListener("click", () => {

        const baseUrl =
            window.location.origin +
            window.location.pathname.replace(/\/[^\/]*$/, "/");

        const url = baseUrl + pdfFile;

        qrImage.src =
            "https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=" +
            encodeURIComponent(url);

        qrModal.style.display = "flex";
    });

document.getElementById("closeQr")
    .addEventListener("click", () => {
        qrModal.style.display = "none";
    });

qrModal.addEventListener("click", (e) => {
    if (e.target === qrModal) {
        qrModal.style.display = "none";
    }
});
