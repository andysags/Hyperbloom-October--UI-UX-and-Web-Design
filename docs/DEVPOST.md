# Devpost submission: ready to paste

> Copy each section into the matching Devpost field. Everything is ready to paste as is.

---

## Project name
**Dose: the prescription everyone can read**

## Elevator pitch (max 200 characters)
Dose turns a prescription into a visual, spoken calendar for patients who can't read it: drawn pills, sun and moon for time of day, and the pharmacist's own voice.

## Try it out
- Live prototype: https://andysags.github.io/Hyperbloom-October--UI-UX-and-Web-Design/
- Patient example: https://andysags.github.io/Hyperbloom-October--UI-UX-and-Web-Design/patient.html?lang=en
- Pharmacist view: https://andysags.github.io/Hyperbloom-October--UI-UX-and-Web-Design/pharmacist.html?lang=en
- Code: https://github.com/andysags/Hyperbloom-October--UI-UX-and-Web-Design

## Video demo
Upload `video/dose-film.mp4` to YouTube (public or unlisted) and paste the YouTube link in the “Video demo link” field.

## Image gallery (in this order)
`docs/gallery/01-home.png` · `02-patient.png` · `03-pharmacist.png` · `04-handoff.png` · `05-paper.png` · `06-languages.png`

---

## Inspiration
In Benin, a prescription is handwritten, full of abbreviations (“4 tab x2/d w/ meals x3d”) and almost always in French, while many patients first speak Fon, Yoruba or Mina and read little. The pharmacist explains the treatment at the counter, and the patient forgets it on the way home. The result is wrong doses, missed doses, and antimalarials or antibiotics stopped too early.

We wanted to design for the people most health apps forget: those who can't read the instructions at all.

## What it does
**For the pharmacist:** in under a minute, they turn a prescription into a Dose plan. Frequent medicines take one tap. Catalogue medicines arrive pre-filled and collapsed with a one-line summary. A live preview shows exactly what the patient will see. They can record a **30-second voice message in the patient's own language**, then hand it over by **QR code, WhatsApp, SMS or a printed sheet**.

**For the patient:** only today, in four moments: rising sun, high sun, setting sun, moon. Each dose shows:
- the **real pill, drawn, as many times as there are pills to take** (4 tablets = 4 drawings);
- a **picture sequence** for meals (💊 → 🍽️ = before eating);
- one big **“I took it”** button.

Dose also handles **missed doses** safely, **locks “only if needed” medicines at the daily maximum**, reads everything aloud, and explains **“What is this medicine for?”** in five short blocks: harmless effects are kept apart from warning signs.

**On paper:** a tick-box calendar on the front, short medicine sheets on the back, for patients without a smartphone.

**Private by design:** no account and no server. The prescription lives inside the link.

## How we built it
We started from the moment that fails, the pharmacy counter. We grounded the design in published research on pictograms and medication instructions (Dowse & Ehlers 2005: understanding rose from 70 % to 95 % with pictograms; Katz et al. 2006: clock icons confuse patients). Then we wrote a design brief with proto-personas, flows and design principles. Then we built the visual foundations: Atkinson Hyperlegible, a warm high-contrast palette, drawn pills and time-of-day pictograms. After that came the patient view, the pharmacist view with its live preview, the printable sheet and the landing page.

It is plain **HTML, CSS and JavaScript**, with no framework and no build step:
- **Web Speech API** for reading aloud in 5 languages;
- **MediaRecorder** for the pharmacist's voice message;
- the native `<dialog>` element for the medicine sheet;
- **print CSS** for the A4 calendar;
- the prescription encoded in the URL (JSON → base64url), and *qrcode-generator* for the QR code.

It is hosted on **GitHub Pages**. Every screen was checked in a headless browser at phone and desktop sizes, with an automated check that all translations are complete.

## Challenges we ran into
- **Saying “before eating” without words.** We tried icons and badges. What worked was the *order* of two pictures: pill → plate.
- **Telling morning from evening without relying on colour.** Each sun pictogram uses three cues: arrow direction, colour and background.
- **Local languages.** Text-to-speech doesn't speak Fon. So the pharmacist's own recorded voice carries the local language, which is also more trustworthy.
- **Medical content.** It had to be useful without being frightening: three items per block, harmless effects kept apart from warning signs, and the pharmacist can edit or hide every sheet.
- **A long form for a busy counter.** Collapsed, pre-filled medicine cards with a one-line summary.

## Accomplishments that we're proud of
- A patient can understand a dose **without reading a word**.
- A complete loop, **pharmacist → patient → paper**, that works today from a single link.
- **Accessibility as the concept, not a checklist:** WCAG AA contrast or better, 48 px targets, a larger-text mode, keyboard and screen reader support, reduced motion, and never colour alone.
- **Five interface languages** (FR, EN, ES, PT, IT). The patient's screen opens in their language, and local languages are carried by the pharmacist's voice.

## What we learned
- Designing for low literacy means designing **for everyone**: the drawn quantities and picture sequences are faster for fluent readers too.
- **Paper is not a fallback.** For many patients, it is the main channel.
- Privacy can be a design choice: putting the data in the link removed the need for accounts entirely.
- Research done before us saved us from a mistake: clock icons confuse patients (Katz et al., 2006), so we used the sun and the moon instead.

## What's next for Dose
1. Testing in real pharmacies in Cotonou with the 5-second test (“What do you have to do, and when?”).
2. SMS reminders that work on basic phones, and an installable PWA.
3. A synchronised caregiver view for relatives.
4. Secure, short-lived storage for voice messages.
5. A pharmacist-validated catalogue with real box photos.

## Built with
`html5` · `css3` · `javascript` · `web-speech-api` · `mediarecorder` · `qrcode-generator` · `github-pages` · `atkinson-hyperlegible` · `playwright`

---

*Prototype. Dose does not replace advice from a doctor or pharmacist. Medical content is indicative and must be validated by a pharmacist.*
