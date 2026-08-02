import type { SVGProps } from "react";

/**
 * A single minimal line-icon family: 24×24 grid, 1.5 stroke, round caps.
 * No fills, no colour — icons inherit `currentColor` so they stay academic.
 */

type IconProps = SVGProps<SVGSVGElement>;

function Icon({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Branş ikonları                                                             */
/* -------------------------------------------------------------------------- */

/** Pergel — Matematik */
export function IconCompass(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="4.5" r="1.75" />
      <path d="M11 6.1 6.2 20.5M13 6.1l4.8 14.4" />
      <path d="M7.7 17.4a6.4 6.4 0 0 0 8.6 0" />
    </Icon>
  );
}

/** Harf ve satır — Türkçe */
export function IconLetter(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6.5 16.5 12 4.5l5.5 12M8.7 12.6h6.6M4 20.5h16" />
    </Icon>
  );
}

/** Küre — İngilizce */
export function IconGlobe(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17" />
      <ellipse cx="12" cy="12" rx="3.6" ry="8.5" />
    </Icon>
  );
}

/** Erlenmayer — Fen Bilimleri */
export function IconFlask(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M9.5 3h5M10.5 3v6.2L5.6 18.2a2 2 0 0 0 1.75 3h9.3a2 2 0 0 0 1.75-3L13.5 9.2V3" />
      <path d="M8.2 14.8h7.6" />
    </Icon>
  );
}

/** Topluluk — Sosyal Bilgiler */
export function IconCommunity(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="7" r="2.6" />
      <path d="M7.6 19.5a4.4 4.4 0 0 1 8.8 0" />
      <circle cx="4.6" cy="10.6" r="1.9" />
      <circle cx="19.4" cy="10.6" r="1.9" />
      <path d="M2 19.5a3.1 3.1 0 0 1 3.4-3.05M22 19.5a3.1 3.1 0 0 0-3.4-3.05" />
    </Icon>
  );
}

/** Sütun — Tarih */
export function IconColumn(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 5.5h16M4 20.5h16" />
      <path d="M6.5 5.5v15M12 5.5v15M17.5 5.5v15" />
      <path d="M5 8.5h14M5 17.5h14" />
    </Icon>
  );
}

/** Katlanmış harita — Coğrafya */
export function IconMap(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M9 4.5 3.5 6.9v12.6L9 17.1l6 2.4 5.5-2.4V4.5L15 6.9 9 4.5Z" />
      <path d="M9 4.5v12.6M15 6.9v12.6" />
    </Icon>
  );
}

/** Atom — Fizik */
export function IconAtom(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="1.9" />
      <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(30 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(-30 12 12)" />
    </Icon>
  );
}

/** Benzen halkası — Kimya */
export function IconMolecule(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 3.2 20 7.8v8.4L12 20.8 4 16.2V7.8l8-4.6Z" />
      <circle cx="12" cy="12" r="3.4" />
    </Icon>
  );
}

/** DNA — Biyoloji */
export function IconDna(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M7 3c0 5 10 5 10 9s-10 4-10 9M17 3c0 5-10 5-10 9s10 4 10 9" />
      <path d="M8.4 7h7.2M8.4 17h7.2M7.2 12h9.6" />
    </Icon>
  );
}

/** Divit ucu — Türk Dili ve Edebiyatı */
export function IconNib(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 2.6 18.2 9 12 21.4 5.8 9 12 2.6Z" />
      <path d="M12 9.4V16" />
      <circle cx="12" cy="8.2" r="1.2" />
    </Icon>
  );
}

/* -------------------------------------------------------------------------- */
/* Arayüz ikonları                                                            */
/* -------------------------------------------------------------------------- */

/** Mezuniyet şapkası — logonun yanındaki kurum işareti */
export function IconGraduationCap(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 4 21.5 8.6 12 13.2 2.5 8.6 12 4Z" />
      <path d="M6.6 10.8v4.4c0 1.6 2.4 2.8 5.4 2.8s5.4-1.2 5.4-2.8v-4.4" />
      <path d="M21.5 8.6v5.2" />
    </Icon>
  );
}

export function IconArrowUpRight(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M7.5 16.5 16.5 7.5M9 7.5h7.5V15" />
    </Icon>
  );
}

export function IconArrowRight(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4.5 12h15M13.5 6l6 6-6 6" />
    </Icon>
  );
}

export function IconPhone(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6.3 3.5h3l1.5 3.8-2 1.4a11.5 11.5 0 0 0 5.5 5.5l1.4-2 3.8 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.3 5.7a2 2 0 0 1 2-2.2Z" />
    </Icon>
  );
}

export function IconMail(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="m4.5 8 6.4 4.4a2 2 0 0 0 2.2 0L19.5 8" />
    </Icon>
  );
}

export function IconPin(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 21.5s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11Z" />
      <circle cx="12" cy="10.2" r="2.6" />
    </Icon>
  );
}

export function IconClock(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5.2l3.2 2" />
    </Icon>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m5 12.5 4.5 4.5L19 7" />
    </Icon>
  );
}

export function IconWhatsapp(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.74.46 3.44 1.32 4.94L2.1 22l5.36-1.4a9.82 9.82 0 0 0 4.58 1.16h.01c5.43 0 9.84-4.4 9.84-9.84C21.89 6.4 17.48 2 12.04 2Zm0 18a8.2 8.2 0 0 1-4.16-1.14l-.3-.18-3.18.83.85-3.1-.2-.32a8.14 8.14 0 0 1-1.25-4.35c0-4.52 3.68-8.19 8.2-8.19 2.2 0 4.25.85 5.8 2.4a8.14 8.14 0 0 1 2.4 5.8c0 4.52-3.68 8.2-8.16 8.2Zm4.5-6.13c-.24-.13-1.45-.72-1.68-.8-.22-.08-.39-.12-.55.12-.16.25-.63.8-.78.97-.14.16-.28.18-.52.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.22-1.46-1.37-1.7-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.24-.41.08-.17.04-.31-.02-.43-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.3-.22.25-.85.84-.85 2.04s.87 2.37 1 2.53c.12.17 1.71 2.62 4.15 3.67.58.25 1.03.4 1.39.51.58.19 1.11.16 1.53.1.47-.07 1.45-.59 1.65-1.17.2-.57.2-1.06.14-1.16-.06-.11-.22-.17-.47-.29Z" />
    </svg>
  );
}

export function IconInstagram(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17" cy="7" r="0.9" fill="currentColor" />
    </Icon>
  );
}
