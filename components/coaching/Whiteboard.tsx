"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

/**
 * Akademik Koçluk bölümündeki beyaz tahta.
 *
 * - Boştayken haftalık planı kendi kendine çizer.
 * - İmleç tahtanın dışındayken pano hafifçe eğilir (perspektif); içine
 *   girdiğinde düzleşir, böylece kalem izi tam imlecin altına düşer.
 * - Alttaki iki kalemden biri seçilerek üzerine yazılabilir.
 */

const INKS = [
  { id: "navy", label: "Lacivert kalem", color: "#1A2A4A" },
  { id: "red", label: "Kırmızı kalem", color: "#E01F27" },
] as const;

type InkId = (typeof INKS)[number]["id"];

/** Boştayken çizilen "haftalık plan" taslağı. */
const DEMO = [
  { d: "M52 62 h24 v24 h-24 Z", dur: 0.34, ink: "navy" },
  { d: "M92 74 h148", dur: 0.42, ink: "navy" },
  { d: "M58 74 l6 7 l13 -16", dur: 0.26, ink: "red" },
  { d: "M52 108 h24 v24 h-24 Z", dur: 0.34, ink: "navy" },
  { d: "M92 120 h122", dur: 0.38, ink: "navy" },
  { d: "M58 120 l6 7 l13 -16", dur: 0.26, ink: "red" },
  { d: "M52 154 h24 v24 h-24 Z", dur: 0.34, ink: "navy" },
  { d: "M92 166 h158", dur: 0.42, ink: "navy" },
  { d: "M52 206 C 110 198, 190 214, 258 202", dur: 0.6, ink: "red" },
] as const;

