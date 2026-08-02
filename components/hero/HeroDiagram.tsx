"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Hero görseli: kurumun çalışma modelinin canlı şeması.
 *
 * Öğretmen birebir dersi yürütür, akademik koç haftalık planı kurar; ikisi de
 * merkezdeki öğrenciye bağlanır ve süreç veliye rapor olarak döner. Bağlantı
 * çizgileri sürekli akar, öğrencinin çevresindeki halka ilerlemeyi gösterir.
 *
 * Kademe kartlarıyla aynı görsel dille kurulur: ızgara, vurgu ışığı, halka.
 */

const NAVY = "#1A2A4A";
const RED = "#E01F27";

const RADIUS = 58;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function HeroDiagram({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(0);

  // Halka bir kez dolar ve dolu kalır: "ölçülebilir ilerleme".
  useEffect(() => {
    if (reduced) {
      setProgress(0.74);
      return;
    }
    const t = window.setTimeout(() => setProgress(0.74), 900);
    return () => window.clearTimeout(t);
  }, [reduced]);

  return (
    <div className={className}>
      <div className="relative overflow-hidden rounded-[var(--radius-card)] border border-line bg-bone shadow-[0_1px_2px_rgba(13,21,38,0.03),0_40px_80px_-52px_rgba(13,21,38,0.4)]">
        {/* ızgara */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-60 [background-image:linear-gradient(to_right,#E3E7ED_1px,transparent_1px),linear-gradient(to_bottom,#E3E7ED_1px,transparent_1px)] [background-position:center] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_62%_62%_at_50%_46%,#000_52%,transparent_100%)]"
        />
        {/* vurgu ışığı */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(52%_54%_at_50%_46%,rgba(26,42,74,0.10)_0%,rgba(26,42,74,0.03)_45%,transparent_74%)]"
        />

        <svg
          viewBox="0 0 520 440"
          className="relative z-10 w-full"
          role="img"
          aria-label="Öğretmen birebir dersi yürütür, akademik koç planı kurar, ilerleme veliye raporlanır."
        >
          {/* --- bağlantılar --- */}
          <g
            fill="none"
            strokeWidth="1.75"
            strokeLinecap="round"
            className={reduced ? undefined : "[stroke-dasharray:7_9] animate-[tk-flow_1.6s_linear_infinite]"}
          >
            <path d="M150 104 C 178 140, 200 168, 218 194" stroke={NAVY} strokeOpacity="0.4" />
            <path d="M370 104 C 342 140, 320 168, 302 194" stroke={NAVY} strokeOpacity="0.4" />
            <path d="M260 300 L 260 356" stroke={RED} strokeOpacity="0.45" />
          </g>

          {/* --- öğretmen --- */}
          <Node x={62} y={56} w={176} label="Öğretmen" sub="Birebir ders" />
          {/* --- akademik koç --- */}
          <Node x={282} y={56} w={176} label="Akademik Koç" sub="Haftalık plan" />

          {/* --- öğrenci --- */}
          <g>
            <circle cx="260" cy="242" r={RADIUS} fill="#FFFFFF" />
            <circle
              cx="260"
              cy="242"
              r={RADIUS}
              fill="none"
              stroke="#DFE3EA"
              strokeWidth="7"
            />
            <motion.circle
              cx="260"
              cy="242"
              r={RADIUS}
              fill="none"
              stroke={RED}
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              transform="rotate(-90 260 242)"
              initial={{ strokeDashoffset: CIRCUMFERENCE }}
              animate={{ strokeDashoffset: CIRCUMFERENCE * (1 - progress) }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            />
            <text
              x="260"
              y="236"
              textAnchor="middle"
              className="fill-navy-950 text-[17px] font-semibold [letter-spacing:-0.02em]"
            >
              Öğrenci
            </text>
            <text
              x="260"
              y="258"
              textAnchor="middle"
              className="fill-[#8B94A3] text-[11px] font-medium [letter-spacing:0.04em]"
            >
              Tek plan
            </text>
          </g>

          {/* --- veli --- */}
          <Node x={172} y={356} w={176} label="Veli" sub="İlerleme raporu" accent />
        </svg>

        {/* --- alt şerit --- */}
        <div className="relative z-10 grid grid-cols-3 border-t border-line bg-paper">
          {[
            { k: "1:1", v: "Ders" },
            { k: "Haftalık", v: "Takip" },
            { k: "Düzenli", v: "Rapor" },
          ].map((item, i) => (
            <div
              key={item.v}
              className={`px-4 py-5 text-center ${i > 0 ? "border-l border-line" : ""}`}
            >
              <p className="text-[0.9375rem] font-semibold tracking-[-0.02em] text-navy-950">
                {item.k}
              </p>
              <p className="mt-1 text-[0.75rem] tracking-[-0.005em] text-faint">
                {item.v}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

function Node({
  x,
  y,
  w,
  label,
  sub,
  accent = false,
}: {
  x: number;
  y: number;
  w: number;
  label: string;
  sub: string;
  accent?: boolean;
}) {
  const h = 66;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="14"
        fill="#FFFFFF"
        stroke={accent ? "rgba(224,31,39,0.28)" : "#E3E7ED"}
        strokeWidth="1.25"
      />
      <circle cx={x + 22} cy={y + h / 2} r="3.5" fill={accent ? RED : NAVY} />
      <text
        x={x + 38}
        y={y + 28}
        className="fill-navy-950 text-[14px] font-semibold [letter-spacing:-0.015em]"
      >
        {label}
      </text>
      <text
        x={x + 38}
        y={y + 47}
        className="fill-[#5C6675] text-[12px] font-medium [letter-spacing:-0.005em]"
      >
        {sub}
      </text>
    </g>
  );
}
