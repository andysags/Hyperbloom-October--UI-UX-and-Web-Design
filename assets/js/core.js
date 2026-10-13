/* =========================================================
   Dose — noyau partagé
   Traductions, constantes, dessins des médicaments et pictogrammes.
   Script classique (pas de module) pour fonctionner aussi en file://.
   ========================================================= */
(function () {
  'use strict';

  const Dose = (window.Dose = window.Dose || {});
  const INK = '#1B1F3B';

  /* ---------- Stockage sûr ---------- */
  Dose.store = {
    get(key, fallback) {
      try {
        const v = localStorage.getItem(key);
        return v === null ? fallback : JSON.parse(v);
      } catch (e) { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* mode privé */ }
    }
  };

  Dose.esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));

  /* ---------- Traductions ---------- */
  const STR = {
    fr: {
      'a11y.skip': 'Aller au contenu',
      'a11y.prefs': "Préférences d'affichage",
      'a11y.bigtext': 'Texte agrandi',
      'a11y.home': 'Dose, accueil',
      'a11y.lang': 'Langue',
      'disclaimer': "Prototype réalisé pour le hackathon HyperBloom. Dose ne remplace pas l'avis d'un médecin ou d'un pharmacien.",

      'moment.morning': 'Matin', 'moment.morning.hint': 'Au réveil · vers 7 h',
      'moment.noon': 'Midi', 'moment.noon.hint': 'Vers 12 h',
      'moment.evening': 'Soir', 'moment.evening.hint': 'Vers 19 h',
      'moment.night': 'Nuit', 'moment.night.hint': 'Au coucher · vers 22 h',

      'meal.before': 'Avant le repas',
      'meal.with': 'Pendant le repas',
      'meal.after': 'Après le repas',
      'meal.any': 'Avec ou sans repas',

      'form.round': 'Comprimé rond', 'form.oval': 'Comprimé ovale', 'form.capsule': 'Gélule',
      'form.syrup': 'Sirop', 'form.drops': 'Gouttes', 'form.sachet': 'Sachet',

      'unit.tablet.1': 'comprimé', 'unit.tablet.n': 'comprimés',
      'unit.capsule.1': 'gélule', 'unit.capsule.n': 'gélules',
      'unit.spoon.1': 'cuillère', 'unit.spoon.n': 'cuillères',
      'unit.drop.1': 'goutte', 'unit.drop.n': 'gouttes',
      'unit.sachet.1': 'sachet', 'unit.sachet.n': 'sachets',

      'color.white': 'Blanc', 'color.yellow': 'Jaune', 'color.orange': 'Orange', 'color.pink': 'Rose',
      'color.red': 'Rouge', 'color.blue': 'Bleu', 'color.green': 'Vert', 'color.brown': 'Marron',

      'take': "J'ai pris", 'taken': 'Pris',
      'listen': 'Écouter',
      'info': 'À quoi sert ce médicament ?'
    },
    en: {
      'a11y.skip': 'Skip to content',
      'a11y.prefs': 'Display preferences',
      'a11y.bigtext': 'Larger text',
      'a11y.home': 'Dose, home',
      'a11y.lang': 'Language',
      'disclaimer': 'Prototype built for the HyperBloom hackathon. Dose does not replace advice from a doctor or pharmacist.',

      'moment.morning': 'Morning', 'moment.morning.hint': 'When you wake up · around 7 am',
      'moment.noon': 'Midday', 'moment.noon.hint': 'Around 12 pm',
      'moment.evening': 'Evening', 'moment.evening.hint': 'Around 7 pm',
      'moment.night': 'Night', 'moment.night.hint': 'At bedtime · around 10 pm',

      'meal.before': 'Before eating',
      'meal.with': 'With food',
      'meal.after': 'After eating',
      'meal.any': 'With or without food',

      'form.round': 'Round tablet', 'form.oval': 'Oval tablet', 'form.capsule': 'Capsule',
      'form.syrup': 'Syrup', 'form.drops': 'Drops', 'form.sachet': 'Sachet',

      'unit.tablet.1': 'tablet', 'unit.tablet.n': 'tablets',
      'unit.capsule.1': 'capsule', 'unit.capsule.n': 'capsules',
      'unit.spoon.1': 'spoonful', 'unit.spoon.n': 'spoonfuls',
      'unit.drop.1': 'drop', 'unit.drop.n': 'drops',
      'unit.sachet.1': 'sachet', 'unit.sachet.n': 'sachets',

      'color.white': 'White', 'color.yellow': 'Yellow', 'color.orange': 'Orange', 'color.pink': 'Pink',
      'color.red': 'Red', 'color.blue': 'Blue', 'color.green': 'Green', 'color.brown': 'Brown',

      'take': 'I took it', 'taken': 'Taken',
      'listen': 'Listen',
      'info': 'What is this medicine for?'
    }
  };

  Dose.addStrings = function (extra) {
    Object.keys(extra).forEach((l) => Object.assign(STR[l] = STR[l] || {}, extra[l]));
  };

  /* Le public cible est francophone : français par défaut, sauf choix explicite. */
  let lang = Dose.store.get('dose:lang', null) || 'fr';

  Dose.lang = () => lang;

  Dose.t = function (key, vars) {
    let s = (STR[lang] && STR[lang][key]) ?? (STR.fr[key] ?? key);
    if (vars) s = s.replace(/\{(\w+)\}/g, (_, k) => (vars[k] ?? ''));
    return s;
  };

  Dose.applyI18n = function (root) {
    root = root || document;
    root.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = Dose.t(el.dataset.i18n); });
    root.querySelectorAll('[data-i18n-attr]').forEach((el) => {
      el.dataset.i18nAttr.split(';').forEach((pair) => {
        const [attr, key] = pair.split(':');
        if (attr && key) el.setAttribute(attr.trim(), Dose.t(key.trim()));
      });
    });
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-set-lang]').forEach((b) => {
      b.setAttribute('aria-pressed', String(b.dataset.setLang === lang));
    });
  };

  Dose.setLang = function (l) {
    if (!STR[l]) return;
    lang = l;
    Dose.store.set('dose:lang', l);
    Dose.applyI18n();
    document.dispatchEvent(new CustomEvent('dose:lang', { detail: l }));
  };

  /* ---------- Constantes ---------- */
  Dose.MOMENTS = [
    { id: 'morning', hour: 7 },
    { id: 'noon', hour: 12 },
    { id: 'evening', hour: 19 },
    { id: 'night', hour: 22 }
  ];
  Dose.MEALS = ['before', 'with', 'after', 'any'];
  Dose.FORMS = ['round', 'oval', 'capsule', 'syrup', 'drops', 'sachet'];
  Dose.COLORS = {
    white: '#FFFFFF', yellow: '#F5C842', orange: '#F08A3C', pink: '#F4A6BC',
    red: '#D64535', blue: '#5A8BDB', green: '#5DB37A', brown: '#8A5A3B'
  };
  const UNIT_OF_FORM = { round: 'tablet', oval: 'tablet', capsule: 'capsule', syrup: 'spoon', drops: 'drop', sachet: 'sachet' };

  Dose.unit = (form, n) => Dose.t(`unit.${UNIT_OF_FORM[form] || 'tablet'}.${n > 1 ? 'n' : '1'}`);

  /* ---------- Dessins des médicaments ---------- */
  Dose.pillSVG = function (form, color, color2, size) {
    size = size || 48;
    const c = Dose.COLORS[color] || Dose.COLORS.white;
    const c2 = Dose.COLORS[color2] || c;
    const st = `stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"`;
    let body;
    switch (form) {
      case 'oval':
        body = `<ellipse cx="24" cy="24" rx="20" ry="11" fill="${c}" ${st} transform="rotate(-30 24 24)"/>
                <line x1="10" y1="32" x2="38" y2="16" stroke="${INK}" stroke-width="1.5" opacity=".35"/>`;
        break;
      case 'capsule':
        body = `<g transform="rotate(-35 24 24)">
                  <path d="M24 14H14a10 10 0 0 0 0 20h10z" fill="${c}" ${st}/>
                  <path d="M24 14h10a10 10 0 0 1 0 20H24z" fill="${c2}" ${st}/>
                  <path d="M10 19a6 6 0 0 1 5-3" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".7"/>
                </g>`;
        break;
      case 'syrup':
        body = `<path d="M25 22.5 45 20v6l-20-1.5z" fill="#fff" ${st}/>
                <ellipse cx="15" cy="24" rx="12" ry="9" fill="#fff" ${st}/>
                <ellipse cx="15" cy="24.5" rx="8" ry="5.5" fill="${c}"/>`;
        break;
      case 'drops':
        body = `<path d="M24 5S10 21 10 30a14 14 0 0 0 28 0C38 21 24 5 24 5z" fill="${c}" ${st}/>
                <path d="M17 31a7 7 0 0 0 5 6" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" opacity=".8"/>`;
        break;
      case 'sachet':
        body = `<rect x="9" y="8" width="30" height="33" rx="3" fill="${c}" ${st}/>
                <path d="M9 14l3.75-3 3.75 3 3.75-3 3.75 3 3.75-3 3.75 3 3.75-3 3.75 3" fill="none" stroke="${INK}" stroke-width="2"/>
                <rect x="15" y="22" width="18" height="11" rx="2" fill="#fff" opacity=".85"/>`;
        break;
      default: /* round */
        body = `<circle cx="24" cy="24" r="17" fill="${c}" ${st}/>
                <line x1="11" y1="24" x2="37" y2="24" stroke="${INK}" stroke-width="1.5" opacity=".35"/>`;
    }
    return `<svg class="pill" viewBox="0 0 48 48" width="${size}" height="${size}" aria-hidden="true" focusable="false">${body}</svg>`;
  };

  /* Quantité dessinée : 4 comprimés = 4 dessins (au-delà de 4, dessin + « × n ») */
  Dose.pillsHTML = function (med, size) {
    const q = Math.max(1, med.q || 1);
    const one = Dose.pillSVG(med.f, med.c, med.c2, size || 40);
    if (q <= 4) return `<span class="pill-row" aria-hidden="true">${one.repeat(q)}</span>`;
    return `<span class="pill-row" aria-hidden="true">${one}<span class="pill-count">× ${q}</span></span>`;
  };

  /* ---------- Pictogrammes des moments ---------- */
  const rays = (cx, cy, r1, r2, n, color) => {
    let out = '';
    for (let i = 0; i < n; i++) {
      const a = (Math.PI * 2 * i) / n;
      out += `<line x1="${(cx + Math.cos(a) * r1).toFixed(1)}" y1="${(cy + Math.sin(a) * r1).toFixed(1)}"
                    x2="${(cx + Math.cos(a) * r2).toFixed(1)}" y2="${(cy + Math.sin(a) * r2).toFixed(1)}"
                    stroke="${color}" stroke-width="3" stroke-linecap="round"/>`;
    }
    return out;
  };
  const halfRays = (cx, cy, r1, r2, color) => {
    let out = '';
    [-150, -120, -90, -60, -30].forEach((deg) => {
      const a = (deg * Math.PI) / 180;
      out += `<line x1="${(cx + Math.cos(a) * r1).toFixed(1)}" y1="${(cy + Math.sin(a) * r1).toFixed(1)}"
                    x2="${(cx + Math.cos(a) * r2).toFixed(1)}" y2="${(cy + Math.sin(a) * r2).toFixed(1)}"
                    stroke="${color}" stroke-width="3" stroke-linecap="round"/>`;
    });
    return out;
  };

  const MOMENT_ART = {
    /* Soleil levant : demi-soleil jaune au-dessus de l'horizon, flèche vers le haut */
    morning: () => `
      <rect width="64" height="64" rx="18" fill="#FFF4D6"/>
      ${halfRays(32, 40, 15, 21, '#C98A0C')}
      <path d="M20 40a12 12 0 0 1 24 0z" fill="#F2B33D" stroke="${INK}" stroke-width="2.5"/>
      <line x1="10" y1="40" x2="54" y2="40" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
      <path d="M32 54v-8m-4 4 4-4 4 4" fill="none" stroke="${INK}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`,
    /* Soleil haut : soleil entier, rayons tout autour */
    noon: () => `
      <rect width="64" height="64" rx="18" fill="#FFF8DB"/>
      ${rays(32, 30, 15, 21, 8, '#C98A0C')}
      <circle cx="32" cy="30" r="11" fill="#F5C842" stroke="${INK}" stroke-width="2.5"/>
      <line x1="14" y1="54" x2="50" y2="54" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`,
    /* Soleil couchant : demi-soleil orange, ciel du soir, flèche vers le bas */
    evening: () => `
      <rect width="64" height="64" rx="18" fill="#FCE3D3"/>
      <path d="M20 40a12 12 0 0 1 24 0z" fill="#E0703A" stroke="${INK}" stroke-width="2.5"/>
      <line x1="10" y1="40" x2="54" y2="40" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
      <line x1="18" y1="46" x2="46" y2="46" stroke="${INK}" stroke-width="2.5" stroke-linecap="round" opacity=".5"/>
      <path d="M32 12v8m-4-4 4 4 4-4" fill="none" stroke="${INK}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`,
    /* Nuit : lune et étoiles sur fond sombre */
    night: () => `
      <rect width="64" height="64" rx="18" fill="#2E3A7A"/>
      <path d="M40 45.5A16 16 0 1 1 32.5 16 12.5 12.5 0 0 0 40 45.5z" fill="#F5E6B8"/>
      <circle cx="46" cy="18" r="2" fill="#F5E6B8"/>
      <circle cx="51" cy="29" r="1.5" fill="#F5E6B8"/>
      <circle cx="44" cy="33" r="1.2" fill="#F5E6B8"/>`
  };

  Dose.momentSVG = function (id, size) {
    size = size || 56;
    const art = MOMENT_ART[id] ? MOMENT_ART[id]() : '';
    return `<svg class="moment-icon" viewBox="0 0 64 64" width="${size}" height="${size}" aria-hidden="true" focusable="false">${art}</svg>`;
  };

  /* ---------- Séquence repas : l'ordre des images dit « avant » ou « après » ---------- */
  const PLATE = `<svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <circle cx="24" cy="26" r="15" fill="#fff" stroke="${INK}" stroke-width="2.5"/>
      <circle cx="24" cy="26" r="9" fill="none" stroke="${INK}" stroke-width="1.5" opacity=".4"/>
      <path d="M5 13v8a3 3 0 0 0 3 3v17M8 13v6M11 13v8a3 3 0 0 1-3 3" fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>
      <path d="M42 13c-3 2-3 9 0 11v17" fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>
    </svg>`;
  const ARROW = `<svg class="arrow" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M4 12h14m-5-5 5 5-5 5" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
  const PLUS = `<svg class="arrow" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`;

  Dose.mealHTML = function (meal, med) {
    const pill = Dose.pillSVG(med.f, med.c, med.c2, 30);
    let seq = '';
    if (meal === 'before') seq = pill + ARROW + PLATE;
    else if (meal === 'after') seq = PLATE + ARROW + pill;
    else if (meal === 'with') seq = PLATE + PLUS + pill;
    const label = Dose.esc(Dose.t('meal.' + (meal || 'any')));
    return `<span class="meal-seq${seq ? '' : ' no-seq'}">${seq ? `<span class="seq" aria-hidden="true">${seq}</span>` : ''}<span>${label}</span></span>`;
  };

  /* ---------- Icônes d'interface ---------- */
  Dose.ICON = {
    speaker: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor"/><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
    check: `<svg class="check" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    info: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 11v6M12 7.5v.5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>`,
    logo: `<svg viewBox="0 0 48 48" aria-hidden="true" focusable="false"><rect width="48" height="48" rx="14" fill="#2B3A8C"/><g transform="rotate(-35 24 24)"><path d="M24 15h-9a9 9 0 0 0 0 18h9z" fill="#F2B33D"/><path d="M24 15h9a9 9 0 0 1 0 18h-9z" fill="#fff"/></g></svg>`
  };

  Dose.ICON.close = `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>`;
  Dose.ICON.phone = `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" fill="currentColor"/></svg>`;
  Dose.ICON.play = `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>`;

  /* ---------- Langues parlées par le patient ---------- */
  Dose.LANGS = {
    fr: 'Français', en: 'English', fon: 'Fɔngbè', yo: 'Yorùbá',
    gen: 'Gɛn (mina)', ddn: 'Dendi', bba: 'Baatɔnum', adj: 'Ajagbe'
  };

  /* ---------- Ordonnance dans le lien : JSON → UTF-8 → base64url ---------- */
  Dose.encode = function (obj) {
    const bytes = new TextEncoder().encode(JSON.stringify(obj));
    let bin = '';
    bytes.forEach((b) => { bin += String.fromCharCode(b); });
    return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  };
  Dose.decode = function (str) {
    let s = str.replace(/-/g, '+').replace(/_/g, '/');
    while (s.length % 4) s += '=';
    const bin = atob(s);
    return JSON.parse(new TextDecoder().decode(Uint8Array.from(bin, (c) => c.charCodeAt(0))));
  };
  Dose.newId = () => Math.random().toString(36).slice(2, 10);

  /* ---------- Dates (en jours locaux, format AAAA-MM-JJ) ---------- */
  const pad = (n) => String(n).padStart(2, '0');
  Dose.isoDate = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  Dose.today = () => Dose.isoDate(new Date());
  Dose.parseDate = (iso) => { const [y, m, d] = iso.split('-').map(Number); return new Date(y, m - 1, d); };
  Dose.addDays = (iso, n) => { const d = Dose.parseDate(iso); d.setDate(d.getDate() + n); return Dose.isoDate(d); };
  Dose.daysBetween = (a, b) => Math.round((Dose.parseDate(b) - Dose.parseDate(a)) / 86400000);
  Dose.formatDate = (iso, opts) => Dose.parseDate(iso).toLocaleDateString(
    lang === 'en' ? 'en-GB' : 'fr-FR', opts || { weekday: 'long', day: 'numeric', month: 'long' });

  /* ---------- Voix (synthèse vocale du navigateur) ---------- */
  Dose.canSpeak = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  let speakingBtn = null;
  Dose.stopSpeaking = function () {
    if (Dose.canSpeak) window.speechSynthesis.cancel();
    if (speakingBtn) speakingBtn.setAttribute('aria-pressed', 'false');
    speakingBtn = null;
  };
  /* Lit le texte ; un second clic sur le même bouton arrête la lecture. */
  Dose.speak = function (text, btn) {
    if (!Dose.canSpeak) return;
    const same = btn && btn === speakingBtn;
    Dose.stopSpeaking();
    if (same) return;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang === 'en' ? 'en-GB' : 'fr-FR';
    u.rate = 0.9;
    u.onend = u.onerror = () => { if (speakingBtn === btn) Dose.stopSpeaking(); };
    if (btn) { speakingBtn = btn; btn.setAttribute('aria-pressed', 'true'); }
    window.speechSynthesis.speak(u);
  };

  /* « de Paracétamol » / « d'Amoxicilline » */
  Dose.de = (name) => (lang === 'fr' ? (/^[aeiouyhéèêàâîôû]/i.test(name) ? "d'" : 'de ') : '');

  /* ---------- Préférences communes (langue, texte agrandi) ---------- */
  Dose.initChrome = function () {
    if (Dose.store.get('dose:bigtext', false)) document.documentElement.classList.add('big-text');
    document.querySelectorAll('[data-set-lang]').forEach((b) => {
      b.addEventListener('click', () => Dose.setLang(b.dataset.setLang));
    });
    document.querySelectorAll('[data-action="bigtext"]').forEach((b) => {
      b.setAttribute('aria-pressed', String(document.documentElement.classList.contains('big-text')));
      b.addEventListener('click', () => {
        const on = document.documentElement.classList.toggle('big-text');
        Dose.store.set('dose:bigtext', on);
        b.setAttribute('aria-pressed', String(on));
      });
    });
    document.querySelectorAll('[data-logo]').forEach((el) => { el.innerHTML = Dose.ICON.logo; });
    Dose.applyI18n();
  };
})();
