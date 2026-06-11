"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Stagger, StaggerItem } from "./ui/Reveal";

type StatValue =
  | { type: "count"; to: number; prefix?: string; suffix?: string }
  | { type: "static"; text: string };

const stats: { value: StatValue; label: string; sub: string }[] = [
  {
    value: { type: "count", to: 100, suffix: "%" },
    label: "of calls answered",
    sub: "no voicemail, ever",
  },
  {
    value: { type: "static", text: "< 1s" },
    label: "average pickup time",
    sub: "faster than any front desk",
  },
  {
    value: { type: "static", text: "24/7" },
    label: "availability",
    sub: "nights, weekends & holidays",
  },
  {
    value: { type: "count", to: 38, prefix: "+", suffix: "%" },
    label: "more leads captured",
    sub: "average across customers",
  },
];

function CountUp({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReducedMotion = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion) {
      setValue(to);
      return;
    }
    let start: number | null = null;
    let raf: number;
    const duration = 1600;
    const step = (t: number) => {
      if (start === null) start = t;
      const progress = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * to));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, prefersReducedMotion]);

  return (
    <span ref={ref}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="border-y border-slate-100 bg-white py-16 lg:py-20" aria-label="Results">
      <div className="container-site">
        <Stagger className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4" staggerDelay={0.1}>
          {stats.map((stat) => (
            <StaggerItem key={stat.label} className="text-center">
              <p className="font-display text-5xl font-bold tracking-tight text-primary lg:text-6xl">
                {stat.value.type === "count" ? (
                  <CountUp to={stat.value.to} prefix={stat.value.prefix} suffix={stat.value.suffix} />
                ) : (
                  stat.value.text
                )}
              </p>
              <p className="mt-3 text-sm font-semibold text-navy">{stat.label}</p>
              <p className="mt-1 text-xs text-slate-500">{stat.sub}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
