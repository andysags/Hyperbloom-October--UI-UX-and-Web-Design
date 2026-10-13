# Dose — Document de cadrage

> **L'ordonnance que tout le monde peut lire.**
> Projet pour le hackathon HyperBloom October : UI/UX & Web Design (Devpost).

---

## 1. Le problème

Une ordonnance est rédigée **pour le pharmacien, pas pour le patient** : écriture manuscrite, abréviations (« 1 cp x3/j pdt repas »), vocabulaire médical, et presque toujours en français.

Au Bénin et en Afrique de l'Ouest, une grande partie des patients :
- ne lit pas couramment le français, ou ne lit pas du tout ;
- parle d'abord une langue locale (fon, yoruba, mina, dendi, baatonum…) ;
- reçoit au comptoir une explication orale rapide, qu'il oublie une fois rentré ;
- a parfois un téléphone basique, parfois un smartphone, avec une connexion instable.

Conséquences : erreurs de dose, prises oubliées, traitements arrêtés trop tôt. Ce dernier point est critique pour les antipaludiques et les antibiotiques.

## 2. La solution en une phrase

Au moment de la délivrance, **le pharmacien traduit l'ordonnance en un calendrier visuel et parlé**, que le patient reçoit sur son téléphone, sur papier, ou les deux.

Dose ne remplace ni le médecin ni l'ordonnance. Il s'insère **au comptoir de la pharmacie**, le moment où l'explication est donnée puis perdue.

## 3. Les utilisateurs

| Acteur | Contexte | Besoin principal |
|---|---|---|
| **Pharmacien / vendeur en pharmacie** | Comptoir chargé, file d'attente | Saisir en **moins d'une minute**, sans compte ni formation |
| **Patient** | Lecture limitée, langue locale, téléphone variable | Savoir **quoi, quand, combien, avant ou après le repas** |
| **Aidant** (enfant, proche) | Souvent celui qui a le smartphone et « lit les papiers » | Suivre les prises d'un parent et le rappeler |

### Personas (hypothèses à valider par les entretiens)

**Mama Afi, 58 ans, vendeuse au marché Dantokpa (Cotonou).** Parle fon, lit très peu le français. Téléphone Android partagé avec sa fille. Elle a le paludisme : 3 médicaments, dont un antipaludique à 4 comprimés matin et soir. *« Le pharmacien m'a expliqué, mais à la maison je ne me souvenais plus si c'était avant ou après manger. »*

**Rodrigue, 34 ans, vendeur en pharmacie à Abomey-Calavi.** Il sert 80 à 120 clients par jour et écrit souvent la posologie au stylo sur les boîtes. *« Je n'ai pas le temps de tout réexpliquer deux fois. »*

**Esther, 22 ans, étudiante, fille de Mama Afi.** C'est elle qui lit les papiers pour sa mère. Elle vit à Abomey-Calavi, sa mère à Cotonou. *« J'aimerais savoir si maman a bien pris ses médicaments. »*

## 4. Parcours

### 4.1 Pharmacien : créer une ordonnance Dose

1. Il saisit le **prénom** du patient et choisit sa **langue parlée**.
2. Il **ajoute les médicaments**. La recherche préremplit la forme, la couleur et la posologie courante.
3. Pour chaque médicament, il règle la **quantité par prise**, les **moments** (matin, midi, soir, nuit, ou *si besoin* avec un maximum par jour), la **position par rapport au repas**, la **durée** et un **conseil** éventuel.
4. Si le patient ne lit pas le français, il enregistre un **message vocal de 30 s maximum** dans la langue du patient.
5. Il **remet** l'ordonnance : QR code à scanner, envoi WhatsApp ou SMS, ou **feuille imprimée**.

Pendant toute la saisie, un **aperçu en direct** montre exactement ce que verra le patient.

### 4.2 Patient : suivre son traitement

L'écran montre **uniquement aujourd'hui**, découpé en 4 moments :

| Moment | Pictogramme | Repère |
|---|---|---|
| Matin | ☀️ soleil levant | Au réveil, vers 7 h |
| Midi | ☀️ soleil haut | Vers 12 h |
| Soir | 🌇 soleil couchant | Vers 19 h |
| Nuit | 🌙 lune | Au coucher, vers 22 h |

Pour chaque prise, le patient voit :
- le **dessin du médicament**, avec sa forme et sa couleur réelles ;
- la **quantité dessinée** : 4 comprimés, c'est 4 dessins, et non le chiffre « 4 » ;
- une **séquence repas** : 💊 → 🍽️ pour *avant le repas*, 🍽️ → 💊 pour *après* ;
- un gros bouton **« J'ai pris »** ;
- un bouton 🔊 pour **écouter** la consigne (synthèse vocale) ou le **message du pharmacien**.

