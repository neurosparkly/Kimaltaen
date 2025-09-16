
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
  const form = document.querySelector("#yhteys form");
  const status = document.getElementById("form-status");
  if (!form || !status) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    try {
      const res = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        status.textContent = "Kiitos viestistäsi! ✨";
        status.className = "ok";
        form.reset();
      } else {
        status.textContent = "Lähetyksessä tapahtui virhe. Yritä uudelleen.";
        status.className = "err";
      }
    } catch {
      status.textContent = "Verkkovirhe. Tarkista yhteys.";
      status.className = "err";
    }
  });
});
// Kimaltaen vieritysvalikko
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.km-sub-toggle');
  const openItems = document.querySelectorAll('.km-has-sub.km-open');

  if (btn) {
    const li = btn.closest('.km-has-sub');
    const isOpen = li.classList.toggle('km-open');
    btn.setAttribute('aria-expanded', String(isOpen));
    openItems.forEach(el => {
      if (el !== li) {
        el.classList.remove('km-open');
        el.querySelector('.km-sub-toggle').setAttribute('aria-expanded','false');
      }
    });
    e.stopPropagation();
  } else {
    openItems.forEach(el => {
      el.classList.remove('km-open');
      el.querySelector('.km-sub-toggle').setAttribute('aria-expanded','false');
    });
  }
});

// Sulje Escillä
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.km-has-sub.km-open').forEach(el => {
      el.classList.remove('km-open');
      el.querySelector('.km-sub-toggle').setAttribute('aria-expanded','false');
    });
  }
});

// Pehmeä vieritys vain km-linkeille
document.addEventListener('click', (e) => {
  const a = e.target.closest('a.km-link[href^="#"], a.km-link[href*="#"]');
  if (!a) return;
  const url = new URL(a.href, location.href);
  if (url.pathname === location.pathname && url.hash) {
    const target = document.querySelector(url.hash);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
});
