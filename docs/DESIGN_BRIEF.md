# Dose: design brief

> **The prescription everyone can read.**
> Project for the HyperBloom October: UI/UX & Web Design hackathon (Devpost).

This is the brief written before building. The [case study](CASE_STUDY.md) tells the full story, with research and results.

---

## 1. The problem

A prescription is written **for the pharmacist, not for the patient**: handwriting, abbreviations (“1 tab x3/d w/ meals”), medical vocabulary, and almost always in French.

In Benin and across West Africa, many patients:
- do not read French fluently, or do not read at all;
- speak a local language first (Fon, Yoruba, Mina, Dendi, Baatonum…);
- get a quick spoken explanation at the counter, then forget it once they are home;
- own a basic phone or a smartphone, often with a patchy connection.

The consequences are wrong doses, missed doses, and treatments stopped too early. That last one is critical for antimalarials and antibiotics.

## 2. The solution in one sentence

When the medicine is dispensed, **the pharmacist turns the prescription into a visual, spoken calendar** that the patient receives on their phone, on paper, or both.

Dose does not replace the doctor or the prescription. It sits **at the pharmacy counter**, the moment when the explanation is given and then lost.

## 3. Users

| Who | Context | Core need |
|---|---|---|
| **Pharmacist / pharmacy assistant** | Busy counter, queue of patients | Fill it in **in under a minute**, with no account and no training |
| **Patient** | Limited reading, local language, any kind of phone | Know **what, when, how many, before or after eating** |
| **Caregiver** (child, relative) | Often the one with the smartphone who “reads the papers” | Follow a parent's doses and remind them |

### Proto-personas (hypotheses)

- **Mama Afi, 58, market trader in Cotonou.** Speaks Fon and reads very little French. Shares an Android phone with her daughter. She has malaria and takes 3 medicines, including an antimalarial at 4 tablets morning and evening.
- **Rodrigue, 34, pharmacy assistant near Cotonou.** Serves many customers a day and already writes doses on the boxes with a pen. No time to explain everything twice.
- **Esther, 22, student, Afi's daughter.** Reads the papers for her mother, but lives in another town.

## 4. Flows

### 4.1 Pharmacist: create a Dose prescription

1. Enter the patient's **first name** and choose the **language they speak**.
2. **Add the medicines.** Search pre-fills the form, colour and usual dosage. Frequent medicines take one tap.
3. For each medicine, set the **amount per dose**, the **times of day** (morning, midday, evening, night, or *only if needed* with a daily maximum), **meals**, **duration** and optional **advice**.
4. If the patient doesn't read the interface languages, record a **voice message of up to 30 s** in their language.
5. **Hand it over:** QR code, WhatsApp, SMS, or a **printed sheet**.

During the whole entry, a **live preview** shows exactly what the patient will see.

### 4.2 Patient: follow the treatment

The screen shows **today only**, split into 4 moments:

| Moment | Pictogram | Cue |
|---|---|---|
| Morning | rising sun | When you wake up, around 7 am |
| Midday | high sun | Around 12 pm |
| Evening | setting sun | Around 7 pm |
| Night | moon | At bedtime, around 10 pm |

For each dose, the patient sees:
- the **medicine drawn** with its real shape and colour;
- the **quantity drawn**: 4 tablets means 4 drawings, not the number “4”;
- a **meal sequence**: 💊 → 🍽️ for *before eating*, 🍽️ → 💊 for *after*;
- a big **“I took it”** button;
- a 🔊 button to **listen** to the instruction (text-to-speech) or to the **pharmacist's message**.

Special cases:
- **Missed dose:** “Take it as soon as you remember, unless it is almost time for the next one. Never take two doses at once.”
- **Only if needed** (paracetamol…): a counter that locks at the daily maximum.
- **End of treatment:** a message congratulates the patient. During the treatment, the interface reminds them not to stop early.
- **Questions:** a button calls the pharmacy directly.

### 4.3 Paper version

The same calendar, printed: time-of-day pictograms, medicine drawings, and **one tick box per dose and per day**. Essential for patients without a smartphone.

### 4.4 Medicine sheet: “What is this medicine for?”

Each prescribed medicine has a short sheet in plain language, in **5 blocks** with one pictogram each and **at most 3 items per block**:

| Block | Example (artemether-lumefantrine antimalarial) |
|---|---|
| 🎯 **What it is for** | “It kills the malaria parasite in your blood.” |
| ✅ **How to take it well** | “Take all 6 doses, even if the fever goes away. If you stop too early, malaria can come back.” |
| 🙂 **What may happen, harmlessly** | “Headache, dizziness or tiredness. Less appetite.” |
| 🚨 **When to come back** | “You vomit less than an hour after a dose, the fever is still there after 3 days.” |
| 🚫 **What to avoid** | “Don't take it on an empty stomach.” |

A 🔊 button reads the sheet aloud.

