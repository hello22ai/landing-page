"use client";

import Image from "next/image";
import {
  Target,
  Timer,
  TrendingUp,
  HeartHandshake,
  Users,
  Clock,
  PhoneCall,
} from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "./ui/Reveal";

const benefits = [
  {
    icon: Target,
    title: "Never Miss Opportunities",
    description:
      "Every caller becomes a captured lead or booked appointment — not a missed chance.",
  },
  {
    icon: Timer,
    title: "Save Staff Time",
    description:
      "Free your team from the phone so they can focus on the customers in front of them.",
  },
  {
    icon: TrendingUp,
    title: "Increase Lead Conversion",
    description:
      "Instant answers and immediate follow-up turn far more callers into paying customers.",
  },
  {
    icon: HeartHandshake,
    title: "Improve Customer Experience",
    description:
      "Callers get a friendly, helpful response every time — no hold music, no voicemail.",
  },
  {
    icon: Users,
    title: "Scale Without Hiring More Staff",
    description:
      "Handle 10 or 1,000 calls a day at the same low cost — no recruiting, training, or turnover.",
  },
  {
    icon: Clock,
    title: "Available 24/7",
    description:
      "Nights, weekends, and holidays are covered, so your business never sleeps.",
  },
];

export function Benefits() {
  return (
    <section id="benefits" className="section-padding bg-surface">
      <div className="container-site">
        <SectionHeading
          eyebrow="Why Businesses Choose Us"
          title="Focus on your business while AI handles calls"
          description="Spend your time serving customers and growing revenue — your receptionist takes care of the rest."
        />

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Image side */}
          <Reveal className="relative">
            <div className="relative overflow-hidden rounded-3xl shadow-card">
              <Image
                src="/images/office-reception.jpg"
                alt="A modern, calm business office"
                width={960}
                height={720}
                className="aspect-[4/3] w-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-navy/10"
              />
            </div>

            {/* Floating stat card */}
            <div className="absolute -bottom-6 -right-4 hidden rounded-2xl bg-white p-5 shadow-card-hover ring-1 ring-slate-900/[0.06] sm:block lg:-right-8">
              <div className="flex items-center gap-3.5">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white">
                  <PhoneCall className="h-6 w-6" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-display text-xl font-bold text-navy">
                    Every call handled
                  </p>
                  <p className="text-xs text-slate-500">
                    while your team stays focused
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Benefits list */}
          <Stagger className="grid gap-3 sm:grid-cols-2" staggerDelay={0.08}>
            {benefits.map((benefit) => (
              <StaggerItem key={benefit.title}>
                <div className="card-soft group flex h-full gap-4 p-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary-50 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                    <benefit.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-[15px] font-bold leading-snug text-navy">
                      {benefit.title}
                    </h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
