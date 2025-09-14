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
const btn=document.querySelector('.nav-toggle');
const nav=document.getElementById('primary-nav');
btn?.addEventListener('click',()=>{
  const open=nav.classList.toggle('open');
  btn.setAttribute('aria-expanded', open?'true':'false');
});
