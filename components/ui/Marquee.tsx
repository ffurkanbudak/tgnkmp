"use client";

import { useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Continuous horizontal track. The children are rendered twice and the rail
 * translates exactly -50%, so the seam is invisible. Hovering anywhere on the
 * rail pauses it — visitors can stop and actually read a quote.
 */
export function Marquee({
  children,
  duration = 64,
  reverse = false,
  className = "",
  fade = true,
}: {
  children: ReactNode;
  /** Seconds for one full pass. Longer = calmer. */
  duration?: number;
  reverse?: boolean;
  className?: string;
  /** Kenarlarda yumuşak geçiş. Kenardan kenara bantlarda kapatılır. */
  fade?: boolean;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div className={`overflow-x-auto ${className}`}>
        <div className="flex w-max gap-6 px-6 md:gap-8">{children}</div>
      </div>
    );
  }

  return (
    <div
      className={`group/marquee overflow-hidden ${fade ? "mask-edges" : ""} ${className}`}
    >
      {/* No gap on the track itself: each half carries a trailing gap instead,
          so the two halves are exactly equal and -50% lands on a clean seam. */}
      <div
        className="flex w-max animate-[tk-marquee_linear_infinite] will-change-transform group-hover/marquee:[animation-play-state:paused]"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        <div className="flex shrink-0 gap-6 pe-6 md:gap-8 md:pe-8">{children}</div>
        <div className="flex shrink-0 gap-6 pe-6 md:gap-8 md:pe-8" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
