"use client";

import { ArrowRight, PhoneCall } from "lucide-react";
import { motion } from "framer-motion";
import { Reveal } from "./ui/Reveal";

const trustChips = [
  "No-obligation trial",
  "Keep your number",
  "Cancel anytime",
  "24/7",
];

export function FinalCTA() {
  return (
    <section className="section-padding bg-base">
      <div className="container-site">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-navy-800 px-6 py-20 text-center ring-1 ring-white/[0.08] sm:px-16 lg:py-28">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 bg-grid-light [mask-image:radial-gradient(ellipse_60%_70%_at_50%_50%,black,transparent)]" />
              <div className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[140px]" />
              <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-primary/25 blur-[110px]" />
              <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-primary/20 blur-[110px]" />
              <div className="absolute inset-0 bg-noise opacity-[0.03]" />
            </div>

            <div className="relative mx-auto max-w-3xl">
              <div className="mx-auto mb-8 grid h-16 w-16 place-items-center">
                <div className="relative grid h-16 w-16 place-items-center rounded-full bg-primary/10 shadow-glow ring-1 ring-primary/40">
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full ring-1 ring-primary/40"
                    initial={{ opacity: 0.6, scale: 1 }}
                    animate={{ opacity: 0, scale: 1.6 }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
                  />
                  <PhoneCall className="h-7 w-7 text-primary" aria-hidden="true" />
                </div>
              </div>

              <h2 className="heading-xl text-white">
                say hello. <em>to your new AI receptionist.</em>
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
                Build your AI Brain, pick a voice, and start answering every call
                — in minutes. Free trial, no obligation, keep your number.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a href="#consultation" className="btn-primary !px-10 !py-4 !text-lg">
                  Start free trial
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </a>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-4 text-lg font-medium text-white transition hover:bg-white/10"
                >
                  See how it works
                </a>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {trustChips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full bg-white/5 px-3 py-1 font-mono text-[11px] text-slate-300 ring-1 ring-white/10"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
