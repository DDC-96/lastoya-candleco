import type { Metadata } from "next";
import { Piazzolla, Jost } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";

const piazzolla = Piazzolla({
  variable: "--font-piazzolla",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Lastoya Candle Co.",
    template: "%s — Lastoya Candle Co.",
  },
  description:
    "Small-batch, hand-poured candles made in Riverside, CA. Every candle, by hand.",
  openGraph: {
    siteName: "Lastoya Candle Co.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${piazzolla.variable} ${jost.variable} h-full`}
    >
      <body className="flex flex-col min-h-full antialiased">
        <Nav />
        <CartDrawer />
        <main className="flex-1">{children}</main>
        <Footer />
      {/* impeccable-live-start */}
<script src="http://localhost:8400/live.js"></script>
{/* impeccable-live-end */}
</body>
    </html>
  );
}