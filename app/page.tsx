import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Approach } from "@/components/home/Approach";
import { Ribbon } from "@/components/ui/Ribbon";
import { Levels } from "@/components/home/Levels";
import { Subjects } from "@/components/home/Subjects";
import { Coaching } from "@/components/home/Coaching";
import { Process } from "@/components/home/Process";
import { Testimonials } from "@/components/home/Testimonials";
import { Faq } from "@/components/home/Faq";
import { FinalCta } from "@/components/home/FinalCta";
import { faqs, ribbonParents } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `${site.name} | ${site.tagline}`,
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Approach />
      <Ribbon />
      <Levels />
      <Subjects />
      <Coaching />
      <Process />
      <Ribbon items={ribbonParents} tone="brand" tilt="right" />
      <Testimonials />
      <Faq />
      <FinalCta />
      <StructuredData />
    </>
  );
}

/** Kurum ve SSS verisi — arama sonuçlarında zengin sonuç için. */
function StructuredData() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      name: site.name,
      description: site.description,
      url: site.url,
      telephone: site.phone.display,
      email: site.email.display,
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.line2,
        addressLocality: site.address.city,
        addressCountry: "TR",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is escaped for safe inline embedding.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
