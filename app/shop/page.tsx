import { Suspense } from "react";
import type { Metadata } from "next";
import { products } from "@/lib/products";
import { ShopFilter } from "@/components/ShopFilter";
import { PageHero } from "@/components/PageHero";
import { ShopGrid } from "@/components/ShopGrid";

export const metadata: Metadata = { title: "Shop" };

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ collection?: string }>;
}) {
  const params = await searchParams;
  const activeCollection = params.collection;

  const filtered = activeCollection
    ? products.filter((p) => p.collection === activeCollection)
    : products;

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <PageHero
            heading="The Collection"
            headingClassName="font-display font-bold text-4xl md:text-5xl text-ink text-balance tracking-[-0.02em] mb-3"
            sub={
              <p className="text-ink-dim text-sm">
                {filtered.length} candle{filtered.length !== 1 ? "s" : ""}
                {activeCollection ? ` · ${activeCollection}` : ""}
              </p>
            }
          />
        </div>

        {/* Filter — must be inside Suspense since it uses useSearchParams under the hood */}
        <Suspense>
          <ShopFilter activeCollection={activeCollection} />
        </Suspense>

        {/* Grid + scent lens */}
        <div className="mt-10">
          <ShopGrid products={filtered} />
        </div>
      </div>
    </div>
  );
}
