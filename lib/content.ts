import type { ComponentType, SVGProps } from "react";
import {
  IconAtom,
  IconColumn,
  IconCommunity,
  IconCompass,
  IconDna,
  IconFlask,
  IconGlobe,
  IconLetter,
  IconMap,
  IconMolecule,
  IconNib,
} from "@/components/icons";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

/* -------------------------------------------------------------------------- */
/* Hero                                                                       */
/* -------------------------------------------------------------------------- */

export const hero = {
  eyebrow: "İlkokul · Ortaokul · Lise",
  title: ["İlkokuldan Liseye", "Birebir Eğitim ve Akademik Koçluk"],
  lead: "İlkokulda çalışma alışkanlığı, ortaokulda LGS hazırlığı, lisede YKS stratejisi. TOGAN KAMPÜS'te her kademe, o dönemin gerçek ihtiyacına göre kurulmuş yazılı bir programla yürütülür.",
  proof: [
    "Birebir ders",
    "Öğretmen eşleştirmesi",
    "Haftalık ilerleme takibi",
    "Düzenli veli görüşmesi",
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* 01 — Eğitim Yaklaşımımız                                                   */
/* -------------------------------------------------------------------------- */

export const approach = {
  title: "Kalabalık bir sınıfta kaybolmayan bir eğitim.",
  lead: "Her çocuğun öğrenme hızı farklıdır. Bu nedenle programı çocuğa göre kurar, ilerledikçe yeniden düzenleriz.",
  pillars: [
    {
      title: "Tek öğrenciye odaklanma",
      body: "Ders saati boyunca öğretmenin tüm dikkati tek bir öğrencide kalır. Anlaşılmayan konu, ders bitmeden kapanır.",
    },
    {
      title: "Ölçülebilir ilerleme",
      body: "Seviye düzenli aralıklarla ölçülür. İlerleme, tahmine bırakılmadan kayıt altına alınır.",
    },
    {
      title: "Kurumsal disiplin",
      body: "Devam takibi, ders planlaması ve raporlama tek bir sistem üzerinden yürütülür.",
    },
    {
      title: "Şeffaf veli iletişimi",
      body: "Veli, çocuğunun akademik durumunu her zaman bilir. Dönem sonunda sürpriz olmaz.",
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* Duyuru şeridi                                                              */
/* -------------------------------------------------------------------------- */

/** Kademeler bölümünün üstünde akan duyuru bandı. */
export const ribbon = [
  "Togan Deneme pek yakında!",
  "Ön görüşme ücretsiz",
  "Yeni dönem kayıtları başladı",
  "Birebir eğitim · Akademik koçluk",
  "İlkokul · Ortaokul · Lise",
] as const;

/** Veli Görüşleri bölümünün üstünde akan ikinci bant. */
export const ribbonParents = [
  "Veli bilgilendirme sistemi aktif",
  "Her ders sonunda kazanım kaydı",
  "Dönemsel veli görüşmesi",
  "Sorularınıza aynı gün dönüş",
  "Şeffaf akademik takip",
] as const;

/* -------------------------------------------------------------------------- */
/* 02 — Eğitim Kademeleri                                                     */
/* -------------------------------------------------------------------------- */

/**
 * Kademeler bir merdiven gibi kurgulanır: her biri bir sonrakinin zeminini
 * hazırlar. `step` ve `accent`, kartların birbirinden ayrışmasını sağlar.
 */
export const levels = [
  {
    id: "ilkokul",
    step: 1,
    stage: "Temel Seviye",
    accent: "#63769A",
    name: "İlkokul",
    grades: "1 – 4. Sınıf",
    body: "Okuduğunu anlama, temel matematik ve düzenli çalışma alışkanlığı bu dönemde kurulur. Kazanılan öğrenme disiplini, sonraki yılların tamamını belirler.",
    focus: [
      "Okuduğunu anlama",
      "Temel matematik becerileri",
      "Çalışma alışkanlığı",
      "Ödev ve tekrar takibi",
    ],
  },
  {
    id: "ortaokul",
    step: 2,
    stage: "Hazırlık Seviyesi",
    accent: "#24375E",
    name: "Ortaokul",
    grades: "5 – 8. Sınıf",
    body: "Konu eksiklerinin kapatılması ve LGS'ye yapılandırılmış hazırlık. Deneme analizi ve soru çözüm tekniği birebir yürütülür.",
    focus: [
      "Konu eksiği kapatma",
      "LGS hazırlık programı",
      "Deneme analizi",
      "Soru çözüm tekniği",
    ],
  },
  {
    id: "lise",
    step: 3,
    stage: "Strateji Seviyesi",
    accent: "#E01F27",
    name: "Lise",
    grades: "9 – 12. Sınıf",
    body: "YKS odaklı programlama, ders bazlı derinleşme ve tercih dönemine kadar kesintisiz süren akademik danışmanlık.",
    focus: [
      "YKS yol haritası",
      "TYT / AYT derinleşme",
      "Zaman ve verim yönetimi",
      "Tercih danışmanlığı",
    ],
  },
] as const;

/* -------------------------------------------------------------------------- */
/* 03 — Branşlar                                                              */
/* -------------------------------------------------------------------------- */

export const subjects: ReadonlyArray<{
  name: string;
  levels: string;
  Icon: IconComponent;
}> = [
  { name: "Matematik", levels: "İlkokul · Ortaokul · Lise", Icon: IconCompass },
  { name: "Türkçe", levels: "İlkokul · Ortaokul", Icon: IconLetter },
  { name: "İngilizce", levels: "İlkokul · Ortaokul · Lise", Icon: IconGlobe },
  { name: "Fen Bilimleri", levels: "İlkokul · Ortaokul", Icon: IconFlask },
  { name: "Sosyal Bilgiler", levels: "İlkokul · Ortaokul", Icon: IconCommunity },
  { name: "Tarih", levels: "Lise", Icon: IconColumn },
  { name: "Coğrafya", levels: "Lise", Icon: IconMap },
  { name: "Fizik", levels: "Lise", Icon: IconAtom },
  { name: "Kimya", levels: "Lise", Icon: IconMolecule },
  { name: "Biyoloji", levels: "Lise", Icon: IconDna },
  { name: "Türk Dili ve Edebiyatı", levels: "Lise", Icon: IconNib },
];

/* -------------------------------------------------------------------------- */
/* 04 — Akademik Koçluk                                                       */
/* -------------------------------------------------------------------------- */

export const coaching = {
  title: "Ders tek başına yeterli olmaz. Yönetilmeyen çalışma sonuç üretmez.",
  lead: "Her öğrencinin bir akademik koçu vardır. Koç; haftalık programı kurar, uygulanıp uygulanmadığını takip eder ve gerektiğinde planı yeniden yazar.",
  items: [
    {
      title: "Haftalık çalışma programı",
      body: "Ders yükü, sınav takvimi ve günlük rutin dikkate alınarak yazılı olarak hazırlanır.",
    },
    {
      title: "Düzenli birebir görüşme",
      body: "Koç, öğrenciyle her hafta yüz yüze görüşür. Aksayan konu bir sonraki haftaya taşınmaz.",
    },
    {
      title: "Deneme ve sınav analizi",
      body: "Her deneme, net sayısının ötesinde konu ve hata tipi bazında incelenir.",
    },
    {
      title: "Süreç ve motivasyon yönetimi",
      body: "Sınav dönemlerinde asıl mesele, kurulan plana istikrarla sadık kalabilmektir.",
    },
    {
      title: "Veli bilgilendirmesi",
      body: "Veli, dönem sonunu beklemeden çocuğunun gerçek akademik durumunu öğrenir.",
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* 05 — Eğitim Süreci                                                         */
/* -------------------------------------------------------------------------- */

export const process = [
  {
    title: "Tanışma",
    body: "Veli ve öğrenciyle ön görüşme yapılır. Beklentiler, hedefler ve mevcut durum dinlenir.",
  },
  {
    title: "Seviye Analizi",
    body: "Öğrencinin gerçek seviyesi branş bazında ölçülür. Eksikler ve güçlü yönler netleşir.",
  },
  {
    title: "Öğretmen Eşleştirmesi",
    body: "Öğrencinin seviyesine ve öğrenme biçimine en uygun branş öğretmeni belirlenir.",
  },
  {
    title: "Kişisel Eğitim Planı",
    body: "Haftalık ders programı, konu sıralaması ve hedef takvimi yazılı olarak hazırlanır.",
  },
  {
    title: "Birebir Eğitim",
    body: "Dersler tek öğrenciyle işlenir. Her ders sonunda kazanım kaydı tutulur.",
  },
  {
    title: "Akademik Takip",
    body: "İlerleme düzenli olarak ölçülür, plan güncellenir ve veli bilgilendirilir.",
  },
] as const;

/* -------------------------------------------------------------------------- */
/* 06 — Öğretmen Kadrosu                                                      */
/* -------------------------------------------------------------------------- */

/**
 * PLACEHOLDER ROSTER — replace with the real teaching staff before launch.
 *
 * `photo` and `bio` are intentionally optional: filling them in later renders
 * the portrait and detail panel automatically, with no layout change required.
 */
export type Teacher = {
  name: string;
  branch: string;
  /** e.g. "/images/ogretmenler/ayse-demir.jpg" */
  photo?: string;
  bio?: string;
};

export const teachers: ReadonlyArray<Teacher> = [
  { name: "Ayşe Demir", branch: "Matematik" },
  { name: "Mehmet Yıldırım", branch: "Fizik" },
  { name: "Elif Kaya", branch: "Türkçe" },
  { name: "Burak Şahin", branch: "Kimya" },
  { name: "Zeynep Aydın", branch: "İngilizce" },
  { name: "Ahmet Toprak", branch: "Biyoloji" },
  { name: "Selin Arslan", branch: "Türk Dili ve Edebiyatı" },
  { name: "Emre Çetin", branch: "Matematik" },
  { name: "Deniz Korkmaz", branch: "Fen Bilimleri" },
  { name: "Merve Güneş", branch: "Sosyal Bilgiler" },
  { name: "Okan Yılmaz", branch: "Tarih" },
  { name: "Ceren Aksoy", branch: "Coğrafya" },
];

/* -------------------------------------------------------------------------- */
/* 07 — Veli Görüşleri                                                        */
/* -------------------------------------------------------------------------- */

/** PLACEHOLDER — replace with real, permissioned parent feedback before launch. */
export const testimonials = [
  {
    quote:
      "Oğlumun matematikte tam olarak nerede takıldığını ilk kez net biçimde öğrendik. Haftalık geri bildirimler bizim için çok değerli.",
    author: "Ayça T.",
    role: "7. sınıf velisi",
  },
  {
    quote:
      "Kalabalık sınıfta soru sormaktan çekinen bir çocuktu. Birebir derste bu tamamen değişti.",
    author: "Murat K.",
    role: "5. sınıf velisi",
  },
  {
    quote:
      "Öğretmen eşleştirmesi ciddi bir fark yarattı. Kızım ilk haftadan itibaren uyum sağladı.",
    author: "Selda A.",
    role: "11. sınıf velisi",
  },
  {
    quote:
      "Koçluk görüşmeleri sayesinde çalışma düzeni oturdu. Artık biz hatırlatmıyoruz.",
    author: "Hakan B.",
    role: "9. sınıf velisi",
  },
  {
    quote:
      "Kurumun en beğendiğim yanı iletişimi. Sorduğumuz her soruya aynı gün dönüş yapılıyor.",
    author: "Nurcan Ö.",
    role: "6. sınıf velisi",
  },
  {
    quote:
      "LGS sürecinde en çok ihtiyacımız olan şey plandı. O planı profesyonelce yönettiler.",
    author: "İbrahim D.",
    role: "8. sınıf velisi",
  },
  {
    quote:
      "Deneme analizlerinin bu kadar ayrıntılı yapıldığını daha önce görmemiştim.",
    author: "Esra M.",
    role: "12. sınıf velisi",
  },
  {
    quote:
      "Çocuğumuzun kendine güveni arttı. Bizim için not ortalamasından önce gelen buydu.",
    author: "Gökhan S.",
    role: "10. sınıf velisi",
  },
] as const;

/* -------------------------------------------------------------------------- */
/* 08 — Sık Sorulan Sorular                                                   */
/* -------------------------------------------------------------------------- */

export const faqs = [
  {
    q: "Dersler gerçekten birebir mi işleniyor?",
    a: "Evet. Tüm derslerimiz tek öğretmen ve tek öğrenciyle yapılır. Grup dersi uygulamamız bulunmuyor.",
  },
  {
    q: "Öğretmen eşleştirmesi nasıl yapılıyor?",
    a: "Seviye analizinin ardından öğrencinin akademik durumu ve öğrenme biçimi değerlendirilir; branş öğretmenlerimiz arasından en uygun eşleşme belirlenir. Uyum sağlanamadığı durumda öğretmen değişikliği yapılabilir.",
  },
  {
    q: "Ders programı nasıl belirleniyor?",
    a: "Program, öğrencinin okul saatleri ve haftalık yükü dikkate alınarak veliyle birlikte oluşturulur. Sınav dönemlerinde yoğunluk artırılabilir.",
  },
  {
    q: "Veli olarak süreci nasıl takip edebilirim?",
    a: "Her ders sonunda kazanım kaydı tutulur ve düzenli aralıklarla tarafınıza iletilir. Ayrıca akademik koç ile dönemsel veli görüşmeleri planlanır.",
  },
  {
    q: "Ön görüşme ücretli mi?",
    a: "Hayır. Ön görüşme ve seviye analizi ücretsizdir ve herhangi bir kayıt yükümlülüğü doğurmaz.",
  },
  {
    q: "Hangi sınıf seviyelerine eğitim veriyorsunuz?",
    a: "İlkokul 1. sınıftan lise 12. sınıfa kadar tüm kademelerde birebir eğitim ve akademik koçluk sunuyoruz.",
  },
  {
    q: "Ders telafisi yapılıyor mu?",
    a: "Önceden bildirilen mazeretli durumlarda ders, aynı hafta içinde telafi edilir.",
  },
  {
    q: "Çevrim içi birebir ders imkânı var mı?",
    a: "Evet. Kampüs içi birebir derslerin yanında, uygun branşlarda çevrim içi birebir ders de yapılabilmektedir.",
  },
] as const;

/* -------------------------------------------------------------------------- */
/* Final çağrı                                                                */
/* -------------------------------------------------------------------------- */

export const finalCta = {
  title: "Çocuğunuz için doğru planı birlikte kuralım.",
  lead: "Ön görüşme ücretsizdir ve yaklaşık 30 dakika sürer. Görüşmenin sonunda çocuğunuzun mevcut durumu ve izlenmesi gereken yol net olur.",
} as const;

/* -------------------------------------------------------------------------- */
/* Eğitim sayfası                                                             */
/* -------------------------------------------------------------------------- */

export const educationPage = {
  eyebrow: "Eğitim",
  title: "Tek öğrenciye kurulmuş bir ders saati.",
  lead: "Birebir eğitim, ders anlatımının küçültülmüş hâlinden fazlasıdır. Öğretmen tek bir öğrencinin hızına göre ilerler; anlaşılmayan konu ders bitmeden kapanır.",

  model: [
    {
      title: "Ders öncesi hazırlık",
      body: "Öğretmen, bir önceki dersin kazanım kaydını ve haftalık planı gözden geçirerek gelir. Ders, boş bir sayfadan başlamaz.",
    },
    {
      title: "Anlatım ve uygulama",
      body: "Konu anlatımı ile soru çözümü aynı saat içinde birleşir. Öğrenci konuyu dinlemekle kalmaz, öğretmenin gözü önünde uygular.",
    },
    {
      title: "Anlaşılmayan noktanın kapatılması",
      body: "Takılınan yer ertelenmez. Gerekirse konunun temeline dönülür ve eksik aynı derste tamamlanır.",
    },
    {
      title: "Ders sonu kaydı",
      body: "İşlenen konu, tamamlanan kazanım ve varsa aksayan başlık yazılı olarak kayda geçer. Bu kayıt hem koça hem veliye açıktır.",
    },
  ],

  promise: [
    { k: "1", v: "Öğretmene bir öğrenci" },
    { k: "%100", v: "Ders saatinde odak" },
    { k: "Her ders", v: "Yazılı kazanım kaydı" },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* Koçluk sayfası                                                             */
/* -------------------------------------------------------------------------- */

export const coachingPage = {
  eyebrow: "Akademik Koçluk",
  title: "Ders biter ve süreç devam eder.",
  lead: "Akademik koç, dersin dışında kalan her şeyi yönetir: haftalık planı kurar, uygulanıp uygulanmadığını izler, öğrencinin çalışma düzenini ve motivasyonunu takip eder, veliyi bilgilendirir.",

  pillars: [
    {
      title: "Ders Takibi",
      body: "Her dersin kazanım kaydı koç tarafından okunur. Tekrarlayan bir eksik görüldüğünde program aynı hafta içinde güncellenir.",
      items: [
        "Kazanım kayıtlarının haftalık okunması",
        "Ödev ve tekrar kontrolü",
        "Deneme sonuçlarının konu bazlı analizi",
        "Aksayan başlıkların programa geri alınması",
      ],
    },
    {
      title: "Motivasyon ve Çalışma Alışkanlığı",
      body: "Öğrencinin çalışma düzeni, sınav dönemlerindeki kaygısı ve özgüveni koçluk görüşmelerinin konusudur. Amaç, plana istikrarla sadık kalabilen bir öğrenci yetiştirmektir.",
      items: [
        "Haftalık birebir koçluk görüşmesi",
        "Gerçekçi hedef belirleme",
        "Sınav dönemi kaygı yönetimi",
        "Düzenli çalışma alışkanlığının kurulması",
      ],
    },
    {
      title: "Veli İletişimi",
      body: "Veli, çocuğunun akademik durumunu dönem sonunu beklemeden öğrenir. Koç, hem iyi giden hem aksayan başlıkları olduğu gibi aktarır.",
      items: [
        "Düzenli ilerleme bilgilendirmesi",
        "Dönemsel veli görüşmesi",
        "Program değişikliklerinin paylaşılması",
        "Sorulara aynı gün dönüş",
      ],
    },
  ],

  weekly: [
    { day: "Pazartesi", body: "Haftalık program öğrenciyle birlikte gözden geçirilir." },
    { day: "Hafta içi", body: "Ders kayıtları ve ödev takibi koç tarafından izlenir." },
    { day: "Cuma", body: "Birebir koçluk görüşmesi yapılır; hafta değerlendirilir." },
    { day: "Hafta sonu", body: "Gelecek haftanın planı yazılır, gerekirse veli bilgilendirilir." },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* Hakkımızda sayfası                                                         */
/* -------------------------------------------------------------------------- */

export const aboutPage = {
  title: "Hakkında",
  lead: "Her öğrencinin öğrenme biçimini, güçlü yönlerini ve hedeflerini merkeze alan yeni nesil bir eğitim markası.",

  intro: [
    "Togan Kampüs, 1. sınıftan 12. sınıfa kadar öğrencilerin akademik gelişimlerini, yaşam becerilerini ve geleceğe hazırlık süreçlerini destekleyen yeni nesil bir eğitim markasıdır. Her öğrencinin öğrenme biçimini, güçlü yönlerini ve hedeflerini merkeze alan eğitim anlayışıyla gelişimi çok yönlü bir bakış açısıyla ele alır.",
    "İlkokul, ortaokul ve lise öğrencileri için bireyselleştirilmiş eğitim programları, özel ders ve akademik koçluk hizmetleri sunan Togan Kampüs; LGS ve YKS başta olmak üzere tüm sınava hazırlık süreçlerini planlı, disiplinli ve sürdürülebilir bir sistemle yürütür. Her öğrenci için hazırlanan kişiselleştirilmiş çalışma planları, düzenli akademik takip ve performans değerlendirmeleriyle gelişim süreci sürekli desteklenir.",
  ],

  methodology: {
    eyebrow: "Toganworks Metodolojisi",
    title: "Eğitim anlayışımızın temeli.",
    lead: "Eğitim anlayışının temelinde Toganworks metodolojisi yer alır. Bu metodoloji; öğrencilerin akademik performanslarını geliştirirken ilgi alanlarını keşfetmelerini, analitik düşünme becerilerini güçlendirmelerini, özgüven kazanmalarını ve gelecekte yönelecekleri eğitim ile kariyer yolculuğuna daha bilinçli hazırlanmalarını esas alır.",
    items: [
      "Akademik performansın geliştirilmesi",
      "İlgi alanlarının keşfedilmesi",
      "Analitik düşünme becerilerinin güçlendirilmesi",
      "Özgüven kazanımı",
      "Eğitim ve kariyer yolculuğuna bilinçli hazırlık",
    ],
  },

  team: {
    eyebrow: "Ekibimiz",
    title: "Deneyimli bir kadro, tek bir sistem.",
    lead: "Yeni bir eğitim markası olmasına karşın, alanında deneyimli öğretmenlerden, akademik koçlardan ve uzman psikolojik danışmanlar ile rehberlik kadrosundan oluşan güçlü ekibiyle öğrencilerin gelişim süreçlerine kapsamlı destek sunar. Akademik ilerleme, rehberlik, motivasyon, hedef belirleme, sınav yönetimi ve düzenli gelişim takibi tek bir sistem içerisinde ele alınır.",
    items: [
      "Akademik ilerleme",
      "Rehberlik",
      "Motivasyon",
      "Hedef belirleme",
      "Sınav yönetimi",
      "Düzenli gelişim takibi",
    ],
  },

  outcomes: {
    eyebrow: "Kazanımlar",
    title: "Bütüncül eğitim modelinin sonucu.",
    lead: "Bu bütüncül eğitim modeli sayesinde öğrenciler akademik hedeflerine daha emin adımlarla ilerlerken planlı çalışma alışkanlığı kazanır, zamanı verimli kullanmayı öğrenir, analitik düşünme becerilerini geliştirir ve geleceğine bilinçli kararlar verebilecek donanıma ulaşır.",
    items: [
      "Planlı çalışma alışkanlığı",
      "Zamanı verimli kullanma",
      "Gelişmiş analitik düşünme",
      "Geleceğe dair bilinçli karar",
    ],
    closing:
      "Güçlü akademik kadrosu, deneyimli öğretmenleri, akademik koçları ve rehberlik ekibiyle Togan Kampüs, potansiyelini en üst seviyeye taşımak ve geleceğini bugünden şekillendirmek isteyen tüm öğrencileri yeni başarı hikâyeleri yazmaya davet ediyor.",
  },
} as const;

/* -------------------------------------------------------------------------- */
/* İletişim sayfası                                                           */
/* -------------------------------------------------------------------------- */

export const contactPage = {
  eyebrow: "İletişim",
  title: "Ön görüşme talebi oluşturun.",
  lead: "Formu doldurun; eğitim danışmanımız aynı gün içinde size dönüş yapsın. Dilerseniz doğrudan telefonla da ulaşabilirsiniz.",
  formNote:
    "Paylaştığınız bilgiler yalnızca ön görüşme planlaması için kullanılır, üçüncü kişilerle paylaşılmaz.",
} as const;

export const educationLevelOptions = [
  "İlkokul (1 – 4. Sınıf)",
  "Ortaokul (5 – 8. Sınıf)",
  "Lise (9 – 12. Sınıf)",
] as const;

export const subjectOptions = [
  ...subjects.map((s) => s.name),
  "Birden fazla branş",
  "Henüz karar vermedim",
] as const;
