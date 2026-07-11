"use client";

import * as React from "react";
import { motion } from "framer-motion";
import ProfileCard from "@/components/ui/ProfileCard";

type Member = {
  name: string;
  role: string;
  avatar: string;
  handle: string;
  status: string;
  socials?: {
    github?: string;
    linkedin?: string;
  };
};

const TEAM: Member[] = [
  {
    name: "Piyush Lingwal",
    role: "Builder Group Leader",
    avatar: "/members/piyushlingwal.png",
    handle: "piyushlingwal",
    status: "Building AI",
    socials: { github: "https://github.com/", linkedin: "https://linkedin.com/" }
  },
  {
    name: "Piyush Rawat",
    role: "Revealing soon...",
    avatar: "/members/piyushrawat.png",
    handle: "piyushrawat",
    status: "Operating",
    socials: { github: "https://github.com/", linkedin: "https://linkedin.com/" }
  },
  {
    name: "Coming Soon...",
    role: "More Builders Joining",
    avatar: "",
    handle: "loading",
    status: "Offline",
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Team() {
  return (
    <section id="team" className="bg-grid bg-noise relative bg-bg min-h-screen">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/8 blur-[160px]"
      />

      <div className="relative mx-auto max-w-content px-6 py-24 lg:py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center md:text-left"
        >
          <motion.p
            variants={itemVariants}
            className="text-[11px] uppercase tracking-[0.16em] text-muted"
          >
            The Team
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="mt-4 font-display text-[36px] font-semibold leading-[1.1] tracking-tight text-text-primary sm:text-[44px]"
          >
            Builders behind the{" "}
            <span className="text-gradient">builders.</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-5 max-w-lg text-[16px] leading-relaxed text-text-secondary mx-auto md:mx-0"
          >
            Students who organise, teach, mentor, and keep the community
            running.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-items-center"
        >
          {TEAM.map((member) => (
            <motion.div key={member.name} variants={itemVariants} className="w-full max-w-[340px]">
              <ProfileCard
                name={member.name}
                title={member.role}
                handle={member.handle}
                status={member.status}
                contactText="Connect"
                avatarUrl={member.avatar}
                showUserInfo={false}
                enableTilt={true}
                behindGlowEnabled={true}
                innerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
                socials={member.socials}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
