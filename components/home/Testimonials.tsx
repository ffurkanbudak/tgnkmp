import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Section";
import { testimonials } from "@/lib/content";

export function Testimonials() {
  return (
    <section
      id="veli-gorusleri"
      className="relative scroll-mt-24 overflow-hidden bg-bone py-[var(--spacing-section)]"
    >
      <div className="container-page">
        <div className="grid gap-x-16 gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>Veli Görüşleri</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="text-h2 mt-7 max-w-2xl text-navy-950">
                Velilerimiz süreci böyle anlatıyor.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:pt-16">
            <Reveal delay={0.12}>
              <p className="text-lead text-muted">
                Aşağıdaki görüşler, çocukları kurumumuzda eğitim almış velilerimiz
                tarafından paylaşılmıştır.
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Tam genişlikte akan şerit — üzerine gelindiğinde durur. */}
      <Reveal delay={0.1} className="mt-16 md:mt-20">
        <Marquee duration={78} className="py-2">
          {testimonials.map((item) => (
            <figure
              key={item.author + item.quote.slice(0, 12)}
              className="flex w-[19rem] shrink-0 flex-col justify-between rounded-[var(--radius-card)] border border-line bg-paper p-7 transition-[border-color,box-shadow] duration-500 hover:border-navy-200 hover:shadow-[0_20px_44px_-30px_rgba(13,21,38,0.35)] sm:w-[23rem] lg:w-[25rem] lg:p-9"
            >
              <span
                aria-hidden="true"
                className="block h-px w-9 shrink-0 bg-brand-600"
              />
              <blockquote className="mt-7 flex-1">
                <p className="text-[1.0625rem] leading-[1.62] tracking-[-0.015em] text-navy-800 lg:text-[1.125rem]">
                  {item.quote}
                </p>
              </blockquote>
              <figcaption className="mt-8 border-t border-line pt-6">
                <p className="text-[0.9375rem] font-semibold tracking-[-0.015em] text-navy-950">
                  {item.author}
                </p>
                <p className="mt-1 text-[0.8125rem] text-faint">{item.role}</p>
              </figcaption>
            </figure>
          ))}
        </Marquee>
      </Reveal>
    </section>
  );
}
