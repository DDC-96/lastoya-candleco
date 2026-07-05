"use client";

import { useState, useEffect, useRef } from "react";
import { ProductCard } from "@/components/ProductCard";
import { ScentLens } from "@/components/ScentLens";
import type { Product } from "@/lib/products";

interface ShopGridProps {
  products: Product[];
}

export function ShopGrid({ products }: ShopGridProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || !products.length) return;

    // Running map of each product's current intersection ratio
    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = (entry.target as HTMLElement).dataset.productId;
          if (id) ratios.set(id, entry.intersectionRatio);
        });

        let maxRatio = 0;
        let maxId: string | null = null;
        ratios.forEach((ratio, id) => {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            maxId = id;
          }
        });

        if (maxId) {
          const idx = products.findIndex((p) => p.id === maxId);
          if (idx >= 0) setActiveIndex(idx);
        }
      },
      { threshold: Array.from({ length: 11 }, (_, i) => i / 10) }
    );

    grid.querySelectorAll<HTMLElement>("[data-product-id]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [products]);

  if (!products.length) {
    return (
      <div className="py-24 text-center">
        <p className="font-display text-xl text-ink-dim">
          No candles in this collection yet.
        </p>
      </div>
    );
  }

  const safeIndex = Math.min(activeIndex, products.length - 1);
  const activeProduct = products[safeIndex];
  const progress = products.length > 1 ? safeIndex / (products.length - 1) : 1;

  return (
    <div className="flex items-start gap-14 xl:gap-16">
      {/* Product grid */}
      <div
        ref={gridRef}
        className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10"
      >
        {products.map((product, i) => (
          <div key={product.id} data-product-id={product.id}>
            <ProductCard product={product} priority={i < 4} />
          </div>
        ))}
      </div>

      {/* Scent lens — sticky sidebar, xl+ only */}
      <div className="hidden xl:block w-44 shrink-0 sticky top-24 self-start">
        <ScentLens product={activeProduct} progress={progress} />
      </div>
    </div>
  );
}
