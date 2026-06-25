export function HowItWorks() {
  return (
    <section id="platform" className="relative py-28 lg:py-36 z-10 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10 mb-20">
          <div className="lg:col-span-7 reveal">
            <span className="eyebrow mb-5">How it works</span>
            <h2 className="font-display text-5xl lg:text-7xl font-light tracking-tight leading-[1] mt-4">
              From signup to first call
              <br />
              in <span className="font-italic accent-text">22 minutes.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 flex items-end reveal">
            <p className="text-[var(--text-muted)] text-lg leading-relaxed">
              No telephony code. No state machines. No flowcharts. Just describe what your agent should do — hello22
              handles the rest.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-[var(--border)] rounded-3xl overflow-hidden">
          {/* 01 */}
          <div className="bg-[var(--bg)] p-10 reveal relative">
            <div className="flex items-baseline gap-4 mb-6">
              <span className="font-display text-6xl font-light accent-text">01</span>
              <span className="text-xs uppercase tracking-wider text-[var(--text-dim)]">Describe</span>
            </div>
            <h3 className="font-display text-2xl font-medium mb-4">Tell your agent what to do</h3>
            <p className="text-[var(--text-muted)] leading-relaxed mb-6 text-sm">
              Write a natural-language prompt. Define goals, tone, and guardrails. No flowcharts, no decision trees.
            </p>
            <div className="bg-black/40 rounded-xl p-4 border border-[var(--border)] text-xs leading-relaxed text-[var(--text-muted)] font-mono">
              <span className="text-[var(--accent)]">prompt:</span> &quot;You&apos;re the front desk at Acme Dental.
              Book cleanings, answer FAQs, transfer emergencies to Dr. Patel. Be warm, concise.&quot;
            </div>
          </div>

          {/* 02 */}
          <div className="bg-[var(--bg)] p-10 reveal relative">
            <div className="flex items-baseline gap-4 mb-6">
              <span className="font-display text-6xl font-light accent-text">02</span>
              <span className="text-xs uppercase tracking-wider text-[var(--text-dim)]">Connect</span>
            </div>
            <h3 className="font-display text-2xl font-medium mb-4">Hook up your tools</h3>
            <p className="text-[var(--text-muted)] leading-relaxed mb-6 text-sm">
              Point the agent at your calendar, CRM, knowledge base, and APIs. It learns to call them automatically
              mid-conversation.
            </p>
            <div className="space-y-2">
              {[
                { icon: "fa-brands fa-google", label: "Google Calendar" },
                { icon: "fa-solid fa-database", label: "Salesforce CRM" },
                { icon: "fa-solid fa-book", label: "Notion KB" },
              ].map((t) => (
                <div
                  key={t.label}
                  className="flex items-center gap-3 bg-black/40 rounded-lg px-3 py-2 border border-[var(--border)]"
                >
                  <i className={`${t.icon} text-[var(--text-muted)] text-xs`}></i>
                  <span className="text-xs text-white">{t.label}</span>
                  <i className="fa-solid fa-check text-[var(--lime)] text-[10px] ml-auto"></i>
                </div>
              ))}
            </div>
          </div>

          {/* 03 */}
          <div className="bg-[var(--bg)] p-10 reveal relative">
            <div className="flex items-baseline gap-4 mb-6">
              <span className="font-display text-6xl font-light accent-text">03</span>
              <span className="text-xs uppercase tracking-wider text-[var(--text-dim)]">Launch</span>
            </div>
            <h3 className="font-display text-2xl font-medium mb-4">Pick a number &amp; go live</h3>
            <p className="text-[var(--text-muted)] leading-relaxed mb-6 text-sm">
              Port your existing number or get a new one in 22 seconds. Route inbound, run outbound campaigns, or embed
              voice in your app.
            </p>
            <div className="bg-black/40 rounded-xl p-4 border border-[var(--border)]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-white font-mono">+1 (415) 555-0142</span>
                <span className="text-[10px] text-[var(--lime)] flex items-center gap-1">
                  <span className="live-dot w-1 h-1 rounded-full bg-[var(--lime)]"></span>
                  ACTIVE
                </span>
              </div>
              <div className="h-1 bg-[var(--surface-2)] rounded-full overflow-hidden">
                <div className="h-full bg-[var(--accent)] rounded-full shimmer" style={{ width: "100%" }}></div>
              </div>
              <div className="mt-2 text-[10px] text-[var(--text-dim)]">Calls today: 1,247 · Resolution: 92%</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
