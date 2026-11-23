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
