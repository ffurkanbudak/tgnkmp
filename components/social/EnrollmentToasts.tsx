"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { enrollments, type Enrollment } from "@/lib/enrollments";

/**
 * Sol altta sırayla beliren katılım bildirimleri.
 *
 * Her kart yaklaşık 5 saniyede bir gelir, kısa süre kalır ve kaybolur.
 * Üzerine gelindiğinde durur; kapatıldığında oturum boyunca bir daha çıkmaz.
 * Hareket tercihi kapalıysa hiç gösterilmez.
 */

const FIRST_DELAY = 6000;
const VISIBLE_MS = 4600;
const GAP_MS = 5000;

export function EnrollmentToasts() {
  const [index, setIndex] = useState(0);
  const [shown, setShown] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (reduced || dismissed || paused) return;

    timer.current = window.setTimeout(
      () => {
        if (shown) {
          setShown(false);
          setIndex((i) => (i + 1) % enrollments.length);
        } else {
          setShown(true);
        }
      },
      shown ? VISIBLE_MS : index === 0 && !shown ? FIRST_DELAY : GAP_MS,
    );

    return () => window.clearTimeout(timer.current);
  }, [shown, index, reduced, dismissed, paused]);

  if (reduced || dismissed) return null;

  const item = enrollments[index];

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="pointer-events-none fixed bottom-5 left-5 z-40 max-w-[calc(100vw-2.5rem)] sm:bottom-7 sm:left-7"
    >
      <AnimatePresence mode="wait">
        {shown && (
          <motion.div
            key={`${item.first}-${index}`}
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className="pointer-events-auto relative flex w-[19rem] items-center gap-3.5 overflow-hidden rounded-[16px] border border-line bg-paper/95 p-3 pe-10 shadow-[0_2px_4px_rgba(13,21,38,0.04),0_24px_48px_-24px_rgba(13,21,38,0.35)] backdrop-blur-xl sm:w-[21rem] sm:p-3.5 sm:pe-11"
          >
            <Avatar item={item} />

            <div className="min-w-0 flex-1">
              <p className="truncate text-[0.875rem] font-semibold tracking-[-0.015em] text-navy-950">
                {item.first} {item.initial}
                <span className="ms-2 font-medium text-faint">{item.level}</span>
              </p>
              <p className="mt-0.5 truncate text-[0.8125rem] tracking-[-0.005em] text-muted">
                <span className="font-medium text-navy-700">{item.subject}</span>{" "}
                programına katıldı
              </p>
            </div>

            <button
              type="button"
              onClick={() => setDismissed(true)}
              aria-label="Bildirimleri kapat"
              className="absolute end-2.5 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-full text-navy-300 transition-colors duration-300 hover:bg-mist hover:text-navy-700"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                className="size-3.5"
                aria-hidden="true"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            {/* kalan süre çizgisi */}
            <motion.span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-brand-600/70"
              initial={{ scaleX: 1 }}
              animate={{ scaleX: paused ? 1 : 0 }}
              transition={{ duration: VISIBLE_MS / 1000, ease: "linear" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

/**
 * Fotoğraf verildiğinde onu, verilmediğinde baş harf monogramını gösterir.
 * İki durumda da aynı ölçüyü kapladığı için sonradan fotoğraf eklemek
 * yerleşimi bozmaz.
 */
function Avatar({ item }: { item: Enrollment }) {
  const [failed, setFailed] = useState(false);

  if (item.photo && !failed) {
    return (
      <span className="relative size-11 shrink-0 overflow-hidden rounded-full bg-mist sm:size-12">
        <Image
          src={item.photo}
          alt=""
          fill
          sizes="48px"
          className="object-cover"
          onError={() => setFailed(true)}
        />
      </span>
    );
  }

  return (
    <span
      aria-hidden="true"
      className="grid size-11 shrink-0 place-items-center rounded-full bg-navy-900 text-[0.9375rem] font-semibold tracking-[-0.02em] text-white sm:size-12"
    >
      {item.first.charAt(0).toLocaleUpperCase("tr-TR")}
    </span>
  );
}
