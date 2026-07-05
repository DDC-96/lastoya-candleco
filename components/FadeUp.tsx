"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface FadeUpProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "right";
}

export function FadeUp({ children, delay = 0, className, direction = "up" }: FadeUpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  // amount:0 → fires as soon as 1px enters viewport; once:true → won't re-hide on scroll up
  const inView = useInView(ref, { once: true, amount: 0, margin: "-20px 0px" });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Before JS hydrates: render fully visible (no initial hidden state).
  // After hydration: hide until inView, then reveal.
  // This satisfies: SSR, no-JS, headless renderers, and animated browsers.
  const hiddenState = direction === "right"
    ? { opacity: 0, x: 24 }
    : { opacity: 0, y: 18 };

  const visibleState = direction === "right"
    ? { opacity: 1, x: 0 }
    : { opacity: 1, y: 0 };

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={
        !mounted || inView
          ? visibleState
          : hiddenState
      }
      transition={
        mounted && inView
          ? { duration: 0.65, ease: [0.16, 1, 0.3, 1], delay }
          : { duration: 0 }
      }
      style={undefined}
      className={className}
    >
      {children}
    </motion.div>
  );
}
