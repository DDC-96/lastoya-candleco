"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { Product } from "@/lib/products";

interface ScentLensProps {
  product: Product;
  progress: number; // 0–1
}

export function ScentLens({ product, progress }: ScentLensProps) {
  const reduced = useReducedMotion();

  return (
    <div>
      <div className="border-t border-wire-faint" />

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={product.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.22, ease: "easeOut" }}
          className="pt-6"
        >
          {/* Name */}
          <p className="font-display font-semibold text-xl text-ink tracking-[-0.02em] leading-snug mb-5">
            {product.name}
          </p>

          {/* Notes — staggered reveal */}
          <div className="space-y-2">
            {product.notes.map((note, i) => (
              <motion.p
                key={note}
                initial={{ opacity: 0, x: reduced ? 0 : -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: reduced ? 0 : 0.08 + i * 0.07,
                  duration: reduced ? 0 : 0.38,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-sm text-ink-dim leading-none tracking-wide"
              >
                {note}
              </motion.p>
            ))}
          </div>

          {/* Collection */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: reduced ? 0 : 0.36, duration: reduced ? 0 : 0.3 }}
            className="text-xs font-medium tracking-[0.12em] uppercase text-flame-text mt-6"
          >
            {product.collection}
          </motion.p>
        </motion.div>
      </AnimatePresence>

      {/* Scroll progress */}
      <div className="mt-8 h-px bg-wire-faint relative overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-flame-text"
          animate={{ width: `${Math.round(progress * 100)}%` }}
          transition={
            reduced
              ? { duration: 0 }
              : { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
          }
        />
      </div>
    </div>
  );
}
