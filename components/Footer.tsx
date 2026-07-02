import Link from "next/link";

const collections = [
  { label: "Signature", href: "/shop?collection=Signature" },
  { label: "Limited", href: "/shop?collection=Limited" },
];

const links = [
  { label: "Shop", href: "/shop" },
  { label: "Our Story", href: "/#story" },
  { label: "Contact", href: "mailto:lastoyacandles@examplemail.com" },
];

export function Footer() {
  return (
    <footer className="border-t border-wire-faint bg-panel mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div>
          <p className="font-display text-xl text-ink tracking-tight">
            Lastoya Candle Co.
          </p>
          <p className="text-ink-dim text-sm mt-3 leading-relaxed max-w-xs">
            Small-batch, hand-poured in Riverside, CA. Every candle, by hand.
          </p>
        </div>

        {/* Collections */}
        <div>
          <p className="text-xs font-medium tracking-[0.12em] text-ink-dim uppercase mb-4">
            Collections
          </p>
          <ul className="space-y-2">
            {collections.map((c) => (
              <li key={c.href}>
                <Link
                  href={c.href}
                  className="text-sm text-ink-dim hover:text-flame-text transition-colors"
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Links */}
        <div>
          <p className="text-xs font-medium tracking-[0.12em] text-ink-dim uppercase mb-4">
            Company
          </p>
          <ul className="space-y-2">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-ink-dim hover:text-flame-text transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-wire-faint">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-ink-dim">
            © {new Date().getFullYear()} Lastoya Candle Co. All rights
            reserved.
          </p>
          <p className="text-xs text-ink-dim opacity-50">
            Hand-poured in Riverside, CA
          </p>
        </div>
      </div>
    </footer>
  );
}
