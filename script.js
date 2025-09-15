
(() => {
  // Update copyright year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Hamburger toggle + scroll shadows
  const btn = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-nav');
  if (btn && nav) {
    btn.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      btn.classList.toggle('active', open);
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
      scroller.addEventListener('scroll', update, { passive:true });
      requestAnimationFrame(update);
    }

    if (nav.classList.contains('open')) wireShadows();
    window.addEventListener('resize', () => {
      if (nav.classList.contains('open')) wireShadows();
    });
  }
})();
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-header nav");

  if (navToggle && nav) {
    // Avaa/sulje menu klikistä
    navToggle.addEventListener("click", () => {
      nav.classList.toggle("open");
      navToggle.classList.toggle("active");
    });

    // Reunavarjon hallinta vaakaskrollissa
    const ul = nav.querySelector("ul");
    if (ul) {
      ul.addEventListener("scroll", () => {
        if (ul.scrollLeft > 0) {
          nav.classList.add("scrolled-left");
        } else {
          nav.classList.remove("scrolled-left");
        }
      });
    }
  }
});
