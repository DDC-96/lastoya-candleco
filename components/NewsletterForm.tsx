"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/Button";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success">("idle");

  const handleSubmit = () => {
    if (!email) return;
    setStatus("success");
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === "success" ? (
        <motion.p
          key="success"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 font-display text-lg text-flame-text"
        >
          You&apos;re on the list. Watch your inbox.
        </motion.p>
      ) : (
        <motion.form
          key="form"
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: "easeIn" }}
          onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}
          className="mt-8 flex gap-2 max-w-md mx-auto"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="
              flex-1 bg-panel border border-wire px-4 py-3
              text-sm text-ink placeholder:text-ink-dim
              focus:outline-none focus:border-flame transition-colors
            "
          />
          <Button type="submit" size="md">
            Subscribe
          </Button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
