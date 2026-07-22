import type { Metadata } from "next";
import PageShell, { DISP, SUB } from "@/components/site22/PageShell";
import { getBlogPosts } from "@/lib/sanity";
import { CATEGORY_STYLE, formatDate } from "@/components/site22/blogData";

// Australia country landing page (2026-07-22, user request) — nav ke Country dropdown se
// linked. Target keywords user ke diye hue hain (SERVICES array = wahi 12 keywords, har ek
// apne h3 ke saath).
//
// Design (v2, 2026-07-22): pehla version har section ko ek jaise flat card-grid mein daal
// raha tha — user ne unprofessional bataya. Ab homepage wali rhythm follow karti hai:
//  - full-bleed alternating bands (.au-band, homepage ke sec-alt/sec-tint ::before trick se)
//  - har section ka apna layout (hero product-card, stepper, split why-section, image tiles)
//  - rotating accent palette (blue/teal/violet/amber/rose/green) — sab icon tiles ek rang ke
//    hone se page flat lag raha tha
// Naye markets (US/UK/NZ/CA) ke pages banao to isi file ko template banakar copy karo aur
// CountryPicker ke COUNTRIES entry mein `href` daal do.

const APP_URL = "https://app.hello22.ai/";

export const metadata: Metadata = {
  title: "AI Receptionist Australia — 24/7 AI Answering Service & Voice Agent",
  description:
    "hello22.ai is an Australian-built AI receptionist and 24/7 AI answering service. An AI voice agent answers every call, books appointments, qualifies leads and handles customer support for Australian businesses. From AUD 49/month.",
  alternates: { canonical: "/australia" },
  openGraph: {
    title: "AI Receptionist Australia — 24/7 AI Answering Service | hello22.ai",
    description:
      "An Australian-built AI voice agent that answers every call 24/7, books appointments and qualifies leads. Plans from AUD 49/month with a 14-day free trial.",
    url: "/australia",
  },
};

// ISR — Sanity se related posts 60s par refresh (blog pages ke saath consistent)
export const revalidate = 60;

/* ---------------------------------------------------------------- data ---- */

// Rotating accent palette — tint/border color-mix se banti hai, isliye light+dark dono
// mein theme var ke saath sahi rehti hai.
const ACCENTS = ["var(--num)", "var(--cyan)", "var(--violet)", "var(--amber)", "var(--rose)", "var(--green)"];

// User ke diye hue 12 target keywords — har card ka h3 exactly keyword hai.
const SERVICES: { ic: string; t: string; d: string }[] = [
  { ic: "fa-solid fa-headset", t: "AI Receptionist", d: "A front desk that never steps away. Greets every caller in a natural voice, answers questions about your services, and books the job before they try the next business on Google." },
  { ic: "fa-solid fa-phone-volume", t: "AI Answering Service", d: "Replace voicemail and overflow call centres. Picks up on the first ring, takes the full message, and sends you the summary, transcript and recording on WhatsApp or email." },
  { ic: "fa-solid fa-microphone-lines", t: "AI Voice Agent", d: "A conversational agent that listens, understands context and replies in real time — no phone trees, no “press 1 for sales”, no scripted dead ends." },
  { ic: "fa-regular fa-user", t: "Virtual Receptionist", d: "All the coverage of a virtual receptionist service without rosters, handovers or per-call surcharges. One flat monthly plan, unlimited patience, zero sick days." },
  { ic: "fa-regular fa-comments", t: "AI Customer Support", d: "Handles order status, opening hours, pricing, service areas and account enquiries automatically — and escalates only the calls that genuinely need a human." },
  { ic: "fa-solid fa-phone", t: "AI Call Answering", d: "Every call answered in under a second — during jobs, in meetings, at 2am and on public holidays. Missed calls stop being lost revenue." },
  { ic: "fa-solid fa-robot", t: "AI Voice Assistant", d: "Trained on your business: your services, your pricing, your policies, your suburbs. It sounds like part of the team because it knows what the team knows." },
  { ic: "fa-regular fa-calendar-check", t: "AI Appointment Setter", d: "Checks live availability, offers real time slots, writes the booking into your calendar and confirms it — all inside the same phone call." },
  { ic: "fa-solid fa-filter", t: "AI Lead Qualification Agent", d: "Asks the questions you would ask — job type, budget, timeline, location — then scores the lead and pushes the hot ones straight to your phone." },
  { ic: "fa-solid fa-circle-question", t: "AI Helpdesk Agent", d: "A first-line helpdesk that resolves repeat questions instantly, logs every ticket with full context, and routes the complex ones to the right person." },
  { ic: "fa-solid fa-phone-flip", t: "AI Inbound Call Agent", d: "Purpose-built for inbound volume — handles several calls at once, so nobody waits on hold while your team is already on the line." },
  { ic: "fa-regular fa-clock", t: "24/7 AI Answering Service", d: "Answers after hours, on weekends, over Christmas and through public holidays. Australian customers rarely call back — with 24/7 cover, they don’t have to." },
];

