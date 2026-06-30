"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface RevealImageProps {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
}

export function RevealImage({ src, alt, sizes, className }: RevealImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={`relative overflow-hidden ${className ?? ""}`}>
        <Image src={src} alt={alt} fill className="object-cover" sizes={sizes} />
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className ?? ""}`}
      initial={false}
      animate={
        !mounted || inView
          ? { clipPath: "inset(0 0 0% 0)" }
          : { clipPath: "inset(0 0 100% 0)" }
      }
      transition={
        mounted && inView
          ? { duration: 1.1, ease: [0.16, 1, 0.3, 1] }
          : { duration: 0 }
      }
    >
      <Image src={src} alt={alt} fill className="object-cover" sizes={sizes} />
    </motion.div>
  );
}
