# Dose

**L'ordonnance que tout le monde peut lire.**

Le pharmacien traduit l'ordonnance en un calendrier visuel et parlé que le patient reçoit sur son téléphone, sur papier, ou les deux.

Projet pour le hackathon [HyperBloom October : UI/UX & Web Design](https://www.hyperbloomhacks.com/).

🌐 **Démo en ligne :** https://andysags.github.io/Hyperbloom-October--UI-UX-and-Web-Design/ (après activation de GitHub Pages)

- 📄 [Document de cadrage](docs/CADRAGE.md) : problème, utilisateurs, parcours, décisions, périmètre.
- 🎨 [Guide de style](styleguide.html) : couleurs, typographie, dessins des médicaments, pictogrammes.
- 🏠 [Accueil](index.html) : le problème, l'avant/après, le fonctionnement et les principes.
- 🧑‍⚕️ [Vue pharmacien](pharmacien.html) : création de l'ordonnance, aperçu en direct, message vocal, QR code, WhatsApp et SMS.
- 💊 [Vue patient](patient.html) : sans lien, elle affiche une ordonnance d'exemple (paludisme). Ajouter `?h=19` à l'adresse simule 19 h, pratique pour la démo. Le bouton « Imprimer ma feuille papier » produit un calendrier A4 avec des cases à cocher et, au dos, les fiches médicament.

## Lancer en local

Aucune installation n'est nécessaire : c'est un site statique.

```bash
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

> Prototype de hackathon. Dose ne remplace pas l'avis d'un médecin ou d'un pharmacien.
