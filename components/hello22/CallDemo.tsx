"use client";

import { useEffect, useRef, useState } from "react";
import { Waveform } from "./Waveform";

type Line = { who: "caller" | "agent"; text: string };

const LINES: Line[] = [
  { who: "caller", text: "Hi, I'd like to book a table for four this Friday evening." },
  { who: "agent", text: "Of course! What time works best? We have openings at 7 PM or 9 PM." },
  { who: "caller", text: "7 PM sounds perfect. Can we get a booth by the window?" },
  { who: "agent", text: "Absolutely — I've reserved booth 4 by the window. Can I get a name for the booking?" },
  { who: "caller", text: "Sarah Chen. C-H-E-N." },
  { who: "agent", text: "Booked! Table for four under Sarah Chen, Friday at 7 PM, booth 4. You'll get a confirmation text shortly. Anything else I can help with?" },
];

const SEQUENCE = [
  { type: "caller", idx: 0, delay: 1200 },
  { type: "agent", idx: 1, delay: 0 },
  { type: "caller", idx: 2, delay: 1800 },
  { type: "agent", idx: 3, delay: 0 },
  { type: "caller", idx: 4, delay: 1600 },
  { type: "agent", idx: 5, delay: 0 },
] as const;

export function CallDemo() {
  const [playing, setPlaying] = useState(false);
  const [activeLine, setActiveLine] = useState<number | null>(null);
  const [status, setStatus] = useState("Press play to start");
  const [seconds, setSeconds] = useState(0);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!("speechSynthesis" in window)) return;
    const loadVoice = () => {
      const voices = speechSynthesis.getVoices();
      voiceRef.current =
        voices.find((v) => /samantha|aria|jenny|zira|female|google uk english female/i.test(v.name)) ||
        voices.find((v) => v.lang.startsWith("en") && v.name.toLowerCase().includes("female")) ||
        voices.find((v) => v.lang.startsWith("en")) ||
        voices[0] ||
        null;
    };
    loadVoice();
    speechSynthesis.onvoiceschanged = loadVoice;
    return () => {
      speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if ("speechSynthesis" in window) speechSynthesis.cancel();
      if (timerRef.current) clearInterval(timerRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  function scrollToLine(idx: number) {
    const el = transcriptRef.current?.querySelector(`[data-line="${idx}"]`);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function stopPlay() {
    if ("speechSynthesis" in window) speechSynthesis.cancel();
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setPlaying(false);
  }

  function speak(text: string, onEnd: () => void) {
    if (!("speechSynthesis" in window)) {
      timeoutRef.current = setTimeout(onEnd, 2500);
      return;
    }
    const utter = new SpeechSynthesisUtterance(text);
    if (voiceRef.current) utter.voice = voiceRef.current;
    utter.rate = 1.02;
    utter.pitch = 1.05;
    utter.volume = 1;
    utter.onend = onEnd;
    utter.onerror = onEnd;
    speechSynthesis.speak(utter);
  }

  function runSequence(step: number) {
    if (step >= SEQUENCE.length) {
      stopPlay();
      setStatus("Call complete · 100%");
      return;
    }
    const s = SEQUENCE[step];
    setActiveLine(s.idx);
    scrollToLine(s.idx);
    setStatus(s.type === "agent" ? "Agent speaking…" : "Caller speaking…");
    if (s.type === "agent") {
      speak(LINES[s.idx].text, () => {
        timeoutRef.current = setTimeout(() => runSequence(step + 1), 400);
      });
    } else {
      timeoutRef.current = setTimeout(() => runSequence(step + 1), s.delay);
    }
  }

  function handleClick() {
    if (playing) {
      stopPlay();
      setActiveLine(null);
      setStatus("Press play to start");
      return;
    }
    setPlaying(true);
    setSeconds(0);
    timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    runSequence(0);
  }

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <section id="demo" className="relative py-28 lg:py-36 z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-7 reveal">
            <span className="eyebrow mb-5">Live demo</span>
            <h2 className="font-display text-5xl lg:text-7xl font-light tracking-tight leading-[1] mt-4">
              Press play. Hear hello22
              <br />
              <span className="font-italic accent-text">handle a real call.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 flex items-end reveal">
            <p className="text-[var(--text-muted)] text-lg leading-relaxed">
              This is a real conversation generated by hello22. The caller is unscripted. The agent responds in real
              time — no pre-recorded lines, no decision trees.
            </p>
          </div>
        </div>

        <div className="glass-strong rounded-3xl overflow-hidden reveal">
          {/* Console header */}
          <div className="flex items-center justify-between px-6 lg:px-8 py-5 border-b border-[var(--border)]">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="live-dot w-2 h-2 rounded-full bg-[var(--accent)]"></span>
                <span className="text-xs uppercase tracking-wider text-[var(--accent)] font-medium">Live call</span>
              </div>
              <span className="text-[var(--text-dim)]">·</span>
              <span className="text-sm text-[var(--text-muted)]">Acme Dental · New patient booking</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
              <span className="font-mono">{`${mm}:${ss}`}</span>
              <span className="hidden sm:inline">·</span>
              <span className="hidden sm:inline">EN-US</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-12">
            {/* Left: caller info + controls */}
            <div className="lg:col-span-3 p-6 lg:p-8 lg:border-r border-[var(--border)] flex flex-col">
              <div className="text-[10px] uppercase tracking-wider text-[var(--text-dim)] mb-3">Caller</div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--amber)] to-[#c47e00] flex items-center justify-center font-display text-lg font-medium text-white">
                  S
                </div>
                <div>
                  <div className="font-medium text-sm">Sarah Chen</div>
                  <div className="text-xs text-[var(--text-muted)]">Inbound · New</div>
                </div>
              </div>

              <div className="text-[10px] uppercase tracking-wider text-[var(--text-dim)] mb-3">Agent</div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--accent)] to-[#1b56b8] flex items-center justify-center relative">
                  <div className="absolute inset-0 rounded-full bg-[var(--accent)] pulse-ring opacity-40"></div>
                  <i className="fa-solid fa-microphone text-white text-sm relative"></i>
                </div>
                <div>
                  <div className="font-medium text-sm">Aria</div>
                  <div className="text-xs text-[var(--text-muted)]">hello22 · v3.2</div>
                </div>
              </div>

              <div className="mt-auto">
                <div className="text-[10px] uppercase tracking-wider text-[var(--text-dim)] mb-3">Audio</div>
                <Waveform
                  count={40}
                  className="h-16 flex items-center gap-[2px] mb-4"
                  barWidth="3px"
                  minH={15}
                  rangeH={70}
                  intervalMs={180}
                  active={playing}
                  idleHeight="15%"
                  accentEvery={(i) => i % 3 === 0}
                />
                <button
                  onClick={handleClick}
                  className={`${playing ? "btn-ghost" : "btn-primary"} w-full py-3 rounded-full text-sm flex items-center justify-center gap-2`}
                >
                  <i className={`fa-solid ${playing ? "fa-stop" : "fa-play"} text-xs`}></i>
                  <span>{playing ? "Stop" : status.startsWith("Call complete") ? "Replay call" : "Play sample call"}</span>
                </button>
              </div>
            </div>

            {/* Center: transcript */}
            <div className="lg:col-span-6 p-6 lg:p-8 lg:border-r border-[var(--border)]">
              <div className="flex items-center justify-between mb-5">
                <div className="text-[10px] uppercase tracking-wider text-[var(--text-dim)]">Transcript</div>
                <div className="text-[10px] text-[var(--text-muted)]">{status}</div>
              </div>
              <div ref={transcriptRef} className="space-y-3 max-h-[420px] overflow-y-auto pr-2">
                {LINES.map((line, i) => {
                  const isAgent = line.who === "agent";
                  return (
                    <div
                      key={i}
                      data-line={i}
                      className={`transcript-line flex gap-3 ${activeLine === i ? "active" : ""}`}
                    >
                      <div
                        className={`w-7 h-7 rounded-full ${isAgent ? "bg-[var(--accent)]/15" : "bg-[var(--amber)]/15"} flex items-center justify-center shrink-0 mt-0.5`}
                      >
                        <i
                          className={`fa-solid ${isAgent ? "fa-microphone text-[var(--accent)]" : "fa-user text-[var(--amber)]"} text-[10px]`}
                        ></i>
                      </div>
                      <div className="tl-bubble flex-1 bg-white/[0.02] border border-[var(--border)] rounded-2xl rounded-tl-sm px-4 py-3 text-sm leading-relaxed">
                        {line.text}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: live metrics */}
            <div className="lg:col-span-3 p-6 lg:p-8 space-y-5">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-[var(--text-dim)] mb-2">Intent detected</div>
                <div className="font-display text-xl font-medium">Book reservation</div>
                <div className="text-xs text-[var(--lime)] mt-1 flex items-center gap-1.5">
                  <i className="fa-solid fa-check-circle text-[10px]"></i> 98.4% confidence
                </div>
              </div>

              <div className="divider"></div>

              <div>
                <div className="text-[10px] uppercase tracking-wider text-[var(--text-dim)] mb-2">Sentiment</div>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-2xl font-light text-[var(--lime)]">+0.81</span>
                  <span className="text-xs text-[var(--text-muted)]">positive</span>
                </div>
                <div className="mt-2 h-1 bg-[var(--surface-2)] rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--lime)] rounded-full" style={{ width: "81%" }}></div>
                </div>
              </div>

              <div className="divider"></div>

              <div>
                <div className="text-[10px] uppercase tracking-wider text-[var(--text-dim)] mb-2">Live actions</div>
                <div className="space-y-2 text-xs">
                  {[
                    { icon: "fa-calendar-check", label: "Reservation created" },
                    { icon: "fa-message", label: "SMS confirmation sent" },
                    { icon: "fa-database", label: "CRM updated" },
                  ].map((a) => (
                    <div key={a.label} className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded bg-[var(--accent)]/15 flex items-center justify-center">
                        <i className={`fa-solid ${a.icon} text-[var(--accent)] text-[9px]`}></i>
                      </div>
                      <span className="text-[var(--text-muted)]">{a.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="divider"></div>

              <div>
                <div className="text-[10px] uppercase tracking-wider text-[var(--text-dim)] mb-2">Latency</div>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-2xl font-light text-white">218</span>
                  <span className="text-xs text-[var(--text-muted)]">ms</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
