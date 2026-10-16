/* =========================================================
   Dose demo film renderer (Playwright + ffmpeg)

   Serve the repository root first:   python3 -m http.server 8765
   Then:
     node video/render.js probe <out.png> <t1> <t2> ...     contact sheet of single frames
     node video/render.js frames <dir> <from> <to> [sub]     PNG frames [from, to) at 30 fps,
                                                              `sub` subframes per frame (motion blur)
   Encode with video/encode.sh.
   ========================================================= */
const { chromium } = require(process.env.PLAYWRIGHT || 'playwright');
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const URL = process.env.FILM_URL || 'http://localhost:8765/video/film.html';
const FPS = 30;
const SHUTTER = 0.5; /* 180° shutter: subframes spread over half a frame */

async function open() {
  const browser = await chromium.launch({
    args: ['--font-render-hinting=none', '--force-color-profile=srgb', '--disable-threaded-animation']
  });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  page.on('pageerror', (e) => console.error('pageerror:', e.message));
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.ready === true, null, { timeout: 60000 });
  return { browser, page, stage: await page.$('#stage') };
}

async function shot(page, stage, t, file) {
  await page.evaluate((x) => window.seek(x), t);
  await stage.screenshot({ path: file });
}

(async () => {
  const [mode, out, ...rest] = process.argv.slice(2);
  const { browser, page, stage } = await open();
  if (mode === 'probe') {
    const dir = fs.mkdtempSync(path.join(path.dirname(out), 'probe-'));
    for (let i = 0; i < rest.length; i++) await shot(page, stage, Number(rest[i]), path.join(dir, `${String(i).padStart(3, '0')}.png`));
    const cols = Math.min(3, rest.length), rows = Math.ceil(rest.length / cols);
    execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', path.join(dir, '%03d.png'),
      '-vf', `scale=640:-1,tile=${cols}x${rows}:padding=6:color=white`, '-frames:v', '1', out]);
    fs.rmSync(dir, { recursive: true });
  } else if (mode === 'frames') {
    const [from, to, subArg] = rest.map(Number);
    const sub = subArg || 1;
    fs.mkdirSync(out, { recursive: true });
    for (let f = from; f < to; f++) {
      for (let s = 0; s < sub; s++) {
        const t = (f + (sub === 1 ? 0 : (s / sub - 0.5) * SHUTTER)) / FPS;
        await shot(page, stage, Math.max(0, t), path.join(out, `${String(f * sub + s).padStart(6, '0')}.png`));
      }
      if (f % 60 === 0) console.log(`frame ${f}`);
    }
  }
  await browser.close();
})();
