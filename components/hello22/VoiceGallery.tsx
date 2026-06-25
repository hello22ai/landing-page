"use client";

import { useEffect, useRef, useState } from "react";

type Voice = {
  name: string;
  lang: string;
  flag: string;
  tag: string;
  sample: string;
  accent: string;
  regex: RegExp;
};

const FEMALE = /samantha|zira|fiona|karen|moira|tessa|catherine|serena|female/i;
const MALE = /daniel|alex|david|fred|rishi|lee|russell|male/i;

const VOICES: Voice[] = [
  { name: "Emma", lang: "en-AU", flag: "🇦🇺", tag: "Warm & Friendly", sample: "Hi, I'm Emma. I can answer your calls, book appointments, and help your customers any time of day.", accent: "from-[var(--accent)] to-[#1b56b8]", regex: FEMALE },
  { name: "Jack", lang: "en-AU", flag: "🇦🇺", tag: "Friendly & Professional", sample: "G'day, this is Jack. I'm handling inbound calls for the team — how can I help you today?", accent: "from-[var(--amber)] to-[#c47e00]", regex: MALE },
  { name: "Bruce", lang: "en-AU", flag: "🇦🇺", tag: "Classic Aussie", sample: "Hello, Bruce here. I'm your AI voice agent, ready to assist with bookings, support, and inquiries.", accent: "from-[var(--lime)] to-[#7ab800]", regex: MALE },
  { name: "Jordan", lang: "en-AU", flag: "🇦🇺", tag: "Smooth & Modern", sample: "Hi there, I'm Jordan. I can qualify leads, answer questions, and book you in — all in real time.", accent: "from-[var(--accent-soft)] to-[var(--accent)]", regex: MALE },
  { name: "Aimee", lang: "en-AU", flag: "🇦🇺", tag: "Bright & Bubbly", sample: "Hey! I'm Aimee. I'd love to help you book an appointment or answer any questions you have.", accent: "from-[var(--accent)] to-[#1b56b8]", regex: FEMALE },
  { name: "Alice", lang: "en-GB", flag: "🇬🇧", tag: "Warm & Conversational", sample: "Hello, I'm Alice. I can assist your customers with bookings, support, and everything in between.", accent: "from-[var(--amber)] to-[#c47e00]", regex: FEMALE },
  { name: "Charlie", lang: "en-GB", flag: "🇬🇧", tag: "Rich Accent", sample: "Good day. Charlie here. I'm your AI voice agent, ready to assist with bookings and inquiries.", accent: "from-[var(--lime)] to-[#7ab800]", regex: MALE },
  { name: "Joseph", lang: "en-US", flag: "🇺🇸", tag: "Authoritative & Clear", sample: "Hello, this is Joseph. I can handle your calls, qualify leads, and resolve support in real time.", accent: "from-[var(--accent-soft)] to-[var(--accent)]", regex: MALE },
  { name: "Tyler", lang: "en-US", flag: "🇺🇸", tag: "Casual & Confident", sample: "Hey, Tyler here. I'm ready to answer calls, book appointments, and help your customers out.", accent: "from-[var(--accent)] to-[#1b56b8]", regex: MALE },
  { name: "Lilian", lang: "en-US", flag: "🇺🇸", tag: "Warm & Professional", sample: "Hi, I'm Lilian. I can answer your calls, book appointments, and assist your customers 24/7.", accent: "from-[var(--amber)] to-[#c47e00]", regex: FEMALE },
  { name: "Ayana", lang: "en-US", flag: "🇺🇸", tag: "Friendly & Articulate", sample: "Hello, I'm Ayana. How may I assist you with your booking or question today?", accent: "from-[var(--lime)] to-[#7ab800]", regex: FEMALE },
];

