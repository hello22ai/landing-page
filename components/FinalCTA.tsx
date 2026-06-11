"use client";

import { ArrowRight } from "lucide-react";
import { Reveal } from "./ui/Reveal";

export function FinalCTA() {
  return (
    <section className="section-padding bg-white">
      <div className="container-site">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-navy px-6 py-20 text-center sm:px-16 lg:py-28">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 bg-grid-light [mask-image:radial-gradient(ellipse_60%_70%_at_50%_50%,black,transparent)]" />
              <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-primary/25 blur-[110px]" />
              <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-primary/20 blur-[110px]" />
              <div className="absolute inset-0 bg-noise opacity-[0.03]" />
            </div>

            <div className="relative mx-auto max-w-3xl">
              <h2 className="heading-xl text-white">
                Turn every call into <span className="text-highlight">an opportunity</span>
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
                Stop losing customers because of missed calls. Let AI answer
                every call and help your business grow.
              </p>
              <div className="mt-10">
                <a href="#consultation" className="btn-primary !px-10 !py-4 !text-lg">
                  Schedule Free Consultation
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </a>
              </div>
              <p className="mt-6 text-sm text-slate-400">
                Free consultation · No commitment · Setup in days
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
