"use client";

import Image from "next/image";
import {
  Stethoscope,
  Smile,
  Globe,
  Scale,
  Home,
  Scissors,
  UtensilsCrossed,
  Wrench,
} from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import { Stagger, StaggerItem } from "./ui/Reveal";

const industries = [
  {
    icon: Stethoscope,
    image: "/images/industry-medical.jpg",
    title: "Medical Clinics",
    description: "Book patient appointments and answer common questions around the clock.",
  },
  {
    icon: Smile,
    image: "/images/industry-dental.jpg",
    title: "Dental Practices",
    description: "Fill your chair time with automatic scheduling and reminders for callers.",
  },
  {
    icon: Globe,
    image: "/images/industry-immigration.jpg",
    title: "Immigration Consultants",
    description: "Capture every inquiry and schedule consultations — even across time zones.",
  },
  {
    icon: Scale,
    image: "/images/industry-law.jpg",
    title: "Law Firms",
    description: "Screen potential clients professionally and route urgent matters to you.",
  },
  {
    icon: Home,
    image: "/images/industry-realestate.jpg",
    title: "Real Estate Agencies",
    description: "Respond to listing inquiries instantly and book showings while you're out.",
  },
  {
    icon: Scissors,
    image: "/images/industry-salon.jpg",
    title: "Salons & Spas",
    description: "Take bookings while your stylists stay focused on the clients in the chair.",
  },
  {
    icon: UtensilsCrossed,
    image: "/images/industry-restaurant.jpg",
    title: "Restaurants",
    description: "Handle reservations, hours, and menu questions during your busiest rush.",
  },
  {
    icon: Wrench,
    image: "/images/industry-homeservices.jpg",
    title: "Home Services",
    description: "Win the job by answering first — capture details and schedule estimates.",
  },
];

export function Industries() {
  return (
    <section id="industries" className="section-padding bg-white">
      <div className="container-site">
        <SectionHeading
          eyebrow="Built For You"
          title="Perfect for any service-based business"
          description="If your customers call to ask questions or book appointments, your AI Receptionist is ready on day one."
        />

        <Stagger
          className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          staggerDelay={0.07}
        >
          {industries.map((industry) => (
            <StaggerItem key={industry.title}>
              <div className="card-soft group h-full overflow-hidden">
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={industry.image}
                    alt={industry.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/95 text-primary shadow-md">
                    <industry.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-base font-bold text-navy">
                    {industry.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {industry.description}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
