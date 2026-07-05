"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface FlyItem {
  id: string;
  sx: number;
  sy: number;
  tx: number;
  ty: number;
}

export function CartFlyIndicator() {
  const [flies, setFlies] = useState<FlyItem[]>([]);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onFly = (e: Event) => {
      const { sx, sy } = (e as CustomEvent<{ sx: number; sy: number }>).detail;
      const btn = document.querySelector<HTMLElement>("[data-cart-button]");
      if (!btn) return;
      const r = btn.getBoundingClientRect();
      const id = `${Date.now()}-${Math.random()}`;
      setFlies((f) => [
        ...f,
        {
          id,
          sx,
          sy,
          tx: r.left + r.width / 2,
          ty: r.top + r.height / 2,
        },
      ]);
      setTimeout(() => setFlies((f) => f.filter((i) => i.id !== id)), 550);
    };

    window.addEventListener("cart:fly", onFly);
    return () => window.removeEventListener("cart:fly", onFly);
  }, []);

  if (reduced) return null;

  return (
    <div aria-hidden="true" className="fixed inset-0 pointer-events-none z-[60]">
      <AnimatePresence>
        {flies.map(({ id, sx, sy, tx, ty }) => (
          <motion.div
            key={id}
            // w-6 h-6 = 24px; offset by -12 to center on the source/target point
            className="absolute w-6 h-6 bg-flame"
            style={{ left: 0, top: 0 }}
            initial={{ x: sx - 12, y: sy - 12, scale: 1, opacity: 0.9 }}
            animate={{ x: tx - 12, y: ty - 12, scale: 0.2, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
