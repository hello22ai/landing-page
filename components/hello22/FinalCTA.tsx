const EQ = [
  { h: "50%", d: "0s" },
  { h: "100%", d: "0.2s" },
  { h: "70%", d: "0.4s" },
  { h: "90%", d: "0.1s" },
];

const PROOF = ["No credit card", "1,000 free minutes", "22-minute setup", "SOC 2 compliant"];

export function FinalCTA() {
  return (
    <section id="cta" className="relative py-28 lg:py-44 z-10 border-t border-[var(--border)] overflow-hidden">
      <div
        className="orb"
        style={{
          width: "800px",
          height: "800px",
          background: "rgba(44,118,237,0.15)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      ></div>

      <div className="max-w-5xl mx-auto px-6 lg:px-10 relative text-center reveal">
        <div className="relative w-28 h-28 mx-auto mb-10 breathe">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--accent)] to-[#1b56b8] blur-md opacity-50"></div>
          <div className="absolute inset-1 rounded-full bg-gradient-to-br from-[var(--accent)] to-[#1b56b8]"></div>
          <div className="absolute inset-3 rounded-full bg-[#0c0b09] flex items-center justify-center">
            <div className="flex items-end gap-1 h-8">
              {EQ.map((b, i) => (
                <div
                  key={i}
                  className="w-1 bg-[var(--accent)] eq-bar rounded-full"
                  style={{ height: b.h, animationDelay: b.d }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        <h2 className="font-display text-6xl lg:text-8xl font-light tracking-tight leading-[0.95]">
          <span className="font-italic">say</span> hello<span className="accent-text">.</span>
        </h2>
        <p className="font-display text-3xl lg:text-4xl font-light tracking-tight mt-6">to your new voice agent.</p>

        <p className="mt-8 text-xl text-[var(--text-muted)] max-w-2xl mx-auto">
          Deploy your first AI voice agent in 22 minutes. 1,000 free minutes — no credit card required.
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <a href="#" className="btn-primary px-8 py-4 rounded-full text-sm flex items-center gap-2.5">
            Start free trial
            <i className="fa-solid fa-arrow-right text-xs"></i>
          </a>
          <a href="#" className="btn-ghost px-8 py-4 rounded-full text-sm font-medium flex items-center gap-2.5">
            <i className="fa-solid fa-calendar text-xs"></i>
            Book a 22-min demo
          </a>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-[var(--text-dim)]">
          {PROOF.map((p) => (
            <span key={p} className="flex items-center gap-2">
              <i className="fa-solid fa-check text-[var(--accent)]"></i> {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
