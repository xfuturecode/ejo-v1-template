document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(`Clicked on: ${button.textContent}`);
  });
});

// Set footer year
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Mobile nav toggle with scrim, a11y and scroll lock
const toggle = document.getElementById('menuToggle');
const drawer = document.getElementById('navDrawer');
const scrim = document.getElementById('navScrim');
function setNavOpen(isOpen){
  if (!toggle || !drawer || !scrim) return;
  drawer.classList.toggle('open', isOpen);
  scrim.classList.toggle('is-open', isOpen);
  toggle.classList.toggle('is-open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
  toggle.setAttribute('aria-expanded', String(isOpen));
}
if (toggle && drawer && scrim) {
  toggle.setAttribute('aria-expanded', 'false');
  toggle.addEventListener('click', () => {
    const next = !drawer.classList.contains('open');
    setNavOpen(next);
  });
  scrim.addEventListener('click', () => setNavOpen(false));
  drawer.addEventListener('click', (e)=>{
    const target = e.target;
    if (target && target.tagName === 'A') setNavOpen(false);
  });
  document.addEventListener('keydown', (e)=>{
    if (e.key === 'Escape') setNavOpen(false);
  });
}

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
  }, { threshold: 0.2 });
  revealEls.forEach(el => io.observe(el));
}

// Simple slider for testimonials
(function(){
  const slidesContainer = document.getElementById('slides');
  if (!slidesContainer) return;
  const dotsContainer = document.getElementById('sliderDots');
  const slides = Array.from(slidesContainer.children);
  let index = 0;
  function renderDots(){
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    slides.forEach((_, i) => {
      const d = document.createElement('div');
      d.className = 'dot' + (i===index ? ' active' : '');
      d.addEventListener('click', ()=>{ index = i; update(); });
      dotsContainer.appendChild(d);
    });
  }
  function update(){
    slidesContainer.style.transform = `translateX(${-index * 344}px)`; // width + gap
    renderDots();
  }
  setInterval(()=>{ index = (index + 1) % slides.length; update(); }, 4000);
  update();
})();

// Hero slider (images + texts)
(function(){
  const root = document.getElementById('heroSlider');
  if (!root) return;
  const slides = Array.from(root.querySelectorAll('.hero-slide'));
  const prev = document.getElementById('heroPrev');
  const next = document.getElementById('heroNext');
  const dotsWrap = document.getElementById('heroDots');
  let i = 0; let timer;
  function setActive(n){
    slides.forEach((s, k) => s.classList.toggle('is-active', k === n));
    if (dotsWrap){
      Array.from(dotsWrap.children).forEach((d, k) => d.classList.toggle('active', k === n));
    }
  }
  function go(n){ i = (n + slides.length) % slides.length; setActive(i); }
  function autoplay(){ clearInterval(timer); timer = setInterval(()=>go(i+1), 5000); }
  // dots
  if (dotsWrap){
    slides.forEach((_, k) => {
      const d = document.createElement('div'); d.className = 'dot' + (k===0?' active':'');
      d.addEventListener('click', ()=>{ go(k); autoplay(); });
      dotsWrap.appendChild(d);
    });
  }
  // arrows
  if (prev) prev.addEventListener('click', ()=>{ go(i-1); autoplay(); });
  if (next) next.addEventListener('click', ()=>{ go(i+1); autoplay(); });
  // swipe
  let sx=0; root.addEventListener('touchstart', e=>{ sx = e.touches[0].clientX; });
  root.addEventListener('touchend', e=>{ const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx)>40){ dx>0?go(i-1):go(i+1); autoplay(); } });
  setActive(0); autoplay();
})();