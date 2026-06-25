"use client";

import { Star } from "lucide-react";
import { Stagger, StaggerItem } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

type Stat = {
  value: string;
  label: string;
  star?: boolean;
};

const stats: Stat[] = [
  {
    value: "24/7",
    label: "Answers nights, weekends & holidays",
  },
  {
    value: "4.9",
    label: "from 67 reviews",
    star: true,
  },
  {
    value: "8",
    label: "dashboard languages",
  },
  {
    value: "11",
    label: "studio voices · AU / UK / US",
  },
];

export function Stats() {
  return (
    <section className="border-y border-white/10 bg-base py-16 lg:py-20" aria-label="Stats">
      <div className="container-site">
        <div className="mb-12">
          <SectionHeading
            eyebrow="Why hello22"
            title={
              <>
                Always on, <em>every call.</em>
              </>
            }
          />
        </div>
        <Stagger className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4" staggerDelay={0.1}>
          {stats.map((stat) => (
            <StaggerItem key={stat.label} className="text-center">
              {stat.star && (
                <Star
                  className="mx-auto mb-2 h-5 w-5 fill-amber-400 text-amber-400"
                  aria-hidden="true"
                />
              )}
              <p className="font-mono text-5xl font-bold tracking-tight text-white lg:text-6xl">
                {stat.value}
              </p>
              <p className="mt-3 text-xs text-muted">{stat.label}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
