const pdfFile = "Merceologia_20alimentare_20e_20igiene_20alimenti_20CORSO_20BAR.pdf";


// MAIN HANDLER
async function handleAction(type) {

    let blob = await getCachedFile();

    // If not cached → download with progress first
    if (!blob) {
        try {
            blob = await fetchWithProgress(pdfFile);
        } catch (err) {
            alert("Errore durante il caricamento del file.");
            return;
        }
    }

    // ===== OPEN =====
    if (type === "open") {

        const blobUrl = URL.createObjectURL(blob);

        // Safari safe open
        window.location.href = blobUrl;

        setTimeout(() => {
            URL.revokeObjectURL(blobUrl);
        }, 5000);
    }

    // ===== DOWNLOAD =====
    if (type === "download") {

        // 🔥 Force Safari download
        const downloadBlob = new Blob(
            [blob],
            { type: "application/octet-stream" }
        );

        const blobUrl = URL.createObjectURL(downloadBlob);

        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = "Merceologia_alimentare_e_igiene_alimenti_CORSO_BAR.pdf";

        document.body.appendChild(link);
        link.click();

        setTimeout(() => {
            document.body.removeChild(link);
            URL.revokeObjectURL(blobUrl);
        }, 300);
    }
}


// BUTTON EVENTS
document.getElementById("downloadBtn")
    .addEventListener("click", () => handleAction("download"));


// Open link control (Apri il PDF)
const openLink = document.querySelector(`a[href="${pdfFile}"]`);
if (openLink) {
    openLink.addEventListener("click", function (e) {
        e.preventDefault();
        handleAction("open");
    });
}


// SHARE
document.getElementById("shareBtn")
    .addEventListener("click", async () => {

        const baseUrl =
            window.location.origin +
            window.location.pathname.replace(/\/[^\/]*$/, "/");

        const url = window.location.origin + window.location.pathname;

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

        const url = window.location.origin + window.location.pathname;

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
