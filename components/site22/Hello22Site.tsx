"use client";

import { Manrope, Space_Grotesk } from "next/font/google";
import { useEffect, useRef, useState } from "react";

const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-manrope", display: "swap" });
const space = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-space", display: "swap" });

const DISP = "var(--font-space), 'Space Grotesk', sans-serif";
const LOGO = "/hello22-logo.png";
const APP_URL = "https://agent.hello22.ai";
// Web3Forms key — demo-form submissions email to connect@hello22.ai. Client-safe by design.
const WEB3FORMS_ACCESS_KEY = "42827426-7f8f-4a99-98a9-7aabe3ed8000";

const GREETS = ["hello"];

const TRUST = [
  { name: "Twilio", src: "/images/logos/color/twilio.svg" },
  { name: "Stripe", src: "/images/logos/color/stripe.svg" },
  { name: "AWS", src: "/images/logos/color/aws.svg" },
  { name: "Google Calendar", src: "/images/logos/color/google-calendar.svg" },
  { name: "ElevenLabs", src: "/images/logos/white/elevenlabs.svg" },
  { name: "OpenAI", src: "/images/logos/white/openai.svg" },
  { name: "Anthropic", src: "/images/logos/white/anthropic.svg" },
  { name: "WhatsApp", src: "/images/logos/color/whatsapp.svg" },
];

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
  { name: "HVAC Business", icon: "fa-fan", kpi: "4m 12s avg call duration", title: "Never miss another emergency service call.", body: "Answer every incoming call, schedule installations, book repair appointments, qualify emergency requests, and dispatch technicians instantly — 24/7, even after business hours.", stats: [{ v: "4m 12s", l: "Avg call" }, { v: "91%", l: "Appointments booked" }, { v: "4.9/5", l: "Customer satisfaction" }], tags: ["Emergency Dispatch", "Maintenance Booking", "Service Scheduling", "Quote Requests"] },
  { name: "Cleaning Business", icon: "fa-broom", kpi: "2m 56s avg call duration", title: "Book more cleaning jobs without hiring more staff.", body: "Capture every enquiry, schedule residential and commercial cleaning, provide instant quotes, answer common questions, and send confirmations automatically.", stats: [{ v: "2m 56s", l: "Avg call" }, { v: "89%", l: "Leads captured" }, { v: "4.8/5", l: "Customer rating" }], tags: ["Instant Quotes", "Recurring Cleaning", "Booking Confirmation", "Lead Qualification"] },
  { name: "Electrical Services", icon: "fa-bolt", kpi: "3m 28s avg call duration", title: "Every urgent electrical call answered instantly.", body: "Handle emergency service requests, schedule inspections, qualify electrical issues, route priority jobs, and keep customers informed without missing a single call.", stats: [{ v: "3m 28s", l: "Avg call" }, { v: "93%", l: "Calls answered" }, { v: "4.9/5", l: "Customer satisfaction" }], tags: ["Emergency Callouts", "Inspection Booking", "Service Dispatch", "Customer Updates"] },
  { name: "Plumbing Business", icon: "fa-faucet-drip", kpi: "3m 47s avg call duration", title: "Turn plumbing emergencies into booked jobs automatically.", body: "Answer urgent plumbing enquiries, schedule repairs, prioritize emergency leaks, collect customer details, and dispatch technicians immediately.", stats: [{ v: "3m 47s", l: "Avg call" }, { v: "95%", l: "Jobs scheduled" }, { v: "4.9/5", l: "Customer rating" }], tags: ["Emergency Plumbing", "Leak Detection", "Appointment Booking", "Technician Dispatch"] },
  { name: "Painting Services", icon: "fa-paint-roller", kpi: "3m 05s avg call duration", title: "Convert more quote requests into paying customers.", body: "Qualify painting enquiries, collect project details, schedule site inspections, send estimates, and book consultations automatically with every incoming call.", stats: [{ v: "3m 05s", l: "Avg call" }, { v: "88%", l: "Quotes booked" }, { v: "4.8/5", l: "Client satisfaction" }], tags: ["Quote Requests", "Site Visits", "Residential Painting", "Commercial Projects"] },
  { name: "Flooring Services", icon: "fa-ruler-combined", kpi: "3m 34s avg call duration", title: "Capture every flooring enquiry before your competitors do.", body: "Book flooring consultations, collect room measurements, answer product questions, schedule on-site estimates, and follow up automatically with potential customers.", stats: [{ v: "3m 34s", l: "Avg call" }, { v: "90%", l: "Consultations booked" }, { v: "4.9/5", l: "Customer satisfaction" }], tags: ["Floor Estimates", "Installation Booking", "Product Enquiries", "Site Measurement"] },
];

