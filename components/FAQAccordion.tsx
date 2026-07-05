"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface FAQItem {
  q: string;
  a: string;
}

interface FAQSectionProps {
  category: string;
  items: FAQItem[];
}

function AccordionItem({ q, a }: FAQItem) {
  const [open, setOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="border-b border-wire-faint">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex items-center justify-between gap-6 py-5 w-full text-left"
      >
        <span className="font-display font-medium text-base text-ink leading-snug">
          {q}
        </span>
        <span
          className={`shrink-0 w-4 h-4 flex items-center justify-center transition-colors ${
            open ? "text-ink" : "text-ink-dim"
          }`}
        >
          <motion.svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
            animate={{ rotate: open ? 45 : 0 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.28, ease: [0.16, 1, 0.3, 1] }
            }
          >
            <line x1="6" y1="0" x2="6" y2="12" stroke="currentColor" strokeWidth="1.5" />
            <line x1="0" y1="6" x2="12" y2="6" stroke="currentColor" strokeWidth="1.5" />
          </motion.svg>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.38, ease: [0.16, 1, 0.3, 1] }
            }
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-ink-dim leading-[1.8] max-w-prose text-pretty">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQSection({ category, items }: FAQSectionProps) {
  return (
    <div>
      <p className="text-xs font-medium tracking-[0.15em] uppercase text-ink-dim mb-6">
        {category}
      </p>
      <div>
        {items.map((item) => (
          <AccordionItem key={item.q} q={item.q} a={item.a} />
        ))}
      </div>
    </div>
  );
}
