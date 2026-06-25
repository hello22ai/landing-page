import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern your use of hello22 — the AI receptionist that answers business calls 24/7, books appointments, and captures leads.",
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-36 pb-24">
        <section className="container-site">
          <div className="max-w-3xl">
            <span className="eyebrow">Legal</span>
            <h1 className="heading-lg text-white">Terms of Service</h1>
            <p className="mt-4 font-mono text-xs text-muted">
              Last updated: June 12, 2026
            </p>

            <div className="mt-10 space-y-10">
              <div>
                <p className="leading-relaxed text-slate-400">
                  These Terms of Service (&quot;Terms&quot;) govern your
                  access to and use of the hello22 website and service. By
                  creating an account or using the service, you agree to these
                  Terms. If you are using hello22 on behalf of a business, you
                  represent that you have authority to bind that business.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-white">
                  1. Service description
                </h2>
                <p className="mt-4 leading-relaxed text-slate-400">
                  hello22 provides an AI-powered receptionist that answers
                  business phone calls 24/7, responds to caller questions
                  based on the information you provide, books appointments,
                  and captures lead details. The service includes a dashboard
                  for reviewing call recordings, transcripts, and summaries.
                  Features may evolve over time as we improve the product.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-white">
                  2. Accounts
                </h2>
                <p className="mt-4 leading-relaxed text-slate-400">
                  You must provide accurate information when creating an
                  account and keep it up to date. You are responsible for
                  safeguarding your login credentials and for all activity
                  that occurs under your account. Notify us promptly at
                  hello@hello22.ai if you suspect unauthorized access. You
                  must be at least 18 years old to use the service.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-white">
                  3. Acceptable use
                </h2>
                <p className="mt-4 leading-relaxed text-slate-400">
                  You agree not to use hello22 to violate any law, including
                  telemarketing, call recording, and privacy laws; to
                  impersonate another person or business, or configure the AI
                  receptionist to make deceptive or fraudulent statements; to
                  transmit spam, harassment, or unlawful content; or to probe,
                  disrupt, reverse-engineer, or overload the service. You are
                  responsible for the instructions, business information, and
                  greetings you configure, and for enabling any legally
                  required call recording disclosures in your jurisdiction. We
                  may suspend accounts that violate this section.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-white">
                  4. Subscriptions and billing
                </h2>
                <p className="mt-4 leading-relaxed text-slate-400">
                  hello22 is offered on a subscription basis. Fees, included
                  usage, and any overage rates are described at checkout or in
                  your order form. Subscriptions renew automatically at the
                  end of each billing period unless cancelled beforehand
                  through your account settings. Except where required by law,
                  fees are non-refundable, though you retain access to the
                  service for the remainder of any period you have paid for.
                  We may change pricing with at least 30 days&apos; notice
                  before the change takes effect at your next renewal.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-white">
                  5. AI disclaimer
                </h2>
                <p className="mt-4 leading-relaxed text-slate-400">
                  Our receptionist is powered by artificial intelligence.
                  While we work hard to make it accurate and reliable, AI may
                  occasionally mishear a caller, make an error, or respond
                  imperfectly. Call recordings, transcripts, and summaries are
                  provided &quot;as is&quot; and may contain inaccuracies. You
                  should not rely on the service for emergency calls or for
                  legal, medical, or financial advice, and you are responsible
                  for verifying critical information (such as appointment
                  details) captured by the AI.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-white">
                  6. Limitation of liability
                </h2>
                <p className="mt-4 leading-relaxed text-slate-400">
                  To the maximum extent permitted by law, hello22 and its
                  suppliers will not be liable for any indirect, incidental,
                  special, consequential, or punitive damages, or for lost
                  profits, revenue, or business opportunities — including
                  those arising from missed, dropped, or mishandled calls —
                  even if advised of the possibility of such damages. Our
                  total liability for any claim arising out of the service is
                  limited to the amounts you paid to hello22 in the twelve
                  months before the event giving rise to the claim.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-white">
                  7. Termination
                </h2>
                <p className="mt-4 leading-relaxed text-slate-400">
                  You may cancel your subscription at any time from your
                  account settings; cancellation takes effect at the end of
                  the current billing period. We may suspend or terminate your
                  access if you materially breach these Terms, fail to pay
                  fees when due, or use the service in a way that creates
                  risk or legal exposure for us. Upon termination, you may
                  export your call data for 30 days, after which we may delete
                  it in accordance with our Privacy Policy.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-white">
                  8. Changes to these Terms
                </h2>
                <p className="mt-4 leading-relaxed text-slate-400">
                  We may update these Terms from time to time. If we make
                  material changes, we will notify you by email or through the
                  service before the changes take effect. Your continued use
                  of hello22 after the effective date constitutes acceptance
                  of the updated Terms.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-white">
                  9. Contact
                </h2>
                <p className="mt-4 leading-relaxed text-slate-400">
                  Questions about these Terms? Contact us at{" "}
                  <a
                    href="mailto:hello@hello22.ai"
                    className="text-primary transition-colors hover:text-white"
                  >
                    hello@hello22.ai
                  </a>{" "}
                  or by phone at +1 (555) 022-2222.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
