// Accessible hamburger menu toggle
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
      drawer.style.display = 'none';
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