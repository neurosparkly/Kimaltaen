// Pieni apuskripti: päivitä copyright-vuosi ja demo-lomake
(function(){
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  const form = document.forms.namedItem('palaute');
  form?.addEventListener('submit', (e)=>{
    e.preventDefault();
    alert(form?.dataset?.success || "Kiitos!");
    form?.reset();
  });
})();

// --- Added: hamburger toggle ---
(function(){
  const btn = document.querySelector('[data-hamburger]');
  const drawer = document.getElementById('mobiilivalikko');
  const nav = document.querySelector('.site-header nav');
  function close(){
    if(!drawer) return;
    drawer.style.display = 'none';
    btn?.setAttribute('aria-expanded','false');
  }
  function open(){
    if(!drawer) return;
    drawer.style.display = 'block';
    btn?.setAttribute('aria-expanded','true');
  }
  function isMobile(){ return window.matchMedia('(max-width:780px)').matches; }
  if(btn && drawer && nav){
    btn.addEventListener('click',()=>{
      const openNow = btn.getAttribute('aria-expanded') === 'true';
      if(openNow) close(); else open();
    });
    window.addEventListener('resize',()=>{
      if(!isMobile()){ close(); drawer.style.display='none'; nav.style.display='flex'; }
      else { nav.style.display='none'; }
    });
  }
})();
