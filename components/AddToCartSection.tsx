"use client";

import { useState } from "react";
import { ShoppingBag, Minus, Plus } from "lucide-react";
import { Button } from "@/components/Button";
import { useCartStore } from "@/lib/cart-store";
import type { Product } from "@/lib/products";

export function AddToCartSection({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        scent: product.scent,
      });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="space-y-5">
      {/* Qty selector */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-ink-dim">Qty</span>
        <div className="flex items-center border border-wire">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
            className="px-3 py-2.5 text-ink-dim hover:text-ink transition-colors"
          >
            <Minus size={13} strokeWidth={2} />
          </button>
          <span className="px-4 text-sm text-ink tabular-nums min-w-[2.5rem] text-center">
            {qty}
          </span>
          <button
            onClick={() => setQty((q) => q + 1)}
            aria-label="Increase quantity"
            className="px-3 py-2.5 text-ink-dim hover:text-ink transition-colors"
          >
            <Plus size={13} strokeWidth={2} />
          </button>
        </div>
      </div>

      <Button size="lg" className="w-full" onClick={handleAdd}>
        <ShoppingBag size={16} strokeWidth={1.5} />
        {added
          ? "Added to cart!"
          : `Add to Cart — $${(product.price * qty).toFixed(2)}`}
      </Button>
    </div>
  );
}
