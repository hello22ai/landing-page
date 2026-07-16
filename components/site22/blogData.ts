// Blog content — single source of truth for /blog (listing) + /blog/[slug] (detail) + sitemap.
// Naya article add karne ke liye bas is array mein ek object add karo — page khud ban jayega.
// NOTE: ye launch ke liye sample articles hain (2026-07-13) — final copy client se aayegi.

export type BlogBlock =
  | { t: "p"; x: string }
  | { t: "h2"; x: string }
  | { t: "list"; items: string[] }
  | { t: "quote"; x: string; by?: string }
  | { t: "tip"; x: string };

// CMS detail-page SEO fields (Sanity Studio ke seoTitle/ogTitle/... se aate hain)
export type BlogSeo = {
  title?: string;
  description?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  schemaMarkup?: string; // JSON-LD string — detail page par as-is inject hota hai
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: "Growth" | "Product" | "Guides" | "Industries";
  date: string; // ISO yyyy-mm-dd
  readMins: number;
  cover: string;
  short: string; // card thumbnail ka bada 2-3 word label (SoftQA-reference UI, 2026-07-13)
  pastel: keyof typeof PASTELS; // card thumbnail ka pastel bg
  thumb?: string; // listing-card image (CMS: featureImage; sample posts: author portrait fallback)
  author: { name: string; role: string; avatar: string }; // avatar "" = CMS team-badge fallback
  blocks?: BlogBlock[]; // sample articles ka hand-written content
  body?: unknown[]; // Sanity portable text (CMS posts) — blocks ya body, dono mein se ek
  seo?: BlogSeo;
};

// Card-thumbnail pastels (reference UI jaise) — fixed light colors, dono themes mein same
// (thumb ke andar text bhi fixed dark hai, isliye theme vars nahi chahiye).
export const PASTELS = {
  mint: "#e7f2da",
  pink: "#f8e3ee",
  lavender: "#e9e6fa",
  lemon: "#f5f6d4",
  sky: "#deebfb",
  cream: "#f3ede0",
} as const;

// Category → accent (about-page story cards wali palette; orange nahi — brand blue hai)
export const CATEGORY_STYLE: Record<BlogPost["category"], { c: string; bg: string; bd: string }> = {
  Growth: { c: "#1a9a5c", bg: "rgba(34,197,94,.1)", bd: "rgba(34,197,94,.25)" },
  Product: { c: "var(--num)", bg: "var(--tint)", bd: "var(--tint-bd)" },
  Guides: { c: "#8b5cf6", bg: "rgba(139,92,246,.1)", bd: "rgba(139,92,246,.25)" },
  Industries: { c: "#e2564d", bg: "rgba(226,86,77,.1)", bd: "rgba(226,86,77,.25)" },
};

export function formatDate(iso: string): string {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const [y, m, d] = iso.split("-").map(Number);
  return `${months[m - 1]} ${d}, ${y}`;
}

