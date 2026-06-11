import { PhoneCall, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const footerLinks = {
  Company: [
    { label: "About", href: "#" },
    { label: "Services", href: "#solution" },
    { label: "Industries", href: "#industries" },
    { label: "Contact", href: "#consultation" },
  ],
  Resources: [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "FAQ", href: "#faq" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
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
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2.5" aria-label="hello22 home">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
                <PhoneCall className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-lg font-bold text-white">hello22</span>
            </a>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
              Your 24/7 AI Receptionist — answering every call, capturing every
              lead, and booking every appointment so your business never misses
              an opportunity.
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
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                {heading}
              </h3>
              <ul className="mt-5 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-400 transition-colors hover:text-accent"
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
            © {new Date().getFullYear()} hello22. All rights reserved.
          </p>
          <p className="text-sm text-slate-500">
            Never miss another customer call.
          </p>
        </div>
      </div>
    </footer>
  );
}
