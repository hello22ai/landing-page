"use client";

import { useEffect, useRef, useState } from "react";

function Counter({
  target,
  suffix,
  accent,
}: {
  target: number;
  suffix: string;
  accent?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [text, setText] = useState("0");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const isDecimal = target % 1 !== 0;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const duration = 2000;
            const start = performance.now();
            const tick = (now: number) => {
              const t = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - t, 3);
              const val = target * eased;
              setText((isDecimal ? val.toFixed(1) : Math.round(val).toString()) + suffix);
              if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, suffix]);

  return (
    <div ref={ref} className={`stat-num text-7xl lg:text-8xl ${accent ? "accent-text" : "text-white"}`}>
      {text}
    </div>
  );
}

const STATS = [
  { target: 22, suffix: "M+", label: "Calls per month" },
  { target: 92, suffix: "%", label: "Resolution rate", accent: true },
  { target: 220, suffix: "ms", label: "Median latency" },
  { target: 78, suffix: "%", label: "Cost reduction" },
];

const TESTIMONIALS = [
  {
    quote:
      "hello22 replaced our entire night-shift call center. Within three weeks it was outperforming human agents on booking conversion. The voice is indistinguishable.",
    initials: "DR",
    avatar: "from-[var(--accent)] to-[#1b56b8]",
    textColor: "text-white",
    name: "Dr. Rachel Okonkwo",
    role: "COO, Northwind Health",
  },
  {
    quote:
      "We integrated hello22 with Salesforce in an afternoon. It now handles 4,000 inbound leads a month without us touching it. ROI in week one.",
    initials: "JM",
    avatar: "from-[var(--amber)] to-[#c47e00]",
    textColor: "text-white",
    name: "James Mireles",
    role: "VP Sales, Vertex Auto Group",
  },
  {
    quote:
      "Customers genuinely can't tell they're talking to AI. The barge-in handling is the closest thing to magic I've seen in a decade of CX work.",
    initials: "SK",
    avatar: "from-[var(--lime)] to-[#7ab800]",
    textColor: "text-black",
    name: "Sofia Kowalski",
    role: "Head of CX, Mercato",
  },
];

export function Stats() {
  return (
    <section className="relative py-28 lg:py-36 z-10 border-t border-[var(--border)] overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-50"></div>
      <div
        className="orb"
        style={{
          width: "600px",
          height: "600px",
          background: "rgba(44,118,237,0.1)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
        <div className="text-center max-w-3xl mx-auto mb-20 reveal">
          <span className="eyebrow mb-5 justify-center" style={{ display: "inline-flex" }}>
            By the numbers
          </span>
          <h2 className="font-display text-5xl lg:text-7xl font-light tracking-tight leading-[1] mt-4">
            Talking at <span className="font-italic accent-text">production scale.</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 mb-24">
          {STATS.map((s) => (
            <div key={s.label} className="text-center reveal">
              <Counter target={s.target} suffix={s.suffix} accent={s.accent} />
              <div className="text-xs uppercase tracking-wider text-[var(--text-muted)] mt-3">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 reveal">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="glass rounded-2xl p-7">
              <i className="fa-solid fa-quote-left text-[var(--accent)] text-2xl mb-4"></i>
              <p className="text-[var(--text)] leading-relaxed mb-6">&quot;{t.quote}&quot;</p>
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.avatar} flex items-center justify-center font-medium ${t.textColor} text-sm`}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-medium">{t.name}</div>
                  <div className="text-xs text-[var(--text-muted)]">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
