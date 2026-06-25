"use client";

import { useState } from "react";

type Plan = {
  name: string;
  tag: string;
  tagAccent?: boolean;
  blurb: string;
  monthly: string;
  annual?: string;
  priceNote: string;
  features: string[];
  cta: string;
  primary?: boolean;
  popular?: boolean;
};

const PLANS: Plan[] = [
  {
    name: "Starter",
    tag: "For pilots",
    blurb: "Test the waters with one agent.",
    monthly: "$49",
    annual: "$39",
    priceNote: "1,000 minutes included · then $0.20/min",
    features: ["1 voice agent", "22+ standard voices", "5 integrations", "Call transcripts & analytics", "Email support"],
    cta: "Start free trial",
  },
  {
    name: "Growth",
    tag: "For teams",
    tagAccent: true,
    blurb: "Scale voice across your operation.",
    monthly: "$199",
    annual: "$159",
    priceNote: "10,000 minutes included · then $0.14/min",
    features: [
      "Unlimited voice agents",
      "Custom voice cloning",
      "All 22+ languages",
      "Unlimited integrations",
      "Advanced analytics & webhooks",
      "Priority support · 99.9% SLA",
    ],
    cta: "Book a demo",
    primary: true,
    popular: true,
  },
  {
    name: "Enterprise",
    tag: "Custom",
    blurb: "For regulated, high-volume deployments.",
    monthly: "Custom",
    priceNote: "Volume pricing · dedicated infrastructure",
    features: [
      "Dedicated capacity & VPC",
      "Custom model fine-tuning",
      "HIPAA, SOC 2, PCI compliance",
      "Dedicated solutions engineer",
      "99.99% uptime SLA",
      "On-prem deployment option",
    ],
    cta: "Contact sales",
  },
];

export function Pricing() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  return (
    <section id="pricing" className="relative py-28 lg:py-36 z-10 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <span className="eyebrow mb-5 justify-center" style={{ display: "inline-flex" }}>
            Pricing
          </span>
          <h2 className="font-display text-5xl lg:text-7xl font-light tracking-tight leading-[1] mt-4">
            Pay for minutes,
            <br />
            <span className="font-italic accent-text">not seats.</span>
          </h2>
          <p className="mt-6 text-lg text-[var(--text-muted)]">
            No setup fees. No per-seat licenses. No minimum commitments. Cancel anytime.
          </p>

          <div className="billing-toggle mt-8" role="tablist">
            <button className={billing === "monthly" ? "active" : ""} onClick={() => setBilling("monthly")}>
              Monthly
            </button>
            <button className={billing === "annual" ? "active" : ""} onClick={() => setBilling("annual")}>
              Annual <span className="text-[var(--accent)]">−22%</span>
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {PLANS.map((p) => (
            <div
              key={p.name}
              className="glass rounded-3xl p-8 reveal relative overflow-hidden transition hover:border-[var(--border-strong)]"
              style={
                p.popular
                  ? {
                      background: "linear-gradient(180deg, rgba(44,118,237,0.07), rgba(44,118,237,0.01))",
                      borderColor: "rgba(44,118,237,0.3)",
                    }
                  : undefined
              }
            >
              {p.popular && (
                <div className="absolute top-0 right-0 px-3 py-1 bg-[var(--accent)] text-black text-[10px] font-semibold uppercase tracking-wider rounded-bl-xl">
                  Most popular
                </div>
              )}

              <div className="flex items-baseline justify-between mb-2">
                <h3 className="font-display text-2xl font-medium">{p.name}</h3>
                <span className={`text-xs ${p.tagAccent ? "text-[var(--accent)]" : "text-[var(--text-muted)]"}`}>
                  {p.tag}
                </span>
              </div>
              <p className="text-sm text-[var(--text-muted)] mb-6">{p.blurb}</p>

              <div className="mb-2">
                <span className="font-display text-5xl font-light text-white">
                  {p.annual ? (billing === "monthly" ? p.monthly : p.annual) : p.monthly}
                </span>
                {p.annual && <span className="text-sm text-[var(--text-muted)]">/month</span>}
              </div>
              <div className="text-xs text-[var(--text-muted)] mb-6">{p.priceNote}</div>

              <ul className="space-y-3 mb-8 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <i className="fa-solid fa-check text-[var(--accent)] text-xs mt-1"></i>
                    <span className="text-[var(--text-muted)]">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#cta"
                className={`${p.primary ? "btn-primary" : "btn-ghost"} w-full block text-center py-3 rounded-full text-sm ${p.primary ? "" : "font-medium"}`}
              >
                {p.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
