"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlayCircle,
  CalendarCheck,
  CheckCircle2,
  ArrowRight,
  Bot,
  Bell,
  Volume2,
  VolumeX,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.1 * i, ease: [0.21, 0.47, 0.32, 0.98] },
  }),
};

/* ------------------------- Customer ↔ AI live call scene ------------------------- */

type Line = {
  who: "caller" | "ai";
  text: string;
  dur: number; // measured length of the matching voice clip (ms)
  after?: "booking" | "crm";
};

// dur values are the real durations of /public/audio/line-N.mp3 (+ small buffer)
const SCRIPT: Line[] = [
  { who: "ai", text: "Thanks for calling Brightside Dental! How can I help you today?", dur: 4350 },
  { who: "caller", text: "Hello! Do you have anything available tomorrow morning?", dur: 3800 },
  { who: "ai", text: "Yes — 10:30 AM is open. I've booked you in!", dur: 4400, after: "booking" },
  { who: "caller", text: "Perfect, thank you so much!", dur: 2200 },
  { who: "ai", text: "You're welcome! Your confirmation is on its way.", dur: 3450, after: "crm" },
];

const RING_MS = 3200;

// Words appear one by one, paced to the voice clip.
// The full text invisibly reserves space so the bubble never resizes.
function SpokenText({ text, duration }: { text: string; duration: number }) {
  const words = useMemo(() => text.split(" "), [text]);
  const [count, setCount] = useState(1);

  useEffect(() => {
    setCount(1);
    const interval = Math.max(90, (duration * 0.85) / words.length);
    const id = setInterval(() => {
      setCount((c) => {
        if (c >= words.length) {
          clearInterval(id);
          return c;
        }
        return c + 1;
      });
    }, interval);
    return () => clearInterval(id);
  }, [words, duration]);

  return (
    <span className="relative block">
      <span className="invisible">{text}</span>
      <span className="absolute inset-0">{words.slice(0, count).join(" ")}</span>
    </span>
  );
}

function MiniWave() {
  return (
    <span className="flex h-3.5 items-end gap-[2px]" aria-hidden="true">
      {[6, 10, 7, 12, 8].map((h, i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-full bg-primary"
          animate={{ height: [h * 0.4, h, h * 0.4] }}
          transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
          style={{ height: h }}
        />
      ))}
    </span>
  );
}

