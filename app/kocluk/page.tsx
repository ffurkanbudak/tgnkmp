import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Whiteboard } from "@/components/coaching/Whiteboard";
import { FinalCta } from "@/components/home/FinalCta";
import { IconCheck } from "@/components/icons";
import { coaching, coachingPage } from "@/lib/content";

export const metadata: Metadata = {
  title: "Akademik Koçluk",
  description:
    "TOGAN KAMPÜS akademik koçluğu: haftalık program, ders takibi, motivasyon ve çalışma alışkanlığı ile düzenli veli iletişimi.",
  alternates: { canonical: "/kocluk" },
};

export default function CoachingPage() {
  return (
    <>
      <PageHero
        eyebrow={coachingPage.eyebrow}
        title={coachingPage.title}
        lead={coachingPage.lead}
        aside={<Whiteboard className="w-full max-w-[380px]" />}
      />

      {/* --- Üç sütun ------------------------------------------------------ */}
      <Section id="kapsam" tone="bone">
        <SectionHeader
          eyebrow="Koçluğun Kapsamı"
          title="Üç başlık, tek bir sorumlu."
          lead="Ders takibi, çalışma düzeni ve veli iletişimi ayrı kişilere dağılmaz. Öğrencinin koçu bu üçünü birlikte yürütür."
          align="split"
        />

        <div className="mt-20 grid gap-6 md:mt-24 lg:grid-cols-3 lg:gap-7">
          {coachingPage.pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 0.09}>
              <article className="group relative flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-paper p-8 shadow-[0_1px_2px_rgba(13,21,38,0.03)] transition-[transform,box-shadow,border-color] duration-[650ms] ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_2px_4px_rgba(13,21,38,0.04),0_30px_60px_-28px_rgba(13,21,38,0.28)] lg:p-10">
                <span
                  aria-hidden="true"
                  className="absolute inset-x-8 top-0 h-[2px] origin-left scale-x-0 bg-brand-600 transition-transform duration-[650ms] ease-[var(--ease-out-expo)] group-hover:scale-x-100 lg:inset-x-10"
                />
                <p className="text-eyebrow tabular-nums text-faint">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="text-h3 mt-5 text-navy-950">{pillar.title}</h3>
                <p className="text-body mt-5 text-muted">{pillar.body}</p>

                <ul className="mt-8 space-y-3.5 border-t border-line pt-8">
                  {pillar.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[0.9375rem] tracking-[-0.01em] text-navy-700"
                    >
                      <IconCheck className="mt-[3px] size-4 shrink-0 text-brand-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* --- Koçun yaptıkları ---------------------------------------------- */}
      <Section id="kocun-isi" tone="navy">
        <SectionHeader
          eyebrow="Koçun İşi"
          title={coaching.title}
          lead={coaching.lead}
          tone="navy"
          align="split"
        />

        <ol className="mt-20 border-t border-white/10 md:mt-24">
          {coaching.items.map((item, i) => (
            <Reveal
              key={item.title}
              as="li"
              delay={i * 0.05}
              className="group border-b border-white/10 py-8 lg:py-9"
            >
              <div className="grid gap-4 md:grid-cols-12 md:gap-10">
                <div className="flex items-start gap-6 md:col-span-5">
                  <span className="text-eyebrow mt-1.5 shrink-0 tabular-nums text-navy-400 transition-colors duration-500 group-hover:text-brand-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-[1.25rem] font-semibold leading-snug tracking-[-0.025em] text-white lg:text-[1.375rem]">
                    {item.title}
                  </h3>
                </div>
                <p className="text-body max-w-2xl text-navy-300 md:col-span-7">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* --- Haftalık döngü ------------------------------------------------ */}
      <Section id="haftalik-dongu" tone="light">
        <SectionHeader
          eyebrow="Haftalık Döngü"
          title="Koçluk, haftada bir tekrar eden bir düzendir."
          lead="Aynı döngü her hafta işler. Öngörülebilir olması, öğrencinin süreci bir yük gibi taşımak yerine alışkanlık hâline getirmesini sağlar."
          align="split"
        />

        <ol className="mt-20 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line md:mt-24 md:grid-cols-2 lg:grid-cols-4">
          {coachingPage.weekly.map((step, i) => (
            <Reveal
              key={step.day}
              as="li"
              delay={i * 0.07}
              y={16}
              className="bg-paper"
            >
              <div className="flex h-full flex-col gap-6 p-7 lg:p-8">
                <span className="text-eyebrow tabular-nums text-brand-600">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-[1.125rem] font-semibold tracking-[-0.02em] text-navy-950">
                    {step.day}
                  </h3>
                  <p className="text-body mt-3 text-muted">{step.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      <FinalCta />
    </>
  );
}
