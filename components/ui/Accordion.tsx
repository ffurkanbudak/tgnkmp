"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useId, useState } from "react";

type Item = { q: string; a: string };

export function Accordion({ items }: { items: ReadonlyArray<Item> }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();
  const reduced = useReducedMotion();

  return (
    <div className="border-t border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;

        return (
          <div key={item.q} className="border-b border-line">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-start gap-6 py-7 text-left transition-colors duration-300 hover:text-brand-700 md:gap-10 md:py-8"
              >
                <span className="text-eyebrow mt-2 shrink-0 tabular-nums text-faint transition-colors duration-300 group-hover:text-brand-600">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-h3 flex-1 pr-4">{item.q}</span>
                <span
                  aria-hidden="true"
                  className="relative mt-1.5 grid size-7 shrink-0 place-items-center rounded-full border border-line transition-colors duration-300 group-hover:border-brand-600/40"
                >
                  <span className="absolute h-px w-3 bg-current transition-opacity duration-300" />
                  <span
                    className={`absolute h-3 w-px bg-current transition-transform duration-500 ease-[var(--ease-out-expo)] ${
                      isOpen ? "scale-y-0" : "scale-y-100"
                    }`}
                  />
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  key="panel"
                  initial={reduced ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduced ? undefined : { height: 0, opacity: 0 }}
                  transition={{
                    height: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                    opacity: { duration: 0.32, ease: "easeOut" },
                  }}
                  className="overflow-hidden"
                >
                  <p className="text-body max-w-2xl pb-8 text-muted md:ml-[4.25rem]">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
