"use client";

import { useEffect, useRef, useState } from "react";

// Fonts (Manrope/Space Grotesk/Conthrax) are declared in app/layout.tsx so next/font
// preloads them — declared here (client component) they emit no preload and LCP suffers.
const DISP = "'Conthrax', var(--font-space), 'Space Grotesk', sans-serif";
// Sub-heads, card titles, numbers, UI labels — Conthrax sirf display/buttons/eyebrows ke liye.
const SUB = "var(--font-space), 'Space Grotesk', sans-serif";
// Flat combined logo (senior ne 3D animated icon reject kiya — revert 2026-07-06 raat).
const LOGO = "/hello22-logo.png"; // white wordmark — dark theme
const LOGO_LIGHT = "/images/hello22-logo-color.svg"; // black + brand-blue wordmark — light theme
const APP_URL = "https://app.hello22.ai/";
const LOGIN_URL = "https://app.hello22.ai/login";
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
    "--sec-alt": "#10101a",
    "--sec-tint": "#0c1322",
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
    "--sec-alt": "#ffffff",
    "--sec-tint": "#edf3fd",
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

// Nav (2026-07-10): About us/Contact pages add hue; Product/Voices nav se hataye (sections
// page par maujood hain aur footer se linked) — 9 links crowded ho jaate the.
// 2026-07-13: Blog add, FAQ removed (section footer se linked hai) — 7 par cap.
const NAV_LINKS: { n: string; h: string }[] = [
  { n: "Demo", h: "#demo" },
  { n: "Features", h: "#features" },
  { n: "Industries", h: "#industries" },
  { n: "Pricing", h: "#pricing" },
  { n: "Blog", h: "/blog" },
  { n: "About us", h: "/about" },
  { n: "Contact", h: "/contact" },
];

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
  { name: "HVAC Business", icon: "fa-fan", kpi: "4m 12s avg call duration", title: "Never Miss Another Emergency Service Call.", body: "Answer every incoming call, schedule installations, book repair appointments, qualify emergency requests, and dispatch technicians instantly — 24/7, even after business hours.", stats: [{ v: "4m 12s", l: "Avg call" }, { v: "91%", l: "Appointments booked" }, { v: "4.9/5", l: "Customer satisfaction" }], tags: ["Emergency Dispatch", "Maintenance Booking", "Service Scheduling", "Quote Requests"] },
  { name: "Cleaning Business", icon: "fa-broom", kpi: "2m 56s avg call duration", title: "Book More Cleaning Jobs Without Hiring More Staff.", body: "Capture every enquiry, schedule residential and commercial cleaning, provide instant quotes, answer common questions, and send confirmations automatically.", stats: [{ v: "2m 56s", l: "Avg call" }, { v: "89%", l: "Leads captured" }, { v: "4.8/5", l: "Customer rating" }], tags: ["Instant Quotes", "Recurring Cleaning", "Booking Confirmation", "Lead Qualification"] },
  { name: "Electrical Services", icon: "fa-bolt", kpi: "3m 28s avg call duration", title: "Every Urgent Electrical Call Answered Instantly.", body: "Handle emergency service requests, schedule inspections, qualify electrical issues, route priority jobs, and keep customers informed without missing a single call.", stats: [{ v: "3m 28s", l: "Avg call" }, { v: "93%", l: "Calls answered" }, { v: "4.9/5", l: "Customer satisfaction" }], tags: ["Emergency Callouts", "Inspection Booking", "Service Dispatch", "Customer Updates"] },
  { name: "Plumbing Business", icon: "fa-faucet-drip", kpi: "3m 47s avg call duration", title: "Turn Plumbing Emergencies into Booked Jobs Automatically.", body: "Answer urgent plumbing enquiries, schedule repairs, prioritize emergency leaks, collect customer details, and dispatch technicians immediately.", stats: [{ v: "3m 47s", l: "Avg call" }, { v: "95%", l: "Jobs scheduled" }, { v: "4.9/5", l: "Customer rating" }], tags: ["Emergency Plumbing", "Leak Detection", "Appointment Booking", "Technician Dispatch"] },
  { name: "Painting Services", icon: "fa-paint-roller", kpi: "3m 05s avg call duration", title: "Convert More Quote Requests into Paying Customers.", body: "Qualify painting enquiries, collect project details, schedule site inspections, send estimates, and book consultations automatically with every incoming call.", stats: [{ v: "3m 05s", l: "Avg call" }, { v: "88%", l: "Quotes booked" }, { v: "4.8/5", l: "Client satisfaction" }], tags: ["Quote Requests", "Site Visits", "Residential Painting", "Commercial Projects"] },
  { name: "Flooring Services", icon: "fa-ruler-combined", kpi: "3m 34s avg call duration", title: "Capture Every Flooring Enquiry Before Your Competitors Do.", body: "Book flooring consultations, collect room measurements, answer product questions, schedule on-site estimates, and follow up automatically with potential customers.", stats: [{ v: "3m 34s", l: "Avg call" }, { v: "90%", l: "Consultations booked" }, { v: "4.9/5", l: "Customer satisfaction" }], tags: ["Floor Estimates", "Installation Booking", "Product Enquiries", "Site Measurement"] },
  { name: "Carpenter", icon: "fa-hammer", kpi: "3m 18s avg call duration", title: "Book More Carpentry Projects Without Missing a Call.", body: "Capture every enquiry, schedule on-site consultations, answer service questions, collect project details, and qualify leads before they reach your team.", stats: [{ v: "3m 18s", l: "Avg call" }, { v: "90%", l: "Leads captured" }, { v: "4.8/5", l: "Customer satisfaction" }], tags: ["Custom Furniture", "Site Visits", "Quote Requests", "Lead Qualification"] },
  { name: "Handyman", icon: "fa-screwdriver-wrench", kpi: "2m 49s avg call duration", title: "Handle Every Repair Request, Even After Hours.", body: "Answer customer enquiries, book repair appointments, prioritize urgent jobs, collect job details, and route requests to the right technician automatically.", stats: [{ v: "2m 49s", l: "Avg call" }, { v: "92%", l: "Jobs booked" }, { v: "4.8/5", l: "Customer rating" }], tags: ["Repair Booking", "Job Scheduling", "Emergency Repairs", "Customer Support"] },
  { name: "Fencing Contractors", icon: "fa-road-barrier", kpi: "3m 22s avg call duration", title: "Convert Fencing Enquiries into Booked Site Inspections.", body: "Schedule consultations, capture property details, answer common questions, qualify fencing projects, and book on-site measurements without missing a lead.", stats: [{ v: "3m 22s", l: "Avg call" }, { v: "89%", l: "Inspections booked" }, { v: "4.9/5", l: "Customer satisfaction" }], tags: ["Site Inspections", "Quote Requests", "Property Measurements", "Project Scheduling"] },
  { name: "Pool Cleaners", icon: "fa-water-ladder", kpi: "2m 41s avg call duration", title: "Keep Your Schedule Full with Automated Booking.", body: "Book recurring pool cleaning services, answer maintenance enquiries, schedule emergency visits, and send appointment confirmations automatically.", stats: [{ v: "2m 41s", l: "Avg call" }, { v: "94%", l: "Bookings confirmed" }, { v: "4.8/5", l: "Customer rating" }], tags: ["Recurring Services", "Maintenance Booking", "Emergency Cleaning", "Appointment Confirmation"] },
];

// Industries UI meta (user mockup 2026-07-10) — list icon colors + detail photo + chat overlay lines.
// Index USECASES ke order se match karta hai. Photos AI-generated (public/images/ind-*.jpg).
const IND_META: { c: string; cb: string; photo: string; chat: [string, string] }[] = [
  { c: "var(--lime)", cb: "rgba(44,118,237,.12)", photo: "/images/ind-hvac.jpg", chat: ["Hi, my AC isn't cooling properly.", "I'm sorry to hear that. I can have a technician available today. Would you like me to check availability?"] },
  { c: "#14a3a3", cb: "rgba(20,163,163,.12)", photo: "/images/ind-cleaning.jpg", chat: ["Can I book a weekly house clean?", "Absolutely — we have Thursday mornings open. Shall I set up a recurring visit?"] },
  { c: "var(--violet)", cb: "rgba(157,139,255,.14)", photo: "/images/ind-electrical.jpg", chat: ["Half my power points stopped working.", "That needs a licensed electrician. I can book one for this afternoon — does 2 PM work?"] },
  { c: "var(--lime)", cb: "rgba(44,118,237,.12)", photo: "/images/ind-plumbing.jpg", chat: ["My hot water system is leaking.", "Let's get that sorted quickly. A plumber can be there tomorrow at 9 AM — shall I book it?"] },
  { c: "#e2564d", cb: "rgba(226,86,77,.12)", photo: "/images/ind-painting.jpg", chat: ["I'd like a quote to paint my living room.", "Happy to help — I can book a free site visit this week. Does Wednesday suit you?"] },
  { c: "#f59e0b", cb: "rgba(245,158,11,.14)", photo: "/images/ind-flooring.jpg", chat: ["Do you install hybrid flooring?", "We do! I can arrange a free measure and quote — what day works for you?"] },
  { c: "#f59e0b", cb: "rgba(245,158,11,.14)", photo: "/images/ind-carpenter.jpg", chat: ["Can you build custom wardrobes?", "Yes — I'll book a consultation so we can discuss your design. How's Friday?"] },
  { c: "#14a3a3", cb: "rgba(20,163,163,.12)", photo: "/images/ind-handyman.jpg", chat: ["My fence gate won't close properly.", "Easy fix — I can have someone out tomorrow morning. Shall I book it in?"] },
  { c: "var(--violet)", cb: "rgba(157,139,255,.14)", photo: "/images/ind-fencing.jpg", chat: ["I need a new colorbond fence quoted.", "No problem — I'll schedule a site inspection. Is Saturday morning OK?"] },
  { c: "var(--lime)", cb: "rgba(44,118,237,.12)", photo: "/images/ind-pool.jpg", chat: ["Can you service my pool before summer?", "Of course — I can book your pre-season service for next week. Which day suits?"] },
];
// Detail card ke tag chips ke icons — position se cycle
const TAG_ICS = ["fa-solid fa-bell", "fa-regular fa-calendar-check", "fa-regular fa-clock", "fa-regular fa-file-lines"];

type Line = { role: "caller" | "agent"; name: string; text: string };
// In lines ka text public/audio/demo/line-<n>.mp3 recordings se word-by-word match hona
// zaroori hai (scripts/generate-voices.mjs ka DEMO block) — text badlo to audio regenerate karo.
// Bubble timestamps — real audio line start-times se computed (line durations 4.5/7.6/1.7/6/4/5.5s + 320ms gaps).
// Audio files badlein to ye bhi recompute karo. Total: ~31s (DEMO_TOTAL).
const TIMES = ["00:00", "00:05", "00:13", "00:15", "00:21", "00:25"];
const DEMO_TOTAL = "00:31";
const TRANSCRIPT: Line[] = [
  { role: "caller", name: "Olivia Brown", text: "Hi, my kitchen tap has been leaking all morning. Could someone come take a look this Friday?" },
  { role: "agent", name: "Sarah · hello22", text: "Of course — we can get a plumber out to you this Friday. What time works best? We have openings at 9 AM or 1 PM." },
  { role: "caller", name: "Olivia Brown", text: "9 AM sounds perfect." },
  { role: "agent", name: "Sarah · hello22", text: "Great — I've booked a technician for 9 AM this Friday for the leaking tap. Can I get a name for the booking?" },
  { role: "caller", name: "Olivia Brown", text: "Sure — it's Olivia Brown. That's B-R-O-W-N." },
  { role: "agent", name: "Sarah · hello22", text: "All booked, Olivia! Friday at 9 AM under Olivia Brown. You'll get a confirmation text shortly." },
];

// Product screenshots — apni software ki images yahan add/remove karein.
// File ko public/images/screenshots/ mein daalein, fir niche ek entry bana dein.
// Image replace karo to ?v= number badhao — warna browser purani cached image dikhata rehta hai.
// Card visuals ab MiniShot HTML/CSS previews hain (user mockup 2026-07-10) — src ki jagah kind.
// Purane real screenshots public/images/screenshots/ mein hi hain agar kabhi wapas chahiye hon.
type Shot = { kind: "dash" | "logs" | "brain" | "billing"; title: string; desc: string; ic: string; c: string; bg: string; pts: string[] };
const SHOTS: Shot[] = [
  { kind: "dash", title: "Call Dashboard", desc: "Monitor calls, performance, and insights in real time.", ic: "fa-solid fa-chart-column", c: "var(--lime)", bg: "rgba(44,118,237,.14)", pts: ["Answered calls & minutes at a glance", "Intent & sentiment tracking", "Daily performance trends"] },
  { kind: "logs", title: "Call Logs", desc: "Review conversations and outcomes instantly.", ic: "fa-solid fa-file-lines", c: "var(--violet)", bg: "rgba(157,139,255,.16)", pts: ["Full transcripts & recordings", "Outcome tags on every call", "Search & filter by caller"] },
  { kind: "brain", title: "AI Agent Builder", desc: "Create and customize your AI agent in minutes.", ic: "fa-solid fa-wand-magic-sparkles", c: "var(--cyan)", bg: "rgba(86,224,224,.15)", pts: ["Set greeting, services & hours", "Pick your agent's voice & style", "Changes go live instantly"] },
  { kind: "billing", title: "Plans & Billing", desc: "Track minutes, switch plans, and control auto-renew.", ic: "fa-solid fa-credit-card", c: "#22b573", bg: "rgba(34,197,94,.14)", pts: ["Live minute usage meter", "Upgrade or switch anytime", "Full control over auto-renew"] },
];

