"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/Button";
import { useCartStore } from "@/lib/cart-store";

type Step = "contact" | "shipping" | "review" | "success";

const STEPS: Step[] = ["contact", "shipping", "review"];
const STEP_LABELS: Record<Step, string> = {
  contact: "Contact",
  shipping: "Shipping",
  review: "Review",
  success: "",
};

const inputClass =
  "w-full bg-panel border border-wire px-4 py-3 text-sm text-ink placeholder:text-ink-dim focus:outline-none focus:border-flame transition-colors";

const labelClass =
  "block text-xs text-ink-dim tracking-[0.1em] uppercase mb-2";

export default function CheckoutPage() {
  const [step, setStep] = useState<Step>("contact");
  const [contact, setContact] = useState({ email: "" });
  const [shipping, setShipping] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const { items, total, clearCart } = useCartStore();
  const currentIdx = STEPS.indexOf(step);

  const shippingComplete = Object.values(shipping).every((v) => v.trim());

  const handlePlaceOrder = () => {
    clearCart();
    setStep("success");
  };

  if (step === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-full border border-flame flex items-center justify-center mx-auto mb-8">
            <Check size={22} className="text-flame-text" strokeWidth={1.5} />
          </div>
          <h1 className="font-display text-3xl text-ink mb-3">
            Order placed.
          </h1>
          <p className="text-ink-dim leading-relaxed mb-2">
            Thank you for your order. A confirmation will be sent to{" "}
            <span className="text-ink">{contact.email}</span>.
          </p>
          <p className="text-ink-dim text-sm mb-10 leading-relaxed">
            We&apos;ll be in touch once your candle is poured and on its way.
          </p>
          <Link href="/shop">
            <Button size="lg">Back to the shop</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 lg:gap-16">

        {/* ── Left: form ─────────────────────────────── */}
        <div>
          {/* Step breadcrumb */}
          <nav className="flex items-center gap-2 mb-10" aria-label="Checkout steps">
            {STEPS.map((s, i) => (
              <span key={s} className="flex items-center gap-2">
                <span
                  className={`text-xs tracking-[0.12em] uppercase transition-colors ${
                    i <= currentIdx ? "text-flame-text" : "text-ink-dim"
                  }`}
                >
                  {STEP_LABELS[s]}
                </span>
                {i < STEPS.length - 1 && (
                  <ChevronRight size={11} className="text-wire" strokeWidth={2} />
                )}
              </span>
            ))}
          </nav>

          {/* ─ Contact ─ */}
          {step === "contact" && (
            <div>
              <h1 className="font-display text-3xl text-ink mb-8">Contact</h1>
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Email address</label>
                  <input
                    type="email"
                    value={contact.email}
                    onChange={(e) => setContact({ email: e.target.value })}
                    placeholder="your@email.com"
                    required
                    autoFocus
                    className={inputClass}
                  />
                </div>
                <Button
                  size="lg"
                  className="w-full mt-2"
                  onClick={() => contact.email && setStep("shipping")}
                  disabled={!contact.email}
                >
                  Continue to Shipping
                </Button>
              </div>
            </div>
          )}

          {/* ─ Shipping ─ */}
          {step === "shipping" && (
            <div>
              <button
                onClick={() => setStep("contact")}
                className="flex items-center gap-1.5 text-sm text-ink-dim hover:text-ink mb-6 transition-colors group"
              >
                <ArrowLeft
                  size={13}
                  strokeWidth={1.5}
                  className="group-hover:-translate-x-0.5 transition-transform"
                />
                Back
              </button>
              <h1 className="font-display text-3xl text-ink mb-8">Shipping</h1>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {(["firstName", "Last name"] as const).map((_, idx) => {
                    const key = idx === 0 ? "firstName" : "lastName";
                    const label = idx === 0 ? "First name" : "Last name";
                    return (
                      <div key={key}>
                        <label className={labelClass}>{label}</label>
                        <input
                          type="text"
                          value={shipping[key]}
                          onChange={(e) =>
                            setShipping((s) => ({ ...s, [key]: e.target.value }))
                          }
                          className={inputClass}
                        />
                      </div>
                    );
                  })}
                </div>
                {(
                  [
                    ["address", "Street address"],
                    ["city", "City"],
                  ] as [keyof typeof shipping, string][]
                ).map(([key, label]) => (
                  <div key={key}>
                    <label className={labelClass}>{label}</label>
                    <input
                      type="text"
                      value={shipping[key]}
                      onChange={(e) =>
                        setShipping((s) => ({ ...s, [key]: e.target.value }))
                      }
                      className={inputClass}
                    />
                  </div>
                ))}
                <div className="grid grid-cols-2 gap-4">
                  {(
                    [
                      ["state", "State"],
                      ["zip", "ZIP code"],
                    ] as [keyof typeof shipping, string][]
                  ).map(([key, label]) => (
                    <div key={key}>
                      <label className={labelClass}>{label}</label>
                      <input
                        type="text"
                        value={shipping[key]}
                        onChange={(e) =>
                          setShipping((s) => ({ ...s, [key]: e.target.value }))
                        }
                        className={inputClass}
                      />
                    </div>
                  ))}
                </div>
                <Button
                  size="lg"
                  className="w-full mt-2"
                  onClick={() => shippingComplete && setStep("review")}
                  disabled={!shippingComplete}
                >
                  Continue to Review
                </Button>
              </div>
            </div>
          )}

          {/* ─ Review ─ */}
          {step === "review" && (
            <div>
              <button
                onClick={() => setStep("shipping")}
                className="flex items-center gap-1.5 text-sm text-ink-dim hover:text-ink mb-6 transition-colors group"
              >
                <ArrowLeft
                  size={13}
                  strokeWidth={1.5}
                  className="group-hover:-translate-x-0.5 transition-transform"
                />
                Back
              </button>
              <h1 className="font-display text-3xl text-ink mb-8">Review</h1>
              <div className="space-y-4">
                {/* Summary rows */}
                {(
                  [
                    [
                      "Contact",
                      contact.email,
                      () => setStep("contact"),
                    ],
                    [
                      "Ship to",
                      `${shipping.firstName} ${shipping.lastName}, ${shipping.address}, ${shipping.city}, ${shipping.state} ${shipping.zip}`,
                      () => setStep("shipping"),
                    ],
                  ] as [string, string, () => void][]
                ).map(([title, value, onEdit]) => (
                  <div
                    key={title}
                    className="border border-wire-faint p-5"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs tracking-[0.12em] text-ink-dim uppercase">
                        {title}
                      </span>
                      <button
                        onClick={onEdit}
                        className="text-xs text-flame-text hover:text-ink transition-colors ml-4 shrink-0"
                      >
                        Edit
                      </button>
                    </div>
                    <p className="text-sm text-ink leading-relaxed">{value}</p>
                  </div>
                ))}

                <Button
                  size="lg"
                  className="w-full mt-2"
                  onClick={handlePlaceOrder}
                >
                  Place Order — ${total.toFixed(2)}
                </Button>
                <p className="text-center text-xs text-ink-dim">
                  By placing your order you agree to our{" "}
                  <span className="underline underline-offset-2 cursor-pointer hover:text-ink transition-colors">
                    terms of service
                  </span>
                  .
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ── Right: order summary ────────────────────── */}
        <aside className="lg:sticky lg:top-28 h-fit">
          <div className="bg-panel border border-wire-faint p-6 space-y-6">
            <h2 className="font-display text-lg text-ink">Order summary</h2>

            {items.length === 0 ? (
              <p className="text-sm text-ink-dim">
                Your cart is empty.{" "}
                <Link href="/shop" className="text-flame-text hover:text-ink transition-colors underline underline-offset-2">
                  Browse candles
                </Link>
              </p>
            ) : (
              <ul className="space-y-4">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-4">
                    <div className="relative w-16 h-16 bg-panel-lift overflow-hidden shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-wire flex items-center justify-center text-ink text-[10px] font-medium">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-display text-ink leading-tight">
                        {item.name}
                      </p>
                      <p className="text-xs text-ink-dim mt-0.5 line-clamp-1">
                        {item.scent}
                      </p>
                    </div>
                    <p className="text-sm text-ink tabular-nums shrink-0">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </li>
                ))}
              </ul>
            )}

            <div className="border-t border-wire-faint pt-4 space-y-2.5">
              <div className="flex justify-between text-sm">
                <span className="text-ink-dim">Subtotal</span>
                <span className="text-ink tabular-nums">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-ink-dim">Shipping</span>
                <span className="text-ink-dim">
                  {total >= 75 ? "Free" : "Calculated at next step"}
                </span>
              </div>
              <div className="flex justify-between pt-3 border-t border-wire-faint">
                <span className="font-display text-base text-ink">Total</span>
                <span className="font-display text-base text-flame-text tabular-nums">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
