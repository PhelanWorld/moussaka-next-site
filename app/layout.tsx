import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Homemade Moussaka — Tufnell Park | Baked to Order",
  description:
    "Pre-order by Thursday 12:00. Collect in Tufnell Park or get North London delivery at the weekend. Proper layers. Proper béchamel.",
  openGraph: {
    title: "Homemade Moussaka — Tufnell Park",
    description:
      "Baked to order. Pre-order by Thu 12:00. Collection or North London delivery.",
    images: ["/og-hero.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#F5EFE6] text-[#1f1b16] antialiased">{children}</body>
    </html>
  );
}
