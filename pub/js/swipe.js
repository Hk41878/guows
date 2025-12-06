import * as pages from "./menuPages.js";

const page0HTML = pages.page0HTML;
const page1HTML = pages.page1HTML;
const page2HTML = pages.page2HTML;
const page3HTML = pages.page3HTML;
const page4HTML = pages.page4HTML;
const page5HTML = pages.page5HTML;   // ★ NEW

const app = document.getElementById("app");

let currentPage = 0; 
// 0=home,1=menu1,2=menu2,3=menu3,4=menu4,5=menu5


/* ============================================================
   RENDER PAGE
============================================================ */
function render(page) {
    currentPage = page;

    if (page === 0) {
        app.innerHTML = page0HTML;
        app.className = "homeMode";
        attachNavClicks();
        return;
    }

    app.className = "menuMode";
    app.style.opacity = 0;

    const html =
        page === 1 ? page1HTML :
        page === 2 ? page2HTML :
        page === 3 ? page3HTML :
        page === 4 ? page4HTML :
        page5HTML;                   // ★ NEW

    setTimeout(() => {
        app.innerHTML = html;
        app.style.opacity = 1;
        attachNavClicks();
    }, 10);
}


/* ============================================================
   PAGE NAVIGATION (LEFT ↔ RIGHT)
============================================================ */
function nextPage() {
    if (currentPage === 0) render(1);
    else if (currentPage === 1) render(2);
    else if (currentPage === 2) render(3);
    else if (currentPage === 3) render(4);
    else if (currentPage === 4) render(5);   // ★ NEW
}

function prevPage() {
    if (currentPage === 5) render(4);        // ★ NEW
    else if (currentPage === 4) render(3);
    else if (currentPage === 3) render(2);
    else if (currentPage === 2) render(1);
    else if (currentPage === 1) render(0);
}


/* ============================================================
   INITIAL LOAD
============================================================ */
render(0);


/* ============================================================
   SWIPE DETECTION
============================================================ */
let sx = 0;

document.addEventListener("touchstart", e => {
    const t = e.changedTouches[0];
    sx = t.clientX;
});

document.addEventListener("touchend", e => {
    const t = e.changedTouches[0];
    const dx = t.clientX - sx;

    if (Math.abs(dx) < 40) return;

    if (dx > 0) prevPage();     // right swipe
    else nextPage();            // left swipe
});


/* ============================================================
   CLICK HANDLERS
============================================================ */
function attachNavClicks() {

    // HOME button (page1–page5)
    document.querySelectorAll(".home-btn").forEach(btn => {
        btn.onclick = () => render(0);
    });

    // MENU button (home page)
    document.querySelectorAll(".nav-link").forEach(btn => {
        if (btn.textContent.trim().toLowerCase() === "menu") {
            btn.onclick = () => render(1);
        }
    });
}