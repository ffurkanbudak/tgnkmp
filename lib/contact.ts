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
};

export const initialContactState: ContactState = {
  status: "idle",
  message: "",
  errors: {},
};

export const CONTACT_SUCCESS_MESSAGE =
  "Talebiniz bize ulaştı. Eğitim danışmanımız aynı gün içinde sizi arayacak.";
