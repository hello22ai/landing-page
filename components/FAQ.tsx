"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

const faqs = [
  {
    question: "How does the AI answer calls?",
    answer:
      "When a customer calls your business number, your AI Receptionist picks up instantly with a warm, natural-sounding greeting customized to your business. It speaks conversationally, understands what callers need, answers their questions, and guides them toward booking an appointment or leaving their details — just like a great front-desk receptionist would.",
  },
  {
    question: "Can it book appointments?",
    answer:
      "Yes. The AI Receptionist checks your real availability and books appointments directly into your calendar during the call. Customers receive instant confirmation, and you see the booking the moment it happens — no double bookings, no back-and-forth.",
  },
  {
    question: "Can it work after business hours?",
    answer:
      "Absolutely — that's one of its biggest advantages. Your AI Receptionist works 24 hours a day, 7 days a week, including weekends and holidays. Customers calling at 9 PM or on a Sunday get the same professional service as during business hours, so you capture opportunities your competitors miss.",
  },
  {
    question: "Can it transfer calls to my team?",
    answer:
      "Yes. You decide which types of calls should be transferred — urgent matters, VIP clients, or anything the AI shouldn't handle alone. Those calls are routed instantly to you or the right team member, while routine calls are handled automatically.",
  },
  {
    question: "How long does setup take?",
    answer:
      "Most businesses are up and running within a few days. We learn about your business, services, hours, and how you'd like calls handled — then configure and test everything for you. You don't need any technical knowledge, and your existing phone number stays exactly the same.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-padding bg-navy">
      <div className="container-site">
        <SectionHeading
          eyebrow="Common Questions"
          title={<>Questions, <em>all answered here.</em></>}
          description="Everything you need to know about your new AI Receptionist."
        />

        <Reveal delay={0.1} className="mx-auto mt-12 max-w-3xl">
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq.question}
                  className={`overflow-hidden rounded-[20px] ring-1 transition-all duration-300 ${
                    isOpen
                      ? "bg-card shadow-card ring-primary/30"
                      : "bg-card ring-white/[0.08] hover:ring-primary/20"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-display text-base font-bold text-white sm:text-lg">
                      {faq.question}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`shrink-0 ${isOpen ? "text-primary" : "text-slate-400"}`}
                    >
                      <ChevronDown className="h-5 w-5" aria-hidden="true" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <p className="px-6 pb-6 text-[15px] leading-relaxed text-slate-400">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
