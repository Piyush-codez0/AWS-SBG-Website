"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Cloud, Users, Rocket, BookOpen } from "lucide-react";

const PILLARS = [
  {
    icon: Cloud,
    title: "Cloud-First Learning",
    description:
      "Hands-on workshops with real AWS services — not just slides. Build, deploy, and break things in live sandbox environments.",
  },
  {
    icon: Users,
    title: "Peer-Driven Community",
    description:
      "A tight-knit group of student builders who review each other's code, share resources, and push each other to ship.",
  },
  {
    icon: Rocket,
    title: "Hackathons & Challenges",
    description:
      "Regular build sprints, AWS-sponsored hackathons, and coding challenges that test your skills under real constraints.",
  },
  {
    icon: BookOpen,
    title: "Certification Support",
    description:
      "Study groups, exam prep sessions, and AWS credit programs to help you earn industry-recognized cloud certifications.",
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export function About() {
  return (
    <section id="about" className="bg-grid bg-noise relative bg-bg">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/4 top-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-content px-4 sm:px-6 py-16 md:py-24 lg:py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-2xl"
        >
          <motion.p
            variants={itemVariants}
            className="text-[11px] uppercase tracking-[0.16em] text-muted"
          >
            What we do
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="mt-4 font-display text-[32px] sm:text-[36px] md:text-[44px] font-semibold leading-[1.1] tracking-tight text-text-primary"
          >
            We don&apos;t just learn cloud.
            <br />
            <span className="text-gradient">We build on it.</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-4 sm:mt-5 max-w-lg text-[15px] sm:text-[16px] leading-relaxed text-text-secondary"
          >
            AWS Student Builder Group is a community of makers who believe the
            best way to learn cloud is to build real projects, break things, and
            iterate fast — together.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-16 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4"
        >
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                variants={itemVariants}
                className="group flex flex-col gap-4 relative bg-bg p-6 sm:p-8 md:p-10 transition-colors hover:bg-white/[0.02]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary-light transition-colors duration-200 group-hover:bg-primary/20">
                  <Icon size={20} strokeWidth={1.75} />
                </span>
                <h3 className="font-display text-[17px] font-semibold tracking-tight text-text-primary">
                  {pillar.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
