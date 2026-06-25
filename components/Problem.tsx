"use client";

import { PhoneMissed, CalendarX, Hourglass, Frown } from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import { Stagger, StaggerItem } from "./ui/Reveal";

const problems = [
  {
    icon: PhoneMissed,
    number: "01",
    title: "Missed Leads",
    description:
      "Potential customers who can't reach you rarely call back — they simply call the next business on the list.",
  },
  {
    icon: CalendarX,
    number: "02",
    title: "Lost Appointments",
    description:
      "Every unanswered call is a booking that never happens, leaving gaps in your schedule and money on the table.",
  },
  {
    icon: Hourglass,
    number: "03",
    title: "Slow Response Time",
    description:
      "Customers expect instant answers. Voicemail and call-backs hours later cost you trust and business.",
  },
  {
    icon: Frown,
    number: "04",
    title: "Customer Frustration",
    description:
      "Endless ringing and busy lines frustrate loyal customers and quietly damage your reputation.",
  },
];

export function Problem() {
  return (
    <section id="problem" className="section-padding bg-navy">
      <div className="container-site">
        <SectionHeading
          eyebrow="The Hidden Cost"
          title={<>Every missed call is <em>lost revenue.</em></>}
          description="Many businesses lose potential customers because calls go unanswered. Whether you're busy, after hours, or serving another customer, every missed call can mean a missed opportunity."
        />

        <Stagger className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((problem) => (
            <StaggerItem key={problem.title}>
              <div className="card-soft group relative h-full overflow-hidden p-7">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-2 -top-5 font-mono text-[5.5rem] font-bold leading-none text-primary/[0.08] transition-colors duration-300 group-hover:text-primary/[0.16]"
                >
                  {problem.number}
                </span>
                <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-400 transition-transform duration-300 group-hover:scale-110">
                  <problem.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="relative mt-6 font-display text-lg font-bold text-white">
                  {problem.title}
                </h3>
                <p className="relative mt-2.5 text-sm leading-relaxed text-slate-400">
                  {problem.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
