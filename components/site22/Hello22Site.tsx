"use client";

import { Manrope, Space_Grotesk } from "next/font/google";
import { useEffect, useRef, useState } from "react";

const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-manrope", display: "swap" });
const space = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-space", display: "swap" });

const DISP = "var(--font-space), 'Space Grotesk', sans-serif";
const LOGO = "/hello22-logo.png";
const APP_URL = "https://agent.hello22.ai";

const GREETS = ["hola", "你好", "bonjour", "こんにちは", "नमस्ते", "olá", "안녕", "hallo", "مرحبا", "hej"];

const TRUST = ["Twilio", "Stripe", "AWS (S3)", "Google Calendar", "ElevenLabs", "OpenAI", "WhatsApp"];

type V = { id: string; letter: string; flag: string; loc: string; desc: string; sample: string; audio: string; vid?: string };
const VOICES: V[] = [
  { id: "Sarah", letter: "S", flag: "🇺🇸", loc: "en-US", desc: "Signature · Mature, Reassuring, Confident", vid: "EXAVITQu4vr4xnSDxMaL", audio: "/audio/voices/sarah.mp3", sample: "Hello, thank you for calling. You're in good hands — let's sort this out together." },
  { id: "Aria", letter: "A", flag: "🇺🇸", loc: "en-US", desc: "Expressive", vid: "9BWtsMINqrJLrRacOk9x", audio: "/audio/voices/aria.mp3", sample: "Hi there! I'd love to help you get that booked in right away." },
  { id: "Roger", letter: "R", flag: "🇺🇸", loc: "en-US", desc: "Laid-Back, Casual, Resonant", vid: "CwhRBWXzGAHq8TQ4Fs17", audio: "/audio/voices/roger.mp3", sample: "Hey, no rush at all. I can take care of that for you right now." },
  { id: "Laura", letter: "L", flag: "🇺🇸", loc: "en-US", desc: "Enthusiast, Quirky Attitude", vid: "FGY2WhTYpPnrIDTdsKH5", audio: "/audio/voices/laura.mp3", sample: "Oh, great timing! I can absolutely get that set up for you." },
  { id: "Charlie", letter: "C", flag: "🇦🇺", loc: "en-AU", desc: "Deep, Confident, Energetic", vid: "IKne3meq5aSn9XLyUdCD", audio: "/audio/voices/charlie.mp3", sample: "G'day! You've reached the front desk — happy to help however I can." },
  { id: "George", letter: "G", flag: "🇬🇧", loc: "en-GB", desc: "Warm, Mature, Storyteller", vid: "JBFqnCBsd6RMkjVDRZzb", audio: "/audio/voices/george.mp3", sample: "Good afternoon. Let me walk you through everything, step by step." },
  { id: "Callum", letter: "C", flag: "🌐", loc: "en", desc: "Husky Trickster", vid: "N2lVS1w4EtoT3dr4eOWO", audio: "/audio/voices/callum.mp3", sample: "Well now, you've called the right place. Let's get this handled." },
  { id: "River", letter: "R", flag: "🇺🇸", loc: "en-US", desc: "Relaxed, Neutral, Informative", vid: "SAz9YHcvj6GT2YYXdXww", audio: "/audio/voices/river.mp3", sample: "Hi, thanks for reaching out. I can look that up for you in just a moment." },
  { id: "Liam", letter: "L", flag: "🇺🇸", loc: "en-US", desc: "Energetic, Social Creator", vid: "TX3LPaxmHKxFdv7VOQHJ", audio: "/audio/voices/liam.mp3", sample: "Hey! Awesome to hear from you — let's get you taken care of fast." },
  { id: "Charlotte", letter: "C", flag: "🇸🇪", loc: "en-SE", desc: "Seductive, Warm", vid: "XB0fDUnXU5powFXDhCwa", audio: "/audio/voices/charlotte.mp3", sample: "Hello, lovely to hear from you. Let me take care of that right away." },
  { id: "Alice", letter: "A", flag: "🇬🇧", loc: "en-GB", desc: "Clear, Professional", vid: "Xb7hH8MSUJpSbSDYk0k2", audio: "/audio/voices/alice.mp3", sample: "Hello, thank you for calling. How may I assist you this afternoon?" },
  { id: "Matilda", letter: "M", flag: "🇺🇸", loc: "en-US", desc: "Knowledgable, Professional", vid: "XrExE9yKIg1WjnnlVkGX", audio: "/audio/voices/matilda.mp3", sample: "Hi! I can answer that for you — and book you in while we're at it." },
  { id: "Will", letter: "W", flag: "🇺🇸", loc: "en-US", desc: "Relaxed Optimist", vid: "bIHbv24MWmeRgasZH58o", audio: "/audio/voices/will.mp3", sample: "Hey, good to hear from you. We'll get this sorted, no worries." },
  { id: "Jessica", letter: "J", flag: "🇺🇸", loc: "en-US", desc: "Playful, Bright, Warm", vid: "cgSgspJ2msm6clMCkdW9", audio: "/audio/voices/jessica.mp3", sample: "Hi! So glad you called — let's get you all set up." },
  { id: "Eric", letter: "E", flag: "🇺🇸", loc: "en-US", desc: "Smooth, Trustworthy", vid: "cjVigY5qzO86Huf0OWal", audio: "/audio/voices/eric.mp3", sample: "Thanks for calling. I'll make sure this is handled properly for you." },
  { id: "Harry", letter: "H", flag: "🇺🇸", loc: "en-US", desc: "Fierce Warrior", vid: "SOYHLrjzK2X1ezoPC6cr", audio: "/audio/voices/harry.mp3", sample: "You've reached the front desk. Tell me what you need — I'm on it." },
  { id: "Chris", letter: "C", flag: "🇺🇸", loc: "en-US", desc: "Casual, Natural", vid: "iP95p4xoKVk53GoZ742B", audio: "/audio/voices/chris.mp3", sample: "Hey, what's up! I can get that booked for you real quick." },
  { id: "Brian", letter: "B", flag: "🇺🇸", loc: "en-US", desc: "Deep, Resonant", vid: "nPczCjzI2devNBz1zQrb", audio: "/audio/voices/brian.mp3", sample: "Hello there. I'd be glad to help you with that today." },
  { id: "Daniel", letter: "D", flag: "🇬🇧", loc: "en-GB", desc: "Authoritative, News", vid: "onwK4e9ZLuTAKqWW03F9", audio: "/audio/voices/daniel.mp3", sample: "Good day. I can confirm your appointment and answer any questions." },
  { id: "Lily", letter: "L", flag: "🇬🇧", loc: "en-GB", desc: "Warm, Soft", vid: "pFZP5JQG7iQjIQuC4Bku", audio: "/audio/voices/lily.mp3", sample: "Hello, thanks so much for calling. Let me help you with that." },
  { id: "Bill", letter: "B", flag: "🇺🇸", loc: "en-US", desc: "Trustworthy, Mature", vid: "pqHfZKP75CvOlQylNhV4", audio: "/audio/voices/bill.mp3", sample: "Hi, thanks for calling. Rest assured, I'll take good care of this." },
];

type UC = { name: string; icon: string; kpi: string; title: string; body: string; stats: { v: string; l: string }[]; tags: string[] };
const USECASES: UC[] = [
  { name: "Healthcare", icon: "fa-stethoscope", kpi: "2m 18s avg call duration", title: "Front-desk automation patients actually trust.", body: "Appointment scheduling, triage intake, prescription refills, and post-visit follow-ups — HIPAA-compliant, with eligibility checks and calendar booking handled live on the call.", stats: [{ v: "2m 18s", l: "Avg call" }, { v: "87%", l: "Auto-resolved" }, { v: "4.8/5", l: "Patient rating" }], tags: ["HIPAA", "EHR integration", "Insurance verification", "Telehealth routing"] },
  { name: "E-commerce", icon: "fa-bag-shopping", kpi: "84% self-serve resolution", title: "Turn every support call into a retention moment.", body: "Order tracking, returns, product questions, refund processing — all handled live without putting customers on hold. Integrates with Shopify, Stripe, and your fulfillment stack.", stats: [{ v: "84%", l: "Self-serve resolution" }, { v: "1m 52s", l: "Avg handle time" }, { v: "4.7/5", l: "CSAT score" }], tags: ["Shopify", "Order tracking", "Returns & RMA", "Product recs", "Loyalty programs", "Refund processing"] },
  { name: "Real estate", icon: "fa-house", kpi: "96% lead capture rate", title: "Never miss a lead — even at 2 AM.", body: "Property inquiries, tour booking, mortgage pre-qualification, agent routing. hello22 captures every lead and books tours directly into your calendar.", stats: [{ v: "96%", l: "Lead capture rate" }, { v: "34%", l: "Tour conversion" }, { v: "+42%", l: "After-hours leads" }], tags: ["MLS sync", "Tour booking", "Lead qualification", "Property Q&A", "Agent routing", "CRM sync"] },
  { name: "Hospitality", icon: "fa-hotel", kpi: "73% booking rate", title: "A 24/7 concierge that knows your property.", body: "Reservations, room service, amenity questions, local recommendations, and guest complaints — all with the warmth of your best front-desk agent.", stats: [{ v: "73%", l: "Booking rate" }, { v: "2m 04s", l: "Avg handle time" }, { v: "4.9/5", l: "Guest CSAT" }], tags: ["PMS integration", "Reservations", "Concierge", "Multi-property", "Loyalty program", "Group bookings"] },
  { name: "Financial services", icon: "fa-building-columns", kpi: "79% containment rate", title: "Compliant voice automation for sensitive calls.", body: "Account inquiries, fraud alerts, payment reminders, and collections — PCI-DSS compliant with full audit trails and seamless human handoff.", stats: [{ v: "79%", l: "Containment rate" }, { v: "100%", l: "Compliance score" }, { v: "−72%", l: "Cost per call" }], tags: ["PCI-DSS", "Fraud detection", "Payments", "Account verification", "Collections", "Human handoff"] },
  { name: "Logistics", icon: "fa-truck", kpi: "12,000+ calls per hour", title: "Coordinate drivers, dispatch, and customers in real time.", body: "Delivery confirmations, address changes, ETA inquiries, dispatch coordination — hello22 handles thousands of simultaneous calls without breaking a sweat.", stats: [{ v: "12,000+", l: "Calls per hour" }, { v: "92%", l: "Resolution rate" }, { v: "+18%", l: "On-time delivery" }], tags: ["TMS integration", "Dispatch routing", "ETA updates", "Address changes", "POD capture", "Driver coordination"] },
];

