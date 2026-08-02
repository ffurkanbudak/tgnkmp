import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { LevelCard } from "@/components/levels/LevelCard";
import { levels } from "@/lib/content";

export function Levels() {
  return (
    <Section id="kademeler" tone="bone">
      <SectionHeader
        eyebrow="Eğitim Kademeleri"
        title="Üç kademe, birbirinin üzerine kurulur."
        lead="İlkokulda alışkanlık, ortaokulda hazırlık, lisede strateji. Her kademe bir öncekinin kazanımını devralır; program da öğrencinin bulunduğu seviyeye göre kurulur."
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
  );
}