// Platform features — horizontal cards with thumbnails (user mockup 2026-07-10).
// Images AI-generated (public/images/feat-*.jpg). Do columns: left 4, right 3 — mockup ka order.
type Plat = { ic: string; tb: string; tbd: string; tc: string; t: string; d: string; img: string; bic: string; bc: string };
const PLAT_COLS: Plat[][] = [
  [
    { ic: "fa-solid fa-comments", tb: "rgba(44,118,237,.14)", tbd: "rgba(44,118,237,.3)", tc: "var(--lime)", t: "Conversational, Not Scripted", d: "Responds to what the caller actually says and keeps track of the conversation as it goes — holding context across the whole call.", img: "/images/feat-conversational.jpg", bic: "fa-solid fa-ellipsis", bc: "var(--lime)" },
    { ic: "fa-solid fa-language", tb: "rgba(86,224,224,.14)", tbd: "rgba(86,224,224,.3)", tc: "var(--cyan)", t: "English Today — More Coming", d: "Answers in natural English now, with more languages on the roadmap.", img: "/images/feat-english.jpg", bic: "fa-solid fa-globe", bc: "#22b573" },
    { ic: "fa-solid fa-shield-halved", tb: "rgba(157,139,255,.16)", tbd: "rgba(157,139,255,.32)", tc: "var(--violet)", t: "Your Data, Protected", d: "Encrypted in transit, secrets encrypted at rest, and never sold.", img: "/images/feat-security.jpg", bic: "fa-solid fa-shield-halved", bc: "var(--violet)" },
    { ic: "fa-solid fa-arrows-rotate", tb: "rgba(245,158,11,.14)", tbd: "rgba(245,158,11,.32)", tc: "#f59e0b", t: "CRM & Calendar", d: "Connect Google Calendar and push leads to your CRM or any webhook.", img: "/images/feat-calendar.jpg", bic: "fa-regular fa-calendar", bc: "#f59e0b" },
  ],
  [
    { ic: "fa-solid fa-microphone-lines", tb: "rgba(157,139,255,.16)", tbd: "rgba(157,139,255,.32)", tc: "var(--violet)", t: "Studio Voices", d: "Choose from a library of studio-grade English voices to match your brand.", img: "/images/feat-voices.jpg", bic: "fa-solid fa-wave-square", bc: "var(--violet)" },
    { ic: "fa-solid fa-wand-magic-sparkles", tb: "rgba(44,118,237,.12)", tbd: "rgba(44,118,237,.28)", tc: "var(--lime)", t: "Post-Call Automations", d: "After every call, details are captured and pushed to your inbox, CRM, and notifications automatically.", img: "/images/feat-automations.jpg", bic: "fa-solid fa-bolt", bc: "var(--lime)" },
    { ic: "fa-solid fa-chart-line", tb: "rgba(86,224,224,.14)", tbd: "rgba(86,224,224,.3)", tc: "var(--cyan)", t: "Call Analytics & Transcripts", d: "Every call transcribed, summarised, and tagged with intent and sentiment — the summary delivered by email, SMS, and WhatsApp after the call.", img: "/images/feat-analytics.jpg", bic: "fa-solid fa-chart-column", bc: "#14a3a3" },
    // 4th card (2026-07-13): right column 3 cards par gap chhod raha tha — 4/4 balance.
    { ic: "fa-solid fa-headset", tb: "rgba(34,197,94,.14)", tbd: "rgba(34,197,94,.32)", tc: "#22b573", t: "Smart Human Handoff", d: "Set your rules — urgent or complex calls transfer straight to your team, with the conversation context passed along.", img: "/images/demo-agent.jpg", bic: "fa-solid fa-user-check", bc: "#22b573" },
  ],
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

// FAQ items ke icon tiles (user mockup 2026-07-10) — index FAQS ke order se match karta hai
const FAQ_ICS: { ic: string; c: string; bg: string }[] = [
  { ic: "fa-regular fa-comment-dots", c: "var(--lime)", bg: "rgba(44,118,237,.12)" },
  { ic: "fa-solid fa-wand-magic-sparkles", c: "var(--violet)", bg: "rgba(157,139,255,.14)" },
  { ic: "fa-solid fa-sliders", c: "#14a3a3", bg: "rgba(20,163,163,.12)" },
  { ic: "fa-solid fa-phone-volume", c: "#14a3a3", bg: "rgba(20,163,163,.12)" },
  { ic: "fa-regular fa-message", c: "var(--violet)", bg: "rgba(157,139,255,.14)" },
  { ic: "fa-solid fa-link", c: "#f59e0b", bg: "rgba(245,158,11,.14)" },
  { ic: "fa-solid fa-microphone-lines", c: "var(--lime)", bg: "rgba(44,118,237,.12)" },
  { ic: "fa-regular fa-clock", c: "#f59e0b", bg: "rgba(245,158,11,.14)" },
  { ic: "fa-solid fa-arrows-rotate", c: "var(--lime)", bg: "rgba(44,118,237,.12)" },
  { ic: "fa-solid fa-shield-halved", c: "var(--violet)", bg: "rgba(157,139,255,.14)" },
  { ic: "fa-solid fa-headphones", c: "#14a3a3", bg: "rgba(20,163,163,.12)" },
  { ic: "fa-solid fa-user-pen", c: "#f59e0b", bg: "rgba(245,158,11,.14)" },
];

type Cap = { icon: string; label: string; blue?: boolean; ic?: string }; // ic = icon color (reference UI: WhatsApp green etc.)
type Feat = { t: string; on: boolean };
type Plan = { name: string; price: string; icon: string; violet?: boolean; caps: Cap[]; feats: Feat[]; popular?: boolean };
// Pricing (client-final UI, 2026-07-06 raat): icon tile + chips + check/strikethrough list + tinted
// trial footer band — content: AUD 49/69/89, 200 min, 14-day trial (30 min).
const PLANS: Plan[] = [
  {
    name: "Starter", price: "49", icon: "fa-solid fa-paper-plane",
    caps: [{ icon: "fa-solid fa-phone-volume", label: "200 min / month", blue: true }, { icon: "fa-brands fa-whatsapp", label: "WhatsApp", ic: "#25D366" }, { icon: "fa-regular fa-envelope", label: "Email" }],
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
    name: "Standard", price: "69", icon: "fa-solid fa-users", popular: true,
    caps: [{ icon: "fa-solid fa-phone-volume", label: "200 min / month", blue: true }, { icon: "fa-brands fa-whatsapp", label: "WhatsApp", ic: "#25D366" }, { icon: "fa-regular fa-envelope", label: "Email" }, { icon: "fa-solid fa-microphone", label: "Premium voices", ic: "var(--violet)" }],
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
    name: "Premium", price: "89", icon: "fa-solid fa-crown", violet: true,
    caps: [{ icon: "fa-solid fa-phone-volume", label: "200 min / month", blue: true }, { icon: "fa-brands fa-whatsapp", label: "WhatsApp", ic: "#25D366" }, { icon: "fa-regular fa-envelope", label: "Email" }, { icon: "fa-solid fa-comment", label: "SMS" }, { icon: "fa-solid fa-microphone", label: "Premium voices", ic: "var(--violet)" }],
    feats: [
      { t: "200 call minutes each month", on: true },
      { t: "WhatsApp — summary, transcript & recording", on: true },
      { t: "Email — summary, transcript & recording", on: true },
      { t: "Multilingual voice agent", on: true },
      { t: "Free Nexleon CRM setup & Custom CRM integration", on: true },
      { t: "Premium AI voices", on: true },
      { t: "Call summary via SMS", on: true },
    ],
  },
];

// ROI calculator ab apne page par hai — /calculator (components/site22/CalcCard.tsx).
// Pricing section ke andar uska CTA link hai (user request 2026-07-13 v3).

// Human vs AI comparison table — orbit section ki jagah (client reference).
type CmpRow = { f: string; ic: string; h: string; a: string; chip: string };
const COMPARE: CmpRow[] = [
  { f: "Availability", ic: "fa-regular fa-clock", h: "9am–5pm, weekdays", a: "24/7, 365 days a year", chip: "Always on" },
  { f: "Sick Days & Leave", ic: "fa-solid fa-umbrella-beach", h: "Of course! They're human.", a: "Never. Always on duty.", chip: "No days off" },
  { f: "Cost", ic: "fa-solid fa-sack-dollar", h: "Salary, super, leave", a: "One simple flat rate", chip: "Predictable" },
  { f: "Setup Time", ic: "fa-solid fa-bolt", h: "Weeks of hiring & training", a: "Live in minutes", chip: "Quick & easy" },
  { f: "3 Calls at Once?", ic: "fa-solid fa-phone-volume", h: "\u201CPlease hold.\u201D", a: "Easily.", chip: "Unlimited" },
  { f: "Integration", ic: "fa-solid fa-plug", h: "Manual note-taking", a: "Connects to your tools", chip: "Seamless" },
];

// Google reviews CTA — apna Google Business review link yahan daal dein.
const GOOGLE_REVIEWS_URL = "https://www.google.com/search?q=hello22.ai+reviews";
// img optional — photo na ho to card initials avatar dikhata hai. Pehle 3 preview me, baaki "Show all" se.
type Testi = { quote: string; name: string; role: string; img?: string; stars: number };
const TESTIMONIALS: Testi[] = [
  { quote: "We were missing 15 to 20 calls a week — mostly evenings and lunch hours. Since hello22 took over, every call is answered and our bookings are up almost 40%.", name: "Dr. Melissa Tran", role: "Brightside Dental Clinic", img: "/images/portrait-melissa.jpg", stars: 4.5 },
  { quote: "I'm in showings half the day. Now every enquiry is answered instantly, and the caller's details are texted to me before I'm even out of the building.", name: "James Carter", role: "Carter Realty Group", img: "/images/portrait-james.jpg", stars: 5 },
  { quote: "The AI handles appointment calls so smoothly that most clients don't realise they weren't talking to our staff. Our front desk finally has room to breathe.", name: "Priya Sharma", role: "Sharma Immigration Services", img: "/images/portrait-priya.jpg", stars: 5 },
  { quote: "hello22 answers our after-hours emergency calls now. Last month it booked two big jobs that would have gone straight to voicemail.", name: "Mark Reynolds", role: "Reynolds Plumbing Co.", stars: 5 },
  { quote: "Our team is on the tools all day. The AI takes every call, sorts urgent from routine, and the summary lands on WhatsApp before we're off the ladder.", name: "Sophie Nguyen", role: "SparkRight Electrical", stars: 4.5 },
  { quote: "Quotes used to slip through whenever we missed a call. Now every enquiry is captured, and half our bookings happen while we're still on another job.", name: "David Okafor", role: "FreshNest Cleaning", stars: 5 },
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
@keyframes h22popIn{from{opacity:0;transform:scale(.86) translateY(16px)}to{opacity:1;transform:none}}
@keyframes h22fadeIn{from{opacity:0}to{opacity:1}}
.h22.rv [data-rv]{opacity:0;transform:translateY(34px) scale(.985);transition:opacity .7s cubic-bezier(.2,.7,.2,1),transform .75s cubic-bezier(.2,.7,.2,1)}
.h22.rv [data-rv="left"]{transform:translateX(-44px) scale(.99)}
.h22.rv [data-rv="right"]{transform:translateX(44px) scale(.99)}
.h22.rv [data-rv].in{opacity:1;transform:none}
@keyframes h22rise{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:none}}
.h22 .hin{animation:h22rise .7s cubic-bezier(.2,.7,.2,1) both}
.h22 a.nl{color:var(--tx3);text-decoration:none}.h22 a.nl:hover{color:var(--tx)}
.h22 .lift{transition:transform .3s cubic-bezier(.2,.7,.2,1),box-shadow .3s ease,border-color .3s}
.h22 .btnp{transition:transform .18s ease,box-shadow .25s ease}
.h22 .btnp:active{transform:translateY(1px) scale(.98)}
@media(max-width:1080px){.h22 .price-note{display:none!important}}
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
.h22 section.sec-alt::before,.h22 section.sec-tint::before{content:"";position:absolute;top:0;bottom:0;left:50%;transform:translateX(-50%);width:100vw;background:var(--sec-alt);border-top:1px solid var(--w08);border-bottom:1px solid var(--w08);z-index:-1;pointer-events:none}
.h22 section.sec-tint::before{background:var(--sec-tint)}
.h22 .cmp-ai{background:rgba(44,118,237,.07);border-left:1px solid rgba(44,118,237,.16)}
@media(hover:hover){.h22 .cmp-row:not(.cmp-head):hover{background:var(--w04)}}
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
.h22 .testi-grid{display:grid;grid-template-columns:minmax(270px,330px) minmax(0,1fr);gap:18px;margin-top:42px}
@media(max-width:1240px){.h22 .testi-grid{grid-template-columns:minmax(0,1fr)}}
@media(min-width:1441px){
 .h22 section,.h22 .nav-bar{padding-left:48px!important;padding-right:48px!important}
 .h22 .footer-grid,.h22 .footer-bottom{padding-left:48px!important;padding-right:48px!important}
 .h22 .voices-grid{grid-template-columns:repeat(6,minmax(0,1fr))!important}
 .h22 .hero-grid{grid-template-columns:1.15fr minmax(0,680px)!important;gap:80px!important}
 .h22 .demo-grid{grid-template-columns:minmax(0,1fr) 400px!important}
 .h22 #industries .uc-grid{grid-template-columns:360px minmax(0,1120px)!important}
 .h22 .cta-grid{grid-template-columns:1.1fr minmax(0,680px)!important;gap:80px!important}
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
 .h22 .demo-header-grid{grid-template-columns:minmax(0,1fr)!important}
 .h22 .demo-illus,.h22 .prod-illus{display:none!important}
 .h22 .plat-cols{grid-template-columns:minmax(0,1fr)!important}
 .h22 .hiw-arrow{display:none!important}
 .h22 .uc-detail{grid-template-columns:minmax(0,1fr)!important}
 .h22 .uc-photo{min-height:240px!important}
 .h22 .cmp-squig{display:none!important}
 .h22 .nav-logo{height:44px!important}
 .h22 .hero-grid,.h22 .demo-grid,.h22 .uc-grid,.h22 .price-grid,.h22 .cta-grid,.h22 .cmp-grid,.h22 .why-grid{grid-template-columns:minmax(0,1fr)!important}
 .h22 .cmp-grid{gap:28px!important}
 .h22 .feat-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important}
 .h22 .feat-grid>div{grid-column:auto!important}
 .h22 .tcol{grid-column:span 2!important}
 .h22 .footer-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important}
 .h22 .price-grid{max-width:520px}
 .h22 .plan-caps{min-height:0!important}
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
 .h22.rv [data-rv]{transform:translateY(16px) scale(1)}
 .h22.rv [data-rv="left"],.h22.rv [data-rv="right"]{transform:translateY(16px) scale(1)}
 .h22 section>p[data-rv],.h22 section>div[data-rv]>p{font-size:15.5px!important;line-height:1.6!important;margin-top:12px!important}
 .h22 section h2{line-height:1.12!important}
 .h22 .hero-sub{font-size:15.5px!important;margin-top:16px!important}
 .h22 .hero-checks{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:14px!important;margin-top:24px!important}
 .h22 .hero-feat{border-right:none!important;padding-right:0!important}
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
 .h22 .stat4>div>.why-pill{grid-column:2;justify-self:start;margin-top:6px!important}
 .h22 .why-deco{display:none!important}
 .h22 .plat-card{padding:20px 18px!important}
 .h22 .plat-thumb{width:100%!important;height:160px!important}
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
 .h22 .cmp-row{grid-template-columns:minmax(0,1fr) minmax(0,1fr)!important}
 .h22 .cmp-fh{display:none!important}
 .h22 .cmp-row>div{padding:11px 12px!important}
 .h22 .cmp-row>div.cmp-f{grid-column:1 / -1;padding:12px 14px 2px!important}
 .h22 .testi-grid{grid-template-columns:minmax(0,1fr);gap:14px;margin-top:26px}
}
@media(max-width:560px){
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

// Product cards ke mini-UI previews (user mockup 2026-07-10) — real screenshots ki jagah
// HTML/CSS mockups: crisp rehte hain, theme ke saath adapt karte hain. Data mockup wala hi.
function MiniShot({ kind }: { kind: "dash" | "logs" | "brain" | "billing" }) {
  const wrap: React.CSSProperties = { position: "absolute", inset: 0, background: "var(--surface)", display: "flex", flexDirection: "column", overflow: "hidden", padding: 10, gap: 7 };
  const tile: React.CSSProperties = { background: "var(--w04)", border: "1px solid var(--w08)", borderRadius: 8, padding: "7px 9px", minWidth: 0 };
  const lab: React.CSSProperties = { fontSize: 8.5, color: "var(--mut2)", fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" };
  const num: React.CSSProperties = { fontFamily: SUB, fontSize: 13, fontWeight: 700, color: "var(--tx)", marginTop: 2 };
  const head = (ic: string, t: string, right?: React.ReactNode) => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, flexShrink: 0 }}>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 10.5, fontWeight: 700, color: "var(--tx)" }}>
        <span style={{ width: 18, height: 18, borderRadius: 5, background: "rgba(44,118,237,.12)", color: "var(--blue-ink)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 8 }}><i className={ic} aria-hidden="true" /></span>{t}
      </span>
      {right}
    </div>
  );

  if (kind === "dash") return (
    <div style={wrap} aria-hidden="true">
      {head("fa-solid fa-chart-column", "Overview")}
      <div style={{ display: "flex", gap: 6 }}>
        <div style={{ ...tile, flex: 1 }}><div style={lab}>Total Calls</div><div style={num}>3,246</div><svg viewBox="0 0 60 16" style={{ width: "100%", height: 13, marginTop: 3 }}><path d="M1 13 C 10 12, 14 8, 22 9 C 30 10, 34 5, 42 6 C 50 7, 54 2, 59 3" fill="none" stroke="var(--lime)" strokeWidth="1.7" /></svg></div>
        <div style={{ ...tile, flex: 1 }}><div style={lab}>Answered</div><div style={num}>2,834</div><div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}><svg viewBox="0 0 20 20" style={{ width: 15, height: 15 }}><circle cx="10" cy="10" r="7" fill="none" stroke="var(--w10)" strokeWidth="3" /><circle cx="10" cy="10" r="7" fill="none" stroke="#22b573" strokeWidth="3" strokeDasharray="38.3 44" strokeLinecap="round" transform="rotate(-90 10 10)" /></svg><span style={{ fontSize: 8.5, fontWeight: 700, color: "#22b573" }}>87%</span></div></div>
        <div style={{ ...tile, flex: 1 }}><div style={lab}>Avg. Duration</div><div style={num}>02:48</div><svg viewBox="0 0 60 16" style={{ width: "100%", height: 13, marginTop: 3 }}><path d="M1 12 C 12 13, 18 6, 28 8 C 38 10, 44 4, 59 5" fill="none" stroke="var(--violet)" strokeWidth="1.7" /></svg></div>
      </div>
      <div style={{ ...tile, flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={lab}>Performance</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 5, flex: 1, paddingTop: 4 }}>
          {[38, 55, 44, 70, 58, 82, 66, 90, 74, 60, 78, 52].map((h, i) => <span key={i} style={{ flex: 1, height: `${h}%`, borderRadius: 2, background: "rgba(44,118,237,.5)" }} />)}
        </div>
      </div>
    </div>
  );

  if (kind === "logs") {
    const rows: [string, string, string, string, string][] = [
      ["+1 (555) 123-4567", "9:41 AM", "02:31", "Job Booked", "#22b573"],
      ["+1 (555) 987-6543", "9:32 AM", "01:45", "Info Provided", "var(--blue-ink)"],
      ["+1 (555) 456-7890", "9:21 AM", "03:12", "Appointment", "var(--violet)"],
      ["+1 (555) 234-5678", "9:15 AM", "00:58", "No Answer", "#e2564d"],
    ];
    return (
      <div style={wrap} aria-hidden="true">
        {head("fa-regular fa-file-lines", "Call Logs", <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 8.5, color: "var(--mut3)", background: "var(--w04)", border: "1px solid var(--w08)", borderRadius: 999, padding: "4px 9px" }}><i className="fa-solid fa-magnifying-glass" style={{ fontSize: 7 }} aria-hidden="true" />Search logs…</span>)}
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr .8fr .7fr 1fr", gap: 6, fontSize: 8, fontWeight: 700, color: "var(--mut3)", padding: "2px 4px 0" }}>
          <span>Caller</span><span>Time</span><span>Duration</span><span>Outcome</span>
        </div>
        {rows.map((r) => (
          <div key={r[0]} style={{ display: "grid", gridTemplateColumns: "1.4fr .8fr .7fr 1fr", gap: 6, alignItems: "center", fontSize: 8.5, color: "var(--tx3)", background: "var(--w04)", border: "1px solid var(--w07)", borderRadius: 7, padding: "5px 7px", fontVariantNumeric: "tabular-nums" }}>
            <span style={{ fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r[0]}</span><span>{r[1]}</span><span>{r[2]}</span>
            <span style={{ justifySelf: "start", fontSize: 7.5, fontWeight: 700, color: r[4], background: "color-mix(in srgb, "+"currentColor 12%, transparent)".replace("currentColor", r[4]), borderRadius: 999, padding: "2px 7px", whiteSpace: "nowrap" }}>{r[3]}</span>
          </div>
        ))}
      </div>
    );
  }

  if (kind === "brain") return (
    <div style={{ ...wrap, flexDirection: "row", gap: 8 }} aria-hidden="true">
      <div style={{ width: "34%", flexShrink: 0, display: "flex", flexDirection: "column", gap: 3 }}>
        {["Agent Info", "Greeting", "Services", "Availability", "Voice & Style", "Review"].map((t, i) => (
          <span key={t} style={{ fontSize: 8.5, fontWeight: i === 1 ? 700 : 600, color: i === 1 ? "var(--blue-ink)" : "var(--mut2)", background: i === 1 ? "rgba(44,118,237,.12)" : "transparent", borderRadius: 6, padding: "4px 7px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t}</span>
        ))}
      </div>
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 5 }}>
        <div style={lab}>Greeting</div>
        <div style={{ ...tile, fontSize: 8.5, color: "var(--tx3)", fontWeight: 600 }}>Hi! How can I help you today?</div>
        <div style={{ ...lab, marginTop: 2 }}>Services</div>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {["Plumbing", "Repairs", "Installations"].map((t) => <span key={t} style={{ fontSize: 7.5, fontWeight: 700, color: "var(--tx3)", background: "var(--w05)", border: "1px solid var(--w10)", borderRadius: 999, padding: "2px 7px", whiteSpace: "nowrap" }}>{t} ×</span>)}
        </div>
        <div style={{ ...lab, marginTop: 2 }}>Availability</div>
        <div style={{ ...tile, fontSize: 8.5, color: "var(--tx3)", fontWeight: 600, display: "flex", justifyContent: "space-between", gap: 6 }}><span>Mon – Fri</span><span>8:00 AM – 6:00 PM</span></div>
      </div>
    </div>
  );

  // billing
  return (
    <div style={wrap} aria-hidden="true">
      {head("fa-solid fa-credit-card", "Plans & Billing")}
      <div style={lab}>Current Plan</div>
      <div style={{ ...tile, display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6 }}>
          <span style={{ fontSize: 8, fontWeight: 700, color: "var(--blue-ink)", background: "rgba(44,118,237,.12)", borderRadius: 999, padding: "2px 8px" }}>Pro Plan</span>
          <span style={{ fontFamily: SUB, fontSize: 11, fontWeight: 700, color: "var(--tx)" }}>$79<span style={{ fontSize: 7.5, color: "var(--mut2)", fontWeight: 600 }}> /month</span></span>
        </div>
        <div style={{ height: 5, borderRadius: 3, background: "var(--w08)", overflow: "hidden" }}><span style={{ display: "block", width: "48%", height: "100%", borderRadius: 3, background: "var(--lime)" }} /></div>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 6, fontSize: 7.5, color: "var(--mut2)", fontWeight: 600 }}><span>2,430 / 5,000 mins used</span><span>Renews in 12 days</span></div>
      </div>
      <div style={lab}>Add-ons</div>
      {[["fa-regular fa-clock", "Extra Minutes", "+1,000 mins", "$15"], ["fa-solid fa-headset", "Priority Support", "", "$19"]].map((r) => (
        <div key={r[1]} style={{ ...tile, display: "flex", alignItems: "center", gap: 6, padding: "5px 8px" }}>
          <i className={r[0]} style={{ fontSize: 8, color: "var(--blue-ink)" }} aria-hidden="true" />
          <span style={{ fontSize: 8.5, fontWeight: 700, color: "var(--tx3)", flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r[1]}{r[2] && <span style={{ color: "var(--mut3)", fontWeight: 600 }}> {r[2]}</span>}</span>
          <span style={{ fontSize: 8.5, fontWeight: 700, color: "var(--tx)" }}>{r[3]}</span>
        </div>
      ))}
    </div>
  );
}

