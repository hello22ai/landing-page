"use client";

// ROI calculator card — /calculator page par use hota hai (2026-07-13: pehle homepage
// section tha, phir popup, ab apna page — user request v3). Industry dropdown se defaults
// (avg job value AUD + call→customer conversion %) set hote hain, phir sliders se adjust.
// CSS vars PageShell/Hello22Site dono palettes mein maujood hain (--w04 PageShell mein
// isi ke liye add hua).
import { useState } from "react";
import { SUB } from "./PageShell";

const APP_URL = "https://app.hello22.ai/";

type CalcInd = { n: string; price: number; conv: number };
const CALC_INDUSTRIES: CalcInd[] = [
  { n: "Home Services & Trades", price: 450, conv: 40 },
  { n: "Dental Clinic", price: 320, conv: 45 },
  { n: "Medical & Allied Health", price: 180, conv: 45 },
  { n: "Law Firm", price: 900, conv: 30 },
  { n: "Real Estate", price: 1500, conv: 12 },
  { n: "Restaurant & Hospitality", price: 90, conv: 60 },
  { n: "Salon & Beauty", price: 120, conv: 55 },
  { n: "Cleaning Services", price: 220, conv: 45 },
  { n: "Immigration & Consulting", price: 800, conv: 30 },
  { n: "Other / General Business", price: 300, conv: 35 },
];
const CALC_PERIODS = [
  { k: "day", label: "Daily", days: 1, word: "per day" },
  { k: "week", label: "Weekly", days: 7, word: "per week" },
  { k: "month", label: "Monthly", days: 30, word: "per month" },
  { k: "year", label: "Annually", days: 365, word: "per year" },
] as const;
// toLocaleString nahi — server/client locale mismatch hydration error de sakta hai
const calcFmt = (n: number) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const calcClamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

