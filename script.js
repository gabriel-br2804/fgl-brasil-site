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

// ─── VIDEO: AUTOPLAY ON SCROLL INTO VIEW ────────────────────
var fglVideo = document.getElementById('fglVideo');
var videoFrame = document.getElementById('videoFrame');
if (fglVideo && videoFrame) {
  if ('IntersectionObserver' in window) {
    var videoObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) { fglVideo.play().catch(function(){}); }
        else { fglVideo.pause(); }
      });
    }, { threshold: 0.4 });
    videoObserver.observe(videoFrame);
  } else {
    fglVideo.play().catch(function(){});
  }
}

// ─── VIDEO: MUTE TOGGLE ──────────────────────────────────────
var videoMuteBtn = document.getElementById('videoMute');
if (fglVideo && videoMuteBtn) {
  videoMuteBtn.addEventListener('click', function() {
    fglVideo.muted = !fglVideo.muted;
    var isMuted = fglVideo.muted;
    videoMuteBtn.setAttribute('aria-pressed', String(!isMuted));
    videoMuteBtn.setAttribute('aria-label', isMuted ? 'Ativar som' : 'Silenciar');
    videoMuteBtn.querySelector('.icon-off').hidden = !isMuted;
    videoMuteBtn.querySelector('.icon-on').hidden = isMuted;
  });
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
