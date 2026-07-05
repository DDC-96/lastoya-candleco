import type { Metadata } from "next";
import { FadeUp } from "@/components/FadeUp";
import { PageHero } from "@/components/PageHero";
import { FAQSection } from "@/components/FAQAccordion";

export const metadata: Metadata = { title: "FAQ" };

const faqs: { category: string; items: { q: string; a: string }[] }[] = [
  {
    category: "Ordering",
    items: [
      {
        q: "How do I place an order?",
        a: "Browse the shop, add candles to your cart, and check out. We accept all major credit cards. For bulk or event orders, visit our Bulk & Events page.",
      },
      {
        q: "Can I change or cancel my order?",
        a: "We begin production quickly. Email us at lastoyacandles@examplemail.com within 24 hours of placing your order and we'll do our best to accommodate changes.",
      },
      {
        q: "Do you offer gift wrapping?",
        a: "Not at this time. Each candle ships in our standard packaging, which is designed to arrive intact and present well on its own.",
      },
    ],
  },
  {
    category: "Shipping",
    items: [
      {
        q: "How long does processing take?",
        a: "Orders are processed within 3–5 business days. Because every candle is poured to order, we don't ship from existing stock.",
      },
      {
        q: "How long does shipping take?",
        a: "Standard shipping typically takes 5–7 business days after your order ships. You'll receive a tracking number by email once it's on its way.",
      },
      {
        q: "Do you ship internationally?",
        a: "We currently ship within the United States only. International shipping is not available at this time.",
      },
      {
        q: "Is shipping free?",
        a: "Shipping is free on orders over $75. For orders under $75, a flat shipping rate is calculated at checkout.",
      },
    ],
  },
  {
    category: "Products",
    items: [
      {
        q: "What are your candles made of?",
        a: "All Lastoya candles use a coconut-soy wax blend, a 100% cotton lead-free wick, and premium fragrance oils. No paraffin, no synthetic additives.",
      },
      {
        q: "How long do your candles burn?",
        a: "Burn time depends on size. Signature candles (8 oz) burn 50–55 hours; Limited candles (9 oz) burn 55–60 hours; our 10 oz candles burn 60–65 hours.",
      },
      {
        q: "How should I care for my candle?",
        a: "Trim the wick to ¼ inch before every burn. On your first burn, let the wax pool fully to the edges before extinguishing — this prevents tunneling. Keep away from drafts and direct sunlight.",
      },
      {
        q: "What is the difference between Signature and Limited?",
        a: "Signature candles are our permanent collection — always available. Limited candles are made in small seasonal runs and may sell out. Once they're gone, they're gone.",
      },
    ],
  },
  {
    category: "Returns",
    items: [
      {
        q: "What is your return policy?",
        a: "We accept returns on unused, unlit candles within 14 days of delivery. The candle must be in its original packaging. Email us to initiate a return.",
      },
      {
        q: "My candle arrived damaged. What do I do?",
        a: "We're sorry to hear that. Email us at lastoyacandles@examplemail.com with a photo and your order number — we'll replace it or issue a refund, your choice.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-3xl mx-auto">

        {/* ── Header ─────────────────────────────────── */}
        <PageHero
          heading="Frequently Asked"
          sub={
            <p className="text-ink-dim text-sm leading-relaxed max-w-md">
              Can&apos;t find what you&apos;re looking for? Reach us at{" "}
              <a
                href="mailto:lastoyacandles@gmail.com"
                className="text-flame-text hover:text-ink transition-colors underline underline-offset-2"
              >
                lastoyacandles@gmail.com
              </a>
              .
            </p>
          }
        />

        {/* ── FAQ sections ───────────────────────────── */}
        <div className="mt-16 space-y-14">
          {faqs.map((section, si) => (
            <FadeUp key={section.category} delay={si * 0.06}>
              <FAQSection category={section.category} items={section.items} />
            </FadeUp>
          ))}
        </div>

      </div>
    </div>
  );
}
