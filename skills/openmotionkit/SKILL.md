---
name: openmotionkit
description: OpenMotionKit — cria motion graphics publicitários prontos (Remotion, 120 fps, 9:16 ou 16:9) num estilo fixo e reconhecível — fundo branco + uma cor da marca, texto Outfit saindo do desfoque, palavra-chave grande com letras pulando, traço desenhado à mão, mãozinha clicando com onda, celular em contorno, chaves, checklist, contadores, câmera suave que foca cada item, transições de zoom e chicote, som em cada ação e locução feminina (Gemini TTS). Use sempre que pedirem um "motion", "motion graphics", "vídeo animado", "anúncio animado" ou "criativo animado" para uma marca, site, app ou produto.
---

# OpenMotionKit · skill de motion graphics (estilo completo, passo a passo)

> **Para a IA que está lendo:** este arquivo é a skill **OpenMotionKit**, completa. Ele contém **todas** as regras, medidas, curvas, tempos, sons, câmera, roteiro, voz, instalação e **o código-fonte inteiro** usado para produzir motion graphics publicitários neste estilo.
> O objetivo é que você produza vídeos **idênticos** aos de referência: mesmo estilo, mesmo tema, mesmas animações, mesma câmera, mesmos sons. **Nenhum diferencial.** Não "melhore", não "reinterprete", não troque ferramenta, fonte, curva ou duração.
> Quando este arquivo disser "copie", copie **caractere por caractere**.

> **Instalar esta skill**
> - **Claude Code:** salve este arquivo como `~/.claude/skills/openmotionkit/SKILL.md` (ou `.claude/skills/openmotionkit/SKILL.md` no projeto) e peça: *"crie um motion para a marca X"*.
> - **Outras IAs/agentes:** envie este arquivo e peça para ela ler tudo antes de começar.
> - A IA precisa de um terminal com Node, ffmpeg e Python (PARTE 1) para renderizar os vídeos.

---

## ÍNDICE

- **ENGLISH GUIDE** · the whole system summarized in English (EN-1 … EN-9)
- **PARTE 0** · Como usar este arquivo (leia primeiro)
- **PARTE 1** · Instalação completa do ambiente (passo a passo)
- **PARTE 2** · Montagem do projeto-modelo (pastas, arquivos, assets binários)
- **PARTE 3** · Regras do estilo (obrigatório / proibido)
- **PARTE 4** · Visual e layout (cores, tipografia, grade, ícones, marca d'água, logo)
- **PARTE 5** · Componentes (API exata)
- **PARTE 6** · Anatomia de cada animação (quadro a quadro, com números)
- **PARTE 7** · Câmera que foca os itens (suave)
- **PARTE 8** · Estrutura do vídeo, transições, ritmo e 17 receitas de cena
- **PARTE 9** · Som
- **PARTE 10** · Roteiro e voz
- **PARTE 11** · Revisão, render e entrega
- **PARTE 12** · Erros que já aconteceram
- **PARTE 13** · Fluxo completo de um vídeo novo (do pedido à entrega) + esqueleto pronto
- **PARTE 14** · Código-fonte do projeto-modelo (copiar inteiro)
- **PARTE 15** · Vídeos completos (demo OpenMotionKit + estudos Soul Pay, Itaú, Magalu, Loop)
- **PARTE 16** · Checklist final e frases de entrega
- **PARTE 17** · Biblioteca de sons opcional (catálogo de 666 sons Kenney/Mixkit, kit de 177, scripts)


---

# ENGLISH GUIDE · OpenMotionKit in English (read this if you don't read Portuguese)

> The rest of this file is written in Brazilian Portuguese (the language the system was built in). **The code is universal.** This guide gives you every rule you need in English; the Portuguese parts add the exact numbers, recipes and full source.

## EN-1 · What you must produce
- **Remotion 4.0.540** project, **120 fps**, **45–60 s**, **9:16 (1080×1920)** by default or **16:9 (1920×1080)** on request.
- **Two versions**: `Motion` (clean) and `MotionWatermark` (mosaic watermark).
- Audio mastered to **−14 LUFS** with a limiter.
- Everything timed in **seconds** (`useSec()`, `w(i)` = when word *i* is spoken). Never frames.

## EN-2 · Visual rules (mandatory)
1. **White background** dominant + **one accent color** (the brand's color, taken from its website CSS). Black `#111` text, light gray secondary text. 2–3 scenes per video can be fully in the brand color (or black), never two in a row.
2. **Outfit** font, centered. Context words small (52–74 px, gray), strong words black/800.
3. **Emphasis = the key word, BIG** (96–150 px, brand color) with `Letters` (letters drop, spin and settle). This is the signature.
4. **Pill** (word inside a capsule): **at most once per video**, often zero.
5. **Hand-drawn strokes** (`Underline`, strike-throughs, arrows, paths, charts) drawn with `strokeDashoffset`.
6. **Outlined UI**: phone (`PhoneOutline`), toggles (`Toggle`), checklists, chat bubbles, counters, windows, dashboards.
7. **The hand** (`Hand`): travels, taps (squeezes to 0.82), releases a ripple. **One hand at a time** (chain with `until`).
8. **Transitions**: `zoomIn`/`whipR`/`whipL`/`pop`/`rise` in, `zoomThrough`/`whipL`/`whipR`/`shrink`/`fade` out, 0.38 s. Alternate them. Never a hard cut. First scene `enter="none"`, last scene `exit="none"` + `drift={0.4}`.
9. **Camera on every scene** (`cam={[F(t, x, y, zoom, roll, tiltX, tiltY), …]}`), **always smooth** (see EN-4).
10. **A sound for every meaningful action**, nothing more (see EN-5).
11. **Female voice** from Gemini TTS (EN-6).

## EN-3 · Forbidden
- ❌ Circles, rings, glows or blobs behind text. ❌ Floating decorations without a function.
- ❌ Pills as default emphasis. ❌ Fast/blurry camera. ❌ Static screen.
- ❌ A tick sound on every word; bursts of ticks on counters.
- ❌ Condensed poster fonts, colored bars behind text.
- ❌ Redrawn or "look-alike" logos (official file only; recoloring is fine).
- ❌ Invented facts (customer counts, awards…) — only what the official site states.
- ❌ Copying other creators' portfolio frames or social-media watermarks.

## EN-4 · Camera (numbers)
| Rule | Value |
|---|---|
| Keys per scene | 2–6 |
| Time between keys | **≥ 1.2 s** (closer keys are dropped by the engine) |
| Zoom | 1.0–1.3 (max 1.35) |
| Roll | ±1° typical, ±3° max |
| Tilt X/Y | 3–6° typical, 8° max, alternate signs |
| Pattern | open near the title (1.26–1.3) → glide to each item 0.2 s before it pops → pull back to show everything (1.0–1.06) → last key at scene end (1.04–1.1) |
Automatic on top: hand-held sway (±4 px, ±3 px, ±0.2°), zoom breathing (±1.2 %), motion blur ≤ 3 px.

## EN-5 · Sound map
| Action | File | Volume |
|---|---|---|
| Before scene change / at the cut | `whoosh.mp3` (every 2nd of 3: `zoom.mp3`) / `swoosh.mp3` | 0.30 / 0.16 |
| First text | `text-in.mp3` | 0.20 |
| Pop (icon, card, number) | `pop.mp3` | 0.20–0.30 |
| Slide | `swish.mp3` | 0.20–0.26 |
| Hand tap | `click.mp3` | 0.34 |
| Toggle | `toggle.mp3` | 0.24 |
| Stroke | `scribble.mp3` | 0.22–0.28 |
| Chat bubble | `message.mp3` | 0.30 |
| Success / counter lands | `notify.mp3` | 0.26–0.30 |
| Logo | `reveal.mp3` 0.34 + `sparkle.mp3` 0.22 | |
| Before a big word (≤ 3–4 per video) | `zoomin.mp3` | 0.18 |
| Final hit | `stamp.mp3` | 0.20 |
| Counter | `tick.mp3` **once** + landing sound | 0.12 |
Music: 0.16 between phrases, 0.07 under speech, 2.5 s fade-out. Generate everything with `python3 scripts/gerar_sons.py`.

## EN-6 · Script & voice
- **Script formula** (85–110 words in English): hook question ("Still searching for…?", "Ever wished…?") → brand ("Meet X.") → 3–5 features, one sentence each (each becomes a scene) → benefit or price → CTA (optional) → sign-off ("X. <official slogan>.").
- Numbers spelled out in the script ("one hundred forty dollars"), digits on screen ("$140").
- `voice/src/data/voice.json` for English:
```json
{
  "model": "gemini-3.8-flash-tts",
  "voice": "Despina",
  "profile": "American female voice-over artist, early thirties.",
  "style": "American English, natural accent. A woman in her early thirties, smooth, warm and elegant voice, confident and friendly, with a subtle smile, not a radio announcer. CALM, unhurried pace with clear pauses between sentences. Pronounce '<brand>' as '<phonetic>'. Do not read these instructions; read only the transcript."
}
```
- Run `ALIGN_LANG=en npm run voice` (TTS → faster-whisper alignment → 0.6 s pauses). No key → `npm run timings` and deliver a "silent preview".
- Female voices: Despina (elegant), Leda (young, upbeat), Kore (firm), Sulafat (warm), Zephyr (bright), Aoede (light), Laomedeia (cheerful), Achernar, Autonoe, Callirrhoe, Erinome, Gacrux, Pulcherrima, Vindemiatrix.

## EN-7 · Mosaic watermark
Many small `◆ <Studio>` labels (Outfit 800, 28 px), rows every 120 px, columns every 330 px (alternate rows offset by half a column), rotated −24°, color `rgba(128,128,136,0.13)`, drifting 12 px/s × 7 px/s. Visible on white and black, never blocks the video, can't be cropped or statically masked. Component `Watermark` (PART 15 demos): `{watermark && <Watermark t={t} text={WATERMARK} />}`.

## EN-8 · Workflow (do it in this order)
1. **Research** the official site: facts, brand color (CSS), official logo (render it and look at it).
2. **New project**: copy `template/` (or the model project), `npm install`.
3. **Script** + **voice.json** → `npm run voice` (or `npm run timings`).
4. **Print word indices** and define `B = [0, w(i1), w(i2), …]` (first word of each sentence).
5. **Plan scenes** (recipe, background, transitions, emphasis, camera, sounds) — 8–11 scenes, ≥ 2 style elements each.
6. **Write `src/Video.tsx`** starting from the closest demo in PART 15 (keep `Soundtrack` and `Watermark`).
7. `npx tsc --noEmit`.
8. **Review sheet**: `node scripts/stills.mjs <20–24 times> out/stills && python3 scripts/grid.py out/stills` — look at it, fix overlaps, cut text, wrong camera, blur. Repeat.
9. **Render**: `sh scripts/render.sh <name>` (or silent preview: render `Motion` + `PREVIA=1 sh scripts/master.sh …`).
10. **Verify** with `ffprobe` (120/1 fps, resolution, ≥ 45 s) and deliver both versions with a short summary (format, color, duration, facts + source, what's illustrative, voice chosen and why).

## EN-9 · Final checklist
- [ ] 120 fps, ≥ 45 s, right resolution, two versions, −14 LUFS
- [ ] White + one color; Outfit; emphasis big in color; ≤ 1 pill
- [ ] All text synced to `w(i)`; every scene with ≥ 2 style elements
- [ ] Every scene has `cam`; keys ≥ 1.2 s; zoom ≤ 1.3; nothing cut when spoken
- [ ] No circles/glows; nothing floating; one hand at a time
- [ ] Alternating transitions; no hard cuts
- [ ] Sounds on actions only; no per-word ticks
- [ ] Official logo; official facts; illustrative items declared
- [ ] Review sheet checked

---

# PARTE 0 · Como usar este arquivo

1. **Leia o arquivo inteiro uma vez** antes do primeiro vídeo. As regras das Partes 3, 7 e 9 vieram de revisões reais; quebrar qualquer uma delas reprova o vídeo.
2. **Monte o ambiente** (Parte 1) e o **projeto-modelo** (Parte 2 + código da Parte 14). Faça isso uma vez; depois, cada vídeo novo é uma cópia do modelo.
3. **Para cada pedido** ("crie um motion para a marca X"), siga a **Parte 13** na ordem, sem pular etapas.
4. **O arquivo `src/lib.tsx` é o estilo.** Ele não pode ser editado (só a constante `FORMAT`). Todas as animações do vídeo são composições dos componentes dele. Se você sentir vontade de criar uma animação nova, **não crie**: procure a receita equivalente na Parte 8 e nos vídeos da Parte 15.
5. **Os vídeos da Parte 15 são a régua de qualidade.** Antes de escrever uma cena, procure a cena parecida neles e copie a composição (posições, tamanhos, tempos, câmera, sons).
6. Tudo é medido em **segundos**, nunca em quadros. O vídeo é renderizado a **120 fps**.
7. Idioma padrão dos vídeos: **português do Brasil**.

### Glossário rápido
| Termo | Significado |
|---|---|
| **cena** | um trecho do vídeo = uma frase da locução, com fundo, transição de entrada/saída e câmera próprias (`<Scene>`). |
| **`w(i)`** | instante (s) em que a palavra número `i` do roteiro começa a ser falada. Tudo é sincronizado com isso. |
| **`B` / `SC(i)`** | fronteiras das cenas (início/fim da cena `i`). |
| **ênfase** | a palavra-chave da cena, mostrada GRANDE e na cor da marca, com letras pulando (`Letters`). |
| **cor da marca / AC** | a única cor de destaque do vídeo, tirada do site oficial. |
| **pílula** | palavra dentro de uma cápsula colorida (`Pill`). Rara: no máximo 1 por vídeo. |
| **mãozinha** | cursor de mão (contorno preto, miolo branco) que chega, toca e solta uma onda (`Hand`). |
| **chave** | interruptor liga/desliga (`Toggle`). |
| **bloco / Tile** | quadrado arredondado com ícone de traço no meio. |
| **câmera** | movimento do enquadramento dentro da cena (`cam={[F(...)]}`): aproxima, passeia, inclina, gira levemente. |
| **prévia sem voz** | vídeo renderizado com tempos estimados e voz muda, quando não há chave do Gemini. |

---

# PARTE 1 · Instalação completa do ambiente

Faça tudo isto **uma vez** na máquina. Se você é uma IA com terminal, rode os comandos você mesma e confira cada saída antes de seguir.

## 1.1 Programas obrigatórios
| Programa | Versão | Para quê | Como conferir |
|---|---|---|---|
| **Node.js** | 18, 20 ou 22 (LTS) | Remotion (render do vídeo) | `node -v` |
| **npm** | o que vem com o Node | instalar pacotes | `npm -v` |
| **ffmpeg** + **ffprobe** | 5 ou mais novo | sons, master de áudio, conferência, folha de revisão | `ffmpeg -version` |
| **Python 3** | 3.9+ | voz, tempos, sons, folha de revisão | `python3 --version` |
| **Chrome/Chromium** | qualquer recente | o Remotion renderiza com ele (baixa sozinho se faltar) | — |
| **zip/unzip, tar** | — | utilitários | — |

### Linux (Debian/Ubuntu)
```bash
sudo apt-get update
sudo apt-get install -y ffmpeg python3 python3-venv python3-pip zip unzip
# Node 20 LTS (via NodeSource) — ou use nvm
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
# bibliotecas que o Chromium headless precisa (se o render reclamar)
sudo apt-get install -y libnss3 libatk1.0-0 libatk-bridge2.0-0 libcups2 libdrm2 libxkbcommon0 libxcomposite1 libxdamage1 libxfixes3 libxrandr2 libgbm1 libasound2 libpango-1.0-0 libcairo2
```

### macOS
```bash
brew install node@20 ffmpeg python@3.12
```

### Windows
- Instale Node 20 LTS (nodejs.org), Python 3.12 (python.org, marque "Add to PATH") e ffmpeg (winget: `winget install Gyan.FFmpeg`).
- Use **Git Bash** ou **WSL** para rodar os scripts `.sh`.

## 1.2 Ambiente Python para alinhar a voz (faster-whisper)
O alinhamento palavra a palavra usa o `faster-whisper` (roda em CPU).
```bash
python3 -m venv ~/.venv-align
~/.venv-align/bin/pip install --upgrade pip
~/.venv-align/bin/pip install faster-whisper numpy
# teste (baixa o modelo "small" na primeira vez, ~480 MB):
~/.venv-align/bin/python -c "from faster_whisper import WhisperModel; WhisperModel('small', device='cpu', compute_type='int8'); print('whisper ok')"
```
No Windows o Python do venv fica em `~/.venv-align/Scripts/python.exe`; defina `ALIGN_PY` com esse caminho.

## 1.3 Chave do Google AI Studio (voz Gemini TTS)
1. Crie a chave em **aistudio.google.com** → "Get API key".
2. Guarde **fora do código**: variável de ambiente `GEMINI_API_KEY`, ou um arquivo `.env` na pasta do projeto com a linha `GEMINI_API_KEY=...`.
3. O `.env` está no `.gitignore`. **Nunca** cole a chave em código, chat, commit ou print.
4. Sem chave dá para trabalhar: o vídeo sai como "prévia sem voz" (tempos estimados), e quando a chave existir é só gerar a voz que as cenas se ajustam sozinhas.

## 1.4 Conferência final do ambiente
```bash
node -v && npm -v && ffmpeg -version | head -1 && ffprobe -version | head -1 && python3 --version && echo AMBIENTE_OK
```
Tem que terminar com `AMBIENTE_OK`.

---

# PARTE 2 · Montagem do projeto-modelo

O projeto-modelo é montado **uma vez**. Cada vídeo novo é uma **cópia** dele (`cp -r openmotionkit-project marca-x-motion`).

## 2.1 Estrutura de pastas (exata)
```
openmotionkit-project/
├── package.json              ← PARTE 14 (copiar)
├── tsconfig.json             ← PARTE 14
├── remotion.config.ts        ← PARTE 14
├── .gitignore                ← PARTE 14
├── src/
│   ├── index.ts              ← PARTE 14
│   ├── Root.tsx              ← PARTE 14 (composições 120 fps + fonte)
│   ├── lib.tsx               ← PARTE 14 (O ESTILO — não editar)
│   └── Video.tsx             ← a peça (comece pelo esqueleto da PARTE 13 ou por um vídeo da PARTE 15)
├── public/
│   ├── fonts/outfit-latin.woff2, outfit-latin-ext.woff2, OFL.txt
│   ├── sfx/  (21 sons: pop, tick, soft, click, toggle, whoosh, swish, swoosh, zoom, zoomin, riser, reveal,
│   │          sparkle, scribble, message, notify, stamp, text-in, typing, like, bubble)
│   ├── audio/music.mp3, voiceover.mp3, voiceover-timings.json
│   └── brand/  (logo oficial da marca de cada vídeo)
├── scripts/
│   ├── gerar_sons.py         ← PARTE 14 (gera todos os sons + trilha, sem download)
│   ├── estimate_timings.py   ← PARTE 14 (tempos sem chave)
│   ├── stills.mjs            ← PARTE 14 (quadros de revisão)
│   ├── grid.py               ← PARTE 14 (folha de revisão)
│   ├── master.sh             ← PARTE 14 (−14 LUFS)
│   ├── render.sh             ← PARTE 14 (duas versões)
│   └── baixar_sfx_mixkit.py  ← PARTE 14 (OPCIONAL: troca 4 sons pelos do Mixkit)
├── voice/
│   ├── script.txt            ← roteiro
│   ├── src/data/voice.json   ← direção da voz
│   ├── public/audio/         ← saída temporária da voz
│   └── tools/gemini_tts.py, align_words.py, add_pauses.py   ← PARTE 14
└── out/                      ← vídeos e quadros
```

## 2.2 Comandos de montagem
```bash
mkdir -p openmotionkit-project && cd openmotionkit-project
mkdir -p src scripts public/{fonts,sfx,audio,brand} voice/{tools,src/data,public/audio} out
# 1) crie cada arquivo da PARTE 14 com o conteúdo EXATO (copiar e colar)
# 2) dependências (versões travadas — não troque):
npm install
# 3) fonte Outfit (licença OFL, Google Fonts) a partir do pacote oficial do Fontsource:
npm pack @fontsource-variable/outfit@5.3.0 && tar xzf fontsource-variable-outfit-5.3.0.tgz
cp package/files/outfit-latin-wght-normal.woff2 public/fonts/outfit-latin.woff2
cp package/files/outfit-latin-ext-wght-normal.woff2 public/fonts/outfit-latin-ext.woff2
cp package/LICENSE public/fonts/OFL.txt 2>/dev/null || true
rm -rf package fontsource-variable-outfit-5.3.0.tgz
# 4) sons e trilha (gerados localmente, determinísticos):
python3 scripts/gerar_sons.py
# 5) tempos de teste + voz muda, para o projeto abrir:
python3 scripts/estimate_timings.py
# 6) conferência:
npx tsc --noEmit && echo TIPOS_OK
```

## 2.3 Sobre os sons e a trilha
- `scripts/gerar_sons.py` cria **todos** os 21 efeitos e uma trilha de 60 s (acordes suaves a 100 bpm) **do zero**, com Python + ffmpeg. Não precisa baixar nada nem se preocupar com licença.
- Quer sons de biblioteca? Pode trocar qualquer arquivo por outro **com o mesmo nome** e característica parecida (ver tabela). O código do vídeo não muda.

| Arquivo | Característica (para escolher um substituto) | Duração |
|---|---|---|
| `pop.mp3` | "plop" curto subindo de tom | 0,1 s |
| `tick.mp3` | tique agudo seco (RARO) | 0,03 s |
| `soft.mp3` | clique suave | 0,04 s |
| `click.mp3` | clique de dedo/mouse | 0,04 s |
| `toggle.mp3` | dois cliques (liga) | 0,1 s |
| `whoosh.mp3` | passagem de ar média | 0,5 s |
| `swish.mp3` | passagem rápida e leve | 0,3 s |
| `swoosh.mp3` | passagem + pop no fim (troca de cena) | 0,4 s |
| `zoom.mp3` | passagem com zoom subindo | 0,6 s |
| `zoomin.mp3` | "uuuip" subindo (antes da palavra grande) | 0,8 s |
| `riser.mp3` | subida de tensão | 1,5 s |
| `reveal.mp3` | acorde brilhante de revelação | 1,2 s |
| `sparkle.mp3` | brilhos/sininhos | 0,8 s |
| `scribble.mp3` | caneta riscando | 0,5 s |
| `message.mp3` | "plim-plim" de mensagem | 0,3 s |
| `notify.mp3` | arpejo de sucesso (3 notas) | 0,6 s |
| `stamp.mp3` | batida grave de carimbo | 0,3 s |
| `text-in.mp3` | entrada de texto (sopro + clique) | 0,25 s |
| `typing.mp3` | digitação | 1 s |
| `like.mp3` | pop + sino | 0,4 s |
| `bubble.mp3` | bolha | 0,12 s |

- Trilha: qualquer trilha instrumental leve, corporativa/lo-fi, 95–110 bpm, sem voz, com licença livre (ex.: biblioteca de música do Pixabay ou do YouTube Audio Library). Exporte com 60 s ou mais e fade-out no fim. Nome: `public/audio/music.mp3`.

## 2.4 Novo vídeo a partir do modelo
```bash
cp -r openmotionkit-project marca-x-motion && cd marca-x-motion && rm -rf out/* && mkdir -p out
# se o modelo já tem node_modules, a cópia já funciona; senão: npm install
# formato horizontal? no src/lib.tsx troque:  export const FORMAT = "9x16" as …  →  "16x9"
```

---

# PARTE 3 · Regras do estilo (obrigatório / proibido)

Estas regras definem o estilo. Cada uma nasceu de uma revisão real em que o vídeo foi reprovado sem ela. **Todas valem ao mesmo tempo.**

## 3.1 Formato e entrega
| Regra | Valor |
|---|---|
| Ferramenta | **Remotion 4.0.540** (React + TypeScript). Nada de After Effects, Canva, CapCut, Lottie, HTML solto. |
| FPS | **120 fps, sempre** (`FPS = 120` no `Root.tsx`). |
| Duração | **mínimo 45 s** (normal 48–60 s). `TOTAL = max(45, fim da última palavra + 4,5 s)`. |
| Formato | **9:16 (1080×1920)** por padrão; **16:9 (1920×1080)** quando pedirem. |
| Versões | **duas**: `Motion` (limpa) e `MotionWatermark` (marca d'água em **mosaico** transparente do seu estúdio). |
| Áudio | master **−14 LUFS** com limitador (`alimiter=limit=0.7`). |
| Tempo | Toda animação em **segundos** (`useSec()`), nunca em número de quadro. |
| Pasta | Um projeto por vídeo: `<marca>-motion/`. |

## 3.2 Visual: obrigatório
1. **Fundo branco** dominante + **uma única cor de destaque** (a cor oficial da marca). Texto principal preto `#111`, texto secundário cinza claro.
   - Pedido "preto e branco": destaque = preto; cenas inteiras pretas só como pontuação.
2. **Fonte Outfit** (pesos 500–800), pequena, **centralizada**.
3. Texto entra **palavra a palavra saindo do desfoque** (`Words`) ou **letra a letra pulando e girando** (`Letters`), **no ritmo da fala**.
4. **Traço desenhado à mão** embaixo da palavra-chave e do slogan (`Underline`), e traços livres para riscar, ligar, apontar.
5. **Mãozinha clicando com onda** em botões, chaves e linhas (`Hand`).
6. **Interface** desenhada: celular em contorno, chaves liga/desliga, checklist, balões de chat, contadores, gráficos que se desenham, cards com ícone.
7. **Transições**: zoom atravessando, chicote lateral, encolher, pop. **Nunca corte seco.**
8. **Câmera que foca nos itens** em toda cena, **sempre suave** (PARTE 7).
9. **Som em cada ação importante**, sem excesso (PARTE 9).
10. **Locução feminina** gerada pelo Gemini TTS (você escolhe a voz pelo tom da marca).
11. **Ênfase = a palavra normal, só que MAIOR** (e na cor). É a assinatura do estilo.

## 3.3 Visual: PROIBIDO
- ❌ **Círculo, anel, mancha ou brilho (glow) atrás do texto.** Fica "brega". Os componentes `Rings` e `Glow` não existem no lib de propósito. (Única exceção: a onda do toque da mãozinha, que é feedback do clique.)
- ❌ **Enfeite solto**, sem função. Todo elemento é texto, interface, produto/ícone, mão ou traço — alinhado numa grade limpa.
- ❌ **Pílula como ênfase padrão.** `Pill` no máximo **1 vez por vídeo**, em trecho curto; em muitos vídeos, nenhuma.
- ❌ **Câmera rápida**, chicoteando, borrada. O objetivo é a pessoa **entender**.
- ❌ **Tela parada.** Toda cena tem câmera.
- ❌ **Som de tique/engrenagem repetido**: nada de tique em cada palavra, nada de rajada de tiques em contador.
- ❌ Fonte condensada de cartaz (Bebas etc.), faixas coloridas atrás do texto, estética "chapada".
- ❌ Copiar molduras/assinaturas de portfólio de outros criadores ou marcas d'água de redes sociais.
- ❌ **Logo redesenhado** ou "parecido". Só arquivo oficial (pode recolorir).
- ❌ **Fato inventado** (número de clientes, lojas, prêmios) sem fonte oficial.

## 3.4 Conteúdo e marcas
- Só fatos confirmados no **site oficial** da marca (ou páginas oficiais). Se o site bloquear acesso automático, **não contorne**: use o que a busca mostra da página oficial ou peça o material.
- Elementos ilustrativos (mensagens de chat, cupom, QR, números de painel) são permitidos **como ilustração** — diga quais são.
- Depoimentos marcados como "exemplo" no site: não use.
- Imagens de apoio: só de bancos com licença livre (Unsplash, Pexels, Pixabay) ou enviadas por quem pediu.
- Vídeo para marca grande sem contrato = peça de portfólio (spec). Para veicular, precisa de autorização da marca.

## 3.5 Segurança
- Chaves de API **nunca** no código, no git ou em mensagens: `GEMINI_API_KEY` no ambiente ou em `.env` ignorado.
- Sons/trilhas de terceiros: respeite a licença (o gerador da PARTE 14 evita o problema).

---

# PARTE 4 · Visual e layout (medidas exatas)

### Paleta por vídeo (constantes no topo do `Video.tsx`)
```ts
const BG = "#FFFFFF";        // fundo branco (dominante)
const AC = "<cor da marca>"; // UMA cor de destaque (nome curto: GR, OR, BL…)
const ACD = "<cor da marca ~15% mais escura>"; // estado "apertado" de botão (ex.: Soul Pay #17A34F)
const INK = "#111111";       // texto principal e contornos (Soul Pay usou #17171A, do site)
const MUTE = "#9A9AA3";      // texto secundário (cinza claro, mesma linha do texto forte)
const SOFT = "#F4F4F6";      // fundo de cards/blocos inativos
const LIGHT = "<cor da marca a ~8–10% sobre branco>"; // card ativo (ex.: verde #E9FBF0, laranja #FFF0E6, azul #E6F3FF)
```
Cores já usadas (oficiais): Soul Pay `#26D367`, Itaú `#FF6200`, Magalu `#0086FF`, Xiaomi `#FF6900`, Mercado Livre `#FFE600` (texto `#2D3277`), Apple/Loop P&B `#111`.
Em cena com fundo na cor: texto branco `#fff`, secundário `rgba(255,255,255,0.8–0.85)`, cards brancos com ícone na cor.

### Tipografia (Outfit, carregada no `Root.tsx`)
| Uso | Componente | Tamanho 9:16 | Tamanho 16:9 | Peso | Cor |
|---|---|---|---|---|---|
| Frase de contexto (palavras normais) | `Words` | 52–74 px | 46–64 px | 600 (normal) / 700–800 (palavra forte) | MUTE; palavra forte = INK |
| **Ênfase** (palavra-chave) | `Letters` | **96–150 px** | 90–140 px | 800 | AC (ou INK em fundo branco quando o AC já aparece muito) |
| Números/contadores | `div` | 230–330 px | 200–280 px | 800, `letterSpacing: -0.04em`, `fontVariantNumeric: "tabular-nums"` | AC |
| Rótulo de card | `div` | 38–58 px | 32–46 px | 700–800 | INK |
| Texto dentro do celular | `div` | 32–40 px | 26–34 px | 700–800 | INK |

- Regra da ênfase: o **contexto é pequeno e cinza**; a **palavra que importa é grande, colorida, com `Letters`**, logo abaixo. Ex.: `Já imaginou` (74, cinza/preto) → `um lugar só?` (128, cor). Nunca enfatize com pílula (a não ser a única pílula do vídeo).
- Na mesma linha, misture: palavras fracas `color: MUTE, weight 600` e fortes `color: INK, weight: 800`.

### Grade 9:16 (1080×1920)
- Margem lateral: **110–140 px** (cards com `left: 110, width: 860` ou `left: 140, width: 800`).
- Centro horizontal: x = 540. Tudo centralizado com `<Center y={…}>`.
- Faixas verticais típicas:
  - **Título/contexto**: y 300–560.
  - **Área do item principal** (cards, celular, blocos): y 480–1450.
  - **Frase de fechamento/ênfase**: y 1360–1700.
- Celular grande: `PhoneOutline w={580} h={1000}` em `left: 250, top: 560`. Celular médio: `w={500} h={900}` em `left: 290, top: 560`.
- Linhas de lista no celular grande (para a mão tocar): centros y ≈ 852, 1012, 1172; chave em x ≈ 713.
- Cards empilhados: altura 140–200, passo 174–220 px. Grade de blocos: `Tile` 190–260 px, gap 50–60.
- Não ultrapasse y 1780 (marca d'água e área segura).

### Grade 16:9 (1920×1080)
- Margem lateral: 140–170 px. Centro x = 960.
- Layout em **duas colunas**: texto à esquerda (x 140–900) e interface à direita (x 1060–1780), ou blocos centralizados em linha (3 cards de 460 px com gap 60).
- Título y 160–300, área do item y 330–900, frase final y 880–950.

### Ícones
- Desenhados em SVG `viewBox 0 0 100 100`, **traço 6 px**, cantos/pontas arredondados (`strokeLinecap/Join="round"`), em INK ou branco. Sólidos só para pessoa, pino, brilho.
- Dentro de **blocos arredondados** (`Tile`): `borderRadius = 24% do lado`, fundo SOFT (inativo) ou AC (ativo, ícone branco), ícone = 54% do bloco.
- Biblioteca pronta nos exemplos (`P` em cada `Video.tsx`): bag, card, box, gift, pin, store, map, people, person, wallet, receipt, shield, search, heart, spark, check, link, mail, globe, cart, list, brush, bill, chart, up, pix, lens, battery, bolt, phone, watch, buds, bulb, vacuum, cam. Copie daí.

### Cards
- `borderRadius` 40–56, `padding: "0 36px"`, `display: flex`, `gap: 24–40`.
- Inativo: fundo SOFT. Ativo (depois da palavra): fundo LIGHT + ícone no bloco AC.
- Contorno: só em celular, caixa de link e painel (`border: 5–6px solid INK`). Sombra só a do `PhoneOutline`.

### Marca d'água (versão `MotionWatermark`): MOSAICO
Nada de marca gigante no meio. A marca d'água é um **mosaico**: muitos "◆ <seu estúdio>" pequenos, **bem transparentes**, cobrindo a tela toda em diagonal e **andando devagar**. A pessoa vê o vídeo inteiro, mas não consegue remover com um recorte nem com um filtro estático.

| Parâmetro | Valor |
|---|---|
| Texto | `◆ <estúdio>` (constante `WATERMARK`) |
| Fonte | Outfit 800, 28 px, `letterSpacing 0.06em` |
| Grade | linhas a cada 120 px, colunas a cada 330 px; linhas alternadas deslocadas meia coluna |
| Ângulo | −24° |
| Cor | `rgba(128,128,136,0.13)` (aparece no fundo branco **e** no preto, sem atrapalhar) |
| Movimento | desliza 12 px/s na horizontal e 7 px/s na vertical (repete sem emenda) |

Uso: `{watermark && <Watermark t={t} text={WATERMARK} />}` — o componente `Watermark` está em todos os vídeos da PARTE 15 (copie de lá). Funciona igual em 9:16 e 16:9.
(16:9: `bottom: 60`, `font 900 130px`.)

### Logo
- Arquivo oficial em `public/brand/`. SVG: recolorir trocando `fill` (ex.: versão branca para fundo na cor). PNG com transparência: versão branca via máscara CSS:
```tsx
<div style={{ width: s, height: s * ratio, background: "#fff", WebkitMaskImage: `url(${staticFile("brand/x.png")})`, WebkitMaskSize: "contain", WebkitMaskRepeat: "no-repeat", maskImage: `url(${staticFile("brand/x.png")})`, maskSize: "contain", maskRepeat: "no-repeat" }} />
```
- Aparece 2 vezes: cena "Conheça/Isso é <marca>" (fundo na cor, logo branco 300–700 px de largura) e cena final (fundo branco, logo colorido + slogan sublinhado).

---

# PARTE 5 · Componentes do `lib.tsx` (API exata)

Importe sempre de `./lib`. **Não edite o lib** (só a constante `FORMAT`). Todos os tempos são **segundos absolutos do vídeo** (`t` = `useSec()`; `w(i)` = início da palavra i).

```ts
import { Center, E, F, FONT, Hand, Letters, PhoneOutline, Pill, Scene, Toggle, Underline, Words, W, H,
  clamp01, ip, lerp, outStyle, popStyle, prog, slideStyle, useSec } from "./lib";
```

### Tempo e curvas
| Nome | O que faz |
|---|---|
| `useSec()` | segundo atual do vídeo (`frame / fps`). Chame uma vez no topo do `Video`: `const t = useSec();` |
| `prog(t, t0, d)` | progresso 0→1 de `t0` até `t0+d` (preso em 0..1). Base de toda animação. |
| `ip(t, [t0,t1,…], [v0,v1,…], ease?)` | interpolação com easing (padrão `E.inOut`). Use para contadores: `Math.round(ip(t, [w(17)-0.1, w(22)+0.3], [1900, 1957], E.outQuint))`. |
| `lerp(a, b, p)`, `clamp01(x)` | utilitários. |
| `E.outExpo` | entradas (texto, slide, câmera de cena). Curva `bezier(0.16,1,0.3,1)`. |
| `E.outBack` | pop com overshoot (letras, ícones, chaves). `bezier(0.34,1.56,0.64,1)`. |
| `E.outQuint` | contadores e traços. `bezier(0.22,1,0.36,1)`. |
| `E.inOut` | movimentos de câmera, linhas desenhadas, junções. `bezier(0.65,0,0.35,1)`. |
| `E.inExpo` | saídas. `bezier(0.7,0,0.84,0)`. |

### Texto
### `Words` — palavras saindo do desfoque
```tsx
<Words t={t} size={62} color={MUTE} weight={600} items={[
  { w: "Já", at: w(0) },
  { w: "pensou", at: w(1), color: INK, weight: 800 },
]} />
```
- Cada palavra: entra em 0,42 s (`outExpo`), começa 0,08 s antes de `at`, desfoque 14 px→0, sobe 34 px, escala 1,12→1.
- Uma `Words` = **uma linha** (quebra automática se não couber). Para duas linhas, duas `Words` empilhadas.
- `gap` padrão 0,26 em. Palavras ainda invisíveis **ocupam espaço** (a linha não "pula").
- `at` = `w(i)` da palavra falada correspondente (o texto acompanha a fala).

### `Letters` — letras pulando e girando (ÊNFASE)
```tsx
<Letters t={t} text="mensalidade?" at={w(9)} size={120} color={GR} weight={800} stagger={0.03} />
```
- Cada letra: 0,5 s, `outBack`, cai de −70 px, gira ±28° (alternando −1, 1, −0,5), escala 0,5→1; atraso entre letras = `stagger` (padrão 0,035; use 0,022–0,03 em textos longos).
- Use para a palavra/frase-chave de cada cena (é a "ênfase grande").

### `outStyle(t, at, d=0.3)` — saída de bloco de texto
Encolhe 15%, sobe 50 px, desfoca 14 px. Use quando dois textos dividem o mesmo lugar na mesma cena (o primeiro sai em `outStyle`, o segundo entra com opacidade `prog(...)`).

### Elementos
### `Underline` — traço desenhado à mão
```tsx
<Underline t={t} at={w(10)} width={520} color={GR} thick={12} />
```
Swoosh com volta (path fixo), desenha em 0,5 s (`outQuint`). Logo abaixo da `Letters` dentro do mesmo `Center`. `thick` 12 em 9:16 (8–10 em 16:9). Use 1–2× por cena no máximo; sempre no slogan final.

### Traço livre (riscar, ligar, seta) — padrão SVG
```tsx
const line = E.inOut(prog(t, w(5) - 0.1, 1.2));
<svg width={W} height={H} style={{ position: "absolute", left: 0, top: 0 }}>
  <path d="M120 1200 C330 1170 560 1240 960 1180" fill="none" stroke={AC} strokeWidth={12}
    strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - line} />
</svg>
```
Usos: riscar a palavra/card ("Mensalidade" riscada), ligar etapas (caminho em S), gráfico de linha, seta "pra frente", moldura que junta itens (`<rect rx={56}>`).

### `Pill` — palavra dentro de pílula (RARA: ≤ 1 por vídeo)
```tsx
<Pill t={t} at={w(87)} text="só quando vender." bg="#fff" color={GD} size={68} rot={-2} />
```
Cresce da esquerda (0,45 s), texto aparece do desfoque. `rot` −2°. `dotted` = borda tracejada.

### `Hand` — mãozinha que chega, toca e solta onda
```tsx
<Hand t={t} from={[1000, 1800]} to={[860, 1260]} at={w(22) + 0.3} tap={w(24)} leave={w(24) + 0.8} ripple={GR} />
```
- Vai de `from` a `to` entre `at` e `tap` (`inOut`), aperta (escala 0,82 por 0,18 s) em `tap`, solta onda (anel 180 px que cresce e some em 0,55 s — **é o único círculo permitido**, porque é feedback do toque), sai para baixo/direita em `leave` (0,4 s).
- `to` = **ponto exato do alvo** (centro do botão/chave). `from` = fora do item, de baixo/direita (ex.: `[1000, 1750]` em 9:16).
- **Uma mão por vez.** Para tocar vários itens em sequência, encadeie mãos com `until` (a anterior some quando a próxima nasce no mesmo ponto):
```tsx
<Hand t={t} from={[1000, 1750]} to={[713, 852]}  at={w(64) + 0.1} tap={w(65) - 0.02} until={w(65) + 0.2} ripple={AC} />
<Hand t={t} from={[713, 852]}  to={[713, 1012]} at={w(65) + 0.2} tap={w(67) - 0.02} until={w(67) + 0.3} ripple={AC} />
<Hand t={t} from={[713, 1012]} to={[713, 1172]} at={w(67) + 0.3} tap={w(70) - 0.02} leave={w(71)} ripple={AC} />
```
- O toque acontece ~0,02 s antes da palavra; a mudança visual (chave liga, botão vira "Copiado!") acontece em `t > tap`.

### `Toggle` — chave liga/desliga
`<Toggle t={t} at={w(65)} on={AC} w={120} />` — desligada cinza `#D9DBE3`; em `at` fica na cor e a bolinha corre com `outBack` (0,35 s). Use dentro das linhas do celular, sincronizada com o toque da mão.

### `popStyle(t, at, d=0.5, rot=0)` — pop com overshoot
`<div style={{ ...popStyle(t, w(5) - 0.15, 0.55, -10) }}>` — escala 0→1 `outBack`, opacidade rápida, gira `rot`→0. Ícones, blocos, logos, números. Antes de `at` fica `opacity: 0`.

### `slideStyle(t, at, dx, d=0.55)` — entra deslizando com desfoque
`...slideStyle(t, w(r.i) - 0.4, j % 2 ? 900 : -900, 0.6)` — vem de `dx` px (alterne esquerda/direita em listas), desfoque 16→0. Cards, linhas, painéis.

### `PhoneOutline` — celular em contorno
```tsx
<div style={{ position: "absolute", left: 250, top: 560, transform: `translateY(${(1 - E.outExpo(prog(t, a + 0.2, 0.9))) * 900}px)` }}>
  <PhoneOutline w={580} h={1000} ink={INK}>{/* conteúdo do app, padding "100px 40px 0" */}</PhoneOutline>
</div>
```
Contorno INK (2,2% da largura), cantos 14%, ilha preta no topo, sombra suave. **Sempre entra subindo** de baixo (900 px, `outExpo`, 0,7–0,9 s).

### `Center` — linha centralizada
`<Center y={520}>…</Center>` — coluna centralizada horizontalmente, centro vertical em `y`. Empilhe `Words`, `Letters`, `Underline`, `div` de espaço (`<div style={{ height: 40 }} />`).

### `Scene` — cena com transição e câmera
```tsx
<Scene t={t} a={SC(2)[0]} b={SC(2)[1]} bg={BG} enter="zoomIn" exit="whipL" cam={[ F(...), F(...) ]}>
  {() => (<>…</>)}
</Scene>
```
- Só existe entre `a` e `b`. Transição dura `TR = 0,38 s` (entrada nos primeiros 0,38 s, saída nos últimos 0,38 s).
- `enter`: `zoomIn` (0,55→1 + desfoque 18), `whipR`/`whipL` (chicote lateral + desfoque 26), `pop` (1,35→1), `rise` (sobe de baixo), `none` (só a 1ª cena).
- `exit`: `zoomThrough` (escala até 3,2 + desfoque 24, atravessa), `whipL`/`whipR`, `shrink` (encolhe até 0,15 girando −8°), `fade`, `none` (só a última cena).
- `bg`: cor de fundo da cena (BG ou a cor da marca).
- `cam`: obrigatório (ver 04). `drift`: na cena final use `drift={0.4}`.
- `children` recebe `lt` (tempo local), mas prefira tempos absolutos `w(i)`.

### Tempos das cenas (padrão de todos os vídeos)
```ts
const words = (T as { words: { word: string; start: number; end: number }[] }).words;
const w = (i: number) => words[i]!.start;
export const TOTAL = Math.max(45, Math.ceil(words[words.length - 1]!.end + 4.5));
const B = [0, w(10), w(14), w(25), w(42), w(56), w(69), w(78), w(89)].map((x, i) => (i === 0 ? 0 : x - 0.12));
const SC = (i: number): [number, number] => [B[i]!, i + 1 < B.length ? B[i + 1]! : TOTAL];
```
Cada índice em `B` é a **primeira palavra de uma frase**. A troca de cena acontece 0,12 s antes dela.

---

# PARTE 6 · Anatomia de cada animação (quadro a quadro)

Esta parte descreve **exatamente** o que cada animação faz, com os números do `lib.tsx`. Serve para você reconhecer se algo saiu diferente. A 120 fps, 0,1 s = 12 quadros.

## 6.1 Palavra saindo do desfoque (`Words`)
| Momento | Estado da palavra |
|---|---|
| `at − 0,08 s` | começa (p = 0): invisível, desfoque 14 px, 34 px abaixo, escala 1,12 |
| `at + 0,13 s` (p≈0,5 tempo) | já opaca (opacidade = 2·p, satura cedo), desfoque ~2 px, quase no lugar (curva outExpo) |
| `at + 0,34 s` | p = 1: nítida, no lugar, escala 1 |
- Curva: `outExpo` (rápida no começo, assenta macio). Espaço entre palavras 0,26 em. Altura de linha 1,08. `letterSpacing −0,02em`.
- Palavras ainda não faladas **já ocupam o lugar** (invisíveis): a linha não se reorganiza.

## 6.2 Letras pulando e girando (`Letters`)
| Parâmetro | Valor |
|---|---|
| Atraso entre letras | `stagger` (padrão 0,035 s; 0,022–0,03 para frases longas) |
| Duração de cada letra | 0,5 s, começando em `at − 0,06 + i·stagger` |
| Movimento | cai de **−70 px** até 0 com `outBack` (passa um pouco e volta) |
| Giro | letra 0: −28°, letra 1: +28°, letra 2: −14°, repete (−1, 1, −0,5 × 28°) → 0 |
| Escala | 0,5 → 1 (com o overshoot do outBack) |
| Opacidade | 3·p (aparece no primeiro terço) |
| Tipografia | `letterSpacing −0,03em`, altura de linha 1,05 |
- Exemplo: "mensalidade?" (12 letras, stagger 0,03) leva 0,33 + 0,5 = **0,83 s** do primeiro ao último pouso.

## 6.3 Traço à mão (`Underline`)
- Caminho fixo (viewBox 400×60): `M8 34 C 110 10, 250 6, 392 22 M 360 34 C 300 40, 200 48, 120 52` — um arco que sobe e uma volta curta por baixo, como uma assinatura.
- Desenha de 0 a 100% em `dur` = 0,5 s com `outQuint`. Ponta redonda. Espessura `thick` (12 px no 9:16) constante (não escala).

## 6.4 Pop (`popStyle`)
| Tempo relativo (d = 0,5 s) | Escala | Opacidade | Giro (rot = −10°) |
|---|---|---|---|
| 0 | 0 | 0 | −10° |
| 0,17 s | ~0,8 | 1 | −2° |
| 0,3 s | ~1,08 (passa) | 1 | +0,8° |
| 0,5 s | 1 | 1 | 0° |
Antes de `at`: `opacity 0` (o elemento não aparece "antes da hora").

## 6.5 Deslizar com desfoque (`slideStyle`)
- Começa deslocado `dx` px (±900 no 9:16, ±1000–1100 em cards largos), desfoque 16 px, opacidade 0.
- `outExpo` em `d` (0,45–0,6 s): chega rápido e assenta; desfoque some junto; opacidade 2,5·p.
- Listas: alterne o lado (`j % 2 ? 900 : -900`).

## 6.6 Mãozinha (`Hand`)
| Fase | O que acontece |
|---|---|
| `at` | aparece em `from` (fora do alvo, normalmente embaixo à direita) |
| `at → tap − 0,05` | viaja até `to` com `inOut` (mínimo 0,2 s) |
| `tap` → `tap + 0,18` | **aperta**: escala 0,82 (pivô na ponta do dedo) |
| `tap` → `tap + 0,55` | **onda**: anel de 180 px, borda 5 px na cor, cresce 0,3→1,2 com `outExpo` e some (opacidade 0,5→0) |
| `leave` → `leave + 0,4` | sai: desliza +260 px x / +380 px y e some (`inExpo`) |
| `until` | some instantaneamente (para encadear com a próxima mão) |
- Desenho: mão de 60×70 (viewBox), contorno `#111` 3,2 px, miolo branco, 3 risquinhos de dedos. Tamanho padrão 110 px. A ponta do dedo é o ponto `to`.

## 6.7 Chave (`Toggle`)
- Trilho com raio total; desligado `#D9DBE3`; em `at` vira a cor `on` (instantâneo) e a bolinha branca (com sombra) corre da esquerda para a direita em 0,35 s com `outBack`.
- Largura 120 (dentro do celular) a 150; altura = 54% da largura.

## 6.8 Celular em contorno (`PhoneOutline`)
- Contorno `ink` com espessura max(6, 2,2% da largura); cantos 14% da largura; ilha preta (28% × 7% da largura) no topo; fundo branco; sombra `0 30px 60px rgba(0,0,0,0.10)`; conteúdo cortado (`overflow: hidden`).
- Entrada padrão: sobe 900 px até o lugar com `outExpo` em 0,7–0,9 s, começando 0,15–0,2 s depois do início da cena.

## 6.9 Pílula (`Pill`) — rara
- Fundo cresce da esquerda (`scaleX` 0→1, `outExpo`, 0,45 s, começando `at − 0,06`); texto aparece do desfoque 8 px em 0,3 s começando `at + 0,08`. Padding 0,16/0,55/0,2 em; peso 700; `rot −2°`.

## 6.10 Saída de texto (`outStyle`)
- `inExpo` em 0,3 s: opacidade 1→0, desfoque 0→14 px, sobe 50 px, escala 1→0,85.

## 6.11 Transições de cena (`Scene`, TR = 0,38 s)
| Entrada | Do início da cena até +0,38 s (`outExpo`) |
|---|---|
| `zoomIn` | escala 0,55→1, desfoque 18→0, opacidade 0→1 (2,5·p) |
| `whipR` | vem de +1100 px (9:16) / +1900 px (16:9) à direita, desfoque 26→0 |
| `whipL` | vem da esquerda, idem |
| `pop` | escala 1,35→1, desfoque 14→0, opacidade 0→1 |
| `rise` | sobe da altura inteira da tela |
| `none` | sem entrada (só na 1ª cena) |

| Saída | Dos últimos 0,38 s até o fim da cena (`inExpo`) |
|---|---|
| `zoomThrough` | escala 1→3,2 (atravessa a tela), desfoque 0→24, some na 2ª metade |
| `whipL` / `whipR` | sai 1100 px (1900 px) para o lado, desfoque 0→26 |
| `shrink` | escala 1→0,15, desfoque 0→12, gira até −8°, some |
| `fade` | some com desfoque 16 |
| `none` | sem saída (só na última cena) |
- Por baixo de tudo, o fundo da cena (`bg`) é sólido; a cena seguinte começa exatamente quando a anterior termina, então a saída de uma e a entrada da outra formam um movimento contínuo (ex.: sai para a esquerda, a próxima entra pela direita).

## 6.12 Câmera (detalhe na PARTE 7)
- Transform aplicado ao conteúdo: `perspective(1800px) translate(W/2 + hx, H/2 + hy) rotateX(rx) rotateY(ry) rotate(r + hr) scale(zoom × respiração) translate(−x, −y)`.
- Câmera na mão: `hx = 4·sen(2π·t/1,7)`, `hy = 3·sen(2π·t/2,3 + 1)`, `hr = 0,2°·sen(2π·t/2,9 + 2)`; respiração do zoom `1 + 0,012·sen(1,3·t)` (t = tempo desde o início da cena).
- Desfoque de movimento: velocidade da câmera × 0,0015, no máximo 3 px (só aparece em deslocamentos grandes).
- Chaves a menos de 1,2 s da anterior são descartadas → todo movimento dura no mínimo 1,2 s.
- Sem `cam`, a cena usa o "drift" antigo (aproximação de 4,5% + giro de 0,8°) — **não use**: toda cena deve ter `cam`.

## 6.13 Contadores
- Valor = `Math.round(ip(t, [início, fim], [de, até], E.outQuint))`, `fontVariantNumeric: "tabular-nums"` (os dígitos não "dançam").
- Duração típica: 0,8 s (porcentagem) a 2 s (ano). Número em pop no início. Milhar com ponto: `String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".")`.

## 6.14 Traços livres (riscar, ligar, gráfico, seta, moldura)
- SVG do tamanho do palco, `pathLength={1}`, `strokeDasharray="1 1"`, `strokeDashoffset={1 − p}`, `p = E.inOut(prog(t, início, duração))`.
- Espessura 10–16 px, pontas redondas, cor da marca (ou branco em fundo colorido). Duração 0,7–1,9 s.
- Seta: desenhe a linha e faça a ponta (`M830 1190 L890 1240 L835 1295`) aparecer com opacidade no fim.

## 6.15 QR ilustrativo
- Grade 21×21, três "olhos" 7×7 nos cantos, módulos internos por fórmula determinística `((x·7 + y·13 + x·y·3) % 5) < 2`; cada módulo aparece com atraso proporcional a (x + y), formando uma varredura diagonal de 0,6 s.

---

# PARTE 7 · Câmera que foca os itens (SUAVE)

Dois princípios valem juntos: **a tela nunca fica parada** (a câmera visita cada item) e **a câmera é calma** (o objetivo é a pessoa entender). Ou seja: **a câmera sempre se move, mas devagar e com propósito**.

### Como funciona (já implementado no `Scene`)
- `cam={[F(t, x, y, zoom, roll, tiltX, tiltY), …]}` — lista de chaves. Cada chave diz: no instante absoluto `t`, a câmera está olhando para o ponto `(x, y)` do palco, com `zoom`, giro `roll` (graus) e inclinação 3D `tiltX`/`tiltY` (graus).
- Entre chaves: interpolação `E.inOut` (sai devagar, chega devagar).
- Por cima, automaticamente: **câmera na mão** (balanço de ±4 px / ±3 px / ±0,2° em senos de 1,7 s, 2,3 s e 2,9 s), **respiração** do zoom (±1,2%) e **desfoque de movimento** proporcional à velocidade (máx. 3 px).
- Perspectiva 1800 px; o giro e a inclinação acontecem em volta do ponto focado.
- **Proteção**: chaves a menos de **1,2 s** da anterior são ignoradas (`CAM_MIN_GAP`). Se uma chave sua "não funciona", é porque está perto demais da anterior.

### Regras numéricas (siga sempre)
| Item | Valor |
|---|---|
| Chaves por cena | 2 a 6 (cena curta de 2 s: 2 chaves; cena de 6–8 s: 4–5). |
| Distância entre chaves | **≥ 1,2 s** (ideal 1,6–2,5 s). |
| Zoom | **1,0 a 1,3** (máx. 1,35). Primeira chave da cena 1,26–1,3; chave de "visão geral" 1,0–1,06. |
| Roll (`r`) | −3° a +3° (normal ±1°). Alterne o sinal entre chaves. |
| Tilt (`rx`, `ry`) | 0 a ±8° (normal 3–6°). Alterne o sinal. |
| Pan | x/y = centro do item que está sendo falado/animado. |

### Padrão de toda cena
1. **Abre perto do título** (zoom ~1,28, leve roll −1°): `F(a, cx, yTitulo, 1.28, -1)`.
2. **Vai até cada item quando ele aparece** (0,2 s antes do pop): `F(w(i) - 0.2, xItem, yItem, 1.24, 0, 3)`.
3. **Abre para mostrar o conjunto** no fim da frase: `F(w(ultima) + 0.3, cx, yCentroDoConjunto, 1.0)`.
4. **Última chave = fim da cena** com zoom levemente maior (1,04–1,1), para a saída ter movimento: `F(b, cx, y, 1.05)`.

### Exemplos reais (9:16, centro x = 540)
```tsx
// Hook com 3 itens: título → itens → visão geral
cam={[F(0, 540, 560, 1.28, -1), F(2.4, 540, 980, 1.22, 0, 3), F(SC(0)[1], 540, 1040, 1.04)]}

// Cena curta de marca (2 s): só aproxima → abre
cam={[F(SC(1)[0], 540, 880, 1.26, -2), F(SC(1)[1], 540, 960, 1.02)]}

// Lista de 3 passos + barra de link
cam={[F(SC(2)[0], 540, 640, 1.26, -1), F(w(18) - 0.2, 540, 860, 1.26, 0, 3), F(w(22) - 0.2, 540, 1240, 1.26, 1, 0, -3), F(SC(2)[1], 540, 1000, 1.04)]}

// Celular com app (foca o celular, depois a frase de baixo)
cam={[F(SC(4)[0], 540, 330, 1.28, -1), F(w(53) - 0.3, 590, 1000, 1.26, 0, 0, -3), F(w(58), 540, 1240, 1.04), F(SC(4)[1], 540, 1240, 1.08)]}

// Final (logo + slogan)
cam={[F(SC(8)[0], 540, 800, 1.26, -1), F(w(91), 540, 960, 1.0), F(SC(8)[1], 540, 960, 1.05)]}
```
16:9 (centro x = 960, y = 540): mesmas regras; itens à direita → `x ≈ 1420`; texto à esquerda → `x ≈ 520`.

### Verificação
- Nos quadros de revisão, nenhum texto pode estar cortado na borda **no momento em que é falado**.
- Nenhum quadro com desfoque forte em cena parada. Se aparecer borrão, as chaves estão próximas/distantes demais em pixels: aumente o tempo entre elas ou diminua o deslocamento.
- Itens animando fora do enquadramento = chave errada (a câmera tem que estar olhando para o item quando ele pula).

---

# PARTE 8 · Estrutura, transições, ritmo e receitas de cena

### Estrutura do vídeo (8–11 cenas, 45–60 s)
| # | Cena | Fundo | Entrada → Saída | Elementos |
|---|---|---|---|---|
| 1 | **Hook-pergunta** ("Já imaginou…?", "Já pensou…?") | branco | `none` → `whipL` | 2–3 blocos/ícones em pop, traço/moldura, palavra-chave grande |
| 2 | **Marca** ("Isso é X." / "Conheça a X.") | **cor da marca** | `whipR` → `zoomThrough` | logo branco em pop (−8 a −12°), nome em `Letters` ou sublinhado branco |
| 3–7 | **Funções / fatos** (3 a 5) | branco (1 delas na cor) | alternar `zoomIn`/`whipR` → `whipL`/`zoomThrough`/`shrink` | 1 tipo de interface por cena (lista, celular+chaves, QR, painel, contador, chat, caminho) |
| n-1 | **Benefício/preço/CTA** | cor da marca ou branco | `whipR` → `zoomThrough` | número gigante, botão clicado pela mão, a única pílula (se houver) |
| n | **Final** (marca + slogan) | branco | `pop` → `none`, `drift={0.4}` | logo colorido em pop, nome em `Letters`, slogan com `Underline`; segura 3–5 s |

- **Alternância**: nunca duas cenas seguidas com a mesma entrada. Padrão usado: `none/whipL`, `whipR/zoomThrough`, `zoomIn/whipL`, `whipR/zoomThrough`, `zoomIn/shrink`, `whipR/zoomThrough`, `zoomIn/whipL`, `whipR/zoomThrough`, `pop/none`. A saída de uma cena "combina" com a entrada da próxima (whipL→whipR, zoomThrough→zoomIn).
- Cenas na cor da marca: 2 a 3 no vídeo (marca, 1 função de destaque, preço). Nunca duas seguidas.

### Ritmo
- Uma frase da locução = uma cena (2–8 s).
- Dentro da cena, **algo novo a cada 0,3–0,6 s**: palavra, letra, pop, slide, mão, traço, chave, número.
- Durações: texto 0,4–0,5 s; pop 0,45–0,6 s; slide 0,45–0,6 s; traço 0,5–1,2 s; contador 0,8–2 s; celular subindo 0,7–0,9 s.
- Antecipação: elementos entram **0,1–0,4 s antes** da palavra correspondente (`w(i) - 0.2`), o texto exatamente na palavra (`Words` já antecipa 0,08 s).
- Listas: itens em sequência com 0,1–0,15 s entre eles quando aparecem juntos; ou cada item na sua palavra falada.

### Receitas (copie e adapte; código completo nos exemplos)

### A · Hook com blocos + moldura que junta ("tudo em um lugar só?") — `PARTE 15 · Magalu`, cena 1
3 `Tile` (200 px) em linha y≈890 com rótulo embaixo, cada um em pop na sua palavra; `rect rx=56` desenhado em volta dos três; embaixo `Words` "tudo em" + `Letters` "um lugar só?" + `Underline`.

### B · Hook com riscado ("sem pagar mensalidade?") — `PARTE 15 · Soul Pay`, cena 1
Bloco da loja (ativo, cor) + card "Mensalidade" (SOFT) lado a lado; traço grosso (16 px) da cor risca o card na palavra "mensalidade".

### C · Gerações/linha do tempo — `PARTE 15 · Itaú`, cena 1
3 blocos de pessoa crescentes (170/210/250) alinhados pela base; traço ondulado atravessa os três.

### D · Revelação da marca — todos os exemplos, cena 2
Fundo na cor; `Words` "Isso é"/"Conheça a" (branco 80%); logo branco em `popStyle(t, w(i)-0.25, 0.65, -8)`; `Letters` do nome ou `Underline` branco.

### E · Contador de ano/número — Itaú cena 3, Magalu cena 3
`Words` "Em" pequeno; número 230–330 px na cor com `ip(t, [w(a)-0.1, w(b)+0.3], [1900, 1945], E.outQuint)` e `popStyle`; depois cards que deslizam (cidades, fatos).

### F · Cartões de estatística — Magalu cena 4
3 cards largos (860×280) empilhados, cada um com bloco-ícone + número contando + rótulo; o último (mais importante) na cor com texto branco e número maior. Câmera desce card a card.

### G · Checklist — Soul Pay cena 3, Magalu cena 5
Linhas (860×140–180) que deslizam alternando lados; quadradinho com contorno vira bloco na cor com ✓ em pop 0,2–0,3 s depois da palavra; fundo da linha vira LIGHT.

### H · Celular com chaves e mão — Magalu cena 6, Itaú cena 5
Celular 580×1000 sobe; logo pequeno no topo; 3 linhas (ícone + nome + `Toggle`); três `Hand` encadeadas com `until` tocando cada chave na palavra; frase final embaixo.

### I · Checkout Pix / QR — Soul Pay cena 4
Celular 500×900; QR ilustrativo desenhado módulo a módulo (componente `QR`); botão "Copia e cola" tocado vira "Código copiado" (cor mais escura); toast "Pagamento confirmado" com ✓ em pop.

### J · Entrega/divisão — Soul Pay cena 5
Bloco grande (caixa) em pop; dois traços em curva saem dele e se dividem até dois blocos (e-mail / site).

### K · Painel/dashboard — Soul Pay cena 6
Card grande com contorno INK, marca pequena + "Minha loja"; grade 2×2 de mini-cards em pop na palavra; gráfico de linha desenhado (`inOut`, 1,4 s).

### L · Cupom + chat — Soul Pay cena 7
Cupom na cor (texto branco, divisória tracejada vertical, "10%"); balão cinza à esquerda (`borderRadius: "44px 44px 44px 12px"`) e balão na cor à direita (`"44px 44px 12px 44px"`), em pop com som `message`.

### M · Preço — Soul Pay cena 8
Fundo na cor; "R$ 0" 250 px branco; "4%" 300 px; a única `Pill` branca com texto na cor escura.

### N · Caminho desenhado (jornada) — Magalu cena 7
Fundo na cor; 4 nós (blocos brancos 180 px com ícone na cor + rótulo) em zigue-zague; caminho em S branco desenhado ligando os nós; nós em pop ao longo do traço.

### O · Junção (fusão/união) — Itaú cena 4
Dois cards com contorno deslizam de lados opostos, "+" entre eles; na palavra "uniram" eles se aproximam/encolhem/somem e um card único na cor cresce com `outBack`.

### P · Download/botão — Magalu cena 8
Celular com ícone do app; botão "Baixar" tocado pela mão vira barra de progresso (0→100%) e depois "✓ Pronto".

### Q · Final — todos
Logo em pop (`-8` a `-12°`, 0,65 s) em y≈760–800; nome em `Letters` 130 px; slogan: `Words` + `Letters` na cor + `Underline`; câmera abrindo; segura ≥ 3 s depois da última palavra.

### 16:9
Use o vídeo Loop (PARTE 15): mesmas receitas lado a lado (texto à esquerda, interface à direita), janelas de app (barra com 3 bolinhas), cards em linha. Troque `FORMAT` para `"16x9"` no `lib.tsx` (W=1920, H=1080; chicote 1900 px).

---

# PARTE 9 · Som

### Camadas
1. **Locução** (`public/audio/voiceover.mp3`, volume 1).
2. **Trilha** (`public/audio/music.mp3`, 60 s) com *ducking*: 0,16 fora da fala, 0,07 durante a fala (de 0,15 s antes a 0,25 s depois de cada palavra), fade-out nos últimos 2,5 s. Vídeo > 60 s: faça loop com `ffmpeg -stream_loop 1 -i music.mp3 -t <TOTAL> -af afade=t=out:st=<TOTAL-2.5>:d=2.5 music.mp3`.
3. **Efeitos** (`public/sfx/`), cada um como `<Sequence from={at*fps} durationInFrames={1.6*fps}><Audio volume={v}/></Sequence>`.

O componente `Soundtrack` e a função `sfxList()` estão prontos em todo exemplo. Só a lista de `add(...)` muda por vídeo.

### Mapa ação → arquivo → volume
| Ação | Arquivo | Volume | Quando |
|---|---|---|---|
| Troca de cena (antes) | `whoosh.mp3` / `zoom.mp3` (a cada 3 trocas, a 2ª é zoom) | 0,30–0,32 | `b - 0.32` |
| Troca de cena (corte) | `swoosh.mp3` | 0,16–0,18 | `b - 0.02` |
| Primeiro texto do vídeo | `text-in.mp3` | 0,20–0,22 | 0,02 s |
| Pop de bloco/ícone/card/número | `pop.mp3` | 0,20–0,30 | no instante do pop |
| Slide de card/celular | `swish.mp3` | 0,20–0,26 | no início do slide |
| Mão tocando | `click.mp3` | 0,34–0,36 | `tap` |
| Chave ligando | `toggle.mp3` | 0,24–0,26 | `at` da chave |
| Traço/sublinhado/risco/linha | `scribble.mp3` | 0,22–0,28 | início do traço |
| Balão de chat | `message.mp3` | 0,30 | pop do balão |
| Confirmação/sucesso/fim de contador | `notify.mp3` | 0,26–0,30 | chegada |
| Logo/marca | `reveal.mp3` 0,34 + `sparkle.mp3` 0,22–0,24 | | pop do logo |
| Antes da palavra grande (`Letters` de impacto) | `zoomin.mp3` | 0,18–0,20 | `at - 0.15` (no máximo 3–4 no vídeo) |
| Batida final | `stamp.mp3` | 0,18–0,20 | ~1 s depois do sublinhado final |
| Contador | `tick.mp3` **uma vez** | 0,12–0,14 | início da contagem (+ `notify`/`pop` no fim) |

### PROIBIDO (barulho de "engrenagem" repetido estraga o vídeo)
- ❌ **Tique por palavra falada** (`words.forEach(... "tick.mp3" ...)`) — não existe mais.
- ❌ Rajada de tiques em contador (`for (let i = 0; i < 10; i++) add(... "tick.mp3" ...)`).
- ❌ Mais de ~4 `tick.mp3` no vídeo inteiro.
- ❌ Som em elemento que não aparece/não é uma ação.
- Regra geral: **um som por ação visível importante**. Se três itens entram juntos, um `pop` por item com volume menor (0,18–0,22), não mais.

### Origem dos sons
Todos os arquivos de `public/sfx/` e a trilha são gerados por `scripts/gerar_sons.py` (PARTE 14). Opcional: `scripts/baixar_sfx_mixkit.py` troca `zoom`, `swoosh`, `sparkle` e `zoomin` pelas versões do Mixkit (licença Mixkit: uso livre em vídeos, sem redistribuir os arquivos soltos).

---

# PARTE 10 · Roteiro e voz

### Fórmula do roteiro (85–100 palavras, PT-BR falado, frases curtas)
1. **Hook-pergunta**: "Já imaginou…?", "Já pensou em…?", "Tá cansado de…?".
2. **Marca**: "Isso é X." / "Conheça a X." (frase curta, cena própria).
3. **3–5 funções/fatos**, cada um numa frase que vira uma cena com um elemento de interface.
4. **Benefício ou preço** (número grande).
5. **CTA** opcional ("Baixe o app e confira.").
6. **Assinatura**: "X. <slogan/missão oficial>."

Exemplo real (Soul Pay, 97 palavras, 57 s):
> Já pensou em ter sua loja virtual sem pagar mensalidade? Conheça a Soul Pay. Você cadastra os produtos, personaliza a vitrine e compartilha o link. O cliente paga no Pix, com QR Code ou copia e cola, e a confirmação é automática. Pagamento aprovado? O produto digital é entregue na hora, por e-mail e no site. No painel, você vê vendas, pedidos, produtos e clientes, tudo num só lugar. E ainda cria cupons e conversa com o comprador. Zero de mensalidade: você só paga quatro por cento quando vender. Soul Pay. Sua loja virtual, grátis para começar.

Regras:
- Números **por extenso** no roteiro ("mil novecentos e quarenta e cinco", "quatro por cento"); na tela, em algarismos.
- Pontuação marca as cenas: `.` `?` `!` `:` terminam frase (pausa maior); `,` pausa curta.
- Só fatos confirmados (ver 01).

### Voz (Gemini TTS, sempre feminina; você escolhe, sem pedir aprovação)
`voice/src/data/voice.json`:
```json
{
  "model": "gemini-3.8-flash-tts",
  "voice": "Leda",
  "why": "<marca>: por que essa voz combina.",
  "style": "Português do Brasil, sotaque natural. Mulher jovem, uns 25 anos, voz leve, animada e próxima, com sorriso na voz, sem tom de locutora de rádio. Ritmo CALMO e pausado, com pausas entre as frases. Fale 'Soul Pay' como 'sôul pêi', 'Pix' como 'píks'. Não leia estas instruções; leia só o texto."
}
```
Vozes femininas já usadas e o tom: **Leda** (jovem, animada — fintech/loja), **Kore** (firme, acolhedora — banco), **Sulafat** (calorosa — varejo familiar), **Zephyr** (brilhante, moderna — tecnologia), **Despina** (suave, elegante — premium), **Laomedeia** (alegre — marketplace), **Aoede** (leve — estúdio). Outras femininas: Achernar, Autonoe, Callirrhoe, Erinome, Gacrux, Pulcherrima, Vindemiatrix.
Sempre inclua no `style`: "Português do Brasil", idade, tom, **"Ritmo CALMO e pausado"**, a pronúncia dos nomes estrangeiros e **"Não leia estas instruções; leia só o texto."**
Se a cota do `gemini-3.8-flash-tts` acabar: `"model": "gemini-3.8-flash-lite-tts"`.

### Vídeos em inglês (ou outro idioma)
- `voice/script.txt` no idioma do vídeo; textos na tela no mesmo idioma.
- `voice/src/data/voice.json` com o campo **`"profile"`** no idioma (ex.: `"American female voice-over artist, early thirties."`) e o `style` escrito em inglês (sotaque, idade, tom, "CALM, unhurried pace", pronúncia de nomes, "Do not read these instructions; read only the transcript.").
- Gerar: `ALIGN_LANG=en npm run voice` (o alinhamento do faster-whisper roda em inglês).
- Exemplo de `voice.json` em inglês:
```json
{
  "model": "gemini-3.8-flash-tts",
  "voice": "Despina",
  "profile": "American female voice-over artist, early thirties.",
  "why": "Premium eyewear brand: smooth, elegant female voice.",
  "style": "American English, natural accent. A woman in her early thirties, smooth, warm and elegant voice, confident and friendly, with a subtle smile, not a radio announcer. CALM, unhurried pace with clear pauses between sentences. Do not read these instructions; read only the transcript."
}
```
- Inglês fala mais rápido: use ~95–110 palavras para 45–55 s.

### Pipeline (`npm run voice`, na pasta do projeto)
1. `voice/tools/gemini_tts.py` < `voice/script.txt` → voz (1 pedido; repete se a duração indicar que leu as instruções).
2. `voice/tools/align_words.py` → tempo REAL de cada palavra (faster-whisper `small`, CPU), casado com o roteiro.
3. `voice/tools/add_pauses.py 0.6` → insere 0,6 s de silêncio entre frases e desloca os tempos.
4. Copia `voiceover.mp3` e `voiceover-timings.json` para `public/audio/`.

Requisitos: `GEMINI_API_KEY` (variável de ambiente ou `.env` no projeto, fora do git), `ffmpeg`, Python 3, venv com `faster-whisper` e `numpy` (`ALIGN_PY` aponta para o python dele; padrão `~/.venv-align/bin/python`).

### Sem chave do Gemini (prévia)
`npm run timings` (`scripts/estimate_timings.py`): tempo por sílaba (0,08 + 0,17 s/sílaba + 0,05 s entre palavras; +0,6 s após `.?!`; +0,25 s após `,:`), voz muda do mesmo tamanho. Entregue como **"prévia sem voz"** (master com `PREVIA=1`) e avise que, com a chave, as cenas se reajustam sozinhas à fala real (porque tudo usa `w(i)`).

### Formato do `voiceover-timings.json`
`{ "words": [ { "word": "Já", "start": 0.3, "end": 0.6 }, … ] }` — índice = posição da palavra no roteiro (separado por espaço, pontuação junto). `w(i)` usa `start`.

---

# PARTE 11 · Revisão, render e entrega

### 1. Tipos
`npx tsc --noEmit` sem erros (o `tsconfig` é estrito, com `noUncheckedIndexedAccess`: use `words[i]!`).

### 2. Quadros de revisão (OBRIGATÓRIO antes de renderizar)
```bash
node scripts/stills.mjs 1.2,2.4,3.3,5.3,6.9,9.5,12.6,14.3,15.9,18.5,21.6,25,27.6,30,32.6,35.3,39.4,40.2,42.6,44.5,46.5,48.3,50,55 out/stills
python3 scripts/grid.py out/stills 8
```
Escolha 20–24 instantes: 2–3 por cena (logo depois da entrada, no meio de cada item, no fim). Abra `out/stills/grid.png` e confira:
- [ ] Nada sobreposto (texto em cima de card, mão em cima de texto, linha cortando rótulo).
- [ ] Nenhum texto cortado na borda no momento em que é falado.
- [ ] Câmera olhando para o item que está animando; nada borrado em cena parada.
- [ ] Nenhum círculo/anel/mancha, nenhum enfeite solto, tudo alinhado na grade.
- [ ] Ênfase grande e colorida; no máximo 1 pílula.
- [ ] Uma única mão por vez.
- [ ] Cor da marca correta; logo oficial nítido.
Corrija e gere de novo até passar. Para ver um quadro em tamanho maior, abra o PNG solto.

### 3. Render
- **Final (com voz)**: `sh scripts/render.sh <marca>` → `out/<marca>-limpa.mp4` e `out/<marca>-marca-dagua.mp4` (H.264 CRF 18, yuv420p, AAC 320k, 120 fps, master −14 LUFS).
- **Prévia sem voz**:
```bash
python3 scripts/baixar_sfx_mixkit.py
npx remotion render Motion out/raw-limpa.mp4 --codec=h264 --crf=18 --pixel-format=yuv420p --audio-codec=aac --audio-bitrate=320k --log=error
PREVIA=1 sh scripts/master.sh out/raw-limpa.mp4 out/<marca>-9x16-previa-sem-voz.mp4
```
Render de ~55 s a 120 fps leva 10–20 min (6.600 quadros). Rode em segundo plano.

### 4. Conferência final
```bash
ffprobe -v error -show_entries stream=r_frame_rate,width,height:format=duration -of csv=p=0 out/<arquivo>.mp4
```
Tem que dar `120/1`, resolução certa (1080×1920 ou 1920×1080) e duração ≥ 45 s.

### 5. Mensagem de entrega (o que dizer ao usuário)
- Formato, cor, duração, fps; o que tem em cada parte; fatos usados (com fonte); o que é ilustrativo; voz escolhida e por quê; se é prévia sem voz, o que falta (chave). Curto e direto.

### Checklist final (todo vídeo)
- [ ] 120 fps, ≥ 45 s, duas versões (limpa + marca d'água), −14 LUFS.
- [ ] Fundo branco dominante + 1 cor; cenas na cor só como pontuação (2–3).
- [ ] Todo texto com `Words`/`Letters` sincronizado à fala (`w(i)`).
- [ ] Cada cena com ≥ 2 elementos do estilo (traço, mão, interface, bloco-ícone, contador).
- [ ] Toda cena com `cam`; chaves ≥ 1,2 s; zoom ≤ 1,3.
- [ ] Nenhum círculo/anel/mancha de fundo; nada fora do lugar.
- [ ] Ênfase = palavra maior; ≤ 1 pílula.
- [ ] Transições alternadas, nenhuma troca seca.
- [ ] Som em cada ação importante; nenhum tique por palavra; ≤ ~4 ticks no vídeo.
- [ ] Logo oficial; fatos confirmados.

---

# PARTE 12 · Erros que já aconteceram (não repita)

| Erro | Causa | Como evitar |
|---|---|---|
| Duas mãozinhas na tela ao mesmo tempo | `Hand` sem `until` | Encadeie com `until` na anterior = `at` da próxima. |
| Círculos/anel atrás do texto encostando nas letras | `Rings`/`Glow` | Proibidos. Não existem mais no lib. |
| Câmera "chicoteando", tudo borrado | chaves a 0,5–0,7 s umas das outras | ≥ 1,2 s entre chaves, zoom ≤ 1,3. |
| "Tela parada" | cena sem `cam` | Toda cena tem `cam` com 2+ chaves. |
| Barulho de engrenagem o vídeo inteiro | tique em cada palavra + rajadas em contador | Sem tique por palavra; 1 tick por contador. |
| Grifado (pílula preta) demais | ênfase em pílula | Ênfase = `Letters` grande na cor. ≤ 1 `Pill`. |
| Elemento da cena seguinte aparecendo na anterior | elemento com opacidade 1 antes do `at` | Use `popStyle`/`slideStyle` (ficam `opacity: 0` antes) ou condicione `t > …`. |
| Giro da câmera em volta do canto da tela | transform sem centralizar | Já resolvido no `Scene` (gira em volta do ponto focado). Não mexa. |
| Logo errado (ícone de outra coisa) | SVG pego da página sem conferir | Renderize o SVG para PNG e olhe antes de usar; prefira Wikimedia com autor = marca, conferido com o site. |
| Linha do caminho passando por cima do rótulo | path sem considerar o texto | Confira na folha de revisão; desvie o path ou suba o rótulo. |
| Folha de revisão fora de ordem | glob em ordem alfabética | `scripts/grid.py` ordena por tempo. |
| Texto "andando" para o lado quando palavras aparecem | — | Normal: `Words` reserva o espaço das palavras ainda invisíveis. Não "conserte". |
| Render quebrado por `types: ["node"]` | tsconfig | Use o `tsconfig.json` do template (`types: []`). |
| Fatos inventados | pressa | Só o que está na fonte oficial; avise o que é ilustrativo. |
| Site da marca bloqueia acesso (403/anti-bot) | proteção | Não contorne. Use a busca (trechos da página oficial) ou peça os arquivos ao usuário. |

---

# PARTE 13 · Fluxo completo de um vídeo novo

Siga **na ordem**. Não pule a revisão visual.

## Passo 1 · Entender o pedido
- Marca/site, formato (9:16 padrão; 16:9 se pedirem), cor (a da marca; "preto e branco" se pedirem).
- Se faltar o site, procure o oficial. Não invente produto.

## Passo 2 · Pesquisa (só fatos oficiais)
- Leia o site oficial: o que é, como funciona (3–5 funções), números públicos, slogan/missão.
- **Cor**: tire do CSS do site (a cor que mais aparece em botões/destaques). Ex.: `grep -oiE '#[0-9a-f]{6}' style.css | sort | uniq -c | sort -rn | head`.
- **Logo**: SVG/PNG oficial do site (ou Wikimedia Commons com autor = a própria marca, conferido com o site). Renderize e **olhe** antes de usar.
- Anote a fonte de cada fato.

## Passo 3 · Projeto
```bash
cp -r openmotionkit-project <marca>-motion && cd <marca>-motion && rm -rf out/* && mkdir -p out
cp <logo> public/brand/
```
Formato 16:9: troque `FORMAT` no `src/lib.tsx`.

## Passo 4 · Roteiro e voz
- `voice/script.txt` com a fórmula da PARTE 10 (85–100 palavras).
- `voice/src/data/voice.json` com a voz feminina escolhida e a direção (sempre "Ritmo CALMO e pausado" e "Não leia estas instruções").
- Com chave: `npm run voice`. Sem chave: `npm run timings`.

## Passo 5 · Índice das palavras
```bash
python3 -c "import json;[print(i,w['word'],w['start']) for i,w in enumerate(json.load(open('public/audio/voiceover-timings.json'))['words'])]"
```
Marque o índice da 1ª palavra de cada frase → `B = [0, w(i1), w(i2), …]`.

## Passo 6 · Plano de cenas (escreva antes de codar)
Para cada cena: frase, fundo (branco ou cor), entrada/saída, elementos (receita da PARTE 8), ênfase (qual palavra vira `Letters` grande), chaves de câmera, sons.
Regra: 8–11 cenas; 2–3 com fundo na cor; nenhuma cena com menos de 2 elementos do estilo; no máximo 1 pílula.

## Passo 7 · Código
Comece pelo esqueleto abaixo (ou copie um vídeo da PARTE 15 e troque o conteúdo). Mantenha `Soundtrack`, marca d'água e cabeçalho iguais.

## Passo 8 · Tipos
`npx tsc --noEmit` até não sobrar erro.

## Passo 9 · Revisão visual
```bash
node scripts/stills.mjs <20-24 tempos> out/stills && python3 scripts/grid.py out/stills 8
```
Olhe a folha. Corrija. Repita (PARTE 11).

## Passo 10 · Render e entrega
- Com voz: `sh scripts/render.sh <marca>` → `out/<marca>-limpa.mp4` e `out/<marca>-marca-dagua.mp4`.
- Sem voz: render só `Motion` + `PREVIA=1 sh scripts/master.sh …`.
- `ffprobe` para conferir 120 fps, resolução e duração.
- Mensagem de entrega (PARTE 16).

## Esqueleto pronto de `src/Video.tsx` (9:16)
Troque o que está entre `<…>`. A estrutura, o `Soundtrack` e a marca d'água ficam iguais.

```tsx
import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile, useVideoConfig } from "remotion";
import T from "../public/audio/voiceover-timings.json";
import {
  Center, E, F, FONT, Hand, Letters, PhoneOutline, Scene, Toggle, Underline, Words, W, H,
  ip, popStyle, prog, slideStyle, useSec,
} from "./lib";

/* <Marca> · 9:16 · <cor> e branco · câmera suave focando os itens · sem círculo/mancha · ênfase = palavra maior */
const BG = "#FFFFFF", AC = "<#cor-da-marca>", ACD = "<#cor-escura>", INK = "#111111", MUTE = "#9A9AA3", SOFT = "#F4F4F6", LIGHT = "<#cor-clarinha>";
const WATERMARK = "<Seu Estúdio>";

const words = (T as { words: { word: string; start: number; end: number }[] }).words;
const w = (i: number) => words[i]!.start;
export const TOTAL = Math.max(45, Math.ceil(words[words.length - 1]!.end + 4.5));
const B = [0, w(<i1>), w(<i2>), w(<i3>), w(<i4>), w(<i5>), w(<i6>), w(<i7>)].map((x, i) => (i === 0 ? 0 : x - 0.12));
const SC = (i: number): [number, number] => [B[i]!, i + 1 < B.length ? B[i + 1]! : TOTAL];

const Logo: React.FC<{ s: number; white?: boolean }> = ({ s, white }) => (
  <Img src={staticFile(white ? "brand/<logo-branco>.svg" : "brand/<logo>.svg")} style={{ width: s, display: "block" }} />
);

/* ícones de traço (viewBox 0 0 100 100, traço 6, pontas redondas) — copie os que precisar dos vídeos da PARTE 15 */
const P: Record<string, (c: string) => React.ReactNode> = {
  box: (c) => <><path d="M50 8 L88 28 V72 L50 92 L12 72 V28 Z" fill="none" stroke={c} strokeWidth="6" strokeLinejoin="round" /><path d="M12 28 L50 48 L88 28 M50 48 V92" fill="none" stroke={c} strokeWidth="6" strokeLinejoin="round" /></>,
  check: (c) => <path d="M18 52 L40 74 L84 26" fill="none" stroke={c} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />,
};
const Ic: React.FC<{ k: string; s: number; c?: string }> = ({ k, s, c = INK }) => (
  <svg width={s} height={s} viewBox="0 0 100 100" style={{ overflow: "visible", display: "block" }}>{P[k]!(c)}</svg>
);
const Tile: React.FC<{ k: string; s?: number; on?: boolean }> = ({ k, s = 200, on }) => (
  <div style={{ width: s, height: s, borderRadius: s * 0.24, background: on ? AC : SOFT, display: "grid", placeItems: "center" }}><Ic k={k} s={s * 0.54} c={on ? "#fff" : INK} /></div>
);

/* marca d'água em MOSAICO: muitos "◆ <estúdio>" pequenos, bem transparentes, em diagonal e andando devagar
   (dá para ver o vídeo inteiro, mas é muito difícil de remover; nada de marca gigante no meio) */
const Watermark: React.FC<{ t: number; text: string }> = ({ t, text }) => {
  const rowH = 120, colW = 330, rows = Math.ceil(Math.hypot(W, H) / rowH) + 4, cols = Math.ceil(Math.hypot(W, H) / colW) + 2;
  const dx = (t * 12) % colW, dy = (t * 7) % rowH;
  return (
    <AbsoluteFill style={{ pointerEvents: "none", overflow: "hidden" }}>
      <div style={{ position: "absolute", left: W / 2, top: H / 2, width: 0, height: 0, transform: "rotate(-24deg)" }}>
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} style={{ position: "absolute", left: -((cols * colW) / 2) + dx - (r % 2) * (colW / 2), top: -((rows * rowH) / 2) + r * rowH + dy, display: "flex", whiteSpace: "nowrap" }}>
            {Array.from({ length: cols + 1 }).map((__, c) => (
              <div key={c} style={{ width: colW, font: `800 28px ${FONT}`, letterSpacing: "0.06em", color: "rgba(128,128,136,0.13)" }}>◆ {text}</div>
            ))}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

export const Video: React.FC<{ watermark: boolean }> = ({ watermark }) => {
  const t = useSec();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: BG, fontFamily: FONT }}>
      {/* 1 · hook-pergunta */}
      <Scene t={t} a={SC(0)[0]} b={SC(0)[1]} bg={BG} enter="none" exit="whipL"
        cam={[F(0, 540, 560, 1.28, -1), F(2.4, 540, 980, 1.22, 0, 3), F(SC(0)[1], 540, 1040, 1.04)]}>
        {() => (
          <>
            <Center y={520}><Words t={t} size={62} color={MUTE} weight={600} items={[{ w: "<Já>", at: w(0) }, { w: "<pensou>", at: w(1), color: INK, weight: 800 }]} /></Center>
            <div style={{ position: "absolute", left: 540 - 150, top: 780, ...popStyle(t, w(<i>) - 0.15, 0.55, -10) }}><Tile k="box" s={300} on /></div>
            <Center y={1360}><Letters t={t} text="<palavra-chave?>" at={w(<i>)} size={120} color={AC} weight={800} stagger={0.03} /><Underline t={t} at={w(<i>) + 0.4} width={480} color={AC} thick={12} /></Center>
          </>
        )}
      </Scene>

      {/* 2 · marca */}
      <Scene t={t} a={SC(1)[0]} b={SC(1)[1]} bg={AC} enter="whipR" exit="zoomThrough"
        cam={[F(SC(1)[0], 540, 880, 1.26, -2), F(SC(1)[1], 540, 960, 1.02)]}>
        {() => (
          <Center y={960}>
            <Words t={t} size={70} color="rgba(255,255,255,0.85)" weight={600} items={[{ w: "<Isso>", at: w(<i>) }, { w: "<é>", at: w(<i>) }]} />
            <div style={{ height: 40 }} />
            <div style={popStyle(t, w(<i>) - 0.25, 0.65, -8)}><Logo s={600} white /></div>
          </Center>
        )}
      </Scene>

      {/* 3…n-1 · funções (use as receitas da PARTE 8) */}

      {/* n · final */}
      <Scene t={t} a={SC(<n>)[0]} b={SC(<n>)[1]} bg={BG} enter="pop" exit="none" drift={0.4}
        cam={[F(SC(<n>)[0], 540, 800, 1.26, -1), F(w(<i>), 540, 960, 1.0), F(SC(<n>)[1], 540, 960, 1.05)]}>
        {() => (
          <>
            <Center y={780}><div style={popStyle(t, w(<i>) - 0.25, 0.65, -10)}><Logo s={600} /></div></Center>
            <Center y={1200}>
              <Words t={t} size={64} color={MUTE} weight={600} items={[{ w: "<Slogan>", at: w(<i>), color: INK, weight: 800 }]} />
              <Letters t={t} text="<parte forte.>" at={w(<i>)} size={110} color={AC} weight={800} />
              <Underline t={t} at={w(<i>) + 0.4} width={460} color={AC} thick={12} />
            </Center>
          </>
        )}
      </Scene>

      {watermark && <Watermark t={t} text={WATERMARK} />}
      <Soundtrack fps={fps} />
    </AbsoluteFill>
  );
};

/* som: só nas ações importantes (sem tique por palavra, sem rajada de tick) */
type Fx = [number, string, number];
const sfxList = (): Fx[] => {
  const L: Fx[] = [];
  B.slice(1).forEach((b, i) => { L.push([b - 0.32, i % 3 === 1 ? "zoom.mp3" : "whoosh.mp3", 0.3]); L.push([b - 0.02, "swoosh.mp3", 0.16]); });
  const add = (at: number, f: string, v: number) => L.push([at, f, v]);
  add(0.02, "text-in.mp3", 0.2);
  // add(<instante do pop>, "pop.mp3", 0.26); add(<tap>, "click.mp3", 0.34); add(<logo>, "reveal.mp3", 0.34); add(<logo>, "sparkle.mp3", 0.22); …
  return L.filter(([at]) => at >= 0 && at < TOTAL);
};

const Soundtrack: React.FC<{ fps: number }> = ({ fps }) => {
  const fx = React.useMemo(sfxList, []);
  return (
    <>
      <Audio src={staticFile("audio/voiceover.mp3")} volume={1} />
      <Audio src={staticFile("audio/music.mp3")} volume={(f) => {
        const s = f / fps; const talking = words.some((x) => s > x.start - 0.15 && s < x.end + 0.25);
        return (talking ? 0.07 : 0.16) * Math.max(0, Math.min(1, (TOTAL - s) / 2.5));
      }} />
      {fx.map(([at, f, v], i) => (
        <Sequence key={i} from={Math.round(at * fps)} durationInFrames={Math.round(1.6 * fps)}>
          <Audio src={staticFile(`sfx/${f}`)} volume={v} />
        </Sequence>
      ))}
    </>
  );
};
```

---

# PARTE 14 · Código-fonte do projeto-modelo (copiar inteiro)

Crie cada arquivo com o conteúdo **exato** abaixo (caminho relativo à pasta do projeto). Não altere números, curvas nem nomes.

## 14.1 · `package.json`

```json
{
  "name": "openmotionkit-project",
  "private": true,
  "type": "module",
  "scripts": {
    "studio": "remotion studio",
    "typecheck": "tsc --noEmit",
    "sfx": "python3 scripts/baixar_sfx_mixkit.py",
    "timings": "python3 scripts/estimate_timings.py",
    "voice": "cd voice && python3 tools/gemini_tts.py < script.txt && ${ALIGN_PY:-$HOME/.venv-align/bin/python} tools/align_words.py && python3 tools/add_pauses.py ${PAUSE:-0.6} && cp public/audio/voiceover.mp3 public/audio/voiceover-timings.json ../public/audio/",
    "stills": "node scripts/stills.mjs",
    "render": "sh scripts/render.sh",
    "sons": "python3 scripts/gerar_sons.py"
  },
  "dependencies": {
    "@remotion/cli": "4.0.540",
    "@remotion/fonts": "4.0.540",
    "@remotion/paths": "4.0.540",
    "@remotion/renderer": "4.0.540",
    "@remotion/bundler": "4.0.540",
    "react": "19.1.1",
    "react-dom": "19.1.1",
    "remotion": "4.0.540"
  },
  "devDependencies": {
    "@types/react": "19.1.10",
    "typescript": "5.9.2"
  }
}
```

## 14.2 · `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "jsx": "react-jsx",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "noEmit": true,
    "types": []
  },
  "include": ["src", "scripts", "remotion.config.ts"]
}
```

## 14.3 · `remotion.config.ts`

```ts
import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setJpegQuality(95);
Config.setOverwriteOutput(true);
Config.setConcurrency(4);
Config.setEntryPoint("src/index.ts");
```

## 14.4 · `.gitignore`

```text
node_modules
out/
voice/public/audio/*.wav
.env
```

## 14.5 · `src/index.ts`

```ts
import { registerRoot } from "remotion";
import { Root } from "./Root";
registerRoot(Root);
```

## 14.6 · `src/Root.tsx`

```tsx
import React from "react";
import { Composition, staticFile } from "remotion";
import { loadFont } from "@remotion/fonts";
import { Video, TOTAL } from "./Video";
import { W, H } from "./lib";

/** 120 fps OBRIGATÓRIO (regra do estúdio). As animações são em segundos, então o fps não muda a velocidade. */
export const FPS = 120;

loadFont({ family: "Outfit", url: staticFile("fonts/outfit-latin.woff2"), weight: "100 900", unicodeRange: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD" });
loadFont({ family: "Outfit", url: staticFile("fonts/outfit-latin-ext.woff2"), weight: "100 900", unicodeRange: "U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+1E00-1E9F, U+20A0-20AB, U+20AD-20C0, U+2C60-2C7F, U+A720-A7FF" });

export const Root: React.FC = () => (
  <>
    <Composition id="Motion" component={Video} durationInFrames={Math.round(TOTAL * FPS)} fps={FPS} width={W} height={H} defaultProps={{ watermark: false }} />
    <Composition id="MotionWatermark" component={Video} durationInFrames={Math.round(TOTAL * FPS)} fps={FPS} width={W} height={H} defaultProps={{ watermark: true }} />
  </>
);
```

## 14.7 · `src/lib.tsx`

```tsx
/**
 * MOTION CLEAN · núcleo do estilo.
 * NÃO ALTERE os números deste arquivo: eles SÃO o estilo (curvas, durações, desfoques, câmera).
 * TUDO em SEGUNDOS (não em quadros): o mesmo código roda a 30, 60 ou 120 fps sem mudar a velocidade.
 * Formato: troque só FORMAT ("9x16" = 1080×1920, padrão; "16x9" = 1920×1080).
 */
import React from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export const FORMAT = "9x16" as "9x16" | "16x9"; // troque para "16x9" no formato horizontal
export const W = FORMAT === "9x16" ? 1080 : 1920, H = FORMAT === "9x16" ? 1920 : 1080;
/** distância do chicote lateral (1100 px no 9:16, 1900 px no 16:9) */
const WHIP = FORMAT === "9x16" ? 1100 : 1900;
export const FONT = "Outfit, sans-serif";

/* ---------- tempo ---------- */
export const useSec = () => { const f = useCurrentFrame(); const { fps } = useVideoConfig(); return f / fps; };
export const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
export const prog = (t: number, t0: number, d: number) => clamp01((t - t0) / d);
export const E = {
  outExpo: Easing.bezier(0.16, 1, 0.3, 1),
  outBack: Easing.bezier(0.34, 1.56, 0.64, 1),
  outQuint: Easing.bezier(0.22, 1, 0.36, 1),
  inOut: Easing.bezier(0.65, 0, 0.35, 1),
  inExpo: Easing.bezier(0.7, 0, 0.84, 0),
};
export const lerp = (a: number, b: number, p: number) => a + (b - a) * p;
export const ip = (t: number, ts: number[], vs: number[], ease = E.inOut) =>
  interpolate(t, ts, vs, { easing: ease, extrapolateLeft: "clamp", extrapolateRight: "clamp" });

/* ---------- tema (troca por marca) ---------- */
export type Theme = { bg: string; ink: string; soft: string; accent: string; accentInk: string; mute: string };

/* ---------- texto ---------- */
/** Palavras que saem do desfoque, uma a uma (tempo de cada palavra = fala). */
export const Words: React.FC<{
  t: number; items: { w: string; at: number; color?: string; weight?: number }[];
  size: number; color: string; weight?: number; gap?: number; style?: React.CSSProperties;
}> = ({ t, items, size, color, weight = 600, gap = 0.26, style }) => (
  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "baseline", fontFamily: FONT, fontSize: size, fontWeight: weight, letterSpacing: "-0.02em", lineHeight: 1.08, ...style }}>
    {items.map((it, i) => {
      const p = E.outExpo(prog(t, it.at - 0.08, 0.42));
      return (
        <span key={i} style={{
          display: "inline-block", marginRight: i < items.length - 1 ? `${gap}em` : 0, color: it.color ?? color, fontWeight: it.weight ?? weight,
          opacity: clamp01(p * 2), filter: p < 1 ? `blur(${(1 - p) * 14}px)` : undefined,
          transform: p < 1 ? `translateY(${(1 - p) * 34}px) scale(${1.12 - 0.12 * p})` : undefined,
        }}>{it.w}</span>
      );
    })}
  </div>
);

/** Letras que entram pulando e girando, uma a uma ("sele·cio·na" das referências). */
export const Letters: React.FC<{ t: number; text: string; at: number; size: number; color: string; weight?: number; stagger?: number; style?: React.CSSProperties }> =
  ({ t, text, at, size, color, weight = 700, stagger = 0.035, style }) => (
    <div style={{ display: "flex", justifyContent: "center", fontFamily: FONT, fontSize: size, fontWeight: weight, letterSpacing: "-0.03em", lineHeight: 1.05, color, whiteSpace: "pre", ...style }}>
      {[...text].map((c, i) => {
        const p = prog(t, at - 0.06 + i * stagger, 0.5);
        const b = E.outBack(p);
        const rot = (i % 3 === 0 ? -1 : i % 3 === 1 ? 1 : -0.5) * 28 * (1 - b);
        return <span key={i} style={{ display: "inline-block", opacity: clamp01(p * 3), transform: p < 1 ? `translateY(${(1 - b) * -70}px) rotate(${rot}deg) scale(${0.5 + 0.5 * b})` : undefined }}>{c === " " ? " " : c}</span>;
      })}
    </div>
  );

/** Saída de um bloco de texto: encolhe, sobe e desfoca. */
export const outStyle = (t: number, at: number, d = 0.3): React.CSSProperties => {
  const p = E.inExpo(prog(t, at, d));
  return p <= 0 ? {} : { opacity: 1 - p, filter: `blur(${p * 14}px)`, transform: `translateY(${-50 * p}px) scale(${1 - 0.15 * p})` };
};

/* ---------- elementos ---------- */
/** Traço desenhado à mão embaixo da palavra (swoosh). */
export const Underline: React.FC<{ t: number; at: number; width: number; color: string; dur?: number; thick?: number; style?: React.CSSProperties }> =
  ({ t, at, width, color, dur = 0.5, thick = 8, style }) => {
    const p = E.outQuint(prog(t, at, dur));
    return (
      <svg width={width} height={60} viewBox="0 0 400 60" preserveAspectRatio="none" style={{ display: "block", overflow: "visible", ...style }}>
        <path d="M8 34 C 110 10, 250 6, 392 22 M 360 34 C 300 40, 200 48, 120 52" fill="none" stroke={color} strokeWidth={thick * 400 / width} strokeLinecap="round"
          pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - p} vectorEffect="non-scaling-stroke" />
      </svg>
    );
  };

/* Rings (anéis) e Glow (mancha) foram REMOVIDOS: proibidos no estilo. Nunca recrie. */

/** Pílula/caixa que cresce da esquerda com a palavra dentro. RARA: no máximo 1 por vídeo (às vezes nenhuma). */
export const Pill: React.FC<{ t: number; at: number; text: string; bg: string; color: string; size: number; dotted?: string; rot?: number; style?: React.CSSProperties }> =
  ({ t, at, text, bg, color, size, dotted, rot = 0, style }) => {
    const p = E.outExpo(prog(t, at - 0.06, 0.45));
    const tp = prog(t, at + 0.08, 0.3);
    return (
      <div style={{ display: "inline-block", position: "relative", transform: `rotate(${rot}deg)`, ...style }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: 999, background: bg, border: dotted ? `4px dashed ${dotted}` : undefined, transform: `scaleX(${p})`, transformOrigin: "0% 50%" }} />
        <div style={{ position: "relative", padding: `${size * 0.16}px ${size * 0.55}px ${size * 0.2}px`, fontFamily: FONT, fontSize: size, fontWeight: 700, letterSpacing: "-0.02em", color, whiteSpace: "nowrap", opacity: tp, filter: tp < 1 ? `blur(${(1 - tp) * 8}px)` : undefined }}>{text}</div>
      </div>
    );
  };

/** Mãozinha (contorno preto, preenchimento branco) que chega, toca e solta uma onda. */
export const HAND_PATH = "M22 4 Q28 4 28 10 V30 Q30 26 35 27 Q40 28 40 33 Q42 30 46 31 Q51 32 51 37 Q53 35 56 36 Q60 38 60 44 V52 Q60 66 46 68 H34 Q24 68 18 58 L6 40 Q3 35 7 32 Q11 30 15 35 L18 39 V10 Q18 4 22 4 Z";
export const Hand: React.FC<{ t: number; from: [number, number]; to: [number, number]; at: number; tap: number; leave?: number; until?: number; ripple?: string; size?: number }> =
  ({ t, from, to, at, tap, leave, until, ripple = "#000", size = 110 }) => {
    if (t < at || (until !== undefined && t >= until)) return null;
    const m = E.inOut(prog(t, at, Math.max(0.2, tap - at - 0.05)));
    let x = lerp(from[0], to[0], m), y = lerp(from[1], to[1], m);
    let o = 1;
    if (leave !== undefined) { const l = E.inExpo(prog(t, leave, 0.4)); x = lerp(x, x + 260, l); y = lerp(y, y + 380, l); o = 1 - l; }
    const press = t >= tap && t < tap + 0.18 ? 0.82 : 1;
    const rp = prog(t, tap, 0.55);
    return (
      <>
        {rp > 0 && rp < 1 && <div style={{ position: "absolute", left: to[0] - 90, top: to[1] - 90, width: 180, height: 180, borderRadius: "50%", border: `5px solid ${ripple}`, opacity: 0.5 * (1 - rp), transform: `scale(${0.3 + 0.9 * E.outExpo(rp)})` }} />}
        <svg width={size} height={size * 70 / 60} viewBox="0 0 60 70" style={{ position: "absolute", left: x - size * 0.37, top: y - size * 0.06, overflow: "visible", opacity: o, transform: `scale(${press})`, transformOrigin: "37% 6%" }}>
          <path d={HAND_PATH} fill="#fff" stroke="#111" strokeWidth={3.2} strokeLinejoin="round" />
          <path d="M28 30 V40 M40 33 V42 M51 37 V45" stroke="#111" strokeWidth={2.4} strokeLinecap="round" />
        </svg>
      </>
    );
  };

/** Chave liga/desliga. */
export const Toggle: React.FC<{ t: number; at: number; on: string; off?: string; w?: number }> = ({ t, at, on, off = "#D9DBE3", w = 150 }) => {
  const p = E.outBack(prog(t, at, 0.35));
  const h = w * 0.54, k = h - 14;
  return (
    <div style={{ position: "relative", width: w, height: h, borderRadius: h, background: t >= at ? on : off, transition: "none" }}>
      <div style={{ position: "absolute", top: 7, left: 7 + (w - h) * p, width: k, height: k, borderRadius: k, background: "#fff", boxShadow: "0 4px 10px rgba(0,0,0,0.18)" }} />
    </div>
  );
};

/** Pop de elemento (escala com overshoot + giro). */
export const popStyle = (t: number, at: number, d = 0.5, rot = 0): React.CSSProperties => {
  const p = prog(t, at, d);
  if (p <= 0) return { opacity: 0 };
  const b = E.outBack(p);
  return { opacity: clamp01(p * 3), transform: `scale(${b}) rotate(${rot * (1 - b)}deg)` };
};

/** Entra deslizando de um lado com desfoque. */
export const slideStyle = (t: number, at: number, dx: number, d = 0.55): React.CSSProperties => {
  const p = prog(t, at, d);
  if (p <= 0) return { opacity: 0 };
  const e = E.outExpo(p);
  return { opacity: clamp01(p * 2.5), transform: `translateX(${dx * (1 - e)}px)`, filter: p < 1 ? `blur(${(1 - e) * 16}px)` : undefined };
};

/** Celular em contorno (como nas referências). */
export const PhoneOutline: React.FC<{ w: number; h: number; ink: string; children?: React.ReactNode; bg?: string }> = ({ w, h, ink, children, bg = "#fff" }) => (
  <div style={{ position: "relative", width: w, height: h, borderRadius: w * 0.14, border: `${Math.max(6, w * 0.022)}px solid ${ink}`, background: bg, overflow: "hidden", boxShadow: "0 30px 60px rgba(0,0,0,0.10)" }}>
    <div style={{ position: "absolute", left: "50%", top: w * 0.04, width: w * 0.28, height: w * 0.07, marginLeft: -w * 0.14, borderRadius: 99, background: ink, zIndex: 3 }} />
    {children}
  </div>
);

/* ---------- cena com transição de entrada e saída ---------- */
export type Enter = "zoomIn" | "whipR" | "whipL" | "pop" | "rise" | "none";
export type Exit = "zoomThrough" | "shrink" | "whipL" | "whipR" | "fade" | "none";
export const TR = 0.38;
/** Câmera que FOCA nos itens (o estilo nunca deixa a tela parada).
 *  Cada chave diz para onde a câmera olha (x, y no palco) e o zoom (s), num instante absoluto t (s).
 *  Entre chaves: in-out suave; desfoque de movimento proporcional à velocidade da câmera. */
export type CamKey = { t: number; x: number; y: number; s: number; r?: number; rx?: number; ry?: number };
type CamPos = [number, number, number, number, number, number];
const kv = (k: CamKey): CamPos => [k.x, k.y, k.s, k.r ?? 0, k.rx ?? 0, k.ry ?? 0];
/** câmera SUAVE: chaves a menos de CAM_MIN_GAP s da anterior são ignoradas, então todo movimento dura ≥ 1,2 s */
export const CAM_MIN_GAP = 1.2;
const smoothKeys = (keys: CamKey[]): CamKey[] => keys.reduce<CamKey[]>((acc, k) => { const last = acc[acc.length - 1]; if (!last || k.t - last.t >= CAM_MIN_GAP) acc.push(k); return acc; }, []);
const camAt = (raw: CamKey[], t: number): CamPos => {
  const keys = smoothKeys(raw);
  if (t <= keys[0]!.t) return kv(keys[0]!);
  for (let i = 0; i < keys.length - 1; i++) {
    const k0 = keys[i]!, k1 = keys[i + 1]!;
    if (t < k1.t) { const p = E.inOut((t - k0.t) / Math.max(0.001, k1.t - k0.t)); const A = kv(k0), Bv = kv(k1); return A.map((v, j) => lerp(v, Bv[j]!, p)) as CamPos; }
  }
  return kv(keys[keys.length - 1]!);
};
/** atalho: foco no ponto (x,y), zoom s, giro r (°) e inclinação 3D rx/ry (°) a partir do instante t
 *  (a câmera dos motions antigos do estúdio: pan, dolly, órbita/tilt 3D, roll + câmera na mão + desfoque de movimento) */
export const F = (t: number, x: number, y: number, s = 1.25, r = 0, rx = 0, ry = 0): CamKey => ({ t, x, y, s, r, rx, ry });

export const Scene: React.FC<{ t: number; a: number; b: number; bg: string; enter?: Enter; exit?: Exit; children: (lt: number) => React.ReactNode; drift?: number; cam?: CamKey[] }> =
  ({ t, a, b, bg, enter = "zoomIn", exit = "zoomThrough", children, drift = 1, cam }) => {
    if (t < a || t >= b + (exit === "none" ? 0 : 0.001)) return null;
    let s = 1, x = 0, y = 0, bl = 0, o = 1, r = 0;
    const pe = prog(t, a, TR), ee = E.outExpo(pe);
    if (pe < 1) {
      if (enter === "zoomIn") { s *= lerp(0.55, 1, ee); bl += (1 - ee) * 18; o *= clamp01(pe * 2.5); }
      if (enter === "whipR") { x += WHIP * (1 - ee); bl += (1 - ee) * 26; }
      if (enter === "whipL") { x -= WHIP * (1 - ee); bl += (1 - ee) * 26; }
      if (enter === "pop") { s *= lerp(1.35, 1, ee); bl += (1 - ee) * 14; o *= clamp01(pe * 2.5); }
      if (enter === "rise") { y += H * (1 - ee); }
    }
    const px = prog(t, b - TR, TR), xe = E.inExpo(px);
    if (px > 0) {
      if (exit === "zoomThrough") { s *= lerp(1, 3.2, xe); bl += xe * 24; o *= 1 - clamp01((px - 0.45) * 2); }
      if (exit === "shrink") { s *= lerp(1, 0.15, xe); bl += xe * 12; o *= 1 - xe; r -= 8 * xe; }
      if (exit === "whipL") { x -= WHIP * xe; bl += xe * 26; }
      if (exit === "whipR") { x += WHIP * xe; bl += xe * 26; }
      if (exit === "fade") { o *= 1 - xe; bl += xe * 16; }
    }
    // câmera: aproximação lenta + giro leve o tempo todo
    const k = (t - a) / Math.max(0.5, b - a);
    s *= 1 + 0.045 * k * drift; r += 0.8 * Math.sin(k * Math.PI) * drift;
    // câmera focando nos itens
    let camTf = "none", camBl = 0;
    if (cam && cam.length) {
      const [cx, cy, cs, cr, crx, cry] = camAt(cam, t);
      const A0 = camAt(cam, t - 1 / 60), B0 = camAt(cam, t + 1 / 60);
      const speed = Math.hypot(B0[0] - A0[0], B0[1] - A0[1]) * 30 + Math.abs(B0[2] - A0[2]) * 30 * 900 + (Math.abs(B0[3] - A0[3]) + Math.abs(B0[4] - A0[4]) + Math.abs(B0[5] - A0[5])) * 30 * 12;
      camBl = Math.min(3, speed * 0.0015);
      // câmera na mão: três senos de períodos diferentes (determinístico) + respiração do zoom
      const lt0 = t - a;
      const hx = 4 * Math.sin(lt0 * 2 * Math.PI / 1.7), hy = 3 * Math.sin(lt0 * 2 * Math.PI / 2.3 + 1), hr = 0.2 * Math.sin(lt0 * 2 * Math.PI / 2.9 + 2);
      const breathe = 1 + 0.012 * Math.sin(lt0 * 1.3);
      const S = cs * breathe;
      camTf = `perspective(1800px) translate(${W / 2 + hx}px, ${H / 2 + hy}px) rotateX(${crx}deg) rotateY(${cry}deg) rotate(${cr + hr}deg) scale(${S}) translate(${-cx}px, ${-cy}px)`;
      s /= 1 + 0.045 * k * drift; r -= 0.8 * Math.sin(k * Math.PI) * drift;   // a câmera substitui o drift
    }
    return (
      <div style={{ position: "absolute", inset: 0, background: bg, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, transformOrigin: `${W / 2}px ${H / 2}px`, transform: `translate(${x}px,${y}px) scale(${s}) rotate(${r}deg)`, filter: bl > 0.05 ? `blur(${bl}px)` : undefined, opacity: o }}>
          <div style={{ position: "absolute", inset: 0, transformOrigin: "0 0", transform: camTf, filter: camBl > 0.3 ? `blur(${camBl.toFixed(2)}px)` : undefined }}>
            {children(t - a)}
          </div>
        </div>
      </div>
    );
  };

export const Center: React.FC<{ y?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ y = H / 2, children, style }) => (
  <div style={{ position: "absolute", left: 0, width: W, top: y, transform: "translateY(-50%)", display: "flex", flexDirection: "column", alignItems: "center", ...style }}>{children}</div>
);
```

## 14.8 · `scripts/gerar_sons.py`

```python
"""
Alinhamento REAL palavra a palavra da locução (substitui o cálculo por pausas).
Roda o faster-whisper (CPU) no áudio, pega o tempo de cada palavra reconhecida e casa com as
palavras do roteiro (difflib). Palavras sem par recebem tempo interpolado entre vizinhas.
Uso (na pasta voice/ do projeto):  $ALIGN_PY tools/align_words.py   (ALIGN_PY = python de um venv com faster-whisper)
Lê/escreve public/audio/voiceover-timings.json e public/audio/voiceover.mp3.
Instalação: python3 -m venv ~/.venv-align && ~/.venv-align/bin/pip install faster-whisper numpy
"""
import difflib, json, re, subprocess, sys, unicodedata
import numpy as np
from faster_whisper import WhisperModel

FPS = 30
MODEL = sys.argv[1] if len(sys.argv) > 1 else "small"
LANG = __import__("os").environ.get("ALIGN_LANG", "pt")  # vídeo em inglês: ALIGN_LANG=en

def norm(w):
    w = unicodedata.normalize("NFD", w.lower())
    w = "".join(c for c in w if unicodedata.category(c) != "Mn")
    return re.sub(r"[^a-z0-9]", "", w)

def main():
    path = "public/audio/voiceover-timings.json"
    d = json.load(open(path, encoding="utf-8"))
    script = d["words"]
    model = WhisperModel(MODEL, device="cpu", compute_type="int8")
    initial = " ".join(w["word"] for w in script)
    # decodifica com ffmpeg (evita a incompatibilidade do PyAV) → float32 16 kHz mono
    pcm = subprocess.run(["ffmpeg", "-v", "error", "-i", "public/audio/voiceover.mp3", "-f", "f32le", "-ac", "1", "-ar", "16000", "-"], capture_output=True, check=True).stdout
    audio = np.frombuffer(pcm, dtype=np.float32)
    segs, _ = model.transcribe(audio, language=LANG, word_timestamps=True, initial_prompt=initial, vad_filter=False, beam_size=5)
    rec = [w for s in segs for w in (s.words or [])]
    a = [norm(w["word"]) for w in script]
    b = [norm(w.word) for w in rec]
    sm = difflib.SequenceMatcher(a=a, b=b, autojunk=False)
    times = [None] * len(script)
    for blk in sm.get_matching_blocks():
        for k in range(blk.size):
            r = rec[blk.b + k]
            times[blk.a + k] = (float(r.start), float(r.end))
    # casamentos parciais dentro de trechos substituídos (palavra a palavra, por similaridade)
    for tag, i1, i2, j1, j2 in sm.get_opcodes():
        if tag == "replace" and (i2 - i1) == (j2 - j1):
            for k in range(i2 - i1):
                r = rec[j1 + k]
                times[i1 + k] = (float(r.start), float(r.end))
    matched = sum(1 for t in times if t)
    # interpola os que faltam
    n = len(times)
    for i in range(n):
        if times[i] is None:
            prev = next((times[j] for j in range(i - 1, -1, -1) if times[j]), None)
            nxt_j = next((j for j in range(i + 1, n) if times[j]), None)
            p_end = prev[1] if prev else 0.0
            n_start = times[nxt_j][0] if nxt_j is not None else p_end + 0.4
            gap_count = (nxt_j if nxt_j is not None else n) - i
            step = max(0.08, (n_start - p_end) / (gap_count + 1))
            times[i] = (p_end + step * 0.2, p_end + step)
    for w, (s, e) in zip(script, times):
        w["start"], w["end"] = round(s, 3), round(e, 3)
        w["startFrame"], w["endFrame"] = round(s * FPS), round(e * FPS)
    d["alignment"] = {"engine": f"faster-whisper-{MODEL}", "matched": matched, "total": n}
    d["durationSeconds"] = script[-1]["end"]
    json.dump(d, open(path, "w", encoding="utf-8"), indent=2, ensure_ascii=False)
    print(f"OK alinhamento: {matched}/{n} palavras casadas com o áudio ({MODEL})")

if __name__ == "__main__":
    main()
```

## 14.9 · `scripts/estimate_timings.py`

```python
"""Tempos ESTIMADOS por palavra (quando não há chave do Gemini) + voz em silêncio do mesmo tamanho.
Uso: python3 scripts/estimate_timings.py  (sem chave do Gemini: lê voice/script.txt, grava public/audio/voiceover-timings.json e voiceover.mp3)"""
import json, re, subprocess
txt = open("voice/script.txt", encoding="utf-8").read().split()
def syl(w):
    return max(1, len(re.findall(r"[aeiouáéíóúâêôãõà]+", w.lower())))
t, out = 0.3, []
for w in txt:
    d = 0.08 + 0.17 * syl(w)
    out.append({"word": w, "start": round(t, 3), "end": round(t + d, 3)})
    t += d + 0.05
    if w[-1] in ".?!": t += 0.6
    elif w[-1] in ",:": t += 0.25
json.dump({"estimated": True, "words": out}, open("public/audio/voiceover-timings.json", "w"), ensure_ascii=False)
subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "lavfi", "-i", "anullsrc=r=48000:cl=stereo", "-t", str(round(t + 1, 2)), "-b:a", "128k", "public/audio/voiceover.mp3"], check=True)
for i, x in enumerate(out): print(i, x["word"], x["start"])
print("fim", round(t, 2))
```

## 14.10 · `scripts/stills.mjs`

```js
// Renderiza quadros de revisão (em segundos) sem rebundlar a cada quadro.
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import path from "node:path";
const times = (process.argv[2] || "1,2.5").split(",").map(Number);
const out = process.argv[3] || "out/stills";
const serveUrl = await bundle({ entryPoint: path.resolve("src/index.ts") });
const comp = await selectComposition({ serveUrl, id: "Motion", inputProps: { watermark: false } });
for (const s of times) {
  const frame = Math.min(comp.durationInFrames - 1, Math.round(s * comp.fps));
  await renderStill({ composition: comp, serveUrl, frame, output: `${out}/t${s.toFixed(2)}.png`, scale: 0.4, inputProps: { watermark: false } });
}
console.log("ok", times.length);
```

## 14.11 · `scripts/grid.py`

```python
"""Junta os quadros de revisão (stills.mjs) numa folha só, em ordem de tempo, para conferir o vídeo inteiro de uma vez.
Uso: python3 scripts/grid.py <pasta-dos-stills> [colunas=8]   → <pasta>/grid.png"""
import glob, re, subprocess, sys
d = sys.argv[1]; cols = int(sys.argv[2]) if len(sys.argv) > 2 else 8
fs = sorted(glob.glob(d + "/t*.png"), key=lambda f: float(re.search(r"t([\d.]+)\.png", f).group(1)))
n = len(fs); rows = -(-n // cols)
while len(fs) < rows * cols: fs.append(fs[-1])
args = sum([["-i", f] for f in fs], [])
subprocess.run(["ffmpeg", "-v", "error", "-y"] + args + ["-filter_complex", "".join(f"[{i}]" for i in range(len(fs))) + f"xstack=inputs={len(fs)}:grid={cols}x{rows}", d + "/grid.png"], check=True)
print("ok", d + "/grid.png")
```

## 14.12 · `scripts/master.sh`

```bash
#!/bin/sh
# Master de áudio do estúdio: mede o LUFS integrado (ebur128) e leva a −14 LUFS com limitador (pico 0.7).
# Vídeo é copiado sem recompressão. Uso: sh scripts/master.sh entrada.mp4 saida.mp4
# PRÉVIA SEM VOZ (voz muda): use  PREVIA=1 sh scripts/master.sh ...  → só +10 dB + limitador.
set -e
IN=$1; OUT=$2
if [ -n "$PREVIA" ]; then
  ffmpeg -v error -y -i "$IN" -c:v copy -af "volume=10dB,alimiter=limit=0.7:level=false" -c:a aac -b:a 320k "$OUT"; echo "master prévia: $OUT"; exit 0
fi
I=$(ffmpeg -hide_banner -nostats -i "$IN" -af ebur128 -f null - 2>&1 | awk '/Integrated loudness:/{f=1} f&&/I:/{print $2; exit}')
G=$(python3 -c "print(round(-14-($I),2))")
ffmpeg -v error -y -i "$IN" -c:v copy -af "volume=${G}dB,alimiter=limit=0.7:level=false" -c:a aac -b:a 320k "$OUT"
echo "master: $OUT (era $I LUFS, ganho ${G} dB)"
```

## 14.13 · `scripts/render.sh`

```bash
#!/bin/sh
# Render FINAL: as duas versões (limpa + marca d'água "Seu Estúdio"), 120 fps, CRF 18, depois master −14 LUFS.
# Uso (na pasta do projeto): sh scripts/render.sh <nome-da-peça>   → out/<nome>-limpa.mp4 e out/<nome>-marca-dagua.mp4
set -e
NAME=${1:-motion}
[ -f public/sfx/zoom.mp3 ] || python3 scripts/gerar_sons.py
mkdir -p out
npx remotion render Motion out/raw-limpa.mp4 --codec=h264 --crf=18 --pixel-format=yuv420p --audio-codec=aac --audio-bitrate=320k --log=error
npx remotion render MotionWatermark out/raw-marca.mp4 --codec=h264 --crf=18 --pixel-format=yuv420p --audio-codec=aac --audio-bitrate=320k --log=error
sh scripts/master.sh out/raw-limpa.mp4 "out/$NAME-limpa.mp4"
sh scripts/master.sh out/raw-marca.mp4 "out/$NAME-marca-dagua.mp4"
echo RENDER_OK
```

## 14.14 · `scripts/baixar_sfx_mixkit.py (opcional)`

```python
"""Baixa do próprio Mixkit os 4 sons do estilo que NÃO podem ser redistribuídos soltos (licença Mixkit)
e aplica o mesmo tratamento do estúdio (corta silêncio, duração máxima, fade, pico −3 dBFS).
Uso (na pasta do projeto): python3 scripts/baixar_sfx_mixkit.py   → public/sfx/{zoom,swoosh,sparkle,zoomin}.mp3
Se o Mixkit estiver fora do ar, o script copia substitutos da própria pasta (whoosh/riser/reveal) para o vídeo nunca ficar mudo."""
import os, re, shutil, subprocess, urllib.request
SFX = {  # nome no projeto: (id Mixkit, duração máx. em s, substituto local)
    "zoom.mp3": (2627, 3.0, "whoosh.mp3"),      # "Fast swipe zoom"          → antes da troca de cena (alternando com whoosh)
    "swoosh.mp3": (3005, 3.0, "swish.mp3"),     # "Explainer video pops whoosh light pop" → no corte da troca
    "sparkle.mp3": (3083, 3.5, "reveal.mp3"),   # "Magic sparkle touch"      → revelação de logo/marca
    "zoomin.mp3": (2621, 3.0, "riser.mp3"),     # "Ui zoom in, long sound"   → antes da palavra grande
}
os.makedirs("public/sfx", exist_ok=True)
for name, (i, md, sub) in SFX.items():
    out = f"public/sfx/{name}"
    if os.path.exists(out):
        continue
    try:
        raw, tmp = out + ".src.mp3", out + ".tmp.wav"
        req = urllib.request.Request(f"https://assets.mixkit.co/active_storage/sfx/{i}/{i}-preview.mp3", headers={"User-Agent": "Mozilla/5.0"})
        open(raw, "wb").write(urllib.request.urlopen(req, timeout=60).read())
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", raw, "-af", f"silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.01,atrim=0:{md},afade=t=out:st={max(0, md - 0.08)}:d=0.08", "-ar", "44100", "-ac", "2", tmp], check=True)
        r = subprocess.run(["ffmpeg", "-hide_banner", "-i", tmp, "-af", "volumedetect", "-f", "null", "-"], capture_output=True, text=True)
        pk = float(re.search(r"max_volume: (-?[\d.]+) dB", r.stderr).group(1))
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", tmp, "-af", f"volume={-3.0 - pk:.2f}dB,areverse,silenceremove=start_periods=1:start_threshold=-60dB,areverse", "-c:a", "libmp3lame", "-b:a", "160k", out], check=True)
        os.remove(tmp); os.remove(raw)
        print("ok", name)
    except Exception as e:  # sem rede: usa substituto para nunca faltar arquivo
        shutil.copy(f"public/sfx/{sub}", out)
        print(f"aviso: {name} não baixou ({e.__class__.__name__}); usando cópia de {sub}")
print("sfx ok")
```

## 14.15 · `voice/tools/gemini_tts.py`

```python
"""
Gerador de voz PADRÃO do estúdio: Google AI Studio TTS (Gemini).
- Lê o roteiro da stdin e a direção de voz de src/data/voice.json (no diretório do projeto).
- Gera a narração inteira num pedido só (plano gratuito: 3 pedidos/min).
- O Gemini não devolve tempo por palavra: os timings são calculados pelas PAUSAS do próprio
  áudio (ffmpeg silencedetect). As fronteiras de frase (. ? ! … :) caem nas maiores pausas,
  as vírgulas nas pausas menores dentro da frase, e as palavras são distribuídas
  proporcionalmente às letras dentro de cada trecho. Precisão típica: ±2–4 frames, suficiente
  para ancorar animações.
Saída: public/audio/voiceover.mp3 + public/audio/voiceover-timings.json (mesmo formato de antes).

Chave: GEMINI_API_KEY (ambiente) ou .env do projeto, fora do git.
Uso (na pasta do projeto):  npm run voice
"""
import base64, json, os, re, subprocess, sys, time, urllib.request

PROJ = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))  # pasta do projeto
FPS = 30

def key():
    """Chave do Google AI Studio: variável de ambiente GEMINI_API_KEY, ou arquivo .env na pasta do projeto
    ou na pasta acima dela (linha GEMINI_API_KEY=...). NUNCA coloque a chave no git."""
    if os.environ.get("GEMINI_API_KEY"):
        return os.environ["GEMINI_API_KEY"].strip()
    for d in (PROJ, os.path.dirname(PROJ)):
        f = os.path.join(d, ".env")
        if os.path.exists(f):
            for line in open(f):
                if line.startswith("GEMINI_API_KEY="):
                    return line.split("=", 1)[1].strip()
    raise SystemExit("GEMINI_API_KEY ausente (variável de ambiente ou .env na pasta do projeto)")

def prompt(text, style):
    """Formato de direção recomendado pelo Google para TTS: as notas NÃO são lidas, só a transcrição."""
    return (
        "# AUDIO PROFILE\n"
        "Locutora brasileira, mulher jovem.\n\n"
        "### DIRECTOR'S NOTES\n"
        f"{style}\n"
        "Leia SOMENTE o texto da seção TRANSCRIPT, palavra por palavra, sem ler títulos nem estas notas.\n\n"
        "#### TRANSCRIPT\n"
        f"{text}"
    )

def tts(text, voice, style, model):
    body = {
        "contents": [{"parts": [{"text": prompt(text, style)}]}],
        "generationConfig": {"responseModalities": ["AUDIO"], "speechConfig": {"voiceConfig": {"prebuiltVoiceConfig": {"voiceName": voice}}}},
    }
    for attempt in range(4):
        req = urllib.request.Request(
            f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent",
            data=json.dumps(body).encode(), headers={"x-goog-api-key": key(), "Content-Type": "application/json"}, method="POST")
        try:
            r = json.load(urllib.request.urlopen(req, timeout=300))
            return base64.b64decode(r["candidates"][0]["content"]["parts"][0]["inlineData"]["data"])
        except urllib.error.HTTPError as e:
            msg = e.read().decode()[:300]
            if e.code == 429 and attempt < 3:
                print("limite por minuto; aguardando 65 s…", file=sys.stderr)
                time.sleep(65)
                continue
            raise SystemExit(f"Gemini TTS {e.code}: {msg}")

def silences(path, noise="-38dB", dur=0.14):
    out = subprocess.run(["ffmpeg", "-hide_banner", "-i", path, "-af", f"silencedetect=noise={noise}:d={dur}", "-f", "null", "-"], capture_output=True, text=True).stderr
    starts = [float(x) for x in re.findall(r"silence_start: ([\d.]+)", out)]
    ends = [float(x) for x in re.findall(r"silence_end: ([\d.]+)", out)]
    total = float(re.search(r"Duration: (\d+):(\d+):([\d.]+)", out).groups()[2]) + 60 * float(re.search(r"Duration: (\d+):(\d+):([\d.]+)", out).groups()[1])
    pairs = list(zip(starts, ends + [total] * (len(starts) - len(ends))))
    return pairs, total

def weight(w):
    return max(1, len(re.sub(r"[^\wÀ-ú]", "", w))) + 1.2

def main():
    text = sys.stdin.read().strip()
    text = text.replace("…", "...")
    cfg = json.load(open("src/data/voice.json", encoding="utf-8"))
    os.makedirs("public/audio", exist_ok=True)
    wav = "public/audio/voiceover.wav"
    n_words = len(text.split())
    expected = n_words / 2.6  # PT-BR conversado ≈ 2,6 palavras/s
    for attempt in range(3):
        open(wav, "wb").write(tts(text, cfg["voice"], cfg["style"], cfg.get("model", "gemini-3.8-flash-tts")))
        pairs, total = silences(wav)
        if total <= expected * 1.45 + 2:
            break
        print(f"duração suspeita ({total:.1f}s para ~{expected:.1f}s esperados: a instrução pode ter sido lida); gerando de novo…", file=sys.stderr)
        time.sleep(21)
    else:
        raise SystemExit("o TTS insistiu em duração fora do esperado; revisar roteiro/direção")
    # região de fala
    speech_start = pairs[0][1] if pairs and pairs[0][0] < 0.05 else 0.0
    speech_end = pairs[-1][0] if pairs and pairs[-1][1] >= total - 0.05 else total
    inner = [(s, e) for s, e in pairs if s > speech_start + 0.05 and e < speech_end - 0.05]
    # frases → trechos (vírgula)
    sentences = [s.strip() for s in re.split(r"(?<=[.?!…:])\s+", text) if s.strip()]
    gaps = sorted(sorted(inner, key=lambda p: p[1] - p[0], reverse=True)[: len(sentences) - 1])
    if len(gaps) < len(sentences) - 1:
        print("aviso: poucas pausas detectadas; timings só proporcionais", file=sys.stderr)
    spans = []
    cur = speech_start
    for i, s in enumerate(sentences):
        if i < len(gaps):
            spans.append((cur, gaps[i][0])); cur = gaps[i][1]
        else:
            spans.append((cur, None))
    # completa spans sem fim proporcionalmente ao texto restante
    open_idx = [i for i, sp in enumerate(spans) if sp[1] is None]
    if open_idx:
        rest = [sentences[i] for i in open_idx]
        tw = sum(sum(weight(w) for w in r.split()) for r in rest)
        t0 = spans[open_idx[0]][0]
        avail = speech_end - t0
        for i in open_idx:
            d = avail * sum(weight(w) for w in sentences[i].split()) / tw
            spans[i] = (t0, t0 + d); t0 += d
    used = set(gaps)
    words = []
    for s, (a, b) in zip(sentences, spans):
        chunks = [c.strip() for c in re.split(r"(?<=,)\s+", s) if c.strip()]
        local = [p for p in inner if p not in used and p[0] > a + 0.05 and p[1] < b - 0.05]
        # cada vírgula cai na pausa mais próxima da posição esperada pelo texto (±35% da frase)
        cw = [sum(weight(w) for w in c.split()) for c in chunks]
        tot_w = sum(cw)
        cg, acc = [], 0.0
        for j in range(len(chunks) - 1):
            acc += cw[j]
            exp_t = a + (b - a) * acc / tot_w
            cands = [p for p in local if p not in cg and abs((p[0] + p[1]) / 2 - exp_t) < 0.35 * (b - a)]
            if cands:
                cg.append(min(cands, key=lambda p: abs((p[0] + p[1]) / 2 - exp_t)))
        cg = sorted(cg)
        bounds, c0 = [], a
        for j, ch in enumerate(chunks):
            if j < len(cg):
                bounds.append((c0, cg[j][0])); c0 = cg[j][1]
            else:
                bounds.append((c0, None))
        if any(x[1] is None for x in bounds):
            oi = [j for j, x in enumerate(bounds) if x[1] is None]
            tw = sum(sum(weight(w) for w in chunks[j].split()) for j in oi)
            t0 = bounds[oi[0]][0]
            for j in oi:
                d = (b - t0) * sum(weight(w) for w in chunks[j].split()) / tw if tw else 0
                bounds[j] = (t0, t0 + d); t0 += d
        for ch, (ca, cb) in zip(chunks, bounds):
            toks = ch.split()
            tw = sum(weight(w) for w in toks)
            t = ca
            for w in toks:
                d = (cb - ca) * weight(w) / tw
                words.append({"word": w, "key": re.sub(r"[.,!?;:\"“”()…]", "", w.lower()), "start": round(t, 3), "end": round(t + d, 3)})
                t += d
    for w in words:
        w["startFrame"], w["endFrame"] = round(w["start"] * FPS), round(w["end"] * FPS)
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", wav, "-af", "loudnorm=I=-16:TP=-1.5", "-ar", "44100", "-b:a", "192k", "public/audio/voiceover.mp3"], check=True)
    os.remove(wav)
    # voz nova invalida as cópias "raw" usadas pelo add_pauses.py
    for f in ("public/audio/voiceover.raw.mp3", "public/audio/voiceover-timings.raw.json"):
        if os.path.exists(f):
            os.remove(f)
    json.dump({"fps": FPS, "engine": "google-ai-studio-tts", "model": cfg.get("model", "gemini-3.8-flash-tts"), "voice": cfg["voice"], "style": cfg["style"], "durationSeconds": round(speech_end, 3), "words": words}, open("public/audio/voiceover-timings.json", "w"), indent=2, ensure_ascii=False)
    print(f"OK: voz {cfg['voice']}, {len(words)} palavras, {len(sentences)} frases, pausas usadas {len(gaps)}, fala termina em {speech_end:.2f}s")

if __name__ == "__main__":
    main()
```

## 14.16 · `voice/tools/align_words.py`

```python
"""
Alinhamento REAL palavra a palavra da locução (substitui o cálculo por pausas).
Roda o faster-whisper (CPU) no áudio, pega o tempo de cada palavra reconhecida e casa com as
palavras do roteiro (difflib). Palavras sem par recebem tempo interpolado entre vizinhas.
Uso (na pasta voice/ do projeto):  $ALIGN_PY tools/align_words.py   (ALIGN_PY = python de um venv com faster-whisper)
Lê/escreve public/audio/voiceover-timings.json e public/audio/voiceover.mp3.
Instalação: python3 -m venv ~/.venv-align && ~/.venv-align/bin/pip install faster-whisper numpy
"""
import difflib, json, re, subprocess, sys, unicodedata
import numpy as np
from faster_whisper import WhisperModel

FPS = 30
MODEL = sys.argv[1] if len(sys.argv) > 1 else "small"

def norm(w):
    w = unicodedata.normalize("NFD", w.lower())
    w = "".join(c for c in w if unicodedata.category(c) != "Mn")
    return re.sub(r"[^a-z0-9]", "", w)

def main():
    path = "public/audio/voiceover-timings.json"
    d = json.load(open(path, encoding="utf-8"))
    script = d["words"]
    model = WhisperModel(MODEL, device="cpu", compute_type="int8")
    initial = " ".join(w["word"] for w in script)
    # decodifica com ffmpeg (evita a incompatibilidade do PyAV) → float32 16 kHz mono
    pcm = subprocess.run(["ffmpeg", "-v", "error", "-i", "public/audio/voiceover.mp3", "-f", "f32le", "-ac", "1", "-ar", "16000", "-"], capture_output=True, check=True).stdout
    audio = np.frombuffer(pcm, dtype=np.float32)
    segs, _ = model.transcribe(audio, language="pt", word_timestamps=True, initial_prompt=initial, vad_filter=False, beam_size=5)
    rec = [w for s in segs for w in (s.words or [])]
    a = [norm(w["word"]) for w in script]
    b = [norm(w.word) for w in rec]
    sm = difflib.SequenceMatcher(a=a, b=b, autojunk=False)
    times = [None] * len(script)
    for blk in sm.get_matching_blocks():
        for k in range(blk.size):
            r = rec[blk.b + k]
            times[blk.a + k] = (float(r.start), float(r.end))
    # casamentos parciais dentro de trechos substituídos (palavra a palavra, por similaridade)
    for tag, i1, i2, j1, j2 in sm.get_opcodes():
        if tag == "replace" and (i2 - i1) == (j2 - j1):
            for k in range(i2 - i1):
                r = rec[j1 + k]
                times[i1 + k] = (float(r.start), float(r.end))
    matched = sum(1 for t in times if t)
    # interpola os que faltam
    n = len(times)
    for i in range(n):
        if times[i] is None:
            prev = next((times[j] for j in range(i - 1, -1, -1) if times[j]), None)
            nxt_j = next((j for j in range(i + 1, n) if times[j]), None)
            p_end = prev[1] if prev else 0.0
            n_start = times[nxt_j][0] if nxt_j is not None else p_end + 0.4
            gap_count = (nxt_j if nxt_j is not None else n) - i
            step = max(0.08, (n_start - p_end) / (gap_count + 1))
            times[i] = (p_end + step * 0.2, p_end + step)
    for w, (s, e) in zip(script, times):
        w["start"], w["end"] = round(s, 3), round(e, 3)
        w["startFrame"], w["endFrame"] = round(s * FPS), round(e * FPS)
    d["alignment"] = {"engine": f"faster-whisper-{MODEL}", "matched": matched, "total": n}
    d["durationSeconds"] = script[-1]["end"]
    json.dump(d, open(path, "w", encoding="utf-8"), indent=2, ensure_ascii=False)
    print(f"OK alinhamento: {matched}/{n} palavras casadas com o áudio ({MODEL})")

if __name__ == "__main__":
    main()
```

## 14.17 · `voice/tools/add_pauses.py`

```python
"""
Insere pausas entre as frases da locução (sem regerar a voz) e ajusta os timings.
Uso (na pasta voice/ do projeto): python3 tools/add_pauses.py [pausa_s=0.6]
Corta no meio do silêncio entre o fim da frase e a próxima palavra, insere silêncio e
desloca todas as palavras seguintes. Fonte: public/audio/voiceover.raw.mp3 (cópia do original).
"""
import json, os, shutil, subprocess, sys

PAUSE = float(sys.argv[1]) if len(sys.argv) > 1 else 0.6
FPS = 30
A = "public/audio"
raw = f"{A}/voiceover.raw.mp3"
if not os.path.exists(raw):
    shutil.copy(f"{A}/voiceover.mp3", raw)
    shutil.copy(f"{A}/voiceover-timings.json", f"{A}/voiceover-timings.raw.json")
d = json.load(open(f"{A}/voiceover-timings.raw.json"))
words = d["words"]
cuts = []
for i, w in enumerate(words[:-1]):
    if w["word"][-1] in ".?…:!":
        cuts.append((i, (w["end"] + words[i + 1]["start"]) / 2))
# monta segmentos
tmp = f"{A}/_seg"
os.makedirs(tmp, exist_ok=True)
bounds = [0.0] + [c for _, c in cuts] + [None]
listing = []
for k in range(len(bounds) - 1):
    s, e = bounds[k], bounds[k + 1]
    out = f"{tmp}/s{k}.wav"
    cmd = ["ffmpeg", "-v", "error", "-y", "-i", raw, "-ss", str(s)] + (["-to", str(e)] if e else []) + ["-ar", "44100", "-ac", "1", out]
    subprocess.run(cmd, check=True)
    listing.append(out)
    if e is not None:
        sil = f"{tmp}/p{k}.wav"
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "lavfi", "-i", f"anullsrc=r=44100:cl=mono", "-t", str(PAUSE), sil], check=True)
        listing.append(sil)
with open(f"{tmp}/list.txt", "w") as f:
    for p in listing:
        f.write(f"file '{os.path.abspath(p)}'\n")
subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", f"{tmp}/list.txt", "-c:a", "libmp3lame", "-b:a", "192k", f"{A}/voiceover.mp3"], check=True)
shutil.rmtree(tmp)
# desloca timings
shift = 0.0
ci = 0
for i, w in enumerate(words):
    w["start"] += shift
    w["end"] += shift
    if ci < len(cuts) and cuts[ci][0] == i:
        shift += PAUSE
        ci += 1
for w in words:
    w["startFrame"] = round(w["start"] * FPS)
    w["endFrame"] = round(w["end"] * FPS)
d["durationSeconds"] = words[-1]["end"]
d["pauseInserted"] = PAUSE
json.dump(d, open(f"{A}/voiceover-timings.json", "w"), indent=2, ensure_ascii=False)
print(f"OK: {len(cuts)} pausas de {PAUSE}s, fala termina em {d['durationSeconds']:.2f}s")
```

## 14.18 · `voice/script.txt (exemplo)`

```text
Já pensou em ter sua loja virtual sem pagar mensalidade? Conheça a Soul Pay. Você cadastra os produtos, personaliza a vitrine e compartilha o link. O cliente paga no Pix, com QR Code ou copia e cola, e a confirmação é automática. Pagamento aprovado? O produto digital é entregue na hora, por e-mail e no site. No painel, você vê vendas, pedidos, produtos e clientes, tudo num só lugar. E ainda cria cupons e conversa com o comprador. Zero de mensalidade: você só paga quatro por cento quando vender. Soul Pay. Sua loja virtual, grátis para começar.
```

## 14.19 · `voice/src/data/voice.json (exemplo)`

```json
{
  "model": "gemini-3.8-flash-tts",
  "voice": "Leda",
  "why": "Soul Pay (verde e branco): voz feminina jovem, leve e animada, de plataforma digital para quem está começando a vender.",
  "style": "Português do Brasil, sotaque natural. Mulher jovem, uns 25 anos, voz leve, animada e próxima, com sorriso na voz, sem tom de locutora de rádio. Ritmo CALMO e pausado, com pausas entre as frases. Fale 'Soul Pay' como 'sôul pêi', 'Pix' como 'píks', 'QR Code' como 'quiú ar códi'. Não leia estas instruções; leia só o texto."
}
```

---

# PARTE 15 · Vídeos completos

## 15.0 · Demo OpenMotionKit · 9:16 · índigo #5B4BFF · 46 s (pedido digitado, revelação da marca, checklist, etapas ligadas por traço, celular com 3 chaves, contador 120 fps + molduras, terminal + botão, final) — feito 100% com esta skill

```tsx
import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useVideoConfig } from "remotion";
import T from "../public/audio/voiceover-timings.json";
import {
  Center, E, F, FONT, Hand, Letters, PhoneOutline, Pill, Scene, Toggle, Underline, Words, W, H,
  ip, popStyle, prog, slideStyle, useSec,
} from "./lib";

/* OpenMotionKit · vídeo de demonstração do próprio sistema · 9:16 · índigo e branco
   Câmera suave focando os itens · sem círculo/mancha · ênfase = palavra maior · 1 pílula · som sem excesso */
const BG = "#FFFFFF", AC = "#5B4BFF", ACD = "#4433E0", INK = "#111111", MUTE = "#9A9AA3", SOFT = "#F4F4F6", LIGHT = "#EFEDFF";
const WATERMARK = "OpenMotionKit";

const words = (T as { words: { word: string; start: number; end: number }[] }).words;
const w = (i: number) => words[i]!.start;
export const TOTAL = Math.max(45, Math.ceil(words[words.length - 1]!.end + 4.5));
const B = [0, w(11), w(14), w(23), w(35), w(46), w(58), w(67)].map((x, i) => (i === 0 ? 0 : x - 0.12));
const SC = (i: number): [number, number] => [B[i]!, i + 1 < B.length ? B[i + 1]! : TOTAL];

/* marca do OpenMotionKit: bloco arredondado com "play" e rastro de movimento */
const Mark: React.FC<{ s: number; inverse?: boolean }> = ({ s, inverse }) => (
  <svg width={s} height={s} viewBox="0 0 100 100" style={{ display: "block" }}>
    <rect x="4" y="4" width="92" height="92" rx="24" fill={inverse ? "#fff" : AC} />
    <path d="M42 30 L72 50 L42 70 Z" fill={inverse ? AC : "#fff"} strokeLinejoin="round" stroke={inverse ? AC : "#fff"} strokeWidth="6" />
    <path d="M20 38 H32 M16 50 H30 M20 62 H32" stroke={inverse ? AC : "#fff"} strokeWidth="6" strokeLinecap="round" />
  </svg>
);

const P: Record<string, (c: string) => React.ReactNode> = {
  spark: (c) => <path d="M50 4 C54 34 66 46 96 50 C66 54 54 66 50 96 C46 66 34 54 4 50 C34 46 46 34 50 4 Z" fill={c} />,
  tag: (c) => <><path d="M12 14 H50 L88 52 L52 88 L12 48 Z" fill="none" stroke={c} strokeWidth="6" strokeLinejoin="round" /><circle cx="32" cy="34" r="7" fill={c} /></>,
  palette: (c) => <><rect x="10" y="10" width="36" height="36" rx="10" fill={c} /><rect x="54" y="10" width="36" height="36" rx="10" fill="none" stroke={c} strokeWidth="6" /><rect x="10" y="54" width="36" height="36" rx="10" fill="none" stroke={c} strokeWidth="6" /><rect x="54" y="54" width="36" height="36" rx="10" fill={c} /></>,
  frames: (c) => <><rect x="10" y="12" width="34" height="76" rx="8" fill="none" stroke={c} strokeWidth="6" /><rect x="52" y="30" width="40" height="40" rx="8" fill="none" stroke={c} strokeWidth="6" /></>,
  doc: (c) => <><path d="M22 8 H62 L80 26 V92 H22 Z" fill="none" stroke={c} strokeWidth="6" strokeLinejoin="round" /><path d="M34 44 H68 M34 58 H68 M34 72 H54" stroke={c} strokeWidth="6" strokeLinecap="round" /></>,
  wave: (c) => <path d="M10 50 H20 M30 30 V70 M42 18 V82 M54 36 V64 M66 24 V76 M78 42 V58 M88 50 H92" stroke={c} strokeWidth="7" strokeLinecap="round" />,
  play: (c) => <><rect x="8" y="16" width="84" height="68" rx="14" fill="none" stroke={c} strokeWidth="6" /><path d="M42 36 L64 50 L42 64 Z" fill={c} /></>,
  text: (c) => <path d="M18 22 H82 M50 22 V84" stroke={c} strokeWidth="9" strokeLinecap="round" />,
  cam: (c) => <><rect x="8" y="26" width="60" height="48" rx="10" fill="none" stroke={c} strokeWidth="6" /><path d="M68 42 L92 30 V70 L68 58 Z" fill="none" stroke={c} strokeWidth="6" strokeLinejoin="round" /></>,
  sound: (c) => <><path d="M12 38 H28 L50 20 V80 L28 62 H12 Z" fill="none" stroke={c} strokeWidth="6" strokeLinejoin="round" /><path d="M64 36 C72 44 72 56 64 64 M74 26 C88 40 88 60 74 74" fill="none" stroke={c} strokeWidth="6" strokeLinecap="round" /></>,
  check: (c) => <path d="M18 52 L40 74 L84 26" fill="none" stroke={c} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />,
};
const Ic: React.FC<{ k: string; s: number; c?: string }> = ({ k, s, c = INK }) => (
  <svg width={s} height={s} viewBox="0 0 100 100" style={{ overflow: "visible", display: "block" }}>{P[k]!(c)}</svg>
);
const Tile: React.FC<{ k: string; s?: number; on?: boolean }> = ({ k, s = 200, on }) => (
  <div style={{ width: s, height: s, borderRadius: s * 0.24, background: on ? AC : SOFT, display: "grid", placeItems: "center" }}><Ic k={k} s={s * 0.54} c={on ? "#fff" : INK} /></div>
);

/* marca d'água em MOSAICO: muitos "◆ <estúdio>" pequenos, bem transparentes, em diagonal e andando devagar
   (dá para ver o vídeo inteiro, mas é muito difícil de remover; nada de marca gigante no meio) */
const Watermark: React.FC<{ t: number; text: string }> = ({ t, text }) => {
  const rowH = 120, colW = 330, rows = Math.ceil(Math.hypot(W, H) / rowH) + 4, cols = Math.ceil(Math.hypot(W, H) / colW) + 2;
  const dx = (t * 12) % colW, dy = (t * 7) % rowH;
  return (
    <AbsoluteFill style={{ pointerEvents: "none", overflow: "hidden" }}>
      <div style={{ position: "absolute", left: W / 2, top: H / 2, width: 0, height: 0, transform: "rotate(-24deg)" }}>
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} style={{ position: "absolute", left: -((cols * colW) / 2) + dx - (r % 2) * (colW / 2), top: -((rows * rowH) / 2) + r * rowH + dy, display: "flex", whiteSpace: "nowrap" }}>
            {Array.from({ length: cols + 1 }).map((__, c) => (
              <div key={c} style={{ width: colW, font: `800 28px ${FONT}`, letterSpacing: "0.06em", color: "rgba(128,128,136,0.13)" }}>◆ {text}</div>
            ))}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

export const Video: React.FC<{ watermark: boolean }> = ({ watermark }) => {
  const t = useSec();
  const { fps } = useVideoConfig();
  const prompt = "Crie um motion para a minha marca";

  return (
    <AbsoluteFill style={{ background: BG, fontFamily: FONT }}>
      {/* 1 · "Já imaginou criar um motion profissional só pedindo pra uma IA?" — balão de pedido sendo digitado + brilho da IA */}
      <Scene t={t} a={SC(0)[0]} b={SC(0)[1]} bg={BG} enter="none" exit="whipL"
        cam={[F(0, 540, 520, 1.28, -1), F(2.2, 540, 960, 1.22, 0, 3), F(SC(0)[1], 540, 1060, 1.04)]}>
        {() => {
          const n = Math.round(ip(t, [w(6) - 0.2, w(9)], [0, prompt.length], (x) => x));
          return (
            <>
              <Center y={470}>
                <Words t={t} size={62} color={MUTE} weight={600} items={[{ w: "Já", at: w(0) }, { w: "imaginou", at: w(1), color: INK, weight: 800 }, { w: "criar", at: w(2) }]} />
                <Words t={t} size={62} color={MUTE} weight={600} items={[{ w: "um", at: w(3) }, { w: "motion", at: w(4), color: INK, weight: 800 }, { w: "profissional", at: w(5), color: INK, weight: 800 }]} />
              </Center>
              <div style={{ position: "absolute", left: 130, top: 800, width: 820, padding: "40px 44px", borderRadius: "48px 48px 48px 14px", background: SOFT, ...popStyle(t, w(6) - 0.3, 0.5, -4) }}>
                <div style={{ fontSize: 36, fontWeight: 700, color: MUTE, marginBottom: 10 }}>Você</div>
                <div style={{ fontSize: 50, fontWeight: 800, color: INK, minHeight: 64 }}>{prompt.slice(0, n)}<span style={{ opacity: t < w(10) && Math.floor(t * 2.5) % 2 === 0 ? 1 : 0, color: AC }}>|</span></div>
              </div>
              <div style={{ position: "absolute", left: 540 - 95, top: 1080, ...popStyle(t, w(9) - 0.1, 0.55, 20) }}><Tile k="spark" s={190} on /></div>
              <Center y={1450}>
                <Words t={t} size={58} color={MUTE} weight={600} items={[{ w: "só", at: w(6) }, { w: "pedindo", at: w(7), color: INK, weight: 800 }]} />
                <Letters t={t} text="pra uma IA?" at={w(8)} size={128} color={AC} weight={800} stagger={0.03} />
                <Underline t={t} at={w(10) + 0.1} width={480} color={AC} thick={12} />
              </Center>
            </>
          );
        }}
      </Scene>

      {/* 2 · "Conheça o OpenMotionKit." — tela na cor, marca em pop */}
      <Scene t={t} a={SC(1)[0]} b={SC(1)[1]} bg={AC} enter="whipR" exit="zoomThrough"
        cam={[F(SC(1)[0], 540, 880, 1.26, -2), F(SC(1)[1], 540, 960, 1.02)]}>
        {() => (
          <Center y={960}>
            <Words t={t} size={68} color="rgba(255,255,255,0.85)" weight={600} items={[{ w: "Conheça", at: w(11) }, { w: "o", at: w(12) }]} />
            <div style={{ height: 44 }} />
            <div style={popStyle(t, w(13) - 0.3, 0.65, -12)}><Mark s={260} inverse /></div>
            <div style={{ height: 30 }} />
            <Letters t={t} text="OpenMotionKit" at={w(13)} size={140} color="#fff" weight={800} stagger={0.03} />
          </Center>
        )}
      </Scene>

      {/* 3 · "Você manda a marca, a cor e o formato." — 3 cards marcados um a um */}
      <Scene t={t} a={SC(2)[0]} b={SC(2)[1]} bg={BG} enter="zoomIn" exit="whipL"
        cam={[F(SC(2)[0], 540, 560, 1.26, -1), F(w(17) - 0.2, 540, 780, 1.26, 0, 3), F(w(22) - 0.2, 540, 1180, 1.26, 1, 0, -3), F(SC(2)[1], 540, 960, 1.04)]}>
        {() => {
          const R = [{ k: "tag", s: "A marca", i: 17 }, { k: "palette", s: "A cor", i: 19 }, { k: "frames", s: "O formato", i: 22 }];
          return (
            <>
              <Center y={380}>
                <Words t={t} size={62} color={MUTE} weight={600} items={[{ w: "Você", at: w(14), color: INK, weight: 800 }]} />
                <Letters t={t} text="manda:" at={w(15)} size={124} color={AC} weight={800} />
              </Center>
              {R.map((r, j) => {
                const on = t > w(r.i) + 0.3;
                return (
                  <div key={j} style={{ position: "absolute", left: 110, top: 620 + j * 220, width: 860, height: 180, borderRadius: 48, background: on ? LIGHT : SOFT, display: "flex", alignItems: "center", gap: 30, padding: "0 36px", ...slideStyle(t, w(r.i) - 0.4, j % 2 ? 900 : -900, 0.6) }}>
                    <div style={{ width: 112, height: 112, borderRadius: 30, background: AC, display: "grid", placeItems: "center", flex: "none" }}><Ic k={r.k} s={64} c="#fff" /></div>
                    <div style={{ flex: 1, fontSize: 58, fontWeight: 800, color: INK }}>{r.s}</div>
                    <div style={{ width: 64, height: 64, borderRadius: 18, background: on ? AC : "#fff", border: on ? "none" : `5px solid ${INK}`, display: "grid", placeItems: "center" }}>{on && <div style={popStyle(t, w(r.i) + 0.3, 0.4)}><Ic k="check" s={42} c="#fff" /></div>}</div>
                  </div>
                );
              })}
            </>
          );
        }}
      </Scene>

      {/* 4 · "A IA escreve o roteiro, gera a voz e anima cada cena." — 3 etapas ligadas por um traço desenhado */}
      <Scene t={t} a={SC(3)[0]} b={SC(3)[1]} bg={BG} enter="whipR" exit="zoomThrough"
        cam={[F(SC(3)[0], 540, 420, 1.28, -1), F(w(25) - 0.2, 300, 860, 1.24, -1, 0, 5), F(w(28) - 0.2, 780, 1080, 1.24, 1, 0, -5), F(w(32) - 0.2, 300, 1300, 1.24, -1, 0, 5), F(SC(3)[1], 540, 1080, 1.02)]}>
        {() => {
          const N = [{ k: "doc", s: "Roteiro", x: 300, y: 860, i: 25 }, { k: "wave", s: "Voz", x: 780, y: 1080, i: 28 }, { k: "play", s: "Animação", x: 300, y: 1300, i: 32 }];
          const draw = E.inOut(prog(t, w(25), w(32) - w(25)));
          return (
            <>
              <Center y={400}>
                <Words t={t} size={60} color={MUTE} weight={600} items={[{ w: "A", at: w(23) }]} />
                <Letters t={t} text="IA faz o resto" at={w(24)} size={112} color={INK} weight={800} stagger={0.028} />
              </Center>
              <svg width={W} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
                <path d="M300 860 C560 860 780 900 780 1080 C780 1260 300 1150 300 1300" fill="none" stroke={AC} strokeWidth={10} strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - draw} />
              </svg>
              {N.map((n, i) => (
                <div key={i} style={{ position: "absolute", left: n.x - 100, top: n.y - 100, width: 200, display: "flex", flexDirection: "column", alignItems: "center", gap: 16, ...popStyle(t, w(n.i) - 0.2, 0.5, i % 2 ? 10 : -10) }}>
                  <Tile k={n.k} s={200} on={t > w(n.i) + 0.4} />
                  <div style={{ fontSize: 46, fontWeight: 800, color: INK }}>{n.s}</div>
                </div>
              ))}
              <Center y={1640}>
                <Words t={t} size={56} color={MUTE} weight={600} items={[{ w: "e", at: w(31) }, { w: "anima", at: w(32), color: INK, weight: 800 }]} />
                <Letters t={t} text="cada cena." at={w(33)} size={104} color={AC} weight={800} />
              </Center>
            </>
          );
        }}
      </Scene>

      {/* 5 · "Texto que ganha vida, câmera suave e som em cada detalhe." — celular com 3 chaves ligadas pela mão */}
      <Scene t={t} a={SC(4)[0]} b={SC(4)[1]} bg={BG} enter="zoomIn" exit="shrink"
        cam={[F(SC(4)[0], 540, 330, 1.28, -1), F(w(37) - 0.3, 590, 1000, 1.26, 0, 0, -3), F(w(44), 540, 1240, 1.04), F(SC(4)[1], 540, 1240, 1.08)]}>
        {() => {
          const R = [{ k: "text", s: "Texto vivo", i: 37 }, { k: "cam", s: "Câmera suave", i: 39 }, { k: "sound", s: "Som em cada ação", i: 42 }];
          return (
            <>
              <Center y={320}>
                <Words t={t} size={58} color={MUTE} weight={600} items={[{ w: "Texto", at: w(35), color: INK, weight: 800 }, { w: "que", at: w(36) }]} />
                <Letters t={t} text="ganha vida," at={w(37)} size={116} color={AC} weight={800} />
              </Center>
              <div style={{ position: "absolute", left: 250, top: 560, transform: `translateY(${(1 - E.outExpo(prog(t, SC(4)[0] + 0.2, 0.9))) * 900}px)` }}>
                <PhoneOutline w={580} h={1000} ink={INK}>
                  <div style={{ padding: "100px 40px 0" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 30 }}><Mark s={60} /><div style={{ fontSize: 38, fontWeight: 800, color: INK }}>OpenMotionKit</div></div>
                    {R.map((r, j) => {
                      const on = t > w(r.i);
                      return (
                        <div key={j} style={{ display: "flex", alignItems: "center", gap: 22, padding: "28px 24px", borderRadius: 32, background: on ? LIGHT : SOFT, marginBottom: 22, ...slideStyle(t, SC(4)[0] + 0.6 + j * 0.15, 500, 0.55) }}>
                          <div style={{ width: 92, height: 92, borderRadius: 26, background: on ? AC : "#fff", display: "grid", placeItems: "center", flex: "none" }}><Ic k={r.k} s={54} c={on ? "#fff" : INK} /></div>
                          <div style={{ flex: 1, fontSize: 36, fontWeight: 700, color: INK }}>{r.s}</div>
                          <Toggle t={t} at={w(r.i)} on={AC} w={120} />
                        </div>
                      );
                    })}
                  </div>
                </PhoneOutline>
              </div>
              <Hand t={t} from={[1000, 1750]} to={[713, 852]} at={w(36) - 0.1} tap={w(37) - 0.02} until={w(37) + 0.2} ripple={AC} />
              <Hand t={t} from={[713, 852]} to={[713, 1012]} at={w(37) + 0.2} tap={w(39) - 0.02} until={w(39) + 0.3} ripple={AC} />
              <Hand t={t} from={[713, 1012]} to={[713, 1172]} at={w(39) + 0.3} tap={w(42) - 0.02} leave={w(44)} ripple={AC} />
              <Center y={1690}>
                <Words t={t} size={56} color={MUTE} weight={600} items={[{ w: "som", at: w(42), color: INK, weight: 800 }, { w: "em", at: w(43) }, { w: "cada", at: w(44) }, { w: "detalhe.", at: w(45), color: AC, weight: 800 }]} />
              </Center>
            </>
          );
        }}
      </Scene>

      {/* 6 · "Tudo a 120 quadros por segundo, em vertical ou horizontal." — tela na cor, contador 120 fps e as duas molduras */}
      <Scene t={t} a={SC(5)[0]} b={SC(5)[1]} bg={AC} enter="whipR" exit="zoomThrough"
        cam={[F(SC(5)[0], 540, 640, 1.26, -1), F(w(53), 540, 900, 1.12, 0, 3), F(w(57) - 0.2, 540, 1300, 1.2, 1), F(SC(5)[1], 540, 1150, 1.04)]}>
        {() => {
          const n = Math.round(ip(t, [w(48) - 0.1, w(50) + 0.5], [0, 120], E.outQuint));
          return (
            <>
              <Center y={430}>
                <Words t={t} size={60} color="rgba(255,255,255,0.85)" weight={600} items={[{ w: "Tudo", at: w(46), color: "#fff", weight: 800 }, { w: "a", at: w(47) }]} />
              </Center>
              <Center y={690}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 20, ...popStyle(t, w(48) - 0.2, 0.55) }}>
                  <div style={{ fontSize: 300, fontWeight: 800, letterSpacing: "-0.05em", color: "#fff", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{n}</div>
                  <div style={{ fontSize: 90, fontWeight: 800, color: "rgba(255,255,255,0.85)" }}>fps</div>
                </div>
              </Center>
              <Center y={940}>
                <Words t={t} size={56} color="rgba(255,255,255,0.85)" weight={600} items={[{ w: "quadros", at: w(51), color: "#fff", weight: 800 }, { w: "por", at: w(52) }, { w: "segundo,", at: w(53), color: "#fff", weight: 800 }]} />
              </Center>
              <div style={{ position: "absolute", left: 0, width: W, top: 1100, display: "flex", justifyContent: "center", alignItems: "flex-end", gap: 70 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18, ...popStyle(t, w(55) - 0.2, 0.55, -10) }}>
                  <div style={{ width: 180, height: 320, borderRadius: 34, border: "10px solid #fff", display: "grid", placeItems: "center", fontSize: 48, fontWeight: 800, color: "#fff" }}>9:16</div>
                  <div style={{ fontSize: 42, fontWeight: 800, color: "#fff" }}>vertical</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18, ...popStyle(t, w(57) - 0.2, 0.55, 10) }}>
                  <div style={{ width: 400, height: 225, borderRadius: 34, border: "10px solid #fff", display: "grid", placeItems: "center", fontSize: 48, fontWeight: 800, color: "#fff" }}>16:9</div>
                  <div style={{ fontSize: 42, fontWeight: 800, color: "#fff" }}>horizontal</div>
                </div>
              </div>
            </>
          );
        }}
      </Scene>

      {/* 7 · "É código aberto: instale a skill e comece agora." — terminal + botão instalado; a ÚNICA pílula */}
      <Scene t={t} a={SC(6)[0]} b={SC(6)[1]} bg={BG} enter="zoomIn" exit="whipL"
        cam={[F(SC(6)[0], 540, 420, 1.26, -1), F(w(61) - 0.2, 540, 900, 1.24, 0, 3), F(w(65), 540, 1200, 1.12, 1), F(SC(6)[1], 540, 1050, 1.04)]}>
        {() => {
          const cmd = "instalar skill openmotionkit";
          const n = Math.round(ip(t, [w(61) - 0.2, w(63) + 0.2], [0, cmd.length], (x) => x));
          const tap = w(65) - 0.02;
          const pr = ip(t, [tap + 0.1, tap + 0.9], [0, 1], E.inOut);
          const done = pr >= 1;
          return (
            <>
              <Center y={380}>
                <Words t={t} size={60} color={MUTE} weight={600} items={[{ w: "É", at: w(58) }]} />
                <div style={{ marginTop: 16 }}><Pill t={t} at={w(59)} text="código aberto" bg={AC} color="#fff" size={84} rot={-2} /></div>
              </Center>
              <div style={{ position: "absolute", left: 110, top: 640, width: 860, height: 420, borderRadius: 48, background: INK, overflow: "hidden", ...slideStyle(t, w(60) - 0.3, -1000, 0.6) }}>
                <div style={{ display: "flex", gap: 14, padding: "28px 34px" }}>{[0, 1, 2].map((i) => <div key={i} style={{ width: 22, height: 22, borderRadius: 11, background: "rgba(255,255,255,0.3)" }} />)}</div>
                <div style={{ padding: "20px 44px", fontFamily: "monospace", fontSize: 40, color: "#fff", whiteSpace: "nowrap" }}>
                  <span style={{ color: "#8C80FF" }}>$ </span>{cmd.slice(0, n)}
                  <span style={{ opacity: !done && Math.floor(t * 2.5) % 2 === 0 ? 1 : 0 }}>▌</span>
                </div>
                <div style={{ padding: "10px 44px", fontFamily: "monospace", fontSize: 40, color: "#8C80FF", opacity: done ? 1 : 0 }}>✓ pronto para criar</div>
              </div>
              <div style={{ position: "absolute", left: 540 - 220, top: 1140, width: 440, height: 120, borderRadius: 60, background: done ? LIGHT : AC, display: "grid", placeItems: "center", overflow: "hidden", transform: `scale(${t > tap - 0.05 && t < tap + 0.15 ? 0.94 : 1})`, ...popStyle(t, w(64) - 0.3, 0.5) }}>
                {t > tap && !done && <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${pr * 100}%`, background: ACD }} />}
                <div style={{ position: "relative", fontSize: 46, fontWeight: 800, color: done ? AC : "#fff", display: "flex", alignItems: "center", gap: 12 }}>{done ? <><Ic k="check" s={44} c={AC} />Instalado</> : t > tap ? `${Math.round(pr * 100)}%` : "Começar"}</div>
              </div>
              <Hand t={t} from={[1000, 1800]} to={[600, 1200]} at={w(64) - 0.2} tap={tap} leave={tap + 1.2} ripple={AC} />
              <Center y={1520}>
                <Words t={t} size={56} color={MUTE} weight={600} items={[{ w: "instale", at: w(61), color: INK, weight: 800 }, { w: "a", at: w(62) }, { w: "skill", at: w(63), color: INK, weight: 800 }, { w: "e", at: w(64) }]} />
                <Letters t={t} text="comece agora." at={w(65)} size={110} color={AC} weight={800} />
              </Center>
            </>
          );
        }}
      </Scene>

      {/* 8 · "OpenMotionKit. Motion de verdade, aberto pra todo mundo." — marca + assinatura com sublinhado */}
      <Scene t={t} a={SC(7)[0]} b={SC(7)[1]} bg={BG} enter="pop" exit="none" drift={0.4}
        cam={[F(SC(7)[0], 540, 800, 1.26, -1), F(w(69), 540, 960, 1.0), F(SC(7)[1], 540, 960, 1.05)]}>
        {() => (
          <>
            <Center y={740}>
              <div style={popStyle(t, w(67) - 0.25, 0.65, -12)}><Mark s={260} /></div>
              <div style={{ height: 30 }} />
              <Letters t={t} text="OpenMotionKit" at={w(67)} size={130} color={INK} weight={800} />
            </Center>
            <Center y={1220}>
              <Words t={t} size={62} color={MUTE} weight={600} items={[{ w: "Motion", at: w(68), color: INK, weight: 800 }, { w: "de", at: w(69) }, { w: "verdade,", at: w(70), color: INK, weight: 800 }]} />
              <Letters t={t} text="aberto pra todo mundo." at={w(71)} size={84} color={AC} weight={800} stagger={0.025} />
              <Underline t={t} at={w(74) + 0.3} width={520} color={AC} thick={12} />
            </Center>
          </>
        )}
      </Scene>

      {watermark && <Watermark t={t} text={WATERMARK} />}
      <Soundtrack fps={fps} />
    </AbsoluteFill>
  );
};

/* ---------------- som: só nas ações importantes (sem tique por palavra, sem rajada de tick) ---------------- */
type Fx = [number, string, number];
const sfxList = (): Fx[] => {
  const L: Fx[] = [];
  B.slice(1).forEach((b, i) => { L.push([b - 0.32, i % 3 === 1 ? "zoom.mp3" : "whoosh.mp3", 0.3]); L.push([b - 0.02, "swoosh.mp3", 0.16]); });
  const add = (at: number, f: string, v: number) => L.push([at, f, v]);
  add(0.02, "text-in.mp3", 0.2); add(w(6) - 0.3, "pop.mp3", 0.24); add(w(6) - 0.2, "typing.mp3", 0.16); add(w(9) - 0.1, "sparkle.mp3", 0.22); add(w(8) - 0.15, "zoomin.mp3", 0.18); add(w(10) + 0.1, "scribble.mp3", 0.24);
  add(w(13) - 0.3, "reveal.mp3", 0.34); add(w(13) - 0.3, "sparkle.mp3", 0.22);
  [17, 19, 22].forEach((i) => { add(w(i) - 0.4, "swish.mp3", 0.2); add(w(i) + 0.3, "pop.mp3", 0.22); });
  add(w(25), "scribble.mp3", 0.24); [25, 28, 32].forEach((i) => add(w(i) - 0.2, "pop.mp3", 0.24));
  add(SC(4)[0] + 0.2, "swish.mp3", 0.26); [37, 39, 42].forEach((i) => { add(w(i) - 0.02, "click.mp3", 0.34); add(w(i), "toggle.mp3", 0.24); });
  add(w(48) - 0.2, "pop.mp3", 0.28); add(w(48) - 0.1, "tick.mp3", 0.12); add(w(50) + 0.5, "notify.mp3", 0.26); add(w(55) - 0.2, "pop.mp3", 0.24); add(w(57) - 0.2, "pop.mp3", 0.24);
  add(w(59), "pop.mp3", 0.28); add(w(60) - 0.3, "swish.mp3", 0.24); add(w(61) - 0.2, "typing.mp3", 0.16); add(w(65) - 0.02, "click.mp3", 0.34); add(w(65) + 0.9, "notify.mp3", 0.3);
  add(w(67) - 0.25, "reveal.mp3", 0.34); add(w(67) - 0.25, "sparkle.mp3", 0.24); add(w(74) + 0.3, "scribble.mp3", 0.26); add(w(74) + 1.0, "stamp.mp3", 0.2);
  return L.filter(([at]) => at >= 0 && at < TOTAL);
};

const Soundtrack: React.FC<{ fps: number }> = ({ fps }) => {
  const fx = React.useMemo(sfxList, []);
  return (
    <>
      <Audio src={staticFile("audio/voiceover.mp3")} volume={1} />
      <Audio src={staticFile("audio/music.mp3")} volume={(f) => {
        const s = f / fps; const talking = words.some((x) => s > x.start - 0.15 && s < x.end + 0.25);
        return (talking ? 0.07 : 0.16) * Math.max(0, Math.min(1, (TOTAL - s) / 2.5));
      }} />
      {fx.map(([at, f, v], i) => (
        <Sequence key={i} from={Math.round(at * fps)} durationInFrames={Math.round(1.6 * fps)}>
          <Audio src={staticFile(`sfx/${f}`)} volume={v} />
        </Sequence>
      ))}
    </>
  );
};
```

Além das demos acima (que já trazem o componente `Watermark` em mosaico — copie-o nos outros), quatro estudos completos (peças de portfólio/spec, sem afiliação com as marcas; logos não incluídos). São a **régua**: copie composição, tamanhos, tempos, câmera e sons. Os logos (`public/brand/...`) são de cada marca e não vêm junto: baixe o oficial de cada uma se for reproduzir. Peças de marcas reais aqui são exemplos de portfólio.

## 15.0b · Demo Nuvem Café (marca fictícia) · 9:16 · terracota #E4572E · 45 s (fila riscada, cardápio 2×2, checklist + botão pagar, status do pedido no celular, contador 15 min, cartão fidelidade com a única pílula, final)

```tsx
import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useVideoConfig } from "remotion";
import T from "../public/audio/voiceover-timings.json";
import {
  Center, E, F, FONT, Hand, Letters, PhoneOutline, Pill, Scene, Underline, Words, W, H,
  ip, popStyle, prog, slideStyle, useSec,
} from "./lib";

/* Nuvem Café (MARCA FICTÍCIA, demo OpenMotionKit) · 9:16 · terracota e branco
   Câmera suave focando os itens · sem círculo/mancha · ênfase = palavra maior · 1 pílula · som sem excesso */
const BG = "#FFFFFF", AC = "#E4572E", ACD = "#C4421D", INK = "#111111", MUTE = "#9A9AA3", SOFT = "#F4F4F6", LIGHT = "#FDEEE9";
const WATERMARK = "OpenMotionKit";

const words = (T as { words: { word: string; start: number; end: number }[] }).words;
const w = (i: number) => words[i]!.start;
export const TOTAL = Math.max(45, Math.ceil(words[words.length - 1]!.end + 4.5));
const B = [0, w(10), w(14), w(23), w(35), w(46), w(54), w(65)].map((x, i) => (i === 0 ? 0 : x - 0.12));
const SC = (i: number): [number, number] => [B[i]!, i + 1 < B.length ? B[i + 1]! : TOTAL];

const P: Record<string, (c: string) => React.ReactNode> = {
  cup: (c) => <><path d="M16 34 H72 V60 C72 76 60 88 44 88 C28 88 16 76 16 60 Z" fill="none" stroke={c} strokeWidth="6" strokeLinejoin="round" /><path d="M72 42 H80 C88 42 92 48 92 54 C92 62 86 66 78 66 H72" fill="none" stroke={c} strokeWidth="6" /><path d="M34 10 C30 18 38 20 34 28 M50 10 C46 18 54 20 50 28" fill="none" stroke={c} strokeWidth="5" strokeLinecap="round" /></>,
  foam: (c) => <><path d="M18 40 H82 L74 90 H26 Z" fill="none" stroke={c} strokeWidth="6" strokeLinejoin="round" /><path d="M14 40 C14 22 32 24 36 28 C40 16 60 16 64 28 C70 22 86 24 86 40 Z" fill={c} /></>,
  ice: (c) => <><path d="M22 14 H78 L70 92 H30 Z" fill="none" stroke={c} strokeWidth="6" strokeLinejoin="round" /><rect x="34" y="40" width="16" height="16" rx="3" fill={c} /><rect x="52" y="54" width="14" height="14" rx="3" fill={c} /><path d="M58 4 L52 30" stroke={c} strokeWidth="6" strokeLinecap="round" /></>,
  cake: (c) => <><path d="M14 52 H86 V88 H14 Z" fill="none" stroke={c} strokeWidth="6" strokeLinejoin="round" /><path d="M14 52 C14 36 86 36 86 52" fill="none" stroke={c} strokeWidth="6" /><path d="M14 68 C26 76 38 60 50 68 C62 76 74 60 86 68" fill="none" stroke={c} strokeWidth="5" /><path d="M50 14 V34" stroke={c} strokeWidth="6" strokeLinecap="round" /></>,
  person: (c) => <><circle cx="50" cy="28" r="17" fill={c} /><path d="M16 94 Q16 54 50 54 Q84 54 84 94 Z" fill={c} /></>,
  sliders: (c) => <path d="M14 30 H86 M14 50 H86 M14 70 H86" stroke={c} strokeWidth="6" strokeLinecap="round" />,
  card: (c) => <><rect x="8" y="22" width="84" height="58" rx="10" fill="none" stroke={c} strokeWidth="6" /><rect x="8" y="36" width="84" height="10" fill={c} /><rect x="18" y="60" width="26" height="8" rx="4" fill={c} /></>,
  bike: (c) => <><circle cx="24" cy="66" r="16" fill="none" stroke={c} strokeWidth="6" /><circle cx="76" cy="66" r="16" fill="none" stroke={c} strokeWidth="6" /><path d="M24 66 L42 36 H62 L76 66 M42 36 L54 66 H24 M58 24 H70" fill="none" stroke={c} strokeWidth="6" strokeLinejoin="round" strokeLinecap="round" /></>,
  door: (c) => <><rect x="24" y="8" width="52" height="86" rx="6" fill="none" stroke={c} strokeWidth="6" /><rect x="58" y="50" width="8" height="8" rx="2" fill={c} /></>,
  check: (c) => <path d="M18 52 L40 74 L84 26" fill="none" stroke={c} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />,
};
const Ic: React.FC<{ k: string; s: number; c?: string }> = ({ k, s, c = INK }) => (
  <svg width={s} height={s} viewBox="0 0 100 100" style={{ overflow: "visible", display: "block" }}>{P[k]!(c)}</svg>
);
const Tile: React.FC<{ k: string; s?: number; on?: boolean }> = ({ k, s = 200, on }) => (
  <div style={{ width: s, height: s, borderRadius: s * 0.24, background: on ? AC : SOFT, display: "grid", placeItems: "center" }}><Ic k={k} s={s * 0.54} c={on ? "#fff" : INK} /></div>
);
/* marca fictícia: bloco arredondado com xícara */
const Mark: React.FC<{ s: number; inverse?: boolean }> = ({ s, inverse }) => (
  <div style={{ width: s, height: s, borderRadius: s * 0.26, background: inverse ? "#fff" : AC, display: "grid", placeItems: "center" }}><Ic k="cup" s={s * 0.6} c={inverse ? AC : "#fff"} /></div>
);

/* marca d'água em MOSAICO: muitos "◆ <estúdio>" pequenos, bem transparentes, em diagonal e andando devagar
   (dá para ver o vídeo inteiro, mas é muito difícil de remover; nada de marca gigante no meio) */
const Watermark: React.FC<{ t: number; text: string }> = ({ t, text }) => {
  const rowH = 120, colW = 330, rows = Math.ceil(Math.hypot(W, H) / rowH) + 4, cols = Math.ceil(Math.hypot(W, H) / colW) + 2;
  const dx = (t * 12) % colW, dy = (t * 7) % rowH;
  return (
    <AbsoluteFill style={{ pointerEvents: "none", overflow: "hidden" }}>
      <div style={{ position: "absolute", left: W / 2, top: H / 2, width: 0, height: 0, transform: "rotate(-24deg)" }}>
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} style={{ position: "absolute", left: -((cols * colW) / 2) + dx - (r % 2) * (colW / 2), top: -((rows * rowH) / 2) + r * rowH + dy, display: "flex", whiteSpace: "nowrap" }}>
            {Array.from({ length: cols + 1 }).map((__, c) => (
              <div key={c} style={{ width: colW, font: `800 28px ${FONT}`, letterSpacing: "0.06em", color: "rgba(128,128,136,0.13)" }}>◆ {text}</div>
            ))}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

export const Video: React.FC<{ watermark: boolean }> = ({ watermark }) => {
  const t = useSec();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ background: BG, fontFamily: FONT }}>
      {/* 1 · "Já pensou em pedir seu café favorito sem enfrentar fila?" — fila de 4 pessoas riscada à mão */}
      <Scene t={t} a={SC(0)[0]} b={SC(0)[1]} bg={BG} enter="none" exit="whipL"
        cam={[F(0, 540, 520, 1.28, -1), F(2.3, 540, 960, 1.22, 0, 3), F(SC(0)[1], 540, 1040, 1.04)]}>
        {() => {
          const strike = E.inOut(prog(t, w(8) - 0.1, 0.8));
          return (
            <>
              <Center y={480}>
                <Words t={t} size={62} color={MUTE} weight={600} items={[{ w: "Já", at: w(0) }, { w: "pensou", at: w(1), color: INK, weight: 800 }, { w: "em", at: w(2) }, { w: "pedir", at: w(3) }]} />
                <Words t={t} size={62} color={MUTE} weight={600} items={[{ w: "seu", at: w(4) }, { w: "café", at: w(5), color: INK, weight: 800 }, { w: "favorito", at: w(6), color: INK, weight: 800 }]} />
              </Center>
              {[0, 1, 2, 3].map((i) => (
                <div key={i} style={{ position: "absolute", left: 150 + i * 200, top: 860, ...popStyle(t, w(7) - 0.3 + i * 0.1, 0.5, i % 2 ? 8 : -8) }}><Tile k="person" s={170} /></div>
              ))}
              <svg width={W} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
                <path d="M120 1060 C400 1000 700 980 960 900" fill="none" stroke={AC} strokeWidth={16} strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - strike} />
              </svg>
              <Center y={1340}>
                <Words t={t} size={58} color={MUTE} weight={600} items={[{ w: "sem", at: w(7), color: INK, weight: 800 }, { w: "enfrentar", at: w(8) }]} />
                <Letters t={t} text="fila?" at={w(9)} size={150} color={AC} weight={800} />
              </Center>
            </>
          );
        }}
      </Scene>

      {/* 2 · "Conheça o Nuvem Café." — tela na cor, marca em pop */}
      <Scene t={t} a={SC(1)[0]} b={SC(1)[1]} bg={AC} enter="whipR" exit="zoomThrough"
        cam={[F(SC(1)[0], 540, 880, 1.26, -2), F(SC(1)[1], 540, 960, 1.02)]}>
        {() => (
          <Center y={960}>
            <Words t={t} size={68} color="rgba(255,255,255,0.85)" weight={600} items={[{ w: "Conheça", at: w(10) }, { w: "o", at: w(11) }]} />
            <div style={{ height: 44 }} />
            <div style={popStyle(t, w(12) - 0.3, 0.65, -12)}><Mark s={250} inverse /></div>
            <div style={{ height: 30 }} />
            <Letters t={t} text="Nuvem Café" at={w(12)} size={140} color="#fff" weight={800} stagger={0.03} />
          </Center>
        )}
      </Scene>

      {/* 3 · "Tem expresso, cappuccino, gelados e os doces da casa." — cardápio 2×2 */}
      <Scene t={t} a={SC(2)[0]} b={SC(2)[1]} bg={BG} enter="zoomIn" exit="whipL"
        cam={[F(SC(2)[0], 540, 700, 1.26, -1, 0, 3), F(w(17) - 0.2, 540, 1000, 1.2, 1, 3), F(SC(2)[1], 540, 980, 1.04)]}>
        {() => {
          const M = [{ k: "cup", s: "Expresso", i: 15 }, { k: "foam", s: "Cappuccino", i: 16 }, { k: "ice", s: "Gelados", i: 17 }, { k: "cake", s: "Doces", i: 20 }];
          return (
            <>
              <Center y={380}>
                <Letters t={t} text="Tem" at={w(14)} size={120} color={INK} weight={800} />
              </Center>
              {M.map((m, j) => (
                <div key={j} style={{ position: "absolute", left: 140 + (j % 2) * 420, top: 560 + Math.floor(j / 2) * 420, width: 380, height: 380, borderRadius: 56, background: t > w(m.i) + 0.2 ? LIGHT : SOFT, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 26, ...popStyle(t, w(m.i) - 0.2, 0.55, j % 2 ? 8 : -8) }}>
                  <div style={{ width: 170, height: 170, borderRadius: 44, background: AC, display: "grid", placeItems: "center" }}><Ic k={m.k} s={100} c="#fff" /></div>
                  <div style={{ fontSize: 50, fontWeight: 800, color: INK }}>{m.s}</div>
                </div>
              ))}
              <Center y={1520}>
                <Words t={t} size={56} color={MUTE} weight={600} items={[{ w: "e", at: w(18) }, { w: "os", at: w(19) }]} />
                <Letters t={t} text="doces da casa." at={w(20)} size={104} color={AC} weight={800} />
              </Center>
            </>
          );
        }}
      </Scene>

      {/* 4 · "Você escolhe a bebida, personaliza do seu jeito e paga pelo app." — checklist + botão pagar tocado */}
      <Scene t={t} a={SC(3)[0]} b={SC(3)[1]} bg={BG} enter="whipR" exit="zoomThrough"
        cam={[F(SC(3)[0], 540, 600, 1.26, -1), F(w(27) - 0.2, 540, 840, 1.26, 0, 3), F(w(32) - 0.3, 540, 1240, 1.24, 1, 0, -3), F(SC(3)[1], 540, 1000, 1.04)]}>
        {() => {
          const R = [{ k: "cup", s: "Escolha a bebida", i: 24 }, { k: "sliders", s: "Do seu jeito", i: 27 }, { k: "card", s: "Pague pelo app", i: 32 }];
          const tap = w(34) - 0.02;
          return (
            <>
              <Center y={360}>
                <Words t={t} size={62} color={MUTE} weight={600} items={[{ w: "Você", at: w(23), color: INK, weight: 800 }]} />
                <Letters t={t} text="escolhe," at={w(24)} size={120} color={AC} weight={800} />
              </Center>
              {R.map((r, j) => {
                const on = t > w(r.i) + 0.3;
                return (
                  <div key={j} style={{ position: "absolute", left: 110, top: 560 + j * 220, width: 860, height: 180, borderRadius: 48, background: on ? LIGHT : SOFT, display: "flex", alignItems: "center", gap: 30, padding: "0 36px", ...slideStyle(t, w(r.i) - 0.4, j % 2 ? 900 : -900, 0.6) }}>
                    <div style={{ width: 112, height: 112, borderRadius: 30, background: AC, display: "grid", placeItems: "center", flex: "none" }}><Ic k={r.k} s={64} c="#fff" /></div>
                    <div style={{ flex: 1, fontSize: 52, fontWeight: 800, color: INK }}>{r.s}</div>
                    <div style={{ width: 64, height: 64, borderRadius: 18, background: on ? AC : "#fff", border: on ? "none" : `5px solid ${INK}`, display: "grid", placeItems: "center" }}>{on && <div style={popStyle(t, w(r.i) + 0.3, 0.4)}><Ic k="check" s={42} c="#fff" /></div>}</div>
                  </div>
                );
              })}
              <div style={{ position: "absolute", left: 540 - 230, top: 1240, width: 460, height: 124, borderRadius: 62, background: t > tap ? ACD : AC, display: "grid", placeItems: "center", fontSize: 48, fontWeight: 800, color: "#fff", transform: `scale(${t > tap - 0.05 && t < tap + 0.15 ? 0.94 : 1})`, ...popStyle(t, w(32) + 0.1, 0.5) }}>{t > tap ? "Pago ✓" : "Pagar R$ 9,90"}</div>
              <Hand t={t} from={[1000, 1800]} to={[640, 1300]} at={w(32) + 0.3} tap={tap} leave={tap + 0.9} ripple={AC} />
            </>
          );
        }}
      </Scene>

      {/* 5 · "Acompanhe o pedido em tempo real: preparando, saiu pra entrega, chegou." — status no celular */}
      <Scene t={t} a={SC(4)[0]} b={SC(4)[1]} bg={BG} enter="zoomIn" exit="shrink"
        cam={[F(SC(4)[0], 540, 360, 1.28, -1), F(w(41) - 0.3, 560, 960, 1.24, 0, 0, -3), F(w(45), 560, 1160, 1.2, 1), F(SC(4)[1], 540, 1100, 1.04)]}>
        {() => {
          const S = [{ k: "cup", s: "Preparando", i: 41 }, { k: "bike", s: "Saiu pra entrega", i: 42 }, { k: "door", s: "Chegou!", i: 45 }];
          const line = E.inOut(prog(t, w(41), w(45) - w(41)));
          return (
            <>
              <Center y={340}>
                <Words t={t} size={58} color={MUTE} weight={600} items={[{ w: "Acompanhe", at: w(35), color: INK, weight: 800 }, { w: "o", at: w(36) }, { w: "pedido", at: w(37), color: INK, weight: 800 }]} />
                <Letters t={t} text="em tempo real:" at={w(38)} size={104} color={AC} weight={800} stagger={0.028} />
              </Center>
              <div style={{ position: "absolute", left: 250, top: 560, transform: `translateY(${(1 - E.outExpo(prog(t, SC(4)[0] + 0.2, 0.9))) * 900}px)` }}>
                <PhoneOutline w={580} h={1000} ink={INK}>
                  <div style={{ padding: "100px 44px 0" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40 }}><Mark s={64} /><div style={{ fontSize: 38, fontWeight: 800, color: INK }}>Seu pedido</div></div>
                    <svg width={120} height={520} style={{ position: "absolute", left: 44, top: 240 }}>
                      <path d="M56 40 V460" stroke={SOFT} strokeWidth={10} strokeLinecap="round" />
                      <path d="M56 40 V460" stroke={AC} strokeWidth={10} strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - line} />
                    </svg>
                    {S.map((s, j) => {
                      const on = t > w(s.i) - 0.1;
                      return (
                        <div key={j} style={{ position: "relative", display: "flex", alignItems: "center", gap: 26, marginBottom: 90, ...slideStyle(t, SC(4)[0] + 0.6 + j * 0.15, 500, 0.55) }}>
                          <div style={{ width: 112, height: 112, borderRadius: 30, background: on ? AC : SOFT, display: "grid", placeItems: "center", flex: "none", ...(on ? popStyle(t, w(s.i) - 0.1, 0.45) : {}) }}><Ic k={s.k} s={62} c={on ? "#fff" : INK} /></div>
                          <div style={{ fontSize: 40, fontWeight: 800, color: on ? INK : MUTE }}>{s.s}</div>
                        </div>
                      );
                    })}
                  </div>
                </PhoneOutline>
              </div>
            </>
          );
        }}
      </Scene>

      {/* 6 · "Em média, quinze minutos até a sua porta." — tela na cor, contador 15 min */}
      <Scene t={t} a={SC(5)[0]} b={SC(5)[1]} bg={AC} enter="whipR" exit="zoomThrough"
        cam={[F(SC(5)[0], 540, 640, 1.26, -1), F(w(49), 540, 860, 1.1, 0, 3), F(SC(5)[1], 540, 1060, 1.06)]}>
        {() => {
          const n = Math.round(ip(t, [w(48) - 0.1, w(49) + 0.5], [0, 15], E.outQuint));
          return (
            <>
              <Center y={440}>
                <Words t={t} size={62} color="rgba(255,255,255,0.85)" weight={600} items={[{ w: "Em", at: w(46) }, { w: "média,", at: w(47), color: "#fff", weight: 800 }]} />
              </Center>
              <Center y={720}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 22, ...popStyle(t, w(48) - 0.2, 0.55) }}>
                  <div style={{ fontSize: 320, fontWeight: 800, letterSpacing: "-0.05em", color: "#fff", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{n}</div>
                  <div style={{ fontSize: 100, fontWeight: 800, color: "rgba(255,255,255,0.85)" }}>min</div>
                </div>
              </Center>
              <div style={{ position: "absolute", left: 540 - 110, top: 1020, ...popStyle(t, w(52) - 0.2, 0.55, 10) }}>
                <div style={{ width: 220, height: 220, borderRadius: 56, background: "#fff", display: "grid", placeItems: "center" }}><Ic k="door" s={120} c={AC} /></div>
              </div>
              <Center y={1420}>
                <Words t={t} size={58} color="rgba(255,255,255,0.85)" weight={600} items={[{ w: "até", at: w(50) }, { w: "a", at: w(51) }]} />
                <Letters t={t} text="sua porta." at={w(52)} size={116} color="#fff" weight={800} />
              </Center>
            </>
          );
        }}
      </Scene>

      {/* 7 · "E a cada dez cafés, o próximo é por nossa conta." — cartão fidelidade 5×2; a ÚNICA pílula */}
      <Scene t={t} a={SC(6)[0]} b={SC(6)[1]} bg={BG} enter="zoomIn" exit="whipL"
        cam={[F(SC(6)[0], 540, 460, 1.26, -1), F(w(57), 540, 860, 1.2, 0, 3), F(w(62), 540, 1180, 1.16, 1), F(SC(6)[1], 540, 1050, 1.04)]}>
        {() => (
          <>
            <Center y={380}>
              <Words t={t} size={60} color={MUTE} weight={600} items={[{ w: "E", at: w(54) }, { w: "a", at: w(55) }, { w: "cada", at: w(56), color: INK, weight: 800 }]} />
              <Letters t={t} text="10 cafés," at={w(57)} size={130} color={AC} weight={800} />
            </Center>
            <div style={{ position: "absolute", left: 110, top: 620, width: 860, height: 420, borderRadius: 52, border: `6px solid ${INK}`, background: "#fff", display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 22, padding: 40, ...slideStyle(t, SC(6)[0] + 0.2, -1000, 0.7) }}>
              {Array.from({ length: 10 }).map((_, i) => {
                const last = i === 9;
                return (
                  <div key={i} style={{ borderRadius: 32, background: last ? AC : LIGHT, display: "grid", placeItems: "center", ...popStyle(t, w(57) + i * 0.09, 0.4, i % 2 ? 6 : -6) }}>
                    <Ic k="cup" s={70} c={last ? "#fff" : AC} />
                  </div>
                );
              })}
            </div>
            <Center y={1220}>
              <Words t={t} size={56} color={MUTE} weight={600} items={[{ w: "o", at: w(59) }, { w: "próximo", at: w(60), color: INK, weight: 800 }, { w: "é", at: w(61) }]} />
              <div style={{ marginTop: 20 }}><Pill t={t} at={w(62)} text="por nossa conta." bg={AC} color="#fff" size={72} rot={-2} /></div>
            </Center>
          </>
        )}
      </Scene>

      {/* 8 · "Nuvem Café. Seu café, no seu tempo." — marca + assinatura */}
      <Scene t={t} a={SC(7)[0]} b={SC(7)[1]} bg={BG} enter="pop" exit="none" drift={0.4}
        cam={[F(SC(7)[0], 540, 800, 1.26, -1), F(w(67), 540, 960, 1.0), F(SC(7)[1], 540, 960, 1.05)]}>
        {() => (
          <>
            <Center y={740}>
              <div style={popStyle(t, w(65) - 0.25, 0.65, -12)}><Mark s={250} /></div>
              <div style={{ height: 30 }} />
              <Letters t={t} text="Nuvem Café" at={w(65)} size={130} color={INK} weight={800} />
            </Center>
            <Center y={1220}>
              <Words t={t} size={64} color={MUTE} weight={600} items={[{ w: "Seu", at: w(67) }, { w: "café,", at: w(68), color: INK, weight: 800 }]} />
              <Letters t={t} text="no seu tempo." at={w(69)} size={104} color={AC} weight={800} />
              <Underline t={t} at={w(71) + 0.3} width={480} color={AC} thick={12} />
            </Center>
          </>
        )}
      </Scene>

      {watermark && <Watermark t={t} text={WATERMARK} />}
      <Soundtrack fps={fps} />
    </AbsoluteFill>
  );
};

/* ---------------- som: só nas ações importantes ---------------- */
type Fx = [number, string, number];
const sfxList = (): Fx[] => {
  const L: Fx[] = [];
  B.slice(1).forEach((b, i) => { L.push([b - 0.32, i % 3 === 1 ? "zoom.mp3" : "whoosh.mp3", 0.3]); L.push([b - 0.02, "swoosh.mp3", 0.16]); });
  const add = (at: number, f: string, v: number) => L.push([at, f, v]);
  add(0.02, "text-in.mp3", 0.2); for (let i = 0; i < 4; i++) add(w(7) - 0.3 + i * 0.1, "pop.mp3", 0.18); add(w(8) - 0.1, "scribble.mp3", 0.28); add(w(9) - 0.15, "zoomin.mp3", 0.18);
  add(w(12) - 0.3, "reveal.mp3", 0.34); add(w(12) - 0.3, "sparkle.mp3", 0.22);
  [15, 16, 17, 20].forEach((i) => add(w(i) - 0.2, "pop.mp3", 0.22));
  [24, 27, 32].forEach((i) => { add(w(i) - 0.4, "swish.mp3", 0.2); add(w(i) + 0.3, "pop.mp3", 0.22); }); add(w(34) - 0.02, "click.mp3", 0.34); add(w(34) + 0.1, "notify.mp3", 0.24);
  add(SC(4)[0] + 0.2, "swish.mp3", 0.26); [41, 42, 45].forEach((i) => add(w(i) - 0.1, "pop.mp3", 0.24)); add(w(45) + 0.2, "notify.mp3", 0.28);
  add(w(48) - 0.2, "pop.mp3", 0.28); add(w(48) - 0.1, "tick.mp3", 0.12); add(w(52) - 0.2, "pop.mp3", 0.26);
  add(SC(6)[0] + 0.2, "swish.mp3", 0.24); add(w(57), "pop.mp3", 0.2); add(w(57) + 0.81, "like.mp3", 0.28); add(w(62), "pop.mp3", 0.28);
  add(w(65) - 0.25, "reveal.mp3", 0.34); add(w(65) - 0.25, "sparkle.mp3", 0.24); add(w(71) + 0.3, "scribble.mp3", 0.26); add(w(71) + 1.0, "stamp.mp3", 0.2);
  return L.filter(([at]) => at >= 0 && at < TOTAL);
};

const Soundtrack: React.FC<{ fps: number }> = ({ fps }) => {
  const fx = React.useMemo(sfxList, []);
  return (
    <>
      <Audio src={staticFile("audio/voiceover.mp3")} volume={1} />
      <Audio src={staticFile("audio/music.mp3")} volume={(f) => {
        const s = f / fps; const talking = words.some((x) => s > x.start - 0.15 && s < x.end + 0.25);
        return (talking ? 0.07 : 0.16) * Math.max(0, Math.min(1, (TOTAL - s) / 2.5));
      }} />
      {fx.map(([at, f, v], i) => (
        <Sequence key={i} from={Math.round(at * fps)} durationInFrames={Math.round(1.6 * fps)}>
          <Audio src={staticFile(`sfx/${f}`)} volume={v} />
        </Sequence>
      ))}
    </>
  );
};
```

## 15.0c · Demo Tarefa+ (marca fictícia) · 16:9 · verde-água #0EA5A4 · 48 s (FORMAT = "16x9": texto à esquerda + apps em grade, janela de nova tarefa com mão, quadro kanban com cartão viajando, painel de barras + lembrete, notebook + celular sincronizados, time com checks, final)

```tsx
import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useVideoConfig } from "remotion";
import T from "../public/audio/voiceover-timings.json";
import {
  Center, E, F, FONT, Hand, Letters, Scene, Underline, Words, W, H,
  ip, popStyle, prog, slideStyle, useSec,
} from "./lib";

/* Tarefa+ (MARCA FICTÍCIA, demo OpenMotionKit) · 16:9 (FORMAT = "16x9") · verde-água e branco
   Câmera suave focando os itens · sem círculo/mancha · ênfase = palavra maior · sem pílula · som sem excesso */
const BG = "#FFFFFF", AC = "#0EA5A4", ACD = "#0B8584", INK = "#111111", MUTE = "#9A9AA3", SOFT = "#F4F4F6", LIGHT = "#E6F7F7";
const WATERMARK = "OpenMotionKit";

const words = (T as { words: { word: string; start: number; end: number }[] }).words;
const w = (i: number) => words[i]!.start;
export const TOTAL = Math.max(45, Math.ceil(words[words.length - 1]!.end + 4.5));
const B = [0, w(10), w(14), w(27), w(37), w(51), w(60), w(70)].map((x, i) => (i === 0 ? 0 : x - 0.12));
const SC = (i: number): [number, number] => [B[i]!, i + 1 < B.length ? B[i + 1]! : TOTAL];

const P: Record<string, (c: string) => React.ReactNode> = {
  mail: (c) => <><rect x="8" y="20" width="84" height="60" rx="10" fill="none" stroke={c} strokeWidth="6" /><path d="M10 24 L50 54 L90 24" fill="none" stroke={c} strokeWidth="6" strokeLinejoin="round" /></>,
  chat: (c) => <path d="M12 18 H88 V68 H40 L22 86 V68 H12 Z" fill="none" stroke={c} strokeWidth="6" strokeLinejoin="round" />,
  sheet: (c) => <><rect x="12" y="12" width="76" height="76" rx="10" fill="none" stroke={c} strokeWidth="6" /><path d="M12 38 H88 M12 62 H88 M40 12 V88" stroke={c} strokeWidth="6" /></>,
  note: (c) => <><path d="M14 10 H70 L86 26 V90 H14 Z" fill="none" stroke={c} strokeWidth="6" strokeLinejoin="round" /><path d="M28 44 H72 M28 60 H72 M28 76 H54" stroke={c} strokeWidth="6" strokeLinecap="round" /></>,
  phone: (c) => <><rect x="28" y="6" width="44" height="88" rx="10" fill="none" stroke={c} strokeWidth="6" /><rect x="42" y="12" width="16" height="4" rx="2" fill={c} /></>,
  person: (c) => <><circle cx="50" cy="28" r="17" fill={c} /><path d="M16 94 Q16 54 50 54 Q84 54 84 94 Z" fill={c} /></>,
  bell: (c) => <><path d="M24 70 V44 C24 28 36 16 50 16 C64 16 76 28 76 44 V70 L84 80 H16 Z" fill="none" stroke={c} strokeWidth="6" strokeLinejoin="round" /><path d="M42 88 H58" stroke={c} strokeWidth="6" strokeLinecap="round" /></>,
  calendar: (c) => <><rect x="10" y="18" width="80" height="72" rx="10" fill="none" stroke={c} strokeWidth="6" /><path d="M10 40 H90 M30 8 V26 M70 8 V26" stroke={c} strokeWidth="6" strokeLinecap="round" /></>,
  sync: (c) => <><path d="M20 44 C24 26 40 16 56 18 C68 20 78 28 82 38" fill="none" stroke={c} strokeWidth="7" strokeLinecap="round" /><path d="M84 22 V40 H66" fill="none" stroke={c} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" /><path d="M80 56 C76 74 60 84 44 82 C32 80 22 72 18 62" fill="none" stroke={c} strokeWidth="7" strokeLinecap="round" /><path d="M16 78 V60 H34" fill="none" stroke={c} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" /></>,
  check: (c) => <path d="M18 52 L40 74 L84 26" fill="none" stroke={c} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />,
};
const Ic: React.FC<{ k: string; s: number; c?: string }> = ({ k, s, c = INK }) => (
  <svg width={s} height={s} viewBox="0 0 100 100" style={{ overflow: "visible", display: "block" }}>{P[k]!(c)}</svg>
);
const Tile: React.FC<{ k: string; s?: number; on?: boolean }> = ({ k, s = 200, on }) => (
  <div style={{ width: s, height: s, borderRadius: s * 0.24, background: on ? AC : SOFT, display: "grid", placeItems: "center" }}><Ic k={k} s={s * 0.54} c={on ? "#fff" : INK} /></div>
);
/* marca fictícia: check dentro de bloco + "+" */
const Mark: React.FC<{ s: number; inverse?: boolean }> = ({ s, inverse }) => (
  <svg width={s} height={s} viewBox="0 0 100 100" style={{ display: "block" }}>
    <rect x="4" y="4" width="92" height="92" rx="24" fill={inverse ? "#fff" : AC} />
    <path d="M24 52 L42 70 L70 34" fill="none" stroke={inverse ? AC : "#fff"} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M78 14 V30 M70 22 H86" stroke={inverse ? AC : "#fff"} strokeWidth="6" strokeLinecap="round" />
  </svg>
);
/* janela de app (barra com três pontinhos) */
const Win: React.FC<{ w: number; h: number; title: string; children?: React.ReactNode; style?: React.CSSProperties }> = ({ w: ww, h, title, children, style }) => (
  <div style={{ position: "absolute", width: ww, height: h, borderRadius: 30, border: `5px solid ${INK}`, background: "#fff", overflow: "hidden", boxShadow: "0 24px 50px rgba(0,0,0,0.08)", ...style }}>
    <div style={{ height: 58, borderBottom: `4px solid ${SOFT}`, display: "flex", alignItems: "center", gap: 10, padding: "0 22px" }}>
      {[0, 1, 2].map((i) => <div key={i} style={{ width: 14, height: 14, borderRadius: 4, background: "#D9DBE3" }} />)}
      <div style={{ marginLeft: 14, fontSize: 24, fontWeight: 800, color: INK }}>{title}</div>
    </div>
    {children}
  </div>
);

/* marca d'água em MOSAICO: muitos "◆ <estúdio>" pequenos, bem transparentes, em diagonal e andando devagar
   (dá para ver o vídeo inteiro, mas é muito difícil de remover; nada de marca gigante no meio) */
const Watermark: React.FC<{ t: number; text: string }> = ({ t, text }) => {
  const rowH = 120, colW = 330, rows = Math.ceil(Math.hypot(W, H) / rowH) + 4, cols = Math.ceil(Math.hypot(W, H) / colW) + 2;
  const dx = (t * 12) % colW, dy = (t * 7) % rowH;
  return (
    <AbsoluteFill style={{ pointerEvents: "none", overflow: "hidden" }}>
      <div style={{ position: "absolute", left: W / 2, top: H / 2, width: 0, height: 0, transform: "rotate(-24deg)" }}>
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} style={{ position: "absolute", left: -((cols * colW) / 2) + dx - (r % 2) * (colW / 2), top: -((rows * rowH) / 2) + r * rowH + dy, display: "flex", whiteSpace: "nowrap" }}>
            {Array.from({ length: cols + 1 }).map((__, c) => (
              <div key={c} style={{ width: colW, font: `800 28px ${FONT}`, letterSpacing: "0.06em", color: "rgba(128,128,136,0.13)" }}>◆ {text}</div>
            ))}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

export const Video: React.FC<{ watermark: boolean }> = ({ watermark }) => {
  const t = useSec();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ background: BG, fontFamily: FONT }}>
      {/* 1 · "Sua equipe perde tempo procurando tarefas em cinco lugares diferentes?" — 5 apps espalhados em grade */}
      <Scene t={t} a={SC(0)[0]} b={SC(0)[1]} bg={BG} enter="none" exit="whipL"
        cam={[F(0, 600, 480, 1.2, -1), F(2.4, 960, 520, 1.08, 0, 3), F(SC(0)[1], 960, 540, 1.03)]}>
        {() => {
          const K = ["mail", "chat", "sheet", "note", "phone"];
          return (
            <>
              <div style={{ position: "absolute", left: 150, top: 300, width: 760 }}>
                <Words t={t} size={58} color={MUTE} weight={600} style={{ justifyContent: "flex-start" }} items={[{ w: "Sua", at: w(0) }, { w: "equipe", at: w(1), color: INK, weight: 800 }, { w: "perde", at: w(2) }, { w: "tempo", at: w(3), color: INK, weight: 800 }]} />
                <Words t={t} size={58} color={MUTE} weight={600} style={{ justifyContent: "flex-start", marginTop: 8 }} items={[{ w: "procurando", at: w(4) }, { w: "tarefas", at: w(5), color: INK, weight: 800 }, { w: "em", at: w(6) }]} />
                <Letters t={t} text="5 lugares?" at={w(7)} size={130} color={AC} weight={800} style={{ justifyContent: "flex-start", marginTop: 20 }} />
                <Underline t={t} at={w(9) + 0.1} width={440} color={AC} thick={10} style={{ marginTop: 6 }} />
              </div>
              {K.map((k, i) => (
                <div key={i} style={{ position: "absolute", left: 1060 + (i % 3) * 240, top: 260 + Math.floor(i / 3) * 280 + (i >= 3 ? 0 : 0), ...popStyle(t, w(4) + i * 0.25, 0.5, i % 2 ? 10 : -10) }}><Tile k={k} s={200} /></div>
              ))}
            </>
          );
        }}
      </Scene>

      {/* 2 · "Conheça o Tarefa Mais." — tela na cor, marca em pop */}
      <Scene t={t} a={SC(1)[0]} b={SC(1)[1]} bg={AC} enter="whipR" exit="zoomThrough"
        cam={[F(SC(1)[0], 960, 500, 1.26, -2), F(SC(1)[1], 960, 540, 1.02)]}>
        {() => (
          <Center y={540}>
            <Words t={t} size={60} color="rgba(255,255,255,0.85)" weight={600} items={[{ w: "Conheça", at: w(10) }, { w: "o", at: w(11) }]} />
            <div style={{ height: 30 }} />
            <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
              <div style={popStyle(t, w(12) - 0.3, 0.65, -12)}><Mark s={200} inverse /></div>
              <Letters t={t} text="Tarefa+" at={w(12)} size={170} color="#fff" weight={800} />
            </div>
          </Center>
        )}
      </Scene>

      {/* 3 · "Crie as tarefas, defina os prazos e distribua para o time em segundos." — janela nova tarefa + mão em Distribuir */}
      <Scene t={t} a={SC(2)[0]} b={SC(2)[1]} bg={BG} enter="zoomIn" exit="whipL"
        cam={[F(SC(2)[0], 560, 480, 1.24, -1), F(w(17) - 0.2, 1380, 470, 1.24, 0, 0, -4), F(w(21) - 0.2, 1380, 700, 1.22, 1, 3), F(SC(2)[1], 960, 560, 1.03)]}>
        {() => {
          const title = "Lançar campanha de maio";
          const n = Math.round(ip(t, [w(14), w(16) + 0.3], [0, title.length], (x) => x));
          const tap = w(26) - 0.02;
          return (
            <>
              <div style={{ position: "absolute", left: 150, top: 330, width: 760 }}>
                <Letters t={t} text="Crie," at={w(14)} size={120} color={INK} weight={800} style={{ justifyContent: "flex-start" }} />
                <Words t={t} size={56} color={MUTE} weight={600} style={{ justifyContent: "flex-start", marginTop: 14 }} items={[{ w: "defina", at: w(17), color: INK, weight: 800 }, { w: "os", at: w(18) }, { w: "prazos", at: w(19), color: AC, weight: 800 }]} />
                <Words t={t} size={56} color={MUTE} weight={600} style={{ justifyContent: "flex-start", marginTop: 8 }} items={[{ w: "e", at: w(20) }, { w: "distribua", at: w(21), color: INK, weight: 800 }, { w: "para", at: w(22) }, { w: "o", at: w(23) }, { w: "time", at: w(24), color: AC, weight: 800 }]} />
                <Letters t={t} text="em segundos." at={w(25)} size={96} color={AC} weight={800} style={{ justifyContent: "flex-start", marginTop: 18 }} />
              </div>
              <div style={{ ...slideStyle(t, SC(2)[0] + 0.2, 900, 0.7) }}>
                <Win w={760} h={660} title="Nova tarefa" style={{ left: 1000, top: 200 }}>
                  <div style={{ padding: "30px 40px", display: "flex", flexDirection: "column", gap: 26 }}>
                    <div style={{ fontSize: 24, fontWeight: 700, color: MUTE }}>Título</div>
                    <div style={{ height: 76, borderRadius: 20, background: SOFT, display: "flex", alignItems: "center", padding: "0 24px", fontSize: 32, fontWeight: 800, color: INK }}>{title.slice(0, n)}<span style={{ opacity: t < w(17) && Math.floor(t * 2.5) % 2 === 0 ? 1 : 0, color: AC }}>|</span></div>
                    <div style={{ display: "flex", gap: 20, alignItems: "center", ...popStyle(t, w(19) - 0.2, 0.5) }}>
                      <div style={{ width: 70, height: 70, borderRadius: 20, background: AC, display: "grid", placeItems: "center" }}><Ic k="calendar" s={42} c="#fff" /></div>
                      <div style={{ fontSize: 32, fontWeight: 800, color: INK }}>Prazo: sexta, 18h</div>
                    </div>
                    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                      {[0, 1, 2].map((i) => <div key={i} style={{ ...popStyle(t, w(21) + i * 0.15, 0.45, i % 2 ? 8 : -8) }}><Tile k="person" s={80} on={i === 0} /></div>)}
                      <div style={{ fontSize: 28, fontWeight: 700, color: MUTE, marginLeft: 8, opacity: prog(t, w(22), 0.3) }}>Ana, Leo, Bia</div>
                    </div>
                    <div style={{ alignSelf: "flex-end", height: 84, padding: "0 40px", borderRadius: 42, background: t > tap ? ACD : AC, display: "grid", placeItems: "center", fontSize: 32, fontWeight: 800, color: "#fff", transform: `scale(${t > tap - 0.05 && t < tap + 0.15 ? 0.94 : 1})`, ...popStyle(t, w(23), 0.45) }}>{t > tap ? "Distribuído ✓" : "Distribuir"}</div>
                  </div>
                </Win>
              </div>
              <Hand t={t} from={[1880, 1100]} to={[1610, 780]} at={w(24)} tap={tap} leave={tap + 0.9} ripple={AC} />
            </>
          );
        }}
      </Scene>

      {/* 4 · "Tudo fica num quadro só: a fazer, fazendo e feito." — quadro de 3 colunas, cartão viajando */}
      <Scene t={t} a={SC(3)[0]} b={SC(3)[1]} bg={BG} enter="whipR" exit="zoomThrough"
        cam={[F(SC(3)[0], 960, 330, 1.2, -1), F(w(32) + 0.2, 720, 600, 1.16, 0, 0, 3), F(w(36) - 0.2, 1220, 600, 1.16, 0, 0, -3), F(SC(3)[1], 960, 560, 1.03)]}>
        {() => {
          const cols = [{ s: "A fazer", i: 32 }, { s: "Fazendo", i: 34 }, { s: "Feito", i: 36 }];
          const p1 = E.inOut(prog(t, w(34) - 0.3, 0.8)), p2 = E.inOut(prog(t, w(36) - 0.3, 0.8));
          const cx = 210 + 520 * p1 + 520 * p2;
          return (
            <>
              <Center y={180}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 24 }}>
                  <Words t={t} size={54} color={MUTE} weight={600} items={[{ w: "Tudo", at: w(27), color: INK, weight: 800 }, { w: "fica", at: w(28) }, { w: "num", at: w(29) }]} />
                  <Letters t={t} text="quadro só:" at={w(30)} size={110} color={AC} weight={800} />
                </div>
              </Center>
              {cols.map((c, j) => (
                <div key={j} style={{ position: "absolute", left: 170 + j * 540, top: 330, width: 500, height: 620, borderRadius: 40, background: SOFT, ...popStyle(t, w(c.i) - 0.25, 0.5, j % 2 ? 4 : -4) }}>
                  <div style={{ padding: "28px 34px", display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 20, height: 20, borderRadius: 6, background: j === 2 ? AC : INK }} />
                    <div style={{ fontSize: 40, fontWeight: 800, color: INK }}>{c.s}</div>
                  </div>
                  {[0, 1].map((k) => <div key={k} style={{ margin: "0 30px 20px", height: 110, borderRadius: 24, background: "#fff", opacity: 0.9 }}><div style={{ margin: "26px 26px 0", height: 18, width: 260 - k * 70, borderRadius: 9, background: "#E4E6EC" }} /><div style={{ margin: "18px 26px 0", height: 14, width: 180, borderRadius: 7, background: "#EEF0F4" }} /></div>)}
                </div>
              ))}
              <div style={{ position: "absolute", left: cx, top: 690, width: 440, height: 160, borderRadius: 28, background: p2 >= 1 ? LIGHT : "#fff", border: `5px solid ${p2 >= 1 ? AC : INK}`, display: "flex", alignItems: "center", gap: 20, padding: "0 26px", boxShadow: "0 18px 40px rgba(0,0,0,0.10)", transform: `rotate(${Math.sin(Math.PI * (p1 % 1)) * 3 + Math.sin(Math.PI * (p2 % 1)) * 3}deg)`, ...popStyle(t, w(32), 0.5) }}>
                <div style={{ width: 70, height: 70, borderRadius: 20, background: p2 >= 1 ? AC : SOFT, display: "grid", placeItems: "center", flex: "none" }}>{p2 >= 1 ? <Ic k="check" s={42} c="#fff" /> : <Ic k="calendar" s={42} />}</div>
                <div style={{ fontSize: 30, fontWeight: 800, color: INK, lineHeight: 1.15 }}>Lançar campanha<br />de maio</div>
              </div>
            </>
          );
        }}
      </Scene>

      {/* 5 · "O painel mostra o progresso da semana, e os lembretes avisam antes do prazo." — barras + lembrete */}
      <Scene t={t} a={SC(4)[0]} b={SC(4)[1]} bg={BG} enter="zoomIn" exit="shrink"
        cam={[F(SC(4)[0], 760, 420, 1.2, -1), F(w(41) - 0.2, 760, 560, 1.14, 0, 0, 3), F(w(46) - 0.2, 1300, 560, 1.16, 1, 0, -3), F(SC(4)[1], 960, 560, 1.03)]}>
        {() => {
          const bars = [0.42, 0.58, 0.5, 0.78, 0.92];
          const days = ["Seg", "Ter", "Qua", "Qui", "Sex"];
          const pct = Math.round(ip(t, [w(41) - 0.1, w(42) + 0.6], [0, 86], E.outQuint));
          return (
            <>
              <Center y={170}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 22 }}>
                  <Words t={t} size={54} color={MUTE} weight={600} items={[{ w: "O", at: w(37) }, { w: "painel", at: w(38), color: INK, weight: 800 }, { w: "mostra", at: w(39) }, { w: "o", at: w(40) }]} />
                  <Letters t={t} text="progresso" at={w(41)} size={104} color={AC} weight={800} />
                </div>
              </Center>
              <div style={{ ...slideStyle(t, SC(4)[0] + 0.2, -900, 0.7) }}>
                <Win w={900} h={620} title="Semana do time" style={{ left: 170, top: 320 }}>
                  <div style={{ position: "absolute", left: 50, top: 90, fontSize: 90, fontWeight: 800, color: AC, fontVariantNumeric: "tabular-nums" }}>{pct}%</div>
                  <div style={{ position: "absolute", left: 50, top: 196, fontSize: 28, fontWeight: 700, color: MUTE }}>tarefas concluídas</div>
                  {bars.map((b, i) => {
                    const g = E.outQuint(prog(t, w(41) + i * 0.12, 0.7));
                    return (
                      <div key={i} style={{ position: "absolute", left: 60 + i * 160, bottom: 70, width: 110, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 110, height: 280 * b * g, borderRadius: 18, background: i === 4 ? AC : "#CDEFEF" }} />
                        <div style={{ fontSize: 24, fontWeight: 800, color: MUTE }}>{days[i]}</div>
                      </div>
                    );
                  })}
                </Win>
              </div>
              <div style={{ position: "absolute", left: 1140, top: 430, width: 620, height: 200, borderRadius: 36, background: INK, display: "flex", alignItems: "center", gap: 26, padding: "0 34px", ...popStyle(t, w(46) - 0.2, 0.55, -4) }}>
                <div style={{ width: 110, height: 110, borderRadius: 30, background: AC, display: "grid", placeItems: "center", flex: "none" }}><Ic k="bell" s={64} c="#fff" /></div>
                <div>
                  <div style={{ fontSize: 26, fontWeight: 700, color: "rgba(255,255,255,0.6)" }}>Lembrete</div>
                  <div style={{ fontSize: 36, fontWeight: 800, color: "#fff", lineHeight: 1.15 }}>Prazo amanhã, 18h</div>
                </div>
              </div>
              <div style={{ position: "absolute", left: 1140, top: 690, width: 620 }}>
                <Words t={t} size={46} color={MUTE} weight={600} style={{ justifyContent: "flex-start" }} items={[{ w: "os", at: w(45) }, { w: "lembretes", at: w(46), color: INK, weight: 800 }, { w: "avisam", at: w(47) }]} />
                <Letters t={t} text="antes do prazo." at={w(48)} size={78} color={AC} weight={800} style={{ justifyContent: "flex-start", marginTop: 10 }} />
              </div>
            </>
          );
        }}
      </Scene>

      {/* 6 · "Funciona no computador e no celular, com tudo sincronizado." — tela na cor, notebook + celular em contorno branco, seta de sincronia */}
      <Scene t={t} a={SC(5)[0]} b={SC(5)[1]} bg={AC} enter="whipR" exit="zoomThrough"
        cam={[F(SC(5)[0], 960, 300, 1.24, -1), F(w(53), 760, 600, 1.18, 0, 0, 4), F(w(56), 1360, 600, 1.18, 0, 0, -4), F(SC(5)[1], 960, 560, 1.03)]}>
        {() => {
          const sync = E.inOut(prog(t, w(57), 1.2));
          return (
            <>
              <Center y={170}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 22 }}>
                  <Words t={t} size={54} color="rgba(255,255,255,0.85)" weight={600} items={[{ w: "Funciona", at: w(51), color: "#fff", weight: 800 }, { w: "no", at: w(52) }, { w: "computador", at: w(53), color: "#fff", weight: 800 }, { w: "e", at: w(54) }, { w: "no", at: w(55) }, { w: "celular,", at: w(56), color: "#fff", weight: 800 }]} />
                </div>
              </Center>
              <div style={{ position: "absolute", left: 360, top: 330, ...popStyle(t, w(53) - 0.2, 0.6, -6) }}>
                <div style={{ width: 760, height: 460, borderRadius: 30, border: "10px solid #fff", display: "grid", placeItems: "center" }}><div style={{ display: "flex", alignItems: "center", gap: 24 }}><Mark s={110} inverse /><div style={{ fontSize: 60, fontWeight: 800, color: "#fff" }}>Tarefa+</div></div></div>
                <div style={{ width: 900, height: 30, marginLeft: -70, borderRadius: 15, background: "#fff" }} />
              </div>
              <div style={{ position: "absolute", left: 1290, top: 310, width: 260, height: 520, borderRadius: 44, border: "10px solid #fff", display: "grid", placeItems: "center", ...popStyle(t, w(56) - 0.2, 0.6, 8) }}><Mark s={110} inverse /></div>
              <svg width={W} height={H} style={{ position: "absolute", left: 0, top: 0 }}>
                <path d="M1130 300 C1180 230 1260 230 1300 290" fill="none" stroke="#fff" strokeWidth={10} strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - sync} />
                <path d="M1280 262 L1302 292 L1268 302" fill="none" stroke="#fff" strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" opacity={prog(t, w(57) + 1.0, 0.25)} />
              </svg>
              <Center y={960}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 20 }}>
                  <Words t={t} size={54} color="rgba(255,255,255,0.85)" weight={600} items={[{ w: "com", at: w(57) }, { w: "tudo", at: w(58), color: "#fff", weight: 800 }]} />
                  <Letters t={t} text="sincronizado." at={w(59)} size={88} color="#fff" weight={800} />
                </div>
              </Center>
            </>
          );
        }}
      </Scene>

      {/* 7 · "Times que usam o Tarefa Mais ganham foco de verdade." — time com checks + ênfase grande */}
      <Scene t={t} a={SC(6)[0]} b={SC(6)[1]} bg={BG} enter="zoomIn" exit="whipL"
        cam={[F(SC(6)[0], 960, 330, 1.24, -1), F(w(64), 960, 470, 1.14, 0, 3), F(w(67), 960, 700, 1.2, 1), F(SC(6)[1], 960, 600, 1.03)]}>
        {() => (
          <>
            <Center y={240}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 18 }}>
                <Words t={t} size={54} color={MUTE} weight={600} items={[{ w: "Times", at: w(60), color: INK, weight: 800 }, { w: "que", at: w(61) }, { w: "usam", at: w(62) }, { w: "o", at: w(63) }, { w: "Tarefa", at: w(64), color: AC, weight: 800 }, { w: "Mais", at: w(65), color: AC, weight: 800 }, { w: "ganham", at: w(66) }]} />
              </div>
            </Center>
            <div style={{ position: "absolute", left: 0, width: W, top: 340, display: "flex", justifyContent: "center", gap: 50 }}>
              {[0, 1, 2, 3].map((i) => (
                <div key={i} style={{ position: "relative", ...popStyle(t, w(60) + i * 0.15, 0.5, i % 2 ? 8 : -8) }}>
                  <Tile k="person" s={190} on={t > w(66) + i * 0.12} />
                  <div style={{ position: "absolute", right: -16, bottom: -16, width: 70, height: 70, borderRadius: 20, background: "#fff", border: `5px solid ${AC}`, display: "grid", placeItems: "center", ...popStyle(t, w(66) + i * 0.12, 0.4) }}><Ic k="check" s={40} c={AC} /></div>
                </div>
              ))}
            </div>
            <Center y={760}>
              <Letters t={t} text="foco de verdade." at={w(67)} size={140} color={AC} weight={800} stagger={0.03} />
              <Underline t={t} at={w(69) + 0.2} width={620} color={AC} thick={10} />
            </Center>
          </>
        )}
      </Scene>

      {/* 8 · "Tarefa Mais. Organize hoje, entregue amanhã." — marca + assinatura */}
      <Scene t={t} a={SC(7)[0]} b={SC(7)[1]} bg={BG} enter="pop" exit="none" drift={0.4}
        cam={[F(SC(7)[0], 960, 420, 1.24, -1), F(w(72), 960, 540, 1.0), F(SC(7)[1], 960, 540, 1.04)]}>
        {() => (
          <>
            <Center y={400}>
              <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
                <div style={popStyle(t, w(70) - 0.25, 0.65, -12)}><Mark s={190} /></div>
                <Letters t={t} text="Tarefa+" at={w(70)} size={170} color={INK} weight={800} />
              </div>
            </Center>
            <Center y={720}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 22 }}>
                <Words t={t} size={60} color={MUTE} weight={600} items={[{ w: "Organize", at: w(72), color: INK, weight: 800 }, { w: "hoje,", at: w(73) }]} />
                <Letters t={t} text="entregue amanhã." at={w(74)} size={96} color={AC} weight={800} stagger={0.028} />
              </div>
              <Underline t={t} at={w(75) + 0.4} width={560} color={AC} thick={10} />
            </Center>
          </>
        )}
      </Scene>

      {watermark && <Watermark t={t} text={WATERMARK} />}
      <Soundtrack fps={fps} />
    </AbsoluteFill>
  );
};

/* ---------------- som: só nas ações importantes ---------------- */
type Fx = [number, string, number];
const sfxList = (): Fx[] => {
  const L: Fx[] = [];
  B.slice(1).forEach((b, i) => { L.push([b - 0.32, i % 3 === 1 ? "zoom.mp3" : "whoosh.mp3", 0.3]); L.push([b - 0.02, "swoosh.mp3", 0.16]); });
  const add = (at: number, f: string, v: number) => L.push([at, f, v]);
  add(0.02, "text-in.mp3", 0.2); for (let i = 0; i < 5; i++) add(w(4) + i * 0.25, "pop.mp3", 0.18); add(w(7) - 0.15, "zoomin.mp3", 0.18); add(w(9) + 0.1, "scribble.mp3", 0.24);
  add(w(12) - 0.3, "reveal.mp3", 0.34); add(w(12) - 0.3, "sparkle.mp3", 0.22);
  add(SC(2)[0] + 0.2, "swish.mp3", 0.24); add(w(14), "typing.mp3", 0.16); add(w(19) - 0.2, "pop.mp3", 0.24); for (let i = 0; i < 3; i++) add(w(21) + i * 0.15, "pop.mp3", 0.18); add(w(26) - 0.02, "click.mp3", 0.34); add(w(26) + 0.1, "notify.mp3", 0.24);
  [32, 34, 36].forEach((i) => add(w(i) - 0.25, "pop.mp3", 0.22)); add(w(34) - 0.3, "swish.mp3", 0.2); add(w(36) - 0.3, "swish.mp3", 0.2); add(w(36) + 0.5, "notify.mp3", 0.26);
  add(SC(4)[0] + 0.2, "swish.mp3", 0.24); add(w(41) - 0.1, "tick.mp3", 0.12); add(w(46) - 0.2, "message.mp3", 0.3);
  add(w(53) - 0.2, "pop.mp3", 0.26); add(w(56) - 0.2, "pop.mp3", 0.26); add(w(57), "scribble.mp3", 0.24);
  for (let i = 0; i < 4; i++) add(w(60) + i * 0.15, "pop.mp3", 0.16); add(w(66), "notify.mp3", 0.24); add(w(67) - 0.15, "zoomin.mp3", 0.18); add(w(69) + 0.2, "scribble.mp3", 0.24);
  add(w(70) - 0.25, "reveal.mp3", 0.34); add(w(70) - 0.25, "sparkle.mp3", 0.24); add(w(75) + 0.4, "scribble.mp3", 0.26); add(w(75) + 1.1, "stamp.mp3", 0.2);
  return L.filter(([at]) => at >= 0 && at < TOTAL);
};

const Soundtrack: React.FC<{ fps: number }> = ({ fps }) => {
  const fx = React.useMemo(sfxList, []);
  return (
    <>
      <Audio src={staticFile("audio/voiceover.mp3")} volume={1} />
      <Audio src={staticFile("audio/music.mp3")} volume={(f) => {
        const s = f / fps; const talking = words.some((x) => s > x.start - 0.15 && s < x.end + 0.25);
        return (talking ? 0.07 : 0.16) * Math.max(0, Math.min(1, (TOTAL - s) / 2.5));
      }} />
      {fx.map(([at, f, v], i) => (
        <Sequence key={i} from={Math.round(at * fps)} durationInFrames={Math.round(1.6 * fps)}>
          <Audio src={staticFile(`sfx/${f}`)} volume={v} />
        </Sequence>
      ))}
    </>
  );
};
```

## 15.1 · Soul Pay · 9:16 · verde #26D367 · 57 s (o mais completo: riscado, checklist + mão, checkout Pix com QR, entrega, painel com gráfico, cupom + chat, preço com a única pílula, final)

```tsx
import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile, useVideoConfig } from "remotion";
import T from "../public/audio/voiceover-timings.json";
import {
  Center, E, F, FONT, Hand, Letters, PhoneOutline, Pill, Scene, Underline, Words, W,
  popStyle, prog, slideStyle, useSec,
} from "./lib";

/* Soul Pay · estilo OpenMotionKit · verde #26D367 (do CSS do site) e branco · 9:16
   Câmera SUAVE focando nos itens (movimentos ≥ 1,2 s, zoom ≤ 1,3). SEM círculo/anel/mancha.
   Ênfase = palavra MAIOR; 1 única pílula (cena 8). Som sem excesso: nada de tique por palavra nem rajada de tick. */
const BG = "#FFFFFF", GR = "#26D367", GD = "#17A34F", INK = "#17171A", MUTE = "#A3A3A3", SOFT = "#F4F4F5", LG = "#E9FBF0";

const words = (T as { words: { word: string; start: number; end: number }[] }).words;
const w = (i: number) => words[i]!.start;
export const TOTAL = Math.max(45, Math.ceil(words[words.length - 1]!.end + 4.5));
const B = [0, w(10), w(14), w(25), w(42), w(56), w(69), w(78), w(89)].map((x, i) => (i === 0 ? 0 : x - 0.12));
const SC = (i: number): [number, number] => [B[i]!, i + 1 < B.length ? B[i + 1]! : TOTAL];

/* marca oficial (img/logo-soul-pay.webp do site); versão branca = mesma forma usada como máscara */
const Mark: React.FC<{ s: number; white?: boolean }> = ({ s, white }) => {
  const h = (s * 484) / 512;
  return white
    ? <div style={{ width: s, height: h, background: "#fff", WebkitMaskImage: `url(${staticFile("brand/soulpay-mark.png")})`, WebkitMaskSize: "contain", WebkitMaskRepeat: "no-repeat", maskImage: `url(${staticFile("brand/soulpay-mark.png")})`, maskSize: "contain", maskRepeat: "no-repeat" }} />
    : <Img src={staticFile("brand/soulpay-mark.png")} style={{ width: s, height: h, display: "block" }} />;
};

const P: Record<string, (c: string) => React.ReactNode> = {
  store: (c) => <><path d="M10 40 L18 12 H82 L90 40 Z" fill="none" stroke={c} strokeWidth="6" strokeLinejoin="round" /><path d="M18 46 V90 H82 V46" fill="none" stroke={c} strokeWidth="6" /><rect x="40" y="62" width="20" height="28" fill={c} /></>,
  bill: (c) => <><path d="M20 8 H80 V92 L70 84 L60 92 L50 84 L40 92 L30 84 L20 92 Z" fill="none" stroke={c} strokeWidth="6" strokeLinejoin="round" /><path d="M34 32 H66 M34 48 H66 M34 64 H54" stroke={c} strokeWidth="6" strokeLinecap="round" /></>,
  box: (c) => <><path d="M50 8 L88 28 V72 L50 92 L12 72 V28 Z" fill="none" stroke={c} strokeWidth="6" strokeLinejoin="round" /><path d="M12 28 L50 48 L88 28 M50 48 V92" fill="none" stroke={c} strokeWidth="6" strokeLinejoin="round" /></>,
  brush: (c) => <><path d="M62 10 L90 38 L52 76 L24 48 Z" fill="none" stroke={c} strokeWidth="6" strokeLinejoin="round" /><path d="M24 48 C10 56 14 72 8 90 C26 86 44 90 52 76" fill={c} /></>,
  link: (c) => <><path d="M44 56 a14 14 0 0 0 20 0 l16 -16 a14 14 0 0 0 -20 -20 l-6 6" fill="none" stroke={c} strokeWidth="7" strokeLinecap="round" /><path d="M56 44 a14 14 0 0 0 -20 0 l-16 16 a14 14 0 0 0 20 20 l6 -6" fill="none" stroke={c} strokeWidth="7" strokeLinecap="round" /></>,
  mail: (c) => <><rect x="8" y="20" width="84" height="60" rx="10" fill="none" stroke={c} strokeWidth="6" /><path d="M10 24 L50 54 L90 24" fill="none" stroke={c} strokeWidth="6" strokeLinejoin="round" /></>,
  globe: (c) => <><circle cx="50" cy="50" r="40" fill="none" stroke={c} strokeWidth="6" /><path d="M10 50 H90 M50 10 C30 30 30 70 50 90 C70 70 70 30 50 10" fill="none" stroke={c} strokeWidth="6" /></>,
  cart: (c) => <><path d="M6 14 H20 L32 66 H80 L90 30 H26" fill="none" stroke={c} strokeWidth="6" strokeLinejoin="round" strokeLinecap="round" /><circle cx="38" cy="82" r="7" fill={c} /><circle cx="74" cy="82" r="7" fill={c} /></>,
  list: (c) => <><rect x="12" y="10" width="76" height="80" rx="10" fill="none" stroke={c} strokeWidth="6" /><path d="M28 34 H72 M28 50 H72 M28 66 H56" stroke={c} strokeWidth="6" strokeLinecap="round" /></>,
  people: (c) => <><circle cx="36" cy="32" r="14" fill={c} /><path d="M8 90 Q8 54 36 54 Q64 54 64 90 Z" fill={c} /><circle cx="70" cy="36" r="11" fill="none" stroke={c} strokeWidth="5" /><path d="M66 56 Q92 56 92 88" fill="none" stroke={c} strokeWidth="5" strokeLinecap="round" /></>,
  check: (c) => <path d="M18 52 L40 74 L84 26" fill="none" stroke={c} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />,
};
const Ic: React.FC<{ k: string; s: number; c?: string }> = ({ k, s, c = INK }) => (
  <svg width={s} height={s} viewBox="0 0 100 100" style={{ overflow: "visible", display: "block" }}>{P[k]!(c)}</svg>
);
const Tile: React.FC<{ k: string; s?: number; on?: boolean }> = ({ k, s = 200, on }) => (
  <div style={{ width: s, height: s, borderRadius: s * 0.24, background: on ? GR : SOFT, display: "grid", placeItems: "center" }}><Ic k={k} s={s * 0.54} c={on ? "#fff" : INK} /></div>
);
/* QR code ilustrativo (padrão determinístico) */
const QR: React.FC<{ s: number; t: number; at: number }> = ({ s, t, at }) => {
  const n = 21, c = s / n, cells: React.ReactNode[] = [];
  const finder = (x: number, y: number) => (x < 7 && y < 7) || (x >= n - 7 && y < 7) || (x < 7 && y >= n - 7);
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
    let on: boolean;
    if (finder(x, y)) { const fx = x >= n - 7 ? x - (n - 7) : x, fy = y >= n - 7 ? y - (n - 7) : y; on = fx === 0 || fx === 6 || fy === 0 || fy === 6 || (fx >= 2 && fx <= 4 && fy >= 2 && fy <= 4); }
    else on = ((x * 7 + y * 13 + x * y * 3) % 5) < 2;
    const appear = prog(t, at + ((x + y) / (2 * n)) * 0.6, 0.2);
    if (on) cells.push(<rect key={`${x}-${y}`} x={x * c} y={y * c} width={c + 0.5} height={c + 0.5} fill={INK} opacity={appear} />);
  }
  return <svg width={s} height={s}>{cells}</svg>;
};

export const Video: React.FC<{ watermark: boolean }> = ({ watermark }) => {
  const t = useSec();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ background: BG, fontFamily: FONT }}>
      {/* 1 · "Já pensou em ter sua loja virtual sem pagar mensalidade?" — loja + boleto de mensalidade riscado à mão */}
      <Scene t={t} a={SC(0)[0]} b={SC(0)[1]} bg={BG} enter="none" exit="whipL"
        cam={[F(0, 540, 560, 1.28, -1), F(2.4, 540, 980, 1.22, 0, 3), F(SC(0)[1], 540, 1040, 1.04)]}>
        {() => {
          const strike = E.inOut(prog(t, w(9) - 0.1, 0.7));
          return (
            <>
              <Center y={520}>
                <Words t={t} size={62} color={MUTE} weight={600} items={[{ w: "Já", at: w(0) }, { w: "pensou", at: w(1), color: INK, weight: 800 }, { w: "em", at: w(2) }, { w: "ter", at: w(3) }]} />
                <Words t={t} size={62} color={MUTE} weight={600} items={[{ w: "sua", at: w(4) }, { w: "loja", at: w(5), color: INK, weight: 800 }, { w: "virtual", at: w(6), color: INK, weight: 800 }]} />
              </Center>
              <div style={{ position: "absolute", left: 160, top: 760, ...popStyle(t, w(5) - 0.15, 0.55, -10) }}><Tile k="store" s={300} on /></div>
              <div style={{ position: "absolute", left: 560, top: 800, width: 360, height: 260, borderRadius: 48, background: SOFT, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, ...popStyle(t, w(7) - 0.15, 0.55, 10) }}>
                <Ic k="bill" s={110} c={INK} />
                <div style={{ fontSize: 40, fontWeight: 800, color: INK }}>Mensalidade</div>
              </div>
              <svg width={W} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
                <path d="M550 1080 C650 990 780 900 930 800" fill="none" stroke={GR} strokeWidth={16} strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - strike} />
              </svg>
              <Center y={1360}>
                <Words t={t} size={58} color={MUTE} weight={600} items={[{ w: "sem", at: w(7), color: INK, weight: 800 }, { w: "pagar", at: w(8) }]} />
                <Letters t={t} text="mensalidade?" at={w(9)} size={120} color={GR} weight={800} stagger={0.03} />
              </Center>
            </>
          );
        }}
      </Scene>

      {/* 2 · "Conheça a Soul Pay." — tela verde, marca oficial em branco */}
      <Scene t={t} a={SC(1)[0]} b={SC(1)[1]} bg={GR} enter="whipR" exit="zoomThrough"
        cam={[F(SC(1)[0], 540, 880, 1.26, -2), F(SC(1)[1], 540, 960, 1.02)]}>
        {() => (
          <Center y={960}>
            <Words t={t} size={66} color="rgba(255,255,255,0.85)" weight={600} items={[{ w: "Conheça", at: w(10) }, { w: "a", at: w(11) }]} />
            <div style={{ height: 40 }} />
            <div style={popStyle(t, w(12) - 0.3, 0.65, -12)}><Mark s={300} white /></div>
            <div style={{ height: 30 }} />
            <Letters t={t} text="Soul Pay" at={w(12)} size={140} color="#fff" weight={800} />
          </Center>
        )}
      </Scene>

      {/* 3 · "Você cadastra os produtos, personaliza a vitrine e compartilha o link." — 3 passos + mão copia o link */}
      <Scene t={t} a={SC(2)[0]} b={SC(2)[1]} bg={BG} enter="zoomIn" exit="whipL"
        cam={[F(SC(2)[0], 540, 640, 1.26, -1), F(w(18) - 0.2, 540, 860, 1.26, 0, 3), F(w(22) - 0.2, 540, 1240, 1.26, 1, 0, -3), F(SC(2)[1], 540, 1000, 1.04)]}>
        {() => {
          const S = [{ k: "box", s: "Cadastre os produtos", i: 15 }, { k: "brush", s: "Personalize a vitrine", i: 18 }, { k: "link", s: "Compartilhe o link", i: 22 }];
          const tap = w(24);
          return (
            <>
              <Center y={330}>
                <Words t={t} size={64} color={MUTE} weight={600} items={[{ w: "Você", at: w(14), color: INK, weight: 800 }]} />
              </Center>
              {S.map((r, j) => {
                const on = t > w(r.i) + 0.3;
                return (
                  <div key={j} style={{ position: "absolute", left: 110, top: 480 + j * 220, width: 860, height: 180, borderRadius: 48, background: on ? LG : SOFT, display: "flex", alignItems: "center", gap: 30, padding: "0 36px", ...slideStyle(t, w(r.i) - 0.4, j % 2 ? 900 : -900, 0.6) }}>
                    <div style={{ width: 112, height: 112, borderRadius: 30, background: GR, display: "grid", placeItems: "center", flex: "none" }}><Ic k={r.k} s={66} c="#fff" /></div>
                    <div style={{ flex: 1, fontSize: 50, fontWeight: 800, color: INK }}>{r.s}</div>
                    <div style={{ width: 64, height: 64, borderRadius: 18, background: on ? GR : "#fff", border: on ? "none" : `5px solid ${INK}`, display: "grid", placeItems: "center" }}>{on && <div style={popStyle(t, w(r.i) + 0.3, 0.4)}><Ic k="check" s={42} c="#fff" /></div>}</div>
                  </div>
                );
              })}
              <div style={{ position: "absolute", left: 110, top: 1180, width: 860, height: 140, borderRadius: 70, border: `6px solid ${INK}`, display: "flex", alignItems: "center", gap: 24, padding: "0 16px 0 40px", ...slideStyle(t, w(22), 900, 0.6) }}>
                <Ic k="link" s={56} c={INK} />
                <div style={{ flex: 1, fontSize: 40, fontWeight: 700, color: MUTE }}>link da sua loja</div>
                <div style={{ height: 100, padding: "0 36px", borderRadius: 50, background: t > tap ? GD : GR, display: "grid", placeItems: "center", fontSize: 38, fontWeight: 800, color: "#fff", transform: `scale(${t > tap - 0.05 && t < tap + 0.15 ? 0.94 : 1})` }}>{t > tap ? "Copiado!" : "Copiar"}</div>
              </div>
              <Hand t={t} from={[1000, 1800]} to={[860, 1260]} at={w(22) + 0.3} tap={tap} leave={tap + 0.8} ripple={GR} />
            </>
          );
        }}
      </Scene>

      {/* 4 · "O cliente paga no Pix, com QR Code ou copia e cola, e a confirmação é automática." — checkout Pix no celular */}
      <Scene t={t} a={SC(3)[0]} b={SC(3)[1]} bg={BG} enter="whipR" exit="zoomThrough"
        cam={[F(SC(3)[0], 540, 380, 1.26, -1), F(w(30) - 0.2, 540, 900, 1.26, 0, 0, -3), F(w(37), 540, 1180, 1.22, 1), F(w(41) + 0.3, 540, 1450, 1.18)]}>
        {() => {
          const ok = w(39);
          return (
            <>
              <Center y={330}>
                <Words t={t} size={58} color={MUTE} weight={600} items={[{ w: "O", at: w(25) }, { w: "cliente", at: w(26), color: INK, weight: 800 }, { w: "paga", at: w(27) }, { w: "no", at: w(28) }]} />
                <Letters t={t} text="Pix," at={w(29)} size={140} color={GR} weight={800} />
              </Center>
              <div style={{ position: "absolute", left: 290, top: 560, transform: `translateY(${(1 - E.outExpo(prog(t, SC(3)[0] + 0.2, 0.9))) * 900}px)` }}>
                <PhoneOutline w={500} h={900} ink={INK}>
                  <div style={{ position: "absolute", left: 0, right: 0, top: 90, display: "flex", flexDirection: "column", alignItems: "center", gap: 26 }}>
                    <div style={{ fontSize: 34, fontWeight: 800, color: INK }}>Pague com Pix</div>
                    <div style={{ padding: 18, borderRadius: 28, border: `4px solid ${SOFT}` }}><QR s={290} t={t} at={w(31) - 0.3} /></div>
                    <div style={{ width: 380, height: 92, borderRadius: 46, background: t > w(34) ? GD : GR, display: "grid", placeItems: "center", fontSize: 36, fontWeight: 800, color: "#fff", ...popStyle(t, w(33) - 0.2, 0.45) }}>{t > w(34) ? "Código copiado" : "Copia e cola"}</div>
                    <div style={{ width: 400, height: 110, borderRadius: 30, background: LG, display: "flex", alignItems: "center", gap: 18, padding: "0 24px", ...popStyle(t, ok - 0.1, 0.5) }}>
                      <div style={{ width: 66, height: 66, borderRadius: 33, background: GR, display: "grid", placeItems: "center", flex: "none" }}><Ic k="check" s={40} c="#fff" /></div>
                      <div style={{ fontSize: 32, fontWeight: 800, color: INK, lineHeight: 1.15 }}>Pagamento<br />confirmado</div>
                    </div>
                  </div>
                </PhoneOutline>
              </div>
              <Hand t={t} from={[1000, 1800]} to={[600, 1130]} at={w(33)} tap={w(34)} leave={w(35) + 0.3} ripple={GR} />
              <Center y={1630}>
                <Words t={t} size={56} color={MUTE} weight={600} items={[{ w: "e", at: w(37) }, { w: "a", at: w(38) }, { w: "confirmação", at: w(39), color: INK, weight: 800 }, { w: "é", at: w(40) }]} />
                <Letters t={t} text="automática." at={w(41)} size={116} color={GR} weight={800} stagger={0.03} />
              </Center>
            </>
          );
        }}
      </Scene>

      {/* 5 · "Pagamento aprovado? O produto digital é entregue na hora, por e-mail e no site." — pacote se divide em e-mail e site */}
      <Scene t={t} a={SC(4)[0]} b={SC(4)[1]} bg={BG} enter="zoomIn" exit="whipL"
        cam={[F(SC(4)[0], 540, 420, 1.28, -1), F(w(45) - 0.2, 540, 880, 1.24, 0, 3), F(w(51), 540, 1380, 1.26, 0, 0, -3), F(SC(4)[1], 540, 1100, 1.04)]}>
        {() => {
          const split = E.inOut(prog(t, w(51) - 0.2, 1.0));
          return (
            <>
              <Center y={390}>
                <Words t={t} size={64} color={MUTE} weight={600} items={[{ w: "Pagamento", at: w(42), color: INK, weight: 800 }]} />
                <Letters t={t} text="aprovado?" at={w(43)} size={124} color={GR} weight={800} />
              </Center>
              <div style={{ position: "absolute", left: 540 - 130, top: 640, ...popStyle(t, w(45) - 0.2, 0.55, -10) }}><Tile k="box" s={260} on /></div>
              <Center y={1010}>
                <Words t={t} size={52} color={MUTE} weight={600} items={[{ w: "O", at: w(44) }, { w: "produto", at: w(45), color: INK, weight: 800 }, { w: "digital", at: w(46), color: INK, weight: 800 }, { w: "é", at: w(47) }, { w: "entregue", at: w(48), color: INK, weight: 800 }]} />
                <Letters t={t} text="na hora," at={w(49)} size={110} color={GR} weight={800} />
              </Center>
              <svg width={W} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
                <path d="M540 1180 C540 1250 300 1250 300 1320" fill="none" stroke={GR} strokeWidth={10} strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - split} />
                <path d="M540 1180 C540 1250 780 1250 780 1320" fill="none" stroke={GR} strokeWidth={10} strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - split} />
              </svg>
              {[{ k: "mail", s: "por e-mail", x: 300, i: 52 }, { k: "globe", s: "no site", x: 780, i: 54 }].map((d, j) => (
                <div key={j} style={{ position: "absolute", left: d.x - 110, top: 1330, width: 220, display: "flex", flexDirection: "column", alignItems: "center", gap: 18, ...popStyle(t, w(d.i) - 0.2, 0.5, j ? 10 : -10) }}>
                  <Tile k={d.k} s={200} />
                  <div style={{ fontSize: 44, fontWeight: 800, color: INK }}>{d.s}</div>
                </div>
              ))}
            </>
          );
        }}
      </Scene>

      {/* 6 · "No painel, você vê vendas, pedidos, produtos e clientes, tudo num só lugar." — painel 2×2 + gráfico */}
      <Scene t={t} a={SC(5)[0]} b={SC(5)[1]} bg={BG} enter="whipR" exit="zoomThrough"
        cam={[F(SC(5)[0], 540, 330, 1.28, -1), F(w(60) - 0.2, 540, 680, 1.26, -1, 3), F(w(64) - 0.2, 540, 1180, 1.24, 1, 0, -3), F(SC(5)[1], 540, 1120, 1.04)]}>
        {() => {
          const C = [{ k: "cart", s: "Vendas", i: 60 }, { k: "list", s: "Pedidos", i: 61 }, { k: "box", s: "Produtos", i: 62 }, { k: "people", s: "Clientes", i: 64 }];
          const chart = E.inOut(prog(t, w(64) + 0.2, 1.4));
          return (
            <>
              <Center y={300}>
                <Words t={t} size={58} color={MUTE} weight={600} items={[{ w: "No", at: w(56) }]} />
                <Letters t={t} text="painel," at={w(57)} size={124} color={INK} weight={800} />
              </Center>
              <div style={{ position: "absolute", left: 90, top: 470, width: 900, height: 1000, borderRadius: 56, border: `6px solid ${INK}`, background: "#fff", ...slideStyle(t, SC(5)[0] + 0.2, 1000, 0.7) }}>
                <div style={{ position: "absolute", left: 40, top: 34, display: "flex", alignItems: "center", gap: 16 }}><Mark s={56} /><div style={{ fontSize: 36, fontWeight: 800, color: INK }}>Minha loja</div></div>
                {C.map((c, j) => (
                  <div key={j} style={{ position: "absolute", left: 40 + (j % 2) * 420, top: 130 + Math.floor(j / 2) * 250, width: 390, height: 220, borderRadius: 40, background: t > w(c.i) ? LG : SOFT, display: "flex", flexDirection: "column", justifyContent: "center", gap: 18, padding: "0 34px", ...popStyle(t, w(c.i) - 0.2, 0.5) }}>
                    <div style={{ width: 84, height: 84, borderRadius: 24, background: GR, display: "grid", placeItems: "center" }}><Ic k={c.k} s={50} c="#fff" /></div>
                    <div style={{ fontSize: 46, fontWeight: 800, color: INK }}>{c.s}</div>
                  </div>
                ))}
                <svg width={820} height={380} style={{ position: "absolute", left: 40, top: 640 }}>
                  <path d="M10 330 H810" stroke={SOFT} strokeWidth={6} />
                  <path d="M10 300 C90 290 120 240 200 250 C280 260 300 190 380 180 C460 170 480 210 560 150 C640 90 700 110 810 40" fill="none" stroke={GR} strokeWidth={12} strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - chart} />
                </svg>
              </div>
              <Center y={1640}>
                <Words t={t} size={56} color={MUTE} weight={600} items={[{ w: "tudo", at: w(65), color: INK, weight: 800 }, { w: "num", at: w(66) }]} />
                <Letters t={t} text="só lugar." at={w(67)} size={116} color={GR} weight={800} />
              </Center>
            </>
          );
        }}
      </Scene>

      {/* 7 · "E ainda cria cupons e conversa com o comprador." — cupom + chat */}
      <Scene t={t} a={SC(6)[0]} b={SC(6)[1]} bg={BG} enter="zoomIn" exit="whipL"
        cam={[F(SC(6)[0], 540, 560, 1.26, -1), F(w(74) - 0.2, 540, 1000, 1.26, 0, 0, -3), F(SC(6)[1], 540, 1120, 1.06)]}>
        {() => (
          <>
            <Center y={320}>
              <Words t={t} size={58} color={MUTE} weight={600} items={[{ w: "E", at: w(69) }, { w: "ainda", at: w(70) }, { w: "cria", at: w(71), color: INK, weight: 800 }]} />
              <Letters t={t} text="cupons" at={w(72)} size={124} color={GR} weight={800} />
            </Center>
            <div style={{ position: "absolute", left: 190, top: 520, width: 700, height: 200, borderRadius: 40, background: GR, display: "flex", alignItems: "center", ...popStyle(t, w(72) - 0.1, 0.55, -6) }}>
              <div style={{ flex: 1, paddingLeft: 50 }}>
                <div style={{ fontSize: 34, fontWeight: 700, color: "rgba(255,255,255,0.85)" }}>Cupom</div>
                <div style={{ fontSize: 58, fontWeight: 800, color: "#fff", letterSpacing: "0.04em" }}>BEMVINDO10</div>
              </div>
              <div style={{ width: 0, height: 150, borderLeft: "6px dashed rgba(255,255,255,0.7)" }} />
              <div style={{ width: 170, textAlign: "center", fontSize: 54, fontWeight: 800, color: "#fff" }}>10%</div>
            </div>
            <div style={{ position: "absolute", left: 130, top: 860, maxWidth: 640, padding: "30px 40px", borderRadius: "44px 44px 44px 12px", background: SOFT, fontSize: 44, fontWeight: 700, color: INK, ...popStyle(t, w(74) - 0.1, 0.5) }}>Recebi o produto, chegou certinho!</div>
            <div style={{ position: "absolute", right: 130, top: 1080, maxWidth: 560, padding: "30px 40px", borderRadius: "44px 44px 12px 44px", background: GR, fontSize: 44, fontWeight: 700, color: "#fff", ...popStyle(t, w(76), 0.5) }}>Que bom! Obrigada 💚</div>
            <Center y={1440}>
              <Words t={t} size={56} color={MUTE} weight={600} items={[{ w: "e", at: w(73) }, { w: "conversa", at: w(74), color: INK, weight: 800 }, { w: "com", at: w(75) }, { w: "o", at: w(76) }]} />
              <Letters t={t} text="comprador." at={w(77)} size={110} color={GR} weight={800} />
            </Center>
          </>
        )}
      </Scene>

      {/* 8 · "Zero de mensalidade: você só paga 4% quando vender." — tela verde, R$ 0 e 4%; a ÚNICA pílula */}
      <Scene t={t} a={SC(7)[0]} b={SC(7)[1]} bg={GR} enter="whipR" exit="zoomThrough"
        cam={[F(SC(7)[0], 540, 620, 1.26, -1), F(w(81) - 0.2, 540, 980, 1.2, 0, 3), F(w(87) - 0.2, 540, 1280, 1.24, 1), F(SC(7)[1], 540, 1100, 1.06)]}>
        {() => (
          <>
            <Center y={540}>
              <div style={{ fontSize: 250, fontWeight: 800, letterSpacing: "-0.04em", color: "#fff", lineHeight: 1, ...popStyle(t, w(78) - 0.15, 0.55) }}>R$ 0</div>
              <Words t={t} size={60} color="rgba(255,255,255,0.85)" weight={600} items={[{ w: "de", at: w(79) }, { w: "mensalidade", at: w(80), color: "#fff", weight: 800 }]} />
            </Center>
            <Center y={1080}>
              <Words t={t} size={58} color="rgba(255,255,255,0.85)" weight={600} items={[{ w: "você", at: w(81) }, { w: "só", at: w(82), color: "#fff", weight: 800 }, { w: "paga", at: w(83) }]} />
              <div style={{ fontSize: 300, fontWeight: 800, letterSpacing: "-0.05em", color: "#fff", lineHeight: 1, ...popStyle(t, w(84) - 0.15, 0.6, -6) }}>4%</div>
            </Center>
            <Center y={1460}>
              <Pill t={t} at={w(87)} text="só quando vender." bg="#fff" color={GD} size={68} rot={-2} />
            </Center>
          </>
        )}
      </Scene>

      {/* 9 · "Soul Pay. Sua loja virtual, grátis para começar." — marca oficial + slogan do site (hold) */}
      <Scene t={t} a={SC(8)[0]} b={SC(8)[1]} bg={BG} enter="pop" exit="none" drift={0.4}
        cam={[F(SC(8)[0], 540, 800, 1.26, -1), F(w(91), 540, 960, 1.0), F(SC(8)[1], 540, 960, 1.05)]}>
        {() => (
          <>
            <Center y={760}>
              <div style={popStyle(t, w(89) - 0.25, 0.65, -12)}><Mark s={300} /></div>
              <div style={{ height: 30 }} />
              <Letters t={t} text="Soul Pay" at={w(89)} size={130} color={INK} weight={800} />
            </Center>
            <Center y={1250}>
              <Words t={t} size={58} color={MUTE} weight={600} items={[{ w: "Sua", at: w(91) }, { w: "loja", at: w(92), color: INK, weight: 800 }, { w: "virtual,", at: w(93), color: INK, weight: 800 }]} />
              <Letters t={t} text="grátis para começar." at={w(94)} size={88} color={GR} weight={800} stagger={0.025} />
              <Underline t={t} at={w(96) + 0.3} width={520} color={GR} thick={12} />
            </Center>
          </>
        )}
      </Scene>

      {watermark && <Watermark t={t} text="Seu Estúdio" />  /* componente Watermark: copie da 15.0 */}
      <Soundtrack fps={fps} />
    </AbsoluteFill>
  );
};

/* ---------------- som: só nas ações importantes (sem tique por palavra, sem rajada de tick) ---------------- */
type Fx = [number, string, number];
const sfxList = (): Fx[] => {
  const L: Fx[] = [];
  B.slice(1).forEach((b, i) => { L.push([b - 0.32, i % 3 === 1 ? "zoom.mp3" : "whoosh.mp3", 0.3]); L.push([b - 0.02, "swoosh.mp3", 0.16]); });
  const add = (at: number, f: string, v: number) => L.push([at, f, v]);
  add(0.02, "text-in.mp3", 0.2); add(w(5) - 0.15, "pop.mp3", 0.26); add(w(7) - 0.15, "pop.mp3", 0.24); add(w(9) - 0.1, "scribble.mp3", 0.28);
  add(w(12) - 0.3, "reveal.mp3", 0.34); add(w(12) - 0.3, "sparkle.mp3", 0.22);
  [15, 18, 22].forEach((i) => { add(w(i) - 0.4, "swish.mp3", 0.2); add(w(i) + 0.3, "pop.mp3", 0.22); }); add(w(24), "click.mp3", 0.34);
  add(SC(3)[0] + 0.2, "swish.mp3", 0.24); add(w(31) - 0.3, "reveal.mp3", 0.22); add(w(34), "click.mp3", 0.34); add(w(39) - 0.1, "notify.mp3", 0.3);
  add(w(45) - 0.2, "pop.mp3", 0.28); add(w(51) - 0.2, "scribble.mp3", 0.24); add(w(52) - 0.2, "pop.mp3", 0.22); add(w(54) - 0.2, "pop.mp3", 0.22);
  add(SC(5)[0] + 0.2, "swish.mp3", 0.24); [60, 61, 62, 64].forEach((i) => add(w(i) - 0.2, "pop.mp3", 0.2)); add(w(64) + 0.2, "scribble.mp3", 0.22);
  add(w(72) - 0.1, "pop.mp3", 0.28); add(w(74) - 0.1, "message.mp3", 0.3); add(w(76), "message.mp3", 0.3);
  add(w(78) - 0.15, "pop.mp3", 0.28); add(w(84) - 0.15, "tick.mp3", 0.14); add(w(84) + 0.1, "pop.mp3", 0.28); add(w(87), "pop.mp3", 0.26);
  add(w(89) - 0.25, "reveal.mp3", 0.34); add(w(89) - 0.25, "sparkle.mp3", 0.24); add(w(96) + 0.3, "scribble.mp3", 0.26); add(w(96) + 1.0, "stamp.mp3", 0.2);
  return L.filter(([at]) => at >= 0 && at < TOTAL);
};

const Soundtrack: React.FC<{ fps: number }> = ({ fps }) => {
  const fx = React.useMemo(sfxList, []);
  return (
    <>
      <Audio src={staticFile("audio/voiceover.mp3")} volume={1} />
      <Audio src={staticFile("audio/music.mp3")} volume={(f) => {
        const s = f / fps; const talking = words.some((x) => s > x.start - 0.15 && s < x.end + 0.25);
        return (talking ? 0.07 : 0.16) * Math.max(0, Math.min(1, (TOTAL - s) / 2.5));
      }} />
      {fx.map(([at, f, v], i) => (
        <Sequence key={i} from={Math.round(at * fps)} durationInFrames={Math.round(1.6 * fps)}>
          <Audio src={staticFile(`sfx/${f}`)} volume={v} />
        </Sequence>
      ))}
    </>
  );
};
```

## 15.2 · Itaú · 9:16 · laranja #FF6200 · 50 s (gerações, contador de ano + cidades, fusão de cards, celular com 3 chaves e 3 mãos, contador 100 + seta, propósito, final; sem pílula)

```tsx
import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile, useVideoConfig } from "remotion";
import T from "../public/audio/voiceover-timings.json";
import {
  Center, E, F, FONT, Hand, Letters, PhoneOutline, Scene, Toggle, Underline, Words, W,
  ip, popStyle, prog, slideStyle, useSec,
} from "./lib";

/* Itaú · estilo OpenMotionKit · laranja e branco · 9:16
   Câmera SUAVE focando nos itens (movimentos ≥ 1,2 s, zoom ≤ 1,3, giros pequenos) — regra do estilo.
   SEM círculo/anel/mancha de fundo; ênfase = palavra MAIOR; nenhuma pílula neste vídeo. */
const BG = "#FFFFFF", OR = "#FF6200", INK = "#111111", MUTE = "#9C968F", SOFT = "#F6F4F2", LO = "#FFF0E6";

const words = (T as { words: { word: string; start: number; end: number }[] }).words;
const w = (i: number) => words[i]!.start;
export const TOTAL = Math.max(45, Math.ceil(words[words.length - 1]!.end + 4.5));
const B = [0, w(7), w(10), w(30), w(48), w(62), w(73), w(82)].map((x, i) => (i === 0 ? 0 : x - 0.12));
const SC = (i: number): [number, number] => [B[i]!, i + 1 < B.length ? B[i + 1]! : TOTAL];

/* logo oficial Itaú 2023 (Wikimedia Commons, autor Itaú Unibanco); versão branca = mesmo desenho recolorido */
const Logo: React.FC<{ s: number; white?: boolean }> = ({ s, white }) => <Img src={staticFile(white ? "brand/itau-logo-branco.svg" : "brand/itau-logo.svg")} style={{ width: s, height: s, display: "block" }} />;

const P: Record<string, (c: string) => React.ReactNode> = {
  person: (c) => <><circle cx="50" cy="28" r="17" fill={c} /><path d="M16 94 Q16 54 50 54 Q84 54 84 94 Z" fill={c} /></>,
  store: (c) => <><path d="M10 40 L18 12 H82 L90 40 Z" fill="none" stroke={c} strokeWidth="6" strokeLinejoin="round" /><path d="M18 46 V90 H82 V46" fill="none" stroke={c} strokeWidth="6" /><rect x="40" y="62" width="20" height="28" fill={c} /></>,
  pix: (c) => <><rect x="24" y="24" width="52" height="52" rx="10" transform="rotate(45 50 50)" fill="none" stroke={c} strokeWidth="7" /><circle cx="50" cy="50" r="7" fill={c} /></>,
  card: (c) => <><rect x="8" y="22" width="84" height="58" rx="10" fill="none" stroke={c} strokeWidth="6" /><rect x="8" y="36" width="84" height="10" fill={c} /><rect x="18" y="60" width="26" height="8" rx="4" fill={c} /></>,
  chart: (c) => <><path d="M10 88 H92" stroke={c} strokeWidth="6" strokeLinecap="round" /><path d="M16 70 L38 50 L56 60 L86 24" fill="none" stroke={c} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" /><path d="M68 22 H88 V42" fill="none" stroke={c} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" /></>,
  spark: (c) => <path d="M50 4 C54 34 66 46 96 50 C66 54 54 66 50 96 C46 66 34 54 4 50 C34 46 46 34 50 4 Z" fill={c} />,
  up: (c) => <><path d="M50 90 V14" stroke={c} strokeWidth="8" strokeLinecap="round" /><path d="M24 40 L50 12 L76 40" fill="none" stroke={c} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" /></>,
};
const Ic: React.FC<{ k: string; s: number; c?: string }> = ({ k, s, c = INK }) => (
  <svg width={s} height={s} viewBox="0 0 100 100" style={{ overflow: "visible", display: "block" }}>{P[k]!(c)}</svg>
);
const Tile: React.FC<{ k: string; s?: number; on?: boolean }> = ({ k, s = 200, on }) => (
  <div style={{ width: s, height: s, borderRadius: s * 0.24, background: on ? OR : SOFT, display: "grid", placeItems: "center" }}><Ic k={k} s={s * 0.54} c={on ? "#fff" : INK} /></div>
);

export const Video: React.FC<{ watermark: boolean }> = ({ watermark }) => {
  const t = useSec();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ background: BG, fontFamily: FONT }}>
      {/* 1 · "Já imaginou um banco que atravessa gerações?" — 3 gerações; um traço atravessa as três */}
      <Scene t={t} a={SC(0)[0]} b={SC(0)[1]} bg={BG} enter="none" exit="whipL"
        cam={[F(0, 540, 560, 1.28, -1), F(2.3, 540, 980, 1.22, 0, 0, 3), F(SC(0)[1], 540, 1000, 1.04)]}>
        {() => {
          const G = [{ s: 170, x: 250 }, { s: 210, x: 540 }, { s: 250, x: 830 }];
          const line = E.inOut(prog(t, w(5) - 0.1, 1.2));
          return (
            <>
              <Center y={500}>
                <Words t={t} size={66} color={MUTE} weight={600} items={[{ w: "Já", at: w(0) }, { w: "imaginou", at: w(1), color: INK, weight: 800 }]} />
                <Words t={t} size={66} color={MUTE} weight={600} items={[{ w: "um", at: w(2) }, { w: "banco", at: w(3), color: INK, weight: 800 }, { w: "que", at: w(4) }]} />
              </Center>
              {G.map((g, i) => (
                <div key={i} style={{ position: "absolute", left: g.x - g.s / 2, top: 1130 - g.s, ...popStyle(t, w(3) + i * 0.35, 0.55, i % 2 ? 10 : -10) }}><Tile k="person" s={g.s} on={i === 2} /></div>
              ))}
              <svg width={W} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
                <path d="M120 1200 C330 1170 560 1240 960 1180" fill="none" stroke={OR} strokeWidth={12} strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - line} />
              </svg>
              <Center y={1420}>
                <Words t={t} size={58} color={MUTE} weight={600} items={[{ w: "atravessa", at: w(5), color: INK, weight: 800 }]} />
                <Letters t={t} text="gerações?" at={w(6)} size={130} color={OR} weight={800} />
              </Center>
            </>
          );
        }}
      </Scene>

      {/* 2 · "Isso é Itaú." — tela laranja, logo oficial em branco */}
      <Scene t={t} a={SC(1)[0]} b={SC(1)[1]} bg={OR} enter="whipR" exit="zoomThrough"
        cam={[F(SC(1)[0], 540, 900, 1.28, -2), F(SC(1)[1], 540, 980, 1.02, 0)]}>
        {() => (
          <Center y={960}>
            <Words t={t} size={72} color="rgba(255,255,255,0.85)" weight={600} items={[{ w: "Isso", at: w(7) }, { w: "é", at: w(8) }]} />
            <div style={{ height: 50 }} />
            <div style={popStyle(t, w(9) - 0.25, 0.65, -8)}><Logo s={420} white /></div>
          </Center>
        )}
      </Scene>

      {/* 3 · "Em 1945, abriram as primeiras agências: São Paulo, Campinas e São João da Boa Vista." — contador + 3 agências */}
      <Scene t={t} a={SC(2)[0]} b={SC(2)[1]} bg={BG} enter="zoomIn" exit="whipL"
        cam={[F(SC(2)[0], 540, 460, 1.28, -1), F(w(17), 540, 560, 1.14, 0, 3), F(w(21) - 0.2, 540, 960, 1.26, -1, 0, 3), F(w(25) - 0.1, 540, 1160, 1.26, 1, 0, -3), F(SC(2)[1], 540, 1040, 1.04)]}>
        {() => {
          const y = Math.round(ip(t, [w(11) - 0.1, w(16) + 0.3], [1900, 1945], E.outQuint));
          const C = [{ s: "São Paulo", i: 21 }, { s: "Campinas", i: 23 }, { s: "São João da Boa Vista", i: 25 }];
          return (
            <>
              <Center y={430}>
                <Words t={t} size={58} color={MUTE} weight={600} items={[{ w: "Em", at: w(10) }]} />
                <div style={{ fontSize: 230, fontWeight: 800, letterSpacing: "-0.04em", color: OR, lineHeight: 1, fontVariantNumeric: "tabular-nums", ...popStyle(t, w(11) - 0.2, 0.55) }}>{y}</div>
              </Center>
              <Center y={700}>
                <Words t={t} size={56} color={MUTE} weight={600} items={[{ w: "abriram", at: w(17), color: INK, weight: 800 }, { w: "as", at: w(18) }]} />
                <Letters t={t} text="primeiras agências:" at={w(19)} size={84} color={INK} weight={800} stagger={0.025} />
              </Center>
              {C.map((c, j) => (
                <div key={j} style={{ position: "absolute", left: 120, top: 880 + j * 190, width: 840, height: 160, borderRadius: 44, background: t > w(c.i) ? LO : SOFT, display: "flex", alignItems: "center", gap: 30, padding: "0 36px", ...slideStyle(t, w(c.i) - 0.4, j % 2 ? 900 : -900, 0.6) }}>
                  <div style={{ width: 104, height: 104, borderRadius: 28, background: OR, display: "grid", placeItems: "center", flex: "none" }}><Ic k="store" s={62} c="#fff" /></div>
                  <div style={{ fontSize: 54, fontWeight: 800, color: INK }}>{c.s}</div>
                </div>
              ))}
            </>
          );
        }}
      </Scene>

      {/* 4 · "Em 2008, Itaú e Unibanco se uniram e formaram o maior banco privado do país." — dois cartões se juntam */}
      <Scene t={t} a={SC(3)[0]} b={SC(3)[1]} bg={BG} enter="whipR" exit="zoomThrough"
        cam={[F(SC(3)[0], 540, 400, 1.28), F(w(35) - 0.2, 540, 860, 1.24, 0, 3), F(w(39) - 0.2, 540, 900, 1.16), F(w(43) - 0.2, 540, 1320, 1.26, -1), F(SC(3)[1], 540, 1100, 1.04)]}>
        {() => {
          const m = E.inOut(prog(t, w(39) - 0.1, 1.0));
          return (
            <>
              <Center y={380}>
                <Words t={t} size={58} color={MUTE} weight={600} items={[{ w: "Em", at: w(30) }]} />
                <Letters t={t} text="2008," at={w(31)} size={170} color={OR} weight={800} />
              </Center>
              {[{ s: "Itaú", x: 110, at: w(35), dx: -800 }, { s: "Unibanco", x: 590, at: w(37), dx: 800 }].map((c, j) => (
                <div key={j} style={{ position: "absolute", left: c.x + (j ? -1 : 1) * 240 * m, top: 780, width: 380, height: 180, borderRadius: 44, background: SOFT, border: `5px solid ${INK}`, display: "grid", placeItems: "center", opacity: 1 - m, transform: `scale(${1 - 0.3 * m})`, ...(m === 0 ? slideStyle(t, c.at - 0.35, c.dx, 0.6) : {}) }}>
                  <div style={{ fontSize: 58, fontWeight: 800, color: INK }}>{c.s}</div>
                </div>
              ))}
              <div style={{ position: "absolute", left: 510, top: 840, fontSize: 70, fontWeight: 800, color: OR, opacity: prog(t, w(36) - 0.1, 0.3) * (1 - m) }}>+</div>
              <div style={{ position: "absolute", left: 190, top: 760, width: 700, height: 220, borderRadius: 54, background: OR, display: "grid", placeItems: "center", opacity: m, transform: `scale(${0.7 + 0.3 * E.outBack(m)})` }}>
                <div style={{ fontSize: 76, fontWeight: 800, color: "#fff" }}>Itaú Unibanco</div>
              </div>
              <Center y={1200}>
                <Words t={t} size={56} color={MUTE} weight={600} items={[{ w: "e", at: w(40) }, { w: "formaram", at: w(41), color: INK, weight: 800 }, { w: "o", at: w(42) }]} />
                <Letters t={t} text="maior banco privado" at={w(43)} size={96} color={OR} weight={800} stagger={0.025} />
                <Words t={t} size={56} color={MUTE} weight={600} items={[{ w: "do", at: w(46) }, { w: "país.", at: w(47), color: INK, weight: 800 }]} />
                <Underline t={t} at={w(47) + 0.1} width={460} color={OR} thick={12} />
              </Center>
            </>
          );
        }}
      </Scene>

      {/* 5 · "Hoje, o banco cabe no app: Pix, cartão e investimentos, na palma da mão." — app no celular, mão liga cada função */}
      <Scene t={t} a={SC(4)[0]} b={SC(4)[1]} bg={BG} enter="zoomIn" exit="shrink"
        cam={[F(SC(4)[0], 540, 330, 1.28, -1), F(w(53) - 0.3, 590, 1000, 1.26, 0, 0, -3), F(w(58), 540, 1240, 1.04), F(SC(4)[1], 540, 1240, 1.08)]}>
        {() => {
          const R = [{ k: "pix", s: "Pix", i: 54 }, { k: "card", s: "Cartão", i: 55 }, { k: "chart", s: "Investimentos", i: 57 }];
          return (
            <>
              <Center y={320}>
                <Words t={t} size={58} color={MUTE} weight={600} items={[{ w: "Hoje,", at: w(48), color: INK, weight: 800 }, { w: "o", at: w(49) }, { w: "banco", at: w(50), color: INK, weight: 800 }]} />
                <Letters t={t} text="cabe no app:" at={w(51)} size={116} color={OR} weight={800} />
              </Center>
              <div style={{ position: "absolute", left: 250, top: 560, transform: `translateY(${(1 - E.outExpo(prog(t, SC(4)[0] + 0.2, 0.9))) * 900}px)` }}>
                <PhoneOutline w={580} h={1000} ink={INK}>
                  <div style={{ padding: "100px 40px 0" }}>
                    <div style={{ marginBottom: 30 }}><Logo s={110} /></div>
                    {R.map((r, j) => {
                      const on = t > w(r.i);
                      return (
                        <div key={j} style={{ display: "flex", alignItems: "center", gap: 24, padding: "28px 26px", borderRadius: 32, background: on ? LO : SOFT, marginBottom: 22, ...slideStyle(t, SC(4)[0] + 0.6 + j * 0.15, 500, 0.55) }}>
                          <div style={{ width: 92, height: 92, borderRadius: 26, background: on ? OR : "#fff", display: "grid", placeItems: "center" }}><Ic k={r.k} s={56} c={on ? "#fff" : INK} /></div>
                          <div style={{ flex: 1, fontSize: 38, fontWeight: 700, color: INK }}>{r.s}</div>
                          <Toggle t={t} at={w(r.i)} on={OR} w={120} />
                        </div>
                      );
                    })}
                  </div>
                </PhoneOutline>
              </div>
              <Hand t={t} from={[1000, 1750]} to={[713, 852]} at={w(53) - 0.3} tap={w(54) - 0.02} until={w(54) + 0.15} ripple={OR} />
              <Hand t={t} from={[713, 852]} to={[713, 1012]} at={w(54) + 0.15} tap={w(55) - 0.02} until={w(55) + 0.2} ripple={OR} />
              <Hand t={t} from={[713, 1012]} to={[713, 1172]} at={w(55) + 0.2} tap={w(57) - 0.02} leave={w(58)} ripple={OR} />
              <Center y={1690}>
                <Words t={t} size={56} color={MUTE} weight={600} items={[{ w: "na", at: w(58) }]} />
                <Letters t={t} text="palma da mão." at={w(59)} size={100} color={OR} weight={800} stagger={0.03} />
              </Center>
            </>
          );
        }}
      </Scene>

      {/* 6 · "São cem anos de história, com o olhar sempre pra frente." — tela laranja, contador 100, seta desenhada */}
      <Scene t={t} a={SC(5)[0]} b={SC(5)[1]} bg={OR} enter="whipR" exit="zoomThrough"
        cam={[F(SC(5)[0], 540, 660, 1.28, -1), F(w(66), 540, 820, 1.1, 0, 3), F(SC(5)[1], 540, 1200, 1.12, 1)]}>
        {() => {
          const n = Math.round(ip(t, [w(63) - 0.1, w(64) + 0.6], [0, 100], E.outQuint));
          const arrow = E.inOut(prog(t, w(69) - 0.1, 1.2));
          return (
            <>
              <Center y={430}>
                <Words t={t} size={62} color="rgba(255,255,255,0.85)" weight={600} items={[{ w: "São", at: w(62) }]} />
              </Center>
              <Center y={690}>
                <div style={{ fontSize: 330, fontWeight: 800, letterSpacing: "-0.05em", color: "#fff", lineHeight: 1, fontVariantNumeric: "tabular-nums", ...popStyle(t, w(63) - 0.2, 0.55) }}>{n}</div>
              </Center>
              <Center y={940}>
                <Words t={t} size={64} color="rgba(255,255,255,0.85)" weight={600} items={[{ w: "anos", at: w(64), color: "#fff", weight: 800 }, { w: "de", at: w(65) }, { w: "história,", at: w(66), color: "#fff", weight: 800 }]} />
              </Center>
              <svg width={W} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
                <path d="M170 1250 C400 1210 620 1290 880 1240" fill="none" stroke="#fff" strokeWidth={12} strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - arrow} />
                <path d="M830 1190 L890 1240 L835 1295" fill="none" stroke="#fff" strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" opacity={prog(t, w(69) + 1.0, 0.25)} />
              </svg>
              <Center y={1480}>
                <Words t={t} size={56} color="rgba(255,255,255,0.85)" weight={600} items={[{ w: "com", at: w(67) }, { w: "o", at: w(68) }, { w: "olhar", at: w(69), color: "#fff", weight: 800 }, { w: "sempre", at: w(70) }]} />
                <Letters t={t} text="pra frente." at={w(71)} size={112} color="#fff" weight={800} />
              </Center>
            </>
          );
        }}
      </Scene>

      {/* 7 · "O propósito? Estimular o poder de transformação das pessoas." — ênfase grande em "transformação" */}
      <Scene t={t} a={SC(6)[0]} b={SC(6)[1]} bg={BG} enter="zoomIn" exit="whipL"
        cam={[F(SC(6)[0], 540, 480, 1.28, -1), F(w(75) - 0.2, 540, 900, 1.2, 0, 3), F(w(79) + 0.3, 540, 1180, 1.24, 1, 0, -3), F(SC(6)[1], 540, 1000, 1.04)]}>
        {() => (
          <>
            <Center y={470}>
              <Words t={t} size={60} color={MUTE} weight={600} items={[{ w: "O", at: w(73) }]} />
              <Letters t={t} text="propósito?" at={w(74)} size={130} color={INK} weight={800} />
            </Center>
            <Center y={950}>
              <Words t={t} size={58} color={MUTE} weight={600} items={[{ w: "Estimular", at: w(75), color: INK, weight: 800 }, { w: "o", at: w(76) }, { w: "poder", at: w(77), color: INK, weight: 800 }, { w: "de", at: w(78) }]} />
              <Letters t={t} text="transformação" at={w(79)} size={124} color={OR} weight={800} stagger={0.028} />
              <Words t={t} size={58} color={MUTE} weight={600} items={[{ w: "das", at: w(80) }, { w: "pessoas.", at: w(81), color: INK, weight: 800 }]} />
              <Underline t={t} at={w(81) + 0.2} width={480} color={OR} thick={12} />
            </Center>
            <div style={{ position: "absolute", left: 0, width: W, top: 1370, display: "flex", justifyContent: "center", gap: 50 }}>
              {["person", "spark", "up"].map((k, i) => <div key={i} style={popStyle(t, w(79) + i * 0.35, 0.55, i % 2 ? 10 : -10)}><Tile k={k} s={190} on={i === 1} /></div>)}
            </div>
          </>
        )}
      </Scene>

      {/* 8 · "Itaú. Feito de futuro." — logo oficial, assinatura com sublinhado (hold) */}
      <Scene t={t} a={SC(7)[0]} b={SC(7)[1]} bg={BG} enter="pop" exit="none" drift={0.4}
        cam={[F(SC(7)[0], 540, 820, 1.26, -1), F(w(84), 540, 960, 1.0), F(SC(7)[1], 540, 960, 1.05)]}>
        {() => (
          <>
            <Center y={780}>
              <div style={popStyle(t, w(82) - 0.25, 0.65, -8)}><Logo s={400} /></div>
            </Center>
            <Center y={1200}>
              <Words t={t} size={70} color={MUTE} weight={600} items={[{ w: "Feito", at: w(83), color: INK, weight: 800 }, { w: "de", at: w(84) }]} />
              <Letters t={t} text="futuro." at={w(85)} size={130} color={OR} weight={800} />
              <Underline t={t} at={w(85) + 0.4} width={420} color={OR} thick={12} />
            </Center>
          </>
        )}
      </Scene>

      {watermark && <Watermark t={t} text="Seu Estúdio" />  /* componente Watermark: copie da 15.0 */}
      <Soundtrack fps={fps} />
    </AbsoluteFill>
  );
};

/* ---------------- som em cada ação ---------------- */
type Fx = [number, string, number];
const sfxList = (): Fx[] => {
  const L: Fx[] = [];
  // (sem tique por palavra: regra de som)
  B.slice(1).forEach((b, i) => { L.push([b - 0.32, i % 3 === 1 ? "zoom.mp3" : "whoosh.mp3", 0.3]); L.push([b - 0.02, "swoosh.mp3", 0.16]); });
  const add = (at: number, f: string, v: number) => L.push([at, f, v]);
  add(0.02, "text-in.mp3", 0.22); for (let i = 0; i < 3; i++) add(w(3) + i * 0.35, "pop.mp3", 0.24); add(w(5) - 0.1, "scribble.mp3", 0.26); add(w(6) - 0.15, "zoomin.mp3", 0.2);
  add(w(9) - 0.25, "reveal.mp3", 0.34); add(w(9) - 0.25, "sparkle.mp3", 0.22);
  add(w(11) - 0.2, "pop.mp3", 0.26); add(w(11), "tick.mp3", 0.12); [21, 23, 25].forEach((i) => { add(w(i) - 0.4, "swish.mp3", 0.22); add(w(i), "pop.mp3", 0.2); });
  add(w(31) - 0.1, "zoomin.mp3", 0.2); add(w(35) - 0.35, "swish.mp3", 0.22); add(w(37) - 0.35, "swish.mp3", 0.22); add(w(39), "reveal.mp3", 0.3); add(w(39) + 0.5, "stamp.mp3", 0.18); add(w(43) - 0.15, "zoomin.mp3", 0.2); add(w(47) + 0.1, "scribble.mp3", 0.26);
  add(SC(4)[0] + 0.2, "swish.mp3", 0.26); [54, 55, 57].forEach((i) => { add(w(i) - 0.02, "click.mp3", 0.34); add(w(i), "toggle.mp3", 0.24); }); add(w(59) - 0.1, "sparkle.mp3", 0.2);
  add(w(63) - 0.2, "pop.mp3", 0.26); add(w(63), "tick.mp3", 0.12); add(w(64) + 0.6, "notify.mp3", 0.26); add(w(69) - 0.1, "scribble.mp3", 0.26);
  add(w(74) - 0.1, "zoomin.mp3", 0.2); add(w(79) - 0.1, "reveal.mp3", 0.26); for (let i = 0; i < 3; i++) add(w(79) + i * 0.35, "pop.mp3", 0.22); add(w(81) + 0.2, "scribble.mp3", 0.26);
  add(w(82) - 0.25, "reveal.mp3", 0.34); add(w(82) - 0.25, "sparkle.mp3", 0.24); add(w(85) + 0.4, "scribble.mp3", 0.26); add(w(85) + 1.0, "stamp.mp3", 0.2);
  return L.filter(([at]) => at >= 0 && at < TOTAL);
};

const Soundtrack: React.FC<{ fps: number }> = ({ fps }) => {
  const fx = React.useMemo(sfxList, []);
  return (
    <>
      <Audio src={staticFile("audio/voiceover.mp3")} volume={1} />
      <Audio src={staticFile("audio/music.mp3")} volume={(f) => {
        const s = f / fps; const talking = words.some((x) => s > x.start - 0.15 && s < x.end + 0.25);
        return (talking ? 0.07 : 0.16) * Math.max(0, Math.min(1, (TOTAL - s) / 2.5));
      }} />
      {fx.map(([at, f, v], i) => (
        <Sequence key={i} from={Math.round(at * fps)} durationInFrames={Math.round(1.6 * fps)}>
          <Audio src={staticFile(`sfx/${f}`)} volume={v} />
        </Sequence>
      ))}
    </>
  );
};
```

## 15.3 · Magalu · 9:16 · azul #0086FF · 59 s (blocos + moldura, contador + pino, cartões de estatística, checklist, celular com chaves, jornada em S, download com barra)

```tsx
import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile, useVideoConfig } from "remotion";
import T from "../public/audio/voiceover-timings.json";
import {
  Center, E, F, FONT, Hand, Letters, PhoneOutline, Pill, Scene, Toggle, Underline, Words, W,
  clamp01, ip, popStyle, prog, slideStyle, useSec,
} from "./lib";

/* Magalu · estilo OpenMotionKit · azul e branco · 9:16 · câmera focando nos itens
   SEM círculo/anel/mancha de fundo; ênfase = palavra MAIOR; 1 única pílula (cena 6). */
const BG = "#FFFFFF", BL = "#0086FF", INK = "#111111", MUTE = "#9AA3AF", SOFT = "#F2F6FB", LB = "#E6F3FF";

const words = (T as { words: { word: string; start: number; end: number }[] }).words;
const w = (i: number) => words[i]!.start;
export const TOTAL = Math.max(45, Math.ceil(words[words.length - 1]!.end + 4.5));
const B = [0, w(11), w(14), w(30), w(51), w(62), w(75), w(85), w(90)].map((x, i) => (i === 0 ? 0 : x - 0.12));
const SC = (i: number): [number, number] => [B[i]!, i + 1 < B.length ? B[i + 1]! : TOTAL];
const fmt = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/* logo oficial (SVG do site magazineluiza.com.br), só recolorido */
const Logo: React.FC<{ w: number; white?: boolean }> = ({ w: lw, white }) => <Img src={staticFile(white ? "brand/magalu-logo-branco.svg" : "brand/magalu-logo-azul.svg")} style={{ width: lw, height: (lw * 32) / 122, display: "block" }} />;

/* ícones em traço (mesma linguagem do celular em contorno) */
const P: Record<string, (c: string) => React.ReactNode> = {
  bag: (c) => <><path d="M18 34 H82 L76 92 H24 Z" fill="none" stroke={c} strokeWidth="6" strokeLinejoin="round" /><path d="M36 40 V26 a14 14 0 0 1 28 0 V40" fill="none" stroke={c} strokeWidth="6" strokeLinecap="round" /></>,
  card: (c) => <><rect x="8" y="22" width="84" height="58" rx="10" fill="none" stroke={c} strokeWidth="6" /><rect x="8" y="36" width="84" height="10" fill={c} /><rect x="18" y="60" width="26" height="8" rx="4" fill={c} /></>,
  box: (c) => <><path d="M50 8 L88 28 V72 L50 92 L12 72 V28 Z" fill="none" stroke={c} strokeWidth="6" strokeLinejoin="round" /><path d="M12 28 L50 48 L88 28 M50 48 V92" fill="none" stroke={c} strokeWidth="6" strokeLinejoin="round" /></>,
  gift: (c) => <><rect x="12" y="38" width="76" height="18" rx="4" fill="none" stroke={c} strokeWidth="6" /><rect x="18" y="56" width="64" height="36" rx="4" fill="none" stroke={c} strokeWidth="6" /><path d="M50 38 V92" stroke={c} strokeWidth="6" /><path d="M50 38 C40 18 22 22 30 34 C34 38 44 38 50 38 C56 38 66 38 70 34 C78 22 60 18 50 38 Z" fill="none" stroke={c} strokeWidth="6" strokeLinejoin="round" /></>,
  pin: (c) => <><path d="M50 94 C50 94 18 58 18 38 a32 32 0 0 1 64 0 C82 58 50 94 50 94 Z" fill={c} /><circle cx="50" cy="38" r="12" fill="#fff" /></>,
  store: (c) => <><path d="M10 40 L18 12 H82 L90 40" fill="none" stroke={c} strokeWidth="6" strokeLinejoin="round" /><path d="M10 40 h80 a0 0 0 0 1 0 0 c0 8 -8 12 -14 12 s-12 -4 -12 -12 c0 8 -6 12 -12 12 s-12 -4 -12 -12 c0 8 -6 12 -12 12 S10 48 10 40" fill="none" stroke={c} strokeWidth="6" strokeLinejoin="round" /><path d="M18 52 V90 H82 V52" fill="none" stroke={c} strokeWidth="6" /><rect x="40" y="66" width="20" height="24" fill={c} /></>,
  map: (c) => <><path d="M10 22 L36 12 L64 22 L90 12 V78 L64 88 L36 78 L10 88 Z" fill="none" stroke={c} strokeWidth="6" strokeLinejoin="round" /><path d="M36 12 V78 M64 22 V88" stroke={c} strokeWidth="6" /></>,
  people: (c) => <><circle cx="36" cy="32" r="14" fill={c} /><path d="M8 90 Q8 54 36 54 Q64 54 64 90 Z" fill={c} /><circle cx="70" cy="36" r="11" fill="none" stroke={c} strokeWidth="5" /><path d="M66 56 Q92 56 92 88" fill="none" stroke={c} strokeWidth="5" strokeLinecap="round" /></>,
  wallet: (c) => <><rect x="8" y="22" width="84" height="64" rx="12" fill="none" stroke={c} strokeWidth="6" /><path d="M62 44 H92 V66 H62 a11 11 0 0 1 0 -22 Z" fill="none" stroke={c} strokeWidth="6" /><circle cx="66" cy="55" r="4" fill={c} /></>,
  receipt: (c) => <><path d="M20 8 H80 V92 L70 84 L60 92 L50 84 L40 92 L30 84 L20 92 Z" fill="none" stroke={c} strokeWidth="6" strokeLinejoin="round" /><path d="M34 32 H66 M34 48 H66 M34 64 H54" stroke={c} strokeWidth="6" strokeLinecap="round" /></>,
  shield: (c) => <><path d="M50 6 L86 20 V48 C86 72 68 86 50 94 C32 86 14 72 14 48 V20 Z" fill="none" stroke={c} strokeWidth="6" strokeLinejoin="round" /><path d="M34 50 L46 62 L68 38" fill="none" stroke={c} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" /></>,
  search: (c) => <><circle cx="42" cy="42" r="26" fill="none" stroke={c} strokeWidth="7" /><path d="M62 62 L88 88" stroke={c} strokeWidth="8" strokeLinecap="round" /></>,
  heart: (c) => <path d="M50 88 C20 66 8 50 8 34 a20 20 0 0 1 42 -10 a20 20 0 0 1 42 10 C92 50 80 66 50 88 Z" fill="none" stroke={c} strokeWidth="6" strokeLinejoin="round" />,
  spark: (c) => <path d="M50 4 C54 34 66 46 96 50 C66 54 54 66 50 96 C46 66 34 54 4 50 C34 46 46 34 50 4 Z" fill={c} />,
  check: (c) => <path d="M18 52 L40 74 L84 26" fill="none" stroke={c} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />,
};
const Ic: React.FC<{ k: string; s: number; c?: string; style?: React.CSSProperties }> = ({ k, s, c = INK, style }) => (
  <svg width={s} height={s} viewBox="0 0 100 100" style={{ overflow: "visible", display: "block", ...style }}>{P[k]!(c)}</svg>
);
const Tile: React.FC<{ k: string; s?: number; on?: boolean; style?: React.CSSProperties }> = ({ k, s = 200, on, style }) => (
  <div style={{ width: s, height: s, borderRadius: s * 0.24, background: on ? BL : SOFT, display: "grid", placeItems: "center", ...style }}><Ic k={k} s={s * 0.54} c={on ? "#fff" : INK} /></div>
);

export const Video: React.FC<{ watermark: boolean }> = ({ watermark }) => {
  const t = useSec();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ background: BG, fontFamily: FONT }}>
      {/* 1 · "Já imaginou comprar, pagar e receber tudo em um lugar só?" — 3 blocos; a câmera visita cada um; moldura desenhada junta os três */}
      <Scene t={t} a={SC(0)[0]} b={SC(0)[1]} bg={BG} enter="none" exit="whipL"
        cam={[F(0, 540, 560, 1.4, -2), F(w(2) - 0.15, 290, 1010, 1.5, -1, 0, 8), F(w(3) - 0.15, 540, 1010, 1.5, 0, 4), F(w(5) - 0.15, 790, 1010, 1.5, 1, 0, -8), F(w(7), 540, 1120, 1.02), F(SC(0)[1], 540, 1120, 1.1, 1)]}>
        {() => {
          const R = [{ k: "bag", s: "comprar", i: 2 }, { k: "card", s: "pagar", i: 3 }, { k: "box", s: "receber", i: 5 }];
          const frame = E.inOut(prog(t, w(7), 0.9));
          return (
            <>
              <Center y={560}>
                <Words t={t} size={74} color={MUTE} weight={600} items={[{ w: "Já", at: w(0) }, { w: "imaginou", at: w(1), color: INK, weight: 800 }]} />
              </Center>
              {R.map((r, j) => (
                <div key={j} style={{ position: "absolute", left: 175 + j * 250 - 10, top: 890, width: 220, display: "flex", flexDirection: "column", alignItems: "center", gap: 22, ...popStyle(t, w(r.i) - 0.15, 0.5, j % 2 ? 12 : -12) }}>
                  <Tile k={r.k} s={200} on={t > w(r.i) + 0.15} />
                  <div style={{ fontSize: 44, fontWeight: 700, color: INK }}>{r.s}</div>
                </div>
              ))}
              <svg width={W} height={1920} style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none" }}>
                <rect x={130} y={850} width={820} height={360} rx={56} fill="none" stroke={BL} strokeWidth={10} strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - frame} />
              </svg>
              <Center y={1420}>
                <Words t={t} size={64} color={MUTE} weight={600} items={[{ w: "tudo", at: w(6), color: INK, weight: 800 }, { w: "em", at: w(7) }]} />
                <Letters t={t} text="um lugar só?" at={w(8)} size={128} color={BL} weight={800} stagger={0.03} />
                <Underline t={t} at={w(10)} width={520} color={BL} thick={12} />
              </Center>
            </>
          );
        }}
      </Scene>

      {/* 2 · "Isso é Magalu." — tela azul, logo oficial branco em pop */}
      <Scene t={t} a={SC(1)[0]} b={SC(1)[1]} bg={BL} enter="whipR" exit="zoomThrough"
        cam={[F(SC(1)[0], 540, 820, 1.35, -3, 0, 6), F(w(13) - 0.2, 540, 960, 1.0, 0), F(SC(1)[1], 540, 960, 1.08, 1)]}>
        {() => (
          <Center y={960}>
            <Words t={t} size={72} color="rgba(255,255,255,0.8)" weight={600} items={[{ w: "Isso", at: w(11) }, { w: "é", at: w(12) }]} />
            <div style={{ height: 50 }} />
            <div style={popStyle(t, w(13) - 0.2, 0.6, -10)}><Logo w={700} white /></div>
            <div style={{ height: 30 }} />
            <Underline t={t} at={w(13) + 0.3} width={520} color="#fff" thick={12} />
          </Center>
        )}
      </Scene>

      {/* 3 · "Tudo começou em 1957, em Franca, como uma loja de presentes." — contador, pino no mapa, presente */}
      <Scene t={t} a={SC(2)[0]} b={SC(2)[1]} bg={BG} enter="zoomIn" exit="whipL"
        cam={[F(SC(2)[0], 540, 560, 1.45, -1), F(w(22), 540, 620, 1.25, 1, 4), F(w(24) - 0.15, 540, 1010, 1.45, -1, 0, -6), F(w(27) - 0.15, 540, 1360, 1.4, 1, 0, 6), F(w(29) + 0.4, 540, 1000, 1.0), F(SC(2)[1], 540, 1000, 1.06)]}>
        {() => {
          const y = Math.round(ip(t, [w(17) - 0.1, w(22) + 0.3], [1900, 1957], E.outQuint));
          return (
            <>
              <Center y={420}>
                <Words t={t} size={62} color={MUTE} weight={600} items={[{ w: "Tudo", at: w(14), color: INK, weight: 800 }, { w: "começou", at: w(15), color: INK, weight: 800 }, { w: "em", at: w(16) }]} />
              </Center>
              <Center y={640}>
                <div style={{ fontSize: 250, fontWeight: 800, letterSpacing: "-0.04em", color: BL, lineHeight: 1, fontVariantNumeric: "tabular-nums", ...popStyle(t, w(17) - 0.2, 0.5) }}>{y}</div>
              </Center>
              <div style={{ position: "absolute", left: 240, top: 930, width: 600, height: 160, borderRadius: 44, background: SOFT, display: "flex", alignItems: "center", gap: 28, padding: "0 40px", ...slideStyle(t, w(24) - 0.3, -900) }}>
                <div style={popStyle(t, w(24) - 0.05, 0.45)}><Ic k="pin" s={92} c={BL} /></div>
                <div style={{ fontSize: 64, fontWeight: 800, color: INK }}>Franca <span style={{ color: MUTE, fontWeight: 600 }}>· SP</span></div>
              </div>
              <div style={{ position: "absolute", left: 540 - 130, top: 1170, ...popStyle(t, w(27) - 0.2, 0.55, 14) }}><Tile k="gift" s={260} on /></div>
              <Center y={1580}>
                <Words t={t} size={58} color={MUTE} weight={600} items={[{ w: "como", at: w(25) }, { w: "uma", at: w(26) }, { w: "loja", at: w(27), color: INK, weight: 800 }, { w: "de", at: w(28) }]} />
                <Letters t={t} text="presentes." at={w(29)} size={118} color={BL} weight={800} stagger={0.03} />
              </Center>
            </>
          );
        }}
      </Scene>

      {/* 4 · "Hoje são mais de 1.200 lojas em 20 estados, e cerca de 33 milhões de clientes ativos." — 3 cartões com contadores */}
      <Scene t={t} a={SC(3)[0]} b={SC(3)[1]} bg={BG} enter="whipR" exit="zoomThrough"
        cam={[F(SC(3)[0], 540, 380, 1.45, -1), F(w(33), 540, 650, 1.45, -1, 0, 6), F(w(39) - 0.2, 540, 990, 1.45, 0, 4), F(w(43) - 0.2, 540, 1330, 1.45, 1, 0, -6), F(w(50) + 0.3, 540, 980, 1.0), F(SC(3)[1], 540, 980, 1.06)]}>
        {() => {
          const C = [
            { k: "store", n: Math.round(ip(t, [w(34) - 0.1, w(37) + 0.2], [0, 1200], E.outQuint)), pre: "+", suf: "", label: "lojas", at: w(32) },
            { k: "map", n: Math.round(ip(t, [w(39) - 0.1, w(40) + 0.2], [0, 20], E.outQuint)), pre: "", suf: "", label: "estados", at: w(38) },
            { k: "people", n: Math.round(ip(t, [w(44) - 0.1, w(47) + 0.3], [0, 33], E.outQuint)), pre: "~", suf: " mi", label: "clientes ativos", at: w(42) },
          ];
          return (
            <>
              <Center y={360}>
                <Words t={t} size={66} color={MUTE} weight={600} items={[{ w: "Hoje", at: w(30), color: INK, weight: 800 }, { w: "são", at: w(31) }]} />
              </Center>
              {C.map((c, i) => {
                const big = i === 2;
                return (
                  <div key={i} style={{ position: "absolute", left: 110, top: 520 + i * 340, width: 860, height: 280, borderRadius: 52, background: big ? BL : SOFT, display: "flex", alignItems: "center", gap: 40, padding: "0 50px", ...slideStyle(t, c.at - 0.3, i % 2 ? 1000 : -1000, 0.5) }}>
                    <div style={{ width: 150, height: 150, borderRadius: 40, background: big ? "#fff" : LB, display: "grid", placeItems: "center", flex: "none" }}><Ic k={c.k} s={90} c={BL} /></div>
                    <div>
                      <div style={{ fontSize: big ? 150 : 124, fontWeight: 800, letterSpacing: "-0.03em", color: big ? "#fff" : BL, lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{c.pre}{fmt(c.n)}{c.suf}</div>
                      <div style={{ fontSize: 46, fontWeight: 700, color: big ? "rgba(255,255,255,0.9)" : INK, marginTop: 6 }}>{c.label}</div>
                    </div>
                  </div>
                );
              })}
            </>
          );
        }}
      </Scene>

      {/* 5 · "Na mesma família: Netshoes, KaBuM!, Época Cosméticos, Estante Virtual e aiqfome." — checklist; câmera desce item a item */}
      <Scene t={t} a={SC(4)[0]} b={SC(4)[1]} bg={BG} enter="zoomIn" exit="shrink"
        cam={[F(SC(4)[0], 540, 400, 1.45, -1), F(w(54) - 0.2, 540, 640, 1.5, -1, 0, 5), F(w(55) - 0.2, 540, 814, 1.5, 0, 3), F(w(56) - 0.2, 540, 988, 1.5, 1, 0, -5), F(w(58) - 0.2, 540, 1162, 1.5, 0, 3), F(w(61) - 0.2, 540, 1336, 1.5, -1, 0, 5), F(w(61) + 0.5, 540, 980, 1.0), F(SC(4)[1], 540, 980, 1.05)]}>
        {() => {
          const R = [{ s: "Netshoes", i: 54 }, { s: "KaBuM!", i: 55 }, { s: "Época Cosméticos", i: 56 }, { s: "Estante Virtual", i: 58 }, { s: "aiqfome", i: 61 }];
          return (
            <>
              <Center y={400}>
                <Words t={t} size={62} color={MUTE} weight={600} items={[{ w: "Na", at: w(51) }, { w: "mesma", at: w(52), color: INK, weight: 800 }]} />
                <Letters t={t} text="família:" at={w(53)} size={124} color={BL} weight={800} />
              </Center>
              {R.map((r, j) => {
                const on = t > w(r.i) + 0.2;
                return (
                  <div key={j} style={{ position: "absolute", left: 140, top: 570 + j * 174, width: 800, height: 140, borderRadius: 40, background: on ? LB : SOFT, display: "flex", alignItems: "center", gap: 32, padding: "0 40px", ...slideStyle(t, w(r.i) - 0.35, j % 2 ? 900 : -900, 0.45) }}>
                    <div style={{ width: 72, height: 72, borderRadius: 20, background: on ? BL : "#fff", border: on ? "none" : `5px solid ${INK}`, display: "grid", placeItems: "center", flex: "none" }}>
                      {on && <div style={popStyle(t, w(r.i) + 0.2, 0.35)}><Ic k="check" s={50} c="#fff" /></div>}
                    </div>
                    <div style={{ fontSize: 58, fontWeight: 800, color: INK }}>{r.s}</div>
                  </div>
                );
              })}
            </>
          );
        }}
      </Scene>

      {/* 6 · "Com o MagaluPay, carteira digital, carnê digital e seguros, em um lugar só." — app no celular, mão liga cada serviço; a ÚNICA pílula do vídeo */}
      <Scene t={t} a={SC(5)[0]} b={SC(5)[1]} bg={BG} enter="whipR" exit="zoomThrough"
        cam={[F(SC(5)[0], 540, 330, 1.4, -2), F(w(65) - 0.25, 600, 860, 1.5, -1, 0, -6), F(w(67) - 0.25, 600, 1020, 1.5, 0, 4), F(w(70) - 0.25, 600, 1180, 1.5, 1, 0, 6), F(w(71) - 0.1, 540, 1250, 1.0), F(SC(5)[1], 540, 1250, 1.08, -1)]}>
        {() => {
          const R = [{ k: "wallet", s: "Carteira digital", i: 65 }, { k: "receipt", s: "Carnê digital", i: 67 }, { k: "shield", s: "Seguros", i: 70 }];
          return (
            <>
              <Center y={320}>
                <Words t={t} size={60} color={MUTE} weight={600} items={[{ w: "Com", at: w(62) }, { w: "o", at: w(63) }]} />
                <Letters t={t} text="MagaluPay," at={w(64)} size={124} color={BL} weight={800} />
              </Center>
              <div style={{ position: "absolute", left: 250, top: 560, transform: `translateY(${(1 - E.outExpo(prog(t, SC(5)[0] + 0.15, 0.7))) * 900}px)` }}>
                <PhoneOutline w={580} h={1000} ink={INK}>
                  <div style={{ padding: "100px 40px 0" }}>
                    <div style={{ marginBottom: 30 }}><Logo w={220} /></div>
                    {R.map((r, j) => {
                      const on = t > w(r.i);
                      return (
                        <div key={j} style={{ display: "flex", alignItems: "center", gap: 24, padding: "28px 26px", borderRadius: 32, background: on ? LB : SOFT, marginBottom: 22, ...slideStyle(t, SC(5)[0] + 0.5 + j * 0.12, 500, 0.45) }}>
                          <div style={{ width: 92, height: 92, borderRadius: 26, background: on ? BL : "#fff", display: "grid", placeItems: "center" }}><Ic k={r.k} s={56} c={on ? "#fff" : INK} /></div>
                          <div style={{ flex: 1, fontSize: 38, fontWeight: 700, color: INK }}>{r.s}</div>
                          <Toggle t={t} at={w(r.i)} on={BL} w={120} />
                        </div>
                      );
                    })}
                  </div>
                </PhoneOutline>
              </div>
              <Hand t={t} from={[1000, 1750]} to={[713, 852]} at={w(64) + 0.1} tap={w(65) - 0.02} until={w(65) + 0.2} ripple={BL} />
              <Hand t={t} from={[713, 852]} to={[713, 1012]} at={w(65) + 0.2} tap={w(67) - 0.02} until={w(67) + 0.3} ripple={BL} />
              <Hand t={t} from={[713, 1012]} to={[713, 1172]} at={w(67) + 0.3} tap={w(70) - 0.02} leave={w(71)} ripple={BL} />
              <Center y={1690}>
                <Pill t={t} at={w(71)} text="em um lugar só." bg={BL} color="#fff" size={72} rot={-2} />
              </Center>
            </>
          );
        }}
      </Scene>

      {/* 7 · "E a inteligência artificial redesenhando a sua jornada de compra." — tela azul; caminho desenhado à mão liga 4 etapas */}
      <Scene t={t} a={SC(6)[0]} b={SC(6)[1]} bg={BL} enter="zoomIn" exit="whipL"
        cam={[F(SC(6)[0], 540, 420, 1.3, -1), F(w(78), 540, 420, 1.22, 0, 3), F(w(79) + 0.2, 540, 950, 1.3, -1, 0, 6), F(w(82), 540, 1300, 1.3, 1, 0, -6), F(w(83) + 0.3, 540, 1200, 1.0), F(SC(6)[1], 540, 1200, 1.05)]}>
        {() => {
          const N = [{ k: "search", s: "Buscar", x: 300, y: 800 }, { k: "heart", s: "Escolher", x: 780, y: 1000 }, { k: "card", s: "Pagar", x: 300, y: 1200 }, { k: "box", s: "Receber", x: 780, y: 1400 }];
          const draw = E.inOut(prog(t, w(79) - 0.2, 1.9));
          return (
            <>
              <Center y={360}>
                <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                  <div style={popStyle(t, w(77) - 0.1, 0.5, 30)}><Ic k="spark" s={70} c="#fff" /></div>
                  <Words t={t} size={60} color="rgba(255,255,255,0.8)" weight={600} items={[{ w: "E", at: w(75) }, { w: "a", at: w(76) }]} />
                </div>
                <Letters t={t} text="inteligência artificial" at={w(77)} size={92} color="#fff" weight={800} stagger={0.022} />
              </Center>
              <svg width={W} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
                <path d="M300 800 C560 800 780 820 780 1000 C780 1180 300 1020 300 1200 C300 1380 560 1400 780 1400" fill="none" stroke="#fff" strokeWidth={10} strokeLinecap="round" strokeDasharray="1 1" pathLength={1} strokeDashoffset={1 - draw} opacity={0.9} />
              </svg>
              {N.map((n, i) => (
                <div key={i} style={{ position: "absolute", left: n.x - 90, top: n.y - 90, width: 180, display: "flex", flexDirection: "column", alignItems: "center", gap: 16, ...popStyle(t, w(79) - 0.2 + i * 0.55, 0.45, i % 2 ? 12 : -12) }}>
                  <div style={{ width: 180, height: 180, borderRadius: 48, background: "#fff", display: "grid", placeItems: "center" }}><Ic k={n.k} s={96} c={BL} /></div>
                  <div style={{ fontSize: 44, fontWeight: 800, color: "#fff" }}>{n.s}</div>
                </div>
              ))}
              <Center y={1700}>
                <Words t={t} size={56} color="rgba(255,255,255,0.8)" weight={600} items={[{ w: "redesenhando", at: w(79), color: "#fff", weight: 800 }, { w: "a", at: w(80) }, { w: "sua", at: w(81) }]} />
                <Letters t={t} text="jornada de compra." at={w(82)} size={96} color="#fff" weight={800} stagger={0.025} />
              </Center>
            </>
          );
        }}
      </Scene>

      {/* 8 · "Baixe o app e confira." — celular, mão toca em Baixar, barra enche, check */}
      <Scene t={t} a={SC(7)[0]} b={SC(7)[1]} bg={BG} enter="whipR" exit="zoomThrough"
        cam={[F(SC(7)[0], 540, 360, 1.4, -1), F(w(86), 540, 1180, 1.5, 0, 4), F(w(88) + 0.1, 540, 1100, 1.12, 1), F(SC(7)[1], 540, 1000, 1.0)]}>
        {() => {
          const tap = w(86) + 0.1;
          const pr = clamp01(ip(t, [tap + 0.1, tap + 1.0], [0, 1], E.inOut));
          const done = pr >= 1;
          return (
            <>
              <Center y={340}>
                <Letters t={t} text="Baixe o app" at={w(85)} size={128} color={INK} weight={800} />
                <Underline t={t} at={w(87) + 0.1} width={420} color={BL} thick={12} />
              </Center>
              <div style={{ position: "absolute", left: 290, top: 560, transform: `translateY(${(1 - E.outExpo(prog(t, SC(7)[0] + 0.1, 0.7))) * 900}px)` }}>
                <PhoneOutline w={500} h={900} ink={INK}>
                  <div style={{ position: "absolute", left: 0, right: 0, top: 170, display: "flex", flexDirection: "column", alignItems: "center", gap: 40 }}>
                    <div style={{ width: 210, height: 210, borderRadius: 54, background: BL, display: "grid", placeItems: "center" }}><Logo w={170} white /></div>
                    <div style={{ fontSize: 40, fontWeight: 800, color: INK }}>Magalu</div>
                    <div style={{ width: 340, height: 104, borderRadius: 999, background: done ? LB : BL, position: "relative", overflow: "hidden", display: "grid", placeItems: "center", transform: `scale(${t > tap - 0.05 && t < tap + 0.15 ? 0.94 : 1})` }}>
                      {t > tap && !done && <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${pr * 100}%`, background: "#0067C5" }} />}
                      <div style={{ position: "relative", fontSize: 42, fontWeight: 800, color: done ? BL : "#fff", display: "flex", alignItems: "center", gap: 12 }}>
                        {done ? <><Ic k="check" s={44} c={BL} />Pronto</> : t > tap ? `${Math.round(pr * 100)}%` : "Baixar"}
                      </div>
                    </div>
                  </div>
                </PhoneOutline>
              </div>
              <Hand t={t} from={[960, 1800]} to={[560, 1020]} at={w(85) + 0.05} tap={tap} leave={w(88)} ripple={BL} />
              <Center y={1640}>
                <Words t={t} size={72} color={MUTE} weight={600} items={[{ w: "e", at: w(88) }, { w: "confira.", at: w(89), color: BL, weight: 800 }]} />
              </Center>
            </>
          );
        }}
      </Scene>

      {/* 9 · "Magalu. Democratizar o acesso a bens e serviços." — logo oficial azul, missão com sublinhado (hold) */}
      <Scene t={t} a={SC(8)[0]} b={SC(8)[1]} bg={BG} enter="pop" exit="none" drift={0.4}
        cam={[F(SC(8)[0], 540, 820, 1.35, -1), F(w(91) - 0.1, 540, 960, 1.0), F(w(97) + 0.5, 540, 1000, 1.06), F(SC(8)[1], 540, 960, 1.1)]}>
        {() => (
          <>
            <Center y={800}>
              <div style={popStyle(t, w(90) - 0.2, 0.6, -10)}><Logo w={680} /></div>
            </Center>
            <Center y={1180}>
              <Words t={t} size={58} color={MUTE} weight={600} items={[{ w: "Democratizar", at: w(91), color: INK, weight: 800 }, { w: "o", at: w(92) }, { w: "acesso", at: w(93), color: BL, weight: 800 }]} />
              <Words t={t} size={58} color={MUTE} weight={600} items={[{ w: "a", at: w(94) }, { w: "bens", at: w(95), color: INK, weight: 800 }, { w: "e", at: w(96) }, { w: "serviços.", at: w(97), color: INK, weight: 800 }]} />
              <Underline t={t} at={w(97) + 0.3} width={560} color={BL} thick={12} />
            </Center>
          </>
        )}
      </Scene>

      {watermark && <Watermark t={t} text="Seu Estúdio" />  /* componente Watermark: copie da 15.0 */}
      <Soundtrack fps={fps} />
    </AbsoluteFill>
  );
};

/* ---------------- som em cada ação ---------------- */
type Fx = [number, string, number];
const sfxList = (): Fx[] => {
  const L: Fx[] = [];
  // (sem tique por palavra: regra de som)
  B.slice(1).forEach((b, i) => { L.push([b - 0.32, i % 3 === 1 ? "zoom.mp3" : "whoosh.mp3", 0.32]); L.push([b - 0.02, "swoosh.mp3", 0.18]); });
  const add = (at: number, f: string, v: number) => L.push([at, f, v]);
  add(0.02, "text-in.mp3", 0.22); [2, 3, 5].forEach((i) => add(w(i) - 0.15, "pop.mp3", 0.26)); add(w(7), "scribble.mp3", 0.26); add(w(8) - 0.15, "zoomin.mp3", 0.2); add(w(10), "scribble.mp3", 0.22);
  add(w(13) - 0.2, "reveal.mp3", 0.34); add(w(13) - 0.2, "sparkle.mp3", 0.22); add(w(13) + 0.3, "scribble.mp3", 0.24);
  add(w(17) - 0.2, "pop.mp3", 0.26); add(w(17), "tick.mp3", 0.12); add(w(24) - 0.3, "swish.mp3", 0.24); add(w(24), "pop.mp3", 0.26); add(w(27) - 0.2, "pop.mp3", 0.3); add(w(29) - 0.15, "zoomin.mp3", 0.2);
  [32, 38, 42].forEach((i) => add(w(i) - 0.3, "swish.mp3", 0.24));
  add(w(34), "tick.mp3", 0.12); add(w(39), "tick.mp3", 0.12); add(w(44), "tick.mp3", 0.12); add(w(47) + 0.3, "notify.mp3", 0.26);
  add(w(53) - 0.15, "zoomin.mp3", 0.2); [54, 55, 56, 58, 61].forEach((i) => { add(w(i) - 0.35, "swish.mp3", 0.2); add(w(i) + 0.2, "pop.mp3", 0.24); });
  add(w(64), "reveal.mp3", 0.26); add(SC(5)[0] + 0.15, "swish.mp3", 0.26); [65, 67, 70].forEach((i) => { add(w(i) - 0.02, "click.mp3", 0.36); add(w(i), "toggle.mp3", 0.26); }); add(w(71), "pop.mp3", 0.3);
  add(w(77) - 0.1, "sparkle.mp3", 0.26); add(w(79) - 0.2, "scribble.mp3", 0.24); for (let i = 0; i < 4; i++) add(w(79) - 0.2 + i * 0.55, "pop.mp3", 0.22); add(w(82) - 0.15, "zoomin.mp3", 0.18);
  add(w(86) + 0.1, "click.mp3", 0.36); add(w(86) + 1.1, "notify.mp3", 0.3); add(w(87) + 0.1, "scribble.mp3", 0.22);
  add(w(90) - 0.2, "reveal.mp3", 0.34); add(w(90) - 0.2, "sparkle.mp3", 0.24); add(w(97) + 0.3, "scribble.mp3", 0.26); add(w(97) + 0.9, "stamp.mp3", 0.2);
  return L.filter(([at]) => at >= 0 && at < TOTAL);
};

const Soundtrack: React.FC<{ fps: number }> = ({ fps }) => {
  const fx = React.useMemo(sfxList, []);
  return (
    <>
      <Audio src={staticFile("audio/voiceover.mp3")} volume={1} />
      <Audio src={staticFile("audio/music.mp3")} volume={(f) => {
        const s = f / fps; const talking = words.some((x) => s > x.start - 0.15 && s < x.end + 0.25);
        return (talking ? 0.07 : 0.16) * Math.max(0, Math.min(1, (TOTAL - s) / 2.5));
      }} />
      {fx.map(([at, f, v], i) => (
        <Sequence key={i} from={Math.round(at * fps)} durationInFrames={Math.round(1.6 * fps)}>
          <Audio src={staticFile(`sfx/${f}`)} volume={v} />
        </Sequence>
      ))}
    </>
  );
};
```

## 15.4 · Loop · 16:9 · preto e branco · 56 s (duas colunas, janelas de app, cards em linha, gráfico de barras, URL + botão). Use com FORMAT = "16x9"

```tsx
import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useVideoConfig } from "remotion";
import T from "../public/audio/voiceover-timings.json";
import {
  E, F, FONT, Hand, Letters, Scene, Underline, Words, W, H,
  clamp01, ip, lerp, outStyle, popStyle, prog, slideStyle, useSec,
} from "./lib";

/* Loop (loopbot.app) · 16:9 · PRETO E BRANCO · estilo OpenMotionKit
   Regras: sem círculo/mancha de fundo; ênfase = palavra MAIOR (sem pílula). */
const BG = "#FFFFFF", INK = "#0B0B0C", MUTE = "#8E8E93", SOFT = "#F2F2F4", LINE = "#E1E1E6";

const words = (T as { words: { word: string; start: number; end: number }[] }).words;
const w = (i: number) => words[i]!.start;
export const TOTAL = Math.max(45, Math.ceil(words[words.length - 1]!.end + 4.5));
const B = [0, w(7), w(15), w(18), w(32), w(47), w(54), w(66), w(77), w(82), w(88)].map((x, i) => (i === 0 ? 0 : x - 0.12));
const SC = (i: number): [number, number] => [B[i]!, i + 1 < B.length ? B[i + 1]! : TOTAL];

/* marca oficial (loop-mark.png do site, usada como máscara — igual ao site) */
const Mark: React.FC<{ h: number; color: string; style?: React.CSSProperties }> = ({ h, color, style }) => (
  <div style={{ width: h * 1416 / 1010, height: h, background: color, WebkitMaskImage: `url(${staticFile("brand/loop-mark.png")})`, maskImage: `url(${staticFile("brand/loop-mark.png")})`, WebkitMaskSize: "contain", maskSize: "contain", WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat", ...style }} />
);

/* janela de app em contorno */
const Win: React.FC<{ w: number; h: number; title: string; dark?: boolean; children?: React.ReactNode; style?: React.CSSProperties }> = ({ w: ww, h, title, dark, children, style }) => (
  <div style={{ width: ww, height: h, borderRadius: 30, border: `6px solid ${INK}`, background: dark ? "#16161A" : "#fff", overflow: "hidden", boxShadow: "0 24px 50px rgba(0,0,0,0.10)", position: "relative", ...style }}>
    <div style={{ height: 64, display: "flex", alignItems: "center", gap: 12, padding: "0 24px", borderBottom: `3px solid ${dark ? "#2A2A30" : LINE}` }}>
      {[0, 1, 2].map((i) => <div key={i} style={{ width: 16, height: 16, borderRadius: 8, background: dark ? "#3A3A40" : "#D4D4DA" }} />)}
      <div style={{ marginLeft: 14, fontSize: 26, fontWeight: 700, color: dark ? "#fff" : INK }}>{title}</div>
    </div>
    <div style={{ position: "relative", height: h - 64 }}>{children}</div>
  </div>
);

/* ícones em traço */
const I: Record<string, (c: string) => React.ReactNode> = {
  key: (c) => <><circle cx="32" cy="50" r="18" fill="none" stroke={c} strokeWidth="8" /><path d="M50 50 H92 M78 50 V64 M88 50 V60" fill="none" stroke={c} strokeWidth="8" strokeLinecap="round" /></>,
  cal: (c) => <><rect x="10" y="18" width="80" height="72" rx="12" fill="none" stroke={c} strokeWidth="8" /><path d="M10 40 H90 M32 8 V26 M68 8 V26" stroke={c} strokeWidth="8" strokeLinecap="round" /></>,
  rocket: (c) => <><path d="M50 6 C70 22 74 46 66 70 H34 C26 46 30 22 50 6 Z" fill="none" stroke={c} strokeWidth="8" strokeLinejoin="round" /><circle cx="50" cy="38" r="9" fill={c} /><path d="M34 70 L22 88 M66 70 L78 88 M50 72 V94" stroke={c} strokeWidth="8" strokeLinecap="round" /></>,
  coin: (c) => <><circle cx="50" cy="50" r="40" fill="none" stroke={c} strokeWidth="8" /><path d="M58 34 C52 28 36 30 38 40 C40 50 62 46 62 58 C62 70 44 72 38 64 M50 22 V30 M50 70 V78" fill="none" stroke={c} strokeWidth="7" strokeLinecap="round" /></>,
  bag: (c) => <><path d="M18 32 H82 L76 92 H24 Z" fill="none" stroke={c} strokeWidth="8" strokeLinejoin="round" /><path d="M36 32 V24 C36 10 64 10 64 24 V32" fill="none" stroke={c} strokeWidth="8" /></>,
  qr: (c) => <>{[[10, 10], [62, 10], [10, 62]].map(([x, y], i) => <g key={i}><rect x={x} y={y} width="28" height="28" rx="4" fill="none" stroke={c} strokeWidth="7" /><rect x={x! + 9} y={y! + 9} width="10" height="10" fill={c} /></g>)}{[[62, 62], [78, 62], [62, 78], [80, 82], [46, 46], [46, 70]].map(([x, y], i) => <rect key={i} x={x} y={y} width="10" height="10" fill={c} />)}</>,
  box: (c) => <><path d="M50 8 L90 28 V72 L50 92 L10 72 V28 Z" fill="none" stroke={c} strokeWidth="8" strokeLinejoin="round" /><path d="M10 28 L50 48 L90 28 M50 48 V92" fill="none" stroke={c} strokeWidth="8" strokeLinejoin="round" /></>,
  check: (c) => <path d="M18 52 L40 74 L84 26" fill="none" stroke={c} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />,
  chat: (c) => <path d="M12 16 H88 Q94 16 94 22 V64 Q94 70 88 70 H40 L22 86 V70 H12 Q6 70 6 64 V22 Q6 16 12 16 Z" fill="none" stroke={c} strokeWidth="8" strokeLinejoin="round" />,
  send: (c) => <path d="M8 46 L92 10 L70 92 L46 62 L8 46 Z M46 62 L92 10" fill="none" stroke={c} strokeWidth="8" strokeLinejoin="round" />,
  store: (c) => <><path d="M10 38 L18 12 H82 L90 38 Z" fill="none" stroke={c} strokeWidth="8" strokeLinejoin="round" /><rect x="16" y="38" width="68" height="52" rx="4" fill="none" stroke={c} strokeWidth="8" /><rect x="40" y="60" width="20" height="30" fill={c} /></>,
};
const Ic: React.FC<{ k: string; s: number; c?: string; style?: React.CSSProperties }> = ({ k, s, c = INK, style }) => (
  <svg width={s} height={s} viewBox="0 0 100 100" style={{ overflow: "visible", ...style }}>{I[k]!(c)}</svg>
);

/* palavra de ênfase: normal, só que GRANDE (regra do estilo) */
const Big: React.FC<{ t: number; text: string; at: number; size?: number; color?: string; align?: "center" | "flex-start" }> = ({ t, text, at, size = 150, color = INK, align = "center" }) => (
  <Letters t={t} text={text} at={at} size={size} color={color} weight={800} stagger={0.03} style={{ justifyContent: align }} />
);

export const Video: React.FC<{ watermark: boolean }> = ({ watermark }) => {
  const t = useSec();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ background: BG, fontFamily: FONT }}>
      {/* 1 · "Vender no Discord ainda te dá trabalho?" — janela de chat lotando de mensagens */}
      <Scene t={t} a={SC(0)[0]} b={SC(0)[1]} cam={[F(0, 1420, 540, 1.4, -2, 0, -8), F(w(5), 1420, 560, 1.2, 0, 0, -4), F(w(6) - 0.1, 470, 470, 1.32, 1), F(SC(0)[1], 760, 540, 1.08)]} bg={BG} enter="none" exit="whipL">
        {() => {
          const msgs = ["Ainda tem?", "Qual o Pix?", "Já paguei, cadê?", "Manda o produto!", "Oi??", "Tem estoque?"];
          return (
            <>
              <div style={{ position: "absolute", left: 1060, top: 150, ...popStyle(t, 0.2, 0.55) }}>
                <Win w={720} h={780} title="# vendas" dark>
                  <div style={{ position: "absolute", left: 24, right: 24, bottom: 24, display: "flex", flexDirection: "column", gap: 14 }}>
                    {msgs.map((m, i) => {
                      const at = 0.6 + i * 0.36;
                      return (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, ...slideStyle(t, at, 0, 0.3), transform: `translateY(${(1 - E.outBack(prog(t, at, 0.4))) * 40}px)` }}>
                          <div style={{ width: 54, height: 54, borderRadius: 27, background: ["#5A5A62", "#8E8E93", "#3A3A40"][i % 3], flex: "none" }} />
                          <div style={{ padding: "14px 22px", borderRadius: 20, background: "#26262C", color: "#fff", fontSize: 30, fontWeight: 600 }}>{m}</div>
                        </div>
                      );
                    })}
                  </div>
                </Win>
                <div style={{ position: "absolute", right: -26, top: -26, minWidth: 74, height: 74, padding: "0 16px", borderRadius: 37, background: INK, color: "#fff", fontSize: 38, fontWeight: 800, display: "grid", placeItems: "center", ...popStyle(t, 0.9, 0.4) }}>{Math.min(99, Math.max(1, Math.round(ip(t, [0.9, 3.2], [1, 47], E.outQuint))))}</div>
              </div>
              <div style={{ position: "absolute", left: 140, top: 300, width: 880 }}>
                <Words t={t} size={62} color={MUTE} weight={500} style={{ justifyContent: "flex-start" }} items={[{ w: "Vender", at: w(0), color: INK, weight: 700 }, { w: "no", at: w(1) }, { w: "Discord", at: w(2), color: INK, weight: 700 }]} />
                <Words t={t} size={62} color={MUTE} weight={500} style={{ justifyContent: "flex-start" }} items={[{ w: "ainda", at: w(3) }, { w: "te", at: w(4) }, { w: "dá", at: w(5) }]} />
                <Big t={t} text="trabalho?" at={w(6)} size={190} align="flex-start" />
                <Underline t={t} at={w(6) + 0.45} width={560} color={INK} />
              </div>
            </>
          );
        }}
      </Scene>

      {/* 2 · "Responder cliente, conferir Pix, mandar produto na mão." — 3 tarefas manuais empilhando + "na mão." grande */}
      <Scene t={t} a={SC(1)[0]} b={SC(1)[1]} cam={[F(SC(1)[0], 550, 270, 1.45, -1), F(w(9) - 0.1, 550, 400, 1.42, 0, 4), F(w(11) - 0.1, 550, 520, 1.42, 1), F(w(13) - 0.15, 1290, 480, 1.35, -1, 0, -6), F(SC(1)[1], 960, 540, 1.05)]} bg={SOFT} enter="whipR" exit="zoomThrough">
        {() => {
          const tasks = [{ k: "chat", s: "Responder cliente", i: 7 }, { k: "qr", s: "Conferir Pix", i: 9 }, { k: "send", s: "Mandar produto", i: 11 }];
          return (
            <>
              <div style={{ position: "absolute", left: 160, top: 210, display: "flex", flexDirection: "column", gap: 26 }}>
                {tasks.map((x, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 28, width: 780, padding: "26px 32px", borderRadius: 30, background: "#fff", border: `4px solid ${INK}`, ...slideStyle(t, w(x.i) - 0.2, -700, 0.5) }}>
                    <Ic k={x.k} s={70} />
                    <div style={{ flex: 1, fontSize: 50, fontWeight: 700, color: INK }}>{x.s}</div>
                    <div style={{ fontSize: 30, fontWeight: 700, color: MUTE }}>manual</div>
                  </div>
                ))}
              </div>
              <div style={{ position: "absolute", left: 1080, top: 380, width: 700 }}>
                <Words t={t} size={60} color={MUTE} weight={500} style={{ justifyContent: "flex-start" }} items={[{ w: "tudo", at: w(12) }]} />
                <Big t={t} text="na mão." at={w(13)} size={200} align="flex-start" />
              </div>
              <Hand t={t} from={[1600, 1100]} to={[870, 690]} at={w(11) - 0.2} tap={w(12)} leave={w(13) + 0.3} ripple={INK} />
            </>
          );
        }}
      </Scene>

      {/* 3 · "Conheça a Loop:" — fundo preto, marca oficial em pop, "Loop" letra a letra */}
      <Scene t={t} a={SC(2)[0]} b={SC(2)[1]} cam={[F(SC(2)[0], 900, 540, 1.6, -5), F(w(17) + 0.2, 960, 540, 1.12, 0), F(SC(2)[1], 960, 540, 1.02, 1)]} bg={INK} enter="zoomIn" exit="whipL">
        {() => (
          <div style={{ position: "absolute", left: 0, width: W, top: H / 2, transform: "translateY(-50%)", display: "flex", alignItems: "center", justifyContent: "center", gap: 50 }}>
            <div style={popStyle(t, w(17) - 0.25, 0.6, -30)}><Mark h={230} color="#fff" /></div>
            <div>
              <Words t={t} size={60} color="rgba(255,255,255,0.6)" weight={500} style={{ justifyContent: "flex-start" }} items={[{ w: "Conheça", at: w(15) }, { w: "a", at: w(16) }]} />
              <Big t={t} text="Loop" at={w(17)} size={220} color="#fff" align="flex-start" />
            </div>
          </div>
        )}
      </Scene>

      {/* 4 · "o seu bot de vendas no Discord e a sua loja online, tudo conectado." — chat com o bot × loja online, ligados */}
      <Scene t={t} a={SC(3)[0]} b={SC(3)[1]} cam={[F(SC(3)[0], 960, 230, 1.35), F(w(20) - 0.1, 480, 610, 1.3, -1, 0, 10), F(w(28) - 0.1, 1440, 610, 1.3, 1, 0, -10), F(w(30) - 0.1, 960, 660, 1.0), F(SC(3)[1], 960, 600, 1.06)]} bg={BG} enter="whipR" exit="shrink">
        {() => {
          const link = prog(t, w(30) - 0.1, 0.6);
          const dot = ((t - w(30)) * 0.8) % 1;
          return (
            <>
              <div style={{ position: "absolute", left: 0, width: W, top: 110, textAlign: "center" }}>
                <Words t={t} size={54} color={MUTE} weight={500} items={[{ w: "o", at: w(18) }, { w: "seu", at: w(19) }, { w: "bot", at: w(20), color: INK, weight: 800 }, { w: "de", at: w(21) }, { w: "vendas", at: w(22), color: INK, weight: 800 }, { w: "no", at: w(23) }, { w: "Discord", at: w(24), color: INK, weight: 700 }]} />
                <Words t={t} size={54} color={MUTE} weight={500} items={[{ w: "e", at: w(25) }, { w: "a", at: w(26) }, { w: "sua", at: w(27) }, { w: "loja", at: w(28), color: INK, weight: 800 }, { w: "online,", at: w(29), color: INK, weight: 800 }]} />
              </div>
              <div style={{ position: "absolute", left: 170, top: 330, ...slideStyle(t, w(20) - 0.2, -800, 0.6) }}>
                <Win w={620} h={560} title="# loja" dark>
                  <div style={{ margin: 28, padding: 26, borderRadius: 22, background: "#1F1F24", borderLeft: "8px solid #fff" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}><Mark h={34} color="#fff" /><div style={{ fontSize: 28, fontWeight: 800, color: "#fff" }}>Loop · Bot de vendas</div></div>
                    <div style={{ marginTop: 22, fontSize: 34, fontWeight: 700, color: "#fff" }}>Produto digital</div>
                    <div style={{ marginTop: 8, fontSize: 26, color: "#A8A8B0" }}>Entrega automática · Pix</div>
                    <div style={{ marginTop: 26, width: 230, padding: "16px 0", borderRadius: 14, background: "#fff", color: INK, fontSize: 28, fontWeight: 800, textAlign: "center" }}>Comprar</div>
                  </div>
                </Win>
              </div>
              <div style={{ position: "absolute", left: 1130, top: 330, ...slideStyle(t, w(28) - 0.2, 800, 0.6) }}>
                <Win w={620} h={560} title="sualoja.com">
                  <div style={{ padding: 28, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                    {[0, 1, 2, 3].map((i) => <div key={i} style={{ height: 180, borderRadius: 20, background: i === 0 ? INK : SOFT, display: "grid", placeItems: "center" }}><Ic k={["bag", "key", "cal", "rocket"][i]!} s={70} c={i === 0 ? "#fff" : INK} /></div>)}
                  </div>
                </Win>
              </div>
              <svg width={W} height={H} style={{ position: "absolute", left: 0, top: 0 }}>
                <line x1={800} y1={610} x2={1120} y2={610} stroke={INK} strokeWidth={6} strokeDasharray="6 16" strokeLinecap="round" opacity={link} />
                {link >= 1 && <circle cx={lerp(800, 1120, dot)} cy={610} r={13} fill={INK} />}
              </svg>
              <div style={{ position: "absolute", left: 0, width: W, top: 935, textAlign: "center" }}>
                <Big t={t} text="tudo conectado." at={w(30)} size={110} />
              </div>
            </>
          );
        }}
      </Scene>

      {/* 5 · "O cliente escolhe o produto no servidor, paga com Pix e recebe com entrega automática." — 01 → 02 → 03, como no site */}
      <Scene t={t} a={SC(4)[0]} b={SC(4)[1]} cam={[F(SC(4)[0], 960, 200, 1.3), F(w(34) - 0.2, 440, 540, 1.38, -1, 0, 8), F(w(39) - 0.2, 960, 540, 1.38, 0, 4), F(w(45) - 0.2, 1480, 540, 1.38, 1, 0, -8), F(w(46) + 0.3, 960, 700, 1.05), F(SC(4)[1], 960, 640, 1.1)]} bg={BG} enter="zoomIn" exit="whipL">
        {() => {
          const steps = [
            { n: "01", k: "bag", s: "Escolhe o produto", at: w(34) },
            { n: "02", k: "qr", s: "Paga com Pix", at: w(39) },
            { n: "03", k: "box", s: "Entrega automática", at: w(45) },
          ];
          const done = t > w(46) + 0.3;
          return (
            <>
              <div style={{ position: "absolute", left: 0, width: W, top: 130, textAlign: "center" }}>
                <Words t={t} size={54} color={MUTE} weight={500} items={[{ w: "O", at: w(32) }, { w: "cliente", at: w(33), color: INK, weight: 700 }, { w: "escolhe,", at: w(34) }, { w: "paga", at: w(39) }, { w: "e", at: w(42) }, { w: "recebe.", at: w(43), color: INK, weight: 800 }]} />
              </div>
              <div style={{ position: "absolute", left: 0, width: W, top: 330, display: "flex", justifyContent: "center", gap: 60, alignItems: "stretch" }}>
                {steps.map((s, i) => {
                  const on = t > s.at;
                  return (
                    <div key={i} style={{ width: 460, padding: "34px 34px 40px", borderRadius: 34, background: on ? INK : SOFT, ...popStyle(t, s.at - 0.25, 0.5) }}>
                      <div style={{ fontSize: 34, fontWeight: 800, color: on ? "#8E8E93" : MUTE }}>{s.n}</div>
                      <div style={{ margin: "26px 0", height: 150, display: "grid", placeItems: "center" }}><Ic k={s.k} s={130} c={on ? "#fff" : INK} /></div>
                      <div style={{ fontSize: 42, fontWeight: 800, color: on ? "#fff" : INK, textAlign: "center" }}>{s.s}</div>
                    </div>
                  );
                })}
              </div>
              <svg width={W} height={H} style={{ position: "absolute", left: 0, top: 0 }}>
                {[0, 1].map((i) => <path key={i} d={`M${700 + i * 520} 600 l40 0`} stroke={INK} strokeWidth={8} strokeLinecap="round" opacity={prog(t, steps[i + 1]!.at - 0.3, 0.2)} />)}
              </svg>
              <div style={{ position: "absolute", left: W / 2 - 330, top: 880, width: 660, display: "flex", alignItems: "center", gap: 22, padding: "24px 32px", borderRadius: 26, background: "#fff", border: `4px solid ${INK}`, opacity: done ? 1 : 0, ...popStyle(t, w(46) + 0.3, 0.45) }}>
                <div style={{ width: 64, height: 64, borderRadius: 18, background: INK, display: "grid", placeItems: "center" }}><Ic k="check" s={42} c="#fff" /></div>
                <div style={{ fontSize: 36, fontWeight: 800, color: INK }}>Produto entregue ao cliente</div>
              </div>
              <Hand t={t} from={[1700, 1050]} to={[440, 500]} at={w(33)} tap={w(34) + 0.15} leave={w(35) + 0.6} ripple={INK} />
            </>
          );
        }}
      </Scene>

      {/* 6 · "Venda produtos digitais, assinaturas, impulsos e Robux." — 4 blocos entrando um por palavra */}
      <Scene t={t} a={SC(5)[0]} b={SC(5)[1]} cam={[F(SC(5)[0], 960, 290, 1.45), F(w(48) - 0.25, 360, 650, 1.4, -1, 0, 8), F(w(50) - 0.2, 760, 650, 1.4, 0, 0, 4), F(w(51) - 0.2, 1160, 650, 1.4, 0, 0, -4), F(w(53) - 0.2, 1560, 650, 1.4, 1, 0, -8), F(w(53) + 0.6, 960, 560, 1.0), F(SC(5)[1], 960, 560, 1.05)]} bg={SOFT} enter="whipR" exit="zoomThrough">
        {() => {
          const tiles = [{ k: "key", s: "Produtos digitais", i: 48 }, { k: "cal", s: "Assinaturas", i: 50 }, { k: "rocket", s: "Impulsos", i: 51 }, { k: "coin", s: "Robux", i: 53 }];
          return (
            <>
              <div style={{ position: "absolute", left: 0, width: W, top: 200 }}>
                <Big t={t} text="Venda" at={w(47)} size={150} />
              </div>
              <div style={{ position: "absolute", left: 0, width: W, top: 470, display: "flex", justifyContent: "center", gap: 40 }}>
                {tiles.map((x, i) => (
                  <div key={i} style={{ width: 360, height: 360, borderRadius: 40, background: "#fff", border: `5px solid ${INK}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 30, ...popStyle(t, w(x.i) - 0.2, 0.5, i % 2 ? 10 : -10) }}>
                    <Ic k={x.k} s={130} />
                    <div style={{ fontSize: 40, fontWeight: 800, color: INK }}>{x.s}</div>
                  </div>
                ))}
              </div>
            </>
          );
        }}
      </Scene>

      {/* 7 · "Conecte o Telegram e use o mesmo catálogo em todos os canais." — 3 canais com o mesmo catálogo sincronizando */}
      <Scene t={t} a={SC(6)[0]} b={SC(6)[1]} cam={[F(SC(6)[0], 960, 200, 1.35), F(w(54) - 0.1, 440, 700, 1.32, -1, 0, 8), F(w(56) - 0.05, 960, 700, 1.32, 0, 4), F(w(61) - 0.15, 1480, 700, 1.32, 1, 0, -8), F(w(62), 960, 580, 1.0), F(SC(6)[1], 960, 600, 1.05)]} bg={BG} enter="zoomIn" exit="whipL">
        {() => {
          const ch = [{ s: "Discord", at: w(54) - 0.2 }, { s: "Telegram", at: w(56) - 0.1 }, { s: "Loja online", at: w(61) - 0.2 }];
          const sync = prog(t, w(61), 0.4);
          return (
            <>
              <div style={{ position: "absolute", left: 0, width: W, top: 120, textAlign: "center" }}>
                <Words t={t} size={56} color={MUTE} weight={500} items={[{ w: "Conecte", at: w(54), color: INK, weight: 700 }, { w: "o", at: w(55) }, { w: "Telegram", at: w(56), color: INK, weight: 800 }, { w: "e", at: w(57) }, { w: "use", at: w(58) }, { w: "o", at: w(59) }]} />
                <Big t={t} text="mesmo catálogo" at={w(60)} size={110} />
              </div>
              <div style={{ position: "absolute", left: 0, width: W, top: 470, display: "flex", justifyContent: "center", gap: 50 }}>
                {ch.map((c, i) => (
                  <div key={i} style={{ width: 470, padding: 30, borderRadius: 32, border: `5px solid ${INK}`, background: "#fff", ...slideStyle(t, c.at, i === 0 ? -600 : i === 2 ? 600 : 0, 0.55) }}>
                    <div style={{ fontSize: 40, fontWeight: 800, color: INK, marginBottom: 22 }}>{c.s}</div>
                    {["Produto A", "Produto B", "Assinatura"].map((p, j) => (
                      <div key={j} style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 0", borderTop: `3px solid ${LINE}` }}>
                        <div style={{ width: 44, height: 44, borderRadius: 12, background: sync > j * 0.3 ? INK : SOFT, display: "grid", placeItems: "center" }}>{sync > j * 0.3 && <Ic k="check" s={30} c="#fff" />}</div>
                        <div style={{ fontSize: 32, fontWeight: 600, color: INK }}>{p}</div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div style={{ position: "absolute", left: 0, width: W, top: 935, textAlign: "center" }}>
                <Words t={t} size={52} color={MUTE} weight={500} items={[{ w: "em", at: w(62) }, { w: "todos", at: w(63), color: INK, weight: 800 }, { w: "os", at: w(64) }, { w: "canais.", at: w(65), color: INK, weight: 800 }]} />
              </div>
            </>
          );
        }}
      </Scene>

      {/* 8 · "Personalize a sua vitrine e acompanhe cada pedido num só painel." — painel: tema trocando + pedidos entrando */}
      <Scene t={t} a={SC(7)[0]} b={SC(7)[1]} cam={[F(SC(7)[0], 460, 440, 1.4, -1), F(w(68) - 0.2, 1330, 330, 1.35, 1, 0, -8), F(w(73) - 0.2, 1330, 640, 1.35, 0, 3, -4), F(w(76), 960, 540, 1.05), F(SC(7)[1], 960, 540, 1.08)]} bg={SOFT} enter="whipR" exit="zoomThrough">
        {() => {
          const dark = t > w(69) + 0.2;
          const orders = [["#1042", "Pago"], ["#1043", "Entregue"], ["#1044", "Entregue"], ["#1045", "Pago"]];
          return (
            <>
              <div style={{ position: "absolute", left: 140, top: 300, width: 640 }}>
                <Big t={t} text="Personalize" at={w(66)} size={120} align="flex-start" />
                <Words t={t} size={54} color={MUTE} weight={500} style={{ justifyContent: "flex-start" }} items={[{ w: "a", at: w(67) }, { w: "sua", at: w(68) }, { w: "vitrine", at: w(69), color: INK, weight: 800 }, { w: "e", at: w(70) }, { w: "acompanhe", at: w(71) }]} />
                <Words t={t} size={54} color={MUTE} weight={500} style={{ justifyContent: "flex-start" }} items={[{ w: "cada", at: w(72) }, { w: "pedido", at: w(73), color: INK, weight: 800 }, { w: "num", at: w(74) }, { w: "só", at: w(75) }, { w: "painel.", at: w(76), color: INK, weight: 800 }]} />
              </div>
              <div style={{ position: "absolute", left: 880, top: 170, ...slideStyle(t, SC(7)[0] + 0.15, 800, 0.6) }}>
                <Win w={900} h={740} title="Meu painel" dark={dark}>
                  <div style={{ display: "flex", gap: 16, padding: "26px 30px" }}>
                    {["Tema claro", "Tema escuro"].map((s, i) => (
                      <div key={i} style={{ padding: "14px 26px", borderRadius: 16, fontSize: 28, fontWeight: 700, border: `3px solid ${dark ? "#fff" : INK}`, background: (i === 1) === dark ? (dark ? "#fff" : INK) : "transparent", color: (i === 1) === dark ? (dark ? INK : "#fff") : dark ? "#fff" : INK }}>{s}</div>
                    ))}
                  </div>
                  <div style={{ padding: "0 30px" }}>
                    {orders.map(([id, st], i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 20, padding: "22px 0", borderTop: `3px solid ${dark ? "#2A2A30" : LINE}`, ...slideStyle(t, w(73) - 0.2 + i * 0.2, 400, 0.4) }}>
                        <Ic k="bag" s={46} c={dark ? "#fff" : INK} />
                        <div style={{ flex: 1, fontSize: 32, fontWeight: 700, color: dark ? "#fff" : INK }}>Pedido {id}</div>
                        <div style={{ padding: "8px 20px", borderRadius: 12, fontSize: 26, fontWeight: 800, background: st === "Entregue" ? (dark ? "#fff" : INK) : "transparent", color: st === "Entregue" ? (dark ? INK : "#fff") : dark ? "#fff" : INK, border: `3px solid ${dark ? "#fff" : INK}` }}>{st}</div>
                      </div>
                    ))}
                  </div>
                </Win>
              </div>
              <Hand t={t} from={[1800, 1050]} to={[1290, 270]} at={w(68)} tap={w(69) + 0.2} leave={w(70) + 0.5} ripple={INK} />
            </>
          );
        }}
      </Scene>

      {/* 9 · "Mais vendas, menos trabalho manual." — "Mais vendas," enorme + barras subindo */}
      <Scene t={t} a={SC(8)[0]} b={SC(8)[1]} cam={[F(SC(8)[0], 560, 420, 1.45, -2), F(w(79) - 0.1, 1460, 560, 1.2, 2, 0, -6), F(SC(8)[1], 960, 540, 1.0)]} bg={BG} enter="zoomIn" exit="whipL">
        {() => (
          <>
            <div style={{ position: "absolute", left: 140, top: 280, width: 900 }}>
              <Big t={t} text="Mais vendas," at={w(77)} size={170} align="flex-start" />
              <div style={{ ...outStyle(t, SC(8)[1] - 0.4, 0.2) }}>
                <Words t={t} size={60} color={MUTE} weight={500} style={{ justifyContent: "flex-start" }} items={[{ w: "menos", at: w(79), color: INK, weight: 700 }, { w: "trabalho", at: w(80) }, { w: "manual.", at: w(81) }]} />
              </div>
            </div>
            <div style={{ position: "absolute", left: 1150, top: 200, width: 620, height: 680, display: "flex", alignItems: "flex-end", gap: 34, borderBottom: `6px solid ${INK}` }}>
              {[0.32, 0.48, 0.62, 0.8, 1].map((hh, i) => (
                <div key={i} style={{ flex: 1, borderRadius: "18px 18px 0 0", background: i === 4 ? INK : "#C9C9CF", height: `${hh * 100 * E.outBack(prog(t, w(77) + i * 0.1, 0.6))}%` }} />
              ))}
            </div>
          </>
        )}
      </Scene>

      {/* 10 · "Comece grátis em loopbot ponto app." — barra de endereço digitando + botão clicado */}
      <Scene t={t} a={SC(9)[0]} b={SC(9)[1]} cam={[F(SC(9)[0], 960, 250, 1.35), F(w(84) - 0.2, 960, 540, 1.4, 0, 6), F(w(87) + 0.1, 960, 770, 1.55, -1), F(SC(9)[1], 960, 620, 1.15)]} bg={SOFT} enter="whipR" exit="zoomThrough">
        {() => {
          const url = "loopbot.app", n = Math.round(ip(t, [w(85) - 0.1, w(87) + 0.3], [0, url.length], (x) => x));
          return (
            <>
              <div style={{ position: "absolute", left: 0, width: W, top: 170 }}>
                <Big t={t} text="Comece grátis" at={w(82)} size={150} />
              </div>
              <div style={{ position: "absolute", left: W / 2 - 520, top: 480, width: 1040, height: 120, borderRadius: 60, border: `6px solid ${INK}`, background: "#fff", display: "flex", alignItems: "center", gap: 22, padding: "0 40px", ...popStyle(t, w(84) - 0.2, 0.45) }}>
                <svg width={40} height={40} viewBox="0 0 24 24"><rect x="5" y="10" width="14" height="10" rx="2" fill="none" stroke={INK} strokeWidth="2.4" /><path d="M8 10 V7 a4 4 0 0 1 8 0 V10" fill="none" stroke={INK} strokeWidth="2.4" /></svg>
                <div style={{ fontSize: 56, fontWeight: 700, color: INK }}>{url.slice(0, n)}<span style={{ display: "inline-block", width: 4, height: 54, background: INK, marginLeft: 4, verticalAlign: -8, opacity: Math.floor(t * 3) % 2 ? 0 : 1 }} /></div>
              </div>
              <div style={{ position: "absolute", left: W / 2 - 220, top: 700, width: 440, padding: "30px 0", borderRadius: 26, background: INK, color: "#fff", fontSize: 46, fontWeight: 800, textAlign: "center", transform: `scale(${t > w(87) + 0.55 && t < w(87) + 0.7 ? 0.95 : 1})`, ...popStyle(t, w(87), 0.45) }}>Começar grátis</div>
              <Hand t={t} from={[1500, 1050]} to={[1010, 760]} at={w(87) + 0.05} tap={w(87) + 0.55} ripple={INK} />
            </>
          );
        }}
      </Scene>

      {/* 11 · "Loop. Tudo conectado." — fundo preto, marca, nome, slogan sublinhado (hold limpo) */}
      <Scene t={t} a={SC(10)[0]} b={SC(10)[1]} cam={[F(SC(10)[0], 960, 520, 1.45, -3), F(w(88) + 0.6, 960, 560, 1.06, 0), F(SC(10)[1], 960, 560, 1.0, 1)]} bg={INK} enter="zoomIn" exit="none" drift={0.4}>
        {() => (
          <>
            <div style={{ position: "absolute", left: 0, width: W, top: 300, display: "flex", alignItems: "center", justifyContent: "center", gap: 46 }}>
              <div style={popStyle(t, w(88) - 0.2, 0.6, -30)}><Mark h={200} color="#fff" /></div>
              <Big t={t} text="Loop" at={w(88)} size={210} color="#fff" />
            </div>
            <div style={{ position: "absolute", left: 0, width: W, top: 660, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Words t={t} size={72} color="rgba(255,255,255,0.6)" weight={600} items={[{ w: "Tudo", at: w(89), color: "#fff" }, { w: "conectado.", at: w(90), color: "#fff", weight: 800 }]} />
              <Underline t={t} at={w(90) + 0.25} width={520} color="#FFFFFF" />
              <div style={{ marginTop: 34, fontSize: 40, fontWeight: 600, color: "rgba(255,255,255,0.55)", opacity: prog(t, w(90) + 0.7, 0.4) }}>loopbot.app</div>
            </div>
          </>
        )}
      </Scene>

      {watermark && <Watermark t={t} text="Seu Estúdio" />  /* componente Watermark: copie da 15.0 */}
      <Soundtrack fps={fps} />
    </AbsoluteFill>
  );
};

/* ---------------- som denso ---------------- */
type Fx = [number, string, number];
const sfxList = (): Fx[] => {
  const L: Fx[] = [];
  // (sem tique por palavra: regra de som)
  B.slice(1).forEach((b, i) => { L.push([b - 0.32, i % 3 === 1 ? "zoom.mp3" : "whoosh.mp3", 0.32]); L.push([b - 0.02, "swoosh.mp3", 0.18]); });
  const add = (at: number, f: string, v: number) => L.push([at, f, v]);
  add(0.02, "text-in.mp3", 0.22); add(0.2, "pop.mp3", 0.26); for (let i = 0; i < 6; i++) add(0.6 + i * 0.36, "message.mp3", 0.16); add(w(6) + 0.45, "scribble.mp3", 0.26);
  [7, 9, 11].forEach((i) => add(w(i) - 0.2, "swish.mp3", 0.24)); add(w(12), "click.mp3", 0.36);
  add(w(17) - 0.25, "reveal.mp3", 0.34); add(w(17) - 0.25, "sparkle.mp3", 0.22);
  add(w(20) - 0.2, "swish.mp3", 0.26); add(w(28) - 0.2, "swish.mp3", 0.26); add(w(30), "notify.mp3", 0.24);
  add(w(34) + 0.15, "click.mp3", 0.38); [34, 39, 45].forEach((i) => add(w(i) - 0.25, "pop.mp3", 0.26)); add(w(46) + 0.3, "notify.mp3", 0.32);
  add(w(47), "text-in.mp3", 0.2); [48, 50, 51, 53].forEach((i) => add(w(i) - 0.2, "pop.mp3", 0.26));
  add(w(54) - 0.2, "swish.mp3", 0.22); add(w(56) - 0.1, "swish.mp3", 0.22); add(w(61) - 0.2, "swish.mp3", 0.22); add(w(61), "tick.mp3", 0.12);
  add(SC(7)[0] + 0.15, "swish.mp3", 0.24); add(w(69) + 0.2, "click.mp3", 0.38); add(w(69) + 0.25, "toggle.mp3", 0.26); for (let i = 0; i < 4; i++) add(w(73) - 0.2 + i * 0.2, "pop.mp3", 0.14);
  add(w(77), "tick.mp3", 0.12); add(w(77), "reveal.mp3", 0.26);
  add(w(84) - 0.2, "pop.mp3", 0.26); add(w(85) - 0.1, "typing.mp3", 0.18); add(w(87), "pop.mp3", 0.28); add(w(87) + 0.55, "click.mp3", 0.42);
  add(w(88) - 0.2, "reveal.mp3", 0.34); add(w(88) - 0.2, "sparkle.mp3", 0.24); add(w(90) + 0.25, "scribble.mp3", 0.26);
  return L.filter(([at]) => at >= 0 && at < TOTAL);
};

const Soundtrack: React.FC<{ fps: number }> = ({ fps }) => {
  const fx = React.useMemo(sfxList, []);
  return (
    <>
      <Audio src={staticFile("audio/voiceover.mp3")} volume={1} />
      <Audio src={staticFile("audio/music.mp3")} volume={(f) => {
        const s = f / fps; const talking = words.some((x) => s > x.start - 0.15 && s < x.end + 0.25);
        return (talking ? 0.07 : 0.16) * Math.max(0, Math.min(1, (TOTAL - s) / 2.5));
      }} />
      {fx.map(([at, f, v], i) => (
        <Sequence key={i} from={Math.round(at * fps)} durationInFrames={Math.round(1.6 * fps)}>
          <Audio src={staticFile(`sfx/${f}`)} volume={v} />
        </Sequence>
      ))}
    </>
  );
};
```

---

# PARTE 16 · Checklist final e entrega

## 16.1 Checklist (todo vídeo, sem exceção)
- [ ] Remotion, **120 fps**, **≥ 45 s**, formato certo (1080×1920 ou 1920×1080).
- [ ] **Duas versões**: limpa e com marca d'água em mosaico.
- [ ] Áudio master **−14 LUFS** (ou prévia sem voz +10 dB, avisando).
- [ ] Fundo branco dominante + **1 cor** da marca; 2–3 cenas na cor, nunca seguidas.
- [ ] Fonte Outfit; texto centralizado; contexto pequeno e cinza; **ênfase grande e na cor** (`Letters`).
- [ ] Todo texto sincronizado com a fala (`w(i)`).
- [ ] Cada cena com **≥ 2 elementos** do estilo (traço, mão, interface, bloco-ícone, contador, gráfico).
- [ ] **Toda cena com `cam`**, chaves ≥ 1,2 s, zoom ≤ 1,3, giros pequenos; nada borrado parado; nada cortado na borda quando falado.
- [ ] **Nenhum círculo/anel/mancha/glow** de fundo; nada solto ou fora da grade.
- [ ] **≤ 1 pílula** no vídeo.
- [ ] **Uma mão por vez** (encadeadas com `until`).
- [ ] Transições alternadas, nenhum corte seco; 1ª cena `enter="none"`, última `exit="none"` + `drift={0.4}`.
- [ ] Som em cada ação importante; **nenhum tique por palavra**; ≤ ~4 `tick.mp3` no vídeo.
- [ ] Logo oficial (só recolorido); fatos com fonte oficial; o que é ilustrativo está identificado.
- [ ] Folha de revisão conferida e limpa.

## 16.2 Mensagem de entrega (modelo)
> Pronto: motion da **<Marca>**, **9:16**, **<cor>** e branco, **<duração> s a 120 fps**, em duas versões (limpa e com marca d'água).
> - Câmera suave focando cada item; ênfase com a palavra maior; <0/1> pílula; sem fundo com círculo/mancha.
> - Conteúdo (do site oficial): <fato 1>; <fato 2>; <fato 3>.
> - Ilustrativo: <mensagens do chat, QR, números do painel…>.
> - Voz: <nome> (<por quê>). <Se prévia: "sem voz por enquanto; com a chave do Gemini as cenas se ajustam à fala real.">

## 16.3 Resumo do estilo em uma frase
**Branco + uma cor, Outfit centralizada, palavras saindo do desfoque e a palavra-chave grande pulando letra a letra, traço à mão, interface em contorno tocada por uma mãozinha com onda, câmera calma que visita cada item, transições de zoom e chicote, um som para cada ação e uma voz feminina calma — 120 fps, 45–60 s, duas versões.**

---

# PARTE 17 · Biblioteca de sons opcional (Kenney + Mixkit)

O gerador `gerar_sons.py` já cobre o estilo. Esta biblioteca é **opcional**, para quem quer sons "de banco". **Kenney** = CC0 1.0 (domínio público). **Mixkit** = Mixkit Sound Effects Free License (uso comercial em vídeo, sem atribuição; **proibido redistribuir os arquivos soltos** — por isso eles não vêm no repositório: o script baixa direto do Mixkit). Prévia de um som Mixkit: `https://assets.mixkit.co/active_storage/sfx/<id>/<id>-preview.mp3`.

## 17.1 Os 4 sons do estilo que vêm do Mixkit (opcional)

| Arquivo no projeto | ID Mixkit | Título | Uso |
|---|---|---|---|
| `zoom.mp3` | 2627 | Fast swipe zoom | antes da troca de cena (alternando com whoosh) |
| `swoosh.mp3` | 3005 | Explainer video pops whoosh light pop | no corte da troca |
| `sparkle.mp3` | 3083 | Magic sparkle touch | revelação de logo |
| `zoomin.mp3` | 2621 | Ui zoom in, long sound | antes da palavra grande |

Script: `scripts/baixar_sfx_mixkit.py` (PARTE 14).

## 17.2 Kit de favoritos (177 sons)

| # | Arquivo | Categoria | Título | Duração (s) | Fonte | ID Mixkit |
|---|---|---|---|---|---|---|
| 1 | `whoosh/whoosh-012-explainer-video-pops-whoosh-light-pop.mp3` | whoosh | Explainer video pops whoosh light pop | 0.21 | Mixkit | 3005 |
| 2 | `whoosh/whoosh-015-vinyl-record-swipe.mp3` | whoosh | Vinyl record swipe | 0.21 | Mixkit | 707 |
| 3 | `whoosh/whoosh-014-dj-record-swipe.mp3` | whoosh | DJ record swipe | 0.26 | Mixkit | 708 |
| 4 | `whoosh/whoosh-022-fast-transitions-swoosh.mp3` | whoosh | Fast transitions swoosh | 0.29 | Mixkit | 3115 |
| 5 | `whoosh/whoosh-033-karate-hit-whoosh.mp3` | whoosh | Karate hit whoosh | 0.31 | Mixkit | 1478 |
| 6 | `whoosh/whoosh-040-quick-swoosh-accent.mp3` | whoosh | Quick swoosh accent | 0.34 | Mixkit | 1464 |
| 7 | `whoosh/whoosh-021-short-wind-swoosh.mp3` | whoosh | Short wind swoosh | 0.39 | Mixkit | 1461 |
| 8 | `whoosh/whoosh-060-short-transition-sweep.mp3` | whoosh | Short transition sweep | 0.39 | Mixkit | 175 |
| 9 | `whoosh/whoosh-075-arrow-whoosh.mp3` | whoosh | Arrow whoosh | 0.39 | Mixkit | 1491 |
| 10 | `whoosh/whoosh-055-air-zoom-vacuum.mp3` | whoosh | Air zoom vacuum | 0.44 | Mixkit | 2608 |
| 11 | `whoosh/whoosh-047-technology-transition-slide.mp3` | whoosh | Technology transition slide | 0.55 | Mixkit | 3120 |
| 12 | `whoosh/whoosh-063-fast-sci-fi-transition-sweep.mp3` | whoosh | Fast sci fi transition sweep | 0.6 | Mixkit | 3114 |
| 13 | `whoosh/whoosh-013-fast-swipe-zoom.mp3` | whoosh | Fast swipe zoom | 0.65 | Mixkit | 2627 |
| 14 | `whoosh/whoosh-030-fast-sweep-transition.mp3` | whoosh | Fast sweep transition | 0.65 | Mixkit | 174 |
| 15 | `whoosh/whoosh-016-fast-small-sweep-transition.mp3` | whoosh | Fast small sweep transition | 0.68 | Mixkit | 166 |
| 16 | `whoosh/whoosh-044-long-hit-swoosh.mp3` | whoosh | Long hit swoosh | 0.73 | Mixkit | 1473 |
| 17 | `whoosh/whoosh-031-fast-air-sweep-transition.mp3` | whoosh | Fast air sweep transition | 0.76 | Mixkit | 168 |
| 18 | `whoosh/whoosh-053-fast-whoosh-transition.mp3` | whoosh | Fast whoosh transition | 0.78 | Mixkit | 1490 |
| 19 | `whoosh/whoosh-084-fast-air-zoom.mp3` | whoosh | Fast air zoom | 0.78 | Mixkit | 2625 |
| 20 | `whoosh/whoosh-049-futuristic-metal-transition-sweep.mp3` | whoosh | Futuristic metal transition sweep | 0.81 | Mixkit | 2636 |
| 21 | `whoosh/whoosh-029-cinematic-laser-swoosh.mp3` | whoosh | Cinematic laser swoosh | 0.86 | Mixkit | 1467 |
| 22 | `whoosh/whoosh-024-flying-fast-swoosh.mp3` | whoosh | Flying fast swoosh | 0.97 | Mixkit | 1469 |
| 23 | `whoosh/whoosh-020-cinematic-wind-swoosh.mp3` | whoosh | Cinematic wind swoosh | 0.99 | Mixkit | 1471 |
| 24 | `whoosh/whoosh-036-cinematic-transition-wind-swoosh.mp3` | whoosh | Cinematic transition wind swoosh | 0.99 | Mixkit | 1468 |
| 25 | `whoosh/whoosh-051-cinematic-whoosh-fast-transition.mp3` | whoosh | Cinematic whoosh fast transition | 1.33 | Mixkit | 1492 |
| 26 | `whoosh/whoosh-067-quick-metal-transition-sweep.mp3` | whoosh | Quick metal transition sweep | 1.41 | Mixkit | 2639 |
| 27 | `whoosh/whoosh-001-electric-whoosh.mp3` | whoosh | Electric whoosh | 1.67 | Mixkit | 2596 |
| 28 | `whoosh/whoosh-025-short-fire-whoosh.mp3` | whoosh | Short fire whoosh | 1.7 | Mixkit | 1345 |
| 29 | `whoosh/whoosh-035-fast-sweeping-transition.mp3` | whoosh | Fast sweeping transition | 1.72 | Mixkit | 164 |
| 30 | `whoosh/whoosh-074-air-woosh.mp3` | whoosh | Air woosh | 1.78 | Mixkit | 1489 |
| 31 | `pop/pop-018-plastic-bubble-click.mp3` | pop | Plastic bubble click | 0.08 | Mixkit | 1124 |
| 32 | `pop/pop-027-message-pop-alert.mp3` | pop | Message pop alert | 0.08 | Mixkit | 2354 |
| 33 | `pop/pop-019-game-balloon-or-bubble-pop.mp3` | pop | Game balloon or bubble pop | 0.1 | Mixkit | 3069 |
| 34 | `pop/pop-009-egg-bubble-pop.mp3` | pop | Egg bubble pop | 0.24 | Mixkit | 3192 |
| 35 | `pop/pop-001-soap-bubble-sound.mp3` | pop | Soap bubble sound | 0.26 | Mixkit | 2925 |
| 36 | `pop/pop-029-electric-pop.mp3` | pop | Electric pop | 0.26 | Mixkit | 2365 |
| 37 | `pop/pop-028-dry-pop-up-notification-alert.mp3` | pop | Dry pop up notification alert | 0.31 | Mixkit | 2356 |
| 38 | `pop/pop-023-hard-pop-click.mp3` | pop | Hard pop click | 0.34 | Mixkit | 2364 |
| 39 | `pop/pop-017-bubble-pop-up-alert-notification.mp3` | pop | Bubble pop up alert notification | 0.39 | Mixkit | 2357 |
| 40 | `pop/pop-020-cartoon-bubble-pop.mp3` | pop | Cartoon bubble pop | 0.42 | Mixkit | 731 |
| 41 | `pop/pop-026-long-pop.mp3` | pop | Long pop | 0.5 | Mixkit | 2358 |
| 42 | `pop/pop-011-cartoon-bubbles-popping.mp3` | pop | Cartoon bubbles popping | 0.57 | Mixkit | 732 |
| 43 | `pop/pop-007-magic-bubbles-spell.mp3` | pop | Magic bubbles spell | 1.28 | Mixkit | 2999 |
| 44 | `pop/pop-025-silly-pop-cluster.mp3` | pop | Silly pop cluster | 1.49 | Mixkit | 2359 |
| 45 | `pop/pop-016-volcano-lava-bubble.mp3` | pop | Volcano lava bubble | 1.59 | Mixkit | 2445 |
| 46 | `pop/pop-008-cartoon-bubbles-pop.mp3` | pop | Cartoon bubbles pop | 1.62 | Mixkit | 729 |
| 47 | `pop/pop-022-big-volcano-lava-bubble-burst.mp3` | pop | Big volcano lava bubble burst | 1.62 | Mixkit | 2448 |
| 48 | `pop/pop-006-retro-video-game-bubble-laser.mp3` | pop | Retro video game bubble laser | 1.65 | Mixkit | 277 |
| 49 | `pop/pop-012-bubbly-achievement-tone.mp3` | pop | Bubbly achievement tone | 1.23 | Mixkit | 3193 |
| 50 | `pop/pop-013-toy-whistler-bird-sound.mp3` | pop | Toy whistler bird sound | 0.71 | Mixkit | 18 |
| 51 | `click/click-004-modern-technology-select.mp3` | click | Modern technology select | 0.08 | Mixkit | 3124 |
| 52 | `click/click-005-cool-interface-click-tone.mp3` | click | Cool interface click tone | 0.08 | Mixkit | 2568 |
| 53 | `click/click-034-click4.mp3` | click | click4 | 0.08 | Kenney · ui-audio | — |
| 54 | `click/click-035-click5.mp3` | click | click5 | 0.08 | Kenney · ui-audio | — |
| 55 | `click/click-032-click2.mp3` | click | click2 | 0.1 | Kenney · ui-audio | — |
| 56 | `click/click-033-click3.mp3` | click | click3 | 0.1 | Kenney · ui-audio | — |
| 57 | `click/click-036-mouseclick1.mp3` | click | mouseclick1 | 0.1 | Kenney · ui-audio | — |
| 58 | `click/click-015-modern-click-box-check.mp3` | click | Modern click box check | 0.13 | Mixkit | 1120 |
| 59 | `click/click-031-click1.mp3` | click | click1 | 0.13 | Kenney · ui-audio | — |
| 60 | `click/click-008-classic-click.mp3` | click | Classic click | 0.16 | Mixkit | 1117 |
| 61 | `click/click-010-interface-device-click.mp3` | click | Interface device click | 0.16 | Mixkit | 2577 |
| 62 | `click/click-001-fast-double-click-on-mouse.mp3` | click | Fast double click on mouse | 0.18 | Mixkit | 275 |
| 63 | `click/click-022-stapling-paper.mp3` | click | Stapling paper | 0.18 | Mixkit | 2995 |
| 64 | `click/click-029-video-game-retro-click.mp3` | click | Video game retro click | 0.18 | Mixkit | 237 |
| 65 | `click/click-006-mouse-click-close.mp3` | click | Mouse click close | 0.21 | Mixkit | 1113 |
| 66 | `click/click-019-gear-fast-lock-tap.mp3` | click | Gear fast lock tap | 0.24 | Mixkit | 2857 |
| 67 | `click/click-013-clear-mouse-clicks.mp3` | click | Clear mouse clicks | 0.26 | Mixkit | 2997 |
| 68 | `click/click-002-select-click.mp3` | click | Select click | 0.31 | Mixkit | 1109 |
| 69 | `click/click-014-negative-tone-interface-tap.mp3` | click | Negative tone interface tap | 0.31 | Mixkit | 2569 |
| 70 | `click/click-016-click-error.mp3` | click | Click error | 0.39 | Mixkit | 1110 |
| 71 | `click/click-025-mouse-hard-clicking.mp3` | click | Mouse hard clicking | 0.42 | Mixkit | 1111 |
| 72 | `click/click-003-sci-fi-click.mp3` | click | Sci fi click | 0.5 | Mixkit | 900 |
| 73 | `click/click-021-sci-fi-interface-robot-click.mp3` | click | Sci fi interface robot click | 0.63 | Mixkit | 901 |
| 74 | `click/click-026-mechanical-tool-click.mp3` | click | Mechanical tool click | 0.99 | Mixkit | 1131 |
| 75 | `click/click-011-quick-win-video-game-notification.mp3` | click | Quick win video game notification | 0.86 | Mixkit | 269 |
| 76 | `ui/ui-081-select-001.mp3` | ui | select_001 | 0.08 | Kenney · interface-sounds | — |
| 77 | `ui/ui-082-select-002.mp3` | ui | select_002 | 0.08 | Kenney · interface-sounds | — |
| 78 | `ui/ui-087-select-007.mp3` | ui | select_007 | 0.08 | Kenney · interface-sounds | — |
| 79 | `ui/ui-088-select-008.mp3` | ui | select_008 | 0.08 | Kenney · interface-sounds | — |
| 80 | `ui/ui-040-glass-005.mp3` | ui | glass_005 | 0.1 | Kenney · interface-sounds | — |
| 81 | `ui/ui-041-glass-006.mp3` | ui | glass_006 | 0.1 | Kenney · interface-sounds | — |
| 82 | `ui/ui-096-tick-004.mp3` | ui | tick_004 | 0.1 | Kenney · interface-sounds | — |
| 83 | `ui/ui-100-toggle-004.mp3` | ui | toggle_004 | 0.1 | Kenney · interface-sounds | — |
| 84 | `ui/ui-065-pluck-001.mp3` | ui | pluck_001 | 0.13 | Kenney · interface-sounds | — |
| 85 | `ui/ui-097-toggle-001.mp3` | ui | toggle_001 | 0.13 | Kenney · interface-sounds | — |
| 86 | `ui/ui-098-toggle-002.mp3` | ui | toggle_002 | 0.13 | Kenney · interface-sounds | — |
| 87 | `ui/ui-099-toggle-003.mp3` | ui | toggle_003 | 0.13 | Kenney · interface-sounds | — |
| 88 | `ui/ui-024-drop-001.mp3` | ui | drop_001 | 0.16 | Kenney · interface-sounds | — |
| 89 | `ui/ui-037-glass-002.mp3` | ui | glass_002 | 0.16 | Kenney · interface-sounds | — |
| 90 | `ui/ui-038-glass-003.mp3` | ui | glass_003 | 0.16 | Kenney · interface-sounds | — |
| 91 | `ui/ui-066-pluck-002.mp3` | ui | pluck_002 | 0.16 | Kenney · interface-sounds | — |
| 92 | `ui/ui-016-close-001.mp3` | ui | close_001 | 0.18 | Kenney · interface-sounds | — |
| 93 | `ui/ui-061-open-001.mp3` | ui | open_001 | 0.18 | Kenney · interface-sounds | — |
| 94 | `ui/ui-049-maximize-007.mp3` | ui | maximize_007 | 0.21 | Kenney · interface-sounds | — |
| 95 | `ui/ui-058-minimize-007.mp3` | ui | minimize_007 | 0.21 | Kenney · interface-sounds | — |
| 96 | `typing/typing-002-typewriter-soft-click.mp3` | typing | Typewriter soft click | 0.1 | Mixkit | 1125 |
| 97 | `typing/typing-003-hard-typewriter-click.mp3` | typing | Hard typewriter click | 0.16 | Mixkit | 1119 |
| 98 | `typing/typing-018-electronic-typing.mp3` | typing | Electronic typing | 1.52 | Mixkit | 1397 |
| 99 | `typing/typing-012-typing-on-an-electronic-device.mp3` | typing | Typing on an electronic device | 3.5 | Mixkit | 1376 |
| 100 | `typing/typing-014-typing-on-an-electric-typewriter.mp3` | typing | Typing on an electric typewriter | 3.79 | Mixkit | 1377 |
| 101 | `typing/typing-006-smartphone-typing.mp3` | typing | Smartphone typing | 3.92 | Mixkit | 1393 |
| 102 | `typing/typing-005-slow-typing-on-a-keyboard.mp3` | typing | Slow typing on a keyboard | 3.97 | Mixkit | 2532 |
| 103 | `typing/typing-010-fast-keyboard-typing.mp3` | typing | Fast keyboard typing | 3.97 | Mixkit | 1387 |
| 104 | `notify/notify-019-sci-fi-reject-notification.mp3` | notify | Sci-Fi reject notification | 0.86 | Mixkit | 896 |
| 105 | `notify/notify-011-interface-hint-notification.mp3` | notify | Interface hint notification | 1.41 | Mixkit | 911 |
| 106 | `notify/notify-021-guitar-notification-alert.mp3` | notify | Guitar notification alert | 1.41 | Mixkit | 2320 |
| 107 | `notify/notify-008-wrong-answer-fail-notification.mp3` | notify | Wrong answer fail notification | 1.65 | Mixkit | 946 |
| 108 | `notify/notify-003-positive-notification.mp3` | notify | Positive notification | 2.04 | Mixkit | 951 |
| 109 | `notify/notify-017-arabian-mystery-harp-notification.mp3` | notify | Arabian mystery harp notification | 2.43 | Mixkit | 2489 |
| 110 | `notify/notify-025-uplifting-flute-notification.mp3` | notify | Uplifting flute notification | 3.0 | Mixkit | 2317 |
| 111 | `notify/notify-007-melodical-flute-music-notification.mp3` | notify | Melodical flute music notification | 3.03 | Mixkit | 2310 |
| 112 | `notify/notify-001-correct-answer-tone.mp3` | notify | Correct answer tone | 1.62 | Mixkit | 2870 |
| 113 | `notify/notify-005-confirmation-tone.mp3` | notify | Confirmation tone | 1.02 | Mixkit | 2867 |
| 114 | `notify/notify-006-sci-fi-confirmation.mp3` | notify | Sci Fi confirmation | 0.91 | Mixkit | 914 |
| 115 | `notify/notify-009-gaming-lock.mp3` | notify | Gaming lock | 0.29 | Mixkit | 2848 |
| 116 | `riser/riser-022-swell-vinyl-record-scratch.mp3` | riser | Swell vinyl record scratch | 0.5 | Mixkit | 709 |
| 117 | `riser/riser-001-cinematic-trailer-riser.mp3` | riser | Cinematic trailer riser | 1.96 | Mixkit | 790 |
| 118 | `riser/riser-017-short-sci-fi-swell.mp3` | riser | Short sci-fi swell | 2.61 | Mixkit | 2669 |
| 119 | `riser/riser-016-magic-whip-swell.mp3` | riser | Magic whip swell | 2.8 | Mixkit | 1516 |
| 120 | `riser/riser-021-instrument-echo-swell.mp3` | riser | Instrument echo swell | 5.77 | Mixkit | 2673 |
| 121 | `riser/riser-018-cinematic-swell-stark-transition.mp3` | riser | Cinematic swell stark transition | 6.01 | Mixkit | 2675 |
| 122 | `riser/riser-002-short-space-stutter-intro-riser.mp3` | riser | Short space stutter intro riser | 6.03 | Mixkit | 1144 |
| 123 | `riser/riser-004-cinematic-drama-riser.mp3` | riser | Cinematic drama riser | 6.03 | Mixkit | 632 |
| 124 | `riser/riser-005-cinematic-synth-riser.mp3` | riser | Cinematic synth riser | 6.03 | Mixkit | 645 |
| 125 | `riser/riser-007-cinematic-mysterious-riser-brass.mp3` | riser | Cinematic mysterious riser brass | 6.03 | Mixkit | 2283 |
| 126 | `riser/riser-009-heavenly-swell.mp3` | riser | Heavenly swell | 6.03 | Mixkit | 2674 |
| 127 | `riser/riser-010-trailer-cinematic-suspense-swell.mp3` | riser | Trailer cinematic suspense swell | 6.03 | Mixkit | 678 |
| 128 | `impact/impact-059-impactgeneric-light-001.mp3` | impact | impactGeneric_light_001 | 0.16 | Kenney · impact-sounds | — |
| 129 | `impact/impact-080-impactmetal-heavy-002.mp3` | impact | impactMetal_heavy_002 | 0.16 | Kenney · impact-sounds | — |
| 130 | `impact/impact-090-impactmetal-medium-002.mp3` | impact | impactMetal_medium_002 | 0.16 | Kenney · impact-sounds | — |
| 131 | `impact/impact-092-impactmetal-medium-004.mp3` | impact | impactMetal_medium_004 | 0.16 | Kenney · impact-sounds | — |
| 132 | `impact/impact-133-impactsoft-medium-000.mp3` | impact | impactSoft_medium_000 | 0.16 | Kenney · impact-sounds | — |
| 133 | `impact/impact-148-impactwood-light-000.mp3` | impact | impactWood_light_000 | 0.16 | Kenney · impact-sounds | — |
| 134 | `impact/impact-058-impactgeneric-light-000.mp3` | impact | impactGeneric_light_000 | 0.18 | Kenney · impact-sounds | — |
| 135 | `impact/impact-060-impactgeneric-light-002.mp3` | impact | impactGeneric_light_002 | 0.18 | Kenney · impact-sounds | — |
| 136 | `impact/impact-061-impactgeneric-light-003.mp3` | impact | impactGeneric_light_003 | 0.18 | Kenney · impact-sounds | — |
| 137 | `impact/impact-062-impactgeneric-light-004.mp3` | impact | impactGeneric_light_004 | 0.18 | Kenney · impact-sounds | — |
| 138 | `impact/impact-082-impactmetal-heavy-004.mp3` | impact | impactMetal_heavy_004 | 0.18 | Kenney · impact-sounds | — |
| 139 | `impact/impact-089-impactmetal-medium-001.mp3` | impact | impactMetal_medium_001 | 0.18 | Kenney · impact-sounds | — |
| 140 | `impact/impact-135-impactsoft-medium-002.mp3` | impact | impactSoft_medium_002 | 0.18 | Kenney · impact-sounds | — |
| 141 | `impact/impact-136-impactsoft-medium-003.mp3` | impact | impactSoft_medium_003 | 0.18 | Kenney · impact-sounds | — |
| 142 | `impact/impact-137-impactsoft-medium-004.mp3` | impact | impactSoft_medium_004 | 0.18 | Kenney · impact-sounds | — |
| 143 | `sparkle/sparkle-001-fairy-magic-sparkle.mp3` | sparkle | Fairy magic sparkle | 0.89 | Mixkit | 871 |
| 144 | `sparkle/sparkle-008-magic-wand-sparkle.mp3` | sparkle | Magic wand sparkle | 1.2 | Mixkit | 3062 |
| 145 | `sparkle/sparkle-010-magic-sparkle-touch.mp3` | sparkle | Magic sparkle touch | 1.49 | Mixkit | 3083 |
| 146 | `sparkle/sparkle-022-fantasy-game-sweep-notification.mp3` | sparkle | Fantasy game sweep notification | 1.7 | Mixkit | 255 |
| 147 | `sparkle/sparkle-015-magic-sparkle-poof-hit.mp3` | sparkle | Magic sparkle poof hit | 1.72 | Mixkit | 3082 |
| 148 | `sparkle/sparkle-004-fairy-glitter.mp3` | sparkle | Fairy glitter | 1.83 | Mixkit | 867 |
| 149 | `sparkle/sparkle-006-sweeping-sparkle-presentation-intro.mp3` | sparkle | Sweeping sparkle presentation intro | 2.66 | Mixkit | 2633 |
| 150 | `sparkle/sparkle-013-magic-astral-sweep-effect.mp3` | sparkle | Magic astral sweep effect | 3.16 | Mixkit | 2629 |
| 151 | `glitch/glitch-005-electric-buzz-glitch.mp3` | glitch | Electric buzz glitch | 0.29 | Mixkit | 2594 |
| 152 | `glitch/glitch-014-cinematic-glitch-trailer.mp3` | glitch | Cinematic glitch trailer | 0.44 | Mixkit | 1021 |
| 153 | `glitch/glitch-001-small-electric-glitch.mp3` | glitch | Small electric glitch | 0.52 | Mixkit | 2595 |
| 154 | `glitch/glitch-002-glitch-static.mp3` | glitch | Glitch static | 0.6 | Mixkit | 1457 |
| 155 | `glitch/glitch-009-digital-glitch-break.mp3` | glitch | Digital glitch break | 0.6 | Mixkit | 2951 |
| 156 | `glitch/glitch-008-cinematic-sci-fi-glitch.mp3` | glitch | Cinematic sci fi glitch | 0.71 | Mixkit | 1022 |
| 157 | `glitch/glitch-027-glitch-short.mp3` | glitch | Glitch short | 0.71 | Mixkit | 1031 |
| 158 | `glitch/glitch-017-robotic-glitch.mp3` | glitch | Robotic glitch | 0.78 | Mixkit | 1035 |
| 159 | `shutter/shutter-001-camera-shutter-click.mp3` | shutter | Camera shutter click | 0.16 | Mixkit | 1133 |
| 160 | `shutter/shutter-003-old-camera-shutter-click.mp3` | shutter | Old camera shutter click | 0.16 | Mixkit | 1137 |
| 161 | `shutter/shutter-008-nikon-camera-shutter.mp3` | shutter | Nikon camera shutter | 0.29 | Mixkit | 1434 |
| 162 | `shutter/shutter-007-camera-lens-shutter.mp3` | shutter | Camera lens shutter | 0.31 | Mixkit | 1433 |
| 163 | `slide/slide-001-paper-slide.mp3` | slide | Paper slide | 0.47 | Mixkit | 1530 |
| 164 | `slide/slide-004-quick-saber-cut.mp3` | slide | Quick saber cut | 0.6 | Mixkit | 2158 |
| 165 | `slide/slide-021-futuristic-slide.mp3` | slide | Futuristic slide | 0.63 | Mixkit | 1533 |
| 166 | `slide/slide-020-glass-plate-slide.mp3` | slide | Glass plate slide | 0.84 | Mixkit | 1527 |
| 167 | `slide/slide-010-creaky-wooden-scrap.mp3` | slide | Creaky wooden scrap | 1.44 | Mixkit | 3157 |
| 168 | `coin/coin-006-chips-collide-3.mp3` | coin | chips-collide-3 | 0.16 | Kenney · casino-audio | — |
| 169 | `coin/coin-014-chips-stack-1.mp3` | coin | chips-stack-1 | 0.16 | Kenney · casino-audio | — |
| 170 | `coin/coin-015-chips-stack-2.mp3` | coin | chips-stack-2 | 0.16 | Kenney · casino-audio | — |
| 171 | `coin/coin-019-chips-stack-6.mp3` | coin | chips-stack-6 | 0.16 | Kenney · casino-audio | — |
| 172 | `coin/coin-001-chip-lay-1.mp3` | coin | chip-lay-1 | 0.18 | Kenney · casino-audio | — |
| 173 | `card/card-004-card-place-2.mp3` | card | card-place-2 | 0.42 | Kenney · casino-audio | — |
| 174 | `card/card-015-card-slide-4.mp3` | card | card-slide-4 | 0.5 | Kenney · casino-audio | — |
| 175 | `card/card-012-card-slide-1.mp3` | card | card-slide-1 | 0.55 | Kenney · casino-audio | — |
| 176 | `card/card-006-card-place-4.mp3` | card | card-place-4 | 0.63 | Kenney · casino-audio | — |
| 177 | `card/card-013-card-slide-2.mp3` | card | card-slide-2 | 0.63 | Kenney · casino-audio | — |

## 17.3 Catálogo completo (666 sons)

| # | Arquivo | Categoria | Título | Duração (s) | Fonte | ID/pacote |
|---|---|---|---|---|---|---|
| 1 | `pop/pop-001-soap-bubble-sound.mp3` | pop | Soap bubble sound | 0.26 | Mixkit | 2925 |
| 2 | `pop/pop-006-retro-video-game-bubble-laser.mp3` | pop | Retro video game bubble laser | 1.65 | Mixkit | 277 |
| 3 | `pop/pop-007-magic-bubbles-spell.mp3` | pop | Magic bubbles spell | 1.28 | Mixkit | 2999 |
| 4 | `pop/pop-008-cartoon-bubbles-pop.mp3` | pop | Cartoon bubbles pop | 1.62 | Mixkit | 729 |
| 5 | `pop/pop-009-egg-bubble-pop.mp3` | pop | Egg bubble pop | 0.24 | Mixkit | 3192 |
| 6 | `pop/pop-011-cartoon-bubbles-popping.mp3` | pop | Cartoon bubbles popping | 0.57 | Mixkit | 732 |
| 7 | `pop/pop-012-bubbly-achievement-tone.mp3` | pop | Bubbly achievement tone | 1.23 | Mixkit | 3193 |
| 8 | `pop/pop-013-toy-whistler-bird-sound.mp3` | pop | Toy whistler bird sound | 0.71 | Mixkit | 18 |
| 9 | `pop/pop-014-magic-potion-music-and-fx.mp3` | pop | Magic potion music and fx | 1.65 | Mixkit | 2831 |
| 10 | `pop/pop-015-video-game-magic-potion.mp3` | pop | Video game magic potion | 1.62 | Mixkit | 2830 |
| 11 | `pop/pop-016-volcano-lava-bubble.mp3` | pop | Volcano lava bubble | 1.59 | Mixkit | 2445 |
| 12 | `pop/pop-017-bubble-pop-up-alert-notification.mp3` | pop | Bubble pop up alert notification | 0.39 | Mixkit | 2357 |
| 13 | `pop/pop-018-plastic-bubble-click.mp3` | pop | Plastic bubble click | 0.08 | Mixkit | 1124 |
| 14 | `pop/pop-019-game-balloon-or-bubble-pop.mp3` | pop | Game balloon or bubble pop | 0.1 | Mixkit | 3069 |
| 15 | `pop/pop-020-cartoon-bubble-pop.mp3` | pop | Cartoon bubble pop | 0.42 | Mixkit | 731 |
| 16 | `pop/pop-022-big-volcano-lava-bubble-burst.mp3` | pop | Big volcano lava bubble burst | 1.62 | Mixkit | 2448 |
| 17 | `shutter/shutter-001-camera-shutter-click.mp3` | shutter | Camera shutter click | 0.16 | Mixkit | 1133 |
| 18 | `shutter/shutter-002-camera-shutter-hard-click.mp3` | shutter | Camera shutter hard click | 0.47 | Mixkit | 1430 |
| 19 | `shutter/shutter-003-old-camera-shutter-click.mp3` | shutter | Old camera shutter click | 0.16 | Mixkit | 1137 |
| 20 | `shutter/shutter-004-vintage-camera-shutter.mp3` | shutter | Vintage camera shutter | 0.68 | Mixkit | 1438 |
| 21 | `shutter/shutter-005-camera-digital-shutter.mp3` | shutter | Camera digital shutter | 0.37 | Mixkit | 1432 |
| 22 | `shutter/shutter-006-camera-long-shutter.mp3` | shutter | Camera long shutter | 0.52 | Mixkit | 1431 |
| 23 | `shutter/shutter-007-camera-lens-shutter.mp3` | shutter | Camera lens shutter | 0.31 | Mixkit | 1433 |
| 24 | `shutter/shutter-008-nikon-camera-shutter.mp3` | shutter | Nikon camera shutter | 0.29 | Mixkit | 1434 |
| 25 | `cartoon/cartoon-001-cartoon-toy-whistle.mp3` | cartoon | Cartoon toy whistle | 1.07 | Mixkit | 616 |
| 26 | `pop/pop-023-hard-pop-click.mp3` | pop | Hard pop click | 0.34 | Mixkit | 2364 |
| 27 | `cartoon/cartoon-004-cartoon-failure-piano.mp3` | cartoon | Cartoon failure piano | 1.96 | Mixkit | 473 |
| 28 | `cartoon/cartoon-005-boing-hit-sound.mp3` | cartoon | Boing hit sound | 0.52 | Mixkit | 2894 |
| 29 | `cartoon/cartoon-007-cartoon-kitty-begging-meow.mp3` | cartoon | Cartoon kitty begging meow | 2.17 | Mixkit | 92 |
| 30 | `cartoon/cartoon-009-funny-cartoon-fast-splat.mp3` | cartoon | Funny cartoon fast splat | 0.6 | Mixkit | 2889 |
| 31 | `cartoon/cartoon-011-cartoon-dazzle-hit-and-birds.mp3` | cartoon | Cartoon dazzle hit and birds | 1.75 | Mixkit | 746 |
| 32 | `cartoon/cartoon-013-cartoon-falling-whistle.mp3` | cartoon | Cartoon falling whistle | 2.46 | Mixkit | 395 |
| 33 | `cartoon/cartoon-014-cartoon-character-sneeze.mp3` | cartoon | Cartoon character sneeze | 0.37 | Mixkit | 2209 |
| 34 | `cartoon/cartoon-016-funny-clown-horn-sounds.mp3` | cartoon | Funny clown horn sounds | 0.89 | Mixkit | 2886 |
| 35 | `cartoon/cartoon-018-funny-giggling.mp3` | cartoon | Funny Giggling | 0.89 | Mixkit | 2885 |
| 36 | `cartoon/cartoon-019-funny-fail-low-tone.mp3` | cartoon | Funny fail low tone | 1.36 | Mixkit | 2876 |
| 37 | `cartoon/cartoon-020-funny-video-game-slide.mp3` | cartoon | Funny video game slide | 0.34 | Mixkit | 2888 |
| 38 | `cartoon/cartoon-023-happy-puppy-barks.mp3` | cartoon | Happy puppy barks | 2.48 | Mixkit | 741 |
| 39 | `cartoon/cartoon-024-cartoon-girl-saying-no-no-no.mp3` | cartoon | Cartoon girl saying no no no | 1.52 | Mixkit | 2257 |
| 40 | `cartoon/cartoon-028-cartoon-sad-party-horn.mp3` | cartoon | Cartoon sad party horn | 1.31 | Mixkit | 527 |
| 41 | `pop/pop-025-silly-pop-cluster.mp3` | pop | Silly pop cluster | 1.49 | Mixkit | 2359 |
| 42 | `cartoon/cartoon-029-clown-funny-sound.mp3` | cartoon | Clown funny sound | 1.62 | Mixkit | 2880 |
| 43 | `cartoon/cartoon-031-cartoon-whistling.mp3` | cartoon | Cartoon whistling | 0.71 | Mixkit | 738 |
| 44 | `cartoon/cartoon-032-metallic-boing-hit.mp3` | cartoon | Metallic boing hit | 0.52 | Mixkit | 2895 |
| 45 | `cartoon/cartoon-033-cartoon-monkey-mocking-and-giggling.mp3` | cartoon | Cartoon monkey mocking and giggling | 1.85 | Mixkit | 108 |
| 46 | `click/click-001-fast-double-click-on-mouse.mp3` | click | Fast double click on mouse | 0.18 | Mixkit | 275 |
| 47 | `click/click-002-select-click.mp3` | click | Select click | 0.31 | Mixkit | 1109 |
| 48 | `click/click-003-sci-fi-click.mp3` | click | Sci fi click | 0.5 | Mixkit | 900 |
| 49 | `typing/typing-001-typing-on-a-laptop-keyboard.mp3` | typing | Typing on a laptop keyboard | 4.02 | Mixkit | 2531 |
| 50 | `click/click-004-modern-technology-select.mp3` | click | Modern technology select | 0.08 | Mixkit | 3124 |
| 51 | `click/click-005-cool-interface-click-tone.mp3` | click | Cool interface click tone | 0.08 | Mixkit | 2568 |
| 52 | `click/click-006-mouse-click-close.mp3` | click | Mouse click close | 0.21 | Mixkit | 1113 |
| 53 | `click/click-008-classic-click.mp3` | click | Classic click | 0.16 | Mixkit | 1117 |
| 54 | `typing/typing-002-typewriter-soft-click.mp3` | typing | Typewriter soft click | 0.1 | Mixkit | 1125 |
| 55 | `click/click-010-interface-device-click.mp3` | click | Interface device click | 0.16 | Mixkit | 2577 |
| 56 | `click/click-011-quick-win-video-game-notification.mp3` | click | Quick win video game notification | 0.86 | Mixkit | 269 |
| 57 | `click/click-012-retro-arcade-casino-notification.mp3` | click | Retro arcade casino notification | 0.52 | Mixkit | 211 |
| 58 | `click/click-013-clear-mouse-clicks.mp3` | click | Clear mouse clicks | 0.26 | Mixkit | 2997 |
| 59 | `click/click-014-negative-tone-interface-tap.mp3` | click | Negative tone interface tap | 0.31 | Mixkit | 2569 |
| 60 | `click/click-015-modern-click-box-check.mp3` | click | Modern click box check | 0.13 | Mixkit | 1120 |
| 61 | `click/click-016-click-error.mp3` | click | Click error | 0.39 | Mixkit | 1110 |
| 62 | `click/click-017-gear-metallic-lock-sound.mp3` | click | Gear metallic lock sound | 0.39 | Mixkit | 2858 |
| 63 | `typing/typing-003-hard-typewriter-click.mp3` | typing | Hard typewriter click | 0.16 | Mixkit | 1119 |
| 64 | `click/click-018-arcade-game-jump-coin.mp3` | click | Arcade game jump coin | 0.13 | Mixkit | 216 |
| 65 | `click/click-019-gear-fast-lock-tap.mp3` | click | Gear fast lock tap | 0.24 | Mixkit | 2857 |
| 66 | `click/click-021-sci-fi-interface-robot-click.mp3` | click | Sci fi interface robot click | 0.63 | Mixkit | 901 |
| 67 | `click/click-022-stapling-paper.mp3` | click | Stapling paper | 0.18 | Mixkit | 2995 |
| 68 | `click/click-023-quick-positive-video-game-notification-i.mp3` | click | Quick positive video game notification interface | 0.68 | Mixkit | 265 |
| 69 | `click/click-024-positive-interface-beep.mp3` | click | Positive interface beep | 0.44 | Mixkit | 221 |
| 70 | `click/click-025-mouse-hard-clicking.mp3` | click | Mouse hard clicking | 0.42 | Mixkit | 1111 |
| 71 | `click/click-026-mechanical-tool-click.mp3` | click | Mechanical tool click | 0.99 | Mixkit | 1131 |
| 72 | `click/click-029-video-game-retro-click.mp3` | click | Video game retro click | 0.18 | Mixkit | 237 |
| 73 | `click/click-030-video-game-mystery-alert.mp3` | click | Video game mystery alert | 0.42 | Mixkit | 234 |
| 74 | `glitch/glitch-001-small-electric-glitch.mp3` | glitch | Small electric glitch | 0.52 | Mixkit | 2595 |
| 75 | `glitch/glitch-002-glitch-static.mp3` | glitch | Glitch static | 0.6 | Mixkit | 1457 |
| 76 | `glitch/glitch-003-broken-radio-frequency-signal.mp3` | glitch | Broken radio frequency signal | 2.53 | Mixkit | 2563 |
| 77 | `glitch/glitch-005-electric-buzz-glitch.mp3` | glitch | Electric buzz glitch | 0.29 | Mixkit | 2594 |
| 78 | `whoosh/whoosh-001-electric-whoosh.mp3` | whoosh | Electric whoosh | 1.67 | Mixkit | 2596 |
| 79 | `whoosh/whoosh-002-glitch-sci-fi-rewind-transition.mp3` | whoosh | Glitch sci fi rewind transition | 3.03 | Mixkit | 1093 |
| 80 | `glitch/glitch-006-intro-text-glitch.mp3` | glitch | Intro text glitch | 2.53 | Mixkit | 2950 |
| 81 | `glitch/glitch-007-futuristic-glitch-robot.mp3` | glitch | Futuristic glitch robot | 1.57 | Mixkit | 1039 |
| 82 | `glitch/glitch-008-cinematic-sci-fi-glitch.mp3` | glitch | Cinematic sci fi glitch | 0.71 | Mixkit | 1022 |
| 83 | `glitch/glitch-009-digital-glitch-break.mp3` | glitch | Digital glitch break | 0.6 | Mixkit | 2951 |
| 84 | `glitch/glitch-011-glitch-crackles.mp3` | glitch | Glitch crackles | 1.88 | Mixkit | 1044 |
| 85 | `glitch/glitch-012-virtual-quick-glitch.mp3` | glitch | Virtual quick glitch | 1.33 | Mixkit | 2946 |
| 86 | `glitch/glitch-013-small-sci-fi-glitch.mp3` | glitch | Small sci fi glitch | 1.44 | Mixkit | 1030 |
| 87 | `glitch/glitch-014-cinematic-glitch-trailer.mp3` | glitch | Cinematic glitch trailer | 0.44 | Mixkit | 1021 |
| 88 | `glitch/glitch-015-tech-weird-glitch.mp3` | glitch | Tech weird glitch | 2.53 | Mixkit | 2685 |
| 89 | `glitch/glitch-016-digital-signal-interference.mp3` | glitch | Digital signal interference | 2.53 | Mixkit | 2548 |
| 90 | `glitch/glitch-017-robotic-glitch.mp3` | glitch | Robotic glitch | 0.78 | Mixkit | 1035 |
| 91 | `glitch/glitch-018-electronic-glitch-sound.mp3` | glitch | Electronic glitch sound | 2.53 | Mixkit | 2940 |
| 92 | `glitch/glitch-019-futuristic-device-fail.mp3` | glitch | Futuristic device fail | 2.53 | Mixkit | 2939 |
| 93 | `glitch/glitch-020-break-tech-impact.mp3` | glitch | Break tech impact | 1.25 | Mixkit | 2952 |
| 94 | `glitch/glitch-021-robotic-insect-buzz.mp3` | glitch | Robotic insect buzz | 2.53 | Mixkit | 332 |
| 95 | `glitch/glitch-022-sci-fi-glitch-confirmation.mp3` | glitch | Sci fi glitch confirmation | 2.25 | Mixkit | 1032 |
| 96 | `glitch/glitch-023-glitch-communication-sound.mp3` | glitch | Glitch communication sound | 1.49 | Mixkit | 1034 |
| 97 | `glitch/glitch-025-console-glitch.mp3` | glitch | Console glitch | 2.53 | Mixkit | 2688 |
| 98 | `glitch/glitch-026-arcade-glitch-touch.mp3` | glitch | Arcade glitch touch | 0.99 | Mixkit | 3066 |
| 99 | `glitch/glitch-027-glitch-short.mp3` | glitch | Glitch short | 0.71 | Mixkit | 1031 |
| 100 | `whoosh/whoosh-003-cinematic-whoosh-deep-impact.mp3` | whoosh | Cinematic whoosh deep impact | 2.06 | Mixkit | 1143 |
| 101 | `impact/impact-001-big-cinematic-impact.mp3` | impact | Big cinematic impact | 3.03 | Mixkit | 788 |
| 102 | `impact/impact-002-movie-trailer-epic-impact.mp3` | impact | Movie trailer epic impact | 3.0 | Mixkit | 2908 |
| 103 | `impact/impact-004-epic-impact-afar-explosion.mp3` | impact | Epic impact afar explosion | 3.03 | Mixkit | 2782 |
| 104 | `impact/impact-006-wood-hard-hit.mp3` | impact | Wood hard hit | 0.34 | Mixkit | 2182 |
| 105 | `impact/impact-008-dramatic-metal-explosion-impact.mp3` | impact | Dramatic metal explosion impact | 3.03 | Mixkit | 1687 |
| 106 | `impact/impact-009-movie-impact-intro-presentation.mp3` | impact | Movie impact intro presentation | 3.03 | Mixkit | 2902 |
| 107 | `impact/impact-010-impact-of-a-blow.mp3` | impact | Impact of a blow | 0.44 | Mixkit | 2150 |
| 108 | `impact/impact-012-metal-hammer-hit.mp3` | impact | Metal hammer hit | 0.44 | Mixkit | 833 |
| 109 | `impact/impact-014-quick-zoom-impact.mp3` | impact | Quick zoom impact | 0.65 | Mixkit | 772 |
| 110 | `impact/impact-016-exciting-fast-hit.mp3` | impact | Exciting fast hit | 0.57 | Mixkit | 2180 |
| 111 | `impact/impact-020-epic-movie-impact.mp3` | impact | Epic movie impact | 3.03 | Mixkit | 2901 |
| 112 | `impact/impact-022-electricity-static-power-up.mp3` | impact | Electricity static power up | 2.3 | Mixkit | 2600 |
| 113 | `impact/impact-023-heavy-electric-shockwave-impact.mp3` | impact | Heavy electric shockwave impact | 3.03 | Mixkit | 2599 |
| 114 | `impact/impact-024-fast-impact-blow.mp3` | impact | Fast impact blow | 1.38 | Mixkit | 2655 |
| 115 | `impact/impact-025-underground-explosion-impact-echo.mp3` | impact | Underground explosion impact echo | 3.03 | Mixkit | 1686 |
| 116 | `impact/impact-026-glass-hitting-a-metal.mp3` | impact | Glass hitting a metal | 0.34 | Mixkit | 2183 |
| 117 | `impact/impact-027-space-impact.mp3` | impact | Space impact | 3.0 | Mixkit | 774 |
| 118 | `impact/impact-029-cinematic-impact-waves.mp3` | impact | Cinematic impact waves | 3.03 | Mixkit | 781 |
| 119 | `ui/ui-003-interface-option-select.mp3` | ui | Interface option select | 0.68 | Mixkit | 2573 |
| 120 | `ui/ui-006-page-back-chime.mp3` | ui | Page back chime | 0.76 | Mixkit | 1108 |
| 121 | `ui/ui-007-game-user-interface-tone.mp3` | ui | Game user interface tone | 0.55 | Mixkit | 2570 |
| 122 | `ui/ui-008-page-turn-chime.mp3` | ui | Page turn chime | 1.28 | Mixkit | 1106 |
| 123 | `ui/ui-009-game-interface-sound.mp3` | ui | Game interface sound | 0.47 | Mixkit | 2567 |
| 124 | `whoosh/whoosh-004-magic-sparkle-whoosh.mp3` | whoosh | Magic sparkle whoosh | 2.09 | Mixkit | 2350 |
| 125 | `sparkle/sparkle-001-fairy-magic-sparkle.mp3` | sparkle | Fairy magic sparkle | 0.89 | Mixkit | 871 |
| 126 | `sparkle/sparkle-002-magic-notification-ring.mp3` | sparkle | Magic notification ring | 2.35 | Mixkit | 2344 |
| 127 | `whoosh/whoosh-005-magic-transition-sweep-presentation.mp3` | whoosh | Magic transition sweep presentation | 2.82 | Mixkit | 2638 |
| 128 | `whoosh/whoosh-006-fairy-sparkle-whoosh.mp3` | whoosh | Fairy sparkle whoosh | 3.0 | Mixkit | 869 |
| 129 | `sparkle/sparkle-004-fairy-glitter.mp3` | sparkle | Fairy glitter | 1.83 | Mixkit | 867 |
| 130 | `sparkle/sparkle-005-fantasy-game-success-notification.mp3` | sparkle | Fantasy game success notification | 2.38 | Mixkit | 270 |
| 131 | `sparkle/sparkle-006-sweeping-sparkle-presentation-intro.mp3` | sparkle | Sweeping sparkle presentation intro | 2.66 | Mixkit | 2633 |
| 132 | `sparkle/sparkle-007-relaxing-harp-sweep.mp3` | sparkle | Relaxing harp sweep | 3.53 | Mixkit | 2628 |
| 133 | `sparkle/sparkle-008-magic-wand-sparkle.mp3` | sparkle | Magic wand sparkle | 1.2 | Mixkit | 3062 |
| 134 | `sparkle/sparkle-009-magic-glitter-or-particles.mp3` | sparkle | Magic glitter or particles | 3.29 | Mixkit | 2352 |
| 135 | `whoosh/whoosh-007-magical-light-transition.mp3` | whoosh | Magical light transition | 3.03 | Mixkit | 2583 |
| 136 | `sparkle/sparkle-010-magic-sparkle-touch.mp3` | sparkle | Magic sparkle touch | 1.49 | Mixkit | 3083 |
| 137 | `sparkle/sparkle-011-magical-light-sweep.mp3` | sparkle | Magical light sweep | 3.47 | Mixkit | 2586 |
| 138 | `sparkle/sparkle-012-arcade-magic-notification.mp3` | sparkle | Arcade magic notification | 2.27 | Mixkit | 2342 |
| 139 | `sparkle/sparkle-013-magic-astral-sweep-effect.mp3` | sparkle | Magic astral sweep effect | 3.16 | Mixkit | 2629 |
| 140 | `sparkle/sparkle-014-sparkling-fairy-glow.mp3` | sparkle | Sparkling fairy glow | 3.42 | Mixkit | 870 |
| 141 | `sparkle/sparkle-015-magic-sparkle-poof-hit.mp3` | sparkle | Magic sparkle poof hit | 1.72 | Mixkit | 3082 |
| 142 | `sparkle/sparkle-016-light-spell.mp3` | sparkle | Light spell | 1.7 | Mixkit | 873 |
| 143 | `sparkle/sparkle-017-magical-stone-slide.mp3` | sparkle | Magical stone slide | 2.4 | Mixkit | 1528 |
| 144 | `whoosh/whoosh-009-spellcaster-fairy-swoosh.mp3` | whoosh | Spellcaster fairy swoosh | 1.96 | Mixkit | 1463 |
| 145 | `whoosh/whoosh-010-magic-spell-mystery-whoosh.mp3` | whoosh | Magic spell mystery whoosh | 3.03 | Mixkit | 2345 |
| 146 | `sparkle/sparkle-019-magical-light-moving.mp3` | sparkle | Magical light moving | 3.53 | Mixkit | 2584 |
| 147 | `sparkle/sparkle-020-fairy-teleport.mp3` | sparkle | Fairy teleport | 1.93 | Mixkit | 868 |
| 148 | `whoosh/whoosh-011-cinematic-whoosh-magic-gust.mp3` | whoosh | Cinematic whoosh magic gust | 3.03 | Mixkit | 2343 |
| 149 | `sparkle/sparkle-022-fantasy-game-sweep-notification.mp3` | sparkle | Fantasy game sweep notification | 1.7 | Mixkit | 255 |
| 150 | `sparkle/sparkle-023-magic-whistle.mp3` | sparkle | Magic whistle | 3.5 | Mixkit | 2587 |
| 151 | `notify/notify-001-correct-answer-tone.mp3` | notify | Correct answer tone | 1.62 | Mixkit | 2870 |
| 152 | `pop/pop-026-long-pop.mp3` | pop | Long pop | 0.5 | Mixkit | 2358 |
| 153 | `pop/pop-027-message-pop-alert.mp3` | pop | Message pop alert | 0.08 | Mixkit | 2354 |
| 154 | `notify/notify-003-positive-notification.mp3` | notify | Positive notification | 2.04 | Mixkit | 951 |
| 155 | `notify/notify-005-confirmation-tone.mp3` | notify | Confirmation tone | 1.02 | Mixkit | 2867 |
| 156 | `pop/pop-028-dry-pop-up-notification-alert.mp3` | pop | Dry pop up notification alert | 0.31 | Mixkit | 2356 |
| 157 | `notify/notify-006-sci-fi-confirmation.mp3` | notify | Sci Fi confirmation | 0.91 | Mixkit | 914 |
| 158 | `notify/notify-007-melodical-flute-music-notification.mp3` | notify | Melodical flute music notification | 3.03 | Mixkit | 2310 |
| 159 | `notify/notify-008-wrong-answer-fail-notification.mp3` | notify | Wrong answer fail notification | 1.65 | Mixkit | 946 |
| 160 | `notify/notify-009-gaming-lock.mp3` | notify | Gaming lock | 0.29 | Mixkit | 2848 |
| 161 | `notify/notify-010-clear-announce-tones.mp3` | notify | Clear announce tones | 3.0 | Mixkit | 2861 |
| 162 | `notify/notify-011-interface-hint-notification.mp3` | notify | Interface hint notification | 1.41 | Mixkit | 911 |
| 163 | `notify/notify-014-elevator-tone.mp3` | notify | Elevator tone | 1.07 | Mixkit | 2863 |
| 164 | `notify/notify-015-light-button.mp3` | notify | Light button | 0.37 | Mixkit | 2580 |
| 165 | `notify/notify-017-arabian-mystery-harp-notification.mp3` | notify | Arabian mystery harp notification | 2.43 | Mixkit | 2489 |
| 166 | `notify/notify-018-digital-quick-tone.mp3` | notify | Digital quick tone | 1.02 | Mixkit | 2866 |
| 167 | `notify/notify-019-sci-fi-reject-notification.mp3` | notify | Sci-Fi reject notification | 0.86 | Mixkit | 896 |
| 168 | `notify/notify-020-magic-marimba.mp3` | notify | Magic marimba | 2.95 | Mixkit | 2820 |
| 169 | `notify/notify-021-guitar-notification-alert.mp3` | notify | Guitar notification alert | 1.41 | Mixkit | 2320 |
| 170 | `notify/notify-022-atm-cash-machine-key-press.mp3` | notify | Atm cash machine key press | 0.24 | Mixkit | 2841 |
| 171 | `notify/notify-023-tile-game-reveal.mp3` | notify | Tile game reveal | 1.8 | Mixkit | 960 |
| 172 | `notify/notify-025-uplifting-flute-notification.mp3` | notify | Uplifting flute notification | 3.0 | Mixkit | 2317 |
| 173 | `whoosh/whoosh-012-explainer-video-pops-whoosh-light-pop.mp3` | whoosh | Explainer video pops whoosh light pop | 0.21 | Mixkit | 3005 |
| 174 | `pop/pop-029-electric-pop.mp3` | pop | Electric pop | 0.26 | Mixkit | 2365 |
| 175 | `riser/riser-001-cinematic-trailer-riser.mp3` | riser | Cinematic trailer riser | 1.96 | Mixkit | 790 |
| 176 | `riser/riser-002-short-space-stutter-intro-riser.mp3` | riser | Short space stutter intro riser | 6.03 | Mixkit | 1144 |
| 177 | `riser/riser-004-cinematic-drama-riser.mp3` | riser | Cinematic drama riser | 6.03 | Mixkit | 632 |
| 178 | `riser/riser-005-cinematic-synth-riser.mp3` | riser | Cinematic synth riser | 6.03 | Mixkit | 645 |
| 179 | `riser/riser-007-cinematic-mysterious-riser-brass.mp3` | riser | Cinematic mysterious riser brass | 6.03 | Mixkit | 2283 |
| 180 | `whoosh/whoosh-013-fast-swipe-zoom.mp3` | whoosh | Fast swipe zoom | 0.65 | Mixkit | 2627 |
| 181 | `whoosh/whoosh-014-dj-record-swipe.mp3` | whoosh | DJ record swipe | 0.26 | Mixkit | 708 |
| 182 | `whoosh/whoosh-015-vinyl-record-swipe.mp3` | whoosh | Vinyl record swipe | 0.21 | Mixkit | 707 |
| 183 | `whoosh/whoosh-016-fast-small-sweep-transition.mp3` | whoosh | Fast small sweep transition | 0.68 | Mixkit | 166 |
| 184 | `whoosh/whoosh-017-cinematic-tunnel-reverb-woosh.mp3` | whoosh | Cinematic tunnel reverb woosh | 3.03 | Mixkit | 1486 |
| 185 | `whoosh/whoosh-018-transition-windy-swoosh.mp3` | whoosh | Transition windy swoosh | 2.72 | Mixkit | 1474 |
| 186 | `whoosh/whoosh-019-vacuum-swoosh-transition.mp3` | whoosh | Vacuum swoosh transition | 2.09 | Mixkit | 1465 |
| 187 | `whoosh/whoosh-020-cinematic-wind-swoosh.mp3` | whoosh | Cinematic wind swoosh | 0.99 | Mixkit | 1471 |
| 188 | `whoosh/whoosh-021-short-wind-swoosh.mp3` | whoosh | Short wind swoosh | 0.39 | Mixkit | 1461 |
| 189 | `whoosh/whoosh-022-fast-transitions-swoosh.mp3` | whoosh | Fast transitions swoosh | 0.29 | Mixkit | 3115 |
| 190 | `whoosh/whoosh-023-dagger-woosh.mp3` | whoosh | Dagger woosh | 0.29 | Mixkit | 1487 |
| 191 | `whoosh/whoosh-024-flying-fast-swoosh.mp3` | whoosh | Flying fast swoosh | 0.97 | Mixkit | 1469 |
| 192 | `whoosh/whoosh-025-short-fire-whoosh.mp3` | whoosh | Short fire whoosh | 1.7 | Mixkit | 1345 |
| 193 | `whoosh/whoosh-026-ending-wind-swoosh.mp3` | whoosh | Ending wind swoosh | 2.19 | Mixkit | 1482 |
| 194 | `whoosh/whoosh-028-fire-swoosh-burning.mp3` | whoosh | Fire swoosh burning | 2.43 | Mixkit | 1328 |
| 195 | `whoosh/whoosh-029-cinematic-laser-swoosh.mp3` | whoosh | Cinematic laser swoosh | 0.86 | Mixkit | 1467 |
| 196 | `whoosh/whoosh-030-fast-sweep-transition.mp3` | whoosh | Fast sweep transition | 0.65 | Mixkit | 174 |
| 197 | `whoosh/whoosh-031-fast-air-sweep-transition.mp3` | whoosh | Fast air sweep transition | 0.76 | Mixkit | 168 |
| 198 | `whoosh/whoosh-032-speeding-swoosh.mp3` | whoosh | Speeding swoosh | 2.4 | Mixkit | 1484 |
| 199 | `whoosh/whoosh-033-karate-hit-whoosh.mp3` | whoosh | Karate hit whoosh | 0.31 | Mixkit | 1478 |
| 200 | `whoosh/whoosh-034-storm-wind.mp3` | whoosh | Storm wind | 2.27 | Mixkit | 2411 |
| 201 | `whoosh/whoosh-035-fast-sweeping-transition.mp3` | whoosh | Fast sweeping transition | 1.72 | Mixkit | 164 |
| 202 | `whoosh/whoosh-036-cinematic-transition-wind-swoosh.mp3` | whoosh | Cinematic transition wind swoosh | 0.99 | Mixkit | 1468 |
| 203 | `whoosh/whoosh-037-futuristic-sweep-pass-by.mp3` | whoosh | Futuristic sweep pass by | 2.17 | Mixkit | 169 |
| 204 | `whoosh/whoosh-038-robot-positive-item-acquired.mp3` | whoosh | Robot positive item acquired | 0.5 | Mixkit | 3205 |
| 205 | `whoosh/whoosh-039-transition-flying-swoosh.mp3` | whoosh | Transition flying swoosh | 2.19 | Mixkit | 3161 |
| 206 | `whoosh/whoosh-040-quick-swoosh-accent.mp3` | whoosh | Quick swoosh accent | 0.34 | Mixkit | 1464 |
| 207 | `whoosh/whoosh-042-swoosh-wind-passing.mp3` | whoosh | Swoosh wind passing | 3.03 | Mixkit | 1167 |
| 208 | `whoosh/whoosh-044-long-hit-swoosh.mp3` | whoosh | Long hit swoosh | 0.73 | Mixkit | 1473 |
| 209 | `whoosh/whoosh-045-positive-tech-alert.mp3` | whoosh | Positive tech alert | 0.81 | Mixkit | 3218 |
| 210 | `tech/tech-002-clock-countdown-bleeps.mp3` | tech | Clock countdown bleeps | 2.14 | Mixkit | 916 |
| 211 | `whoosh/whoosh-047-technology-transition-slide.mp3` | whoosh | Technology transition slide | 0.55 | Mixkit | 3120 |
| 212 | `tech/tech-003-technological-futuristic-hum.mp3` | tech | Technological futuristic hum | 3.03 | Mixkit | 2133 |
| 213 | `tech/tech-004-ui-zoom-out.mp3` | tech | UI zoom out | 1.02 | Mixkit | 2619 |
| 214 | `tech/tech-005-sci-fi-loading-operative-system.mp3` | tech | Sci fi loading operative system | 2.66 | Mixkit | 2529 |
| 215 | `tech/tech-006-cybernetic-technology-affirmation.mp3` | tech | Cybernetic technology affirmation | 0.86 | Mixkit | 3116 |
| 216 | `tech/tech-007-high-tech-bleep.mp3` | tech | High tech bleep | 0.57 | Mixkit | 2521 |
| 217 | `tech/tech-008-electronics-power-up.mp3` | tech | Electronics power up | 3.03 | Mixkit | 2602 |
| 218 | `tech/tech-009-high-tech-bleep-confirmation.mp3` | tech | High tech bleep confirmation | 0.5 | Mixkit | 2520 |
| 219 | `tech/tech-010-ui-zoom-in-long-sound.mp3` | tech | Ui zoom in, long sound | 1.02 | Mixkit | 2621 |
| 220 | `tech/tech-011-mechanical-technology-movements.mp3` | tech | Mechanical technology movements | 1.46 | Mixkit | 3117 |
| 221 | `whoosh/whoosh-048-technology-alert-transition.mp3` | whoosh | Technology alert transition | 3.0 | Mixkit | 3121 |
| 222 | `tech/tech-012-technology-notification.mp3` | tech | Technology notification | 1.33 | Mixkit | 3123 |
| 223 | `tech/tech-013-futuristic-zoom-move.mp3` | tech | Futuristic zoom move | 1.88 | Mixkit | 2626 |
| 224 | `tech/tech-014-technology-computer-calculations.mp3` | tech | Technology computer calculations | 1.72 | Mixkit | 3122 |
| 225 | `whoosh/whoosh-049-futuristic-metal-transition-sweep.mp3` | whoosh | Futuristic metal transition sweep | 0.81 | Mixkit | 2636 |
| 226 | `tech/tech-016-retro-confirmation-tone.mp3` | tech | Retro confirmation tone | 1.07 | Mixkit | 2860 |
| 227 | `tech/tech-017-user-interface-zoom-in.mp3` | tech | User interface zoom in | 0.55 | Mixkit | 2618 |
| 228 | `tech/tech-018-in-and-out-zoom-sound.mp3` | tech | In and out zoom sound | 0.97 | Mixkit | 2622 |
| 229 | `whoosh/whoosh-050-futuristic-transition-sweep.mp3` | whoosh | Futuristic transition sweep | 2.14 | Mixkit | 2634 |
| 230 | `tech/tech-019-high-tech-notification-bleep.mp3` | tech | High tech notification bleep | 0.42 | Mixkit | 2519 |
| 231 | `tech/tech-020-alien-technology-button.mp3` | tech | Alien technology button | 0.39 | Mixkit | 3118 |
| 232 | `tech/tech-021-sci-fi-battle-laser-shots.mp3` | tech | Sci-fi battle laser shots | 2.3 | Mixkit | 2783 |
| 233 | `tech/tech-022-futuristic-cinematic-sweep.mp3` | tech | Futuristic cinematic sweep | 1.18 | Mixkit | 2635 |
| 234 | `whoosh/whoosh-051-cinematic-whoosh-fast-transition.mp3` | whoosh | Cinematic whoosh fast transition | 1.33 | Mixkit | 1492 |
| 235 | `whoosh/whoosh-052-fast-rocket-whoosh.mp3` | whoosh | Fast rocket whoosh | 3.0 | Mixkit | 1714 |
| 236 | `whoosh/whoosh-053-fast-whoosh-transition.mp3` | whoosh | Fast whoosh transition | 0.78 | Mixkit | 1490 |
| 237 | `whoosh/whoosh-054-epic-orchestra-transition.mp3` | whoosh | Epic orchestra transition | 3.03 | Mixkit | 2290 |
| 238 | `whoosh/whoosh-055-air-zoom-vacuum.mp3` | whoosh | Air zoom vacuum | 0.44 | Mixkit | 2608 |
| 239 | `whoosh/whoosh-056-cool-impact-movie-trailer.mp3` | whoosh | Cool impact movie trailer | 3.03 | Mixkit | 2909 |
| 240 | `whoosh/whoosh-058-intro-transition.mp3` | whoosh | Intro transition | 3.03 | Mixkit | 1146 |
| 241 | `whoosh/whoosh-059-terror-sweep-of-darkness.mp3` | whoosh | Terror sweep of darkness | 3.03 | Mixkit | 2630 |
| 242 | `whoosh/whoosh-060-short-transition-sweep.mp3` | whoosh | Short transition sweep | 0.39 | Mixkit | 175 |
| 243 | `whoosh/whoosh-062-woosh-wind.mp3` | whoosh | Woosh wind | 2.59 | Mixkit | 1168 |
| 244 | `whoosh/whoosh-063-fast-sci-fi-transition-sweep.mp3` | whoosh | Fast sci fi transition sweep | 0.6 | Mixkit | 3114 |
| 245 | `whoosh/whoosh-064-pulsating-bass-transition.mp3` | whoosh | Pulsating bass transition | 3.03 | Mixkit | 2295 |
| 246 | `whoosh/whoosh-065-storm-coming-whoosh.mp3` | whoosh | Storm coming whoosh | 3.03 | Mixkit | 2408 |
| 247 | `whoosh/whoosh-066-apocalyptic-stomp-impact.mp3` | whoosh | Apocalyptic stomp impact | 2.74 | Mixkit | 3057 |
| 248 | `whoosh/whoosh-067-quick-metal-transition-sweep.mp3` | whoosh | Quick metal transition sweep | 1.41 | Mixkit | 2639 |
| 249 | `whoosh/whoosh-068-epic-blockbuster-movie-transition.mp3` | whoosh | Epic blockbuster movie transition | 3.03 | Mixkit | 2907 |
| 250 | `whoosh/whoosh-069-movie-trailer-whoosh-hit.mp3` | whoosh | Movie trailer whoosh hit | 3.03 | Mixkit | 2919 |
| 251 | `whoosh/whoosh-070-bass-rumble-hum.mp3` | whoosh | Bass rumble hum | 3.03 | Mixkit | 2297 |
| 252 | `whoosh/whoosh-071-mighty-mysterious-swoosh.mp3` | whoosh | Mighty mysterious swoosh | 3.03 | Mixkit | 2615 |
| 253 | `whoosh/whoosh-072-television-news-report-transition.mp3` | whoosh | Television news report transition | 3.03 | Mixkit | 3089 |
| 254 | `whoosh/whoosh-073-eerie-trailer-horn-transition.mp3` | whoosh | Eerie trailer horn transition | 3.03 | Mixkit | 2291 |
| 255 | `typing/typing-004-keyboard-typing.mp3` | typing | Keyboard typing | 4.02 | Mixkit | 1386 |
| 256 | `typing/typing-005-slow-typing-on-a-keyboard.mp3` | typing | Slow typing on a keyboard | 3.97 | Mixkit | 2532 |
| 257 | `typing/typing-006-smartphone-typing.mp3` | typing | Smartphone typing | 3.92 | Mixkit | 1393 |
| 258 | `typing/typing-007-old-typewriter-typing.mp3` | typing | Old typewriter typing | 4.02 | Mixkit | 1372 |
| 259 | `typing/typing-008-soft-typing-on-a-digital-keyboard.mp3` | typing | Soft typing on a digital keyboard | 4.0 | Mixkit | 1396 |
| 260 | `typing/typing-009-hard-laptop-keyboard-typing.mp3` | typing | Hard laptop keyboard typing | 4.02 | Mixkit | 2538 |
| 261 | `typing/typing-010-fast-keyboard-typing.mp3` | typing | Fast keyboard typing | 3.97 | Mixkit | 1387 |
| 262 | `typing/typing-011-fast-laptop-keyboard-typing.mp3` | typing | Fast laptop keyboard typing | 4.02 | Mixkit | 1392 |
| 263 | `typing/typing-012-typing-on-an-electronic-device.mp3` | typing | Typing on an electronic device | 3.5 | Mixkit | 1376 |
| 264 | `typing/typing-013-typing-text-on-a-smartphone.mp3` | typing | Typing text on a smartphone | 4.02 | Mixkit | 1395 |
| 265 | `typing/typing-014-typing-on-an-electric-typewriter.mp3` | typing | Typing on an electric typewriter | 3.79 | Mixkit | 1377 |
| 266 | `typing/typing-015-laptop-keyboard-typing-sequence.mp3` | typing | Laptop keyboard typing sequence | 4.02 | Mixkit | 2537 |
| 267 | `typing/typing-016-keyboard-slow-typing.mp3` | typing | Keyboard slow typing | 4.02 | Mixkit | 1391 |
| 268 | `typing/typing-017-keyboard-random-typing.mp3` | typing | Keyboard random typing | 4.02 | Mixkit | 1388 |
| 269 | `typing/typing-018-electronic-typing.mp3` | typing | Electronic typing | 1.52 | Mixkit | 1397 |
| 270 | `typing/typing-019-typing-on-plastic-keyboard.mp3` | typing | Typing on plastic keyboard | 4.02 | Mixkit | 1389 |
| 271 | `typing/typing-020-laptop-backspace-typing-sequence.mp3` | typing | Laptop backspace typing sequence | 4.05 | Mixkit | 2539 |
| 272 | `typing/typing-021-hard-typing.mp3` | typing | Hard typing | 3.97 | Mixkit | 1390 |
| 273 | `whoosh/whoosh-074-air-woosh.mp3` | whoosh | Air woosh | 1.78 | Mixkit | 1489 |
| 274 | `whoosh/whoosh-075-arrow-whoosh.mp3` | whoosh | Arrow whoosh | 0.39 | Mixkit | 1491 |
| 275 | `whoosh/whoosh-076-metal-hit-woosh.mp3` | whoosh | Metal hit woosh | 0.44 | Mixkit | 1485 |
| 276 | `whoosh/whoosh-077-cinematic-whoosh-stutter.mp3` | whoosh | Cinematic whoosh stutter | 2.12 | Mixkit | 787 |
| 277 | `whoosh/whoosh-079-swirling-whoosh.mp3` | whoosh | Swirling whoosh | 2.22 | Mixkit | 1493 |
| 278 | `whoosh/whoosh-080-movie-whoosh-impact-presentation.mp3` | whoosh | Movie whoosh impact presentation | 3.0 | Mixkit | 2903 |
| 279 | `whoosh/whoosh-082-meteor-whoosh.mp3` | whoosh | Meteor whoosh | 3.0 | Mixkit | 3024 |
| 280 | `whoosh/whoosh-083-flickering-insect-whoosh.mp3` | whoosh | Flickering insect whoosh | 1.8 | Mixkit | 2651 |
| 281 | `impact/impact-032-short-explosion.mp3` | impact | Short explosion | 1.23 | Mixkit | 1694 |
| 282 | `impact/impact-033-intro-news-sound.mp3` | impact | Intro news sound | 2.38 | Mixkit | 1151 |
| 283 | `impact/impact-034-8-bit-game-shots.mp3` | impact | 8-bit game shots | 1.8 | Mixkit | 2778 |
| 284 | `impact/impact-035-arcade-game-explosion.mp3` | impact | Arcade game explosion | 1.25 | Mixkit | 2759 |
| 285 | `impact/impact-037-distant-explosion.mp3` | impact | Distant explosion | 3.03 | Mixkit | 1690 |
| 286 | `impact/impact-038-arcade-game-explosion.mp3` | impact | Arcade game explosion | 1.23 | Mixkit | 1699 |
| 287 | `impact/impact-039-pixel-chiptune-explosion.mp3` | impact | Pixel chiptune explosion | 1.75 | Mixkit | 1692 |
| 288 | `impact/impact-040-system-break.mp3` | impact | System break | 1.36 | Mixkit | 2942 |
| 289 | `impact/impact-041-arcade-game-explosion-echo.mp3` | impact | Arcade game explosion echo | 2.98 | Mixkit | 1698 |
| 290 | `impact/impact-042-fast-game-explosion.mp3` | impact | Fast game explosion | 1.04 | Mixkit | 1688 |
| 291 | `impact/impact-043-small-wood-plank-pile-drop.mp3` | impact | Small wood plank pile drop | 1.02 | Mixkit | 3141 |
| 292 | `impact/impact-044-money-bag-drop.mp3` | impact | Money bag drop | 0.39 | Mixkit | 1989 |
| 293 | `impact/impact-045-stones-and-rocks-falling.mp3` | impact | Stones and rocks falling | 2.98 | Mixkit | 400 |
| 294 | `impact/impact-046-thin-metal-plate-drop.mp3` | impact | Thin metal plate drop | 1.02 | Mixkit | 3158 |
| 295 | `impact/impact-047-dropping-keys-in-the-floor.mp3` | impact | Dropping keys in the floor | 0.5 | Mixkit | 2839 |
| 296 | `impact/impact-048-ball-bouncing-to-a-stop.mp3` | impact | Ball bouncing to a stop | 3.0 | Mixkit | 2089 |
| 297 | `impact/impact-049-metal-tools-box-browsing.mp3` | impact | Metal tools box browsing | 0.78 | Mixkit | 3202 |
| 298 | `impact/impact-050-golf-ball-bouncing.mp3` | impact | Golf ball bouncing | 3.0 | Mixkit | 2075 |
| 299 | `impact/impact-051-pull-and-drop-gym-machine.mp3` | impact | Pull and drop gym machine | 1.88 | Mixkit | 2115 |
| 300 | `impact/impact-052-dough-hook-drop.mp3` | impact | Dough hook drop | 0.34 | Mixkit | 1812 |
| 301 | `slide/slide-001-paper-slide.mp3` | slide | Paper slide | 0.47 | Mixkit | 1530 |
| 302 | `slide/slide-004-quick-saber-cut.mp3` | slide | Quick saber cut | 0.6 | Mixkit | 2158 |
| 303 | `slide/slide-010-creaky-wooden-scrap.mp3` | slide | Creaky wooden scrap | 1.44 | Mixkit | 3157 |
| 304 | `slide/slide-020-glass-plate-slide.mp3` | slide | Glass plate slide | 0.84 | Mixkit | 1527 |
| 305 | `slide/slide-021-futuristic-slide.mp3` | slide | Futuristic slide | 0.63 | Mixkit | 1533 |
| 306 | `riser/riser-009-heavenly-swell.mp3` | riser | Heavenly swell | 6.03 | Mixkit | 2674 |
| 307 | `riser/riser-010-trailer-cinematic-suspense-swell.mp3` | riser | Trailer cinematic suspense swell | 6.03 | Mixkit | 678 |
| 308 | `riser/riser-011-angelic-swell-presentation.mp3` | riser | Angelic swell presentation | 6.03 | Mixkit | 2672 |
| 309 | `riser/riser-012-cinematic-deep-drums-suspense-swell.mp3` | riser | Cinematic deep drums suspense swell | 6.03 | Mixkit | 682 |
| 310 | `riser/riser-013-mysterious-long-swell.mp3` | riser | Mysterious long swell | 6.03 | Mixkit | 2671 |
| 311 | `riser/riser-014-electric-charge-hum.mp3` | riser | Electric charge hum | 0.55 | Mixkit | 3201 |
| 312 | `riser/riser-015-rising-harp-music.mp3` | riser | Rising harp music | 6.01 | Mixkit | 691 |
| 313 | `riser/riser-016-magic-whip-swell.mp3` | riser | Magic whip swell | 2.8 | Mixkit | 1516 |
| 314 | `riser/riser-017-short-sci-fi-swell.mp3` | riser | Short sci-fi swell | 2.61 | Mixkit | 2669 |
| 315 | `riser/riser-018-cinematic-swell-stark-transition.mp3` | riser | Cinematic swell stark transition | 6.01 | Mixkit | 2675 |
| 316 | `riser/riser-019-cinematic-rumbling-swell.mp3` | riser | Cinematic rumbling swell | 6.03 | Mixkit | 2664 |
| 317 | `riser/riser-020-cinematic-static-slow-swell.mp3` | riser | Cinematic static slow swell | 6.03 | Mixkit | 1445 |
| 318 | `riser/riser-021-instrument-echo-swell.mp3` | riser | Instrument echo swell | 5.77 | Mixkit | 2673 |
| 319 | `riser/riser-022-swell-vinyl-record-scratch.mp3` | riser | Swell vinyl record scratch | 0.5 | Mixkit | 709 |
| 320 | `riser/riser-023-cinematic-wind-swell.mp3` | riser | Cinematic wind swell | 6.03 | Mixkit | 1170 |
| 321 | `riser/riser-024-electronic-swell-noise.mp3` | riser | Electronic swell noise | 6.03 | Mixkit | 2670 |
| 322 | `riser/riser-025-intense-swell-phasing-spinning.mp3` | riser | Intense swell phasing spinning | 6.03 | Mixkit | 2667 |
| 323 | `riser/riser-026-simple-swell-bass.mp3` | riser | Simple swell bass | 6.03 | Mixkit | 2668 |
| 324 | `riser/riser-027-bass-double-swell.mp3` | riser | Bass double swell | 6.03 | Mixkit | 2666 |
| 325 | `riser/riser-028-radio-frequency-signal-swell.mp3` | riser | Radio frequency signal swell | 6.03 | Mixkit | 2554 |
| 326 | `whoosh/whoosh-084-fast-air-zoom.mp3` | whoosh | Fast air zoom | 0.78 | Mixkit | 2625 |
| 327 | `whoosh/whoosh-085-sci-fi-interface-zoom.mp3` | whoosh | Sci Fi interface zoom | 0.55 | Mixkit | 890 |
| 328 | `whoosh/whoosh-086-user-interface-zoom-out.mp3` | whoosh | User interface zoom out | 1.02 | Mixkit | 2620 |
| 329 | `whoosh/whoosh-087-ui-zoom-in.mp3` | whoosh | UI zoom in | 0.52 | Mixkit | 2617 |
| 330 | `whoosh/whoosh-088-interface-sci-fi-expand-or-zoom.mp3` | whoosh | Interface sci fi expand or zoom | 0.44 | Mixkit | 913 |
| 331 | `whoosh/whoosh-089-funny-magic-zoom.mp3` | whoosh | Funny magic zoom | 0.86 | Mixkit | 2624 |
| 332 | `whoosh/whoosh-090-interface-classic-zoom.mp3` | whoosh | Interface classic zoom | 0.55 | Mixkit | 2616 |
| 333 | `ui/ui-010-back-001.mp3` | ui | back_001 | 0.1 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 334 | `ui/ui-011-back-002.mp3` | ui | back_002 | 0.1 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 335 | `ui/ui-012-back-003.mp3` | ui | back_003 | 0.13 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 336 | `ui/ui-013-back-004.mp3` | ui | back_004 | 0.1 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 337 | `ui/ui-014-bong-001.mp3` | ui | bong_001 | 0.16 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 338 | `ui/ui-015-click-001.mp3` | ui | click_001 | 0.13 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 339 | `ui/ui-016-close-001.mp3` | ui | close_001 | 0.18 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 340 | `ui/ui-017-close-002.mp3` | ui | close_002 | 0.34 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 341 | `ui/ui-018-close-003.mp3` | ui | close_003 | 0.34 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 342 | `ui/ui-019-close-004.mp3` | ui | close_004 | 0.37 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 343 | `ui/ui-020-confirmation-001.mp3` | ui | confirmation_001 | 0.34 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 344 | `ui/ui-021-confirmation-002.mp3` | ui | confirmation_002 | 0.57 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 345 | `ui/ui-022-confirmation-003.mp3` | ui | confirmation_003 | 0.37 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 346 | `ui/ui-023-confirmation-004.mp3` | ui | confirmation_004 | 0.52 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 347 | `ui/ui-024-drop-001.mp3` | ui | drop_001 | 0.16 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 348 | `ui/ui-025-drop-002.mp3` | ui | drop_002 | 0.24 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 349 | `ui/ui-026-drop-003.mp3` | ui | drop_003 | 0.24 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 350 | `ui/ui-027-drop-004.mp3` | ui | drop_004 | 0.31 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 351 | `ui/ui-028-error-001.mp3` | ui | error_001 | 0.21 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 352 | `ui/ui-029-error-002.mp3` | ui | error_002 | 0.21 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 353 | `ui/ui-030-error-003.mp3` | ui | error_003 | 0.42 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 354 | `ui/ui-031-error-004.mp3` | ui | error_004 | 0.16 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 355 | `ui/ui-032-error-005.mp3` | ui | error_005 | 0.21 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 356 | `ui/ui-033-error-006.mp3` | ui | error_006 | 0.29 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 357 | `ui/ui-034-error-007.mp3` | ui | error_007 | 0.24 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 358 | `ui/ui-035-error-008.mp3` | ui | error_008 | 0.18 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 359 | `ui/ui-036-glass-001.mp3` | ui | glass_001 | 0.31 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 360 | `ui/ui-037-glass-002.mp3` | ui | glass_002 | 0.16 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 361 | `ui/ui-038-glass-003.mp3` | ui | glass_003 | 0.16 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 362 | `ui/ui-039-glass-004.mp3` | ui | glass_004 | 0.73 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 363 | `ui/ui-040-glass-005.mp3` | ui | glass_005 | 0.1 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 364 | `ui/ui-041-glass-006.mp3` | ui | glass_006 | 0.1 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 365 | `ui/ui-042-glitch-002.mp3` | ui | glitch_002 | 0.08 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 366 | `ui/ui-043-maximize-001.mp3` | ui | maximize_001 | 0.29 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 367 | `ui/ui-044-maximize-002.mp3` | ui | maximize_002 | 0.29 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 368 | `ui/ui-045-maximize-003.mp3` | ui | maximize_003 | 0.26 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 369 | `ui/ui-046-maximize-004.mp3` | ui | maximize_004 | 0.44 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 370 | `ui/ui-047-maximize-005.mp3` | ui | maximize_005 | 0.55 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 371 | `ui/ui-048-maximize-006.mp3` | ui | maximize_006 | 0.42 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 372 | `ui/ui-049-maximize-007.mp3` | ui | maximize_007 | 0.21 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 373 | `ui/ui-050-maximize-008.mp3` | ui | maximize_008 | 0.24 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 374 | `ui/ui-051-maximize-009.mp3` | ui | maximize_009 | 0.24 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 375 | `ui/ui-052-minimize-001.mp3` | ui | minimize_001 | 0.29 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 376 | `ui/ui-053-minimize-002.mp3` | ui | minimize_002 | 0.29 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 377 | `ui/ui-054-minimize-003.mp3` | ui | minimize_003 | 0.24 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 378 | `ui/ui-055-minimize-004.mp3` | ui | minimize_004 | 0.44 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 379 | `ui/ui-056-minimize-005.mp3` | ui | minimize_005 | 0.55 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 380 | `ui/ui-057-minimize-006.mp3` | ui | minimize_006 | 0.42 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 381 | `ui/ui-058-minimize-007.mp3` | ui | minimize_007 | 0.21 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 382 | `ui/ui-059-minimize-008.mp3` | ui | minimize_008 | 0.26 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 383 | `ui/ui-060-minimize-009.mp3` | ui | minimize_009 | 0.26 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 384 | `ui/ui-061-open-001.mp3` | ui | open_001 | 0.18 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 385 | `ui/ui-062-open-002.mp3` | ui | open_002 | 0.37 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 386 | `ui/ui-063-open-003.mp3` | ui | open_003 | 0.37 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 387 | `ui/ui-064-open-004.mp3` | ui | open_004 | 0.37 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 388 | `ui/ui-065-pluck-001.mp3` | ui | pluck_001 | 0.13 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 389 | `ui/ui-066-pluck-002.mp3` | ui | pluck_002 | 0.16 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 390 | `ui/ui-067-question-001.mp3` | ui | question_001 | 0.52 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 391 | `ui/ui-068-question-002.mp3` | ui | question_002 | 0.37 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 392 | `ui/ui-069-question-003.mp3` | ui | question_003 | 0.37 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 393 | `ui/ui-070-question-004.mp3` | ui | question_004 | 0.37 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 394 | `ui/ui-071-scratch-001.mp3` | ui | scratch_001 | 0.16 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 395 | `ui/ui-072-scratch-002.mp3` | ui | scratch_002 | 0.16 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 396 | `ui/ui-073-scratch-003.mp3` | ui | scratch_003 | 0.16 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 397 | `ui/ui-074-scratch-004.mp3` | ui | scratch_004 | 0.34 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 398 | `ui/ui-075-scratch-005.mp3` | ui | scratch_005 | 0.34 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 399 | `ui/ui-076-scroll-001.mp3` | ui | scroll_001 | 0.99 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 400 | `ui/ui-077-scroll-002.mp3` | ui | scroll_002 | 1.04 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 401 | `ui/ui-078-scroll-003.mp3` | ui | scroll_003 | 1.04 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 402 | `ui/ui-079-scroll-004.mp3` | ui | scroll_004 | 0.99 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 403 | `ui/ui-080-scroll-005.mp3` | ui | scroll_005 | 0.99 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 404 | `ui/ui-081-select-001.mp3` | ui | select_001 | 0.08 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 405 | `ui/ui-082-select-002.mp3` | ui | select_002 | 0.08 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 406 | `ui/ui-083-select-003.mp3` | ui | select_003 | 0.26 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 407 | `ui/ui-084-select-004.mp3` | ui | select_004 | 0.26 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 408 | `ui/ui-085-select-005.mp3` | ui | select_005 | 0.26 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 409 | `ui/ui-086-select-006.mp3` | ui | select_006 | 0.26 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 410 | `ui/ui-087-select-007.mp3` | ui | select_007 | 0.08 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 411 | `ui/ui-088-select-008.mp3` | ui | select_008 | 0.08 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 412 | `ui/ui-096-tick-004.mp3` | ui | tick_004 | 0.1 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 413 | `ui/ui-097-toggle-001.mp3` | ui | toggle_001 | 0.13 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 414 | `ui/ui-098-toggle-002.mp3` | ui | toggle_002 | 0.13 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 415 | `ui/ui-099-toggle-003.mp3` | ui | toggle_003 | 0.13 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 416 | `ui/ui-100-toggle-004.mp3` | ui | toggle_004 | 0.1 | Kenney · interface-sounds | https://kenney.nl/assets/interface-sounds |
| 417 | `click/click-031-click1.mp3` | click | click1 | 0.13 | Kenney · ui-audio | https://kenney.nl/assets/ui-audio |
| 418 | `click/click-032-click2.mp3` | click | click2 | 0.1 | Kenney · ui-audio | https://kenney.nl/assets/ui-audio |
| 419 | `click/click-033-click3.mp3` | click | click3 | 0.1 | Kenney · ui-audio | https://kenney.nl/assets/ui-audio |
| 420 | `click/click-034-click4.mp3` | click | click4 | 0.08 | Kenney · ui-audio | https://kenney.nl/assets/ui-audio |
| 421 | `click/click-035-click5.mp3` | click | click5 | 0.08 | Kenney · ui-audio | https://kenney.nl/assets/ui-audio |
| 422 | `click/click-036-mouseclick1.mp3` | click | mouseclick1 | 0.1 | Kenney · ui-audio | https://kenney.nl/assets/ui-audio |
| 423 | `click/click-037-mouserelease1.mp3` | click | mouserelease1 | 0.1 | Kenney · ui-audio | https://kenney.nl/assets/ui-audio |
| 424 | `click/click-038-rollover1.mp3` | click | rollover1 | 0.24 | Kenney · ui-audio | https://kenney.nl/assets/ui-audio |
| 425 | `click/click-039-rollover2.mp3` | click | rollover2 | 0.1 | Kenney · ui-audio | https://kenney.nl/assets/ui-audio |
| 426 | `click/click-040-rollover3.mp3` | click | rollover3 | 0.1 | Kenney · ui-audio | https://kenney.nl/assets/ui-audio |
| 427 | `click/click-041-rollover4.mp3` | click | rollover4 | 0.1 | Kenney · ui-audio | https://kenney.nl/assets/ui-audio |
| 428 | `click/click-042-rollover5.mp3` | click | rollover5 | 0.16 | Kenney · ui-audio | https://kenney.nl/assets/ui-audio |
| 429 | `click/click-043-rollover6.mp3` | click | rollover6 | 0.21 | Kenney · ui-audio | https://kenney.nl/assets/ui-audio |
| 430 | `tech/tech-023-highdown.mp3` | tech | highDown | 0.44 | Kenney · digital-audio | https://kenney.nl/assets/digital-audio |
| 431 | `tech/tech-024-highup.mp3` | tech | highUp | 0.42 | Kenney · digital-audio | https://kenney.nl/assets/digital-audio |
| 432 | `tech/tech-025-laser1.mp3` | tech | laser1 | 0.91 | Kenney · digital-audio | https://kenney.nl/assets/digital-audio |
| 433 | `tech/tech-026-laser2.mp3` | tech | laser2 | 0.78 | Kenney · digital-audio | https://kenney.nl/assets/digital-audio |
| 434 | `tech/tech-027-laser3.mp3` | tech | laser3 | 0.68 | Kenney · digital-audio | https://kenney.nl/assets/digital-audio |
| 435 | `tech/tech-028-laser4.mp3` | tech | laser4 | 0.76 | Kenney · digital-audio | https://kenney.nl/assets/digital-audio |
| 436 | `tech/tech-029-laser5.mp3` | tech | laser5 | 0.68 | Kenney · digital-audio | https://kenney.nl/assets/digital-audio |
| 437 | `tech/tech-030-laser6.mp3` | tech | laser6 | 0.81 | Kenney · digital-audio | https://kenney.nl/assets/digital-audio |
| 438 | `tech/tech-031-laser7.mp3` | tech | laser7 | 0.78 | Kenney · digital-audio | https://kenney.nl/assets/digital-audio |
| 439 | `tech/tech-032-laser8.mp3` | tech | laser8 | 0.65 | Kenney · digital-audio | https://kenney.nl/assets/digital-audio |
| 440 | `tech/tech-033-laser9.mp3` | tech | laser9 | 0.84 | Kenney · digital-audio | https://kenney.nl/assets/digital-audio |
| 441 | `tech/tech-034-lowdown.mp3` | tech | lowDown | 0.71 | Kenney · digital-audio | https://kenney.nl/assets/digital-audio |
| 442 | `tech/tech-035-lowrandom.mp3` | tech | lowRandom | 0.44 | Kenney · digital-audio | https://kenney.nl/assets/digital-audio |
| 443 | `tech/tech-036-lowthreetone.mp3` | tech | lowThreeTone | 0.91 | Kenney · digital-audio | https://kenney.nl/assets/digital-audio |
| 444 | `tech/tech-037-pepsound1.mp3` | tech | pepSound1 | 0.37 | Kenney · digital-audio | https://kenney.nl/assets/digital-audio |
| 445 | `tech/tech-038-pepsound2.mp3` | tech | pepSound2 | 0.42 | Kenney · digital-audio | https://kenney.nl/assets/digital-audio |
| 446 | `tech/tech-039-pepsound3.mp3` | tech | pepSound3 | 0.37 | Kenney · digital-audio | https://kenney.nl/assets/digital-audio |
| 447 | `tech/tech-040-pepsound4.mp3` | tech | pepSound4 | 0.47 | Kenney · digital-audio | https://kenney.nl/assets/digital-audio |
| 448 | `tech/tech-041-pepsound5.mp3` | tech | pepSound5 | 0.47 | Kenney · digital-audio | https://kenney.nl/assets/digital-audio |
| 449 | `tech/tech-042-phasejump1.mp3` | tech | phaseJump1 | 0.39 | Kenney · digital-audio | https://kenney.nl/assets/digital-audio |
| 450 | `tech/tech-043-phasejump2.mp3` | tech | phaseJump2 | 0.37 | Kenney · digital-audio | https://kenney.nl/assets/digital-audio |
| 451 | `tech/tech-044-phasejump3.mp3` | tech | phaseJump3 | 0.42 | Kenney · digital-audio | https://kenney.nl/assets/digital-audio |
| 452 | `tech/tech-045-phasejump4.mp3` | tech | phaseJump4 | 0.47 | Kenney · digital-audio | https://kenney.nl/assets/digital-audio |
| 453 | `tech/tech-046-phasejump5.mp3` | tech | phaseJump5 | 0.42 | Kenney · digital-audio | https://kenney.nl/assets/digital-audio |
| 454 | `tech/tech-047-phaserdown1.mp3` | tech | phaserDown1 | 0.39 | Kenney · digital-audio | https://kenney.nl/assets/digital-audio |
| 455 | `tech/tech-048-phaserdown2.mp3` | tech | phaserDown2 | 0.29 | Kenney · digital-audio | https://kenney.nl/assets/digital-audio |
| 456 | `tech/tech-049-phaserdown3.mp3` | tech | phaserDown3 | 0.44 | Kenney · digital-audio | https://kenney.nl/assets/digital-audio |
| 457 | `tech/tech-050-phaserup1.mp3` | tech | phaserUp1 | 0.44 | Kenney · digital-audio | https://kenney.nl/assets/digital-audio |
| 458 | `tech/tech-051-phaserup2.mp3` | tech | phaserUp2 | 0.37 | Kenney · digital-audio | https://kenney.nl/assets/digital-audio |
| 459 | `tech/tech-052-phaserup3.mp3` | tech | phaserUp3 | 0.44 | Kenney · digital-audio | https://kenney.nl/assets/digital-audio |
| 460 | `tech/tech-053-phaserup4.mp3` | tech | phaserUp4 | 0.31 | Kenney · digital-audio | https://kenney.nl/assets/digital-audio |
| 461 | `tech/tech-054-phaserup5.mp3` | tech | phaserUp5 | 0.26 | Kenney · digital-audio | https://kenney.nl/assets/digital-audio |
| 462 | `tech/tech-055-phaserup6.mp3` | tech | phaserUp6 | 0.31 | Kenney · digital-audio | https://kenney.nl/assets/digital-audio |
| 463 | `tech/tech-056-phaserup7.mp3` | tech | phaserUp7 | 0.34 | Kenney · digital-audio | https://kenney.nl/assets/digital-audio |
| 464 | `tech/tech-057-powerup1.mp3` | tech | powerUp1 | 0.99 | Kenney · digital-audio | https://kenney.nl/assets/digital-audio |
| 465 | `tech/tech-058-powerup10.mp3` | tech | powerUp10 | 0.42 | Kenney · digital-audio | https://kenney.nl/assets/digital-audio |
| 466 | `tech/tech-059-powerup11.mp3` | tech | powerUp11 | 0.5 | Kenney · digital-audio | https://kenney.nl/assets/digital-audio |
| 467 | `tech/tech-060-powerup12.mp3` | tech | powerUp12 | 0.68 | Kenney · digital-audio | https://kenney.nl/assets/digital-audio |
| 468 | `tech/tech-061-powerup2.mp3` | tech | powerUp2 | 0.24 | Kenney · digital-audio | https://kenney.nl/assets/digital-audio |
| 469 | `tech/tech-062-powerup3.mp3` | tech | powerUp3 | 0.91 | Kenney · digital-audio | https://kenney.nl/assets/digital-audio |
| 470 | `tech/tech-063-powerup4.mp3` | tech | powerUp4 | 0.29 | Kenney · digital-audio | https://kenney.nl/assets/digital-audio |
| 471 | `tech/tech-064-powerup5.mp3` | tech | powerUp5 | 0.29 | Kenney · digital-audio | https://kenney.nl/assets/digital-audio |
| 472 | `tech/tech-065-powerup6.mp3` | tech | powerUp6 | 0.21 | Kenney · digital-audio | https://kenney.nl/assets/digital-audio |
| 473 | `tech/tech-066-powerup7.mp3` | tech | powerUp7 | 0.34 | Kenney · digital-audio | https://kenney.nl/assets/digital-audio |
| 474 | `tech/tech-067-powerup8.mp3` | tech | powerUp8 | 0.31 | Kenney · digital-audio | https://kenney.nl/assets/digital-audio |
| 475 | `tech/tech-068-powerup9.mp3` | tech | powerUp9 | 0.34 | Kenney · digital-audio | https://kenney.nl/assets/digital-audio |
| 476 | `tech/tech-069-spacetrash1.mp3` | tech | spaceTrash1 | 1.38 | Kenney · digital-audio | https://kenney.nl/assets/digital-audio |
| 477 | `tech/tech-070-spacetrash2.mp3` | tech | spaceTrash2 | 1.38 | Kenney · digital-audio | https://kenney.nl/assets/digital-audio |
| 478 | `tech/tech-071-spacetrash3.mp3` | tech | spaceTrash3 | 1.38 | Kenney · digital-audio | https://kenney.nl/assets/digital-audio |
| 479 | `tech/tech-072-spacetrash4.mp3` | tech | spaceTrash4 | 1.25 | Kenney · digital-audio | https://kenney.nl/assets/digital-audio |
| 480 | `tech/tech-073-spacetrash5.mp3` | tech | spaceTrash5 | 1.07 | Kenney · digital-audio | https://kenney.nl/assets/digital-audio |
| 481 | `tech/tech-074-threetone1.mp3` | tech | threeTone1 | 0.55 | Kenney · digital-audio | https://kenney.nl/assets/digital-audio |
| 482 | `tech/tech-075-threetone2.mp3` | tech | threeTone2 | 0.63 | Kenney · digital-audio | https://kenney.nl/assets/digital-audio |
| 483 | `tech/tech-076-tone1.mp3` | tech | tone1 | 0.18 | Kenney · digital-audio | https://kenney.nl/assets/digital-audio |
| 484 | `tech/tech-077-twotone1.mp3` | tech | twoTone1 | 0.42 | Kenney · digital-audio | https://kenney.nl/assets/digital-audio |
| 485 | `tech/tech-078-twotone2.mp3` | tech | twoTone2 | 0.44 | Kenney · digital-audio | https://kenney.nl/assets/digital-audio |
| 486 | `tech/tech-079-zap1.mp3` | tech | zap1 | 0.94 | Kenney · digital-audio | https://kenney.nl/assets/digital-audio |
| 487 | `tech/tech-080-zap2.mp3` | tech | zap2 | 1.2 | Kenney · digital-audio | https://kenney.nl/assets/digital-audio |
| 488 | `tech/tech-081-zapthreetonedown.mp3` | tech | zapThreeToneDown | 1.28 | Kenney · digital-audio | https://kenney.nl/assets/digital-audio |
| 489 | `tech/tech-082-zapthreetoneup.mp3` | tech | zapThreeToneUp | 1.12 | Kenney · digital-audio | https://kenney.nl/assets/digital-audio |
| 490 | `tech/tech-083-zaptwotone.mp3` | tech | zapTwoTone | 1.23 | Kenney · digital-audio | https://kenney.nl/assets/digital-audio |
| 491 | `tech/tech-084-zaptwotone2.mp3` | tech | zapTwoTone2 | 1.15 | Kenney · digital-audio | https://kenney.nl/assets/digital-audio |
| 492 | `impact/impact-058-impactgeneric-light-000.mp3` | impact | impactGeneric_light_000 | 0.18 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 493 | `impact/impact-059-impactgeneric-light-001.mp3` | impact | impactGeneric_light_001 | 0.16 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 494 | `impact/impact-060-impactgeneric-light-002.mp3` | impact | impactGeneric_light_002 | 0.18 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 495 | `impact/impact-061-impactgeneric-light-003.mp3` | impact | impactGeneric_light_003 | 0.18 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 496 | `impact/impact-062-impactgeneric-light-004.mp3` | impact | impactGeneric_light_004 | 0.18 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 497 | `impact/impact-063-impactglass-heavy-000.mp3` | impact | impactGlass_heavy_000 | 0.29 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 498 | `impact/impact-064-impactglass-heavy-001.mp3` | impact | impactGlass_heavy_001 | 0.47 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 499 | `impact/impact-065-impactglass-heavy-002.mp3` | impact | impactGlass_heavy_002 | 0.29 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 500 | `impact/impact-066-impactglass-heavy-003.mp3` | impact | impactGlass_heavy_003 | 0.21 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 501 | `impact/impact-067-impactglass-heavy-004.mp3` | impact | impactGlass_heavy_004 | 0.44 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 502 | `impact/impact-068-impactglass-light-000.mp3` | impact | impactGlass_light_000 | 0.24 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 503 | `impact/impact-069-impactglass-light-001.mp3` | impact | impactGlass_light_001 | 0.24 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 504 | `impact/impact-070-impactglass-light-002.mp3` | impact | impactGlass_light_002 | 0.24 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 505 | `impact/impact-071-impactglass-light-003.mp3` | impact | impactGlass_light_003 | 0.24 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 506 | `impact/impact-072-impactglass-light-004.mp3` | impact | impactGlass_light_004 | 0.24 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 507 | `impact/impact-073-impactglass-medium-000.mp3` | impact | impactGlass_medium_000 | 0.57 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 508 | `impact/impact-074-impactglass-medium-001.mp3` | impact | impactGlass_medium_001 | 0.57 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 509 | `impact/impact-075-impactglass-medium-002.mp3` | impact | impactGlass_medium_002 | 0.57 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 510 | `impact/impact-076-impactglass-medium-003.mp3` | impact | impactGlass_medium_003 | 0.57 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 511 | `impact/impact-077-impactglass-medium-004.mp3` | impact | impactGlass_medium_004 | 0.57 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 512 | `impact/impact-078-impactmetal-heavy-000.mp3` | impact | impactMetal_heavy_000 | 0.21 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 513 | `impact/impact-079-impactmetal-heavy-001.mp3` | impact | impactMetal_heavy_001 | 0.39 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 514 | `impact/impact-080-impactmetal-heavy-002.mp3` | impact | impactMetal_heavy_002 | 0.16 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 515 | `impact/impact-081-impactmetal-heavy-003.mp3` | impact | impactMetal_heavy_003 | 0.24 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 516 | `impact/impact-082-impactmetal-heavy-004.mp3` | impact | impactMetal_heavy_004 | 0.18 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 517 | `impact/impact-083-impactmetal-light-000.mp3` | impact | impactMetal_light_000 | 0.37 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 518 | `impact/impact-084-impactmetal-light-001.mp3` | impact | impactMetal_light_001 | 0.29 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 519 | `impact/impact-085-impactmetal-light-002.mp3` | impact | impactMetal_light_002 | 0.26 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 520 | `impact/impact-086-impactmetal-light-003.mp3` | impact | impactMetal_light_003 | 0.37 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 521 | `impact/impact-087-impactmetal-light-004.mp3` | impact | impactMetal_light_004 | 0.26 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 522 | `impact/impact-088-impactmetal-medium-000.mp3` | impact | impactMetal_medium_000 | 0.31 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 523 | `impact/impact-089-impactmetal-medium-001.mp3` | impact | impactMetal_medium_001 | 0.18 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 524 | `impact/impact-090-impactmetal-medium-002.mp3` | impact | impactMetal_medium_002 | 0.16 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 525 | `impact/impact-091-impactmetal-medium-003.mp3` | impact | impactMetal_medium_003 | 0.29 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 526 | `impact/impact-092-impactmetal-medium-004.mp3` | impact | impactMetal_medium_004 | 0.16 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 527 | `impact/impact-093-impactmining-000.mp3` | impact | impactMining_000 | 0.71 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 528 | `impact/impact-094-impactmining-001.mp3` | impact | impactMining_001 | 0.65 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 529 | `impact/impact-095-impactmining-002.mp3` | impact | impactMining_002 | 0.63 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 530 | `impact/impact-096-impactmining-003.mp3` | impact | impactMining_003 | 0.68 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 531 | `impact/impact-097-impactmining-004.mp3` | impact | impactMining_004 | 0.68 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 532 | `impact/impact-098-impactplank-medium-000.mp3` | impact | impactPlank_medium_000 | 0.44 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 533 | `impact/impact-099-impactplank-medium-001.mp3` | impact | impactPlank_medium_001 | 0.47 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 534 | `impact/impact-100-impactplank-medium-002.mp3` | impact | impactPlank_medium_002 | 0.47 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 535 | `impact/impact-101-impactplank-medium-003.mp3` | impact | impactPlank_medium_003 | 0.47 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 536 | `impact/impact-102-impactplank-medium-004.mp3` | impact | impactPlank_medium_004 | 0.42 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 537 | `impact/impact-103-impactplate-heavy-000.mp3` | impact | impactPlate_heavy_000 | 0.52 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 538 | `impact/impact-104-impactplate-heavy-001.mp3` | impact | impactPlate_heavy_001 | 0.39 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 539 | `impact/impact-105-impactplate-heavy-002.mp3` | impact | impactPlate_heavy_002 | 0.52 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 540 | `impact/impact-106-impactplate-heavy-003.mp3` | impact | impactPlate_heavy_003 | 0.39 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 541 | `impact/impact-107-impactplate-heavy-004.mp3` | impact | impactPlate_heavy_004 | 0.6 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 542 | `impact/impact-108-impactplate-light-000.mp3` | impact | impactPlate_light_000 | 0.52 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 543 | `impact/impact-109-impactplate-light-001.mp3` | impact | impactPlate_light_001 | 0.63 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 544 | `impact/impact-110-impactplate-light-002.mp3` | impact | impactPlate_light_002 | 0.47 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 545 | `impact/impact-111-impactplate-light-003.mp3` | impact | impactPlate_light_003 | 0.57 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 546 | `impact/impact-112-impactplate-light-004.mp3` | impact | impactPlate_light_004 | 0.63 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 547 | `impact/impact-113-impactplate-medium-000.mp3` | impact | impactPlate_medium_000 | 0.65 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 548 | `impact/impact-114-impactplate-medium-001.mp3` | impact | impactPlate_medium_001 | 0.65 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 549 | `impact/impact-115-impactplate-medium-002.mp3` | impact | impactPlate_medium_002 | 0.55 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 550 | `impact/impact-116-impactplate-medium-003.mp3` | impact | impactPlate_medium_003 | 0.6 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 551 | `impact/impact-117-impactplate-medium-004.mp3` | impact | impactPlate_medium_004 | 0.57 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 552 | `impact/impact-128-impactsoft-heavy-000.mp3` | impact | impactSoft_heavy_000 | 0.55 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 553 | `impact/impact-129-impactsoft-heavy-001.mp3` | impact | impactSoft_heavy_001 | 0.6 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 554 | `impact/impact-130-impactsoft-heavy-002.mp3` | impact | impactSoft_heavy_002 | 0.6 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 555 | `impact/impact-131-impactsoft-heavy-003.mp3` | impact | impactSoft_heavy_003 | 0.57 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 556 | `impact/impact-132-impactsoft-heavy-004.mp3` | impact | impactSoft_heavy_004 | 0.55 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 557 | `impact/impact-133-impactsoft-medium-000.mp3` | impact | impactSoft_medium_000 | 0.16 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 558 | `impact/impact-134-impactsoft-medium-001.mp3` | impact | impactSoft_medium_001 | 0.21 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 559 | `impact/impact-135-impactsoft-medium-002.mp3` | impact | impactSoft_medium_002 | 0.18 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 560 | `impact/impact-136-impactsoft-medium-003.mp3` | impact | impactSoft_medium_003 | 0.18 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 561 | `impact/impact-137-impactsoft-medium-004.mp3` | impact | impactSoft_medium_004 | 0.18 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 562 | `impact/impact-138-impacttin-medium-000.mp3` | impact | impactTin_medium_000 | 0.18 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 563 | `impact/impact-139-impacttin-medium-001.mp3` | impact | impactTin_medium_001 | 0.21 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 564 | `impact/impact-140-impacttin-medium-002.mp3` | impact | impactTin_medium_002 | 0.18 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 565 | `impact/impact-141-impacttin-medium-003.mp3` | impact | impactTin_medium_003 | 0.26 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 566 | `impact/impact-142-impacttin-medium-004.mp3` | impact | impactTin_medium_004 | 0.21 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 567 | `impact/impact-143-impactwood-heavy-000.mp3` | impact | impactWood_heavy_000 | 0.34 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 568 | `impact/impact-144-impactwood-heavy-001.mp3` | impact | impactWood_heavy_001 | 0.34 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 569 | `impact/impact-145-impactwood-heavy-002.mp3` | impact | impactWood_heavy_002 | 0.34 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 570 | `impact/impact-146-impactwood-heavy-003.mp3` | impact | impactWood_heavy_003 | 0.34 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 571 | `impact/impact-147-impactwood-heavy-004.mp3` | impact | impactWood_heavy_004 | 0.34 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 572 | `impact/impact-148-impactwood-light-000.mp3` | impact | impactWood_light_000 | 0.16 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 573 | `impact/impact-149-impactwood-light-001.mp3` | impact | impactWood_light_001 | 0.31 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 574 | `impact/impact-150-impactwood-light-002.mp3` | impact | impactWood_light_002 | 0.31 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 575 | `impact/impact-151-impactwood-light-003.mp3` | impact | impactWood_light_003 | 0.31 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 576 | `impact/impact-152-impactwood-light-004.mp3` | impact | impactWood_light_004 | 0.31 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 577 | `impact/impact-153-impactwood-medium-000.mp3` | impact | impactWood_medium_000 | 0.37 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 578 | `impact/impact-154-impactwood-medium-001.mp3` | impact | impactWood_medium_001 | 0.37 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 579 | `impact/impact-155-impactwood-medium-002.mp3` | impact | impactWood_medium_002 | 0.37 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 580 | `impact/impact-156-impactwood-medium-003.mp3` | impact | impactWood_medium_003 | 0.37 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 581 | `impact/impact-157-impactwood-medium-004.mp3` | impact | impactWood_medium_004 | 0.37 | Kenney · impact-sounds | https://kenney.nl/assets/impact-sounds |
| 582 | `card/card-001-card-fan-1.mp3` | card | card-fan-1 | 0.76 | Kenney · casino-audio | https://kenney.nl/assets/casino-audio |
| 583 | `card/card-002-card-fan-2.mp3` | card | card-fan-2 | 1.2 | Kenney · casino-audio | https://kenney.nl/assets/casino-audio |
| 584 | `card/card-003-card-place-1.mp3` | card | card-place-1 | 0.65 | Kenney · casino-audio | https://kenney.nl/assets/casino-audio |
| 585 | `card/card-004-card-place-2.mp3` | card | card-place-2 | 0.42 | Kenney · casino-audio | https://kenney.nl/assets/casino-audio |
| 586 | `card/card-005-card-place-3.mp3` | card | card-place-3 | 0.73 | Kenney · casino-audio | https://kenney.nl/assets/casino-audio |
| 587 | `card/card-006-card-place-4.mp3` | card | card-place-4 | 0.63 | Kenney · casino-audio | https://kenney.nl/assets/casino-audio |
| 588 | `card/card-007-card-shove-1.mp3` | card | card-shove-1 | 0.81 | Kenney · casino-audio | https://kenney.nl/assets/casino-audio |
| 589 | `card/card-008-card-shove-2.mp3` | card | card-shove-2 | 0.81 | Kenney · casino-audio | https://kenney.nl/assets/casino-audio |
| 590 | `card/card-009-card-shove-3.mp3` | card | card-shove-3 | 0.73 | Kenney · casino-audio | https://kenney.nl/assets/casino-audio |
| 591 | `card/card-010-card-shove-4.mp3` | card | card-shove-4 | 0.84 | Kenney · casino-audio | https://kenney.nl/assets/casino-audio |
| 592 | `card/card-011-card-shuffle.mp3` | card | card-shuffle | 1.59 | Kenney · casino-audio | https://kenney.nl/assets/casino-audio |
| 593 | `card/card-012-card-slide-1.mp3` | card | card-slide-1 | 0.55 | Kenney · casino-audio | https://kenney.nl/assets/casino-audio |
| 594 | `card/card-013-card-slide-2.mp3` | card | card-slide-2 | 0.63 | Kenney · casino-audio | https://kenney.nl/assets/casino-audio |
| 595 | `card/card-014-card-slide-3.mp3` | card | card-slide-3 | 0.63 | Kenney · casino-audio | https://kenney.nl/assets/casino-audio |
| 596 | `card/card-015-card-slide-4.mp3` | card | card-slide-4 | 0.5 | Kenney · casino-audio | https://kenney.nl/assets/casino-audio |
| 597 | `card/card-016-card-slide-5.mp3` | card | card-slide-5 | 0.63 | Kenney · casino-audio | https://kenney.nl/assets/casino-audio |
| 598 | `card/card-017-card-slide-6.mp3` | card | card-slide-6 | 0.63 | Kenney · casino-audio | https://kenney.nl/assets/casino-audio |
| 599 | `card/card-018-card-slide-7.mp3` | card | card-slide-7 | 0.68 | Kenney · casino-audio | https://kenney.nl/assets/casino-audio |
| 600 | `card/card-019-card-slide-8.mp3` | card | card-slide-8 | 0.71 | Kenney · casino-audio | https://kenney.nl/assets/casino-audio |
| 601 | `card/card-020-cards-pack-open-1.mp3` | card | cards-pack-open-1 | 0.97 | Kenney · casino-audio | https://kenney.nl/assets/casino-audio |
| 602 | `card/card-021-cards-pack-open-2.mp3` | card | cards-pack-open-2 | 0.78 | Kenney · casino-audio | https://kenney.nl/assets/casino-audio |
| 603 | `card/card-022-cards-pack-take-out-1.mp3` | card | cards-pack-take-out-1 | 0.52 | Kenney · casino-audio | https://kenney.nl/assets/casino-audio |
| 604 | `card/card-023-cards-pack-take-out-2.mp3` | card | cards-pack-take-out-2 | 0.68 | Kenney · casino-audio | https://kenney.nl/assets/casino-audio |
| 605 | `coin/coin-001-chip-lay-1.mp3` | coin | chip-lay-1 | 0.18 | Kenney · casino-audio | https://kenney.nl/assets/casino-audio |
| 606 | `coin/coin-002-chip-lay-2.mp3` | coin | chip-lay-2 | 0.26 | Kenney · casino-audio | https://kenney.nl/assets/casino-audio |
| 607 | `coin/coin-003-chip-lay-3.mp3` | coin | chip-lay-3 | 0.24 | Kenney · casino-audio | https://kenney.nl/assets/casino-audio |
| 608 | `coin/coin-004-chips-collide-1.mp3` | coin | chips-collide-1 | 0.18 | Kenney · casino-audio | https://kenney.nl/assets/casino-audio |
| 609 | `coin/coin-005-chips-collide-2.mp3` | coin | chips-collide-2 | 0.18 | Kenney · casino-audio | https://kenney.nl/assets/casino-audio |
| 610 | `coin/coin-006-chips-collide-3.mp3` | coin | chips-collide-3 | 0.16 | Kenney · casino-audio | https://kenney.nl/assets/casino-audio |
| 611 | `coin/coin-007-chips-collide-4.mp3` | coin | chips-collide-4 | 0.21 | Kenney · casino-audio | https://kenney.nl/assets/casino-audio |
| 612 | `coin/coin-008-chips-handle-1.mp3` | coin | chips-handle-1 | 0.63 | Kenney · casino-audio | https://kenney.nl/assets/casino-audio |
| 613 | `coin/coin-009-chips-handle-2.mp3` | coin | chips-handle-2 | 0.55 | Kenney · casino-audio | https://kenney.nl/assets/casino-audio |
| 614 | `coin/coin-010-chips-handle-3.mp3` | coin | chips-handle-3 | 0.26 | Kenney · casino-audio | https://kenney.nl/assets/casino-audio |
| 615 | `coin/coin-011-chips-handle-4.mp3` | coin | chips-handle-4 | 0.39 | Kenney · casino-audio | https://kenney.nl/assets/casino-audio |
| 616 | `coin/coin-012-chips-handle-5.mp3` | coin | chips-handle-5 | 0.86 | Kenney · casino-audio | https://kenney.nl/assets/casino-audio |
| 617 | `coin/coin-013-chips-handle-6.mp3` | coin | chips-handle-6 | 0.44 | Kenney · casino-audio | https://kenney.nl/assets/casino-audio |
| 618 | `coin/coin-014-chips-stack-1.mp3` | coin | chips-stack-1 | 0.16 | Kenney · casino-audio | https://kenney.nl/assets/casino-audio |
| 619 | `coin/coin-015-chips-stack-2.mp3` | coin | chips-stack-2 | 0.16 | Kenney · casino-audio | https://kenney.nl/assets/casino-audio |
| 620 | `coin/coin-016-chips-stack-3.mp3` | coin | chips-stack-3 | 0.39 | Kenney · casino-audio | https://kenney.nl/assets/casino-audio |
| 621 | `coin/coin-017-chips-stack-4.mp3` | coin | chips-stack-4 | 0.24 | Kenney · casino-audio | https://kenney.nl/assets/casino-audio |
| 622 | `coin/coin-018-chips-stack-5.mp3` | coin | chips-stack-5 | 0.18 | Kenney · casino-audio | https://kenney.nl/assets/casino-audio |
| 623 | `coin/coin-019-chips-stack-6.mp3` | coin | chips-stack-6 | 0.16 | Kenney · casino-audio | https://kenney.nl/assets/casino-audio |
| 624 | `impact/impact-158-dice-grab-1.mp3` | impact | dice-grab-1 | 0.73 | Kenney · casino-audio | https://kenney.nl/assets/casino-audio |
| 625 | `impact/impact-159-dice-grab-2.mp3` | impact | dice-grab-2 | 0.78 | Kenney · casino-audio | https://kenney.nl/assets/casino-audio |
| 626 | `impact/impact-160-dice-shake-1.mp3` | impact | dice-shake-1 | 1.36 | Kenney · casino-audio | https://kenney.nl/assets/casino-audio |
| 627 | `impact/impact-161-dice-shake-2.mp3` | impact | dice-shake-2 | 1.33 | Kenney · casino-audio | https://kenney.nl/assets/casino-audio |
| 628 | `impact/impact-162-dice-shake-3.mp3` | impact | dice-shake-3 | 1.54 | Kenney · casino-audio | https://kenney.nl/assets/casino-audio |
| 629 | `impact/impact-163-dice-throw-1.mp3` | impact | dice-throw-1 | 0.63 | Kenney · casino-audio | https://kenney.nl/assets/casino-audio |
| 630 | `impact/impact-164-dice-throw-2.mp3` | impact | dice-throw-2 | 0.44 | Kenney · casino-audio | https://kenney.nl/assets/casino-audio |
| 631 | `impact/impact-165-dice-throw-3.mp3` | impact | dice-throw-3 | 0.63 | Kenney · casino-audio | https://kenney.nl/assets/casino-audio |
| 632 | `impact/impact-166-die-throw-1.mp3` | impact | die-throw-1 | 0.42 | Kenney · casino-audio | https://kenney.nl/assets/casino-audio |
| 633 | `impact/impact-167-die-throw-2.mp3` | impact | die-throw-2 | 0.63 | Kenney · casino-audio | https://kenney.nl/assets/casino-audio |
| 634 | `impact/impact-168-die-throw-3.mp3` | impact | die-throw-3 | 0.68 | Kenney · casino-audio | https://kenney.nl/assets/casino-audio |
| 635 | `impact/impact-169-die-throw-4.mp3` | impact | die-throw-4 | 0.39 | Kenney · casino-audio | https://kenney.nl/assets/casino-audio |
| 636 | `tech/tech-085-computernoise-000.mp3` | tech | computerNoise_000 | 3.03 | Kenney · sci-fi-sounds | https://kenney.nl/assets/sci-fi-sounds |
| 637 | `tech/tech-086-computernoise-001.mp3` | tech | computerNoise_001 | 3.03 | Kenney · sci-fi-sounds | https://kenney.nl/assets/sci-fi-sounds |
| 638 | `tech/tech-087-computernoise-002.mp3` | tech | computerNoise_002 | 3.03 | Kenney · sci-fi-sounds | https://kenney.nl/assets/sci-fi-sounds |
| 639 | `tech/tech-088-computernoise-003.mp3` | tech | computerNoise_003 | 3.03 | Kenney · sci-fi-sounds | https://kenney.nl/assets/sci-fi-sounds |
| 640 | `tech/tech-095-forcefield-000.mp3` | tech | forceField_000 | 0.84 | Kenney · sci-fi-sounds | https://kenney.nl/assets/sci-fi-sounds |
| 641 | `tech/tech-096-forcefield-001.mp3` | tech | forceField_001 | 0.84 | Kenney · sci-fi-sounds | https://kenney.nl/assets/sci-fi-sounds |
| 642 | `tech/tech-097-forcefield-002.mp3` | tech | forceField_002 | 0.84 | Kenney · sci-fi-sounds | https://kenney.nl/assets/sci-fi-sounds |
| 643 | `tech/tech-098-forcefield-003.mp3` | tech | forceField_003 | 0.84 | Kenney · sci-fi-sounds | https://kenney.nl/assets/sci-fi-sounds |
| 644 | `tech/tech-099-forcefield-004.mp3` | tech | forceField_004 | 0.84 | Kenney · sci-fi-sounds | https://kenney.nl/assets/sci-fi-sounds |
| 645 | `tech/tech-100-impactmetal-000.mp3` | tech | impactMetal_000 | 0.68 | Kenney · sci-fi-sounds | https://kenney.nl/assets/sci-fi-sounds |
| 646 | `tech/tech-101-impactmetal-001.mp3` | tech | impactMetal_001 | 0.73 | Kenney · sci-fi-sounds | https://kenney.nl/assets/sci-fi-sounds |
| 647 | `tech/tech-102-impactmetal-002.mp3` | tech | impactMetal_002 | 0.52 | Kenney · sci-fi-sounds | https://kenney.nl/assets/sci-fi-sounds |
| 648 | `tech/tech-103-impactmetal-003.mp3` | tech | impactMetal_003 | 0.81 | Kenney · sci-fi-sounds | https://kenney.nl/assets/sci-fi-sounds |
| 649 | `tech/tech-104-impactmetal-004.mp3` | tech | impactMetal_004 | 0.42 | Kenney · sci-fi-sounds | https://kenney.nl/assets/sci-fi-sounds |
| 650 | `tech/tech-105-laserlarge-000.mp3` | tech | laserLarge_000 | 0.71 | Kenney · sci-fi-sounds | https://kenney.nl/assets/sci-fi-sounds |
| 651 | `tech/tech-106-laserlarge-001.mp3` | tech | laserLarge_001 | 0.76 | Kenney · sci-fi-sounds | https://kenney.nl/assets/sci-fi-sounds |
| 652 | `tech/tech-107-laserlarge-002.mp3` | tech | laserLarge_002 | 0.78 | Kenney · sci-fi-sounds | https://kenney.nl/assets/sci-fi-sounds |
| 653 | `tech/tech-108-laserlarge-003.mp3` | tech | laserLarge_003 | 0.6 | Kenney · sci-fi-sounds | https://kenney.nl/assets/sci-fi-sounds |
| 654 | `tech/tech-109-laserlarge-004.mp3` | tech | laserLarge_004 | 0.73 | Kenney · sci-fi-sounds | https://kenney.nl/assets/sci-fi-sounds |
| 655 | `tech/tech-110-laserretro-000.mp3` | tech | laserRetro_000 | 0.26 | Kenney · sci-fi-sounds | https://kenney.nl/assets/sci-fi-sounds |
| 656 | `tech/tech-111-laserretro-001.mp3` | tech | laserRetro_001 | 0.29 | Kenney · sci-fi-sounds | https://kenney.nl/assets/sci-fi-sounds |
| 657 | `tech/tech-112-laserretro-002.mp3` | tech | laserRetro_002 | 0.29 | Kenney · sci-fi-sounds | https://kenney.nl/assets/sci-fi-sounds |
| 658 | `tech/tech-113-laserretro-003.mp3` | tech | laserRetro_003 | 0.29 | Kenney · sci-fi-sounds | https://kenney.nl/assets/sci-fi-sounds |
| 659 | `tech/tech-114-laserretro-004.mp3` | tech | laserRetro_004 | 0.29 | Kenney · sci-fi-sounds | https://kenney.nl/assets/sci-fi-sounds |
| 660 | `tech/tech-115-lasersmall-000.mp3` | tech | laserSmall_000 | 0.29 | Kenney · sci-fi-sounds | https://kenney.nl/assets/sci-fi-sounds |
| 661 | `tech/tech-116-lasersmall-001.mp3` | tech | laserSmall_001 | 0.29 | Kenney · sci-fi-sounds | https://kenney.nl/assets/sci-fi-sounds |
| 662 | `tech/tech-117-lasersmall-002.mp3` | tech | laserSmall_002 | 0.39 | Kenney · sci-fi-sounds | https://kenney.nl/assets/sci-fi-sounds |
| 663 | `tech/tech-118-lasersmall-003.mp3` | tech | laserSmall_003 | 0.34 | Kenney · sci-fi-sounds | https://kenney.nl/assets/sci-fi-sounds |
| 664 | `tech/tech-119-lasersmall-004.mp3` | tech | laserSmall_004 | 0.44 | Kenney · sci-fi-sounds | https://kenney.nl/assets/sci-fi-sounds |
| 665 | `tech/tech-120-slime-000.mp3` | tech | slime_000 | 0.55 | Kenney · sci-fi-sounds | https://kenney.nl/assets/sci-fi-sounds |
| 666 | `tech/tech-121-slime-001.mp3` | tech | slime_001 | 3.03 | Kenney · sci-fi-sounds | https://kenney.nl/assets/sci-fi-sounds |

## 17.4 `baixar_mixkit.py` (baixa e trata os sons Mixkit do catálogo; coloque o `catalog.json` ao lado, gerado a partir da tabela 17.3)

```python
"""Baixa de novo (do próprio Mixkit) os sons Mixkit do catálogo que não estão no disco e aplica o mesmo
tratamento da biblioteca (corte de silêncio, duração máxima, pico −3 dBFS). Os arquivos Mixkit não vão para o
git (a licença não permite redistribuir os sons soltos). Uso: python3 motion-style/sfx-library/baixar_mixkit.py"""
import json, os, re, subprocess, urllib.request
HERE = os.path.dirname(os.path.abspath(__file__))
MAXDUR = {"whoosh": 3.0, "pop": 1.6, "click": 1.2, "ui": 1.6, "notify": 3.0, "typing": 4.0, "riser": 6.0, "impact": 3.0,
          "glitch": 2.5, "shutter": 2.0, "tech": 3.0, "sparkle": 3.5, "cartoon": 2.5, "card": 1.6, "coin": 2.5, "slide": 2.0}
cat = json.load(open(os.path.join(HERE, "catalog.json")))
n = 0
for c in cat:
    if c["source"] != "Mixkit": continue
    out = os.path.join(HERE, c["file"])
    if os.path.exists(out): continue
    i = re.search(r"id (\d+)", c["origin"]).group(1)
    os.makedirs(os.path.dirname(out), exist_ok=True)
    raw = out + ".src.mp3"
    req = urllib.request.Request(f"https://assets.mixkit.co/active_storage/sfx/{i}/{i}-preview.mp3", headers={"User-Agent": "Mozilla/5.0"})
    open(raw, "wb").write(urllib.request.urlopen(req, timeout=60).read())
    md = MAXDUR.get(c["category"], 3.0); tmp = out + ".tmp.wav"
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", raw, "-af", f"silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.01,atrim=0:{md},afade=t=out:st={max(0, md - 0.08)}:d=0.08", "-ar", "44100", "-ac", "2", tmp], check=True)
    r = subprocess.run(["ffmpeg", "-hide_banner", "-i", tmp, "-af", "volumedetect", "-f", "null", "-"], capture_output=True, text=True)
    pk = float(re.search(r"max_volume: (-?[\d.]+) dB", r.stderr).group(1))
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", tmp, "-af", f"volume={-3.0 - pk:.2f}dB,areverse,silenceremove=start_periods=1:start_threshold=-60dB,areverse", "-c:a", "libmp3lame", "-b:a", "160k", out], check=True)
    os.remove(tmp); os.remove(raw); n += 1
print(f"OK: {n} sons Mixkit baixados")
```

## 17.5 `build_sfx.py` (reconstrói a biblioteca: pacotes Kenney + prévias Mixkit, normalização)

```python
"""Monta a biblioteca de SFX do estúdio a partir de Kenney (CC0) e Mixkit (Mixkit Free License)."""
import json, os, re, subprocess, sys, glob, unicodedata
W = sys.argv[1]; OUT = sys.argv[2]
MAXDUR = {"whoosh": 3.0, "pop": 1.6, "click": 1.2, "ui": 1.6, "notify": 3.0, "typing": 4.0, "riser": 6.0, "impact": 3.0,
          "glitch": 2.5, "shutter": 2.0, "tech": 3.0, "sparkle": 3.5, "cartoon": 2.5, "card": 1.6, "coin": 2.5, "slide": 2.0}
def slug(s):
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode().lower()
    return re.sub(r"[^a-z0-9]+", "-", s).strip("-")[:40] or "sfx"
def dur(p):
    r = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", p], capture_output=True, text=True)
    try: return float(r.stdout.strip())
    except: return 0.0
def peak(p):
    r = subprocess.run(["ffmpeg", "-hide_banner", "-i", p, "-af", "volumedetect", "-f", "null", "-"], capture_output=True, text=True)
    m = re.search(r"max_volume: (-?[\d.]+) dB", r.stderr); return float(m.group(1)) if m else 0.0
jobs = []
# Mixkit
mk = json.load(open(f"{W}/mixkit/items.json"))
MKCAT = {"whoosh": "whoosh", "transition": "whoosh", "swoosh": "whoosh", "swipe": "whoosh", "pop": "pop", "bubble": "pop", "click": "click",
         "interface": "ui", "notification": "notify", "typing": "typing", "riser": "riser", "impact": "impact", "glitch": "glitch",
         "camera-shutter": "shutter", "technology": "tech", "magic": "sparkle", "cartoon": "cartoon", "swell": "riser", "reverse": "riser", "zoom": "whoosh", "slide": "slide", "boom": "impact", "drop": "impact"}
for i, v in mk.items():
    t = v["title"]; cat = MKCAT[v["cat"]]; tl = t.lower()
    if re.search(r"whoosh|swoosh|swish|swipe|transition|woosh", tl) and cat not in ("riser", "slide"): cat = "whoosh"
    elif re.search(r"\bpop\b|bubble", tl): cat = "pop"
    elif re.search(r"typing|keyboard|typewriter", tl): cat = "typing"
    elif re.search(r"shutter|camera", tl): cat = "shutter"
    jobs.append(dict(src=f"{W}/mixkit/mp3/{i}-preview.mp3", cat=cat, title=t, source="Mixkit", license="Mixkit Sound Effects Free License (uso comercial, sem atribuição)", url=f"https://mixkit.co/free-sound-effects/ (id {i})"))
# Kenney
KMAP = {"interface-sounds": "ui", "ui-audio": "click", "digital-audio": "tech", "impact-sounds": "impact", "casino-audio": "card", "sci-fi-sounds": "tech"}
for pack, cat in KMAP.items():
    for f in sorted(glob.glob(f"{W}/kenney/{pack}/**/*.ogg", recursive=True)):
        n = os.path.basename(f)[:-4]; nl = n.lower(); c = cat
        if pack == "impact-sounds" and re.search(r"footstep", nl): continue
        if pack == "casino-audio":
            if re.search(r"chip", nl): c = "coin"
            elif re.search(r"die|dice", nl): c = "impact"
        if pack == "sci-fi-sounds" and re.search(r"engine|thruster|spaceEngine|explosion", n, re.I): continue
        if re.search(r"switch|toggle", nl): c = "ui"
        jobs.append(dict(src=f, cat=c, title=n, source=f"Kenney · {pack}", license="CC0 1.0 (domínio público)", url=f"https://kenney.nl/assets/{pack}"))
cat_count = {}; catalog = []
for j in jobs:
    d = dur(j["src"])
    if d <= 0.03: continue
    if j["cat"] not in ("riser", "typing") and d > 8: continue  # trilhas/ambiências longas ficam de fora
    cat_count[j["cat"]] = cat_count.get(j["cat"], 0) + 1
    n = cat_count[j["cat"]]
    os.makedirs(f"{OUT}/{j['cat']}", exist_ok=True)
    out = f"{OUT}/{j['cat']}/{j['cat']}-{n:03d}-{slug(j['title'])}.mp3"
    md = MAXDUR.get(j["cat"], 3.0)
    tmp = out + ".tmp.wav"
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", j["src"], "-af",
                    f"silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.01,atrim=0:{md},afade=t=out:st={max(0, md - 0.08)}:d=0.08",
                    "-ar", "44100", "-ac", "2", tmp], check=True)
    pk = peak(tmp); g = -3.0 - pk
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", tmp, "-af", f"volume={g:.2f}dB,areverse,silenceremove=start_periods=1:start_threshold=-60dB,areverse",
                    "-c:a", "libmp3lame", "-b:a", "160k", out], check=True)
    os.remove(tmp)
    catalog.append(dict(file=os.path.relpath(out, OUT), category=j["cat"], title=j["title"], duration=round(dur(out), 2), source=j["source"], license=j["license"], origin=j["url"]))
json.dump(catalog, open(f"{OUT}/catalog.json", "w"), ensure_ascii=False, indent=1)
print(len(catalog)); print(json.dumps(cat_count, indent=0))
```

## 17.6 Categorias e uso

| categoria | total | no kit | uso |
|---|---|---|---|
| `impact` | 140 | 15 | batidas de revelação, logo, freada |
| `tech` | 113 | 0 | digital, dados, laser leve |
| `ui` | 89 | 20 | toggles, confirmações, abrir/fechar |
| `whoosh` | 81 | 30 | passagens, chicotes, zooms, swipes |
| `click` | 38 | 25 | cliques e toques |
| `riser` | 25 | 12 | subidas e swells antes da revelação |
| `glitch` | 24 | 8 | cortes digitais |
| `card` | 23 | 5 | cartas deslizando (cards) |
| `pop` | 22 | 20 | pops e bolhas |
| `typing` | 21 | 8 | digitação |
| `sparkle` | 20 | 8 | brilhos e varreduras |
| `cartoon` | 19 | 0 | boing e efeitos divertidos |
| `notify` | 19 | 12 | notificações, mensagens, alertas |
| `coin` | 19 | 5 | fichas/moedas (dinheiro) |
| `shutter` | 8 | 4 | obturador de câmera |
| `slide` | 5 | 5 | deslizes |
