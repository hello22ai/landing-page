import {
  Clock,
  Zap,
  UserPlus,
  CalendarCheck,
  TrendingUp,
  ShieldCheck,
  Headset,
  Star,
} from "lucide-react";

const trustItems = [
  { icon: Clock, label: "24/7 Availability" },
  { icon: Zap, label: "Instant Response" },
  { icon: UserPlus, label: "Lead Capture" },
  { icon: CalendarCheck, label: "Appointment Booking" },
  { icon: TrendingUp, label: "Business Growth" },
  { icon: ShieldCheck, label: "Private & Secure" },
  { icon: Headset, label: "Natural Conversations" },
  { icon: Star, label: "Professional Greeting" },
];

export function TrustBar() {
  return (
    <section
      className="border-b border-white/10 bg-navy py-7"
      aria-label="Key capabilities"
    >
      <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-4 hover:[animation-play-state:paused]">
          {[...trustItems, ...trustItems].map((item, i) => (
            <span
              key={`${item.label}-${i}`}
              className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-6 py-3"
              aria-hidden={i >= trustItems.length}
            >
              <item.icon className="h-4 w-4 text-accent" aria-hidden="true" />
              <span className="whitespace-nowrap text-sm font-medium text-slate-300">
                {item.label}
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
