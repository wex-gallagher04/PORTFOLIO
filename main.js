//* ─── CUSTOM CURSOR ─── */
const isTouchDevice = window.matchMedia("(hover: none) and (pointer: coarse)").matches;

const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursor-ring');

if (!isTouchDevice) {
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
  });

  (function animCursor() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
    ring.style.left   = rx + 'px';
    ring.style.top    = ry + 'px';
    requestAnimationFrame(animCursor);
  })();
} else {
  cursor.style.display = 'none';
  ring.style.display   = 'none';
}

/* ─── NAV SCROLL ─── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ─── HAMBURGER / MOBILE MENU ─── */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

document.querySelectorAll('.mm-link').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ─── TYPEWRITER ─── */
const phrases = [
  'a Database Engineer.',
  'a Data Analyst.',
  'a Web Developer.',
  'a Technical Writer.'
];
let pi = 0, ci = 0, deleting = false;
const tw = document.getElementById('typewriter');

function type() {
  const word = phrases[pi];
  if (!deleting) {
    tw.textContent = 'I am ' + word.slice(0, ++ci);
  } else {
    tw.textContent = 'I am ' + word.slice(0, --ci);
  }

  if (!deleting && ci === word.length) {
    setTimeout(() => { deleting = true; }, 1800);
    setTimeout(type, 100);
    return;
  }
  if (deleting && ci === 0) {
    deleting = false;
    pi = (pi + 1) % phrases.length;
    setTimeout(type, 400);
    return;
  }
  setTimeout(type, deleting ? 40 : 80);
}
setTimeout(type, 1800);

/* ─── SCROLL REVEAL ─── */
const reveals = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.12 });
reveals.forEach(el => revealObs.observe(el));

/* ─── SKILL BARS ─── */
const skillFills = document.querySelectorAll('.skill-fill');
const barObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.width = e.target.dataset.width + '%';
      barObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
skillFills.forEach(el => barObs.observe(el));

/* ─── CONTACT FORM ─── */
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const status = document.getElementById('formStatus');
  const btn = this.querySelector('.btn-submit span');
  btn.textContent = 'Sending…';

  setTimeout(() => {
    btn.textContent = 'Send Message';
    status.className = 'form-status success';
    status.textContent = "Message sent successfully. I'll be in touch soon.";
    this.reset();
    setTimeout(() => {
      status.style.display = 'none';
      status.className = 'form-status';
    }, 5000);
  }, 1400);
});

/* ─── ACTIVE NAV HIGHLIGHT ─── */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 200) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--gold)' : '';
  });
}, { passive: true });