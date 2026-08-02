import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { TeacherCard } from "@/components/teachers/TeacherCard";
import { teachers } from "@/lib/content";

export function Teachers() {
  return (
    <Section id="ogretmenler" tone="light">
      <SectionHeader
        eyebrow="Öğretmen Kadrosu"
        title="Alanında uzman, kadrolu öğretmenler."
        lead="Öğretmenlerimiz branşlarında deneyimli ve birebir eğitim yöntemine göre çalışan eğitimcilerdir. Eşleştirme, öğrencinin seviyesine ve öğrenme biçimine göre kurum tarafından yapılır."
        align="split"
      />

      <ul className="mt-20 grid grid-cols-2 gap-5 md:mt-24 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
        {teachers.map((teacher, i) => (
          <Reveal
            key={teacher.name}
            as="li"
            delay={Math.min(i, 8) * 0.05}
            y={18}
            className="h-full"
          >
            <TeacherCard teacher={teacher} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
