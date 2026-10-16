/* =========================================================
   Dose: home page
   ========================================================= */
(function () {
  'use strict';
  const D = window.Dose, t = D.t, esc = D.esc;

  D.addStrings({
    fr: {
      'l.eyebrow': 'Santé · Accessibilité · Bénin',
      'l.title': 'L’ordonnance que tout le monde peut lire.',
      'l.lead': 'Dose transforme une ordonnance en calendrier visuel et parlé : des dessins à la place des abréviations, la voix du pharmacien à la place du jargon.',
      'l.ctaPharma': 'Créer une ordonnance', 'l.ctaPatient': 'Voir l’exemple patient', 'l.ctaStyle': 'Guide de style',
      'l.before': 'Avant', 'l.beforeCap': 'ce que le patient reçoit',
      'l.after': 'Avec Dose', 'l.afterCap': 'ce qu’il voit sur son téléphone',
      'l.scrawlAlt': 'Ordonnance manuscrite pleine d’abréviations : « 4cp x2/j pdt repas x3j », « Para 1g si T°>38,5 max 3/j ».',
      'l.problemTitle': 'Une ordonnance est écrite pour le pharmacien, pas pour le patient',
      'l.p1t': 'Illisible', 'l.p1': 'Écriture à la main, abréviations (« cp », « x3/j », « pdt »), vocabulaire médical.',
      'l.p2t': 'Dans une seule langue', 'l.p2': 'Presque toujours en français, alors que beaucoup de patients parlent d’abord fon, yoruba, mina ou dendi, et lisent peu.',
      'l.p3t': 'Vite oubliée', 'l.p3': 'L’explication au comptoir s’efface en rentrant. Résultat : erreurs de dose, prises oubliées, traitements arrêtés trop tôt.',
      'l.howTitle': 'Comment ça marche',
      'l.s1t': 'Le pharmacien saisit', 'l.s1': 'En moins d’une minute : les médicaments, les moments, le repas. Il peut enregistrer un message vocal dans la langue du patient.',
      'l.s2t': 'Le patient reçoit', 'l.s2': 'Un QR code à scanner, un message WhatsApp ou SMS, ou une feuille imprimée pour ceux qui n’ont pas de smartphone.',
      'l.s3t': 'Il voit, écoute, coche', 'l.s3': 'Sa journée en images, la voix du pharmacien, et un gros bouton « J’ai pris » pour chaque prise.',
      'l.prTitle': 'Pensé pour celles et ceux qu’on oublie',
      'l.pr1t': 'Zéro lecture requise', 'l.pr1': '4 comprimés, ce sont 4 dessins. Le soleil qui se lève, c’est le matin. L’ordre des images dit « avant » ou « après » le repas.',
      'l.pr2t': 'Dans sa langue', 'l.pr2': 'La synthèse vocale ne parle pas fon. Le pharmacien, si. Son message vocal accompagne l’ordonnance.',
      'l.pr3t': 'Aussi sur papier', 'l.pr3': 'Un calendrier imprimé, avec une case à cocher par prise, et au dos l’explication de chaque médicament.',
      'l.pr4t': 'Aucune donnée sur un serveur', 'l.pr4': 'Pas de compte, pas de base de données : l’ordonnance voyage dans le lien. Les données de santé restent chez le patient.',
      'l.pr5t': 'Lisible par tous', 'l.pr5': 'Police Atkinson Hyperlegible, contrastes AA minimum, texte agrandi, navigation au clavier et lecteur d’écran.',
      'l.pr6t': 'Jamais la couleur seule', 'l.pr6': 'La couleur d’un comprimé est toujours doublée d’une forme, d’un dessin et d’un texte.',
      'l.ctaTitle': 'Essayez en une minute',
      'l.ctaText': 'Remplissez une ordonnance d’exemple côté pharmacien, puis ouvrez-la comme un patient.',
      'l.footer': 'Dose · Projet pour le hackathon HyperBloom October : UI/UX & Web Design.',
      'l.mini': 'Soir', 'l.miniHint': 'Vers 19 h'
    },
    en: {
      'l.eyebrow': 'Health · Accessibility · Benin',
      'l.title': 'The prescription everyone can read.',
      'l.lead': 'Dose turns a prescription into a visual, spoken calendar: drawings instead of abbreviations, the pharmacist’s voice instead of jargon.',
      'l.ctaPharma': 'Create a prescription', 'l.ctaPatient': 'See the patient example', 'l.ctaStyle': 'Style guide',
      'l.before': 'Before', 'l.beforeCap': 'what the patient receives',
      'l.after': 'With Dose', 'l.afterCap': 'what they see on their phone',
      'l.scrawlAlt': 'Handwritten prescription full of abbreviations: “4 tabs x2/d with meals x3d”, “Para 1g if T°>38.5 max 3/d”.',
      'l.problemTitle': 'A prescription is written for the pharmacist, not the patient',
      'l.p1t': 'Unreadable', 'l.p1': 'Handwriting, abbreviations (“tab”, “x3/d”, “w/ meals”), medical vocabulary.',
      'l.p2t': 'In one language only', 'l.p2': 'Almost always in French, while many patients first speak Fon, Yoruba, Mina or Dendi, and read little.',
      'l.p3t': 'Quickly forgotten', 'l.p3': 'The explanation at the counter fades on the way home. The result: wrong doses, missed doses, treatments stopped too early.',
      'l.howTitle': 'How it works',
      'l.s1t': 'The pharmacist fills it in', 'l.s1': 'In under a minute: medicines, times of day, meals. They can record a voice message in the patient’s language.',
      'l.s2t': 'The patient receives it', 'l.s2': 'A QR code to scan, a WhatsApp or SMS message, or a printed sheet for those without a smartphone.',
      'l.s3t': 'They see, listen, tick', 'l.s3': 'Their day in pictures, the pharmacist’s voice, and a big “I took it” button for every dose.',
      'l.prTitle': 'Designed for the people others forget',
      'l.pr1t': 'No reading required', 'l.pr1': '4 tablets means 4 drawings. A rising sun means morning. The order of the pictures says “before” or “after” eating.',
      'l.pr2t': 'In their language', 'l.pr2': 'Text-to-speech does not speak Fon. The pharmacist does. Their voice message comes with the prescription.',
      'l.pr3t': 'On paper too', 'l.pr3': 'A printed calendar with a box to tick for each dose, and on the back what each medicine is for.',
      'l.pr4t': 'No data on a server', 'l.pr4': 'No account, no database: the prescription travels inside the link. Health data stays with the patient.',
      'l.pr5t': 'Readable by all', 'l.pr5': 'Atkinson Hyperlegible typeface, AA contrast or better, larger text, keyboard and screen reader support.',
      'l.pr6t': 'Never colour alone', 'l.pr6': 'A tablet’s colour always comes with a shape, a drawing and a text.',
      'l.ctaTitle': 'Try it in one minute',
      'l.ctaText': 'Fill in a sample prescription as a pharmacist, then open it as a patient.',
      'l.footer': 'Dose · Project for the HyperBloom October: UI/UX & Web Design hackathon.',
      'l.mini': 'Evening', 'l.miniHint': 'Around 7 pm'
    }
  });

  const AL = { f: 'round', c: 'yellow', q: 4, n: 'Artéméther-Luméfantrine', r: 'with' };
  const FER = { f: 'round', c: 'red', q: 1, n: 'Fer + acide folique', r: 'before' };

  function render() {
    /* Mini patient screen for the before/after */
    document.getElementById('mini-card').innerHTML = `
      <div class="mini-moment">
        ${D.momentSVG('evening', 48)}
        <div><p class="mini-title">${esc(t('moment.evening'))}</p><p class="mini-hint">${esc(t('moment.evening.hint'))}</p></div>
        <span class="listen mini-listen">${D.ICON.speaker}</span>
      </div>
      <div class="mini-dose">
        ${D.pillsHTML(AL, 26)}
        <p class="mini-qty">${esc(AL.q + ' ' + D.unit(AL.f, AL.q))}</p>
        ${D.mealHTML(AL.r, AL)}
        <span class="take mini-take">${D.ICON.check}<span>${esc(t('take'))}</span></span>
      </div>`;

    /* Step visuals */
    document.getElementById('step1').innerHTML = `
      <span class="chip">${D.pillSVG('round', 'yellow', null, 22)} Artéméther…</span>
      <span class="step-moments">${D.MOMENTS.map((m) => D.momentSVG(m.id, 30)).join('')}</span>
      <span class="chip chip-timer">⏱ 0:42</span>`;
    document.getElementById('step3').innerHTML = `
      ${D.pillsHTML(FER, 30)}
      ${D.mealHTML(FER.r, FER)}
      <span class="take mini-take" aria-pressed="true">${D.ICON.check}<span>${esc(t('taken'))}</span></span>`;
  }

  document.addEventListener('dose:lang', render);
  D.initChrome();
  render();
})();