// Orbital integrations diagram — logos orbit the hello22 core.
type Orb = { src?: string; more?: boolean; label?: string; name: string; r: number; a: number; size: number };
const ORBIT: Orb[] = [
  { src: "/images/logos/color/google-calendar.svg", name: "Google Calendar", r: 175, a: -90, size: 56 },
  { src: "/images/logos/color/stripe.svg", name: "Stripe", r: 175, a: -30, size: 56 },
  { src: "/images/logos/color/openai.svg", name: "OpenAI", r: 175, a: 30, size: 56 },
  { src: "/images/logos/color/whatsapp.svg", name: "WhatsApp", r: 175, a: 90, size: 56 },
  { src: "/images/logos/color/anthropic.svg", name: "Anthropic", r: 175, a: 150, size: 56 },
  { more: true, name: "More integrations", r: 175, a: 210, size: 52 },
  { src: "/images/logos/color/twilio.svg", name: "Twilio", r: 98, a: -45, size: 50 },
  { src: "/images/logos/color/aws.svg", name: "AWS", r: 98, a: 45, size: 50 },
  { src: "/images/logos/color/elevenlabs.svg", name: "ElevenLabs", r: 98, a: 135, size: 50 },
  { label: "Perfex", name: "Perfex CRM", r: 98, a: 225, size: 54 },
];

