"use client";

import {
  PhoneCall,
  CalendarCheck,
  ClipboardList,
  MessageCircleQuestion,
  PhoneForwarded,
  MoonStar,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import { Stagger, StaggerItem } from "./ui/Reveal";

export function Solution() {
  return (
    <section id="solution" className="section-padding bg-white">
      <div className="container-site">
        <SectionHeading
          eyebrow="The Solution"
          title="Meet your 24/7 AI Receptionist"
          description="A professional, friendly receptionist that never takes a break, never puts customers on hold, and never lets an opportunity slip away."
        />

        <Stagger className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* Feature: large card with mini visual */}
          <StaggerItem className="sm:col-span-2">
            <div className="card-soft group relative h-full overflow-hidden bg-navy p-8 !ring-white/10 sm:p-10">
              <div
                aria-hidden="true"
                className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/25 opacity-70 blur-[90px] transition-opacity duration-500 group-hover:opacity-100"
              />
              <div className="relative flex h-full flex-col justify-between gap-8 sm:flex-row sm:items-center">
                <div className="max-w-sm">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/30">
                    <PhoneCall className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-bold text-white">
                    Answers every call
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">
                    Every caller is greeted instantly and professionally — no
                    ringing out, no voicemail, no busy signal. Your business
                    sounds great on every single call.
                  </p>
                </div>
                <ul className="shrink-0 space-y-3" aria-hidden="true">
                  {["First-ring pickup", "Warm, natural voice", "Your business name & tone"].map(
                    (item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300"
                      >
                        <CheckCircle2 className="h-4 w-4 text-accent" />
                        {item}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </StaggerItem>

          <StaggerItem>
            <FeatureCard
              icon={CalendarCheck}
              title="Books appointments"
              description="Callers are scheduled directly into your calendar, so your day fills itself while you focus on customers."
            />
          </StaggerItem>

          <StaggerItem>
            <FeatureCard
              icon={ClipboardList}
              title="Captures customer information"
              description="Names, phone numbers, and the reason for calling are collected and delivered to you in real time."
            />
          </StaggerItem>

          <StaggerItem>
            <FeatureCard
              icon={MessageCircleQuestion}
              title="Handles common questions"
              description="Hours, pricing, directions, services — frequently asked questions answered accurately every time."
            />
          </StaggerItem>

          <StaggerItem>
            <FeatureCard
              icon={PhoneForwarded}
              title="Transfers urgent calls"
              description="When a call truly needs you, it's routed straight to you or your team without missing a beat."
            />
          </StaggerItem>

          <StaggerItem className="sm:col-span-2">
            <div className="card-soft group relative h-full overflow-hidden p-8 sm:p-10">
              <div
                aria-hidden="true"
                className="absolute -bottom-24 -right-16 h-56 w-56 rounded-full bg-accent/10 blur-[70px]"
              />
              <div className="relative flex h-full flex-col justify-between gap-8 sm:flex-row sm:items-center">
                <div className="max-w-sm">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-accent">
                    <MoonStar className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-bold text-navy">
                    Works day and night
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    Evenings, weekends, holidays — your business stays open to
                    new customers around the clock.
                  </p>
                </div>
                <a
                  href="#consultation"
                  className="group/link inline-flex shrink-0 items-center gap-2 rounded-full bg-navy px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-primary"
                >
                  See it in action
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="card-soft group h-full p-8">
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <h3 className="mt-6 font-display text-lg font-bold text-navy">{title}</h3>
      <p className="mt-2.5 text-sm leading-relaxed text-slate-600">{description}</p>
    </div>
  );
}