function VoiceCard({
  voice,
  playing,
  onToggle,
}: {
  voice: Voice;
  playing: boolean;
  onToggle: () => void;
}) {
  const waveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = waveRef.current;
    if (!el) return;
    const bars = Array.from(el.children) as HTMLElement[];
    if (!playing) {
      bars.forEach((b) => {
        b.style.height = 15 + Math.random() * 60 + "%";
        b.style.background = "var(--text-dim)";
      });
      return;
    }
    const id = setInterval(() => {
      bars.forEach((b) => {
        b.style.height = 15 + Math.random() * 75 + "%";
        b.style.background = "var(--accent)";
      });
    }, 150);
    return () => clearInterval(id);
  }, [playing]);

  return (
    <div className={`voice-card glass rounded-2xl p-6 ${playing ? "playing" : ""}`} onClick={onToggle}>
      <div className="flex items-start justify-between mb-5">
        <div
          className={`w-14 h-14 rounded-full bg-gradient-to-br ${voice.accent} flex items-center justify-center font-display text-xl font-medium text-white relative`}
        >
          <div
            className="absolute inset-0 rounded-full bg-[var(--accent)] pulse-ring"
            style={{ opacity: playing ? 0.4 : 0 }}
          ></div>
          {voice.name[0]}
        </div>
        <div className="text-right">
          <div className="text-2xl">{voice.flag}</div>
          <div className="text-[10px] uppercase tracking-wider text-[var(--text-dim)] mt-1">{voice.lang}</div>
        </div>
      </div>
      <h3 className="font-display text-xl font-medium mb-1">{voice.name}</h3>
      <div className="text-xs text-[var(--text-muted)] mb-5">{voice.tag}</div>

      <div ref={waveRef} className="h-10 flex items-center gap-[2px] mb-5">
        {Array.from({ length: 32 }).map((_, j) => (
          <div
            key={j}
            style={{
              width: "2px",
              flexShrink: 0,
              background: "var(--text-dim)",
              borderRadius: "999px",
              height: "40%",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>

      <button
        className="voice-play-btn w-full py-2.5 rounded-full text-xs font-medium border flex items-center justify-center gap-2 transition"
        style={
          playing
            ? { background: "var(--accent)", color: "#0c0b09", borderColor: "var(--accent)" }
            : { borderColor: "var(--border)" }
        }
      >
        <i className={`fa-solid ${playing ? "fa-stop" : "fa-play"} text-[10px]`}></i>
        <span>{playing ? "Stop" : "Play sample"}</span>
      </button>
    </div>
  );
}

export function VoiceGallery() {
  const [playingIdx, setPlayingIdx] = useState<number | null>(null);
  const availableRef = useRef<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (!("speechSynthesis" in window)) return;
    const load = () => {
      availableRef.current = speechSynthesis.getVoices();
    };
    load();
    speechSynthesis.onvoiceschanged = load;
    return () => {
      speechSynthesis.onvoiceschanged = null;
      speechSynthesis.cancel();
    };
  }, []);

  function findVoice(regex: RegExp, lang: string) {
    const av = availableRef.current;
    return (
      av.find((v) => regex.test(v.name)) ||
      av.find((v) => v.lang === lang) ||
      av.find((v) => v.lang.startsWith(lang.split("-")[0])) ||
      av.find((v) => v.lang.startsWith("en"))
    );
  }

  function toggle(i: number) {
    if ("speechSynthesis" in window) speechSynthesis.cancel();
    if (playingIdx === i) {
      setPlayingIdx(null);
      return;
    }
    setPlayingIdx(i);
    if ("speechSynthesis" in window) {
      const v = VOICES[i];
      const utter = new SpeechSynthesisUtterance(v.sample);
      const voice = findVoice(v.regex, v.lang);
      if (voice) {
        utter.voice = voice;
        utter.lang = voice.lang;
      }
      utter.rate = 1.0;
      utter.onend = () => setPlayingIdx((cur) => (cur === i ? null : cur));
      utter.onerror = () => setPlayingIdx((cur) => (cur === i ? null : cur));
      speechSynthesis.speak(utter);
    } else {
      setTimeout(() => setPlayingIdx((cur) => (cur === i ? null : cur)), 5000);
    }
  }

  return (
    <section id="voices" className="relative py-28 lg:py-36 z-10 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-7 reveal">
            <span className="eyebrow mb-5">Voice library</span>
            <h2 className="font-display text-5xl lg:text-7xl font-light tracking-tight leading-[1] mt-4">
              Pick a voice.
              <br />
              <span className="font-italic accent-text">Click to hear it speak.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 flex items-end reveal">
            <p className="text-[var(--text-muted)] text-lg leading-relaxed">
              22+ studio-grade voices out of the box. Clone your own from a 30-second sample. Every voice handles
              interruptions, emotion, and multiple languages natively.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 reveal">
          {VOICES.map((v, i) => (
            <VoiceCard key={v.name} voice={v} playing={playingIdx === i} onToggle={() => toggle(i)} />
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 reveal">
          <p className="text-sm text-[var(--text-muted)]">
            <i className="fa-solid fa-info-circle text-[var(--accent)] mr-1.5"></i>
            Voices use your browser&apos;s speech engine for preview. Production voices sound significantly better.
          </p>
          <a href="#cta" className="text-sm text-white border-b border-[var(--accent)] pb-0.5 hover:text-[var(--accent)] transition">
            Clone your own voice →
          </a>
        </div>
      </div>
    </section>
  );
}
