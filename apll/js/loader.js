// loader.js — fastest lazy-load + warm-up for form.js and mobile menu

// --- Mobile menu toggle (unchanged) ---
(function(){
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
})();

// --- Fast loader for form.js ---
(function(){
  const FORM_SRC = 'https://app.olvia.it/form/form.js'; // your live script
  let formLoaded = false;
  let loadingPromise = null;

  function loadFormScript() {
    if (formLoaded) return Promise.resolve();
    if (loadingPromise) return loadingPromise;

    loadingPromise = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = FORM_SRC;
      s.async = true;
      s.crossOrigin = 'anonymous';
      s.onload = () => { formLoaded = true; resolve(); };
      s.onerror = () => { loadingPromise = null; reject(new Error('form.js failed to load')); };
      document.head.appendChild(s);
    });
    return loadingPromise;
  }

  // Warm-up on idle (so first tap feels instant)
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => loadFormScript().catch(()=>{}), { timeout: 2000 });
  } else {
    setTimeout(() => loadFormScript().catch(()=>{}), 1200);
  }

  // Delegate clicks for buttons: open modal with selected service
  const grid = document.querySelector('.services-grid');
  if (!grid) return;

  grid.addEventListener('pointerenter', () => {  // pre-warm on hover for desktop
    loadFormScript().catch(()=>{});
  }, { once: true });

  grid.addEventListener('click', async (e) => {
    const btn = e.target.closest('[data-service]');
    if (!btn) return;

    const service = btn.getAttribute('data-service') || 'unknown';
    try {
      await loadFormScript();
      // Expect form.js to expose a global opener:
      // window.AppForm.open({ service, source: 'github-static' })
      if (window.AppForm && typeof window.AppForm.open === 'function') {
        window.AppForm.open({ service, source: 'github-static' });
      } else {
        alert('Form is loaded but opener not found. Please try again.');
      }
    } catch (err) {
      alert('Unable to load the form right now. Please check your connection and try again.');
    }
  });
})();
