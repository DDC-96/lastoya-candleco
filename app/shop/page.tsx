import { Suspense } from "react";
import type { Metadata } from "next";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { ShopFilter } from "@/components/ShopFilter";
import { PageHero } from "@/components/PageHero";

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
            headingClassName="font-display font-bold text-4xl md:text-5xl text-ink text-balance mb-3"
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

        {/* Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
          {filtered.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={i < 4}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-24 text-center">
            <p className="font-display text-xl text-ink-dim">
              No candles in this collection yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
