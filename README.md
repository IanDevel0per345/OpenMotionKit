<div align="center">

# 🎬 OpenMotionKit

### Create videos using our system.

**Real, ad-ready motion graphics — written, voiced, animated and rendered by an AI agent. Open source.**

Tell your agent *"make a motion for brand X"* and OpenMotionKit takes it from there: it researches the brand, writes the script, generates a female voice-over, syncs every animation to every spoken word, moves a smooth camera across each element, adds a sound to every action and renders the final video at **120 fps** — in two versions, clean and watermarked.

<br/>

![Remotion](https://img.shields.io/badge/Remotion-4.0-5B4BFF?style=for-the-badge)
![120 fps](https://img.shields.io/badge/120-fps-111111?style=for-the-badge)
![9:16 and 16:9](https://img.shields.io/badge/9%3A16%20%7C%2016%3A9-formats-0EA5A4?style=for-the-badge)
![Voice](https://img.shields.io/badge/voice-Gemini%20TTS%20(EN%20%7C%20PT)-E4572E?style=for-the-badge)
![License GPL v3](https://img.shields.io/badge/license-GPL%20v3.0-2EA44F?style=for-the-badge)

<br/>

<table>
  <tr>
    <td align="center"><img src="media/openmotionkit-demo.gif" width="250" alt="OpenMotionKit demo (9:16)"/><br/><b>OpenMotionKit</b><br/><sub>9:16 · indigo · 46 s</sub></td>
    <td align="center"><img src="media/cafe-demo.gif" width="250" alt="Nuvem Café demo (9:16)"/><br/><b>Nuvem Café</b><br/><sub>9:16 · terracotta · 45 s</sub></td>
  </tr>
</table>
<img src="media/tarefa-demo.gif" width="560" alt="Tarefa+ demo (16:9)"/><br/><b>Tarefa+</b> <sub>· 16:9 · teal · 48 s</sub>

<sub>All three videos were made 100% with the skill. <i>Nuvem Café</i> and <i>Tarefa+</i> are fictional brands. Full-quality 120 fps files are in <a href="media/">media/</a>. 🇧🇷 <a href="README.pt-BR.md">Leia em português</a></sub>

</div>

---

## 📚 Table of contents

1. [What is OpenMotionKit?](#-what-is-openmotionkit)
2. [Why it exists](#-why-it-exists)
3. [The look, in one sentence](#-the-look-in-one-sentence)
4. [Features](#-features)
5. [Demos](#-demos)
6. [Quick start](#-quick-start)
7. [Using it with an AI agent](#-using-it-with-an-ai-agent)
8. [Example prompts](#-example-prompts)
9. [How a video is made](#-how-a-video-is-made)
10. [The style system](#-the-style-system)
11. [The camera](#-the-camera)
12. [Sound design](#-sound-design)
13. [Voice-over (English & Portuguese)](#-voice-over-english--portuguese)
14. [The watermark](#-the-watermark)
15. [Scene recipes](#-scene-recipes)
16. [Components API](#-components-api)
17. [Project structure](#-project-structure)
18. [Commands](#-commands)
19. [Requirements](#-requirements)
20. [Golden rules](#-golden-rules)
21. [Troubleshooting](#-troubleshooting)
22. [FAQ](#-faq)
23. [Roadmap](#-roadmap)
24. [Contributing](#-contributing)
25. [Licenses & credits](#-licenses--credits)

---

## ✨ What is OpenMotionKit?

OpenMotionKit is an **AI skill** plus a **production-ready Remotion project** that together turn one sentence into a finished motion-graphics ad.

- The **skill** ([`skills/openmotionkit/SKILL.md`](skills/openmotionkit/SKILL.md), ~5,500 lines) teaches an agent *everything*: installation, the visual rules, the exact easing curves and timings of every animation, how the camera moves, which sound plays on which action, how to write the script, how to generate and align the voice, how to review frames and how to render and deliver. It also contains the **complete source code** of the engine and of every demo.
- The **template** ([`template/`](template/)) is the same engine as a ready-to-run project: open it, run two commands and you are looking at a 120 fps video in Remotion Studio.
- The **examples** ([`examples/`](examples/)) are the source, script and voice direction of the three demos above.

It is not a generic "AI video" generator. It produces **one specific, recognizable, polished style** — the kind of clean motion ad you see from good studios on Instagram and TikTok — and it produces it **consistently**, video after video.

---

## 💡 Why it exists

AI can write code, but ask it for "a motion graphics video" and you usually get something generic: random fonts, random easing, cluttered layouts, no rhythm, no sound design.

OpenMotionKit fixes that by turning taste into **rules and code**:

| Problem | OpenMotionKit's answer |
|---|---|
| Every video looks different | One locked style engine (`lib.tsx`) — the agent composes, it never re-invents |
| Animations feel robotic | Hand-tuned curves (`outExpo`, `outBack`, `outQuint`, `inOut`) and timings in **seconds** |
| Text doesn't match the voice | Every element is anchored to the exact moment its word is spoken (`w(i)`) |
| The screen feels static | A camera that glides to each element as it appears — slowly, so viewers understand |
| Cheap-looking extras | Background circles, glows and random decorations are **forbidden** |
| Silent or noisy videos | One sound per meaningful action — no ticking on every word |
| Choppy playback | Rendered at **120 fps** |
| Videos get stolen | A transparent, moving **mosaic watermark** that's very hard to remove |

---

## 🎨 The look, in one sentence

> **White + one brand color, centered Outfit type, words fading in from blur and the key word big with bouncing letters, hand-drawn strokes, outlined UI tapped by a little hand with a ripple, a calm camera visiting every element, zoom and whip transitions, a sound for every action and a calm female voice — 120 fps, 45–60 s, two versions.**

---

## 🚀 Features

### Visual
- 🤍 **White background + exactly one brand color**, pulled from the brand's own website CSS.
- 🔤 **Outfit** typeface, small and centered; context words in light gray, strong words in black.
- 🌫️ **Words fade in from blur**, one by one, perfectly in sync with the voice.
- 🦘 **Emphasis = the key word, BIG**, with letters dropping in, spinning and settling (`outBack`).
- ✍️ **Hand-drawn strokes**: underlines, strike-throughs, arrows, paths and charts that draw themselves.
- 📱 **Outlined UI**: phones, toggles, checklists, chat bubbles, counters, dashboards, terminals.
- 👆 **A little hand** that travels, taps (squeezes) and releases a ripple on buttons and toggles.
- 🧩 **Rounded icon tiles** with a consistent 6 px stroke icon language.

### Motion
- 🎥 **Focus camera**: pans, dollies, tilts in 3D and rolls slightly toward each element as it animates.
- 🫧 **Hand-held feel**: subtle sinusoidal sway and zoom "breathing", plus motion blur on fast moves.
- 🐢 **Always smooth**: camera keys closer than 1.2 s are ignored by the engine.
- 🌀 **Transitions**: zoom-through, whip left/right, shrink, pop, rise — never a hard cut.
- ⏱️ **Seconds, not frames**: identical speed at 30, 60 or 120 fps.

### Audio
- 🔊 **21 sound effects** (pop, click, toggle, whoosh, swish, scribble, notify, reveal, sparkle…), **generated locally by code**: no downloads, no licensing headaches.
- 🎵 **Music bed with ducking**: 0.16 between phrases, 0.07 under the voice, 2.5 s fade-out.
- 🎙️ **Gemini TTS female voice** in **English or Portuguese**, aligned word by word with **faster-whisper**.
- 📏 **−14 LUFS master** with a limiter, ready for social platforms.

### Delivery
- 🎞️ **120 fps**, H.264 CRF 18, AAC 320k.
- 📐 **9:16 (1080×1920)** or **16:9 (1920×1080)** from the same engine.
- 🖼️ **Two versions**: clean + **mosaic watermark**.
- 🧪 **Review sheet**: 20–24 frames rendered into one image so the agent can *look* before it renders.

---

## 🎞️ Demos

| Demo | Format | Color | What it shows |
|---|---|---|---|
| **OpenMotionKit** | 9:16 · 46 s | indigo `#5B4BFF` | a prompt being typed, brand reveal, checklist, steps joined by a drawn path, phone with three toggles tapped by the hand, 120 fps counter with format frames, terminal + install button, sign-off |
| **Nuvem Café** *(fictional)* | 9:16 · 45 s | terracotta `#E4572E` | a queue crossed out by hand, 2×2 menu, checklist + pay button, live order status on a phone, 15-minute counter, loyalty card, sign-off |
| **Tarefa+** *(fictional)* | 16:9 · 48 s | teal `#0EA5A4` | scattered apps, "new task" window with typing and a hand tap, kanban board with a traveling card, bar-chart dashboard + reminder, laptop + phone sync, team checks, sign-off |

Videos: [`media/openmotionkit-demo.mp4`](media/openmotionkit-demo.mp4) · [`media/cafe-demo.mp4`](media/cafe-demo.mp4) · [`media/tarefa-demo.mp4`](media/tarefa-demo.mp4)

> The demos in this repo were rendered **without voice** (estimated timings and a silent voice track) so anyone can reproduce them without an API key. With a Gemini key, `npm run voice` adds the real voice and every scene re-times itself automatically.

---

## ⚡ Quick start

```bash
git clone https://github.com/IanDevel0per345/OpenMotionKit.git
cd openmotionkit/template
npm install
npm run setup          # generates the 21 sound effects + music bed + test timings
npx remotion studio    # opens the editor with the OpenMotionKit demo
```

Render it:

```bash
npm run timings                   # no API key: estimated timings + silent voice (preview)
# or, with GEMINI_API_KEY set:
npm run voice                     # Portuguese voice
ALIGN_LANG=en npm run voice       # English voice (set "profile" in voice.json — see below)

sh scripts/render.sh my-brand     # → out/my-brand-limpa.mp4 + out/my-brand-marca-dagua.mp4
```

> 🔑 The Gemini key lives **only** in the `GEMINI_API_KEY` environment variable or in a `.env` file (already in `.gitignore`). Never commit it.

---

## 🤖 Using it with an AI agent

### Install with npx (easiest)
```bash
npx openmotionkit
```
This installs the skill to `~/.claude/skills/openmotionkit`. For a project-local install instead:
```bash
npx openmotionkit --project
```

### Claude Code
```bash
mkdir -p ~/.claude/skills/openmotionkit
cp skills/openmotionkit/SKILL.md ~/.claude/skills/openmotionkit/
```
Then just ask:
> *"Create a motion for brand X, in its colors, 9:16, in English."*

The skill triggers automatically on requests like "motion", "motion graphics", "animated ad" or "animated video".

### Any other agent (Cursor, Codex, Gemini CLI, custom agents…)
Attach [`skills/openmotionkit/SKILL.md`](skills/openmotionkit/SKILL.md) and say:
> *"Read this whole file before doing anything. Then follow PART 13 step by step to create a motion for …"*

The agent needs a **terminal** with Node, ffmpeg and Python to render. Chat-only assistants can write the code but cannot produce the video file.

---

## 💬 Example prompts

```text
Create a 9:16 motion for https://example.com in the brand colors, in English, with voice.
```
```text
Make a 16:9 black-and-white motion for my SaaS (link). 50 seconds. Show the dashboard and the pricing.
```
```text
Motion for a coffee shop: queue, menu, ordering in the app, delivery time, loyalty card. Terracotta and white.
```
```text
Same style, but in Portuguese, with the voice "Leda", and only facts from the official site.
```
```text
Just remember this for future motions: the camera must be even slower.
```

---

## 🧩 How a video is made

```
 request ─► research (official site: facts, brand color from CSS, official logo)
    └─► script (85–110 words: hook question → brand → 3–5 features → benefit/price → sign-off)
          └─► voice (Gemini TTS) ─► alignment (faster-whisper) ─► pauses between sentences
                └─► scenes (one sentence = one scene, anchored to word times w(i))
                      └─► review sheet (20–24 frames in one image) ─► fixes
                            └─► render 120 fps (clean + watermark) ─► −14 LUFS master ─► delivery
```

Every animation is scheduled against the voice:

```tsx
const w = (i: number) => words[i]!.start;          // when word i is spoken
const B = [0, w(10), w(14), w(25), /* … */];        // each scene starts on the first word of a sentence

<Words t={t} size={62} color={MUTE} items={[{ w: "You", at: w(14), color: INK, weight: 800 }]} />
<Letters t={t} text="send:" at={w(15)} size={124} color={AC} weight={800} />
```

Change the voice → the timings change → **every scene re-times itself**. Nothing is hard-coded to frames.

---

## 🎨 The style system

[`template/src/lib.tsx`](template/src/lib.tsx) **is** the style. It holds every curve, duration, blur amount and transition. Agents are told never to edit its numbers — only to compose its components.

| Element | Rule |
|---|---|
| Background | white, dominant; 2–3 full-color scenes per video as punctuation (brand reveal, price, a hero feature) |
| Color | exactly **one** accent: the brand color from its own CSS |
| Type | Outfit 500–800; context 52–74 px gray; **emphasis 96–150 px in the brand color** |
| Layout | centered, 110–140 px side margins (9:16); two columns in 16:9 |
| Icons | 100×100 viewBox, 6 px rounded strokes, inside tiles with 24 % corner radius |
| Pill (word inside a capsule) | **at most once per video** — usually never |
| Forbidden | background circles/rings, glows/blobs, floating decorations, condensed poster fonts, fake facts, redrawn logos |

---

## 🎥 The camera

Each scene takes a list of camera keys:

```tsx
cam={[
  F(SC(2)[0], 540, 640, 1.26, -1),          // open close to the title, slight roll
  F(w(18) - 0.2, 540, 860, 1.26, 0, 3),     // glide to the item just before it pops, small 3D tilt
  F(w(22) - 0.2, 540, 1240, 1.26, 1, 0, -3),// next item, opposite tilt
  F(SC(2)[1], 540, 1000, 1.04),             // pull back to show everything
]}
```

`F(time, x, y, zoom, roll°, tiltX°, tiltY°)`. On top of the keys the engine adds hand-held sway (±4 px / ±3 px / ±0.2°), zoom breathing (±1.2 %), and speed-based motion blur (max 3 px).

**Rules**: ≥ 1.2 s between keys (closer keys are dropped), zoom 1.0–1.3, roll ≤ 3°, tilt ≤ 8°. The camera always moves — and always slowly.

---

## 🔊 Sound design

| Action | Sound | Volume |
|---|---|---|
| Scene change (before / at the cut) | `whoosh` or `zoom` / `swoosh` | 0.30 / 0.16 |
| Icon, card or number pops | `pop` | 0.20–0.30 |
| Card or phone slides in | `swish` | 0.20–0.26 |
| Hand taps | `click` | 0.34 |
| Toggle turns on | `toggle` | 0.24 |
| Stroke draws | `scribble` | 0.22–0.28 |
| Chat bubble | `message` | 0.30 |
| Success / counter lands | `notify` | 0.26–0.30 |
| Logo reveal | `reveal` + `sparkle` | 0.34 + 0.22 |
| Before a big word (max 3–4 per video) | `zoomin` | 0.18 |
| Final hit | `stamp` | 0.20 |

❌ No tick on every word. ❌ No bursts of ticks on counters (one tick + one landing sound).

All 21 sounds and the 60 s music bed are produced by [`template/scripts/gerar_sons.py`](template/scripts/gerar_sons.py) — pure Python + ffmpeg, deterministic, license-free. Swap any file for a library sound with the same name if you like.

---

## 🎙️ Voice-over (English & Portuguese)

`voice/src/data/voice.json`:

```json
{
  "model": "gemini-3.8-flash-tts",
  "voice": "Despina",
  "profile": "American female voice-over artist, early thirties.",
  "style": "American English, natural accent. A woman in her early thirties, smooth, warm and elegant voice, confident and friendly, not a radio announcer. CALM, unhurried pace with clear pauses between sentences. Do not read these instructions; read only the transcript."
}
```

Pipeline (`npm run voice`):
1. **Gemini TTS** generates the whole narration in one request (retries if it reads the instructions aloud).
2. **faster-whisper** (`small`, CPU) finds the real time of every word and matches it to the script.
3. **0.6 s pauses** are inserted between sentences and all timings are shifted.

Voices used so far: **Despina** (elegant, premium), **Leda** (young, upbeat), **Kore** (firm, trustworthy), **Sulafat** (warm), **Zephyr** (bright, tech).

---

## 🛡️ The watermark

The watermarked version doesn't use a giant logo in the middle. It uses a **mosaic**: dozens of small `◆ Your Studio` labels, **very transparent** (`rgba(128,128,136,0.13)`), rotated −24°, covering the whole frame and **drifting slowly**.

- Viewers can watch the whole video comfortably.
- It reads on both white and black backgrounds.
- Because it moves and covers everything, it can't be cropped out or masked with a static filter.

```tsx
{watermark && <Watermark t={t} text={WATERMARK} />}
```

---

## 🍳 Scene recipes

The skill documents 17 reusable scenes (all used in real videos):

| # | Recipe | Example |
|---|---|---|
| A | Hook with icon tiles + a frame drawn around them | "…all in one place?" |
| B | Hook with a hand-drawn strike-through | "…without a monthly fee?" |
| C | Generations / timeline with a crossing stroke | |
| D | Brand reveal on a full-color background | "Meet X." |
| E | Year / number counter + sliding fact cards | |
| F | Stat cards with counters (hero card in color) | |
| G | Checklist with checks popping on each word | |
| H | Phone with toggles tapped by chained hands | |
| I | Checkout with a QR code drawn module by module | |
| J | Delivery split into two destinations | |
| K | Dashboard 2×2 + line chart drawing itself | |
| L | Coupon + chat bubbles | |
| M | Price on a color background (the one pill) | |
| N | Journey path in S connecting 4 nodes | |
| O | Merge: two cards become one | |
| P | Download button → progress → done | |
| Q | Sign-off: logo pop + name + underlined slogan | |

---

## 🧱 Components API

```ts
import { Center, E, F, FONT, Hand, Letters, PhoneOutline, Pill, Scene, Toggle, Underline, Words,
         W, H, ip, popStyle, prog, slideStyle, useSec } from "./lib";
```

| Component | What it does |
|---|---|
| `Scene` | a scene with enter/exit transition (`zoomIn`, `whipR/L`, `pop`, `rise` / `zoomThrough`, `shrink`, `whipL/R`, `fade`) and `cam` |
| `Words` | words fading in from blur, one by one |
| `Letters` | letters dropping in, spinning, settling — the emphasis |
| `Underline` | hand-drawn swoosh under a word |
| `Hand` | the tapping hand with ripple (`until` to chain several) |
| `Toggle` | on/off switch |
| `PhoneOutline` | outlined phone |
| `Pill` | word in a capsule (rare) |
| `popStyle` / `slideStyle` | pop with overshoot / slide in with blur |
| `Center` | centered column at a given `y` |
| `F` | camera key |
| `useSec`, `prog`, `ip`, `E` | time in seconds, progress, interpolation, easing curves |

Full API with every number: **PART 5** and **PART 6** of the skill.

---

## 📁 Project structure

```
openmotionkit/
├── README.md                    ← you are here (🇧🇷 README.pt-BR.md)
├── LICENSE                      ← GNU GPL v3.0
├── NOTICE                       ← attributions
├── skills/
│   └── openmotionkit/SKILL.md      ← the skill (~5,500 lines)
├── template/                    ← ready-to-run Remotion project
│   ├── src/lib.tsx              ← the style engine (do not edit the numbers)
│   ├── src/Video.tsx            ← the video (OpenMotionKit demo)
│   ├── src/Root.tsx             ← 120 fps compositions + Outfit font
│   ├── scripts/                 ← sounds, timings, review sheet, render, master
│   ├── voice/                   ← script, voice direction, TTS + alignment tools
│   └── public/fonts/            ← Outfit (OFL)
├── examples/
│   ├── openmotionkit-demo/         ← Video.tsx + script + voice.json
│   ├── nuvem-cafe/
│   └── tarefa-plus/
└── media/                       ← demo videos (120 fps) and GIFs
```

---

## 🛠️ Commands

| Command | What it does |
|---|---|
| `npm run setup` | generate sounds + music + test timings |
| `npm run timings` | estimated timings + silent voice (no API key) |
| `npm run voice` | Gemini voice + alignment + pauses (`ALIGN_LANG=en` for English) |
| `npx remotion studio` | live editor |
| `npx tsc --noEmit` | type-check |
| `node scripts/stills.mjs 1,3,5 out/stills && python3 scripts/grid.py out/stills` | review sheet |
| `sh scripts/render.sh <name>` | render clean + watermark and master to −14 LUFS |
| `PREVIA=1 sh scripts/master.sh in.mp4 out.mp4` | preview master (+10 dB) for silent-voice previews |

---

## 📋 Requirements

| Tool | Version |
|---|---|
| Node.js | 18 / 20 / 22 |
| ffmpeg + ffprobe | 5+ |
| Python | 3.9+ |
| Chromium | downloaded automatically by Remotion |
| faster-whisper (optional, for real voice timing) | `pip install faster-whisper numpy` in a venv (`ALIGN_PY` points to its python) |
| Gemini API key (optional, for voice) | from Google AI Studio |

A ~50 s video at 120 fps is ~6,000 frames: expect **10–20 minutes** per version on a laptop.

---

## 🏆 Golden rules

- ✅ White + **one** color. ✅ Emphasis = **bigger** word. ✅ Every scene has a **smooth** camera.
- ✅ One sound per meaningful action. ✅ 120 fps, ≥ 45 s, two versions.
- ✅ Facts only from the official site. ✅ Official logo (recolor allowed, redraw never).
- ❌ Background circles / glows. ❌ Pills everywhere. ❌ Ticks on every word. ❌ Fast, blurry camera.

---

## 🧯 Troubleshooting

| Symptom | Fix |
|---|---|
| `Gemini TTS 400/401/403` | missing or invalid `GEMINI_API_KEY` — use `npm run timings` for a silent preview |
| Voice reads the instructions | the script retries automatically; keep "Do not read these instructions" in `style` |
| Words out of sync | run alignment (`npm run voice` does it); for English set `ALIGN_LANG=en` |
| Text cut at the edge | a camera key is too zoomed or aimed away from the text — check the review sheet |
| Blurry frames in a still scene | camera keys too close in time or too far in pixels |
| Two hands on screen | chain them with `until` |
| `tsc` can't find modules | run `npm install` in the project |
| Render warns about memory | harmless Remotion warning inside containers |

---

## ❓ FAQ

**Can I use it for real brands?** Yes, for your own clients. Ads for brands you don't work with are portfolio/spec pieces — you need the brand's permission to publish them as ads.

**Does it need an API key?** Only for the voice. Everything else (animation, sounds, music, render) runs locally.

**Can I change the style?** You can — but OpenMotionKit's value is consistency. Fork the engine and keep your changes in `lib.tsx` so every video stays coherent.

**Other languages?** Yes: write the script in the language, set `profile`/`style` accordingly and `ALIGN_LANG` to the language code.

**Why 120 fps?** Smoother motion on high-refresh phones and cleaner slow-motion edits. Timing is in seconds, so any fps works.

---

## 🗺️ Roadmap

- [ ] More recipes (maps with routes, pricing tables, testimonials)
- [ ] Optional real-photo scenes (product shots with the same camera)
- [ ] One-command `npx openmotionkit new <brand>`
- [ ] More voice providers

---

## 🤝 Contributing

PRs are welcome — especially new **scene recipes** that follow the golden rules. Please include a review sheet (`grid.png`) of your scene and keep `lib.tsx` numbers unchanged unless the change is discussed first.

---

## 📜 Licenses & credits

- Code: **GNU General Public License v3.0** — see [LICENSE](LICENSE) and [NOTICE](NOTICE). You can use, study, modify and share OpenMotionKit; if you distribute a modified version, it must also be released under the GPL v3.0. Videos you render with it are yours.
- **Outfit** font: SIL Open Font License 1.1 — [OFL.txt](template/public/fonts/OFL.txt).
- Sounds and music: **generated by code** (`scripts/gerar_sons.py`), no third-party audio files.
- Built on **[Remotion](https://www.remotion.dev)** (check Remotion's license for commercial use by companies).
- *Nuvem Café* and *Tarefa+* are **fictional brands**. Studies inside the skill that mention real brands are unaffiliated portfolio pieces; logos are not included.

<div align="center"><br/>

**OpenMotionKit** · Real motion, open to everyone.

⭐ If OpenMotionKit helped you, give it a star — it really helps!

</div>
