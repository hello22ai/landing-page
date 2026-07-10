import type { Metadata } from "next";
import PageShell, { DISP, SUB } from "@/components/site22/PageShell";
import ContactForm from "@/components/site22/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with hello22 — questions about pricing, setup, or whether an AI receptionist fits your business. We usually reply within 30 minutes during business hours.",
};

// Top info cards — sirf real cheezein (koi phone/address abhi public nahi hai, fake nahi daala).
const CARDS = [
  { ic: "fa-regular fa-envelope", title: "Email Us", note: "Our friendly team is here to help", value: "connect@hello22.ai", href: "mailto:connect@hello22.ai" },
  { ic: "fa-solid fa-headset", title: "Hear Sarah Live", note: "Listen to a real recorded call", value: "Play the demo", href: "/#demo" },
  { ic: "fa-regular fa-calendar-check", title: "Book Demo Call", note: "Schedule a personalised demo", value: "Book my demo", href: "/#cta" },
  { ic: "fa-regular fa-clock", title: "Availability", note: "Sarah answers your customers", value: "24/7", href: null },
];

const SOCIALS = [
  { ic: "fa-facebook-f", href: "https://www.facebook.com/hello22ai", label: "Facebook" },
  { ic: "fa-instagram", href: "https://www.instagram.com/hello22.ai", label: "Instagram" },
  { ic: "fa-pinterest-p", href: "https://www.pinterest.com/hello22_ai", label: "Pinterest" },
  { ic: "fa-linkedin-in", href: "https://www.linkedin.com/company/hello22-ai", label: "LinkedIn" },
];

const cardStyle: React.CSSProperties = { background: "var(--surface)", border: "1px solid var(--line2)", borderRadius: 20, padding: "28px 24px", textAlign: "center" };
const iconStyle: React.CSSProperties = { width: 48, height: 48, borderRadius: "50%", background: "var(--tint)", border: "1px solid var(--tint-bd)", color: "var(--num)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 18 };

export default function ContactPage() {
  return (
    <PageShell current="/contact">
      {/* HERO — centered (client reference 2026-07-10) */}
      <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
        <div style={{ display: "inline-flex", alignItems: "center", padding: "8px 16px", borderRadius: 999, border: "1px solid var(--tint-bd)", background: "var(--tint)", fontFamily: DISP, fontSize: 12, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--num)", fontWeight: 700 }}>Contact</div>
        <h1 style={{ fontFamily: DISP, fontWeight: 600, letterSpacing: "-.03em", fontSize: "clamp(34px,5.2vw,54px)", lineHeight: 1.05, margin: "18px 0 0" }}>
          Get in <span style={{ color: "var(--num)" }}>touch</span>.
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.7, color: "var(--mut)", margin: "18px 0 0" }}>
          Have questions about hello22? We&apos;re here to help and would love to hear from you.
        </p>
      </div>

      {/* INFO CARDS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,230px),1fr))", gap: 16, marginTop: 48 }}>
        {CARDS.map((c) => (
          <div key={c.title} style={cardStyle}>
            <span style={iconStyle}><i className={c.ic} aria-hidden="true" /></span>
            <h2 style={{ fontFamily: SUB, fontWeight: 700, fontSize: 17.5, margin: "16px 0 0" }}>{c.title}</h2>
            <p style={{ fontSize: 13.5, lineHeight: 1.55, color: "var(--mut)", margin: "8px 0 0" }}>{c.note}</p>
            {c.href ? (
              <a href={c.href} style={{ display: "inline-block", fontSize: 15, fontWeight: 700, color: "var(--num)", textDecoration: "none", marginTop: 12 }}>{c.value}</a>
            ) : (
              <p style={{ fontSize: 15, fontWeight: 700, color: "var(--num)", margin: "12px 0 0" }}>{c.value}</p>
            )}
          </div>
        ))}
      </div>

      {/* FORM + SIDE INFO */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,420px),1fr))", gap: 20, marginTop: 56, alignItems: "start" }}>
        {/* form card */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--line2)", borderRadius: 24, padding: "clamp(24px,4vw,36px)" }}>
          <h2 style={{ fontFamily: DISP, fontWeight: 600, letterSpacing: "-.02em", fontSize: "clamp(21px,2.8vw,27px)", margin: 0 }}>
            Send us a <span style={{ color: "var(--num)" }}>message</span>.
          </h2>
          <p style={{ fontSize: 14.5, color: "var(--mut)", margin: "10px 0 24px" }}>Fill out the form below and we&apos;ll get back to you as soon as possible.</p>
          <ContactForm />
        </div>

        {/* side column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ background: "var(--surface)", border: "1px solid var(--line2)", borderRadius: 24, padding: "clamp(24px,4vw,32px)" }}>
            <h2 style={{ fontFamily: DISP, fontWeight: 600, letterSpacing: "-.02em", fontSize: 21, margin: 0 }}>hello22</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 20, marginTop: 22 }}>
              {[
                { ic: "fa-solid fa-location-dot", t: "Made in Australia", d: "Built for Australian small businesses — remote setup available anywhere." },
                { ic: "fa-regular fa-clock", t: "Support hours", d: "We usually reply within 30 minutes during business hours." },
                { ic: "fa-solid fa-phone-volume", t: "Your receptionist", d: "Sarah answers your customers 24/7 — day, night, weekends, holidays." },
                { ic: "fa-solid fa-circle-check", t: "Status", d: "All systems operational." },
              ].map((r) => (
                <div key={r.t} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <span style={{ width: 38, height: 38, borderRadius: "50%", flexShrink: 0, background: "var(--tint)", border: "1px solid var(--tint-bd)", color: "var(--num)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}><i className={r.ic} aria-hidden="true" /></span>
                  <div>
                    <div style={{ fontFamily: SUB, fontWeight: 700, fontSize: 15.5 }}>{r.t}</div>
                    <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--mut)", margin: "4px 0 0" }}>{r.d}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 26, paddingTop: 22, borderTop: "1px solid var(--line)" }}>
              {SOCIALS.map((s) => (
                <a key={s.ic} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--toggle-bg)", border: "1px solid var(--toggle-bd)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--mut)", fontSize: 15, textDecoration: "none" }}>
                  <i className={`fa-brands ${s.ic}`} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* demo card */}
          <div style={{ background: "var(--tint)", border: "1px solid var(--tint-bd)", borderRadius: 24, padding: "clamp(24px,4vw,32px)" }}>
            <h2 style={{ fontFamily: DISP, fontWeight: 600, letterSpacing: "-.02em", fontSize: 21, margin: 0 }}>Book a demo call</h2>
            <p style={{ fontSize: 14.5, lineHeight: 1.65, color: "var(--mut)", margin: "12px 0 20px" }}>
              Tell us a little about your business and we&apos;ll show you exactly how Sarah would answer your calls.
            </p>
            <a href="/#cta" style={{ display: "inline-flex", alignItems: "center", gap: 9, textDecoration: "none", background: "#2c76ed", color: "#fff", fontWeight: 700, fontSize: 15, padding: "13px 24px", borderRadius: 999, boxShadow: "0 14px 30px -14px rgba(44,118,237,.7)" }}>Schedule demo call</a>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
