/* =========================================================
   Dose — catalogue de médicaments et fiches patient
   ⚠️ Contenu indicatif rédigé pour le prototype, d'après les notices
   et les recommandations générales de l'OMS. À faire valider par un
   pharmacien avant tout usage réel.
   Les couleurs et formes sont représentatives : le pharmacien les
   ajuste à la boîte réellement délivrée.
   ========================================================= */
(function () {
  'use strict';
  const Dose = window.Dose;

  /* k : clé · n : nom · s : dosage · f : forme · c/c2 : couleurs · q : quantité par prise
     t : moments · r : repas · j : durée en jours · prn : si besoin · max : prises max par jour */
  Dose.CATALOG = [
    { k: 'al', n: 'Artéméther-Luméfantrine', s: '20/120 mg', f: 'round', c: 'yellow', q: 4, t: ['morning', 'evening'], r: 'with', j: 3 },
    { k: 'para', n: 'Paracétamol', s: '500 mg', f: 'round', c: 'white', q: 2, t: [], r: 'any', j: 5, prn: true, max: 3 },
    { k: 'ibu', n: 'Ibuprofène', s: '400 mg', f: 'oval', c: 'pink', q: 1, t: [], r: 'with', j: 3, prn: true, max: 3 },
    { k: 'amox', n: 'Amoxicilline', s: '500 mg', f: 'capsule', c: 'red', c2: 'yellow', q: 1, t: ['morning', 'noon', 'evening'], r: 'any', j: 7 },
    { k: 'amoxs', n: 'Amoxicilline sirop', s: '250 mg / 5 ml', f: 'syrup', c: 'pink', q: 1, t: ['morning', 'noon', 'evening'], r: 'any', j: 7, fiche: 'amox' },
    { k: 'fer', n: 'Fer + acide folique', s: '', f: 'round', c: 'red', q: 1, t: ['morning'], r: 'before', j: 30 },
    { k: 'sro', n: 'Sels de réhydratation orale (SRO)', s: '', f: 'sachet', c: 'orange', q: 1, t: [], r: 'any', j: 3, prn: true, max: 6 },
    { k: 'zinc', n: 'Zinc', s: '20 mg', f: 'round', c: 'white', q: 1, t: ['morning'], r: 'any', j: 10 },
    { k: 'metf', n: 'Metformine', s: '500 mg', f: 'oval', c: 'white', q: 1, t: ['morning', 'evening'], r: 'with', j: 30 },
    { k: 'amlo', n: 'Amlodipine', s: '5 mg', f: 'round', c: 'white', q: 1, t: ['morning'], r: 'any', j: 30 },
    { k: 'ome', n: 'Oméprazole', s: '20 mg', f: 'capsule', c: 'pink', c2: 'brown', q: 1, t: ['morning'], r: 'before', j: 14 }
  ];

  Dose.catalogItem = (k) => Dose.CATALOG.find((m) => m.k === k);

  /* Fiches : for (pour quoi) · use (à quoi il sert) · how (bien le prendre)
     ok (ce qui peut arriver, sans danger) · alert (quand revenir) · avoid (à éviter)
     3 éléments maximum par bloc. */
  Dose.FICHES = {
    al: {
      fr: {
        for: 'le paludisme',
        use: ['Il soigne le paludisme : il tue le parasite qui est dans le sang.'],
        how: ['Faites les 6 prises en entier, même si la fièvre part.', 'Si vous arrêtez trop tôt, le paludisme peut revenir.'],
        ok: ['Maux de tête, vertiges ou fatigue.', "Moins d'appétit."],
        alert: ["Vous vomissez moins d'une heure après la prise : il faudra peut-être la refaire.", 'La fièvre est toujours là après 3 jours.', "Convulsions, grande faiblesse ou mal à respirer : allez à l'hôpital tout de suite."],
        avoid: ["Ne le prenez pas l'estomac vide : un repas ou un verre de lait l'aide à agir."]
      },
      en: {
        for: 'malaria',
        use: ['It treats malaria: it kills the parasite in your blood.'],
        how: ['Take all 6 doses, even if the fever goes away.', 'If you stop too early, malaria can come back.'],
        ok: ['Headache, dizziness or tiredness.', 'Less appetite.'],
        alert: ['You vomit less than an hour after a dose: it may need to be taken again.', 'The fever is still there after 3 days.', 'Seizures, extreme weakness or trouble breathing: go to hospital immediately.'],
        avoid: ['Do not take it on an empty stomach: a meal or a glass of milk helps it work.']
      }
    },
    para: {
      fr: {
        for: 'la fièvre ou la douleur',
        use: ['Il fait baisser la fièvre et calme la douleur.'],
        how: ['Prenez-le seulement si vous avez de la fièvre ou mal.', 'Attendez au moins 6 heures entre deux prises.'],
        ok: ['Il est en général très bien supporté.'],
        alert: ['La fièvre dure plus de 3 jours.', 'Vous en avez pris plus que prévu : appelez la pharmacie, même si vous vous sentez bien.'],
        avoid: ["Ne prenez pas en même temps un autre médicament qui contient du paracétamol.", "Évitez l'alcool."]
      },
      en: {
        for: 'fever or pain',
        use: ['It lowers fever and eases pain.'],
        how: ['Only take it if you have a fever or pain.', 'Wait at least 6 hours between two doses.'],
        ok: ['It is usually very well tolerated.'],
        alert: ['The fever lasts more than 3 days.', 'You took more than planned: call the pharmacy, even if you feel fine.'],
        avoid: ['Do not take another medicine that also contains paracetamol.', 'Avoid alcohol.']
      }
    },
    ibu: {
      fr: {
        for: 'la douleur ou la fièvre',
        use: ["Il calme la douleur, la fièvre et l'inflammation."],
        how: ["Prenez-le pendant le repas, pour protéger l'estomac.", 'Le moins de jours possible.'],
        ok: ["Légers maux d'estomac."],
        alert: ['Selles noires ou vomissement de sang.', 'Visage qui gonfle ou mal à respirer.'],
        avoid: ['Pas pendant la grossesse sans avis médical.', 'Pas si vous avez un ulcère ou une maladie des reins.']
      },
      en: {
        for: 'pain or fever',
        use: ['It eases pain, fever and inflammation.'],
        how: ['Take it with food to protect your stomach.', 'For as few days as possible.'],
        ok: ['Mild stomach ache.'],
        alert: ['Black stools or vomiting blood.', 'Swollen face or trouble breathing.'],
        avoid: ['Not during pregnancy without medical advice.', 'Not if you have an ulcer or kidney disease.']
      }
    },
    amox: {
      fr: {
        for: "l'infection",
        use: ["C'est un antibiotique : il tue les bactéries qui causent l'infection."],
        how: ["Prenez-le jusqu'au dernier jour, même si vous allez mieux.", "Sinon, l'infection peut revenir et devenir plus difficile à soigner."],
        ok: ['Selles molles ou légers maux de ventre.'],
        alert: ["Boutons rouges, démangeaisons, visage qui gonfle ou mal à respirer : arrêtez et allez à l'hôpital tout de suite.", 'Diarrhée forte ou avec du sang.'],
        avoid: ["Ne le donnez à personne d'autre."]
      },
      en: {
        for: 'the infection',
        use: ['It is an antibiotic: it kills the bacteria causing the infection.'],
        how: ['Take it until the last day, even if you feel better.', 'Otherwise the infection can come back and be harder to treat.'],
        ok: ['Loose stools or mild stomach ache.'],
        alert: ['Red spots, itching, swollen face or trouble breathing: stop and go to hospital immediately.', 'Severe or bloody diarrhoea.'],
        avoid: ['Do not give it to anyone else.']
      }
    },
    fer: {
      fr: {
        for: "l'anémie",
        use: ["Il aide le corps à fabriquer du sang et lutte contre l'anémie (le manque de sang)."],
        how: ['Prenez-le tous les jours, à la même heure.', "L'effet se voit après quelques semaines."],
        ok: ["Selles noires : c'est normal.", 'Constipation ou légers maux de ventre.'],
        alert: ['Fortes douleurs au ventre ou vomissements.'],
        avoid: ["Ne le prenez pas avec du thé, du café ou du lait : ils l'empêchent d'agir.", 'Rangez-le hors de portée des enfants : trop de fer est dangereux pour eux.']
      },
      en: {
        for: 'anaemia',
        use: ['It helps your body make blood and fights anaemia (lack of blood).'],
        how: ['Take it every day at the same time.', 'The effect shows after a few weeks.'],
        ok: ['Black stools: this is normal.', 'Constipation or mild stomach ache.'],
        alert: ['Strong stomach pain or vomiting.'],
        avoid: ['Do not take it with tea, coffee or milk: they stop it from working.', 'Keep it away from children: too much iron is dangerous for them.']
      }
    },
    sro: {
      fr: {
        for: 'la diarrhée',
        use: ["Il remplace l'eau et les sels que le corps perd avec la diarrhée."],
        how: ["Versez le sachet dans 1 litre d'eau potable et buvez par petites gorgées.", 'Buvez-en après chaque selle liquide.', 'Jetez ce qui reste après 24 heures.'],
        ok: ["La diarrhée ne s'arrête pas tout de suite : c'est normal, le SRO empêche le corps de se dessécher."],
        alert: ["Pas d'urine depuis 6 heures, yeux creux ou grande faiblesse.", 'Sang dans les selles ou forte fièvre.', 'Impossible de boire, ou vomissements qui ne cessent pas.'],
        avoid: ["N'ajoutez ni sucre ni sel."]
      },
      en: {
        for: 'diarrhoea',
        use: ['It replaces the water and salts the body loses with diarrhoea.'],
        how: ['Mix the sachet in 1 litre of safe drinking water and sip slowly.', 'Drink some after each loose stool.', 'Throw away what is left after 24 hours.'],
        ok: ['The diarrhoea does not stop right away: this is normal, ORS keeps the body from drying out.'],
        alert: ['No urine for 6 hours, sunken eyes or great weakness.', 'Blood in the stools or high fever.', 'Unable to drink, or vomiting that does not stop.'],
        avoid: ['Do not add sugar or salt.']
      }
    },
    zinc: {
      fr: {
        for: 'la diarrhée de l’enfant',
        use: ["Il aide l'enfant à guérir plus vite de la diarrhée."],
        how: ['Donnez-le pendant les 10 jours, même si la diarrhée s’arrête.', "Le comprimé peut être dissous dans un peu d'eau ou de lait maternel."],
        ok: ['Parfois un petit vomissement juste après la prise.'],
        alert: ["L'enfant vomit tout, ne boit plus ou dort beaucoup trop : allez au centre de santé."],
        avoid: []
      },
      en: {
        for: "the child's diarrhoea",
        use: ['It helps the child recover faster from diarrhoea.'],
        how: ['Give it for all 10 days, even if the diarrhoea stops.', 'The tablet can be dissolved in a little water or breast milk.'],
        ok: ['Sometimes a little vomiting right after the dose.'],
        alert: ['The child vomits everything, stops drinking or is very sleepy: go to the health centre.'],
        avoid: []
      }
    },
    metf: {
      fr: {
        for: 'le diabète',
        use: ['Il aide à contrôler le sucre dans le sang.'],
        how: ['Prenez-le pendant le repas.', 'Continuez chaque jour, même si vous vous sentez bien : le diabète ne se sent pas toujours.'],
        ok: ['Nausées, ventre gonflé ou diarrhée les premières semaines. Cela passe souvent.'],
        alert: ["Fortes douleurs dans les muscles, respiration rapide ou grande fatigue : allez à l'hôpital."],
        avoid: ["Limitez l'alcool.", "N'arrêtez pas sans en parler à votre médecin."]
      },
      en: {
        for: 'diabetes',
        use: ['It helps control the sugar in your blood.'],
        how: ['Take it with food.', 'Keep taking it every day, even if you feel fine: you cannot always feel diabetes.'],
        ok: ['Nausea, bloating or diarrhoea in the first weeks. It often passes.'],
        alert: ['Strong muscle pain, fast breathing or great tiredness: go to hospital.'],
        avoid: ['Limit alcohol.', 'Do not stop without talking to your doctor.']
      }
    },
    amlo: {
      fr: {
        for: 'la tension',
        use: ['Il fait baisser la tension artérielle.'],
        how: ['Prenez-le chaque jour, à la même heure.', "N'arrêtez pas sans avis, même si vous vous sentez bien."],
        ok: ['Chevilles un peu gonflées, maux de tête ou visage chaud.'],
        alert: ['Forts vertiges ou malaise.', 'Douleur dans la poitrine.'],
        avoid: ['Levez-vous doucement si la tête vous tourne.']
      },
      en: {
        for: 'blood pressure',
        use: ['It lowers your blood pressure.'],
        how: ['Take it every day at the same time.', 'Do not stop without advice, even if you feel fine.'],
        ok: ['Slightly swollen ankles, headache or warm face.'],
        alert: ['Strong dizziness or fainting.', 'Chest pain.'],
        avoid: ['Stand up slowly if you feel dizzy.']
      }
    },
    ome: {
      fr: {
        for: "les brûlures d'estomac",
        use: ["Il diminue l'acidité de l'estomac et calme les brûlures."],
        how: ['Prenez-le le matin, avant de manger.', 'Avalez la gélule entière, sans la croquer.'],
        ok: ['Maux de tête ou ventre gonflé.'],
        alert: ['Difficulté à avaler, vomissement de sang ou selles noires.'],
        avoid: []
      },
      en: {
        for: 'heartburn',
        use: ['It reduces stomach acid and soothes heartburn.'],
        how: ['Take it in the morning, before eating.', 'Swallow the capsule whole, do not chew it.'],
        ok: ['Headache or bloating.'],
        alert: ['Trouble swallowing, vomiting blood or black stools.'],
        avoid: []
      }
    }
  };

  /* Fiche d'un médicament prescrit, dans la langue courante (null si masquée ou inconnue) */
  Dose.ficheFor = function (med) {
    if (med.fi === 0) return null;
    const item = Dose.catalogItem(med.k);
    const key = (item && item.fiche) || med.k;
    const f = Dose.FICHES[key];
    if (!f) return null;
    const loc = f[Dose.lang()] || f.fr;
    return Object.assign({}, loc, { for: med.fp || loc.for });
  };

  /* Ordonnance d'exemple : paludisme, commencée hier (on est au jour 2) */
  Dose.demo = function () {
    const fr = Dose.lang() !== 'en';
    return {
      v: 1,
      id: 'demo',
      p: { n: 'Afi', l: 'fon' },
      ph: { n: fr ? 'Pharmacie du Marché (exemple)' : 'Market Pharmacy (example)', t: '' },
      d: Dose.addDays(Dose.today(), -1),
      m: [
        { k: 'al', n: 'Artéméther-Luméfantrine', s: '20/120 mg', f: 'round', c: 'yellow', q: 4, t: ['morning', 'evening'], r: 'with', j: 3,
          note: fr ? 'Avec un repas ou un verre de lait.' : 'With a meal or a glass of milk.' },
        { k: 'fer', n: 'Fer + acide folique', s: '', f: 'round', c: 'red', q: 1, t: ['morning'], r: 'before', j: 30 },
        { k: 'para', n: 'Paracétamol', s: '500 mg', f: 'round', c: 'white', q: 2, t: [], r: 'any', j: 5, prn: true, max: 3,
          note: fr ? 'Si fièvre ou douleur. Attendez 6 heures entre deux prises.' : 'If fever or pain. Wait 6 hours between doses.' }
      ]
    };
  };
})();
