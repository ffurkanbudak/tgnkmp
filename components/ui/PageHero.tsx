import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Section";

/** İç sayfaların ortak açılışı: rozet, başlık, yan sütunda giriş metni. */
export function PageHero({
  eyebrow,
  title,
  lead,
  aside,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  aside?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-paper pb-16 pt-36 md:pb-20 md:pt-44">
      <div className="container-page">
        <div className="grid gap-x-16 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>{eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="text-display mt-8 max-w-3xl text-navy-950">{title}</h1>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:pt-20">
            <Reveal delay={0.12}>
              <p className="text-lead text-muted">{lead}</p>
            </Reveal>
            {aside && (
              <Reveal delay={0.18}>
                <div className="mt-10">{aside}</div>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
