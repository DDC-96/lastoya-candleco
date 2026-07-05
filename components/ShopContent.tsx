"use client";

import { useSearchParams } from "next/navigation";
import { products } from "@/lib/products";
import { ShopFilter } from "@/components/ShopFilter";
import { ShopGrid } from "@/components/ShopGrid";

export function ShopContent() {
  const searchParams = useSearchParams();
  const activeCollection = searchParams.get("collection") ?? undefined;

  const filtered = activeCollection
    ? products.filter((p) => p.collection === activeCollection)
    : products;

  return (
    <>
      <div className="mb-4">
        <p className="text-ink-dim text-sm">
          {filtered.length} candle{filtered.length !== 1 ? "s" : ""}
          {activeCollection ? ` · ${activeCollection}` : ""}
        </p>
      </div>
      <ShopFilter activeCollection={activeCollection} />
      <div className="mt-10">
        <ShopGrid products={filtered} />
      </div>
    </>
  );
}
