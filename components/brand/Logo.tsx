"use client";

import Image from "next/image";
import { useState } from "react";
import { site } from "@/lib/site";

/**
 * RESMÎ LOGO — yeniden çizilmez, renkleri ve oranları değiştirilmez.
 *
 *   public/brand/logo.png        tam renkli kilit (açık zeminler)
 *   public/brand/logo-light.png  ters (beyaz) kilit — henüz verilmedi
 *
 * Ters kilit dosyası eklendiğinde koyu zeminlerde otomatik olarak o kullanılır.
 * O dosya gelene kadar koyu zeminlerde logo, marka kurallarına uygun biçimde
 * beyaz bir zemin plakası üzerine yerleştirilir; renklerine dokunulmaz.
 */

const RATIO = 961 / 146;

export function Logo({
  variant = "dark",
  className = "h-9",
}: {
  variant?: "dark" | "light";
  className?: string;
}) {
  const [lightMissing, setLightMissing] = useState(false);
  const useReversed = variant === "light" && !lightMissing;

  const img = (
    <Image
      src={useReversed ? "/brand/logo-light.png" : "/brand/logo.png"}
      alt={site.name}
      width={961}
      height={146}
      priority
      quality={100}
      onError={useReversed ? () => setLightMissing(true) : undefined}
      className={`w-auto object-contain object-left ${className}`}
      style={{ aspectRatio: RATIO }}
    />
  );

  // Ters kilit yokken: beyaz plaka üzerinde, doğru boşluk payıyla.
  if (variant === "light" && lightMissing) {
    return (
      <span className="inline-flex items-center rounded-xl bg-white px-4 py-2.5">
        {img}
      </span>
    );
  }

  return img;
}
