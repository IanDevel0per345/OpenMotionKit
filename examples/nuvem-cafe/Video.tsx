import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useVideoConfig } from "remotion";
import T from "../public/audio/voiceover-timings.json";
import {
  Center, E, F, FONT, Hand, Letters, PhoneOutline, Pill, Scene, Underline, Words, W, H,
  ip, popStyle, prog, slideStyle, useSec,
} from "./lib";

/* Nuvem Café (MARCA FICTÍCIA, demo OpenMotion) · 9:16 · terracota e branco
   Câmera suave focando os itens · sem círculo/mancha · ênfase = palavra maior · 1 pílula · som sem excesso */
const BG = "#FFFFFF", AC = "#E4572E", ACD = "#C4421D", INK = "#111111", MUTE = "#9A9AA3", SOFT = "#F4F4F6", LIGHT = "#FDEEE9";
const WATERMARK = "OpenMotion";

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
