"use client";

import { PhoneIncoming, Bot, ClipboardCheck, Send } from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import { Stagger, StaggerItem } from "./ui/Reveal";

const steps = [
  {
    icon: PhoneIncoming,
    step: "01",
    title: "Customer calls your business",
    description:
      "A customer dials your existing business number — nothing changes on their end.",
  },
  {
    icon: Bot,
    step: "02",
    title: "AI Receptionist answers instantly",
    description:
      "The call is answered on the first ring with a warm, professional greeting in your business name.",
  },
  {
    icon: ClipboardCheck,
    step: "03",
    title: "Customer information is collected",
    description:
      "The receptionist asks the right questions, answers theirs, and gathers everything you need.",
  },
  {
    icon: Send,
    step: "04",
    title: "Appointment or lead is delivered to you",
    description:
      "Bookings land on your calendar and lead details arrive by text or email — instantly.",
  },
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
          eyebrow="Simple Process"
          title="From first ring to booked appointment"
          description="Handled in seconds, without you lifting a finger."
          dark
        />

        <Stagger className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" staggerDelay={0.12}>
          {steps.map((step, i) => (
            <StaggerItem key={step.step} className="relative">
              <div className="group relative h-full rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/30 hover:bg-white/[0.07]">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/30 transition-transform duration-300 group-hover:scale-110">
                    <step.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span
                    aria-hidden="true"
                    className="font-display text-4xl font-bold text-white/10 transition-colors duration-300 group-hover:text-accent/30"
                  >
                    {step.step}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-lg font-bold text-white">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-400">
                  {step.description}
                </p>
                {i < steps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute -right-4 top-1/2 hidden h-px w-3 bg-primary/40 lg:block"
                  />
                )}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
