import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.aireceptionist.example.com"),
  title: {
    default: "hello22 — Never Miss Another Customer Call",
    template: "%s | hello22",
  },
  description:
    "Our AI Receptionist answers calls 24/7, captures customer information, books appointments, and ensures every opportunity is handled professionally — even when you're unavailable.",
  keywords: [
    "AI receptionist",
    "AI call answering service",
    "24/7 call answering",
    "appointment booking",
    "lead capture",
    "virtual receptionist",
  ],
  openGraph: {
    type: "website",
    title: "hello22 — Never Miss Another Customer Call",
    description:
      "Answer every call 24/7, capture more leads, and book appointments automatically with your AI Receptionist.",
    siteName: "hello22",
  },
  twitter: {
    card: "summary_large_image",
    title: "hello22 — Never Miss Another Customer Call",
    description:
      "Answer every call 24/7, capture more leads, and book appointments automatically with your AI Receptionist.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
