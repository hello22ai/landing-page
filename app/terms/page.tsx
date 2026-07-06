import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";

const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-manrope", display: "swap" });
const space = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-space", display: "swap" });
const DISP = "var(--font-space), 'Space Grotesk', sans-serif";
const LOGO = "/hello22-logo.png";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "The terms and conditions for using hello22 — our 24/7 AI voice agent platform for inbound and outbound calls.",
};

const INTRO = `Before using hello22 (https://www.hello22.ai/), read this page to understand the terms and conditions for our platform. You accept the terms listed below by registering, logging in, or using any portion of the platform. Please get in touch if something doesn't feel right before continuing — sorting it out early is much simpler than untangling it later.`;

type Body = { sub?: string; p?: string; list?: string[] };
type Section = { n: string; title: string; body: Body[] };

const SECTIONS: Section[] = [
  {
    n: "1",
    title: "Who We Are",
    body: [
      { p: `hello22 is a 24/7 AI voice agent platform that makes and/or answers phone calls automatically and sounds like a human agent, based in Australia. Got a question or need support? Just send an email to connect@hello22.ai — it is open to receiving communication every day.` },
      { p: `Whenever you see "hello22", "we", or "us" in this document, it means hello22; and when we mention "you" or "Customer", we're talking about anyone using the platform, whether you're on a free plan or a paid one.` },
    ],
  },
  {
    n: "2",
    title: "What the Service Actually Does",
    body: [
      { p: `You can create and deploy AI voice agents that manage actual phone calls, both incoming and outgoing, using hello22's no-code platform. It is used for customer service, sales outreach, lead qualification, appointment scheduling, and even job candidate screening.` },
      { p: `The platform is constantly evolving. We occasionally add new features and occasionally modify or remove those that aren't working. We'll let you know if something significant is about to change that affects your work. Minor updates we may simply roll out quietly.` },
    ],
  },
  {
    n: "3",
    title: "Signing Up and Account Access",
    body: [
      { p: `To use the platform, you need an account. You must be at least 18, and you must have authority to enter contracts — for yourself or for the business you represent. If you sign up on behalf of a company, you are confirming that you can bind that company to these Terms.` },
      { p: `Your login is yours to protect. Anything done under your account is treated as your responsibility, whether you did it or someone else did. If you suspect unauthorised access, email connect@hello22.ai straight away so we can lock the account down.` },
      { p: `We may decline a sign-up, suspend an account, or close one entirely if there are reasonable grounds to believe these Terms are being broken. Where we can explain why, we will. Sometimes — for legal or security reasons — we cannot.` },
    ],
  },
  {
    n: "4",
    title: "Plans and Payment",
    body: [
      { sub: "4.1 Available Plans" },
      { p: `Pricing is published at https://www.hello22.ai/#pricing. Every paid plan, including the free trial plan, comes with its own specific terms and conditions, and they may require that you provide a credit card.` },
      { sub: "4.2 Billing Cycle" },
      { p: `Paid plans bill monthly. When you upgrade, you give us a payment method and authorise us to charge it on the same date each month. All charges are in Australian dollars unless we have agreed otherwise in writing.` },
      { p: `Usage above your included credits and minutes is billed at the rate shown inside your dashboard. Run out of credit or minutes mid-cycle? You can top up or move up to a higher plan.` },
      { sub: "4.3 Automatic Renewal" },
      { p: `Subscriptions renew automatically. If you do not cancel before the renewal date, the next month is charged. Cancellation takes effect at the end of the period you have already paid for. We do not prorate partial months.` },
      { sub: "4.4 Failed Payments" },
      { p: `When a payment fails, we send a notice and give you a fair window to fix the billing details. If the issue is not resolved, the account may be suspended. If we have to refer the account to a debt collection agency because payments are still not resolved, the associated costs may end up on you.` },
      { sub: "4.5 Refunds" },
      { p: `Outside the specific 14-day free trial that includes a particular number of free minutes, all other plan fees are generally non-refundable. The exception is where Australian Consumer Law gives you a right we cannot exclude. If you think a refund is warranted, write to us at connect@hello22.ai, and we will look at every query, claim or complaint on its own merits.` },
      { sub: "4.6 Price Changes" },
      { p: `Pricing may change. If it does, we update the page at https://www.hello22.ai/ and email you at least 14 days before the new rate hits your account. Don't want the new price? Cancel before it takes effect.` },
      { sub: "4.7 Minutes and Usage" },
      { p: `Usage on hello22 is measured in call minutes. Each call, incoming or outgoing, uses minutes depending on the length of the conversation. View your dashboard at any time to monitor your account, including minutes remaining, recent call activity and estimated usage for the month.` },
      { p: `Included minutes reset at the beginning of each billing cycle and do not roll over to the next month. Unused minutes expire at the end of the billing period. We cannot refund unused minutes if you cancel your subscription during an active billing period.` },
      { p: `If you go over your monthly minutes, you can upgrade your plan or purchase more minutes, if available. Additional minutes purchased remain available until used or as otherwise specified at the time of purchase.` },
      { p: `hello22 may provide usage notifications as you approach your monthly limits, but you remain responsible for monitoring your account usage through the dashboard.` },
    ],
  },
  {
    n: "5",
    title: "Your Responsibilities",
    body: [
      { p: `How the platform gets used is on you. That covers the agents you build, the contact lists you upload, the prompts you write, and every call your agents place or receive.` },
      { p: `You must not use hello22 to:` },
      {
        list: [
          `Make calls or send messages to people without consent, where consent is required by law`,
          `Impersonate someone else or hide who is really behind a call`,
          `Run scams, phishing campaigns, or any other deceptive activity`,
          `Harass, threaten, or abuse anyone on a call`,
          `Break privacy law, consumer law, or telecommunications regulations`,
          `Clone the voice of a real person without their explicit consent`,
          `Attempt to decompile, copy, or reverse engineer the platform`,
          `Resell access without our written agreement`,
          `Use agents in safety-critical situations like nuclear operations, aviation, or medical emergencies`,
        ],
      },
      { p: `If the above terms or regulations are broken, suspension or termination may occur — often without prior notice. We may also report the issue to the appropriate law enforcement agency or regulator if there is potential harm to other people.` },
    ],
  },
  {
    n: "6",
    title: "Outbound Calling and Communications Law",
    body: [
      { p: `If your agents make outbound calls, you're responsible for complying with the law. In Australia, that means following rules under the:` },
      {
        list: [
          `Do Not Call Register Act 2006`,
          `Spam Act 2003`,
          `Privacy Act 1988`,
          `Telecommunications (Consumer Protection and Service Standards) Act 1999`,
          `And if you're calling other countries, you need to follow their laws too`,
        ],
      },
      { p: `Here's what this looks like in real life:` },
      {
        list: [
          `Get permission before you make any marketing calls`,
          `Check your call lists against the Do Not Call Register every 30 days`,
          `Tell people up front if they're talking to an AI agent`,
          `Allow people to easily say they do not want to be called again`,
          `Don't call people before 9 a.m. or after 8 p.m. on weekdays, and skip Sundays and public holidays`,
          `Keep records that show you got consent for at least five years`,
        ],
      },
      { p: `This isn't the full list of rules — just a starting point. Some industries have extra requirements, and rules can change. If you're not sure what applies to you, talk to a legal expert in your area.` },
      { p: `We monitor how you use our platform. If we spot any problems, we'll reach out so you can sort things out. For serious issues, we might have to step in right away and talk things through afterwards.` },
    ],
  },
  {
    n: "7",
    title: "Intellectual Property",
    body: [
      { sub: "7.1 Our Platform" },
      { p: `hello22 owns the platform — the software, the underlying models, the voice infrastructure, the visual design, the documentation, and every related piece of technology. While your account is in good standing, you have a limited, non-exclusive, non-transferable licence to use it. That licence does not include any right to copy, modify, sublicense, reverse engineer, or build a competing product on top of our work.` },
      { p: `We may use aggregated, anonymised usage data to improve the platform. Nothing we share or learn from that data identifies you or the people on the other end of your calls.` },
      { sub: "7.2 Your Content" },
      { p: `Your content stays yours. Knowledge base files, scripts, contact lists, recordings — all of it. By uploading content, you give us the limited licence we need to actually run the platform for you. Nothing more.` },
      { p: `You also have to make sure you have the right to whatever you upload. Don't put data into the platform that you weren't allowed to collect or use in the first place.` },
      { sub: "7.3 AI-Generated Content" },
      { p: `Output from your agents — transcripts, summaries, automated follow-ups — belongs to you, subject to these Terms. The underlying models that produced the output remain ours.` },
      { sub: "7.4 Feedback" },
      { p: `If you send us bug reports, feature requests, or ideas for improvement, we may use them. There is no expectation of payment for feedback you share with us voluntarily.` },
    ],
  },
  {
    n: "8",
    title: "Call Recording and Data Processing",
    body: [
      { p: `Calls placed through the platform may be recorded by default for quality review, analytics, and to improve how the AI performs. Recording can be switched off in your account settings if you prefer.` },
      { p: `Before recording, you are legally required to inform every party on the call. In many jurisdictions, you also need their consent. That obligation is yours, not ours.` },
      { p: `Call data is processed using commercially reasonable security controls. If a breach happens that affects your data, we will let you know without undue delay. Full detail on data handling lives in our Privacy Policy.` },
    ],
  },
  {
    n: "9",
    title: "Data Security and Privacy",
    body: [
      { p: `We take security seriously. Our strategy is fairly simple: it combines technical, administrative, and physical security measures to prevent unauthorised access, unintentional loss, and misuse of your data. We are honest in saying there is no such thing as perfect security. What matters is performing the fundamentals correctly, checking them frequently, and acting fast if something doesn't seem right.` },
      { p: `The information we gather, how we use it, and your rights under the Privacy Act 1988 (Cth) are all outlined in our Privacy Policy. You are the data controller when you use our platform to process personal data. This means you are in charge of things like having a legitimate purpose, responding to requests from data subjects, and determining how long to retain the data.` },
      { p: `Make sure you have the appropriate permissions and safeguards in place if you are working with sensitive information, such as health data. To be clear, unless we have a written agreement with you, we are not a provider that complies with the Health Records Act.` },
    ],
  },
  {
    n: "10",
    title: "AI Output, Accuracy, and What It Means for You",
    body: [
      { p: `AI voice agents are capable, but they make mistakes. They can mishear a word, misread the room, get a fact slightly wrong, or hand a call off at the wrong moment. We work to keep error rates low through better models, better defaults, and the controls inside your dashboard — but zero errors is not something we can promise.` },
      { p: `Before you put an agent live, run test calls. Read the transcripts. Build a fallback path so a real human can take over when needed. The platform supports live transfer, escalation, and abandon flows for exactly this reason.` },
      { p: `Be careful about what your agent says on your behalf. If it quotes a price, makes a commitment, or books an appointment, those statements may legally bind you the same way as if a member of your team had said them. Treat the agent like a new starter — train it well, and review what it is doing in the early weeks before you assume the system is settled.` },
    ],
  },
  {
    n: "11",
    title: "What We Do and Do Not Guarantee",
    body: [
      { p: `We aim for 99.5% uptime, not counting planned maintenance, and usually we hit that mark each month. Still, we can't promise the platform will always be up, flawless, or perfect for every possible situation.` },
      { p: `You get the platform as it is when it's available. As far as the law allows, we don't promise any specific results, accuracy, or suitability for your particular needs — no warranties, whether spelt out or implied. AI isn't perfect; it works on probabilities, so if the outcome really matters, a human needs to double-check it.` },
      { p: `This doesn't override any rights you have under Australian Consumer Law that can't legally be taken away.` },
    ],
  },
  {
    n: "12",
    title: "Limitation of Liability",
    body: [
      { p: `Here's how it works: if you bring a claim related to your use of our platform, the most we'll pay — where the law allows — is what you paid us in the 12 months before the problem happened. If you're using a free account, the limit is A$100.` },
      { p: `We don't cover indirect or special damages. That means things like lost profits, lost data, lost business opportunities, or any hit to your reputation — even if we knew something like that could happen. This cap applies no matter what.` },
      { p: `There's one exception. If you're dealing with personal injury or death because of our negligence, fraud, or anything else we can't legally exclude under Australian Consumer Law, these limits don't apply.` },
    ],
  },
  {
    n: "13",
    title: "Indemnification",
    body: [
      { p: `You agree to protect hello22, along with its directors, employees, and contractors, from any claims, losses, fines, or legal costs that come up because of the following:` },
      {
        list: [
          `Your use of the platform in a way that breaks these Terms`,
          `Any content, data, or contact lists you upload or use through the platform`,
          `Not following the laws about telemarketing, privacy, or call recording`,
          `Claims from third parties tied to calls your agents make`,
        ],
      },
      { p: `If a claim like this comes in, we will tell you promptly and work with you on the response. We reserve the right to take over the defence where our own interests are at stake.` },
    ],
  },
  {
    n: "14",
    title: "Third-Party Integrations",
    body: [
      { p: `Zapier, CRMs, calendar platforms, and telephony tools are just a few of the external tools that hello22 connects with. These tools are managed by other businesses. Since they are third-party tools created by other companies, we have no control over how they function, what information they store, or whether they remain accessible.` },
      { p: `Allowing an integration means you agree to that company's terms and our own. Before you attach anything sensitive to your account, make sure you have the right permissions.` },
      { p: `The platform also depends on third-party telephony carriers and cloud vendors to deliver calls across the world. We are selective about who we partner with, but the realities of international voice traffic mean some conditions, such as carrier outages or last-mile network issues, are not something we can fix on our end.` },
    ],
  },
  {
    n: "15",
    title: "Phone Numbers and Caller ID",
    body: [
      { p: `When your account goes live, hello22 assigns it a dedicated phone number for routing your calls. That number stays with your account for as long as your subscription is active and paid. If you cancel or downgrade, the number may be released, and a released number can't always be recovered. If your business relies on a specific number, keep its subscription current.` },
      { p: `Caller ID may be set within the limits allowed by law. You may not spoof the caller ID to mislead or defraud anyone, or to hide where a call actually comes from. This is prohibited under these Terms and under telecommunications law in most places you'd be calling.` },
    ],
  },
  {
    n: "16",
    title: "Termination",
    body: [
      { sub: "16.1 By You" },
      { p: `You have the right to cancel your subscription at any time. Paid subscriptions stay active until the end of the billing period you have already paid for. After cancellation, your data is retained for 30 days and then deleted. If you want a copy, export it before you close the account.` },
      { sub: "16.2 By Us" },
      { p: `We can suspend or close an account if these Terms are being broken, if there are signs of fraudulent or harmful activity, or if we decide to retire the service. Wherever a notice is lawfully required, you will get one. Where there is risk to other users or to the platform, we may act on the spot.` },
      { p: `We can also terminate for convenience — meaning, no specific reason — with 30 days notice.` },
      { sub: "16.3 What Survives" },
      { p: `Sections covering intellectual property, liability limits, indemnification, governing law, and any other clauses meant to outlast the agreement carry on after the account ends.` },
    ],
  },
  {
    n: "17",
    title: "Changes to These Terms",
    body: [
      { p: `These Terms can be updated. When we update them, the new version goes up at https://www.hello22.ai/ and we email account holders. For material changes, you get at least 14 days notice before they take effect, and simply continuing to use the platform after a change goes live counts as acceptance.` },
      { p: `If a change does not work for you, stop using the platform and tell us. We will sort out the right way to wind things up.` },
    ],
  },
  {
    n: "18",
    title: "Governing Law and Disputes",
    body: [
      { p: `These Terms are governed by the laws of Victoria, Australia. Both parties submit to the non-exclusive jurisdiction of the Victorian courts.` },
      { p: `Before anyone runs to court, please write to connect@hello22.ai and give us a real chance to fix the issue. Most disputes get sorted out faster over email than they ever do through lawyers. We aim to respond to formal complaints within 15 business days.` },
      { p: `If we still can't reach common ground, either side may refer the dispute to mediation through an agreed mediator before going to court. Mediation is not mandatory under these Terms, but it usually saves time and money.` },
      { p: `This clause does not stop either party from going to court for urgent injunctive relief where that is genuinely needed to protect rights.` },
    ],
  },
  {
    n: "19",
    title: "General Provisions",
    body: [
      { sub: "19.1 Entire Agreement" },
      { p: `The entire agreement between you and hello22 regarding the platform is contained in these Terms, our Privacy Policy, and any signed order form or service agreement. Anything you've previously seen, heard, or discussed — written or not — is superseded by this.` },
      { sub: "19.2 Severability" },
      { p: `If a clause doesn't hold up legally, the rest of the agreement stays intact. We'll adjust the problematic part to make it work, or if that's not possible, remove it.` },
      { sub: "19.3 No Waiver" },
      { p: `If we skip enforcing a right once, that doesn't mean we're giving it up for good. Waivers only count if they're written and signed by someone who actually has the authority.` },
      { sub: "19.4 Assignment" },
      { p: `Without our written consent, you may not transfer your account or your rights under these Terms to another person. On our side, we can assign our rights and obligations — say, if we're acquired — but we'll let you know, and the new owner takes over the same terms.` },
      { sub: "19.5 Force Majeure" },
      { p: `When events outside reasonable control strike — a storm, blackout, network failure, official order, or outbreak — neither side is to blame for the delays they cause. If trouble arises, we take sensible steps to reduce the fallout and keep you informed.` },
      { sub: "19.6 Australian Consumer Law" },
      { p: `Nothing here is meant to take away or restrict any rights you have under Australian Consumer Law that can't legally be excluded. If the ACL applies, you get those protections and any remedies described here.` },
    ],
  },
  {
    n: "20",
    title: "Contact Us",
    body: [
      { p: `Questions, complaints, or anything else relating to these Terms or the platform — send them here:` },
      { p: `hello22 — Email: connect@hello22.ai — Website: https://www.hello22.ai/` },
      { p: `We aim to respond to all enquiries within two business days.` },
    ],
  },
];

