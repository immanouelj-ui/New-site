"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { FaqItem } from "@/lib/content/types";

export function Accordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="flex flex-col">
      {items.map((item, i) => (
        <div key={item.question} className="border-t border-ink/8 py-5 last:border-b">
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between gap-6 text-left"
          >
            <span className="font-medium text-ink">{item.question}</span>
            <span
              className={cn(
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-ink/15 transition-transform duration-300",
                open === i && "rotate-45",
              )}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </span>
          </button>
          <AnimatePresence initial={false}>
            {open === i ? (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <p className="max-w-2xl pt-4 text-muted">{item.answer}</p>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
