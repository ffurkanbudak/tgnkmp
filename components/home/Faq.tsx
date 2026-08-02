import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { IconWhatsapp } from "@/components/icons";
import { faqs } from "@/lib/content";
import { whatsappUrl } from "@/lib/site";

export function Faq() {
  return (
    <Section id="sss" tone="light">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <Eyebrow>Sık Sorulan Sorular</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="text-h2 mt-7 text-navy-950">
                Velilerin en çok sorduğu sorular.
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="text-body mt-7 max-w-sm text-muted">
                Aradığınız yanıtı bulamadıysanız bize doğrudan yazabilirsiniz.
                Aynı gün içinde dönüş yapıyoruz.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <ButtonLink
                href={whatsappUrl}
                external
                variant="quiet"
                className="mt-8"
                icon={<IconWhatsapp className="size-[18px]" />}
              >
                Sorunuzu Yazın!
              </ButtonLink>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-8">
          <Reveal delay={0.08}>
            <Accordion items={faqs} />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
