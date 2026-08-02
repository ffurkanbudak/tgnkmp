import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { subjects } from "@/lib/content";

export function Subjects() {
  return (
    <Section id="branslar" tone="light">
      <SectionHeader
        eyebrow="Branşlar"
        title="Tüm temel branşlarda birebir eğitim."
        lead="Her branş, o alanda uzmanlaşmış bir öğretmen tarafından yürütülür. Öğrenci birden fazla branşta destek alıyorsa, programlar tek bir takvimde birleştirilir."
        align="split"
      />

      <ul className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line md:mt-24 md:grid-cols-3 lg:grid-cols-4">
        {subjects.map(({ name, levels, Icon }, i) => (
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
                  {levels}
                </p>
              </div>
            </div>
          </Reveal>
        ))}

        {/* Closing tile keeps the grid whole and carries the conversion nudge. */}
        <Reveal
          as="li"
          delay={0.4}
          y={16}
          className="relative bg-navy-900 text-navy-100"
        >
          <div className="flex h-full flex-col justify-end gap-8 p-6 lg:p-8">
            <p className="text-[0.9375rem] leading-snug tracking-[-0.015em] text-navy-200">
              Aradığınız branş listede yoksa lütfen bize danışın.
            </p>
          </div>
        </Reveal>
      </ul>
    </Section>
  );
}
