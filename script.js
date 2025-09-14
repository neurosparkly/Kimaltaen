// Perus: copyright-vuosi ja mobiilivalikko
(function(){
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
  const btn = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-nav');
  btn?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  // Demo-lomake
  const form = document.forms.namedItem('palaute');
  form?.addEventListener('submit', (e)=>{
    e.preventDefault();
    alert(form?.dataset?.success || "Kiitos!");
    form?.reset();
  });
})();
<script>
(function(){
  const btn = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-nav');

  // Kun menu avataan, kytke skrollikuuntelija varjoa varten
  function wireShadows(){
    const scroller = nav?.querySelector('ul');
    if(!scroller) return;

    const updateShadows = () => {
      // vasen varjo päälle jos skrollattu > 0
      if (scroller.scrollLeft > 0) {
        nav.classList.add('scrolled-left');
      } else {
        nav.classList.remove('scrolled-left');
      }
    };

    scroller.addEventListener('scroll', updateShadows, { passive: true });
    // kutsu heti kun menu avataan (tai jos linkkejä paljon)
    updateShadows();
  }

  // jos menu on jo valmiiksi auki DOMissa (esim. SSR), johdeta varjot
  if (nav?.classList.contains('open')) wireShadows();

  // kun käyttäjä avaa/ sulkee
  btn?.addEventListener('click', () => {
    // anna DOMin päivittyä, sitten kytke varjot
    setTimeout(wireShadows, 0);
  });

  // varmuuden vuoksi: kun ikkuna muuttuu
  window.addEventListener('resize', () => {
    if (nav?.classList.contains('open')) wireShadows();
  });
})();
</script>
