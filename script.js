// ====================================================================
// Kimaltaen – yhteinen skripti
// - Footerin vuosi
// - Alavalikko (km-*)  —  click/tap + Esc, vain yksi auki
// - Pehmeä ankkurivieritys (vain saman sivun ankkurit) + focus
// - Ota yhteyttä -lomake: fetch + timeout + tilaviestit
// ====================================================================

(() => {
  // ------------------------------
  // Footerin vuosi
  // ------------------------------
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // ------------------------------
  // Yleinen click-delegointi (yksi kuuntelija riittää)
  // ------------------------------
  document.addEventListener('click', (e) => {
    const target = e.target;

    // 1) KM-alavalikon toggle
    const subToggle = target.closest?.('.km-sub-toggle');
    if (subToggle) {
      const li = subToggle.closest('.km-has-sub');
      if (!li) return;
      const isOpen = li.classList.toggle('km-open');
      subToggle.setAttribute('aria-expanded', String(isOpen));

      // Sulje muut auki olevat
      document.querySelectorAll('.km-has-sub.km-open').forEach((el) => {
        if (el !== li) {
          el.classList.remove('km-open');
          const t = el.querySelector('.km-sub-toggle');
          if (t) t.setAttribute('aria-expanded', 'false');
        }
      });

      e.stopPropagation(); // estä "klikkaus muualle" -haara tältä kierrokselta
      return;
    }

    // 2) Klikki muualle -> sulje kaikki alavalikot
    document.querySelectorAll('.km-has-sub.km-open').forEach((el) => {
      el.classList.remove('km-open');
      const t = el.querySelector('.km-sub-toggle');
      if (t) t.setAttribute('aria-expanded', 'false');
    });

    // 3) Pehmeä vieritys km-linkeille, jotka osoittavat TÄMÄN sivun ankkuriin
    const anchor = target.closest?.('a.km-link[href*="#"]');
    if (anchor) {
      // Luo URL suhteessa nykyiseen sijaintiin; sallitaan vain sama polku ja sama alkuperä
      const url = new URL(anchor.getAttribute('href'), window.location.href);
      const sameOrigin = url.origin === window.location.origin;
      const samePath = url.pathname === window.location.pathname;
      if (sameOrigin && samePath && url.hash) {
        const dest = document.querySelector(url.hash);
        if (dest) {
          e.preventDefault();
          // Kunnioita käyttäjän asetusta: jos reduced motion, älä animaoi
          const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
          dest.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
          // Vie focus kohteeseen (saavutettavuus)
          if (typeof dest.focus === 'function') {
            // Jos ei ole luonnostaan fokusoitava, tee siitä väliaikaisesti sellainen
            const hadTabindex = dest.hasAttribute('tabindex');
            if (!hadTabindex) dest.setAttribute('tabindex', '-1');
            dest.focus({ preventScroll: true });
            if (!hadTabindex) dest.removeAttribute('tabindex');
          }
        }
      }
    }
  }, { passive: true });

  // ------------------------------
  // Esc sulkee alavalikot
  // ------------------------------
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('.km-has-sub.km-open').forEach((el) => {
      el.classList.remove('km-open');
      const t = el.querySelector('.km-sub-toggle');
      if (t) t.setAttribute('aria-expanded', 'false');
    });
  });

  // ------------------------------
  // Ota yhteyttä -lomake
  //  - Optimistinen UI, 6s timeout, virheviestit
  // ------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#yhteys form');
    const status = document.getElementById('form-status');
    if (!form || !status) return;

    // Aria-live status (jos ei jo määritelty)
    if (!status.hasAttribute('role')) {
      status.setAttribute('role', 'status');
      status.setAttribute('aria-live', 'polite');
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Disable-nappi & tilaviestit
      const submitBtn = form.querySelector('[type="submit"]');
      const setStatus = (msg, cls) => {
        status.textContent = msg;
        status.className = cls || '';
      };

      try {
        if (submitBtn) submitBtn.disabled = true;
        setStatus('Lähetetään…', 'pending');

        // Timeout fetchiin
        const controller = new AbortController();
        const to = setTimeout(() => controller.abort(), 6000);

        const res = await fetch(form.action, {
          method: form.method || 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' },
          signal: controller.signal
        });

        clearTimeout(to);

        if (res.ok) {
          setStatus('Kiitos viestistäsi! ✨', 'ok');
          form.reset();
        } else {
          // Yritä lukea mahdollinen virheteksti
          let msg = 'Lähetyksessä tapahtui virhe. Yritä uudelleen.';
          try {
            const data = await res.json();
            if (data?.error) msg = data.error;
          } catch { /* ignore */ }
          setStatus(msg, 'err');
        }
      } catch (err) {
        setStatus(err?.name === 'AbortError'
          ? 'Yhteys aikakatkaistiin. Yritä uudelleen.'
          : 'Verkkovirhe. Tarkista yhteys.', 'err');
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  });
})();
