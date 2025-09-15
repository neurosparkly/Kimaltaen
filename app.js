// Hamburger + mobile drawer
(function () {
  const btn = document.querySelector('[data-hamburger]');
  const drawer = document.querySelector('[data-mobile-drawer]');
  const navLinks = document.querySelector('.nav-links');

  function updateVisibility() {
    const isMobile = window.matchMedia('(max-width: 820px)').matches;
    if (isMobile) {
      btn.classList.remove('is-hidden');
      navLinks.classList.add('is-hidden');
    } else {
      btn.classList.add('is-hidden');
      navLinks.classList.remove('is-hidden');
      if (drawer) drawer.style.display = 'none';
      btn.setAttribute('aria-expanded', 'false');
    }
  }

  if (btn && drawer && navLinks) {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      drawer.style.display = expanded ? 'none' : 'block';
    });
    window.addEventListener('resize', updateVisibility);
    updateVisibility();
  }
})();

// Load content from content.js (window.SITE_CONTENT) and inject into pages
(function () {
  if (!window.SITE_CONTENT) return;
  const C = window.SITE_CONTENT;

  // Fill common bits
  const brandText = document.querySelector('[data-brand-text]');
  if (brandText && C.brand?.name) brandText.textContent = C.brand.name;

  // Logo handling: if assets/logo.png exists it's used in markup, else fallback stays
  // (No JS needed.)

  // Page-specific content by data-slot attributes
  document.querySelectorAll('[data-slot]').forEach(node => {
    const path = node.getAttribute('data-slot').split('.');
    let val = C;
    for (const k of path) val = val?.[k];
    if (typeof val === 'string') node.textContent = val;
    if (typeof val === 'object' && val?.html) node.innerHTML = val.html;
  });
})();

// Optional: theme switcher if element present
(function () {
  const select = document.querySelector('[data-theme-picker]');
  if (!select) return;
  select.addEventListener('change', () => {
    document.body.className = select.value;
  });
})();