const INDUSTRIES: { n: string; ic: string; d: string; img: string }[] = [
  { n: "HVAC & Air Conditioning", ic: "fa-fan", d: "Emergency callouts triaged and booked through every heatwave.", img: "/images/ind-hvac.jpg" },
  { n: "Plumbing", ic: "fa-faucet-drip", d: "Burst pipes and hot water failures dispatched day or night.", img: "/images/ind-plumbing.jpg" },
  { n: "Electrical Services", ic: "fa-bolt", d: "Urgent faults prioritised, inspections scheduled automatically.", img: "/images/ind-electrical.jpg" },
  { n: "Cleaning Services", ic: "fa-broom", d: "Quotes given and recurring cleans booked without a callback.", img: "/images/ind-cleaning.jpg" },
  { n: "Painting & Decorating", ic: "fa-paint-roller", d: "Quote requests captured and site visits locked into the diary.", img: "/images/ind-painting.jpg" },
  { n: "Carpentry & Joinery", ic: "fa-hammer", d: "Project details collected while you’re still on the tools.", img: "/images/ind-carpenter.jpg" },
  { n: "Fencing Contractors", ic: "fa-road-barrier", d: "Property details taken and on-site measures scheduled.", img: "/images/ind-fencing.jpg" },
  { n: "Handyman Services", ic: "fa-screwdriver-wrench", d: "Small jobs booked, urgent repairs pushed to the front.", img: "/images/ind-handyman.jpg" },
  { n: "Flooring", ic: "fa-ruler-combined", d: "Product questions answered, free measure-and-quote booked.", img: "/images/ind-flooring.jpg" },
  { n: "Pool Servicing", ic: "fa-water-ladder", d: "Pre-season services and maintenance visits filled in advance.", img: "/images/ind-pool.jpg" },
  { n: "Dental & Medical", ic: "fa-tooth", d: "Appointments, reschedules and cancellations handled politely.", img: "/images/industry-dental.jpg" },
  { n: "Real Estate", ic: "fa-house", d: "Enquiries answered during inspections, details texted to you.", img: "/images/industry-realestate.jpg" },
];

const STEPS: { ic: string; t: string; d: string }[] = [
  { ic: "fa-regular fa-comments", t: "Tell it about your business", d: "Describe your services, pricing, service areas and the questions customers always ask. No scripts to write, no flowcharts to build." },
  { ic: "fa-solid fa-microphone", t: "Pick a voice and a number", d: "Choose from premium AI voices, then forward your existing business number or use a new one. Setup takes minutes, not weeks." },
  { ic: "fa-solid fa-phone-volume", t: "It starts answering", d: "Every call is answered, summarised and sent to you on WhatsApp or email — with the transcript and recording attached." },
];

const WHY: { ic: string; t: string; d: string }[] = [
  { ic: "fa-solid fa-location-dot", t: "Built in Australia", d: "An Australian AI voice technology company, designed around how Australian customers actually phone a business." },
  { ic: "fa-solid fa-dollar-sign", t: "Priced in AUD", d: "From AUD 49 per month. One flat rate — no per-call fees, no setup fees, no lock-in contract." },
  { ic: "fa-regular fa-clock", t: "Covers every hour", d: "Answers before opening, after close, on weekends and public holidays — when most missed calls actually happen." },
  { ic: "fa-brands fa-whatsapp", t: "Summaries on WhatsApp", d: "Every call arrives as a clean summary with transcript and recording, so you know who to call back first." },
  { ic: "fa-regular fa-calendar-check", t: "Books into your calendar", d: "Connects to Google Calendar and your CRM — a booked call is already a booked job by the time you read it." },
  { ic: "fa-solid fa-shield-halved", t: "Try before you commit", d: "A 14-day free trial with 30 minutes of calls, so you can hear it handle real customers before you pay." },
];

const PLANS: { name: string; price: string; ic: string; violet?: boolean; popular?: boolean; feats: { t: string; on: boolean }[] }[] = [
  {
    name: "Starter", price: "49", ic: "fa-solid fa-paper-plane",
    feats: [
      { t: "200 call minutes each month", on: true },
      { t: "WhatsApp — summary, transcript & recording", on: true },
      { t: "Email — summary, transcript & recording", on: true },
      { t: "English voice agent", on: true },
      { t: "Free Nexleon CRM setup", on: true },
      { t: "Premium AI voices", on: false },
      { t: "Call summary via SMS", on: false },
    ],
  },
  {
    name: "Standard", price: "69", ic: "fa-solid fa-users", popular: true,
    feats: [
      { t: "200 call minutes each month", on: true },
      { t: "WhatsApp — summary, transcript & recording", on: true },
      { t: "Email — summary, transcript & recording", on: true },
      { t: "English voice agent", on: true },
      { t: "Free Nexleon CRM setup", on: true },
      { t: "Premium AI voices", on: true },
      { t: "Call summary via SMS", on: false },
    ],
  },
  {
    name: "Premium", price: "89", ic: "fa-solid fa-crown", violet: true,
    feats: [
      { t: "200 call minutes each month", on: true },
      { t: "WhatsApp — summary, transcript & recording", on: true },
      { t: "Email — summary, transcript & recording", on: true },
      { t: "Multilingual voice agent", on: true },
      { t: "Free Nexleon CRM setup & custom CRM integration", on: true },
      { t: "Premium AI voices", on: true },
      { t: "Call summary via SMS", on: true },
    ],
  },
];

