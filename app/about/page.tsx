import type { Metadata } from "next";
import PageShell, { DISP, SUB } from "@/components/site22/PageShell";

// Content user ka diya hua (2026-07-10, worldwide positioning) — layout homepage jaisi
// visual rhythm par restructure (2026-07-10: plain text-wall unprofessional lag rahi thi).
export const metadata: Metadata = {
  title: "About",
  description:
    "hello22.ai is an Australian AI voice technology company helping businesses across Australia, USA, UK, Canada, and New Zealand answer every call, capture more leads, and deliver better customer experiences.",
  alternates: { canonical: "/about" },
};

const MISSION_POINTS = [
  { ic: "fa-solid fa-phone-volume", t: "Answer customer calls 24/7" },
  { ic: "fa-solid fa-brain", t: "Understand each business and its services" },
  { ic: "fa-regular fa-comments", t: "Provide natural human-like conversations" },
  { ic: "fa-solid fa-user-plus", t: "Capture leads and customer information" },
  { ic: "fa-regular fa-calendar-check", t: "Book appointments and support business workflows" },
  { ic: "fa-regular fa-clock", t: "Help teams save time and improve customer experiences" },
];

const COUNTRIES = [
  { flag: "/images/flags/au.svg", name: "Australia" },
  { flag: "/images/flags/us.svg", name: "United States" },
  { flag: "/images/flags/gb.svg", name: "United Kingdom" },
  { flag: "/images/flags/ca.svg", name: "Canada" },
  { flag: "/images/flags/nz.svg", name: "New Zealand" },
];

const STORY_CARDS = [
  {
    ic: "fa-regular fa-eye", c: "var(--num)", bg: "var(--tint)", bd: "var(--tint-bd)",
    t: "It Started With an Observation",
    d: "Businesses were losing valuable opportunities because they could not answer every call. Owners were managing customers, operations, and growth every day — but when they were busy, after hours, or away from the phone, important calls were often missed.",
  },
  {
    ic: "fa-solid fa-ban", c: "#e2564d", bg: "rgba(226,86,77,.1)", bd: "rgba(226,86,77,.25)",
    t: "Old Solutions Fell Short",
    d: "Hiring a full-time receptionist was expensive. Basic answering services lack personal touch. And many AI voice solutions were too complicated, requiring technical setup and long implementation processes.",
  },
  {
    ic: "fa-regular fa-lightbulb", c: "#1a9a5c", bg: "rgba(34,197,94,.1)", bd: "rgba(34,197,94,.25)",
    t: "We Believed AI Should Be Easier",
    d: "A business owner should be able to introduce their business once, choose a voice that represents their brand, and have an AI receptionist ready to help customers.",
  },
];

const chip: React.CSSProperties = { display: "inline-flex", alignItems: "center", padding: "8px 16px", borderRadius: 999, border: "1px solid var(--tint-bd)", background: "var(--tint)", fontFamily: DISP, fontSize: 11.5, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--num)", fontWeight: 700 };
const secHead: React.CSSProperties = { fontFamily: DISP, fontWeight: 600, letterSpacing: "-.02em", fontSize: "clamp(24px,3.4vw,34px)", margin: "14px 0 0" };
const subHead: React.CSSProperties = { fontFamily: SUB, fontWeight: 700, fontSize: "clamp(17px,2vw,20px)", color: "var(--tx2)", margin: "12px 0 0" };
const para: React.CSSProperties = { fontSize: 16, lineHeight: 1.7, color: "var(--mut)", margin: "14px 0 0" };
const cardBase: React.CSSProperties = { background: "var(--surface)", border: "1px solid var(--line2)", borderRadius: 20 };

