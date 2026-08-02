import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Section";
import { IconArrowRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "Sayfa bulunamadı",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center bg-paper pt-36 md:pt-44">
      <div className="container-page">
        <Eyebrow>404</Eyebrow>
        <h1 className="text-h2 mt-8 max-w-2xl text-navy-950">
          Aradığınız sayfayı bulamadık.
        </h1>
        <p className="text-lead mt-7 max-w-lg text-muted">
          Bağlantı değişmiş veya kaldırılmış olabilir. Ana sayfadan devam
          edebilir ya da bize doğrudan ulaşabilirsiniz.
        </p>
        <div className="mt-11 flex flex-col gap-3 sm:flex-row">
          <ButtonLink
            href="/"
            size="lg"
            icon={<IconArrowRight className="size-[18px]" />}
          >
            Ana Sayfaya Dön!
          </ButtonLink>
          <ButtonLink href="/iletisim" variant="outline" size="lg">
            İletişim
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
