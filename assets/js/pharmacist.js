/* =========================================================
   Dose — vue pharmacien
   Saisie rapide, aperçu en direct, message vocal, remise au patient.
   ========================================================= */
(function () {
  'use strict';
  const D = window.Dose, t = D.t, esc = D.esc;

  D.addStrings({
    fr: {
      'ph.tag': 'Pharmacie',
      'ph.title': 'Nouvelle ordonnance',
      'ph.intro': 'Remplissez en moins d’une minute. L’aperçu montre exactement ce que verra votre patient.',
      'ph.example': 'Remplir avec un exemple', 'ph.reset': 'Tout effacer',
      'ph.patient': 'Patient', 'ph.patientName': 'Prénom ou surnom', 'ph.patientLang': 'Langue parlée',
      'ph.langHint': 'Votre patient parle {lang} : enregistrez un message vocal dans sa langue (étape 4).',
      'ph.pharmacy': 'Votre pharmacie', 'ph.pharmacyName': 'Nom de la pharmacie',
      'ph.pharmacyTel': 'Téléphone (facultatif)', 'ph.start': 'Début du traitement',
      'ph.remember': 'Ces informations sont gardées sur cet appareil pour la prochaine ordonnance.',
      'ph.meds': 'Médicaments', 'ph.addLabel': 'Rechercher ou saisir un médicament', 'ph.add': 'Ajouter',
      'ph.quick': 'Fréquents :',
      'ph.noMeds': 'Aucun médicament pour l’instant. Recherchez-en un ci-dessus ou touchez un médicament fréquent.',
      'ph.medN': 'Médicament {n}', 'ph.remove': 'Retirer', 'ph.removeLabel': 'Retirer {name}',
      'ph.name': 'Nom', 'ph.strength': 'Dosage', 'ph.strengthPh': 'ex. 500 mg',
      'ph.form': 'Forme', 'ph.color': 'Couleur', 'ph.color2': 'Couleur de l’autre moitié',
      'ph.qty': 'Quantité par prise', 'ph.qtyLess': 'Diminuer la quantité', 'ph.qtyMore': 'Augmenter la quantité',
      'ph.days': 'Durée (jours)', 'ph.when': 'Quand ?',
      'ph.prn': 'Seulement si besoin (douleur, fièvre…)', 'ph.prnMax': 'Maximum de prises par jour',
      'ph.meal': 'Par rapport au repas',
      'ph.note': 'Conseil pour le patient (facultatif)', 'ph.notePh': 'ex. Continuer même si la fièvre disparaît',
      'ph.fiche': 'Montrer la fiche « À quoi sert ce médicament ? »',
      'ph.ficheFor': 'Ligne « Pour… » de la fiche', 'ph.ficheForHint': 'Laissez vide pour « {def} ». Effacez ce qui ne doit pas apparaître.',
      'ph.noFiche': 'Pas de fiche pour ce médicament dans le catalogue.',
      'ph.voice': 'Message vocal', 'ph.optional': 'facultatif',
      'ph.voiceHint': '30 secondes maximum. Expliquez le traitement avec vos mots, dans la langue du patient.',
      'ph.record': 'Enregistrer', 'ph.stopRec': 'Arrêter · {s} s', 'ph.deleteRec': 'Supprimer le message',
      'ph.recDone': 'Message enregistré ({s} s).',
      'ph.recUnsupported': 'L’enregistrement n’est pas disponible sur ce navigateur.',
      'ph.recDenied': 'Micro non autorisé. Vérifiez les permissions du navigateur.',
      'ph.recTooBig': 'Message trop long pour être gardé sur cet appareil. Essayez plus court.',
      'ph.recNote': 'Prototype : le message est gardé sur cet appareil uniquement, il ne voyage pas dans le lien.',
      'ph.generate': 'Créer l’ordonnance patient',
      'ph.privacy': 'Aucune donnée n’est envoyée à un serveur : l’ordonnance est contenue dans le lien.',
      'ph.errors': 'Il manque quelques informations :',
      'ph.errPatient': 'Le prénom du patient', 'ph.errNoMed': 'Au moins un médicament',
      'ph.errName': 'Le nom du médicament {n}', 'ph.errWhen': 'Quand prendre le médicament {n}',
      'ph.errNameField': 'Indiquez le nom du médicament.', 'ph.errWhenField': 'Choisissez au moins un moment, ou « Seulement si besoin ».',
      'ph.errPatientField': 'Indiquez le prénom du patient.',
      'ph.readyTitle': 'Ordonnance prête', 'ph.readyIn': 'Préparée en {s} secondes.',
      'ph.scan': 'Le patient scanne ce code avec l’appareil photo de son téléphone.',
      'ph.qrUnavailable': 'QR code indisponible hors connexion. Utilisez le lien.',
      'ph.link': 'Lien de l’ordonnance', 'ph.copy': 'Copier le lien', 'ph.copied': 'Lien copié.',
      'ph.whatsapp': 'Envoyer par WhatsApp', 'ph.print': 'Imprimer la feuille papier', 'ph.sms': 'Envoyer par SMS', 'ph.open': 'Ouvrir la vue patient',
      'ph.shareText': 'Bonjour {name}, voici votre traitement expliqué par {ph} : {url}',
      'ph.new': 'Nouvelle ordonnance', 'ph.stale': 'L’ordonnance a changé. Créez-la à nouveau pour mettre à jour le lien.',
      'ph.preview': 'Aperçu patient', 'ph.previewFrame': 'Aperçu de l’écran du patient',
      'ph.previewOpen': 'Voir l’aperçu', 'ph.previewClose': 'Fermer l’aperçu',
      'ph.added': '{name} ajouté.', 'ph.removed': '{name} retiré.',
      'ph.confirmReset': 'Effacer toute l’ordonnance ?',
      'ph.edit': 'Modifier', 'ph.editLabel': 'Modifier {name}',
      'ph.summaryDays': '{n} jours', 'ph.summaryDay': '1 jour', 'ph.summaryPrn': 'si besoin, {max} fois par jour au plus',
      'ph.summaryNoWhen': 'moment à choisir'
    },
    en: {
      'ph.tag': 'Pharmacy',
      'ph.title': 'New prescription',
      'ph.intro': 'Fill it in under a minute. The preview shows exactly what your patient will see.',
      'ph.example': 'Fill with an example', 'ph.reset': 'Clear all',
      'ph.patient': 'Patient', 'ph.patientName': 'First name or nickname', 'ph.patientLang': 'Language spoken',
      'ph.langHint': 'Your patient speaks {lang}: record a voice message in their language (step 4).',
      'ph.pharmacy': 'Your pharmacy', 'ph.pharmacyName': 'Pharmacy name',
      'ph.pharmacyTel': 'Phone (optional)', 'ph.start': 'Treatment start',
      'ph.remember': 'These details are kept on this device for the next prescription.',
      'ph.meds': 'Medicines', 'ph.addLabel': 'Search or type a medicine', 'ph.add': 'Add',
      'ph.quick': 'Frequent:',
      'ph.noMeds': 'No medicine yet. Search above or tap a frequent medicine.',
      'ph.medN': 'Medicine {n}', 'ph.remove': 'Remove', 'ph.removeLabel': 'Remove {name}',
      'ph.name': 'Name', 'ph.strength': 'Strength', 'ph.strengthPh': 'e.g. 500 mg',
      'ph.form': 'Form', 'ph.color': 'Colour', 'ph.color2': 'Colour of the other half',
      'ph.qty': 'Amount per dose', 'ph.qtyLess': 'Decrease amount', 'ph.qtyMore': 'Increase amount',
      'ph.days': 'Duration (days)', 'ph.when': 'When?',
      'ph.prn': 'Only if needed (pain, fever…)', 'ph.prnMax': 'Maximum doses per day',
      'ph.meal': 'In relation to meals',
      'ph.note': 'Advice for the patient (optional)', 'ph.notePh': 'e.g. Keep going even if the fever is gone',
      'ph.fiche': 'Show the “What is this medicine for?” sheet',
      'ph.ficheFor': '“For…” line on the sheet', 'ph.ficheForHint': 'Leave empty for “{def}”. Remove anything that should not appear.',
      'ph.noFiche': 'No sheet for this medicine in the catalogue.',
      'ph.voice': 'Voice message', 'ph.optional': 'optional',
      'ph.voiceHint': '30 seconds maximum. Explain the treatment in your own words, in the patient’s language.',
      'ph.record': 'Record', 'ph.stopRec': 'Stop · {s} s', 'ph.deleteRec': 'Delete message',
      'ph.recDone': 'Message recorded ({s} s).',
      'ph.recUnsupported': 'Recording is not available in this browser.',
      'ph.recDenied': 'Microphone not allowed. Check the browser permissions.',
      'ph.recTooBig': 'Message too long to keep on this device. Try a shorter one.',
      'ph.recNote': 'Prototype: the message is kept on this device only; it does not travel in the link.',
      'ph.generate': 'Create patient prescription',
      'ph.privacy': 'No data is sent to a server: the prescription lives inside the link.',
      'ph.errors': 'A few things are missing:',
      'ph.errPatient': 'The patient’s first name', 'ph.errNoMed': 'At least one medicine',
      'ph.errName': 'The name of medicine {n}', 'ph.errWhen': 'When to take medicine {n}',
      'ph.errNameField': 'Enter the medicine name.', 'ph.errWhenField': 'Choose at least one time, or “Only if needed”.',
      'ph.errPatientField': 'Enter the patient’s first name.',
      'ph.readyTitle': 'Prescription ready', 'ph.readyIn': 'Prepared in {s} seconds.',
      'ph.scan': 'The patient scans this code with their phone camera.',
      'ph.qrUnavailable': 'QR code unavailable offline. Use the link.',
      'ph.link': 'Prescription link', 'ph.copy': 'Copy link', 'ph.copied': 'Link copied.',
      'ph.whatsapp': 'Send via WhatsApp', 'ph.print': 'Print the paper sheet', 'ph.sms': 'Send via SMS', 'ph.open': 'Open patient view',
      'ph.shareText': 'Hello {name}, here is your treatment explained by {ph}: {url}',
      'ph.new': 'New prescription', 'ph.stale': 'The prescription changed. Create it again to update the link.',
      'ph.preview': 'Patient preview', 'ph.previewFrame': 'Preview of the patient screen',
      'ph.previewOpen': 'See preview', 'ph.previewClose': 'Close preview',
      'ph.added': '{name} added.', 'ph.removed': '{name} removed.',
      'ph.confirmReset': 'Clear the whole prescription?',
      'ph.edit': 'Edit', 'ph.editLabel': 'Edit {name}',
      'ph.summaryDays': '{n} days', 'ph.summaryDay': '1 day', 'ph.summaryPrn': 'if needed, at most {max} times a day',
      'ph.summaryNoWhen': 'time to choose'
    }
  });

  const $ = (sel) => document.querySelector(sel);
  const live = $('#live');
  const list = $('#med-list');
  const frame = $('#preview-frame');
  const resultEl = $('#result');

  /* ---------- État ---------- */
  let rxId = D.newId();
  let meds = [];
  let uid = 0;
  let startedAt = null;
  let generated = false;

  const pharmacy = D.store.get('dose:pharmacy', { n: '', t: '' });
  $('#ph-name').value = pharmacy.n || '';
  $('#ph-tel').value = pharmacy.t || '';
  $('#rx-start').value = D.today();

  function announce(msg) { live.textContent = ''; setTimeout(() => { live.textContent = msg; }, 50); }
  function touch() {
    if (!startedAt) startedAt = Date.now();
    if (generated) markStale();
    schedulePreview();
  }

  /* ---------- Listes statiques ---------- */
  function renderStatic() {
    const sel = $('#p-lang');
    const cur = sel.value || 'fr';
    sel.innerHTML = Object.entries(D.LANGS).map(([k, v]) => `<option value="${k}">${esc(v)}</option>`).join('');
    sel.value = cur;
    $('#catalog-list').innerHTML = D.CATALOG.map((m) => `<option value="${esc(m.n)}">${esc(m.s || '')}</option>`).join('');
    $('#quick-list').innerHTML = ['al', 'para', 'amox', 'fer', 'sro', 'ibu'].map((k) => {
      const m = D.catalogItem(k);
      return `<button type="button" class="quick-btn" data-quick="${k}">${D.pillSVG(m.f, m.c, m.c2, 24)}<span>${esc(m.n.replace(/ \(.+\)$/, ''))}</span></button>`;
    }).join('');
    $('#preview-close').innerHTML = D.ICON.close;
    updateLangHint();
  }

  function updateLangHint() {
    const l = $('#p-lang').value;
    const hint = $('#lang-hint');
    const local = l && l !== 'fr' && l !== 'en';
    hint.hidden = !local;
    if (local) hint.textContent = t('ph.langHint', { lang: D.LANGS[l] });
  }

  /* ---------- Médicaments ---------- */
  function addMed(src) {
    const base = src && src.k ? JSON.parse(JSON.stringify(src)) : { n: (src && src.n) || '', s: '', f: 'round', c: 'white', q: 1, t: [], r: 'any', j: 5 };
    delete base.fiche;
    base.t = base.t || [];
    base._u = ++uid;
    base._open = !base.k;
    meds.push(base);
    renderMeds();
    const card = list.querySelector(`[data-u="${base._u}"]`);
    if (card) {
      card.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'nearest' });
      const target = base.n ? card.querySelector('.med-title') : card.querySelector('[data-field="n"]');
      target.focus();
    }
    if (base.n) announce(t('ph.added', { name: base.n }));
    touch();
  }

  function addFromSearch() {
    const input = $('#med-search');
    const q = input.value.trim();
    if (!q) { input.focus(); return; }
    const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    const found = D.CATALOG.find((m) => norm(m.n) === norm(q)) || D.CATALOG.find((m) => norm(m.n).startsWith(norm(q)));
    addMed(found || { n: q });
    input.value = '';
  }

  const findMed = (u) => meds.find((m) => m._u === Number(u));

  function summary(m) {
    const when = m.prn ? t('ph.summaryPrn', { max: m.max || 3 })
      : (m.t || []).length ? m.t.map((x) => t('moment.' + x)).join(', ') : t('ph.summaryNoWhen');
    const days = (m.j || 1) > 1 ? t('ph.summaryDays', { n: m.j }) : t('ph.summaryDay');
    return [`${m.q} ${D.unit(m.f, m.q)}`, when, t('meal.' + (m.r || 'any')), days].join(' · ');
  }

  function medCard(m, i) {
    const u = m._u;
    const isPrn = !!m.prn;
    const fiche = D.FICHES[(D.catalogItem(m.k) || {}).fiche || m.k];
    const ficheDefault = fiche ? (fiche[D.lang()] || fiche.fr).for : '';
    const radio = (name, value, checked, content, label) => `
      <label class="tile-radio">
        <input type="radio" name="${name}-${u}" value="${value}" ${checked ? 'checked' : ''} data-radio="${name}">
        <span class="tile-face">${content}<span class="tile-label">${esc(label)}</span></span>
      </label>`;
    const swatch = (name, c, checked) => `
      <label class="swatch-radio">
        <input type="radio" name="${name}-${u}" value="${c}" ${checked ? 'checked' : ''} data-radio="${name}">
        <span class="swatch-dot" style="--c:${D.COLORS[c]}"></span><span class="sr-only">${esc(t('color.' + c))}</span>
      </label>`;
    return `
      <li class="med-card${m._open ? '' : ' is-collapsed'}" data-u="${u}">
        <div class="med-head">
          <span class="med-pill" aria-hidden="true">${D.pillsHTML(m, 30)}</span>
          <h3 class="med-title" tabindex="-1"><span class="med-num">${esc(t('ph.medN', { n: i + 1 }))}</span><span class="med-name-display">${esc(m.n)}</span></h3>
          <div class="med-actions">
            <button type="button" class="btn btn-ghost btn-sm btn-edit" data-edit="${u}" aria-expanded="${!!m._open}" aria-controls="body-${u}" aria-label="${esc(t('ph.editLabel', { name: m.n || t('ph.medN', { n: i + 1 }) }))}">${esc(t('ph.edit'))}</button>
            <button type="button" class="btn btn-ghost btn-sm" data-remove="${u}" aria-label="${esc(t('ph.removeLabel', { name: m.n || t('ph.medN', { n: i + 1 }) }))}">${D.ICON.close}<span>${esc(t('ph.remove'))}</span></button>
          </div>
        </div>
        <p class="med-summary">${esc(summary(m))}</p>
        <div class="med-body" id="body-${u}" ${m._open ? '' : 'hidden'}>

        <div class="grid2">
          <div class="field">
            <label for="n-${u}">${esc(t('ph.name'))}</label>
            <input id="n-${u}" data-field="n" value="${esc(m.n)}" maxlength="60" aria-describedby="n-${u}-err">
            <p class="field-error" id="n-${u}-err" hidden></p>
          </div>
          <div class="field">
            <label for="s-${u}">${esc(t('ph.strength'))}</label>
            <input id="s-${u}" data-field="s" value="${esc(m.s || '')}" maxlength="30" placeholder="${esc(t('ph.strengthPh'))}">
          </div>
        </div>

        <fieldset class="fs">
          <legend>${esc(t('ph.form'))}</legend>
          <div class="tiles">${D.FORMS.map((f) => radio('f', f, m.f === f, D.pillSVG(f, 'white', 'white', 32), t('form.' + f))).join('')}</div>
        </fieldset>

        <div class="grid2">
          <fieldset class="fs">
            <legend>${esc(t('ph.color'))}</legend>
            <div class="swatches">${Object.keys(D.COLORS).map((c) => swatch('c', c, m.c === c)).join('')}</div>
          </fieldset>
          <fieldset class="fs" data-show="c2" ${m.f === 'capsule' ? '' : 'hidden'}>
            <legend>${esc(t('ph.color2'))}</legend>
            <div class="swatches">${Object.keys(D.COLORS).map((c) => swatch('c2', c, (m.c2 || m.c) === c)).join('')}</div>
          </fieldset>
        </div>

        <div class="grid2">
          <div class="field">
            <span class="label" id="q-${u}-label">${esc(t('ph.qty'))}</span>
            <div class="stepper" role="group" aria-labelledby="q-${u}-label">
              <button type="button" class="icon-btn" data-step="-1" aria-label="${esc(t('ph.qtyLess'))}">−</button>
              <output data-out="q" aria-live="polite">${m.q} ${esc(D.unit(m.f, m.q))}</output>
              <button type="button" class="icon-btn" data-step="1" aria-label="${esc(t('ph.qtyMore'))}">+</button>
            </div>
          </div>
          <div class="field">
            <label for="j-${u}">${esc(t('ph.days'))}</label>
            <input id="j-${u}" data-field="j" type="number" inputmode="numeric" min="1" max="365" value="${m.j || 1}">
          </div>
        </div>

        <fieldset class="fs" aria-describedby="t-${u}-err">
          <legend>${esc(t('ph.when'))}</legend>
          <div class="moment-toggles" data-show="moments" ${isPrn ? 'hidden' : ''}>
            ${D.MOMENTS.map((mo) => `
              <button type="button" class="moment-toggle" data-moment="${mo.id}" aria-pressed="${(m.t || []).includes(mo.id)}">
                ${D.momentSVG(mo.id, 40)}<span>${esc(t('moment.' + mo.id))}</span>
              </button>`).join('')}
          </div>
          <label class="check-row">
            <input type="checkbox" data-field="prn" ${isPrn ? 'checked' : ''}>
            <span>${esc(t('ph.prn'))}</span>
          </label>
          <div class="field field-inline" data-show="max" ${isPrn ? '' : 'hidden'}>
            <label for="max-${u}">${esc(t('ph.prnMax'))}</label>
            <input id="max-${u}" data-field="max" type="number" inputmode="numeric" min="1" max="12" value="${m.max || 3}">
          </div>
          <p class="field-error" id="t-${u}-err" hidden></p>
        </fieldset>

        <fieldset class="fs">
          <legend>${esc(t('ph.meal'))}</legend>
          <div class="tiles tiles-meal">${D.MEALS.map((r) => `
            <label class="tile-radio">
              <input type="radio" name="r-${u}" value="${r}" ${(m.r || 'any') === r ? 'checked' : ''} data-radio="r">
              <span class="tile-face">${D.mealHTML(r, { f: 'round', c: 'white' })}</span>
            </label>`).join('')}
          </div>
        </fieldset>

        <div class="field">
          <label for="note-${u}">${esc(t('ph.note'))}</label>
          <textarea id="note-${u}" data-field="note" rows="2" maxlength="140" placeholder="${esc(t('ph.notePh'))}">${esc(m.note || '')}</textarea>
        </div>

        <div class="fiche-opts">
          ${fiche ? `
            <label class="check-row">
              <input type="checkbox" data-field="fi" ${m.fi === 0 ? '' : 'checked'}>
              <span>${D.ICON.info} ${esc(t('ph.fiche'))}</span>
            </label>
            <div class="field" data-show="fp" ${m.fi === 0 ? 'hidden' : ''}>
              <label for="fp-${u}">${esc(t('ph.ficheFor'))}</label>
              <input id="fp-${u}" data-field="fp" value="${esc(m.fp || '')}" maxlength="60" placeholder="${esc(ficheDefault)}" aria-describedby="fp-${u}-hint">
              <p class="hint hint-small" id="fp-${u}-hint">${esc(t('ph.ficheForHint', { def: t('p.for', { what: ficheDefault }) }))}</p>
            </div>` : `<p class="hint hint-small">${esc(t('ph.noFiche'))}</p>`}
        </div>
        </div>
      </li>`;
  }

  function renderMeds() {
    list.innerHTML = meds.map(medCard).join('');
    $('#no-meds').hidden = meds.length > 0;
  }

  /* Mise à jour légère d'une carte (sans tout redessiner, pour garder le focus) */
  function refreshCard(m) {
    const card = list.querySelector(`[data-u="${m._u}"]`);
    if (!card) return;
    card.querySelector('.med-pill').innerHTML = D.pillsHTML(m, 30);
    card.querySelector('.med-name-display').textContent = m.n;
    card.querySelector('.med-summary').textContent = summary(m);
    card.querySelector('[data-out="q"]').textContent = `${m.q} ${D.unit(m.f, m.q)}`;
    card.querySelector('[data-show="c2"]').hidden = m.f !== 'capsule';
    card.querySelector('[data-show="moments"]').hidden = !!m.prn;
    card.querySelector('[data-show="max"]').hidden = !m.prn;
    const fp = card.querySelector('[data-show="fp"]');
    if (fp) fp.hidden = m.fi === 0;
  }

  list.addEventListener('input', (e) => {
    const el = e.target;
    const card = el.closest('.med-card');
    if (!card) return;
    const m = findMed(card.dataset.u);
    const f = el.dataset.field;
    if (el.dataset.radio) {
      m[el.dataset.radio] = el.value;
      if (el.dataset.radio === 'f' && el.value === 'capsule' && !m.c2) m.c2 = m.c;
    } else if (f === 'prn') {
      m.prn = el.checked;
    } else if (f === 'fi') {
      if (el.checked) delete m.fi; else m.fi = 0;
    } else if (f === 'j' || f === 'max') {
      const n = parseInt(el.value, 10);
      if (!Number.isNaN(n)) m[f] = Math.max(1, Math.min(f === 'j' ? 365 : 12, n));
    } else if (f) {
      m[f] = el.value;
      if (f === 'n') clearFieldError(el);
    }
    if (f === 'prn' || f === 'n') clearFieldError(card.querySelector('[data-show="moments"]'));
    refreshCard(m);
    touch();
  });

  list.addEventListener('click', (e) => {
    const card = e.target.closest('.med-card');
    if (!card) return;
    const m = findMed(card.dataset.u);
    const step = e.target.closest('[data-step]');
    const tog = e.target.closest('[data-moment]');
    const rem = e.target.closest('[data-remove]');
    const edit = e.target.closest('[data-edit]');
    if (edit) {
      setOpen(m, !m._open);
      return;
    }
    if (step) {
      m.q = Math.max(1, Math.min(10, (m.q || 1) + Number(step.dataset.step)));
      refreshCard(m); touch();
    } else if (tog) {
      const id = tog.dataset.moment;
      const on = !(m.t || []).includes(id);
      m.t = on ? (m.t || []).concat(id) : m.t.filter((x) => x !== id);
      m.t.sort((a, b) => D.MOMENTS.findIndex((x) => x.id === a) - D.MOMENTS.findIndex((x) => x.id === b));
      tog.setAttribute('aria-pressed', String(on));
      clearFieldError(tog.parentElement);
      touch();
    } else if (rem) {
      const idx = meds.indexOf(m);
      meds.splice(idx, 1);
      renderMeds();
      announce(t('ph.removed', { name: m.n || '' }));
      const next = list.querySelectorAll('.med-title')[Math.min(idx, meds.length - 1)];
      (next || $('#med-search')).focus();
      touch();
    }
  });

  function setOpen(m, open) {
    m._open = open;
    const card = list.querySelector(`[data-u="${m._u}"]`);
    if (!card) return;
    card.classList.toggle('is-collapsed', !open);
    card.querySelector('.med-body').hidden = !open;
    card.querySelector('[data-edit]').setAttribute('aria-expanded', String(open));
  }

  /* ---------- Erreurs ---------- */
  function setFieldError(errId, msg, input) {
    const p = document.getElementById(errId);
    if (p) { p.textContent = msg; p.hidden = false; }
    if (input) input.setAttribute('aria-invalid', 'true');
  }
  function clearFieldError(el) {
    if (!el) return;
    const holder = el.closest('.field, .fs');
    if (!holder) return;
    holder.querySelectorAll('.field-error').forEach((p) => { p.hidden = true; });
    holder.querySelectorAll('[aria-invalid]').forEach((i) => i.removeAttribute('aria-invalid'));
  }

  function validate() {
    const errors = [];
    document.querySelectorAll('.field-error').forEach((p) => { p.hidden = true; });
    document.querySelectorAll('[aria-invalid]').forEach((i) => i.removeAttribute('aria-invalid'));
    if (!$('#p-name').value.trim()) {
      errors.push({ msg: t('ph.errPatient'), target: 'p-name' });
      setFieldError('p-name-err', t('ph.errPatientField'), $('#p-name'));
    }
    if (!meds.length) errors.push({ msg: t('ph.errNoMed'), target: 'med-search' });
    meds.forEach((m, i) => {
      if (!m.n.trim() || (!m.prn && !(m.t || []).length)) setOpen(m, true);
      if (!m.n.trim()) {
        errors.push({ msg: t('ph.errName', { n: i + 1 }), target: 'n-' + m._u });
        setFieldError(`n-${m._u}-err`, t('ph.errNameField'), document.getElementById('n-' + m._u));
      }
      if (!m.prn && !(m.t || []).length) {
        const card = list.querySelector(`[data-u="${m._u}"]`);
        errors.push({ msg: t('ph.errWhen', { n: i + 1 }), target: card.querySelector('[data-moment]').id || setId(card.querySelector('[data-moment]')) });
        setFieldError(`t-${m._u}-err`, t('ph.errWhenField'));
      }
    });
    const box = $('#errors');
    if (!errors.length) { box.hidden = true; return true; }
    box.innerHTML = `<p><strong>${esc(t('ph.errors'))}</strong></p><ul>${errors.map((e) => `<li><a href="#${e.target}">${esc(e.msg)}</a></li>`).join('')}</ul>`;
    box.hidden = false;
    box.focus();
    return false;
  }
  function setId(el) { el.id = el.id || 'el-' + Math.random().toString(36).slice(2, 8); return el.id; }
  $('#errors').addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    e.preventDefault();
    const target = document.getElementById(a.getAttribute('href').slice(1));
    if (target) { target.focus(); target.scrollIntoView({ block: 'center' }); }
  });

  /* ---------- Construction de l'ordonnance (format compact du lien) ---------- */
  function buildRx() {
    return {
      v: 1,
      id: rxId,
      p: { n: $('#p-name').value.trim(), l: $('#p-lang').value },
      ph: { n: $('#ph-name').value.trim(), t: $('#ph-tel').value.trim() },
      d: $('#rx-start').value || D.today(),
      m: meds.map((src) => {
        const m = { n: src.n.trim(), f: src.f, c: src.c, q: src.q, r: src.r || 'any', j: src.j || 1 };
        if (src.k) m.k = src.k;
        if (src.s) m.s = src.s.trim();
        if (src.f === 'capsule' && src.c2) m.c2 = src.c2;
        if (src.prn) { m.prn = true; m.max = src.max || 3; m.t = []; } else m.t = (src.t || []).slice();
        if (src.note && src.note.trim()) m.note = src.note.trim();
        if (src.fi === 0) m.fi = 0;
        if (src.fp && src.fp.trim()) m.fp = src.fp.trim();
        return m;
      })
    };
  }

  /* ---------- Aperçu en direct ---------- */
  let previewTimer = null;
  function schedulePreview() {
    clearTimeout(previewTimer);
    previewTimer = setTimeout(sendPreview, 120);
  }
  function sendPreview() {
    if (!frame.contentWindow) return;
    frame.contentWindow.postMessage({ type: 'dose:update', rx: buildRx(), lang: D.lang() }, '*');
  }
  window.addEventListener('message', (e) => {
    if (e.data && e.data.type === 'dose:ready') sendPreview();
  });

  /* Sur petit écran, l'aperçu s'ouvre par-dessus le formulaire */
  const preview = $('#preview');
  const openBtn = $('#preview-open');
  openBtn.addEventListener('click', () => {
    preview.classList.add('is-open');
    openBtn.setAttribute('aria-expanded', 'true');
    $('#preview-close').focus();
  });
  $('#preview-close').addEventListener('click', closePreview);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && preview.classList.contains('is-open')) closePreview(); });
  function closePreview() {
    preview.classList.remove('is-open');
    openBtn.setAttribute('aria-expanded', 'false');
    openBtn.focus();
  }

  /* ---------- Message vocal ---------- */
  const voice = $('#voice');
  const audioKey = () => 'dose:audio:' + rxId;
  let recorder = null, recTimer = null, recStart = 0, recStream = null;

  function renderVoice(msg) {
    const saved = D.store.get(audioKey(), null);
    const canRec = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder);
    if (recorder) {
      const s = Math.round((Date.now() - recStart) / 1000);
      voice.innerHTML = `<button type="button" class="btn btn-rec is-recording" id="rec-stop"><span class="rec-dot" aria-hidden="true"></span>${esc(t('ph.stopRec', { s }))}</button>
        <span class="rec-bar" aria-hidden="true"><span style="width:${Math.min(100, (s / 30) * 100)}%"></span></span>`;
      return;
    }
    voice.innerHTML = `
      ${saved ? `<audio controls src="${saved}"></audio>
        <button type="button" class="btn btn-ghost" id="rec-delete">${esc(t('ph.deleteRec'))}</button>` : ''}
      ${canRec ? `<button type="button" class="btn btn-rec" id="rec-start"><span class="rec-dot" aria-hidden="true"></span>${esc(t('ph.record'))}</button>`
        : `<p class="hint">${esc(t('ph.recUnsupported'))}</p>`}
      ${msg ? `<p class="hint hint-strong" role="status">${esc(msg)}</p>` : ''}`;
  }

  voice.addEventListener('click', async (e) => {
    if (e.target.closest('#rec-start')) {
      try {
        recStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch (err) { renderVoice(t('ph.recDenied')); return; }
      const chunks = [];
      recorder = new MediaRecorder(recStream);
      recorder.ondataavailable = (ev) => { if (ev.data.size) chunks.push(ev.data); };
      recorder.onstop = () => {
        const secs = Math.round((Date.now() - recStart) / 1000);
        recStream.getTracks().forEach((tr) => tr.stop());
        recorder = null; clearInterval(recTimer);
        const blob = new Blob(chunks, { type: chunks[0] ? chunks[0].type : 'audio/webm' });
        const reader = new FileReader();
        reader.onload = () => {
          try { localStorage.setItem(audioKey(), JSON.stringify(reader.result)); renderVoice(t('ph.recDone', { s: secs })); }
          catch (err) { renderVoice(t('ph.recTooBig')); }
          touch();
          const stopBtn = voice.querySelector('#rec-start');
          if (stopBtn) stopBtn.focus();
        };
        reader.readAsDataURL(blob);
      };
      recStart = Date.now();
      recorder.start();
      recTimer = setInterval(() => {
        if (Date.now() - recStart >= 30000) recorder.stop(); else renderVoice();
      }, 500);
      renderVoice();
      voice.querySelector('#rec-stop').focus();
    } else if (e.target.closest('#rec-stop')) {
      if (recorder) recorder.stop();
    } else if (e.target.closest('#rec-delete')) {
      try { localStorage.removeItem(audioKey()); } catch (err) { /* rien */ }
      renderVoice();
      voice.querySelector('#rec-start') && voice.querySelector('#rec-start').focus();
      touch();
    }
  });

  /* ---------- Création et remise ---------- */
  function patientUrl(rx) {
    return new URL('patient.html', location.href).href.split('#')[0] + '#d=' + D.encode(rx);
  }

  function qrSVG(text) {
    if (typeof window.qrcode !== 'function') return null;
    try {
      const qr = window.qrcode(0, 'L');
      qr.addData(text);
      qr.make();
      return qr.createSvgTag(4, 8);
    } catch (e) { return null; }
  }

  function renderResult(rx) {
    const url = patientUrl(rx);
    const secs = startedAt ? Math.max(1, Math.round((Date.now() - startedAt) / 1000)) : null;
    const share = t('ph.shareText', { name: rx.p.n, ph: rx.ph.n || 'Dose', url });
    const qr = qrSVG(url);
    resultEl.innerHTML = `
      <div class="result-head">
        <span class="result-check" aria-hidden="true">${D.ICON.check}</span>
        <div>
          <h2 id="result-title">${esc(t('ph.readyTitle'))}</h2>
          ${secs ? `<p class="result-time">${esc(t('ph.readyIn', { s: secs }))}</p>` : ''}
        </div>
      </div>
      <p class="stale-note" hidden>${esc(t('ph.stale'))}</p>
      <div class="result-body">
        <figure class="qr">
          ${qr ? `<div class="qr-code" role="img" aria-label="QR code">${qr}</div>` : `<p class="hint">${esc(t('ph.qrUnavailable'))}</p>`}
          <figcaption>${esc(t('ph.scan'))}</figcaption>
        </figure>
        <div class="share">
          <div class="field">
            <label for="rx-link">${esc(t('ph.link'))}</label>
            <input id="rx-link" readonly value="${esc(url)}">
          </div>
          <button type="button" class="btn btn-secondary" id="copy-link">${esc(t('ph.copy'))}</button>
          <a class="btn btn-whatsapp" href="https://wa.me/?text=${encodeURIComponent(share)}" target="_blank" rel="noopener">${esc(t('ph.whatsapp'))}</a>
          <a class="btn btn-secondary" href="sms:?&body=${encodeURIComponent(share)}">${esc(t('ph.sms'))}</a>
          <a class="btn btn-secondary" href="${esc(url.replace('patient.html#', 'patient.html?print#'))}" target="_blank" rel="noopener">${esc(t('ph.print'))}</a>
          <a class="btn btn-ghost" href="${esc(url)}" target="_blank" rel="noopener">${esc(t('ph.open'))}</a>
          <button type="button" class="btn btn-ghost" id="new-rx">${esc(t('ph.new'))}</button>
        </div>
      </div>`;
    resultEl.hidden = false;
    resultEl.classList.remove('is-stale');
    resultEl.focus();
    resultEl.scrollIntoView({ block: 'start' });
  }

  function markStale() {
    resultEl.classList.add('is-stale');
    const n = resultEl.querySelector('.stale-note');
    if (n) n.hidden = false;
  }

  resultEl.addEventListener('click', async (e) => {
    if (e.target.closest('#copy-link')) {
      const input = $('#rx-link');
      try { await navigator.clipboard.writeText(input.value); }
      catch (err) { input.select(); document.execCommand('copy'); }
      announce(t('ph.copied'));
      e.target.closest('#copy-link').textContent = t('ph.copied');
    } else if (e.target.closest('#new-rx')) {
      resetAll(true);
    }
  });

  $('#rx-form').addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validate()) return;
    D.store.set('dose:pharmacy', { n: $('#ph-name').value.trim(), t: $('#ph-tel').value.trim() });
    generated = true;
    renderResult(buildRx());
  });

  /* ---------- Exemple et remise à zéro ---------- */
  function resetAll(skipConfirm) {
    if (!skipConfirm && (meds.length || $('#p-name').value) && !confirm(t('ph.confirmReset'))) return;
    rxId = D.newId();
    meds = [];
    startedAt = null;
    generated = false;
    $('#p-name').value = '';
    $('#p-lang').value = 'fr';
    $('#rx-start').value = D.today();
    $('#errors').hidden = true;
    resultEl.hidden = true;
    renderMeds(); renderVoice(); updateLangHint(); schedulePreview();
    $('#p-name').focus();
  }

  $('#fill-example').addEventListener('click', () => {
    const demo = D.demo();
    rxId = D.newId();
    startedAt = startedAt || Date.now();
    $('#p-name').value = demo.p.n;
    $('#p-lang').value = demo.p.l;
    if (!$('#ph-name').value) $('#ph-name').value = demo.ph.n;
    $('#rx-start').value = D.today();
    meds = demo.m.map((m) => Object.assign({}, m, { t: (m.t || []).slice(), _u: ++uid }));
    renderMeds(); renderVoice(); updateLangHint(); touch();
    announce(t('ph.added', { name: meds.map((m) => m.n).join(', ') }));
  });
  $('#reset').addEventListener('click', () => resetAll(false));

  /* ---------- Champs généraux ---------- */
  $('#add-med').addEventListener('click', addFromSearch);
  $('#med-search').addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); addFromSearch(); } });
  $('#quick-list').addEventListener('click', (e) => {
    const b = e.target.closest('[data-quick]');
    if (b) addMed(D.catalogItem(b.dataset.quick));
  });
  ['#p-name', '#ph-name', '#ph-tel', '#rx-start'].forEach((s) => $(s).addEventListener('input', (e) => {
    if (s === '#p-name') clearFieldError(e.target);
    touch();
  }));
  $('#p-lang').addEventListener('change', () => { updateLangHint(); touch(); });

  document.addEventListener('dose:lang', () => {
    renderStatic(); renderMeds(); renderVoice();
    if (generated && !resultEl.hidden) renderResult(buildRx());
    schedulePreview();
  });

  D.initChrome();
  renderStatic();
  renderMeds();
  renderVoice();
})();
