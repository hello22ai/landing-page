import type { Metadata } from "next";
import { Fraunces, Inter_Tight } from "next/font/google";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-fraunces",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter-tight",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.hello22.ai"),
  title: "hello22 — AI Voice Agents That Sound Human",
  description:
    "hello22 builds voice AI agents that answer calls, book appointments, and resolve customer issues in 22+ languages. Deploy in 22 minutes.",
  other: {
    "facebook-domain-verification": "4a9knjqdo3240smec39psb3j91dxtj"
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${interTight.variable}`}>
      <body>{children}</body>
    </html>
  );
}
