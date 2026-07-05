"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import type { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
  staggerDelay?: number;
  sizes?: string;
}

export function ProductCard({
  product,
  priority = false,
  staggerDelay = 0,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
}: ProductCardProps) {
  const [added, setAdded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const cardRef = useRef<HTMLElement>(null);
  const inView = useInView(cardRef, { once: true, margin: "-60px" });

  useEffect(() => { setMounted(true); }, []);

  const handleAddToCart = (e?: React.MouseEvent<HTMLButtonElement>) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      scent: product.scent,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
    if (e?.currentTarget) {
      const r = e.currentTarget.getBoundingClientRect();
      window.dispatchEvent(
        new CustomEvent("cart:fly", {
          detail: { sx: r.left + r.width / 2, sy: r.top + r.height / 2 },
        })
      );
    }
  };

  return (
    <motion.article
      ref={cardRef}
      initial={false}
      animate={!mounted || inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={mounted && inView ? { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: staggerDelay } : { duration: 0 }}
      className="group flex flex-col"
    >
      {/* Image container */}
      <Link href={`/shop/${product.slug}`} className="block overflow-hidden">
        <div className="relative aspect-[3/4] bg-panel overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes={sizes}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            priority={priority}
          />
          {product.collection === "Limited" && (
            <div className="absolute top-3 left-3">
              <span className="bg-ember text-ink text-[11px] font-medium px-2.5 py-1 tracking-wide uppercase">
                Limited
              </span>
            </div>
          )}
          {/* Quick add overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-overlay/50 flex items-end justify-center pb-6 opacity-0"
          >
            <motion.button
              onClick={(e) => {
                e.preventDefault();
                handleAddToCart(e);
              }}
              whileTap={{ scale: 0.97 }}
              className="
                flex items-center gap-2 bg-flame text-ink
                px-5 py-2.5 text-sm font-medium tracking-wide
                hover:bg-flame-dim transition-colors
              "
            >
              <ShoppingBag size={14} strokeWidth={2} />
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={added ? "added" : "add"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.12 }}
                >
                  {added ? "Added!" : "Add to Cart"}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </div>
      </Link>

      {/* Info */}
      <div className="mt-4 flex flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/shop/${product.slug}`}>
            <h3 className="font-display font-semibold text-lg text-ink hover:text-flame-text transition-colors leading-tight">
              {product.name}
            </h3>
          </Link>
          <p className="text-sm text-flame-text font-medium tabular-nums shrink-0">
            ${product.price}
          </p>
        </div>
        <p className="text-xs text-ink-dim leading-snug">{product.scent}</p>
      </div>

      {/* Mobile add button */}
      <button
        onClick={handleAddToCart}
        className={`
          mt-3 md:hidden
          w-full border text-sm py-2.5
          flex items-center justify-center gap-2 transition-colors
          ${
            added
              ? "border-flame-text text-flame-text"
              : "border-wire text-ink-dim hover:border-flame-text hover:text-flame-text"
          }
        `}
      >
        <ShoppingBag size={14} strokeWidth={1.5} />
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={added ? "added-m" : "add-m"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
          >
            {added ? "Added!" : "Add to Cart"}
          </motion.span>
        </AnimatePresence>
      </button>
    </motion.article>
  );
}
