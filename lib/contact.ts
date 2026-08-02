/**
 * Shared shape for the contact form.
 *
 * Lives outside the action module on purpose: a `"use server"` file may only
 * export async functions, so types and the initial state cannot live there.
 */

export type ContactFieldName =
  | "veliAdi"
  | "ogrenciAdi"
  | "telefon"
  | "eposta"
  | "kademe"
  | "brans"
  | "mesaj";

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
  errors: Partial<Record<ContactFieldName, string>>;
  /** Form içeriğiyle önceden doldurulmuş WhatsApp bağlantısı. */
  whatsappHref?: string;
};

export const initialContactState: ContactState = {
  status: "idle",
  message: "",
  errors: {},
};

export const CONTACT_SUCCESS_MESSAGE =
  "Talebiniz WhatsApp'a aktarıldı. Göndermeniz yeterli — eğitim danışmanımız aynı gün içinde size dönecek.";

const FIELD_LABELS: Record<ContactFieldName, string> = {
  veliAdi: "Veli",
  ogrenciAdi: "Öğrenci",
  telefon: "Telefon",
  eposta: "E-posta",
  kademe: "Kademe",
  brans: "Branş",
  mesaj: "Mesaj",
};

/**
 * Form alanlarını okunaklı tek bir WhatsApp mesajına çevirir ve kurumun
 * numarasına önceden doldurulmuş `wa.me` bağlantısını üretir. Kullanıcı
 * WhatsApp'ta yalnızca "gönder"e basar; talep numaramıza düşer.
 */
export function buildWhatsappHref(
  values: Record<ContactFieldName, string>,
  whatsappNumber: string,
) {
  const order: ContactFieldName[] = [
    "veliAdi",
    "ogrenciAdi",
    "telefon",
    "eposta",
    "kademe",
    "brans",
  ];

  const lines = [
    "Merhaba, TOGAN KAMPÜS ön görüşme talebi:",
    "",
    ...order.map((key) => `${FIELD_LABELS[key]}: ${values[key]}`),
  ];

  if (values.mesaj) {
    lines.push("", `${FIELD_LABELS.mesaj}: ${values.mesaj}`);
  }

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
}
