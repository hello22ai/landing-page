const INTEGRATIONS = [
  { icon: "fa-brands fa-google", label: "Google Calendar" },
  { icon: "fa-brands fa-salesforce", label: "Salesforce" },
  { icon: "fa-brands fa-hubspot", label: "HubSpot" },
  { icon: "fa-brands fa-slack", label: "Slack" },
  { icon: "fa-brands fa-shopify", label: "Shopify" },
  { icon: "fa-brands fa-stripe-s", label: "Stripe" },
  { icon: "fa-brands fa-twilio", label: "Twilio" },
  { icon: "fa-brands fa-zapier", label: "Zapier" },
  { icon: "fa-brands fa-intercom", label: "Intercom" },
  { icon: "fa-brands fa-figma", label: "Notion" },
  { icon: "fa-brands fa-aws", label: "AWS" },
  { icon: "fa-solid fa-plus", label: "220+ more", muted: true },
];

export function Integrations() {
  return (
    <section className="relative py-28 lg:py-36 z-10 border-t border-[var(--border)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-6 reveal">
            <span className="eyebrow mb-5">Integrations</span>
            <h2 className="font-display text-5xl lg:text-7xl font-light tracking-tight leading-[1] mt-4">
              Connects to your
              <br />
              <span className="font-italic accent-text">whole stack.</span>
            </h2>
          </div>
          <div className="lg:col-span-6 flex items-end reveal">
            <p className="text-[var(--text-muted)] text-lg leading-relaxed">
              220+ native integrations and a REST API for everything else. Your agent can query any system, trigger any
              workflow, and update any record — live during the call.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 reveal">
          {INTEGRATIONS.map((it) => (
            <div
              key={it.label}
              className="glass rounded-2xl p-6 flex flex-col items-center justify-center gap-3 aspect-square hover:border-[var(--border-strong)] transition"
            >
              <i className={`${it.icon} text-3xl ${it.muted ? "text-[var(--text-muted)]" : "text-[var(--accent)]"}`}></i>
              <span className="text-xs text-[var(--text-muted)]">{it.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
