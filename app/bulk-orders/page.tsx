import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeUp } from "@/components/FadeUp";
import { Button } from "@/components/Button";

export const metadata: Metadata = { title: "Bulk & Events" };

const CONTACT_EMAIL = "lastoyacandles@examplemail.com";

const steps = [
  {
    n: "01",
    title: "Reach out",
    body: "Send us your details — quantity, occasion, and preferred scents from the Signature or Limited collection. We'll respond within 2–3 business days.",
  },
  {
    n: "02",
    title: "We confirm",
    body: "Once we've reviewed your request, we'll confirm scent availability, finalize quantities, and send an invoice. No obligation until you approve.",
  },
  {
    n: "03",
    title: "We pour",
    body: "Every bulk order is poured fresh — never from shelf stock. Allow 3–4 weeks from confirmation through shipment. We'll keep you updated throughout.",
  },
];

const details: [string, string][] = [
  ["Minimum order", "24 units"],
  ["Response time", "2–3 business days"],
  ["Lead time", "3–4 weeks from confirmation"],
  ["Customization", "Scent selection only — no private labeling at this time"],
  ["Shipping", "Calculated at confirmation; taxes may apply"],
  ["Resale", "Requires prior written authorization"],
];

export default function BulkOrdersPage() {
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-3xl mx-auto">

        {/* ── Header ─────────────────────────────────── */}
        <FadeUp>
          <h1 className="font-display text-[clamp(2.5rem,6vw,4rem)] text-ink leading-tight text-balance mb-6">
            Bulk &amp; Events
          </h1>
          <p className="text-ink-dim leading-[1.8] max-w-xl text-pretty">
            Candles for corporate gifts, weddings, and occasions that call for
            something made by hand. Every unit is poured to order — nothing comes
            off a shelf.
          </p>
        </FadeUp>

        {/* ── How it works ───────────────────────────── */}
        <FadeUp delay={0.1}>
          <div className="mt-20">
            <p className="text-xs font-medium tracking-[0.15em] uppercase text-ink-dim mb-10">
              How it works
            </p>
            <div className="space-y-0">
              {steps.map((step, i) => (
                <div
                  key={step.n}
                  className="grid grid-cols-[auto_1fr] gap-8 py-8 border-b border-wire-faint first:border-t"
                >
                  <span className="font-display text-[clamp(1.5rem,3vw,2rem)] text-flame-text leading-none pt-0.5">
                    {step.n}
                  </span>
                  <div>
                    <h2 className="font-display text-xl text-ink mb-2">
                      {step.title}
                    </h2>
                    <p className="text-ink-dim leading-[1.8] text-pretty">
                      {step.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* ── Details ────────────────────────────────── */}
        <FadeUp delay={0.05}>
          <div className="mt-16">
            <p className="text-xs font-medium tracking-[0.15em] uppercase text-ink-dim mb-6">
              Details
            </p>
            <div className="space-y-3">
              {details.map(([label, value]) => (
                <div
                  key={label}
                  className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 py-3 border-b border-wire-faint text-sm"
                >
                  <span className="text-ink-dim">{label}</span>
                  <span className="text-ink sm:text-right">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* ── CTA ────────────────────────────────────── */}
        <FadeUp delay={0.08}>
          <div className="mt-16 pt-12 border-t border-wire-faint">
            <h2 className="font-display text-2xl text-ink mb-3">
              Ready to get a quote?
            </h2>
            <p className="text-ink-dim text-sm leading-relaxed mb-8">
              Email us with your quantity, occasion, timeline, and any scent
              preferences. We&apos;ll take it from there.
            </p>
            <Link href={`mailto:${CONTACT_EMAIL}`}>
              <Button size="lg">
                {CONTACT_EMAIL}
                <ArrowRight size={15} strokeWidth={1.5} />
              </Button>
            </Link>
          </div>
        </FadeUp>

      </div>
    </div>
  );
}
