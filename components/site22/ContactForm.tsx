"use client";

// Contact page ka form — homepage demo-form jaisa hi Web3Forms flow (connect@hello22.ai par email).
// Fields client reference (2026-07-10) ke structure par: Name/Email row, Company optional, Subject, Message.
import { useState } from "react";
import { SUB } from "@/components/site22/PageShell";

const WEB3FORMS_ACCESS_KEY = "42827426-7f8f-4a99-98a9-7aabe3ed8000";

const inp: React.CSSProperties = { width: "100%", background: "var(--toggle-bg)", border: "1px solid var(--toggle-bd)", borderRadius: 10, padding: "12px 14px", color: "var(--tx)", fontSize: 15, fontFamily: "inherit", outline: "none", boxSizing: "border-box" };
const lab: React.CSSProperties = { display: "block", fontSize: 13.5, fontWeight: 700, color: "var(--tx2)", marginBottom: 7 };

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("access_key", WEB3FORMS_ACCESS_KEY);
    data.append("from_name", "hello22.ai Contact Page");
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: data });
      const json = await res.json();
      if (json.success) { setStatus("ok"); form.reset(); } else setStatus("err");
    } catch {
      setStatus("err");
    }
  }

  if (status === "ok") {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, textAlign: "center", padding: "48px 16px" }}>
        <span style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--tint)", border: "1px solid var(--tint-bd)", color: "var(--num)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}><i className="fa-solid fa-check" aria-hidden="true" /></span>
        <div style={{ fontFamily: SUB, fontWeight: 700, fontSize: 20 }}>Message sent!</div>
        <p style={{ fontSize: 14.5, color: "var(--mut)", margin: 0, maxWidth: 340 }}>Thanks for reaching out — we&apos;ll usually get back to you within 30 minutes during business hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" style={{ display: "none" }} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,220px),1fr))", gap: 16 }}>
        <div>
          <label htmlFor="cf-name" style={lab}>Name</label>
          <input id="cf-name" name="name" required placeholder="John Doe" autoComplete="name" style={inp} />
        </div>
        <div>
          <label htmlFor="cf-email" style={lab}>Email</label>
          <input id="cf-email" name="email" type="email" required placeholder="john@example.com" autoComplete="email" style={inp} />
        </div>
      </div>
      <div>
        <label htmlFor="cf-company" style={lab}>Company <span style={{ fontWeight: 500, color: "var(--mut)" }}>(Optional)</span></label>
        <input id="cf-company" name="company" placeholder="Your Company" autoComplete="organization" style={inp} />
      </div>
      <div>
        <label htmlFor="cf-subject" style={lab}>Subject</label>
        <input id="cf-subject" name="subject" required placeholder="How can we help you?" style={inp} />
      </div>
      <div>
        <label htmlFor="cf-message" style={lab}>Message</label>
        <textarea id="cf-message" name="message" required rows={5} placeholder="Please provide details about your inquiry…" style={{ ...inp, resize: "vertical" }} />
      </div>
      <button type="submit" disabled={status === "sending"} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10, border: "none", cursor: status === "sending" ? "wait" : "pointer", fontFamily: "inherit", fontWeight: 700, fontSize: 15.5, color: "#fff", padding: "14px 18px", borderRadius: 12, background: "#2c76ed", opacity: status === "sending" ? 0.7 : 1, boxShadow: "0 14px 32px -14px rgba(44,118,237,.7)" }}>
        {status === "sending" ? "Sending…" : "Send Message"}
      </button>
      {status === "err" && <p style={{ fontSize: 13, color: "#e2564d", textAlign: "center", margin: 0 }}>Something went wrong. Please try again or email connect@hello22.ai directly.</p>}
      <p style={{ fontSize: 12.5, color: "var(--mut)", textAlign: "center", margin: 0, lineHeight: 1.6 }}>
        By submitting this form, you agree to our <a href="/privacy" style={{ color: "var(--num)", textDecoration: "underline" }}>Privacy Policy</a> and allow us to contact you regarding your inquiry.
      </p>
    </form>
  );
}
