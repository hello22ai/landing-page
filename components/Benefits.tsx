"use client";

import {
  BrainCircuit,
  FileText,
  SlidersHorizontal,
  PhoneForwarded,
  MessageSquare,
  MessageCircle,
  BarChart3,
  Webhook,
  AudioLines,
  Languages,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import { Stagger, StaggerItem } from "./ui/Reveal";
import { EqualizerBars } from "./ui/Waveform";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
  plan?: boolean;
};

const features: Feature[] = [
  {
    icon: FileText,
    title: "Knowledge that updates instantly",
    description:
      "Upload documents, add quick facts, and choose exactly which details to capture from every caller. Your agent learns them immediately.",
  },
  {
    icon: SlidersHorizontal,
    title: "Smart rules & scenarios",
    description:
      "Set business hours, timezone, if-this-then-that handling, how to talk about pricing (with fixed-price items), and which calls to politely decline.",
  },
  {
    icon: PhoneForwarded,
    title: "Human handover",
    description: "Transfer to a real person on the calls that need it.",
    plan: true,
  },
  {
    icon: MessageSquare,
    title: "Post-call summaries everywhere",
    description:
      "Automatic owner summaries by email, SMS, and WhatsApp, plus optional post-call texts to your customer. (SMS/WhatsApp on eligible plans)",
  },
  {
    icon: MessageCircle,
    title: "Inbound WhatsApp auto-reply",
    description:
      "Your agent replies to inbound WhatsApp messages in your brand's voice.",
    plan: true,
  },
  {
    icon: BarChart3,
    title: "Call logs, transcripts & analytics",
    description:
      "Every call transcribed, analyzed, and searchable, with a clean analytics dashboard and weekly digest emails.",
  },
  {
    icon: Webhook,
    title: "CRM lead delivery",
    description: "Push every lead to Google Calendar or your own webhook.",
  },
  {
    icon: AudioLines,
    title: "Fine voice control",
    description:
      "Tune creativity, voice stability, speaking speed, and greeting per agent in Advanced.",
  },
  {
    icon: Languages,
    title: "Multilingual dashboard",
    description:
      "Use hello22 in 8 languages (English, Español, Français, Deutsch, Português, 中文, 日本語, العربية), with full dark mode.",
  },
];

function PlanBadge() {
  return (
    <span className="absolute right-4 top-4 rounded-md bg-white/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-slate-400 ring-1 ring-white/10">
      Plan
    </span>
  );
}

export function Benefits() {
  return (
    <section id="features" className="section-padding bg-base">
      <div className="container-site">
        <SectionHeading
          eyebrow="The AI Brain"
          title={<>Everything you need to <em>answer every call.</em></>}
          description="Describe your business once. hello22 compiles it into a receptionist that sounds like your front desk — and keeps getting smarter."
        />

        <Stagger
          className="mt-14 grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3"
          staggerDelay={0.08}
        >
          {/* 1 — BIG hero card: Your AI Brain, not a script */}
          <StaggerItem className="lg:col-span-2">
            <div className="card-soft relative flex h-full flex-col p-8">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                <BrainCircuit className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-2xl font-semibold text-white">
                Your AI Brain, not a script
              </h3>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-slate-400">
                Describe your business in plain language: name, services, tone,
                and rules. hello22 compiles it into a smart receptionist that
                sounds like your front desk — handling interruptions and
                follow-up questions naturally.
              </p>

              <div className="mt-auto flex items-end justify-between pt-8">
                <span className="font-mono text-xs uppercase tracking-widest text-muted">
                  compiling brain
                </span>
                <EqualizerBars
                  bars={28}
                  height={28}
                  active
                  className="opacity-60"
                />
              </div>
            </div>
          </StaggerItem>

          {/* 2–10 — feature cards */}
          {features.map(({ icon: Icon, title, description, plan }) => (
            <StaggerItem key={title}>
              <div className="card-soft relative flex h-full flex-col p-6">
                {plan ? <PlanBadge /> : null}
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-semibold text-white">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
                  {description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
