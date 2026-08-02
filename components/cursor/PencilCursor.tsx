"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * The brand signature: the pointer becomes a sharpened wooden pencil.
 *
 * - The graphite tip sits exactly on the hotspot; the barrel pivots around it.
 * - Interactive elements straighten the pencil, as if lifted to write.
 * - A click leaves a short graphite stroke that fades.
 *
 * Only mounts on devices with a precise, hovering pointer. When the visitor
 * prefers reduced motion the pencil still renders, but tracks instantly and
 * leaves no marks.
 */

const INTERACTIVE =
  'a, button, input, select, textarea, label, summary, [role="button"], [role="tab"], [tabindex]:not([tabindex="-1"])';

const TIP_X = 9;
const TIP_Y = 56;

const REST_ROTATION = 30;
const WRITING_ROTATION = 17;

type Mark = { id: number; x: number; y: number; tilt: number; variant: number };

export function PencilCursor() {
  const [enabled, setEnabled] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [visible, setVisible] = useState(false);
  const [writing, setWriting] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [marks, setMarks] = useState<Mark[]>([]);
  const markId = useRef(0);

  /* -- capability + preference gate ------------------------------------- */
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => {
      setEnabled(fine.matches);
      setReduced(motion.matches);
    };
    sync();

    fine.addEventListener("change", sync);
    motion.addEventListener("change", sync);
    return () => {
      fine.removeEventListener("change", sync);
      motion.removeEventListener("change", sync);
    };
  }, []);

  /* -- hide the native cursor only while ours is live -------------------- */
  useEffect(() => {
    const root = document.documentElement;
    if (enabled) root.classList.add("has-pencil-cursor");
    else root.classList.remove("has-pencil-cursor");
    return () => root.classList.remove("has-pencil-cursor");
  }, [enabled]);

  /* -- position ---------------------------------------------------------- */
  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);
  const rawRotate = useMotionValue(REST_ROTATION);

  const springCfg = { stiffness: 1500, damping: 75, mass: 0.32 };
  const x = useSpring(rawX, reduced ? { duration: 0 } : springCfg);
  const y = useSpring(rawY, reduced ? { duration: 0 } : springCfg);
  const rotate = useSpring(rawRotate, { stiffness: 280, damping: 24, mass: 0.6 });

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: PointerEvent) => {
      rawX.set(e.clientX - TIP_X);
      rawY.set(e.clientY - TIP_Y);
      setVisible(true);
    };

    const onOver = (e: PointerEvent) => {
      const target = e.target as Element | null;
      setWriting(Boolean(target?.closest?.(INTERACTIVE)));
    };

    const onDown = (e: PointerEvent) => {
      setPressed(true);
      if (reduced) return;
      const id = markId.current++;
      setMarks((prev) => [
        ...prev.slice(-4),
        {
          id,
          x: e.clientX,
          y: e.clientY,
          tilt: -14 + Math.random() * 28,
          variant: id % 3,
        },
      ]);
      window.setTimeout(() => {
        setMarks((prev) => prev.filter((m) => m.id !== id));
      }, 900);
    };

    const onUp = () => setPressed(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerenter", onEnter);
    window.addEventListener("blur", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerenter", onEnter);
      window.removeEventListener("blur", onLeave);
    };
  }, [enabled, reduced, rawX, rawY]);

  /* -- tilt reacts to hover + press -------------------------------------- */
  useEffect(() => {
    const target = writing ? WRITING_ROTATION : REST_ROTATION;
    rawRotate.set(pressed ? target + 7 : target);
  }, [writing, pressed, rawRotate]);

  if (!enabled) return null;

  return (
    <>
      {/* graphite marks left by clicks */}
      <div className="pointer-events-none fixed inset-0 z-[95]" aria-hidden="true">
        <AnimatePresence>
          {marks.map((mark) => (
            <GraphiteMark key={mark.id} mark={mark} />
          ))}
        </AnimatePresence>
      </div>

      {/* the pencil */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[96] h-[56px] w-[18px] will-change-transform"
        style={{
          x,
          y,
          rotate,
          transformOrigin: `${TIP_X}px ${TIP_Y}px`,
          opacity: visible ? 1 : 0,
          transition: "opacity 220ms var(--ease-out-expo)",
        }}
      >
        <PencilArt />
      </motion.div>
    </>
  );
}

