import Hello22Site from "@/components/site22/Hello22Site";

// Structured data (Google rich results) — homepage-only, isliye layout ke bajaye yahan.
// Reviews/pricing Hello22Site ke TESTIMONIALS/PLANS se match karte hain — wahan content
// badle to ise bhi sync karna hai.
const JSONLD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "hello22.ai",
  url: "https://www.hello22.ai/",
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "AI Voice Receptionist",
  operatingSystem: "Web",
  description:
    "hello22.ai is a 24/7 AI voice receptionist that answers every call, books appointments, qualifies leads, resolves customer questions, and automates business phone conversations using natural AI voices.",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    bestRating: "5",
    worstRating: "1",
    ratingCount: "6",
    reviewCount: "6",
  },
  offers: [
    { "@type": "Offer", name: "Starter", price: "49", priceCurrency: "AUD", availability: "https://schema.org/InStock", url: "https://www.hello22.ai/#pricing" },
    { "@type": "Offer", name: "Standard", price: "69", priceCurrency: "AUD", availability: "https://schema.org/InStock", url: "https://www.hello22.ai/#pricing" },
    { "@type": "Offer", name: "Premium", price: "89", priceCurrency: "AUD", availability: "https://schema.org/InStock", url: "https://www.hello22.ai/#pricing" },
  ],
  review: [
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Dr. Melissa Tran" },
      publisher: { "@type": "Organization", name: "Brightside Dental Clinic" },
      datePublished: "2026",
      reviewBody:
        "We were missing 15 to 20 calls a week—mostly evenings and lunch hours. Since hello22 took over, every call is answered and our bookings are up almost 40%.",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5", worstRating: "1" },
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "James Carter" },
      publisher: { "@type": "Organization", name: "Carter Realty Group" },
      datePublished: "2026",
      reviewBody:
        "I'm in showings half the day. Now every enquiry is answered instantly, and the caller's details are texted to me before I'm even out of the building.",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5", worstRating: "1" },
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Priya Sharma" },
      publisher: { "@type": "Organization", name: "Sharma Immigration Services" },
      datePublished: "2026",
      reviewBody:
        "The AI handles appointment calls so smoothly that most clients don't realise they weren't talking to our staff. Our front desk finally has room to breathe.",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5", worstRating: "1" },
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Mark Reynolds" },
      publisher: { "@type": "Organization", name: "Reynolds Plumbing Co." },
      datePublished: "2026",
      reviewBody:
        "hello22 answers our after-hours emergency calls now. Last month it booked two big jobs that would have gone straight to voicemail.",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5", worstRating: "1" },
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Sophie Nguyen" },
      publisher: { "@type": "Organization", name: "SparkRight Electrical" },
      datePublished: "2026",
      reviewBody:
        "Our team is on the tools all day. The AI takes every call, sorts urgent from routine, and the summary lands on WhatsApp before we're off the ladder.",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5", worstRating: "1" },
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "David Okafor" },
      publisher: { "@type": "Organization", name: "FreshNest Cleaning" },
      datePublished: "2026",
      reviewBody:
        "Quotes used to slip through whenever we missed a call. Now every enquiry is captured, and half our bookings happen while we're still on another job.",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5", worstRating: "1" },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }} />
      <Hello22Site />
    </>
  );
}
