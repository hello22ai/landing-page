import type { Metadata } from "next";
import LegalPage from "@/components/site22/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How hello22 collects, uses, and protects your data — including call recordings, transcripts, and customer information handled by our AI receptionist.",
};

type Body = { sub?: string; p?: string };
type Section = { n: string; title: string; body: Body[] };

const SECTIONS: Section[] = [
  {
    n: "1",
    title: "Who we are and why this exists",
    body: [
      { p: `hello22 is a platform that helps businesses run AI-powered phone agents for both incoming and outgoing calls.` },
      { p: `Let's start from knowing hello22: this product listens to phone calls and answers them just like a human with the help of artificial intelligence. If this information makes you want to know exactly what we collect, keep, and do with your data — well, we get it. This hello22 privacy policy lays it all out clearly.` },
      { p: `Most people reading this fall into one of two groups. If you're a business using our platform, you're an account holder, and this policy covers you directly. If you got a call from a business using hello22, you're a caller — your situation isn't the same. The business that contacted you is the one responsible for getting your consent. We just handle the call data for them. We don't use it for ourselves. Want the details? Check Section 13.` },
      { p: `Law applicability when reading this policy or using the platform depends on where you live. In Australia, we follow the Privacy Act 1988 and the Australian Privacy Principles. If you're in the EU or UK, the GDPR covers you. People in California have rights under the CCPA and CPRA. Where these laws give you special rights, you'll find the specifics in Section 8.` },
    ],
  },
  {
    n: "2",
    title: "Information we collect",
    body: [
      { sub: "When you sign up" },
      { p: `When you create an account on hello22, you give us your name, work email, and company name. For paid plans, you also provide payment details. Those go through our payment processor and are not stored directly on our servers. If you contact us by email or through our website form, we receive whatever you include in that message.` },
      { sub: "When calls happen" },
      { p: `This is the part that matters most for a voice AI platform, and we want to be specific about it.` },
      { p: `Every call processed through hello22 creates a call detail record. That record contains the date, time, duration, direction (inbound or outbound), the calling number, and the number called. This record exists whether or not recording is switched on.` },
      { p: `Call recording is off by default. Account holders turn it on. When they do, we store the audio and generate a transcript. During calls, we also run sentiment analysis in real time. This tells the agent whether the caller sounds calm or frustrated so it can adjust its approach. The sentiment signal guides the live conversation. It is not stored as a permanent profile of the caller's emotional state.` },
      { p: `The agents you configure on our platform, including their scripts, knowledge bases, and conversation flows, are stored in your account. When you connect the platform to external tools like a CRM, a calendar, or a webhook service, we log those integration events. What data actually reaches those external systems depends on how you have set things up.` },
      { sub: "Technical data" },
      { p: `When you use your dashboard, we automatically collect your IP address, browser type, operating system, and basic session data such as which pages you visited and where you ran into errors. This is standard for any web application and is used for security monitoring and troubleshooting.` },
      { sub: "Data about callers" },
      { p: `If you received a call from an AI agent on our platform, your phone number, the content of the conversation, and, if recording was enabled, your voice were collected during that interaction. The business that used hello22 to contact you decided whether recording was on and is responsible for any required disclosures to you under applicable law. If you want to know what data that business holds about you, contact them directly. We cannot respond to individual caller data requests on their behalf.` },
    ],
  },
  {
    n: "3",
    title: "What hello22 does with your data",
    body: [
      { p: `Running the platform is the main thing for us, and that covers processing calls; storing recordings and transcripts where enabled; generating your dashboard reports; managing billing; and keeping your account working.` },
      { p: `Security monitoring is another use. We watch call traffic and account activity for signs of misuse: mass spam campaigns, compromised credentials, and similar problems. This matters not just to protect our infrastructure but also because a badly misused AI voice platform causes harm to the people on the receiving end of those calls.` },
      { p: `When you contact us about a problem, we look at your account data and session logs to diagnose what went wrong. We do not browse call recordings unless the issue you raised involves a specific call.` },
      { p: `We also use aggregated, anonymised usage data to understand what features people use and where things break. We do not use individual call recordings to improve our AI systems unless you have explicitly agreed to that in writing.` },
      { p: `Moreover, we do not sell your personal information. Phone numbers and contact lists you bring to the platform stay with you. We do not share them with advertisers, data brokers, or any third party outside what is needed to deliver the service.` },
    ],
  },
  {
    n: "4",
    title: "Call recordings, AI processing, and what actually happens",
    body: [
      { p: `When a call takes place on our platform, the caller's voice is converted to text in real time by our speech-to-text system. The AI agent then retrieves a response from your configured knowledge base and delivers it. This happens fast enough to sound like a normal conversation. No audio goes to a human listener in real time unless you have set up a call transfer.` },
      { p: `Sentiment analysis runs alongside the conversation. The system detects whether the caller sounds frustrated or calm and can steer the agent accordingly. A summary may appear in your call log when the call ends. It is not used for any purpose outside your account.` },
      { p: `Recording is an account holder decision. In Victoria, at least one party must consent to a call being recorded. In practice, callers need to be told at the start that recording is happening. hello22 lets you include that notice in your agent's opening lines. Whether you do this and whether you meet the legal requirements in your jurisdiction is your responsibility, not ours.` },
      { p: `Recordings and transcripts are not passed to any third party unless an integration you configured specifically sends them there, or a legal obligation requires disclosure.` },
    ],
  },
  {
    n: "5",
    title: "Who we share data with",
    body: [
      { p: `Our infrastructure runs on third-party services: cloud hosting providers, telephony carriers, speech processing software services, and a payment processor. Each handles only the data needed for its specific function and works under contracts that restrict any other use.` },
      { p: `Beyond that, data goes to the tools you connect to your account. If you configure an agent to log call summaries to a CRM or book appointments in a calendar, data flows to those systems because you set it up that way.` },
      { p: `The event of lawful government requests is the other situation where data can leave our control. If we receive a valid court order or regulatory request, we comply. We tell you when the law allows it.` },
      { p: `If hello22 is ever acquired or merges with another company, account holders will receive notice before their data becomes subject to a different policy.` },
      { p: `It is to be noted that nothing goes to advertisers. Nothing goes to data brokers. Anything outside the above requires your consent.` },
    ],
  },
  {
    n: "6",
    title: "Data sent overseas",
    body: [
      { p: `hello22 is based in Australia, but parts of our infrastructure and some third-party services may be situated in the United States, Asia and parts of Europe.` },
      { p: `For Australian data, we apply the requirements of the Privacy Act 1988 to international transfers. That means taking reasonable steps to confirm overseas recipients protect your information to an equivalent standard.` },
      { p: `For EU and UK data, transfers outside the EEA rely on standard contractual clauses approved by the European Commission. These bind recipients to the same standards that apply inside Europe.` },
      { p: `If you want to know specifically where your data is processed, ask us at connect@hello22.ai and we will tell you.` },
    ],
  },
  {
    n: "7",
    title: "Cookies",
    body: [
      { p: `Our website and platform dashboard use cookies. There are a few different types, and each one does something specific.` },
      { p: `Session cookies keep you logged in while you work. Without them, you would get signed out every time you clicked to a new page.` },
      { p: `Security cookies watch for unusual activity. If someone logs into your account from a device or location that does not match your usual pattern, the system flags it. This is one of the simpler ways we catch unauthorised access early.` },
      { p: `Analytics cookies collect anonymised data about how people move through the platform — which pages load slowly, where users drop off, and which features are hard to find. None of it is tied to you personally. It helps us fix what is broken or confusing.` },
      { p: `A few things worth knowing: we do not track you across other websites. Turning off analytics cookies will not break the platform. Session cookies are a different story — the platform needs them to work.` },
      { p: `Most browsers let you manage and clear cookies through their settings without much hassle.` },
    ],
  },
  {
    n: "8",
    title: "Your privacy rights",
    body: [
      { sub: "Australia" },
      { p: `You have the right under the Australian Privacy Principles to access any personal information we hold about you and to request corrections, opt out of direct marketing, and lodge a complaint if you think we have mishandled your data.` },
      { p: `Email us with the subject "Privacy Request", and we will respond within 30 days. If you are not satisfied with the hello22 team's response regarding your queries, or there is anything you believe must be escalated immediately, you may contact the Office of the Australian Information Commissioner at www.oaic.gov.au.` },
      { sub: "European Union and United Kingdom" },
      { p: `Under the GDPR, you have the right to access your data, make corrections to it, have it deleted in specific situations, limit processing while a dispute is pending, obtain a portable copy, and object to processing that we do for legitimate purposes. You have the right to revoke your consent at any time when we process your data. Withdrawal stops future processing but has no effect on previous processing. Additionally, you can complain to your country's data protection agency.` },
      { p: `Our legal basis varies depending on the activity: contractual necessity for the administration of your account and for the service; legitimate interests for fraud monitoring and platform analytics; and consent for marketing emails.` },
      { sub: "California" },
      { p: `California law (CCPA and CPRA) gives you the right to know what information we hold about you, ask us to delete it, ask for corrections, and confirm whether it has been sold or not. You also have the right not to face any different treatment for exercising these rights. Send requests to connect@hello22.ai. We will verify your identity before acting on the request.` },
    ],
  },
  {
    n: "9",
    title: "How long we keep data",
    body: [
      { p: `Account data stays in our system as long as your account is open. After you close it, we delete or anonymise your personal information within 90 days, unless a legal obligation requires us to hold something specific for longer.` },
      { p: `Call recordings and transcripts are kept for whatever retention period you set in your account. The default, if you set nothing, is 12 months. You can delete individual recordings at any time from your dashboard.` },
      { p: `Billing records are kept for 7 years. Australian tax law requires this.` },
      { p: `Server and security logs are retained for up to 12 months.` },
    ],
  },
  {
    n: "10",
    title: "Security",
    body: [
      { p: `TLS (Transport Layer Security) is used to encrypt all data while it is in transit. Our servers encrypt data while it is at rest. Only employees who require it for their particular tasks are allowed access to production systems, which require multi-factor authentication.` },
      { p: `We conduct security reviews on a regular basis. If a breach occurs that is likely to result in actual harm, we notify the affected parties and the appropriate regulator within the legally mandated timeframes — 72 hours under the GDPR and as soon as reasonably possible under the Australian Privacy Act.` },
      { p: `Please notify us if you discover a security flaw in our platform. We react quickly and take those reports seriously.` },
    ],
  },
  {
    n: "11",
    title: "Children",
    body: [
      { p: `hello22 is a business-to-business platform. It is built for companies running sales calls, customer support lines, and appointment bookings — not for consumers, and certainly not for children. We do not offer any part of this service to anyone under 16, and we have no reason to collect data from minors.` },
      { p: `That said, exceptions exist. A parent might call a business that uses our platform. A child might pick up a phone. We cannot always control who ends up in a conversation. What we can say is this: we do not knowingly collect, store, or use personal information from anyone under 16, and if we discover it has happened, we delete it without delay.` },
      { p: `If you believe a child's data has entered our system through any interaction, do contact us at connect@hello22.ai. We will investigate and remove it promptly, no questions asked.` },
    ],
  },
  {
    n: "12",
    title: "Third-party integrations and links",
    body: [
      { p: `hello22 connects to a wide range of external tools — CRMs, calendar apps, automation platforms like Zapier, webhooks, and more. These integrations are genuinely useful, and most of our customers rely on them to get the most out of the platform.` },
      { p: `But here is the honest part: once data leaves hello22 and lands inside a third-party system, we have no control over what that system does with it. Their own privacy policy takes over from that point. We cannot override it, audit it, or be held responsible for it.` },
      { p: `Before you connect any integration, it is worth spending a few minutes reading that provider's privacy policy — especially if the data flowing through includes personal information about your callers or customers.` },
      { p: `If you are unsure about a specific integration, contact us, and we will tell you what we know.` },
    ],
  },
  {
    n: "13",
    title: "Account holders and callers",
    body: [
      { p: `hello22 is used by businesses to automate phone communications for support, booking, marketing, and other tasks. Account holders are the businesses that set up and operate the agents. They decide what the agent does, what it records, and where call data goes afterwards. Callers are the people on the other end of those conversations.` },
      { p: `If you received a call powered by our platform, the business that contacted you is the data controller for that interaction. They are responsible for complying with the calling and recording laws that apply to them. We process call data on their behalf. We do not use it for our own marketing or analysis.` },
      { p: `If you want to know what data a specific business holds about you from one of their AI agent calls, contact that business. We cannot respond to those requests in their place.` },
    ],
  },
  {
    n: "14",
    title: "Updates to this policy",
    body: [
      { p: `We update this policy when our practices change, when a new feature involves handling data in a new way, or when the law requires it. For changes that matter, we give account holders at least 14 days notice by email before the change takes effect. The updated policy is always on our website with a revised date at the top.` },
      { p: `Continuing to use hello22 after a change takes effect means you accept the revised policy. If you disagree, you can close your account and we will help you export any data you need.` },
    ],
  },
  {
    n: "15",
    title: "Contact us",
    body: [
      { p: `If you have a question about this policy, want to make a data request, or need to report something, get in touch:` },
      { p: `hello22 — Email: connect@hello22.ai` },
      { p: `We aim to respond to privacy queries within 5 business days. Formal access requests are handled within 30 days.` },
      { p: `You can get in touch with your country's data protection authority if you are in the EU or the UK and are not happy with our response. The Office of the Australian Information Commissioner in Australia can be reached at www.oaic.gov.au.` },
    ],
  },
];

export default function PrivacyPage() {
  return <LegalPage title="Privacy Policy" updated="June 26, 2026" sections={SECTIONS} />;
}
