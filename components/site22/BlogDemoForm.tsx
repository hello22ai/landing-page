"use client";

// Blog detail page ka "Book a Free Demo" card — homepage FINAL CTA form ka mirror
// (client order 2026-07-20: cover image chhoti + uske right mein website wala form).
// Fields/submit/redirect Hello22Site ke submitDemo jaise hi — web3forms + app redirect.
// PageShell vars use hote hain (--w12 PageShell PAL mein nahi hai, isliye --w10 borders).
import { useState } from "react";
import { SUB } from "./PageShell";

const WEB3FORMS_ACCESS_KEY = "42827426-7f8f-4a99-98a9-7aabe3ed8000";
const APP_URL = "https://app.hello22.ai/";

const inp: React.CSSProperties = { width: "100%", background: "var(--w04)", border: "1px solid var(--w10)", borderRadius: 10, padding: "11px 13px", color: "var(--tx)", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" };
const opt: React.CSSProperties = { background: "var(--surface)", color: "var(--tx)" };

export default function BlogDemoForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const data = new FormData(form);
      data.append("access_key", WEB3FORMS_ACCESS_KEY);
      data.append("subject", "New demo request — hello22.ai (blog)");
      data.append("from_name", "hello22.ai website");
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: data });
      const json = await res.json();
      if (json.success) { setStatus("ok"); form.reset(); window.setTimeout(() => { window.location.href = APP_URL; }, 1800); }
      else setStatus("err");
    } catch {
      setStatus("err");
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", background: "var(--surface)", border: "1px solid var(--w10)", borderRadius: 24, padding: "22px 24px", boxSizing: "border-box" }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 13 }}>
        <span aria-hidden="true" style={{ width: 44, height: 44, borderRadius: 13, flexShrink: 0, background: "rgba(44,118,237,.12)", color: "var(--blue-ink)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}><i className="fa-regular fa-calendar-check" /></span>
        <span>
          <h3 style={{ fontFamily: SUB, fontWeight: 700, fontSize: 21, margin: 0 }}>Book a <span style={{ color: "var(--blue-ink)", fontWeight: 800 }}>Free Demo</span></h3>
          <p style={{ fontSize: 13.5, color: "var(--mut)", margin: "4px 0 0" }}>See your AI voice agent in action to hear how it sounds and performs.</p>
        </span>
      </div>
      {status === "ok" ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, textAlign: "center", padding: "40px 10px" }}>
          <span style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(44,118,237,.16)", color: "var(--lime)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}><i className="fa-solid fa-check" /></span>
          <div style={{ fontFamily: SUB, fontWeight: 700, fontSize: 20 }}>Thanks — request received!</div>
          <p style={{ fontSize: 14.5, color: "var(--mut)", margin: 0, maxWidth: 320 }}>Our team will get back to you within 30 minutes. Taking you to the hello22 app…</p>
        </div>
      ) : (
        <form onSubmit={submit} style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 11 }}>
          <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" style={{ display: "none" }} />
          <div className="bp-form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 11 }}>
            <input name="name" required placeholder="Full Name" style={inp} />
            <input name="business" required placeholder="Business Name" style={inp} />
          </div>
          <div className="bp-form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 11 }}>
            <input name="email" type="email" required placeholder="Business Email" style={inp} />
            <input name="phone" type="tel" required placeholder="Phone Number" style={inp} />
          </div>
          <div className="bp-form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 11 }}>
            <select name="industry" required defaultValue="" style={inp}>
              <option value="" disabled style={opt}>Industry</option>
              {["HVAC", "Cleaning", "Electrical", "Plumbing", "Painting", "Flooring", "Other"].map((x) => <option key={x} value={x} style={opt}>{x}</option>)}
            </select>
            <select name="monthly_calls" defaultValue="" style={inp}>
              <option value="" disabled style={opt}>Monthly Calls (Approx)</option>
              {["Under 100", "100–500", "500–1,000", "1,000–5,000", "5,000+"].map((x) => <option key={x} value={x} style={opt}>{x}</option>)}
            </select>
          </div>
          <textarea name="message" rows={2} placeholder="How can we help your business? (optional)" style={{ ...inp, resize: "vertical" }} />
          <button type="submit" disabled={status === "sending"} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10, border: "none", cursor: status === "sending" ? "wait" : "pointer", fontFamily: "inherit", fontWeight: 700, fontSize: 15, color: "#fff", padding: "13px 18px", borderRadius: 12, background: "var(--lime)", opacity: status === "sending" ? 0.7 : 1, boxShadow: "0 16px 38px -16px rgba(44,118,237,.7)" }}>
            {status === "sending" ? "Sending…" : <>Book My Demo <i className="fa-solid fa-calendar-check" aria-hidden="true" /></>}
          </button>
          {status === "err"
            ? <p style={{ fontSize: 13, color: "#e2564d", textAlign: "center", margin: 0 }}>Something went wrong. Please try again or email connect@hello22.ai.</p>
            : <p style={{ fontSize: 13, color: "var(--lime)", textAlign: "center", margin: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}><i className="fa-regular fa-clock" aria-hidden="true" /> We&apos;ll respond within 30 minutes</p>}
        </form>
      )}
    </div>
  );
}
