(() => {
  // 1) Copyright-vuosi
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 2) Hamburger-nappi ja nav
  const btn = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-nav');
  if (!btn || !nav) return;

  // Avaa/sulje valikko yhdellä kuuntelijalla
  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.classList.toggle('active', open);                 // 3 viivaa → risti
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) wireShadows();                               // kytke varjot kun auki
  });

  // 3) Reunavarjot rullaavaan valikkoon (vasen näkyy kun skrollattu, oikea jos sisältö jatkuu)
  function wireShadows(){
    const scroller = nav.querySelector('ul');
    if (!scroller) return;

    const update = () => {
      nav.classList.toggle('scrolled-left', scroller.scrollLeft > 0);
      const moreRight = scroller.scrollWidth - scroller.clientWidth - scroller.scrollLeft > 0;
      nav.classList.toggle('scrolled-right', moreRight);
    };

    scroller.addEventListener('scroll', update, { passive: true });
    // Päivitä heti avattaessa
    requestAnimationFrame(update);
  }

  // Jos valikko on jo auki (SSR tms.), kytke varjot
  if (nav.classList.contains('open')) wireShadows();

  // Ikkunan koon muuttuessa päivitä varjot, jos auki
  window.addEventListener('resize', () => {
    if (nav.classList.contains('open')) wireShadows();
  });
})();