import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { PencilCursor } from "@/components/cursor/PencilCursor";
import { EnrollmentToasts } from "@/components/social/EnrollmentToasts";
import { site } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "birebir eğitim",
    "akademik koçluk",
    "özel ders",
    "LGS hazırlık",
    "YKS hazırlık",
    "kişiye özel eğitim",
    "Togan Kampüs",
  ],
  // og:title ve twitter:title bilerek yazılmaz: böylece her sayfanın kendi
  // başlığı paylaşım kartına da geçer, kök başlık her yerde tekrarlanmaz.
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: site.url,
    siteName: site.name,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    description: site.description,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#0d1526",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={manrope.variable}>
      <body className="antialiased">
        <a
          href="#icerik"
          className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[100] focus:rounded-full focus:bg-navy-900 focus:px-6 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          İçeriğe geç
        </a>

        <SmoothScroll />
        <PencilCursor />
        <Header />
        <main id="icerik">{children}</main>
        <Footer />
        <EnrollmentToasts />
      </body>
    </html>
  );
}
