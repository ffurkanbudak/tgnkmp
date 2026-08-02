import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

type Tone = "light" | "bone" | "navy";

const toneClass: Record<Tone, string> = {
  light: "bg-paper text-navy-900",
  bone: "bg-bone text-navy-900",
  navy: "bg-navy-900 text-navy-50",
};

/**
 * Every section shares the same frame: full-bleed tone and a centred container.
 * Nothing is drawn in the gutters, so text always has the full column width.
 */
export function Section({
  id,
  tone = "light",
  children,
  className = "",
}: {
  id?: string;
  tone?: Tone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative isolate scroll-mt-28 py-[var(--spacing-section)] ${toneClass[tone]} ${className}`}
    >
      <div className="container-page relative z-10">{children}</div>
    </section>
  );
}

/**
 * Bölüm etiketi: çerçeveli, tek noktalı sade bir rozet. Sayfadaki her bölüm
 * aynı rozetle açılır; bu tekrar, sayfaya kurumsal bir ritim verir.
 */
export function Eyebrow({
  children,
  tone = "light",
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  const frame =
    tone === "navy"
      ? "border-white/18 text-navy-200"
      : "border-navy-900/12 text-navy-600";

  return (
    <span
      className={`text-eyebrow inline-flex items-center gap-2.5 rounded-[14px] border px-4 py-3 ${frame} ${className}`}
    >
      <span
        aria-hidden="true"
        className="size-1.5 shrink-0 rounded-full bg-brand-600"
      />
      {children}
    </span>
  );
}

/**
 * Standard section opening: badge, headline, optional lead paragraph.
 * `align="split"` puts the headline left and the lead in a right column —
 * the editorial layout used by the heavier sections.
 */
export function SectionHeader({
  eyebrow,
  title,
  lead,
  tone = "light",
  align = "stack",
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  tone?: Tone;
  align?: "stack" | "split";
  className?: string;
}) {
  const leadColor = tone === "navy" ? "text-navy-200" : "text-muted";

  if (align === "split") {
    return (
      <div className={`grid gap-x-16 gap-y-8 lg:grid-cols-12 ${className}`}>
        <div className="lg:col-span-7">
          <Reveal>
            <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="text-h2 mt-8 max-w-3xl">{title}</h2>
          </Reveal>
        </div>
        {lead && (
          <div className="lg:col-span-5 lg:pt-20">
            <Reveal delay={0.12}>
              <p className={`text-lead ${leadColor}`}>{lead}</p>
            </Reveal>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`max-w-3xl ${className}`}>
      <Reveal>
        <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 className="text-h2 mt-8">{title}</h2>
      </Reveal>
      {lead && (
        <Reveal delay={0.12}>
          <p className={`text-lead mt-7 max-w-2xl ${leadColor}`}>{lead}</p>
        </Reveal>
      )}
    </div>
  );
}