export default function AboutPage() {
  return (
    <PageShell current="/about" maxWidth={1200}>
      {/* ===== HERO — 2-col: text + photo ===== */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,420px),1fr))", gap: 40, alignItems: "center" }}>
        <div>
          <div style={chip}>About hello22.ai</div>
          <h1 style={{ fontFamily: DISP, fontWeight: 600, letterSpacing: "-.03em", fontSize: "clamp(30px,4.6vw,48px)", lineHeight: 1.1, margin: "18px 0 0" }}>
            Australian-Built AI Voice Receptionist for <span style={{ color: "var(--num)" }}>Businesses Worldwide</span>.
          </h1>
          <p style={{ ...para, fontSize: 17, margin: "20px 0 0" }}>
            hello22.ai is an Australian AI voice technology company helping businesses across Australia, USA, UK, Canada, and New Zealand answer every customer call, capture more leads, and deliver better customer experiences.
          </p>
          {/* belief callout */}
          <div style={{ display: "flex", gap: 14, alignItems: "flex-start", background: "var(--tint)", border: "1px solid var(--tint-bd)", borderRadius: 16, padding: "16px 20px", marginTop: 22 }}>
            <span style={{ width: 34, height: 34, borderRadius: "50%", flexShrink: 0, background: "#2c76ed", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 13 }} aria-hidden="true"><i className="fa-regular fa-heart" /></span>
            <span style={{ fontFamily: SUB, fontSize: 16.5, fontWeight: 700, color: "var(--tx)", lineHeight: 1.5 }}>We believe every business deserves a receptionist that never takes a break.</span>
          </div>
        </div>
        {/* photo + serving chip — column ki poori height fill karta hai (alignment fix 2026-07-10) */}
        <div style={{ position: "relative", alignSelf: "stretch", minHeight: 400, width: "100%" }} aria-hidden="true">
          <div style={{ position: "absolute", inset: 0, borderRadius: 26, overflow: "hidden", border: "1px solid var(--line2)", boxShadow: "0 26px 54px -32px var(--sh1)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/cta-wave.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%", display: "block" }} />
          </div>
          <div style={{ position: "absolute", left: 18, bottom: 18, background: "var(--surface)", border: "1px solid var(--line2)", borderRadius: 14, padding: "11px 16px", boxShadow: "0 12px 28px -16px var(--sh2)" }}>
            <span style={{ display: "block", fontSize: 12, fontWeight: 700, color: "var(--mut)", marginBottom: 6 }}>Answering for businesses in</span>
            <span style={{ display: "inline-flex", gap: 6 }}>
              {COUNTRIES.map((c) => (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img key={c.name} src={c.flag} alt={c.name} width={26} height={18} style={{ width: 26, height: 18, borderRadius: 3, border: "1px solid var(--line)", display: "block" }} />
              ))}
            </span>
          </div>
        </div>
      </div>

      {/* hero support cards — intro paras 3 & 4 */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,380px),1fr))", gap: 16, marginTop: 44 }}>
        {[
          { ic: "fa-solid fa-headset", t: "Every Conversation, Covered", d: "Whether it is a missed enquiry after hours, a customer looking for quick answers, or a booking request while your team is busy — hello22 ensures every conversation gets the attention it deserves." },
          { ic: "fa-solid fa-wand-magic-sparkles", t: "Learns Your Business in Minutes", d: "Simply add your website URL or business information, and hello22 understands your services, products, FAQs, and customer needs. It then handles real conversations, answers questions, books appointments, captures leads, and helps customers take the next step." },
        ].map((x) => (
          <div key={x.t} style={{ ...cardBase, padding: "24px 26px", display: "flex", gap: 16, alignItems: "flex-start" }}>
            <span style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, background: "var(--tint)", border: "1px solid var(--tint-bd)", color: "var(--num)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 16 }} aria-hidden="true"><i className={x.ic} /></span>
            <span>
              <span style={{ display: "block", fontFamily: SUB, fontWeight: 700, fontSize: 17 }}>{x.t}</span>
              <span style={{ display: "block", fontSize: 14.5, lineHeight: 1.65, color: "var(--mut)", marginTop: 6 }}>{x.d}</span>
            </span>
          </div>
        ))}
      </div>

      {/* ===== OUR STORY — 3 cards ===== */}
      <div style={{ marginTop: 84 }}>
        <div style={chip}>Our story</div>
        <h2 style={secHead}>Built to Solve a Simple Problem: <span style={{ color: "var(--num)" }}>Missed Calls Cost Businesses Money</span>.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))", gap: 16, marginTop: 30 }}>
          {STORY_CARDS.map((s) => (
            <div key={s.t} style={{ ...cardBase, padding: "26px 24px" }}>
              <span style={{ width: 44, height: 44, borderRadius: 12, background: s.bg, border: `1px solid ${s.bd}`, color: s.c, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 17 }} aria-hidden="true"><i className={s.ic} /></span>
              <h3 style={{ fontFamily: SUB, fontWeight: 700, fontSize: 18, margin: "16px 0 0" }}>{s.t}</h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.65, color: "var(--mut)", margin: "10px 0 0" }}>{s.d}</p>
            </div>
          ))}
        </div>
        <p style={{ fontFamily: SUB, fontSize: "clamp(18px,2.4vw,23px)", fontWeight: 700, color: "var(--tx)", margin: "30px 0 0", textAlign: "center" }}>
          That vision became <span style={{ color: "var(--num)" }}>hello22</span>.
        </p>
      </div>

      {/* ===== BUILT IN AUSTRALIA — panel 2-col with photo ===== */}
      <div style={{ ...cardBase, borderRadius: 26, padding: "clamp(26px,4vw,42px)", marginTop: 84 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,380px),1fr))", gap: 36, alignItems: "center" }}>
          <div>
            <div style={chip}>Made in Australia</div>
            <h2 style={{ ...secHead, fontSize: "clamp(22px,3vw,30px)" }}>Built in Australia. <span style={{ color: "var(--num)" }}>Designed for the World</span>.</h2>
            <p style={para}>As an Australian-founded company, hello22 was created with a focus on making advanced AI technology simple and practical for everyday businesses.</p>
            <p style={para}>From local service providers in Australia to growing companies across the United States, United Kingdom, Canada, and New Zealand, hello22 helps businesses stay connected with customers anytime, anywhere.</p>
            <p style={{ ...para, fontWeight: 700, color: "var(--tx2)" }}>Our goal is not to replace human connection — it is to help businesses respond faster, reduce repetitive work, and give their teams more time to focus on what matters.</p>
          </div>
          <div style={{ borderRadius: 18, overflow: "hidden", border: "1px solid var(--line2)" }} aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/office-reception.jpg" alt="" loading="lazy" style={{ width: "100%", height: "100%", minHeight: 260, objectFit: "cover", display: "block" }} />
          </div>
        </div>
      </div>

      {/* ===== VISION — tinted band ===== */}
      <div style={{ background: "var(--tint)", border: "1px solid var(--tint-bd)", borderRadius: 26, padding: "clamp(30px,4.5vw,52px)", marginTop: 84, textAlign: "center" }}>
        <div style={chip}>Our vision</div>
        <h2 style={{ ...secHead, maxWidth: 700, margin: "14px auto 0" }}>A Future Where Every Business Has an <span style={{ color: "var(--num)" }}>Intelligent Voice Assistant</span>.</h2>
        <p style={{ ...para, maxWidth: 640, margin: "18px auto 0" }}>We envision a world where every business, regardless of size, has access to powerful AI technology that helps them communicate better with customers.</p>
        <p style={{ ...para, maxWidth: 640, margin: "12px auto 0" }}>A future where no opportunity is lost because a call was missed, and every customer receives a fast, helpful, and natural response.</p>
      </div>

      {/* ===== MISSION — checklist grid ===== */}
      <div style={{ marginTop: 84 }}>
        <div style={chip}>Our mission</div>
        <h2 style={secHead}>Making AI-Powered Customer Communication <span style={{ color: "var(--num)" }}>Simple and Accessible</span>.</h2>
        <p style={subHead}>Our mission is to empower businesses with intelligent AI voice receptionists that:</p>
        {/* 2 columns — 3-col mein cards congested lag rahe the (user feedback 2026-07-10) */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,440px),1fr))", gap: 16, marginTop: 28 }}>
          {MISSION_POINTS.map((m) => (
            <div key={m.t} style={{ ...cardBase, borderRadius: 16, display: "flex", alignItems: "center", gap: 16, padding: "20px 24px" }}>
              <span style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, background: "var(--tint)", border: "1px solid var(--tint-bd)", color: "var(--num)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 16 }} aria-hidden="true"><i className={m.ic} /></span>
              <span style={{ fontSize: 15.5, fontWeight: 600, color: "var(--tx2)", lineHeight: 1.55 }}>{m.t}</span>
            </div>
          ))}
        </div>
        <p style={{ fontFamily: SUB, fontSize: 17, fontWeight: 700, color: "var(--tx2)", margin: "28px 0 0" }}>We make AI simple, so businesses can focus on growth.</p>
      </div>

      {/* ===== WHERE WE SERVE ===== */}
      <div style={{ marginTop: 84 }}>
        <div style={chip}>Where we serve</div>
        <h2 style={secHead}>Helping Businesses in <span style={{ color: "var(--num)" }}>Five Countries</span>.</h2>
        <p style={para}>hello22.ai provides AI receptionist solutions for businesses in:</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,170px),1fr))", gap: 12, marginTop: 24 }}>
          {/* full-width flag upar, naam neeche (user feedback 2026-07-10) */}
          {COUNTRIES.map((c) => (
            <div key={c.name} style={{ ...cardBase, borderRadius: 16, overflow: "hidden", display: "flex", flexDirection: "column" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.flag} alt="" loading="lazy" style={{ width: "100%", aspectRatio: "3 / 2", objectFit: "cover", display: "block", borderBottom: "1px solid var(--line)" }} />
              <span style={{ padding: "13px 12px", fontFamily: SUB, fontSize: 15, fontWeight: 700, color: "var(--tx2)", textAlign: "center" }}>{c.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ===== CTA ===== */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap", marginTop: 84, background: "var(--surface)", border: "1px solid var(--line2)", borderRadius: 20, padding: "24px 28px" }}>
        <div>
          <h2 style={{ fontFamily: DISP, fontWeight: 600, fontSize: "clamp(19px,2.4vw,24px)", letterSpacing: "-.01em", margin: 0 }}>Want to Hear It in Action?</h2>
          <p style={{ fontSize: 14.5, color: "var(--mut)", margin: "6px 0 0" }}>Try the live demo on our homepage, or start your 14-day free trial.</p>
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a href="https://app.hello22.ai/" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 9, textDecoration: "none", background: "#2c76ed", color: "#fff", fontWeight: 700, fontSize: 15, padding: "13px 24px", borderRadius: 999, boxShadow: "0 14px 30px -14px rgba(44,118,237,.7)" }}>Start free trial</a>
          <a href="/#demo" style={{ display: "inline-flex", alignItems: "center", gap: 9, textDecoration: "none", background: "transparent", color: "var(--num)", fontWeight: 700, fontSize: 15, padding: "12px 22px", borderRadius: 999, border: "1.5px solid var(--tint-bd)" }}>Hear a live call</a>
        </div>
      </div>
    </PageShell>
  );
}
