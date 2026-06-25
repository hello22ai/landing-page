"use client";

import { useState } from "react";

type UseCase = {
  title: string;
  headline: string;
  desc: string;
  stats: { label: string; value: string }[];
  tags: string[];
};

const DATA: UseCase[] = [
  {
    title: "Healthcare",
    headline: "Front-desk automation patients actually trust.",
    desc: "Appointment scheduling, triage intake, prescription refills, and post-visit follow-ups — fully HIPAA compliant, 24/7. hello22 integrates with Epic, Cerner, and Athena.",
    stats: [
      { label: "Avg call duration", value: "2m 18s" },
      { label: "Booking conversion", value: "87%" },
      { label: "Patient CSAT", value: "4.8/5" },
    ],
    tags: ["HIPAA", "EHR integration", "Multi-provider", "Insurance verification", "Telehealth routing", "Rx refills"],
  },
  {
    title: "E-commerce",
    headline: "Turn every support call into a retention moment.",
    desc: "Order tracking, returns, product questions, refund processing — all handled live without putting customers on hold. Integrates with Shopify, Stripe, and your fulfillment stack.",
    stats: [
      { label: "Self-serve resolution", value: "84%" },
      { label: "Avg handle time", value: "1m 52s" },
      { label: "CSAT score", value: "4.7/5" },
    ],
    tags: ["Shopify", "Order tracking", "Returns & RMA", "Product recs", "Loyalty programs", "Refund processing"],
  },
  {
    title: "Real estate",
    headline: "Never miss a lead — even at 2 AM.",
    desc: "Property inquiries, tour booking, mortgage pre-qualification, agent routing. hello22 captures every lead and books tours directly into your calendar.",
    stats: [
      { label: "Lead capture rate", value: "96%" },
      { label: "Tour conversion", value: "34%" },
      { label: "After-hours leads", value: "+42%" },
    ],
    tags: ["MLS sync", "Tour booking", "Lead qualification", "Property Q&A", "Agent routing", "CRM sync"],
  },
  {
    title: "Hospitality",
    headline: "A 24/7 concierge that knows your property.",
    desc: "Reservations, room service, amenity questions, local recommendations, and guest complaints — all with the warmth of your best front-desk agent.",
    stats: [
      { label: "Booking rate", value: "73%" },
      { label: "Avg handle time", value: "2m 04s" },
      { label: "Guest CSAT", value: "4.9/5" },
    ],
    tags: ["PMS integration", "Reservations", "Concierge", "Multi-property", "Loyalty program", "Group bookings"],
  },
  {
    title: "Financial services",
    headline: "Compliant voice automation for sensitive calls.",
    desc: "Account inquiries, fraud alerts, payment reminders, and collections — PCI-DSS compliant with full audit trails and seamless human handoff.",
    stats: [
      { label: "Containment rate", value: "79%" },
      { label: "Compliance score", value: "100%" },
      { label: "Cost per call", value: "−72%" },
    ],
    tags: ["PCI-DSS", "Fraud detection", "Payments", "Account verification", "Collections", "Human handoff"],
  },
  {
    title: "Logistics",
    headline: "Coordinate drivers, dispatch, and customers in real time.",
    desc: "Delivery confirmations, address changes, ETA inquiries, dispatch coordination — hello22 handles thousands of simultaneous calls without breaking a sweat.",
    stats: [
      { label: "Calls per hour", value: "12,000+" },
      { label: "Resolution rate", value: "92%" },
      { label: "On-time delivery", value: "+18%" },
    ],
    tags: ["TMS integration", "Dispatch routing", "ETA updates", "Address changes", "POD capture", "Driver coordination"],
  },
];

export function UseCases() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="usecases" className="relative py-28 lg:py-36 z-10 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-3xl mb-16 reveal">
          <span className="eyebrow mb-5">Use cases</span>
          <h2 className="font-display text-5xl lg:text-7xl font-light tracking-tight leading-[1] mt-4">
            Built for every
            <br />
            <span className="font-italic accent-text">voice touchpoint.</span>
          </h2>
        </div>

        <div className="space-y-3 reveal">
          {DATA.map((d, i) => (
            <div key={d.title} className={`uc-item glass rounded-2xl overflow-hidden ${openIdx === i ? "open" : ""}`}>
              <button
                className="w-full flex items-center justify-between p-6 lg:p-7 text-left"
                onClick={() => setOpenIdx((cur) => (cur === i ? null : i))}
              >
                <div className="flex items-center gap-5">
                  <span className="font-display text-3xl lg:text-4xl font-light text-[var(--text-dim)]">
                    0{i + 1}
                  </span>
                  <h3 className="font-display text-2xl lg:text-3xl font-medium">{d.title}</h3>
                </div>
                <div className="flex items-center gap-4">
                  <span className="hidden md:block text-sm text-[var(--text-muted)]">
                    {d.stats[0].value} {d.stats[0].label}
                  </span>
                  <i className="fa-solid fa-chevron-down uc-chevron text-[var(--text-muted)]"></i>
                </div>
              </button>
              <div className="uc-item-content">
                <div className="px-6 lg:px-7 pb-7 pt-0">
                  <div className="lg:pl-16">
                    <h4 className="font-display text-2xl lg:text-3xl font-light italic text-[var(--accent-soft)] mb-4">
                      {d.headline}
                    </h4>
                    <p className="text-[var(--text-muted)] leading-relaxed mb-6 max-w-3xl">{d.desc}</p>

                    <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-[var(--border)] max-w-2xl">
                      {d.stats.map((s) => (
                        <div key={s.label}>
                          <div className="font-display text-2xl lg:text-3xl font-light text-white">{s.value}</div>
                          <div className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] mt-1">
                            {s.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {d.tags.map((t) => (
                        <span
                          key={t}
                          className="text-xs px-3 py-1.5 rounded-full bg-white/[0.04] border border-[var(--border)] text-[var(--text-muted)]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
