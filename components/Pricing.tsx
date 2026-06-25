"use client";

import { Check } from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "./ui/Reveal";
import { EqualizerBars } from "./ui/Waveform";

type Plan = {
  name: string;
  price: string;
  period?: string;
  priceCaption?: string;
  tagline: string;
  features: string[];
  cta: string;
  href: string;
  highlighted?: boolean;
};

const plans: Plan[] = [
  {
    name: "Free Trial",
    price: "Free",
    tagline: "Try the full receptionist, on us",
    features: [
      "Free trial minutes included",
      "Full features to test",
      "Card saved — no charge until trial ends",
      "Keep your number",
    ],
    cta: "Start free trial",
    href: "#consultation",
  },
  {
    name: "Plans",
    // NOTE: Exact prices are intentionally not hard-coded here.
    // They are configured per region in the admin SubscriptionPlan panel —
    // a human should fill in the real price there (this card shows "From $—/mo").
    price: "From $—",
    period: "/mo",
    priceCaption: "Bundled call minutes · set by region",
    tagline: "A monthly bundle of minutes that renews itself",
    features: [
      "A monthly bundle of call minutes",
      "SMS & WhatsApp summaries",
      "Premium voices unlocked",
      "Auto-renews on minutes OR date — whichever runs out first",
      "Priority support",
    ],
    cta: "Choose plan",
    href: "#consultation",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    tagline: "For high-volume, multi-agent operations",
    features: [
      "Higher minute volumes",
      "More agents",
      "White-label branding",
      "Dedicated support & SLA",
    ],
    cta: "Contact us",
    href: "#consultation",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="section-padding bg-base">
      <div className="container-site">
        <SectionHeading
          eyebrow="Pricing"
          title={<>Pay for <em>minutes, not seats.</em></>}
          description="Start with a free trial — we save your card but don't charge until it ends. Every plan includes a bundle of call minutes and renews automatically so your receptionist never goes offline. Cancel anytime."
        />

        <Stagger
          className="mt-16 grid items-stretch gap-6 lg:grid-cols-3"
          staggerDelay={0.1}
        >
          {plans.map((plan) => (
            <StaggerItem key={plan.name} className="h-full">
              <div
                className={`card-soft relative flex h-full flex-col p-8 ${
                  plan.highlighted
                    ? "ring-primary/40 shadow-card-hover lg:-translate-y-3"
                    : ""
                }`}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 rounded-full bg-primary px-4 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-white">
                    Most popular
                    <EqualizerBars
                      bars={3}
                      height={10}
                      barClassName="bg-white"
                    />
                  </span>
                )}

                <h3 className="font-display text-lg font-bold text-white">
                  {plan.name}
                </h3>
                <p className="mt-1 text-sm text-slate-400">{plan.tagline}</p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="font-mono text-5xl font-bold tracking-tight text-white">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="font-mono text-sm text-muted">
                      {plan.period}
                    </span>
                  )}
                </div>
                {plan.priceCaption && (
                  <p className="mt-2 font-mono text-[11px] text-muted">
                    {plan.priceCaption}
                  </p>
                )}

                <ul className="mt-8 flex-1 space-y-3.5">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm leading-relaxed text-slate-400"
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href={plan.href}
                  className={`mt-8 w-full justify-center ${
                    plan.highlighted ? "btn-primary" : "btn-secondary"
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.2} className="mt-10 text-center">
          <p className="font-mono text-xs text-muted">
            Free trial &middot; Card saved, no charge until it ends &middot; Cancel anytime
          </p>
        </Reveal>
      </div>
    </section>
  );
}