export default function TermsPage() {
  const muted = "#9594a6";
  return (
    <div
      className={`${manrope.variable} ${space.variable}`}
      style={{ background: "#07070d", color: "#f4f4f7", minHeight: "100vh", fontFamily: "var(--font-manrope), Manrope, sans-serif", WebkitFontSmoothing: "antialiased", position: "relative", overflowX: "clip" }}
    >
      {/* ambient glow */}
      <div style={{ position: "absolute", top: -180, left: "50%", transform: "translateX(-50%)", width: 700, height: 460, borderRadius: "50%", background: "radial-gradient(circle,rgba(44,118,237,.16),transparent 70%)", filter: "blur(30px)", pointerEvents: "none", zIndex: 0 }} />

      {/* HEADER */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, backdropFilter: "blur(16px)", background: "rgba(7,7,13,.72)", borderBottom: "1px solid rgba(255,255,255,.07)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 28px", height: 72, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="/" style={{ display: "flex", alignItems: "center" }}>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={LOGO} alt="hello22.ai" style={{ height: 28, width: "auto", display: "block" }} /></a>
          <a href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#c9c9d4", textDecoration: "none", fontSize: 14.5, fontWeight: 600 }}><i className="fa-solid fa-arrow-left" style={{ fontSize: 12 }} /> Back to home</a>
        </div>
      </header>

      {/* CONTENT */}
      <main style={{ position: "relative", zIndex: 1, maxWidth: 820, margin: "0 auto", padding: "72px 28px 100px" }}>
        <div style={{ fontSize: 13, letterSpacing: ".16em", textTransform: "uppercase", color: "#2c76ed", fontWeight: 700 }}>Legal</div>
        <h1 style={{ fontFamily: DISP, fontWeight: 600, letterSpacing: "-.03em", fontSize: "clamp(40px,6vw,64px)", lineHeight: 1.02, margin: "14px 0 0" }}>Terms and Conditions</h1>
        <p style={{ fontSize: 13.5, color: "#6f6f80", margin: "16px 0 0", fontVariantNumeric: "tabular-nums" }}>Last updated: June 26, 2026</p>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: muted, margin: "24px 0 0" }}>{INTRO}</p>

        <div style={{ marginTop: 48, display: "flex", flexDirection: "column", gap: 44 }}>
          {SECTIONS.map((s) => (
            <section key={s.n}>
              <h2 style={{ fontFamily: DISP, fontWeight: 600, fontSize: 24, letterSpacing: "-.01em", margin: 0, display: "flex", gap: 12 }}>
                <span style={{ color: "#2c76ed" }}>{s.n}.</span>
                <span>{s.title}</span>
              </h2>
              <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 14 }}>
                {s.body.map((b, i) =>
                  b.sub ? (
                    <h3 key={i} style={{ fontFamily: DISP, fontWeight: 600, fontSize: 16, color: "#e4e4ec", margin: "8px 0 0" }}>{b.sub}</h3>
                  ) : b.list ? (
                    <ul key={i} style={{ margin: 0, paddingLeft: 22, display: "flex", flexDirection: "column", gap: 9 }}>
                      {b.list.map((li, j) => <li key={j} style={{ fontSize: 16, lineHeight: 1.65, color: muted }}>{li}</li>)}
                    </ul>
                  ) : (
                    <p key={i} style={{ fontSize: 16, lineHeight: 1.75, color: muted, margin: 0 }}>{b.p}</p>
                  )
                )}
              </div>
            </section>
          ))}
        </div>
      </main>

      {/* FOOTER */}
      <footer style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,.08)", background: "#090910" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "26px 28px calc(26px + env(safe-area-inset-bottom))", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap", fontSize: 13.5, color: "#6f6f80" }}>
          <span>© 2026 hello22.ai</span>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            <a href="/" style={{ color: "#9594a6", textDecoration: "none" }}>Home</a>
            <a href="/privacy" style={{ color: "#9594a6", textDecoration: "none" }}>Privacy</a>
            <a href="/terms" style={{ color: "#9594a6", textDecoration: "none" }}>Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
