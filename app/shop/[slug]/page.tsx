import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  getProductBySlug,
  getRelatedProducts,
  products,
} from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { AddToCartSection } from "@/components/AddToCartSection";
import { FadeUp } from "@/components/FadeUp";

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(slug);

  return (
    <div className="pt-24 pb-24">
      {/* ── Main layout ──────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6">
        {/* Back link */}
        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 text-sm text-ink-dim hover:text-ink transition-colors mb-10 group"
        >
          <ArrowLeft
            size={14}
            strokeWidth={1.5}
            className="group-hover:-translate-x-0.5 transition-transform"
          />
          All candles
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 items-start">
          {/* Images */}
          <FadeUp>
            <div className="space-y-3">
              <div className="relative aspect-[4/5] overflow-hidden bg-panel">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </div>
              {product.images[1] && (
                <div className="relative aspect-[16/9] overflow-hidden bg-panel">
                  <Image
                    src={product.images[1]}
                    alt={`${product.name} — detail`}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                </div>
              )}
            </div>
          </FadeUp>

          {/* Product info */}
          <FadeUp delay={0.08}>
            <div className="md:sticky md:top-28 space-y-8">
              {/* Collection + name + price */}
              <div>
                <span className="text-xs font-medium tracking-[0.15em] text-ember uppercase">
                  {product.collection}
                </span>
                <h1 className="font-display text-4xl md:text-5xl text-ink mt-2 leading-tight text-balance">
                  {product.name}
                </h1>
                <p className="mt-3 font-display text-2xl text-flame-text">
                  ${product.price}
                </p>
              </div>

              {/* Scent notes */}
              <div>
                <p className="text-xs font-medium tracking-[0.12em] text-ink-dim uppercase mb-3">
                  Scent notes
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.notes.map((note) => (
                    <span
                      key={note}
                      className="border border-wire text-ink-dim text-xs px-3 py-1.5 tracking-wide"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <p className="text-ink-dim leading-[1.78] text-pretty max-w-prose">
                {product.description}
              </p>

              {/* Add to cart */}
              <AddToCartSection product={product} />

              {/* Details table */}
              <div className="border-t border-wire-faint pt-6 space-y-3">
                {(
                  [
                    ["Burn time", product.burnTime],
                    ["Net weight", product.weight],
                    ["Wax", "Coconut-soy blend"],
                    ["Wick", "100% cotton, lead-free"],
                    ["Vessel", "Clear glass jar"],
                  ] as [string, string][]
                ).map(([label, value]) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span className="text-ink-dim">{label}</span>
                    <span className="text-ink">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* ── Related products ─────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 mt-28">
        <FadeUp>
          <h2 className="font-display text-2xl md:text-3xl text-ink mb-10">
            You might also like
          </h2>
        </FadeUp>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
