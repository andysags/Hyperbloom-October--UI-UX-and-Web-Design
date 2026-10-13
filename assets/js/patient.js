/* =========================================================
   Dose — vue patient
   L'ordonnance arrive dans le lien (#d=…). Sans lien : ordonnance d'exemple.
   ?embed  : aperçu intégré dans la vue pharmacien (mise à jour par postMessage)
   ?h=19   : simule l'heure (utile pour la démo et la vidéo)
   ========================================================= */
(function () {
  'use strict';
  const D = window.Dose, t = D.t, esc = D.esc;

  D.addStrings({
    fr: {
      'p.hello': 'Bonjour {name}', 'p.helloAnon': 'Bonjour', 'p.yourPharmacy': 'votre pharmacie',
      'p.from': 'Ordonnance expliquée par {ph}',
      'p.day': 'Jour {n} sur {total}',
      'p.listenAll': 'Écouter ma journée',
      'p.voiceNote': 'Message de votre pharmacien',
      'p.voiceNoteLang': 'Message de votre pharmacien, en {lang}',
      'p.next': 'Prochaine prise', 'p.see': 'Voir la prise',
      'p.allDone': 'Tout est pris pour aujourd’hui. Bravo !',
      'p.allDoneSub': 'Revenez demain matin.',
      'p.missed': 'Prise oubliée : {moment} ?',
      'p.missedHelp': 'Prenez-la dès que vous y pensez, sauf s’il est presque l’heure de la suivante. Ne prenez jamais deux prises d’un coup. En cas de doute, demandez à votre pharmacie.',
      'p.startsOn': 'Votre traitement commence le {date}.',
      'p.finished': 'Traitement terminé. Bravo d’être allé jusqu’au bout !',
      'p.finishedSub': 'Si vous ne vous sentez pas mieux, retournez voir votre pharmacien ou votre médecin.',
      'p.nothingToday': 'Rien à prendre à heure fixe aujourd’hui.',
      'p.medDay': 'Jour {n} sur {total}', 'p.lastDay': 'Dernier jour',
      'p.listenMoment': 'Écouter : {moment}',
      'p.now': 'À faire maintenant',
      'p.prnTitle': 'Seulement si besoin',
      'p.prnIntro': 'Ne les prenez que si vous en avez besoin.',
      'p.prnMax': 'Pas plus de {max} fois par jour',
      'p.prnCount': '{n} sur {max} aujourd’hui',
      'p.prnTake': 'J’en ai pris', 'p.prnUndo': 'Annuler',
      'p.prnLimit': 'Maximum atteint pour aujourd’hui. N’en prenez plus avant demain.',
      'p.call': 'Une question ? Appelez votre pharmacie',
      'p.demo': 'Ceci est une ordonnance d’exemple.', 'p.demoCta': 'Créer une ordonnance',
      'p.invalid': 'Ce lien d’ordonnance est incomplet ou abîmé.',
      'p.invalidSub': 'Demandez un nouveau lien ou un QR code à votre pharmacie.',
      'p.empty': 'L’aperçu de l’ordonnance apparaîtra ici dès que vous ajouterez un médicament.',
      'p.marked': '{name} : prise notée. Bravo !', 'p.unmarked': '{name} : prise annulée.',
      'p.prnMarked': '{name} : {n} sur {max} aujourd’hui.',
      'p.for': 'Pour {what}',
      'p.print': 'Imprimer ma feuille papier',
      'print.title': 'Mon calendrier de médicaments',
      'print.for': 'Pour', 'print.from': 'Pharmacie', 'print.start': 'Début',
      'print.howto': 'Cochez une case chaque fois que vous prenez le médicament.',
      'print.na': 'Case grise : plus de prise ce jour-là.',
      'print.day': 'Jour {n}',
      'print.more': 'Cette feuille couvre les {n} premiers jours. Demandez la suite à votre pharmacie.',
      'print.prnHow': 'Une case par prise, {max} au plus par jour.',
      'print.back': 'À quoi servent mes médicaments ?',
      'print.call': 'Une question ? Appelez votre pharmacie : {tel}',

      'f.use': 'À quoi il sert', 'f.how': 'Bien le prendre', 'f.ok': 'Ce qui peut arriver, sans danger',
      'f.alert': 'Revenez à la pharmacie ou allez à l’hôpital si…', 'f.avoid': 'À éviter',
      'f.listen': 'Écouter la fiche', 'f.close': 'Fermer',
      'f.source': 'Informations générales, vérifiées par votre pharmacien. Elles ne remplacent pas ses conseils.',

      'say.morning': 'Le matin, au réveil', 'say.noon': 'À midi', 'say.evening': 'Le soir', 'say.night': 'La nuit, au coucher',
      'say.take': 'Prenez {q} {unit} {de}{name}.',
      'say.prn': 'Seulement si besoin : {q} {unit} {de}{name}. Pas plus de {max} fois par jour.'
    },
    en: {
      'p.hello': 'Hello {name}', 'p.helloAnon': 'Hello', 'p.yourPharmacy': 'your pharmacy',
      'p.from': 'Prescription explained by {ph}',
      'p.day': 'Day {n} of {total}',
      'p.listenAll': 'Listen to my day',
      'p.voiceNote': 'Message from your pharmacist',
      'p.voiceNoteLang': 'Message from your pharmacist, in {lang}',
      'p.next': 'Next dose', 'p.see': 'See the dose',
      'p.allDone': 'Everything is taken for today. Well done!',
      'p.allDoneSub': 'See you tomorrow morning.',
      'p.missed': 'Missed dose: {moment}?',
      'p.missedHelp': 'Take it as soon as you remember, unless it is almost time for the next one. Never take two doses at once. If in doubt, ask your pharmacy.',
      'p.startsOn': 'Your treatment starts on {date}.',
      'p.finished': 'Treatment complete. Well done for seeing it through!',
      'p.finishedSub': 'If you do not feel better, go back to your pharmacist or doctor.',
      'p.nothingToday': 'Nothing to take at set times today.',
      'p.medDay': 'Day {n} of {total}', 'p.lastDay': 'Last day',
      'p.listenMoment': 'Listen: {moment}',
      'p.now': 'To do now',
      'p.prnTitle': 'Only if needed',
      'p.prnIntro': 'Only take these if you need them.',
      'p.prnMax': 'No more than {max} times a day',
      'p.prnCount': '{n} of {max} today',
      'p.prnTake': 'I took one', 'p.prnUndo': 'Undo',
      'p.prnLimit': 'Daily maximum reached. Do not take any more before tomorrow.',
      'p.call': 'A question? Call your pharmacy',
      'p.demo': 'This is a sample prescription.', 'p.demoCta': 'Create a prescription',
      'p.invalid': 'This prescription link is incomplete or damaged.',
      'p.invalidSub': 'Ask your pharmacy for a new link or QR code.',
      'p.empty': 'The prescription preview will appear here as soon as you add a medicine.',
      'p.marked': '{name}: dose recorded. Well done!', 'p.unmarked': '{name}: dose cancelled.',
      'p.prnMarked': '{name}: {n} of {max} today.',
      'p.for': 'For {what}',
      'p.print': 'Print my paper sheet',
      'print.title': 'My medicine calendar',
      'print.for': 'For', 'print.from': 'Pharmacy', 'print.start': 'Start',
      'print.howto': 'Tick a box each time you take the medicine.',
      'print.na': 'Grey box: no dose that day.',
      'print.day': 'Day {n}',
      'print.more': 'This sheet covers the first {n} days. Ask your pharmacy for the rest.',
      'print.prnHow': 'One box per dose, at most {max} a day.',
      'print.back': 'What are my medicines for?',
      'print.call': 'A question? Call your pharmacy: {tel}',

      'f.use': 'What it is for', 'f.how': 'How to take it well', 'f.ok': 'What may happen, harmlessly',
      'f.alert': 'Go back to the pharmacy or to hospital if…', 'f.avoid': 'Avoid',
      'f.listen': 'Listen to this sheet', 'f.close': 'Close',
      'f.source': 'General information, checked by your pharmacist. It does not replace their advice.',

      'say.morning': 'In the morning, when you wake up', 'say.noon': 'At midday', 'say.evening': 'In the evening', 'say.night': 'At night, at bedtime',
      'say.take': 'Take {q} {unit} of {name}.',
      'say.prn': 'Only if needed: {q} {unit} of {name}. No more than {max} times a day.'
    }
  });

  const params = new URLSearchParams(location.search);
  const EMBED = params.has('embed');
  const app = document.getElementById('app');
  const live = document.getElementById('live');
  const dialog = document.getElementById('fiche');
  if (EMBED) document.body.classList.add('embed');

  let rx = null;
  let mode = 'ok'; // ok | demo | invalid | empty
  let taken = {};

  /* ---------- Chargement ---------- */
  function loadFromHash() {
    const m = location.hash.match(/[#&]d=([^&]+)/);
    rx = null;
    if (m) {
      try { rx = D.decode(m[1]); mode = 'ok'; } catch (e) { mode = 'invalid'; }
    } else if (EMBED) {
      mode = 'empty';
    } else {
      rx = D.demo(); mode = 'demo';
    }
    if (rx && (!Array.isArray(rx.m) || !rx.d)) { rx = null; mode = 'invalid'; }
    if (rx && !rx.m.length) mode = 'empty';
    loadTaken();
  }

  const takenKey = () => 'dose:taken:' + ((rx && rx.id) || 'x');
  function loadTaken() { taken = rx ? D.store.get(takenKey(), {}) : {}; }
  function saveTaken() { D.store.set(takenKey(), taken); }
  const doseKey = (date, i, moment) => `${date}|${i}|${moment}`;

  function audioNote() { return rx && rx.id ? D.store.get('dose:audio:' + rx.id, null) : null; }

  /* ---------- Calcul de la journée ---------- */
  function currentIdx() {
    const forced = parseInt(params.get('h'), 10);
    const h = Number.isNaN(forced) ? new Date().getHours() : forced;
    return h < 10 ? 0 : h < 15 ? 1 : h < 20 ? 2 : 3;
  }

  function plan() {
    const today = D.today();
    const dayN = D.daysBetween(rx.d, today) + 1;
    const all = rx.m.map((m, i) => ({ m, i }));
    const isActive = (x) => dayN >= 1 && dayN <= (x.m.j || 1);
    const totalDays = Math.max(1, ...rx.m.map((m) => m.j || 1));
    const moments = D.MOMENTS.map((mo, idx) => ({
      id: mo.id, idx,
      doses: all.filter((x) => !x.m.prn && isActive(x) && (x.m.t || []).includes(mo.id))
    })).filter((mo) => mo.doses.length);
    moments.forEach((mo) => { mo.done = mo.doses.every((x) => taken[doseKey(today, x.i, mo.id)]); });
    const prn = all.filter((x) => x.m.prn && isActive(x));
    const cur = currentIdx();
    return {
      today, dayN, totalDays, moments, prn,
      next: moments.find((mo) => !mo.done && mo.idx >= cur),
      missed: moments.filter((mo) => !mo.done && mo.idx < cur).pop(),
      allDone: moments.length > 0 && moments.every((mo) => mo.done)
    };
  }

  /* ---------- Textes lus à voix haute ---------- */
  const qtyText = (m) => `${m.q} ${D.unit(m.f, m.q)}`;
  const sayDose = (m) => [
    t('say.take', { q: m.q, unit: D.unit(m.f, m.q), de: D.de(m.n), name: m.n }),
    t('meal.' + (m.r || 'any')) + '.',
    m.note || ''
  ].join(' ').trim();
  const sayMoment = (mo) => `${t('say.' + mo.id)}. ` + mo.doses.map((x) => sayDose(x.m)).join(' ');
  const sayPrn = (m) => t('say.prn', { q: m.q, unit: D.unit(m.f, m.q), de: D.de(m.n), name: m.n, max: m.max || 3 }) +
    (m.note ? ' ' + m.note : '');

  /* ---------- Rendu ---------- */
  function render() {
    rx = D.localizeRx(rx);
    const focusKey = document.activeElement && document.activeElement.dataset && document.activeElement.dataset.key;

    if (mode === 'invalid') {
      app.innerHTML = `<section class="status status-warn" role="alert"><h1 class="status-title">${esc(t('p.invalid'))}</h1><p>${esc(t('p.invalidSub'))}</p></section>`;
      return;
    }
    if (mode === 'empty') {
      app.innerHTML = `<div class="empty">${D.pillSVG('capsule', 'red', 'yellow', 72)}<p>${esc(t('p.empty'))}</p></div>`;
      return;
    }

    const P = plan();
    const name = rx.p && rx.p.n;
    const ph = (rx.ph && rx.ph.n) || t('p.yourPharmacy');
    const audio = audioNote();
    const pLang = rx.p && rx.p.l;

    let html = '';

    if (mode === 'demo' && !EMBED) {
      html += `<p class="demo-banner"><span>${esc(t('p.demo'))}</span> <a href="pharmacien.html">${esc(t('p.demoCta'))}</a></p>`;
    }

    /* Bonjour */
    const dayClamped = Math.min(Math.max(P.dayN, 0), P.totalDays);
    html += `
      <section class="hello" aria-labelledby="hello-title">
        <p class="hello-date">${esc(D.formatDate(P.today))}</p>
        <h1 id="hello-title">${esc(name ? t('p.hello', { name }) : t('p.helloAnon'))}</h1>
        <p class="hello-from">${esc(t('p.from', { ph }))}</p>
        ${P.dayN >= 1 && P.dayN <= P.totalDays ? `
          <div class="day-progress">
            <span class="day-label">${esc(t('p.day', { n: P.dayN, total: P.totalDays }))}</span>
            <span class="day-bar" aria-hidden="true"><span style="width:${(dayClamped / P.totalDays) * 100}%"></span></span>
          </div>` : ''}
        <div class="hello-actions">
          ${audio ? `<button type="button" class="btn btn-primary btn-lg" data-action="voice" data-key="voice">${D.ICON.play}
              <span>${esc(pLang && pLang !== 'fr' && pLang !== 'en' && D.LANGS[pLang] ? t('p.voiceNoteLang', { lang: D.LANGS[pLang] }) : t('p.voiceNote'))}</span></button>` : ''}
          ${D.canSpeak && P.moments.length ? `<button type="button" class="btn btn-secondary btn-lg" data-action="speak-all" data-key="speak-all" aria-pressed="false">${D.ICON.speaker}<span>${esc(t('p.listenAll'))}</span></button>` : ''}
        </div>
      </section>`;

    /* Où en suis-je ? */
    html += '<div class="status-stack">';
    if (P.dayN < 1) {
      html += status('info', t('p.startsOn', { date: D.formatDate(rx.d) }));
    } else if (P.dayN > P.totalDays) {
      html += status('done', t('p.finished'), t('p.finishedSub'));
    } else {
      if (P.missed) {
        html += status('warn', t('p.missed', { moment: t('moment.' + P.missed.id).toLowerCase() }), t('p.missedHelp'), D.momentSVG(P.missed.id, 48));
      }
      if (P.allDone) {
        html += status('done', t('p.allDone'), t('p.allDoneSub'));
      } else if (P.next) {
        const summary = P.next.doses.map((x) => `${qtyText(x.m)} · ${x.m.n}`).join('<br>');
        html += `
          <section class="status status-next" aria-labelledby="next-title">
            ${D.momentSVG(P.next.id, 72)}
            <div>
              <p class="status-kicker">${esc(t('p.next'))}</p>
              <h2 class="status-title" id="next-title">${esc(t('moment.' + P.next.id))} <span class="status-hint">${esc(t('moment.' + P.next.id + '.hint'))}</span></h2>
              <p>${summary}</p>
              <a class="btn btn-primary" href="#m-${P.next.id}">${esc(t('p.see'))}</a>
            </div>
          </section>`;
      } else if (!P.moments.length && P.dayN <= P.totalDays) {
        html += status('info', t('p.nothingToday'));
      }
    }
    html += '</div>';

    /* Les moments de la journée */
    P.moments.forEach((mo) => {
      const isNext = P.next && P.next.id === mo.id;
      html += `
        <section class="moment moment-${mo.id}${isNext ? ' is-next' : ''}${mo.done ? ' is-done' : ''}" id="m-${mo.id}" aria-labelledby="h-${mo.id}">
          <header class="moment-head">
            ${D.momentSVG(mo.id, 64)}
            <div>
              ${isNext ? `<p class="now-badge">${esc(t('p.now'))}</p>` : ''}
              <h2 id="h-${mo.id}">${esc(t('moment.' + mo.id))}</h2>
              <p>${esc(t('moment.' + mo.id + '.hint'))}</p>
            </div>
            ${D.canSpeak ? `<button type="button" class="listen" data-action="speak-moment" data-moment="${mo.id}" data-key="speak-${mo.id}" aria-pressed="false" aria-label="${esc(t('p.listenMoment', { moment: t('moment.' + mo.id) }))}">${D.ICON.speaker}</button>` : ''}
          </header>
          <ul class="doses" role="list">
            ${mo.doses.map((x) => doseItem(x, mo, P)).join('')}
          </ul>
        </section>`;
    });

    /* Si besoin */
    if (P.prn.length) {
      html += `
        <section class="moment moment-prn" aria-labelledby="h-prn">
          <header class="moment-head">
            <span class="prn-icon" aria-hidden="true">?</span>
            <div><h2 id="h-prn">${esc(t('p.prnTitle'))}</h2><p>${esc(t('p.prnIntro'))}</p></div>
          </header>
          <ul class="doses" role="list">${P.prn.map((x) => prnItem(x, P)).join('')}</ul>
        </section>`;
    }

    /* Appeler la pharmacie */
    if (rx.ph && rx.ph.t) {
      html += `<a class="call-card" href="tel:${esc(rx.ph.t.replace(/[^\d+]/g, ''))}">${D.ICON.phone}<span><strong>${esc(t('p.call'))}</strong><br>${esc(rx.ph.n || '')} · ${esc(rx.ph.t)}</span></a>`;
    }

    if (!EMBED) {
      html += `<button type="button" class="btn btn-secondary btn-lg print-btn" data-action="print" data-key="print">${PRINTER}<span>${esc(t('p.print'))}</span></button>`;
    }

    app.innerHTML = html;
    renderPrint();

    if (focusKey) {
      const el = app.querySelector(`[data-key="${CSS.escape(focusKey)}"]`);
      if (el) el.focus();
    }
  }

  function status(kind, title, sub, icon) {
    return `<section class="status status-${kind}" role="status">
      ${icon || ''}
      <div><p class="status-title">${esc(title)}</p>${sub ? `<p>${esc(sub)}</p>` : ''}</div>
    </section>`;
  }

  function infoButton(i) {
    const fiche = D.ficheFor(rx.m[i]);
    if (!fiche) return '';
    return `<button type="button" class="info-btn" data-action="info" data-med="${i}" data-key="info-${i}">${D.ICON.info}<span>${esc(t('info'))}</span></button>`;
  }

  function doseItem(x, mo, P) {
    const m = x.m;
    const key = doseKey(P.today, x.i, mo.id);
    const isTaken = !!taken[key];
    const j = m.j || 1;
    return `
      <li class="dose${isTaken ? ' is-taken' : ''}">
        <div class="dose-visual">${D.pillsHTML(m, 40)}</div>
        <div class="dose-body">
          <p class="dose-qty">${esc(qtyText(m))}</p>
          <p class="dose-name"><strong>${esc(m.n)}</strong> ${esc(m.s || '')}</p>
          <div class="dose-meta">
            ${D.mealHTML(m.r, m)}
            <span class="chip${P.dayN === j ? ' chip-accent' : ''}">${esc(P.dayN === j && j > 1 ? t('p.lastDay') : t('p.medDay', { n: P.dayN, total: j }))}</span>
          </div>
          ${m.note ? `<p class="dose-note">${esc(m.note)}</p>` : ''}
          ${infoButton(x.i)}
        </div>
        <button type="button" class="take" data-action="take" data-dose="${esc(key)}" data-med="${x.i}" data-key="take-${esc(key)}" aria-pressed="${isTaken}">
          ${D.ICON.check}<span>${esc(t(isTaken ? 'taken' : 'take'))}</span><span class="sr-only">: ${esc(m.n)}, ${esc(t('moment.' + mo.id))}</span>
        </button>
      </li>`;
  }

  function prnItem(x, P) {
    const m = x.m;
    const max = m.max || 3;
    const key = doseKey(P.today, x.i, 'prn');
    const n = taken[key] || 0;
    const full = n >= max;
    const dots = Array.from({ length: max }, (_, k) => `<span class="dot${k < n ? ' on' : ''}"></span>`).join('');
    return `
      <li class="dose dose-prn${full ? ' is-full' : ''}">
        <div class="dose-visual">${D.pillsHTML(m, 40)}</div>
        <div class="dose-body">
          <p class="dose-qty">${esc(qtyText(m))}</p>
          <p class="dose-name"><strong>${esc(m.n)}</strong> ${esc(m.s || '')}</p>
          <div class="dose-meta">${D.mealHTML(m.r, m)}<span class="chip">${esc(t('p.prnMax', { max }))}</span></div>
          ${m.note ? `<p class="dose-note">${esc(m.note)}</p>` : ''}
          <p class="prn-count"><span class="dots" aria-hidden="true">${dots}</span> ${esc(t('p.prnCount', { n, max }))}</p>
          ${full ? `<p class="prn-limit" role="status">${esc(t('p.prnLimit'))}</p>` : ''}
          ${infoButton(x.i)}
        </div>
        <div class="prn-actions">
          <button type="button" class="take" data-action="prn-add" data-dose="${esc(key)}" data-med="${x.i}" data-key="prn-add-${x.i}" ${full ? 'disabled' : ''}>
            ${D.ICON.check}<span>${esc(t('p.prnTake'))}</span><span class="sr-only">: ${esc(m.n)}</span>
          </button>
          ${n > 0 ? `<button type="button" class="btn btn-ghost" data-action="prn-undo" data-dose="${esc(key)}" data-med="${x.i}" data-key="prn-undo-${x.i}">${esc(t('p.prnUndo'))}<span class="sr-only">: ${esc(m.n)}</span></button>` : ''}
        </div>
      </li>`;
  }

  /* ---------- Feuille papier ---------- */
  const PRINTER = `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M7 3h10v5H7zM5 9h14a2 2 0 0 1 2 2v6h-4v4H7v-4H3v-6a2 2 0 0 1 2-2zm4 8v2h6v-4H9z" fill="currentColor"/></svg>`;
  const MAX_PRINT_DAYS = 14;

  function renderPrint() {
    const sheet = document.getElementById('print-sheet');
    if (!sheet) return;
    if (EMBED || !rx || mode === 'invalid' || mode === 'empty') { sheet.innerHTML = ''; return; }
    const totalDays = Math.max(1, ...rx.m.map((m) => m.j || 1));
    const n = Math.min(totalDays, MAX_PRINT_DAYS);
    const days = Array.from({ length: n }, (_, k) => D.addDays(rx.d, k));
    const short = (iso) => D.formatDate(iso, { day: '2-digit', month: '2-digit' });
    const all = rx.m.map((m, i) => ({ m, i }));
    const head = `<tr><th class="ps-medcol" scope="col"></th>${days.map((d, k) => `<th scope="col">${esc(t('print.day', { n: k + 1 }))}<br><small>${esc(short(d))}</small></th>`).join('')}</tr>`;
    const medCell = (m) => `
      <th scope="row" class="ps-med">
        <span class="ps-pills">${D.pillsHTML(m, 26)}</span>
        <span class="ps-text"><strong>${esc(`${m.q} ${D.unit(m.f, m.q)}`)}</strong> ${esc(m.n)}<br>${D.mealHTML(m.r, m)}</span>
      </th>`;

    let rows = '';
    D.MOMENTS.forEach((mo) => {
      const doses = all.filter((x) => !x.m.prn && (x.m.t || []).includes(mo.id));
      if (!doses.length) return;
      rows += `<tr class="ps-moment ps-${mo.id}"><th colspan="${n + 1}" scope="rowgroup">${D.momentSVG(mo.id, 30)}<span>${esc(t('moment.' + mo.id))}</span> <small>${esc(t('moment.' + mo.id + '.hint'))}</small></th></tr>`;
      doses.forEach((x) => {
        rows += `<tr>${medCell(x.m)}${days.map((_, k) => `<td class="${k < (x.m.j || 1) ? '' : 'na'}">${k < (x.m.j || 1) ? '<span class="box"></span>' : ''}</td>`).join('')}</tr>`;
      });
    });
    const prn = all.filter((x) => x.m.prn);
    if (prn.length) {
      rows += `<tr class="ps-moment ps-prn"><th colspan="${n + 1}" scope="rowgroup"><span class="ps-q" aria-hidden="true">?</span><span>${esc(t('p.prnTitle'))}</span></th></tr>`;
      prn.forEach((x) => {
        const max = x.m.max || 3;
        rows += `<tr>${medCell(x.m)}${days.map((_, k) => `<td class="${k < (x.m.j || 1) ? 'multi' : 'na'}">${k < (x.m.j || 1) ? '<span class="box sm"></span>'.repeat(max) : ''}</td>`).join('')}</tr>`;
        rows += `<tr class="ps-note"><td colspan="${n + 1}">${esc(t('print.prnHow', { max }))}${x.m.note ? ' ' + esc(x.m.note) : ''}</td></tr>`;
      });
    }

    const fiches = all.map((x) => ({ m: x.m, f: D.ficheFor(x.m) })).filter((x) => x.f);
    const tel = rx.ph && rx.ph.t;
    sheet.innerHTML = `
      <section class="ps-page">
        <header class="ps-head">
          <div class="ps-brand">${D.ICON.logo}<span>Dose</span></div>
          <h1>${esc(t('print.title'))}</h1>
          <dl class="ps-meta">
            ${rx.p && rx.p.n ? `<div><dt>${esc(t('print.for'))}</dt><dd>${esc(rx.p.n)}</dd></div>` : ''}
            ${rx.ph && rx.ph.n ? `<div><dt>${esc(t('print.from'))}</dt><dd>${esc(rx.ph.n)}${tel ? ' · ' + esc(tel) : ''}</dd></div>` : ''}
            <div><dt>${esc(t('print.start'))}</dt><dd>${esc(D.formatDate(rx.d))}</dd></div>
          </dl>
        </header>
        <p class="ps-howto"><span class="box"></span> ${esc(t('print.howto'))} <span class="ps-na-key"></span> ${esc(t('print.na'))}</p>
        <table class="ps-table"><thead>${head}</thead><tbody>${rows}</tbody></table>
        ${totalDays > n ? `<p class="ps-more">${esc(t('print.more', { n }))}</p>` : ''}
        ${rx.m.filter((m) => m.note && !m.prn).map((m) => `<p class="ps-advice"><strong>${esc(m.n)}${D.lang() === 'fr' ? ' :' : ':'}</strong> ${esc(m.note)}</p>`).join('')}
        <p class="ps-foot">${tel ? esc(t('print.call', { tel })) + ' · ' : ''}${esc(t('disclaimer'))}</p>
      </section>
      ${fiches.length ? `
      <section class="ps-page ps-back">
        <h2>${esc(t('print.back'))}</h2>
        <div class="ps-fiches">
          ${fiches.map(({ m, f }) => `
            <article class="ps-fiche">
              <h3>${D.pillSVG(m.f, m.c, m.c2, 30)} ${esc(m.n)}${f.for ? ` <small>· ${esc(t('p.for', { what: f.for }))}</small>` : ''}</h3>
              ${['use', 'how', 'alert'].filter((k) => f[k] && f[k].length).map((k) => `
                <p class="ps-f-${k}"><strong>${{ use: '🎯', how: '✅', alert: '🚨' }[k]} ${esc(t('f.' + k))}</strong><br>${f[k].map(esc).join(' ')}</p>`).join('')}
            </article>`).join('')}
        </div>
        <p class="ps-foot">${esc(t('f.source'))}</p>
      </section>` : ''}`;
  }

  /* ---------- Fiche médicament ---------- */
  let ficheReturnFocus = null;
  function openFiche(i) {
    const m = rx.m[i];
    const f = D.ficheFor(m);
    if (!f) return;
    const blocks = [
      ['use', '🎯'], ['how', '✅'], ['ok', '🙂'], ['alert', '🚨'], ['avoid', '🚫']
    ].filter(([k]) => f[k] && f[k].length);
    dialog.innerHTML = `
      <div class="sheet-head">
        ${D.pillSVG(m.f, m.c, m.c2, 56)}
        <div>
          <h2 id="fiche-title">${esc(m.n)} <span class="sheet-strength">${esc(m.s || '')}</span></h2>
          ${f.for ? `<p class="sheet-for">${esc(t('p.for', { what: f.for }))}</p>` : ''}
        </div>
        <button type="button" class="icon-btn" data-action="close" aria-label="${esc(t('f.close'))}">${D.ICON.close}</button>
      </div>
      ${D.canSpeak ? `<button type="button" class="btn btn-secondary" data-action="speak-fiche" aria-pressed="false">${D.ICON.speaker}<span>${esc(t('f.listen'))}</span></button>` : ''}
      <div class="fiche">
        ${blocks.map(([k, icon]) => `
          <section class="fiche-block fiche-${k}">
            <h3><span class="fiche-icon" aria-hidden="true">${icon}</span>${esc(t('f.' + k))}</h3>
            <ul>${f[k].map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
          </section>`).join('')}
      </div>
      <p class="sheet-source">${esc(t('f.source'))}</p>`;
    dialog._text = [m.n + '.', f.for ? t('p.for', { what: f.for }) + '.' : '']
      .concat(blocks.map(([k]) => t('f.' + k) + '. ' + f[k].join(' '))).join(' ');
    ficheReturnFocus = document.activeElement;
    dialog.showModal();
  }
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) { dialog.close(); return; } /* clic sur le fond */
    const b = e.target.closest('[data-action]');
    if (!b) return;
    if (b.dataset.action === 'close') dialog.close();
    if (b.dataset.action === 'speak-fiche') D.speak(dialog._text, b);
  });
  dialog.addEventListener('close', () => {
    D.stopSpeaking();
    if (ficheReturnFocus) ficheReturnFocus.focus();
  });

  /* ---------- Actions ---------- */
  let audioEl = null;
  app.addEventListener('click', (e) => {
    const b = e.target.closest('[data-action]');
    if (!b || !rx) return;
    const a = b.dataset.action;
    const med = rx.m[b.dataset.med];

    if (a === 'take') {
      const k = b.dataset.dose;
      if (taken[k]) { delete taken[k]; announce(t('p.unmarked', { name: med.n })); }
      else { taken[k] = 1; announce(t('p.marked', { name: med.n })); }
      saveTaken(); render();
    } else if (a === 'prn-add' || a === 'prn-undo') {
      const k = b.dataset.dose;
      const max = med.max || 3;
      const n = Math.max(0, Math.min(max, (taken[k] || 0) + (a === 'prn-add' ? 1 : -1)));
      if (n) taken[k] = n; else delete taken[k];
      saveTaken(); render();
      announce(t('p.prnMarked', { name: med.n, n, max }) + (n >= max ? ' ' + t('p.prnLimit') : ''));
    } else if (a === 'info') {
      openFiche(Number(b.dataset.med));
    } else if (a === 'speak-moment') {
      const P = plan();
      const mo = P.moments.find((x) => x.id === b.dataset.moment);
      if (mo) D.speak(sayMoment(mo), b);
    } else if (a === 'speak-all') {
      const P = plan();
      const parts = [rx.p && rx.p.n ? t('p.hello', { name: rx.p.n }) + '.' : '']
        .concat(P.moments.map(sayMoment), P.prn.map((x) => sayPrn(x.m)));
      D.speak(parts.join(' '), b);
    } else if (a === 'print') {
      window.print();
    } else if (a === 'voice') {
      const src = audioNote();
      if (!src) return;
      if (audioEl && !audioEl.paused) { audioEl.pause(); return; }
      D.stopSpeaking();
      audioEl = new Audio(src);
      audioEl.play();
    }
  });

  function announce(msg) {
    live.textContent = '';
    setTimeout(() => { live.textContent = msg; }, 50);
  }

  /* ---------- Démarrage ---------- */
  document.addEventListener('dose:lang', () => {
    D.stopSpeaking();
    if (mode === 'demo') rx = D.demo();
    render();
    if (dialog.open) dialog.close();
  });
  window.addEventListener('hashchange', () => { loadFromHash(); render(); });

  /* Aperçu en direct depuis la vue pharmacien */
  window.addEventListener('message', (e) => {
    if (e.origin !== location.origin && location.origin !== 'null') return;
    const d = e.data;
    if (!d || d.type !== 'dose:update') return;
    rx = d.rx;
    mode = rx && rx.m && rx.m.length ? 'ok' : 'empty';
    loadTaken();
    /* L'aperçu montre l'écran dans la langue du patient quand l'interface la parle */
    const l = rx && rx.p && D.UI_LANGS[rx.p.l] ? rx.p.l : d.lang;
    if (l && l !== D.lang()) D.setLang(l, { persist: false }); else render();
  });

  D.initChrome();
  loadFromHash();
  /* Première ouverture : l'écran s'affiche dans la langue du patient si l'interface la parle */
  if (mode === 'ok' && !EMBED && rx.p && D.UI_LANGS[rx.p.l] && !D.store.get('dose:langset:' + rx.id, false)) {
    D.store.set('dose:langset:' + rx.id, true);
    if (rx.p.l !== D.lang()) D.setLang(rx.p.l);
  }
  render();
  if (params.has('print') && !EMBED && rx) {
    const go = () => setTimeout(() => window.print(), 300);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(go); else go();
  }
  if (EMBED && window.parent !== window) window.parent.postMessage({ type: 'dose:ready' }, '*');
})();