const FAQS: { q: string; a: string }[] = [
  { q: "What is an AI receptionist?", a: "An AI receptionist is a voice agent that answers your business phone, holds a natural conversation with the caller, and completes the task — booking an appointment, qualifying a lead, answering a question or taking a message. Unlike a recorded menu, it understands what the caller says and responds in real time." },
  { q: "Does it work with my existing Australian phone number?", a: "Yes. You can forward calls from your current business number, or use a new one. Nothing about how customers reach you has to change." },
  { q: "How much does an AI answering service cost in Australia?", a: "hello22 plans start at AUD 49 per month for 200 call minutes, with Standard at AUD 69 and Premium at AUD 89. There are no setup fees and no lock-in contract, and every plan includes a 14-day free trial." },
  { q: "Will callers know they’re speaking to an AI?", a: "The voice is natural enough that many callers don’t notice, but we recommend being upfront. You control exactly how the agent introduces itself and your business." },
  { q: "Can it book appointments into my calendar?", a: "Yes. The AI appointment setter checks live availability, offers real time slots, writes the booking into your calendar and confirms it with the caller before the call ends." },
  { q: "What happens after hours and on public holidays?", a: "Nothing changes — it answers 24/7, including nights, weekends and public holidays. That’s when a large share of missed calls happen for Australian trades and clinics." },
  { q: "Can it handle more than one call at a time?", a: "Yes. The AI inbound call agent takes several calls simultaneously, so callers aren’t put on hold while your team is already on the phone." },
  { q: "How long does setup take?", a: "Most businesses are live the same day. You describe your services, pick a voice, connect your number, and start taking calls." },
];

// Hero ke neeche wali trust row — homepage TRUST ka same set, hamesha /color/ variants
// kyunki logos white pill card (var(--surface)) par baithte hain, dono themes mein.
const TRUST = [
  { name: "Twilio", src: "/images/logos/color/twilio.svg" },
  { name: "Stripe", src: "/images/logos/color/stripe.svg" },
  { name: "AWS", src: "/images/logos/color/aws.svg" },
  { name: "Google Calendar", src: "/images/logos/color/google-calendar.svg" },
  { name: "WhatsApp", src: "/images/logos/color/whatsapp.svg" },
  { name: "ElevenLabs", src: "/images/logos/color/elevenlabs.svg" },
  { name: "OpenAI", src: "/images/logos/color/openai.svg" },
];

/* --------------------------------------------------------------- styles ---- */

