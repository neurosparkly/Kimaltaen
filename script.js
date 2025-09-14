(() => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const btn = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-nav');
  if (!btn || !nav) return;

  // Toggle
  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) wireShadows();
  });

  function wireShadows(){
    const scroller = nav.querySelector('ul');
    if (!scroller) return;

    const update = () => {
      nav.classList.toggle('scrolled-left', scroller.scrollLeft > 0);
      const moreRight = scroller.scrollWidth - scroller.clientWidth - scroller.scrollLeft > 0;
      nav.classList.toggle('scrolled-right', moreRight);
    };

    scroller.addEventListener('scroll', update, { passive: true });
    requestAnimationFrame(update);
  }

  if (nav.classList.contains('open')) wireShadows();
  window.addEventListener('resize', () => {
    if (nav.classList.contains('open')) wireShadows();
  });
})();
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-nav');

  btn.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    btn.classList.toggle('active', isOpen);
    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
});