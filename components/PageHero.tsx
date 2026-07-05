"use client";

import { motion, useReducedMotion } from "framer-motion";

interface PageHeroProps {
  heading: string;
  headingClassName?: string;
  sub?: React.ReactNode;
}

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.065,
      delayChildren: 0.08,
    },
  },
};

const wordVariant = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const DEFAULT_HEADING_CLS =
  "font-display font-bold text-[clamp(2.5rem,6vw,4rem)] text-ink leading-tight text-balance mb-6";

export function PageHero({ heading, headingClassName, sub }: PageHeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const words = heading.split(" ");
  const subDelay = 0.08 + words.length * 0.065 + 0.12;

  if (prefersReducedMotion) {
    return (
      <div>
        <h1 className={headingClassName ?? DEFAULT_HEADING_CLS}>{heading}</h1>
        {sub}
      </div>
    );
  }

  return (
    <div>
      <motion.h1
        variants={container}
        initial="hidden"
        animate="show"
        aria-label={heading}
        className={headingClassName ?? DEFAULT_HEADING_CLS}
      >
        {words.map((w, i) => (
          <motion.span
            key={i}
            variants={wordVariant}
            className="inline-block"
            style={{ marginRight: i < words.length - 1 ? "0.26em" : 0 }}
          >
            {w}
          </motion.span>
        ))}
      </motion.h1>
      {sub && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: subDelay }}
        >
          {sub}
        </motion.div>
      )}
    </div>
  );
}
