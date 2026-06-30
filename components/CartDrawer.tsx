"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, total } =
    useCartStore();
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) closeCart();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            ref={overlayRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleOverlayClick}
            className="fixed inset-0 z-50 bg-overlay/20 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-panel flex flex-col border-l border-wire-faint"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-wire-faint">
              <h2 className="font-display text-lg text-ink">
                Your Cart
                {items.length > 0 && (
                  <span className="ml-2 text-sm font-sans font-normal text-ink-dim">
                    ({items.length} {items.length === 1 ? "item" : "items"})
                  </span>
                )}
              </h2>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="text-ink-dim hover:text-ink transition-colors p-1"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto py-2">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 px-6 text-center">
                  <ShoppingBag
                    size={40}
                    strokeWidth={1}
                    className="text-wire"
                  />
                  <p className="font-display text-xl text-ink">
                    Your cart is empty
                  </p>
                  <p className="text-sm text-ink-dim max-w-xs">
                    Add a candle to get started.
                  </p>
                  <button
                    onClick={closeCart}
                    className="mt-2 text-sm text-flame-text hover:text-ink transition-colors underline underline-offset-4"
                  >
                    Browse the collection
                  </button>
                </div>
              ) : (
                <ul className="divide-y divide-wire-faint">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.li
                        key={item.id}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="flex gap-4 px-6 py-5">
                          {/* Image */}
                          <div className="relative w-20 h-20 shrink-0 bg-panel-lift overflow-hidden">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                              sizes="80px"
                            />
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start gap-2">
                              <p className="font-display text-sm text-ink leading-tight">
                                {item.name}
                              </p>
                              <button
                                onClick={() => removeItem(item.id)}
                                aria-label={`Remove ${item.name}`}
                                className="text-ink-dim hover:text-flame-text transition-colors shrink-0 mt-0.5"
                              >
                                <X size={14} strokeWidth={1.5} />
                              </button>
                            </div>

                            <p className="text-xs text-ink-dim mt-1 leading-tight line-clamp-1">
                              {item.scent}
                            </p>

                            <div className="flex items-center justify-between mt-3">
                              {/* Qty controls */}
                              <div className="flex items-center border border-wire">
                                <button
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity - 1)
                                  }
                                  aria-label="Decrease quantity"
                                  className="p-1.5 text-ink-dim hover:text-ink transition-colors"
                                >
                                  <Minus size={12} strokeWidth={2} />
                                </button>
                                <span className="px-3 text-sm text-ink tabular-nums min-w-[2ch] text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity + 1)
                                  }
                                  aria-label="Increase quantity"
                                  className="p-1.5 text-ink-dim hover:text-ink transition-colors"
                                >
                                  <Plus size={12} strokeWidth={2} />
                                </button>
                              </div>

                              <p className="text-sm text-ink font-medium tabular-nums">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-wire-faint px-6 py-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-ink-dim">Subtotal</span>
                  <span className="text-sm text-ink font-medium tabular-nums">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-ink-dim">Shipping</span>
                  <span className="text-sm text-ink-dim">
                    Calculated at checkout
                  </span>
                </div>
                <div className="h-px bg-wire-faint" />
                <div className="flex justify-between items-center">
                  <span className="font-display text-base text-ink">Total</span>
                  <span className="font-display text-base text-flame-text tabular-nums">
                    ${total.toFixed(2)}
                  </span>
                </div>

                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="
                    flex items-center justify-center gap-2 w-full
                    bg-flame text-base py-4 text-sm font-medium tracking-wide
                    hover:bg-flame-dim transition-colors
                    hover:shadow-[0_0_24px_0_oklch(0.72_0.130_67/0.35)]
                    group
                  "
                >
                  Proceed to Checkout
                  <ArrowRight
                    size={16}
                    strokeWidth={1.5}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>

                <p className="text-center text-xs text-ink-dim">
                  Free shipping on orders over $75
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
