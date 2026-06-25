import {
  Wrench,
  Stethoscope,
  Scissors,
  Home,
  Scale,
  BellRing,
} from "lucide-react";

const industries = [
  { label: "Trades", icon: Wrench },
  { label: "Clinics", icon: Stethoscope },
  { label: "Salons", icon: Scissors },
  { label: "Real estate", icon: Home },
  { label: "Legal", icon: Scale },
  { label: "Hospitality", icon: BellRing },
];

export function TrustBar() {
  return (
    <section
      className="border-y border-white/10 bg-base py-12"
      aria-label="Built for businesses that live on the phone"
    >
      <div className="container-site">
        <p className="mb-8 text-center font-mono text-[0.7rem] uppercase tracking-[0.3em] text-muted">
          Built for businesses that live on the phone
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {industries.map(({ label, icon: Icon }) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-slate-300"
            >
              <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
