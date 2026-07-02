import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/Button";
import { ProductCard } from "@/components/ProductCard";
import { FadeUp } from "@/components/FadeUp";
import { NewsletterForm } from "@/components/NewsletterForm";
import { HeroSection } from "@/components/HeroSection";
import { RevealImage } from "@/components/RevealImage";
import { featuredProducts } from "@/lib/products";

const STORY =
  "https://images.unsplash.com/photo-1714376880837-f40388a805e5?auto=format&fit=crop&w=1000&q=85";
const LIFESTYLE =
  "https://images.unsplash.com/photo-1537948756265-406a522f1a45?auto=format&fit=crop&w=2400&q=85";

const collections = [
  {
    name: "Signature",
    slug: "Signature",
    note: "Cedar · Amber · Sage",
    image:
      "https://images.unsplash.com/photo-1561212856-44e9bae482aa?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Limited",
    slug: "Limited",
    note: "Jasmine · Bourbon · Oud",
    image:
      "https://images.unsplash.com/photo-1489101960932-eb71762e6bc8?auto=format&fit=crop&w=800&q=80",
  },
];

const reviews = [
  {
    text: "Bought Río Noche for my husband and he hasn't put it down since. The cedar and amber together — it smells exactly like evenings on the river.",
    author: "Marisol V.",
    scent: "Río Noche",
    stars: 5,
  },
  {
    text: "Tierra Santa is the only candle I burn when I need to settle into the day. Clean, a little sacred, exactly like they describe it. Always stocked.",
    author: "D. Reyes",
    scent: "Tierra Santa",
    stars: 5,
  },
  {
    text: "I gifted Polvo de Canela to everyone on my list this year. Every single person texted me asking where it was from. The packaging, the scent — perfect.",
    author: "Lena K.",
    scent: "Polvo de Canela",
    stars: 4,
  },
];

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* ── Featured products ────────────────────────── */}
      <section className="pt-28 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] text-ink text-balance">
                  The collection
                </h2>
                <p className="text-ink-dim text-sm mt-2">
                  Signature scents, always in stock.
                </p>
              </div>
              <Link
                href="/shop"
                className="hidden sm:flex items-center gap-1.5 text-sm text-flame-text hover:text-ink transition-colors group shrink-0 ml-8"
              >
                View all
                <ArrowRight
                  size={13}
                  strokeWidth={1.5}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </Link>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {featuredProducts.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                priority={i === 0}
                staggerDelay={i * 0.12}
              />
            ))}
          </div>

          <div className="mt-10 text-center sm:hidden">
            <Link href="/shop">
              <Button variant="ghost" size="lg">
                View all candles
                <ArrowRight size={15} strokeWidth={1.5} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Lifestyle image break ─────────────────────── */}
      <section className="relative h-[55vh] min-h-[360px] overflow-hidden">
        <Image
          src={LIFESTYLE}
          alt="Lastoya candle burning"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-overlay/65" />
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
          <FadeUp>
            <p className="font-display text-3xl md:text-4xl text-white leading-tight max-w-xl">
              Made by hand,<br />for someone you love.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── Shop by collection ────────────────────────── */}
      <section className="py-24 px-6 bg-panel">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] text-ink text-balance mb-12">
              Shop the collection
            </h2>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-xl mx-auto sm:max-w-none">
            {collections.map((col, i) => (
              <FadeUp key={col.name} delay={i * 0.1}>
                <Link
                  href={`/shop?collection=${col.slug}`}
                  className="group flex flex-col items-center gap-5"
                >
                  <div className="relative w-48 aspect-square overflow-hidden rounded-full bg-panel-lift">
                    <Image
                      src={col.image}
                      alt={col.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(min-width: 640px) 192px, 192px"
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium tracking-[0.08em] uppercase text-ink group-hover:text-flame-text transition-colors">
                      {col.name}
                    </p>
                    <p className="text-xs text-ink-dim mt-1">{col.note}</p>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Brand story ──────────────────────────────── */}
      <section id="story" className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <RevealImage
            src={STORY}
            alt="Candle being hand-poured"
            sizes="(min-width: 768px) 50vw, 100vw"
            className="aspect-[4/5] bg-panel"
          />

          <FadeUp delay={0.1} direction="right">
            <div className="space-y-6 max-w-prose">
              <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] text-ink leading-tight text-balance">
                From Our Hands,<br />to Your Home.
              </h2>
              <p className="text-ink-dim leading-[1.8] text-pretty">
                In Zapotec, the indigenous language of Oaxaca&apos;s valleys
                and mountains, Lastoya means{" "}
                <em className="text-ink not-italic">My heart</em>.{" "}
                <em className="text-ink not-italic">My love</em>. Not the kind
                declared in grand gestures — but in quiet moments: in hands
                that create with care, in the choice to make something slowly
                and intentionally for someone who matters.
              </p>
              <p className="text-ink-dim leading-[1.8] text-pretty">
                Every Lastoya candle is poured in small batches, never rushed
                and never made for the sake of scale. Just 100% natural wax,
                wick, and fragrance — and the belief that what you bring into
                your home should carry warmth, presence, and the care of the
                hands that made it.
              </p>
              <div className="grid grid-cols-3 gap-6 pt-4 border-t border-wire-faint">
                {(
                  [
                    ["100%", "cotton wick"],
                    ["8oz", "net weight"],
                    ["50+", "burn hours"],
                  ] as [string, string][]
                ).map(([stat, label]) => (
                  <div key={label}>
                    <p className="font-display text-2xl text-flame-text">
                      {stat}
                    </p>
                    <p className="text-xs text-ink-dim mt-1 tracking-wide">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Reviews ──────────────────────────────────── */}
      <section className="py-24 px-6 bg-panel">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] text-ink text-balance mb-12">
              From the community
            </h2>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <FadeUp key={review.author} delay={i * 0.1}>
                <div className="bg-night border border-wire-faint p-8 flex flex-col gap-5">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        size={12}
                        strokeWidth={j < review.stars ? 0 : 1.5}
                        fill={j < review.stars ? "currentColor" : "none"}
                        className={j < review.stars ? "text-flame-text" : "text-wire"}
                      />
                    ))}
                  </div>
                  <p className="text-ink-dim text-sm leading-[1.8]">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div className="mt-auto pt-2 border-t border-wire-faint">
                    <p className="text-ink text-sm font-medium">
                      {review.author}
                    </p>
                    <p className="text-xs text-ink-dim mt-0.5">{review.scent}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter ───────────────────────────────── */}
      <section className="py-24 px-6 bg-panel">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="font-display text-3xl text-ink mb-3">
            New pours, <span className="text-flame-text">first.</span>
          </h2>
          <p className="text-ink-dim text-sm leading-relaxed mb-8">
            Limited editions and new scents go to the list before anywhere
            else.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