const AUTHORS = {
  melissa: { name: "Melissa Grant", role: "Growth at hello22", avatar: "/images/portrait-melissa.jpg" },
  james: { name: "James Carter", role: "Customer Success at hello22", avatar: "/images/portrait-james.jpg" },
  priya: { name: "Priya Sharma", role: "Product at hello22", avatar: "/images/portrait-priya.jpg" },
  sarah: { name: "Sarah Mitchell", role: "Content at hello22", avatar: "/images/avatar-sarah.jpg" },
} as const;

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "real-cost-of-missed-calls",
    title: "The Real Cost of Missed Calls (And Why Voicemail Doesn't Save You)",
    excerpt:
      "Every unanswered ring is a customer deciding between you and the next result on Google. Here's what missed calls actually cost a small business — and the simple math behind fixing it.",
    category: "Growth",
    date: "2026-07-08",
    readMins: 6,
    cover: "/images/customer-on-call.jpg",
    short: "Missed Calls = Lost Money",
    pastel: "pink",
    author: AUTHORS.melissa,
    blocks: [
      { t: "p", x: "Most business owners think of a missed call as a small inconvenience. The customer will call back, or they'll leave a voicemail, or they'll try the contact form. In reality, research across service industries consistently shows the opposite: the majority of callers who reach voicemail simply hang up — and most of them call a competitor within the hour." },
      { t: "p", x: "That means a missed call isn't a delayed conversation. It's usually a finished one. The customer had a need, they picked up the phone, and someone else answered it." },
      { t: "h2", x: "The math nobody does" },
      { t: "p", x: "Let's keep it simple. Say your average job or booking is worth $400, and your business misses just three calls a week — after hours, during jobs, over lunch. If even half of those callers would have booked, that's $600 a week walking away. Over a year, you're looking at roughly $30,000 in quiet, invisible losses that never show up on any report." },
      { t: "list", items: [
        "Callers who reach voicemail rarely leave a message — they move to the next option",
        "After-hours enquiries are often the highest-intent calls of the day",
        "Missed calls don't appear in your books, so the loss feels like it never happened",
        "The competitor who answers first usually wins the job",
      ] },
      { t: "quote", x: "We thought we were busy because business was good. Then we saw the missed-call log. We weren't busy — we were leaking.", by: "hello22 customer, home services" },
      { t: "h2", x: "Why hiring more people isn't the answer" },
      { t: "p", x: "A full-time receptionist solves the 9-to-5 problem, but calls don't keep office hours. Evenings, weekends, public holidays — the phone keeps ringing when the front desk goes home. Doubling staff to cover it rarely makes financial sense for a small business." },
      { t: "p", x: "This is exactly the gap an AI voice receptionist fills. It answers every call in seconds, sounds natural, knows your services and pricing, books appointments into your calendar, and captures the caller's details — 24 hours a day, for a fraction of a single salary." },
      { t: "tip", x: "Quick exercise: check your phone system's call log for last month. Count the calls under 10 seconds and the ones that hit voicemail after hours. That number is your missed-revenue baseline." },
      { t: "h2", x: "Answer first, win first" },
      { t: "p", x: "Speed to answer is one of the few advantages a small business can own completely. You can't always be the cheapest or the biggest — but you can be the one who picks up. With hello22, that's not a staffing problem anymore. It's a 22-minute setup." },
    ],
  },
  {
    slug: "ai-receptionist-vs-answering-service",
    title: "AI Receptionist vs. Traditional Answering Service: An Honest Comparison",
    excerpt:
      "Both promise that your phone always gets answered. But how they answer — and what happens after — couldn't be more different. Here's a straight side-by-side look.",
    category: "Guides",
    date: "2026-06-30",
    readMins: 7,
    cover: "/images/office-reception.jpg",
    short: "AI vs. Answering Service",
    pastel: "lavender",
    author: AUTHORS.james,
    blocks: [
      { t: "p", x: "If you're researching ways to stop missing calls, you've probably narrowed it down to two options: a traditional answering service with human operators, or an AI voice receptionist. Both will pick up the phone. The difference is everything that happens next." },
      { t: "h2", x: "What an answering service actually does" },
      { t: "p", x: "Traditional answering services employ human operators who answer on your behalf, usually following a basic script: take the caller's name, number, and a short message, then email it to you. They're reliable for message-taking, but operators typically serve dozens of businesses at once — they can't answer questions about your services, quote your prices, or book into your calendar." },
      { t: "p", x: "Pricing is usually per call or per minute, which means your costs scale up exactly when business gets busy. And every enquiry still lands back on your desk as a callback you have to make." },
      { t: "h2", x: "What an AI receptionist does differently" },
      { t: "p", x: "A modern AI voice receptionist like hello22 learns your business first — your services, pricing, FAQs, service areas, and booking rules — from your website or a short onboarding. Then it holds real conversations, not message-taking scripts." },
      { t: "list", items: [
        "Answers instantly, every time — no hold queue, no call limits",
        "Actually answers questions: services, pricing, availability, directions",
        "Books appointments directly into your calendar during the call",
        "Captures structured lead details, not scribbled messages",
        "Speaks naturally in 22+ languages, around the clock",
        "Flat monthly pricing that doesn't spike when call volume does",
      ] },
      { t: "h2", x: "Where humans still win" },
      { t: "p", x: "Honesty matters here: a skilled human operator handles deeply emotional or highly unusual calls with a judgement AI is still catching up to. If your calls are frequently sensitive — say, a crisis line — human coverage matters. For the everyday reality of most businesses (bookings, quotes, opening hours, \"do you service my area?\"), an AI receptionist resolves the call on the spot instead of taking a message about it." },
      { t: "quote", x: "The answering service told customers we'd call back. hello22 just... answers them. That's the whole difference.", by: "hello22 customer, dental clinic" },
      { t: "h2", x: "The bottom line" },
      { t: "p", x: "An answering service makes sure the phone is picked up. An AI receptionist makes sure the customer is handled. If your goal is fewer callbacks, more bookings, and a phone that works while you sleep, the comparison tends to settle itself — try both for a week and count the appointments." },
    ],
  },
  {
    slug: "set-up-ai-receptionist-in-22-minutes",
    title: "From Website URL to Live Receptionist: The 22-Minute Setup, Step by Step",
    excerpt:
      "No developers, no call scripts, no six-week onboarding. Here's exactly what happens in the 22 minutes between signing up for hello22 and your AI answering its first call.",
    category: "Product",
    date: "2026-06-18",
    readMins: 5,
    cover: "/images/feat-automations.jpg",
    short: "Live in 22 Minutes",
    pastel: "mint",
    author: AUTHORS.priya,
    blocks: [
      { t: "p", x: "The biggest myth about AI voice technology is that it's complicated to set up — that you'll need a developer, weeks of training calls, and a binder of scripts. We built hello22 around the opposite idea: if you can paste a link, you can launch a receptionist. Here's the actual process, minute by minute." },
      { t: "h2", x: "Minutes 0–5: Teach it your business" },
      { t: "p", x: "Paste your website URL. hello22 reads your site the way a careful new employee would — services, pricing, opening hours, FAQs, service areas — and builds a knowledge base from it. No website? Answer a short guided questionnaire instead. You can review and edit everything it learned before going live." },
      { t: "h2", x: "Minutes 5–10: Choose your voice" },
      { t: "p", x: "Pick from a library of natural voices — different accents, tones, and pacing — and preview each one saying your actual greeting. Australian business? Choose an Aussie voice. Serving customers in multiple languages? Your agent can switch between 22+ languages mid-conversation." },
      { t: "h2", x: "Minutes 10–16: Connect your calendar and rules" },
      { t: "p", x: "Connect Google Calendar or your booking system so the agent can offer real availability and book appointments during the call. Then set your handling rules: which calls to transfer to a human, what details to always capture, and what to do with emergencies." },
      { t: "list", items: [
        "Business knowledge imported and reviewed",
        "Voice and greeting selected",
        "Calendar connected for live bookings",
        "Transfer and escalation rules set",
      ] },
      { t: "h2", x: "Minutes 16–22: Test call, then go live" },
      { t: "p", x: "Call your own number and interrogate your new receptionist. Ask the awkward questions your customers ask. Tweak any answers in the dashboard — changes apply instantly. When it sounds right, forward your existing number (or use the new one we provide) and you're live." },
      { t: "tip", x: "Best first test: ask it the three questions your customers call about most. If it nails those, it'll handle 90% of your real calls on day one." },
      { t: "p", x: "That's the whole setup. No code, no consultants, no waiting. And because every call is transcribed and summarised in your dashboard, you'll spend week one just watching it work — and probably wondering why you answered your own phone for so long." },
    ],
  },
  {
    slug: "after-hours-calls-hidden-revenue",
    title: "After-Hours Calls: The Revenue Stream You're Sleeping Through",
    excerpt:
      "A surprising share of high-intent calls happen after 6pm and on weekends — exactly when nobody's there to answer. Here's how businesses are turning closed hours into booked jobs.",
    category: "Growth",
    date: "2026-06-05",
    readMins: 5,
    cover: "/images/feat-calendar.jpg",
    short: "Open After Hours",
    pastel: "lemon",
    author: AUTHORS.sarah,
    blocks: [
      { t: "p", x: "Think about when you handle your own life admin. Booking the dentist, chasing a plumber quote, finding a lawyer — it happens after work, once the kids are down, on a Sunday morning. Your customers are no different. Their day job ends, and their calling starts." },
      { t: "p", x: "That's why after-hours callers are often the most serious buyers of the day: they have an unsolved problem and finally have the time to solve it. And in most businesses, they're greeted by voicemail." },
      { t: "h2", x: "The after-hours pattern" },
      { t: "p", x: "Across hello22 customers, a consistent pattern shows up: a meaningful chunk of weekly call volume lands outside business hours — evenings, early mornings, weekends, and public holidays. For trades and emergency services it's even more pronounced. A burst pipe doesn't check your opening hours." },
      { t: "list", items: [
        "Evening callers have researched already — they're ready to book, not browse",
        "Weekend enquiries convert fast because the caller has time to commit",
        "Emergency calls after hours are the highest-value, most urgent jobs",
        "First business to respond wins — even if the job happens Monday",
      ] },
      { t: "quote", x: "Our first after-hours booking through hello22 came in at 9:40 on a Tuesday night. That one job covered the subscription for the year.", by: "hello22 customer, electrical services" },
      { t: "h2", x: "Closing the gap without losing your evenings" },
      { t: "p", x: "The old options were bad: forward calls to your personal mobile and never truly clock off, or let voicemail quietly turn buyers away. An AI receptionist is the third option — every after-hours call answered naturally, questions handled, emergencies escalated to you by your rules, and everything else booked straight into tomorrow's calendar." },
      { t: "p", x: "You wake up to a summary of every conversation and a calendar that filled itself overnight. The business was closed. The front desk wasn't." },
      { t: "tip", x: "Set an escalation rule for genuine emergencies (e.g. flooding, no power, lockouts) so those calls ring through to your on-call phone — and let the AI book everything else for the morning." },
    ],
  },
  {
    slug: "how-tradies-win-more-jobs-with-ai",
    title: "On the Tools, Off the Phone: How Tradies Win More Jobs With an AI Receptionist",
    excerpt:
      "You can't hold a phone and a power tool at the same time. For plumbers, electricians, and builders, every job site hour is also missed-call hour. Here's how the smart ones fixed it.",
    category: "Industries",
    date: "2026-05-22",
    readMins: 6,
    cover: "/images/ind-plumbing.jpg",
    short: "More Jobs, Less Phone",
    pastel: "sky",
    author: AUTHORS.james,
    blocks: [
      { t: "p", x: "There's a cruel irony in the trades: the better your week is going, the more calls you miss. Fully booked means head-down on site, hands full, phone buzzing in the ute. And every buzz you ignore might be next month's work going to whoever answered." },
      { t: "h2", x: "The job-site dilemma" },
      { t: "p", x: "Answering mid-job isn't just awkward — it's unprofessional to the customer in front of you and unsafe on plenty of sites. But not answering has a real cost: trade customers rarely leave voicemails. They just work down the list of local search results until someone picks up." },
      { t: "list", items: [
        "Quote requests answered and details captured while you stay on the tools",
        "Jobs booked straight into your calendar between your existing commitments",
        "Emergencies (burst pipes, no power) escalated to your mobile instantly",
        "Every caller greeted professionally — no more \"sorry, I'm on a roof\"",
      ] },
      { t: "h2", x: "What it sounds like to your customers" },
      { t: "p", x: "A caller rings about a hot water system. The AI answers on the second ring, asks the right questions — gas or electric, tank or continuous flow, any error codes — gives your standard call-out pricing, and books an inspection slot for Thursday morning. The caller never knows you were elbow-deep in a renovation across town. They just know your business answered when three others didn't." },
      { t: "quote", x: "I used to return calls at 7pm and get voicemail back. Now the jobs are already booked by the time I'm washing up.", by: "hello22 customer, plumbing" },
      { t: "h2", x: "Built for how trades actually work" },
      { t: "p", x: "hello22 learns your services, call-out fees, and service areas from your website in minutes. It knows a blocked drain from a burst main, quotes your real prices, and follows your rules on what's urgent. Whether you're a solo sparkie or running five crews, the phone gets answered like you've got a full-time front office — because now you do." },
      { t: "tip", x: "Tradies get the most value from two rules: instant SMS to your phone with every new lead's details, and emergency escalation for the job types you charge premium call-out rates on." },
    ],
  },
  {
    slug: "multilingual-ai-voice-agents",
    title: "One Receptionist, 22 Languages: Why Multilingual Answering Is a Growth Lever",
    excerpt:
      "Millions of your potential customers prefer doing business in a language other than English. A receptionist who switches languages mid-call turns that preference into loyalty.",
    category: "Product",
    date: "2026-05-10",
    readMins: 5,
    cover: "/images/feat-english.jpg",
    short: "22 Languages, One Voice",
    pastel: "cream",
    author: AUTHORS.priya,
    blocks: [
      { t: "p", x: "In Australia alone, more than one in five people speak a language other than English at home. The numbers are similar or higher across the US, UK, and Canada. For a local business, that's not a demographic footnote — it's a customer base that most competitors quietly turn away every time the phone is answered in English only." },
      { t: "h2", x: "Language is trust" },
      { t: "p", x: "When a customer explains a plumbing emergency, a legal question, or a medical booking, they want zero ambiguity. Being able to do that in their strongest language isn't a luxury — it's the difference between booking with confidence and hanging up to \"think about it.\" Businesses that serve customers in their own language don't just win the call; they win the family, the referrals, and the reviews." },
      { t: "h2", x: "How hello22 handles it" },
      { t: "p", x: "Your hello22 agent detects the caller's language and switches naturally mid-conversation — no menus, no \"press 2 for...\", no transfers to a special line. The same agent that books appointments and answers pricing questions in English does it just as smoothly in Mandarin, Arabic, Spanish, Hindi, Vietnamese, Greek, and 22+ languages in total." },
      { t: "list", items: [
        "Automatic language detection — the caller just talks",
        "Full capability in every language: bookings, quotes, FAQs, lead capture",
        "Call summaries delivered to you in English, whatever language the call was in",
        "One flat price — multilingual isn't a premium add-on",
      ] },
      { t: "quote", x: "Half our suburb speaks Vietnamese at home. The week we turned on multilingual answering, our bookings from the local community noticeably jumped.", by: "hello22 customer, dental clinic" },
      { t: "h2", x: "A bigger front door" },
      { t: "p", x: "You don't need a multilingual staff roster or a translation service on retainer. You need every caller — in any language, at any hour — to be understood, helped, and booked. That's what a modern AI receptionist makes standard. Your competitors' phones only work in English. Yours doesn't have to." },
      { t: "tip", x: "Serving a multicultural area? Mention your languages on your Google Business Profile — 'Se habla español' style callouts measurably lift call volume from those communities." },
    ],
  },
];

