import type { Metadata } from "next";
import Link from "next/link";
import { FadeUp } from "@/components/FadeUp";

export const metadata: Metadata = { title: "Contact" };

const EMAIL = "lastoyacandles@examplemail.com";

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-3xl mx-auto">

        {/* ── Header ─────────────────────────────────── */}
        <FadeUp>
          <h1 className="font-display text-[clamp(2.5rem,6vw,4rem)] text-ink leading-tight text-balance mb-6">
            Contact Us
          </h1>
          <p className="text-ink-dim leading-[1.8] max-w-md text-pretty">
            Questions about an order, a candle, or anything else — we read every
            email and respond within 2–3 business days.
          </p>
        </FadeUp>

        {/* ── Email ──────────────────────────────────── */}
        <FadeUp delay={0.1}>
          <div className="mt-16 border-t border-wire-faint pt-10">
            <p className="text-xs font-medium tracking-[0.15em] uppercase text-ink-dim mb-4">
              Email
            </p>
            <a
              href={`mailto:${EMAIL}`}
              className="font-display text-2xl md:text-3xl text-ink hover:text-flame-text transition-colors"
            >
              {EMAIL}
            </a>
          </div>
        </FadeUp>

        {/* ── Bulk orders nudge ──────────────────────── */}
        <FadeUp delay={0.15}>
          <div className="mt-12 border-t border-wire-faint pt-10">
            <p className="text-xs font-medium tracking-[0.15em] uppercase text-ink-dim mb-4">
              Bulk &amp; Events
            </p>
            <p className="text-ink-dim text-sm leading-relaxed max-w-sm mb-5">
              Ordering for a corporate gift, wedding, or event? We handle bulk
              orders of 24+ units poured fresh to your timeline.
            </p>
            <Link
              href="/bulk-orders"
              className="text-sm text-flame-text hover:text-ink transition-colors inline-flex items-center gap-1.5 group"
            >
              Learn about bulk ordering
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </Link>
          </div>
        </FadeUp>

      </div>
    </div>
  );
}
