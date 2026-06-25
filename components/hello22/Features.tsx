const BIG_CARD_CHECKS = [
  "Sub-220ms response latency",
  "Barge-in & mid-sentence correction",
  "Emotion & sentiment detection",
  "Background noise resilience",
  "Multi-turn context retention",
];

const EQ_BARS = [
  { h: "60%", d: "0s" },
  { h: "90%", d: "0.2s" },
  { h: "100%", d: "0.4s" },
  { h: "70%", d: "0.1s" },
  { h: "85%", d: "0.3s" },
];

export function Features() {
  return (
    <section id="features" className="relative py-28 lg:py-36 z-10 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-3xl mb-20 reveal">
          <span className="eyebrow mb-5">The platform</span>
          <h2 className="font-display text-5xl lg:text-7xl font-light tracking-tight leading-[1] mt-4">
            Everything you need to
            <br />
            <span className="font-italic accent-text">talk to everyone.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Big card */}
          <div className="feature-card glass rounded-3xl p-8 lg:col-span-2 lg:row-span-2 relative overflow-hidden reveal">
            <div className="absolute top-6 right-6 flex items-end gap-[3px] h-12">
              {EQ_BARS.map((b, i) => (
                <div
                  key={i}
                  className="w-1 bg-[var(--accent)] eq-bar rounded-full"
                  style={{ height: b.h, animationDelay: b.d }}
                ></div>
              ))}
            </div>

            <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center mb-6">
              <i className="fa-solid fa-wave-square text-[var(--accent)] text-lg"></i>
            </div>
            <h3 className="font-display text-3xl font-medium mb-4">Conversational, not scripted</h3>
            <p className="text-[var(--text-muted)] leading-relaxed max-w-md mb-6">
              hello22 agents handle interruptions, corrections, and tangents the way humans do. They pick up emotional
              cues, ask clarifying questions, and remember context across the entire call.
            </p>

            <div className="space-y-2.5">
              {BIG_CARD_CHECKS.map((c) => (
                <div key={c} className="flex items-center gap-3 text-sm">
                  <i className="fa-solid fa-check text-[var(--accent)] text-xs"></i>
                  <span className="text-[var(--text-muted)]">{c}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="feature-card glass rounded-3xl p-8 reveal">
            <div className="w-12 h-12 rounded-xl bg-[var(--lime)]/10 flex items-center justify-center mb-6">
              <i className="fa-solid fa-clone text-[var(--lime)] text-lg"></i>
            </div>
            <h3 className="font-display text-xl font-medium mb-3">Voice cloning</h3>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              Clone any voice from 30 seconds of audio. Use your CEO, your brand voice, or pick from 22+ studio voices.
            </p>
          </div>

          <div className="feature-card glass rounded-3xl p-8 reveal">
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6">
              <i className="fa-solid fa-globe text-white text-lg"></i>
            </div>
            <h3 className="font-display text-xl font-medium mb-3">22+ languages</h3>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              Native-quality speech in English, Spanish, Mandarin, Japanese, Hindi, Arabic, Portuguese, and more.
            </p>
          </div>

          <div className="feature-card glass rounded-3xl p-8 reveal">
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6">
              <i className="fa-solid fa-plug text-white text-lg"></i>
            </div>
            <h3 className="font-display text-xl font-medium mb-3">Function calling</h3>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              Agents call your APIs live during conversation — book, query, update, refund — without scripts.
            </p>
          </div>

          <div className="feature-card glass rounded-3xl p-8 reveal">
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6">
              <i className="fa-solid fa-shield-halved text-white text-lg"></i>
            </div>
            <h3 className="font-display text-xl font-medium mb-3">Enterprise security</h3>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              SOC 2 Type II, HIPAA, GDPR, and PCI compliant. End-to-end encrypted by default.
            </p>
          </div>

          <div className="feature-card glass rounded-3xl p-8 lg:col-span-2 reveal">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center shrink-0">
                <i className="fa-solid fa-chart-line text-[var(--accent)] text-lg"></i>
              </div>
              <div className="flex-1">
                <h3 className="font-display text-xl font-medium mb-3">Call analytics &amp; transcripts</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-5">
                  Every call transcribed, tagged, and analyzed. Filter by outcome, sentiment, intent, or custom fields.
                  Drill into any conversation in seconds.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Transcripts", "Sentiment", "Intent tags", "Webhooks", "Custom dashboards"].map((t) => (
                    <span
                      key={t}
                      className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 text-[var(--text-muted)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
