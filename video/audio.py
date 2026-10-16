"""Dose demo film soundtrack.

Music: "Driving Ambition" (Mixkit, free licence), started so that its lift
(37.66 s in the song) lands on the patient's phone (28.0 s in the film).
Sound effects are synthesised here and placed on the exact animation times.

usage: python3 video/audio.py <music.mp3> <out.wav>
Then loudness-normalise to -14 LUFS (see encode notes in video/README.md).
"""
import subprocess
import sys
import wave

import numpy as np

SR = 48000
T_END = 58.0
DROP = 28.0
SONG_LIFT = 37.66
BAR = 4 * 60 / 99.38


def bar(n):
    return DROP + n * BAR


def load_music(path):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-ss', f'{SONG_LIFT - DROP:.3f}', '-t', f'{T_END:.3f}', '-i', path,
                          '-f', 'f32le', '-ac', '2', '-ar', str(SR), '-'], capture_output=True, check=True).stdout
    x = np.frombuffer(raw, dtype=np.float32).reshape(-1, 2).copy()
    n = int(T_END * SR)
    if len(x) < n:
        x = np.vstack([x, np.zeros((n - len(x), 2), np.float32)])
    x = x[:n]
    t = np.arange(n) / SR
    env = np.clip(t / 0.4, 0, 1) * np.clip((T_END - t) / 3.0, 0, 1)
    return x * env[:, None]


rng = np.random.default_rng(7)  # deterministic noise


def env_exp(n, tau):
    return np.exp(-np.arange(n) / (tau * SR))


def click():
    n = int(0.05 * SR)
    s = np.sin(2 * np.pi * 1900 * np.arange(n) / SR) * env_exp(n, 0.008)
    s[:96] += rng.standard_normal(96) * 0.5 * np.linspace(1, 0, 96)
    return s


def pop():
    n = int(0.09 * SR)
    t = np.arange(n) / SR
    f = 420 + 700 * (t / t[-1])
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * env_exp(n, 0.025)


def tick():
    n = int(0.04 * SR)
    return np.sin(2 * np.pi * 2600 * np.arange(n) / SR) * env_exp(n, 0.006)


def chime():
    n = int(1.2 * SR)
    t = np.arange(n) / SR
    s = sum(a * np.sin(2 * np.pi * f * t) for f, a in ((880, 1), (1320, .5), (1760, .25)))
    return s * env_exp(n, 0.35) * np.clip(t / 0.004, 0, 1)


def whoosh(d=0.45):
    n = int(d * SR)
    w = rng.standard_normal(n)
    w = np.convolve(w, np.ones(24) / 24, mode='same') - np.convolve(w, np.ones(200) / 200, mode='same')
    e = np.sin(np.pi * np.arange(n) / n) ** 2
    return w * e * 3


def pen():
    n = int(0.09 * SR)
    w = rng.standard_normal(n)
    w = w - np.convolve(w, np.ones(8) / 8, mode='same')
    return w * np.sin(np.pi * np.arange(n) / n) * 0.6


def thump():
    n = int(0.3 * SR)
    t = np.arange(n) / SR
    return np.sin(2 * np.pi * (70 + 40 * np.exp(-t * 30)) * t) * env_exp(n, 0.09)


def place(track, sig, at, gain):
    """Place a sound so that its peak lands on `at` seconds."""
    peak = int(np.argmax(np.abs(sig)))
    start = int(at * SR) - peak
    if start < 0:
        sig, start = sig[-start:], 0
    end = min(len(track), start + len(sig))
    track[start:end] += (sig[:end - start] * gain)[:, None]


def main(music_path, out_path):
    x = load_music(music_path) * 0.85
    sfx = np.zeros_like(x)
    # hook and problem
    place(sfx, tick(), 3.95, 0.06)
    for i in range(5):
        place(sfx, tick(), 7.35 + i * 0.12, 0.04)
    # logo
    place(sfx, whoosh(0.6), 11.4, 0.08)
    place(sfx, thump(), 12.15, 0.25)
    place(sfx, chime(), 12.6, 0.07)
    # pharmacist
    for i, tt in enumerate([16.6, 17.45, 18.3]):
        place(sfx, click(), tt, 0.18)
        place(sfx, pop(), tt + 0.12, 0.08)
    place(sfx, click(), bar(-3) + 0.4, 0.18)
    place(sfx, click(), bar(-2) - 0.1, 0.18)
    place(sfx, whoosh(0.4), bar(-2) + 0.25, 0.06)
    place(sfx, chime(), bar(-2) + 0.7, 0.05)
    # QR becomes the phone
    place(sfx, whoosh(0.9), bar(-1) + 0.6, 0.08)
    # patient
    for i in range(4):
        place(sfx, pop(), DROP + 0.75 + i * BAR / 8 + 0.05, 0.12)
    place(sfx, click(), bar(2) + 0.6, 0.18)
    place(sfx, chime(), bar(2) + 0.7, 0.07)
    place(sfx, click(), bar(3) + 0.4, 0.16)
    place(sfx, whoosh(0.5), bar(4) + 0.4, 0.06)
    place(sfx, whoosh(0.4), bar(5) - 0.3, 0.05)
    for tt in (bar(5) + 0.45, bar(5) + 0.95, bar(5) + 1.45):
        place(sfx, click(), tt, 0.16)
    place(sfx, thump(), bar(5) + 1.5, 0.2)
    # paper
    place(sfx, whoosh(0.6), bar(6) + 0.3, 0.07)
    for i in range(13):
        place(sfx, pen(), bar(6) + 1.12 + i * BAR / 8, 0.05)
    # languages
    step = BAR * 0.375
    for i in range(5):
        place(sfx, tick(), bar(8) + 0.25 + i * step + 0.1, 0.05)
    # end
    place(sfx, whoosh(0.8), bar(10) + 0.4, 0.07)
    place(sfx, chime(), bar(10) + 1.0, 0.08)

    mix = x + sfx
    mix /= max(1.0, float(np.max(np.abs(mix))) / 0.95)
    with wave.open(out_path, 'wb') as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes((mix * 32767).astype('<i2').tobytes())


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