// How-it-works step cards ke mini-UI windows (user mockup 2026-07-10) — screenshots ki jagah
// HTML/CSS mockups, hello22-app jaisi chhoti windows. Data mockup wala hi.
function StepShot({ step }: { step: 1 | 2 | 3 }) {
  const frame: React.CSSProperties = { position: "relative", borderRadius: 12, overflow: "hidden", border: "1px solid var(--w08)", background: "var(--surface)", height: 226, display: "flex", flexDirection: "column" };
  const bar: React.CSSProperties = { display: "flex", alignItems: "center", gap: 6, padding: "7px 10px", borderBottom: "1px solid var(--w07)", flexShrink: 0 };
  const logo = (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 8.5, fontWeight: 800, color: "var(--tx2)" }}>
      <span style={{ width: 12, height: 12, borderRadius: "50%", background: "rgba(44,118,237,.15)", border: "1px solid rgba(44,118,237,.35)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--blue-ink)", fontSize: 6 }}><i className="fa-solid fa-phone" aria-hidden="true" /></span>
      hello22<span style={{ color: "var(--blue-ink)" }}>.ai</span>
    </span>
  );
  const side: React.CSSProperties = { width: 78, flexShrink: 0, borderRight: "1px solid var(--w07)", padding: "8px 7px", display: "flex", flexDirection: "column", gap: 3 };
  const sideItem = (t: string, active: boolean, c: string) => (
    <span key={t} style={{ fontSize: 7.5, fontWeight: active ? 800 : 600, color: active ? c : "var(--mut3)", background: active ? "color-mix(in srgb, " + c + " 12%, transparent)" : "transparent", borderRadius: 5, padding: "4px 6px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t}</span>
  );
  const chk = (t: string) => (
    <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 8, fontWeight: 600, color: "var(--tx3)" }}>
      <span style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(34,197,94,.15)", color: "#1a9a5c", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 5.5 }}><i className="fa-solid fa-check" aria-hidden="true" /></span>{t}
    </span>
  );
  const fld = (l: string, v: React.ReactNode) => (
    <div key={l}>
      <div style={{ fontSize: 6.5, fontWeight: 700, color: "var(--mut2)", marginBottom: 2 }}>{l}</div>
      <div style={{ fontSize: 8, fontWeight: 600, color: "var(--tx3)", background: "var(--w04)", border: "1px solid var(--w08)", borderRadius: 5, padding: "4px 7px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{v}</div>
    </div>
  );
  const miniCard: React.CSSProperties = { background: "var(--w04)", border: "1px solid var(--w08)", borderRadius: 8, padding: "7px 8px" };

  if (step === 1) return (
    <div style={frame} aria-hidden="true">
      <div style={bar}>{logo}</div>
      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        <div style={side}>
          <span style={{ fontSize: 6.5, fontWeight: 800, letterSpacing: ".08em", color: "var(--mut3)", padding: "0 6px 2px" }}>SETUP</span>
          {sideItem("Agent details", true, "var(--blue-ink)")}{sideItem("Business info", false, "")}{sideItem("Review", false, "")}
        </div>
        <div style={{ flex: 1, minWidth: 0, padding: 9, display: "flex", gap: 8 }}>
          <div style={{ flex: 1.15, minWidth: 0, display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ fontSize: 9.5, fontWeight: 800, color: "var(--tx)" }}>Your AI receptionist is almost ready!</div>
            {chk("Business found")}{chk("Agent configured")}{chk("Knowledge added")}
            <span style={{ marginTop: "auto", alignSelf: "flex-start", fontSize: 8, fontWeight: 700, color: "#fff", background: "var(--lime)", borderRadius: 6, padding: "5px 12px" }}>Review &amp; confirm</span>
          </div>
          <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 7 }}>
            <div style={miniCard}>
              <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 8, fontWeight: 800, color: "var(--tx2)" }}><span style={{ width: 12, height: 12, borderRadius: 4, background: "rgba(44,118,237,.14)", color: "var(--blue-ink)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 6 }}><i className="fa-solid fa-briefcase" aria-hidden="true" /></span>Business</div>
              <div style={{ fontSize: 8.5, fontWeight: 700, color: "var(--tx3)", marginTop: 3 }}>Apex Plumbing</div>
              <div style={{ fontSize: 7, color: "var(--mut3)", marginTop: 2 }}>Industry<br />Plumbing</div>
            </div>
            <div style={miniCard}>
              <div style={{ fontSize: 8, fontWeight: 800, color: "var(--tx2)" }}>Your agent</div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/avatar-sarah.jpg" alt="" width={18} height={18} loading="lazy" style={{ width: 18, height: 18, borderRadius: "50%", objectFit: "cover" }} />
                <span style={{ minWidth: 0 }}>
                  <span style={{ display: "block", fontSize: 8.5, fontWeight: 700, color: "var(--tx3)" }}>Sarah</span>
                  <span style={{ display: "block", fontSize: 6.5, color: "var(--mut3)" }}>Natural, Friendly, Professional</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (step === 2) return (
    <div style={frame} aria-hidden="true">
      <div style={bar}>{logo}</div>
      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        <div style={side}>
          <span style={{ fontSize: 6.5, fontWeight: 800, letterSpacing: ".08em", color: "var(--mut3)", padding: "0 6px 2px" }}>ACCOUNT</span>
          {sideItem("Account", true, "var(--violet)")}{sideItem("Details", false, "")}{sideItem("Preferences", false, "")}{sideItem("Notifications", false, "")}
        </div>
        <div style={{ flex: 1, minWidth: 0, padding: 9, display: "flex", gap: 8 }}>
          <div style={{ flex: 1.2, minWidth: 0, display: "flex", flexDirection: "column", gap: 5 }}>
            <div style={{ fontSize: 9.5, fontWeight: 800, color: "var(--tx)" }}>Create your account</div>
            {fld("Full name", "John Carter")}
            {fld("Email", "john@apexplumbing.com")}
            {fld("Mobile number", <><span aria-hidden="true">🇦🇺</span> +61 412 345 678</>)}
            <span style={{ marginTop: "auto", alignSelf: "flex-start", fontSize: 8, fontWeight: 700, color: "#fff", background: "var(--violet)", borderRadius: 6, padding: "5px 12px" }}>Create account</span>
          </div>
          <div style={{ flex: .9, minWidth: 0 }}>
            <div style={{ ...miniCard, height: "100%", display: "flex", flexDirection: "column", gap: 5 }}>
              <div style={{ fontSize: 8, fontWeight: 800, color: "var(--blue-ink)" }}>You&apos;re in good hands</div>
              <div style={{ fontSize: 7.5, lineHeight: 1.5, color: "var(--mut2)" }}>We&apos;ll only use your info to power your AI receptionist.</div>
              <span style={{ marginTop: "auto", alignSelf: "center", width: 22, height: 22, borderRadius: "50%", background: "rgba(157,139,255,.16)", border: "1px solid rgba(157,139,255,.35)", color: "var(--violet)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 9 }}><i className="fa-solid fa-shield-halved" aria-hidden="true" /></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // step 3
  const numbers = [
    { n: "+61 2 5550 1234", sel: true },
    { n: "+61 2 5550 5678", sel: false },
    { n: "+61 3 5550 9876", sel: false },
    { n: "+61 7 5550 4321", sel: false },
    { n: "+61 8 5550 2468", sel: false },
  ];
  return (
    <div style={frame} aria-hidden="true">
      <div style={bar}>{logo}</div>
      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        <div style={side}>
          <span style={{ fontSize: 6.5, fontWeight: 800, letterSpacing: ".08em", color: "var(--mut3)", padding: "0 6px 2px" }}>GO LIVE</span>
          {sideItem("Go live", true, "#1a9a5c")}{sideItem("Phone number", false, "")}{sideItem("Call forwarding", false, "")}{sideItem("All set", false, "")}
        </div>
        <div style={{ flex: 1, minWidth: 0, padding: 9, display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ fontSize: 9.5, fontWeight: 800, color: "var(--tx)" }}>Pick your dedicated AI number</div>
          {numbers.map((x) => (
            <div key={x.n} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 8, fontWeight: 600, color: "var(--tx3)", background: x.sel ? "rgba(34,197,94,.08)" : "transparent", border: x.sel ? "1px solid rgba(34,197,94,.4)" : "1px solid var(--w07)", borderRadius: 6, padding: "3.5px 7px", fontVariantNumeric: "tabular-nums" }}>
              {x.sel
                ? <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#22b573", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 5, flexShrink: 0 }}><i className="fa-solid fa-check" aria-hidden="true" /></span>
                : <span style={{ width: 9, height: 9, borderRadius: "50%", border: "1px solid var(--w14)", flexShrink: 0 }} />}
              <span style={{ flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{x.n}</span>
              {x.sel && <span style={{ fontSize: 6, fontWeight: 800, color: "#1a9a5c", background: "rgba(34,197,94,.14)", border: "1px solid rgba(34,197,94,.3)", borderRadius: 999, padding: "1px 6px", flexShrink: 0 }}>Recommended</span>}
            </div>
          ))}
          <span style={{ marginTop: "auto", alignSelf: "stretch", textAlign: "center", fontSize: 8, fontWeight: 700, color: "#fff", background: "#22b573", borderRadius: 6, padding: "5px 12px" }}>Claim number &amp; go live</span>
        </div>
      </div>
    </div>
  );
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
  const [greet] = useState(0);
  const [voice, setVoice] = useState(0);
  const [useCase, setUseCase] = useState(0);
  const [ucExpanded, setUcExpanded] = useState(false);
  const [demoPlaying, setDemoPlaying] = useState(false);
  const [demoStarted, setDemoStarted] = useState(false);
  const [demoStep, setDemoStep] = useState(0);
  const [ringing, setRinging] = useState(false);     // Play ke foran baad ringback bajti hai
  const [showBooking, setShowBooking] = useState(false); // call khatam hone par booking popup
  const ringRef = useRef<HTMLAudioElement | null>(null);
  const [callSecs, setCallSecs] = useState(0);
  const demoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);
  const [playingVoice, setPlayingVoice] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [faqOpen, setFaqOpen] = useState<number | null>(null); // by default sab band
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAllVoices, setShowAllVoices] = useState(false);
  const [testiPage, setTestiPage] = useState(0);
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  // voices preview = poori rows: mobile 6 (1-col), desktop 8 (4-col), ultra-wide 12 (6-col)
  const [wideScreen, setWideScreen] = useState(false);
  const [smallScreen, setSmallScreen] = useState(false);
  const [midScreen, setMidScreen] = useState(false);
  useEffect(() => {
    const mqW = window.matchMedia("(min-width: 1441px)");
    const mqS = window.matchMedia("(max-width: 680px)");
    const mqM = window.matchMedia("(max-width: 1240px)");
    const f = () => { setWideScreen(mqW.matches); setSmallScreen(mqS.matches); setMidScreen(mqM.matches); };
    f();
    mqW.addEventListener("change", f);
    mqS.addEventListener("change", f);
    mqM.addEventListener("change", f);
    return () => { mqW.removeEventListener("change", f); mqS.removeEventListener("change", f); mqM.removeEventListener("change", f); };
  }, []);
  const voicePreview = wideScreen ? 12 : smallScreen ? VOICE_PREVIEW : 8;
  // Testimonial slider: ek page = jitne cards view me aate hain (desktop 3, tablet 2, phone 1)
  const testiPerView = smallScreen ? 1 : midScreen ? 2 : 3;
  const testiPages = Math.ceil(TESTIMONIALS.length / testiPerView);
  useEffect(() => { setTestiPage((p) => Math.min(p, testiPages - 1)); }, [testiPages]);
  const ucListRef = useParallax<HTMLDivElement>(34);
  const ucCardRef = useParallax<HTMLDivElement>(-34);
  // Scroll parallax — alag-alag speeds se depth ka feel; hook mobile (≤920) aur reduced-motion pe off hai.
  const heroCardRef = useParallax<HTMLDivElement>(-30);
  const shotsRef = useParallax<HTMLDivElement>(-18);
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

  // reveal-hide sirf JS ke baad — warna slow mobile pe LCP tab tak blank rehta hai
  const [rvOn, setRvOn] = useState(false);
  useEffect(() => { setRvOn(true); }, []);
  useReveal(rootRef);

  // Scrollspy — jis section mein reader hai, navbar mein wahi link highlight (boss feedback 2026-07-10:
  // scroll karte waqt pata nahi chalta kaunsa section chal raha hai).
  const [activeSec, setActiveSec] = useState("");
  useEffect(() => {
    // sirf hash wale links (sections) — About us/Contact alag pages hain, unpar spy nahi chalta
    const ids = NAV_LINKS.filter((l) => l.h.startsWith("#")).map((l) => l.h.slice(1));
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (ents) => { ents.forEach((e) => { if (e.isIntersecting) setActiveSec(e.target.id); }); },
      // viewport ke beech wali patti cross karne par section "active" — upar/niche wale nahi
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Scroll progress bar (top) — rAF se direct width write, koi re-render nahi.
  const progRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = progRef.current;
    if (!el) return;
    let raf = 0;
    const upd = () => {
      raf = 0;
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      el.style.width = `${max > 0 ? (h.scrollTop / max) * 100 : 0}%`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(upd); };
    upd();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);
  // Nav scroll pe condense hota hai (height + shadow).
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 10);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => () => { if (audioRef.current) audioRef.current.pause(); if (demoAudioRef.current) demoAudioRef.current.pause(); if (ringRef.current) ringRef.current.pause(); if (tickRef.current) clearInterval(tickRef.current); }, []);

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
    if (ringRef.current) { ringRef.current.pause(); ringRef.current = null; }
    if (demoTimer.current) clearTimeout(demoTimer.current);
    stopTick();
    setRinging(false);
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
    if (i >= TRANSCRIPT.length) {
      setDemoPlaying(false); stopTick();
      // call khatam — booking-confirmed popup + notification chime
      setShowBooking(true);
      new Audio("/audio/notify.wav").play().catch(() => { /* autoplay block — popup phir bhi dikhta hai */ });
      return;
    }
    setDemoStep(i + 1);
    // Prefer a real recorded line; fall back to the browser engine if missing.
    // ?v= cache-buster: demo audio regenerate karo to number badhao, warna browser purani file sunata rehta hai.
    const audio = new Audio(`/audio/demo/line-${i}.mp3?v=5`);
    demoAudioRef.current = audio;
    let handled = false;
    const fb = () => { if (handled) return; handled = true; demoAudioRef.current = null; ttsLine(i); };
    audio.onended = () => { if (handled) return; handled = true; demoAudioRef.current = null; advanceDemo(i); };
    audio.onerror = fb;
    audio.play().catch(fb);
  }
  function connectCall() {
    setRinging(false);
    setCallSecs(0);
    stopTick();
    tickRef.current = setInterval(() => setCallSecs((s) => s + 1), 1000);
    speakFrom(0);
  }
  function playDemo() {
    if (demoPlaying) { stopDemo(); return; }
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setShowBooking(false);
    setDemoPlaying(true);
    setDemoStarted(true);
    setDemoStep(0);
    setCallSecs(0);
    stopTick();
    // proper call feel: pehle ringback bajti hai, phir call connect ho kar conversation shuru
    setRinging(true);
    const ring = new Audio("/audio/ringback.wav");
    ringRef.current = ring;
    let done = false;
    const go = () => { if (done) return; done = true; ringRef.current = null; connectCall(); };
    ring.onended = go;
    ring.onerror = go;
    ring.play().catch(go);
  }

  // mm:ss format (user mockup 2026-07-10) — pehle hh:mm:ss tha
  const demoTime = `${String(Math.floor(callSecs / 60)).padStart(2, "0")}:${String(callSecs % 60).padStart(2, "0")}`;
  const uc = USECASES[useCase];

  // Eyebrow ab labeled chip hai (boss feedback 2026-07-10) — plain text sections mein ghul jata tha;
  // chip har section ko clear naam deta hai. Style #product ke existing chip se match karta hai.
  const eyebrow: React.CSSProperties = { display: "inline-flex", alignItems: "center", padding: "8px 16px", borderRadius: 999, border: "1px solid rgba(44,118,237,.35)", background: "rgba(44,118,237,.07)", fontFamily: DISP, fontSize: 11.5, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--lime)", fontWeight: 700 };
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
      className={`h22${rvOn ? " rv" : ""}`}
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
      {/* scroll progress bar */}
      <div ref={progRef} style={{ position: "fixed", top: 0, left: 0, height: 3, width: "0%", background: "var(--lime)", zIndex: 60, pointerEvents: "none", borderRadius: "0 2px 2px 0" }} />
      <header style={{ position: "sticky", top: 0, zIndex: 50, backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", background: scrolled ? "var(--nav-bg2)" : "var(--nav-bg)", borderBottom: "1px solid var(--w07)", boxShadow: scrolled ? "0 14px 34px -22px var(--sh2)" : "none", transition: "box-shadow .3s ease, background .3s ease" }}>
        <div className="nav-bar" style={{ maxWidth: 1536, margin: "0 auto", padding: "0 28px", height: scrolled ? 62 : 74, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, transition: "height .3s ease" }}>
          <a href="#top" style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={isLight ? LOGO_LIGHT : LOGO} alt="hello22.ai" className="nav-logo" style={{ height: 50, width: "auto", display: "block", filter: "var(--logo-filter)" }} /></a>
          <nav className="nav-links" style={{ display: "flex", alignItems: "center", gap: 30, fontSize: 14.5, fontWeight: 500 }}>
            {NAV_LINKS.map((l) => {
              const active = l.h.startsWith("#") && activeSec === l.h.slice(1);
              return (
                <a key={l.n} className="nl" href={l.h} aria-current={active ? "true" : undefined} style={active ? { color: "var(--blue-ink)", fontWeight: 700 } : undefined}>
                  {l.n}
                  {/* active dot — underline shift se bachne ke liye chhota marker */}
                  <span aria-hidden="true" style={{ display: "block", height: 3, borderRadius: 3, marginTop: 3, background: active ? "var(--lime)" : "transparent", transition: "background .25s ease" }} />
                </a>
              );
            })}
          </nav>
          <div style={{ display: "flex", alignItems: "center", gap: 14, flexShrink: 0 }}>
            <a className="nav-signin" href={LOGIN_URL} target="_blank" rel="noopener noreferrer" style={{ color: "var(--tx)", textDecoration: "none", fontSize: 14.5, fontWeight: 600 }}>Sign in</a>
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
              <a key={l.n} href={l.h} onClick={() => setMenuOpen(false)} style={{ color: "var(--tx2)", textDecoration: "none", fontSize: 16, fontWeight: 600, padding: "13px 4px", borderBottom: "1px solid var(--w06)" }}>{l.n}</a>
            ))}
            <a href={LOGIN_URL} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)} style={{ color: "var(--tx2)", textDecoration: "none", fontSize: 16, fontWeight: 600, padding: "13px 4px" }}>Sign in</a>
            <a href={APP_URL} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)} className="btnp" style={{ textDecoration: "none", textAlign: "center", background: "var(--lime)", color: "#fff", fontWeight: 700, fontSize: 15, padding: "13px 20px", borderRadius: 999, marginTop: 8, boxShadow: "0 10px 26px -12px rgba(44,118,237,.7)" }}>Try free</a>
          </nav>
        )}
      </header>

      {/* HERO */}
      <section id="top" style={{ position: "relative", zIndex: 1, maxWidth: 1536, margin: "0 auto", padding: "76px 28px 56px" }}>
        {/* decorative sphere card ke peeche (user mockup 2026-07-10) — dono themes mein subtle */}
        <div aria-hidden="true" style={{ position: "absolute", top: -30, right: -160, width: 620, height: 620, borderRadius: "50%", background: "radial-gradient(circle at 35% 35%, rgba(44,118,237,.16), rgba(44,118,237,.05) 55%, transparent 72%)", pointerEvents: "none", zIndex: 0 }} />
        <div className="hero-grid" style={{ position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1.05fr .95fr", gap: 54, alignItems: "center" }}>
          <div>
            <div className="hin" style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "7px 14px", borderRadius: 999, background: "var(--w05)", border: "1px solid var(--w10)", fontSize: 13, color: "var(--tx3)" }}>
              <span style={{ position: "relative", display: "inline-flex", width: 8, height: 8 }}>
                <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "var(--lime)" }} />
                <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "var(--lime)", animation: "h22ring 1.8s ease-out infinite" }} />
              </span>
              <span style={{ fontWeight: 600, color: "var(--tx3)", letterSpacing: ".02em" }}>24/7 AI voice receptionist</span>
            </div>
            {/* "hello." greeting headline — user ki choice (2026-07-10), mockup ke 2-line headline par revert nahi karna */}
            <h1 className="hero-h1 hin" style={{ fontFamily: DISP, fontWeight: 600, letterSpacing: "-.04em", lineHeight: .92, fontSize: "clamp(72px,11vw,150px)", margin: "26px 0 0", animationDelay: ".06s" }}>
              <span style={{ display: "inline-flex", alignItems: "baseline", perspective: "600px" }}>
                <span key={greet} style={{ display: "inline-block", animation: "h22greet .65s cubic-bezier(.2,.8,.2,1) both" }}>{GREETS[greet]}</span>
                <span style={{ color: "var(--lime)" }}>.</span>
              </span>
            </h1>
            <p className="hin" style={{ fontFamily: SUB, fontSize: "clamp(18px,2vw,25px)", fontWeight: 600, color: "var(--tx2)", margin: "14px 0 0", letterSpacing: "-.01em", lineHeight: 1.35, animationDelay: ".12s" }}>I&apos;m Your AI Voice Agent —<br /><span style={HL}>Ready to Talk.</span></p>
            <p className="hero-sub hin" style={{ fontSize: 18, lineHeight: 1.6, color: "var(--mut)", maxWidth: 520, margin: "20px 0 0", animationDelay: ".18s" }}><strong style={{ fontWeight: 800, color: "var(--tx2)" }}>hello22 answers every call,</strong> books appointments, qualifies leads, and resolves questions — sounding <span style={HL}>natural and human</span>, in English, 24/7.</p>
            <div className="hero-ctas hin" style={{ display: "flex", gap: 14, marginTop: 32, flexWrap: "wrap", animationDelay: ".24s" }}>
              <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="btnp" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 10, background: "var(--lime)", color: "#fff", fontWeight: 700, fontSize: 16, padding: "16px 26px", borderRadius: 999, boxShadow: "0 18px 44px -12px rgba(44,118,237,.75)" }}><span aria-hidden style={{ fontSize: 15, lineHeight: 1 }}>✦</span><BtnTxt t="Start free — setup in minutes" /></a>
              <a href="#demo" className="btnp" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 10, background: "var(--surface)", color: "var(--blue-ink)", fontWeight: 700, fontSize: 16, padding: "14px 24px", borderRadius: 999, border: "1.5px solid rgba(44,118,237,.5)", boxShadow: "0 10px 26px -18px rgba(44,118,237,.6)" }}>
                <span style={{ display: "inline-flex", width: 26, height: 26, borderRadius: "50%", background: "var(--lime)", color: "#fff", alignItems: "center", justifyContent: "center", fontSize: 10, boxShadow: "0 6px 14px -6px rgba(44,118,237,.7)", flexShrink: 0 }}><i className="fa-solid fa-play" style={{ marginLeft: 1 }} /></span><BtnTxt t="Hear a live call" />
              </a>
            </div>
            <div className="hero-checks hin" style={{ display: "flex", gap: 22, marginTop: 30, flexWrap: "wrap", animationDelay: ".3s" }}>
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
          <div className="hin" style={{ animationDelay: ".15s", position: "relative" }}>
            <div className="float-card" style={{ position: "relative", background: "var(--hero-card)", border: "1px solid rgba(44,118,237,.42)", borderRadius: 28, padding: 28, boxShadow: "0 0 0 1px rgba(44,118,237,.08), 0 26px 70px -30px rgba(44,118,237,.4), 0 44px 90px -40px var(--sh1)", animation: "h22float 6.5s ease-in-out infinite" }}>
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
                  {/* Live badge green (user mockup 2026-07-10) — red se friendly green */}
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "7px 14px", borderRadius: 999, background: "rgba(34,197,94,.12)", border: "1px solid rgba(34,197,94,.32)", fontSize: 12.5, fontWeight: 700, color: "var(--tx)" }}><span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22b573", animation: "h22pulse 1.4s infinite" }} />Live</div>
                  <span style={{ fontSize: 13.5, color: "var(--tx3)", fontVariantNumeric: "tabular-nums", paddingRight: 2 }}>0:42</span>
                </div>
              </div>
              {/* Waveform (user mockup 2026-07-10): thinner bars, center-weighted intensity — edges halke */}
              <div className="wave" style={{ display: "flex", alignItems: "center", gap: 3, height: 60, margin: "20px 0 4px", padding: "0 4px" }}>
                {Array.from({ length: 52 }).map((_, i) => {
                  const t = i / 51;
                  const env = Math.sin(Math.PI * t);
                  const detail = 0.42 + 0.58 * Math.abs(Math.sin(i * 0.9) + 0.4 * Math.sin(i * 2.3)) / 1.4;
                  const h = Math.max(4, Math.round(48 * env * detail));
                  const strength = Math.min(1, env * detail + 0.15);
                  return <span key={i} style={{ width: 3.5, flex: "1 1 0", maxWidth: 5, borderRadius: 4, background: "var(--lime)", opacity: 0.3 + 0.7 * strength, height: h, transformOrigin: "center", animation: `h22eq ${0.7 + (i % 5) * 0.12}s ease-in-out ${(i * 0.045).toFixed(2)}s infinite` }} />;
                })}
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
                <span style={{ fontSize: 12, fontWeight: 600, padding: "8px 14px", borderRadius: 10, background: "var(--w05)", border: "1px solid var(--w10)" }}>EN</span>
                <span style={{ fontSize: 12, fontWeight: 600, padding: "8px 14px", borderRadius: 10, background: "var(--w05)", border: "1px solid var(--w10)" }}>Voice: Sarah</span>
              </div>
              {/* AI-speaking status panel (user mockup 2026-07-10) */}
              <div style={{ marginTop: 16, display: "flex", gap: 12, alignItems: "flex-start", background: "rgba(44,118,237,.08)", border: "1px solid rgba(44,118,237,.18)", borderRadius: 14, padding: "13px 16px" }}>
                <span style={{ color: "var(--blue-ink)", fontSize: 15, marginTop: 1, flexShrink: 0 }} aria-hidden="true">✦</span>
                <span style={{ minWidth: 0 }}>
                  <span style={{ display: "block", fontSize: 13.5, fontWeight: 700, color: "var(--tx2)" }}>AI is speaking…</span>
                  <span style={{ display: "block", fontSize: 12.5, color: "var(--mut)", marginTop: 2, lineHeight: 1.5 }}>Answering questions and helping the caller.</span>
                </span>
              </div>
              <div style={{ marginTop: 18, paddingTop: 16, borderTop: "1px solid var(--w08)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                <span style={{ fontSize: 13.5, color: "var(--mut2)", minWidth: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Intent: Book appointment</span>
                <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="btnp" style={{ display: "inline-flex", alignItems: "center", gap: 9, fontFamily: SUB, fontSize: 16, fontWeight: 700, color: "var(--blue-ink)", textDecoration: "none", cursor: "pointer", flexShrink: 0 }}>Book appointment<i className="fa-solid fa-arrow-right" style={{ fontSize: 12 }} /></a>
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
          {/* Logo tiles (user mockup 2026-07-10) — flat row ki jagah white pill cards */}
          <div className="h22marquee" style={{ display: "flex", gap: 18, width: "max-content", animation: "h22marq 36s linear infinite", paddingRight: 18, willChange: "transform" }}>
            {[...TRUST, ...TRUST].map((t, i) => (
              <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 12, whiteSpace: "nowrap", background: "var(--surface)", border: "1px solid var(--w09)", borderRadius: 16, padding: "14px 24px", boxShadow: "0 12px 28px -22px var(--sh2)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={isLight ? t.src.replace("/logos/white/", "/logos/color/") : t.src} alt={t.name} style={{ height: 24, width: "auto" }} />
                <span style={{ fontFamily: SUB, fontSize: 17, fontWeight: 600, color: "var(--tx3)", letterSpacing: "-.01em" }}>{t.name}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* DEMO */}
      <section id="demo" className="sec-tint" style={{ position: "relative", zIndex: 1, maxWidth: 1536, margin: "0 auto", padding: "100px 28px 112px", scrollMarginTop: 90 }}>
        {/* Demo header 2-col (user mockup 2026-07-10): text left + illustration blob right */}
        <div className="demo-header-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,600px)", gap: 24, alignItems: "center" }}>
          <div>
            <div data-rv style={eyebrow}><span aria-hidden="true" style={{ marginRight: 8, fontSize: 12 }}>✦</span>AI phone agent</div>
            <h2 data-rv style={{ ...h2, maxWidth: 760 }}><b style={BD}>Press Play.</b> Hear hello22 Handle a{" "}
              <span style={{ position: "relative", whiteSpace: "nowrap", display: "inline-block" }}>
                <span style={HL}>Real Call</span>
                {/* underline swoosh (mockup) */}
                <svg viewBox="0 0 120 12" aria-hidden="true" style={{ position: "absolute", left: 0, bottom: -9, width: "100%", height: 10, overflow: "visible" }}><path d="M3 9 C 30 3, 90 3, 117 7" fill="none" stroke="var(--lime)" strokeWidth="3.5" strokeLinecap="round" opacity=".8" /></svg>
              </span>.
            </h2>
            <p data-rv style={{ fontSize: 18, color: "var(--mut)", maxWidth: 620, margin: "18px 0 0", lineHeight: 1.6 }}><strong style={{ fontWeight: 800, color: "var(--tx2)" }}>Experience how natural conversations flow</strong> with hello22. It listens, understands, and responds — <span style={HL}>just like a human</span>.</p>
            <div data-rv style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 14, fontSize: 13, color: "var(--mut3)" }}><span style={{ display: "inline-flex", width: 20, height: 20, borderRadius: "50%", background: "rgba(44,118,237,.14)", border: "1px solid rgba(44,118,237,.3)", color: "var(--lime)", alignItems: "center", justifyContent: "center", fontSize: 10 }}><i className="fa-solid fa-volume-high" /></span>Hit play — hear the real recorded conversation between the caller and the hello22 agent.</div>
          </div>
          {/* illustration: blob + photos + chat bubbles (user mockup 2026-07-10; photos AI-generated to match) */}
          <div className="demo-illus" data-rv="right" aria-hidden="true" style={{ position: "relative", minHeight: 350 }}>
            {/* blob left tak extend — bubbles se pehle dead space nahi rehni chahiye (user feedback 2026-07-10) */}
            <div style={{ position: "absolute", inset: "-26px -40px -20px -60px", background: "radial-gradient(80% 72% at 52% 45%, rgba(44,118,237,.14), rgba(44,118,237,.06) 62%, transparent 82%)", borderRadius: "55% 45% 52% 48% / 58% 46% 54% 42%" }} />
            {/* photos */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/demo-caller.jpg" alt="" loading="lazy" style={{ position: "absolute", top: -12, right: 30, width: 148, height: 148, borderRadius: "50%", objectFit: "cover", border: "4px solid var(--surface)", boxShadow: "0 18px 40px -18px var(--sh1)", animation: "h22floatSm 8s ease-in-out infinite" }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/demo-agent.jpg" alt="" loading="lazy" style={{ position: "absolute", bottom: 8, right: 8, width: 124, height: 124, borderRadius: "50%", objectFit: "cover", border: "4px solid var(--surface)", boxShadow: "0 18px 40px -18px var(--sh1)", animation: "h22floatSm 8s ease-in-out -3.5s infinite" }} />
            {/* caller bubble — blob ke left edge se shuru */}
            <div style={{ position: "absolute", top: 26, left: -34, maxWidth: 310, display: "flex", gap: 12, alignItems: "flex-start", background: "var(--surface)", border: "1px solid var(--w09)", borderRadius: "20px 20px 20px 6px", padding: "15px 19px", boxShadow: "0 16px 36px -20px var(--sh1)", animation: "h22floatSm 7s ease-in-out -1.5s infinite" }}>
              <span style={{ width: 36, height: 36, borderRadius: "50%", flexShrink: 0, background: "rgba(44,118,237,.1)", color: "var(--blue-ink)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}><i className="fa-solid fa-phone" /></span>
              <span style={{ fontSize: 15, lineHeight: 1.5, color: "var(--tx2)", fontWeight: 600 }}>Hi, I need someone to fix a leaking tap.</span>
            </div>
            {/* agent bubble + mini waveform */}
            <div style={{ position: "absolute", top: 138, left: 4, maxWidth: 350, background: "var(--surface)", border: "1px solid var(--w09)", borderRadius: "20px 20px 20px 6px", padding: "15px 19px", boxShadow: "0 16px 36px -20px var(--sh1)", animation: "h22floatSm 7.5s ease-in-out -4s infinite" }}>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ width: 34, height: 34, borderRadius: "50%", flexShrink: 0, background: "var(--lime)", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>✦</span>
                <span style={{ fontSize: 14.5, lineHeight: 1.5, color: "var(--tx2)", fontWeight: 600 }}>Of course! We can send a technician this Friday at 9 AM. Does that work for you?</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 2.5, height: 18, marginTop: 10, paddingLeft: 46 }}>
                {Array.from({ length: 30 }).map((_, i) => {
                  const env = Math.sin(Math.PI * (i / 29));
                  return <span key={i} style={{ width: 2.5, borderRadius: 2, background: "var(--lime)", opacity: .35 + .65 * env, height: Math.max(3, Math.round(14 * env * (0.5 + 0.5 * Math.abs(Math.sin(i * 1.3))))) }} />;
                })}
              </div>
            </div>
            {/* squiggles */}
            <svg viewBox="0 0 40 24" style={{ position: "absolute", left: -6, bottom: 64, width: 38, height: 22 }} aria-hidden="true"><path d="M2 18 C 8 6, 14 6, 18 14 C 22 22, 30 20, 38 6" fill="none" stroke="rgba(44,118,237,.5)" strokeWidth="2" strokeLinecap="round" strokeDasharray="1 6" /></svg>
            <svg viewBox="0 0 40 24" style={{ position: "absolute", right: 10, top: -14, width: 34, height: 20 }} aria-hidden="true"><path d="M2 6 C 10 20, 18 18, 22 10 C 26 2, 34 4, 38 16" fill="none" stroke="rgba(44,118,237,.5)" strokeWidth="2" strokeLinecap="round" strokeDasharray="1 6" /></svg>
          </div>
        </div>

        <div className="demo-grid" style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 24, marginTop: 42, alignItems: "stretch" }}>
          {/* player */}
          <div data-rv="left" style={{ position: "relative", background: "var(--card-grad)", border: "1px solid var(--w09)", borderRadius: 22, overflow: "hidden", display: "flex", flexDirection: "column" }}>
            <div className="demo-head" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, padding: "16px 20px", borderBottom: "1px solid var(--w07)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                {/* ghost play button (user mockup 2026-07-10) — solid blue se white + blue outline */}
                <button onClick={playDemo} className="btnp" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "var(--surface)", color: "var(--blue-ink)", border: "1.5px solid rgba(44,118,237,.4)", cursor: "pointer", fontFamily: "inherit", fontWeight: 700, fontSize: 14, padding: "10px 20px", borderRadius: 999, boxShadow: "0 8px 20px -14px rgba(44,118,237,.5)" }}>
                  <span style={{ display: "inline-flex", width: 22, height: 22, borderRadius: "50%", background: "var(--lime)", color: "#fff", alignItems: "center", justifyContent: "center", fontSize: 9, flexShrink: 0 }}><i className={`fa-solid ${demoPlaying ? "fa-pause" : "fa-play"}`} style={{ marginLeft: demoPlaying ? 0 : 1 }} /></span>
                  {demoPlaying ? "Pause" : demoStep > 0 ? "Replay" : "Play call"}
                </button>
                <span style={{ fontSize: 13.5, fontWeight: 600, color: "var(--mut3)", padding: "10px 16px" }}>Transcript</span>
              </div>
              <span style={{ fontFamily: SUB, fontSize: 15.5, fontWeight: 600, color: "var(--blue-ink)", fontVariantNumeric: "tabular-nums" }}>{demoTime} <span style={{ color: "var(--mut3)", fontWeight: 500 }}>/ {DEMO_TOTAL}</span></span>
            </div>
            <div style={{ padding: 22, display: "flex", flexDirection: "column", gap: 13, minHeight: 340, flex: 1, background: "var(--w04)" }}>
              {/* call-start status chip — transcript ko real chat jaisa frame deta hai */}
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 2 }}>
                {/* green connected chip (user mockup 2026-07-10) */}
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11.5, fontWeight: 700, letterSpacing: ".07em", textTransform: "uppercase", color: "#1a9a5c", background: "rgba(34,197,94,.1)", border: "1px solid rgba(34,197,94,.28)", padding: "6px 14px", borderRadius: 999 }}><i className="fa-solid fa-phone" style={{ fontSize: 10, animation: ringing ? "h22pulse 1.1s infinite" : "none" }} aria-hidden="true" />{ringing ? "Calling Apex Plumbing…" : "Call connected · Apex Plumbing"}</span>
              </div>
              {TRANSCRIPT.map((t, i) => {
                // Idle mein poori transcript dikhti hai; call ke doran bubbles audio ke saath
                // ek-ek kar ke slide-in hote hain aur bolti hui line ring se highlight hoti hai (client 2026-07-08).
                const shown = !demoStarted || i < demoStep;
                const active = demoPlaying && i === demoStep - 1;
                const caller = t.role === "caller";
                return (
                  <div key={i} style={{ display: "flex", justifyContent: caller ? "flex-end" : "flex-start", alignItems: "flex-end", gap: 10, opacity: shown ? 1 : 0, transform: shown ? "none" : "translateY(14px)", transition: "opacity .45s ease, transform .5s cubic-bezier(.2,.7,.2,1)" }}>
                    {!caller && <span style={{ width: 32, height: 32, borderRadius: "50%", flexShrink: 0, background: "var(--surface)", border: "1.5px solid rgba(44,118,237,.4)", color: "var(--blue-ink)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 13 }} aria-hidden="true"><i className="fa-solid fa-headset" /></span>}
                    {/* soft tinted bubbles + timestamps (user mockup 2026-07-10) — caller ab solid blue nahi */}
                    <div className="bubble" style={{ maxWidth: "78%", padding: "12px 16px", borderRadius: caller ? "16px 16px 4px 16px" : "16px 16px 16px 4px", background: caller ? "rgba(44,118,237,.1)" : "var(--surface)", border: caller ? "1px solid rgba(44,118,237,.2)" : "1px solid var(--w10)", boxShadow: "0 6px 18px -12px var(--sh2)", color: "var(--tx)", outline: active ? "2px solid rgba(44,118,237,.55)" : "none", outlineOffset: 3, transition: "outline-color .3s ease" }}>
                      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, marginBottom: 5 }}>
                        <span style={{ fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", color: "var(--blue-ink)" }}>{t.name}</span>
                        <span style={{ fontSize: 11, color: "var(--mut3)", fontVariantNumeric: "tabular-nums", flexShrink: 0 }}>{TIMES[i]}</span>
                      </div>
                      <div style={{ fontSize: 14.5, lineHeight: 1.5 }}>{t.text}</div>
                    </div>
                    {caller && <span style={{ width: 32, height: 32, borderRadius: "50%", flexShrink: 0, background: "rgba(44,118,237,.12)", border: "1px solid rgba(44,118,237,.25)", color: "var(--blue-ink)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 13 }} aria-hidden="true"><i className="fa-solid fa-user" /></span>}
                  </div>
                );
              })}
              {/* outcome chip — call ka result; idle mein dikhta hai, call ke doran aakhri line ke saath aata hai */}
              <div style={{ display: "flex", justifyContent: "center", marginTop: 2, opacity: !demoStarted || demoStep >= TRANSCRIPT.length ? 1 : 0, transition: "opacity .5s ease" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 700, color: "var(--blue-ink)", background: "rgba(44,118,237,.10)", border: "1px solid rgba(44,118,237,.22)", padding: "7px 15px", borderRadius: 999 }}><i className="fa-regular fa-calendar-check" aria-hidden="true" />Job booked · Friday 9:00 AM · Confirmation sent</span>
              </div>
            </div>
            {/* booking-confirmed popup — call khatam hote hi animate ho kar aata hai */}
            {showBooking && (
              <div style={{ position: "absolute", inset: 0, zIndex: 6, display: "flex", alignItems: "center", justifyContent: "center", padding: 18, background: "rgba(13,18,32,.42)", backdropFilter: "blur(5px)", WebkitBackdropFilter: "blur(5px)", animation: "h22fadeIn .3s ease both" }}>
                <div style={{ position: "relative", background: "var(--surface)", border: "1px solid var(--w12)", borderRadius: 20, padding: "30px 26px 24px", width: "min(370px,100%)", textAlign: "center", boxShadow: "0 34px 80px -30px var(--sh1)", animation: "h22popIn .55s cubic-bezier(.2,.9,.3,1.35) .15s both" }}>
                  <button onClick={() => setShowBooking(false)} aria-label="Close" style={{ position: "absolute", top: 12, right: 12, width: 32, height: 32, borderRadius: "50%", background: "var(--w05)", border: "1px solid var(--w10)", color: "var(--mut)", cursor: "pointer", fontSize: 13, display: "inline-flex", alignItems: "center", justifyContent: "center" }}><i className="fa-solid fa-xmark" /></button>
                  <div style={{ position: "relative", width: 64, height: 64, margin: "0 auto" }}>
                    <span style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "2px solid rgba(34,197,94,.55)", animation: "h22ring 1.5s ease-out .4s 2" }} />
                    <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "rgba(34,197,94,.14)", border: "1px solid rgba(34,197,94,.4)", color: "#22b573", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}><i className="fa-solid fa-check" /></span>
                  </div>
                  <div style={{ fontFamily: SUB, fontWeight: 700, fontSize: 20, marginTop: 16 }}>Booking confirmed</div>
                  <p style={{ margin: "6px 0 0", fontSize: 13.5, color: "var(--mut)" }}>Apex Plumbing · new job from this call</p>
                  <div style={{ marginTop: 16, borderTop: "1px solid var(--w08)", textAlign: "left" }}>
                    {[
                      { l: "Customer", v: "Olivia Brown" },
                      { l: "Service", v: "Leaking kitchen tap" },
                      { l: "Scheduled", v: "Friday · 9:00 AM" },
                    ].map((r) => (
                      <div key={r.l} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "11px 2px", borderBottom: "1px solid var(--w06)" }}>
                        <span style={{ fontSize: 13, color: "var(--mut2)" }}>{r.l}</span>
                        <span style={{ fontSize: 14, fontWeight: 700, color: "var(--tx2)" }}>{r.v}</span>
                      </div>
                    ))}
                  </div>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 16, fontSize: 12.5, fontWeight: 700, color: "var(--blue-ink)", background: "rgba(44,118,237,.10)", border: "1px solid rgba(44,118,237,.22)", padding: "7px 14px", borderRadius: 999 }}><i className="fa-solid fa-paper-plane" aria-hidden="true" />Confirmation sent · SMS & WhatsApp</span>
                </div>
              </div>
            )}
          </div>
          {/* call summary */}
          <div data-rv="right" style={{ background: "var(--surface)", border: "1px solid var(--w09)", borderRadius: 22, padding: "18px 22px 8px", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, paddingBottom: 16, borderBottom: "1px solid var(--w08)" }}>
              <span style={{ width: 38, height: 38, borderRadius: 12, background: "rgba(44,118,237,.14)", border: "1px solid rgba(44,118,237,.3)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--blue-ink)", fontSize: 15 }}><i className="fa-regular fa-file-lines" /></span>
              <span style={{ fontFamily: SUB, fontWeight: 700, fontSize: 18 }}>Call Summary</span>
            </div>
            {[
              { ic: "fa-solid fa-bullseye", l: "Intent", v: "Book a repair visit" },
              { ic: "fa-regular fa-circle-check", l: "Outcome", v: "Job booked" },
              { ic: "fa-regular fa-calendar", l: "Date & time", v: "Friday at 9:00 AM" },
              { ic: "fa-regular fa-face-smile", l: "Sentiment", v: "Positive" },
              { ic: "fa-solid fa-chart-simple", l: "Confidence", v: "98%" },
            ].map((r, idx, arr) => (
              <div key={r.l} style={{ display: "flex", gap: 13, alignItems: "flex-start", padding: "13px 0", borderBottom: idx < arr.length - 1 ? "1px solid var(--w06)" : "none" }}>
                <span style={{ width: 30, height: 30, borderRadius: "50%", flexShrink: 0, background: "rgba(44,118,237,.12)", border: "1px solid rgba(44,118,237,.25)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--blue-ink)", fontSize: 12 }}><i className={r.ic} /></span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--blue-ink)" }}>{r.l}</div>
                  {/* Sentiment green chip mein (user mockup 2026-07-10) */}
                  {r.l === "Sentiment"
                    ? <span style={{ display: "inline-block", marginTop: 5, fontSize: 12.5, fontWeight: 700, color: "#1a9a5c", background: "rgba(34,197,94,.12)", border: "1px solid rgba(34,197,94,.28)", padding: "4px 12px", borderRadius: 999 }}>{r.v}</span>
                    : <div style={{ fontSize: 14.5, color: "var(--tx2)", marginTop: 3, fontWeight: 600 }}>{r.v}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT SCREENSHOTS */}
      <section id="product" className="sec-alt" style={{ position: "relative", zIndex: 1, maxWidth: 1536, margin: "0 auto", padding: "96px 28px 112px", scrollMarginTop: 90 }}>
        {/* Product header 2-col (user mockup 2026-07-10): text left + floating stats/photos cluster right */}
        <div className="demo-header-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,560px)", gap: 24, alignItems: "center" }}>
          <div data-rv>
            <span style={{ display: "inline-flex", alignItems: "center", padding: "7px 16px 7px 8px", borderRadius: 999, border: "1px solid rgba(44,118,237,.35)", background: "rgba(44,118,237,.07)", fontFamily: DISP, fontSize: 11.5, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--lime)", fontWeight: 700 }}>
              <span style={{ width: 20, height: 20, borderRadius: "50%", background: "var(--lime)", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 8, marginRight: 9, flexShrink: 0 }}><i className="fa-solid fa-play" style={{ marginLeft: 1 }} aria-hidden="true" /></span>
              See hello22 in action
            </span>
            <h2 style={{ ...h2, maxWidth: 700 }}><b style={BD}>One Platform.</b><br /><span style={HL}>Endless Possibilities.</span></h2>
            <p style={{ fontSize: 17, color: "var(--mut)", maxWidth: 520, margin: "16px 0 0", lineHeight: 1.6 }}>Everything you need to build, manage, and scale AI voice agents that deliver real results.</p>
          </div>
          {/* illustration cluster: photos + stat card + chips + dashed arrows (user mockup 2026-07-10) */}
          <div className="prod-illus" data-rv="right" aria-hidden="true" style={{ position: "relative", minHeight: 300 }}>
            {/* dashed arrows */}
            <svg viewBox="0 0 560 300" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
              <path d="M 316 66 C 356 42, 396 44, 424 62" fill="none" stroke="rgba(44,118,237,.45)" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="2 7" />
              <path d="M 428 64 l 6 -1 l -3 6 z" fill="rgba(44,118,237,.55)" />
              <path d="M 250 232 C 216 258, 176 262, 140 248" fill="none" stroke="rgba(44,118,237,.45)" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="2 7" />
              <path d="M 138 250 l -2 -6 l 7 1 z" fill="rgba(44,118,237,.55)" />
              <path d="M 118 78 C 106 60, 108 42, 122 30" fill="none" stroke="rgba(44,118,237,.45)" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="2 7" />
              <path d="M 124 28 l -7 0 l 3 6 z" fill="rgba(44,118,237,.55)" />
            </svg>
            {/* squiggle */}
            <svg viewBox="0 0 34 20" style={{ position: "absolute", left: 26, top: 66, width: 30, height: 18 }}><path d="M2 14 C 7 4, 12 4, 15 11 C 18 18, 26 16, 32 4" fill="none" stroke="rgba(44,118,237,.55)" strokeWidth="2" strokeLinecap="round" /></svg>
            {/* woman photo */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/demo-caller.jpg" alt="" loading="lazy" style={{ position: "absolute", top: -8, left: 74, width: 118, height: 118, borderRadius: "50%", objectFit: "cover", border: "4px solid var(--surface)", boxShadow: "0 16px 36px -18px var(--sh1)", animation: "h22floatSm 8s ease-in-out infinite" }} />
            {/* bubble 1 */}
            <div style={{ position: "absolute", top: 16, left: 204, background: "var(--surface)", border: "1px solid var(--w09)", borderRadius: "18px 18px 18px 6px", padding: "11px 16px", boxShadow: "0 14px 30px -18px var(--sh1)", display: "flex", alignItems: "center", gap: 9, whiteSpace: "nowrap", animation: "h22floatSm 7s ease-in-out -1.5s infinite" }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "var(--tx2)", lineHeight: 1.4 }}>Every call<br />handled perfectly</span>
              <i className="fa-regular fa-heart" style={{ color: "var(--blue-ink)", fontSize: 13 }} aria-hidden="true" />
            </div>
            {/* total calls stat card */}
            <div style={{ position: "absolute", top: 108, left: 56, width: 212, background: "var(--surface)", border: "1px solid var(--w09)", borderRadius: 16, padding: "13px 16px", boxShadow: "0 18px 40px -20px var(--sh1)", animation: "h22floatSm 8.5s ease-in-out -3s infinite" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 8, fontSize: 10.5, fontWeight: 600, color: "var(--mut2)" }}>Total Calls<i className="fa-solid fa-up-right-and-down-left-from-center" style={{ fontSize: 8, color: "var(--dim2)" }} aria-hidden="true" /></div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 3 }}>
                <span style={{ fontFamily: SUB, fontSize: 21, fontWeight: 700, color: "var(--tx)" }}>3,246</span>
                <span style={{ fontSize: 9, fontWeight: 700, color: "#1a9a5c", background: "rgba(34,197,94,.12)", borderRadius: 999, padding: "2px 7px" }}>+18.2%</span>
              </div>
              <div style={{ fontSize: 9, color: "var(--mut3)", marginTop: 1 }}>vs last 7 days</div>
              <svg viewBox="0 0 180 40" style={{ width: "100%", height: 38, marginTop: 6 }}><path d="M2 34 C 20 32, 30 24, 48 26 C 66 28, 76 16, 94 18 C 112 20, 122 10, 140 12 C 156 13.5, 168 6, 178 7" fill="none" stroke="var(--lime)" strokeWidth="2" strokeLinecap="round" /><path d="M2 34 C 20 32, 30 24, 48 26 C 66 28, 76 16, 94 18 C 112 20, 122 10, 140 12 C 156 13.5, 168 6, 178 7 L 178 40 L 2 40 Z" fill="rgba(44,118,237,.1)" /></svg>
            </div>
            {/* AI agents chip */}
            <div style={{ position: "absolute", top: 74, right: 12, background: "var(--surface)", border: "1px solid var(--w09)", borderRadius: 14, padding: "11px 16px", boxShadow: "0 14px 30px -18px var(--sh1)", display: "flex", alignItems: "center", gap: 10, animation: "h22floatSm 7.5s ease-in-out -5s infinite" }}>
              <span style={{ width: 30, height: 30, borderRadius: 9, background: "rgba(34,197,94,.14)", color: "#1a9a5c", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}><i className="fa-solid fa-headset" aria-hidden="true" /></span>
              <span style={{ fontSize: 12.5, fontWeight: 700, color: "var(--tx2)", lineHeight: 1.35 }}>AI Agents<br /><span style={{ color: "var(--mut2)", fontWeight: 600 }}>Always on</span></span>
            </div>
            {/* man photo + bubble 2 */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/demo-agent.jpg" alt="" loading="lazy" style={{ position: "absolute", bottom: 0, right: 176, width: 104, height: 104, borderRadius: "50%", objectFit: "cover", border: "4px solid var(--surface)", boxShadow: "0 16px 36px -18px var(--sh1)", animation: "h22floatSm 8s ease-in-out -4.5s infinite" }} />
            <div style={{ position: "absolute", bottom: 26, right: -6, background: "var(--surface)", border: "1px solid var(--w09)", borderRadius: "18px 18px 6px 18px", padding: "11px 16px", boxShadow: "0 14px 30px -18px var(--sh1)", display: "flex", alignItems: "center", gap: 9, whiteSpace: "nowrap", animation: "h22floatSm 7s ease-in-out -2.5s infinite" }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "var(--tx2)", lineHeight: 1.4 }}>Real conversations,<br />real results</span>
              <i className="fa-solid fa-arrows-rotate" style={{ color: "#1a9a5c", fontSize: 12 }} aria-hidden="true" />
            </div>
          </div>
        </div>
        <div ref={shotsRef} style={{ willChange: "transform" }}>
        <div className="shots-grid snap-x" style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 16, marginTop: 36 }}>
          {SHOTS.map((s) => (
            <div key={s.title} data-rv className="lift" style={{ ...card, borderRadius: 18, overflow: "hidden", display: "flex", flexDirection: "column" }}>
              {/* mini-UI preview — fixed height frame, sab cards me same size/alignment */}
              <div style={{ padding: "14px 14px 0" }}>
                <div style={{ position: "relative", height: 202, borderRadius: 12, overflow: "hidden", border: "1px solid var(--w08)", background: "var(--card-grad)" }}>
                  <MiniShot kind={s.kind} />
                </div>
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
                <a href={APP_URL} target="_blank" rel="noopener noreferrer" aria-label={`Open ${s.title} in the hello22 app`} style={{ alignSelf: "flex-end", marginTop: "auto", width: 34, height: 34, borderRadius: "50%", textDecoration: "none", background: s.c, color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 13 }} className="btnp"><i className="fa-solid fa-arrow-right" aria-hidden="true" /></a>
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
                {/* stars sirf "Loved by businesses" par (user mockup 2026-07-10) */}
                {x.t === "Loved by businesses" && (
                  <span aria-hidden="true" style={{ display: "inline-flex", gap: 3, marginTop: 5, color: "#f6b73c", fontSize: 10.5 }}>
                    {[0, 1, 2, 3, 4].map((n) => <i key={n} className="fa-solid fa-star" />)}
                  </span>
                )}
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
            <h2 style={{ ...h2, maxWidth: 660 }}><b style={BD}>Pick a Voice.</b><br />Click to <span style={HL}>Hear It Speak</span>.</h2>
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

      {/* FEATURES — horizontal thumbnail cards, 2 columns (user mockup 2026-07-10) */}
      <section id="features" className="sec-alt" style={{ position: "relative", zIndex: 1, maxWidth: 1536, margin: "0 auto", padding: "96px 28px 112px", scrollMarginTop: 90 }}>
        <div className="demo-header-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,520px)", gap: 24, alignItems: "center" }}>
          <div>
            <div data-rv style={eyebrow}><span aria-hidden="true" style={{ marginRight: 8, fontSize: 12 }}>✦</span>The platform</div>
            <h2 data-rv style={{ ...h2, maxWidth: 640 }}><b style={BD}>Everything You Need</b> to Talk to{" "}
              <span style={{ position: "relative", whiteSpace: "nowrap", display: "inline-block" }}>
                <span style={HL}>Everyone</span>
                <svg viewBox="0 0 120 12" aria-hidden="true" style={{ position: "absolute", left: 0, bottom: -9, width: "100%", height: 10, overflow: "visible" }}><path d="M3 9 C 30 3, 90 3, 117 7" fill="none" stroke="var(--lime)" strokeWidth="3.5" strokeLinecap="round" opacity=".8" /></svg>
              </span>.
            </h2>
            <p data-rv style={{ fontSize: 18, color: "var(--mut)", maxWidth: 560, margin: "18px 0 0", lineHeight: 1.6 }}>Built to feel human, work smarter, and scale with you — so every conversation delivers <span style={HL}>real impact</span>.</p>
          </div>
          {/* illustration: woman photo in blob + trusted card (user mockup 2026-07-10) */}
          <div className="prod-illus" data-rv="right" aria-hidden="true" style={{ position: "relative", minHeight: 290 }}>
            <div style={{ position: "absolute", inset: "-14px 30px 10px 96px", background: "radial-gradient(75% 70% at 50% 45%, rgba(44,118,237,.15), rgba(44,118,237,.06) 62%, transparent 80%)", borderRadius: "55% 45% 52% 48% / 58% 46% 54% 42%" }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/demo-caller.jpg" alt="" loading="lazy" style={{ position: "absolute", top: 2, left: "38%", width: 208, height: 208, borderRadius: "50%", objectFit: "cover", border: "5px solid var(--surface)", boxShadow: "0 20px 44px -20px var(--sh1)", animation: "h22floatSm 8s ease-in-out infinite" }} />
            {/* trusted card */}
            <div style={{ position: "absolute", right: -8, top: "52%", background: "var(--surface)", border: "1px solid var(--w09)", borderRadius: 16, padding: "13px 17px", boxShadow: "0 16px 34px -18px var(--sh1)", animation: "h22floatSm 7.5s ease-in-out -3s infinite" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ display: "inline-flex" }}>
                  {["/images/portrait-melissa.jpg", "/images/portrait-james.jpg", "/images/portrait-priya.jpg"].map((p, i) => (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img key={p} src={p} alt="" width={26} height={26} loading="lazy" style={{ width: 26, height: 26, borderRadius: "50%", objectFit: "cover", border: "2px solid var(--surface)", marginLeft: i === 0 ? 0 : -9 }} />
                  ))}
                </span>
                <span style={{ fontSize: 12.5, fontWeight: 700, color: "var(--tx2)", lineHeight: 1.4 }}>Trusted by 1,000+<br />businesses worldwide</span>
              </div>
              <span aria-hidden="true" style={{ display: "inline-flex", gap: 3, marginTop: 7, marginLeft: 36, color: "#f6b73c", fontSize: 10.5 }}>{[0, 1, 2, 3, 4].map((n) => <i key={n} className="fa-solid fa-star" />)}</span>
            </div>
            {/* heart + dashed arrow + pencil squiggle */}
            <svg viewBox="0 0 24 22" style={{ position: "absolute", left: 60, top: 56, width: 26, height: 24 }}><path d="M12 19 C 4 13, 1 8, 4 4.5 C 6.5 1.8, 10 2.6, 12 6 C 14 2.6, 17.5 1.8, 20 4.5 C 23 8, 20 13, 12 19 Z" fill="none" stroke="rgba(44,118,237,.55)" strokeWidth="2" strokeLinejoin="round" /></svg>
            <svg viewBox="0 0 60 90" style={{ position: "absolute", left: 40, top: 118, width: 46, height: 70 }}>
              <path d="M 44 6 C 16 22, 8 50, 22 78" fill="none" stroke="rgba(44,118,237,.45)" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="2 7" />
              <path d="M 20 80 l -1 -7 l 7 3 z" fill="rgba(44,118,237,.55)" />
            </svg>
            <svg viewBox="0 0 30 26" style={{ position: "absolute", right: 26, top: 6, width: 26, height: 22 }}><path d="M4 22 L 20 5 M 9 23 L 25 6" fill="none" stroke="rgba(44,118,237,.5)" strokeWidth="2" strokeLinecap="round" /></svg>
          </div>
        </div>
        <div className="plat-cols" style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 18, marginTop: 44, alignItems: "start" }}>
          {PLAT_COLS.map((col, ci) => (
            <div key={ci} style={{ display: "flex", flexDirection: "column", gap: 18, minWidth: 0 }}>
              {col.map((f) => (
                <div key={f.t} data-rv className="lift plat-card" style={{ ...card, padding: "20px 22px", display: "flex", gap: 18, alignItems: "center", flexWrap: "wrap" }}>
                  <div style={{ ...featIcon(f.tb, f.tbd, f.tc), flexShrink: 0 }}><i className={f.ic} aria-hidden="true" /></div>
                  <div style={{ flex: "1 1 220px", minWidth: 0 }}>
                    <h3 style={{ fontFamily: SUB, fontWeight: 700, fontSize: 18.5, margin: 0 }}>{f.t}</h3>
                    <p style={{ fontSize: 14.5, color: "var(--mut)", lineHeight: 1.6, margin: "8px 0 0" }}>{f.d}</p>
                  </div>
                  <span className="plat-thumb" style={{ position: "relative", flexShrink: 0, width: 168, height: 116 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={f.img} alt="" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 14, border: "1px solid var(--w08)", display: "block" }} />
                    <span aria-hidden="true" style={{ position: "absolute", top: -10, right: -10, width: 34, height: 34, borderRadius: "50%", background: f.bc, color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12, border: "3px solid var(--surface)", boxShadow: "0 8px 18px -8px var(--sh2)" }}><i className={f.bic} /></span>
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS — mockup layout (user mockup 2026-07-10): 2-col header + mini-UI step cards + band */}
      <section className="sec-tint" style={{ position: "relative", zIndex: 1, maxWidth: 1536, margin: "0 auto", padding: "64px 28px 112px" }}>
        <div className="demo-header-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,520px)", gap: 24, alignItems: "center" }}>
          <div>
            <div data-rv style={eyebrow}><span aria-hidden="true" style={{ marginRight: 8, fontSize: 12 }}>✦</span>How it works</div>
            <h2 data-rv style={{ ...h2, maxWidth: 640 }}><b style={BD}>Set Up, Sign Up,</b> Go Live — With{" "}
              <span style={{ position: "relative", whiteSpace: "nowrap", display: "inline-block" }}>
                <span style={HL}>hello22</span>
                <svg viewBox="0 0 120 12" aria-hidden="true" style={{ position: "absolute", left: 0, bottom: -9, width: "100%", height: 10, overflow: "visible" }}><path d="M3 9 C 30 3, 90 3, 117 7" fill="none" stroke="var(--lime)" strokeWidth="3.5" strokeLinecap="round" opacity=".8" /></svg>
              </span>.
            </h2>
            <p data-rv style={{ fontSize: 18, color: "var(--mut)", maxWidth: 600, margin: "18px 0 0", lineHeight: 1.6 }}><strong style={{ fontWeight: 800, color: "var(--tx2)" }}>No code, no telephony setup,</strong> no flowcharts. Sarah walks you through every step — confirm your business, create your account, and take your first real call.</p>
          </div>
          {/* illustration: Sarah photo + speech bubble (user mockup 2026-07-10) */}
          <div className="prod-illus" data-rv="right" aria-hidden="true" style={{ position: "relative", minHeight: 280 }}>
            <div style={{ position: "absolute", inset: "-10px 120px 20px 60px", background: "radial-gradient(75% 70% at 50% 45%, rgba(44,118,237,.15), rgba(44,118,237,.06) 62%, transparent 80%)", borderRadius: "50%" }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/demo-caller.jpg" alt="" loading="lazy" style={{ position: "absolute", top: -4, left: "22%", width: 200, height: 200, borderRadius: "50%", objectFit: "cover", border: "5px solid var(--surface)", boxShadow: "0 20px 44px -20px var(--sh1)", animation: "h22floatSm 8s ease-in-out infinite" }} />
            {/* Sarah speech bubble */}
            <div style={{ position: "absolute", right: -4, top: 44, maxWidth: 210, background: "var(--surface)", border: "1px solid var(--w09)", borderRadius: "20px 20px 20px 6px", padding: "14px 17px", boxShadow: "0 16px 36px -20px var(--sh1)", animation: "h22floatSm 7.5s ease-in-out -3s infinite" }}>
              <span aria-hidden="true" style={{ display: "inline-flex", alignItems: "flex-end", gap: 2, height: 12, marginBottom: 7 }}>
                {[5, 9, 12, 8, 5].map((h, i) => <span key={i} style={{ width: 2.5, height: h, borderRadius: 2, background: "var(--blue-ink)" }} />)}
              </span>
              <div style={{ fontSize: 14.5, lineHeight: 1.45, color: "var(--tx2)", fontWeight: 600 }}>Hi, I&apos;m Sarah.<br />Let&apos;s get you live<br />in minutes.</div>
              <i className="fa-regular fa-heart" style={{ position: "absolute", right: 14, bottom: 12, color: "var(--blue-ink)", fontSize: 14 }} aria-hidden="true" />
            </div>
            {/* hearts + dashed arrow + sparkle lines */}
            <svg viewBox="0 0 24 22" style={{ position: "absolute", left: 34, top: 66, width: 24, height: 22 }}><path d="M12 19 C 4 13, 1 8, 4 4.5 C 6.5 1.8, 10 2.6, 12 6 C 14 2.6, 17.5 1.8, 20 4.5 C 23 8, 20 13, 12 19 Z" fill="none" stroke="rgba(44,118,237,.55)" strokeWidth="2" strokeLinejoin="round" /></svg>
            <svg viewBox="0 0 90 70" style={{ position: "absolute", left: 6, bottom: 8, width: 84, height: 64 }}>
              <path d="M 84 8 C 46 14, 22 32, 14 58" fill="none" stroke="rgba(44,118,237,.45)" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="2 7" />
              <path d="M 10 62 l 1 -8 l 7 4 z" fill="rgba(44,118,237,.55)" />
            </svg>
            <svg viewBox="0 0 26 24" style={{ position: "absolute", right: 96, top: -12, width: 24, height: 22 }}><path d="M4 20 L 10 10 M 12 22 L 16 12 M 19 18 L 24 11" fill="none" stroke="rgba(44,118,237,.5)" strokeWidth="2" strokeLinecap="round" /></svg>
          </div>
        </div>
        {/* step cards + connecting arrows */}
        <div style={{ position: "relative" }}>
          <div className="uc-grid snap-x" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18, marginTop: 42 }}>
            {([
              { n: "01", c: "var(--lime)", cb: "rgba(44,118,237,.12)", t: "Set up", h: "Sarah Builds Your Agent", d: "hello22 finds your business and sets up your AI receptionist with you — just review the details and confirm.", ic: "fa-regular fa-user", step: 1 },
              { n: "02", c: "var(--violet)", cb: "rgba(157,139,255,.14)", t: "Account", h: "Create Your Account", d: "Add your name, email, and mobile so hello22 can route your calls and text you a summary after every one.", ic: "fa-solid fa-user-plus", step: 2 },
              { n: "03", c: "#22b573", cb: "rgba(34,197,94,.12)", t: "Go live", h: "Pick a Number & Go Live", d: "Claim your dedicated AI number, point your calls to it, and start handling real conversations in minutes.", ic: "fa-solid fa-phone-volume", step: 3 },
            ] as { n: string; c: string; cb: string; t: string; h: string; d: string; ic: string; step: 1 | 2 | 3 }[]).map((s) => (
              <div key={s.n} data-rv className="lift" style={{ ...card, padding: "24px 24px 20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                  <span style={{ width: 30, height: 30, borderRadius: "50%", flexShrink: 0, background: s.c, color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: SUB, fontSize: 12.5, fontWeight: 700 }}>{s.n}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".12em", color: s.c, flex: 1 }}>{s.t}</span>
                  <span style={{ width: 40, height: 40, borderRadius: 12, background: s.cb, color: s.c, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 15 }} aria-hidden="true"><i className={s.ic} /></span>
                </div>
                <h3 style={{ fontFamily: SUB, fontWeight: 700, fontSize: 19, margin: "16px 0 0" }}>{s.h}</h3>
                <p style={{ fontSize: 14.5, color: "var(--mut)", lineHeight: 1.6, margin: "10px 0 16px" }}>{s.d}</p>
                <StepShot step={s.step} />
              </div>
            ))}
          </div>
          {/* dashed arrows cards ke beech — mobile par hide */}
          {[1, 2].map((i) => (
            <svg key={i} className="hiw-arrow" viewBox="0 0 40 14" aria-hidden="true" style={{ position: "absolute", left: `calc(${(i * 100) / 3}% - 20px)`, top: "46%", width: 38, height: 14, zIndex: 2 }}>
              <path d="M 2 7 C 12 3, 26 11, 34 7" fill="none" stroke="rgba(44,118,237,.55)" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="2 5" />
              <path d="M 34 3.5 l 5 3.5 l -5 3.5 z" fill="rgba(44,118,237,.65)" />
            </svg>
          ))}
        </div>
        {/* bottom band */}
        <div data-rv style={{ ...card, borderRadius: 18, marginTop: 22, padding: "16px 24px", display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
            <span style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(44,118,237,.12)", border: "1px solid rgba(44,118,237,.28)", color: "var(--blue-ink)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 15 }} aria-hidden="true"><i className="fa-solid fa-headset" /></span>
            <span style={{ fontFamily: SUB, fontWeight: 700, fontSize: 16.5, color: "var(--blue-ink)" }}>Done in Minutes.</span>
          </span>
          <span style={{ fontSize: 14.5, color: "var(--mut)", flex: 1, minWidth: 180 }}>No contracts. No hidden setup.</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <span style={{ display: "inline-flex" }}>
              {["/images/portrait-james.jpg", "/images/portrait-melissa.jpg", "/images/portrait-priya.jpg"].map((p, i) => (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img key={p} src={p} alt="" width={28} height={28} loading="lazy" style={{ width: 28, height: 28, borderRadius: "50%", objectFit: "cover", border: "2px solid var(--surface)", marginLeft: i === 0 ? 0 : -9 }} />
              ))}
            </span>
            <span style={{ fontSize: 14, fontWeight: 700, color: "var(--tx2)" }}>Loved by 1,000+ businesses</span>
            <span aria-hidden="true" style={{ display: "inline-flex", gap: 3, color: "#f6b73c", fontSize: 12 }}>{[0, 1, 2, 3, 4].map((n) => <i key={n} className="fa-solid fa-star" />)}</span>
          </span>
        </div>
      </section>

      {/* USE CASES — mockup layout (user mockup 2026-07-10): 2-col header + icon list + photo/chat detail */}
      <section id="industries" className="sec-alt" style={{ position: "relative", zIndex: 1, maxWidth: 1536, margin: "0 auto", padding: "96px 28px 112px", scrollMarginTop: 90 }}>
        <div className="demo-header-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,520px)", gap: 24, alignItems: "center" }}>
          <div>
            <div data-rv style={eyebrow}><i className="fa-regular fa-building" style={{ marginRight: 8, fontSize: 11 }} aria-hidden="true" />Industries</div>
            <h2 data-rv style={{ ...h2, maxWidth: 640 }}><b style={BD}>Built for the Trades</b> That Run on{" "}
              <span style={{ position: "relative", whiteSpace: "nowrap", display: "inline-block" }}>
                <span style={HL}>Phone Calls</span>
                <svg viewBox="0 0 120 12" aria-hidden="true" style={{ position: "absolute", left: 0, bottom: -9, width: "100%", height: 10, overflow: "visible" }}><path d="M3 9 C 30 3, 90 3, 117 7" fill="none" stroke="var(--lime)" strokeWidth="3.5" strokeLinecap="round" opacity=".8" /></svg>
              </span>.
            </h2>
            <p data-rv style={{ fontSize: 18, color: "var(--mut)", maxWidth: 640, margin: "18px 0 0", lineHeight: 1.6 }}><strong style={{ fontWeight: 800, color: "var(--tx2)" }}>It&apos;s the same <span style={HL}>hello22 agent</span></strong> — you just configure it for your business in the AI Brain. No separate setup per industry.</p>
          </div>
          {/* illustration: photo + "One agent. Any trade." card (user mockup 2026-07-10) */}
          <div className="prod-illus" data-rv="right" aria-hidden="true" style={{ position: "relative", minHeight: 280 }}>
            <div style={{ position: "absolute", inset: "-8px 130px 16px 70px", background: "radial-gradient(75% 70% at 50% 45%, rgba(44,118,237,.15), rgba(44,118,237,.06) 62%, transparent 80%)", borderRadius: "55% 45% 52% 48% / 58% 46% 54% 42%" }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/demo-caller.jpg" alt="" loading="lazy" style={{ position: "absolute", top: -2, left: "26%", width: 196, height: 196, borderRadius: "50%", objectFit: "cover", border: "5px solid var(--surface)", boxShadow: "0 20px 44px -20px var(--sh1)", animation: "h22floatSm 8s ease-in-out infinite" }} />
            <div style={{ position: "absolute", right: -4, top: 66, background: "var(--surface)", border: "1px solid var(--w09)", borderRadius: 18, padding: "15px 19px", boxShadow: "0 16px 36px -20px var(--sh1)", display: "flex", alignItems: "center", gap: 12, animation: "h22floatSm 7.5s ease-in-out -3s infinite" }}>
              <span style={{ width: 38, height: 38, borderRadius: "50%", flexShrink: 0, background: "rgba(44,118,237,.12)", border: "1px solid rgba(44,118,237,.28)", color: "var(--blue-ink)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}><i className="fa-solid fa-phone-volume" aria-hidden="true" /></span>
              <span>
                <span style={{ display: "block", fontSize: 15, fontWeight: 800, color: "var(--tx)", lineHeight: 1.35 }}>One agent.<br />Any trade.</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11.5, fontWeight: 700, color: "var(--blue-ink)", marginTop: 5 }}><span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22b573" }} />Always on call.</span>
              </span>
            </div>
            <svg viewBox="0 0 26 24" style={{ position: "absolute", left: "20%", top: 6, width: 22, height: 20 }}><path d="M4 20 L 9 10 M 12 22 L 15 12" fill="none" stroke="rgba(44,118,237,.5)" strokeWidth="2" strokeLinecap="round" /></svg>
            <svg viewBox="0 0 26 24" style={{ position: "absolute", right: 118, top: -12, width: 24, height: 22 }}><path d="M4 20 L 10 10 M 12 22 L 16 12 M 19 18 L 24 11" fill="none" stroke="rgba(44,118,237,.5)" strokeWidth="2" strokeLinecap="round" /></svg>
            <svg viewBox="0 0 100 70" style={{ position: "absolute", left: -6, bottom: 0, width: 92, height: 64 }}>
              <path d="M 94 10 C 56 8, 28 26, 16 52" fill="none" stroke="rgba(44,118,237,.45)" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="2 7" />
              <path d="M 12 56 l 2 -8 l 6 5 z" fill="rgba(44,118,237,.55)" />
            </svg>
          </div>
        </div>
        <div className="uc-grid" style={{ display: "grid", gridTemplateColumns: "330px 1fr", gap: 20, marginTop: 40, alignItems: "start" }}>
          <div ref={ucListRef} style={{ willChange: "transform" }}>
          <div data-rv="left" className="ind-list" style={{ display: "flex", flexDirection: "column", background: "var(--surface)", border: "1px solid var(--w09)", borderRadius: 18, padding: 8, boxShadow: "0 14px 34px -26px var(--sh2)" }}>
            {(ucExpanded ? USECASES : USECASES.slice(0, 6)).map((t, i) => {
              const active = i === useCase;
              const m = IND_META[i];
              return (
                <button key={t.name} className="ind-btn" data-active={active} onClick={() => setUseCase(i)} style={{ display: "flex", alignItems: "center", gap: 11, width: "100%", cursor: "pointer", transition: "all .22s ease", padding: "13px 14px", borderRadius: 12, fontFamily: "inherit", background: active ? "rgba(44,118,237,.08)" : "transparent", border: "1px solid transparent", boxShadow: active ? "inset 3px 0 0 var(--lime)" : "none", color: active ? "var(--tx)" : "var(--mut)", borderBottom: "1px solid var(--w06)" }}>
                  <span className="ind-num" style={{ fontFamily: SUB, fontSize: 12.5, fontWeight: 600, opacity: .55, width: 20 }}>{(i + 1).toString().padStart(2, "0")}</span>
                  <span style={{ width: 30, height: 30, borderRadius: 9, flexShrink: 0, background: m.cb, color: m.c, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 13 }} aria-hidden="true"><i className={`fa-solid ${t.icon}`} /></span>
                  <span style={{ fontSize: 15, fontWeight: 600, flex: 1, textAlign: "left" }}>{t.name}</span>
                  <span className="ind-arrow" style={{ color: active ? "var(--lime)" : "var(--dim2)", transition: "color .2s", fontSize: active ? 15 : 11 }} aria-hidden="true">{active ? "→" : <i className="fa-solid fa-chevron-right" />}</span>
                </button>
              );
            })}
            <button className="ind-btn" onClick={() => { if (ucExpanded && useCase > 5) setUseCase(0); setUcExpanded(!ucExpanded); }} style={{ display: "flex", alignItems: "center", gap: 11, width: "100%", cursor: "pointer", transition: "all .22s ease", padding: "13px 14px", borderRadius: 12, fontFamily: "inherit", background: "transparent", border: "1px solid transparent", color: "var(--lime)" }}>
              <span style={{ width: 22, height: 22, borderRadius: "50%", background: "var(--lime)", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10 }} aria-hidden="true"><i className={`fa-solid ${ucExpanded ? "fa-chevron-up" : "fa-chevron-down"}`} /></span>
              <span style={{ fontSize: 14.5, fontWeight: 700, flex: 1, textAlign: "left" }}>{ucExpanded ? "See less" : `See more (${USECASES.length - 6})`}</span>
            </button>
          </div>
          </div>
          <div ref={ucCardRef} style={{ willChange: "transform" }}>
          <div data-rv="right" className="uc-card" style={{ background: "var(--card-grad)", border: "1px solid var(--w10)", borderRadius: 24, padding: 30, minHeight: 380 }}>
            <div className="uc-detail" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,44%)", gap: 26, alignItems: "stretch" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 50, height: 50, borderRadius: 14, background: IND_META[useCase].cb, border: `1px solid ${IND_META[useCase].c}33`, display: "flex", alignItems: "center", justifyContent: "center", color: IND_META[useCase].c, fontSize: 20 }}><i className={`fa-solid ${uc.icon}`} /></div>
                  <div>
                    <div style={{ fontFamily: SUB, fontWeight: 700, fontSize: 21 }}>{uc.name}</div>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12.5, fontWeight: 700, color: "#1a9a5c", marginTop: 2 }}><i className="fa-solid fa-circle-check" style={{ fontSize: 11 }} aria-hidden="true" />Configured in your AI Brain</div>
                  </div>
                </div>
                {/* title — pehle 3 words dark, baaki blue (mockup ka do-tone style) */}
                <h3 style={{ fontFamily: SUB, fontWeight: 700, fontSize: 25, letterSpacing: "-.02em", lineHeight: 1.25, margin: "22px 0 0" }}>
                  {uc.title.split(" ").slice(0, 3).join(" ")}{" "}
                  <span style={{ color: "var(--blue-ink)" }}>{uc.title.split(" ").slice(3).join(" ")}</span>
                </h3>
                <p style={{ fontSize: 15.5, color: "var(--mut)", lineHeight: 1.65, margin: "14px 0 0" }}>{uc.body}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 24 }}>
                  {uc.tags.map((tg, ti) => (
                    <span key={tg} style={{ ...pill, display: "inline-flex", alignItems: "center", gap: 7, color: "var(--tx3)", background: "var(--surface)", fontSize: 12.5, fontWeight: 600 }}>
                      <i className={TAG_ICS[ti % TAG_ICS.length]} style={{ fontSize: 10.5, color: IND_META[useCase].c }} aria-hidden="true" />{tg}
                    </span>
                  ))}
                </div>
              </div>
              {/* industry photo — chat bubbles overlay hataya (user feedback 2026-07-10: photo saaf chahiye) */}
              <div className="uc-photo" style={{ position: "relative", borderRadius: 16, overflow: "hidden", border: "1px solid var(--w09)", minHeight: 300 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img key={IND_META[useCase].photo} src={IND_META[useCase].photo} alt={uc.name} loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* HUMAN VS AI COMPARISON */}
      <section id="compare" style={{ position: "relative", zIndex: 1, maxWidth: 1536, margin: "0 auto", padding: "64px 28px 112px", scrollMarginTop: 90 }}>
        <div className="cmp-grid" style={{ display: "grid", gridTemplateColumns: ".85fr 1.3fr", gap: 54, alignItems: "center" }}>
        <div data-rv="left" style={{ position: "relative" }}>
          <div style={eyebrow}><i className="fa-solid fa-scale-balanced" style={{ marginRight: 8, fontSize: 11 }} aria-hidden="true" />Comparison</div>
          <h2 style={{ ...h2 }}>
            <b style={BD}>The Ultimate<br />Assistant:</b><br />
            <span style={{ position: "relative", whiteSpace: "nowrap", display: "inline-block" }}>
              <span style={HL}>Human vs. AI</span>
              <svg viewBox="0 0 120 12" aria-hidden="true" style={{ position: "absolute", left: 0, bottom: -10, width: "100%", height: 11, overflow: "visible" }}><path d="M3 9 C 30 3, 90 3, 117 7" fill="none" stroke="var(--lime)" strokeWidth="4" strokeLinecap="round" opacity=".8" /></svg>
            </span>
          </h2>
          {/* sparkle heading ke paas (user mockup 2026-07-10) */}
          <svg viewBox="0 0 26 24" aria-hidden="true" style={{ position: "absolute", left: 300, top: 44, width: 24, height: 22 }}><path d="M4 20 L 10 10 M 12 22 L 16 12" fill="none" stroke="rgba(44,118,237,.5)" strokeWidth="2" strokeLinecap="round" /></svg>
          <p style={{ fontSize: 17.5, color: "var(--mut)", margin: "24px 0 0", maxWidth: 460, lineHeight: 1.65 }}>AI receptionists are changing the way Australian businesses handle calls — <strong style={{ fontWeight: 700, color: "var(--tx2)" }}>saving time, cutting costs, and never missing an opportunity.</strong></p>
          {/* join card */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, background: "rgba(44,118,237,.07)", border: "1px solid rgba(44,118,237,.18)", borderRadius: 16, padding: "16px 20px", marginTop: 28, maxWidth: 440 }}>
            <span style={{ display: "inline-flex", flexShrink: 0 }}>
              {["/images/portrait-melissa.jpg", "/images/portrait-james.jpg", "/images/portrait-priya.jpg"].map((p, i) => (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img key={p} src={p} alt="" width={34} height={34} loading="lazy" style={{ width: 34, height: 34, borderRadius: "50%", objectFit: "cover", border: "2.5px solid var(--surface)", marginLeft: i === 0 ? 0 : -11 }} />
              ))}
            </span>
            <span style={{ fontSize: 14.5, lineHeight: 1.5, color: "var(--mut)" }}><strong style={{ fontWeight: 800, color: "var(--tx2)" }}>Join 1,000+ Australian businesses</strong> already using hello22 every day.</span>
          </div>
          {/* curly dashed arrow table ki taraf */}
          <svg viewBox="0 0 120 60" aria-hidden="true" className="cmp-squig" style={{ position: "absolute", left: 240, bottom: -58, width: 110, height: 56 }}>
            <path d="M 6 14 C 22 44, 44 52, 56 40 C 64 32, 54 24, 48 32 C 42 42, 62 50, 88 40" fill="none" stroke="rgba(44,118,237,.5)" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="3 6" />
            <path d="M 90 44 l 10 -6 l -4 11 z" fill="rgba(44,118,237,.55)" />
          </svg>
        </div>
        <div data-rv="right" style={{ background: "var(--surface)", border: "1px solid var(--w09)", borderRadius: 22, overflow: "hidden", boxShadow: "0 24px 60px -44px var(--sh2)" }}>
          {/* AI column chaudi (1.45fr) — chip text ke saath ek hi line par fit ho (user feedback 2026-07-10) */}
          <div className="cmp-row cmp-head" style={{ display: "grid", gridTemplateColumns: "1fr .95fr 1.45fr", alignItems: "stretch", borderBottom: "1px solid var(--w10)" }}>
            <div className="cmp-fh" style={{ padding: "18px 24px", display: "flex", alignItems: "center", fontSize: 12.5, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--dim)", background: "var(--w04)" }}>Feature</div>
            <div style={{ padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "flex-start", gap: 10, background: "var(--w04)" }}>
              <span style={{ width: 30, height: 30, borderRadius: "50%", flexShrink: 0, background: "var(--w06)", border: "1px solid var(--w10)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--mut)", fontSize: 12 }}><i className="fa-solid fa-user" /></span>
              <span style={{ fontFamily: SUB, fontSize: 14.5, fontWeight: 600, color: "var(--tx2)" }}>Traditional Receptionist</span>
            </div>
            <div className="cmp-ai" style={{ padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "flex-start", gap: 10 }}>
              <span style={{ width: 30, height: 30, borderRadius: "50%", flexShrink: 0, background: "var(--lime)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12, boxShadow: "0 8px 18px -8px rgba(44,118,237,.7)" }}><i className="fa-solid fa-headset" /></span>
              <span style={{ fontFamily: SUB, fontSize: 14.5, fontWeight: 700, color: "var(--blue-ink)" }}>Our AI Receptionist</span>
            </div>
          </div>
          {COMPARE.map((r, i) => (
            <div key={r.f} className="cmp-row" style={{ display: "grid", gridTemplateColumns: "1fr .95fr 1.45fr", alignItems: "stretch", borderTop: i === 0 ? "none" : "1px solid var(--w08)" }}>
              <div className="cmp-f" style={{ padding: "15px 24px", display: "flex", alignItems: "center", gap: 12 }}>
                {/* round icon circle (user mockup 2026-07-10) */}
                <span style={{ width: 38, height: 38, borderRadius: "50%", flexShrink: 0, background: "rgba(44,118,237,.1)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--blue-ink)", fontSize: 14 }}><i className={r.ic} /></span>
                <span style={{ fontSize: 14.5, fontWeight: 700, color: "var(--tx)" }}>{r.f}</span>
              </div>
              <div style={{ padding: "15px 20px", display: "flex", alignItems: "center", justifyContent: "flex-start", textAlign: "left", fontSize: 14, color: "var(--mut)", lineHeight: 1.5 }}>{r.h}</div>
              {/* chip text ke saath inline flow karta hai — wrap par icon ke neeche nahi girta (alignment fix 2026-07-10) */}
              <div className="cmp-ai" style={{ padding: "15px 20px", display: "flex", alignItems: "flex-start", justifyContent: "flex-start", gap: 10, textAlign: "left" }}>
                <span style={{ width: 18, height: 18, borderRadius: "50%", flexShrink: 0, marginTop: 2, background: "var(--lime)", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 9 }}><i className="fa-solid fa-check" /></span>
                <span style={{ flex: 1, minWidth: 0, fontSize: 13.5, fontWeight: 700, color: "var(--blue-ink)", lineHeight: 1.6, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {r.a}
                  <span style={{ display: "inline-block", marginLeft: 8, verticalAlign: "baseline", fontSize: 11, fontWeight: 700, color: "#1a9a5c", background: "rgba(34,197,94,.12)", border: "1px solid rgba(34,197,94,.25)", borderRadius: 8, padding: "2px 8px" }}>{r.chip}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
        </div>
        {/* bottom band — 4 quick-value items (user mockup 2026-07-10) */}
        <div data-rv className="plat-stats" style={{ background: "var(--surface)", border: "1px solid var(--w09)", borderRadius: 18, marginTop: 28, padding: "20px 22px", display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 18 }}>
          {[
            { ic: "fa-solid fa-phone-volume", c: "#fff", bg: "var(--lime)", t: "The Smarter Way to Answer.", d: "Save time. Reduce costs. Deliver a better caller experience.", big: true },
            { ic: "fa-solid fa-dollar-sign", c: "#1a9a5c", bg: "rgba(34,197,94,.13)", t: "Save Up to 80%", d: "compared to hiring in-house staff." },
            { ic: "fa-regular fa-clock", c: "var(--violet)", bg: "rgba(157,139,255,.15)", t: "Never Miss a Call", d: "Capture every lead, every time." },
            { ic: "fa-regular fa-face-smile", c: "#f59e0b", bg: "rgba(245,158,11,.14)", t: "Delight Your Callers", d: "Fast, friendly, human-like conversations." },
          ].map((x) => (
            <div key={x.t} style={{ display: "flex", alignItems: "center", gap: 13, minWidth: 0 }}>
              <span style={{ width: x.big ? 52 : 44, height: x.big ? 52 : 44, borderRadius: "50%", flexShrink: 0, background: x.bg, color: x.c, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: x.big ? 18 : 16, boxShadow: x.big ? "0 12px 26px -12px rgba(44,118,237,.7)" : "none" }}><i className={x.ic} aria-hidden="true" /></span>
              <span style={{ minWidth: 0 }}>
                <span style={{ display: "block", fontFamily: SUB, fontWeight: 700, fontSize: 14.5 }}>{x.t}</span>
                <span style={{ display: "block", fontSize: 12.5, color: "var(--mut)", marginTop: 2 }}>{x.d}</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* VALUE BAND — reference redesign (2026-07-13): 2-col header (photo blob + notification
          card + doodles), white cards with status pills + corner illustrations, handwritten
          sign-off. Doodles/illustrations inline SVG hain; <=680px par .why-deco hide. */}
      <section style={{ position: "relative", zIndex: 1, maxWidth: 1536, margin: "0 auto", padding: "64px 28px 100px" }}>
        <div data-rv className="band-pad" style={{ position: "relative", overflow: "hidden", background: "var(--band-bg)", border: "1px solid var(--w10)", borderRadius: 26, padding: "56px 40px" }}>
          <div className="why-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0,1.12fr) minmax(0,.88fr)", gap: "clamp(28px,4vw,56px)", alignItems: "center" }}>
            {/* left — text */}
            <div>
              <div style={eyebrow}><i className="fa-solid fa-heart" style={{ marginRight: 8, fontSize: 10 }} aria-hidden="true" />Why hello22</div>
              <h2 style={{ fontFamily: DISP, fontWeight: 600, letterSpacing: "-.02em", fontSize: "clamp(23px,4.2vw,40px)", lineHeight: 1.16, margin: "14px 0 0" }}>
                <b style={BD}>Every Missed Call</b> Is a{" "}
                <span style={{ position: "relative", display: "inline-block", whiteSpace: "nowrap" }}>
                  <span style={HL}>Missed Customer</span>
                  <svg aria-hidden="true" viewBox="0 0 220 12" style={{ position: "absolute", left: "2%", bottom: -12, width: "96%", height: 12, overflow: "visible" }}><path d="M4 9 C 62 3, 152 2, 216 6" stroke="var(--blue-ink)" strokeWidth="3.5" fill="none" strokeLinecap="round" opacity=".85" /></svg>
                </span>.
              </h2>
              <p style={{ fontSize: 17, color: "var(--mut)", maxWidth: 500, margin: "26px 0 0", lineHeight: 1.75 }}><strong style={{ fontWeight: 800, color: "var(--tx2)" }}>hello22 picks up every time</strong> — turning your phone into booked jobs, captured leads, and happy callers instead of voicemail.</p>
            </div>
            {/* right — photo blob + notification card + doodles */}
            <div className="why-photo" style={{ position: "relative", width: "100%", maxWidth: 430, justifySelf: "center", aspectRatio: "1 / 0.96" }}>
              <div aria-hidden="true" style={{ position: "absolute", inset: "8% -3% -3% 10%", background: "rgba(44,118,237,.13)", borderRadius: "58% 42% 55% 45% / 52% 55% 45% 48%" }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/customer-on-call.jpg" alt="Business owner taking a call" loading="lazy" style={{ position: "absolute", inset: "0 4% 2% 0", width: "96%", height: "98%", objectFit: "cover", objectPosition: "center 18%", borderRadius: "56% 44% 52% 48% / 50% 52% 48% 50%" }} />
              {/* notification card */}
              <div style={{ position: "absolute", top: "4%", right: 0, display: "flex", gap: 10, alignItems: "flex-start", background: "var(--surface)", border: "1px solid var(--w10)", borderRadius: 14, padding: "11px 14px", boxShadow: "0 18px 38px -20px var(--sh1)", maxWidth: 224 }}>
                <span style={{ width: 34, height: 34, borderRadius: "50%", flexShrink: 0, background: "rgba(44,118,237,.13)", color: "var(--blue-ink)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 13 }} aria-hidden="true"><i className="fa-solid fa-phone-volume" /></span>
                <span style={{ minWidth: 0 }}>
                  <span style={{ display: "block", fontSize: 12.5, fontWeight: 800, color: "var(--tx)", lineHeight: 1.35 }}>hello22 just answered another call!</span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11.5, fontWeight: 600, color: "var(--mut)", marginTop: 4 }}><span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22b573", animation: "h22pulse 1.6s infinite" }} />Lead captured</span>
                </span>
              </div>
              {/* doodles: sparkle / dashed squiggle / star / heart */}
              <svg aria-hidden="true" viewBox="0 0 34 34" style={{ position: "absolute", top: "1%", left: "2%", width: 30, height: 30, overflow: "visible" }}>
                <path d="M6 26 L13 15" stroke="var(--blue-ink)" strokeWidth="3" strokeLinecap="round" />
                <path d="M17 28 L21 20" stroke="var(--blue-ink)" strokeWidth="3" strokeLinecap="round" />
                <path d="M22 12 L29 3" stroke="var(--blue-ink)" strokeWidth="3" strokeLinecap="round" />
              </svg>
              <svg aria-hidden="true" viewBox="0 0 70 110" style={{ position: "absolute", left: "-4%", bottom: "8%", width: 56, height: 88, overflow: "visible" }}>
                <path d="M62 6 C 22 18, 10 44, 30 58 C 48 70, 40 92, 12 102" stroke="var(--blue-ink)" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeDasharray="1 9" opacity=".75" />
              </svg>
              <svg aria-hidden="true" viewBox="0 0 34 34" style={{ position: "absolute", right: "-2%", top: "48%", width: 26, height: 26, overflow: "visible" }}>
                <path d="M17 3 C 18.5 11, 23 15.5, 31 17 C 23 18.5, 18.5 23, 17 31 C 15.5 23, 11 18.5, 3 17 C 11 15.5, 15.5 11, 17 3 Z" stroke="var(--blue-ink)" strokeWidth="2.4" fill="none" strokeLinejoin="round" />
              </svg>
              <i className="fa-regular fa-heart" aria-hidden="true" style={{ position: "absolute", right: "2%", bottom: "4%", fontSize: 24, color: "var(--blue-ink)", transform: "rotate(-10deg)" }} />
            </div>
          </div>
          {/* cards — white surface, status pill, corner illustrations */}
          <div className="stat4" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18, marginTop: 44, maxWidth: 980, marginLeft: "auto", marginRight: "auto" }}>
            {[
              { ic: "fa-phone-volume", t: "Answers 24/7", d: "Never sends a caller to voicemail again — day, night, weekends, holidays.", pill: "Always here" },
              { ic: "fa-user-plus", t: "Captures Every Lead", d: "Gets the caller's name, number, and what they need on every call — so you never lose a lead.", pill: "Never miss a lead" },
              { ic: "fa-comment-dots", t: "Summary Every Call", d: "Texts and emails you the caller's details and a summary the moment they hang up.", pill: "Instant updates" },
            ].map((x, i) => (
              <div key={x.t} style={{ position: "relative", background: "var(--surface)", border: "1px solid var(--w09)", borderRadius: 20, padding: "30px 22px 26px", textAlign: "center", boxShadow: "0 14px 34px -26px var(--sh2)" }}>
                <div style={{ width: 56, height: 56, margin: "0 auto", borderRadius: "50%", background: "rgba(44,118,237,.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--lime)", fontSize: 20 }}><i className={`fa-solid ${x.ic}`} /></div>
                <div style={{ fontFamily: SUB, fontWeight: 700, fontSize: 18, marginTop: 18 }}>{x.t}</div>
                <p style={{ fontSize: 14, color: "var(--mut)", lineHeight: 1.6, margin: "10px 0 0" }}>{x.d}</p>
                <span className="why-pill" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 18, padding: "9px 18px", borderRadius: 999, background: "rgba(44,118,237,.1)", border: "1px solid rgba(44,118,237,.22)", color: "var(--blue-ink)", fontSize: 13.5, fontWeight: 700 }}><span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22b573" }} />{x.pill}</span>
                {i === 0 && (
                  <span className="why-deco" aria-hidden="true">
                    <svg viewBox="0 0 56 66" style={{ position: "absolute", left: -16, bottom: -10, width: 50, height: 60, overflow: "visible" }}>
                      <path d="M28 34 C 27 24, 20 16, 10 13 C 12 24, 19 31, 28 34 Z" fill="#8fbe8a" />
                      <path d="M29 34 C 31 25, 38 18, 47 16 C 45 27, 38 33, 29 34 Z" fill="#a9cf9f" />
                      <path d="M28 36 C 28 28, 28 20, 28 12" stroke="#6f9e6b" strokeWidth="2" fill="none" strokeLinecap="round" />
                      <path d="M15 38 L41 38 L37 62 L19 62 Z" fill="#e6c49d" />
                      <path d="M15 38 L41 38 L40 44 L16 44 Z" fill="#d9b489" />
                    </svg>
                    <svg viewBox="0 0 30 30" style={{ position: "absolute", left: -12, top: -14, width: 24, height: 24, overflow: "visible" }}>
                      <path d="M5 22 L11 13" stroke="var(--blue-ink)" strokeWidth="2.6" strokeLinecap="round" />
                      <path d="M15 25 L18 18" stroke="var(--blue-ink)" strokeWidth="2.6" strokeLinecap="round" />
                    </svg>
                  </span>
                )}
                {i === 1 && (
                  <span className="why-deco" aria-hidden="true">
                    <svg viewBox="0 0 70 60" style={{ position: "absolute", right: -30, bottom: -20, width: 60, height: 52, overflow: "visible" }}>
                      <path d="M4 52 C 22 50, 26 40, 18 36 C 10 32, 12 22, 28 18 C 44 14, 56 10, 66 6" stroke="var(--blue-ink)" strokeWidth="2.4" fill="none" strokeLinecap="round" />
                      <path d="M56 2 L 66 6 L 60 15" stroke="var(--blue-ink)" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                )}
                {i === 2 && (
                  <span className="why-deco" aria-hidden="true">
                    <svg viewBox="0 0 64 52" style={{ position: "absolute", right: -18, bottom: -12, width: 58, height: 47, overflow: "visible", transform: "rotate(8deg)" }}>
                      <rect x="6" y="14" width="48" height="32" rx="4" fill="#f3e7d3" stroke="#d9c4a4" strokeWidth="1.6" />
                      <path d="M6 18 L30 34 L54 18" stroke="#d9c4a4" strokeWidth="1.6" fill="none" strokeLinejoin="round" />
                      <path d="M50 8 L55 1" stroke="var(--blue-ink)" strokeWidth="2.4" strokeLinecap="round" />
                      <path d="M57 12 L62 7" stroke="var(--blue-ink)" strokeWidth="2.4" strokeLinecap="round" />
                    </svg>
                  </span>
                )}
              </div>
            ))}
          </div>
          {/* handwritten sign-off */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginTop: 36 }}>
            <span style={{ position: "relative", fontFamily: "var(--font-caveat), 'Segoe Script', cursive", fontSize: "clamp(21px,2.6vw,27px)", fontWeight: 600, color: "var(--blue-ink)" }}>
              More time for what matters
              <svg aria-hidden="true" viewBox="0 0 220 10" style={{ position: "absolute", left: "8%", bottom: -8, width: "84%", height: 9, overflow: "visible" }}><path d="M4 7 C 62 2, 152 2, 216 5" stroke="var(--blue-ink)" strokeWidth="2.6" fill="none" strokeLinecap="round" opacity=".8" /></svg>
            </span>
            <i className="fa-regular fa-heart" aria-hidden="true" style={{ color: "var(--blue-ink)", fontSize: 17 }} />
          </div>
        </div>
      </section>

      {/* EARLY ACCESS — mockup layout (user mockup 2026-07-10): 2-col header + doodle cards */}
      <section style={{ position: "relative", zIndex: 1, maxWidth: 1536, margin: "0 auto", padding: "64px 28px 112px" }}>
        <div className="demo-header-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,520px)", gap: 24, alignItems: "center", marginBottom: 34 }}>
          <div>
            <div data-rv style={eyebrow}><i className="fa-solid fa-champagne-glasses" style={{ marginRight: 8, fontSize: 11 }} aria-hidden="true" />Early access</div>
            <h2 data-rv style={{ ...h2, maxWidth: 640, margin: "14px 0 12px" }}><b style={BD}>What You Get</b> from{" "}
              <span style={{ position: "relative", whiteSpace: "nowrap", display: "inline-block" }}>
                <span style={HL}>Day One</span>
                <svg viewBox="0 0 120 16" aria-hidden="true" style={{ position: "absolute", left: 0, bottom: -12, width: "100%", height: 14, overflow: "visible" }}>
                  <path d="M30 4 C 55 1, 90 1, 112 3" fill="none" stroke="var(--lime)" strokeWidth="3" strokeLinecap="round" opacity=".8" />
                  <path d="M3 11 C 35 7, 85 7, 117 9" fill="none" stroke="var(--lime)" strokeWidth="3.5" strokeLinecap="round" opacity=".8" />
                </svg>
              </span>.
            </h2>
            <p data-rv style={{ fontSize: 18, color: "var(--mut)", maxWidth: 600, margin: "0", lineHeight: 1.6 }}><strong style={{ fontWeight: 800, color: "var(--tx2)" }}>hello22 is in early access.</strong> Here&apos;s exactly what your AI receptionist does the moment you go live — no inflated claims.</p>
          </div>
          {/* illustration: photo + "Always here" card (user mockup 2026-07-10) */}
          <div className="prod-illus" data-rv="right" aria-hidden="true" style={{ position: "relative", minHeight: 280 }}>
            <div style={{ position: "absolute", inset: "-10px 130px 12px 66px", background: "radial-gradient(75% 70% at 50% 45%, rgba(44,118,237,.15), rgba(44,118,237,.06) 62%, transparent 80%)", borderRadius: "55% 45% 52% 48% / 58% 46% 54% 42%" }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/demo-caller.jpg" alt="" loading="lazy" style={{ position: "absolute", top: -2, left: "25%", width: 198, height: 198, borderRadius: "50%", objectFit: "cover", border: "5px solid var(--surface)", boxShadow: "0 20px 44px -20px var(--sh1)", animation: "h22floatSm 8s ease-in-out infinite" }} />
            <div style={{ position: "absolute", right: -4, top: 62, background: "var(--surface)", border: "1px solid var(--w09)", borderRadius: 18, padding: "15px 19px", boxShadow: "0 16px 36px -20px var(--sh1)", display: "flex", alignItems: "flex-start", gap: 12, animation: "h22floatSm 7.5s ease-in-out -3s infinite" }}>
              <span style={{ width: 38, height: 38, borderRadius: "50%", flexShrink: 0, background: "var(--lime)", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", boxShadow: "0 10px 22px -10px rgba(44,118,237,.8)" }} aria-hidden="true">
                <span style={{ display: "inline-flex", alignItems: "flex-end", gap: 2, height: 13 }}>{[6, 10, 13, 9, 5].map((h, i) => <span key={i} style={{ width: 2.5, height: h, borderRadius: 2, background: "#fff" }} />)}</span>
              </span>
              <span>
                <span style={{ display: "block", fontSize: 14.5, fontWeight: 700, color: "var(--tx)", lineHeight: 1.4 }}>Hi, this is hello22.<br />How can I help you?</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11.5, fontWeight: 700, color: "var(--mut2)", marginTop: 5 }}><span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22b573" }} />Always here</span>
              </span>
            </div>
            <svg viewBox="0 0 24 22" style={{ position: "absolute", left: 34, top: 74, width: 24, height: 22 }}><path d="M12 19 C 4 13, 1 8, 4 4.5 C 6.5 1.8, 10 2.6, 12 6 C 14 2.6, 17.5 1.8, 20 4.5 C 23 8, 20 13, 12 19 Z" fill="none" stroke="rgba(44,118,237,.55)" strokeWidth="2" strokeLinejoin="round" /></svg>
            <svg viewBox="0 0 26 24" style={{ position: "absolute", right: 128, top: -12, width: 24, height: 22 }}><path d="M4 20 L 10 10 M 12 22 L 16 12" fill="none" stroke="rgba(44,118,237,.5)" strokeWidth="2" strokeLinecap="round" /></svg>
            <svg viewBox="0 0 70 80" style={{ position: "absolute", right: 34, bottom: -8, width: 56, height: 64 }}>
              <path d="M 60 74 C 34 62, 26 40, 40 16" fill="none" stroke="rgba(44,118,237,.45)" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="2 7" />
              <path d="M 42 12 l -8 2 l 5 6 z" fill="rgba(44,118,237,.55)" />
            </svg>
          </div>
        </div>
        <div className="uc-grid snap-x" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }}>
          {([
            { ic: "fa-phone-volume", t: "Answers Every Call", d: "24/7 — no missed calls, no hold music, no voicemail. Every caller gets a real, natural conversation.", bg: "rgba(44,118,237,.16)", c: "var(--lime)", doodle: 1 },
            { ic: "fa-bolt", t: "Live in Minutes", d: "Describe your agent, connect your tools, pick a number. No code, no telephony setup, no flowcharts.", bg: "rgba(86,224,224,.16)", c: "var(--cyan)", doodle: 2 },
            { ic: "fa-file-lines", t: "Every Call Captured", d: "Transcribed, summarised, and analysed automatically — delivered by SMS, WhatsApp, and email the moment the call ends.", bg: "rgba(157,139,255,.16)", c: "var(--violet)", doodle: 3 },
          ] as { ic: string; t: string; d: string; bg: string; c: string; doodle: 1 | 2 | 3 }[]).map((t) => (
            <div key={t.t} data-rv className="lift" style={{ ...card, padding: 28, display: "flex", flexDirection: "column" }}>
              <div style={{ width: 46, height: 46, borderRadius: 13, background: t.bg, color: t.c, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 19 }}><i className={`fa-solid ${t.ic}`} /></div>
              <h3 style={{ fontFamily: SUB, fontWeight: 700, fontSize: 19, margin: "18px 0 0" }}>{t.t}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--mut)", margin: "10px 0 0" }}>{t.d}</p>
              {/* line-art doodle card ke bottom par (user mockup 2026-07-10) */}
              {t.doodle === 1 && (
                <svg viewBox="0 0 280 70" aria-hidden="true" style={{ width: "100%", maxWidth: 280, height: 66, marginTop: "auto", paddingTop: 18, alignSelf: "center" }}>
                  <circle cx="46" cy="38" r="22" fill="rgba(44,118,237,.08)" stroke="rgba(44,118,237,.6)" strokeWidth="2" />
                  <path d="M 28 34 C 28 22, 64 22, 64 34" fill="none" stroke="rgba(44,118,237,.7)" strokeWidth="2.5" strokeLinecap="round" />
                  <rect x="24" y="33" width="7" height="11" rx="3.5" fill="rgba(44,118,237,.7)" />
                  <rect x="61" y="33" width="7" height="11" rx="3.5" fill="rgba(44,118,237,.7)" />
                  <circle cx="39" cy="38" r="1.8" fill="rgba(44,118,237,.8)" />
                  <circle cx="53" cy="38" r="1.8" fill="rgba(44,118,237,.8)" />
                  <path d="M 38 46 C 42 50, 50 50, 54 46" fill="none" stroke="rgba(44,118,237,.8)" strokeWidth="2" strokeLinecap="round" />
                  <path d="M 72 40 C 100 28, 120 52, 150 40 C 170 32, 180 38, 190 40" fill="none" stroke="rgba(44,118,237,.45)" strokeWidth="1.8" strokeLinecap="round" />
                  <rect x="192" y="18" width="62" height="34" rx="16" fill="rgba(44,118,237,.08)" stroke="rgba(44,118,237,.5)" strokeWidth="2" />
                  <path d="M 208 34 C 210 38, 214 38, 216 34 M 228 34 C 230 38, 234 38, 236 34" fill="none" stroke="rgba(44,118,237,.7)" strokeWidth="2" strokeLinecap="round" />
                </svg>
              )}
              {t.doodle === 2 && (
                <svg viewBox="0 0 280 70" aria-hidden="true" style={{ width: "100%", maxWidth: 280, height: 66, marginTop: "auto", paddingTop: 18, alignSelf: "center" }}>
                  <rect x="26" y="8" width="44" height="54" rx="8" fill="rgba(20,163,163,.06)" stroke="rgba(20,163,163,.55)" strokeWidth="2" />
                  {[22, 34, 46].map((y) => (
                    <g key={y}>
                      <path d={`M 34 ${y} l 3 3 l 5 -6`} fill="none" stroke="rgba(20,163,163,.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d={`M 48 ${y + 1} h 14`} stroke="rgba(20,163,163,.45)" strokeWidth="2" strokeLinecap="round" />
                    </g>
                  ))}
                  <path d="M 78 38 C 110 26, 130 52, 162 38 C 180 31, 190 36, 198 38" fill="none" stroke="rgba(20,163,163,.45)" strokeWidth="1.8" strokeLinecap="round" />
                  <circle cx="222" cy="38" r="20" fill="rgba(34,197,94,.08)" stroke="rgba(34,197,94,.55)" strokeWidth="2" />
                  <path d="M 213 38 l 6 6 l 12 -13" fill="none" stroke="rgba(34,197,94,.8)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M 246 16 L 250 8 M 252 20 L 258 14" fill="none" stroke="rgba(34,197,94,.6)" strokeWidth="2" strokeLinecap="round" />
                </svg>
              )}
              {t.doodle === 3 && (
                <svg viewBox="0 0 280 70" aria-hidden="true" style={{ width: "100%", maxWidth: 280, height: 66, marginTop: "auto", paddingTop: 18, alignSelf: "center" }}>
                  <rect x="22" y="20" width="52" height="34" rx="10" fill="rgba(157,139,255,.1)" stroke="rgba(157,139,255,.55)" strokeWidth="2" />
                  <path d="M 32 32 h 32 M 32 42 h 22" stroke="rgba(157,139,255,.7)" strokeWidth="2" strokeLinecap="round" />
                  <path d="M 80 38 C 108 26, 126 50, 152 38 C 168 31, 176 36, 184 38" fill="none" stroke="rgba(157,139,255,.45)" strokeWidth="1.8" strokeLinecap="round" />
                  <circle cx="176" cy="24" r="12" fill="rgba(34,197,94,.12)" stroke="rgba(34,197,94,.5)" strokeWidth="1.6" />
                  <text x="176" y="29" textAnchor="middle" fontSize="13" fill="#1a9a5c" fontFamily="'Font Awesome 6 Brands','Font Awesome 7 Brands'" aria-hidden="true">&#xf232;</text>
                  <rect x="228" y="12" width="34" height="24" rx="7" fill="rgba(157,139,255,.1)" stroke="rgba(157,139,255,.55)" strokeWidth="2" />
                  <path d="M 230 15 L 245 27 L 260 15" fill="none" stroke="rgba(157,139,255,.6)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="196" y="42" width="42" height="22" rx="11" fill="rgba(44,118,237,.08)" stroke="rgba(44,118,237,.5)" strokeWidth="1.8" />
                  <circle cx="209" cy="53" r="2" fill="rgba(44,118,237,.7)" /><circle cx="217" cy="53" r="2" fill="rgba(44,118,237,.7)" /><circle cx="225" cy="53" r="2" fill="rgba(44,118,237,.7)" />
                </svg>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="sec-alt" style={{ position: "relative", zIndex: 1, maxWidth: 1536, margin: "0 auto", padding: "96px 28px 112px", scrollMarginTop: 90 }}>
        {/* Header — reference redesign (2026-07-13): 2-col, left text + right photo blob with
            handwritten "Real stories. Real impact." + doodles. why-grid = same responsive rule. */}
        <div data-rv className="why-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0,1.1fr) minmax(0,.9fr)", gap: "clamp(24px,4vw,52px)", alignItems: "center" }}>
          <div>
            <div style={eyebrow}><i className="fa-solid fa-heart" style={{ marginRight: 8, fontSize: 10 }} aria-hidden="true" />Testimonials</div>
            <h2 style={{ ...h2 }}>
              <b style={BD}>What Our Clients</b><br />
              <span style={{ position: "relative", display: "inline-block", whiteSpace: "nowrap" }}>
                <span style={HL}>Say.</span>
                {/* scribble underline — reference jaisa double stroke + zigzag */}
                <svg aria-hidden="true" viewBox="0 0 110 22" style={{ position: "absolute", left: 0, bottom: -18, width: "115%", height: 20, overflow: "visible" }}>
                  <path d="M4 6 C 34 2, 74 2, 106 5" stroke="var(--blue-ink)" strokeWidth="3.5" fill="none" strokeLinecap="round" opacity=".85" />
                  <path d="M8 15 L 26 12 L 16 18 L 34 15" stroke="var(--blue-ink)" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity=".8" />
                </svg>
              </span>
            </h2>
            <p style={{ fontSize: 18, color: "var(--mut)", margin: "26px 0 0", maxWidth: 520, lineHeight: 1.65 }}><strong style={{ fontWeight: 800, color: "var(--tx2)" }}>We&apos;re proud</strong> of every call we answer. Here&apos;s what business owners had to say after putting hello22 on their front desk.</p>
          </div>
          {/* right — handwritten note + photo blob + doodles */}
          <div className="testi-hero" style={{ position: "relative", display: "flex", alignItems: "center", gap: 10, justifySelf: "center", width: "100%", maxWidth: 500 }}>
            <div style={{ position: "relative", flexShrink: 0, paddingBottom: 34 }}>
              <span style={{ display: "block", fontFamily: "var(--font-caveat), 'Segoe Script', cursive", fontSize: "clamp(20px,2.2vw,26px)", fontWeight: 600, lineHeight: 1.3, color: "var(--blue-ink)", whiteSpace: "nowrap" }}>Real stories.<br />Real impact.</span>
              <i className="fa-regular fa-heart" aria-hidden="true" style={{ position: "absolute", left: "34%", bottom: 26, fontSize: 17, color: "var(--blue-ink)" }} />
              <svg aria-hidden="true" viewBox="0 0 60 40" style={{ position: "absolute", right: -16, bottom: 0, width: 54, height: 36, overflow: "visible" }}>
                <path d="M4 6 C 12 26, 32 34, 52 28" stroke="var(--blue-ink)" strokeWidth="2.6" fill="none" strokeLinecap="round" />
                <path d="M42 24 L 52 28 L 48 38" stroke="var(--blue-ink)" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div style={{ position: "relative", flex: "1 1 auto", minWidth: 0, aspectRatio: "1 / 0.88" }}>
              <div aria-hidden="true" style={{ position: "absolute", inset: "10% -2% -2% 6%", background: "rgba(44,118,237,.12)", borderRadius: "55% 45% 58% 42% / 50% 55% 45% 50%" }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/demo-caller.jpg" alt="Happy hello22 customer" loading="lazy" style={{ position: "absolute", inset: "0 4% 4% 0", width: "96%", height: "96%", objectFit: "cover", objectPosition: "center 20%", borderRadius: "58% 42% 52% 48% / 52% 50% 50% 48%" }} />
              <svg aria-hidden="true" viewBox="0 0 30 30" style={{ position: "absolute", top: "-2%", right: "2%", width: 26, height: 26, overflow: "visible" }}>
                <path d="M5 24 L11 15" stroke="var(--blue-ink)" strokeWidth="2.8" strokeLinecap="round" />
                <path d="M16 27 L19 20" stroke="var(--blue-ink)" strokeWidth="2.8" strokeLinecap="round" />
                <path d="M20 12 L26 4" stroke="var(--blue-ink)" strokeWidth="2.8" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
        <div className="testi-grid">
          {/* rating column — slider arrows ke saath */}
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
            <p style={{ fontSize: 14.5, color: "var(--mut)", lineHeight: 1.6, margin: 0 }}>Real reviews from businesses using hello22 as their 24/7 front desk.<br /><span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontWeight: 700, color: "var(--tx2)", marginTop: 4 }}>Thank you! <i className="fa-regular fa-heart" aria-hidden="true" style={{ color: "var(--blue-ink)", fontSize: 14 }} /></span></p>
            <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className="btnp" style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none", background: "var(--lime)", color: "#fff", fontWeight: 700, fontSize: 15, padding: "13px 24px", borderRadius: 999, boxShadow: "0 14px 30px -14px rgba(44,118,237,.7)" }}><BtnTxt t="Read Google Reviews" /> <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: 12 }} aria-hidden="true" /></a>
            {/* slider arrows */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 4 }}>
              <button aria-label="Previous reviews" onClick={() => setTestiPage((p) => Math.max(0, p - 1))} disabled={testiPage === 0} className="btnp" style={{ width: 44, height: 44, borderRadius: "50%", cursor: testiPage === 0 ? "default" : "pointer", background: "var(--surface)", border: "1.5px solid rgba(44,118,237,.4)", color: "var(--blue-ink)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 14, opacity: testiPage === 0 ? 0.35 : 1 }}><i className="fa-solid fa-arrow-left" aria-hidden="true" /></button>
              <button aria-label="Next reviews" onClick={() => setTestiPage((p) => Math.min(testiPages - 1, p + 1))} disabled={testiPage >= testiPages - 1} className="btnp" style={{ width: 44, height: 44, borderRadius: "50%", cursor: testiPage >= testiPages - 1 ? "default" : "pointer", background: "var(--lime)", border: "none", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 14, boxShadow: "0 10px 24px -12px rgba(44,118,237,.7)", opacity: testiPage >= testiPages - 1 ? 0.35 : 1 }}><i className="fa-solid fa-arrow-right" aria-hidden="true" /></button>
            </div>
          </div>
          {/* review slider — arrows se pages slide hote hain */}
          <div data-rv className="testi-slider" style={{ overflow: "hidden", minWidth: 0 }}>
            <div style={{ display: "flex", gap: 18, transform: `translateX(calc(${-testiPage} * (100% + 18px)))`, transition: "transform .5s cubic-bezier(.2,.7,.2,1)" }}>
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="lift" style={{ ...card, display: "flex", flexDirection: "column", padding: 26, margin: 0, flex: `0 0 calc((100% - ${(testiPerView - 1) * 18}px) / ${testiPerView})` }}>
              <div aria-label={`Rated ${t.stars} out of 5 stars`} style={{ display: "flex", gap: 4, fontSize: 15 }}>
                {[0, 1, 2, 3, 4].map((n) => {
                  const full = n + 1 <= Math.floor(t.stars);
                  const half = !full && t.stars > n;
                  return <i key={n} className={`fa-solid ${half ? "fa-star-half-stroke" : "fa-star"}`} style={{ color: full || half ? "#f6b73c" : "var(--w18)" }} aria-hidden="true" />;
                })}
              </div>
              <blockquote style={{ flex: 1, fontSize: 15, lineHeight: 1.65, color: "var(--tx3)", margin: "16px 0 0" }}>&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption style={{ display: "flex", alignItems: "center", gap: 12, borderTop: "1px solid var(--w08)", marginTop: 20, paddingTop: 18 }}>
                {t.img
                  /* eslint-disable-next-line @next/next/no-img-element */
                  ? <img src={t.img} alt={t.name} width={44} height={44} loading="lazy" style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(44,118,237,.35)" }} />
                  : <span aria-hidden="true" style={{ width: 44, height: 44, flexShrink: 0, borderRadius: "50%", background: "rgba(44,118,237,.14)", border: "2px solid rgba(44,118,237,.35)", color: "var(--blue-ink)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: SUB, fontWeight: 700, fontSize: 16 }}>{t.name.charAt(0)}</span>}
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 14.5, fontWeight: 700, color: "var(--tx)" }}>{t.name}</div>
                  <div style={{ fontSize: 12.5, color: "var(--mut)", marginTop: 2 }}>{t.role}</div>
                </div>
                <i className="fa-solid fa-quote-right" style={{ marginLeft: "auto", fontSize: 30, color: "rgba(44,118,237,.22)", flexShrink: 0 }} aria-hidden="true" />
              </figcaption>
            </figure>
          ))}
            </div>
          </div>
        </div>
        {/* handwritten sign-off — reference jaisa */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginTop: 44 }}>
          <svg aria-hidden="true" viewBox="0 0 26 26" style={{ width: 20, height: 20, overflow: "visible", flexShrink: 0 }}>
            <path d="M4 22 L9 14" stroke="var(--blue-ink)" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M13 24 L15 18" stroke="var(--blue-ink)" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
          <span style={{ position: "relative", fontFamily: "var(--font-caveat), 'Segoe Script', cursive", fontSize: "clamp(20px,2.5vw,26px)", fontWeight: 600, color: "var(--blue-ink)", textAlign: "center" }}>
            Trusted by businesses. Loved by customers.
            <svg aria-hidden="true" viewBox="0 0 220 10" style={{ position: "absolute", left: "22%", bottom: -8, width: "56%", height: 9, overflow: "visible" }}><path d="M4 7 C 62 2, 152 2, 216 5" stroke="var(--blue-ink)" strokeWidth="2.6" fill="none" strokeLinecap="round" opacity=".8" /></svg>
          </span>
          <i className="fa-regular fa-heart" aria-hidden="true" style={{ color: "var(--blue-ink)", fontSize: 17, flexShrink: 0 }} />
        </div>
      </section>

      {/* PRICING — id niche ke <p> par hai (user ki choice 2026-07-10, wahi original placement) */}
      {/* bottom 112→72 — ROI CTA ke baad neeche bahut khali lag raha tha (user feedback 2026-07-13) */}
      <section className="sec-tint" style={{ position: "relative", zIndex: 1, maxWidth: 1536, margin: "0 auto", padding: "64px 28px 72px", scrollMarginTop: 90 }}>
        {/* Header — reference UI (2026-07-13): heading ke neeche hand-drawn underline + sparkle,
            right mein handwritten note bubble (arrow + heart doodles). Note <=1080px par hidden. */}
        <div data-rv style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 36 }}>
          <div style={{ maxWidth: 560 }}>
            <div style={eyebrow}><i className="fa-solid fa-tag" aria-hidden="true" style={{ marginRight: 8, fontSize: 10 }} />Pricing</div>
            <h2 style={{ ...h2 }}>
              <b style={BD}>Simple Plans.</b>{" "}
              <span style={{ position: "relative", display: "inline-block", whiteSpace: "nowrap" }}>
                <span style={HL}>Cancel Anytime.</span>
                <svg aria-hidden="true" viewBox="0 0 220 12" style={{ position: "absolute", left: "2%", bottom: -12, width: "96%", height: 12, overflow: "visible" }}><path d="M4 9 C 62 3, 152 2, 216 6" stroke="var(--blue-ink)" strokeWidth="3.5" fill="none" strokeLinecap="round" opacity=".85" /></svg>
                <svg aria-hidden="true" viewBox="0 0 30 30" style={{ position: "absolute", right: -38, top: -18, width: 26, height: 26, overflow: "visible" }}>
                  <path d="M8 22 L14 12" stroke="var(--blue-ink)" strokeWidth="2.6" strokeLinecap="round" />
                  <path d="M18 20 L26 8" stroke="var(--blue-ink)" strokeWidth="2.6" strokeLinecap="round" />
                </svg>
              </span>
            </h2>
            <p id="pricing" style={{ fontSize: 18, color: "var(--mut)", margin: "22px 0 0", maxWidth: 520, lineHeight: 1.6, scrollMarginTop: 90 }}><strong style={{ fontWeight: 800, color: "var(--tx2)" }}>No setup fees, no contracts.</strong> Pick a plan and go live today — secure checkout powered by Stripe.</p>
            <div style={{ display: "flex", justifyContent: "flex-start", marginTop: 20 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "8px 18px 8px 9px", borderRadius: 999, background: "rgba(44,118,237,.1)", border: "1px solid rgba(44,118,237,.24)", color: "var(--blue-ink)", fontSize: 14, fontWeight: 600 }}>
                <span style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(44,118,237,.16)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}><i className="fa-solid fa-gift" /></span>
                All plans include a 14-day free trial (30 call minutes)
              </span>
            </div>
          </div>
          <div className="price-note" style={{ position: "relative", flexShrink: 0, marginTop: 34, marginRight: 26 }}>
            <div style={{ background: "var(--surface)", border: "1px solid rgba(44,118,237,.3)", borderRadius: 18, padding: "12px 24px 14px", boxShadow: "0 16px 34px -22px var(--sh2)", fontFamily: "var(--font-caveat), 'Segoe Script', cursive", fontSize: 24, lineHeight: 1.2, color: "var(--blue-ink)" }}>
              Start free.<br />Upgrade anytime.<br />Cancel anytime.
            </div>
            <i className="fa-regular fa-heart" aria-hidden="true" style={{ position: "absolute", right: -16, bottom: -12, fontSize: 20, color: "var(--blue-ink)", transform: "rotate(14deg)" }} />
            <svg aria-hidden="true" viewBox="0 0 48 52" style={{ position: "absolute", left: -50, bottom: -40, width: 44, height: 48, overflow: "visible" }}>
              <path d="M44 4 C 28 10, 16 22, 12 40" stroke="var(--blue-ink)" strokeWidth="2.6" fill="none" strokeLinecap="round" />
              <path d="M4 32 L 12 42 L 21 37" stroke="var(--blue-ink)" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        <div data-rv className="price-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18, marginTop: 42, alignItems: "stretch" }}>
          {/* card par overflow:hidden hataya — floating badge top border par straddle karta hai (reference UI) */}
          {PLANS.map((p) => (
            <div key={p.name} className={p.popular ? "" : "lift"} style={{ position: "relative", display: "flex", flexDirection: "column", background: "var(--surface)", border: p.popular ? "1.5px solid rgba(44,118,237,.55)" : "1.5px solid var(--w14)", borderRadius: 22, boxShadow: p.popular ? "0 30px 70px -34px rgba(44,118,237,.45)" : "0 10px 30px -24px var(--sh2)" }}>
              {p.popular && (
                <>
                  <div style={{ position: "absolute", top: -15, left: "50%", transform: "translateX(-50%)", background: "var(--lime)", color: "#fff", fontSize: 11.5, fontWeight: 800, padding: "7px 18px", borderRadius: 999, textTransform: "uppercase", letterSpacing: ".07em", whiteSpace: "nowrap", boxShadow: "0 10px 22px -10px rgba(44,118,237,.65)" }}>Most popular</div>
                  <svg aria-hidden="true" viewBox="0 0 30 30" style={{ position: "absolute", top: -24, right: 26, width: 22, height: 22, overflow: "visible" }}>
                    <path d="M8 24 L14 13" stroke="var(--blue-ink)" strokeWidth="2.4" strokeLinecap="round" />
                    <path d="M18 22 L26 9" stroke="var(--blue-ink)" strokeWidth="2.4" strokeLinecap="round" />
                  </svg>
                </>
              )}
              <div style={{ padding: "38px 24px 0", display: "flex", flexDirection: "column", flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
                  <span style={{ width: 46, height: 46, borderRadius: "50%", flexShrink: 0, background: p.violet ? "rgba(157,139,255,.16)" : "rgba(44,118,237,.12)", border: p.violet ? "1px solid rgba(157,139,255,.32)" : "1px solid rgba(44,118,237,.28)", color: p.violet ? "var(--violet)" : "var(--blue-ink)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}><i className={p.icon} aria-hidden="true" /></span>
                  <span style={{ minWidth: 0, fontFamily: SUB, fontWeight: 700, fontSize: 19 }}>{p.name}</span>
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 7, margin: "18px 0 14px" }}><span style={{ fontFamily: SUB, fontWeight: 700, fontSize: 17, color: "var(--tx3)" }}>AUD</span><span style={{ fontFamily: SUB, fontWeight: 700, fontSize: 42, color: "var(--tx)", letterSpacing: "-.02em", lineHeight: 1 }}>{p.price}</span><span style={{ fontSize: 15, fontWeight: 600, color: "var(--mut)" }}>/ month</span></div>
                <div className="plan-caps" style={{ display: "flex", flexWrap: "wrap", alignContent: "flex-start", gap: 8, marginBottom: 18, minHeight: 82 }}>
                  {p.caps.map((c) => (
                    <span key={c.label} style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 12.5, fontWeight: 700, padding: "7px 12px", borderRadius: 999, background: c.blue ? "rgba(44,118,237,.12)" : "var(--w05)", border: c.blue ? "1px solid rgba(44,118,237,.28)" : "1px solid var(--w10)", color: c.blue ? "var(--blue-ink)" : "var(--tx3)" }}><i className={c.icon} aria-hidden="true" style={c.ic ? { color: c.ic } : undefined} />{c.label}</span>
                  ))}
                </div>
                <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="btnp" style={p.popular
                  ? { position: "relative", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", background: "var(--lime)", color: "#fff", fontWeight: 700, fontSize: 15, padding: "13px 42px 13px 16px", borderRadius: 14, boxShadow: "0 14px 30px -14px rgba(44,118,237,.7)" }
                  : { position: "relative", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", background: "transparent", color: "var(--blue-ink)", fontWeight: 700, fontSize: 15, padding: "13px 42px 13px 16px", borderRadius: 14, border: "1.5px solid rgba(44,118,237,.5)" }}>
                  Start 14-day free trial<i className="fa-solid fa-arrow-right" aria-hidden="true" style={{ position: "absolute", right: 18, fontSize: 13 }} />
                </a>
                <div style={{ height: 1, background: "var(--w08)", margin: "18px 0 16px" }} />
                <div style={{ display: "flex", flexDirection: "column", gap: 11, flex: 1, paddingBottom: 20 }}>
                  {p.feats.map((f) => (
                    <div key={f.t} style={{ display: "flex", gap: 10, fontSize: 13.5, fontWeight: 600, alignItems: "flex-start", color: f.on ? "var(--tx)" : "var(--dim)" }}>
                      <span style={{ width: 20, height: 20, flexShrink: 0, marginTop: 1, borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 9, background: f.on ? "var(--lime)" : "var(--w06)", border: f.on ? "none" : "1px solid var(--w12)", color: f.on ? "#fff" : "var(--dim)" }}><i className={`fa-solid ${f.on ? "fa-check" : "fa-xmark"}`} aria-hidden="true" /></span>
                      {/* strikethrough hataya — reference UI mein excluded items sirf gray hain */}
                      <span style={{ lineHeight: 1.45 }}>{f.t}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ background: "rgba(44,118,237,.07)", borderTop: "1px solid rgba(44,118,237,.16)", borderRadius: "0 0 20px 20px", padding: "13px 16px", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: 13, fontWeight: 700, color: "var(--blue-ink)" }}>
                <i className="fa-solid fa-shield-halved" style={{ fontSize: 12 }} aria-hidden="true" />14-day free trial · Cancel anytime
              </div>
            </div>
          ))}
        </div>
        {/* ROI CALCULATOR CTA — pricing section ka hissa (user request 2026-07-13 v3:
            alag section nahi; click par /calculator page khulta hai, popup nahi). */}
        {/* marginTop 18 = price-grid ka gap — cards ke saath same rhythm (user feedback 2026-07-13) */}
        <div data-rv style={{ position: "relative", marginTop: 18, background: "var(--surface)", border: "1.5px solid var(--w14)", borderRadius: 22, padding: "26px 30px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap", boxShadow: "0 10px 30px -24px var(--sh2)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18, minWidth: 0, flex: "1 1 380px" }}>
            <span aria-hidden="true" style={{ width: 54, height: 54, borderRadius: 15, flexShrink: 0, background: "rgba(44,118,237,.13)", border: "1px solid rgba(44,118,237,.3)", color: "var(--blue-ink)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}><i className="fa-solid fa-calculator" /></span>
            <div>
              <h3 style={{ fontFamily: DISP, fontWeight: 600, letterSpacing: "-.015em", fontSize: "clamp(17px,2.2vw,23px)", lineHeight: 1.2, margin: 0 }}><b style={BD}>Not Sure It&apos;s Worth It?</b> <span style={HL}>See What Missed Calls Cost You.</span></h3>
              <p style={{ fontSize: 14.5, color: "var(--mut)", lineHeight: 1.55, margin: "7px 0 0", maxWidth: 600 }}>Pick your industry, move three sliders, and compare your lost revenue with these plans — takes about 10 seconds.</p>
            </div>
          </div>
          <div style={{ position: "relative", flexShrink: 0 }}>
            <span className="price-note" style={{ position: "absolute", top: -30, right: 4, fontFamily: "var(--font-caveat), 'Segoe Script', cursive", fontSize: 18, fontWeight: 600, color: "var(--blue-ink)", whiteSpace: "nowrap" }}>Takes 10 seconds!</span>
            <a href="/calculator" className="btnp" style={{ display: "inline-flex", alignItems: "center", gap: 11, textDecoration: "none", background: "var(--lime)", color: "#fff", fontWeight: 700, fontSize: 15, padding: "14px 26px", borderRadius: 999, boxShadow: "0 16px 34px -14px rgba(44,118,237,.7)" }}>
              Calculate my lost revenue <i className="fa-solid fa-arrow-right" aria-hidden="true" style={{ fontSize: 13 }} />
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="sec-alt" style={{ position: "relative", zIndex: 1, maxWidth: 1536, margin: "0 auto", padding: "96px 28px 112px", scrollMarginTop: 90 }}>
        <div className="demo-header-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,520px)", gap: 24, alignItems: "center" }}>
          <div data-rv>
            {/* filled circle "?" badge chip mein bhara-bhara lag raha tha (user feedback 2026-07-13) —
                baaki chips (Pricing fa-tag, Why fa-heart) jaisa flat FA icon */}
            <div style={eyebrow}><i className="fa-regular fa-circle-question" aria-hidden="true" style={{ marginRight: 8, fontSize: 12 }} />FAQ</div>
            <h2 style={{ ...h2 }}><b style={BD}>Frequently Asked</b><br />
              <span style={{ position: "relative", whiteSpace: "nowrap", display: "inline-block" }}>
                <span style={HL}>Questions.</span>
                <svg viewBox="0 0 120 14" aria-hidden="true" style={{ position: "absolute", left: 0, bottom: -11, width: "100%", height: 12, overflow: "visible" }}>
                  <path d="M3 8 C 30 3, 90 3, 117 6" fill="none" stroke="var(--lime)" strokeWidth="3.5" strokeLinecap="round" opacity=".8" />
                  <path d="M14 12 C 38 9, 70 9, 92 11" fill="none" stroke="var(--lime)" strokeWidth="2.5" strokeLinecap="round" opacity=".6" />
                </svg>
              </span>
            </h2>
            <p style={{ fontSize: 18, color: "var(--mut)", margin: "22px 0 0", maxWidth: 520, lineHeight: 1.65 }}>Everything you need to know about hello22.<br />Can&apos;t find your answer? <a href="/contact" style={{ color: "var(--blue-ink)", textDecoration: "none", fontWeight: 700 }}>Get in touch →</a></p>
          </div>
          {/* illustration: photo + "Still have questions?" bubble (user mockup 2026-07-10) */}
          <div className="prod-illus" data-rv="right" aria-hidden="true" style={{ position: "relative", minHeight: 280 }}>
            <div style={{ position: "absolute", inset: "-10px 130px 12px 66px", background: "radial-gradient(75% 70% at 50% 45%, rgba(44,118,237,.15), rgba(44,118,237,.06) 62%, transparent 80%)", borderRadius: "55% 45% 52% 48% / 58% 46% 54% 42%" }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/demo-caller.jpg" alt="" loading="lazy" style={{ position: "absolute", top: -2, left: "24%", width: 198, height: 198, borderRadius: "50%", objectFit: "cover", border: "5px solid var(--surface)", boxShadow: "0 20px 44px -20px var(--sh1)", animation: "h22floatSm 8s ease-in-out infinite" }} />
            <div style={{ position: "absolute", right: -4, top: 70, background: "var(--surface)", border: "1px solid var(--w09)", borderRadius: "20px 20px 20px 6px", padding: "15px 19px", boxShadow: "0 16px 36px -20px var(--sh1)", display: "flex", alignItems: "flex-start", gap: 10, animation: "h22floatSm 7.5s ease-in-out -3s infinite" }}>
              <span aria-hidden="true" style={{ fontSize: 17 }}>👏</span>
              <span>
                <span style={{ display: "block", fontSize: 14.5, fontWeight: 700, color: "var(--tx)" }}>Still have questions?</span>
                <a href="/contact" style={{ display: "inline-block", fontSize: 13, fontWeight: 700, color: "var(--blue-ink)", textDecoration: "none", marginTop: 3 }}>We&apos;re here to help!</a>
              </span>
              <svg viewBox="0 0 24 22" aria-hidden="true" style={{ width: 18, height: 17, marginTop: 14 }}><path d="M12 19 C 4 13, 1 8, 4 4.5 C 6.5 1.8, 10 2.6, 12 6 C 14 2.6, 17.5 1.8, 20 4.5 C 23 8, 20 13, 12 19 Z" fill="none" stroke="rgba(44,118,237,.55)" strokeWidth="2" strokeLinejoin="round" /></svg>
            </div>
            {/* "?" marks + star + sparkles */}
            <svg viewBox="0 0 30 40" style={{ position: "absolute", left: 28, top: 8, width: 26, height: 36 }}><path d="M8 12 C 8 5, 20 5, 20 12 C 20 17, 14 16, 14 22 M 14 30 l 0 .5" fill="none" stroke="rgba(44,118,237,.55)" strokeWidth="2.5" strokeLinecap="round" /></svg>
            <svg viewBox="0 0 30 40" style={{ position: "absolute", left: 4, top: 66, width: 20, height: 28 }}><path d="M8 12 C 8 5, 20 5, 20 12 C 20 17, 14 16, 14 22 M 14 30 l 0 .5" fill="none" stroke="rgba(44,118,237,.4)" strokeWidth="2.5" strokeLinecap="round" /></svg>
            <svg viewBox="0 0 20 20" style={{ position: "absolute", left: 44, bottom: 42, width: 16, height: 16 }}><path d="M10 2 L 12 8 L 18 10 L 12 12 L 10 18 L 8 12 L 2 10 L 8 8 Z" fill="none" stroke="rgba(44,118,237,.5)" strokeWidth="1.6" strokeLinejoin="round" /></svg>
            <svg viewBox="0 0 26 24" style={{ position: "absolute", right: 130, top: -12, width: 24, height: 22 }}><path d="M4 20 L 10 10 M 12 22 L 16 12" fill="none" stroke="rgba(44,118,237,.5)" strokeWidth="2" strokeLinecap="round" /></svg>
          </div>
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
                      {/* icon tile + plain chevron (user mockup 2026-07-10) */}
                      <button className="faq-q" onClick={() => setFaqOpen(open ? null : i)} aria-expanded={open} style={{ display: "flex", alignItems: "center", gap: 15, width: "100%", textAlign: "left", cursor: "pointer", background: "transparent", border: "none", color: "var(--tx)", fontFamily: "inherit", padding: "18px 24px" }}>
                        <span aria-hidden="true" style={{ flexShrink: 0, width: 42, height: 42, borderRadius: "50%", background: FAQ_ICS[i % FAQ_ICS.length].bg, color: FAQ_ICS[i % FAQ_ICS.length].c, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}><i className={FAQ_ICS[i % FAQ_ICS.length].ic} /></span>
                        <span style={{ flex: 1, fontSize: 16.5, fontWeight: 700 }}>{f.q}</span>
                        <i className="fa-solid fa-chevron-down" style={{ flexShrink: 0, fontSize: 13, color: "var(--mut2)", transition: "transform .25s ease", transform: open ? "rotate(180deg)" : "none" }} aria-hidden="true" />
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
        <div style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
          <button
            onClick={() => {
              if (showAllFaqs && faqOpen !== null && faqOpen >= FAQ_PREVIEW) setFaqOpen(null);
              setShowAllFaqs((s) => !s);
            }}
            className="btnp"
            style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "var(--surface)", color: "var(--blue-ink)", border: "1.5px solid rgba(44,118,237,.4)", cursor: "pointer", fontFamily: "inherit", fontWeight: 700, fontSize: 15, padding: "13px 26px", borderRadius: 999, boxShadow: "0 8px 20px -14px rgba(44,118,237,.5)" }}
          >
            {showAllFaqs
              ? <><BtnTxt t="Show fewer questions" /> <i className="fa-solid fa-chevron-up" style={{ fontSize: 11 }} /></>
              : <><BtnTxt t={"Show all " + FAQS.length + " questions"} /> <i className="fa-solid fa-chevron-down" style={{ fontSize: 11 }} /></>}
          </button>
        </div>
        {/* bottom band — "Can't find what you're looking for?" (user mockup 2026-07-10) */}
        <div data-rv style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap", background: "rgba(44,118,237,.06)", border: "1px solid rgba(44,118,237,.16)", borderRadius: 18, padding: "18px 24px", marginTop: 28 }}>
          <span style={{ display: "inline-flex", flexShrink: 0 }}>
            {["/images/portrait-melissa.jpg", "/images/portrait-james.jpg", "/images/portrait-priya.jpg"].map((p, i) => (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img key={p} src={p} alt="" width={38} height={38} loading="lazy" style={{ width: 38, height: 38, borderRadius: "50%", objectFit: "cover", border: "2.5px solid var(--surface)", marginLeft: i === 0 ? 0 : -12 }} />
            ))}
          </span>
          <span style={{ flex: 1, minWidth: 200 }}>
            <span style={{ display: "block", fontFamily: SUB, fontWeight: 700, fontSize: 16.5 }}>Can&apos;t Find What You&apos;re Looking For?</span>
            <span style={{ display: "block", fontSize: 14, color: "var(--mut)", marginTop: 2 }}>Our team is happy to help.</span>
          </span>
          <a href="/contact" className="btnp" style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none", background: "var(--surface)", color: "var(--blue-ink)", border: "1.5px solid rgba(44,118,237,.4)", fontWeight: 700, fontSize: 15, padding: "12px 24px", borderRadius: 999 }}>
            <span style={{ display: "inline-flex", width: 24, height: 24, borderRadius: "50%", background: "var(--lime)", color: "#fff", alignItems: "center", justifyContent: "center", fontSize: 10, flexShrink: 0 }}><i className="fa-solid fa-comment" aria-hidden="true" /></span>
            Get in touch
          </a>
        </div>
      </section>


      {/* FINAL CTA */}
      <section id="cta" style={{ position: "relative", zIndex: 1, maxWidth: 1536, margin: "0 auto", padding: "64px 28px 112px", scrollMarginTop: 90 }}>
        <div data-rv className="cta-pad" style={{ position: "relative", overflow: "hidden", background: "var(--card-grad)", border: "1px solid var(--w10)", borderRadius: 30, padding: "56px 48px" }}>
          {!isLight && <div style={{ position: "absolute", top: -120, left: "20%", width: 520, height: 340, background: "radial-gradient(circle,rgba(44,118,237,.18),transparent 70%)", filter: "blur(20px)", pointerEvents: "none", animation: "h22glowpulse 5.5s ease-in-out infinite" }} />}
          <div className="cta-grid" style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
            {/* LEFT — say hello (mockup layout 2026-07-10: chip + swoosh + illustration, button hataya) */}
            <div>
              <div style={eyebrow}><span aria-hidden="true" style={{ marginRight: 8, fontSize: 13 }}>👏</span>Get started</div>
              <h2 style={{ fontFamily: DISP, fontWeight: 600, letterSpacing: "-.04em", fontSize: "clamp(44px,6vw,80px)", lineHeight: .95, margin: "18px 0 0" }}>say hello<span style={{ color: "var(--lime)" }}>.</span></h2>
              <p style={{ fontFamily: SUB, fontSize: "clamp(20px,2.2vw,26px)", fontWeight: 600, color: "var(--tx2)", margin: "12px 0 0" }}>to your new{" "}
                <span style={{ position: "relative", whiteSpace: "nowrap", display: "inline-block" }}>
                  <span style={HL}>voice agent</span>
                  <svg viewBox="0 0 120 12" aria-hidden="true" style={{ position: "absolute", left: 0, bottom: -8, width: "100%", height: 10, overflow: "visible" }}><path d="M3 9 C 30 3, 90 3, 117 7" fill="none" stroke="var(--lime)" strokeWidth="3" strokeLinecap="round" opacity=".8" /></svg>
                </span>.
              </p>
              {/* Note: mockup mein "no card required" likha tha — current policy wording (card required) rakhi hai */}
              <p style={{ fontSize: 17, color: "var(--mut)", maxWidth: 440, margin: "22px 0 0", lineHeight: 1.65 }}>Deploy your <strong style={{ fontWeight: 800, color: "var(--tx2)" }}>first voice agent</strong> in minutes.<br />14-day free trial with 30 call minutes —<br />a card is required to activate.</p>
              {/* illustration: photo + greeting bubble + squiggles (user mockup 2026-07-10) */}
              <div className="prod-illus" aria-hidden="true" style={{ position: "relative", minHeight: 250, marginTop: 18, maxWidth: 520 }}>
                <div style={{ position: "absolute", left: 150, top: 8, width: 250, height: 240, background: "radial-gradient(circle at 55% 45%, rgba(44,118,237,.14), rgba(44,118,237,.05) 62%, transparent 80%)", borderRadius: "50%" }} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/cta-wave.jpg" alt="" loading="lazy" style={{ position: "absolute", left: 168, top: 4, width: 232, height: 232, borderRadius: "50%", objectFit: "cover", border: "5px solid var(--surface)", boxShadow: "0 20px 44px -20px var(--sh1)", animation: "h22floatSm 8s ease-in-out infinite" }} />
                <div style={{ position: "absolute", left: 0, top: 64, maxWidth: 190, background: "var(--surface)", border: "1px solid var(--w09)", borderRadius: "18px 18px 6px 18px", padding: "13px 16px", boxShadow: "0 16px 36px -20px var(--sh1)", animation: "h22floatSm 7.5s ease-in-out -3s infinite" }}>
                  <span aria-hidden="true" style={{ display: "inline-flex", alignItems: "flex-end", gap: 2, height: 11, marginBottom: 6 }}>{[5, 8, 11, 7, 4].map((h, i) => <span key={i} style={{ width: 2.5, height: h, borderRadius: 2, background: "var(--blue-ink)" }} />)}</span>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: "var(--tx)", lineHeight: 1.4 }}>Hi there! <span aria-hidden="true">👋</span><br />I&apos;m hello22.</div>
                  <div style={{ fontSize: 11.5, color: "var(--mut)", marginTop: 4, lineHeight: 1.45 }}>How can I help<br />your business today?</div>
                </div>
                <svg viewBox="0 0 26 24" style={{ position: "absolute", left: 6, top: 12, width: 24, height: 22 }}><path d="M4 20 L 10 10 M 12 22 L 16 12" fill="none" stroke="rgba(44,118,237,.5)" strokeWidth="2" strokeLinecap="round" /></svg>
                <svg viewBox="0 0 80 90" style={{ position: "absolute", right: 30, bottom: 4, width: 62, height: 70 }}>
                  <path d="M 20 84 C 8 62, 20 52, 32 58 C 42 63, 36 74, 26 70 C 16 65, 24 40, 52 14" fill="none" stroke="rgba(44,118,237,.55)" strokeWidth="2" strokeLinecap="round" />
                  <path d="M 54 10 l -9 2 l 6 7 z" fill="rgba(44,118,237,.6)" />
                </svg>
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
            <div className="form-card" style={{ background: "var(--surface)", border: "1px solid var(--w10)", borderRadius: 24, padding: 26 }}>
              {/* form header: calendar icon tile + subline (user mockup 2026-07-10) */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                <span aria-hidden="true" style={{ width: 48, height: 48, borderRadius: 14, flexShrink: 0, background: "rgba(44,118,237,.12)", color: "var(--blue-ink)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 19 }}><i className="fa-regular fa-calendar-check" /></span>
                <span>
                  <h3 style={{ fontFamily: SUB, fontWeight: 700, fontSize: 24, margin: 0 }}>Book a <span style={HL}>Free Demo</span></h3>
                  <p style={{ fontSize: 14, color: "var(--mut)", margin: "5px 0 0" }}>See hello22 in action and get your questions answered.</p>
                </span>
              </div>
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
              { t: "Product", l: [{ n: "Features", h: "#features" }, { n: "Voices", h: "#voices" }, { n: "Pricing", h: "#pricing" }, { n: "Live demo", h: "#demo" }, { n: "FAQ", h: "#faq" }] },
              // About/Contact pages naye design mein ban gaye (2026-07-10); Blog 2026-07-13 ko bana.
              { t: "Company", l: [{ n: "About us", h: "/about" }, { n: "Contact", h: "/contact" }, { n: "Blog", h: "/blog" }, { n: "Reviews", h: "#testimonials" }, { n: "Support", h: `mailto:${SUPPORT_EMAIL}` }] },
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
                { ic: "fa-youtube", href: "https://www.youtube.com/@hello22ai" },
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
              <a className="nl" href="/terms">Terms of Service</a>
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
