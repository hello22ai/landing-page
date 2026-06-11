"use client";

import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "./ui/Reveal";

const testimonials = [
  {
    quote:
      "We were missing 15 to 20 calls a week — mostly evenings and lunch hours. Since the AI Receptionist took over, every call is answered and our bookings are up almost 40%. It paid for itself in the first month.",
    name: "Dr. Melissa Tran",
    role: "Owner, Brightside Dental Clinic",
    image: "/images/portrait-melissa.jpg",
  },
  {
    quote:
      "As a solo realtor, I'm in showings half the day. Now every inquiry gets answered immediately, and I get the caller's details texted to me before I'm even out of the building. I've closed deals I would have completely missed.",
    name: "James Carter",
    role: "Principal Agent, Carter Realty Group",
    image: "/images/portrait-james.jpg",
  },
  {
    quote:
      "Our front desk used to be overwhelmed during peak hours. The AI handles appointment calls and common questions so smoothly that most clients don't realize they weren't talking to our staff. It's been a game changer.",
    name: "Priya Sharma",
    role: "Director, Sharma Immigration Services",
    image: "/images/portrait-priya.jpg",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="section-padding bg-surface">
      <div className="container-site">
        <SectionHeading
          eyebrow="Customer Stories"
          title="Trusted by business owners like you"
          description="See how service businesses are capturing more leads and booking more appointments — automatically."
        />

        <Reveal delay={0.1} className="mt-8 flex items-center justify-center gap-3">
          <span className="flex gap-1" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
            ))}
          </span>
          <span className="text-sm font-semibold text-navy">
            5.0 average
            <span className="font-normal text-slate-500"> from 120+ service businesses</span>
          </span>
        </Reveal>

        <Stagger className="mt-12 grid gap-5 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => {
            const featured = index === 1;
            return (
              <StaggerItem key={testimonial.name}>
                <figure
                  className={`relative flex h-full flex-col rounded-3xl p-8 ring-1 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover ${
                    featured
                      ? "bg-navy ring-white/10 lg:scale-[1.03]"
                      : "bg-white ring-slate-900/[0.06] hover:ring-primary/20"
                  }`}
                >
                  <Quote
                    className={`absolute right-7 top-7 h-8 w-8 ${
                      featured ? "text-white/10" : "text-primary-100"
                    }`}
                    aria-hidden="true"
                  />
                  <div className="flex gap-1" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-amber-400 text-amber-400"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <blockquote
                    className={`mt-5 flex-1 text-[15px] leading-relaxed ${
                      featured ? "text-slate-300" : "text-slate-600"
                    }`}
                  >
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <figcaption
                    className={`mt-7 flex items-center gap-3.5 border-t pt-6 ${
                      featured ? "border-white/10" : "border-slate-100"
                    }`}
                  >
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={44}
                      height={44}
                      className="h-11 w-11 rounded-full object-cover ring-2 ring-primary/30"
                    />
                    <div>
                      <p className={`text-sm font-bold ${featured ? "text-white" : "text-navy"}`}>
                        {testimonial.name}
                      </p>
                      <p className={`text-xs ${featured ? "text-slate-400" : "text-slate-500"}`}>
                        {testimonial.role}
                      </p>
                    </div>
                  </figcaption>
                </figure>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
