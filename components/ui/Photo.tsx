"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Photography slot.
 *
 * Real photographs live in /public/images (see public/images/README.md for the
 * shot list). Until a file is dropped in, this renders a composed navy plate
 * instead of a broken image, so the layout is never wrong at any stage.
 */
export function Photo({
  src,
  alt,
  priority = false,
  sizes = "100vw",
  className = "",
  imgClassName = "",
  fallbackLabel,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  imgClassName?: string;
  /** Shown on the placeholder plate to document the intended shot. */
  fallbackLabel?: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-navy-800 ${className}`}>
      {!failed ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          quality={90}
          onError={() => setFailed(true)}
          className={`object-cover ${imgClassName}`}
        />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="surface-grain absolute inset-0 bg-[radial-gradient(120%_90%_at_20%_0%,#24375e_0%,#131f38_55%,#070c16_100%)]"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(to_right,rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.5)_1px,transparent_1px)] [background-size:56px_56px]"
          />
          {fallbackLabel && (
            <div className="absolute inset-x-0 bottom-0 p-6">
              <p className="text-eyebrow text-navy-300/80">{fallbackLabel}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
