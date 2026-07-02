"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Button } from "@/components/Button";

const HERO = "/images/m-melon.jpg";

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // 8% buffer top/bottom; max 6% movement keeps the leading edge inside the buffer
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ["0%", "0%"] : ["0%", "6%"]
  );

  return (
    <section
      ref={ref}
      className="relative h-[65vh] min-h-[420px] flex items-end pb-20 md:pb-28 overflow-hidden"
    >
      {/* Parallax image */}
      <motion.div
        style={{ y: imageY, position: "absolute", inset: "-8% 0" }}
      >
        <Image
          src={HERO}
          alt="Lastoya Candle Co. — hand-poured candles"
          fill
          priority
          className="object-cover"
          style={{ objectPosition: "center 20%" }}
          sizes="100vw"
        />
      </motion.div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-overlay/90 via-overlay/40 to-transparent" />

      {/* Ambient flame glow */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[60%] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 25% 100%, color-mix(in oklch, var(--color-flame) 12%, transparent), transparent 70%)",
          }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 4.5,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
      )}

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="text-sm font-semibold tracking-[0.18em] text-white/80 uppercase mb-6 block"
        >
          Riverside, CA · Small-batch · Hand-poured
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="font-display text-[clamp(2.75rem,7vw,5.5rem)] text-white leading-[1.05] tracking-[-0.03em] text-balance max-w-2xl mb-8"
        >
          Every candle,<br />by hand.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          className="flex flex-wrap gap-4"
        >
          <Link href="/shop">
            <Button size="lg">
              Shop the collection
              <ArrowRight size={15} strokeWidth={1.5} />
            </Button>
          </Link>
          <Link href="/#story">
            <Button
              size="lg"
              variant="ghost"
              className="text-white/70 hover:text-white"
            >
              Our story
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
