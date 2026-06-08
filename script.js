/* =====================================================================
   script.js — рендерит сайт из config.js (+ правки редактора).
   Поддерживает живой предпросмотр в admin.html через postMessage.
   ===================================================================== */
(function () {
  const DEFAULTS = window.CONFIG || (typeof CONFIG !== 'undefined' ? CONFIG : {});

  function deepMerge(base, ov) {
    if (Array.isArray(ov)) return ov.slice();
    if (ov && typeof ov === 'object' && base && typeof base === 'object' && !Array.isArray(base)) {
      const out = { ...base };
      for (const k in ov) out[k] = deepMerge(base[k], ov[k]);
      return out;
    }
    return ov === undefined ? base : ov;
  }
  function loadConfig() {
    let c = DEFAULTS;
    try {
      const ov = JSON.parse(localStorage.getItem('tplSiteConfig') || 'null');
      if (ov) c = deepMerge(DEFAULTS, ov);
    } catch (e) {}
    return c;
  }

  const ICONS = {
    'is-wa':   '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.97L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.37c0-4.54 3.7-8.23 8.25-8.23a8.2 8.2 0 0 1 8.23 8.24c0 4.54-3.7 8.23-8.25 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-1.49-.74-2.47-1.33-3.45-3.02-.26-.45.26-.42.74-1.38.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74 1.57.68 2.19.74 2.98.62.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28z"/></svg>',
    'is-tg':   '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.94 4.64l-3.32 15.66c-.25 1.1-.9 1.37-1.83.86l-5.05-3.72-2.44 2.35c-.27.27-.5.5-1.02.5l.36-5.18L18.3 6.4c.4-.35-.09-.55-.62-.2L6.6 12.13 1.74 10.6C.68 10.27.66 9.54 1.97 9.02l18.27-7.05c.89-.33 1.67.21 1.7 1.67z"/></svg>',
    'is-ig':   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2.5" y="2.5" width="19" height="19" rx="5.5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r="1.3" fill="currentColor" stroke="none"/></svg>',
    'is-gis':  '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>',
    'is-tt':   '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 5.82a4.28 4.28 0 0 1-1.06-2.82h-3.1v12.6a2.52 2.52 0 1 1-2.52-2.52c.18 0 .35.02.52.06v-3.18a5.62 5.62 0 1 0 5.1 5.6V9a7.34 7.34 0 0 0 4.29 1.38V7.28a4.28 4.28 0 0 1-3.23-1.46z"/></svg>',
    'is-mail': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    'is-vk':   '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.2 16.4c-5.3 0-8.7-3.7-8.8-9.8h2.7c.1 4.5 2.1 6.3 3.6 6.7V6.6h2.5v3.9c1.5-.2 3-1.8 3.6-3.9h2.5c-.4 2.6-2 4.2-3.1 4.9 1.1.5 2.9 2 3.6 4.9h-2.8c-.5-1.8-1.9-3.1-3.4-3.4v3.4h-.4z"/></svg>',
    'is-fb':   '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 9.3h2.6l.4-3.2H14V4c0-.9.3-1.6 1.7-1.6h1.5V-.4C16.9-.5 16 -.6 14.9-.6c-2.4 0-4.1 1.5-4.1 4.2v2.5H8v3.2h2.8V18H14V9.3z"/></svg>',
    'is-vb':   '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.9 2 3 5.5 3 10c0 2 .8 3.8 2.3 5.2-.1 1.5-.6 2.9-1.5 3.9 1.5-.2 2.8-.8 3.9-1.6 1.3.5 2.8.8 4.3.8 5.1 0 9-3.5 9-8s-3.9-8.3-9-8.3zm0 14.6c-1.4 0-2.7-.3-3.9-.8l-.3-.2-1.7.5.4-1.6-.2-.3C5.1 13 4.5 11.6 4.5 10c0-3.5 3.3-6.4 7.5-6.4s7.5 2.9 7.5 6.4-3.4 6.6-7.5 6.6zm2.3-4.4c-.2-.1-1.2-.6-1.4-.7-.2-.1-.3-.1-.5.1l-.6.7c-.1.1-.2.1-.4 0-1.2-.6-2-1.3-2.7-2.4-.1-.2 0-.3.1-.4l.3-.4c.1-.1.1-.2.2-.4 0-.1 0-.3 0-.4l-.6-1.4c-.1-.3-.3-.3-.4-.3h-.4c-.1 0-.3.1-.5.3-.6.6-.7 1.4-.5 2.2.5 1.6 1.7 2.9 3.2 3.6.5.2.9.4 1.4.4.6 0 1.2-.3 1.5-.9.1-.3.1-.6 0-.7z"/></svg>',
    'is-yt':   '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 7.5c-.3-1-1-1.7-2-2C19.2 5 12 5 12 5s-7.2 0-9 .5c-1 .3-1.7 1-2 2C.5 9.3.5 12 .5 12s0 2.7.5 4.5c.3 1 1 1.7 2 2C4.8 19 12 19 12 19s7.2 0 9-.5c1-.3 1.7-1 2-2 .5-1.8.5-4.5.5-4.5s0-2.7-.5-4.5zM9.7 15.3V8.7l6 3.3-6 3.3z"/></svg>',
  };

  let revealObs = null, countObs = null;

  /* =================================================================
     ГЛАВНАЯ ФУНКЦИЯ — отрисовывает весь сайт из объекта C.
     animate=true только при первой загрузке (в редакторе — без анимаций).
     ================================================================= */
  function applyConfig(C, animate) {
    const T = C.text || {};

    /* 1. Тема */
    if (C.theme) {
      const r = document.documentElement.style;
      const map = { brand: '--brand', brand2: '--brand-2', accent: '--accent', bg: '--bg', text: '--text' };
      Object.entries(map).forEach(([k, v]) => { if (C.theme[k]) r.setProperty(v, C.theme[k]); });
      if (C.theme.brand && C.theme.brand2)
        r.setProperty('--grad', `linear-gradient(120deg, ${C.theme.brand} 0%, ${C.theme.brand2} 55%, ${C.theme.brand2} 100%)`);
    }

    /* 2. Логотип */
    document.title = (C.brand?.full || 'Detailing') + ' — Премиальный детейлинг авто';
    const L = C.logo || {};
    const logoHtml = L.image
      ? `<img class="brand__logo${L.autoResize ? ' is-auto' : ''}" src="${L.image}" alt="${C.brand?.full || ''}"
              style="${L.autoResize ? `max-height:${L.maxHeight || 40}px` : ''}" />`
      : `<span class="brand__mark">${(L.name || 'A')[0]}</span>` +
        `<span class="brand__text">${L.name || ''}<span>${L.nameAccent || ''}</span></span>`;
    document.querySelectorAll('[data-brand]').forEach(el => { el.innerHTML = logoHtml; });

    /* 3. Тексты */
    document.querySelectorAll('[data-text]').forEach(el => {
      const v = T[el.dataset.text]; if (v != null) el.textContent = v;
    });
    document.querySelectorAll('[data-hero]').forEach(el => {
      const v = C.hero?.[el.dataset.hero]; if (v != null) el.textContent = v;
    });

    /* 4. Контакты */
    const setContact = (key, val, href) => document.querySelectorAll(`[data-contact="${key}"]`).forEach(el => {
      el.textContent = val || ''; if (href && el.tagName === 'A') el.href = href;
    });
    setContact('full', C.brand?.full);
    setContact('address', C.contact?.address, C.links?.twogis || null);
    setContact('phone', C.contact?.phone, C.contact?.phoneDial ? 'tel:' + C.contact.phoneDial : null);
    setContact('hours', C.contact?.hours);

    /* 5. Бегущая строка */
    const marquee = document.getElementById('marquee');
    if (marquee && Array.isArray(T.marquee)) {
      const once = T.marquee.map(w => `<span>${w}</span><span>•</span>`).join('');
      marquee.innerHTML = once + once;
    }

    /* 6. Услуги */
    const cards = document.getElementById('cards');
    if (cards && Array.isArray(C.services)) cards.innerHTML = C.services.map(s => `
      <article class="card" data-reveal>
        <div class="card__icon">${s.icon || '✦'}</div>
        <h3>${s.title || ''}</h3><p>${s.text || ''}</p>
        ${s.price ? `<span class="card__price">${s.price}</span>` : ''}
      </article>`).join('');

    /* 7. Галерея */
    const gallery = document.getElementById('gallery');
    if (gallery && Array.isArray(C.gallery)) {
      const fit = C.media?.fit || 'cover';
      const auto = C.media?.autoResize !== false;
      gallery.classList.toggle('gallery--natural', !auto);
      const sizeCls = s => (!auto ? '' : s === 'tall' ? ' shot--tall' : s === 'wide' ? ' shot--wide' : '');
      gallery.innerHTML = C.gallery.map((g, i) => {
        const media = g.img
          ? `<img class="shot__img" src="${g.img}" alt="${g.caption || ''}" loading="lazy" style="object-fit:${auto ? fit : 'none'}" />`
          : `<div class="shot__media g${(i % 8) + 1}"></div>`;
        return `<figure class="shot${sizeCls(g.size)}${auto ? '' : ' shot--natural'}" data-cat="${g.cat || 'all'}">
                  ${media}${g.caption ? `<figcaption>${g.caption}</figcaption>` : ''}</figure>`;
      }).join('');
    }

    /* 8. До / После */
    const baB = document.getElementById('baBefore'), baA = document.getElementById('baAfter');
    if (baB) baB.style.background = C.beforeAfter?.before ? `url('${C.beforeAfter.before}') center/cover` : '';
    if (baA) baA.style.background = C.beforeAfter?.after ? `url('${C.beforeAfter.after}') center/cover` : '';

    /* 9. Опции услуги в форме */
    const sel = document.getElementById('service');
    if (sel && Array.isArray(C.services))
      sel.innerHTML = `<option value="" disabled selected hidden></option>` +
        C.services.map(s => `<option>${s.title}</option>`).join('');

    /* 10. Каналы / интеграции */
    const wa = C.links?.whatsappLink || (C.contact?.whatsapp
      ? `https://wa.me/${C.contact.whatsapp}?text=${encodeURIComponent(C.whatsappPrefill || '')}` : '');
    const mail = C.contact?.email ? 'mailto:' + C.contact.email : '';
    const viber = C.links?.viber || (C.contact?.viberPhone ? 'viber://chat?number=' + C.contact.viberPhone : '');
    const CH = [
      { url: wa, label: 'WhatsApp', cls: 'is-wa' },
      { url: C.links?.telegram, label: 'Telegram', cls: 'is-tg' },
      { url: C.links?.instagram, label: 'Instagram', cls: 'is-ig' },
      { url: viber, label: 'Viber', cls: 'is-vb' },
      { url: C.links?.twogis, label: '2ГИС', cls: 'is-gis' },
      { url: C.links?.tiktok, label: 'TikTok', cls: 'is-tt' },
      { url: C.links?.vk, label: 'VK', cls: 'is-vk' },
      { url: C.links?.facebook, label: 'Facebook', cls: 'is-fb' },
      { url: C.links?.youtube, label: 'YouTube', cls: 'is-yt' },
      { url: mail, label: 'Почта', cls: 'is-mail' },
    ].filter(c => c.url).map(c => ({ ...c, icon: ICONS[c.cls] || '' }));

    const channels = document.getElementById('channels');
    if (channels) channels.innerHTML = CH.map(c =>
      `<a class="channel ${c.cls}" href="${c.url}" target="_blank" rel="noopener"><span class="channel__icon">${c.icon}</span>${c.label}</a>`).join('');
    const dock = document.getElementById('dock');
    if (dock) dock.innerHTML = CH.filter(c => ['is-wa', 'is-tg', 'is-vb', 'is-ig', 'is-gis'].includes(c.cls))
      .map(c => `<a class="dock__btn ${c.cls}" href="${c.url}" target="_blank" rel="noopener" aria-label="${c.label}" title="${c.label}">${c.icon}</a>`).join('');

    const SOCIAL = [
      ['instagram', 'Instagram'], ['telegram', 'Telegram'], ['tiktok', 'TikTok'],
      ['youtube', 'YouTube'], ['vk', 'VK'], ['facebook', 'Facebook'], ['twogis', '2ГИС'],
    ].map(([k, lab]) => ({ url: C.links?.[k], label: lab })).filter(s => s.url);
    const fs = document.getElementById('footerSocial');
    if (fs) fs.innerHTML = SOCIAL.map(s => `<a href="${s.url}" target="_blank" rel="noopener">${s.label}</a>`).join('');

    /* 11. Процесс */
    const steps = document.getElementById('steps');
    if (steps && Array.isArray(C.process)) steps.innerHTML = C.process.map(p => `
      <li class="step" data-reveal><span class="step__no">${p.no || ''}</span><h3>${p.title || ''}</h3><p>${p.text || ''}</p></li>`).join('');

    /* 12. Отзывы */
    const rv = document.getElementById('reviewsList');
    if (rv && Array.isArray(C.reviews)) rv.innerHTML = C.reviews.map(r => `
      <blockquote class="review" data-reveal><div class="review__stars">★★★★★</div>
        <p>«${r.text}»</p><footer><strong>${r.name || ''}</strong><span>${r.car || ''}</span></footer></blockquote>`).join('');

    /* 13. Карта */
    const mapSection = document.getElementById('map-section'), mapFrame = document.getElementById('mapFrame');
    if (mapSection && mapFrame) {
      if (C.map?.embedUrl) { mapFrame.src = C.map.embedUrl; mapSection.style.display = ''; }
      else mapSection.style.display = 'none';
    }

    /* 14. Год */
    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();

    /* Появление/счётчики — пересоздаём под новый DOM */
    initReveal(animate);
    initCounters(animate, C);
  }

  /* ---------- Reveal ---------- */
  function initReveal(animate) {
    if (revealObs) revealObs.disconnect();
    const els = document.querySelectorAll('[data-reveal]');
    if (!animate) { els.forEach(e => e.classList.add('is-visible')); return; }
    revealObs = new IntersectionObserver((entries, obs) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) { setTimeout(() => e.target.classList.add('is-visible'), (i % 4) * 80); obs.unobserve(e.target); }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => revealObs.observe(el));
  }

  /* ---------- Счётчики ---------- */
  function initCounters(animate, C) {
    if (countObs) countObs.disconnect();
    const els = document.querySelectorAll('[data-count]');
    if (!animate) { els.forEach(el => el.textContent = (+el.dataset.count).toLocaleString('ru-RU')); return; }
    countObs = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target, target = +el.dataset.count, dur = 1600, start = performance.now();
        (function tick(now) {
          const p = Math.min((now - start) / dur, 1);
          el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))).toLocaleString('ru-RU');
          if (p < 1) requestAnimationFrame(tick);
        })(start);
        obs.unobserve(el);
      });
    }, { threshold: 0.6 });
    els.forEach(c => countObs.observe(c));
  }

  /* =================================================================
     Постоянный интерактив (вешается один раз)
     ================================================================= */
  function bindOnce() {
    const nav = document.getElementById('nav');
    const progress = document.getElementById('scrollProgress');
    function onScroll() {
      nav.classList.toggle('is-scrolled', window.scrollY > 20);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const toggle = document.getElementById('navToggle'), links = document.getElementById('navLinks');
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('is-open'); toggle.classList.toggle('is-open', open);
    });
    links.addEventListener('click', e => {
      if (e.target.closest('a')) { links.classList.remove('is-open'); toggle.classList.remove('is-open'); }
    });

    const range = document.getElementById('baRange'), before = document.getElementById('baBefore'), handle = document.getElementById('baHandle');
    if (range) {
      const set = v => { before.style.width = v + '%'; handle.style.left = v + '%'; };
      range.addEventListener('input', e => set(e.target.value)); set(50);
    }

    document.addEventListener('click', e => {
      const btn = e.target.closest('.filter'); if (!btn) return;
      document.querySelectorAll('.filter').forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const f = btn.dataset.filter;
      document.querySelectorAll('.shot').forEach(s => s.classList.toggle('is-hidden', !(f === 'all' || s.dataset.cat === f)));
    });

    const form = document.getElementById('bookingForm'), note = document.getElementById('formNote');
    if (form) form.addEventListener('submit', e => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      const get = id => (document.getElementById(id)?.value || '').trim();
      const C = window.__SITE || DEFAULTS;
      const msg = `Здравствуйте, ${C.brand?.full || ''}! Хочу записаться.%0A` +
        `Имя: ${get('name')}%0AТелефон: ${get('phone')}%0AАвто: ${get('vehicle') || '—'}%0A` +
        `Услуга: ${get('service') || '—'}%0AКомментарий: ${get('message') || '—'}`;
      if (note) note.hidden = false;
      if (C.contact?.whatsapp) window.open(`https://wa.me/${C.contact.whatsapp}?text=${msg}`, '_blank');
      setTimeout(() => { form.reset(); if (note) note.hidden = true; }, 3500);
    });
  }

  /* =================================================================
     Запуск
     ================================================================= */
  bindOnce();
  let current = loadConfig();
  window.__SITE = current;
  applyConfig(current, true);

  // Живой предпросмотр из редактора (admin.html)
  window.addEventListener('message', e => {
    const d = e.data;
    if (d && d.__apexConfig && d.config) {
      current = deepMerge(DEFAULTS, d.config);
      window.__SITE = current;
      applyConfig(current, false);
    }
  });
  // Если нас открыл редактор — попросим у него актуальные настройки.
  if (window.opener) { try { window.opener.postMessage({ __apexReq: true }, '*'); } catch (e) {} }
  // Если мы внутри iframe редактора — тоже попросим (на случай гонки загрузки).
  if (window.parent && window.parent !== window) { try { window.parent.postMessage({ __apexReq: true }, '*'); } catch (e) {} }
})();
