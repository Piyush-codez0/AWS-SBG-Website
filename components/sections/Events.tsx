"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { CalendarDays, MapPin, ArrowUpRight } from "lucide-react";

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

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Events() {
  return (
    <section id="events" className="bg-grid bg-noise relative overflow-hidden bg-bg min-h-screen">
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
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p
            variants={itemVariants}
            className="text-[11px] uppercase tracking-[0.16em] text-muted"
          >
            Upcoming Events
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="mt-4 font-display text-[32px] sm:text-[36px] md:text-[44px] font-semibold leading-[1.1] tracking-tight text-text-primary"
          >
            What&apos;s on the{" "}
            <span className="text-gradient">calendar.</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-4 sm:mt-5 max-w-lg text-[15px] sm:text-[16px] leading-relaxed text-text-secondary"
          >
            Workshops, hackathons, study jams, and build days — there&apos;s
            always something happening in the community.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-14 grid gap-4 sm:grid-cols-2"
        >
          {UPCOMING_EVENTS.map((event) => (
            <motion.article
              key={event.title}
              variants={itemVariants}
              className="group relative flex flex-col gap-4 rounded-xl border border-border bg-bg-surface/40 p-6 transition-all duration-300 hover:border-primary-light/30 hover:bg-white/[0.02]"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider ${event.tagColor}`}
                >
                  {event.tag}
                </span>
                <ArrowUpRight
                  size={16}
                  className="text-muted transition-all duration-200 group-hover:text-primary-light group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </div>

              <h3 className="font-display text-lg font-semibold tracking-tight text-text-primary">
                {event.title}
              </h3>

              <p className="text-sm leading-relaxed text-text-secondary">
                {event.description}
              </p>

              <div className="mt-auto flex flex-wrap items-center gap-4 border-t border-border pt-4 text-[13px] text-muted">
                <span className="flex items-center gap-1.5">
                  <CalendarDays size={14} />
                  {event.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} />
                  {event.location}
                </span>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
