import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import {
  IconArrowUpRight,
  IconInstagram,
  IconMail,
  IconPhone,
  IconPin,
} from "@/components/icons";
import { mapsLinkUrl, nav, site, whatsappUrl } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line bg-paper text-navy-900">
      <div className="container-page">
        <div className="grid gap-11 border-b border-line py-14 sm:gap-14 sm:py-20 lg:grid-cols-12 lg:gap-10 lg:py-24">
          {/* Marka */}
          <div className="min-w-0 lg:col-span-5">
            <Logo className="h-7 sm:h-8 md:h-9" />
            <p className="text-body mt-7 max-w-sm text-muted">
              İlkokul, ortaokul ve lise kademelerinde birebir eğitim ve akademik
              koçluk. Her öğrenci için tek bir plan.
            </p>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="mt-9 inline-grid size-11 place-items-center rounded-full border border-line text-navy-600 transition-colors duration-300 hover:border-navy-900/35 hover:text-navy-950"
            >
              <IconInstagram className="size-[18px]" />
            </a>
          </div>

          {/* Menü */}
          <nav aria-label="Alt menü" className="lg:col-span-3">
            <h2 className="text-eyebrow text-faint">Menü</h2>
            <ul className="mt-6 space-y-4">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-body inline-flex items-center gap-1.5 text-navy-700 transition-colors duration-300 hover:text-navy-950"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body group inline-flex items-center gap-1.5 text-navy-700 transition-colors duration-300 hover:text-navy-950"
                >
                  WhatsApp
                  <IconArrowUpRight className="size-4 transition-transform duration-400 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </li>
            </ul>
          </nav>

          {/* İletişim */}
          <div className="min-w-0 lg:col-span-4">
            <h2 className="text-eyebrow text-faint">İletişim</h2>
            <ul className="mt-6 space-y-5">
              <li>
                <a
                  href={site.phone.href}
                  className="text-body group flex items-start gap-3 text-navy-700 transition-colors duration-300 hover:text-navy-950"
                >
                  <IconPhone className="mt-1 size-[18px] shrink-0 text-faint transition-colors duration-300 group-hover:text-brand-600" />
                  {site.phone.display}
                </a>
              </li>
              <li>
                <a
                  href={site.email.href}
                  className="text-body group flex items-start gap-3 text-navy-700 transition-colors duration-300 hover:text-navy-950"
                >
                  <IconMail className="mt-1 size-[18px] shrink-0 text-faint transition-colors duration-300 group-hover:text-brand-600" />
                  {site.email.display}
                </a>
              </li>
              <li>
                <a
                  href={mapsLinkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body group flex min-w-0 items-start gap-3 text-navy-700 transition-colors duration-300 hover:text-navy-950"
                >
                  <IconPin className="mt-1 size-[18px] shrink-0 text-faint transition-colors duration-300 group-hover:text-brand-600" />
                  <span className="min-w-0 break-words">
                    {site.address.line2}
                    <br />
                    {site.address.city}
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2.5 py-8 text-[0.8125rem] leading-relaxed text-faint sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
          <p className="min-w-0">
            © {year} {site.name}. Tüm hakları saklıdır.
          </p>
          <p className="min-w-0 text-pretty sm:shrink-0 sm:text-end">
            Bir{" "}
            <a
              href={site.parent.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-navy-700 underline decoration-line underline-offset-4 transition-colors duration-300 hover:text-navy-950 hover:decoration-navy-400"
            >
              {site.parent.name}
            </a>{" "}
            eğitim markasıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}
