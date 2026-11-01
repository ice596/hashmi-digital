/* Hashmi Digital v3 interactions. Motion (motion.dev) drives every animation; Lenis smooths the scroll. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const desktop = matchMedia('(min-width: 861px)');
  const root = document.documentElement;

  // Clock in Abu Dhabi time
  const clock = $('#clock');
  const tick = () => { if (clock) clock.textContent = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Dubai' }).format(new Date()); };
  tick(); setInterval(tick, 20000);
  const yr = $('#year'); if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- services: picker highlights the best fit ---------- */
  const offers = $('#offers');
  if (offers) {
    const btns = $$('#picker button'), cardsO = $$('.offer', offers);
    btns.forEach(b => b.addEventListener('click', () => {
      const on = !b.classList.contains('on');
      btns.forEach(x => x.classList.toggle('on', on && x === b));
      offers.classList.toggle('picked', on);
      cardsO.forEach(c => c.classList.toggle('on', on && c.dataset.svc === b.dataset.pick));
      const t = on && cardsO.find(c => c.dataset.svc === b.dataset.pick);
      if (t && innerWidth < 1100) { const y = t.getBoundingClientRect().top + scrollY - 90; window.__lenis ? window.__lenis.scrollTo(y) : scrollTo({ top: y, behavior: 'smooth' }); }
    }));
  }

  /* ---------- work: native swipe / drag / arrows carousel ---------- */
  const track = $('#railTrack'), bar = $('#workBar'), wc = $('#workCount'), prevB = $('#railPrev'), nextB = $('#railNext');
  if (track) {
    const items = [...track.children];
    let down = false, sx = 0, sl = 0, moved = false, lastX = 0, vx = 0, lt = 0;
    const n = items.length;
    const offs = () => items.map(c => c.offsetLeft - items[0].offsetLeft);
    const update = () => {
      const max = track.scrollWidth - track.clientWidth, x = track.scrollLeft, p = max > 0 ? x / max : 0;
      if (bar) bar.style.transform = `scaleX(${Math.max(0.06, p)})`;
      const o = offs(); let k = 0; o.forEach((v, i) => { if (Math.abs(v - x) < Math.abs(o[k] - x)) k = i; });
      if (p > 0.985) k = n - 1;
      if (wc) wc.textContent = String(k + 1).padStart(2, '0') + ' / ' + String(n).padStart(2, '0');
      if (prevB) prevB.disabled = x < 4; if (nextB) nextB.disabled = x > max - 4;
    };
    let settle = null, snapping = false;
    const fine = matchMedia('(hover: hover)').matches;
    track.addEventListener('scroll', () => {
      update();
      if (!fine || down || snapping) return;
      clearTimeout(settle);
      settle = setTimeout(() => {
        const o = offs(), x = track.scrollLeft, max = track.scrollWidth - track.clientWidth; if (x >= max - 4) return;
        let k = 0; o.forEach((v, i) => { if (Math.abs(v - x) < Math.abs(o[k] - x)) k = i; });
        if (Math.abs(o[k] - x) > 3) { snapping = true; track.scrollTo({ left: o[k], behavior: 'smooth' }); setTimeout(() => { snapping = false; }, 600); }
      }, 170);
    }, { passive: true });
    addEventListener('resize', update); update();
    const go = dir => { const o = offs(), x = track.scrollLeft; let t = dir > 0 ? o.find(v => v > x + 8) : [...o].reverse().find(v => v < x - 8); if (t === undefined) t = dir > 0 ? track.scrollWidth : 0; track.scrollTo({ left: t, behavior: 'smooth' }); };
    if (prevB) prevB.addEventListener('click', () => go(-1));
    if (nextB) nextB.addEventListener('click', () => go(1));
    track.addEventListener('keydown', e => { if (e.key === 'ArrowRight') { e.preventDefault(); go(1); } if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); } });
    // trackpad sideways swipes go to the carousel, not the page smoother
    track.addEventListener('wheel', e => { if (Math.abs(e.deltaX) > Math.abs(e.deltaY) * 0.8) e.stopPropagation(); }, { passive: true });
    // mouse drag
    track.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse' || e.button !== 0) return; down = true; moved = false; sx = lastX = e.clientX; sl = track.scrollLeft; vx = 0; lt = performance.now(); });
    addEventListener('pointermove', e => {
      if (!down) return; const dx = e.clientX - sx;
      if (!moved && Math.abs(dx) > 5) { moved = true; track.classList.add('dragging'); }
      if (moved) { const now = performance.now(); vx = (e.clientX - lastX) / Math.max(1, now - lt); lastX = e.clientX; lt = now; track.scrollLeft = sl - dx; }
    });
    addEventListener('pointerup', () => {
      if (!down) return; down = false; if (!moved) return;
      const o = offs(), target = track.scrollLeft - vx * 260; let k = 0; o.forEach((v, i) => { if (Math.abs(v - target) < Math.abs(o[k] - target)) k = i; });
      track.scrollTo({ left: o[k], behavior: 'smooth' });
      setTimeout(() => track.classList.remove('dragging'), 450);
      setTimeout(() => { moved = false; }, 60);
    });
    track.addEventListener('click', e => { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);
    track.addEventListener('dragstart', e => e.preventDefault());
  }

  /* ---------- hero stage: place photo + composited screen (no Motion needed) ---------- */
  const IW = 1440, IH = 917, SC = { x: 690, y: 393, h: 400 };
  const QUAD = [[598.5, 193], [792, 194], [783, 594.5], [598, 593.5]];
  const stage = $('#stage'), scr = $('#screen'), photo = $('#heroPhoto');
  let heroReady = false;
  const homography = (src, dst) => {
    const A = [], B = [];
    for (let i = 0; i < 4; i++) {
      const [x, y] = src[i], [u, v] = dst[i];
      A.push([x, y, 1, 0, 0, 0, -u * x, -u * y]); B.push(u);
      A.push([0, 0, 0, x, y, 1, -v * x, -v * y]); B.push(v);
    }
    for (let c = 0; c < 8; c++) {
      let m = c; for (let r = c + 1; r < 8; r++) if (Math.abs(A[r][c]) > Math.abs(A[m][c])) m = r;
      [A[c], A[m]] = [A[m], A[c]]; [B[c], B[m]] = [B[m], B[c]];
      for (let r = 0; r < 8; r++) { if (r === c) continue; const f = A[r][c] / A[c][c]; for (let k = c; k < 8; k++) A[r][k] -= f * A[c][k]; B[r] -= f * B[c]; }
    }
    const h = B.map((b, i) => b / A[i][i]);
    return `matrix3d(${h[0]},${h[3]},0,${h[6]},${h[1]},${h[4]},0,${h[7]},0,0,1,0,${h[2]},${h[5]},0,1)`;
  };
  if (scr) scr.style.transform = homography([[0, 0], [390, 0], [390, 844], [0, 844]], QUAD);
  const placeStage = (p = 0) => {
    if (!stage) return;
    const W = document.documentElement.clientWidth, H = innerHeight;
    const mob = W < 760;
    let s0 = Math.max(W / IW, H / IH) * (mob ? 0.82 : 1.12);
    let ax = mob ? 0.5 * W : 0.69 * W, ay = mob ? 0.28 * H : 0.5 * H;
    if (mob) {
      const a1 = document.getElementById('act1'), w1 = a1 && a1.querySelector('.wrap');
      if (w1) {
        const textTop = a1.offsetTop + w1.offsetTop, top = 64, room = textTop - top - 16;
        const sh = Math.max(150, Math.min(0.38 * H, room));
        s0 = sh / SC.h; ay = top + room / 2;
      }
    }
    const sEnd = (mob ? 0.62 : 0.9) * H / SC.h, bx = mob ? 0.5 * W : 0.66 * W, by = mob ? 0.4 * H : 0.5 * H;
    const k = 1 - Math.pow(1 - Math.min(1, p / 0.85), 3);
    const s = s0 + (sEnd - s0) * k;
    let tx = (ax + (bx - ax) * k) - SC.x * s, ty = (ay + (by - ay) * k) - SC.y * s;
    stage.style.transform = `translate3d(${tx}px,${ty}px,0) scale(${s})`;
  };
  if (stage) {
    placeStage(0); addEventListener('resize', () => placeStage(window.__heroP || 0));
    const ready = () => { heroReady = true; };
    if (photo.complete && photo.naturalWidth) ready(); else { photo.addEventListener('load', ready); photo.addEventListener('error', ready); }
    const v = scr && scr.querySelector('video');
    if (v) { v.muted = true; v.play().catch(() => {}); }
  }

  /* ---------- receipts: every claim opens its proof (no Motion needed) ---------- */
  const pop = $('#rcPop');
  if (pop) {
    let openFor = null, hideT = null;
    const fill = (n) => {
      const row = document.getElementById('r' + n); if (!row) return false;
      const kind = row.querySelector('.lg-kind').textContent.trim();
      pop.innerHTML = `<div class="rp-top"><span>Receipt ${String(n).padStart(2, '0')}</span><span>${kind}</span></div>
        <p class="rp-claim">${row.querySelector('.lg-claim').innerHTML}</p>
        <div class="rp-how">${row.querySelector('.lg-how').innerHTML}</div>
        <div class="rp-links">${row.querySelector('.lg-links').innerHTML}</div>
        <a class="rp-all" href="#r${n}">See all receipts ↓</a>`;
      return true;
    };
    const place = (el) => {
      const r = el.getBoundingClientRect(), w = pop.offsetWidth, h = pop.offsetHeight;
      let x = Math.min(innerWidth - w - 16, Math.max(16, r.left + r.width / 2 - w / 2));
      let y = r.bottom + 10; if (y + h > innerHeight - 12) y = Math.max(12, r.top - h - 10);
      pop.style.left = x + 'px'; pop.style.top = y + 'px';
    };
    const show = (el) => { clearTimeout(hideT); if (!fill(el.dataset.r)) return; openFor = el; pop.classList.add('on'); pop.setAttribute('aria-hidden', 'false'); place(el); };
    const hide = () => { openFor = null; pop.classList.remove('on'); pop.setAttribute('aria-hidden', 'true'); };
    const hover = matchMedia('(hover: hover)').matches;
    $$('.rc').forEach(el => {
      el.addEventListener('click', e => { e.preventDefault(); e.stopImmediatePropagation(); openFor === el ? hide() : show(el); });
      if (hover) { el.addEventListener('mouseenter', () => show(el)); el.addEventListener('mouseleave', () => { hideT = setTimeout(hide, 260); }); }
      el.addEventListener('focus', () => show(el)); el.addEventListener('blur', () => { hideT = setTimeout(() => { if (!pop.contains(document.activeElement)) hide(); }, 200); });
    });
    pop.addEventListener('mouseenter', () => clearTimeout(hideT));
    pop.addEventListener('mouseleave', () => { if (hover) hideT = setTimeout(hide, 260); });
    document.addEventListener('click', e => { if (openFor && !pop.contains(e.target) && !e.target.closest('.rc')) hide(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') hide(); });
    addEventListener('scroll', () => { if (openFor) { const r = openFor.getBoundingClientRect(); if (r.bottom < 0 || r.top > innerHeight) hide(); else place(openFor); } }, { passive: true });
    pop.addEventListener('click', e => {
      const a = e.target.closest('.rp-all'); if (!a) return;
      e.preventDefault(); hide(); const row = $(a.getAttribute('href'));
      const go = () => { row.classList.add('flash'); setTimeout(() => row.classList.remove('flash'), 1600); };
      if (window.__lenis) { window.__lenis.scrollTo(row, { offset: -140, onComplete: go }); } else { row.scrollIntoView({ behavior: 'smooth', block: 'center' }); setTimeout(go, 600); }
    });
  }

  /* ---------- index rail: chapters, active state, progress ---------- */
  const rail = $('#indexRail');
  if (rail) {
    const links = $$('a', rail), secs = links.map(a => $(a.getAttribute('href'))), irFill = $('#irFill');
    const heroEl = $('#hero'), papersR = $$('.on-paper');
    const upd = () => {
      const y = scrollY, H = innerHeight;
      rail.classList.toggle('show', heroEl ? y > heroEl.offsetHeight - H * 0.6 : y > 200);
      let k = 0; secs.forEach((sec, i) => { if (sec && sec.getBoundingClientRect().top < H * 0.45) k = i; });
      links.forEach((a, i) => a.classList.toggle('on', i === k));
      const mid = H / 2; rail.classList.toggle('on-light', papersR.some(sec => { const r = sec.getBoundingClientRect(); return r.top <= mid && r.bottom >= mid; }));
      const max = document.documentElement.scrollHeight - H; if (irFill) irFill.style.transform = `scaleY(${max > 0 ? y / max : 0})`;
    };
    addEventListener('scroll', upd, { passive: true }); addEventListener('resize', upd); upd();
  }

  const showAll = () => { root.classList.remove('js-motion'); $$('.pre').forEach(e => { e.style.opacity = 1; }); };
  const M = window.Motion;
  if (!M || reduce) {
    showAll();
    if (reduce) { const v = $('#heroVideo'); if (v) { v.pause(); v.removeAttribute('autoplay'); } }
    // still switch story videos by scroll position, without animation
    initStoryBasic();
    return;
  }
  const { animate, scroll, inView, stagger } = M;
  const ease = [0.16, 1, 0.3, 1];
  const elOf = (a) => (a instanceof Element ? a : a && a.target);
  window.__hdReady = true;

  // Smooth scroll
  let lenis = null;
  if (window.Lenis) {
    lenis = new window.Lenis({ duration: 1.1, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true }); window.__lenis = lenis;
    const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    $$('a[href^="#"]:not(.rc)').forEach(a => a.addEventListener('click', e => {
      const id = a.getAttribute('href'); const t = id.length > 1 && $(id);
      if (t) { e.preventDefault(); lenis.scrollTo(t, { offset: id === '#top' ? 0 : (/^#r\d/.test(id) ? -140 : -10) }); }
    }));
  }

  /* ---------- hero: real photo, our app composited on the screen, camera pushes in on scroll ---------- */
  const hero = $('#hero');
  const act1 = $('#act1'), act2Lines = $$('#act2 .big > span');
  const band = (p, a, b) => Math.max(0, Math.min(1, (p - a) / (b - a)));
  scroll(p => {
    window.__heroP = p; placeStage(p);
    const o1 = 1 - band(p, 0.12, 0.32);
    act1.style.opacity = o1; act1.style.transform = `translateY(${-70 * band(p, 0.08, 0.36)}px)`;
    act1.style.pointerEvents = o1 < 0.3 ? 'none' : '';
    const out = band(p, 0.88, 1);
    act2Lines.forEach((el, i) => {
      const inn = band(p, 0.34 + i * 0.1, 0.48 + i * 0.1);
      el.style.opacity = inn * (1 - out);
      el.style.transform = `translateY(${(1 - inn) * 50 - out * 40}px)`;
      el.style.filter = `blur(${(1 - inn) * 8}px)`;
    });
  }, { target: hero, offset: ['start start', 'end end'] });

  /* ---------- intro: counter tied to the hero photo loading ---------- */
  const intro = $('#intro'), introNum = $('#introNum'), introBar = $('#introBar');
  const runHeroIntro = () => {
    animate('#stage', { opacity: [0, 1] }, { duration: 1.6, ease });
    animate('#heroTitle .line > span', { y: ['110%', '0%'] }, { duration: 1.2, delay: stagger(0.1, { startDelay: 0.15 }), ease });
    animate('.hero [data-fade]', { opacity: [0, 1], y: [18, 0] }, { duration: 1, delay: stagger(0.1, { startDelay: 0.5 }), ease });
    animate('.hero .chip', { opacity: [0, 1], x: [-14, 0] }, { duration: 0.7, delay: stagger(0.06, { startDelay: 0.75 }), ease });
    animate('.nav .pill', { opacity: [0, 1], y: [-12, 0] }, { duration: 0.7, delay: stagger(0.05, { startDelay: 0.1 }), ease });
  };
  let shown = 0; const t0 = performance.now();
  const setCount = v => { shown = v; if (introNum) introNum.textContent = Math.round(v); if (introBar) introBar.style.transform = `scaleX(${v / 100})`; };
  const seen = (() => { try { return sessionStorage.getItem('hd-intro') === '1'; } catch (e) { return false; } })();
  const finishIntro = () => {
    try { sessionStorage.setItem('hd-intro', '1'); } catch (e) {}
    if (!intro) { runHeroIntro(); return; }
    animate(intro, { clipPath: ['inset(0 0 0% 0)', 'inset(0 0 100% 0)'] }, { duration: 1, ease: [0.76, 0, 0.24, 1] }).then(() => intro.remove());
    setTimeout(runHeroIntro, 420);
  };
  if (seen || !intro) { if (intro) intro.remove(); finishIntro(); }
  else {
    animate('.intro-mark', { y: ['35%', '0%'], opacity: [0, 1] }, { duration: 0.9, ease });
    const counter = () => {
      const el = performance.now() - t0;
      const goal = Math.min(100, (heroReady ? 70 : 20 * Math.min(1, el / 900)) + Math.min(1, el / 1400) * 30);
      setCount(shown + (goal - shown) * 0.16);
      if (shown > 99.4 || el > 3200) { setCount(100); finishIntro(); } else requestAnimationFrame(counter);
    };
    requestAnimationFrame(counter);
  }

  /* ---------- nav hides on the way down ---------- */
  const nav = $('#nav'); let navHidden = false, lastY = 0;
  scroll((_, info) => {
    const y = info.y.current; const down = y > lastY + 2, up = y < lastY - 2; lastY = y;
    if (y > 160 && down && !navHidden) { navHidden = true; animate(nav, { y: '-120%' }, { duration: 0.45, ease }); }
    else if ((up || y < 160) && navHidden) { navHidden = false; animate(nav, { y: '0%' }, { duration: 0.45, ease }); }
  });

  /* ---------- nav turns light over paper sections ---------- */
  const papers = $$('.on-paper');
  const navTone = () => { const y = 36; nav.classList.toggle('on-light', papers.some(sec => { const r = sec.getBoundingClientRect(); return r.top <= y && r.bottom >= y; })); };
  addEventListener('scroll', navTone, { passive: true }); navTone();

  /* ---------- marquee ---------- */
  const mq = $('#marquee');
  if (mq) animate(mq, { x: ['0%', '-50%'] }, { duration: 38, repeat: Infinity, ease: 'linear' });

  /* ---------- story ---------- */
  initStory();

  /* ---------- reveals ---------- */
  const reveal = (sel, from = { opacity: [0, 1], y: [40, 0] }, opts = {}) => $$(sel).forEach(el => {
    el.style.opacity = 0;
    inView(el, () => { animate(el, from, { duration: 1, ease, ...opts }); }, { amount: 0.25 });
  });
  reveal('.sec-head h2');
  reveal('.sec-head p', { opacity: [0, 1], y: [20, 0] }, { delay: 0.15 });
  reveal('.eyebrow', { opacity: [0, 1], x: [-10, 0] });
  reveal('.founder', { opacity: [0, 1], y: [30, 0] });
  reveal('.wcard .meta', { opacity: [0, 1] });

  // Receipts slide in from their sides, then the numbers count
  $$('.receipt').forEach(r => {
    const dir = Number(r.dataset.slide || 0);
    r.style.opacity = 0;
    inView(r, () => { animate(r, { opacity: [0, 1], x: [dir * 60, 0], rotate: [dir * 2, 0] }, { type: 'spring', stiffness: 120, damping: 18 }); }, { amount: 0.3 });
  });
  $$('[data-count]').forEach(el => {
    const to = parseFloat(el.dataset.count), dec = Number(el.dataset.dec || 0);
    el.textContent = (0).toFixed(dec);
    inView(el, () => { animate(0, to, { duration: 1.4, ease, onUpdate: v => { el.textContent = v.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec }); } }); }, { amount: 0.6 });
  });

  /* ---------- services: reveal ---------- */
  $$('#offers .offer').forEach((c, i) => { c.style.opacity = 0; inView(c, () => { animate(c, { opacity: [0, 1], y: [40, 0] }, { duration: 1, delay: (innerWidth >= 1100 ? i * 0.08 : 0), ease }).then(() => { c.style.opacity = ''; c.style.transform = ''; }); }, { amount: 0.05 }); });

  const chat = $('#chat');
  if (chat) {
    const bubs = $$('.bub', chat), typing = $('.typing', chat);
    let running = false, timer = null;
    const play = async () => {
      if (running) return; running = true;
      bubs.forEach(b => { b.style.opacity = 0; b.style.transform = 'translateY(8px) scale(.98)'; }); typing.style.opacity = 0;
      const show = (el) => animate(el, { opacity: [0, 1], y: [8, 0], scale: [0.98, 1] }, { type: 'spring', stiffness: 260, damping: 22 });
      const wait = (ms) => new Promise(r => { timer = setTimeout(r, ms); });
      await wait(300); show(bubs[0]);
      await wait(700); typing.style.order = 1; animate(typing, { opacity: 1 }, { duration: 0.2 });
      await wait(1200); animate(typing, { opacity: 0 }, { duration: 0.15 }); show(bubs[1]);
      await wait(1300); show(bubs[2]);
      await wait(800); animate(typing, { opacity: 1 }, { duration: 0.2 });
      await wait(1100); animate(typing, { opacity: 0 }, { duration: 0.15 }); show(bubs[3]);
      await wait(4200); running = false;
    };
    inView(chat, () => { play(); const iv = setInterval(play, 10500); return () => { clearInterval(iv); clearTimeout(timer); running = false; }; }, { amount: 0.4 });
  }

  $$('video[data-autoplay]').forEach(v => {
    inView(v, () => { v.play().catch(() => {}); return () => v.pause(); }, { amount: 0.1 });
  });

  /* ---------- statement: words light up as you read ---------- */
  const st = $('#statement');
  if (st) {
    const words = [];
    const split = (node, hl) => {
      [...node.childNodes].forEach(n => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
            const s = document.createElement('span'); s.className = 'w' + (hl ? ' hl' : ''); s.textContent = part; frag.appendChild(s); words.push(s);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1) { split(n, hl || n.classList.contains('hl')); }
      });
    };
    split(st, false);
    const N = words.length;
    scroll(p => {
      const lit = p * (N + 4);
      for (let i = 0; i < N; i++) { const o = Math.min(1, Math.max(0.14, (lit - i) / 4)); words[i].style.opacity = o; }
    }, { target: st, offset: ['start 0.85', 'end 0.45'] });
  }

  /* ---------- process ---------- */
  const grid = $('#processGrid');
  if (grid) {
    scroll(animate('#procLine', { scaleX: [0, 1] }, { ease: 'linear' }), { target: grid, offset: ['start 0.85', 'end 0.55'] });
    $$('.pstep', grid).forEach(s => { s.style.opacity = 0; });
    inView(grid, () => { animate($$('.pstep', grid), { opacity: [0, 1], y: [30, 0] }, { duration: 0.9, delay: stagger(0.12), ease }); }, { amount: 0.25 });
  }

  /* ---------- contact + footer ---------- */
  const ct = $('#contactTitle');
  if (ct) { const spans = $$('.line > span', ct); spans.forEach(s => { s.style.transform = 'translateY(110%)'; }); inView(ct, () => { animate(spans, { y: ['110%', '0%'] }, { duration: 1.1, delay: stagger(0.09), ease }); }, { amount: 0.4 }); }
  const form = $('form.form');
  if (form) { form.style.opacity = 0; inView(form, () => { animate(form, { opacity: [0, 1], y: [40, 0] }, { duration: 1, ease, delay: 0.15 }); }, { amount: 0.2 }); }
  const giant = $('#giant span');
  if (giant) scroll(animate(giant, { y: ['70%', '0%'] }, { ease: 'linear' }), { target: $('#giant'), offset: ['start end', 'end end'] });

  /* ---------- magnetic buttons ---------- */
  if (matchMedia('(hover: hover)').matches) {
    $$('.magnet').forEach(el => {
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.22, y = (e.clientY - r.top - r.height / 2) * 0.3;
        animate(el, { x, y }, { type: 'spring', stiffness: 320, damping: 22, mass: 0.6 });
      });
      el.addEventListener('pointerleave', () => animate(el, { x: 0, y: 0 }, { type: 'spring', stiffness: 260, damping: 18 }));
    });
  }

  /* ---------- clip-path reveals on imagery ---------- */
  $$('.wcard .shot, [data-clip]').forEach(el => {
    el.style.clipPath = 'inset(100% 0 0 0 round 18px)';
    inView(el.parentElement || el, () => { animate(el, { clipPath: ['inset(100% 0% 0% 0% round 18px)', 'inset(0% 0% 0% 0% round 18px)'] }, { duration: 1.2, ease: [0.76, 0, 0.24, 1] }); }, { amount: 0.2 });
  });

  /* ---------- custom cursor (mouse only) ---------- */
  const cur = $('#cursor'), curLabel = $('#cursorLabel');
  if (cur && matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let mx = -100, my = -100, cx = -100, cy = -100, big = false, sz = 12;
    addEventListener('pointermove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });
    document.addEventListener('pointerleave', () => { mx = my = -100; });
    const loop = () => {
      cx += (mx - cx) * 0.2; cy += (my - cy) * 0.2;
      cur.style.transform = `translate3d(${cx}px,${cy}px,0)`;
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
    const grow = (label) => {
      big = !!label; if (curLabel) curLabel.textContent = label || '';
      cur.classList.toggle('big', big);
      animate(cur, { width: big ? 92 : 12, height: big ? 92 : 12, marginLeft: big ? -46 : -6, marginTop: big ? -46 : -6 }, { type: 'spring', stiffness: 380, damping: 28 });
    };
    document.addEventListener('pointerover', e => {
      const t = e.target.closest('[data-cursor]');
      if (t) grow(t.dataset.cursor);
      else if (big) grow('');
      if (!t) { const a = e.target.closest('a,button,input,select,textarea,label'); cur.style.opacity = a ? '0.35' : '1'; }
    });
  }

  // Everything initialised: drop the safety net
  root.classList.add('motion-ready');

  /* ===== story implementation ===== */
  function initStory() {
    const story = $('#how'); if (!story) return;
    const steps = $$('.step', story), vids = $$('.screen video', story), phone = $('#storyPhone'), count = $('#storyCount'), fill = $('#railFill');
    let cur = -1, visible = false;
    const setStep = (i) => {
      if (i === cur) return; cur = i;
      steps.forEach((s, k) => s.classList.toggle('on', k === i));
      vids.forEach((v, k) => {
        const on = k === i; v.classList.toggle('on', on);
        if (on) { try { v.currentTime = 0; } catch (e) {} if (visible) v.play().catch(() => {}); } else v.pause();
      });
      if (count) count.textContent = String(i + 1).padStart(2, '0') + ' / 04';
      if (phone) animate(phone, { scale: [0.96, 1], rotate: [i % 2 ? -1.5 : 1.5, 0] }, { type: 'spring', stiffness: 200, damping: 16 });
    };
    setStep(0);
    scroll(p => {
      const i = Math.min(steps.length - 1, Math.max(0, Math.floor(p * steps.length * 0.999)));
      setStep(i);
      if (fill) fill.style.transform = `scaleY(${p})`;
    }, { target: story });
    if (phone) scroll(animate(phone, { y: [180, 0], rotateX: [18, 0], scale: [0.86, 1] }, { ease: 'linear' }), { target: story, offset: ['start end', 'start start'] });
    inView(story, () => { visible = true; const v = vids[cur]; if (v) v.play().catch(() => {}); return () => { visible = false; vids.forEach(v => v.pause()); }; }, { amount: 0.2 });
  }

  function initStoryBasic() {
    const story = document.getElementById('how'); if (!story) return;
    const steps = [...story.querySelectorAll('.step')], vids = [...story.querySelectorAll('.screen video')];
    const upd = () => {
      const r = story.getBoundingClientRect(); const total = r.height - innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      const i = Math.min(steps.length - 1, Math.floor(p * steps.length * 0.999));
      steps.forEach((s, k) => s.classList.toggle('on', k === i || reduce));
      vids.forEach((v, k) => v.classList.toggle('on', k === i));
    };
    addEventListener('scroll', upd, { passive: true }); upd();
  }
})();
