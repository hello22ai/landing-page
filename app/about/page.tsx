import type { Metadata } from "next";
import PageShell, { DISP, SUB } from "@/components/site22/PageShell";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about hello22 — the team building an AI receptionist that answers business calls 24/7, books appointments, and captures every lead.",
};

const VALUES = [
  {
    ic: "fa-solid fa-handshake-angle",
    title: "Human-first, always",
    desc: "Sarah is designed to sound warm, helpful and natural — and to hand the call to a real person whenever that's the right thing to do. Technology should serve the conversation, not get in its way.",
  },
  {
    ic: "fa-solid fa-shield-halved",
    title: "Privacy by default",
    desc: "Call recordings, transcripts and customer details are encrypted, access-controlled and never sold. We collect only what's needed to serve your callers well.",
  },
  {
    ic: "fa-solid fa-store",
    title: "Built for small business",
    desc: "No enterprise contracts, no call-centre complexity. hello22 is priced and designed for the businesses that feel every missed call the most.",
  },
  {
    ic: "fa-solid fa-arrow-trend-up",
    title: "Always improving",
    desc: "Every conversation makes the service better. We ship improvements continuously, so your receptionist keeps getting sharper at handling your callers.",
  },
];

const STATS = [
  { v: "24/7", l: "Always answering" },
  { v: "< 10 min", l: "From sign-up to live" },
  { v: "100%", l: "Calls captured" },
];

export default function AboutPage() {
  return (
    <PageShell current="/about">
      {/* HERO */}
      <div style={{ fontFamily: DISP, fontSize: 12.5, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--num)", fontWeight: 700 }}>About hello22</div>
      <h1 style={{ fontFamily: DISP, fontWeight: 600, letterSpacing: "-.03em", fontSize: "clamp(34px,5.4vw,58px)", lineHeight: 1.06, margin: "16px 0 0", maxWidth: 800 }}>
        No business should lose a customer to a <span style={{ color: "var(--num)" }}>missed call</span>.
      </h1>
      <p style={{ fontSize: 17.5, lineHeight: 1.7, color: "var(--mut)", maxWidth: 680, margin: "22px 0 0" }}>
        That&apos;s the conviction hello22 was built on. Every day, plumbers, electricians, salons, clinics and real estate agents lose real work because a call rang out while they were busy doing the actual job. We think that&apos;s a solvable problem.
      </p>
      <p style={{ fontSize: 17.5, lineHeight: 1.7, color: "var(--mut)", maxWidth: 680, margin: "16px 0 0" }}>
        So we built Sarah — a friendly, reliable receptionist who answers every call, books appointments, captures every lead and sends you a clear summary the moment each conversation ends. You stay on the tools; your customers always reach a warm, professional voice.
      </p>

      {/* STATS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 14, marginTop: 44, maxWidth: 680 }}>
        {STATS.map((s) => (
          <div key={s.l} style={{ background: "var(--surface)", border: "1px solid var(--line2)", borderRadius: 18, padding: "22px 20px" }}>
            <div style={{ fontFamily: SUB, fontWeight: 700, fontSize: 28, color: "var(--num)", letterSpacing: "-.01em" }}>{s.v}</div>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--mut)", marginTop: 6 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* VALUES */}
      <h2 style={{ fontFamily: DISP, fontWeight: 600, letterSpacing: "-.02em", fontSize: "clamp(24px,3.4vw,34px)", margin: "72px 0 0" }}>
        What we <span style={{ color: "var(--num)" }}>believe</span>.
      </h2>
      {/* 2×2 balance — auto-fit 300px par 3+1 toot jata tha */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,380px),1fr))", gap: 16, marginTop: 30 }}>
        {VALUES.map((v) => (
          <div key={v.title} style={{ background: "var(--surface)", border: "1px solid var(--line2)", borderRadius: 20, padding: "26px 24px" }}>
            <span style={{ width: 44, height: 44, borderRadius: 12, background: "var(--tint)", border: "1px solid var(--tint-bd)", color: "var(--num)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}><i className={v.ic} aria-hidden="true" /></span>
            <h3 style={{ fontFamily: SUB, fontWeight: 700, fontSize: 19, margin: "16px 0 0" }}>{v.title}</h3>
            <p style={{ fontSize: 15, lineHeight: 1.65, color: "var(--mut)", margin: "10px 0 0" }}>{v.desc}</p>
          </div>
        ))}
      </div>

      {/* STORY */}
      <div style={{ background: "var(--surface)", border: "1px solid var(--line2)", borderRadius: 24, padding: "clamp(28px,4vw,44px)", marginTop: 72 }}>
        <h2 style={{ fontFamily: DISP, fontWeight: 600, letterSpacing: "-.02em", fontSize: "clamp(22px,3vw,30px)", margin: 0 }}>
          Why <span style={{ color: "var(--num)" }}>&ldquo;hello22&rdquo;</span>?
        </h2>
        <p style={{ fontSize: 16.5, lineHeight: 1.7, color: "var(--mut)", maxWidth: 720, margin: "16px 0 0" }}>
          Because every great customer relationship starts with a simple &ldquo;hello&rdquo; — and we believe no caller should ever hear voicemail instead of one. We&apos;re an Australian team building for Australian small businesses: the tradies, clinics, salons and agencies whose phones are their livelihood.
        </p>
        <p style={{ fontSize: 16.5, lineHeight: 1.7, color: "var(--mut)", maxWidth: 720, margin: "14px 0 0" }}>
          The AI stays in the background. Your business — and your customers — are always the focus.
        </p>
      </div>

      {/* CTA */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap", marginTop: 56 }}>
        <div>
          <h2 style={{ fontFamily: DISP, fontWeight: 600, fontSize: "clamp(20px,2.6vw,26px)", letterSpacing: "-.01em", margin: 0 }}>Want to hear Sarah in action?</h2>
          <p style={{ fontSize: 15, color: "var(--mut)", margin: "8px 0 0" }}>Try the live demo on our homepage, or start your 14-day free trial.</p>
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a href="https://app.hello22.ai/" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 9, textDecoration: "none", background: "#2c76ed", color: "#fff", fontWeight: 700, fontSize: 15, padding: "13px 24px", borderRadius: 999, boxShadow: "0 14px 30px -14px rgba(44,118,237,.7)" }}>Start free trial</a>
          <a href="/#demo" style={{ display: "inline-flex", alignItems: "center", gap: 9, textDecoration: "none", background: "transparent", color: "var(--num)", fontWeight: 700, fontSize: 15, padding: "12px 22px", borderRadius: 999, border: "1.5px solid var(--tint-bd)" }}>Hear a live call</a>
        </div>
      </div>
    </PageShell>
  );
}