/* -------------------------------------------------------------------------- */

function PencilArt() {
  return (
    <svg
      width="18"
      height="56"
      viewBox="0 0 18 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(1.5px 3px 4px rgba(7,12,22,0.32))" }}
    >
      <defs>
        <linearGradient id="tk-wood" x1="4.2" y1="0" x2="13.8" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#B98A55" />
          <stop offset="0.16" stopColor="#E6C89C" />
          <stop offset="0.42" stopColor="#F2DCBB" />
          <stop offset="0.72" stopColor="#D2A972" />
          <stop offset="1" stopColor="#A87B49" />
        </linearGradient>
        <linearGradient id="tk-bare" x1="4.2" y1="0" x2="13.8" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#D9B27A" />
          <stop offset="0.35" stopColor="#F6E7CE" />
          <stop offset="1" stopColor="#C99F6C" />
        </linearGradient>
        <linearGradient id="tk-metal" x1="4.2" y1="0" x2="13.8" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7E8794" />
          <stop offset="0.3" stopColor="#D5DAE1" />
          <stop offset="0.62" stopColor="#9AA3B0" />
          <stop offset="1" stopColor="#6D7784" />
        </linearGradient>
        <linearGradient id="tk-eraser" x1="4.6" y1="0" x2="13.4" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#D3BDB6" />
          <stop offset="0.4" stopColor="#EFE0DA" />
          <stop offset="1" stopColor="#C7ADA5" />
        </linearGradient>
        <linearGradient id="tk-graphite" x1="7" y1="51" x2="11" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#39435A" />
          <stop offset="1" stopColor="#0D1526" />
        </linearGradient>
      </defs>

      {/* eraser */}
      <path
        d="M4.6 3.4A3.4 3.4 0 0 1 8 0h2a3.4 3.4 0 0 1 3.4 3.4V7.6H4.6V3.4Z"
        fill="url(#tk-eraser)"
      />
      {/* ferrule */}
      <rect x="4.2" y="6.6" width="9.6" height="6.2" fill="url(#tk-metal)" />
      <path d="M4.2 8.4h9.6M4.2 11h9.6" stroke="#5F6875" strokeOpacity="0.45" strokeWidth="0.6" />
      {/* brand band */}
      <rect x="4.2" y="12.6" width="9.6" height="2.6" fill="#E01F27" />
      {/* barrel */}
      <rect x="4.2" y="15.2" width="9.6" height="25.6" fill="url(#tk-wood)" />
      {/* hex facets */}
      <path d="M7.4 15.2v25.6M10.9 15.2v25.6" stroke="#7A5730" strokeOpacity="0.22" strokeWidth="0.55" />
      <path d="M5.9 15.2v25.6" stroke="#FFFFFF" strokeOpacity="0.34" strokeWidth="1.1" />
      {/* sharpened cone */}
      <path d="M4.2 40.8h9.6L10.2 51.2H7.8L4.2 40.8Z" fill="url(#tk-bare)" />
      <path d="M7.4 40.8 8.4 51.2M10.9 40.8 9.8 51.2" stroke="#B98A55" strokeOpacity="0.3" strokeWidth="0.5" />
      {/* graphite */}
      <path d="M7.8 51.2h2.4L9 56l-1.2-4.8Z" fill="url(#tk-graphite)" />
      {/* contact edges */}
      <path
        d="M4.2 15.2v25.6M13.8 15.2v25.6"
        stroke="#6E4E2B"
        strokeOpacity="0.35"
        strokeWidth="0.5"
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */

const STROKES = [
  "M2 12C7 3 12 18 18 9c4-6 8 4 12-1",
  "M2 10c6 6 11-8 16-1 3 4 8 1 12-3",
  "M2 13c5-9 9 6 15 0 4-4 9 2 13-2",
];

function GraphiteMark({ mark }: { mark: Mark }) {
  return (
    <motion.svg
      width="34"
      height="20"
      viewBox="0 0 34 20"
      fill="none"
      className="absolute"
      style={{
        left: mark.x - 4,
        top: mark.y - 6,
        rotate: mark.tilt,
      }}
      initial={{ opacity: 0.72 }}
      animate={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.85, times: [0, 1], ease: "easeIn", delay: 0.15 }}
    >
      <motion.path
        d={STROKES[mark.variant]}
        stroke="#0D1526"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.svg>
  );
}