// 2 naye articles (user request 2026-07-13) — array ke END mein taaki "Latest" order na bigde.
BLOG_POSTS.push(
  {
    slug: "ai-receptionist-for-clinics",
    title: "The Front Desk Cure: How Clinics Keep Every Patient Call From Slipping Away",
    excerpt:
      "Dental and medical clinics lose bookings every day to busy signals and hold music. Here's how practices are using AI reception to answer every patient — without adding staff.",
    category: "Industries",
    date: "2026-04-28",
    readMins: 6,
    cover: "/images/industry-dental.jpg",
    short: "Every Patient, Answered",
    pastel: "mint",
    author: AUTHORS.sarah,
    blocks: [
      { t: "p", x: "Walk past any clinic's front desk at 9am on a Monday and you'll see the same scene: two phones ringing, a patient checking in at the counter, and a receptionist doing their best to be three people at once. Every ring that goes unanswered is a patient who may book elsewhere — and in healthcare, they usually don't call back." },
      { t: "h2", x: "Why clinic calls are different" },
      { t: "p", x: "Clinic calls are rarely casual. Patients call to book, reschedule, chase results, or because something hurts. They're often anxious, and hold music makes anxious people hang up. Unlike retail, a lost clinic call isn't just lost revenue — it's a person who needed help and didn't get through." },
      { t: "list", items: [
        "Peak call times collide with peak front-desk times — mornings and lunch",
        "Reschedules and cancellations clog the line for new-patient bookings",
        "After-hours callers get voicemail exactly when they finally have time to call",
        "Every missed new-patient call can be worth thousands in lifetime value",
      ] },
      { t: "h2", x: "What an AI receptionist handles at a clinic" },
      { t: "p", x: "hello22 answers on the first ring, every time. It books and reschedules appointments straight into the practice calendar, answers the routine questions that eat the front desk's day — hours, parking, insurance, pricing for common treatments — and captures new-patient details completely and legibly." },
      { t: "quote", x: "Our receptionist used to dread Mondays. Now the AI catches the morning rush, and she actually gets to look up and greet the patients standing in front of her.", by: "hello22 customer, dental clinic" },
      { t: "h2", x: "The human front desk gets better, not smaller" },
      { t: "p", x: "The goal isn't replacing the front desk — it's letting the people at the desk focus on the patients who are physically there, while no caller ever hits voicemail. Practices tell us the biggest change isn't even the recovered bookings; it's the calm." },
      { t: "tip", x: "Clinics get the best results by connecting their practice calendar first — when the AI can offer real appointment slots on the first call, booking rates jump immediately." },
    ],
  },
  {
    slug: "choosing-an-ai-receptionist",
    title: "10 Questions to Ask Before You Choose an AI Receptionist",
    excerpt:
      "Every AI phone product promises the same magic. These ten questions — from setup time to what happens on a bad call — will show you which ones can actually deliver.",
    category: "Guides",
    date: "2026-04-15",
    readMins: 7,
    cover: "/images/feat-voices.jpg",
    short: "Choose the Right AI",
    pastel: "lavender",
    author: AUTHORS.james,
    blocks: [
      { t: "p", x: "The AI receptionist market is crowded, and every landing page sounds identical: natural voice, 24/7 answering, happy customers. The differences only show up after you've signed up — unless you know what to ask first. Here are the ten questions we'd ask any vendor, including us." },
      { t: "h2", x: "Setup and knowledge" },
      { t: "list", items: [
        "1. How long does setup actually take — minutes, or a project plan?",
        "2. How does it learn my business — can it read my website, or do I fill in forms for hours?",
        "3. Can I edit what it says after going live, and do changes apply instantly?",
      ] },
      { t: "p", x: "If the answer to question one involves an onboarding call with a solutions engineer, that tells you everything about the next twelve months. Modern platforms learn from your website in minutes and let you correct any answer yourself, instantly." },
      { t: "h2", x: "The conversation itself" },
      { t: "list", items: [
        "4. Does it actually converse, or walk callers through a disguised phone menu?",
        "5. What happens when a caller goes off-script or changes topic mid-call?",
        "6. Can it book real appointments into my real calendar during the call?",
        "7. What does it do with an emergency or an angry caller — and can I set those rules?",
      ] },
      { t: "quote", x: "Ask every vendor the same question: 'What happens when it doesn't know the answer?' The honest ones have a real fallback. The rest change the subject.", by: "James Carter, Customer Success at hello22" },
      { t: "h2", x: "Trust and follow-through" },
      { t: "list", items: [
        "8. Do I get a transcript and summary of every call, delivered where I work — email, SMS, WhatsApp?",
        "9. Where does my data live, and is it ever sold or used to train other businesses' agents?",
        "10. What does it cost when my call volume doubles — flat rate, or a surprise invoice?",
      ] },
      { t: "p", x: "A good AI receptionist should feel like hiring a brilliant employee who never sleeps — not like adopting a software project. Ask the ten questions, take the free trials, and call your own number often. The right answer will be obvious within a week." },
      { t: "tip", x: "Run the same three test calls on every product you trial: a booking, an oddball question, and a fake emergency. Compare the transcripts side by side." },
    ],
  },
);

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
