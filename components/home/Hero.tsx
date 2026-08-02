"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Section";
import { HeroDiagram } from "@/components/hero/HeroDiagram";
import { IconArrowRight, IconWhatsapp } from "@/components/icons";
import { hero } from "@/lib/content";
import { whatsappUrl } from "@/lib/site";

/**
 * Başlık satırları kendi maskelerinin içinden yükselir. Maskenin alt payı,
 * virgül ve "ş/ğ" gibi alt uzantılı karakterlerin kesilmemesi için bilerek
 * geniş tutulur ve negatif marjla geri alınır.
 */
function Line({ children, delay }: { children: string; delay: number }) {
  const reduced = useReducedMotion();
  if (reduced) return <span className="block">{children}</span>;

  return (
    <span className="block overflow-hidden pb-[0.24em] -mb-[0.2em]">
      <motion.span
        className="block"
        initial={{ y: "112%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.05, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function FadeUp({
  children,
  delay,
  className = "",
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper pt-36 md:pt-44">
      <div className="container-page relative z-10">
        <div className="grid items-center gap-14 lg:min-h-[76svh] lg:grid-cols-12 lg:gap-12 lg:pb-8">
          {/* --- Söz ---------------------------------------------------- */}
          <div className="lg:col-span-6">
            <FadeUp delay={0.05}>
              <Eyebrow>{hero.eyebrow}</Eyebrow>
            </FadeUp>

            <h1 className="text-display mt-8 text-navy-950">
              {hero.title.map((line, i) => (
                <Line key={line} delay={0.18 + i * 0.11}>
                  {line}
                </Line>
              ))}
            </h1>

            <FadeUp delay={0.62}>
              <p className="text-lead mt-8 max-w-xl text-muted">{hero.lead}</p>
            </FadeUp>

            <FadeUp delay={0.72}>
              <div className="mt-11 flex flex-col gap-3 sm:flex-row sm:items-center">
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
                  variant="outline"
                  size="lg"
                  icon={<IconWhatsapp className="size-[18px]" />}
                >
                  WhatsApp&apos;tan Yazın!
                </ButtonLink>
              </div>
            </FadeUp>
          </div>

          {/* --- Model şeması -------------------------------------------- */}
          <FadeUp delay={0.4} className="lg:col-span-6">
            <HeroDiagram className="mx-auto w-full max-w-[560px] lg:ms-auto lg:me-0" />
          </FadeUp>
        </div>

        {/* --- Güven şeridi ---------------------------------------------- */}
        <FadeUp delay={0.9}>
          <ul className="mt-16 grid grid-cols-2 border-y border-line lg:mt-20 lg:grid-cols-4">
            {hero.proof.map((item, i) => (
              <li
                key={item}
                className={`py-6 text-[0.9375rem] font-medium tracking-[-0.01em] text-navy-700 lg:py-7 ${
                  i > 0 ? "lg:border-l lg:border-line lg:ps-8" : ""
                } ${i % 2 === 1 ? "border-l border-line ps-6 lg:ps-8" : ""}`}
              >
                <span className="flex items-center gap-2.5">
                  <span
                    aria-hidden="true"
                    className="size-1.5 shrink-0 rounded-full bg-brand-600"
                  />
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </FadeUp>
      </div>
    </section>
  );
}
