// ─── NAVBAR SCROLL ─────────────────────────────────────────
var navbar = document.getElementById('navbar');
window.addEventListener('scroll', function() {
  if (window.scrollY > 40) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
}, { passive: true });

// ─── MOBILE MENU ───────────────────────────────────────────
function toggleMenu() {
  var menu = document.getElementById('mobileMenu');
  var btn = document.getElementById('hamburger');
  var isOpen = menu.classList.toggle('open');
  btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

// ─── REVEAL ON SCROLL ──────────────────────────────────────
var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var revealEls = document.querySelectorAll('.reveal');
if (prefersReducedMotion || !('IntersectionObserver' in window)) {
  revealEls.forEach(function(el) { el.classList.add('visible'); });
} else {
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(function(el) { observer.observe(el); });
}

// ─── VIDEO PLAY BUTTON ─────────────────────────────────────
var fglVideo = document.getElementById('fglVideo');
var videoFrame = document.getElementById('videoFrame');
var videoPlayBtn = document.getElementById('videoPlay');
if (fglVideo && videoFrame && videoPlayBtn) {
  videoPlayBtn.addEventListener('click', function() { fglVideo.play(); });
  fglVideo.addEventListener('play', function() { videoFrame.classList.add('playing'); });
  fglVideo.addEventListener('pause', function() { videoFrame.classList.remove('playing'); });
}

// ─── ACTIVE NAV LINK ───────────────────────────────────────
var sections = document.querySelectorAll('section[id]');
var navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');
window.addEventListener('scroll', function() {
  var current = '';
  sections.forEach(function(s) {
    if (window.scrollY >= s.offsetTop - 130) current = s.id;
  });
  navLinks.forEach(function(a) {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}, { passive: true });
