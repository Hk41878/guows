const DB_NAME = "PDF_Cache_DB";
const STORE_NAME = "files";
const FILE_KEY = "course_pdf";
const EXPIRY_TIME = 24 * 60 * 60 * 1000; // 24 Ghante

const openDB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, 1);
        request.onupgradeneeded = () => request.result.createObjectStore(STORE_NAME);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject("DB Error");
    });
};

async function getCachedFile() {
    const db = await openDB();
    return new Promise((resolve) => {
        const transaction = db.transaction(STORE_NAME, "readonly");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get(FILE_KEY);
        request.onsuccess = () => {
            const data = request.result;
            if (data && (Date.now() - data.timestamp < EXPIRY_TIME)) {
                resolve(data.blob);
            } else {
                resolve(null);
            }
        };
    });
}

async function saveFileToCache(blob) {
    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    store.put({ blob, timestamp: Date.now() }, FILE_KEY);
}

async function fetchWithProgress(url) {
    const response = await fetch(url);
    const reader = response.body.getReader();
    const contentLength = +response.headers.get('Content-Length');
    
    const progContainer = document.getElementById("progressContainer");
    const progBar = document.getElementById("progressBar");
    const progText = document.getElementById("progressText");

    if(progContainer) progContainer.style.display = "block";
    
    let receivedLength = 0;
    let chunks = []; 
    
    while(true) {
        const {done, value} = await reader.read();
        if (done) break;
        chunks.push(value);
        receivedLength += value.length;
        
        if(contentLength) {
            let percent = Math.round((receivedLength / contentLength) * 100);
            if(progBar) progBar.style.width = percent + "%";
            if(progText) progText.innerText = `Scaricamento: ${percent}%`;
        }
    }

    if(progContainer) progContainer.style.display = "none";
    const blob = new Blob(chunks, {type: 'application/pdf'});
    await saveFileToCache(blob);
    return blob;
}
