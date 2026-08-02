import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { approach } from "@/lib/content";

export function Approach() {
  return (
    <Section id="yaklasim" tone="light">
      <SectionHeader
        eyebrow="Eğitim Yaklaşımımız"
        title={approach.title}
        lead={approach.lead}
        align="split"
      />

      <ul className="mt-20 grid border-t border-line md:mt-24 md:grid-cols-2">
        {approach.pillars.map((pillar, i) => (
          <Reveal
            key={pillar.title}
            as="li"
            delay={(i % 2) * 0.08}
            className={`group border-b border-line py-10 md:py-14 ${
              i % 2 === 1 ? "md:border-l md:border-line md:ps-12 lg:ps-16" : "md:pe-12 lg:pe-16"
            }`}
          >
            <div className="flex items-start gap-6 md:gap-8">
              <span className="text-eyebrow mt-2 shrink-0 tabular-nums text-brand-600">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-h3 text-navy-950">{pillar.title}</h3>
                <p className="text-body mt-4 max-w-md text-muted">{pillar.body}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
