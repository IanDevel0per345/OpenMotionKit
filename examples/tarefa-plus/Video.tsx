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
