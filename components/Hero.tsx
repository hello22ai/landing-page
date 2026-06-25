"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Star, ArrowRight, Sparkles, Play, Pause } from "lucide-react";
import { EqualizerBars } from "./ui/Waveform";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.08 * i, ease: [0.21, 0.47, 0.32, 0.98] },
  }),
};

// Hero voice previews — each plays a real sample clip
const VOICES = [
  { name: "Emma", flag: "🇦🇺", clip: "/audio/line-0.mp3" },
  { name: "Jack", flag: "🇦🇺", clip: "/audio/line-2.mp3" },
  { name: "Alice", flag: "🇬🇧", clip: "/audio/line-4.mp3" },
  { name: "Charlie", flag: "🇬🇧", clip: "/audio/line-1.mp3" },
];

function VoicePreview() {
  const [active, setActive] = useState(-1);
  const audiosRef = useRef<HTMLAudioElement[]>([]);
  const activeRef = useRef(-1);

  useEffect(() => {
    audiosRef.current = VOICES.map((v) => {
      const a = new Audio(v.clip);
      a.preload = "auto";
      return a;
    });
    audiosRef.current.forEach((a, i) =>
      a.addEventListener("ended", () => {
        if (activeRef.current === i) {
          activeRef.current = -1;
          setActive(-1);
        }
      })
    );
    return () => audiosRef.current.forEach((a) => a.pause());
  }, []);

  const play = (i: number) => {
    audiosRef.current.forEach((a) => {
      a.pause();
      a.currentTime = 0;
    });
    if (activeRef.current === i) {
      activeRef.current = -1;
      setActive(-1);
      return;
    }
    activeRef.current = i;
    setActive(i);
    void audiosRef.current[i]?.play().catch(() => {
      activeRef.current = -1;
      setActive(-1);
    });
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
        Choose your voice — tap to hear a live sample
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2.5">
        {VOICES.map((v, i) => {
          const on = active === i;
          return (
            <button
              key={v.name}
              type="button"
              onClick={() => play(i)}
              aria-label={`Hear ${v.name} voice sample`}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                on
                  ? "bg-primary text-white ring-1 ring-primary"
                  : "bg-white/5 text-slate-300 ring-1 ring-white/10 hover:text-white hover:ring-primary/40"
              }`}
            >
              <span aria-hidden="true">{v.flag}</span>
              {v.name}
              {on ? (
                <EqualizerBars bars={4} height={12} barClassName="bg-white" />
              ) : (
                <Play className="h-3 w-3" aria-hidden="true" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function Hero() {
  const [url, setUrl] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const target = document.querySelector("#consultation");
    target?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-base pb-24 pt-36 lg:pb-28 lg:pt-44">
      {/* ambient background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid-light [mask-image:radial-gradient(ellipse_60%_55%_at_50%_0%,black,transparent)]" />
        <div className="absolute -top-44 left-1/2 h-[34rem] w-[44rem] -translate-x-1/2 rounded-full bg-primary/20 blur-[150px]" />
        <div className="absolute inset-0 bg-noise opacity-[0.025]" />
      </div>

      <div className="container-site relative flex flex-col items-center text-center">
        {/* trust pill */}
        <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp}>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-slate-300 backdrop-blur">
            <span className="flex items-center gap-0.5 text-amber-400">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-amber-400" aria-hidden="true" />
              ))}
            </span>
            <span className="font-mono text-xs">4.9 from 67 reviews</span>
          </span>
        </motion.div>

        {/* headline */}
        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="heading-xl mt-8 max-w-4xl text-white"
        >
          Turn missed calls into <em>instant revenue.</em>
        </motion.h1>

        {/* subhead */}
        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400"
        >
          Capture every lead with a human-like AI receptionist that answers 24/7,
          books your jobs, and texts you the details. Paste your website URL to
          test your custom agent in 30 seconds.
        </motion.p>

        {/* URL form */}
        <motion.form
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          onSubmit={onSubmit}
          className="mt-9 w-full max-w-xl"
        >
          <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur sm:flex-row sm:items-center sm:rounded-full sm:pl-5">
            <input
              type="text"
              inputMode="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter your website URL"
              aria-label="Your website URL"
              className="w-full flex-1 bg-transparent px-4 py-3 text-base text-white placeholder:text-slate-500 focus:outline-none sm:px-0"
            />
            <button type="submit" className="btn-primary shrink-0 !py-3">
              Generate your AI receptionist
              <span className="rounded-full bg-white/20 px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider">
                FREE
              </span>
            </button>
          </div>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            No-obligation free trial · Keep your number
          </p>
        </motion.form>

        {/* voice preview */}
        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-12"
        >
          <VoicePreview />
        </motion.div>

        {/* subtle hint icon */}
        <motion.div
          custom={5}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-10 inline-flex items-center gap-2 text-xs text-muted"
        >
          <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
          Built from your website in seconds — no setup, no code
        </motion.div>
      </div>
    </section>
  );
}
