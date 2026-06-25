"use client";

import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Phone,
  CalendarCheck,
  Users,
  FileText,
  Settings,
  PhoneIncoming,
  CalendarPlus,
  UserPlus,
  Timer,
  TrendingUp,
} from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { EqualizerBars } from "./ui/Waveform";

/* ---------- Hardcoded dashboard data ---------- */

const NAV_ITEMS = [
  { label: "Overview", icon: LayoutDashboard, active: true },
  { label: "Calls", icon: Phone },
  { label: "Appointments", icon: CalendarCheck },
  { label: "Leads", icon: Users },
  { label: "Transcripts", icon: FileText },
  { label: "Settings", icon: Settings },
];

const STATS = [
  { label: "Calls today", value: "47", icon: PhoneIncoming, delta: "+18%" },
  { label: "Appointments booked", value: "12", icon: CalendarPlus },
  { label: "Leads captured", value: "9", icon: UserPlus },
  { label: "Avg. answer time", value: "0.8s", icon: Timer },
];

/* 12 bars, busiest at midday */
const CALL_VOLUME = [28, 42, 55, 70, 84, 100, 92, 76, 62, 48, 56, 34];
const CHART_LABELS = ["8a", "10a", "12p", "2p", "4p", "6p"];

const RECENT_CALLS = [
  {
    name: "Sarah Chen",
    time: "10:42 AM",
    intent: "Emergency call-out",
    duration: "—",
    outcome: "live" as const,
  },
  {
    name: "James Whitfield",
    time: "10:31 AM",
    intent: "Quote request",
    duration: "2:14",
    outcome: "answered" as const,
  },
  {
    name: "Priya Raman",
    time: "10:18 AM",
    intent: "Reschedule",
    duration: "1:47",
    outcome: "booked" as const,
  },
  {
    name: "Tom Caldwell",
    time: "9:56 AM",
    intent: "New job",
    duration: "3:05",
    outcome: "booked" as const,
  },
  {
    name: "Dana Okafor",
    time: "9:32 AM",
    intent: "Booking",
    duration: "0:58",
    outcome: "transferred" as const,
  },
];

const OUTCOME_STYLES = {
  booked: "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20",
  answered: "bg-sky-500/10 text-sky-400 ring-sky-500/20",
  transferred: "bg-amber-500/10 text-amber-400 ring-amber-500/20",
} as const;

const OUTCOME_LABELS = {
  booked: "Booked",
  answered: "Answered",
  transferred: "Transferred",
} as const;

/* ---------- Section ---------- */

