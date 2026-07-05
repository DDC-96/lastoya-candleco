"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/lib/cart-store";

const leftLinks = [
  { label: "New", href: "/shop" },
  { label: "Best Sellers", href: "/shop" },
  { label: "About", href: "/#story" },
  { label: "FAQ", href: "/faq" },
  { label: "Bulk Orders", href: "/bulk-orders" },
  { label: "Contact", href: "/contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount, openCart } = useCartStore();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Escape key + focus trap
  useEffect(() => {
    if (!menuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const overlay = menuRef.current;
      if (!overlay) return;
      const focusable = Array.from(
        overlay.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    // Move focus into overlay on open
    menuRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  const linkCls = scrolled
    ? "text-ink-dim hover:text-ink"
    : "text-white/70 hover:text-white";
  const brandCls = scrolled ? "text-ink" : "text-white";

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-40
          transition-all duration-500
          ${scrolled
            ? "bg-night/95 backdrop-blur-sm border-b border-wire-faint"
            : "bg-transparent"
          }
        `}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 grid grid-cols-[1fr_auto_1fr] items-center gap-4">

          {/* Left — desktop nav links */}
          <nav className="hidden lg:flex items-center gap-5">
            {leftLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className={`text-xs tracking-wide transition-colors whitespace-nowrap ${linkCls}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Left — mobile hamburger */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className={`p-2.5 transition-colors ${linkCls}`}
            >
              {menuOpen ? (
                <X size={20} strokeWidth={1.5} />
              ) : (
                <Menu size={20} strokeWidth={1.5} />
              )}
            </button>
          </div>

          {/* Center — brand */}
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-center gap-2.5 hover:opacity-80 transition-opacity"
          >
            <Image
              src="/images/logo.png"
              alt=""
              width={32}
              height={32}
              className="w-8 h-8 rounded-full overflow-hidden shrink-0"
            />
            <span className={`font-display text-lg leading-none transition-colors ${brandCls}`}>
              Lastoya Candle Co.
            </span>
          </Link>

          {/* Right — cart */}
          <div className="flex items-center justify-end">
            <button
              onClick={openCart}
              aria-label={`Open cart (${itemCount} items)`}
              className={`relative p-2.5 transition-colors ${linkCls}`}
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {itemCount > 0 && (
                <motion.span
                  key={itemCount}
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-flame text-ink text-[10px] font-medium flex items-center justify-center"
                >
                  {itemCount > 9 ? "9+" : itemCount}
                </motion.span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile / tablet menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 bg-night/95 backdrop-blur-sm flex flex-col pt-24 px-6 lg:hidden"
          >
            <nav className="flex flex-col gap-6">
              {leftLinks.map((l, i) => (
                <motion.div
                  key={l.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 + 0.05 }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-display text-3xl text-ink hover:text-flame-text transition-colors"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
