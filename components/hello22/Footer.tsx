import { Logo } from "./Logo";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Platform", href: "#features" },
      { label: "Voices", href: "#voices" },
      { label: "Voice cloning", href: "#" },
      { label: "Telephony", href: "#" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Healthcare", href: "#usecases" },
      { label: "E-commerce", href: "#usecases" },
      { label: "Real estate", href: "#usecases" },
      { label: "Hospitality", href: "#usecases" },
      { label: "Financial", href: "#usecases" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "Documentation", href: "#" },
      { label: "API reference", href: "#" },
      { label: "SDKs", href: "#" },
      { label: "Webhooks", href: "#" },
      { label: "System status", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Press", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
];

const SOCIALS = [
  { icon: "fa-x-twitter", label: "Twitter" },
  { icon: "fa-linkedin-in", label: "LinkedIn" },
  { icon: "fa-github", label: "GitHub" },
  { icon: "fa-youtube", label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-[var(--border)] bg-[var(--bg-soft)] py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-4">
            <a href="#" className="flex items-center mb-6" aria-label="hello22.ai home">
              <Logo height={48} />
            </a>

            <p className="text-[var(--text-muted)] text-sm leading-relaxed max-w-sm mb-6">
              AI voice agents that sound unmistakably human. Built for teams that take every call seriously.
            </p>
            <div className="flex items-center gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  className="w-9 h-9 rounded-full glass flex items-center justify-center hover:bg-white/5 transition"
                  aria-label={s.label}
                >
                  <i className={`fa-brands ${s.icon} text-xs`}></i>
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <div className="text-xs uppercase tracking-wider text-[var(--text-dim)] mb-4">{col.title}</div>
              <ul className="space-y-3 text-sm">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-[var(--text-muted)] hover:text-white transition">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="divider mb-8"></div>

        <div className="flex flex-wrap items-center justify-between gap-6 text-xs text-[var(--text-dim)]">
          <div>© 2025 hello22, Inc. All rights reserved.</div>
          <div className="flex flex-wrap gap-6">
            {["Privacy", "Terms", "Security", "DPA", "Cookie settings"].map((l) => (
              <a key={l} href="#" className="hover:text-white transition">
                {l}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="live-dot w-1.5 h-1.5 rounded-full bg-[var(--lime)]"></span>
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}