Cas particuliers :
- **Prise oubliée** : « Prenez-la dès que possible, sauf s'il est bientôt l'heure de la suivante. Ne doublez jamais la dose. »
- **Si besoin** (paracétamol…) : un compteur bloque à la dose maximale par jour.
- **Fin de traitement** : un message félicite le patient. Pendant le traitement, l'interface rappelle de ne pas arrêter avant la fin.
- **Question** : un bouton appelle directement la pharmacie.

### 4.3 Version papier

C'est le même calendrier, imprimé : pictogrammes des moments, dessins des médicaments, et **une case à cocher au stylo par prise et par jour**. Elle est indispensable pour les patients sans smartphone.

### 4.4 Aidant (concept, hors prototype codé)

L'aidant reçoit le même lien et voit les prises cochées. L'écran est présenté dans l'étude de cas comme une évolution prévue.

## 5. Décisions de conception

| Sujet | Décision | Pourquoi |
|---|---|---|
| **Format du rendu** | Prototype web codé et déployé (GitHub Pages) | Plus convaincant qu'une maquette statique et testable par le jury |
| **Données** | L'ordonnance est **encodée dans le lien ou le QR code**. Aucun serveur, aucun compte | Confidentialité des données de santé, simplicité, fonctionne sans backend |
| **Message vocal** | Enregistré dans le navigateur, **conservé sur l'appareil** dans le prototype | Un fichier audio ne tient pas dans un lien. Le stockage en ligne est prévu dans la feuille de route |
| **Langues de l'interface** | Français et anglais | Authenticité locale et lisibilité pour un jury anglophone |
| **Langues locales** | Portées par la **voix du pharmacien**, pas par la synthèse vocale | La synthèse en fon ou en yoruba n'est pas fiable. Une voix humaine rassure davantage |
| **Rappels** | Conçus et montrés (écran, SMS), non fonctionnels | Ils demandent une PWA ou un backend SMS, hors périmètre du hackathon |
| **Posologies complexes** | Gérées par un **conseil texte et vocal** | Garde l'interface simple pour 95 % des cas |

## 6. Principes d'accessibilité

- **Zéro lecture requise** pour comprendre une prise : pictogrammes, dessins, voix.
- **Rien ne repose sur la couleur seule** : forme, nombre, texte et icône accompagnent toujours la couleur.
- Police **Atkinson Hyperlegible**, conçue pour les personnes malvoyantes.
- Contrastes **WCAG AA minimum** (AAA visé pour le texte principal).
- Mode **texte agrandi**, cibles tactiles de **48 px minimum**.
- Navigation complète au **clavier** et compatibilité **lecteur d'écran** (libellés, `aria-live` pour les confirmations).
- Respect de `prefers-reduced-motion`.
- **Page légère**, sans installation : pensée pour les connexions lentes.

## 7. Périmètre du prototype

**Inclus :**
- Page d'accueil qui présente le problème et la solution (avant/après).
- Vue pharmacien : formulaire, aperçu en direct, message vocal, remise par QR, lien, WhatsApp, SMS ou impression.
- Vue patient : écran du jour, prises à cocher, écoute, oubli, « si besoin », fin de traitement.
- Feuille imprimable.
- Ordonnance d'exemple pour le jury (paludisme : antipaludique, paracétamol, fer).

**Hors périmètre (feuille de route) :**
- Rappels réels (notifications ou SMS).
- Vue aidant synchronisée.
- Stockage en ligne des messages vocaux.
- Base de médicaments complète, avec images réelles des boîtes.

## 8. Livrables Devpost

1. **Prototype déployé** et code source sur GitHub.
2. **Étude de cas** : problème, recherche, personas, parcours, décisions, accessibilité.
3. **Vidéo de démo de 2 minutes** : le problème (20 s), la démo (90 s), l'impact (10 s).
4. **Texte de soumission** en anglais.

## 9. Recherche utilisateur à mener (avant le rendu)

Objectif : **2 ou 3 entretiens de 15 minutes**, pour obtenir des citations réelles qui remplaceront les hypothèses des personas.

**Questions pour un pharmacien :**
- Comment expliquez-vous la posologie à un patient qui ne lit pas ?
- Quelles erreurs revoyez-vous le plus souvent ?
- Combien de temps pouvez-vous consacrer à un patient au comptoir ?
- Écrivez-vous déjà quelque chose sur les boîtes ?

**Questions pour un patient ou un aidant :**
- La dernière fois que vous avez eu plusieurs médicaments, comment avez-vous su quand les prendre ?
- Vous est-il déjà arrivé d'oublier ou de vous tromper ?
- Qui vous aide à lire les papiers médicaux ?
- Quel téléphone avez-vous ? Utilisez-vous WhatsApp ?

**Test rapide à faire avec la maquette :** montrer l'écran d'une prise **sans rien expliquer** et demander : « Que devez-vous faire, et quand ? »

---

*Prototype de hackathon. Dose ne remplace pas l'avis d'un médecin ou d'un pharmacien.*