export function Whiteboard({ className = "" }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);

  const [ink, setInk] = useState<InkId>("navy");
  const [touched, setTouched] = useState(false);
  const [hasMarks, setHasMarks] = useState(false);
  const reduced = useReducedMotion();

  /* -- 3B eğim ------------------------------------------------------------ */
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 110, damping: 20, mass: 0.7 };
  const rotateY = useSpring(useTransform(px, [-1, 1], [10, -10]), spring);
  const rotateX = useSpring(useTransform(py, [-1, 1], [-7, 7]), spring);

  const flatten = useCallback(() => {
    px.set(0);
    py.set(0);
  }, [px, py]);

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: PointerEvent) => {
      const el = wrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const inside =
        e.clientX >= r.left &&
        e.clientX <= r.right &&
        e.clientY >= r.top &&
        e.clientY <= r.bottom;
      if (inside) {
        flatten();
        return;
      }
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      px.set(Math.max(-1, Math.min(1, (e.clientX - cx) / (r.width * 1.7))));
      py.set(Math.max(-1, Math.min(1, (e.clientY - cy) / (r.height * 1.7))));
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [flatten, px, py, reduced]);

  /* -- tuval ölçeği -------------------------------------------------------- */
  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const w = wrap.clientWidth;
    const h = wrap.clientHeight;
    if (w === 0 || h === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const previous = canvas.width > 0 ? canvas.toDataURL() : null;

    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (previous) {
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0, w, h);
      img.src = previous;
    }
  }, []);

  useEffect(() => {
    resize();
    const wrap = wrapRef.current;
    if (!wrap) return;
    const observer = new ResizeObserver(resize);
    observer.observe(wrap);
    return () => observer.disconnect();
  }, [resize]);

  /* -- kalem izi ----------------------------------------------------------- */
  const stroke = useCallback(
    (from: { x: number; y: number }, to: { x: number; y: number }) => {
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx) return;
      const color = INKS.find((i) => i.id === ink)?.color ?? "#1A2A4A";

      ctx.globalAlpha = 0.92;
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();
      ctx.globalAlpha = 1;
    },
    [ink],
  );

  const pointFrom = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    flatten();
    e.currentTarget.setPointerCapture(e.pointerId);
    drawing.current = true;
    setTouched(true);
    setHasMarks(true);
    const p = pointFrom(e);
    last.current = p;
    stroke(p, { x: p.x + 0.01, y: p.y + 0.01 });
  };

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current || !last.current) return;
    const p = pointFrom(e);
    stroke(last.current, p);
    last.current = p;
  };

  const endStroke = () => {
    drawing.current = false;
    last.current = null;
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasMarks(false);
  };

  return (
    <div className={`[perspective:1400px] ${className}`}>
      <motion.div
        style={reduced ? undefined : { rotateX, rotateY }}
        className="relative w-full [transform-style:preserve-3d]"
      >
        {/* zemine düşen gölge */}
        <div
          aria-hidden="true"
          className="absolute inset-x-8 bottom-0 h-7 rounded-[50%] bg-navy-950/45 blur-2xl"
          style={{ transform: "translateZ(-40px)" }}
        />

        {/* alüminyum çerçeve */}
        <div className="relative rounded-[16px] bg-[linear-gradient(150deg,#EDEFF3_0%,#C9CFD8_22%,#9AA3B0_52%,#C9CFD8_78%,#E4E7EC_100%)] p-[6px] shadow-[0_1px_0_rgba(255,255,255,0.7)_inset,0_-2px_2px_rgba(0,0,0,0.22)_inset,0_26px_50px_-26px_rgba(7,12,22,0.7)]">
          <div className="rounded-[11px] bg-[linear-gradient(150deg,#8A929E_0%,#B4BBC5_45%,#79818D_100%)] p-[4px]">
            {/* yazma yüzeyi */}
            <div
              ref={wrapRef}
              className="relative aspect-[4/3] w-full touch-none overflow-hidden rounded-[8px] bg-[linear-gradient(160deg,#FFFFFF_0%,#FAFBFC_45%,#F2F4F7_100%)] shadow-[inset_0_2px_10px_rgba(13,21,38,0.10)]"
            >
              {/* cam parlaması */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(116deg,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0.25)_22%,transparent_46%)]"
              />

              {/* kendi kendine çizilen haftalık plan */}
              <AnimatePresence>
                {!touched && !reduced && (
                  <motion.svg
                    key="demo"
                    viewBox="0 0 320 240"
                    preserveAspectRatio="xMidYMid meet"
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 h-full w-full"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    {DEMO.map((s, i) => {
                      const delay =
                        0.8 + DEMO.slice(0, i).reduce((a, b) => a + b.dur + 0.08, 0);
                      return (
                        <motion.path
                          key={s.d}
                          d={s.d}
                          fill="none"
                          stroke={s.ink === "red" ? "#E01F27" : "#1A2A4A"}
                          strokeWidth={3}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          opacity={0.9}
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: s.dur, delay, ease: "easeInOut" }}
                        />
                      );
                    })}
                  </motion.svg>
                )}
              </AnimatePresence>

              <canvas
                ref={canvasRef}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={endStroke}
                onPointerLeave={endStroke}
                onPointerCancel={endStroke}
                className="absolute inset-0 h-full w-full touch-none"
                role="img"
                aria-label="Kalemle üzerine yazabileceğiniz beyaz tahta"
              />

              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3.5">
                <AnimatePresence>
                  {!touched && (
                    <motion.p
                      key="hint"
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.35 }}
                      className="text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-navy-300"
                    >
                      Tahtaya yazmayı deneyin
                    </motion.p>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {hasMarks && (
                    <motion.button
                      key="clear"
                      type="button"
                      onClick={clear}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="pointer-events-auto ms-auto rounded-[9px] border border-line bg-paper/90 px-3 py-1.5 text-[0.6875rem] font-semibold tracking-[-0.01em] text-navy-700 backdrop-blur-sm transition-colors duration-300 hover:border-navy-900/30 hover:text-navy-950"
                    >
                      Tahtayı sil
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* kalemlik */}
        <div className="relative mx-5 flex h-[16px] items-center justify-center gap-2 rounded-b-[9px] bg-[linear-gradient(180deg,#DFE3E9_0%,#B4BBC5_45%,#8A929E_100%)] shadow-[0_1px_0_rgba(255,255,255,0.6)_inset,0_10px_16px_-12px_rgba(7,12,22,0.8)]">
          {INKS.map((pen) => {
            const selected = ink === pen.id;
            return (
              <button
                key={pen.id}
                type="button"
                onClick={() => setInk(pen.id)}
                aria-pressed={selected}
                aria-label={pen.label}
                className="group/pen relative -mt-2 grid h-6 w-14 place-items-center"
              >
                <span
                  className={`block h-[9px] w-full rounded-[3px] transition-transform duration-300 ease-[var(--ease-out-expo)] ${
                    selected ? "-translate-y-1 scale-[1.03]" : "group-hover/pen:-translate-y-0.5"
                  }`}
                  style={{
                    background: `linear-gradient(180deg, ${pen.color} 0%, ${pen.color} 62%, rgba(0,0,0,0.35) 100%)`,
                    boxShadow: selected
                      ? "0 4px 10px -4px rgba(7,12,22,0.85)"
                      : "0 2px 5px -3px rgba(7,12,22,0.7)",
                  }}
                />
              </button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
