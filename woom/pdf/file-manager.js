const DB_NAME = "PDF_Cache_DB";
const STORE_NAME = "files";
const FILE_KEY = "course_pdf";
const EXPIRY_TIME = 24 * 60 * 60 * 1000; // 24 hours

// OPEN DATABASE
function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, 1);

        request.onupgradeneeded = function () {
            const db = request.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME);
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject("IndexedDB error");
    });
}

// GET CACHED FILE
async function getCachedFile() {
    try {
        const db = await openDB();

        return new Promise((resolve) => {
            const tx = db.transaction(STORE_NAME, "readonly");
            const store = tx.objectStore(STORE_NAME);
            const request = store.get(FILE_KEY);

            request.onsuccess = () => {
                const data = request.result;

                if (data && (Date.now() - data.timestamp < EXPIRY_TIME)) {
                    resolve(data.blob);
                } else {
                    resolve(null);
                }
            };

            request.onerror = () => resolve(null);
        });
    } catch {
        return null;
    }
}

// SAVE FILE TO CACHE
async function saveFileToCache(blob) {
    try {
        const db = await openDB();
        const tx = db.transaction(STORE_NAME, "readwrite");
        const store = tx.objectStore(STORE_NAME);
        store.put({ blob, timestamp: Date.now() }, FILE_KEY);
    } catch (err) {
        console.log("Cache save failed:", err);
    }
}

// FETCH WITH PROGRESS
async function fetchWithProgress(url) {
    const progressContainer = document.getElementById("progressContainer");
    const progressBar = document.getElementById("progressBar");
    const progressText = document.getElementById("progressText");

    if (progressContainer) progressContainer.style.display = "block";
    if (progressBar) progressBar.style.width = "0%";
    if (progressText) progressText.innerText = "Scaricamento: 0%";

    const response = await fetch(url);

    // SAFARI fallback (no streaming support)
    if (!response.body || !response.body.getReader) {
        const blob = await response.blob();
        await saveFileToCache(blob);

        if (progressBar) progressBar.style.width = "100%";
        if (progressText) progressText.innerText = "Scaricamento: 100%";

        setTimeout(() => {
            if (progressContainer) progressContainer.style.display = "none";
        }, 600);

        return blob;
    }

    const reader = response.body.getReader();
    const contentLengthHeader = response.headers.get("Content-Length");
    const total = contentLengthHeader ? parseInt(contentLengthHeader, 10) : null;

    let receivedLength = 0;
    const chunks = [];

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        chunks.push(value);
        receivedLength += value.length;

        let percent;

        if (total) {
            percent = Math.round((receivedLength / total) * 100);
        } else {
            // If Content-Length missing (GitHub Pages case)
            percent = Math.min(95, Math.round(receivedLength / 150000));
        }

        if (progressBar) progressBar.style.width = percent + "%";
        if (progressText) progressText.innerText = `Scaricamento: ${percent}%`;
    }

    const blob = new Blob(chunks, { type: "application/pdf" });
    await saveFileToCache(blob);

    if (progressBar) progressBar.style.width = "100%";
    if (progressText) progressText.innerText = "Scaricamento: 100%";

    setTimeout(() => {
        if (progressContainer) progressContainer.style.display = "none";
    }, 600);

    return blob;
}
