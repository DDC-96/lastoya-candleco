import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { CartDrawer } from "@/components/CartDrawer";
import { CartFlyIndicator } from "@/components/CartFlyIndicator";
import { Footer } from "@/components/Footer";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
      className={`${urbanist.variable} h-full`}
    >
      <body className="flex flex-col min-h-full antialiased">
        <Nav />
        <CartDrawer />
        <CartFlyIndicator />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}