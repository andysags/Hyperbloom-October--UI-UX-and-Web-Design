# Dose

**The prescription everyone can read.**

When a medicine is dispensed, the pharmacist turns the prescription into a visual, spoken calendar that the patient receives on their phone, on paper, or both. Drawn pills you can count, sun and moon for the time of day, picture order for “before / after eating”, and the pharmacist's own voice in the patient's language.

Built for the [HyperBloom October: UI/UX & Web Design](https://www.hyperbloomhacks.com/) hackathon.

🌐 **Live prototype:** https://andysags.github.io/Hyperbloom-October--UI-UX-and-Web-Design/

![Dose home page](docs/gallery/01-home.png)

## Try it

| Page | What it shows |
|---|---|
| [Home](https://andysags.github.io/Hyperbloom-October--UI-UX-and-Web-Design/?lang=en) | The problem, a before/after, how it works, design principles |
| [Pharmacist view](https://andysags.github.io/Hyperbloom-October--UI-UX-and-Web-Design/pharmacist.html?lang=en) | Create a prescription: one-tap frequent medicines, live patient preview, voice message, QR code, WhatsApp, SMS, print. Tip: click **Fill with an example** |
| [Patient view](https://andysags.github.io/Hyperbloom-October--UI-UX-and-Web-Design/patient.html?lang=en&h=19) | Today's doses, “I took it”, missed dose guidance, “only if needed” limit, medicine sheets, read aloud, paper sheet |
| [Style guide](https://andysags.github.io/Hyperbloom-October--UI-UX-and-Web-Design/styleguide.html?lang=en) | Colours with live contrast ratios, typography, pill drawings, pictograms |

URL options: `?lang=fr|en|es|pt|it` sets the language, `?h=19` simulates 7 pm on the patient view, `?print` opens the paper sheet.

## Documentation

- 🎬 [Demo film](video/) · [storyboard](docs/VIDEO_SCRIPT.md)
- 📘 [Case study](docs/CASE_STUDY.md): problem, research, decisions, accessibility, iterations, limits
- 🧭 [Design brief](docs/DESIGN_BRIEF.md): users, flows, scope, decisions
- ✍️ [Devpost submission text](docs/DEVPOST.md)
- 🖼️ [Gallery](docs/gallery/)

## Languages

The interface speaks **French, English, Spanish, Portuguese and Italian**, including text-to-speech, medicine sheets and catalogue medicine names. It follows the browser language by default. Benin's local languages (Fon, Yoruba, Mina, Dendi…) are carried by the pharmacist's recorded voice message. To add a language, add one file: `assets/js/lang-xx.js`.

## Accessibility

Atkinson Hyperlegible typeface · WCAG AA contrast or better · never colour alone · 48 px touch targets · larger-text mode · keyboard and screen reader support · `prefers-reduced-motion` · lightweight pages · paper version.

## Run locally

No build step, no dependencies: it is a static site.

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Project structure

```
index.html          Home page
pharmacist.html     Pharmacist view
patient.html        Patient view (+ printable sheet)
styleguide.html     Style guide
assets/css/         Design system
assets/js/          Core, catalogue, views, translations (lang-*.js)
docs/               Case study, design brief, Devpost text, storyboard, gallery
video/              Demo film
```

## Privacy

No account and no server: the prescription is encoded inside the link (JSON → base64url). In this prototype, voice messages stay on the device that recorded them.

> Hackathon prototype. Dose does not replace advice from a doctor or pharmacist. Medical content is indicative and must be validated by a pharmacist.
