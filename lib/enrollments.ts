/**
 * Sol altta beliren katılım bildirimleri.
 *
 * ÖNEMLİ — buradaki kayıtlar YER TUTUCUDUR. Canlıya almadan önce gerçek ve
 * izinli kayıtlarla değiştirin. Öğrenci verisi paylaşımı için velinin açık
 * rızası gerekir (KVKK); soyadı bu yüzden yalnızca baş harfiyle gösterilir.
 *
 * `photo` alanı isteğe bağlıdır. Verilmediğinde baş harflerden oluşan bir
 * monogram görünür; bir fotoğraf yolu verildiğinde kart hiç değişmeden
 * fotoğrafı gösterir. Çocuk fotoğrafı eklemeden önce mutlaka velisinden
 * yazılı izin alın.
 */

export type Enrollment = {
  /** Ad — açık yazılır. */
  first: string;
  /** Soyadın yalnızca baş harfi. */
  initial: string;
  level: string;
  subject: string;
  /** örn. "/images/ogrenciler/elif-k.jpg" */
  photo?: string;
};

export const enrollments: ReadonlyArray<Enrollment> = [
  { first: "Elif", initial: "K.", level: "6. sınıf", subject: "Matematik" },
  { first: "Yusuf", initial: "A.", level: "4. sınıf", subject: "Türkçe" },
  { first: "Zeynep", initial: "D.", level: "8. sınıf", subject: "LGS programı" },
  { first: "Mert", initial: "S.", level: "3. sınıf", subject: "Okuma anlama" },
  { first: "Ada", initial: "Y.", level: "7. sınıf", subject: "Fen Bilimleri" },
  { first: "Kerem", initial: "B.", level: "5. sınıf", subject: "Matematik" },
  { first: "Defne", initial: "Ö.", level: "2. sınıf", subject: "Temel matematik" },
  { first: "Aras", initial: "T.", level: "8. sınıf", subject: "Akademik koçluk" },
];
