# Dose: demo film

**[`dose-film.mp4`](dose-film.mp4)** · 1920 × 1080 · 30 fps · 58 s · H.264 + AAC · −14 LUFS

A motion design film made 100 % in code. It reuses Dose's real design system and the app's own SVG drawings (pills, time-of-day pictograms, meal sequences) from `assets/js/core.js`. No screen recording: every frame is computed, so the film is sharp and true to the product. Storyboard: [docs/VIDEO_SCRIPT.md](../docs/VIDEO_SCRIPT.md).

## How it is made

| File | Role |
|---|---|
| `film.html` | The film. Every frame is a pure function of time: `window.seek(t)` (springs, eased camera, masked text). Open it in a browser and press **Space** to preview, **←/→** to step one frame, **R** to restart. |
| `render.js` | Playwright renderer: contact sheets (`probe`) and PNG frames (`frames`) with 4 subframes per frame over a 180° shutter, for natural motion blur. |
| `audio.py` | Soundtrack: the music lift is aligned on the patient's phone (28 s); sound effects are synthesised and placed on the exact animation times. |
| `encode.sh` | Blends the subframes and encodes H.264 (BT.709, TV range) with AAC audio. |

```bash
python3 -m http.server 8765                                   # from the repository root
node video/render.js frames /tmp/frames 0 1740 4              # can be split into 3 parallel ranges
python3 video/audio.py music.mp3 mix_raw.wav                  # then loudnorm to -14 LUFS (two passes)
video/encode.sh /tmp/frames 4 mix.wav video/dose-film.mp4
```

## Credits

- Music: **“Driving Ambition”** by Ahjay Stelino, [Mixkit](https://mixkit.co/free-stock-music/), free under the Mixkit License.
- Sound effects: synthesised in `audio.py`.
- Typefaces: Atkinson Hyperlegible (Braille Institute) and Caveat, via Google Fonts.
- Figures on screen: UNESCO data via the World Bank (2022); Dowse & Ehlers, *Patient Education and Counseling* (2005). The prescription shown is an example.

## For Devpost

Devpost needs a video **link**: upload `dose-film.mp4` to YouTube (public or unlisted) and paste the link in the “Video demo link” field.
