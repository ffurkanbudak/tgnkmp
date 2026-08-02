"use client";

import { useState } from "react";
import { IconCheck } from "@/components/icons";
import { cn } from "@/lib/utils";

export type Level = {
  id: string;
  step: number;
  stage: string;
  accent: string;
  name: string;
  grades: string;
  body: string;
  focus: ReadonlyArray<string>;
};

const TOTAL_STEPS = 3;

/**
 * Kademe kartı.
 *
 * Üstteki görsel alan, öğrencinin eğitim merdivenindeki yerini anlatır:
 * halka kademenin sırasını (1/3, 2/3, 3/3) doldurur, merdiven çubukları
 * tamamlanan seviyeleri gösterir ve kartın üzerine gelindiğinde o kademenin
 * odak başlıkları halkanın çevresine dağılır. Vurgu rengi kademeden kademeye
 * koyulaşır; böylece üç kart tek bakışta birbirinden ayrılır.
 */
export function LevelCard({ level }: { level: Level }) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group/level relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper shadow-[0_1px_2px_rgba(13,21,38,0.03)] transition-[transform,box-shadow,border-color] duration-[650ms] ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_2px_4px_rgba(13,21,38,0.04),0_30px_60px_-28px_rgba(13,21,38,0.28)]"
      style={{ ["--accent" as string]: level.accent }}
    >
      <LevelVisual level={level} hovered={hovered} />

      <div className="flex flex-1 flex-col p-8 lg:p-10">
        <div className="flex items-center justify-between gap-4">
          <p className="text-eyebrow text-faint">{level.grades}</p>
          <StepBars step={level.step} accent={level.accent} />
        </div>

        <h3 className="mt-5 text-[1.75rem] font-semibold leading-[1.1] tracking-[-0.03em] text-navy-950 lg:text-[2rem]">
          {level.name}
        </h3>
        <p className="text-body mt-5 text-muted">{level.body}</p>

        <ul className="mt-8 space-y-3.5 border-t border-line pt-8">
          {level.focus.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-[0.9375rem] tracking-[-0.01em] text-navy-700"
            >
              <IconCheck
                className="mt-[3px] size-4 shrink-0"
                style={{ color: level.accent }}
              />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

/* -------------------------------------------------------------------------- */

/** Kademe sırasını gösteren üç çubuk: tamamlananlar dolu. */
function StepBars({ step, accent }: { step: number; accent: string }) {
  return (
    <span
      className="flex items-end gap-1"
      role="img"
      aria-label={`${TOTAL_STEPS} kademeden ${step}. kademe`}
    >
      {Array.from({ length: TOTAL_STEPS }, (_, i) => (
        <span
          key={i}
          className="w-1.5 rounded-[2px] transition-colors duration-500"
          style={{
            height: `${8 + i * 5}px`,
            backgroundColor: i < step ? accent : "#E3E7ED",
          }}
        />
      ))}
    </span>
  );
}

const RADIUS = 42;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function LevelVisual({ level, hovered }: { level: Level; hovered: boolean }) {
  const ratio = level.step / TOTAL_STEPS;
  const offset = CIRCUMFERENCE - (hovered ? ratio : 0) * CIRCUMFERENCE;

  // Odak başlıklarının halka çevresinde dağılacağı yönler
  const spread = [
    { x: -104, y: -46 },
    { x: 104, y: -46 },
    { x: -110, y: 46 },
    { x: 110, y: 46 },
  ];

  return (
    <div className="relative h-[210px] w-full overflow-hidden border-b border-line bg-bone">
      {/* ızgara */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.5] [background-image:linear-gradient(to_right,#E3E7ED_1px,transparent_1px),linear-gradient(to_bottom,#E3E7ED_1px,transparent_1px)] [background-position:center] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_58%_58%_at_50%_50%,#000_55%,transparent_100%)]"
      />
      {/* vurgu ışığı */}
      <div
        aria-hidden="true"
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          background: `radial-gradient(58% 66% at 50% 50%, ${level.accent}26 0%, ${level.accent}0D 42%, transparent 72%)`,
          opacity: hovered ? 1 : 0.65,
        }}
      />

      {/* seviye rozeti */}
      <p
        className="text-eyebrow absolute left-5 top-5 z-20 rounded-[10px] border bg-paper/80 px-2.5 py-2 backdrop-blur-sm transition-colors duration-500 lg:left-6 lg:top-6"
        style={{ borderColor: `${level.accent}40`, color: level.accent }}
      >
        Seviye {String(level.step).padStart(2, "0")}
      </p>

      {/* halka */}
      <div className="absolute inset-0 z-10 grid place-items-center">
        <div className="relative grid size-[112px] place-items-center">
          <svg width="112" height="112" viewBox="0 0 100 100" aria-hidden="true">
            <circle
              cx="50"
              cy="50"
              r={RADIUS}
              fill="transparent"
              stroke="#DFE3EA"
              strokeWidth="9"
            />
            <circle
              cx="50"
              cy="50"
              r={RADIUS}
              fill="transparent"
              stroke={level.accent}
              strokeWidth="9"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={offset}
              transform="rotate(-90 50 50)"
              style={{
                transition: "stroke-dashoffset 700ms cubic-bezier(0.16,1,0.3,1)",
              }}
            />
          </svg>
          <span className="absolute flex items-baseline gap-0.5">
            <span
              className="text-[1.5rem] font-semibold tracking-[-0.04em] tabular-nums transition-colors duration-500"
              style={{ color: hovered ? level.accent : "#0D1526" }}
            >
              {String(level.step).padStart(2, "0")}
            </span>
            <span className="text-[0.75rem] font-medium tabular-nums text-faint">
              /0{TOTAL_STEPS}
            </span>
          </span>
        </div>
      </div>

      {/* durum etiketi — hover'da yerini odak başlıklarına bırakır */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-x-0 bottom-0 z-20 flex justify-center p-5 transition-all duration-500 ease-[var(--ease-out-expo)]",
          hovered ? "translate-y-3 opacity-0" : "translate-y-0 opacity-100",
        )}
      >
        <span className="rounded-[10px] border border-line bg-paper/85 px-3 py-2 text-[0.75rem] font-medium tracking-[-0.01em] text-navy-700 backdrop-blur-sm">
          {level.stage}
        </span>
      </div>

      {/* odak başlıkları */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 z-20 grid place-items-center transition-opacity duration-500",
          hovered ? "opacity-100" : "opacity-0",
        )}
      >
        {level.focus.slice(0, 4).map((item, i) => (
          <span
            key={item}
            className="absolute inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-line bg-paper/90 px-2.5 py-1.5 text-[0.6875rem] font-medium tracking-[-0.005em] text-navy-800 shadow-[0_6px_16px_-10px_rgba(13,21,38,0.4)] backdrop-blur-sm transition-transform duration-[600ms] ease-[var(--ease-out-expo)]"
            style={{
              transform: hovered
                ? `translate(${spread[i].x}px, ${spread[i].y}px)`
                : "translate(0px, 0px)",
              transitionDelay: `${i * 55}ms`,
            }}
          >
            <span
              className="size-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: level.accent }}
            />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
