import { Suspense } from "react";
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ShopContent } from "@/components/ShopContent";

export const metadata: Metadata = { title: "Shop" };

export default function ShopPage() {
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <PageHero
            heading="The Collection"
            headingClassName="font-display font-bold text-4xl md:text-5xl text-ink text-balance tracking-[-0.02em] mb-3"
          />
        </div>
        <Suspense>
          <ShopContent />
        </Suspense>
      </div>
    </div>
  );
}
