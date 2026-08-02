"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Seconds of delay — used to stagger siblings. */
  delay?: number;
  /** Travel distance in px before settling. */
  y?: number;
  className?: string;
  as?: "div" | "li" | "span" | "section" | "header" | "article";
};

/**
 * The site's single entrance gesture: a short rise with a long expo ease-out.
 * Used everywhere so the whole page shares one rhythm instead of a grab-bag
 * of animations. Collapses to a plain render when motion is reduced.
 */
export function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
  as = "div",
}: RevealProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as];

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{
        duration: 0.9,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </MotionTag>
  );
}

/** Convenience wrapper: reveals children in sequence with a fixed cadence. */
export function RevealGroup({
  children,
  className,
  step = 0.08,
  startDelay = 0,
}: {
  children: ReactNode[];
  className?: string;
  step?: number;
  startDelay?: number;
}) {
  return (
    <div className={className}>
      {children.map((child, i) => (
        <Reveal key={i} delay={startDelay + i * step}>
          {child}
        </Reveal>
      ))}
    </div>
  );
}
