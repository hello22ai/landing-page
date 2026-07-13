import type { Metadata } from "next";
import PageShell, { DISP, SUB } from "@/components/site22/PageShell";
import CalcCard from "@/components/site22/CalcCard";

// ROI calculator ka apna page (user request 2026-07-13 v3 — pehle homepage popup tha).
// Homepage pricing section ka CTA yahan link karta hai.
export const metadata: Metadata = {
  title: "Missed Call Cost Calculator",
  description:
    "Find out what missed calls are really costing your business. Pick your industry, adjust the numbers, and see your estimated lost revenue — then compare it with what hello22 costs.",
  alternates: { canonical: "/calculator" },
};

const HL: React.CSSProperties = { color: "var(--num)", fontWeight: 700 };
const CAVEAT = "var(--font-caveat), 'Segoe Script', cursive";

export default function CalculatorPage() {
  return (
    <PageShell current="/calculator" maxWidth={1536}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,440px),1fr))", gap: "clamp(32px,4vw,64px)", alignItems: "center" }}>
        {/* ===== LEFT — heading + illustration + doodles ===== */}
        <div style={{ position: "relative" }}>
          <span style={{ display: "block", fontFamily: CAVEAT, fontSize: 21, fontWeight: 600, lineHeight: 1.25, color: "var(--num)" }}>See the real impact of every missed call. <i className="fa-regular fa-heart" aria-hidden="true" style={{ fontSize: 13 }} /></span>
          <div style={{ display: "inline-flex", alignItems: "center", padding: "8px 16px", borderRadius: 999, border: "1px solid var(--tint-bd)", background: "var(--tint)", fontFamily: DISP, fontSize: 11.5, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--num)", fontWeight: 700, marginTop: 18 }}><i className="fa-solid fa-calculator" aria-hidden="true" style={{ marginRight: 8, fontSize: 11 }} />ROI Calculator</div>
          <h1 style={{ fontFamily: DISP, fontWeight: 600, letterSpacing: "-.025em", fontSize: "clamp(27px,4vw,42px)", lineHeight: 1.15, margin: "16px 0 0" }}>
            What Missed Calls Are{" "}
            <span style={{ position: "relative", display: "inline-block", whiteSpace: "nowrap" }}>
              <span style={HL}>Costing You</span>
              <svg aria-hidden="true" viewBox="0 0 220 12" style={{ position: "absolute", left: "2%", bottom: -12, width: "96%", height: 12, overflow: "visible" }}><path d="M4 9 C 62 3, 152 2, 216 6" stroke="var(--num)" strokeWidth="3.5" fill="none" strokeLinecap="round" opacity=".85" /></svg>
            </span>.
          </h1>
          <p style={{ fontSize: 16.5, color: "var(--mut)", maxWidth: 470, margin: "26px 0 0", lineHeight: 1.7 }}>Pick your industry, adjust the numbers, and see the revenue quietly walking out the door every time the phone rings out — then compare it with <a href="/#pricing" style={{ color: "var(--num)", fontWeight: 700, textDecoration: "none" }}>hello22&apos;s plans</a>.</p>
          {/* illustration — analytics window + missed-call badge + speech bubble */}
          <div aria-hidden="true" style={{ position: "relative", maxWidth: 430, marginTop: 40 }}>
            <div style={{ background: "var(--surface)", border: "1px solid var(--line2)", borderRadius: 18, boxShadow: "0 24px 50px -30px var(--sh1)", padding: "14px 18px 18px" }}>
              <span style={{ display: "inline-flex", gap: 5 }}>{[0, 1, 2].map((d) => <span key={d} style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--line2)" }} />)}</span>
              <svg viewBox="0 0 360 150" style={{ width: "100%", display: "block", marginTop: 10, overflow: "visible" }}>
                <circle cx="62" cy="72" r="42" fill="none" stroke="rgba(44,118,237,.18)" strokeWidth="20" />
                <circle cx="62" cy="72" r="42" fill="none" stroke="#2c76ed" strokeWidth="20" strokeDasharray="145 264" strokeLinecap="butt" transform="rotate(-90 62 72)" />
                <circle cx="62" cy="72" r="42" fill="none" stroke="#7c6cf0" strokeWidth="20" strokeDasharray="55 264" strokeDashoffset="-145" transform="rotate(-90 62 72)" />
                <rect x="150" y="92" width="26" height="42" rx="5" fill="rgba(44,118,237,.3)" />
                <rect x="186" y="70" width="26" height="64" rx="5" fill="rgba(44,118,237,.5)" />
                <rect x="222" y="46" width="26" height="88" rx="5" fill="#2c76ed" />
                <rect x="258" y="22" width="26" height="112" rx="5" fill="#7c6cf0" />
                <path d="M148 96 C 200 78, 240 50, 296 16" fill="none" stroke="var(--num)" strokeWidth="3" strokeLinecap="round" />
                <path d="M282 14 L 296 16 L 292 29" fill="none" stroke="var(--num)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span style={{ position: "absolute", left: -18, top: -18, width: 46, height: 46, borderRadius: "50%", background: "#e2564d", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 17, boxShadow: "0 12px 26px -12px rgba(226,86,77,.8)" }}><i className="fa-solid fa-phone-slash" /></span>
            <span style={{ position: "absolute", right: -10, top: -26, background: "var(--surface)", border: "1px solid var(--tint-bd)", borderRadius: "16px 16px 16px 5px", padding: "9px 15px", fontFamily: CAVEAT, fontSize: 18, fontWeight: 600, lineHeight: 1.2, color: "var(--num)", boxShadow: "0 14px 30px -18px var(--sh2)" }}>That&apos;s real money<br />walking out the door.</span>
          </div>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 10, marginTop: 28, fontFamily: CAVEAT, fontSize: 22, fontWeight: 600, color: "var(--num)" }}>
            Small changes. Big impact.
            <svg aria-hidden="true" viewBox="0 0 26 26" style={{ width: 18, height: 18, overflow: "visible" }}><path d="M13 2 L 15 10 L 23 13 L 15 16 L 13 24 L 11 16 L 3 13 L 11 10 Z" fill="none" stroke="var(--num)" strokeWidth="2" strokeLinejoin="round" /></svg>
          </span>
        </div>

        {/* ===== RIGHT — calculator ===== */}
        <div style={{ position: "relative" }}>
          <span style={{ display: "block", textAlign: "right", fontFamily: CAVEAT, fontSize: 20, fontWeight: 600, lineHeight: 1.25, color: "var(--num)", marginBottom: 10 }}>Adjust the numbers to match your business ↓</span>
          <CalcCard />
        </div>
      </div>

      {/* back to pricing */}
      <div style={{ textAlign: "center", marginTop: 56 }}>
        <a href="/#pricing" style={{ display: "inline-flex", alignItems: "center", gap: 9, textDecoration: "none", fontFamily: SUB, fontSize: 14.5, fontWeight: 700, color: "var(--mut)" }}>
          <i className="fa-solid fa-arrow-left" aria-hidden="true" style={{ fontSize: 11 }} /> Back to plans &amp; pricing
        </a>
      </div>
    </PageShell>
  );
}
