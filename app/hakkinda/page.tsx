import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { FinalCta } from "@/components/home/FinalCta";
import { IconCheck } from "@/components/icons";
import { aboutPage } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "Togan Kampüs, 1. sınıftan 12. sınıfa kadar öğrencilere bireyselleştirilmiş eğitim programları, özel ders ve akademik koçluk sunan yeni nesil bir eğitim markasıdır.",
  alternates: { canonical: "/hakkinda" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={site.tagline}
        title={aboutPage.title}
        lead={aboutPage.lead}
      />

      {/* --- Kurumsal giriş ------------------------------------------------- */}
      <Section id="kurumsal" tone="bone">
        <div className="grid gap-x-16 gap-y-8 lg:grid-cols-12">
          {aboutPage.intro.map((paragraph, i) => (
            <Reveal key={i} delay={i * 0.09} className="lg:col-span-6">
              <p className="text-body text-navy-700">{paragraph}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* --- Toganworks metodolojisi ---------------------------------------- */}
      <Section id="toganworks" tone="navy">
        <SectionHeader
          eyebrow={aboutPage.methodology.eyebrow}
          title={aboutPage.methodology.title}
          lead={aboutPage.methodology.lead}
          tone="navy"
          align="split"
        />

        <ol className="mt-20 border-t border-white/10 md:mt-24">
          {aboutPage.methodology.items.map((item, i) => (
            <Reveal
              key={item}
              as="li"
              delay={i * 0.05}
              className="group flex items-start gap-6 border-b border-white/10 py-7 lg:py-8"
            >
              <span className="text-eyebrow mt-1 shrink-0 tabular-nums text-navy-400 transition-colors duration-500 group-hover:text-brand-500">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-[1.125rem] font-semibold leading-snug tracking-[-0.02em] text-white lg:text-[1.25rem]">
                {item}
              </h3>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* --- Ekibimiz -------------------------------------------------------- */}
      <Section id="ekibimiz" tone="light">
        <SectionHeader
          eyebrow={aboutPage.team.eyebrow}
          title={aboutPage.team.title}
          lead={aboutPage.team.lead}
          align="split"
        />

        <ul className="mt-20 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line md:mt-24 md:grid-cols-2 lg:grid-cols-3">
          {aboutPage.team.items.map((item, i) => (
            <Reveal key={item} as="li" delay={i * 0.06} y={16} className="bg-paper">
              <div className="flex h-full items-center gap-4 p-7 lg:p-8">
                <IconCheck className="size-4 shrink-0 text-brand-600" />
                <span className="text-[0.9375rem] font-medium tracking-[-0.01em] text-navy-900">
                  {item}
                </span>
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* --- Kazanımlar ------------------------------------------------------ */}
      <Section id="kazanimlar" tone="bone">
        <SectionHeader
          eyebrow={aboutPage.outcomes.eyebrow}
          title={aboutPage.outcomes.title}
          lead={aboutPage.outcomes.lead}
          align="split"
        />

        <div className="mt-20 grid gap-6 md:mt-24 md:grid-cols-2 lg:grid-cols-4 lg:gap-7">
          {aboutPage.outcomes.items.map((item, i) => (
            <Reveal key={item} delay={i * 0.08}>
              <article className="group relative flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-paper p-8 shadow-[0_1px_2px_rgba(13,21,38,0.03)] transition-[transform,box-shadow,border-color] duration-[650ms] ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_2px_4px_rgba(13,21,38,0.04),0_30px_60px_-28px_rgba(13,21,38,0.28)]">
                <span
                  aria-hidden="true"
                  className="absolute inset-x-8 top-0 h-[2px] origin-left scale-x-0 bg-brand-600 transition-transform duration-[650ms] ease-[var(--ease-out-expo)] group-hover:scale-x-100"
                />
                <p className="text-eyebrow tabular-nums text-faint">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="text-h3 mt-5 text-navy-950">{item}</h3>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.16}>
          <p className="text-lead mt-16 max-w-3xl text-muted md:mt-20">
            {aboutPage.outcomes.closing}
          </p>
        </Reveal>
      </Section>

      <FinalCta />
    </>
  );
}
