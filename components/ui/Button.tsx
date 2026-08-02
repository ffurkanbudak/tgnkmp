import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "outline" | "outlineLight" | "quiet";
type Size = "md" | "lg";

/**
 * Çerçeveli buton dili: her buton görünür bir kenarlığa sahiptir, köşeler
 * yumuşak dikdörtgendir ve ikon metnin solunda durur.
 */
const base =
  "group/btn relative isolate inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-[14px] border font-semibold tracking-[-0.01em] transition-[color,background-color,border-color,box-shadow,transform] duration-500 ease-[var(--ease-out-expo)] active:scale-[0.985] whitespace-nowrap";

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-[3.375rem] px-7 text-[1rem]",
};

const variants: Record<Variant, string> = {
  primary:
    "border-brand-600 bg-brand-600 text-white shadow-[0_1px_2px_rgba(190,19,26,0.22),0_14px_30px_-16px_rgba(190,19,26,0.5)] hover:border-brand-700 hover:shadow-[0_2px_4px_rgba(190,19,26,0.26),0_20px_40px_-18px_rgba(190,19,26,0.55)]",
  outline:
    "border-navy-900/18 bg-transparent text-navy-900 hover:border-navy-900/45 hover:bg-navy-900/[0.03]",
  outlineLight:
    "border-white/22 bg-white/[0.03] text-white hover:border-white/55 hover:bg-white/[0.09]",
  quiet:
    "border-line bg-paper text-navy-900 hover:border-navy-900/30 hover:shadow-[0_12px_30px_-18px_rgba(13,21,38,0.45)]",
};

/** Hover'da alt kenardan yukarı süzülen dolgu. */
const sweeps: Partial<Record<Variant, string>> = {
  primary: "bg-brand-700",
};

/** İkon yoksa markayı işaret eden küçük bir nokta konur (referans dildeki gibi). */
const dotColor: Record<Variant, string> = {
  primary: "bg-white",
  outline: "bg-brand-600",
  outlineLight: "bg-brand-500",
  quiet: "bg-brand-600",
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  /** Metnin solunda görünür. Verilmezse marka noktası kullanılır. */
  icon?: ReactNode;
  className?: string;
};

function Inner({
  children,
  icon,
  variant,
}: {
  children: ReactNode;
  icon?: ReactNode;
  variant: Variant;
}) {
  const sweep = sweeps[variant];
  return (
    <>
      {sweep && (
        <span
          aria-hidden="true"
          className={`absolute inset-0 -z-10 origin-bottom scale-y-0 transition-transform duration-[550ms] ease-[var(--ease-out-expo)] group-hover/btn:scale-y-100 ${sweep}`}
        />
      )}
      <span className="relative flex shrink-0 items-center transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/btn:-translate-x-0.5">
        {icon ?? (
          <span
            aria-hidden="true"
            className={`block size-2 rounded-full ${dotColor[variant]}`}
          />
        )}
      </span>
      <span className="relative">{children}</span>
    </>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  icon,
  className = "",
  external,
  ...rest
}: CommonProps & {
  href: string;
  external?: boolean;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "className" | "children">) {
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;
  const content = (
    <Inner icon={icon} variant={variant}>
      {children}
    </Inner>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={cls} {...rest}>
      {content}
    </Link>
  );
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  className = "",
  ...rest
}: CommonProps & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">) {
  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} disabled:pointer-events-none disabled:opacity-55 ${className}`}
      {...rest}
    >
      <Inner icon={icon} variant={variant}>
        {children}
      </Inner>
    </button>
  );
}
