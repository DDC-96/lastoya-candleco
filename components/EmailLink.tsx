"use client";

import { motion, useReducedMotion } from "framer-motion";

interface EmailLinkProps {
  email: string;
  className?: string;
}

export function EmailLink({ email, className }: EmailLinkProps) {
  const prefersReducedMotion = useReducedMotion();

  const baseCls =
    className ??
    "font-display text-2xl md:text-3xl text-ink hover:text-flame-text transition-colors";

  if (prefersReducedMotion) {
    return (
      <a href={`mailto:${email}`} className={baseCls}>
        {email}
      </a>
    );
  }

  return (
    <motion.a
      href={`mailto:${email}`}
      className={`${baseCls} inline-block relative`}
      initial="rest"
      whileHover="hover"
    >
      {email}
      <motion.span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-flame-text origin-left"
        variants={{
          rest: { scaleX: 0 },
          hover: {
            scaleX: 1,
            transition: { duration: 0.32, ease: [0.16, 1, 0.3, 1] },
          },
        }}
      />
    </motion.a>
  );
}
