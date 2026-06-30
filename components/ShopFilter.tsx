"use client";

import { useRouter } from "next/navigation";

const COLLECTIONS = ["Signature", "Limited"] as const;

interface ShopFilterProps {
  activeCollection?: string;
}

export function ShopFilter({ activeCollection }: ShopFilterProps) {
  const router = useRouter();

  const set = (collection: string | null) => {
    router.push(collection ? `/shop?collection=${collection}` : "/shop");
  };

  const base =
    "px-4 py-2 text-sm tracking-wide border transition-colors cursor-pointer";
  const active = "border-flame text-flame";
  const inactive = "border-wire text-ink-dim hover:border-ink hover:text-ink";

  return (
    <div className="flex gap-3 flex-wrap">
      <button
        onClick={() => set(null)}
        className={`${base} ${!activeCollection ? active : inactive}`}
      >
        All
      </button>
      {COLLECTIONS.map((c) => (
        <button
          key={c}
          onClick={() => set(c)}
          className={`${base} ${activeCollection === c ? active : inactive}`}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
