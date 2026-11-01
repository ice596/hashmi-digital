/* Hashmi Digital: shared interactions (smooth scroll, reveals, marquee, nav, cursor) */
(function () {
  window.__hdReady = true;
  const root = document.documentElement;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  root.classList.add('js');
  if (!reduce) root.classList.add('motion');
  const hasGsap = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
  if (hasGsap) gsap.registerPlugin(ScrollTrigger);

  /* ---------- smooth scroll ---------- */
  let lenis = null;
  if (!reduce && typeof window.Lenis !== 'undefined') {
    lenis = new Lenis({ duration: 1.15, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    window.__lenis = lenis;
    if (hasGsap) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(t => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
    document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id.length > 1 && document.querySelector(id)) { e.preventDefault(); lenis.scrollTo(id, { offset: -70 }); closeDrawer(); }
    }));
  }

  /* ---------- reveals ---------- */
  document.querySelectorAll('.split').forEach(el => {
    el.querySelectorAll('.line-mask').forEach((m, i) => m.style.setProperty('--i', i));
  });
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  document.querySelectorAll('[data-reveal], .split').forEach(el => io.observe(el));

  /* ---------- nav ---------- */
  const nav = document.querySelector('.nav');
  let lastY = 0;
  const onScroll = y => {
    if (!nav) return;
    nav.classList.toggle('scrolled', y > 40);
    if (!nav.classList.contains('open')) nav.classList.toggle('hide', y > lastY && y > 300);
    lastY = y;
  };
  if (lenis) lenis.on('scroll', e => onScroll(e.scroll)); else addEventListener('scroll', () => onScroll(scrollY), { passive: true });

  const drawer = document.querySelector('.drawer');
  const menuBtn = document.querySelector('.menu-btn');
  function closeDrawer() { if (!drawer) return; drawer.classList.remove('open'); nav.classList.remove('open'); menuBtn && menuBtn.setAttribute('aria-expanded', 'false'); lenis && lenis.start(); }
  if (menuBtn && drawer) {
    menuBtn.addEventListener('click', () => {
      const open = !drawer.classList.contains('open');
      drawer.classList.toggle('open', open); nav.classList.toggle('open', open); menuBtn.setAttribute('aria-expanded', String(open));
      if (lenis) open ? lenis.stop() : lenis.start();
    });
    drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));
  }

  /* ---------- small utilities ---------- */
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
  const tick = () => document.querySelectorAll('[data-time]').forEach(el => {
    el.textContent = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Dubai' }).format(new Date());
  });
  tick(); setInterval(tick, 20000);

  if (!hasGsap || reduce) return;

  /* ---------- marquee (speeds up with scroll velocity) ---------- */
  document.querySelectorAll('.marquee-track').forEach(track => {
    const items = [...track.children];
    items.forEach(n => track.appendChild(n.cloneNode(true)));
    let x = 0, dir = -1, boost = 0;
    const half = () => track.scrollWidth / 2;
    const base = parseFloat(track.dataset.speed || '0.6');
    gsap.ticker.add(() => {
      x += (base + boost) * dir;
      const h = half();
      if (x <= -h) x += h; if (x > 0) x -= h;
      track.style.transform = `translate3d(${x}px,0,0)`;
      boost *= 0.92;
    });
    if (lenis) lenis.on('scroll', e => { boost = Math.min(14, Math.abs(e.velocity) * 0.6); dir = e.direction === 1 ? -1 : 1; });
  });

  /* ---------- scroll-filled statement ---------- */
  document.querySelectorAll('[data-fill]').forEach(el => {
    const words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words.map(w => `<span class="fw">${w}</span>`).join(' ');
    gsap.fromTo(el.querySelectorAll('.fw'), { opacity: 0.16 }, {
      opacity: 1, stagger: 0.08, ease: 'none',
      scrollTrigger: { trigger: el, start: 'top 78%', end: 'bottom 45%', scrub: true }
    });
  });

  /* ---------- parallax ---------- */
  document.querySelectorAll('[data-speed]').forEach(el => {
    const s = parseFloat(el.dataset.speed);
    gsap.fromTo(el, { yPercent: -s * 10 }, { yPercent: s * 10, ease: 'none', scrollTrigger: { trigger: el.closest('section') || el, start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  /* ---------- clip reveal for big media ---------- */
  document.querySelectorAll('[data-clip]').forEach(el => {
    gsap.fromTo(el, { clipPath: 'inset(9% 9% 9% 9%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 15%', scrub: true } });
  });

  /* ---------- counters ---------- */
  document.querySelectorAll('[data-count]').forEach(el => {
    const end = parseFloat(el.dataset.count);
    const o = { v: 0 };
    ScrollTrigger.create({ trigger: el, start: 'top 85%', once: true, onEnter: () => gsap.to(o, { v: end, duration: 1.6, ease: 'power3.out', onUpdate: () => el.textContent = Math.round(o.v) }) });
  });

  /* ---------- magnetic buttons + cursor (desktop only) ---------- */
  if (window.matchMedia('(hover: hover) and (min-width: 981px)').matches) {
    const cur = document.createElement('div'); cur.className = 'cursor'; cur.innerHTML = '<span class="cl"></span>'; document.body.appendChild(cur);
    const label = cur.querySelector('.cl');
    const xTo = gsap.quickTo(cur, 'x', { duration: 0.45, ease: 'power3' }), yTo = gsap.quickTo(cur, 'y', { duration: 0.45, ease: 'power3' });
    addEventListener('mousemove', e => { xTo(e.clientX); yTo(e.clientY); cur.style.opacity = 1; });
    document.querySelectorAll('[data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', () => { cur.classList.add('big'); label.textContent = el.dataset.cursor; });
      el.addEventListener('mouseleave', () => { cur.classList.remove('big'); });
    });
    document.querySelectorAll('.btn, .float-wa').forEach(b => {
      b.addEventListener('mousemove', e => { const r = b.getBoundingClientRect(); gsap.to(b, { x: (e.clientX - r.left - r.width / 2) * 0.18, y: (e.clientY - r.top - r.height / 2) * 0.25, duration: 0.5, ease: 'power3.out' }); });
      b.addEventListener('mouseleave', () => gsap.to(b, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1,0.4)' }));
    });
  }

  window.addEventListener('load', () => ScrollTrigger.refresh());
})();