function AgentLinkScene() {
  const [cycle, setCycle] = useState(0);
  const [connected, setConnected] = useState(false);
  const [bubble, setBubble] = useState<Line | null>(null);
  const [outcome, setOutcome] = useState<"booking" | "crm" | null>(null);
  const [seconds, setSeconds] = useState(0);
  const [soundOn, setSoundOn] = useState(true);

  const soundRef = useRef(true);
  const inViewRef = useRef(true);
  const unlockedRef = useRef(false);
  const lastClipRef = useRef<{ index: number; startedAt: number } | null>(null);
  const ringStartedAtRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const audiosRef = useRef<HTMLAudioElement[]>([]);
  const ringRef = useRef<HTMLAudioElement | null>(null);
  const notifyRef = useRef<HTMLAudioElement | null>(null);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  // Restore saved sound preference
  useEffect(() => {
    if (localStorage.getItem("demo-sound") === "off") {
      setSoundOn(false);
      soundRef.current = false;
    }
  }, []);

  // Preload voice clips, ringback tone, success chime
  useEffect(() => {
    audiosRef.current = SCRIPT.map((_, i) => {
      const a = new Audio(`/audio/line-${i}.mp3`);
      a.preload = "auto";
      return a;
    });
    const ring = new Audio("/audio/ringback.wav");
    ring.preload = "auto";
    ring.loop = true;
    ringRef.current = ring;
    const notify = new Audio("/audio/notify.wav");
    notify.preload = "auto";
    notify.volume = 0.7;
    notifyRef.current = notify;
    return () => {
      audiosRef.current.forEach((a) => a.pause());
      ring.pause();
      notify.pause();
    };
  }, []);

  // Pause audio whenever the scene scrolls out of view or the tab is hidden
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting && entry.intersectionRatio >= 0.5;
        inViewRef.current = visible;
        if (!visible) currentAudioRef.current?.pause();
      },
      { threshold: [0, 0.5, 1] }
    );
    observer.observe(el);
    const onVisibility = () => {
      if (document.hidden) currentAudioRef.current?.pause();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  // Autoplay as aggressively as the browser allows: try immediately, then
  // retry on the first sign of activity. Whatever should be audible right
  // now starts mid-clip, so sound kicks in seamlessly.
  useEffect(() => {
    const events = ["pointerdown", "pointermove", "wheel", "scroll", "touchstart", "touchend", "keydown"];

    const tryStart = () => {
      if (unlockedRef.current) return;
      if (!soundRef.current || !inViewRef.current) return;

      const ringElapsed = Date.now() - ringStartedAtRef.current;
      const last = lastClipRef.current;
      let target: HTMLAudioElement | null = null;
      let offset = 0;

      if (ringElapsed < RING_MS && ringRef.current) {
        target = ringRef.current;
        offset = (ringElapsed % 3500) / 1000;
      } else if (last) {
        const elapsed = Date.now() - last.startedAt;
        const clip = audiosRef.current[last.index];
        if (clip && elapsed < SCRIPT[last.index].dur - 400) {
          target = clip;
          offset = elapsed / 1000;
        }
      }
      if (!target) return;

      target.currentTime = offset;
      currentAudioRef.current = target;
      target
        .play()
        .then(() => {
          unlockedRef.current = true;
          events.forEach((e) => window.removeEventListener(e, tryStart));
        })
        .catch(() => {});
    };

    events.forEach((e) => window.addEventListener(e, tryStart, { passive: true }));
    tryStart();
    return () => events.forEach((e) => window.removeEventListener(e, tryStart));
  }, []);

  const playClip = (i: number) => {
    lastClipRef.current = { index: i, startedAt: Date.now() };
    if (!soundRef.current || !inViewRef.current) return;
    currentAudioRef.current?.pause();
    const a = audiosRef.current[i];
    if (!a) return;
    a.currentTime = 0;
    currentAudioRef.current = a;
    void a.play().catch(() => {});
  };

  const playNotify = () => {
    if (!soundRef.current || !inViewRef.current) return;
    const a = notifyRef.current;
    if (!a) return;
    a.currentTime = 0;
    void a.play().catch(() => {});
  };

  const toggleSound = () => {
    setSoundOn((v) => {
      const next = !v;
      soundRef.current = next;
      localStorage.setItem("demo-sound", next ? "on" : "off");
      if (!next) currentAudioRef.current?.pause();
      return next;
    });
  };

  // One full call cycle: ring → connect → scripted turns → outcomes → restart
  useEffect(() => {
    setConnected(false);
    setBubble(null);
    setOutcome(null);
    setSeconds(0);

    const timers: ReturnType<typeof setTimeout>[] = [];
    const at = (ms: number, fn: () => void) => timers.push(setTimeout(fn, ms));

    // ringback while dialing
    ringStartedAtRef.current = Date.now();
    if (soundRef.current && inViewRef.current && ringRef.current) {
      const ring = ringRef.current;
      ring.currentTime = 0;
      currentAudioRef.current = ring;
      void ring.play().catch(() => {});
    }

    at(RING_MS, () => {
      ringRef.current?.pause();
      setConnected(true);
    });

    let t = RING_MS + 700;
    SCRIPT.forEach((line, i) => {
      at(t, () => {
        setBubble(line);
        playClip(i);
      });
      at(t + line.dur + 900, () => setBubble(null));
      if (line.after) {
        const which = line.after;
        at(t + line.dur + 1200, () => {
          setOutcome(which);
          playNotify();
        });
        at(t + line.dur + 4600, () => setOutcome(null));
        t += line.dur + 5300;
      } else {
        t += line.dur + 1700;
      }
    });
    at(t + 400, () => setCycle((c) => c + 1));

    return () => {
      timers.forEach(clearTimeout);
      currentAudioRef.current?.pause();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cycle]);

  // call timer — starts at connect, resets each cycle
  useEffect(() => {
    if (!connected) return;
    const id = setInterval(() => setSeconds((s) => Math.min(s + 1, 59)), 1000);
    return () => clearInterval(id);
  }, [connected, cycle]);

  const speaker = bubble?.who ?? null;

  return (
    <div ref={containerRef} className="relative mx-auto w-full max-w-lg select-none">
      {/* Speech bubbles */}
      <div className="flex h-32 items-end justify-between gap-4 pb-5 sm:h-28">
        <div className="w-[48%]">
          <AnimatePresence mode="wait">
            {bubble?.who === "caller" && (
              <motion.div
                key={`${cycle}-${bubble.text}`}
                initial={{ opacity: 0, y: 14, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="relative rounded-2xl rounded-bl-md bg-white px-4 py-3 text-sm font-medium leading-snug text-navy shadow-xl"
              >
                <SpokenText text={bubble.text} duration={bubble.dur} />
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1.5 left-6 h-3 w-3 rotate-45 bg-white"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="flex w-[48%] justify-end">
          <AnimatePresence mode="wait">
            {bubble?.who === "ai" && (
              <motion.div
                key={`${cycle}-${bubble.text}`}
                initial={{ opacity: 0, y: 14, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="relative rounded-2xl rounded-br-md bg-primary px-4 py-3 text-sm font-medium leading-snug text-white shadow-xl shadow-primary/25"
              >
                <SpokenText text={bubble.text} duration={bubble.dur} />
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1.5 right-6 h-3 w-3 rotate-45 bg-primary"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Customer ↔ AI connection */}
      <div className="flex items-stretch gap-3 sm:gap-4">
        {/* Customer — real person on a call */}
        <div
          className={`relative w-36 shrink-0 overflow-hidden rounded-3xl ring-2 transition-all duration-500 sm:w-44 ${
            speaker === "caller"
              ? "ring-primary shadow-[0_0_35px_rgba(255,99,31,0.3)]"
              : "ring-white/10"
          }`}
        >
          <motion.div
            className="h-48 w-full sm:h-60"
            animate={{ scale: [1, 1.07, 1] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/images/customer-on-call.jpg"
              alt="Customer talking on the phone"
              width={350}
              height={500}
              className="h-full w-full object-cover object-top"
            />
          </motion.div>
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-navy/85 px-3 py-2 backdrop-blur-sm">
            <div>
              <p className="text-xs font-bold text-white">Sarah</p>
              <p className="text-[10px] text-slate-400">Customer · on call</p>
            </div>
            {speaker === "caller" && <MiniWave />}
          </div>
        </div>

        {/* Connection beam */}
        <div className="relative min-w-0 flex-1 self-center">
          <div className="relative h-12">
            <span className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-white/15" />
            {(speaker || !connected) &&
              [0, 1, 2].map((i) => (
                <motion.span
                  key={`${connected ? speaker : "ring"}-${i}`}
                  className={`absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full ${
                    connected ? "bg-primary" : "bg-slate-400"
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{
                    left: speaker === "ai" ? ["96%", "2%"] : ["2%", "96%"],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: connected ? 1.7 : 2.4,
                    repeat: Infinity,
                    delay: i * 0.55,
                    ease: "linear",
                  }}
                />
              ))}
            <span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-navy-800 px-3 py-1 text-[10px] font-semibold text-slate-300 ring-1 ring-white/10">
              {connected ? (
                <>
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  Live · 0:{String(seconds).padStart(2, "0")}
                </>
              ) : (
                <>
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
                  Ringing…
                </>
              )}
            </span>
          </div>
        </div>

        {/* AI receptionist */}
        <div
          className={`relative flex h-48 w-36 shrink-0 flex-col items-center justify-center rounded-3xl bg-navy-800 ring-2 transition-all duration-500 sm:h-60 sm:w-44 ${
            speaker === "ai"
              ? "ring-primary shadow-[0_0_35px_rgba(255,99,31,0.3)]"
              : "ring-white/10"
          }`}
        >
          <div className="relative">
            {(speaker === "ai" || !connected) &&
              [0, 1].map((i) => (
                <motion.span
                  key={i}
                  className={`absolute inset-0 rounded-full border-2 ${
                    connected ? "border-primary/50" : "border-amber-400/40"
                  }`}
                  animate={{ scale: [1, 1.5], opacity: [0.8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.75, ease: "easeOut" }}
                />
              ))}
            <motion.div
              className="flex h-16 w-16 items-center justify-center rounded-full bg-primary shadow-lg shadow-primary/40 sm:h-20 sm:w-20"
              animate={speaker === "ai" ? { scale: [1, 1.06, 1] } : { scale: 1 }}
              transition={{
                duration: 1.2,
                repeat: speaker === "ai" ? Infinity : 0,
                ease: "easeInOut",
              }}
            >
              <Bot className="h-8 w-8 text-white sm:h-10 sm:w-10" aria-hidden="true" />
            </motion.div>
          </div>
          <p className="mt-4 font-display text-sm font-bold text-white">AI Receptionist</p>
          <p className="mt-0.5 text-[10px] text-slate-400">
            {connected ? "Brightside Dental" : "Incoming call…"}
          </p>
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between rounded-b-3xl bg-navy/85 px-3 py-2">
            <span className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              Online 24/7
            </span>
            {speaker === "ai" && <MiniWave />}
          </div>
        </div>
      </div>

      {/* Outcome cards + sound toggle */}
      <div className="relative flex h-32 items-start justify-center pt-6 sm:h-28">
        <AnimatePresence mode="wait">
          {outcome === "booking" && (
            <motion.div
              key="booking"
              initial={{ opacity: 0, y: 18, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-2xl"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
                <CalendarCheck className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-bold text-navy">Appointment booked</p>
                <p className="text-xs text-slate-500">Tomorrow · 10:30 AM · added to your calendar</p>
              </div>
              <CheckCircle2 className="ml-2 h-5 w-5 shrink-0 text-emerald-500" aria-hidden="true" />
            </motion.div>
          )}
          {outcome === "crm" && (
            <motion.div
              key="crm"
              initial={{ opacity: 0, y: 18, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-2xl"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-white">
                <Bell className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-bold text-navy">New lead captured</p>
                <p className="text-xs text-slate-500">Sarah Mitchell · details sent to your CRM</p>
              </div>
              <CheckCircle2 className="ml-2 h-5 w-5 shrink-0 text-emerald-500" aria-hidden="true" />
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={toggleSound}
          aria-label={soundOn ? "Mute demo audio" : "Unmute demo audio"}
          className={`absolute bottom-0 right-0 flex h-9 items-center gap-1.5 rounded-full px-3.5 text-xs font-semibold ring-1 transition-all duration-300 ${
            soundOn
              ? "bg-primary/15 text-primary ring-primary/40"
              : "bg-white/5 text-slate-400 ring-white/10 hover:text-white hover:ring-accent/40"
          }`}
        >
          {soundOn ? (
            <Volume2 className="h-3.5 w-3.5" aria-hidden="true" />
          ) : (
            <VolumeX className="h-3.5 w-3.5" aria-hidden="true" />
          )}
          {soundOn ? "Sound on" : "Muted"}
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------- Hero ---------------------------------- */

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy pb-28 pt-36 lg:pb-36 lg:pt-48">
      {/* Ambient background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid-light [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
        <div className="absolute -top-48 left-1/3 h-[36rem] w-[36rem] rounded-full bg-primary/25 blur-[140px]" />
        <div className="absolute -right-40 top-1/4 h-[30rem] w-[30rem] rounded-full bg-accent/20 blur-[140px]" />
        <div className="absolute inset-0 bg-noise opacity-[0.025]" />
      </div>

      <div className="container-site relative grid items-center gap-20 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Copy */}
        <div>
          <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp}>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 py-1.5 pl-2 pr-4 text-sm font-medium text-slate-300 backdrop-blur">
              <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs font-bold text-white">
                NEW
              </span>
              AI Receptionist for service businesses
            </span>
          </motion.div>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="heading-xl mt-7 text-white"
          >
            Never miss another <span className="text-highlight">customer call</span>
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-7 max-w-xl text-lg leading-relaxed text-slate-400"
          >
            Your AI Receptionist answers calls 24/7, captures customer
            information, books appointments, and handles every opportunity
            professionally — even when you&apos;re unavailable.
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <a href="#consultation" className="btn-primary">
              Get Free Consultation
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent"
            >
              <PlayCircle className="h-5 w-5" aria-hidden="true" />
              Watch Demo
            </a>
          </motion.div>

          {/* Inline stats */}
          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-14 grid max-w-md grid-cols-3 divide-x divide-white/10"
          >
            {[
              { value: "100%", label: "Calls answered" },
              { value: "< 1s", label: "Pickup time" },
              { value: "24/7", label: "Always on" },
            ].map((stat) => (
              <div key={stat.label} className="px-5 first:pl-0">
                <p className="font-display text-2xl font-bold text-white sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-slate-500">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Customer ↔ AI live call scene */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <AgentLinkScene />
        </motion.div>
      </div>
    </section>
  );
}
