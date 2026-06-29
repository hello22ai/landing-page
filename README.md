# hello22 â€” AI Receptionist Landing Page
//test
A premium, high-conversion SaaS landing page for an AI Receptionist & AI Call
Answering Service, built with Next.js 15, TypeScript, Tailwind CSS, and
Framer Motion.

## Getting Started

```bash
npm install
npm run dev      # development server at http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Project Structure

```
app/
  layout.tsx        # Root layout, fonts, SEO metadata (Open Graph, Twitter)
  page.tsx          # Landing page assembling all sections
  globals.css       # Tailwind layers, shared button/section utilities
components/
  Navbar.tsx        # Sticky navbar with scroll state + mobile menu
  Hero.tsx          # Hero with animated live-call dashboard mockup
  TrustBar.tsx      # Capability trust badges
  Problem.tsx       # "Every Missed Call Is Lost Revenue" cards
  Solution.tsx      # Feature cards with hover animations
  HowItWorks.tsx    # 4-step process timeline
  Benefits.tsx      # Benefit card grid
  Industries.tsx    # 8 industry cards
  Testimonials.tsx  # Business owner testimonial cards
  LeadForm.tsx      # Consultation lead form with success state
  FAQ.tsx           # Animated accordion
  FinalCTA.tsx      # Closing call-to-action
  Footer.tsx        # Footer with links + socials
  ui/
    Reveal.tsx          # Scroll-reveal + stagger animation primitives
    SectionHeading.tsx  # Reusable eyebrow/title/description heading
```

## Lead Form â†’ CRM Integration

The form in `components/LeadForm.tsx` builds a complete JSON payload on
submit (`handleSubmit`). To connect it to your CRM or backend, replace the
`console.log` with a `fetch` POST to your endpoint, e.g.:

```ts
await fetch("/api/leads", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
});
```

## Customization

- **Brand colors** â€” defined in `tailwind.config.ts` (`navy`, `primary`,
  `accent`, `surface`).
- **Business name** â€” search for "hello22" in `Navbar.tsx`,
  `Footer.tsx`, and `app/layout.tsx`.
- **Domain** â€” update `metadataBase` in `app/layout.tsx` before deploying.

