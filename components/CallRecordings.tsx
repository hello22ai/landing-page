"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Pause,
  RotateCcw,
  PhoneIncoming,
  Check,
} from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { EqualizerBars } from "./ui/Waveform";

type TranscriptLine = {
  who: "caller" | "ai";
  text: string;
};

const CALL: TranscriptLine[] = [
  {
    who: "caller",
    text: "Hi, do you do emergency call-outs tonight?",
  },
  {
    who: "ai",
    text: "We do — I can get a plumber out to you this evening. Can I grab your name and the address?",
  },
  {
    who: "caller",
    text: "Sarah Chen, 14 Bridge Road.",
  },
  {
    who: "ai",
    text: "Got it, Sarah. What's the issue so I can brief the tech?",
  },
  {
    who: "caller",
    text: "Burst pipe under the kitchen sink.",
  },
  {
    who: "ai",
    text: "Booked you in for tonight and flagged it as urgent. You'll get a confirmation text shortly. Anything else?",
  },
];

const LINE_MS = 2200;

const LEAD_ROWS = [
  { label: "Name", value: "Sarah Chen" },
  { label: "Address", value: "14 Bridge Road" },
  { label: "Issue", value: "Burst pipe · kitchen sink" },
];

const ACTION_ITEMS = [
  "Owner SMS sent",
  "Summary email sent",
  "Lead pushed to CRM",
];

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function CallRecordings() {
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(-1); // -1 = not started
  const [finished, setFinished] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  const lineTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const tickTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimers = () => {
    if (lineTimer.current) {
      clearInterval(lineTimer.current);
      lineTimer.current = null;
    }
    if (tickTimer.current) {
      clearInterval(tickTimer.current);
      tickTimer.current = null;
    }
  };

  // Cleanup on unmount
  useEffect(() => clearTimers, []);

  // Drives line-by-line reveal + the running duration while playing
  useEffect(() => {
    if (!playing) return;

    lineTimer.current = setInterval(() => {
      setCurrent((c) => {
        const next = c + 1;
        if (next >= CALL.length - 1) {
          // last line reached — stop advancing, finish the call
          if (lineTimer.current) {
            clearInterval(lineTimer.current);
            lineTimer.current = null;
          }
          if (tickTimer.current) {
            clearInterval(tickTimer.current);
            tickTimer.current = null;
          }
          setPlaying(false);
          setFinished(true);
          return CALL.length - 1;
        }
        return next;
      });
    }, LINE_MS);

    tickTimer.current = setInterval(() => {
      setElapsed((e) => e + 1);
    }, 1000);

    return clearTimers;
  }, [playing]);

  const start = () => {
    clearTimers();
    setFinished(false);
    setCurrent(0);
    setElapsed(0);
    setPlaying(true);
  };

  const toggle = () => {
    if (playing) {
      clearTimers();
      setPlaying(false);
      return;
    }
    // Resume from a paused state, otherwise start fresh
    if (current >= 0 && current < CALL.length - 1 && !finished) {
      setPlaying(true);
    } else {
      start();
    }
  };

  const activeWho =
    playing && current >= 0 ? CALL[current]?.who : null;
  const callerActive = activeWho === "caller";
  const aiActive = activeWho === "ai";
  const started = current >= 0;

  return (
    <section id="demo" className="section-padding relative overflow-hidden bg-navy">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 h-[28rem] w-[40rem] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]"
      />
      <div className="container-site relative">
        <SectionHeading
          eyebrow="Live Demo"
          title={<>Press play. <em>Hear a real call.</em></>}
          description="A real conversation handled by your AI receptionist — answered, qualified, and logged in real time. No pre-recorded lines, no phone-tree menus."
        />

        <Reveal className="mx-auto mt-14 max-w-5xl">
          <div className="card-soft overflow-hidden">
            {/* Top bar */}
            <div className="flex items-center gap-4 border-b border-white/10 px-6 py-4 sm:px-8">
              <span className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-emerald-400 ring-1 ring-emerald-500/20">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Live call
              </span>
              <p className="hidden min-w-0 flex-1 truncate text-center font-mono text-xs text-slate-400 sm:block">
                <PhoneIncoming className="mr-2 inline h-3.5 w-3.5 text-primary" aria-hidden="true" />
                Emergency call-out · After hours
              </p>
              <span className="ml-auto font-mono text-xs tabular-nums text-muted">
                {formatTime(elapsed)}
              </span>
            </div>

            {/* 3-column dashboard */}
            <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[12rem_1fr_15rem]">
              {/* LEFT — speakers + controls */}
              <div className="flex flex-col gap-3">
                <div
                  className={`rounded-2xl bg-navy-800 p-3 ring-1 transition-colors ${
                    callerActive ? "ring-primary" : "ring-white/10"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-sm font-bold text-amber-300">
                      S
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-white">Sarah Chen</p>
                      <p className="font-mono text-[11px] text-muted">Inbound · live</p>
                    </div>
                  </div>
                </div>

                <div
                  className={`rounded-2xl bg-navy-800 p-3 ring-1 transition-colors ${
                    aiActive ? "ring-primary" : "ring-white/10"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                      h
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-white">hello22</p>
                      <p className="font-mono text-[11px] text-muted">AI receptionist</p>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={toggle}
                  aria-label={playing ? "Pause call" : finished ? "Replay call" : "Play call"}
                  className="btn-primary mt-1 w-full px-4 py-3 text-sm"
                >
                  {playing ? (
                    <Pause className="h-4 w-4" aria-hidden="true" />
                  ) : finished ? (
                    <RotateCcw className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Play className="h-4 w-4" aria-hidden="true" />
                  )}
                  {playing ? "Pause" : finished ? "Replay" : "Play call"}
                </button>

                <div className="flex items-center justify-between gap-3 px-1">
                  <EqualizerBars bars={14} height={22} active={playing} barClassName="bg-primary" />
                  {(finished || started) && (
                    <button
                      type="button"
                      onClick={start}
                      aria-label="Replay call"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 text-slate-400 ring-1 ring-white/10 transition-colors hover:text-white hover:ring-primary/40"
                    >
                      <RotateCcw className="h-4 w-4" aria-hidden="true" />
                    </button>
                  )}
                </div>
              </div>

              {/* MIDDLE — live transcript */}
              <div className="min-w-0">
                <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-muted">
                  Live transcript
                </p>
                <ol className="space-y-2">
                  {CALL.map((line, i) => {
                    const isActive = i === current && playing;
                    const isPast = (i < current) || (i === current && !playing) || finished;
                    return (
                      <motion.li
                        key={i}
                        animate={{ opacity: isActive || isPast ? 1 : 0.4 }}
                        transition={{ duration: 0.3 }}
                        className={`flex gap-3 rounded-xl px-3 py-2.5 text-sm leading-relaxed transition-colors ${
                          isActive ? "bg-primary/10 ring-1 ring-primary/30" : ""
                        }`}
                      >
                        <span
                          className={`mt-0.5 shrink-0 font-mono text-[11px] font-semibold uppercase tracking-wider ${
                            line.who === "ai" ? "text-primary" : "text-slate-500"
                          }`}
                        >
                          {line.who === "ai" ? "AI" : "Caller"}
                        </span>
                        <span className={line.who === "ai" ? "text-white" : "text-slate-300"}>
                          {line.text}
                        </span>
                        {isActive && (
                          <EqualizerBars
                            bars={4}
                            height={12}
                            className="ml-auto mt-1 shrink-0"
                            barClassName={line.who === "ai" ? "bg-primary" : "bg-slate-400"}
                          />
                        )}
                      </motion.li>
                    );
                  })}
                </ol>
              </div>

              {/* RIGHT — captured */}
              <div className="flex flex-col gap-4">
                <div className="rounded-2xl bg-navy-800 p-4 ring-1 ring-white/10">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
                    Captured
                  </p>

                  {/* Intent */}
                  <div className="mt-4">
                    <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
                      Intent
                    </p>
                    <span className="mt-2 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary ring-1 ring-primary/30">
                      New booking
                    </span>
                  </div>

                  {/* Lead captured */}
                  <div className="mt-4">
                    <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
                      Lead captured
                    </p>
                    <ul className="mt-2 space-y-1.5">
                      {LEAD_ROWS.map((row) => (
                        <li key={row.label} className="flex items-baseline justify-between gap-3 text-xs">
                          <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-slate-500">
                            {row.label}
                          </span>
                          <span className="min-w-0 truncate text-right text-slate-300">
                            {row.value}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="mt-4">
                    <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
                      Actions
                    </p>
                    <ul className="mt-2 space-y-2.5">
                      {ACTION_ITEMS.map((item, i) => (
                        <li key={item} className="flex items-center gap-2.5 text-sm">
                          <motion.span
                            initial={false}
                            animate={{
                              scale: finished ? 1 : 0.85,
                              opacity: finished ? 1 : 0.5,
                            }}
                            transition={{ duration: 0.3, delay: finished ? i * 0.15 : 0 }}
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-colors ${
                              finished
                                ? "bg-emerald-500/20 text-emerald-400"
                                : "bg-white/5 text-slate-600"
                            }`}
                          >
                            <Check className="h-3 w-3" aria-hidden="true" />
                          </motion.span>
                          <span className={finished ? "text-slate-300" : "text-slate-500"}>
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="rounded-2xl bg-navy-800 p-4 text-center ring-1 ring-white/10">
                  <p className="font-mono text-3xl font-bold tabular-nums text-white">
                    {formatTime(elapsed)}
                  </p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-muted">
                    Call duration
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-8 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted">
            Your business · your greeting · your booking rules
          </p>
        </Reveal>
      </div>
    </section>
  );
}
