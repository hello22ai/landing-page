"use client";

import { Manrope, Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import { useEffect, useRef, useState } from "react";

const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-manrope", display: "swap" });
const space = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-space", display: "swap" });
// Conthrax — the logo typeface. Single weight (600); heavier weights render via synthetic bold.
const conthrax = localFont({ src: "../../public/fonts/conthrax-sb.woff", weight: "600", variable: "--font-conthrax", display: "swap" });

const DISP = "var(--font-conthrax), 'Conthrax', var(--font-space), 'Space Grotesk', sans-serif";
// Sub-heads, card titles, numbers, UI labels — Conthrax sirf display/buttons/eyebrows ke liye.
const SUB = "var(--font-space), 'Space Grotesk', sans-serif";
const LOGO = "/hello22-logo.png"; // white wordmark — dark theme
const LOGO_LIGHT = "/images/hello22-logo-color.svg"; // black + brand-blue wordmark — light theme
const APP_URL = "https://agent.hello22.ai";
const SUPPORT_EMAIL = "connect@hello22.ai";
// Web3Forms key — demo-form submissions email to connect@hello22.ai. Client-safe by design.
const WEB3FORMS_ACCESS_KEY = "42827426-7f8f-4a99-98a9-7aabe3ed8000";

const GREETS = ["hello"];

// Light/Dark palettes — every colour on the page resolves through these vars.
const THEMES: Record<"dark" | "light", Record<string, string>> = {
  dark: {
    colorScheme: "dark",
    "--bg": "#07070d", "--surface": "#12121d", "--s2": "#16161f", "--s3": "#101019",
    "--footer": "#090910",
    // Surface treatments: dark theme soft gradients rakhta hai, light theme flat clean surfaces.
    "--card-grad": "linear-gradient(150deg,#16161f,#101019)",
    "--hero-card": "linear-gradient(165deg,#0d1526,#070c17)",
    "--band-bg": "linear-gradient(135deg,rgba(44,118,237,.08),rgba(157,139,255,.08))",
    "--plan-pop": "linear-gradient(160deg,rgba(44,118,237,.12),rgba(157,139,255,.08)),#12121d",
    "--core-bg": "radial-gradient(circle at 50% 32%,#16161f,#101019)",
    "--sec-alt": "#0c0c15",
    "--nav-bg": "rgba(7,7,13,.72)", "--nav-bg2": "rgba(7,7,13,.94)", "--form-bg": "rgba(8,8,14,.55)",
    "--tx": "#f4f4f7", "--tx2": "#e4e4ec", "--tx3": "#c9c9d4",
    "--mut": "#9594a6", "--mut2": "#8b8a9c", "--mut3": "#7a7a8c", "--dim": "#6f6f80", "--dim2": "#5d5d70",
    "--blue-ink": "#4d8ef5", "--blue-ink2": "#5b93f5",
    "--lime": "#2c76ed", "--violet": "#9d8bff", "--cyan": "#56e0e0",
    "--w04": "rgba(255,255,255,.04)", "--w05": "rgba(255,255,255,.05)", "--w06": "rgba(255,255,255,.06)",
    "--w07": "rgba(255,255,255,.07)", "--w08": "rgba(255,255,255,.08)", "--w09": "rgba(255,255,255,.09)",
    "--w10": "rgba(255,255,255,.1)", "--w12": "rgba(255,255,255,.12)", "--w13": "rgba(255,255,255,.13)",
    "--w14": "rgba(255,255,255,.14)", "--w18": "rgba(255,255,255,.18)",
    "--logo-ring": "rgba(255,255,255,.6)", "--sh1": "rgba(0,0,0,.85)", "--sh2": "rgba(0,0,0,.7)",
    "--logo-filter": "none",
  },
  light: {
    colorScheme: "light",
    "--bg": "#f5f6fa", "--surface": "#ffffff", "--s2": "#ffffff", "--s3": "#eef1f7",
    "--footer": "#eceef5",
    // Light theme: koi gradient wash nahi — flat white cards, halke solid tints.
    "--card-grad": "#ffffff",
    "--hero-card": "#ffffff",
    "--band-bg": "#edf3fd",
    "--plan-pop": "#f4f8fe",
    "--core-bg": "#ffffff",
    "--sec-alt": "#eaeef6",
    "--nav-bg": "rgba(255,255,255,.82)", "--nav-bg2": "rgba(255,255,255,.97)", "--form-bg": "rgba(255,255,255,.72)",
    "--tx": "#10131c", "--tx2": "#1d2433", "--tx3": "#3e4658",
    "--mut": "#4a5266", "--mut2": "#555d72", "--mut3": "#60687e", "--dim": "#6c7488", "--dim2": "#838b9e",
    "--blue-ink": "#1e63d6", "--blue-ink2": "#2c76ed",
    "--lime": "#2c76ed", "--violet": "#6d5ae0", "--cyan": "#0e9c9c",
    "--w04": "rgba(13,18,32,.03)", "--w05": "rgba(13,18,32,.04)", "--w06": "rgba(13,18,32,.05)",
    "--w07": "rgba(13,18,32,.06)", "--w08": "rgba(13,18,32,.07)", "--w09": "rgba(13,18,32,.08)",
    "--w10": "rgba(13,18,32,.09)", "--w12": "rgba(13,18,32,.1)", "--w13": "rgba(13,18,32,.11)",
    "--w14": "rgba(13,18,32,.13)", "--w18": "rgba(13,18,32,.17)",
    "--logo-ring": "rgba(13,18,32,.1)", "--sh1": "rgba(28,42,84,.18)", "--sh2": "rgba(28,42,84,.15)",
    "--logo-filter": "none",
  },
};

const NAV_LINKS = ["Demo", "Product", "Voices", "Features", "Industries", "Pricing", "FAQ"];

// Kitni voices pehle dikhani hain — baaki "See all voices" se khulti hain.
const VOICE_PREVIEW = 6;
// FAQ bhi waise hi — pehle 6, baaki expander se.
const FAQ_PREVIEW = 6;

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
  { src: "/images/logos/color/twilio.svg", name: "Twilio", r: 98, a: -90, size: 50 },
  { src: "/images/logos/color/aws.svg", name: "AWS", r: 98, a: 30, size: 50 },
  { src: "/images/logos/color/elevenlabs.svg", name: "ElevenLabs", r: 98, a: 150, size: 50 },
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
type Shot = { src: string; title: string; desc: string; ic: string; c: string; bg: string; pts: string[] };
const SHOTS: Shot[] = [
  { src: "/images/screenshots/dashboard.png", title: "Call Dashboard", desc: "Monitor calls, performance, and insights in real time.", ic: "fa-solid fa-chart-column", c: "var(--lime)", bg: "rgba(44,118,237,.14)", pts: ["Answered calls & minutes at a glance", "Intent & sentiment tracking", "Daily performance trends"] },
  { src: "/images/screenshots/call-logs.png", title: "Call Logs", desc: "Review conversations and outcomes instantly.", ic: "fa-solid fa-file-lines", c: "var(--violet)", bg: "rgba(157,139,255,.16)", pts: ["Full transcripts & recordings", "Outcome tags on every call", "Search & filter by caller"] },
  { src: "/images/screenshots/ai-brain.png", title: "AI Agent Builder", desc: "Create and customize your AI agent in minutes.", ic: "fa-solid fa-wand-magic-sparkles", c: "var(--cyan)", bg: "rgba(86,224,224,.15)", pts: ["Set greeting, services & hours", "Pick your agent's voice & style", "Changes go live instantly"] },
  { src: "/images/screenshots/plans-billing.png", title: "Plans & Billing", desc: "Track minutes, switch plans, and control auto-renew.", ic: "fa-solid fa-credit-card", c: "#22b573", bg: "rgba(34,197,94,.14)", pts: ["Live minute usage meter", "Upgrade or switch anytime", "Full control over auto-renew"] },
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
  { q: "What happens if I run out of minutes?", a: "If you use all of your included minutes, your subscription will automatically renew, and the payment method on file will be charged for the next billing cycle so your AI receptionist continues answering calls without interruption.\n\nYou can monitor your remaining minutes anytime from the **Plans & Billing** page in your dashboard.\n\n**Free Trial:** Your trial ends when you reach **30 minutes of usage** or **14 days**, whichever comes first. At that point, your selected plan will begin automatically unless you cancel before the trial ends." },
  { q: "Can I change or upgrade my plan?", a: "Yes. You can change your plan at any time from the **Plans & Billing** page in your dashboard. If you're on a free trial, your newly selected plan will start when the trial ends. If you're already on a paid subscription, you can switch to a different plan at any time." },
  { q: "Is my data secure?", a: "Yes. Your data is encrypted both in transit and at rest. We never share your call recordings, transcripts, or customer information with third parties." },
  { q: "Can I listen to call recordings?", a: "Yes. When call recording is enabled, recordings are available in the **Call Inbox** section of your dashboard." },
  { q: "How do I update my mobile number or email address?", a: "Go to **Account Settings** in your dashboard to update your mobile number, email address, or password at any time." },
];

type Cap = { icon: string; label: string; blue?: boolean };
type Feat = { t: string; on: boolean };
type Plan = { name: string; blurb: string; price: string; icon: string; violet?: boolean; caps: Cap[]; feats: Feat[]; popular?: boolean };
// Pricing (client-final UI, 2026-07-06 raat): icon tile + chips + check/strikethrough list + tinted
// trial footer band — content: AUD 49/69/89, 200 min, 14-day trial (30 min).
const PLANS: Plan[] = [
  {
    name: "Starter", blurb: "For solo operators", price: "49", icon: "fa-solid fa-paper-plane",
    caps: [{ icon: "fa-solid fa-phone-volume", label: "200 min / month", blue: true }, { icon: "fa-brands fa-whatsapp", label: "WhatsApp" }, { icon: "fa-regular fa-envelope", label: "Email" }],
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
    name: "Standard", blurb: "For small teams going live", price: "69", icon: "fa-solid fa-users", popular: true,
    caps: [{ icon: "fa-solid fa-phone-volume", label: "200 min / month", blue: true }, { icon: "fa-brands fa-whatsapp", label: "WhatsApp" }, { icon: "fa-regular fa-envelope", label: "Email" }, { icon: "fa-solid fa-microphone", label: "Premium voices" }],
    feats: [
      { t: "200 call minutes each month", on: true },
      { t: "WhatsApp — summary, transcript & recording", on: true },
      { t: "Email — summary, transcript & recording", on: true },
      { t: "English voice agent", on: true },
      { t: "Premium AI voices", on: true },
      { t: "Free Nexleon CRM setup", on: true },
      { t: "Call summary via SMS", on: false },
    ],
  },
  {
    name: "Premium", blurb: "For bigger teams", price: "89", icon: "fa-solid fa-crown", violet: true,
    caps: [{ icon: "fa-solid fa-phone-volume", label: "200 min / month", blue: true }, { icon: "fa-brands fa-whatsapp", label: "WhatsApp" }, { icon: "fa-regular fa-envelope", label: "Email" }, { icon: "fa-solid fa-comment", label: "SMS" }, { icon: "fa-solid fa-microphone", label: "Premium voices" }],
    feats: [
      { t: "200 call minutes each month", on: true },
      { t: "WhatsApp — summary, transcript & recording", on: true },
      { t: "Email — summary, transcript & recording", on: true },
      { t: "Multilingual voice agent", on: true },
      { t: "Premium AI voices", on: true },
      { t: "Call summary via SMS", on: true },
      { t: "Free Nexleon CRM setup & custom CRM integration", on: true },
    ],
  },
];

// Google reviews CTA — apna Google Business review link yahan daal dein.
const GOOGLE_REVIEWS_URL = "https://www.google.com/search?q=hello22.ai+reviews";
type Testi = { quote: string; name: string; role: string; img: string; stars: number };
const TESTIMONIALS: Testi[] = [
  { quote: "We were missing 15 to 20 calls a week — mostly evenings and lunch hours. Since hello22 took over, every call is answered and our bookings are up almost 40%.", name: "Dr. Melissa Tran", role: "Brightside Dental Clinic", img: "/images/portrait-melissa.jpg", stars: 4.5 },
  { quote: "I'm in showings half the day. Now every enquiry is answered instantly, and the caller's details are texted to me before I'm even out of the building.", name: "James Carter", role: "Carter Realty Group", img: "/images/portrait-james.jpg", stars: 5 },
  { quote: "The AI handles appointment calls so smoothly that most clients don't realise they weren't talking to our staff. Our front desk finally has room to breathe.", name: "Priya Sharma", role: "Sharma Immigration Services", img: "/images/portrait-priya.jpg", stars: 5 },
];

const CSS = `
@keyframes h22marq{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@keyframes h22pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(.55)}}
@keyframes h22eq{0%,100%{transform:scaleY(.28)}50%{transform:scaleY(1)}}
@keyframes h22float{0%,100%{transform:translate(0,0)}50%{transform:translate(0,-22px)}}
@keyframes h22floatSm{0%,100%{transform:translate(0,0)}50%{transform:translate(0,-9px)}}
@keyframes h22ring{0%{transform:scale(.7);opacity:.55}100%{transform:scale(2.1);opacity:0}}
@keyframes h22greet{0%{opacity:0;transform:translateY(22px) rotateX(-55deg);filter:blur(6px)}100%{opacity:1;transform:none;filter:blur(0)}}
@keyframes h22drift{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(34px,-28px) scale(1.07)}66%{transform:translate(-26px,20px) scale(.95)}}
@keyframes h22glowpulse{0%,100%{opacity:.65;transform:translateX(-50%) scale(1)}50%{opacity:1;transform:translateX(-50%) scale(1.14)}}
@keyframes h22spin{to{transform:rotate(360deg)}}
@keyframes h22spinr{to{transform:rotate(-360deg)}}
@keyframes h22waveY{0%,100%{transform:translateY(0)}50%{transform:translateY(-11px)}}
@keyframes h22dash{to{stroke-dashoffset:-1630}}
.h22 [data-rv]{opacity:0;transform:translateY(34px) scale(.985);transition:opacity .7s cubic-bezier(.2,.7,.2,1),transform .75s cubic-bezier(.2,.7,.2,1)}
.h22 [data-rv].in{opacity:1;transform:none}
.h22 a.nl{color:var(--tx3);text-decoration:none}.h22 a.nl:hover{color:var(--tx)}
.h22 .lift{transition:transform .3s cubic-bezier(.2,.7,.2,1),box-shadow .3s ease,border-color .3s}
.h22 .btnp{transition:transform .18s ease,box-shadow .25s ease}
.h22 .btnp:active{transform:translateY(1px) scale(.98)}
@media(hover:hover){
 .h22 .lift:hover{transform:translateY(-7px);box-shadow:0 30px 64px -32px var(--sh1)}
 .h22 .btnp:hover{transform:translateY(-2px)}
}
@media(hover:none){
 .h22 .lift:active{transform:scale(.985)}
}
.h22 ::selection{background:rgba(44,118,237,.4);color:#fff}
.h22 a:focus-visible,.h22 button:focus-visible{outline:2px solid var(--lime);outline-offset:3px;border-radius:10px}
.h22 .snap-x::-webkit-scrollbar{display:none}
.h22 .nav-burger{display:none}
.h22 img{max-width:100%}
.h22 section.sec-alt::before{content:"";position:absolute;top:0;bottom:0;left:50%;transform:translateX(-50%);width:100vw;background:var(--sec-alt);border-top:1px solid var(--w08);border-bottom:1px solid var(--w08);z-index:-1;pointer-events:none}
.h22 .plat-stats>div+div{border-left:1px solid var(--w08);padding-left:18px}
.h22{-webkit-text-size-adjust:100%;text-size-adjust:100%;padding-left:env(safe-area-inset-left);padding-right:env(safe-area-inset-right)}
.h22 h1,.h22 h2,.h22 h3{text-wrap:balance}
.h22 .footer-grid a{padding:3px 0}
.h22 footer{padding-bottom:env(safe-area-inset-bottom)}
.h22 .nav-mobile{max-height:calc(100vh - 74px);max-height:calc(100dvh - 74px);overflow-y:auto}
.h22 .ind-list::-webkit-scrollbar{display:none}
.h22 .wave>span{min-width:0}
.h22 .demo-head button{white-space:nowrap}
.h22 .bubble{max-width:min(78%,640px)!important}
.h22 .hero-feat{border-right:1px solid var(--w09)}
.h22 .hero-feat:last-child{border-right:none;padding-right:0}
.h22 .testi-grid{display:grid;grid-template-columns:minmax(270px,330px) repeat(3,minmax(0,1fr));gap:18px;margin-top:42px}
@media(max-width:1240px){.h22 .testi-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(min-width:1441px){
 .h22 section,.h22 .nav-bar{padding-left:48px!important;padding-right:48px!important}
 .h22 .footer-grid,.h22 .footer-bottom{padding-left:48px!important;padding-right:48px!important}
 .h22 .voices-grid{grid-template-columns:repeat(6,minmax(0,1fr))!important}
 .h22 .hero-grid{grid-template-columns:1.15fr minmax(0,680px)!important;gap:80px!important}
 .h22 .demo-grid{grid-template-columns:minmax(0,1fr) 400px!important}
 .h22 #industries .uc-grid{grid-template-columns:360px minmax(0,1120px)!important}
 .h22 .cta-grid{grid-template-columns:1.1fr minmax(0,680px)!important;gap:80px!important}
 .h22 .orbit{transform:scale(1.16)}
 .h22 .feat-grid,.h22 .uc-grid,.h22 .shots-grid,.h22 .price-grid,.h22 .testi-grid{gap:22px!important}
}
@media(min-width:921px){.h22 .nav-mobile{display:none!important}}
@media(max-width:1280px){
 .h22 .nav-logo{height:40px!important}
}
@media(max-width:1080px){
 .h22 .voices-grid,.h22 .shots-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important}
 .h22 .nav-logo{height:32px!important}
 .h22 .nav-links{gap:18px!important;font-size:14px!important}
}
@media(max-width:920px){
 .h22 .nav-links{display:none!important}
 .h22 .nav-burger{display:inline-flex!important}
 .h22 .nav-logo{height:44px!important}
 .h22 .hero-grid,.h22 .demo-grid,.h22 .uc-grid,.h22 .int-grid,.h22 .price-grid,.h22 .cta-grid{grid-template-columns:minmax(0,1fr)!important}
 .h22 .feat-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important}
 .h22 .feat-grid>div{grid-column:auto!important}
 .h22 .tcol{grid-column:span 2!important}
 .h22 .footer-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important}
 .h22 .price-grid{max-width:520px}
 .h22 .ind-list{flex-direction:row!important;overflow-x:auto;padding-bottom:10px;scrollbar-width:none;-webkit-overflow-scrolling:touch}
 .h22 .ind-btn{flex:0 0 auto;width:auto!important;white-space:nowrap;padding:11px 16px!important;background:var(--surface)!important;border:1px solid var(--w10)!important}
 .h22 .ind-btn[data-active="true"]{background:rgba(44,118,237,.16)!important;border-color:rgba(44,118,237,.5)!important;color:var(--tx)!important}
 .h22 .ind-num,.h22 .ind-arrow{display:none!important}
 .h22 section{padding-top:44px!important;padding-bottom:88px!important}
 .h22 #top{padding-top:52px!important;padding-bottom:44px!important}
 .h22 #demo{padding-top:56px!important}
 .h22 section.full-bleed{padding:48px 0 32px!important}
 .h22 .faq-cols{grid-template-columns:minmax(0,1fr)!important}
 .h22 .plat-stats{grid-template-columns:repeat(2,minmax(0,1fr))!important}
 .h22 .plat-stats>div+div{border-left:none;padding-left:0}
}
@media(max-width:680px){
 .h22 .voices-grid,.h22 .feat-grid,.h22 .tcol{grid-template-columns:minmax(0,1fr)!important}
 .h22 section{padding-left:18px!important;padding-right:18px!important;padding-top:36px!important;padding-bottom:68px!important}
 .h22 #top{padding-top:42px!important;padding-bottom:36px!important}
 .h22 #demo{padding-top:48px!important}
 .h22 section.full-bleed{padding:38px 0 22px!important}
 .h22 [data-rv]{transform:translateY(16px) scale(1)}
 .h22 section>p[data-rv],.h22 section>div[data-rv]>p{font-size:15.5px!important;line-height:1.6!important;margin-top:12px!important}
 .h22 section h2{line-height:1.12!important}
 .h22 .hero-sub{font-size:15.5px!important;margin-top:16px!important}
 .h22 .hero-checks{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:14px!important;margin-top:24px!important}
 .h22 .hero-feat{border-right:none!important;padding-right:0!important}
 .h22 .hero-waves{opacity:.22!important}
 .h22 .wave{gap:2px!important;padding:0!important}
 .h22 .float-card{animation:h22floatSm 8s ease-in-out infinite!important}
 .h22 .voices-grid,.h22 .feat-grid,.h22 .uc-grid,.h22 .price-grid,.h22 .demo-grid,.h22 .faq-list{margin-top:24px!important}
 .h22 .snap-x{display:grid!important;grid-template-columns:none!important;grid-auto-flow:column;grid-auto-columns:84%;overflow-x:auto;scroll-snap-type:x mandatory;scroll-padding-left:18px;gap:12px!important;margin:24px -18px 0!important;padding:4px 18px 14px;scrollbar-width:none;-webkit-overflow-scrolling:touch}
 .h22 .snap-x>*{scroll-snap-align:start}
 .h22 .stat4{gap:10px!important;margin-top:24px!important;grid-template-columns:minmax(0,1fr)!important}
 .h22 .stat4>div{display:grid!important;grid-template-columns:44px minmax(0,1fr);column-gap:14px;row-gap:2px;text-align:left;padding:14px 16px!important;align-items:center}
 .h22 .stat4>div>div:first-child{margin:0!important;width:44px!important;height:44px!important}
 .h22 .stat4>div>div:nth-child(2){margin:0!important;font-size:16px!important}
 .h22 .stat4>div>p{grid-column:2;margin:0!important;font-size:13px!important}
 .h22 .feat-grid>div{padding:22px 20px!important}
 .h22 footer{padding-left:18px!important;padding-right:18px!important}
 .h22 .footer-grid{padding:32px 18px 28px!important}
 .h22 .footer-bottom{padding:16px 18px!important}
 .h22 .band-pad{padding:32px 18px!important}
 .h22 .cta-pad{padding:34px 18px!important}
 .h22 .form-card{padding:20px 16px!important}
 .h22 .uc-card{padding:26px 20px!important;min-height:0!important}
 .h22 input,.h22 select,.h22 textarea{font-size:16px!important}
 .h22 .bubble{max-width:90%!important}
 .h22 .demo-head{padding:14px 16px!important}
 .h22 .faq-q{padding:16px!important}
 .h22 .faq-a{padding:0 16px 18px!important}
 .h22 .testi-grid{grid-template-columns:minmax(0,1fr);gap:14px;margin-top:26px}
}
@media(max-width:560px){
 .h22 .orbit{transform:scale(.72);margin:-60px}
 .h22 .footer-grid{grid-template-columns:minmax(0,1fr)!important;gap:28px!important}
 .h22 .plat-stats{grid-template-columns:minmax(0,1fr)!important}
}
@media(max-width:480px){
 .h22 .nav-bar{padding:0 16px!important;height:64px!important}
 .h22 .nav-signin{display:none!important}
 .h22 .nav-cta{padding:9px 13px!important;font-size:13px!important}
 .h22 .nav-logo{height:32px!important}
 .h22 .theme-toggle{width:36px!important;height:36px!important;font-size:13px!important}
 .h22 .hero-h1{font-size:clamp(54px,19vw,88px)!important}
 .h22 .hero-ctas a{width:100%;display:inline-flex;align-items:center;justify-content:center;text-align:center;box-sizing:border-box}
 .h22 .form-row{grid-template-columns:minmax(0,1fr)!important}
}
@media(max-width:390px){
 .h22 .orbit{transform:scale(.6);margin:-84px}
 .h22 .nav-logo{height:28px!important}
 .h22 .nav-cta{padding:8px 11px!important}
}
@media(max-height:520px) and (orientation:landscape){
 .h22 #top{padding-top:34px!important;padding-bottom:24px!important}
 .h22 .hero-h1{font-size:clamp(48px,9vw,84px)!important}
}
@media(prefers-reduced-motion:reduce){
 .h22 *,.h22 *::before,.h22 *::after{animation:none!important;transition:none!important}
 .h22 [data-rv]{opacity:1!important;transform:none!important}
 .h22 .wave-pulse{display:none}
 html{scroll-behavior:auto}
}
`;

// CTA buttons: simple plain text (client 2026-07-06) — koi Conthrax/first-word emphasis nahi.
function BtnTxt({ t }: { t: string }) {
  return <span>{t}</span>;
}
// Heading emphasis: blue highlight for key words, heavier weight for leading words.
const HL: React.CSSProperties = { color: "var(--blue-ink)", fontWeight: 700 };
const BD: React.CSSProperties = { fontWeight: 800 };

// Renders FAQ answers: "\n\n" => paragraphs, **text** => bold.
function renderAnswer(text: string) {
  return text.split("\n\n").map((para, pi) => (
    <p key={pi} style={{ margin: pi === 0 ? 0 : "12px 0 0", fontSize: 15, lineHeight: 1.65, color: "var(--mut)" }}>
      {para.split(/(\*\*[^*]+\*\*)/g).map((seg, si) =>
        seg.startsWith("**") && seg.endsWith("**")
          ? <strong key={si} style={{ color: "var(--tx2)", fontWeight: 700 }}>{seg.slice(2, -2)}</strong>
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
      // stacked single-column layouts (phone/tablet) — parallax off to avoid overlap
      if (window.innerWidth <= 920) { el.style.transform = "none"; return; }
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
      (ents) => {
        // elements entering together get a soft stagger instead of popping in at once
        let order = 0;
        ents.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          el.style.transitionDelay = `${Math.min(order * 60, 240)}ms`;
          el.classList.add("in");
          io.unobserve(el);
          // clear the delay after the reveal so hover transitions stay instant
          window.setTimeout(() => { el.style.transitionDelay = ""; }, 1100);
          order++;
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [rootRef]);
}


export default function Hello22Site() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  // Light/Dark theme — default light (client), saved toggle choice wins.
  const [theme, setTheme] = useState<"dark" | "light">("light");
  useEffect(() => {
    const saved = window.localStorage.getItem("h22-theme");
    if (saved === "light" || saved === "dark") setTheme(saved);
  }, []);
  useEffect(() => {
    document.documentElement.style.colorScheme = theme;
    document.documentElement.style.background = THEMES[theme]["--bg"];
    document.body.style.background = THEMES[theme]["--bg"];
  }, [theme]);
  const isLight = theme === "light";
  const flipTheme = () => setTheme((t) => { const next = t === "dark" ? "light" : "dark"; try { window.localStorage.setItem("h22-theme", next); } catch { /* private mode */ } return next; });
  const [greet, setGreet] = useState(0);
  const [voice, setVoice] = useState(0);
  const [useCase, setUseCase] = useState(0);
  const [demoPlaying, setDemoPlaying] = useState(false);
  const [demoStarted, setDemoStarted] = useState(false);
  const [demoStep, setDemoStep] = useState(0);
  const [callSecs, setCallSecs] = useState(0);
  const demoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);
  const [playingVoice, setPlayingVoice] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAllVoices, setShowAllVoices] = useState(false);
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  // voices preview = poori rows: mobile 6 (1-col), desktop 8 (4-col), ultra-wide 12 (6-col)
  const [wideScreen, setWideScreen] = useState(false);
  const [smallScreen, setSmallScreen] = useState(false);
  useEffect(() => {
    const mqW = window.matchMedia("(min-width: 1441px)");
    const mqS = window.matchMedia("(max-width: 680px)");
    const f = () => { setWideScreen(mqW.matches); setSmallScreen(mqS.matches); };
    f();
    mqW.addEventListener("change", f);
    mqS.addEventListener("change", f);
    return () => { mqW.removeEventListener("change", f); mqS.removeEventListener("change", f); };
  }, []);
  const voicePreview = wideScreen ? 12 : smallScreen ? VOICE_PREVIEW : 8;
  const ucListRef = useParallax<HTMLDivElement>(34);
  const ucCardRef = useParallax<HTMLDivElement>(-34);
  // Scroll parallax — alag-alag speeds se depth ka feel; hook mobile (≤920) aur reduced-motion pe off hai.
  const heroCardRef = useParallax<HTMLDivElement>(-30);
  const shotsRef = useParallax<HTMLDivElement>(-18);
  const orbitWrapRef = useParallax<HTMLDivElement>(26);
  const ctaFormRef = useParallax<HTMLDivElement>(-24);
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
      if (json.success) { setDemoStatus("ok"); form.reset(); window.setTimeout(() => { window.location.href = APP_URL; }, 1800); }
      else setDemoStatus("err");
    } catch {
      setDemoStatus("err");
    }
  }
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const demoAudioRef = useRef<HTMLAudioElement | null>(null);

  useReveal(rootRef);

  useEffect(() => () => { if (audioRef.current) audioRef.current.pause(); if (demoAudioRef.current) demoAudioRef.current.pause(); if (tickRef.current) clearInterval(tickRef.current); }, []);

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

  // call-timer: real seconds, jaise asli call chal rahi ho
  function stopTick() {
    if (tickRef.current) { clearInterval(tickRef.current); tickRef.current = null; }
  }
  function stopDemo() {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    if (demoAudioRef.current) { demoAudioRef.current.pause(); demoAudioRef.current = null; }
    if (demoTimer.current) clearTimeout(demoTimer.current);
    stopTick();
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
    if (i >= TRANSCRIPT.length) { setDemoPlaying(false); stopTick(); return; }
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
    setCallSecs(0);
    stopTick();
    tickRef.current = setInterval(() => setCallSecs((s) => s + 1), 1000);
    speakFrom(0);
  }

  const demoTime = `00:${String(Math.floor(callSecs / 60)).padStart(2, "0")}:${String(callSecs % 60).padStart(2, "0")}`;
  const uc = USECASES[useCase];

  const eyebrow: React.CSSProperties = { fontFamily: DISP, fontSize: 11.5, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--lime)", fontWeight: 700 };
  const h2: React.CSSProperties = { fontFamily: DISP, fontWeight: 600, letterSpacing: "-.02em", fontSize: "clamp(25px,4.6vw,44px)", lineHeight: 1.14, margin: "14px 0 0" };
  const card: React.CSSProperties = { background: "var(--surface)", border: "1px solid var(--w09)", borderRadius: 22 };
  const featIcon = (bg: string, bd: string, col: string): React.CSSProperties => ({ width: 44, height: 44, borderRadius: 12, background: bg, border: `1px solid ${bd}`, display: "flex", alignItems: "center", justifyContent: "center", color: col, fontSize: 18 });
  const pill: React.CSSProperties = { fontSize: 13, padding: "8px 13px", borderRadius: 999, background: "var(--w05)", border: "1px solid var(--w10)" };
  const inp: React.CSSProperties = { width: "100%", background: "var(--w04)", border: "1px solid var(--w12)", borderRadius: 10, padding: "12px 14px", color: "var(--tx)", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" };
  const ghost: React.CSSProperties = { display: "inline-flex", alignItems: "center", gap: 9, textDecoration: "none", background: "var(--w05)", border: "1px solid var(--w14)", color: "var(--tx2)", fontWeight: 600, fontSize: 14, padding: "11px 20px", borderRadius: 999, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" };
  const opt: React.CSSProperties = { background: "var(--surface)", color: "var(--tx)" };

  return (
    <div
      ref={rootRef}
      className={`h22 ${manrope.variable} ${space.variable} ${conthrax.variable}`}
      style={{ ...(THEMES[theme] as React.CSSProperties), background: "var(--bg)", color: "var(--tx)", fontFamily: "var(--font-manrope), Manrope, sans-serif", WebkitFontSmoothing: "antialiased", overflowX: "clip", position: "relative" }}
    >
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* ambient glows — sirf dark mein; light theme clean flat white rehta hai */}
      {!isLight && (
        <>
          <div style={{ position: "absolute", top: -180, left: -120, width: 620, height: 620, borderRadius: "50%", background: "radial-gradient(circle,rgba(157,139,255,.22),transparent 65%)", filter: "blur(20px)", pointerEvents: "none", zIndex: 0, animation: "h22drift 16s ease-in-out infinite" }} />
          <div style={{ position: "absolute", top: 120, right: -160, width: 560, height: 560, borderRadius: "50%", background: "radial-gradient(circle,rgba(86,224,224,.16),transparent 65%)", filter: "blur(20px)", pointerEvents: "none", zIndex: 0, animation: "h22drift 21s ease-in-out infinite", animationDelay: "-6s" }} />
          <div style={{ position: "absolute", top: 540, left: "30%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(44,118,237,.12),transparent 65%)", filter: "blur(30px)", pointerEvents: "none", zIndex: 0, animation: "h22drift 26s ease-in-out infinite", animationDelay: "-12s" }} />
        </>
      )}

      {/* NAV */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", background: "var(--nav-bg)", borderBottom: "1px solid var(--w07)" }}>
        <div className="nav-bar" style={{ maxWidth: 1536, margin: "0 auto", padding: "0 28px", height: 74, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
          <a href="#top" style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={isLight ? LOGO_LIGHT : LOGO} alt="hello22.ai" className="nav-logo" style={{ height: 50, width: "auto", display: "block", filter: "var(--logo-filter)" }} /></a>
          <nav className="nav-links" style={{ display: "flex", alignItems: "center", gap: 30, fontSize: 14.5, fontWeight: 500 }}>
            {NAV_LINKS.map((l) => (
              <a key={l} className="nl" href={"#" + l.toLowerCase().replace(" ", "")}>{l}</a>
            ))}
          </nav>
          <div style={{ display: "flex", alignItems: "center", gap: 14, flexShrink: 0 }}>
            <a className="nav-signin" href={APP_URL} target="_blank" rel="noopener noreferrer" style={{ color: "var(--tx)", textDecoration: "none", fontSize: 14.5, fontWeight: 600 }}>Sign in</a>
            <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="btnp nav-cta" style={{ textDecoration: "none", background: "var(--lime)", color: "#fff", fontWeight: 700, fontSize: 14.5, padding: "11px 20px", borderRadius: 999, boxShadow: "0 10px 26px -12px rgba(44,118,237,.7)" }}>Try free</a>
            <button onClick={flipTheme} className="theme-toggle" aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"} title={isLight ? "Dark mode" : "Light mode"} style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--w06)", border: "1px solid var(--w12)", color: "var(--tx)", fontSize: 15, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <i className={`fa-solid ${isLight ? "fa-moon" : "fa-sun"}`} />
            </button>
            <button className="nav-burger" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((o) => !o)} style={{ width: 42, height: 42, borderRadius: 12, background: "var(--w06)", border: "1px solid var(--w12)", color: "var(--tx)", fontSize: 17, cursor: "pointer", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <i className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"}`} />
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="nav-mobile" style={{ borderTop: "1px solid var(--w07)", background: "var(--nav-bg2)", padding: "8px 18px 18px", display: "flex", flexDirection: "column" }}>
            {NAV_LINKS.map((l) => (
              <a key={l} href={"#" + l.toLowerCase().replace(" ", "")} onClick={() => setMenuOpen(false)} style={{ color: "var(--tx2)", textDecoration: "none", fontSize: 16, fontWeight: 600, padding: "13px 4px", borderBottom: "1px solid var(--w06)" }}>{l}</a>
            ))}
            <a href={APP_URL} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)} style={{ color: "var(--tx2)", textDecoration: "none", fontSize: 16, fontWeight: 600, padding: "13px 4px" }}>Sign in</a>
            <a href={APP_URL} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)} className="btnp" style={{ textDecoration: "none", textAlign: "center", background: "var(--lime)", color: "#fff", fontWeight: 700, fontSize: 15, padding: "13px 20px", borderRadius: 999, marginTop: 8, boxShadow: "0 10px 26px -12px rgba(44,118,237,.7)" }}>Try free</a>
          </nav>
        )}
      </header>

      {/* HERO */}
      <section id="top" style={{ position: "relative", zIndex: 1, maxWidth: 1536, margin: "0 auto", padding: "76px 28px 56px" }}>
        {/* flowing wave lines — decorative, full hero width */}
        <svg className="hero-waves" aria-hidden viewBox="0 0 1600 400" preserveAspectRatio="none" style={{ position: "absolute", left: 0, right: 0, bottom: -70, width: "100%", height: "auto", pointerEvents: "none", zIndex: 0, opacity: .38 }}>
          <defs>
            <linearGradient id="h22wl" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#2c76ed" stopOpacity=".05" />
              <stop offset=".35" stopColor="#2c76ed" stopOpacity=".5" />
              <stop offset=".7" stopColor="#56e0e0" stopOpacity=".35" />
              <stop offset="1" stopColor="#2c76ed" stopOpacity=".08" />
            </linearGradient>
            <linearGradient id="h22wp" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#4d8ef5" stopOpacity=".9" />
              <stop offset="1" stopColor="#56e0e0" stopOpacity=".7" />
            </linearGradient>
          </defs>
          {Array.from({ length: 16 }).map((_, i) => (
            <path key={i} d={`M-40 ${285 + i * 7} C 380 ${375 - i * 15}, 950 ${95 + i * 15}, 1640 ${240 - i * 5}`} stroke="url(#h22wl)" strokeWidth="1" fill="none" style={{ animation: `h22waveY ${6 + (i % 4)}s ease-in-out ${(-i * 0.45).toFixed(2)}s infinite` }} />
          ))}
          {/* travelling light pulses on a few lines */}
          {[3, 8, 13].map((i, k) => (
            <path key={`p${i}`} className="wave-pulse" d={`M-40 ${285 + i * 7} C 380 ${375 - i * 15}, 950 ${95 + i * 15}, 1640 ${240 - i * 5}`} stroke="url(#h22wp)" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeDasharray="80 1550" style={{ animation: `h22waveY ${6 + (i % 4)}s ease-in-out ${(-i * 0.45).toFixed(2)}s infinite, h22dash ${9 + k * 3}s linear ${-k * 3.5}s infinite` }} />
          ))}
        </svg>
        <div className="hero-grid" style={{ position: "relative", display: "grid", gridTemplateColumns: "1.05fr .95fr", gap: 54, alignItems: "center" }}>
          <div>
            <div data-rv style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "7px 14px", borderRadius: 999, background: "var(--w05)", border: "1px solid var(--w10)", fontSize: 13, color: "var(--tx3)" }}>
              <span style={{ position: "relative", display: "inline-flex", width: 8, height: 8 }}>
                <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "var(--lime)" }} />
                <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "var(--lime)", animation: "h22ring 1.8s ease-out infinite" }} />
              </span>
              <span style={{ fontWeight: 600, color: "var(--tx3)", letterSpacing: ".02em" }}>24/7 AI voice receptionist</span>
            </div>
            <h1 data-rv className="hero-h1" style={{ fontFamily: DISP, fontWeight: 600, letterSpacing: "-.04em", lineHeight: .92, fontSize: "clamp(72px,11vw,150px)", margin: "26px 0 0" }}>
              <span style={{ display: "inline-flex", alignItems: "baseline", perspective: "600px" }}>
                <span key={greet} style={{ display: "inline-block", animation: "h22greet .65s cubic-bezier(.2,.8,.2,1) both" }}>{GREETS[greet]}</span>
                <span style={{ color: "var(--lime)" }}>.</span>
              </span>
            </h1>
            <p data-rv style={{ fontFamily: SUB, fontSize: "clamp(18px,2vw,25px)", fontWeight: 600, color: "var(--tx2)", margin: "14px 0 0", letterSpacing: "-.01em", lineHeight: 1.35 }}>I&apos;m your AI voice agent —<br /><span style={HL}>ready to talk.</span></p>
            <p data-rv className="hero-sub" style={{ fontSize: 18, lineHeight: 1.6, color: "var(--mut)", maxWidth: 520, margin: "20px 0 0" }}><strong style={{ fontWeight: 800, color: "var(--tx2)" }}>hello22 answers every call,</strong> books appointments, qualifies leads, and resolves questions — sounding <span style={HL}>natural and human</span>, in English, 24/7.</p>
            <div data-rv className="hero-ctas" style={{ display: "flex", gap: 14, marginTop: 32, flexWrap: "wrap" }}>
              <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="btnp" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 10, background: "var(--lime)", color: "#fff", fontWeight: 700, fontSize: 16, padding: "16px 26px", borderRadius: 999, boxShadow: "0 18px 44px -12px rgba(44,118,237,.75)" }}><span aria-hidden style={{ fontSize: 15, lineHeight: 1 }}>✦</span><BtnTxt t="Start free — setup in minutes" /></a>
              <a href="#demo" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 10, background: "var(--w06)", color: "var(--tx)", fontWeight: 600, fontSize: 16, padding: "16px 24px", borderRadius: 999, border: "1px solid var(--w14)" }}>
                <span style={{ display: "inline-flex", width: 24, height: 24, borderRadius: "50%", background: "#fff", color: "var(--lime)", alignItems: "center", justifyContent: "center", fontSize: 10 }}><i className="fa-solid fa-play" style={{ marginLeft: 1 }} /></span><BtnTxt t="Hear a live call" />
              </a>
            </div>
            <div data-rv className="hero-checks" style={{ display: "flex", gap: 22, marginTop: 30, flexWrap: "wrap" }}>
              {[
                { ic: "fa-regular fa-clock", t: "24/7", d: "Always on" },
                { ic: "fa-regular fa-circle-check", t: "Every call", d: "answered" },
                { ic: "fa-solid fa-microphone-lines", t: "Natural English", d: "voice" },
                { ic: "fa-solid fa-bolt", t: "Live in", d: "minutes" },
              ].map((x) => (
                <div key={x.t} className="hero-feat" style={{ display: "flex", alignItems: "center", gap: 12, paddingRight: 22 }}>
                  <i className={x.ic} style={{ color: "var(--blue-ink)", fontSize: 20 }} />
                  <div style={{ lineHeight: 1.3 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "var(--tx2)" }}>{x.t}</div>
                    <div style={{ fontSize: 12.5, color: "var(--mut2)" }}>{x.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* live call card */}
          <div ref={heroCardRef} style={{ willChange: "transform" }}>
          <div data-rv>
            <div className="float-card" style={{ position: "relative", background: "var(--hero-card)", border: "1px solid rgba(44,118,237,.42)", borderRadius: 24, padding: 26, boxShadow: "0 0 0 1px rgba(44,118,237,.08), 0 26px 70px -30px rgba(44,118,237,.4), 0 44px 90px -40px var(--sh1)", animation: "h22float 6.5s ease-in-out infinite" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 14, minWidth: 0 }}>
                  <div style={{ width: 46, height: 46, borderRadius: 14, background: "var(--lime)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 18, flexShrink: 0, boxShadow: "0 10px 24px -10px rgba(44,118,237,.8)" }}><i className="fa-solid fa-phone" /></div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 11, color: "var(--mut2)", textTransform: "uppercase", letterSpacing: ".12em" }}>Inbound call</div>
                    <div style={{ fontWeight: 700, fontSize: 17, marginTop: 2 }}>Apex Plumbing</div>
                    <div style={{ fontSize: 13, color: "var(--mut2)", marginTop: 3, fontVariantNumeric: "tabular-nums" }}>+1 (415) 555-0142</div>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 9, flexShrink: 0 }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "7px 14px", borderRadius: 999, background: "rgba(255,60,60,.1)", border: "1px solid rgba(255,75,75,.28)", fontSize: 12.5, fontWeight: 700, color: "var(--tx)" }}><span style={{ width: 7, height: 7, borderRadius: "50%", background: "#ff4b4b", animation: "h22pulse 1.4s infinite" }} />Live</div>
                  <span style={{ fontSize: 13.5, color: "var(--tx3)", fontVariantNumeric: "tabular-nums", paddingRight: 2 }}>0:42</span>
                </div>
              </div>
              <div className="wave" style={{ display: "flex", alignItems: "center", gap: 3, height: 76, margin: "20px 0 4px", padding: "0 4px" }}>
                {Array.from({ length: 46 }).map((_, i) => {
                  const t = i / 45;
                  const env = Math.sin(Math.PI * t);
                  const detail = 0.42 + 0.58 * Math.abs(Math.sin(i * 0.9) + 0.4 * Math.sin(i * 2.3)) / 1.4;
                  const h = Math.max(4, Math.round(62 * env * detail));
                  return <span key={i} style={{ width: 4, flex: "1 1 0", maxWidth: 6, borderRadius: 4, background: "var(--lime)", height: h, transformOrigin: "center", animation: `h22eq ${0.7 + (i % 5) * 0.12}s ease-in-out ${(i * 0.045).toFixed(2)}s infinite` }} />;
                })}
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
                <span style={{ fontSize: 12, fontWeight: 600, padding: "8px 14px", borderRadius: 10, background: "var(--w05)", border: "1px solid var(--w10)" }}>EN</span>
                <span style={{ fontSize: 12, fontWeight: 600, padding: "8px 14px", borderRadius: 10, background: "var(--w05)", border: "1px solid var(--w10)" }}>Voice: Sarah</span>
              </div>
              <div style={{ marginTop: 18, paddingTop: 16, borderTop: "1px solid var(--w08)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 13.5, color: "var(--mut2)" }}>Intent</span>
                <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="btnp" style={{ display: "inline-flex", alignItems: "center", gap: 9, fontFamily: SUB, fontSize: 16, fontWeight: 700, color: "var(--blue-ink)", textDecoration: "none", cursor: "pointer" }}>Book appointment<i className="fa-solid fa-chevron-right" style={{ fontSize: 11 }} /></a>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* TRUST MARQUEE */}
      <section className="full-bleed" style={{ position: "relative", zIndex: 1, padding: "76px 0 56px" }}>
        <p style={{ textAlign: "center", fontSize: 13, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--tx3)", margin: "0 0 38px", padding: "0 18px" }}>Built on best-in-class voice & infrastructure</p>
        <div style={{ position: "relative", overflow: "hidden", WebkitMaskImage: "linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)", maskImage: "linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)" }}>
          <div className="h22marquee" style={{ display: "flex", gap: 84, width: "max-content", animation: "h22marq 36s linear infinite", paddingRight: 84, willChange: "transform" }}>
            {[...TRUST, ...TRUST].map((t, i) => (
              <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 11, whiteSpace: "nowrap" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={isLight ? t.src.replace("/logos/white/", "/logos/color/") : t.src} alt={t.name} style={{ height: 26, width: "auto" }} />
                <span style={{ fontFamily: SUB, fontSize: 19, fontWeight: 600, color: "var(--mut3)", letterSpacing: "-.01em" }}>{t.name}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* DEMO */}
      <section id="demo" style={{ position: "relative", zIndex: 1, maxWidth: 1536, margin: "0 auto", padding: "100px 28px 112px", scrollMarginTop: 90 }}>
        <div data-rv style={eyebrow}>AI phone agent</div>
        <h2 data-rv style={{ ...h2, maxWidth: 760 }}><b style={BD}>Press play.</b> Hear hello22 handle a <span style={HL}>real call</span>.</h2>
        <p data-rv style={{ fontSize: 18, color: "var(--mut)", maxWidth: 620, margin: "18px 0 0", lineHeight: 1.6 }}><strong style={{ fontWeight: 800, color: "var(--tx2)" }}>Experience how natural conversations flow</strong> with hello22. It listens, understands, and responds — <span style={HL}>just like a human</span>.</p>
        <div data-rv style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 14, fontSize: 13, color: "var(--mut3)" }}><span style={{ display: "inline-flex", width: 20, height: 20, borderRadius: "50%", background: "rgba(44,118,237,.14)", border: "1px solid rgba(44,118,237,.3)", color: "var(--lime)", alignItems: "center", justifyContent: "center", fontSize: 10 }}><i className="fa-solid fa-volume-high" /></span>Hit play — the caller and agent speak aloud using your browser&apos;s voice engine.</div>

        <div className="demo-grid" style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 24, marginTop: 42, alignItems: "stretch" }}>
          {/* player */}
          <div data-rv style={{ background: "var(--card-grad)", border: "1px solid var(--w09)", borderRadius: 22, overflow: "hidden", display: "flex", flexDirection: "column" }}>
            <div className="demo-head" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, padding: "16px 20px", borderBottom: "1px solid var(--w07)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <button onClick={playDemo} style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "var(--lime)", color: "#fff", border: "none", cursor: "pointer", fontFamily: "inherit", fontWeight: 700, fontSize: 13.5, padding: "10px 20px", borderRadius: 999, boxShadow: "0 10px 26px -12px rgba(44,118,237,.7)" }}>
                  <i className={`fa-solid ${demoPlaying ? "fa-pause" : "fa-phone"}`} style={{ fontSize: 12 }} />{demoPlaying ? "Pause" : demoStep > 0 ? "Replay" : "Call"}
                </button>
                <span style={{ fontSize: 13.5, fontWeight: 600, color: "var(--mut3)", padding: "10px 16px" }}>Transcript</span>
              </div>
              <span style={{ fontFamily: SUB, fontSize: 15.5, fontWeight: 600, color: "var(--blue-ink)", fontVariantNumeric: "tabular-nums" }}>{demoTime}</span>
            </div>
            <div style={{ padding: 22, display: "flex", flexDirection: "column", gap: 13, minHeight: 340, flex: 1, background: "var(--w04)" }}>
              {/* call-start status chip — transcript ko real chat jaisa frame deta hai */}
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 2 }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11.5, fontWeight: 700, letterSpacing: ".07em", textTransform: "uppercase", color: "var(--blue-ink)", background: "rgba(44,118,237,.10)", border: "1px solid rgba(44,118,237,.22)", padding: "6px 14px", borderRadius: 999 }}><i className="fa-solid fa-phone" style={{ fontSize: 10 }} aria-hidden="true" />Call connected · Apex Plumbing</span>
              </div>
              {TRANSCRIPT.map((t, i) => {
                const shown = !demoStarted || i < demoStep;
                const caller = t.role === "caller";
                return (
                  <div key={i} style={{ display: "flex", justifyContent: caller ? "flex-end" : "flex-start", alignItems: "flex-end", gap: 10, opacity: shown ? 1 : 0.12, transform: shown ? "none" : "translateY(8px)", transition: "all .5s ease" }}>
                    {!caller && <span style={{ width: 30, height: 30, borderRadius: "50%", flexShrink: 0, background: "rgba(44,118,237,.14)", border: "1px solid rgba(44,118,237,.3)", color: "var(--blue-ink)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12 }} aria-hidden="true"><i className="fa-solid fa-headset" /></span>}
                    <div className="bubble" style={{ maxWidth: "78%", padding: "12px 16px", borderRadius: caller ? "16px 16px 4px 16px" : "16px 16px 16px 4px", background: caller ? "var(--lime)" : "var(--surface)", border: caller ? "1px solid rgba(44,118,237,.5)" : "1px solid var(--w10)", boxShadow: caller ? "0 10px 26px -14px rgba(44,118,237,.55)" : "0 6px 18px -12px var(--sh2)", color: caller ? "#fff" : "var(--tx)" }}>
                      <div style={{ fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 5, color: caller ? "rgba(255,255,255,.72)" : "var(--blue-ink)" }}>{t.name}</div>
                      <div style={{ fontSize: 14.5, lineHeight: 1.5 }}>{t.text}</div>
                    </div>
                    {caller && <span style={{ width: 30, height: 30, borderRadius: "50%", flexShrink: 0, background: "var(--lime)", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12.5, fontWeight: 700 }} aria-hidden="true">{t.name.charAt(0)}</span>}
                  </div>
                );
              })}
              {/* outcome chip — call ka result; demo chalte waqt last line ke saath reveal hota hai */}
              <div style={{ display: "flex", justifyContent: "center", marginTop: 2, opacity: !demoStarted || demoStep >= TRANSCRIPT.length ? 1 : 0.12, transition: "opacity .5s ease" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 700, color: "var(--blue-ink)", background: "rgba(44,118,237,.10)", border: "1px solid rgba(44,118,237,.22)", padding: "7px 15px", borderRadius: 999 }}><i className="fa-regular fa-calendar-check" aria-hidden="true" />Appointment booked · Friday 7:00 PM · Confirmation sent</span>
              </div>
            </div>
          </div>
          {/* call summary */}
          <div data-rv style={{ background: "var(--surface)", border: "1px solid var(--w09)", borderRadius: 22, padding: "18px 22px 8px", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, paddingBottom: 16, borderBottom: "1px solid var(--w08)" }}>
              <span style={{ width: 38, height: 38, borderRadius: 12, background: "rgba(44,118,237,.14)", border: "1px solid rgba(44,118,237,.3)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--blue-ink)", fontSize: 15 }}><i className="fa-solid fa-headset" /></span>
              <span style={{ fontFamily: SUB, fontWeight: 700, fontSize: 18 }}>Call summary</span>
            </div>
            {[
              { ic: "fa-solid fa-bullseye", l: "Intent", v: "Book appointment" },
              { ic: "fa-regular fa-circle-check", l: "Outcome", v: "Appointment booked" },
              { ic: "fa-regular fa-calendar", l: "Date & time", v: "Friday at 7:00 PM" },
              { ic: "fa-regular fa-face-smile", l: "Sentiment", v: "Positive" },
              { ic: "fa-solid fa-gauge-high", l: "Confidence", v: "98%" },
            ].map((r, idx, arr) => (
              <div key={r.l} style={{ display: "flex", gap: 13, alignItems: "flex-start", padding: "13px 0", borderBottom: idx < arr.length - 1 ? "1px solid var(--w06)" : "none" }}>
                <span style={{ width: 30, height: 30, borderRadius: "50%", flexShrink: 0, background: "rgba(44,118,237,.12)", border: "1px solid rgba(44,118,237,.25)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--blue-ink)", fontSize: 12 }}><i className={r.ic} /></span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--blue-ink)" }}>{r.l}</div>
                  <div style={{ fontSize: 14.5, color: "var(--tx2)", marginTop: 3, fontWeight: 600 }}>{r.v}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT SCREENSHOTS */}
      <section id="product" className="sec-alt" style={{ position: "relative", zIndex: 1, maxWidth: 1536, margin: "0 auto", padding: "96px 28px 112px", scrollMarginTop: 90 }}>
        <div data-rv>
          <span style={{ display: "inline-flex", alignItems: "center", padding: "8px 16px", borderRadius: 999, border: "1px solid rgba(44,118,237,.35)", background: "rgba(44,118,237,.07)", fontFamily: DISP, fontSize: 11.5, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--lime)", fontWeight: 700 }}>See hello22 in action</span>
          <h2 style={{ ...h2, maxWidth: 700 }}><b style={BD}>One platform.</b><br /><span style={HL}>Endless possibilities.</span></h2>
          <p style={{ fontSize: 17, color: "var(--mut)", maxWidth: 520, margin: "16px 0 0", lineHeight: 1.6 }}>Everything you need to build, manage, and scale AI voice agents that deliver real results.</p>
        </div>
        <div ref={shotsRef} style={{ willChange: "transform" }}>
        <div className="shots-grid snap-x" style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 16, marginTop: 36 }}>
          {SHOTS.map((s) => (
            <div key={s.src} data-rv className="lift" style={{ ...card, borderRadius: 18, overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <div style={{ position: "relative", minHeight: 140, background: "var(--card-grad)", borderBottom: "1px solid var(--w07)" }}>
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 9, color: "var(--dim2)" }}>
                  <i className="fa-solid fa-image" style={{ fontSize: 28 }} />
                  <span style={{ fontSize: 12.5 }}>Screenshot coming soon</span>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.src} alt={s.title} loading="lazy" onClick={() => setLightbox(s.src)} onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} style={{ position: "relative", width: "100%", height: "auto", display: "block", cursor: "zoom-in" }} />
              </div>
              <div style={{ padding: "16px 16px 16px", display: "flex", flexDirection: "column", flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                  <span style={{ width: 40, height: 40, borderRadius: 12, flexShrink: 0, background: s.bg, color: s.c, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}><i className={s.ic} aria-hidden="true" /></span>
                  <span style={{ fontFamily: SUB, fontWeight: 700, fontSize: 16 }}>{s.title}</span>
                </div>
                <div style={{ fontSize: 13, color: "var(--mut)", lineHeight: 1.55, margin: "10px 0 12px" }}>{s.desc}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 7, paddingTop: 11, borderTop: "1px solid var(--w07)" }}>
                  {s.pts.map((pt) => (
                    <span key={pt} style={{ display: "inline-flex", alignItems: "flex-start", gap: 8, fontSize: 12.5, fontWeight: 600, color: "var(--tx3)", lineHeight: 1.4 }}>
                      <i className="fa-solid fa-circle-check" style={{ color: s.c, fontSize: 12, marginTop: 2, flexShrink: 0 }} aria-hidden="true" />{pt}
                    </span>
                  ))}
                </div>
                <button onClick={() => setLightbox(s.src)} aria-label={`View ${s.title} screenshot`} style={{ alignSelf: "flex-end", marginTop: "auto", width: 34, height: 34, borderRadius: "50%", border: "none", cursor: "pointer", background: s.c, color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 13 }} className="btnp"><i className="fa-solid fa-arrow-right" aria-hidden="true" /></button>
              </div>
            </div>
          ))}
        </div>
        </div>
        {/* trust/stats bar — reference ke 4 items, honest copy ke saath */}
        <div data-rv className="plat-stats" style={{ ...card, borderRadius: 18, marginTop: 22, padding: "20px 22px", display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 18 }}>
          {[
            { ic: "fa-solid fa-shield-halved", c: "var(--lime)", bg: "rgba(44,118,237,.14)", t: "Enterprise-grade security", d: "Encrypted in transit & at rest" },
            { ic: "fa-solid fa-bolt", c: "var(--violet)", bg: "rgba(157,139,255,.16)", t: "Always-on reliability", d: "Built on best-in-class infrastructure" },
            { ic: "fa-solid fa-users", c: "#22b573", bg: "rgba(34,197,94,.14)", t: "Loved by businesses", d: "Rated 4.9/5 by our users" },
            { ic: "fa-solid fa-headset", c: "var(--cyan)", bg: "rgba(86,224,224,.15)", t: "Everyday support", d: "We reply within 30 minutes" },
          ].map((x) => (
            <div key={x.t} style={{ display: "flex", alignItems: "center", gap: 13, minWidth: 0 }}>
              <span style={{ width: 42, height: 42, borderRadius: 12, flexShrink: 0, background: x.bg, color: x.c, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}><i className={x.ic} aria-hidden="true" /></span>
              <span style={{ minWidth: 0 }}>
                <span style={{ display: "block", fontFamily: SUB, fontWeight: 700, fontSize: 14.5 }}>{x.t}</span>
                <span style={{ display: "block", fontSize: 12.5, color: "var(--mut)", marginTop: 2 }}>{x.d}</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* VOICES */}
      <section id="voices" style={{ position: "relative", zIndex: 1, maxWidth: 1536, margin: "0 auto", padding: "64px 28px 112px", scrollMarginTop: 90 }}>
        <div data-rv style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
          <div>
            <div style={eyebrow}>Natural AI voices</div>
            <h2 style={{ ...h2, maxWidth: 660 }}><b style={BD}>Pick a voice.</b><br />Click to <span style={HL}>hear it speak</span>.</h2>
          </div>
          <button
            onClick={() => {
              if (showAllVoices && playingVoice !== null && playingVoice >= voicePreview) { stopVoice(); setPlayingVoice(null); }
              setShowAllVoices((s) => !s);
            }}
            style={ghost}
          >
            {showAllVoices ? <><BtnTxt t="Show fewer voices" /> <i className="fa-solid fa-arrow-up" style={{ fontSize: 12 }} /></> : <><BtnTxt t="Explore all voices" /> <i className="fa-solid fa-arrow-right" style={{ fontSize: 12 }} /></>}
          </button>
        </div>
        <div className="voices-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 12, marginTop: 36 }}>
          {(showAllVoices ? VOICES : VOICES.slice(0, voicePreview)).map((v, i) => {
            const playing = i === playingVoice;
            const hl = i === voice || playing;
            const pals = [["rgba(44,118,237,.18)", "var(--blue-ink2)"], ["rgba(86,224,224,.16)", "var(--cyan)"], ["rgba(157,139,255,.18)", "var(--violet)"]][i % 3];
            return (
              <div key={v.id} data-rv={i < 8 ? "" : undefined} onClick={() => toggleVoice(i)} role="button" aria-pressed={playing} style={{ display: "flex", alignItems: "center", gap: 11, padding: "11px 13px", borderRadius: 14, cursor: "pointer", transition: "all .25s ease", background: hl ? "rgba(44,118,237,.12)" : "var(--surface)", border: hl ? "1px solid rgba(44,118,237,.5)" : "1px solid var(--w08)", boxShadow: hl ? "0 14px 32px -20px rgba(44,118,237,.5)" : "none" }}>
                <span style={{ position: "relative", width: 40, height: 40, borderRadius: "50%", flexShrink: 0, display: "inline-flex", alignItems: "center", justifyContent: "center", background: pals[0], color: pals[1], fontSize: 12 }}>
                  {playing && <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "var(--lime)", opacity: .35, animation: "h22ring 1.6s ease-out infinite" }} />}
                  <i className={`fa-solid ${playing ? "fa-stop" : "fa-play"}`} style={{ position: "relative", marginLeft: playing ? 0 : 2 }} />
                </span>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ display: "block", fontWeight: 700, fontSize: 14.5 }}>{v.id}</span>
                  <span style={{ display: "block", fontSize: 12.5, color: "var(--mut2)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginTop: 2 }}>{v.desc}</span>
                </span>
                {playing ? (
                  <span style={{ display: "flex", alignItems: "center", gap: 2.5, height: 20, flexShrink: 0 }}>{Array.from({ length: 4 }).map((_, j) => <span key={j} style={{ width: 3, borderRadius: 3, background: "var(--blue-ink2)", height: 7 + (j % 3) * 5, transformOrigin: "center", animation: `h22eq ${0.5 + (j % 3) * 0.15}s ease-in-out ${(j * 0.08).toFixed(2)}s infinite` }} />)}</span>
                ) : (
                  <i className="fa-solid fa-chevron-right" style={{ fontSize: 10, color: "var(--dim2)", flexShrink: 0 }} />
                )}
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: 18 }}>
          <p style={{ fontSize: 13, color: "var(--dim)", margin: 0 }}>Preview voices may sound lighter than the production voice engine.</p>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="sec-alt" style={{ position: "relative", zIndex: 1, maxWidth: 1536, margin: "0 auto", padding: "96px 28px 112px", scrollMarginTop: 90 }}>
        <div data-rv style={eyebrow}>The platform</div>
        <h2 data-rv style={{ ...h2, maxWidth: 640 }}><b style={BD}>Everything you need</b> to talk to <span style={HL}>everyone</span>.</h2>
        <div className="feat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginTop: 40 }}>
          <div data-rv className="lift" style={{ gridColumn: "span 2", background: "var(--card-grad)", border: "1px solid var(--w09)", borderRadius: 22, padding: 30 }}>
            <div style={featIcon("rgba(44,118,237,.14)", "rgba(44,118,237,.3)", "var(--lime)")}><i className="fa-solid fa-comments" /></div>
            <h3 style={{ fontFamily: SUB, fontWeight: 700, fontSize: 24, margin: "18px 0 0" }}>Conversational, not scripted</h3>
            <p style={{ fontSize: 15.5, color: "var(--mut)", lineHeight: 1.6, margin: "12px 0 0", maxWidth: 520 }}>Responds to what the caller actually says and keeps track of the conversation as it goes — holding context across the whole call.</p>
          </div>
          <div data-rv className="lift" style={{ ...card, padding: 28 }}><div style={featIcon("rgba(157,139,255,.16)", "rgba(157,139,255,.32)", "var(--violet)")}><i className="fa-solid fa-microphone-lines" /></div><h3 style={{ fontFamily: SUB, fontWeight: 700, fontSize: 20, margin: "16px 0 0" }}>Studio voices</h3><p style={{ fontSize: 14.5, color: "var(--mut)", lineHeight: 1.6, margin: "10px 0 0" }}>Choose from a library of studio-grade English voices to match your brand.</p></div>
          <div data-rv className="lift" style={{ ...card, padding: 28 }}><div style={featIcon("rgba(86,224,224,.14)", "rgba(86,224,224,.3)", "var(--cyan)")}><i className="fa-solid fa-language" /></div><h3 style={{ fontFamily: SUB, fontWeight: 700, fontSize: 20, margin: "16px 0 0" }}>English today — more coming</h3><p style={{ fontSize: 14.5, color: "var(--mut)", lineHeight: 1.6, margin: "10px 0 0" }}>Answers in natural English now, with more languages on the roadmap.</p></div>
          <div data-rv className="lift" style={{ ...card, padding: 28 }}><div style={featIcon("rgba(44,118,237,.12)", "rgba(44,118,237,.28)", "var(--lime)")}><i className="fa-solid fa-wand-magic-sparkles" /></div><h3 style={{ fontFamily: SUB, fontWeight: 700, fontSize: 20, margin: "16px 0 0" }}>Post-call automations</h3><p style={{ fontSize: 14.5, color: "var(--mut)", lineHeight: 1.6, margin: "10px 0 0" }}>After every call, details are captured and pushed to your inbox, CRM, and notifications automatically.</p></div>
          <div data-rv className="lift" style={{ ...card, padding: 28 }}><div style={featIcon("rgba(157,139,255,.16)", "rgba(157,139,255,.32)", "var(--violet)")}><i className="fa-solid fa-shield-halved" /></div><h3 style={{ fontFamily: SUB, fontWeight: 700, fontSize: 20, margin: "16px 0 0" }}>Your data, protected</h3><p style={{ fontSize: 14.5, color: "var(--mut)", lineHeight: 1.6, margin: "10px 0 0" }}>Encrypted in transit, secrets encrypted at rest, and never sold.</p></div>
          <div data-rv className="lift" style={{ gridColumn: "span 2", background: "var(--card-grad)", border: "1px solid var(--w09)", borderRadius: 22, padding: 30 }}>
            <div style={featIcon("rgba(86,224,224,.14)", "rgba(86,224,224,.3)", "var(--cyan)")}><i className="fa-solid fa-chart-line" /></div>
            <h3 style={{ fontFamily: SUB, fontWeight: 700, fontSize: 24, margin: "18px 0 0" }}>Call analytics &amp; transcripts</h3>
            <p style={{ fontSize: 15.5, color: "var(--mut)", lineHeight: 1.6, margin: "12px 0 0", maxWidth: 520 }}>Every call transcribed, summarised, and tagged with intent and sentiment — the summary delivered by email, SMS, and WhatsApp after the call.</p>
          </div>
          <div data-rv className="lift" style={{ ...card, padding: 28 }}><div style={featIcon("rgba(44,118,237,.12)", "rgba(44,118,237,.28)", "var(--lime)")}><i className="fa-solid fa-arrows-rotate" /></div><h3 style={{ fontFamily: SUB, fontWeight: 700, fontSize: 20, margin: "16px 0 0" }}>CRM &amp; Calendar</h3><p style={{ fontSize: 14.5, color: "var(--mut)", lineHeight: 1.6, margin: "10px 0 0" }}>Connect Google Calendar and push leads to your CRM or any webhook.</p></div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ position: "relative", zIndex: 1, maxWidth: 1536, margin: "0 auto", padding: "64px 28px 112px" }}>
        <div data-rv style={eyebrow}>How it works</div>
        <h2 data-rv style={{ ...h2, maxWidth: 640 }}><b style={BD}>Set up, sign up,</b> go live — with <span style={HL}>hello22</span>.</h2>
        <p data-rv style={{ fontSize: 18, color: "var(--mut)", maxWidth: 600, margin: "18px 0 0", lineHeight: 1.6 }}><strong style={{ fontWeight: 800, color: "var(--tx2)" }}>No code, no telephony setup,</strong> no flowcharts. Sarah walks you through every step — confirm your business, create your account, and take your first real call.</p>
        <div className="uc-grid snap-x" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18, marginTop: 42 }}>
          {[
            { n: "01", c: "var(--lime)", t: "Set up", h: "Sarah builds your agent", d: "hello22 finds your business and sets up your AI receptionist with you — just review the details and confirm.", img: "/images/screenshots/step-1.png" },
            { n: "02", c: "var(--violet)", t: "Account", h: "Create your account", d: "Add your name, email, and mobile so hello22 can route your calls and text you a summary after every one.", img: "/images/screenshots/step-2.png" },
            { n: "03", c: "var(--cyan)", t: "Go live", h: "Pick a number & go live", d: "Claim your dedicated AI number, point your calls to it, and start handling real conversations in minutes.", img: "/images/screenshots/step-3.png" },
          ].map((s) => (
            <div key={s.n} data-rv className="lift" style={{ ...card, padding: 28 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}><span style={{ fontFamily: SUB, fontSize: 32, fontWeight: 700, color: s.c }}>{s.n}</span><span style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: ".12em", color: "var(--mut)" }}>{s.t}</span></div>
              <h3 style={{ fontFamily: SUB, fontWeight: 700, fontSize: 19, margin: "18px 0 0" }}>{s.h}</h3>
              <p style={{ fontSize: 14.5, color: "var(--mut)", lineHeight: 1.6, margin: "10px 0 16px" }}>{s.d}</p>
              <div style={{ position: "relative", borderRadius: 12, overflow: "hidden", border: "1px solid var(--w08)", background: "var(--card-grad)", minHeight: 120 }}>
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, color: "var(--dim2)" }}>
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
      <section id="industries" className="sec-alt" style={{ position: "relative", zIndex: 1, maxWidth: 1536, margin: "0 auto", padding: "96px 28px 112px", scrollMarginTop: 90 }}>
        <div data-rv style={eyebrow}>Industries</div>
        <h2 data-rv style={{ ...h2, maxWidth: 640 }}><b style={BD}>Built for the trades</b> that run on <span style={HL}>phone calls</span>.</h2>
        <p data-rv style={{ fontSize: 18, color: "var(--mut)", maxWidth: 640, margin: "18px 0 0", lineHeight: 1.6 }}><strong style={{ fontWeight: 800, color: "var(--tx2)" }}>It&apos;s the same hello22 agent</strong> — you just configure it for your business in the AI Brain. No separate setup per industry.</p>
        <div className="uc-grid" style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 24, marginTop: 40, alignItems: "start" }}>
          <div ref={ucListRef} style={{ willChange: "transform" }}>
          <div data-rv className="ind-list" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {USECASES.map((t, i) => {
              const active = i === useCase;
              return (
                <button key={t.name} className="ind-btn" data-active={active} onClick={() => setUseCase(i)} style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", cursor: "pointer", transition: "all .22s ease", padding: "15px 18px", borderRadius: 14, fontFamily: "inherit", background: active ? "var(--s2)" : "transparent", border: active ? "1px solid var(--w13)" : "1px solid transparent", color: active ? "var(--tx)" : "var(--mut)" }}>
                  <span className="ind-num" style={{ fontFamily: SUB, fontSize: 13, fontWeight: 600, opacity: .55, width: 22 }}>{"0" + (i + 1)}</span>
                  <span style={{ fontSize: 15.5, fontWeight: 600, flex: 1, textAlign: "left" }}>{t.name}</span>
                  <span className="ind-arrow" style={{ opacity: active ? 1 : 0, color: "var(--lime)", transition: "opacity .2s" }}>→</span>
                </button>
              );
            })}
          </div>
          </div>
          <div ref={ucCardRef} style={{ willChange: "transform" }}>
          <div data-rv className="uc-card" style={{ background: "var(--card-grad)", border: "1px solid var(--w10)", borderRadius: 24, padding: 34, minHeight: 380 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 50, height: 50, borderRadius: 14, background: "rgba(44,118,237,.14)", border: "1px solid rgba(44,118,237,.3)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--lime)", fontSize: 22 }}><i className={`fa-solid ${uc.icon}`} /></div>
              <div><div style={{ fontFamily: SUB, fontWeight: 700, fontSize: 22 }}>{uc.name}</div><div style={{ fontSize: 13, color: "var(--lime)" }}>Configured in your AI Brain</div></div>
            </div>
            <h3 style={{ fontFamily: SUB, fontWeight: 700, fontSize: 26, letterSpacing: "-.02em", margin: "26px 0 0", maxWidth: 560 }}>{uc.title}</h3>
            <p style={{ fontSize: 16, color: "var(--mut)", lineHeight: 1.65, margin: "14px 0 0", maxWidth: 600 }}>{uc.body}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 9, marginTop: 28 }}>{uc.tags.map((tg) => <span key={tg} style={{ ...pill, color: "var(--tx3)" }}>{tg}</span>)}</div>
          </div>
          </div>
        </div>
      </section>

      {/* INTEGRATIONS */}
      <section id="integrations" style={{ position: "relative", zIndex: 1, maxWidth: 1536, margin: "0 auto", padding: "64px 28px 112px", scrollMarginTop: 90 }}>
        <div className="int-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 50, alignItems: "center" }}>
          <div data-rv>
            <div style={eyebrow}>Integrations</div>
            <h2 style={{ ...h2, fontSize: "clamp(24px,4vw,40px)", lineHeight: 1.12 }}><b style={BD}>Connects</b> to <span style={HL}>your stack</span>.</h2>
            <p style={{ fontSize: 17, color: "var(--mut)", lineHeight: 1.65, margin: "18px 0 0", maxWidth: 440 }}><strong style={{ fontWeight: 800, color: "var(--tx2)" }}>Google Calendar for booking,</strong> your CRM or any webhook for leads, and the voice &amp; AI infrastructure behind every call — so conversations turn into booked appointments and updated records automatically.</p>
          </div>
          <div ref={orbitWrapRef} style={{ willChange: "transform" }}>
          <div data-rv style={{ display: "flex", justifyContent: "center" }}>
            <div className="orbit" style={{ position: "relative", width: 420, height: 420, flexShrink: 0 }}>
              {/* ambient glow — sirf dark mein */}
              {!isLight && <div style={{ position: "absolute", left: "50%", top: "50%", width: 240, height: 240, transform: "translate(-50%,-50%)", borderRadius: "50%", background: "radial-gradient(circle,rgba(44,118,237,.20),transparent 70%)", filter: "blur(14px)", pointerEvents: "none" }} />}
              {/* orbit rings */}
              {[98, 175].map((r) => <div key={r} style={{ position: "absolute", left: 210 - r, top: 210 - r, width: r * 2, height: r * 2, borderRadius: "50%", border: "1px solid var(--w07)" }} />)}
              {/* spinning badges */}
              <div className="orbit-spin" style={{ position: "absolute", inset: 0, animation: "h22spin 50s linear infinite" }}>
                {ORBIT.map((b, i) => {
                  const rad = (b.a * Math.PI) / 180;
                  const cx = 210 + b.r * Math.cos(rad);
                  const cy = 210 + b.r * Math.sin(rad);
                  return (
                    <div key={i} style={{ position: "absolute", left: cx - b.size / 2, top: cy - b.size / 2, width: b.size, height: b.size }}>
                      <div title={b.name} style={{ width: "100%", height: "100%", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", animation: "h22spinr 50s linear infinite", background: b.more || b.label ? "var(--s2)" : "#fff", border: b.more || b.label ? "1px solid var(--w14)" : "1px solid var(--logo-ring)", boxShadow: "0 12px 28px -12px var(--sh2)", color: "var(--mut)" }}>
                        {b.more
                          ? <i className="fa-solid fa-ellipsis" style={{ fontSize: 18 }} />
                          : b.label
                          ? <span style={{ fontSize: 11.5, fontWeight: 700, color: "var(--tx3)" }}>{b.label}</span>
                          /* eslint-disable-next-line @next/next/no-img-element */
                          : <img src={b.src} alt={b.name} style={{ width: "54%", height: "54%", objectFit: "contain" }} />}
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* center core */}
              <div style={{ position: "absolute", left: 210 - 56, top: 210 - 56, width: 112, height: 112, borderRadius: "50%", background: "var(--core-bg)", border: "1px solid rgba(44,118,237,.45)", boxShadow: "0 0 0 8px rgba(44,118,237,.06), 0 24px 56px -20px rgba(44,118,237,.6)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                <div style={{ fontFamily: DISP, fontWeight: 700, fontSize: 24, letterSpacing: "-.02em" }}>hello<span style={{ color: "var(--lime)" }}>22</span></div>
                <div style={{ fontSize: 10, color: "var(--mut)", letterSpacing: ".06em", marginTop: 3, textTransform: "uppercase" }}>AI Receptionist</div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* VALUE BAND */}
      <section style={{ position: "relative", zIndex: 1, maxWidth: 1536, margin: "0 auto", padding: "64px 28px 100px" }}>
        <div data-rv className="band-pad" style={{ position: "relative", overflow: "hidden", background: "var(--band-bg)", border: "1px solid var(--w10)", borderRadius: 26, padding: "56px 40px", textAlign: "center" }}>
          <div style={{ ...eyebrow }}>Why hello22</div>
          <h2 style={{ fontFamily: DISP, fontWeight: 600, letterSpacing: "-.02em", fontSize: "clamp(23px,4.2vw,40px)", lineHeight: 1.14, margin: "12px 0 0", maxWidth: 760, marginLeft: "auto", marginRight: "auto" }}><b style={BD}>Every missed call</b> is a <span style={HL}>missed customer</span>.</h2>
          <p style={{ fontSize: 17, color: "var(--mut)", maxWidth: 560, margin: "16px auto 0", lineHeight: 1.6 }}><strong style={{ fontWeight: 800, color: "var(--tx2)" }}>hello22 picks up every time</strong> — turning your phone into booked jobs, captured leads, and happy callers instead of voicemail.</p>
          <div className="stat4" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18, marginTop: 40, maxWidth: 820, marginLeft: "auto", marginRight: "auto" }}>
            {[
              { ic: "fa-phone-volume", t: "Answers 24/7", d: "Never sends a caller to voicemail again — day, night, weekends, holidays." },
              { ic: "fa-user-plus", t: "Captures every lead", d: "Gets the caller's name, number, and what they need on every call — so you never lose a lead." },
              { ic: "fa-comment-dots", t: "Summary every call", d: "Texts and emails you the caller's details and a summary the moment they hang up." },
            ].map((x) => (
              <div key={x.t} style={{ background: "var(--w04)", border: "1px solid var(--w09)", borderRadius: 18, padding: "26px 22px" }}>
                <div style={{ width: 46, height: 46, margin: "0 auto", borderRadius: 13, background: "rgba(44,118,237,.14)", border: "1px solid rgba(44,118,237,.3)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--lime)", fontSize: 18 }}><i className={`fa-solid ${x.ic}`} /></div>
                <div style={{ fontFamily: SUB, fontWeight: 700, fontSize: 18, marginTop: 16 }}>{x.t}</div>
                <p style={{ fontSize: 14, color: "var(--mut)", lineHeight: 1.55, margin: "8px 0 0" }}>{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EARLY ACCESS */}
      <section style={{ position: "relative", zIndex: 1, maxWidth: 1536, margin: "0 auto", padding: "64px 28px 112px" }}>
        <div data-rv style={eyebrow}>Early access</div>
        <h2 data-rv style={{ ...h2, maxWidth: 640, margin: "14px 0 12px" }}><b style={BD}>What you get</b> from <span style={HL}>day one</span>.</h2>
        <p data-rv style={{ fontSize: 18, color: "var(--mut)", maxWidth: 600, margin: "0 0 34px", lineHeight: 1.6 }}><strong style={{ fontWeight: 800, color: "var(--tx2)" }}>hello22 is in early access.</strong> Here&apos;s exactly what your AI receptionist does the moment you go live — no inflated claims.</p>
        <div className="uc-grid snap-x" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }}>
          {[
            { ic: "fa-phone-volume", t: "Answers every call", d: "24/7 — no missed calls, no hold music, no voicemail. Every caller gets a real, natural conversation.", bg: "rgba(44,118,237,.16)", c: "var(--lime)" },
            { ic: "fa-bolt", t: "Live in minutes", d: "Describe your agent, connect your tools, pick a number. No code, no telephony setup, no flowcharts.", bg: "rgba(86,224,224,.16)", c: "var(--cyan)" },
            { ic: "fa-file-lines", t: "Every call captured", d: "Transcribed, summarised, and analysed automatically — delivered by SMS, WhatsApp, and email the moment the call ends.", bg: "rgba(157,139,255,.16)", c: "var(--violet)" },
          ].map((t) => (
            <div key={t.t} data-rv className="lift" style={{ ...card, padding: 28, display: "flex", flexDirection: "column" }}>
              <div style={{ width: 46, height: 46, borderRadius: 13, background: t.bg, color: t.c, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 19 }}><i className={`fa-solid ${t.ic}`} /></div>
              <h3 style={{ fontFamily: SUB, fontWeight: 700, fontSize: 19, margin: "18px 0 0" }}>{t.t}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--mut)", margin: "10px 0 0" }}>{t.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="sec-alt" style={{ position: "relative", zIndex: 1, maxWidth: 1536, margin: "0 auto", padding: "96px 28px 112px", scrollMarginTop: 90 }}>
        <div data-rv>
          <div style={eyebrow}>Testimonials</div>
          <h2 style={{ ...h2 }}><b style={BD}>What our clients</b> <span style={HL}>say.</span></h2>
          <p style={{ fontSize: 18, color: "var(--mut)", margin: "16px 0 0", maxWidth: 560, lineHeight: 1.6 }}><strong style={{ fontWeight: 800, color: "var(--tx2)" }}>We&apos;re proud</strong> of every call we answer. Here&apos;s what business owners had to say after putting hello22 on their front desk.</p>
        </div>
        <div className="testi-grid">
          {/* rating column */}
          <div data-rv style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", gap: 20, padding: "10px 4px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 54, height: 54, flexShrink: 0, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }} aria-hidden="true">
                <svg width="27" height="27" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                </svg>
              </div>
              <div>
                <div style={{ fontFamily: SUB, fontWeight: 700, fontSize: 19 }}>Google Rating</div>
                <div style={{ display: "flex", alignItems: "center", gap: 9, marginTop: 5 }}>
                  <span aria-hidden="true" style={{ display: "inline-flex", gap: 3, color: "#f6b73c", fontSize: 13 }}>
                    {[0, 1, 2, 3, 4].map((n) => <i key={n} className="fa-solid fa-star" />)}
                  </span>
                  <span style={{ fontWeight: 800, fontSize: 15.5 }}>4.9<span style={{ color: "var(--mut)", fontWeight: 600 }}>/5</span></span>
                </div>
              </div>
            </div>
            <p style={{ fontSize: 14.5, color: "var(--mut)", lineHeight: 1.6, margin: 0 }}>Real reviews from businesses using hello22 as their 24/7 front desk.</p>
            <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className="btnp" style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none", background: "var(--lime)", color: "#fff", fontWeight: 700, fontSize: 15, padding: "13px 24px", borderRadius: 999, boxShadow: "0 14px 30px -14px rgba(44,118,237,.7)" }}><BtnTxt t="Read Google Reviews" /> <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: 12 }} aria-hidden="true" /></a>
          </div>
          {/* review cards */}
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} data-rv className="lift" style={{ ...card, display: "flex", flexDirection: "column", padding: 26, margin: 0 }}>
              <div aria-label={`Rated ${t.stars} out of 5 stars`} style={{ display: "flex", gap: 4, fontSize: 15 }}>
                {[0, 1, 2, 3, 4].map((n) => {
                  const full = n + 1 <= Math.floor(t.stars);
                  const half = !full && t.stars > n;
                  return <i key={n} className={`fa-solid ${half ? "fa-star-half-stroke" : "fa-star"}`} style={{ color: full || half ? "#f6b73c" : "var(--w18)" }} aria-hidden="true" />;
                })}
              </div>
              <blockquote style={{ flex: 1, fontSize: 15, lineHeight: 1.65, color: "var(--tx3)", margin: "16px 0 0" }}>&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption style={{ display: "flex", alignItems: "center", gap: 12, borderTop: "1px solid var(--w08)", marginTop: 20, paddingTop: 18 }}>
                <img src={t.img} alt={t.name} width={44} height={44} loading="lazy" style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(44,118,237,.35)" }} />
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 14.5, fontWeight: 700, color: "var(--tx)" }}>{t.name}</div>
                  <div style={{ fontSize: 12.5, color: "var(--mut)", marginTop: 2 }}>{t.role}</div>
                </div>
                <i className="fa-solid fa-quote-right" style={{ marginLeft: "auto", fontSize: 30, color: "rgba(44,118,237,.22)", flexShrink: 0 }} aria-hidden="true" />
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ position: "relative", zIndex: 1, maxWidth: 1536, margin: "0 auto", padding: "64px 28px 112px", scrollMarginTop: 90 }}>
        <div data-rv>
          <div style={eyebrow}>Pricing</div>
          <h2 style={{ ...h2 }}><b style={BD}>Simple plans.</b> <span style={HL}>Cancel anytime.</span></h2>
          <p style={{ fontSize: 18, color: "var(--mut)", margin: "16px 0 0", maxWidth: 520, lineHeight: 1.6 }}><strong style={{ fontWeight: 800, color: "var(--tx2)" }}>No setup fees, no contracts.</strong> Pick a plan and go live today — secure checkout powered by Stripe.</p>
          <div style={{ display: "flex", justifyContent: "flex-start", marginTop: 20 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "8px 18px 8px 9px", borderRadius: 999, background: "rgba(44,118,237,.1)", border: "1px solid rgba(44,118,237,.24)", color: "var(--blue-ink)", fontSize: 14, fontWeight: 600 }}>
              <span style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(44,118,237,.16)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}><i className="fa-solid fa-gift" /></span>
              All plans include a 14-day free trial (30 call minutes)
            </span>
          </div>
        </div>
        <div className="price-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18, marginTop: 42, alignItems: "stretch" }}>
          {PLANS.map((p) => (
            <div key={p.name} data-rv className={p.popular ? "" : "lift"} style={{ position: "relative", display: "flex", flexDirection: "column", background: "var(--surface)", border: p.popular ? "1.5px solid rgba(44,118,237,.55)" : "1px solid var(--w09)", borderRadius: 22, overflow: "hidden", boxShadow: p.popular ? "0 30px 70px -34px rgba(44,118,237,.45)" : "none" }}>
              {p.popular && <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", background: "var(--lime)", color: "#fff", fontSize: 11.5, fontWeight: 800, padding: "6px 16px", borderRadius: "0 0 12px 12px", textTransform: "uppercase", letterSpacing: ".07em" }}>Most popular</div>}
              <div style={{ padding: p.popular ? "38px 24px 0" : "24px 24px 0", display: "flex", flexDirection: "column", flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
                  <span style={{ width: 46, height: 46, borderRadius: "50%", flexShrink: 0, background: p.violet ? "rgba(157,139,255,.16)" : "rgba(44,118,237,.12)", border: p.violet ? "1px solid rgba(157,139,255,.32)" : "1px solid rgba(44,118,237,.28)", color: p.violet ? "var(--violet)" : "var(--blue-ink)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}><i className={p.icon} aria-hidden="true" /></span>
                  <span style={{ minWidth: 0 }}>
                    <span style={{ display: "block", fontFamily: SUB, fontWeight: 700, fontSize: 19 }}>{p.name}</span>
                    <span style={{ display: "block", fontSize: 13, color: "var(--mut)", marginTop: 2 }}>{p.blurb}</span>
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 7, margin: "18px 0 14px" }}><span style={{ fontFamily: SUB, fontWeight: 700, fontSize: 17, color: "var(--tx3)" }}>AUD</span><span style={{ fontFamily: SUB, fontWeight: 700, fontSize: 42, color: "var(--tx)", letterSpacing: "-.02em", lineHeight: 1 }}>{p.price}</span><span style={{ fontSize: 15, fontWeight: 600, color: "var(--mut)" }}>/ month</span></div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 18 }}>
                  {p.caps.map((c) => (
                    <span key={c.label} style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 12.5, fontWeight: 700, padding: "7px 12px", borderRadius: 999, background: c.blue ? "rgba(44,118,237,.12)" : "var(--w05)", border: c.blue ? "1px solid rgba(44,118,237,.28)" : "1px solid var(--w10)", color: c.blue ? "var(--blue-ink)" : "var(--tx3)" }}><i className={c.icon} aria-hidden="true" />{c.label}</span>
                  ))}
                </div>
                <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="btnp" style={p.popular
                  ? { display: "block", textAlign: "center", textDecoration: "none", background: "var(--lime)", color: "#fff", fontWeight: 700, fontSize: 15, padding: "13px 16px", borderRadius: 14, boxShadow: "0 14px 30px -14px rgba(44,118,237,.7)" }
                  : { display: "block", textAlign: "center", textDecoration: "none", background: "transparent", color: "var(--blue-ink)", fontWeight: 700, fontSize: 15, padding: "13px 16px", borderRadius: 14, border: "1.5px solid rgba(44,118,237,.5)" }}>Get started</a>
                <div style={{ height: 1, background: "var(--w08)", margin: "18px 0 16px" }} />
                <div style={{ display: "flex", flexDirection: "column", gap: 11, flex: 1, paddingBottom: 20 }}>
                  {p.feats.map((f) => (
                    <div key={f.t} style={{ display: "flex", gap: 10, fontSize: 13.5, fontWeight: 600, alignItems: "flex-start", color: f.on ? "var(--tx)" : "var(--dim)" }}>
                      <span style={{ width: 20, height: 20, flexShrink: 0, marginTop: 1, borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 9, background: f.on ? "var(--lime)" : "var(--w06)", border: f.on ? "none" : "1px solid var(--w12)", color: f.on ? "#fff" : "var(--dim)" }}><i className={`fa-solid ${f.on ? "fa-check" : "fa-xmark"}`} aria-hidden="true" /></span>
                      <span style={{ lineHeight: 1.45, textDecoration: f.on ? "none" : "line-through" }}>{f.t}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ background: "rgba(44,118,237,.07)", borderTop: "1px solid rgba(44,118,237,.16)", padding: "13px 16px", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: 13, fontWeight: 700, color: "var(--blue-ink)" }}>
                <i className="fa-solid fa-shield-halved" style={{ fontSize: 12 }} aria-hidden="true" />14-day free trial · Cancel anytime
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="sec-alt" style={{ position: "relative", zIndex: 1, maxWidth: 1536, margin: "0 auto", padding: "96px 28px 112px", scrollMarginTop: 90 }}>
        <div data-rv>
          <div style={eyebrow}>FAQ</div>
          <h2 style={{ ...h2 }}><b style={BD}>Frequently asked</b> <span style={HL}>questions.</span></h2>
          <p style={{ fontSize: 18, color: "var(--mut)", margin: "16px 0 0", maxWidth: 520, lineHeight: 1.6 }}><strong style={{ fontWeight: 800, color: "var(--tx2)" }}>Everything you need to know</strong> about hello22. Can&apos;t find your answer? <a href={APP_URL} target="_blank" rel="noopener noreferrer" style={{ color: "var(--lime)", textDecoration: "none", fontWeight: 600 }}>Get in touch →</a></p>
        </div>
        {/* 2 columns — wide container ka space cover hota hai; har column apni height pe stack karta hai */}
        <div data-rv className="faq-list faq-cols" style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 14, marginTop: 42, alignItems: "start" }}>
          {[0, 1].map((ci) => {
            const visible = showAllFaqs ? FAQS : FAQS.slice(0, FAQ_PREVIEW);
            const half = Math.ceil(visible.length / 2);
            const col = ci === 0 ? visible.slice(0, half) : visible.slice(half);
            const base = ci === 0 ? 0 : half;
            return (
              <div key={ci} style={{ display: "flex", flexDirection: "column", gap: 14, minWidth: 0 }}>
                {col.map((f, j) => {
                  const i = base + j;
                  const open = faqOpen === i;
                  return (
                    <div key={i} style={{ ...card, overflow: "hidden", borderColor: open ? "rgba(44,118,237,.35)" : "var(--w09)", transition: "border-color .25s ease" }}>
                      <button className="faq-q" onClick={() => setFaqOpen(open ? null : i)} aria-expanded={open} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, width: "100%", textAlign: "left", cursor: "pointer", background: "transparent", border: "none", color: "var(--tx)", fontFamily: "inherit", padding: "20px 24px" }}>
                        <span style={{ fontSize: 16.5, fontWeight: 600 }}>{f.q}</span>
                        <span style={{ flexShrink: 0, width: 28, height: 28, borderRadius: "50%", background: open ? "var(--lime)" : "var(--w06)", border: open ? "none" : "1px solid var(--w14)", color: open ? "#fff" : "var(--mut)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12, transition: "all .25s ease", transform: open ? "rotate(180deg)" : "none" }}><i className="fa-solid fa-chevron-down" /></span>
                      </button>
                      <div style={{ display: "grid", gridTemplateRows: open ? "1fr" : "0fr", transition: "grid-template-rows .3s ease" }}>
                        <div style={{ overflow: "hidden" }}>
                          <div className="faq-a" style={{ padding: "0 24px 22px" }}>{renderAnswer(f.a)}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", justifyContent: "flex-start", marginTop: 24 }}>
          <button
            onClick={() => {
              if (showAllFaqs && faqOpen !== null && faqOpen >= FAQ_PREVIEW) setFaqOpen(null);
              setShowAllFaqs((s) => !s);
            }}
            className="btnp"
            style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "var(--w06)", color: "var(--tx)", border: "1px solid var(--w14)", cursor: "pointer", fontFamily: "inherit", fontWeight: 600, fontSize: 15, padding: "13px 26px", borderRadius: 999 }}
          >
            {showAllFaqs
              ? <><BtnTxt t="Show fewer questions" /> <i className="fa-solid fa-chevron-up" style={{ fontSize: 11 }} /></>
              : <><BtnTxt t={"Show all " + FAQS.length + " questions"} /> <i className="fa-solid fa-chevron-down" style={{ fontSize: 11 }} /></>}
          </button>
        </div>
      </section>


      {/* FINAL CTA */}
      <section id="cta" style={{ position: "relative", zIndex: 1, maxWidth: 1536, margin: "0 auto", padding: "64px 28px 112px", scrollMarginTop: 90 }}>
        <div data-rv className="cta-pad" style={{ position: "relative", overflow: "hidden", background: "var(--card-grad)", border: "1px solid var(--w10)", borderRadius: 30, padding: "56px 48px" }}>
          {!isLight && <div style={{ position: "absolute", top: -120, left: "20%", width: 520, height: 340, background: "radial-gradient(circle,rgba(44,118,237,.18),transparent 70%)", filter: "blur(20px)", pointerEvents: "none", animation: "h22glowpulse 5.5s ease-in-out infinite" }} />}
          <div className="cta-grid" style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
            {/* LEFT — say hello */}
            <div>
              <h2 style={{ fontFamily: DISP, fontWeight: 600, letterSpacing: "-.04em", fontSize: "clamp(44px,6vw,80px)", lineHeight: .95, margin: 0 }}>say hello<span style={{ color: "var(--lime)" }}>.</span></h2>
              <p style={{ fontFamily: SUB, fontSize: "clamp(20px,2.2vw,26px)", fontWeight: 600, color: "var(--tx2)", margin: "12px 0 0" }}>to your new <span style={HL}>voice agent</span>.</p>
              <p style={{ fontSize: 17, color: "var(--mut)", maxWidth: 440, margin: "20px 0 0", lineHeight: 1.6 }}><strong style={{ fontWeight: 800, color: "var(--tx2)" }}>Deploy your first voice agent</strong> in minutes. 14-day free trial with 30 call minutes — a card is required to activate.</p>
              <div style={{ display: "flex", gap: 14, marginTop: 30, flexWrap: "wrap" }}>
                <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="btnp" style={{ textDecoration: "none", background: "var(--lime)", color: "#fff", fontWeight: 700, fontSize: 16, padding: "15px 26px", borderRadius: 999, boxShadow: "0 16px 38px -14px rgba(44,118,237,.7)" }}><BtnTxt t="Start free trial" /></a>
              </div>
              <div style={{ display: "flex", gap: 20, marginTop: 26, flexWrap: "wrap", fontSize: 13.5, color: "var(--mut)" }}>
                {[
                  { ic: "fa-regular fa-calendar-check", t: "14-day free trial" },
                  { ic: "fa-solid fa-rotate-left", t: "Cancel anytime" },
                  { ic: "fa-solid fa-lock", t: "Encrypted & never sold" },
                ].map((x) => (
                  <span key={x.t} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 24, height: 24, borderRadius: "50%", flexShrink: 0, background: "rgba(44,118,237,.12)", border: "1px solid rgba(44,118,237,.25)", color: "var(--blue-ink)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10.5 }}><i className={x.ic} aria-hidden="true" /></span>
                    {x.t}
                  </span>
                ))}
              </div>
            </div>
            {/* RIGHT — demo form */}
            <div ref={ctaFormRef} style={{ willChange: "transform" }}>
            <div className="form-card" style={{ background: "var(--form-bg)", border: "1px solid var(--w10)", borderRadius: 22, padding: 26 }}>
              <h3 style={{ fontFamily: SUB, fontWeight: 700, fontSize: 24, margin: 0 }}>Book a <span style={HL}>Free Demo</span></h3>
              {demoStatus === "ok" ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, textAlign: "center", padding: "40px 10px" }}>
                  <span style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(44,118,237,.16)", color: "var(--lime)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}><i className="fa-solid fa-check" /></span>
                  <div style={{ fontFamily: SUB, fontWeight: 700, fontSize: 20 }}>Thanks — request received!</div>
                  <p style={{ fontSize: 14.5, color: "var(--mut)", margin: 0, maxWidth: 320 }}>Our team will get back to you within 30 minutes. Taking you to the hello22 app…</p>
                </div>
              ) : (
                <form onSubmit={submitDemo} style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 12 }}>
                  <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" style={{ display: "none" }} />
                  <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <input name="name" required placeholder="Full Name" style={inp} />
                    <input name="business" required placeholder="Business Name" style={inp} />
                  </div>
                  <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <input name="email" type="email" required placeholder="Business Email" style={inp} />
                    <input name="phone" type="tel" required placeholder="Phone Number" style={inp} />
                  </div>
                  <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
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
                  <button type="submit" disabled={demoStatus === "sending"} className="btnp" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10, border: "none", cursor: demoStatus === "sending" ? "wait" : "pointer", fontFamily: "inherit", fontWeight: 700, fontSize: 15.5, color: "#fff", padding: "14px 18px", borderRadius: 12, background: "var(--lime)", opacity: demoStatus === "sending" ? 0.7 : 1, boxShadow: "0 16px 38px -16px rgba(44,118,237,.7)" }}>
                    {demoStatus === "sending" ? "Sending…" : <><BtnTxt t="Book My Demo" /> <i className="fa-solid fa-calendar-check" /></>}
                  </button>
                  {demoStatus === "err"
                    ? <p style={{ fontSize: 13, color: "#ff8585", textAlign: "center", margin: 0 }}>Something went wrong. Please try again or email connect@hello22.ai.</p>
                    : <p style={{ fontSize: 13, color: "var(--lime)", textAlign: "center", margin: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}><i className="fa-regular fa-clock" /> We&apos;ll respond within 30 minutes</p>}
                </form>
              )}
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER — floating rounded card (reference: compact SaaS footer, no empty space) */}
      <footer style={{ position: "relative", zIndex: 1, padding: "0 28px 56px" }}>
        <div style={{ maxWidth: 1536, margin: "0 auto", background: "var(--surface)", border: "1px solid var(--w09)", borderRadius: 28, overflow: "hidden" }}>
          <div className="footer-grid" style={{ padding: "44px 40px 36px", display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: 40, alignItems: "start" }}>
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}<img src={isLight ? LOGO_LIGHT : LOGO} alt="hello22.ai" style={{ height: 34, width: "auto", display: "block", filter: "var(--logo-filter)" }} />
              <p style={{ fontSize: 14.5, color: "var(--mut)", lineHeight: 1.6, margin: "16px 0 0", maxWidth: 280 }}>Your 24/7 AI voice receptionist — answers every call, books appointments, and never misses a customer.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 18, fontSize: 14 }}>
                <a href={`mailto:${SUPPORT_EMAIL}`} className="nl" style={{ display: "inline-flex", alignItems: "center", gap: 10 }}><i className="fa-regular fa-envelope" style={{ color: "var(--blue-ink)", fontSize: 14 }} aria-hidden="true" />{SUPPORT_EMAIL}</a>
              </div>
            </div>
            {([
              { t: "Product", l: [{ n: "Features", h: "#features" }, { n: "Voices", h: "#voices" }, { n: "Integrations", h: "#integrations" }, { n: "Pricing", h: "#pricing" }, { n: "Live demo", h: "#demo" }, { n: "FAQ", h: "#faq" }] },
              // Company pages abhi bane nahi hain — un links ko plain text rakha hai; Support email pe jata hai
              { t: "Company", l: [{ n: "About" }, { n: "Contact" }, { n: "Blog" }, { n: "Support", h: `mailto:${SUPPORT_EMAIL}` }] },
            ] as { t: string; l: { n: string; h?: string }[] }[]).map((col) => (
              <div key={col.t}>
                <div style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--dim)", marginBottom: 16 }}>{col.t}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 11, fontSize: 14.5 }}>
                  {col.l.map((l) => l.h
                    ? <a key={l.n} className="nl" href={l.h}>{l.n}</a>
                    : <span key={l.n} style={{ color: "var(--dim)", cursor: "default", padding: "3px 0" }}>{l.n}</span>)}
                </div>
              </div>
            ))}
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--dim)", marginBottom: 16 }}>Follow us</div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>{[
                { ic: "fa-facebook-f", href: "https://www.facebook.com/hello22ai" },
                { ic: "fa-instagram", href: "https://www.instagram.com/hello22.ai" },
                { ic: "fa-pinterest-p", href: "https://www.pinterest.com/hello22_ai" },
                { ic: "fa-linkedin-in", href: "https://www.linkedin.com/company/hello22-ai" },
              ].map((s) => {
                const st: React.CSSProperties = { width: 38, height: 38, borderRadius: "50%", background: "var(--w05)", border: "1px solid var(--w10)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--mut)", fontSize: 14, cursor: "pointer", textDecoration: "none" };
                return <a key={s.ic} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.ic} style={st}><i className={`fa-brands ${s.ic}`} /></a>;
              })}</div>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--mut)", marginTop: 18 }}><span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--lime)", animation: "h22pulse 1.6s infinite" }} />All systems operational</span>
            </div>
          </div>
          <div className="footer-bottom" style={{ padding: "18px 40px", borderTop: "1px solid var(--w07)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
            <span style={{ fontSize: 13.5, color: "var(--dim)" }}>© 2026 hello22.ai · <a href="https://sparkview.com.au" target="_blank" rel="noopener noreferrer" style={{ color: "var(--mut)", textDecoration: "none", fontWeight: 600 }}>Powered by SparkView</a></span>
            <span style={{ display: "flex", alignItems: "center", gap: 24, fontSize: 13.5 }}>
              <a className="nl" href="/terms">Terms of Use</a>
              <a className="nl" href="/privacy">Privacy Policy</a>
            </span>
          </div>
        </div>
      </footer>

      {/* LIGHTBOX */}
      {lightbox && (
        <div onClick={() => setLightbox(null)} style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(5,5,10,.88)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 28, cursor: "zoom-out" }}>
          <button onClick={() => setLightbox(null)} aria-label="Close" style={{ position: "absolute", top: 22, right: 26, width: 42, height: 42, borderRadius: "50%", background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.18)", color: "#fff", fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><i className="fa-solid fa-xmark" /></button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={lightbox} alt="Product screenshot" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "94vw", maxHeight: "90vh", width: "auto", height: "auto", borderRadius: 12, border: "1px solid rgba(255,255,255,.14)", boxShadow: "0 40px 100px -30px rgba(0,0,0,.9)", cursor: "default" }} />
        </div>
      )}
    </div>
  );
}
