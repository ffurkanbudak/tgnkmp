import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Section";
import {
  IconArrowUpRight,
  IconClock,
  IconMail,
  IconPhone,
  IconPin,
  IconWhatsapp,
} from "@/components/icons";
import { contactPage } from "@/lib/content";
import { mapsEmbedUrl, mapsLinkUrl, site, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "TOGAN KAMPÜS ile iletişime geçin. Ücretsiz ön görüşme talebi oluşturun, telefon veya WhatsApp üzerinden bize ulaşın.",
  alternates: { canonical: "/iletisim" },
};

export default function ContactPage() {
  return (
    <>
      {/* --- Başlık ------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-paper pb-16 pt-36 md:pb-20 md:pt-44">
        <div className="container-page relative z-10">
          <div className="grid gap-x-16 gap-y-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Reveal>
                <Eyebrow>{contactPage.eyebrow}</Eyebrow>
              </Reveal>
              <Reveal delay={0.06}>
                <h1 className="text-display mt-8 max-w-3xl text-navy-950">
                  {contactPage.title}
                </h1>
              </Reveal>
            </div>
            <div className="lg:col-span-5 lg:pt-20">
              <Reveal delay={0.12}>
                <p className="text-lead text-muted">{contactPage.lead}</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* --- Form + bilgiler ---------------------------------------------- */}
      <section className="relative bg-paper pb-[var(--spacing-section)]">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <Reveal>
                <ContactForm />
              </Reveal>
            </div>

            <aside className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <Reveal delay={0.08}>
                  <div className="rounded-[var(--radius-card)] bg-navy-900 p-8 text-white lg:p-10">
                    <h2 className="text-eyebrow text-navy-300">
                      Doğrudan Ulaşın
                    </h2>

                    <ul className="mt-8 space-y-1">
                      <ContactRow
                        href={whatsappUrl}
                        external
                        icon={<IconWhatsapp className="size-[18px]" />}
                        label="WhatsApp"
                        value="Anında yazışın"
                      />
                      <ContactRow
                        href={site.phone.href}
                        icon={<IconPhone className="size-[18px]" />}
                        label="Telefon"
                        value={site.phone.display}
                      />
                      <ContactRow
                        href={site.email.href}
                        icon={<IconMail className="size-[18px]" />}
                        label="E-posta"
                        value={site.email.display}
                      />
                      <ContactRow
                        href={mapsLinkUrl}
                        external
                        icon={<IconPin className="size-[18px]" />}
                        label="Adres"
                        value={`${site.address.line2}, ${site.address.city}`}
                      />
                    </ul>

                    <div className="mt-9 border-t border-white/10 pt-8">
                      <h3 className="text-eyebrow flex items-center gap-2.5 text-navy-300">
                        <IconClock className="size-4" />
                        Çalışma Saatleri
                      </h3>
                      <dl className="mt-6 space-y-3.5">
                        {site.hours.map((row) => (
                          <div
                            key={row.days}
                            className="flex items-baseline justify-between gap-4 text-[0.9375rem]"
                          >
                            <dt className="text-navy-300">{row.days}</dt>
                            <dd className="font-medium tabular-nums text-white">
                              {row.time}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </div>
                </Reveal>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* --- Harita -------------------------------------------------------- */}
      <section aria-labelledby="konum-basligi" className="relative bg-bone pb-0">
        <div className="container-page pb-12">
          <Reveal>
            <div className="flex flex-col gap-4 border-t border-line pt-12 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-eyebrow text-faint">Konum</p>
                <h2
                  id="konum-basligi"
                  className="text-h3 mt-4 max-w-md text-navy-950"
                >
                  {site.address.line1}
                </h2>
                <p className="text-body mt-3 text-muted">
                  {site.address.line2} · {site.address.city}
                </p>
              </div>
              <a
                href={mapsLinkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex shrink-0 items-center gap-2 text-[0.9375rem] font-medium text-navy-900 transition-colors duration-300 hover:text-brand-700"
              >
                Yol tarifi alın
                <IconArrowUpRight className="size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </Reveal>
        </div>

        <div className="h-[380px] w-full overflow-hidden border-t border-line md:h-[460px]">
          <iframe
            src={mapsEmbedUrl}
            title={`${site.name} konumu | Google Haritalar`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full grayscale-[0.85] contrast-[1.05] transition-[filter] duration-700 hover:grayscale-0"
            style={{ border: 0 }}
          />
        </div>
      </section>
    </>
  );
}

/* -------------------------------------------------------------------------- */

function ContactRow({
  href,
  external,
  icon,
  label,
  value,
}: {
  href: string;
  external?: boolean;
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <li>
      <a
        href={href}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        className="group -mx-3 flex items-start gap-4 rounded-xl px-3 py-4 transition-colors duration-300 hover:bg-white/[0.06]"
      >
        <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full border border-white/15 text-navy-200 transition-colors duration-300 group-hover:border-brand-600 group-hover:text-brand-500">
          {icon}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[0.75rem] uppercase tracking-[0.16em] text-navy-400">
            {label}
          </span>
          <span className="mt-1.5 block text-[0.9375rem] leading-snug tracking-[-0.01em] text-white">
            {value}
          </span>
        </span>
        <IconArrowUpRight className="mt-1 size-4 shrink-0 text-navy-500 transition-[transform,color] duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
      </a>
    </li>
  );
}
