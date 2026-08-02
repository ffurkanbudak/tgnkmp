import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { LevelCard } from "@/components/levels/LevelCard";
import { Process } from "@/components/home/Process";
import { FinalCta } from "@/components/home/FinalCta";
import { educationPage, levels, subjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Eğitim",
  description:
    "TOGAN KAMPÜS'te birebir eğitim modeli: tek öğrenciye kurulmuş ders saati, kademeye göre program ve tüm temel branşlarda uzman öğretmen.",
  alternates: { canonical: "/egitim" },
};

export default function EducationPage() {
  return (
    <>
      <PageHero
        eyebrow={educationPage.eyebrow}
        title={educationPage.title}
        lead={educationPage.lead}
        aside={
          <ul className="grid grid-cols-3 border-y border-line">
            {educationPage.promise.map((item, i) => (
              <li
                key={item.v}
                className={`py-6 ${i > 0 ? "border-l border-line ps-5" : ""}`}
              >
                <p className="text-[1.375rem] font-semibold tracking-[-0.03em] text-navy-950">
                  {item.k}
                </p>
                <p className="mt-1.5 text-[0.8125rem] leading-snug text-faint">
                  {item.v}
                </p>
              </li>
            ))}
          </ul>
        }
      />

      {/* --- Birebir ders modeli ------------------------------------------ */}
      <Section id="model" tone="bone">
        <SectionHeader
          eyebrow="Birebir Ders Modeli"
          title="Bir ders saati nasıl geçer?"
          lead="Her ders aynı yapıyla işlenir. Bu tekrar, öğrencinin ne bekleyeceğini bilmesini ve dersin ilk dakikasından itibaren çalışmaya başlamasını sağlar."
          align="split"
        />

        <ol className="mt-20 grid border-t border-line md:mt-24 md:grid-cols-2">
          {educationPage.model.map((step, i) => (
            <Reveal
              key={step.title}
              as="li"
              delay={(i % 2) * 0.08}
              className={`border-b border-line py-10 md:py-14 ${
                i % 2 === 1
                  ? "md:border-l md:border-line md:ps-12 lg:ps-16"
                  : "md:pe-12 lg:pe-16"
              }`}
            >
              <div className="flex items-start gap-6 md:gap-8">
                <span className="text-eyebrow mt-2 shrink-0 tabular-nums text-brand-600">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-h3 text-navy-950">{step.title}</h3>
                  <p className="text-body mt-4 max-w-md text-muted">{step.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* --- Kademeler ----------------------------------------------------- */}
      <Section id="kademeler" tone="light">
        <SectionHeader
          eyebrow="Eğitim Kademeleri"
          title="Üç kademe, birbirinin üzerine kurulur."
          lead="İlkokulda alışkanlık, ortaokulda hazırlık, lisede strateji. Her kademe bir öncekinin kazanımını devralır."
          align="split"
        />
        <div className="mt-20 grid gap-6 md:mt-24 lg:grid-cols-3 lg:gap-7">
          {levels.map((level, i) => (
            <Reveal key={level.id} delay={i * 0.09}>
              <LevelCard level={level} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* --- Branşlar ------------------------------------------------------ */}
      <Section id="branslar" tone="bone">
        <SectionHeader
          eyebrow="Branşlar"
          title="Tüm temel branşlarda birebir eğitim."
          lead="Her branş, o alanda uzmanlaşmış bir öğretmen tarafından yürütülür. Öğrenci birden fazla branşta destek alıyorsa programlar tek bir takvimde birleştirilir."
          align="split"
        />

        <ul className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line md:mt-24 md:grid-cols-3 lg:grid-cols-4">
          {subjects.map(({ name, levels: kademe, Icon }, i) => (
            <Reveal
              key={name}
              as="li"
              delay={Math.min(i, 8) * 0.045}
              y={16}
              className="group relative bg-paper transition-colors duration-500 hover:bg-bone"
            >
              <div className="flex h-full flex-col justify-between gap-8 p-6 lg:p-8">
                <Icon className="size-7 text-navy-700 transition-[color,transform] duration-[650ms] ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:text-brand-600 lg:size-8" />
                <div>
                  <h3 className="text-[1.0625rem] font-semibold leading-snug tracking-[-0.02em] text-navy-950 lg:text-[1.125rem]">
                    {name}
                  </h3>
                  <p className="mt-2 text-[0.75rem] tracking-[-0.005em] text-faint">
                    {kademe}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
          <Reveal as="li" delay={0.4} y={16} className="relative bg-navy-900 text-navy-100">
            <div className="flex h-full flex-col justify-end gap-8 p-6 lg:p-8">
              <p className="text-[0.9375rem] leading-snug tracking-[-0.015em] text-navy-200">
                Aradığınız branş listede yoksa lütfen bize danışın.
              </p>
            </div>
          </Reveal>
        </ul>
      </Section>

      <Process />
      <FinalCta />
    </>
  );
}
