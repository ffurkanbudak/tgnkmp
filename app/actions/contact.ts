"use server";

import { educationLevelOptions, subjectOptions } from "@/lib/content";
import {
  CONTACT_SUCCESS_MESSAGE,
  type ContactFieldName,
  type ContactState,
} from "@/lib/contact";

/** Türkiye cep/sabit hat: 10 rakam, isteğe bağlı 0 veya +90 önek. */
const PHONE_DIGITS = /^(?:\+?90)?0?\d{10}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

function text(data: FormData, key: string) {
  const value = data.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Bot tuzağı: gerçek kullanıcılar bu alanı göremez, dolduramaz.
  if (text(formData, "website")) {
    return { status: "success", message: CONTACT_SUCCESS_MESSAGE, errors: {} };
  }

  const values: Record<ContactFieldName, string> = {
    veliAdi: text(formData, "veliAdi"),
    ogrenciAdi: text(formData, "ogrenciAdi"),
    telefon: text(formData, "telefon"),
    eposta: text(formData, "eposta"),
    kademe: text(formData, "kademe"),
    brans: text(formData, "brans"),
    mesaj: text(formData, "mesaj"),
  };

  const errors: ContactState["errors"] = {};

  if (values.veliAdi.length < 2) {
    errors.veliAdi = "Lütfen adınızı ve soyadınızı yazın.";
  }
  if (values.ogrenciAdi.length < 2) {
    errors.ogrenciAdi = "Lütfen öğrencinin adını yazın.";
  }
  if (!PHONE_DIGITS.test(values.telefon.replace(/[\s()\-.]/g, ""))) {
    errors.telefon = "Geçerli bir telefon numarası girin. Örnek: 0541 000 00 00";
  }
  if (!EMAIL.test(values.eposta)) {
    errors.eposta = "Geçerli bir e-posta adresi girin.";
  }
  if (!educationLevelOptions.includes(values.kademe as never)) {
    errors.kademe = "Lütfen bir eğitim kademesi seçin.";
  }
  if (!subjectOptions.includes(values.brans as never)) {
    errors.brans = "Lütfen bir branş seçin.";
  }
  if (values.mesaj.length > 2000) {
    errors.mesaj = "Mesajınız 2000 karakteri aşmamalı.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Formda eksik veya hatalı alanlar var. Lütfen kontrol edin.",
      errors,
    };
  }

  try {
    await deliverInquiry(values);
  } catch {
    return {
      status: "error",
      message:
        "Talebiniz şu anda iletilemedi. Lütfen bir kez daha deneyin veya bizi telefonla arayın.",
      errors: {},
    };
  }

  return { status: "success", message: CONTACT_SUCCESS_MESSAGE, errors: {} };
}

/**
 * TESLİMAT NOKTASI — henüz bir e-posta/CRM sağlayıcısı bağlanmadı.
 *
 * Form uçtan uca çalışır ve doğrulama yapar, ancak talep şu anda yalnızca
 * sunucu günlüğüne yazılır; kalıcı bir yere düşmez. Canlıya almadan önce
 * burayı gerçek bir servise bağlayın (e-posta gönderimi, CRM kaydı veya
 * veritabanı). Fonksiyon imzası değişmeden bağlanabilir.
 */
async function deliverInquiry(values: Record<ContactFieldName, string>) {
  console.info("[togan-kampus] yeni ön görüşme talebi", {
    ...values,
    alindi: new Date().toISOString(),
  });
}
