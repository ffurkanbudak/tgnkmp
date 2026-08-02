import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Whiteboard } from "@/components/coaching/Whiteboard";
import { ButtonLink } from "@/components/ui/Button";
import { IconArrowRight } from "@/components/icons";
import { coaching } from "@/lib/content";

export function Coaching() {
  return (
    <Section id="akademik-kocluk" tone="navy">
      <SectionHeader
        eyebrow="Akademik Koçluk"
        title={coaching.title}
        lead={coaching.lead}
        tone="navy"
        align="split"
      />

      <div className="mt-20 grid gap-14 lg:mt-24 lg:grid-cols-12 lg:gap-12">
        {/* Görsel — geniş ekranlarda listeyle birlikte kayar */}
        <div className="lg:col-span-5">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <Whiteboard className="mx-auto w-full max-w-[420px] lg:mx-0" />
              <p className="text-body mt-10 max-w-sm text-navy-300">
                Koçluk, ders programının üstünde duran ikinci bir katmandır.
                Öğrenci ilerlemediğinde neyin değişmesi gerektiğine burada karar
                verilir.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Koçun yaptıkları */}
        <div className="lg:col-span-7">
          <ol className="border-t border-white/10">
            {coaching.items.map((item, i) => (
              <Reveal
                key={item.title}
                as="li"
                delay={i * 0.06}
                className="group border-b border-white/10 py-8 lg:py-9"
              >
                <div className="flex items-start gap-6 md:gap-10">
                  <span className="text-eyebrow mt-1.5 shrink-0 tabular-nums text-navy-400 transition-colors duration-500 group-hover:text-brand-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-[1.25rem] font-semibold leading-snug tracking-[-0.025em] text-white lg:text-[1.375rem]">
                      {item.title}
                    </h3>
                    <p className="text-body mt-3 max-w-xl text-navy-300">
                      {item.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={0.1}>
            <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
              <ButtonLink
                href="/iletisim"
                size="lg"
                icon={<IconArrowRight className="size-[18px]" />}
              >
                Koçluk Süreci Hakkında Bilgi Alın!
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
