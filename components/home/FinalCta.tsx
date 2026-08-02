import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { IconArrowRight, IconWhatsapp } from "@/components/icons";
import { finalCta } from "@/lib/content";
import { site, whatsappUrl } from "@/lib/site";

export function FinalCta() {
  return (
    <section
      id="on-gorusme"
      className="surface-grain relative scroll-mt-24 overflow-hidden bg-navy-900 py-[var(--spacing-section)] text-white"
    >
      {/* çok hafif bir ışık düşüşü — atmosfer için */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_-10%,rgba(255,255,255,0.09),transparent_60%)]"
      />

      <div className="container-page relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Eyebrow tone="navy">Ön Görüşme</Eyebrow>
          </Reveal>

          <Reveal delay={0.06}>
            <h2 className="text-h2 mt-8 text-white">{finalCta.title}</h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="text-lead mx-auto mt-8 max-w-xl text-navy-200">
              {finalCta.lead}
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink
                href="/iletisim"
                size="lg"
                icon={<IconArrowRight className="size-[18px]" />}
              >
                Ön Görüşme Talep Edin!
              </ButtonLink>
              <ButtonLink
                href={whatsappUrl}
                external
                variant="outlineLight"
                size="lg"
                icon={<IconWhatsapp className="size-[18px]" />}
              >
                WhatsApp&apos;tan Yazın!
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <p className="mt-10 text-[0.875rem] text-navy-400">
              Telefonla ulaşmak isterseniz:{" "}
              <a
                href={site.phone.href}
                className="font-medium text-navy-100 underline decoration-white/25 underline-offset-4 transition-colors duration-300 hover:text-white hover:decoration-white/60"
              >
                {site.phone.display}
              </a>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
