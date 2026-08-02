"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import {
  IconArrowRight,
  IconGraduationCap,
  IconMail,
  IconPhone,
  IconWhatsapp,
} from "@/components/icons";
import { nav, sections, site, whatsappUrl } from "@/lib/site";

/**
 * Sayfanın en üstündeki duyuru çubuğu.
 *
 * Yalnızca sayfa başındayken görünür; aşağı kaydırıldığında yerini sadeleşen
 * üst bara bırakır. Kapatıldığında oturum boyunca bir daha açılmaz.
 */
function AnnouncementBar({ hidden }: { hidden: boolean }) {
  const [dismissed, setDismissed] = useState(false);
  const reduced = useReducedMotion();
  const visible = !dismissed && !hidden;

  return (
    <AnimatePresence initial={false}>
      {visible && (
        <motion.div
          key="duyuru"
          initial={reduced ? false : { height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden bg-navy-950 text-white"
        >
          <div className="container-page">
            <div className="relative flex min-h-10 items-center justify-center gap-3 py-2.5 pe-8">
              <p className="text-center text-[0.8125rem] leading-snug tracking-[-0.005em] text-navy-100">
                Sorularınız mı var?{" "}
                <Link
                  href="/iletisim"
                  className="group/ann inline-flex items-center gap-1.5 font-semibold text-white underline decoration-white/30 underline-offset-4 transition-colors duration-300 hover:decoration-white"
                >
                  Eğitim danışmanlarımız sizi arasın!
                  <IconArrowRight className="size-3.5 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/ann:translate-x-0.5" />
                </Link>
              </p>

              <button
                type="button"
                onClick={() => setDismissed(true)}
                aria-label="Duyuruyu kapat"
                className="absolute end-0 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-full text-navy-300 transition-colors duration-300 hover:bg-white/10 hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  className="size-3.5"
                  aria-hidden="true"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Sade bir üst bar: solda resmî logo, sağda menü düğmesi. Bölüm bağlantıları,
 * sayfa bağlantıları ve çağrı butonlarının tamamı menü panelinin içindedir.
 * Böylece bar her ölçüde ferah kalır ve marka önde durur.
 */
export function Header() {
  const pathname = usePathname();
  const [condensed, setCondensed] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const reduced = useReducedMotion();
  const onHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  // Menü açıkken sayfayı kilitle
  useEffect(() => {
    document.documentElement.classList.toggle("lenis-stopped", open);
    return () => document.documentElement.classList.remove("lenis-stopped");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Görünen bölümü izle — menüde hangi bölümde olduğumuz işaretlenir
  useEffect(() => {
    if (!onHome) {
      setActive(null);
      return;
    }
    const nodes = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [onHome]);

  const sectionHref = (id: string) => (onHome ? `#${id}` : `/#${id}`);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[var(--ease-out-expo)] ${
          condensed && !open
            ? "border-b border-line/90 bg-paper/80 backdrop-blur-xl backdrop-saturate-150"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <AnnouncementBar hidden={condensed || open} />

        <div className="container-page">
          <div
            className={`flex items-center justify-between transition-all duration-500 ease-[var(--ease-out-expo)] ${
              condensed ? "h-16 md:h-[4.5rem]" : "h-20 md:h-24"
            }`}
          >
            <div className="relative z-10 flex min-w-0 items-center gap-3 sm:gap-3.5 md:gap-4">
              <Link
                href="/"
                aria-label={`${site.name} | Ana Sayfa`}
                className="min-w-0 transition-opacity duration-300 hover:opacity-70"
              >
                <Logo
                  className={
                    condensed ? "h-6 sm:h-7 md:h-8" : "h-7 sm:h-8 md:h-9"
                  }
                />
              </Link>
              {/* Dar ekranda yer açmak için: ayraç ve rozet yalnızca sm ve üzeri */}
              <span
                aria-hidden="true"
                className="hidden h-6 w-px shrink-0 bg-line sm:block md:h-7"
              />
              <IconGraduationCap
                aria-hidden="true"
                className="hidden size-5 shrink-0 text-navy-700 sm:block md:size-[1.375rem]"
              />
            </div>

            <div className="relative z-10 flex shrink-0 items-center gap-2 sm:gap-2.5">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp'tan yazın"
                className="grid size-10 place-items-center rounded-xl bg-[#25D366] text-white shadow-[0_1px_2px_rgba(20,120,60,0.25),0_10px_24px_-14px_rgba(37,211,102,0.9)] transition-[transform,box-shadow] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:shadow-[0_2px_4px_rgba(20,120,60,0.28),0_16px_32px_-16px_rgba(37,211,102,1)] active:scale-95 sm:size-11 sm:rounded-[14px] md:size-12"
              >
                <IconWhatsapp className="size-5 sm:size-[22px]" />
              </a>

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="ana-menu"
                className="group inline-flex h-10 items-center gap-3 rounded-xl border border-navy-900/15 px-3 text-[0.875rem] font-semibold tracking-[-0.01em] text-navy-900 transition-colors duration-300 hover:border-navy-900/40 sm:h-11 sm:rounded-[14px] sm:px-4 md:h-12 md:px-5"
              >
                {/* Dar ekranda etiket yalnızca ekran okuyucuya kalır, buton ikona iner */}
                <span className="sr-only sm:not-sr-only">
                  {open ? "Kapat" : "Menü"}
                </span>
                <span aria-hidden="true" className="relative block h-2.5 w-4.5">
                  <span
                    className={`absolute left-0 h-px w-full bg-current transition-all duration-400 ease-[var(--ease-out-expo)] ${
                      open ? "top-1 rotate-45" : "top-0"
                    }`}
                  />
                  <span
                  className={`absolute left-0 h-px w-full bg-current transition-all duration-400 ease-[var(--ease-out-expo)] ${
                    open ? "top-1 -rotate-45" : "top-2.5"
                  }`}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="ana-menu"
            key="menu"
            role="dialog"
            aria-modal="true"
            aria-label="Ana menü"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -18 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 overflow-y-auto bg-paper"
          >
            <div className="container-page min-h-full pb-16 pt-28 md:pt-32">
              <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
                {/* Bölümler */}
                <nav aria-label="Bölümler" className="lg:col-span-7">
                  <p className="text-eyebrow text-faint">Bölümler</p>
                  <ul className="mt-8">
                    {sections.map((section, i) => {
                      const isActive = active === section.id;
                      return (
                        <motion.li
                          key={section.id}
                          initial={reduced ? false : { opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.55,
                            delay: 0.06 + i * 0.035,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="border-b border-line first:border-t"
                        >
                          <Link
                            href={sectionHref(section.id)}
                            onClick={() => setOpen(false)}
                            aria-current={isActive ? "true" : undefined}
                            className="group flex items-baseline gap-5 py-4 md:gap-7 md:py-5"
                          >
                            <span
                              className={`text-eyebrow w-6 shrink-0 tabular-nums transition-colors duration-300 ${
                                isActive ? "text-brand-600" : "text-navy-200"
                              }`}
                            >
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span
                              className={`text-[1.5rem] font-semibold leading-tight tracking-[-0.03em] transition-colors duration-300 md:text-[2rem] ${
                                isActive
                                  ? "text-brand-700"
                                  : "text-navy-950 group-hover:text-brand-700"
                              }`}
                            >
                              {section.label}
                            </span>
                            <IconArrowRight
                              className="ms-auto size-5 shrink-0 translate-x-0 self-center text-navy-200 opacity-0 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1 group-hover:opacity-100"
                              aria-hidden="true"
                            />
                          </Link>
                        </motion.li>
                      );
                    })}
                  </ul>
                </nav>

                {/* Sayfalar, butonlar, iletişim */}
                <div className="lg:col-span-5 lg:ps-8">
                  <motion.div
                    initial={reduced ? false : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p className="text-eyebrow text-faint">Sayfalar</p>
                    <ul className="mt-6 flex flex-wrap gap-2.5">
                      {nav.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={() => setOpen(false)}
                            aria-current={pathname === item.href ? "page" : undefined}
                            className={`inline-flex items-center rounded-[14px] border px-4 py-3 text-[0.875rem] font-semibold tracking-[-0.01em] transition-colors duration-300 ${
                              pathname === item.href
                                ? "border-navy-900 bg-navy-900 text-white"
                                : "border-navy-900/15 text-navy-900 hover:border-navy-900/40"
                            }`}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-10 flex flex-col gap-3">
                      <ButtonLink
                        href="/iletisim"
                        size="lg"
                        className="w-full"
                        onClick={() => setOpen(false)}
                        icon={<IconArrowRight className="size-[18px]" />}
                      >
                        Ön Görüşme Alın!
                      </ButtonLink>
                      <ButtonLink
                        href={whatsappUrl}
                        external
                        variant="outline"
                        size="lg"
                        className="w-full"
                        icon={<IconWhatsapp className="size-[18px]" />}
                      >
                        WhatsApp&apos;tan Yazın!
                      </ButtonLink>
                    </div>

                    <div className="mt-12 border-t border-line pt-8">
                      <p className="text-eyebrow text-faint">İletişim</p>
                      <ul className="mt-6 space-y-4">
                        <li>
                          <a
                            href={site.phone.href}
                            className="text-body group flex items-center gap-3 text-navy-700 transition-colors duration-300 hover:text-navy-950"
                          >
                            <IconPhone className="size-[18px] shrink-0 text-faint transition-colors duration-300 group-hover:text-brand-600" />
                            {site.phone.display}
                          </a>
                        </li>
                        <li>
                          <a
                            href={site.email.href}
                            className="text-body group flex items-center gap-3 text-navy-700 transition-colors duration-300 hover:text-navy-950"
                          >
                            <IconMail className="size-[18px] shrink-0 text-faint transition-colors duration-300 group-hover:text-brand-600" />
                            {site.email.display}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
