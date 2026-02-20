const pdfFile = "Merceologia_20alimentare_20e_20igiene_20alimenti_20CORSO_20BAR.pdf";

async function handleAction(actionType) {
    let blob = await getCachedFile();
    
    if (!blob) {
        blob = await fetchWithProgress(pdfFile);
    }

    const blobUrl = URL.createObjectURL(blob);
    
    if (actionType === 'download') {
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = "Merceologia_Alimentare.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } else {
        window.open(blobUrl, '_blank');
    }
}

// Button Events
document.getElementById("downloadBtn").addEventListener("click", () => handleAction('download'));

// "Apri il PDF" link ko bhi control karne ke liye:
const openLink = document.querySelector('a[href="' + pdfFile + '"]');
if(openLink) {
    openLink.addEventListener("click", (e) => {
        e.preventDefault();
        handleAction('open');
    });
}

// SHARE
document.getElementById("shareBtn").addEventListener("click", async () => {
    const url = window.location.href.split('?')[0].split('#')[0].replace(/\/[^\/]*$/, '/') + pdfFile;
    if (navigator.share) {
        try {
            await navigator.share({ title: "PDF Merceologia", url: url });
        } catch (err) {}
    } else {
        navigator.clipboard.writeText(url);
        alert("Link copiato!");
    }
});

// QR CODE
const qrModal = document.getElementById("qrModal");
document.getElementById("qrBtn").addEventListener("click", () => {
    const url = window.location.href.split('?')[0].split('#')[0].replace(/\/[^\/]*$/, '/') + pdfFile;
    document.getElementById("qrImage").src = "https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=" + encodeURIComponent(url);
    qrModal.style.display = "flex";
});

document.getElementById("closeQr").addEventListener("click", () => qrModal.style.display = "none");
qrModal.addEventListener("click", (e) => { if (e.target === qrModal) qrModal.style.display = "none"; });
