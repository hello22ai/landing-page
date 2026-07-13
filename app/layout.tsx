import type { Metadata, Viewport } from "next";
import { Caveat, Fraunces, Inter_Tight, Manrope, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";

// Homepage fonts live HERE (not in the client component) so next/font emits
// <link rel="preload"> for them — late font discovery was re-recording LCP at ~9.7s.
// No weight array = single variable-font file per family (fewer preloads).
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space", display: "swap" });
// Pricing section ke handwritten doodle-note ke liye (reference UI 2026-07-13) — accent only.
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat", display: "swap", preload: false });
// Conthrax is a manual @font-face in globals.css (stable /fonts URL) + preload link below —
// next/font hid it in hashed CSS with no preload, so the LCP headline swapped fonts at ~9.7s.

// Legacy fonts (about/contact pages). preload:false — the homepage never renders them.
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-fraunces",
  display: "swap",
  preload: false,
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter-tight",
  display: "swap",
  preload: false,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#07070d",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.hello22.ai"),
  title: "hello22 — AI Voice Agents That Sound Human",
  description:
    "hello22 builds voice AI agents that answer calls, book appointments, and resolve customer issues in 22+ languages. Deploy in 22 minutes.",
  // Canonical (SEO reviewer 2026-07-10) — child pages apna canonical khud set karte hain
  alternates: { canonical: "/" },
  other: {
    "facebook-domain-verification": "4a9knjqdo3240smec39psb3j91dxtj"
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.variable} ${space.variable} ${fraunces.variable} ${interTight.variable} ${caveat.variable}`}>
      <body>
        {/* LCP-critical: the hero headline renders in Conthrax */}
        <link rel="preload" href="/fonts/conthrax-sb.woff" as="font" type="font/woff" crossOrigin="anonymous" />
        {/* Font Awesome — async so its CSS never blocks first paint (was ~2.5s of the
            render-blocking budget on slow 4G). Copied to /public/fa; inline injector runs
            during HTML parse, dynamically-inserted stylesheets don't block rendering. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var l=document.createElement('link');l.rel='stylesheet';l.href='/fa/css/all.min.css';document.head.appendChild(l);})();`,
          }}
        />
        <noscript><link rel="stylesheet" href="/fa/css/all.min.css" /></noscript>
         {children}
        {/* Google Tag Manager — afterInteractive so it doesn't fight hydration on mobile */}
        <Script
          id="gtm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MGM4L8SG');`,
          }}
        />
        {/* Meta Pixel */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '2981668052172302');
fbq('track', 'PageView');`,
          }}
        />
        {/* Google Tag Manager (noscript)  */}
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MGM4L8SG"
          height="0" width="0" style={{ display: "none", visibility: "hidden" }}></iframe></noscript>
        {/* End Google Tag Manager (noscript)  */}
        {/* Meta Pixel Code (noscript) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <noscript><img height="1" width="1" style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=2981668052172302&ev=PageView&noscript=1"
          alt="" /></noscript>
        {/* End Meta Pixel Code (noscript) */}
      </body>
    </html>
  );
}
