"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { process } from "@/lib/content";

export function Process() {
  const trackRef = useRef<HTMLOListElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.72", "end 0.55"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <Section id="surec" tone="bone">
      <SectionHeader
        eyebrow="Eğitim Süreci"
        title="İlk görüşmeden akademik takibe, adım adım."
        lead="Süreç kişiden kişiye değişmez; içeriği değişir. Her öğrenci aynı yapıdan geçer, ancak sonunda tamamen kendine ait bir plana sahip olur."
        align="split"
      />

      <div className="mt-20 md:mt-24">
        <ol ref={trackRef} className="relative">
          {/* rayın soluk hattı */}
          <span
            aria-hidden="true"
            className="absolute left-[11px] top-2 h-[calc(100%-1rem)] w-px bg-navy-200 md:left-[15px]"
          />
          {/* ilerledikçe çizilen hat */}
          <motion.span
            aria-hidden="true"
            className="absolute left-[11px] top-2 h-[calc(100%-1rem)] w-px origin-top bg-brand-600 md:left-[15px]"
            style={{ scaleY: reduced ? 1 : progress }}
          />

          {process.map((step, i) => (
            <Reveal
              key={step.title}
              as="li"
              delay={0.04}
              className="relative flex gap-7 pb-12 last:pb-0 md:gap-10 md:pb-16"
            >
              {/* düğüm */}
              <span
                aria-hidden="true"
                className="relative z-10 mt-0.5 grid size-[23px] shrink-0 place-items-center rounded-full border border-navy-200 bg-bone md:size-[31px]"
              >
                <span className="size-[7px] rounded-full bg-navy-300 md:size-[9px]" />
              </span>

              <div className="pt-px md:grid md:flex-1 md:grid-cols-12 md:gap-10">
                <div className="md:col-span-5">
                  <p className="text-eyebrow text-brand-600">
                    Adım {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-h3 mt-3 text-navy-950">{step.title}</h3>
                </div>
                <p className="text-body mt-4 max-w-xl text-muted md:col-span-7 md:mt-0 md:pt-8">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
