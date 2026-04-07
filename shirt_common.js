// ─── NAVBAR ───
const navbar = document.getElementById('navbar');
addEventListener('scroll', () => navbar.classList.toggle('scrolled', scrollY > 50), { passive: true });

// ─── BURGER ───
const burger = document.getElementById('burger');
const nav    = document.getElementById('navLinks');
const spans  = burger.querySelectorAll('span');
let open = false;

burger.addEventListener('click', () => {
  open = !open;
  nav.classList.toggle('open', open);
  spans[0].style.transform = open ? 'translateY(7px) rotate(45deg)' : '';
  spans[1].style.opacity   = open ? '0' : '';
  spans[2].style.transform = open ? 'translateY(-7px) rotate(-45deg)' : '';
});

nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  open = false; nav.classList.remove('open');
  spans[0].style.transform = spans[2].style.transform = spans[1].style.opacity = '';
}));

// ─── SCROLL REVEAL ───
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('[data-r]').forEach(el => obs.observe(el));

// ─── GALLERY ───
const galleryTrack = document.querySelector('.gallery-track');
const slides       = document.querySelectorAll('.gallery-slide');
const dotsWrap     = document.querySelector('.gallery-dots');
const thumbs       = document.querySelectorAll('.gallery-thumbs button');

if (galleryTrack && slides.length) {
  let idx = 0;

  // Create dots
  slides.forEach((_, i) => {
    const d = document.createElement('button');
    if (i === 0) d.classList.add('active');
    d.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(d);
  });
  const dots = dotsWrap.querySelectorAll('button');

  function goTo(n) {
    idx = (n + slides.length) % slides.length;
    galleryTrack.style.transform = `translateX(-${idx * 100}%)`;
    dots.forEach((d,i) => d.classList.toggle('active', i === idx));
    thumbs.forEach((t,i) => t.classList.toggle('active', i === idx));
  }

  // Thumb clicks
  thumbs.forEach((t, i) => t.addEventListener('click', () => goTo(i)));

  // Touch swipe
  let tx = 0;
  galleryTrack.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
  galleryTrack.addEventListener('touchend', e => {
    const d = tx - e.changedTouches[0].clientX;
    if (Math.abs(d) > 50) goTo(idx + (d > 0 ? 1 : -1));
  });

  // Keyboard
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') goTo(idx - 1);
    if (e.key === 'ArrowRight') goTo(idx + 1);
  });
}

// ─── ZOOM ON HOVER (desktop) ───
document.querySelectorAll('.gallery-slide img').forEach(img => {
  img.addEventListener('mousemove', e => {
    if (window.innerWidth < 900) return;
    const r = img.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top)  / r.height) * 100;
    img.style.transformOrigin = `${x}% ${y}%`;
    img.style.transform = 'scale(1.6)';
    img.style.cursor = 'zoom-out';
  });
  img.addEventListener('mouseleave', () => {
    img.style.transformOrigin = 'center center';
    img.style.transform = 'scale(1)';
    img.style.cursor = 'zoom-in';
  });
});

// ─── SIZE SELECTION ───
document.querySelectorAll('.sizes button').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.closest('.sizes').querySelectorAll('button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// ─── SECURITY ───
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('keydown', e => {
  if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && 'IJC'.includes(e.key)) || (e.ctrlKey && e.key === 'U'))
    e.preventDefault();
});
