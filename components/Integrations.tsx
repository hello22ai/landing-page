"use client";

import {
  AudioLines,
  Phone,
  MessageCircle,
  CreditCard,
  CalendarDays,
  Webhook,
  Mail,
  Database,
} from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import { Stagger, StaggerItem } from "./ui/Reveal";

const integrations = [
  { icon: AudioLines, name: "Vapi", sub: "Voice & telephony" },
  { icon: Phone, name: "Twilio", sub: "Numbers & SMS" },
  { icon: MessageCircle, name: "WhatsApp", sub: "Meta Cloud API" },
  { icon: CreditCard, name: "Stripe", sub: "Billing" },
  { icon: CalendarDays, name: "Google Calendar", sub: "Lead delivery" },
  { icon: Webhook, name: "Custom webhooks", sub: "Your own endpoint" },
  { icon: Mail, name: "Email summaries", sub: "Owner digests" },
  { icon: Database, name: "S3", sub: "Document & brand storage" },
];

export function Integrations() {
  return (
    <section id="integrations" className="section-padding bg-navy">
      <div className="container-site">
        <SectionHeading
          eyebrow="Integrations"
          title={
            <>
              Connects to the <em>tools you already use.</em>
            </>
          }
          description="hello22 plugs into your phone system, billing, messaging, and lead flow."
        />

        <Stagger className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {integrations.map((item) => (
            <StaggerItem key={item.name}>
              <div className="card-soft flex flex-col gap-3 p-5">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10">
                  <item.icon
                    className="h-5 w-5 text-primary"
                    aria-hidden="true"
                  />
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">
                    {item.name}
                  </p>
                  <p className="font-mono text-[11px] text-muted">{item.sub}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <p className="mt-8 text-center font-mono text-xs text-muted">
          + REST API for everything else
        </p>
      </div>
    </section>
  );
}
