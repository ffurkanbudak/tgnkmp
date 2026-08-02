import { Marquee } from "@/components/ui/Marquee";
import { ribbon } from "@/lib/content";

type Tone = "navy" | "brand";
type Tilt = "left" | "right";

const toneClass: Record<Tone, string> = {
  navy: "bg-navy-900 shadow-[0_2px_4px_rgba(13,21,38,0.10),0_20px_44px_-26px_rgba(13,21,38,0.6)]",
  brand:
    "bg-brand-600 shadow-[0_2px_4px_rgba(190,19,26,0.14),0_20px_44px_-26px_rgba(190,19,26,0.6)]",
};

const tiltClass: Record<Tilt, string> = {
  left: "-rotate-[1.5deg]",
  right: "rotate-[1.5deg]",
};

/**
 * Duyuru şeridi.
 *
 * İki bölümün birleştiği çizginin tam üzerine oturur: negatif dikey marjla hem
 * üstteki hem alttaki bölümün içine taşar. Kenardan kenara uzanır, hafifçe
 * eğiktir ve duyurular sağdan sola kesintisiz akar; üzerine gelindiğinde durur.
 *
 * Eğim yüzünden köşelerde boşluk kalmasın diye bant görüntü alanından biraz
 * geniş tutulur. Sarmalayıcıdaki yatay kırpma, bu fazlalığın sayfaya yatay
 * kaydırma çubuğu eklemesini önler; dikey taşma serbest kalır ki eğik bandın
 * uçları kesilmesin.
 */
export function Ribbon({
  items = ribbon,
  tone = "navy",
  tilt = "left",
}: {
  items?: ReadonlyArray<string>;
  tone?: Tone;
  tilt?: Tilt;
}) {
  return (
    <div
      aria-label="Duyurular"
      className="relative z-20 -my-6 [overflow-x:clip] [overflow-y:visible] md:-my-8"
    >
      <div
        className={`w-[106%] -translate-x-[3%] py-3.5 md:py-4 ${tiltClass[tilt]} ${toneClass[tone]}`}
      >
        <Marquee duration={46} fade={false}>
          {items.map((item) => (
            <span
              key={item}
              className="flex shrink-0 items-center gap-6 whitespace-nowrap text-[0.8125rem] font-semibold uppercase tracking-[0.18em] text-white md:gap-8 md:text-[0.875rem]"
            >
              {item}
              <span
                aria-hidden="true"
                className="size-2 shrink-0 rounded-[2px] bg-white md:size-2.5"
              />
            </span>
          ))}
        </Marquee>
      </div>
    </div>
  );
}