const eyebrow: React.CSSProperties = { display: "inline-flex", alignItems: "center", gap: 9, padding: "7px 15px", borderRadius: 999, border: "1px solid var(--tint-bd)", background: "var(--tint)", fontFamily: DISP, fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--num)", fontWeight: 700 };
const h2Style: React.CSSProperties = { fontFamily: DISP, fontWeight: 600, letterSpacing: "-.025em", fontSize: "clamp(26px,3.6vw,38px)", lineHeight: 1.14, margin: "18px 0 0" };
const leadStyle: React.CSSProperties = { fontSize: 16.5, lineHeight: 1.7, color: "var(--mut)", margin: "16px 0 0" };
const cardTitle: React.CSSProperties = { fontFamily: SUB, fontWeight: 700, fontSize: 17.5, margin: 0, color: "var(--tx)", letterSpacing: "-.01em" };
const btnPrimary: React.CSSProperties = { display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none", background: "#2c76ed", color: "#fff", fontWeight: 700, fontSize: 15, padding: "14px 26px", borderRadius: 999, boxShadow: "0 16px 34px -14px rgba(44,118,237,.7)" };
const btnGhost: React.CSSProperties = { display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none", background: "transparent", color: "var(--num)", fontWeight: 700, fontSize: 15, padding: "13px 24px", borderRadius: 999, border: "1.5px solid var(--tint-bd)" };

// Accent-tinted icon tile — color-mix se tint/border banti hai (theme var ke saath sahi rehta hai)
const tile = (accent: string, size = 46): React.CSSProperties => ({
  width: size, height: size, borderRadius: size / 3.4, flexShrink: 0,
  background: `color-mix(in srgb, ${accent} 12%, transparent)`,
  border: `1px solid color-mix(in srgb, ${accent} 30%, transparent)`,
  color: accent, display: "inline-flex", alignItems: "center", justifyContent: "center",
  fontSize: size * 0.4,
});

// Page CSS — bands, grids, hover states. Grids hamesha minmax(0,1fr) (codebase rule).
const CSS = `
.au-wrap{--au-gutter:0px}
/* full-bleed band — homepage ke sec-alt/sec-tint ::before ka same pattern */
.au-band{position:relative}
.au-band::before{content:"";position:absolute;top:0;bottom:0;left:50%;transform:translateX(-50%);
 width:100vw;background:var(--sec-alt);border-top:1px solid var(--line);border-bottom:1px solid var(--line);
 z-index:-1;pointer-events:none}
.au-band.tint::before{background:var(--sec-tint)}
.au-band{padding:88px 0 96px;margin-top:96px}
.au-plain{padding:0;margin-top:96px}

.au-card{background:var(--surface);border:1px solid var(--line2);border-radius:20px;
 transition:transform .25s ease,box-shadow .3s ease,border-color .25s ease}
@media(hover:hover){
 .au-card:hover{transform:translateY(-5px);box-shadow:0 26px 52px -30px var(--sh1);border-color:var(--tint-bd)}
 .au-ind:hover img{transform:scale(1.07)}
 .au-post:hover .au-post-title{color:var(--num)}
}

.au-grid-3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}
.au-grid-4{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px}
.au-hero{text-align:center;padding-top:18px}
.au-why{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);gap:48px;align-items:start}
.au-why-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}

/* services — top par accent hairline jo hover par bhar jaati hai */
.au-svc{position:relative;overflow:hidden}
.au-svc::after{content:"";position:absolute;top:0;left:0;height:3px;width:100%;background:var(--au-accent);
 transform:scaleX(0);transform-origin:left;transition:transform .35s ease}
@media(hover:hover){.au-svc:hover::after{transform:scaleX(1)}}

.au-ind img{transition:transform .55s ease}
.au-stat+.au-stat{border-left:1px solid var(--line)}

/* stepper connector */
.au-steps{position:relative;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px}
.au-steps::before{content:"";position:absolute;top:31px;left:12%;right:12%;height:2px;
 background:linear-gradient(90deg,transparent,var(--tint-bd) 12%,var(--tint-bd) 88%,transparent);z-index:0}

.au-faq summary{list-style:none}
.au-faq summary::-webkit-details-marker{display:none}
.au-faq details[open] .au-faq-chev{transform:rotate(180deg)}
.au-faq details[open]{border-color:var(--tint-bd)}
.au-faq-chev{transition:transform .25s ease}

@media(max-width:1080px){
 .au-grid-4{grid-template-columns:repeat(3,minmax(0,1fr))!important}
 .au-band{padding:72px 0 78px;margin-top:78px}
 .au-plain{margin-top:78px}
}
@media(max-width:920px){
 .au-why{grid-template-columns:minmax(0,1fr)!important;gap:28px!important}
 .au-grid-3{grid-template-columns:repeat(2,minmax(0,1fr))!important}
 .au-grid-4{grid-template-columns:repeat(2,minmax(0,1fr))!important}
 .au-steps{grid-template-columns:minmax(0,1fr)!important}
 .au-steps::before{display:none}
}
@media(max-width:680px){
 .au-grid-3,.au-grid-4,.au-why-list{grid-template-columns:minmax(0,1fr)!important}
 .au-stats{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:22px!important}
 .au-stat+.au-stat{border-left:none}
 .au-band{padding:60px 0 64px;margin-top:64px}
 .au-plain{margin-top:64px}
}
`;

/* ------------------------------------------------------------- sections ---- */

function SectionHead({ eb, children, lead, center = false, max = 760 }: { eb: string; children: React.ReactNode; lead?: string; center?: boolean; max?: number }) {
  return (
    <div style={center ? { textAlign: "center", maxWidth: max, margin: "0 auto" } : { maxWidth: max }}>
      <div style={eyebrow}>{eb}</div>
      <h2 style={h2Style}>{children}</h2>
      {lead && <p style={leadStyle}>{lead}</p>}
    </div>
  );
}

/* ----------------------------------------------------------------- page ---- */

export default async function AustraliaPage() {
  // Landing page par sirf wo posts jinka excerpt hai — CMS ke draft/test posts card ko
  // khaali dikhate hain. Kaafi na hon to fallback.
  const all = await getBlogPosts();
  const withExcerpt = all.filter((p) => p.excerpt?.trim());
  const posts = (withExcerpt.length >= 3 ? withExcerpt : all).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: "AI Receptionist Australia",
        serviceType: "AI receptionist and 24/7 AI answering service",
        provider: { "@type": "Organization", name: "hello22.ai", url: "https://www.hello22.ai/" },
        areaServed: { "@type": "Country", name: "Australia" },
        url: "https://www.hello22.ai/australia",
        offers: PLANS.map((p) => ({ "@type": "Offer", name: `${p.name} plan`, price: p.price, priceCurrency: "AUD", url: APP_URL })),
      },
      { "@type": "FAQPage", mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.hello22.ai/" },
          { "@type": "ListItem", position: 2, name: "Australia", item: "https://www.hello22.ai/australia" },
        ],
      },
    ],
  };

  return (
    <PageShell current="/australia" maxWidth={1536}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="au-wrap">
        {/* ============================================================ HERO === */}
        {/* Centered single-column (2026-07-22, user feedback): pehle right column mein
            mock "live call" card thi — user ne reject ki. Uski jagah typography-led hero
            + neeche asli integration logos ki row (fake product shot se zyada credible). */}
        <section className="au-hero">
          <div style={eyebrow}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/flags/au.svg" alt="" aria-hidden="true" style={{ width: 19, height: 13, borderRadius: 2, display: "block" }} />
            Australia
          </div>
          <h1 style={{ fontFamily: DISP, fontWeight: 600, letterSpacing: "-.035em", fontSize: "clamp(34px,5.6vw,62px)", lineHeight: 1.04, margin: "22px auto 0", maxWidth: 940 }}>
            The AI Receptionist for <span style={{ color: "var(--num)" }}>Australian Business</span>.
          </h1>
          <p style={{ ...leadStyle, fontSize: 18, margin: "24px auto 0", maxWidth: 720 }}>
            An Australian-built AI voice agent that works as your receptionist, answering service and appointment setter — 24 hours a day. It picks up every call, answers questions about your business and books the job before you&apos;ve put the tools down.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 32, justifyContent: "center" }}>
            <a href={APP_URL} target="_blank" rel="noopener noreferrer" style={btnPrimary}>
              Start 14-day free trial <i className="fa-solid fa-arrow-right" aria-hidden="true" style={{ fontSize: 13 }} />
            </a>
            <a href="#pricing" style={btnGhost}>See AUD pricing</a>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 24px", marginTop: 26, fontSize: 14, color: "var(--mut)", fontWeight: 600, justifyContent: "center" }}>
            {["No setup fees", "No lock-in contract", "Live the same day"].map((t) => (
              <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <i className="fa-solid fa-circle-check" style={{ color: "var(--green)", fontSize: 13 }} aria-hidden="true" />{t}
              </span>
            ))}
          </div>
        </section>

        {/* ======================================================= TRUST ROW === */}
        <div style={{ marginTop: 60 }}>
          <p style={{ textAlign: "center", fontSize: 12, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--dim)", margin: "0 0 24px" }}>
            Built on the voice and infrastructure your customers already trust
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
            {TRUST.map((t) => (
              // Pill hamesha white — /color/ logos (AWS, OpenAI) dark surface par padhne
              // laayak nahi rehte, aur server component theme branch nahi kar sakta.
              <span key={t.name} style={{ display: "inline-flex", alignItems: "center", gap: 11, whiteSpace: "nowrap", background: "#fff", border: "1px solid rgba(13,18,32,.1)", borderRadius: 14, padding: "11px 20px", boxShadow: "0 10px 24px -20px rgba(10,18,40,.6)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={t.src} alt={t.name} loading="lazy" style={{ height: 21, width: "auto", display: "block" }} />
                <span style={{ fontFamily: SUB, fontSize: 15, fontWeight: 600, color: "#3e4658", letterSpacing: "-.01em" }}>{t.name}</span>
              </span>
            ))}
          </div>
        </div>

        {/* ====================================================== STAT STRIP === */}
        <div className="au-stats" style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 0, marginTop: 64, paddingTop: 34, borderTop: "1px solid var(--line)" }}>
          {[
            { v: "24/7", l: "Answered, every day of the year" },
            { v: "AUD 49", l: "Per month to get started" },
            { v: "14 days", l: "Free trial, no lock-in" },
            { v: "Minutes", l: "From signup to first answered call" },
          ].map((s) => (
            <div key={s.l} className="au-stat" style={{ padding: "0 26px" }}>
              <div style={{ fontFamily: SUB, fontWeight: 700, fontSize: "clamp(26px,3.2vw,34px)", color: "var(--tx)", letterSpacing: "-.03em", lineHeight: 1 }}>{s.v}</div>
              <div style={{ fontSize: 13.5, color: "var(--mut)", marginTop: 10, lineHeight: 1.5 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* ======================================================== SERVICES === */}
        <section id="services" className="au-band" style={{ scrollMarginTop: 90 }}>
          <SectionHead
            eb="Services"
            center
            max={800}
            lead="One agent, configured once, covering every job an Australian business normally splits across a receptionist, an after-hours answering service and a helpdesk."
          >
            Everything an <span style={{ color: "var(--num)" }}>AI Voice Agent</span> Does for You.
          </SectionHead>
          <div className="au-grid-3" style={{ marginTop: 46 }}>
            {SERVICES.map((s, i) => {
              const accent = ACCENTS[i % ACCENTS.length];
              return (
                <div key={s.t} className="au-card au-svc" style={{ padding: "28px 26px 26px", display: "flex", flexDirection: "column", gap: 16, ["--au-accent" as string]: accent }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                    <span style={tile(accent)} aria-hidden="true"><i className={s.ic} /></span>
                    <span aria-hidden="true" style={{ fontFamily: SUB, fontWeight: 700, fontSize: 13, color: "var(--dim)", letterSpacing: ".08em" }}>{(i + 1).toString().padStart(2, "0")}</span>
                  </div>
                  <h3 style={cardTitle}>{s.t}</h3>
                  <p style={{ fontSize: 14.5, lineHeight: 1.65, color: "var(--mut)", margin: 0 }}>{s.d}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ====================================================== INDUSTRIES === */}
        <section id="industries" className="au-plain" style={{ scrollMarginTop: 90 }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 28, flexWrap: "wrap" }}>
            <SectionHead eb="Industries" max={720} lead="The same AI receptionist works across every trade and clinic — you just tell it about your services, your suburbs and your policies.">
              Built for the Businesses That <span style={{ color: "var(--num)" }}>Run on Phone Calls</span>.
            </SectionHead>
            <a href="/contact" style={{ ...btnGhost, flexShrink: 0 }}>Don&apos;t see yours? Ask us</a>
          </div>
          <div className="au-grid-4" style={{ marginTop: 42 }}>
            {INDUSTRIES.map((ind) => (
              <div key={ind.n} className="au-card au-ind" style={{ overflow: "hidden", padding: 0 }}>
                <div style={{ position: "relative", height: 160, overflow: "hidden" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={ind.img} alt="" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  <span aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(6,10,22,0) 34%,rgba(6,10,22,.82) 100%)" }} />
                  <span style={{ position: "absolute", left: 14, top: 14, width: 34, height: 34, borderRadius: 11, background: "rgba(255,255,255,.94)", color: "#2c76ed", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 14 }} aria-hidden="true">
                    <i className={`fa-solid ${ind.ic}`} />
                  </span>
                  <h3 style={{ position: "absolute", left: 16, right: 16, bottom: 13, fontFamily: SUB, fontWeight: 700, fontSize: 16, color: "#fff", margin: 0, lineHeight: 1.3, textShadow: "0 2px 10px rgba(0,0,0,.5)" }}>{ind.n}</h3>
                </div>
                <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "var(--mut)", margin: 0, padding: "15px 17px 19px" }}>{ind.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===================================================== HOW IT WORKS === */}
        <section className="au-band tint">
          <SectionHead eb="How it works" center max={720} lead="No integrations project, no onboarding calls, no scripts to write.">
            Live in <span style={{ color: "var(--num)" }}>Three Steps</span>.
          </SectionHead>
          <div className="au-steps" style={{ marginTop: 52 }}>
            {STEPS.map((s, i) => (
              <div key={s.t} style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "0 14px" }}>
                <span style={{ width: 62, height: 62, borderRadius: "50%", margin: "0 auto", background: "var(--surface)", border: "1.5px solid var(--tint-bd)", color: "var(--num)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 21, boxShadow: "0 14px 30px -18px var(--sh1)" }} aria-hidden="true">
                  <i className={s.ic} />
                </span>
                <div style={{ fontFamily: SUB, fontWeight: 700, fontSize: 12, letterSpacing: ".18em", color: "var(--num)", marginTop: 20 }}>STEP {(i + 1).toString().padStart(2, "0")}</div>
                <h3 style={{ ...cardTitle, fontSize: 19, marginTop: 8 }}>{s.t}</h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.65, color: "var(--mut)", margin: "10px auto 0", maxWidth: 330 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================ WHY === */}
        <section className="au-plain">
          <div className="au-why">
            <div>
              <SectionHead eb="Why hello22" max={480}>
                Made in Australia, for <span style={{ color: "var(--num)" }}>Australian Callers</span>.
              </SectionHead>
              <p style={{ ...leadStyle, maxWidth: 440 }}>
                Every decision — pricing, hours, notifications, voices — is built around how customers here actually phone a business.
              </p>
              <a href={APP_URL} target="_blank" rel="noopener noreferrer" style={{ ...btnPrimary, marginTop: 26 }}>
                Start free trial <i className="fa-solid fa-arrow-right" aria-hidden="true" style={{ fontSize: 13 }} />
              </a>
            </div>
            <div className="au-why-list">
              {WHY.map((w, i) => {
                const accent = ACCENTS[i % ACCENTS.length];
                return (
                  <div key={w.t} className="au-card" style={{ padding: "22px 20px" }}>
                    <span style={tile(accent, 40)} aria-hidden="true"><i className={w.ic} /></span>
                    <h3 style={{ ...cardTitle, fontSize: 16, marginTop: 14 }}>{w.t}</h3>
                    <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--mut)", margin: "7px 0 0" }}>{w.d}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================= PRICING === */}
        <section id="pricing" className="au-band" style={{ scrollMarginTop: 90 }}>
          <SectionHead eb="Pricing" center max={760} lead="All plans are billed in AUD and include a 14-day free trial. No setup fees, no per-call charges, cancel any time.">
            Australian Pricing, <span style={{ color: "var(--num)" }}>No Surprises</span>.
          </SectionHead>
          <div className="au-grid-3" style={{ marginTop: 54, alignItems: "stretch" }}>
            {PLANS.map((p) => {
              const accent = p.violet ? "var(--violet)" : "var(--num)";
              return (
                <div key={p.name} style={{ position: "relative", display: "flex", flexDirection: "column", background: "var(--surface)", border: p.popular ? "1.5px solid color-mix(in srgb, var(--num) 55%, transparent)" : "1.5px solid var(--line2)", borderRadius: 22, boxShadow: p.popular ? "0 34px 74px -34px rgba(44,118,237,.5)" : "0 10px 30px -24px var(--sh2)" }}>
                  {p.popular && (
                    <div style={{ position: "absolute", top: -15, left: "50%", transform: "translateX(-50%)", background: "#2c76ed", color: "#fff", fontSize: 11.5, fontWeight: 800, padding: "7px 18px", borderRadius: 999, textTransform: "uppercase", letterSpacing: ".07em", whiteSpace: "nowrap", boxShadow: "0 10px 22px -10px rgba(44,118,237,.65)" }}>Most popular</div>
                  )}
                  <div style={{ padding: "38px 26px 0", display: "flex", flexDirection: "column", flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
                      <span style={tile(accent)} aria-hidden="true"><i className={p.ic} /></span>
                      <span style={{ fontFamily: SUB, fontWeight: 700, fontSize: 19 }}>{p.name}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 7, margin: "20px 0 20px" }}>
                      <span style={{ fontFamily: SUB, fontWeight: 700, fontSize: 17, color: "var(--tx3)" }}>AUD</span>
                      <span style={{ fontFamily: SUB, fontWeight: 700, fontSize: 44, color: "var(--tx)", letterSpacing: "-.03em", lineHeight: 1 }}>{p.price}</span>
                      <span style={{ fontSize: 15, fontWeight: 600, color: "var(--mut)" }}>/ month</span>
                    </div>
                    <a href={APP_URL} target="_blank" rel="noopener noreferrer" style={p.popular
                      ? { position: "relative", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", background: "#2c76ed", color: "#fff", fontWeight: 700, fontSize: 15, padding: "13px 42px 13px 16px", borderRadius: 14, boxShadow: "0 14px 30px -14px rgba(44,118,237,.7)" }
                      : { position: "relative", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", background: "transparent", color: "var(--num)", fontWeight: 700, fontSize: 15, padding: "13px 42px 13px 16px", borderRadius: 14, border: "1.5px solid var(--tint-bd)" }}>
                      Start 14-day free trial<i className="fa-solid fa-arrow-right" aria-hidden="true" style={{ position: "absolute", right: 18, fontSize: 13 }} />
                    </a>
                    <div style={{ height: 1, background: "var(--line)", margin: "20px 0 18px" }} />
                    <div style={{ display: "flex", flexDirection: "column", gap: 11, flex: 1, paddingBottom: 24 }}>
                      {p.feats.map((f) => (
                        <div key={f.t} style={{ display: "flex", gap: 10, fontSize: 13.5, fontWeight: 600, alignItems: "flex-start", color: f.on ? "var(--tx)" : "var(--dim)" }}>
                          <span style={{ width: 20, height: 20, flexShrink: 0, marginTop: 1, borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 9, background: f.on ? "#2c76ed" : "var(--w05)", border: f.on ? "none" : "1px solid var(--line2)", color: f.on ? "#fff" : "var(--dim)" }} aria-hidden="true">
                            <i className={`fa-solid ${f.on ? "fa-check" : "fa-xmark"}`} />
                          </span>
                          <span style={{ lineHeight: 1.45 }}>{f.t}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ background: "var(--tint)", borderTop: "1px solid var(--tint-bd)", borderRadius: "0 0 20px 20px", padding: "13px 16px", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: 13, fontWeight: 700, color: "var(--num)" }}>
                    <i className="fa-solid fa-shield-halved" style={{ fontSize: 12 }} aria-hidden="true" />14-day free trial · Cancel anytime
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ background: "var(--surface)", border: "1px solid var(--line2)", borderRadius: 20, marginTop: 18, padding: "24px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 22, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, minWidth: 0, flex: "1 1 380px" }}>
              <span style={tile("var(--num)", 50)} aria-hidden="true"><i className="fa-solid fa-calculator" /></span>
              <div>
                <h3 style={cardTitle}>Not sure it&apos;s worth it?</h3>
                <p style={{ fontSize: 14.5, color: "var(--mut)", lineHeight: 1.55, margin: "6px 0 0" }}>Work out what missed calls are costing your Australian business — takes about 10 seconds.</p>
              </div>
            </div>
            <a href="/calculator" style={btnPrimary}>Calculate my lost revenue <i className="fa-solid fa-arrow-right" aria-hidden="true" style={{ fontSize: 13 }} /></a>
          </div>
        </section>

        {/* =================================================== RELATED POSTS === */}
        {posts.length > 0 && (
          <section className="au-plain">
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
              <SectionHead eb="From the blog" max={620}>
                Related <span style={{ color: "var(--num)" }}>Reading</span>.
              </SectionHead>
              <a href="/blog" style={{ ...btnGhost, flexShrink: 0 }}>View all posts <i className="fa-solid fa-arrow-right" aria-hidden="true" style={{ fontSize: 12 }} /></a>
            </div>
            <div className="au-grid-3" style={{ marginTop: 42 }}>
              {posts.map((p) => {
                const cat = CATEGORY_STYLE[p.category];
                return (
                  <a key={p.slug} href={`/blog/${p.slug}`} className="au-card au-post" style={{ overflow: "hidden", display: "flex", flexDirection: "column", textDecoration: "none", color: "inherit" }}>
                    <div style={{ height: 176, background: "var(--w05)", overflow: "hidden" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.thumb || p.cover} alt={p.coverAlt || p.title} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    </div>
                    <div style={{ padding: "20px 22px 24px", display: "flex", flexDirection: "column", flex: 1 }}>
                      <span style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", padding: "5px 12px", borderRadius: 999, fontSize: 11, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: cat.c, background: cat.bg, border: `1px solid ${cat.bd}` }}>{p.category}</span>
                      <h3 className="au-post-title" style={{ ...cardTitle, fontSize: 17, margin: "14px 0 0", lineHeight: 1.35, transition: "color .2s ease" }}>{p.title}</h3>
                      {p.excerpt && <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--mut)", margin: "10px 0 0" }}>{p.excerpt.length > 118 ? `${p.excerpt.slice(0, 115)}…` : p.excerpt}</p>}
                      <span style={{ marginTop: "auto", paddingTop: 18, fontSize: 13, color: "var(--dim)", fontWeight: 600 }}>{formatDate(p.date)} · {p.readMins} min read</span>
                    </div>
                  </a>
                );
              })}
            </div>
          </section>
        )}

        {/* ============================================================ FAQ === */}
        <section className="au-band tint au-faq">
          <SectionHead eb="FAQ" center max={720}>
            AI Receptionist in Australia — <span style={{ color: "var(--num)" }}>Common Questions</span>.
          </SectionHead>
          <div style={{ marginTop: 46, maxWidth: 880, margin: "46px auto 0", display: "flex", flexDirection: "column", gap: 12 }}>
            {FAQS.map((f) => (
              <details key={f.q} style={{ background: "var(--surface)", border: "1px solid var(--line2)", borderRadius: 16, padding: "2px 24px", transition: "border-color .2s ease" }}>
                <summary style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 18, cursor: "pointer", padding: "19px 0", fontFamily: SUB, fontWeight: 700, fontSize: 16.5, color: "var(--tx)", lineHeight: 1.4 }}>
                  {f.q}
                  <i className="fa-solid fa-chevron-down au-faq-chev" aria-hidden="true" style={{ fontSize: 12, color: "var(--num)", flexShrink: 0 }} />
                </summary>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--mut)", margin: "0 0 22px", paddingRight: 34 }}>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ============================================================ CTA === */}
        <section className="au-plain">
          <div style={{ position: "relative", overflow: "hidden", borderRadius: 28, background: "radial-gradient(ellipse at 78% 14%, rgba(44,118,237,.5), transparent 58%), linear-gradient(118deg,#0a1330 20%,#12358f 100%)", padding: "clamp(40px,6vw,68px) clamp(24px,5vw,56px)", textAlign: "center" }}>
            <div style={{ ...eyebrow, background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.22)", color: "#fff" }}>Get started</div>
            <h2 style={{ ...h2Style, color: "#fff", maxWidth: 720, margin: "20px auto 0" }}>
              Stop Losing Calls to <span style={{ color: "#8fbaff" }}>Voicemail</span>.
            </h2>
            <p style={{ fontSize: 16.5, lineHeight: 1.7, color: "rgba(255,255,255,.78)", maxWidth: 620, margin: "16px auto 0" }}>
              Set up your AI receptionist in minutes and let it answer the next call that comes in — nights, weekends and public holidays included.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginTop: 30 }}>
              <a href={APP_URL} target="_blank" rel="noopener noreferrer" style={{ ...btnPrimary, background: "#fff", color: "#0f2350", boxShadow: "0 18px 36px -16px rgba(0,0,0,.55)" }}>
                Start 14-day free trial <i className="fa-solid fa-arrow-right" aria-hidden="true" style={{ fontSize: 13 }} />
              </a>
              <a href="/contact" style={{ ...btnGhost, color: "#fff", border: "1.5px solid rgba(255,255,255,.35)" }}>Talk to us</a>
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
