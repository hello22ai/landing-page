import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How hello22 collects, uses, and protects your data — including call recordings, transcripts, and customer information handled by our AI receptionist.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-36 pb-24">
        <section className="container-site">
          <div className="max-w-3xl">
            <span className="eyebrow">Legal</span>
            <h1 className="heading-lg text-white">Privacy Policy</h1>
            <p className="mt-4 font-mono text-xs text-muted">
              Last updated: June 12, 2026
            </p>

            <div className="mt-10 space-y-10">
              <div>
                <p className="leading-relaxed text-slate-400">
                  hello22 (&quot;hello22,&quot; &quot;we,&quot;
                  &quot;us,&quot; or &quot;our&quot;) provides an AI
                  receptionist service that answers business phone calls,
                  books appointments, and captures lead information on behalf
                  of our customers. This Privacy Policy explains what
                  information we collect, how we use it, and the choices you
                  have. It applies to our website, our service, and the calls
                  our AI receptionist handles.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-white">
                  1. Information we collect
                </h2>
                <p className="mt-4 leading-relaxed text-slate-400">
                  <strong className="font-semibold text-white">
                    Account information.
                  </strong>{" "}
                  When a business signs up for hello22, we collect contact
                  details such as name, business name, email address, phone
                  number, and billing information.
                </p>
                <p className="mt-4 leading-relaxed text-slate-400">
                  <strong className="font-semibold text-white">
                    Call recordings and transcripts.
                  </strong>{" "}
                  Our core service involves answering phone calls. When the AI
                  receptionist handles a call, we may record the call and
                  generate a transcript and summary. These may contain the
                  caller&apos;s voice, name, phone number, and any details the
                  caller chooses to share (such as appointment preferences or
                  the reason for their call).
                </p>
                <p className="mt-4 leading-relaxed text-slate-400">
                  <strong className="font-semibold text-white">
                    Usage and device data.
                  </strong>{" "}
                  We collect standard technical data when you use our website
                  or dashboard, including IP address, browser type, pages
                  viewed, and cookies used for analytics and session
                  management.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-white">
                  2. How we use your information
                </h2>
                <p className="mt-4 leading-relaxed text-slate-400">
                  We use the information we collect to provide and operate the
                  service — answering calls, booking appointments, and
                  delivering transcripts and lead details to our customers; to
                  improve the accuracy, safety, and naturalness of our AI
                  receptionist; to provide customer support and respond to
                  inquiries; to process payments and manage accounts; and to
                  comply with legal obligations. We do not sell your personal
                  information, and we do not use call content for advertising.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-white">
                  3. Call recording consent
                </h2>
                <p className="mt-4 leading-relaxed text-slate-400">
                  Call recording laws vary by jurisdiction, and some require
                  that all parties consent to recording. The hello22 AI
                  receptionist can play a brief disclosure at the start of each
                  call (for example, &quot;this call may be recorded&quot;),
                  and we require our business customers to enable disclosures
                  where the law requires them. By continuing a call after such
                  a disclosure, callers consent to the recording and
                  transcription of the conversation. Business customers are
                  responsible for ensuring their use of the service complies
                  with the call recording laws that apply to them.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-white">
                  4. Data retention
                </h2>
                <p className="mt-4 leading-relaxed text-slate-400">
                  We retain call recordings and transcripts for as long as the
                  associated business account remains active, or for a shorter
                  period if the account owner configures one. Account
                  information is retained for the life of the account and for a
                  reasonable period afterward as required for legal, tax, and
                  accounting purposes. When data is no longer needed, we delete
                  it or de-identify it.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-white">
                  5. Sharing and processors
                </h2>
                <p className="mt-4 leading-relaxed text-slate-400">
                  We share information with a limited set of service providers
                  who help us run hello22, such as cloud hosting, telephony
                  carriers, speech-to-text and AI model providers, payment
                  processors, and analytics services. These processors are
                  bound by contracts that restrict their use of your data to
                  providing services to us. We may also disclose information
                  when required by law, to protect our rights or the safety of
                  others, or as part of a merger or acquisition (in which case
                  this policy will continue to apply to your data).
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-white">
                  6. Security
                </h2>
                <p className="mt-4 leading-relaxed text-slate-400">
                  We protect your information with industry-standard measures,
                  including encryption in transit and at rest, role-based
                  access controls, audit logging, and regular security
                  reviews. No system is perfectly secure, but we work
                  continuously to protect your data and will notify affected
                  users of any breach as required by law.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-white">
                  7. Your rights
                </h2>
                <p className="mt-4 leading-relaxed text-slate-400">
                  Depending on where you live, you may have the right to
                  access, correct, delete, or export your personal
                  information, to object to or restrict certain processing,
                  and to withdraw consent. Callers who interacted with the AI
                  receptionist may direct requests to us or to the business
                  they called; we will assist our customers in honoring such
                  requests. To exercise any of these rights, contact us using
                  the details below. We will respond within the timeframe
                  required by applicable law.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-white">
                  8. Contact
                </h2>
                <p className="mt-4 leading-relaxed text-slate-400">
                  If you have questions about this Privacy Policy or our data
                  practices, contact us at{" "}
                  <a
                    href="mailto:hello@hello22.ai"
                    className="text-primary transition-colors hover:text-white"
                  >
                    hello@hello22.ai
                  </a>{" "}
                  or by phone at +1 (555) 022-2222. We may update this policy
                  from time to time; material changes will be announced on
                  this page with a revised &quot;Last updated&quot; date.
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