**Where it appears:**
- **Patient:** an “ⓘ What is this medicine for?” button under each dose opens the sheet. Today's screen stays simple (progressive disclosure).
- **Pharmacist:** the sheet is **pre-filled** from the catalogue. They can hide it, and the “For…” line is editable.
- **Paper:** a short version (🎯, ✅ and 🚨 blocks) on the back of the sheet.

**Content rules:**
1. **The pharmacist always validates the sheet.** One medicine can treat several conditions, so a generic sheet can be wrong for this patient, or reveal a diagnosis they prefer to keep private. The pharmacist can **edit, shorten or hide** it.
2. **Reassure without frightening.** Harmless effects are kept apart from warning signs, and the sheet never lists every side effect: a long list pushes people to stop their treatment.
3. **Traceable sources.** The prototype's sheets are based on package leaflets and WHO guidance, and are marked “indicative, to be validated by a pharmacist”.
4. **Plain writing:** short sentences, at most one technical word, always explained.

### 4.5 Caregiver (concept, not coded)

The caregiver receives the same link and sees the ticked doses. Presented in the case study as a next step.

## 5. Design decisions

| Topic | Decision | Why |
|---|---|---|
| **Deliverable** | Coded web prototype, deployed on GitHub Pages | More convincing than a static mock-up, and the jury can try it |
| **Data** | The prescription is **encoded in the link or QR code**. No server, no account | Privacy of health data, simplicity, works without a backend |
| **Voice message** | Recorded in the browser, **kept on the device** in the prototype | An audio file doesn't fit in a link. Online storage is on the roadmap |
| **Interface languages** | French, English, Spanish, Portuguese, Italian (one file per language) | International jury. If the patient speaks one of them, their screen opens in that language |
| **Local languages** | Kept (Fon, Yoruba, Mina, Dendi, Baatonum, Ajagbe) and carried by the **pharmacist's voice** | The heart of the project. Text-to-speech in Fon or Yoruba is not reliable, and a human voice is more reassuring |
| **Reminders** | Designed, not functional | They need a PWA or an SMS backend, out of scope for the hackathon |
| **Medicine sheet** | Pre-filled from the catalogue, **validated and editable by the pharmacist**, opened on demand by the patient | Understanding a treatment helps finish it, without crowding today's screen or exposing private information |
| **Complex dosing** | Handled with **written and spoken advice** | Keeps the interface simple for the large majority of cases |

## 6. Accessibility principles

- **Zero reading required** to understand a dose: pictograms, drawings, voice.
- **Never colour alone:** shape, count, text and icon always come with colour.
- **Atkinson Hyperlegible** typeface, designed for low-vision readers.
- **WCAG AA contrast or better** (AAA for main text).
- **Larger-text** mode, touch targets of **48 px minimum**.
- Full **keyboard** navigation and **screen reader** support (labels, `aria-live` confirmations).
- `prefers-reduced-motion` respected.
- **Lightweight pages**, nothing to install: built for slow connections.

## 7. Prototype scope

**Included:**
- Home page presenting the problem and the solution (before/after).
- Pharmacist view: form, live preview, voice message, hand-off by QR, link, WhatsApp, SMS or print.
- Patient view: today's screen, doses to tick, listening, missed dose, “only if needed”, end of treatment.
- Medicine sheets: read by the patient, pre-filled and editable by the pharmacist, short printed version.
- A catalogue of 11 common medicines with their sheets (antimalarial, paracetamol, amoxicillin, iron, ORS…).
- Printable sheet.
- Sample prescription for the jury (malaria: antimalarial, paracetamol, iron).

**Out of scope (roadmap):**
- Real reminders (notifications or SMS).
- Synchronised caregiver view.
- Online storage of voice messages.
- A full medicine database with real box photos.

## 8. Devpost deliverables

1. **Deployed prototype** and source code on GitHub.
2. **Case study:** problem, research, personas, flows, decisions, accessibility.
3. **Motion design demo film** (about 1 minute).
4. **Submission text** in English.

## 9. User research

**Choice for the hackathon: no interviews.** The design relies on published research (Dowse & Ehlers 2005, Katz et al. 2006, WHO 2003, UNESCO data). See [CASE_STUDY.md](CASE_STUDY.md), section 3. The guide below is ready for validation after the hackathon.

### Interview guide (for later)

Goal: **2 or 3 interviews of 15 minutes** to replace the persona hypotheses with real quotes.

**For a pharmacist:**
- How do you explain the dosage to a patient who cannot read?
- Which mistakes do you see most often?
- How much time can you spend with a patient at the counter?
- Do you already write anything on the boxes?

**For a patient or caregiver:**
- Last time you had several medicines, how did you know when to take them?
- Have you ever forgotten or mixed them up?
- Who helps you read medical papers?
- What phone do you use? Do you use WhatsApp?

**To be reviewed by a pharmacist:** 2 or 3 medicine sheets from the catalogue (accuracy, simplicity, reassuring tone).

**Quick test with the prototype:** show one dose screen **without any explanation** and ask: “What do you have to do, and when?”

---

*Hackathon prototype. Dose does not replace advice from a doctor or pharmacist.*
