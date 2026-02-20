const pdfFile = "Merceologia_20alimentare_20e_20igiene_20alimenti_20CORSO_20BAR.pdf";

// MAIN HANDLER
async function handleAction(actionType) {
    try {
        let blob = await getCachedFile();

        if (!blob) {
            blob = await fetchWithProgress(pdfFile);
        }

        const blobUrl = URL.createObjectURL(blob);

        if (actionType === "download") {
            const a = document.createElement("a");
            a.href = blobUrl;
            a.download = "Merceologia_Alimentare.pdf";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            setTimeout(() => {
                URL.revokeObjectURL(blobUrl);
            }, 1000);

        } else if (actionType === "open") {
            window.open(blobUrl, "_blank");

            setTimeout(() => {
                URL.revokeObjectURL(blobUrl);
            }, 5000);
        }

    } catch (error) {
        console.error("Errore:", error);
        alert("Errore durante il caricamento del PDF.");
    }
}

// DOWNLOAD BUTTON
document.getElementById("downloadBtn").addEventListener("click", () => {
    handleAction("download");
});

// OPEN LINK CONTROL
const openLink = document.querySelector(`a[href="${pdfFile}"]`);
if (openLink) {
    openLink.addEventListener("click", function (e) {
        e.preventDefault();
        handleAction("open");
    });
}

// SHARE BUTTON
document.getElementById("shareBtn").addEventListener("click", async () => {

    const baseUrl = window.location.origin + window.location.pathname.replace(/\/[^\/]*$/, "/");
    const url = baseUrl + pdfFile;

    if (navigator.share) {
        try {
            await navigator.share({
                title: "PDF Merceologia",
                text: "Scarica il PDF del corso BAR",
                url: url
            });
        } catch (err) {
            console.log("Condivisione annullata");
        }
    } else {
        try {
            await navigator.clipboard.writeText(url);
            alert("Link copiato!");
        } catch {
            alert("Impossibile copiare il link.");
        }
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

// CLOSE QR
document.getElementById("closeQr").addEventListener("click", () => {
    qrModal.style.display = "none";
});

qrModal.addEventListener("click", (e) => {
    if (e.target === qrModal) {
        qrModal.style.display = "none";
    }
});
