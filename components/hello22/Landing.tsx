"use client";

import { useReveal } from "./useReveal";
import { AmbientWave } from "./AmbientWave";
import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { TrustBar } from "./TrustBar";
import { CallDemo } from "./CallDemo";
import { VoiceGallery } from "./VoiceGallery";
import { Features } from "./Features";
import { HowItWorks } from "./HowItWorks";
import { UseCases } from "./UseCases";
import { Integrations } from "./Integrations";
import { Stats } from "./Stats";
import { Pricing } from "./Pricing";
import { FinalCTA } from "./FinalCTA";
import { Footer } from "./Footer";

const FLOATING: { text: string; style: React.CSSProperties }[] = [
  { text: "hola", style: { top: "18%", left: "8%", fontSize: "120px", animationDelay: "0s" } },
  { text: "你好", style: { top: "65%", left: "12%", fontSize: "90px", animationDelay: "3s" } },
  { text: "bonjour", style: { top: "25%", right: "10%", fontSize: "100px", animationDelay: "5s" } },
  { text: "こんにちは", style: { top: "75%", right: "8%", fontSize: "85px", animationDelay: "2s" } },
  { text: "नमस्ते", style: { top: "45%", left: "45%", fontSize: "70px", animationDelay: "7s" } },
  { text: "olá", style: { top: "12%", left: "60%", fontSize: "75px", animationDelay: "4s" } },
];

export default function Landing() {
  useReveal();

  return (
    <>
      <AmbientWave />

      {/* Decorative orbs */}
      <div
        className="orb"
        style={{ width: "700px", height: "700px", background: "rgba(44,118,237,0.18)", top: "-250px", right: "-200px" }}
      ></div>
      <div
        className="orb"
        style={{ width: "500px", height: "500px", background: "rgba(197,245,66,0.07)", top: "40%", left: "-150px" }}
      ></div>

      {/* Floating hellos in different languages */}
      {FLOATING.map((f, i) => (
        <div key={i} className="floating-hello drift" style={f.style}>
          {f.text}
        </div>
      ))}

      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <CallDemo />
        <VoiceGallery />
        <Features />
        <HowItWorks />
        <UseCases />
        <Integrations />
        <Stats />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
