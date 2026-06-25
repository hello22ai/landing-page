import {
  Wrench,
  Stethoscope,
  Scissors,
  Home,
  Scale,
  BellRing,
} from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import { Stagger, StaggerItem } from "./ui/Reveal";

type UseCase = {
  icon: typeof Wrench;
  title: string;
  description: string;
};

const useCases: UseCase[] = [
  {
    icon: Wrench,
    title: "Trades & home services",
    description:
      "Never miss an after-hours emergency. Book jobs, capture the address and issue, and text yourself the details instantly.",
  },
  {
    icon: Stethoscope,
    title: "Clinics & practices",
    description:
      "Handle appointment requests, FAQs, and intake — politely transferring the calls that need a human.",
  },
  {
    icon: Scissors,
    title: "Salons & spas",
    description:
      "Take bookings and answer 'are you open / how much' questions while you're with a client.",
  },
  {
    icon: Home,
    title: "Real estate",
    description: "Capture every property enquiry and book viewings, even at 2 AM.",
  },
  {
    icon: Scale,
    title: "Legal & professional services",
    description:
      "Screen and qualify new enquiries, then route the right ones to you.",
  },
  {
    icon: BellRing,
    title: "Hospitality",
    description:
      "Reservations, hours, and guest questions answered around the clock.",
  },
];

export function Industries() {
  return (
    <section id="use-cases" className="section-padding bg-base">
      <div className="container-site">
        <SectionHeading
          eyebrow="Use cases"
          title={<>Built for every <em>business that takes calls.</em></>}
          description="If your customers call to book, ask, or enquire, hello22 is ready on day one."
        />

        <Stagger className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {useCases.map((useCase) => {
            const Icon = useCase.icon;
            return (
              <StaggerItem key={useCase.title}>
                <div className="card-soft group h-full rounded-[20px] bg-card p-7 ring-1 ring-white/[0.08] transition-transform duration-300 hover:-translate-y-1">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 font-semibold text-white">{useCase.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">
                    {useCase.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
