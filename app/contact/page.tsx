import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Mail, Phone, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with hello22. Email us, call us (our AI receptionist will answer), or book a free consultation — we're available 24/7.",
};

const contactCards = [
  {
    icon: Mail,
    title: "Email",
    value: "hello@hello22.ai",
    href: "mailto:hello@hello22.ai",
    note: "We reply within one business day.",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+1 (555) 022-2222",
    href: "tel:+15550222222",
    note: "Call us — our AI receptionist will answer 😉",
  },
  {
    icon: Clock,
    title: "Hours",
    value: "24/7",
    href: null,
    note: "Always on. Just like your receptionist.",
  },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-36 pb-24">
        <section className="container-site">
          <div className="max-w-3xl">
            <span className="eyebrow">Contact</span>
            <h1 className="heading-xl text-white">
              Let&apos;s <span className="text-primary">talk</span>.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-400">
              Questions about pricing, setup, or whether hello22 fits your
              business? Reach out any way you like — and yes, if you call,
              you&apos;ll be talking to the product itself.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {contactCards.map((card) => (
              <div
                key={card.title}
                className="bg-card ring-1 ring-white/[0.08] rounded-[20px] p-8"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <card.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h2 className="mt-5 text-lg font-semibold text-white">
                  {card.title}
                </h2>
                {card.href ? (
                  <a
                    href={card.href}
                    className="mt-2 block font-mono text-sm text-primary transition-colors hover:text-white"
                  >
                    {card.value}
                  </a>
                ) : (
                  <p className="mt-2 font-mono text-sm text-primary">
                    {card.value}
                  </p>
                )}
                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  {card.note}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-card ring-1 ring-white/[0.08] rounded-[20px] px-8 py-12 text-center sm:px-12">
            <h2 className="heading-lg text-white">
              Prefer a guided walkthrough?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-400">
              Fill out our consultation form and we&apos;ll set up a free,
              no-pressure demo of your AI receptionist answering calls for
              your business.
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
