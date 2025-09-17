// ------------------------------
// Footerin vuosi
// ------------------------------
(() => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

// ------------------------------
// Kimaltaen – alavalikko (km-)
// - Klikkaus avaa/sulkee
// - Vain yksi auki kerrallaan
// - Klikkaus muualle tai Esc sulkee
// ------------------------------
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.km-sub-toggle');
  const openItems = document.querySelectorAll('.km-has-sub.km-open');

  if (btn) {
    const li = btn.closest('.km-has-sub');
    const isOpen = li.classList.toggle('km-open');
    btn.setAttribute('aria-expanded', String(isOpen));

    // Sulje muut auki olevat
    openItems.forEach(el => {
      if (el !== li) {
        el.classList.remove('km-open');
        const t = el.querySelector('.km-sub-toggle');
        if (t) t.setAttribute('aria-expanded', 'false');
      }
    });

    e.stopPropagation();
  } else {
    // Klikki muualle: sulje kaikki
    openItems.forEach(el => {
      el.classList.remove('km-open');
      const t = el.querySelector('.km-sub-toggle');
      if (t) t.setAttribute('aria-expanded','false');
    });
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.km-has-sub.km-open').forEach(el => {
      el.classList.remove('km-open');
      const t = el.querySelector('.km-sub-toggle');
      if (t) t.setAttribute('aria-expanded','false');
    });
  }
});

// ------------------------------
// Pehmeä vieritys vain sivun omiin ankkureihin
// (linkit, joiden hrefissä on # ja jotka osoittavat samalle polulle)
// ------------------------------
document.addEventListener('click', (e) => {
  const a = e.target.closest('a.km-link[href*="#"]');
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

// ------------------------------
// Ota yhteyttä -lomake (jos olemassa)
// ------------------------------
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#yhteys form');
  const status = document.getElementById('form-status');
  if (!form || !status) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    try {
      const res = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        status.textContent = 'Kiitos viestistäsi! ✨';
        status.className = 'ok';
        form.reset();
      } else {
        status.textContent = 'Lähetyksessä tapahtui virhe. Yritä uudelleen.';
        status.className = 'err';
      }
    } catch {
      status.textContent = 'Verkkovirhe. Tarkista yhteys.';
      status.className = 'err';
    }
  });
});