const INTEGRATIONS = ["Google Calendar", "Twilio", "Stripe", "AWS (S3)"];

type Line = { role: "caller" | "agent"; name: string; text: string };
const TRANSCRIPT: Line[] = [
  { role: "caller", name: "Sarah Chen", text: "Hi, I'd like to book a table for four this Friday evening." },
  { role: "agent", name: "Aria · hello22", text: "Of course! What time works best? We have openings at 7 PM or 9 PM." },
  { role: "caller", name: "Sarah Chen", text: "7 PM sounds perfect. Can we get a booth by the window?" },
  { role: "agent", name: "Aria · hello22", text: "Absolutely — I've reserved booth 4 by the window. Can I get a name for the booking?" },
  { role: "caller", name: "Sarah Chen", text: "Sarah Chen. C-H-E-N." },
  { role: "agent", name: "Aria · hello22", text: "Booked! Table for four under Sarah Chen, Friday at 7 PM, booth 4. You'll get a confirmation text shortly. Anything else?" },
];

// Product screenshots — apni software ki images yahan add/remove karein.
// File ko public/images/screenshots/ mein daalein, fir niche ek entry bana dein.
type Shot = { src: string; title: string; desc: string };
const SHOTS: Shot[] = [
  { src: "/images/screenshots/dashboard.png", title: "Voice agent analytics", desc: "Live performance at a glance — calls handled, success rate, leads captured, minutes used, and peak call times." },
  { src: "/images/screenshots/call-logs.png", title: "Call inbox", desc: "Every call transcribed, summarised, and analysed — filter by outcome or time and search summaries instantly." },
  { src: "/images/screenshots/ai-brain.png", title: "AI Brain — agent builder", desc: "Build your receptionist step by step: identity, knowledge, rules, automations, and voice — no code." },
  { src: "/images/screenshots/plans-billing.png", title: "Plans & billing", desc: "Track minutes, switch plans, and control auto-renew — full visibility over your usage and costs." },
];

// FAQ — edit/add questions here. `a` supports **bold** markup (rendered below).
type Faq = { q: string; a: string };
const FAQS: Faq[] = [
  { q: "What is hello22.ai?", a: "hello22.ai is a 24/7 AI voice receptionist that answers your business phone calls, captures caller details, books appointments or jobs, and sends you a call summary via email, SMS, and WhatsApp (depending on your plan) — so you never miss a lead." },
  { q: "How does the AI receptionist work?", a: "When a customer calls your assigned number, your AI receptionist answers in a natural voice, asks questions based on your business, captures the caller's details, and sends you a complete call summary as soon as the call ends." },
  { q: "Can I customise what the AI says?", a: "Yes. Go to the **AI Brain** section in your dashboard to customise your receptionist's name, greeting, business information, services, business hours, and call-handling rules. Changes take effect instantly." },
  { q: "What happens after a call ends?", a: "As soon as a call finishes, you'll receive a summary that includes the caller's name, call duration, and a transcript or summary of the conversation. Notifications are delivered via email, SMS, and WhatsApp, depending on your plan." },
  { q: "Will I receive SMS and WhatsApp notifications after every call?", a: "Yes, on eligible paid plans. To receive SMS and WhatsApp notifications, make sure your mobile number is added in **Account Settings**." },
  { q: "How does the CRM integration work?", a: "After each call, the caller's details are automatically sent to your connected CRM as a new lead. You can connect supported CRMs or configure a custom webhook from the **Connect CRM** section of your dashboard." },
  { q: "What voices are available?", a: "Choose from a range of natural-sounding AI voices with multiple accents. Free trials include a limited selection of voices, while paid plans unlock the full voice library." },
  { q: "What happens if I run out of minutes?", a: "If you use all of your included minutes, your subscription will automatically renew, and the payment method on file will be charged for the next billing cycle so your AI receptionist continues answering calls without interruption.\n\nYou can monitor your remaining minutes anytime from the **Plans & Billing** page in your dashboard.\n\n**Free Trial:** Your trial ends when you reach **10 minutes of usage** or **14 days**, whichever comes first. At that point, your selected plan will begin automatically unless you cancel before the trial ends." },
  { q: "Can I change or upgrade my plan?", a: "Yes. You can change your plan at any time from the **Plans & Billing** page in your dashboard. If you're on a free trial, your newly selected plan will start when the trial ends. If you're already on a paid subscription, you can switch to a different plan at any time." },
  { q: "Is my data secure?", a: "Yes. Your data is encrypted both in transit and at rest. We never share your call recordings, transcripts, or customer information with third parties." },
  { q: "Can I listen to call recordings?", a: "Yes. When call recording is enabled, recordings are available in the **Call Inbox** section of your dashboard." },
  { q: "How do I update my mobile number or email address?", a: "Go to **Account Settings** in your dashboard to update your mobile number, email address, or password at any time." },
];

type Cap = { icon: string; label: string; blue?: boolean };
type Feat = { t: string; on: boolean };
type Plan = { name: string; blurb: string; price: string; caps: Cap[]; feats: Feat[]; popular?: boolean };
const PLANS: Plan[] = [
  { name: "Starter", blurb: "For trying things out.", price: "$22", caps: [{ icon: "fa-solid fa-phone-volume", label: "100 min / month", blue: true }], feats: [{ t: "100 call minutes each month", on: true }, { t: "Post-call SMS summaries", on: false }, { t: "WhatsApp summaries + auto-reply", on: false }] },
  { name: "Basic", blurb: "For small teams going live.", price: "$48", popular: true, caps: [{ icon: "fa-solid fa-phone-volume", label: "100 min / month", blue: true }, { icon: "fa-solid fa-comment", label: "SMS" }], feats: [{ t: "100 call minutes each month", on: true }, { t: "Post-call SMS summaries", on: true }, { t: "WhatsApp summaries + auto-reply", on: false }] },
  { name: "Premium", blurb: "For high-volume front desks.", price: "$99", caps: [{ icon: "fa-solid fa-phone-volume", label: "200 min / month", blue: true }, { icon: "fa-solid fa-comment", label: "SMS" }, { icon: "fa-brands fa-whatsapp", label: "WhatsApp" }, { icon: "fa-solid fa-microphone", label: "19 voices" }], feats: [{ t: "200 call minutes each month", on: true }, { t: "Post-call SMS summaries", on: true }, { t: "WhatsApp summaries + auto-reply", on: true }] },
];

const CSS = `
@keyframes h22marq{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@keyframes h22pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(.55)}}
@keyframes h22eq{0%,100%{transform:scaleY(.28)}50%{transform:scaleY(1)}}
@keyframes h22float{0%,100%{transform:translate(0,0)}50%{transform:translate(0,-22px)}}
@keyframes h22ring{0%{transform:scale(.7);opacity:.55}100%{transform:scale(2.1);opacity:0}}
@keyframes h22greet{0%{opacity:0;transform:translateY(22px) rotateX(-55deg);filter:blur(6px)}100%{opacity:1;transform:none;filter:blur(0)}}
@keyframes h22drift{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(34px,-28px) scale(1.07)}66%{transform:translate(-26px,20px) scale(.95)}}
@keyframes h22glowpulse{0%,100%{opacity:.65;transform:translateX(-50%) scale(1)}50%{opacity:1;transform:translateX(-50%) scale(1.14)}}
.h22 [data-rv]{opacity:0;transform:translateY(34px) scale(.985);transition:opacity .7s cubic-bezier(.2,.7,.2,1),transform .75s cubic-bezier(.2,.7,.2,1)}
.h22 [data-rv].in{opacity:1;transform:none}
.h22marquee:hover{animation-play-state:paused}
.h22 a.nl{color:#c9c9d4;text-decoration:none}.h22 a.nl:hover{color:#fff}
.h22 .lift{transition:transform .3s cubic-bezier(.2,.7,.2,1),box-shadow .3s ease,border-color .3s}
.h22 .lift:hover{transform:translateY(-7px);box-shadow:0 30px 64px -32px rgba(0,0,0,.85)}
.h22 .btnp:hover{transform:translateY(-2px)}
@media(max-width:920px){
 .h22 .nav-links{display:none!important}
 .h22 .hero-grid,.h22 .demo-grid,.h22 .uc-grid,.h22 .int-grid,.h22 .price-grid,.h22 .shots-grid{grid-template-columns:1fr!important}
 .h22 .feat-grid{grid-template-columns:1fr 1fr!important}
 .h22 .feat-grid>div{grid-column:auto!important}
 .h22 .tcol{grid-column:span 2!important}
 .h22 .footer-grid{grid-template-columns:1fr 1fr!important}
}
@media(max-width:620px){.h22 .voices-grid,.h22 .feat-grid,.h22 .stat4,.h22 .tcol{grid-template-columns:1fr!important}}
`;