export function Dashboard() {
  return (
    <section id="dashboard" className="section-padding bg-navy">
      <div className="container-site">
        <SectionHeading
          eyebrow="The Dashboard"
          title={<>Every call, <em>captured and organized.</em></>}
          description="Every conversation your AI receptionist handles becomes a transcript, a lead, and a booked appointment — all waiting for you in one clean dashboard."
        />

        <Reveal delay={0.15} className="relative mx-auto mt-16 max-w-6xl">
          {/* Ambient glow behind the frame */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 h-[420px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[140px]"
          />

          {/* Browser window frame */}
          <div className="relative overflow-hidden rounded-[20px] bg-card shadow-2xl shadow-black/50 ring-1 ring-white/[0.10]">
            {/* Chrome bar */}
            <div className="relative flex items-center gap-2 border-b border-white/10 bg-navy-800 px-5 py-3.5">
              <span className="h-3 w-3 rounded-full bg-[#FF5F57]" aria-hidden="true" />
              <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" aria-hidden="true" />
              <span className="h-3 w-3 rounded-full bg-[#28C840]" aria-hidden="true" />
              <span className="absolute left-1/2 -translate-x-1/2 rounded-full bg-white/5 px-4 py-1 font-mono text-xs text-muted ring-1 ring-white/10">
                app.hello22.ai/dashboard
              </span>
            </div>

            {/* App body */}
            <div className="flex">
              {/* Sidebar */}
              <aside className="hidden w-52 shrink-0 flex-col border-r border-white/10 bg-navy-800 p-4 md:flex">
                <span className="px-3 font-display text-lg font-bold text-primary">
                  hello22
                </span>
                <nav className="mt-6 space-y-1" aria-hidden="true">
                  {NAV_ITEMS.map(({ label, icon: Icon, active }) => (
                    <span
                      key={label}
                      className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm ${
                        active
                          ? "bg-primary/10 font-semibold text-primary"
                          : "text-slate-400"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {label}
                    </span>
                  ))}
                </nav>
              </aside>

              {/* Main area */}
              <div className="min-w-0 flex-1 p-5 sm:p-7">
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="font-display text-lg font-bold text-white sm:text-xl">
                      Good morning, Rapid Plumbing Co.
                    </h3>
                    <p className="mt-1 font-mono text-xs text-muted">Tue, Jun 9</p>
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-400 ring-1 ring-emerald-500/20">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                    </span>
                    AI Online
                  </span>
                </div>

                {/* Stat tiles */}
                <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
                  {STATS.map(({ label, value, icon: Icon, delta }) => (
                    <div
                      key={label}
                      className="rounded-xl bg-navy-800 p-4 ring-1 ring-white/[0.08]"
                    >
                      <div className="flex items-center justify-between">
                        <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                        {delta && (
                          <span className="inline-flex items-center gap-1 font-mono text-[11px] font-medium text-emerald-400">
                            <TrendingUp className="h-3 w-3" aria-hidden="true" />
                            {delta}
                          </span>
                        )}
                      </div>
                      <p className="mt-3 font-mono text-2xl font-semibold text-white">
                        {value}
                      </p>
                      <p className="mt-1 text-xs text-muted">{label}</p>
                    </div>
                  ))}
                </div>

                {/* Call volume chart */}
                <div className="mt-3 rounded-xl bg-navy-800 p-4 ring-1 ring-white/[0.08] sm:p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-white">Call volume</p>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
                      Today
                    </span>
                  </div>
                  <div
                    className="mt-4 flex h-24 items-end gap-1.5 sm:gap-2"
                    aria-hidden="true"
                  >
                    {CALL_VOLUME.map((h, i) => (
                      <motion.div
                        key={i}
                        className={`flex-1 rounded-t-sm ${
                          h === 100 ? "bg-primary" : "bg-primary/40"
                        }`}
                        initial={{ height: "4%" }}
                        whileInView={{ height: `${h}%` }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{
                          duration: 0.7,
                          delay: 0.2 + i * 0.05,
                          ease: [0.21, 0.47, 0.32, 0.98],
                        }}
                      />
                    ))}
                  </div>
                  <div className="mt-2 flex justify-between px-1" aria-hidden="true">
                    {CHART_LABELS.map((label) => (
                      <span key={label} className="font-mono text-[10px] text-muted">
                        {label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Recent calls */}
                <div className="mt-3 rounded-xl bg-navy-800 ring-1 ring-white/[0.08]">
                  <div className="flex items-center justify-between border-b border-white/10 px-4 py-3.5 sm:px-5">
                    <p className="text-sm font-semibold text-white">Recent calls</p>
                    <span className="text-xs text-primary">View all</span>
                  </div>
                  <ul className="divide-y divide-white/5">
                    {RECENT_CALLS.map((call) => (
                      <li
                        key={call.name}
                        className="flex items-center gap-3 px-4 py-3 sm:gap-4 sm:px-5"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-700 text-[11px] font-semibold text-slate-300">
                          {call.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-white">
                            {call.name}
                          </p>
                          <p className="truncate text-xs text-muted">{call.intent}</p>
                        </div>
                        <span className="hidden font-mono text-xs text-muted sm:block">
                          {call.time}
                        </span>
                        <span className="hidden w-10 text-right font-mono text-xs text-slate-400 lg:block">
                          {call.duration}
                        </span>
                        {call.outcome === "live" ? (
                          <span className="inline-flex w-[92px] items-center justify-center gap-2 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary ring-1 ring-primary/25">
                            <EqualizerBars bars={4} height={10} />
                            Live
                          </span>
                        ) : (
                          <span
                            className={`inline-flex w-[92px] items-center justify-center rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ${OUTCOME_STYLES[call.outcome]}`}
                          >
                            {OUTCOME_LABELS[call.outcome]}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