type Line = { role: "caller" | "agent"; name: string; text: string };
const TRANSCRIPT: Line[] = [
  { role: "caller", name: "Megan Lee", text: "Hi, I'd like to book an appointment for this Friday." },
  { role: "agent", name: "Sarah · hello22", text: "Of course! What time works best? We have openings at 7 PM or 9 PM." },
  { role: "caller", name: "Megan Lee", text: "7 PM sounds perfect." },
  { role: "agent", name: "Sarah · hello22", text: "Great — I've noted 7 PM this Friday. Can I get a name for the booking?" },
  { role: "caller", name: "Megan Lee", text: "Megan Lee. L-E-E." },
  { role: "agent", name: "Sarah · hello22", text: "Booked! 7 PM Friday under Megan Lee. You'll get a confirmation text shortly. Anything else?" },
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
@keyframes h22spin{to{transform:rotate(360deg)}}
@keyframes h22spinr{to{transform:rotate(-360deg)}}
.h22 [data-rv]{opacity:0;transform:translateY(34px) scale(.985);transition:opacity .7s cubic-bezier(.2,.7,.2,1),transform .75s cubic-bezier(.2,.7,.2,1)}
.h22 [data-rv].in{opacity:1;transform:none}
.h22marquee:hover{animation-play-state:paused}
.h22 a.nl{color:#c9c9d4;text-decoration:none}.h22 a.nl:hover{color:#fff}
.h22 .lift{transition:transform .3s cubic-bezier(.2,.7,.2,1),box-shadow .3s ease,border-color .3s}
.h22 .lift:hover{transform:translateY(-7px);box-shadow:0 30px 64px -32px rgba(0,0,0,.85)}
.h22 .btnp:hover{transform:translateY(-2px)}
@media(max-width:920px){
 .h22 .nav-links{display:none!important}
 .h22 .hero-grid,.h22 .demo-grid,.h22 .uc-grid,.h22 .int-grid,.h22 .price-grid,.h22 .shots-grid,.h22 .cta-grid{grid-template-columns:1fr!important}
 .h22 .feat-grid{grid-template-columns:1fr 1fr!important}
 .h22 .feat-grid>div{grid-column:auto!important}
 .h22 .tcol{grid-column:span 2!important}
 .h22 .footer-grid{grid-template-columns:1fr 1fr!important}
}
@media(max-width:620px){.h22 .voices-grid,.h22 .feat-grid,.h22 .stat4,.h22 .tcol{grid-template-columns:1fr!important}}
@media(max-width:560px){.h22 .orbit{transform:scale(.74)}}
@media(prefers-reduced-motion:reduce){.h22 .orbit-spin,.h22 .orbit-spin *{animation:none!important}}
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

// Scroll parallax: translates the element on Y as it moves through the viewport.
function useParallax<T extends HTMLElement>(speed: number) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const prog = (rect.top + rect.height / 2 - vh / 2) / vh; // ~ -1 (below) .. +1 (above)
      el.style.transform = `translate3d(0, ${(prog * speed).toFixed(1)}px, 0)`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, [speed]);
  return ref;
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


export default function Hello22Site() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [greet, setGreet] = useState(0);
  const [voice, setVoice] = useState(0);
  const [useCase, setUseCase] = useState(0);
  const [demoPlaying, setDemoPlaying] = useState(false);
  const [demoStarted, setDemoStarted] = useState(false);
  const [demoStep, setDemoStep] = useState(0);
  const demoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);
  const [playingVoice, setPlayingVoice] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const ucListRef = useParallax<HTMLDivElement>(34);
  const ucCardRef = useParallax<HTMLDivElement>(-34);
  const [demoStatus, setDemoStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");

  async function submitDemo(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setDemoStatus("sending");
    try {
      const data = new FormData(form);
      data.append("access_key", WEB3FORMS_ACCESS_KEY);
      data.append("subject", "New demo request — hello22.ai");
      data.append("from_name", "hello22.ai website");
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: data });
      const json = await res.json();
      if (json.success) { setDemoStatus("ok"); form.reset(); }
      else setDemoStatus("err");
    } catch {
      setDemoStatus("err");
    }
  }
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

  // speech voices
  useEffect(() => {
    if (!("speechSynthesis" in window)) return;
    const load = () => (voicesRef.current = window.speechSynthesis.getVoices() || []);
    load();
    window.speechSynthesis.addEventListener("voiceschanged", load);
    return () => { window.speechSynthesis.removeEventListener("voiceschanged", load); window.speechSynthesis.cancel(); };
  }, []);

  // hero counters

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
  const inp: React.CSSProperties = { width: "100%", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 10, padding: "12px 14px", color: "#f4f4f7", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" };
  const opt: React.CSSProperties = { background: "#12121d", color: "#f4f4f7" };

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
            {["Demo", "Product", "Voices", "Features", "Industries", "Pricing", "FAQ"].map((l) => (
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
            <p data-rv style={{ fontSize: 18, lineHeight: 1.6, color: "#9594a6", maxWidth: 520, margin: "20px 0 0" }}>hello22 answers every call, books appointments, qualifies leads, and resolves questions — sounding natural and human, in English, 24/7.</p>
            <div data-rv style={{ display: "flex", gap: 14, marginTop: 32, flexWrap: "wrap" }}>
              <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="btnp" style={{ textDecoration: "none", background: "var(--lime)", color: "#fff", fontWeight: 700, fontSize: 16, padding: "16px 26px", borderRadius: 999, boxShadow: "0 16px 38px -14px rgba(44,118,237,.7)" }}>Start free — setup in minutes</a>
              <a href="#demo" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,.06)", color: "#f4f4f7", fontWeight: 600, fontSize: 16, padding: "16px 24px", borderRadius: 999, border: "1px solid rgba(255,255,255,.14)" }}>
                <span style={{ display: "inline-flex", width: 22, height: 22, borderRadius: "50%", background: "var(--lime)", color: "#fff", alignItems: "center", justifyContent: "center", fontSize: 10 }}><i className="fa-solid fa-play" /></span>Hear a live call
              </a>
            </div>
            <div data-rv style={{ display: "flex", gap: 20, marginTop: 28, flexWrap: "wrap", fontSize: 13.5, color: "#9594a6" }}>
              {["24/7", "Every call answered", "Natural English voice", "Live in minutes"].map((x) => <span key={x} style={{ display: "inline-flex", alignItems: "center", gap: 7 }}><span style={{ color: "var(--lime)" }}><i className="fa-solid fa-check" /></span>{x}</span>)}
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
                <span style={{ fontSize: 12, fontWeight: 600, padding: "7px 12px", borderRadius: 9, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)" }}>EN</span>
                <span style={{ fontSize: 12, fontWeight: 600, padding: "7px 12px", borderRadius: 9, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)" }}>Voice: Sarah</span>
              </div>
              <div style={{ marginTop: 18, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,.08)", display: "flex", alignItems: "center", justifyContent: "space-between" }}><span style={{ fontSize: 13, color: "#9594a6" }}>Intent</span><span style={{ fontFamily: DISP, fontSize: 16, fontWeight: 600, color: "var(--lime)" }}>Book appointment</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST MARQUEE */}
      <section style={{ position: "relative", zIndex: 1, padding: "34px 0 14px" }}>
        <p style={{ textAlign: "center", fontSize: 13, letterSpacing: ".16em", textTransform: "uppercase", color: "#6f6f80", margin: "0 0 26px" }}>Built on best-in-class voice & infrastructure</p>
        <div style={{ position: "relative", overflow: "hidden", WebkitMaskImage: "linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)", maskImage: "linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)" }}>
          <div className="h22marquee" style={{ display: "flex", gap: 60, width: "max-content", animation: "h22marq 32s linear infinite", paddingRight: 60 }}>
            {[...TRUST, ...TRUST].map((t, i) => (
              <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 11, whiteSpace: "nowrap" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={t.src} alt={t.name} style={{ height: 26, width: "auto" }} />
                <span style={{ fontFamily: DISP, fontSize: 19, fontWeight: 600, color: "#7d7d8f", letterSpacing: "-.01em" }}>{t.name}</span>
              </span>
            ))}
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
                <div><div style={{ fontWeight: 700, fontSize: 14 }}>Acme Dental · New booking</div><div style={{ fontSize: 12, color: "#9594a6", fontVariantNumeric: "tabular-nums" }}>{demoTime} · EN</div></div>
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
            <div style={{ ...card, borderRadius: 18, padding: 18 }}><div style={{ fontSize: 12, color: "#9594a6", textTransform: "uppercase", letterSpacing: ".1em" }}>Intent</div><div style={{ fontFamily: DISP, fontWeight: 600, fontSize: 19, marginTop: 6 }}>Book appointment</div></div>
            <div style={{ ...card, borderRadius: 18, padding: 18 }}><div style={{ fontSize: 12, color: "#9594a6", textTransform: "uppercase", letterSpacing: ".1em" }}>Sentiment</div><div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}><span style={{ width: 9, height: 9, borderRadius: "50%", background: "var(--cyan)" }} /><span style={{ fontFamily: DISP, fontWeight: 600, fontSize: 19, color: "var(--cyan)" }}>Positive</span></div></div>
            <div style={{ ...card, borderRadius: 18, padding: 18 }}><div style={{ fontSize: 12, color: "#9594a6", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 12 }}>Live actions</div>{["Booking captured", "SMS confirmation sent", "Summary delivered"].map((a) => <div key={a} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, marginBottom: 10 }}><span style={{ width: 18, height: 18, borderRadius: "50%", background: "var(--lime)", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 9 }}><i className="fa-solid fa-check" /></span>{a}</div>)}</div>
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
        <p data-rv style={{ fontSize: 18, color: "#9594a6", maxWidth: 640, margin: "18px 0 0", lineHeight: 1.6 }}>A curated library of studio-grade English voices. Preview any voice free, then go live in one click.</p>
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
          <p style={{ fontSize: 13, color: "#6f6f80", margin: 0 }}>Preview voices may sound lighter than the production voice engine.</p>
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
            <p style={{ fontSize: 15.5, color: "#9594a6", lineHeight: 1.6, margin: "12px 0 0", maxWidth: 520 }}>Responds to what the caller actually says and keeps track of the conversation as it goes — holding context across the whole call.</p>
          </div>
          <div data-rv className="lift" style={{ ...card, padding: 28 }}><div style={featIcon("rgba(157,139,255,.16)", "rgba(157,139,255,.32)", "var(--violet)")}><i className="fa-solid fa-microphone-lines" /></div><h3 style={{ fontFamily: DISP, fontWeight: 600, fontSize: 20, margin: "16px 0 0" }}>Studio voices</h3><p style={{ fontSize: 14.5, color: "#9594a6", lineHeight: 1.6, margin: "10px 0 0" }}>Choose from a library of studio-grade English voices to match your brand.</p></div>
          <div data-rv className="lift" style={{ ...card, padding: 28 }}><div style={featIcon("rgba(86,224,224,.14)", "rgba(86,224,224,.3)", "var(--cyan)")}><i className="fa-solid fa-language" /></div><h3 style={{ fontFamily: DISP, fontWeight: 600, fontSize: 20, margin: "16px 0 0" }}>English today — more coming</h3><p style={{ fontSize: 14.5, color: "#9594a6", lineHeight: 1.6, margin: "10px 0 0" }}>Answers in natural English now, with more languages on the roadmap.</p></div>
          <div data-rv className="lift" style={{ ...card, padding: 28 }}><div style={featIcon("rgba(44,118,237,.12)", "rgba(44,118,237,.28)", "var(--lime)")}><i className="fa-solid fa-wand-magic-sparkles" /></div><h3 style={{ fontFamily: DISP, fontWeight: 600, fontSize: 20, margin: "16px 0 0" }}>Post-call automations</h3><p style={{ fontSize: 14.5, color: "#9594a6", lineHeight: 1.6, margin: "10px 0 0" }}>After every call, details are captured and pushed to your inbox, CRM, and notifications automatically.</p></div>
          <div data-rv className="lift" style={{ ...card, padding: 28 }}><div style={featIcon("rgba(157,139,255,.16)", "rgba(157,139,255,.32)", "var(--violet)")}><i className="fa-solid fa-shield-halved" /></div><h3 style={{ fontFamily: DISP, fontWeight: 600, fontSize: 20, margin: "16px 0 0" }}>Your data, protected</h3><p style={{ fontSize: 14.5, color: "#9594a6", lineHeight: 1.6, margin: "10px 0 0" }}>Encrypted in transit, secrets encrypted at rest, and never sold.</p></div>
          <div data-rv className="lift" style={{ gridColumn: "span 2", background: "linear-gradient(150deg,#16161f,#101019)", border: "1px solid rgba(255,255,255,.09)", borderRadius: 22, padding: 30 }}>
            <div style={featIcon("rgba(86,224,224,.14)", "rgba(86,224,224,.3)", "var(--cyan)")}><i className="fa-solid fa-chart-line" /></div>
            <h3 style={{ fontFamily: DISP, fontWeight: 600, fontSize: 24, margin: "18px 0 0" }}>Call analytics &amp; transcripts</h3>
            <p style={{ fontSize: 15.5, color: "#9594a6", lineHeight: 1.6, margin: "12px 0 0", maxWidth: 520 }}>Every call transcribed, summarised, and tagged with intent and sentiment — the summary delivered by email, SMS, and WhatsApp after the call.</p>
          </div>
          <div data-rv className="lift" style={{ ...card, padding: 28 }}><div style={featIcon("rgba(44,118,237,.12)", "rgba(44,118,237,.28)", "var(--lime)")}><i className="fa-solid fa-arrows-rotate" /></div><h3 style={{ fontFamily: DISP, fontWeight: 600, fontSize: 20, margin: "16px 0 0" }}>CRM &amp; Calendar</h3><p style={{ fontSize: 14.5, color: "#9594a6", lineHeight: 1.6, margin: "10px 0 0" }}>Connect Google Calendar and push leads to Perfex CRM or any webhook.</p></div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ position: "relative", zIndex: 1, maxWidth: 1240, margin: "0 auto", padding: "30px 28px 90px" }}>
        <div data-rv style={eyebrow}>How it works</div>
        <h2 data-rv style={{ ...h2, maxWidth: 640 }}>Set up, sign up, go live — with hello22.</h2>
        <p data-rv style={{ fontSize: 18, color: "#9594a6", maxWidth: 600, margin: "18px 0 0", lineHeight: 1.6 }}>No code, no telephony setup, no flowcharts. Sarah walks you through every step — confirm your business, create your account, and take your first real call.</p>
        <div className="uc-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18, marginTop: 42 }}>
          {[
            { n: "01", c: "var(--lime)", t: "Set up", h: "Sarah builds your agent", d: "hello22 finds your business and sets up your AI receptionist with you — just review the details and confirm.", img: "/images/screenshots/step-1.png" },
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
      <section id="industries" style={{ position: "relative", zIndex: 1, maxWidth: 1240, margin: "0 auto", padding: "30px 28px 90px", scrollMarginTop: 90 }}>
        <div data-rv style={eyebrow}>Industries</div>
        <h2 data-rv style={{ ...h2, maxWidth: 640 }}>Built for the trades that run on phone calls.</h2>
        <p data-rv style={{ fontSize: 18, color: "#9594a6", maxWidth: 640, margin: "18px 0 0", lineHeight: 1.6 }}>It&apos;s the same hello22 agent — you just configure it for your business in the AI Brain. No separate setup per industry.</p>
        <div className="uc-grid" style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 24, marginTop: 40, alignItems: "start" }}>
          <div ref={ucListRef} style={{ willChange: "transform" }}>
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
          </div>
          <div ref={ucCardRef} style={{ willChange: "transform" }}>
          <div data-rv style={{ background: "linear-gradient(155deg,#16161f,#0f0f18)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 24, padding: 34, minHeight: 380 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 50, height: 50, borderRadius: 14, background: "rgba(44,118,237,.14)", border: "1px solid rgba(44,118,237,.3)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--lime)", fontSize: 22 }}><i className={`fa-solid ${uc.icon}`} /></div>
              <div><div style={{ fontFamily: DISP, fontWeight: 600, fontSize: 22 }}>{uc.name}</div><div style={{ fontSize: 13, color: "var(--lime)" }}>Configured in your AI Brain</div></div>
            </div>
            <h3 style={{ fontFamily: DISP, fontWeight: 600, fontSize: 26, letterSpacing: "-.02em", margin: "26px 0 0", maxWidth: 560 }}>{uc.title}</h3>
            <p style={{ fontSize: 16, color: "#9594a6", lineHeight: 1.65, margin: "14px 0 0", maxWidth: 600 }}>{uc.body}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 9, marginTop: 28 }}>{uc.tags.map((tg) => <span key={tg} style={{ ...pill, color: "#c9c9d4" }}>{tg}</span>)}</div>
          </div>
          </div>
        </div>
      </section>

      {/* INTEGRATIONS */}
      <section style={{ position: "relative", zIndex: 1, maxWidth: 1240, margin: "0 auto", padding: "30px 28px 90px" }}>
        <div className="int-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 50, alignItems: "center" }}>
          <div data-rv>
            <div style={eyebrow}>Integrations</div>
            <h2 style={{ ...h2, fontSize: "clamp(34px,4.2vw,48px)", lineHeight: 1.06 }}>Connects to your stack.</h2>
            <p style={{ fontSize: 17, color: "#9594a6", lineHeight: 1.65, margin: "18px 0 0", maxWidth: 440 }}>Google Calendar for booking, Perfex CRM or any webhook for leads, and the voice &amp; AI infrastructure behind every call — so conversations turn into booked appointments and updated records automatically.</p>
          </div>
          <div data-rv style={{ display: "flex", justifyContent: "center" }}>
            <div className="orbit" style={{ position: "relative", width: 420, height: 420, flexShrink: 0 }}>
              {/* ambient glow */}
              <div style={{ position: "absolute", left: "50%", top: "50%", width: 240, height: 240, transform: "translate(-50%,-50%)", borderRadius: "50%", background: "radial-gradient(circle,rgba(44,118,237,.20),transparent 70%)", filter: "blur(14px)", pointerEvents: "none" }} />
              {/* orbit rings */}
              {[98, 175].map((r) => <div key={r} style={{ position: "absolute", left: 210 - r, top: 210 - r, width: r * 2, height: r * 2, borderRadius: "50%", border: "1px solid rgba(255,255,255,.07)" }} />)}
              {/* spinning badges */}
              <div className="orbit-spin" style={{ position: "absolute", inset: 0, animation: "h22spin 50s linear infinite" }}>
                {ORBIT.map((b, i) => {
                  const rad = (b.a * Math.PI) / 180;
                  const cx = 210 + b.r * Math.cos(rad);
                  const cy = 210 + b.r * Math.sin(rad);
                  return (
                    <div key={i} style={{ position: "absolute", left: cx - b.size / 2, top: cy - b.size / 2, width: b.size, height: b.size }}>
                      <div title={b.name} style={{ width: "100%", height: "100%", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", animation: "h22spinr 50s linear infinite", background: b.more || b.label ? "#16161f" : "#fff", border: b.more || b.label ? "1px solid rgba(255,255,255,.14)" : "1px solid rgba(255,255,255,.6)", boxShadow: "0 12px 28px -12px rgba(0,0,0,.7)", color: "#9594a6" }}>
                        {b.more
                          ? <i className="fa-solid fa-ellipsis" style={{ fontSize: 18 }} />
                          : b.label
                          ? <span style={{ fontSize: 11.5, fontWeight: 700, color: "#d6d6e0" }}>{b.label}</span>
                          /* eslint-disable-next-line @next/next/no-img-element */
                          : <img src={b.src} alt={b.name} style={{ width: "54%", height: "54%", objectFit: "contain" }} />}
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* center core */}
              <div style={{ position: "absolute", left: 210 - 56, top: 210 - 56, width: 112, height: 112, borderRadius: "50%", background: "radial-gradient(circle at 50% 32%,#1c1c2c,#0c0c15)", border: "1px solid rgba(44,118,237,.45)", boxShadow: "0 0 0 8px rgba(44,118,237,.06), 0 24px 56px -20px rgba(44,118,237,.6)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                <div style={{ fontFamily: DISP, fontWeight: 700, fontSize: 24, letterSpacing: "-.02em" }}>hello<span style={{ color: "var(--lime)" }}>22</span></div>
                <div style={{ fontSize: 10, color: "#9594a6", letterSpacing: ".06em", marginTop: 3, textTransform: "uppercase" }}>AI Receptionist</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUE BAND */}
      <section style={{ position: "relative", zIndex: 1, maxWidth: 1240, margin: "0 auto", padding: "30px 28px 80px" }}>
        <div data-rv style={{ position: "relative", overflow: "hidden", background: "linear-gradient(135deg,rgba(44,118,237,.08),rgba(157,139,255,.08))", border: "1px solid rgba(255,255,255,.1)", borderRadius: 26, padding: "56px 40px", textAlign: "center" }}>
          <div style={{ ...eyebrow }}>Why hello22</div>
          <h2 style={{ fontFamily: DISP, fontWeight: 600, letterSpacing: "-.02em", fontSize: "clamp(30px,3.8vw,46px)", margin: "12px 0 0", maxWidth: 760, marginLeft: "auto", marginRight: "auto" }}>Every missed call is a missed customer.</h2>
          <p style={{ fontSize: 17, color: "#9594a6", maxWidth: 560, margin: "16px auto 0", lineHeight: 1.6 }}>hello22 picks up every time — turning your phone into booked jobs, captured leads, and happy callers instead of voicemail.</p>
          <div className="stat4" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18, marginTop: 40, maxWidth: 820, marginLeft: "auto", marginRight: "auto" }}>
            {[
              { ic: "fa-phone-volume", t: "Answers 24/7", d: "Never sends a caller to voicemail again — day, night, weekends, holidays." },
              { ic: "fa-calendar-check", t: "Books jobs live", d: "Schedules appointments and captures leads right on the call, hands-free." },
              { ic: "fa-comment-dots", t: "Summary every call", d: "Texts and emails you the caller's details and a summary the moment they hang up." },
            ].map((x) => (
              <div key={x.t} style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.09)", borderRadius: 18, padding: "26px 22px" }}>
                <div style={{ width: 46, height: 46, margin: "0 auto", borderRadius: 13, background: "rgba(44,118,237,.14)", border: "1px solid rgba(44,118,237,.3)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--lime)", fontSize: 18 }}><i className={`fa-solid ${x.ic}`} /></div>
                <div style={{ fontFamily: DISP, fontWeight: 600, fontSize: 18, marginTop: 16 }}>{x.t}</div>
                <p style={{ fontSize: 14, color: "#9594a6", lineHeight: 1.55, margin: "8px 0 0" }}>{x.d}</p>
              </div>
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
            { ic: "fa-bolt", t: "Live in minutes", d: "Describe your agent, connect your tools, pick a number. No code, no telephony setup, no flowcharts.", bg: "rgba(86,224,224,.16)", c: "var(--cyan)" },
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
        <div data-rv style={{ position: "relative", overflow: "hidden", background: "linear-gradient(150deg,#14141f,#0c0c15)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 30, padding: "56px 48px" }}>
          <div style={{ position: "absolute", top: -120, left: "20%", width: 520, height: 340, background: "radial-gradient(circle,rgba(44,118,237,.18),transparent 70%)", filter: "blur(20px)", pointerEvents: "none", animation: "h22glowpulse 5.5s ease-in-out infinite" }} />
          <div className="cta-grid" style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
            {/* LEFT — say hello */}
            <div>
              <h2 style={{ fontFamily: DISP, fontWeight: 600, letterSpacing: "-.04em", fontSize: "clamp(44px,6vw,80px)", lineHeight: .95, margin: 0 }}>say hello<span style={{ color: "var(--lime)" }}>.</span></h2>
              <p style={{ fontFamily: DISP, fontSize: "clamp(20px,2.2vw,26px)", fontWeight: 500, color: "#e4e4ec", margin: "12px 0 0" }}>to your new voice agent.</p>
              <p style={{ fontSize: 17, color: "#9594a6", maxWidth: 440, margin: "20px 0 0", lineHeight: 1.6 }}>Deploy your first voice agent in minutes. 10 free minutes to test it — a card is required to activate your trial.</p>
              <div style={{ display: "flex", gap: 14, marginTop: 30, flexWrap: "wrap" }}>
                <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="btnp" style={{ textDecoration: "none", background: "var(--lime)", color: "#fff", fontWeight: 700, fontSize: 16, padding: "15px 26px", borderRadius: 999, boxShadow: "0 16px 38px -14px rgba(44,118,237,.7)" }}>Start free trial</a>
              </div>
              <div style={{ display: "flex", gap: 22, marginTop: 26, flexWrap: "wrap", fontSize: 13.5, color: "#9594a6" }}>
                {["10 free minutes", "Cancel anytime", "Encrypted & never sold"].map((x) => <span key={x} style={{ display: "inline-flex", alignItems: "center", gap: 7 }}><span style={{ color: "var(--lime)" }}><i className="fa-solid fa-check" /></span>{x}</span>)}
              </div>
            </div>
            {/* RIGHT — demo form */}
            <div style={{ background: "rgba(8,8,14,.55)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 22, padding: 26 }}>
              <h3 style={{ fontFamily: DISP, fontWeight: 600, fontSize: 24, margin: 0 }}>Book a <span style={{ color: "var(--violet)" }}>Free Demo</span></h3>
              {demoStatus === "ok" ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, textAlign: "center", padding: "40px 10px" }}>
                  <span style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(44,118,237,.16)", color: "var(--lime)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}><i className="fa-solid fa-check" /></span>
                  <div style={{ fontFamily: DISP, fontWeight: 600, fontSize: 20 }}>Thanks — request received!</div>
                  <p style={{ fontSize: 14.5, color: "#9594a6", margin: 0, maxWidth: 320 }}>Our team will get back to you within 30 minutes. Keep an eye on your inbox.</p>
                </div>
              ) : (
                <form onSubmit={submitDemo} style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 12 }}>
                  <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" style={{ display: "none" }} />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <input name="name" required placeholder="Full Name" style={inp} />
                    <input name="business" required placeholder="Business Name" style={inp} />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <input name="email" type="email" required placeholder="Business Email" style={inp} />
                    <input name="phone" type="tel" required placeholder="Phone Number" style={inp} />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <select name="industry" required defaultValue="" style={inp}>
                      <option value="" disabled style={opt}>Industry</option>
                      {["HVAC", "Cleaning", "Electrical", "Plumbing", "Painting", "Flooring", "Other"].map((x) => <option key={x} value={x} style={opt}>{x}</option>)}
                    </select>
                    <select name="monthly_calls" defaultValue="" style={inp}>
                      <option value="" disabled style={opt}>Monthly Calls (Approx)</option>
                      {["Under 100", "100–500", "500–1,000", "1,000–5,000", "5,000+"].map((x) => <option key={x} value={x} style={opt}>{x}</option>)}
                    </select>
                  </div>
                  <textarea name="message" rows={3} placeholder="How can we help your business? (optional)" style={{ ...inp, resize: "vertical" }} />
                  <button type="submit" disabled={demoStatus === "sending"} className="btnp" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10, border: "none", cursor: demoStatus === "sending" ? "wait" : "pointer", fontFamily: "inherit", fontWeight: 700, fontSize: 15.5, color: "#fff", padding: "14px 18px", borderRadius: 12, background: "linear-gradient(90deg,var(--lime),var(--violet))", opacity: demoStatus === "sending" ? 0.7 : 1, boxShadow: "0 16px 38px -16px rgba(157,139,255,.7)" }}>
                    {demoStatus === "sending" ? "Sending…" : <>Book My Demo <i className="fa-solid fa-calendar-check" /></>}
                  </button>
                  {demoStatus === "err"
                    ? <p style={{ fontSize: 13, color: "#ff8585", textAlign: "center", margin: 0 }}>Something went wrong. Please try again or email connect@hello22.ai.</p>
                    : <p style={{ fontSize: 13, color: "var(--lime)", textAlign: "center", margin: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}><i className="fa-regular fa-clock" /> We&apos;ll respond within 30 minutes</p>}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,.08)", background: "#090910" }}>
        <div className="footer-grid" style={{ maxWidth: 1240, margin: "0 auto", padding: "60px 28px 30px", display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr", gap: 40 }}>
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}<img src={LOGO} alt="hello22.ai" style={{ height: 28, width: "auto", display: "block" }} />
            <p style={{ fontSize: 14.5, color: "#9594a6", lineHeight: 1.6, margin: "18px 0 0", maxWidth: 260 }}>A native AI voice receptionist that answers every call, books every appointment, and sounds natural — built for teams who never want to miss a customer.</p>
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>{[
              { ic: "fa-facebook-f", href: "https://www.facebook.com/hello22ai" },
              { ic: "fa-instagram", href: "https://www.instagram.com/hello22.ai" },
              { ic: "fa-pinterest-p", href: "https://www.pinterest.com/hello22_ai" },
              { ic: "fa-linkedin-in", href: "https://www.linkedin.com/company/hello22-ai" },
            ].map((s) => {
              const st: React.CSSProperties = { width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#9594a6", fontSize: 14, cursor: "pointer", textDecoration: "none" };
              return s.href
                ? <a key={s.ic} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.ic} style={st}><i className={`fa-brands ${s.ic}`} /></a>
                : <span key={s.ic} style={st}><i className={`fa-brands ${s.ic}`} /></span>;
            })}</div>
          </div>
          {[
            { t: "Product", l: ["Features", "Voices", "Integrations", "Pricing", "Live demo"] },
            { t: "Company", l: ["About", "Contact", "Blog"] },
            { t: "Legal", l: ["Privacy", "Terms"] },
          ].map((col) => (
            <div key={col.t}>
              <div style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "#6f6f80", marginBottom: 16 }}>{col.t}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 11, fontSize: 14.5 }}>{col.l.map((l) => <a key={l} className="nl" href="#">{l}</a>)}</div>
            </div>
          ))}
        </div>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "24px 28px", borderTop: "1px solid rgba(255,255,255,.07)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
          <span style={{ fontSize: 13.5, color: "#6f6f80" }}>© 2026 hello22.ai</span>
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