// Renders FAQ answers: "\n\n" => paragraphs, **text** => bold.
function renderAnswer(text: string) {
  return text.split("\n\n").map((para, pi) => (
    <p key={pi} style={{ margin: pi === 0 ? 0 : "12px 0 0", fontSize: 15, lineHeight: 1.65, color: "#9594a6" }}>
      {para.split(/(\*\*[^*]+\*\*)/g).map((seg, si) =>
        seg.startsWith("**") && seg.endsWith("**")
          ? <strong key={si} style={{ color: "#e4e4ec", fontWeight: 700 }}>{seg.slice(2, -2)}</strong>
          : <span key={si}>{seg}</span>
      )}
    </p>
  ));
}

function useReveal(rootRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = Array.from(root.querySelectorAll("[data-rv]"));
    const io = new IntersectionObserver(
      (ents) => ents.forEach((e) => { if (e.isIntersecting) { (e.target as HTMLElement).classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [rootRef]);
}

function useCounter(to: number, fmt: (v: number) => string, run: boolean, dur = 1500) {
  const [txt, setTxt] = useState(fmt(0));
  useEffect(() => {
    if (!run) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      setTxt(fmt(to * e));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, run, dur]);
  return txt;
}

export default function Hello22Site() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [greet, setGreet] = useState(0);
  const [voice, setVoice] = useState(0);
  const [useCase, setUseCase] = useState(0);
  const [demoPlaying, setDemoPlaying] = useState(false);
  const [demoStarted, setDemoStarted] = useState(false);
  const [demoStep, setDemoStep] = useState(0);
  const [bigRun, setBigRun] = useState(false);
  const bigRef = useRef<HTMLDivElement | null>(null);
  const demoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);
  const [playingVoice, setPlayingVoice] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const demoAudioRef = useRef<HTMLAudioElement | null>(null);

  useReveal(rootRef);

  useEffect(() => () => { if (audioRef.current) audioRef.current.pause(); if (demoAudioRef.current) demoAudioRef.current.pause(); }, []);

  // close lightbox on Escape
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  function stopVoice() {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  }
  function fallbackSpeak(i: number) {
    if (!("speechSynthesis" in window)) { setPlayingVoice(null); return; }
    window.speechSynthesis.cancel();
    const v = VOICES[i];
    const list = voicesRef.current;
    const m = list.find((x) => x.lang === v.loc) || list.find((x) => x.lang.startsWith(v.loc.slice(0, 2))) || list.find((x) => x.lang.startsWith("en"));
    const u = new SpeechSynthesisUtterance(v.sample);
    if (m) { u.voice = m; u.lang = m.lang; }
    u.onend = () => setPlayingVoice((p) => (p === i ? null : p));
    u.onerror = () => setPlayingVoice((p) => (p === i ? null : p));
    window.speechSynthesis.speak(u);
  }
  function toggleVoice(i: number) {
    setVoice(i);
    if (playingVoice === i) { stopVoice(); setPlayingVoice(null); return; }
    stopVoice();
    setPlayingVoice(i);
    // Prefer a real recorded voice file; fall back to the browser engine if it's missing.
    const audio = new Audio(VOICES[i].audio);
    audioRef.current = audio;
    let handled = false;
    const fb = () => { if (handled) return; handled = true; audioRef.current = null; fallbackSpeak(i); };
    audio.onended = () => setPlayingVoice((p) => (p === i ? null : p));
    audio.onerror = fb;
    audio.play().catch(fb);
  }

  // greeting cycle
  useEffect(() => {
    const t = setInterval(() => setGreet((g) => (g + 1) % GREETS.length), 1900);
    return () => clearInterval(t);
  }, []);

  // big stats on scroll
  useEffect(() => {
    const el = bigRef.current;
    if (!el) return;
    const io = new IntersectionObserver((ents) => ents.forEach((e) => { if (e.isIntersecting) { setBigRun(true); io.disconnect(); } }), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // speech voices
  useEffect(() => {
    if (!("speechSynthesis" in window)) return;
    const load = () => (voicesRef.current = window.speechSynthesis.getVoices() || []);
    load();
    window.speechSynthesis.addEventListener("voiceschanged", load);
    return () => { window.speechSynthesis.removeEventListener("voiceschanged", load); window.speechSynthesis.cancel(); };
  }, []);

  // hero counters
  const heroLang = useCounter(22, (v) => Math.round(v) + "+", true);
  const heroLat = useCounter(220, (v) => Math.round(v) + "ms", true);
  const heroAcc = useCounter(99.2, (v) => v.toFixed(1) + "%", true);
  const heroCalls = useCounter(22, (v) => Math.round(v) + "M+", true);
  const bigCalls = useCounter(22, (v) => Math.round(v) + "M+", bigRun);
  const bigRes = useCounter(99.2, (v) => v.toFixed(1) + "%", bigRun);
  const bigLat = useCounter(220, (v) => Math.round(v) + "ms", bigRun);
  const bigCost = useCounter(72, (v) => "−" + Math.round(v) + "%", bigRun);

  function stopDemo() {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    if (demoAudioRef.current) { demoAudioRef.current.pause(); demoAudioRef.current = null; }
    if (demoTimer.current) clearTimeout(demoTimer.current);
    setDemoPlaying(false);
  }
  function advanceDemo(i: number) {
    demoTimer.current = setTimeout(() => speakFrom(i + 1), 320);
  }
  function ttsLine(i: number) {
    const line = TRANSCRIPT[i];
    if (!("speechSynthesis" in window)) { advanceDemo(i); return; }
    const pool = voicesRef.current.filter((v) => /^en/i.test(v.lang));
    const list = pool.length ? pool : voicesRef.current;
    const femaleRe = /samantha|jenny|aria|zira|karen|tessa|fiona|moira|serena|victoria|ava|female/i;
    const females = list.filter((v) => femaleRe.test(v.name));
    const caller = females[0] || list[0];
    const agent = females.find((v) => v !== caller) || list.find((v) => v !== caller) || caller;
    const same = caller === agent;
    const u = new SpeechSynthesisUtterance(line.text);
    const isAgent = line.role === "agent";
    const vv = isAgent ? agent : caller;
    if (vv) { u.voice = vv; u.lang = vv.lang; }
    if (same) { u.rate = isAgent ? 0.96 : 1.08; u.pitch = isAgent ? 0.85 : 1.3; }
    else { u.rate = isAgent ? 1.0 : 1.05; u.pitch = isAgent ? 1.0 : 1.12; }
    u.onend = () => advanceDemo(i);
    u.onerror = () => advanceDemo(i);
    window.speechSynthesis.speak(u);
  }
  function speakFrom(i: number) {
    if (i >= TRANSCRIPT.length) { setDemoPlaying(false); return; }
    setDemoStep(i + 1);
    // Prefer a real recorded line; fall back to the browser engine if missing.
    const audio = new Audio(`/audio/demo/line-${i}.mp3`);
    demoAudioRef.current = audio;
    let handled = false;
    const fb = () => { if (handled) return; handled = true; demoAudioRef.current = null; ttsLine(i); };
    audio.onended = () => { if (handled) return; handled = true; demoAudioRef.current = null; advanceDemo(i); };
    audio.onerror = fb;
    audio.play().catch(fb);
  }
  function playDemo() {
    if (demoPlaying) { stopDemo(); return; }
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setDemoPlaying(true);
    setDemoStarted(true);
    setDemoStep(0);
    speakFrom(0);
  }

  const secs = Math.min(48, demoStep * 8);
  const demoTime = "0:" + (secs < 10 ? "0" + secs : secs);
  const demoState = demoPlaying ? "Live" : demoStep > 0 ? "Ended" : "Ready";
  const uc = USECASES[useCase];

  const eyebrow: React.CSSProperties = { fontSize: 13, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--lime)", fontWeight: 700 };
  const h2: React.CSSProperties = { fontFamily: DISP, fontWeight: 600, letterSpacing: "-.03em", fontSize: "clamp(34px,4.5vw,52px)", lineHeight: 1.05, margin: "14px 0 0" };
  const card: React.CSSProperties = { background: "var(--surface)", border: "1px solid rgba(255,255,255,.09)", borderRadius: 22 };
  const featIcon = (bg: string, bd: string, col: string): React.CSSProperties => ({ width: 44, height: 44, borderRadius: 12, background: bg, border: `1px solid ${bd}`, display: "flex", alignItems: "center", justifyContent: "center", color: col, fontSize: 18 });
  const pill: React.CSSProperties = { fontSize: 13, padding: "8px 13px", borderRadius: 999, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)" };

  return (
    <div
      ref={rootRef}
      className={`h22 ${manrope.variable} ${space.variable}`}
      style={{ "--bg": "#07070d", "--surface": "#12121d", "--lime": "#2c76ed", "--violet": "#9d8bff", "--cyan": "#56e0e0", background: "#07070d", color: "#f4f4f7", fontFamily: "var(--font-manrope), Manrope, sans-serif", WebkitFontSmoothing: "antialiased", overflow: "hidden", position: "relative" } as React.CSSProperties}
    >
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* ambient glows */}
      <div style={{ position: "absolute", top: -180, left: -120, width: 620, height: 620, borderRadius: "50%", background: "radial-gradient(circle,rgba(157,139,255,.22),transparent 65%)", filter: "blur(20px)", pointerEvents: "none", zIndex: 0, animation: "h22drift 16s ease-in-out infinite" }} />
      <div style={{ position: "absolute", top: 120, right: -160, width: 560, height: 560, borderRadius: "50%", background: "radial-gradient(circle,rgba(86,224,224,.16),transparent 65%)", filter: "blur(20px)", pointerEvents: "none", zIndex: 0, animation: "h22drift 21s ease-in-out infinite", animationDelay: "-6s" }} />
      <div style={{ position: "absolute", top: 540, left: "30%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(44,118,237,.12),transparent 65%)", filter: "blur(30px)", pointerEvents: "none", zIndex: 0, animation: "h22drift 26s ease-in-out infinite", animationDelay: "-12s" }} />

      {/* NAV */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, backdropFilter: "blur(16px)", background: "rgba(7,7,13,.72)", borderBottom: "1px solid rgba(255,255,255,.07)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 28px", height: 74, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
          <a href="#top" style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={LOGO} alt="hello22.ai" style={{ height: 30, width: "auto", display: "block" }} /></a>
          <nav className="nav-links" style={{ display: "flex", alignItems: "center", gap: 30, fontSize: 14.5, fontWeight: 500 }}>
            {["Demo", "Product", "Voices", "Features", "Use cases", "Pricing", "FAQ"].map((l) => (
              <a key={l} className="nl" href={l === "Docs" ? "#" : "#" + l.toLowerCase().replace(" ", "")}>{l}</a>
            ))}
          </nav>
          <div style={{ display: "flex", alignItems: "center", gap: 14, flexShrink: 0 }}>
            <a href={APP_URL} target="_blank" rel="noopener noreferrer" style={{ color: "#f4f4f7", textDecoration: "none", fontSize: 14.5, fontWeight: 600 }}>Sign in</a>
            <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="btnp" style={{ textDecoration: "none", background: "var(--lime)", color: "#fff", fontWeight: 700, fontSize: 14.5, padding: "11px 20px", borderRadius: 999, boxShadow: "0 10px 26px -12px rgba(44,118,237,.7)" }}>Try free</a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="top" style={{ position: "relative", zIndex: 1, maxWidth: 1240, margin: "0 auto", padding: "64px 28px 40px" }}>
        <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1.05fr .95fr", gap: 54, alignItems: "center" }}>
          <div>
            <div data-rv style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "7px 14px", borderRadius: 999, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", fontSize: 13, color: "#c9c9d4" }}>
              <span style={{ position: "relative", display: "inline-flex", width: 8, height: 8 }}>
                <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "var(--lime)" }} />
                <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "var(--lime)", animation: "h22ring 1.8s ease-out infinite" }} />
              </span>
              <span style={{ fontWeight: 600, color: "#c9c9d4", letterSpacing: ".02em" }}>24/7 AI voice receptionist</span>
            </div>
            <h1 data-rv style={{ fontFamily: DISP, fontWeight: 600, letterSpacing: "-.04em", lineHeight: .92, fontSize: "clamp(72px,11vw,150px)", margin: "26px 0 0" }}>
              <span style={{ display: "inline-flex", alignItems: "baseline", perspective: "600px" }}>
                <span key={greet} style={{ display: "inline-block", animation: "h22greet .65s cubic-bezier(.2,.8,.2,1) both" }}>{GREETS[greet]}</span>
                <span style={{ color: "var(--lime)" }}>.</span>
              </span>
            </h1>
            <p data-rv style={{ fontFamily: DISP, fontSize: "clamp(22px,2.4vw,30px)", fontWeight: 500, color: "#e4e4ec", margin: "14px 0 0", letterSpacing: "-.01em" }}>I&apos;m your AI voice agent — ready to talk.</p>
            <p data-rv style={{ fontSize: 18, lineHeight: 1.6, color: "#9594a6", maxWidth: 520, margin: "20px 0 0" }}>hello22 answers every call, books appointments, qualifies leads, and resolves questions — sounding unmistakably human, in 22+ languages, 24/7.</p>
            <div data-rv style={{ display: "flex", gap: 14, marginTop: 32, flexWrap: "wrap" }}>
              <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="btnp" style={{ textDecoration: "none", background: "var(--lime)", color: "#fff", fontWeight: 700, fontSize: 16, padding: "16px 26px", borderRadius: 999, boxShadow: "0 16px 38px -14px rgba(44,118,237,.7)" }}>Start free — 20 min setup</a>
              <a href="#demo" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,.06)", color: "#f4f4f7", fontWeight: 600, fontSize: 16, padding: "16px 24px", borderRadius: 999, border: "1px solid rgba(255,255,255,.14)" }}>
                <span style={{ display: "inline-flex", width: 22, height: 22, borderRadius: "50%", background: "var(--lime)", color: "#fff", alignItems: "center", justifyContent: "center", fontSize: 10 }}><i className="fa-solid fa-play" /></span>Hear a live call
              </a>
            </div>
            <div data-rv style={{ display: "flex", gap: 40, marginTop: 46, flexWrap: "wrap" }}>
              {[[heroLang, "Languages"], [heroLat, "Avg. response"], [heroAcc, "Resolution rate"], [heroCalls, "Calls handled"]].map(([v, l], i) => (
                <div key={i}><div style={{ fontFamily: DISP, fontSize: 30, fontWeight: 600, color: "#fff" }}>{v}</div><div style={{ fontSize: 13, color: "#9594a6", marginTop: 2 }}>{l}</div></div>
              ))}
            </div>
          </div>
          {/* live call card */}
          <div data-rv>
            <div style={{ position: "relative", background: "linear-gradient(160deg,#15151f,#0d0d16)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 26, padding: 26, boxShadow: "0 40px 90px -40px rgba(0,0,0,.8)", animation: "h22float 6.5s ease-in-out infinite" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 13, background: "rgba(44,118,237,.14)", border: "1px solid rgba(44,118,237,.3)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--lime)", fontSize: 18 }}><i className="fa-solid fa-phone" /></div>
                  <div><div style={{ fontSize: 11, color: "#9594a6", textTransform: "uppercase", letterSpacing: ".1em" }}>Inbound call</div><div style={{ fontWeight: 700, fontSize: 16 }}>Acme Dental</div></div>
                </div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "6px 12px", borderRadius: 999, background: "rgba(255,75,75,.14)", border: "1px solid rgba(255,75,75,.3)", fontSize: 12, fontWeight: 700, color: "#ff8585" }}><span style={{ width: 7, height: 7, borderRadius: "50%", background: "#ff5b5b", animation: "h22pulse 1.4s infinite" }} />Live</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 16, fontSize: 13, color: "#9594a6", fontVariantNumeric: "tabular-nums" }}><span>+1 (415) 555-0142</span><span>0:42</span></div>
              <div style={{ display: "flex", alignItems: "center", gap: 3, height: 70, margin: "18px 0 6px", padding: "0 4px" }}>
                {Array.from({ length: 46 }).map((_, i) => {
                  const h = 10 + Math.round(40 * Math.abs(Math.sin(i * 0.55) + 0.4 * Math.sin(i * 1.7)));
                  return <span key={i} style={{ width: 4, flex: "1 1 0", maxWidth: 6, borderRadius: 4, background: "linear-gradient(180deg,#2c76ed,#56e0e0)", height: Math.min(56, h), transformOrigin: "center", animation: `h22eq ${0.7 + (i % 5) * 0.12}s ease-in-out ${(i * 0.045).toFixed(2)}s infinite` }} />;
                })}
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
                <span style={{ fontSize: 12, fontWeight: 600, padding: "7px 12px", borderRadius: 9, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)" }}>EN-US</span>
                <span style={{ fontSize: 12, fontWeight: 600, padding: "7px 12px", borderRadius: 9, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", color: "var(--cyan)" }}>220ms latency</span>
                <span style={{ fontSize: 12, fontWeight: 600, padding: "7px 12px", borderRadius: 9, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)" }}>Voice: Aria</span>
              </div>
              <div style={{ marginTop: 18, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,.08)", display: "flex", alignItems: "center", justifyContent: "space-between" }}><span style={{ fontSize: 13, color: "#9594a6" }}>Intent confidence</span><span style={{ fontFamily: DISP, fontSize: 22, fontWeight: 600, color: "var(--lime)" }}>98.4%</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST MARQUEE */}
      <section style={{ position: "relative", zIndex: 1, padding: "34px 0 14px" }}>
        <p style={{ textAlign: "center", fontSize: 13, letterSpacing: ".16em", textTransform: "uppercase", color: "#6f6f80", margin: "0 0 26px" }}>Built on best-in-class voice & infrastructure</p>
        <div style={{ position: "relative", overflow: "hidden", WebkitMaskImage: "linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)", maskImage: "linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)" }}>
          <div className="h22marquee" style={{ display: "flex", gap: 60, width: "max-content", animation: "h22marq 32s linear infinite", paddingRight: 60 }}>
            {[...TRUST, ...TRUST].map((n, i) => <span key={i} style={{ fontFamily: DISP, fontSize: 22, fontWeight: 600, color: "#5d5d70", whiteSpace: "nowrap", letterSpacing: "-.01em" }}>{n}</span>)}
          </div>
        </div>
      </section>

      {/* DEMO */}
      <section id="demo" style={{ position: "relative", zIndex: 1, maxWidth: 1240, margin: "0 auto", padding: "90px 28px", scrollMarginTop: 90 }}>
        <div data-rv style={eyebrow}>Live demo</div>
        <h2 data-rv style={{ ...h2, maxWidth: 760 }}>Press play. Hear hello22 handle a real call.</h2>
        <p data-rv style={{ fontSize: 18, color: "#9594a6", maxWidth: 620, margin: "18px 0 0", lineHeight: 1.6 }}>A real conversation generated by hello22. The caller is transcribed, the agent responds in real time — no pre-recorded lines, no decision trees.</p>
        <div data-rv style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 14, fontSize: 13, color: "#7a7a8c" }}><span style={{ display: "inline-flex", width: 20, height: 20, borderRadius: "50%", background: "rgba(44,118,237,.14)", border: "1px solid rgba(44,118,237,.3)", color: "var(--lime)", alignItems: "center", justifyContent: "center", fontSize: 10 }}><i className="fa-solid fa-volume-high" /></span>Hit play — the caller and agent speak aloud using your browser&apos;s voice engine.</div>

        <div className="demo-grid" style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 24, marginTop: 42, alignItems: "start" }}>
          <div data-rv style={{ background: "var(--surface)", border: "1px solid rgba(255,255,255,.09)", borderRadius: 24, overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,.08)", background: "rgba(255,255,255,.02)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <button onClick={playDemo} style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "var(--lime)", color: "#fff", border: "none", cursor: "pointer", fontFamily: "inherit", fontWeight: 700, fontSize: 14, padding: "11px 18px", borderRadius: 999, boxShadow: "0 12px 28px -14px rgba(44,118,237,.7)" }}>
                  <i className={`fa-solid ${demoPlaying ? "fa-pause" : "fa-play"}`} />{demoPlaying ? "Pause" : demoStep > 0 ? "Replay" : "Play sample call"}
                </button>
                <div><div style={{ fontWeight: 700, fontSize: 14 }}>Acme Dental · New patient booking</div><div style={{ fontSize: 12, color: "#9594a6", fontVariantNumeric: "tabular-nums" }}>{demoTime} · EN-US</div></div>
              </div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "6px 12px", borderRadius: 999, background: "rgba(44,118,237,.12)", border: "1px solid rgba(44,118,237,.3)", fontSize: 12, fontWeight: 700, color: "var(--lime)" }}><span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--lime)", animation: "h22pulse 1.4s infinite" }} />{demoState}</div>
            </div>
            <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16, minHeight: 360 }}>
              {TRANSCRIPT.map((t, i) => {
                const shown = !demoStarted || i < demoStep;
                const ag = t.role === "agent";
                return (
                  <div key={i} style={{ display: "flex", justifyContent: ag ? "flex-end" : "flex-start", opacity: shown ? 1 : 0.12, transform: shown ? "none" : "translateY(8px)", transition: "all .5s ease" }}>
                    <div style={{ maxWidth: "78%", padding: "14px 18px", borderRadius: ag ? "18px 18px 4px 18px" : "18px 18px 18px 4px", background: ag ? "linear-gradient(135deg,rgba(44,118,237,.16),rgba(157,139,255,.10))" : "rgba(255,255,255,.05)", border: ag ? "1px solid rgba(44,118,237,.28)" : "1px solid rgba(255,255,255,.09)" }}>
                      <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 6, color: ag ? "var(--lime)" : "#9594a6" }}>{t.name}</div>
                      <div style={{ fontSize: 15, lineHeight: 1.5 }}>{t.text}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div data-rv style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ ...card, borderRadius: 18, padding: 18 }}><div style={{ fontSize: 12, color: "#9594a6", textTransform: "uppercase", letterSpacing: ".1em" }}>Intent detected</div><div style={{ fontFamily: DISP, fontWeight: 600, fontSize: 19, marginTop: 6 }}>Book reservation</div><div style={{ fontSize: 13, color: "var(--lime)", marginTop: 4 }}>98.4% confidence</div></div>
            <div style={{ ...card, borderRadius: 18, padding: 18 }}><div style={{ fontSize: 12, color: "#9594a6", textTransform: "uppercase", letterSpacing: ".1em" }}>Sentiment</div><div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 6 }}><span style={{ fontFamily: DISP, fontWeight: 600, fontSize: 19, color: "var(--cyan)" }}>+0.81</span><span style={{ fontSize: 13, color: "#9594a6" }}>positive</span></div><div style={{ height: 6, borderRadius: 6, background: "rgba(255,255,255,.08)", marginTop: 10, overflow: "hidden" }}><div style={{ height: "100%", width: "81%", background: "linear-gradient(90deg,var(--cyan),var(--lime))", borderRadius: 6 }} /></div></div>
            <div style={{ ...card, borderRadius: 18, padding: 18 }}><div style={{ fontSize: 12, color: "#9594a6", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 12 }}>Live actions</div>{["Reservation created", "SMS confirmation sent", "CRM updated"].map((a) => <div key={a} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, marginBottom: 10 }}><span style={{ width: 18, height: 18, borderRadius: "50%", background: "var(--lime)", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 9 }}><i className="fa-solid fa-check" /></span>{a}</div>)}</div>
            <div style={{ ...card, borderRadius: 18, padding: 18, display: "flex", alignItems: "center", justifyContent: "space-between" }}><span style={{ fontSize: 12, color: "#9594a6", textTransform: "uppercase", letterSpacing: ".1em" }}>Latency</span><span style={{ fontFamily: DISP, fontWeight: 600, fontSize: 19, color: "#fff" }}>218ms</span></div>
          </div>
        </div>
      </section>

      {/* PRODUCT SCREENSHOTS */}
      <section id="product" style={{ position: "relative", zIndex: 1, maxWidth: 1240, margin: "0 auto", padding: "30px 28px 90px", scrollMarginTop: 90 }}>
        <div data-rv style={eyebrow}>Inside the product</div>
        <h2 data-rv style={{ ...h2, maxWidth: 700 }}>See hello22 in action.</h2>
        <p data-rv style={{ fontSize: 18, color: "#9594a6", maxWidth: 620, margin: "18px 0 0", lineHeight: 1.6 }}>A real look at the dashboard your team works in every day — live calls, agent setup, and analytics, all in one place.</p>
        <div className="shots-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 18, marginTop: 42 }}>
          {SHOTS.map((s) => (
            <div key={s.src} data-rv className="lift" style={{ ...card, overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "11px 14px", borderBottom: "1px solid rgba(255,255,255,.08)", background: "rgba(255,255,255,.02)" }}>
                {["#ff5f57", "#febc2e", "#28c840"].map((c) => <span key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c, opacity: .85 }} />)}
                <span style={{ marginLeft: 8, fontSize: 12, color: "#7a7a8c", fontVariantNumeric: "tabular-nums" }}>agent.hello22.ai</span>
              </div>
              <div style={{ position: "relative", minHeight: 180, background: "linear-gradient(150deg,#16161f,#101019)" }}>
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, color: "#5d5d70" }}>
                  <i className="fa-solid fa-image" style={{ fontSize: 34 }} />
                  <span style={{ fontSize: 13 }}>Screenshot coming soon</span>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.src} alt={s.title} loading="lazy" onClick={() => setLightbox(s.src)} onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} style={{ position: "relative", width: "100%", height: "auto", display: "block", cursor: "zoom-in" }} />
              </div>
              <div style={{ padding: "18px 20px" }}>
                <div style={{ fontFamily: DISP, fontWeight: 600, fontSize: 17 }}>{s.title}</div>
                <div style={{ fontSize: 14, color: "#9594a6", lineHeight: 1.55, marginTop: 6 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* VOICES */}
      <section id="voices" style={{ position: "relative", zIndex: 1, maxWidth: 1240, margin: "0 auto", padding: "30px 28px 90px", scrollMarginTop: 90 }}>
        <div data-rv style={eyebrow}>Voice library</div>
        <h2 data-rv style={{ ...h2, maxWidth: 560 }}>Pick a voice. Click to hear it speak.</h2>
        <p data-rv style={{ fontSize: 18, color: "#9594a6", maxWidth: 640, margin: "18px 0 0", lineHeight: 1.6 }}>32+ studio-grade voices, drawn from a live library — not a hardcoded list. Preview any voice free, then go live in one click. Every voice handles interruptions, emotion, and natural multi-language switching.</p>
        <div className="voices-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginTop: 38 }}>
          {VOICES.map((v, i) => {
            const playing = i === playingVoice;
            const hl = i === voice || playing;
            const pals = [["rgba(44,118,237,.14)", "#2c76ed"], ["rgba(86,224,224,.14)", "#56e0e0"], ["rgba(157,139,255,.16)", "#9d8bff"]][i % 3];
            return (
              <div key={v.id} data-rv onClick={() => toggleVoice(i)} style={{ display: "flex", alignItems: "center", gap: 14, padding: 16, borderRadius: 16, cursor: "pointer", transition: "all .25s ease", background: hl ? "linear-gradient(135deg,rgba(44,118,237,.16),rgba(157,139,255,.10))" : "#12121d", border: hl ? "1px solid rgba(44,118,237,.5)" : "1px solid rgba(255,255,255,.08)", boxShadow: hl ? "0 18px 40px -22px rgba(44,118,237,.5)" : "none" }}>
                <div style={{ position: "relative", width: 50, height: 50, borderRadius: 14, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: DISP, fontWeight: 600, fontSize: 20, background: pals[0], color: pals[1] }}>
                  {playing && <span style={{ position: "absolute", inset: 0, borderRadius: 14, background: "var(--lime)", opacity: .35, animation: "h22ring 1.6s ease-out infinite" }} />}
                  <span style={{ position: "relative" }}>{v.letter}</span><span style={{ position: "absolute", bottom: -4, right: -4, fontSize: 15 }}>{v.flag}</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ fontWeight: 700, fontSize: 15.5 }}>{v.id}</span><span style={{ fontSize: 11, color: "#7a7a8c", background: "rgba(255,255,255,.06)", padding: "2px 7px", borderRadius: 6 }}>{v.loc}</span></div>
                  <div style={{ fontSize: 13, color: "#9594a6", marginTop: 3 }}>{v.desc}</div>
                </div>
                {playing ? (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 9 }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 2.5, height: 26 }}>{Array.from({ length: 7 }).map((_, j) => <span key={j} style={{ width: 3, borderRadius: 3, background: "#2c76ed", height: 8 + (j % 3) * 7, transformOrigin: "center", animation: `h22eq ${0.5 + (j % 3) * 0.15}s ease-in-out ${(j * 0.08).toFixed(2)}s infinite` }} />)}</span>
                    <span style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--lime)", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 9 }}><i className="fa-solid fa-stop" /></span>
                  </span>
                ) : (
                  <span style={{ width: 24, height: 24, borderRadius: "50%", border: "1px solid rgba(255,255,255,.16)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "#7a7a8c" }}><i className="fa-solid fa-play" /></span>
                )}
              </div>
            );
          })}
        </div>
        <div data-rv style={{ marginTop: 22 }}>
          <p style={{ fontSize: 13, color: "#6f6f80", margin: 0 }}>Production voices sound significantly better than this preview.</p>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ position: "relative", zIndex: 1, maxWidth: 1240, margin: "0 auto", padding: "30px 28px 90px", scrollMarginTop: 90 }}>
        <div data-rv style={eyebrow}>The platform</div>
        <h2 data-rv style={{ ...h2, maxWidth: 640 }}>Everything you need to talk to everyone.</h2>
        <div className="feat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginTop: 40 }}>
          <div data-rv className="lift" style={{ gridColumn: "span 2", background: "linear-gradient(150deg,#16161f,#101019)", border: "1px solid rgba(255,255,255,.09)", borderRadius: 22, padding: 30 }}>
            <div style={featIcon("rgba(44,118,237,.14)", "rgba(44,118,237,.3)", "var(--lime)")}><i className="fa-solid fa-comments" /></div>
            <h3 style={{ fontFamily: DISP, fontWeight: 600, fontSize: 24, margin: "18px 0 0" }}>Conversational, not scripted</h3>
            <p style={{ fontSize: 15.5, color: "#9594a6", lineHeight: 1.6, margin: "12px 0 0", maxWidth: 520 }}>hello22 handles interruptions, corrections, and tangents the way a human does. It responds to what the caller actually says, then steers back on track.</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 9, marginTop: 20 }}>{["Sub-220ms latency", "Barge-in & correction", "Emotion detection", "Noise resilience", "Multi-turn context"].map((t) => <span key={t} style={pill}>{t}</span>)}</div>
          </div>
          <div data-rv className="lift" style={{ ...card, padding: 28 }}><div style={featIcon("rgba(157,139,255,.16)", "rgba(157,139,255,.32)", "var(--violet)")}><i className="fa-solid fa-clone" /></div><h3 style={{ fontFamily: DISP, fontWeight: 600, fontSize: 20, margin: "16px 0 0" }}>Voice cloning</h3><p style={{ fontSize: 14.5, color: "#9594a6", lineHeight: 1.6, margin: "10px 0 0" }}>Clone your own from a 30-second sample, or choose from 32+ studio voices. Match your brand the moment a caller picks up.</p></div>
          <div data-rv className="lift" style={{ ...card, padding: 28 }}><div style={featIcon("rgba(86,224,224,.14)", "rgba(86,224,224,.3)", "var(--cyan)")}><i className="fa-solid fa-language" /></div><h3 style={{ fontFamily: DISP, fontWeight: 600, fontSize: 20, margin: "16px 0 0" }}>22+ languages</h3><p style={{ fontSize: 14.5, color: "#9594a6", lineHeight: 1.6, margin: "10px 0 0" }}>Answer in English, Spanish, French, German, Portuguese, Mandarin, Japanese, Arabic and more — switching mid-call without missing a beat.</p></div>
          <div data-rv className="lift" style={{ ...card, padding: 28 }}><div style={featIcon("rgba(44,118,237,.12)", "rgba(44,118,237,.28)", "var(--lime)")}><i className="fa-solid fa-code" /></div><h3 style={{ fontFamily: DISP, fontWeight: 600, fontSize: 20, margin: "16px 0 0" }}>Function calling</h3><p style={{ fontSize: 14.5, color: "#9594a6", lineHeight: 1.6, margin: "10px 0 0" }}>Your agent checks calendars, books appointments, looks up orders, and updates records live during the conversation — not after.</p></div>
          <div data-rv className="lift" style={{ ...card, padding: 28 }}><div style={featIcon("rgba(157,139,255,.16)", "rgba(157,139,255,.32)", "var(--violet)")}><i className="fa-solid fa-shield-halved" /></div><h3 style={{ fontFamily: DISP, fontWeight: 600, fontSize: 20, margin: "16px 0 0" }}>Enterprise security</h3><p style={{ fontSize: 14.5, color: "#9594a6", lineHeight: 1.6, margin: "10px 0 0" }}>SOC 2 Type II, HIPAA, GDPR, and PCI-compliant handling. Calls are encrypted end to end and never sold.</p></div>
          <div data-rv className="lift" style={{ background: "linear-gradient(150deg,#16161f,#101019)", border: "1px solid rgba(255,255,255,.09)", borderRadius: 22, padding: 30, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div><div style={featIcon("rgba(86,224,224,.14)", "rgba(86,224,224,.3)", "var(--cyan)")}><i className="fa-solid fa-chart-line" /></div><h3 style={{ fontFamily: DISP, fontWeight: 600, fontSize: 20, margin: "16px 0 0" }}>Call analytics &amp; transcripts</h3><p style={{ fontSize: 14.5, color: "#9594a6", lineHeight: 1.6, margin: "10px 0 0" }}>Every call transcribed, tagged, and analyzed. Get the summary by email, SMS, and WhatsApp the second the caller hangs up.</p></div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 18 }}>{["Transcripts", "Sentiment", "Intent tags", "Webhooks"].map((t) => <span key={t} style={{ fontSize: 12, padding: "6px 11px", borderRadius: 8, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)" }}>{t}</span>)}</div>
          </div>
          <div data-rv className="lift" style={{ ...card, padding: 28 }}><div style={featIcon("rgba(44,118,237,.12)", "rgba(44,118,237,.28)", "var(--lime)")}><i className="fa-solid fa-user-plus" /></div><h3 style={{ fontFamily: DISP, fontWeight: 600, fontSize: 20, margin: "16px 0 0" }}>Lead capture &amp; CRM</h3><p style={{ fontSize: 14.5, color: "#9594a6", lineHeight: 1.6, margin: "10px 0 0" }}>Every caller&apos;s name, number, and intent captured automatically and pushed to your CRM — so no lead ever slips through.</p></div>
          <div data-rv className="lift" style={{ ...card, padding: 28 }}><div style={featIcon("rgba(157,139,255,.16)", "rgba(157,139,255,.32)", "var(--violet)")}><i className="fa-solid fa-phone" /></div><h3 style={{ fontFamily: DISP, fontWeight: 600, fontSize: 20, margin: "16px 0 0" }}>Your own AI number</h3><p style={{ fontSize: 14.5, color: "#9594a6", lineHeight: 1.6, margin: "10px 0 0" }}>Claim a dedicated number or forward your existing line. Your AI receptionist picks up instantly, every time, 24/7.</p></div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ position: "relative", zIndex: 1, maxWidth: 1240, margin: "0 auto", padding: "30px 28px 90px" }}>
        <div data-rv style={eyebrow}>How it works</div>
        <h2 data-rv style={{ ...h2, maxWidth: 640 }}>Set up, sign up, go live — with hello22.</h2>
        <p data-rv style={{ fontSize: 18, color: "#9594a6", maxWidth: 600, margin: "18px 0 0", lineHeight: 1.6 }}>No code, no telephony setup, no flowcharts. Emma walks you through every step — confirm your business, create your account, and take your first real call.</p>
        <div className="uc-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18, marginTop: 42 }}>
          {[
            { n: "01", c: "var(--lime)", t: "Set up", h: "Emma builds your agent", d: "hello22 finds your business and sets up your AI receptionist with you — just review the details and confirm.", img: "/images/screenshots/step-1.png" },
            { n: "02", c: "var(--violet)", t: "Account", h: "Create your account", d: "Add your name, email, and mobile so hello22 can route your calls and text you a summary after every one.", img: "/images/screenshots/step-2.png" },
            { n: "03", c: "var(--cyan)", t: "Go live", h: "Pick a number & go live", d: "Claim your dedicated AI number, point your calls to it, and start handling real conversations in minutes.", img: "/images/screenshots/step-3.png" },
          ].map((s) => (
            <div key={s.n} data-rv className="lift" style={{ ...card, padding: 28 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}><span style={{ fontFamily: DISP, fontSize: 32, fontWeight: 600, color: s.c }}>{s.n}</span><span style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: ".12em", color: "#9594a6" }}>{s.t}</span></div>
              <h3 style={{ fontFamily: DISP, fontWeight: 600, fontSize: 19, margin: "18px 0 0" }}>{s.h}</h3>
              <p style={{ fontSize: 14.5, color: "#9594a6", lineHeight: 1.6, margin: "10px 0 16px" }}>{s.d}</p>
              <div style={{ position: "relative", borderRadius: 12, overflow: "hidden", border: "1px solid rgba(255,255,255,.08)", background: "linear-gradient(150deg,#16161f,#101019)", minHeight: 120 }}>
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, color: "#5d5d70" }}>
                  <i className="fa-solid fa-image" style={{ fontSize: 24 }} /><span style={{ fontSize: 12 }}>Screenshot coming soon</span>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.img} alt={s.h} loading="lazy" onClick={() => setLightbox(s.img)} onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} style={{ position: "relative", width: "100%", height: "auto", display: "block", cursor: "zoom-in" }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* USE CASES */}
      <section id="usecases" style={{ position: "relative", zIndex: 1, maxWidth: 1240, margin: "0 auto", padding: "30px 28px 90px", scrollMarginTop: 90 }}>
        <div data-rv style={eyebrow}>Use cases</div>
        <h2 data-rv style={{ ...h2, maxWidth: 640 }}>Built for every voice touchpoint.</h2>
        <div className="uc-grid" style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 24, marginTop: 40, alignItems: "start" }}>
          <div data-rv style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {USECASES.map((t, i) => {
              const active = i === useCase;
              return (
                <button key={t.name} onClick={() => setUseCase(i)} style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", cursor: "pointer", transition: "all .22s ease", padding: "15px 18px", borderRadius: 14, fontFamily: "inherit", background: active ? "#16161f" : "transparent", border: active ? "1px solid rgba(255,255,255,.13)" : "1px solid transparent", color: active ? "#f4f4f7" : "#9594a6" }}>
                  <span style={{ fontFamily: DISP, fontSize: 13, fontWeight: 600, opacity: .55, width: 22 }}>{"0" + (i + 1)}</span>
                  <span style={{ fontSize: 15.5, fontWeight: 600, flex: 1, textAlign: "left" }}>{t.name}</span>
                  <span style={{ opacity: active ? 1 : 0, color: "var(--lime)", transition: "opacity .2s" }}>→</span>
                </button>
              );
            })}
          </div>
          <div data-rv style={{ background: "linear-gradient(155deg,#16161f,#0f0f18)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 24, padding: 34, minHeight: 380 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 50, height: 50, borderRadius: 14, background: "rgba(44,118,237,.14)", border: "1px solid rgba(44,118,237,.3)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--lime)", fontSize: 22 }}><i className={`fa-solid ${uc.icon}`} /></div>
              <div><div style={{ fontFamily: DISP, fontWeight: 600, fontSize: 22 }}>{uc.name}</div><div style={{ fontSize: 13, color: "var(--lime)" }}>{uc.kpi}</div></div>
            </div>
            <h3 style={{ fontFamily: DISP, fontWeight: 600, fontSize: 26, letterSpacing: "-.02em", margin: "26px 0 0", maxWidth: 560 }}>{uc.title}</h3>
            <p style={{ fontSize: 16, color: "#9594a6", lineHeight: 1.65, margin: "14px 0 0", maxWidth: 600 }}>{uc.body}</p>
            <div style={{ display: "flex", gap: 14, marginTop: 28, flexWrap: "wrap" }}>{uc.stats.map((st) => <div key={st.l} style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.09)", borderRadius: 16, padding: "16px 20px", minWidth: 130 }}><div style={{ fontFamily: DISP, fontWeight: 600, fontSize: 26, color: "#fff" }}>{st.v}</div><div style={{ fontSize: 13, color: "#9594a6", marginTop: 3 }}>{st.l}</div></div>)}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 9, marginTop: 24 }}>{uc.tags.map((tg) => <span key={tg} style={{ ...pill, color: "#c9c9d4" }}>{tg}</span>)}</div>
          </div>
        </div>
      </section>

      {/* INTEGRATIONS */}
      <section style={{ position: "relative", zIndex: 1, maxWidth: 1240, margin: "0 auto", padding: "30px 28px 90px" }}>
        <div className="int-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 50, alignItems: "center" }}>
          <div data-rv>
            <div style={eyebrow}>Integrations</div>
            <h2 style={{ ...h2, fontSize: "clamp(34px,4.2vw,48px)", lineHeight: 1.06 }}>Connects to your whole stack.</h2>
            <p style={{ fontSize: 17, color: "#9594a6", lineHeight: 1.65, margin: "18px 0 0", maxWidth: 440 }}>Native integrations with the tools that run your front desk — your agent reads and writes them live, mid-call, so calls turn into booked appointments and updated records automatically.</p>
          </div>
          <div data-rv style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12 }}>
            {INTEGRATIONS.map((ig) => <div key={ig} className="lift" style={{ background: "var(--surface)", border: "1px solid rgba(255,255,255,.09)", borderRadius: 14, padding: "18px 14px", textAlign: "center", fontSize: 14, fontWeight: 600, color: "#c9c9d4" }}>{ig}</div>)}
          </div>
        </div>
      </section>

      {/* BIG STATS */}
      <section ref={bigRef} style={{ position: "relative", zIndex: 1, maxWidth: 1240, margin: "0 auto", padding: "30px 28px 80px" }}>
        <div data-rv style={{ background: "linear-gradient(135deg,rgba(44,118,237,.08),rgba(157,139,255,.08))", border: "1px solid rgba(255,255,255,.1)", borderRadius: 26, padding: "50px 40px" }}>
          <div style={{ ...eyebrow, textAlign: "center" }}>By the numbers</div>
          <h2 style={{ fontFamily: DISP, fontWeight: 600, letterSpacing: "-.02em", fontSize: "clamp(28px,3.4vw,40px)", textAlign: "center", margin: "12px 0 0" }}>Talking at production scale.</h2>
          <div className="stat4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24, marginTop: 40 }}>
            {[[bigCalls, "Calls handled", "#fff"], [bigRes, "Resolution rate", "var(--lime)"], [bigLat, "Avg. response time", "var(--cyan)"], [bigCost, "Cost vs. live agents", "var(--violet)"]].map(([v, l, c], i) => (
              <div key={i} style={{ textAlign: "center" }}><div style={{ fontFamily: DISP, fontWeight: 600, fontSize: "clamp(38px,4.5vw,56px)", color: c as string }}>{v}</div><div style={{ fontSize: 14, color: "#9594a6", marginTop: 6 }}>{l}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ position: "relative", zIndex: 1, maxWidth: 1240, margin: "0 auto", padding: "30px 28px 90px" }}>
        <div data-rv style={eyebrow}>Early access</div>
        <h2 data-rv style={{ ...h2, maxWidth: 640, margin: "14px 0 12px" }}>What you get from day one.</h2>
        <p data-rv style={{ fontSize: 18, color: "#9594a6", maxWidth: 600, margin: "0 0 34px", lineHeight: 1.6 }}>hello22 is in early access. Here&apos;s exactly what your AI receptionist does the moment you go live — no inflated claims.</p>
        <div className="uc-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }}>
          {[
            { ic: "fa-phone-volume", t: "Answers every call", d: "24/7 — no missed calls, no hold music, no voicemail. Every caller gets a real, natural conversation.", bg: "rgba(44,118,237,.16)", c: "var(--lime)" },
            { ic: "fa-bolt", t: "Live in 22 minutes", d: "Describe your agent, connect your tools, pick a number. No code, no telephony setup, no flowcharts.", bg: "rgba(86,224,224,.16)", c: "var(--cyan)" },
            { ic: "fa-file-lines", t: "Every call captured", d: "Transcribed, summarised, and analysed automatically — delivered by SMS, WhatsApp, and email the moment the call ends.", bg: "rgba(157,139,255,.16)", c: "var(--violet)" },
          ].map((t) => (
            <div key={t.t} data-rv className="lift" style={{ ...card, padding: 28, display: "flex", flexDirection: "column" }}>
              <div style={{ width: 46, height: 46, borderRadius: 13, background: t.bg, color: t.c, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 19 }}><i className={`fa-solid ${t.ic}`} /></div>
              <h3 style={{ fontFamily: DISP, fontWeight: 600, fontSize: 19, margin: "18px 0 0" }}>{t.t}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: "#9594a6", margin: "10px 0 0" }}>{t.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ position: "relative", zIndex: 1, maxWidth: 1240, margin: "0 auto", padding: "30px 28px 90px", scrollMarginTop: 90 }}>
        <div data-rv style={{ textAlign: "center" }}>
          <div style={eyebrow}>Pricing</div>
          <h2 style={{ ...h2 }}>Simple plans. Cancel anytime.</h2>
          <p style={{ fontSize: 18, color: "#9594a6", margin: "16px auto 0", maxWidth: 520, lineHeight: 1.6 }}>No setup fees. No contracts. Pick a plan and go live today — secure checkout powered by Stripe.</p>
        </div>
        <div className="price-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18, marginTop: 42, alignItems: "start" }}>
          {PLANS.map((p) => (
            <div key={p.name} data-rv className={p.popular ? "" : "lift"} style={p.popular
              ? { position: "relative", background: "linear-gradient(160deg,rgba(44,118,237,.12),rgba(157,139,255,.08)),#12121d", border: "1px solid rgba(44,118,237,.4)", borderRadius: 24, padding: 30, boxShadow: "0 30px 70px -34px rgba(44,118,237,.5)" }
              : { ...card, borderRadius: 24, padding: 30 }}>
              {p.popular && <div style={{ position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)", background: "var(--lime)", color: "#fff", fontSize: 12, fontWeight: 800, padding: "5px 14px", borderRadius: 999, textTransform: "uppercase", letterSpacing: ".06em" }}>Most popular</div>}
              <div style={{ fontFamily: DISP, fontWeight: 600, fontSize: 20 }}>{p.name}</div>
              <div style={{ fontSize: 13, color: "#9594a6", marginTop: 4 }}>{p.blurb}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, margin: "22px 0 16px" }}><span style={{ fontFamily: DISP, fontWeight: 600, fontSize: 44, color: "#fff" }}>{p.price}</span><span style={{ fontSize: 15, color: "#9594a6" }}>/ month</span></div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 22 }}>
                {p.caps.map((c) => (
                  <span key={c.label} style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 12.5, fontWeight: 600, padding: "6px 11px", borderRadius: 999, background: c.blue ? "rgba(44,118,237,.14)" : "rgba(255,255,255,.05)", border: c.blue ? "1px solid rgba(44,118,237,.3)" : "1px solid rgba(255,255,255,.1)", color: c.blue ? "var(--lime)" : "#c9c9d4" }}><i className={c.icon} />{c.label}</span>
                ))}
              </div>
              <a href={APP_URL} target="_blank" rel="noopener noreferrer" className={p.popular ? "btnp" : ""} style={p.popular
                ? { display: "block", textAlign: "center", textDecoration: "none", margin: "0 0 22px", background: "var(--lime)", color: "#fff", fontWeight: 700, fontSize: 15, padding: 13, borderRadius: 12, boxShadow: "0 14px 30px -14px rgba(44,118,237,.7)" }
                : { display: "block", textAlign: "center", textDecoration: "none", margin: "0 0 22px", background: "rgba(255,255,255,.07)", color: "#f4f4f7", fontWeight: 600, fontSize: 15, padding: 13, borderRadius: 12, border: "1px solid rgba(255,255,255,.14)" }}>Get started</a>
              <div style={{ height: 1, background: "rgba(255,255,255,.08)", marginBottom: 18 }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {p.feats.map((f) => (
                  <div key={f.t} style={{ display: "flex", gap: 10, fontSize: 14, alignItems: "center", color: f.on ? "#e4e4ec" : "#6f6f80" }}>
                    <span style={{ width: 18, height: 18, flexShrink: 0, borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 9, background: f.on ? "rgba(44,118,237,.16)" : "rgba(255,255,255,.05)", color: f.on ? "var(--lime)" : "#6f6f80" }}><i className={`fa-solid ${f.on ? "fa-check" : "fa-xmark"}`} /></span>
                    <span style={{ textDecoration: f.on ? "none" : "line-through" }}>{f.t}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ position: "relative", zIndex: 1, maxWidth: 880, margin: "0 auto", padding: "30px 28px 90px", scrollMarginTop: 90 }}>
        <div data-rv style={{ textAlign: "center" }}>
          <div style={eyebrow}>FAQ</div>
          <h2 style={{ ...h2 }}>Frequently asked questions.</h2>
          <p style={{ fontSize: 18, color: "#9594a6", margin: "16px auto 0", maxWidth: 520, lineHeight: 1.6 }}>Everything you need to know about hello22. Can&apos;t find your answer? <a href={APP_URL} target="_blank" rel="noopener noreferrer" style={{ color: "var(--lime)", textDecoration: "none", fontWeight: 600 }}>Get in touch →</a></p>
        </div>
        <div data-rv style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 42 }}>
          {FAQS.map((f, i) => {
            const open = faqOpen === i;
            return (
              <div key={i} style={{ ...card, overflow: "hidden", borderColor: open ? "rgba(44,118,237,.35)" : "rgba(255,255,255,.09)", transition: "border-color .25s ease" }}>
                <button onClick={() => setFaqOpen(open ? null : i)} aria-expanded={open} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, width: "100%", textAlign: "left", cursor: "pointer", background: "transparent", border: "none", color: "#f4f4f7", fontFamily: "inherit", padding: "20px 24px" }}>
                  <span style={{ fontSize: 16.5, fontWeight: 600 }}>{f.q}</span>
                  <span style={{ flexShrink: 0, width: 28, height: 28, borderRadius: "50%", background: open ? "var(--lime)" : "rgba(255,255,255,.06)", border: open ? "none" : "1px solid rgba(255,255,255,.14)", color: open ? "#fff" : "#9594a6", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12, transition: "all .25s ease", transform: open ? "rotate(180deg)" : "none" }}><i className="fa-solid fa-chevron-down" /></span>
                </button>
                <div style={{ display: "grid", gridTemplateRows: open ? "1fr" : "0fr", transition: "grid-template-rows .3s ease" }}>
                  <div style={{ overflow: "hidden" }}>
                    <div style={{ padding: "0 24px 22px" }}>{renderAnswer(f.a)}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="cta" style={{ position: "relative", zIndex: 1, maxWidth: 1240, margin: "0 auto", padding: "30px 28px 90px", scrollMarginTop: 90 }}>
        <div data-rv style={{ position: "relative", overflow: "hidden", background: "linear-gradient(150deg,#14141f,#0c0c15)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 30, padding: "70px 40px", textAlign: "center" }}>
          <div style={{ position: "absolute", top: -120, left: "50%", transform: "translateX(-50%)", width: 520, height: 340, background: "radial-gradient(circle,rgba(44,118,237,.18),transparent 70%)", filter: "blur(20px)", pointerEvents: "none", animation: "h22glowpulse 5.5s ease-in-out infinite" }} />
          <h2 style={{ position: "relative", fontFamily: DISP, fontWeight: 600, letterSpacing: "-.04em", fontSize: "clamp(48px,7vw,92px)", lineHeight: .95, margin: 0 }}>say hello<span style={{ color: "var(--lime)" }}>.</span></h2>
          <p style={{ position: "relative", fontFamily: DISP, fontSize: "clamp(20px,2.4vw,28px)", fontWeight: 500, color: "#e4e4ec", margin: "12px 0 0" }}>to your new voice agent.</p>
          <p style={{ position: "relative", fontSize: 17, color: "#9594a6", maxWidth: 480, margin: "20px auto 0", lineHeight: 1.6 }}>Deploy your first voice agent in 22 minutes. 1,000 free minutes — no credit card required.</p>
          <div style={{ position: "relative", display: "flex", gap: 14, justifyContent: "center", marginTop: 30, flexWrap: "wrap" }}>
            <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="btnp" style={{ textDecoration: "none", background: "var(--lime)", color: "#fff", fontWeight: 700, fontSize: 16, padding: "16px 28px", borderRadius: 999, boxShadow: "0 16px 38px -14px rgba(44,118,237,.7)" }}>Start free trial</a>
            <a href={APP_URL} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", background: "rgba(255,255,255,.06)", color: "#f4f4f7", fontWeight: 600, fontSize: 16, padding: "16px 26px", borderRadius: 999, border: "1px solid rgba(255,255,255,.14)" }}>Book a live demo</a>
          </div>
          <div style={{ position: "relative", display: "flex", gap: 24, justifyContent: "center", marginTop: 28, flexWrap: "wrap", fontSize: 13.5, color: "#9594a6" }}>
            {["No credit card", "1,000 free minutes", "SOC 2 compliant"].map((x) => <span key={x} style={{ display: "inline-flex", alignItems: "center", gap: 7 }}><span style={{ color: "var(--lime)" }}><i className="fa-solid fa-check" /></span>{x}</span>)}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,.08)", background: "#090910" }}>
        <div className="footer-grid" style={{ maxWidth: 1240, margin: "0 auto", padding: "60px 28px 30px", display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr 1fr", gap: 40 }}>
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}<img src={LOGO} alt="hello22.ai" style={{ height: 28, width: "auto", display: "block" }} />
            <p style={{ fontSize: 14.5, color: "#9594a6", lineHeight: 1.6, margin: "18px 0 0", maxWidth: 260 }}>A native AI voice receptionist that answers every call, books every appointment, and sounds unmistakably human — built for teams who never want to miss a customer.</p>
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>{[
              { ic: "fa-facebook-f", href: "https://www.facebook.com/hello22ai" },
              { ic: "fa-instagram", href: "https://www.instagram.com/hello22.ai" },
              { ic: "fa-pinterest-p", href: "https://www.pinterest.com/hello22_ai" },
              { ic: "fa-linkedin-in", href: "https://www.linkedin.com/company/hello22-ai" },
              { ic: "fa-x-twitter", href: null },
              { ic: "fa-youtube", href: null },
            ].map((s) => {
              const st: React.CSSProperties = { width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#9594a6", fontSize: 14, cursor: "pointer", textDecoration: "none" };
              return s.href
                ? <a key={s.ic} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.ic} style={st}><i className={`fa-brands ${s.ic}`} /></a>
                : <span key={s.ic} style={st}><i className={`fa-brands ${s.ic}`} /></span>;
            })}</div>
          </div>
          {[
            { t: "Product", l: ["Features", "Voices", "Integrations", "Pricing", "Live demo"] },
            { t: "Solutions", l: ["Healthcare", "E-commerce", "Real estate", "Hospitality", "Logistics"] },
            { t: "Developers", l: ["Documentation", "API reference", "Webhooks", "Status", "System status"] },
            { t: "Company", l: ["About", "Customers", "Careers", "Blog", "Contact"] },
          ].map((col) => (
            <div key={col.t}>
              <div style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "#6f6f80", marginBottom: 16 }}>{col.t}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 11, fontSize: 14.5 }}>{col.l.map((l) => <a key={l} className="nl" href="#">{l}</a>)}</div>
            </div>
          ))}
        </div>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "24px 28px", borderTop: "1px solid rgba(255,255,255,.07)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
          <span style={{ fontSize: 13.5, color: "#6f6f80" }}>© 2026 hello22.ai</span>
          <div style={{ display: "flex", gap: 20, fontSize: 13.5, flexWrap: "wrap" }}>{["Privacy", "Terms", "Security", "DPA"].map((l) => <a key={l} className="nl" href="#">{l}</a>)}</div>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "#9594a6" }}><span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--lime)", animation: "h22pulse 1.6s infinite" }} />All systems operational</span>
        </div>
      </footer>

      {/* LIGHTBOX */}
      {lightbox && (
        <div onClick={() => setLightbox(null)} style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(5,5,10,.88)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 28, cursor: "zoom-out" }}>
          <button onClick={() => setLightbox(null)} aria-label="Close" style={{ position: "absolute", top: 22, right: 26, width: 42, height: 42, borderRadius: "50%", background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.18)", color: "#fff", fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><i className="fa-solid fa-xmark" /></button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={lightbox} alt="Product screenshot" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "94vw", maxHeight: "90vh", width: "auto", height: "auto", borderRadius: 12, border: "1px solid rgba(255,255,255,.14)", boxShadow: "0 40px 100px -30px rgba(0,0,0,.9)", cursor: "default" }} />
        </div>
      )}
    </div>
  );
}
