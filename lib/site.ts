/**
 * Single source of truth for every piece of institutional data that appears
 * on the site. Change it here, it changes everywhere.
 */

export const site = {
  name: "TOGAN KAMPÜS",
  tagline: "Kişiye Özel Eğitim & Profesyonel Koçluk",
  url: "https://togankampus.com",
  description:
    "TOGAN KAMPÜS, ilkokul, ortaokul ve lise öğrencilerine birebir eğitim ve akademik koçluk sunan kişiye özel eğitim kurumudur.",

  phone: {
    display: "+90 (538) 012 78 44",
    href: "tel:+905380127844",
  },

  whatsapp: {
    /** International format, digits only. */
    number: "905380127844",
    message: "Merhaba, TOGAN KAMPÜS hakkında bilgi almak istiyorum.",
  },

  email: {
    display: "info@togankampus.com",
    href: "mailto:info@togankampus.com",
  },

  address: {
    line1: "Togan Kampüs Eğitim Kurumları",
    line2: "Fulya Mah. Büyükdere Cad. Quasar İstanbul No: 76 Kat: 13 D. No: 188",
    city: "Mecidiyeköy, Şişli / İstanbul",
    mapsQuery:
      "Quasar İstanbul, Büyükdere Cad. No:76, Fulya Mah., Mecidiyeköy, Şişli, İstanbul",
  },

  hours: [
    { days: "Pazartesi – Cuma", time: "09:00 – 20:00" },
    { days: "Cumartesi", time: "10:00 – 18:00" },
    { days: "Pazar", time: "Randevu ile" },
  ],

  social: {
    instagram: "https://instagram.com/togankampus",
  },
} as const;

export const whatsappUrl = `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(
  site.whatsapp.message,
)}`;

export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  site.address.mapsQuery,
)}&output=embed`;

export const mapsLinkUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  site.address.mapsQuery,
)}`;

export const nav = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Hakkımızda", href: "/hakkinda" },
  { label: "Eğitim", href: "/egitim" },
  { label: "Koçluk", href: "/kocluk" },
  { label: "İletişim", href: "/iletisim" },
] as const;

/** Ana sayfadaki bölümler — menüden tıklanınca ilgili bölüme kayar. */
export const sections = [
  { id: "yaklasim", label: "Eğitim Yaklaşımımız" },
  { id: "kademeler", label: "Eğitim Kademeleri" },
  { id: "branslar", label: "Branşlar" },
  { id: "akademik-kocluk", label: "Akademik Koçluk" },
  { id: "surec", label: "Eğitim Süreci" },
  { id: "veli-gorusleri", label: "Veli Görüşleri" },
  { id: "sss", label: "Sık Sorulan Sorular" },
] as const;
