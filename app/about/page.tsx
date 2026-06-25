import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeartHandshake, ShieldCheck, Store, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about hello22 — the team building an AI receptionist that answers business calls 24/7, books appointments, and captures every lead.",
};

const values = [
  {
    icon: HeartHandshake,
    title: "Human-first AI",
    description:
      "Our AI is designed to sound warm, helpful, and natural — and to hand off to a real person whenever that's the right call. Technology should serve the conversation, not get in its way.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy by default",
    description:
      "Call recordings, transcripts, and customer details are encrypted, access-controlled, and never sold. We collect only what's needed to serve your callers well.",
  },
  {
    icon: Store,
    title: "Built for small business",
    description:
      "No enterprise contracts, no call-center complexity. hello22 is priced and designed for the businesses that feel every missed call the most.",
  },
  {
    icon: TrendingUp,
    title: "Always improving",
    description:
      "Every conversation makes the system better. We ship improvements continuously so your receptionist gets sharper at handling your callers over time.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-36 pb-24">
        <section className="container-site">
          <div className="max-w-3xl">
            <span className="eyebrow">About hello22</span>
            <h1 className="heading-xl text-white">
              No business should lose a customer to a{" "}
              <span className="text-primary">missed call</span>.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-400">
              That&apos;s the conviction hello22 was built on. Every day,
              plumbers, dentists, salons, law firms, and contractors lose real
              revenue because a call rang out while they were busy doing the
              actual work. We think that&apos;s a solvable problem.
            </p>
          </div>

          <div className="mt-16 grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold text-white">Our story</h2>
              <p className="mt-4 leading-relaxed text-slate-400">
                hello22 started after watching a family-run service business
                miss call after call during its busiest season — each one a
                customer who simply dialed the next name on the list. Hiring a
                full-time receptionist wasn&apos;t realistic. Voicemail
                wasn&apos;t working. So we built something better.
              </p>
              <p className="mt-4 leading-relaxed text-slate-400">
                Today, our AI receptionist answers calls for businesses around
                the clock — greeting callers by your business name, answering
                their questions, and making sure no opportunity slips away at
                2 PM or 2 AM.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white">
                What we build
              </h2>
              <p className="mt-4 leading-relaxed text-slate-400">
                An AI receptionist that answers every business call 24/7,
                books appointments directly into your calendar, captures lead
                details accurately, and sends you clean transcripts and
                summaries of every conversation.
              </p>
              <p className="mt-4 leading-relaxed text-slate-400">
                It sets up in minutes, speaks naturally, follows your
                instructions, and costs a fraction of a single missed job. No
                hardware, no new phone number required, no scripts to write.
              </p>
            </div>
          </div>
        </section>

        <section className="container-site mt-20">
          <span className="eyebrow">What we stand for</span>
          <h2 className="heading-lg text-white">Our values</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-card ring-1 ring-white/[0.08] rounded-[20px] p-8"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <value.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="container-site mt-20">
          <div className="bg-card ring-1 ring-white/[0.08] rounded-[20px] px-8 py-12 text-center sm:px-12">
            <h2 className="heading-lg text-white">
              Ready to stop missing calls?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-400">
              Book a free consultation and hear what your AI receptionist
              could sound like — answering for your business, in minutes.
            </p>
            <a href="/#consultation" className="btn-primary mt-8">
              Get Free Consultation
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
