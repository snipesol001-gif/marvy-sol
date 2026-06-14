/* ============================================================
   MARVY.SOL — main.js
   ============================================================ */

/* ---- PRELOADER ---- */
(function () {
  const preloader = document.getElementById('preloader');
  const bar       = document.getElementById('preloaderBar');
  const sub       = document.getElementById('preloaderSub');
  if (!preloader) return;

  const steps = [
    { pct: 20,  text: 'Loading assets...' },
    { pct: 45,  text: 'Connecting to Web3...' },
    { pct: 70,  text: 'Fetching alpha...' },
    { pct: 90,  text: 'Almost ready...' },
    { pct: 100, text: 'LFG 🚀' },
  ];

  let i = 0;
  const tick = () => {
    if (i >= steps.length) return;
    const s = steps[i++];
    if (bar) bar.style.width = s.pct + '%';
    if (sub) sub.textContent = s.text;
    if (i < steps.length) setTimeout(tick, 380 + Math.random() * 200);
    else {
      setTimeout(() => {
        preloader.classList.add('hidden');
        // Trigger hero animations
        document.querySelectorAll('.fade-up').forEach((el, idx) => {
          setTimeout(() => el.classList.add('visible'), idx * 80);
        });
      }, 500);
    }
  };

  // Start after a tiny delay so paint is done
  setTimeout(tick, 200);
})();


/* ---- NAVBAR SCROLL ---- */
(function () {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();


/* ---- MOBILE HAMBURGER ---- */
(function () {
  const btn  = document.getElementById('navHamburger');
  const menu = document.getElementById('navMobileMenu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });

  // Close on link click
  menu.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
})();


/* ---- REACH ME FLOAT — show after hero ---- */
(function () {
  const el = document.getElementById('reachFloat');
  if (!el) return;

  const hero = document.getElementById('home');
  const obs = new IntersectionObserver(([entry]) => {
    // Show float when hero leaves viewport
    el.classList.toggle('visible', !entry.isIntersecting);
  }, { threshold: 0 });

  if (hero) obs.observe(hero);
})();


/* ---- SCROLL REVEAL ---- */
(function () {
  const els = document.querySelectorAll(
    '.section-title, .section-label, .about-text, .about-card, ' +
    '.projects-category, .review-img-wrap, .contact-card, ' +
    '.stat-item, .skill-tag, .project-card'
  );

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible', 'fade-up');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => {
    if (!el.classList.contains('fade-up')) {
      el.classList.add('fade-up');
    }
    io.observe(el);
  });
})();


/* ---- ACTIVE NAV LINK ON SCROLL ---- */
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  if (!sections.length || !navLinks.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => io.observe(s));
})();