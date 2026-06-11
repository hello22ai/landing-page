"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, ShieldCheck } from "lucide-react";
import { Reveal } from "./ui/Reveal";

const businessTypes = [
  "Medical Clinic",
  "Dental Practice",
  "Immigration Consultancy",
  "Law Firm",
  "Real Estate Agency",
  "Salon / Spa",
  "Restaurant",
  "Home Services",
  "Other",
];

const callVolumes = [
  "Under 50 calls / month",
  "50 – 200 calls / month",
  "200 – 500 calls / month",
  "500 – 1,000 calls / month",
  "1,000+ calls / month",
];

export type LeadFormData = {
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  businessType: string;
  websiteUrl: string;
  callVolume: string;
  services: string;
  businessHours: string;
  requirements: string;
};

const initialFormData: LeadFormData = {
  fullName: "",
  businessName: "",
  email: "",
  phone: "",
  businessType: "",
  websiteUrl: "",
  callVolume: "",
  services: "",
  businessHours: "",
  requirements: "",
};

const inputClasses =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-navy placeholder:text-slate-400 transition-all duration-200 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10";

const selectClasses = `${inputClasses} appearance-none pr-10`;

const selectChevronStyle: React.CSSProperties = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 0.875rem center",
  backgroundSize: "1rem",
};

const labelClasses = "mb-1.5 block text-sm font-semibold text-navy";

export function LeadForm() {
  const [formData, setFormData] = useState<LeadFormData>(initialFormData);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const update = (field: keyof LeadFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    // Payload prepared for CRM/API integration — POST this to your
    // endpoint of choice (e.g. /api/leads) when ready.
    const payload = {
      ...formData,
      submittedAt: new Date().toISOString(),
      source: "landing-page-consultation-form",
    };
    console.log("Lead captured:", payload);

    await new Promise((resolve) => setTimeout(resolve, 900));
    setStatus("success");
  }

  return (
    <section id="consultation" className="section-padding relative overflow-hidden bg-navy">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-accent/15 blur-[120px]" />
      </div>

      <div className="container-site relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-accent">
            Free Consultation
          </span>
          <h2 className="heading-lg text-white">Request Your Free AI Consultation</h2>
          <p className="mt-5 text-lg text-slate-300">
            Tell us a little about your business and we&apos;ll show you exactly how an
            AI Receptionist can answer your calls, book your appointments, and grow
            your revenue.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mx-auto mt-12 max-w-3xl">
          <div className="rounded-3xl border border-white/10 bg-white p-7 shadow-2xl sm:p-10">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center py-12 text-center"
                  role="status"
                >
                  <span className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50">
                    <CheckCircle2 className="h-10 w-10 text-emerald-500" aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 text-2xl font-bold text-navy">
                    Thank You! Your Request Has Been Received
                  </h3>
                  <p className="mt-3 max-w-md text-slate-600">
                    Our team will review your details and contact you within one
                    business day to schedule your free consultation.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData(initialFormData);
                      setStatus("idle");
                    }}
                    className="mt-8 text-sm font-semibold text-primary hover:text-primary-700"
                  >
                    Submit another request
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  noValidate={false}
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="fullName" className={labelClasses}>
                        Full Name *
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="John Smith"
                        className={inputClasses}
                        value={formData.fullName}
                        onChange={update("fullName")}
                      />
                    </div>
                    <div>
                      <label htmlFor="businessName" className={labelClasses}>
                        Business Name *
                      </label>
                      <input
                        id="businessName"
                        type="text"
                        required
                        autoComplete="organization"
                        placeholder="Smith Dental Care"
                        className={inputClasses}
                        value={formData.businessName}
                        onChange={update("businessName")}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className={labelClasses}>
                        Email Address *
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="john@smithdental.com"
                        className={inputClasses}
                        value={formData.email}
                        onChange={update("email")}
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className={labelClasses}>
                        Phone Number *
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        required
                        autoComplete="tel"
                        placeholder="+1 (555) 123-4567"
                        className={inputClasses}
                        value={formData.phone}
                        onChange={update("phone")}
                      />
                    </div>
                    <div>
                      <label htmlFor="businessType" className={labelClasses}>
                        Business Type *
                      </label>
                      <select
                        id="businessType"
                        required
                        className={selectClasses}
                        style={selectChevronStyle}
                        value={formData.businessType}
                        onChange={update("businessType")}
                      >
                        <option value="" disabled>
                          Select your business type
                        </option>
                        {businessTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="websiteUrl" className={labelClasses}>
                        Website URL
                      </label>
                      <input
                        id="websiteUrl"
                        type="url"
                        autoComplete="url"
                        placeholder="https://www.yourbusiness.com"
                        className={inputClasses}
                        value={formData.websiteUrl}
                        onChange={update("websiteUrl")}
                      />
                    </div>
                    <div>
                      <label htmlFor="callVolume" className={labelClasses}>
                        Monthly Call Volume *
                      </label>
                      <select
                        id="callVolume"
                        required
                        className={selectClasses}
                        style={selectChevronStyle}
                        value={formData.callVolume}
                        onChange={update("callVolume")}
                      >
                        <option value="" disabled>
                          Select your call volume
                        </option>
                        {callVolumes.map((volume) => (
                          <option key={volume} value={volume}>
                            {volume}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="businessHours" className={labelClasses}>
                        Business Hours
                      </label>
                      <input
                        id="businessHours"
                        type="text"
                        placeholder="Mon–Fri, 9 AM – 6 PM"
                        className={inputClasses}
                        value={formData.businessHours}
                        onChange={update("businessHours")}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="services" className={labelClasses}>
                        Services Offered
                      </label>
                      <textarea
                        id="services"
                        rows={2}
                        placeholder="e.g. General dentistry, teeth whitening, orthodontics"
                        className={inputClasses}
                        value={formData.services}
                        onChange={update("services")}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="requirements" className={labelClasses}>
                        Additional Requirements
                      </label>
                      <textarea
                        id="requirements"
                        rows={3}
                        placeholder="Anything else we should know about your call handling needs?"
                        className={inputClasses}
                        value={formData.requirements}
                        onChange={update("requirements")}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="btn-primary mt-8 w-full disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                        Submitting…
                      </>
                    ) : (
                      "Get My Free Consultation"
                    )}
                  </button>

                  <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-slate-500">
                    <ShieldCheck className="h-4 w-4 text-emerald-500" aria-hidden="true" />
                    Your information is private and will never be shared.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
