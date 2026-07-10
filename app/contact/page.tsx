import type { Metadata } from "next";
import PageShell, { DISP, SUB } from "@/components/site22/PageShell";
import ContactForm from "@/components/site22/ContactForm";

// Content user ka diya hua (2026-07-10) — layout About page jaisi structure par.
export const metadata: Metadata = {
  title: "Contact",
  description:
    "Have a question about hello22 AI, our voice agents, features or pricing? Email connect@hello22.ai — we'll respond to your enquiry as soon as we can.",
};

const HELP_TOPICS = [
  { ic: "fa-solid fa-cube", t: "Product" },
  { ic: "fa-solid fa-tags", t: "Pricing & Plans" },
  { ic: "fa-solid fa-microphone-lines", t: "AI Voice Setup" },
  { ic: "fa-regular fa-credit-card", t: "Account & Billing" },
  { ic: "fa-solid fa-plug", t: "Integrations" },
  { ic: "fa-solid fa-headset", t: "Technical Support" },
  { ic: "fa-regular fa-handshake", t: "Partnership Inquiries" },
];

const COUNTRIES = [
  { flag: "/images/flags/au.svg", name: "Australia" },
  { flag: "/images/flags/us.svg", name: "United States" },
  { flag: "/images/flags/ca.svg", name: "Canada" },
  { flag: "/images/flags/nz.svg", name: "New Zealand" },
  { flag: "/images/flags/gb.svg", name: "United Kingdom" },
];

const chip: React.CSSProperties = { display: "inline-flex", alignItems: "center", padding: "8px 16px", borderRadius: 999, border: "1px solid var(--tint-bd)", background: "var(--tint)", fontFamily: DISP, fontSize: 11.5, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--num)", fontWeight: 700 };
const cardBase: React.CSSProperties = { background: "var(--surface)", border: "1px solid var(--line2)", borderRadius: 20 };
const cardTitle: React.CSSProperties = { fontFamily: SUB, fontWeight: 700, fontSize: 17.5, margin: 0 };

export default function ContactPage() {
  return (
    <PageShell current="/contact" maxWidth={1200}>
      {/* ===== HERO ===== */}
      <div style={chip}>Contact us</div>
      <h1 style={{ fontFamily: DISP, fontWeight: 600, letterSpacing: "-.03em", fontSize: "clamp(30px,4.8vw,50px)", lineHeight: 1.08, margin: "18px 0 0", maxWidth: 760 }}>
        We&apos;d Love to <span style={{ color: "var(--num)" }}>Hear From You</span>.
      </h1>
      <p style={{ fontSize: 17, lineHeight: 1.7, color: "var(--mut)", maxWidth: 720, margin: "20px 0 0" }}>
        Have a query concerning hello22 AI, or do you have any questions about the features or pricing of our voice agents? Whether you&apos;re new or trying to figure out which plan is best for you, we can assist. Send us an email and we&apos;ll respond to your enquiry as soon as we can.
      </p>

      {/* ===== FORM + SIDE INFO ===== */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,420px),1fr))", gap: 20, marginTop: 48, alignItems: "start" }}>
        {/* form card */}
        <div style={{ ...cardBase, borderRadius: 24, padding: "clamp(24px,4vw,36px)" }}>
          <h2 style={{ fontFamily: DISP, fontWeight: 600, letterSpacing: "-.02em", fontSize: "clamp(21px,2.8vw,27px)", margin: 0 }}>
            Send Us a <span style={{ color: "var(--num)" }}>Message</span>.
          </h2>
          <p style={{ fontSize: 14.5, color: "var(--mut)", margin: "10px 0 24px" }}>Fill out the form below and we&apos;ll get back to you as soon as possible.</p>
          <ContactForm />
        </div>

        {/* side column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* email card */}
          <div style={{ ...cardBase, padding: "24px 26px", display: "flex", gap: 16, alignItems: "flex-start" }}>
            <span style={{ width: 46, height: 46, borderRadius: 13, flexShrink: 0, background: "var(--tint)", border: "1px solid var(--tint-bd)", color: "var(--num)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 17 }} aria-hidden="true"><i className="fa-regular fa-envelope" /></span>
            <span>
              <h2 style={cardTitle}>Email</h2>
              <a href="mailto:connect@hello22.ai" style={{ display: "inline-block", fontSize: 16, fontWeight: 700, color: "var(--num)", textDecoration: "none", marginTop: 6 }}>connect@hello22.ai</a>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--mut)", margin: "8px 0 0" }}>We look forward to serving you with prompt and honest assistance.</p>
            </span>
          </div>

          {/* need help with */}
          <div style={{ ...cardBase, padding: "24px 26px" }}>
            <h2 style={cardTitle}>Need Help With?</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 9, marginTop: 16 }}>
              {HELP_TOPICS.map((t) => (
                <span key={t.t} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13.5, fontWeight: 600, color: "var(--tx2)", background: "var(--toggle-bg)", border: "1px solid var(--toggle-bd)", borderRadius: 999, padding: "8px 14px" }}>
                  <i className={t.ic} style={{ fontSize: 11.5, color: "var(--num)" }} aria-hidden="true" />{t.t}
                </span>
              ))}
            </div>
          </div>

          {/* serving countries */}
          <div style={{ ...cardBase, padding: "24px 26px" }}>
            <h2 style={cardTitle}>Serving Businesses Across</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
              {COUNTRIES.map((c) => (
                <span key={c.name} style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.flag} alt="" width={34} height={23} loading="lazy" style={{ width: 34, height: 23, borderRadius: 4, border: "1px solid var(--line)", display: "block" }} />
                  <span style={{ fontSize: 14.5, fontWeight: 600, color: "var(--tx2)" }}>{c.name}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ===== WE'RE HERE TO HELP — band ===== */}
      <div style={{ background: "var(--tint)", border: "1px solid var(--tint-bd)", borderRadius: 24, padding: "clamp(28px,4vw,44px)", marginTop: 64, textAlign: "center" }}>
        <div style={chip}>We&apos;re here to help</div>
        <h2 style={{ fontFamily: DISP, fontWeight: 600, letterSpacing: "-.02em", fontSize: "clamp(22px,3vw,30px)", maxWidth: 640, margin: "14px auto 0" }}>
          Smarter, More Natural <span style={{ color: "var(--num)" }}>Customer Interactions</span>.
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: "var(--mut)", maxWidth: 620, margin: "16px auto 0" }}>
          Our goal is to assist you in making each customer interaction smarter and more organic. Whether you&apos;re new to hello22 AI or already using our solution, we&apos;re always pleased to help.
        </p>
      </div>
    </PageShell>
  );
}
