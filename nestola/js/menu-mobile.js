document.addEventListener("DOMContentLoaded", function () {

  /* ==================================================
     ACCORDION SUBMENU (MOBILE + TABLET)
     ================================================== */

  function setupAccordion(toggleSelector, itemSelector) {
    document.querySelectorAll(toggleSelector).forEach(btn => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        const currentLi = this.closest(itemSelector);
        if (!currentLi) return;

        const parentUl = currentLi.parentElement;

        /* close siblings */
        parentUl.querySelectorAll(":scope > " + itemSelector).forEach(li => {
          if (li !== currentLi) {
            li.classList.remove("open");
            const ul = li.querySelector(":scope > ul");
            if (ul) ul.style.display = "none";
          }
        });

        /* toggle current */
        currentLi.classList.toggle("open");
        const submenu = currentLi.querySelector(":scope > ul");

        if (submenu) {
          submenu.style.display =
            submenu.style.display === "block" ? "none" : "block";
        }
      });
    });
  }

  /* mobile accordion */
  setupAccordion(".m-toggle", ".m-has-children");

  /* tablet accordion */
  setupAccordion(".t-toggle", ".t-has-children");


  /* ==================================================
     MOBILE MAIN MENU TOGGLE (≤480px)
     ================================================== */

  const menuBtn = document.querySelector(".menu-toggle-icon");
  const mobileMenu = document.querySelector(".mobile-menu");
  const tabletMenu = document.querySelector(".menu-tablet");
  const header = document.querySelector(".main-header");

  if (!menuBtn || !header) return;

  function setHeaderHeight() {
    document.documentElement.style.setProperty(
      "--main-header-height",
      header.offsetHeight + "px"
    );
  }

  setHeaderHeight();
  window.addEventListener("resize", setHeaderHeight);

  menuBtn.addEventListener("click", () => {

    /* MOBILE */
    if (window.innerWidth <= 480 && mobileMenu) {
      const isOpen = mobileMenu.style.display === "block";
      mobileMenu.style.display = isOpen ? "none" : "block";
      document.body.classList.toggle("menu-open", !isOpen);
      setHeaderHeight();
      return;
    }

    /* TABLET */
    if (window.innerWidth >= 481 && window.innerWidth <= 960 && tabletMenu) {
  const isOpen = tabletMenu.classList.toggle("open");
  document.body.classList.toggle("menu-open", isOpen);
}
  });

});