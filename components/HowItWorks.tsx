"use client";

import { Check, Phone, Sparkles } from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import { Stagger, StaggerItem } from "./ui/Reveal";
import { EqualizerBars } from "./ui/Waveform";

const flowItems = [
  "Capture: name · address · issue",
  "Leads → Google Calendar / webhook",
  "Notify → Email · SMS · WhatsApp",
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section-padding relative overflow-hidden bg-navy">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid-light [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)]" />
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]" />
        <div className="absolute inset-0 bg-noise opacity-[0.025]" />
      </div>

      <div className="container-site relative">
        <SectionHeading
          eyebrow="How it works"
          title={<>From signup to your <em>first answered call — fast.</em></>}
          description="No phone trees. No code. Just describe what your receptionist should do — hello22 handles the rest."
        />

        <Stagger className="mt-16 grid gap-8 lg:grid-cols-3" staggerDelay={0.12}>
          {/* STEP 01 — SETUP */}
          <StaggerItem className="border-t border-white/10 pt-8">
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-5xl italic leading-none text-primary lg:text-6xl">
                01
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                — Build your AI Brain
              </span>
            </div>
            <h3 className="mt-5 text-xl font-semibold text-white">
              Build your AI Brain
            </h3>
            <p className="mt-2 text-slate-400">
              Paste your website URL or fill in your details. Set your business
              name, voice, greeting, services, and rules.
            </p>

            <div className="mt-6 rounded-2xl bg-card p-4 ring-1 ring-white/[0.08]">
              <div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                brain.config
              </div>
              <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-slate-400">
                <code>
                  <span className="block">
                    url: <span className="text-primary">&quot;yourbusiness.com.au&quot;</span>
                  </span>
                  <span className="block">name: &quot;Rapid Plumbing Co.&quot;</span>
                  <span className="block">voice: &quot;Emma · AU&quot;</span>
                  <span className="block">hours: &quot;24/7&quot;</span>
                </code>
              </pre>
            </div>
          </StaggerItem>

          {/* STEP 02 — CONNECT */}
          <StaggerItem className="border-t border-white/10 pt-8">
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-5xl italic leading-none text-primary lg:text-6xl">
                02
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                — Connect your flow
              </span>
            </div>
            <h3 className="mt-5 text-xl font-semibold text-white">
              Connect your flow
            </h3>
            <p className="mt-2 text-slate-400">
              Choose what to capture, where leads go (Google Calendar / webhook),
              and how you get notified (email · SMS · WhatsApp).
            </p>

            <div className="mt-6 rounded-2xl bg-card p-4 ring-1 ring-white/[0.08]">
              <ul className="space-y-2.5">
                {flowItems.map((label) => (
                  <li
                    key={label}
                    className="flex items-center gap-2.5 rounded-xl bg-navy-800 px-3 py-2.5 ring-1 ring-white/[0.06]"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30">
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-xs text-white">{label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </StaggerItem>

          {/* STEP 03 — GO LIVE */}
          <StaggerItem className="border-t border-white/10 pt-8">
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-5xl italic leading-none text-primary lg:text-6xl">
                03
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                — Get your number &amp; go live
              </span>
            </div>
            <h3 className="mt-5 text-xl font-semibold text-white">
              Get your number &amp; go live
            </h3>
            <p className="mt-2 text-slate-400">
              Pick a number from our pool or keep your existing one. Your
              receptionist starts answering 24/7.
            </p>

            <div className="mt-6 rounded-2xl bg-card p-4 ring-1 ring-white/[0.08]">
              <div className="flex items-center justify-between gap-3 rounded-xl bg-navy-800 px-3 py-3 ring-1 ring-white/[0.06]">
                <span className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 text-primary ring-1 ring-primary/30">
                    <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  <span className="font-mono text-sm text-white">
                    +61 2 5550 2210
                  </span>
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                  Active
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between gap-3 px-1">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                  Live line
                </span>
                <EqualizerBars bars={7} height={16} className="text-primary" />
              </div>
            </div>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
