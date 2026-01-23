document.addEventListener("DOMContentLoaded", function () {

  const currentPath = window.location.pathname;

  /* ================= DESKTOP ================= */
  document.querySelectorAll(".level-1 > li > a").forEach(link => {
    const href = link.getAttribute("href");
    if (!href) return;

    if (href === "/" && currentPath === "/") {
      link.parentElement.classList.add("active");
      return;
    }

    if (href !== "/" && currentPath.startsWith(href)) {
      link.parentElement.classList.add("active");
    }
  });

  /* ================= MOBILE ================= */
  document.querySelectorAll(".mobile-menu a").forEach(link => {
    const href = link.getAttribute("href");
    if (!href) return;

    if (href === "/" && currentPath === "/") {
      link.classList.add("active");
      return;
    }

    if (href !== "/" && currentPath.startsWith(href)) {
      const row = link.closest(".m-row");
      if (row) {
        row.closest("li")?.classList.add("active");
      } else {
        link.classList.add("active");
      }
    }
  });

  /* ================= TABLET ================= */
  document.querySelectorAll(".menu-tablet a").forEach(link => {
    const href = link.getAttribute("href");
    if (!href) return;

    if (href === "/" && currentPath === "/") {
      link.classList.add("active");
      return;
    }

    if (href !== "/" && currentPath.startsWith(href)) {
      const row = link.closest(".t-row");
      if (row) {
        row.closest("li")?.classList.add("active");
      } else {
        link.classList.add("active");
      }
    }
  });

});