// Module scope — component ke andar define karte to har render par remount hokar
// number-input ka focus toot jata (React nested-component identity trap).
const CALC_ROW_ICON: React.CSSProperties = { width: 34, height: 34, borderRadius: 10, flexShrink: 0, background: "rgba(44,118,237,.12)", border: "1px solid rgba(44,118,237,.28)", color: "var(--blue-ink)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 13 };
const CALC_NUM_BOX: React.CSSProperties = { width: 78, padding: "8px 6px", textAlign: "center", fontWeight: 700, fontSize: 14.5, color: "var(--tx)", background: "var(--w04)", border: "1px solid var(--w10)", borderRadius: 10, fontFamily: "inherit" };
const CALC_SLIDER: React.CSSProperties = { width: "100%", marginTop: 12, accentColor: "#2c76ed", cursor: "pointer" };

function CalcRow({ ic, label, unit, val, set, min, max, step }: { ic: string; label: string; unit: string; val: number; set: (n: number) => void; min: number; max: number; step: number }) {
  return (
    <div style={{ marginTop: 20 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 11, fontSize: 14.5, fontWeight: 700, color: "var(--tx2)" }}><span style={CALC_ROW_ICON} aria-hidden="true"><i className={ic} /></span>{label}</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
          <input type="number" value={val} min={min} max={max} onChange={(e) => set(calcClamp(Number(e.target.value) || min, min, max))} aria-label={label} style={CALC_NUM_BOX} />
          <span style={{ fontSize: 13, color: "var(--dim)", fontWeight: 600, minWidth: 34 }}>{unit}</span>
        </span>
      </div>
      <input type="range" min={min} max={max} step={step} value={val} onChange={(e) => set(Number(e.target.value))} aria-label={`${label} slider`} style={CALC_SLIDER} />
    </div>
  );
}

export default function CalcCard() {
  const [indIdx, setIndIdx] = useState(0);
  const [calls, setCalls] = useState(3);
  const [conv, setConv] = useState(CALC_INDUSTRIES[0].conv);
  const [price, setPrice] = useState(CALC_INDUSTRIES[0].price);
  const [period, setPeriod] = useState<(typeof CALC_PERIODS)[number]["k"]>("year");

  const per = CALC_PERIODS.find((p) => p.k === period)!;
  const missed = Math.round(calls * per.days);
  const lost = calls * per.days * (conv / 100) * price;
  const pickInd = (i: number) => { setIndIdx(i); setConv(CALC_INDUSTRIES[i].conv); setPrice(CALC_INDUSTRIES[i].price); };

  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--w09)", borderRadius: 24, padding: "clamp(20px,2.6vw,30px)", boxShadow: "0 26px 60px -34px var(--sh1)" }}>
      {/* industry dropdown */}
      <label style={{ display: "block", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", color: "var(--dim)" }} htmlFor="calc-ind">Your industry</label>
      <span style={{ position: "relative", display: "block", marginTop: 9 }}>
        <select id="calc-ind" value={indIdx} onChange={(e) => pickInd(Number(e.target.value))} style={{ width: "100%", appearance: "none", WebkitAppearance: "none", MozAppearance: "none", padding: "13px 42px 13px 16px", borderRadius: 13, border: "1.5px solid rgba(44,118,237,.35)", background: "var(--w04)", color: "var(--tx)", fontFamily: "inherit", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
          {CALC_INDUSTRIES.map((x, i) => <option key={x.n} value={i}>{x.n}</option>)}
        </select>
        <i className="fa-solid fa-chevron-down" aria-hidden="true" style={{ position: "absolute", right: 17, top: "50%", transform: "translateY(-50%)", fontSize: 12, color: "var(--blue-ink)", pointerEvents: "none" }} />
      </span>

      <CalcRow ic="fa-solid fa-phone-slash" label="Missed calls per day" unit="calls" val={calls} set={setCalls} min={1} max={25} step={1} />
      <CalcRow ic="fa-solid fa-user-plus" label="Calls that convert to customers" unit="%" val={conv} set={setConv} min={5} max={80} step={1} />
      <CalcRow ic="fa-solid fa-tag" label="Average job / service value" unit="AUD" val={price} set={setPrice} min={50} max={2500} step={10} />

      {/* period toggle */}
      <div style={{ display: "flex", gap: 6, marginTop: 24, padding: 5, background: "var(--w05)", border: "1px solid var(--w09)", borderRadius: 999 }}>
        {CALC_PERIODS.map((p) => (
          <button key={p.k} onClick={() => setPeriod(p.k)} aria-pressed={period === p.k} style={{ flex: 1, padding: "9px 4px", borderRadius: 999, border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 13.5, fontWeight: 700, background: period === p.k ? "var(--lime)" : "transparent", color: period === p.k ? "#fff" : "var(--mut)", boxShadow: period === p.k ? "0 8px 18px -8px rgba(44,118,237,.7)" : "none", transition: "background .2s ease,color .2s ease" }}>{p.label}</button>
        ))}
      </div>

      {/* result */}
      <div style={{ background: "rgba(44,118,237,.09)", border: "1px solid rgba(44,118,237,.25)", borderRadius: 16, padding: "18px 20px", marginTop: 18, textAlign: "center" }}>
        <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--blue-ink)" }}>Estimated revenue lost {per.word} (AUD)</div>
        <div style={{ fontFamily: SUB, fontWeight: 700, fontSize: "clamp(30px,3.6vw,42px)", letterSpacing: "-.02em", color: "var(--blue-ink)", marginTop: 6, lineHeight: 1 }}>${calcFmt(lost)}</div>
        <div style={{ fontSize: 13.5, color: "var(--mut)", marginTop: 8 }}>That&apos;s {calcFmt(missed)} missed {missed === 1 ? "call" : "calls"} {per.word}</div>
      </div>

      {/* hello22 cost comparison */}
      <div style={{ background: "rgba(34,197,94,.08)", border: "1px solid rgba(34,197,94,.25)", borderRadius: 14, padding: "14px 18px", marginTop: 12 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12.5, fontWeight: 800, letterSpacing: ".07em", textTransform: "uppercase", color: "#1a9a5c" }}><i className="fa-regular fa-lightbulb" aria-hidden="true" />What hello22 costs</span>
          <span style={{ fontSize: 13.5, fontWeight: 800, color: "var(--tx2)" }}>From AUD 49/mo</span>
        </div>
        <p style={{ fontSize: 13.5, lineHeight: 1.55, color: "var(--mut)", margin: "7px 0 0" }}><strong style={{ color: "var(--tx2)", fontWeight: 700 }}>Recover just one missed job</strong> and hello22 has paid for itself — everything it books after that is profit.</p>
      </div>

      {/* CTA */}
      <a href={APP_URL} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, textDecoration: "none", background: "var(--lime)", color: "#fff", fontWeight: 700, fontSize: 15.5, padding: "14px 18px", borderRadius: 14, marginTop: 16, boxShadow: "0 14px 30px -14px rgba(44,118,237,.7)" }}>Stop losing calls — start free <i className="fa-solid fa-arrow-right" aria-hidden="true" style={{ fontSize: 13 }} /></a>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: 12.5, color: "var(--dim)", marginTop: 12 }}>
        <i className="fa-solid fa-lock" aria-hidden="true" style={{ fontSize: 10 }} /> No credit card required · 14-day free trial (30 call minutes)
      </div>
    </div>
  );
}
