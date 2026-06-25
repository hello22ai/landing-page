import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "How it works", href: "/#how-it-works" },
    { label: "Voices", href: "/#voices" },
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Sign in", href: "#" },
  ],
  Solutions: [
    { label: "Trades", href: "/#use-cases" },
    { label: "Clinics", href: "/#use-cases" },
    { label: "Salons", href: "/#use-cases" },
    { label: "Real estate", href: "/#use-cases" },
    { label: "Hospitality", href: "/#use-cases" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Blog", href: "#" },
  ],
  Legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Security", href: "#" },
  ],
};

const socials = [
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy" aria-label="Footer">
      <div className="container-site py-16">
        <div className="grid gap-12 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <a href="/" className="inline-flex items-center" aria-label="hello22 home">
              <img
                src="/images/hello22-logo-white.svg"
                alt="hello22"
                className="h-9 w-auto"
              />
            </a>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
              A 24/7 AI voice receptionist that turns missed calls into booked
              jobs.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition-all duration-300 hover:border-accent/50 hover:text-accent"
                >
                  <social.icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([heading, links]) => (
            <nav key={heading} aria-label={heading}>
              <h3 className="font-mono text-xs uppercase tracking-wider text-slate-500">
                {heading}
              </h3>
              <ul className="mt-5 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm text-slate-500">
            © 2026 hello22.ai · All rights reserved
          </p>
          <p className="text-sm text-slate-500">
            Never miss another customer call.
          </p>
        </div>
      </div>
    </footer>
  );
}
