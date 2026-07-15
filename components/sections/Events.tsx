"use client";

import * as React from "react";
import { CalendarDays, MapPin, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Event = {
  title: string;
  date: string;
  location: string;
  tag: string;
  tagColor: string;
  description: string;
};

const UPCOMING_EVENTS: Event[] = [
  {
    title: "AWS Cloud Practitioner Bootcamp",
    date: "Aug 15 – 17, 2026",
    location: "CS Lab 204, Tulas Institute",
    tag: "Workshop",
    tagColor: "bg-primary/15 text-primary-light",
    description:
      "Three-day intensive covering core AWS services, IAM, S3, EC2, and Lambda. Walk out exam-ready.",
  },
  {
    title: "Build Day: Serverless Chat App",
    date: "Aug 28, 2026",
    location: "Virtual (Discord)",
    tag: "Hackathon",
    tagColor: "bg-accent/15 text-accent",
    description:
      "Build and deploy a real-time serverless chat application using API Gateway, Lambda, and DynamoDB in a single day.",
  },
  {
    title: "Cloud Resume Challenge Sprint",
    date: "Sep 06 – 07, 2026",
    location: "Co-working Space, Campus",
    tag: "Challenge",
    tagColor: "bg-success/15 text-success",
    description:
      "Complete the Cloud Resume Challenge over a weekend — host your portfolio on AWS with CI/CD and IaC.",
  },
  {
    title: "AWS re:Invent Watch Party",
    date: "Dec 02, 2026",
    location: "Auditorium, Tulas Institute",
    tag: "Community",
    tagColor: "bg-info/15 text-info",
    description:
      "Stream the AWS re:Invent keynote together, discuss new launches, and plan projects around freshly announced services.",
  },
];

export function Events() {
  const containerRef = React.useRef<HTMLElement>(null);

  useGSAP(() => {
    // Header reveal
    gsap.from(".events-header-el", {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".events-header-container",
        start: "top 85%",
      },
    });

    // Event cards reveal
    gsap.from(".event-card", {
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".events-list-container",
        start: "top 85%",
      },
    });

    // Refresh ScrollTrigger to calculate offsets correctly after DOM is fully laid out
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => clearTimeout(refreshTimer);
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="events" className="bg-grid bg-noise relative overflow-hidden bg-bg min-h-screen">
      {/* Headline ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/4 top-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]"
      />
      {/* Secondary glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/3 h-[480px] w-[480px] translate-x-1/3 rounded-full bg-secondary/8 blur-[140px]"
      />

      <div className="relative mx-auto max-w-content px-4 sm:px-6 pt-28 pb-16 md:pt-32 md:pb-24 lg:pt-32 lg:pb-32">
        <div className="events-header-container">
          <p className="events-header-el text-[11px] uppercase tracking-[0.16em] text-muted">
            Upcoming Events
          </p>
          <h2 className="events-header-el mt-4 font-display text-[32px] sm:text-[36px] md:text-[44px] font-semibold leading-[1.1] tracking-tight text-text-primary">
            What&apos;s on the{" "}
            <span className="text-gradient">schedule.</span>
          </h2>
          <p className="events-header-el mt-4 sm:mt-5 max-w-lg text-[15px] sm:text-[16px] leading-relaxed text-text-secondary">
            Workshops, hackathons, study jams, and build days — there&apos;s
            always something happening in the community.
          </p>
        </div>

        <div className="events-list-container mt-16 flex flex-col gap-4">
          {UPCOMING_EVENTS.map((event, idx) => (
            <div
              key={idx}
              className="event-card group relative overflow-hidden rounded-xl border border-border bg-border/40 transition-colors hover:bg-border/60 sm:p-px"
            >
              {/* Inner card content (handles the 1px border gradient on hover) */}
              <div className="relative flex flex-col sm:flex-row h-full w-full justify-between gap-6 sm:gap-8 rounded-[11px] bg-bg p-6 sm:p-8">
                {/* Left col: Date & Location */}
                <div className="flex shrink-0 flex-col justify-between sm:w-48 lg:w-56">
                  <div>
                    <span className="inline-flex rounded bg-white/[0.04] px-2.5 py-1 text-[12px] font-medium text-text-secondary ring-1 ring-inset ring-white/10">
                      {event.date}
                    </span>
                  </div>
                  <div className="mt-6 sm:mt-0 flex items-start gap-2 text-[13px] text-muted">
                    <MapPin size={16} className="shrink-0 text-text-secondary" />
                    <span>{event.location}</span>
                  </div>
                </div>

                {/* Right col: Details */}
                <div className="flex flex-1 flex-col">
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium tracking-wide ${event.tagColor}`}
                    >
                      {event.tag}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-[20px] font-semibold text-text-primary transition-colors group-hover:text-primary-light">
                    {event.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-text-secondary max-w-2xl">
                    {event.description}
                  </p>
                </div>

                {/* Arrow Icon */}
                <div className="absolute right-6 top-6 sm:relative sm:right-auto sm:top-auto flex items-start">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white/[0.02] text-text-secondary transition-all duration-300 group-hover:bg-primary group-hover:border-primary group-hover:text-white group-hover:rotate-45">
                    <ArrowUpRight size={18} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
