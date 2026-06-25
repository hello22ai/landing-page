"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, Sparkles } from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import { Stagger, StaggerItem } from "./ui/Reveal";
import { EqualizerBars } from "./ui/Waveform";

type Voice = {
  name: string;
  initial: string;
  flag: string;
  accent: string;
  style: string;
  plan: "free" | "plan";
};

const VOICES: Voice[] = [
  { name: "Emma", initial: "E", flag: "🇦🇺", accent: "AU", style: "Warm & Friendly", plan: "free" },
  { name: "Jack", initial: "J", flag: "🇦🇺", accent: "AU", style: "Friendly & Professional", plan: "free" },
  { name: "Bruce", initial: "B", flag: "🇦🇺", accent: "AU", style: "Classic Aussie", plan: "plan" },
  { name: "Jordan", initial: "J", flag: "🇦🇺", accent: "AU", style: "Smooth & Modern", plan: "plan" },
  { name: "Aimee", initial: "A", flag: "🇦🇺", accent: "AU", style: "Bright & Bubbly", plan: "plan" },
  { name: "Alice", initial: "A", flag: "🇬🇧", accent: "UK", style: "Warm & Conversational", plan: "plan" },
  { name: "Charlie", initial: "C", flag: "🇬🇧", accent: "UK", style: "Rich Accent", plan: "plan" },
  { name: "Joseph", initial: "J", flag: "🇺🇸", accent: "US", style: "Authoritative & Clear", plan: "plan" },
  { name: "Tyler", initial: "T", flag: "🇺🇸", accent: "US", style: "Casual & Confident", plan: "plan" },
  { name: "Lilian", initial: "L", flag: "🇺🇸", accent: "US", style: "Warm & Professional", plan: "plan" },
  { name: "Ayana", initial: "A", flag: "🇺🇸", accent: "US", style: "Friendly & Articulate", plan: "plan" },
];

/* Cycle the existing demo clips across all cards as samples */
const clipFor = (i: number) => `/audio/line-${i % 5}.mp3`;

export function VoiceLibrary() {
  const [playingIndex, setPlayingIndex] = useState(-1);
  const audiosRef = useRef<HTMLAudioElement[]>([]);
  const playingRef = useRef(-1);

  useEffect(() => {
    audiosRef.current = VOICES.map((_, i) => {
      const a = new Audio(clipFor(i));
      a.preload = "auto";
      a.addEventListener("ended", () => {
        if (playingRef.current === i) {
          playingRef.current = -1;
          setPlayingIndex(-1);
        }
      });
      return a;
    });
    return () => {
      audiosRef.current.forEach((a) => {
        a.pause();
        a.src = "";
      });
    };
  }, []);

  const toggle = (i: number) => {
    const audios = audiosRef.current;
    if (playingRef.current === i) {
      audios[i]?.pause();
      playingRef.current = -1;
      setPlayingIndex(-1);
      return;
    }
    // Pause whatever is currently playing
    if (playingRef.current >= 0) {
      const prev = audios[playingRef.current];
      if (prev) {
        prev.pause();
        prev.currentTime = 0;
      }
    }
    const next = audios[i];
    if (!next) return;
    next.currentTime = 0;
    playingRef.current = i;
    setPlayingIndex(i);
    void next.play().catch(() => {
      if (playingRef.current === i) {
        playingRef.current = -1;
        setPlayingIndex(-1);
      }
    });
  };

  return (
    <section id="voices" className="section-padding bg-base">
      <div className="container-site">
        <SectionHeading
          eyebrow="Voices"
          title={
            <>
              Pick a voice. <em>Click to hear it speak.</em>
            </>
          }
          description="Studio-grade voices across Australian, British, and American accents. Every voice handles interruptions and natural conversation. Free plan includes 2 voices; more unlock on paid plans."
        />

        <Stagger className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {VOICES.map((voice, i) => {
            const isPlaying = playingIndex === i;
            return (
              <StaggerItem key={voice.name}>
                <div className="card-soft relative p-5">
                  <span
                    className={
                      voice.plan === "free"
                        ? "absolute right-4 top-4 rounded-full bg-primary/15 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-primary"
                        : "absolute right-4 top-4 rounded-full bg-white/5 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400 ring-1 ring-white/10"
                    }
                  >
                    {voice.plan === "free" ? "Free" : "Plan"}
                  </span>

                  <div className="flex items-center gap-3">
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-primary/15 font-mono font-semibold text-primary">
                      {voice.initial}
                    </span>
                    <span className="flex items-center gap-1.5 font-mono text-xs text-muted">
                      <span aria-hidden="true">{voice.flag}</span>
                      {voice.accent}
                    </span>
                  </div>

                  <div className="mt-4">
                    <p className="font-semibold text-white">{voice.name}</p>
                    <p className="text-sm text-slate-400">{voice.style}</p>
                  </div>

                  <div className="mt-4">
                    <EqualizerBars
                      bars={20}
                      height={20}
                      active={isPlaying}
                      className="w-full justify-between opacity-70"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    aria-label={isPlaying ? `Pause ${voice.name} sample` : `Play ${voice.name} sample`}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-white/5 py-2.5 text-sm font-medium text-slate-200 ring-1 ring-white/10 transition-colors hover:text-primary hover:ring-primary/40"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="h-4 w-4" aria-hidden="true" />
                        Playing…
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4" aria-hidden="true" />
                        Play sample
                      </>
                    )}
                  </button>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>

        <div className="mt-10 flex items-center justify-center gap-2.5 font-mono text-xs uppercase tracking-[0.25em] text-muted">
          <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
          Clone your own voice from a 30-second sample
        </div>
      </div>
    </section>
  );
}
