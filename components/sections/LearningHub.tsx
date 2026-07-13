"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Award, BookOpen, Play, FileCode2 } from "lucide-react";

type Resource = {
  icon: React.ElementType;
  title: string;
  description: string;
  link: string;
  linkLabel: string;
  accent: string;
};

const RESOURCES: Resource[] = [
  {
    icon: Award,
    title: "AWS Certifications Path",
    description:
      "Curated study paths for Cloud Practitioner, Solutions Architect, and Developer Associate — with free practice exams and study groups.",
    link: "#",
    linkLabel: "View paths",
    accent: "bg-primary/10 text-primary-light",
  },
  {
    icon: BookOpen,
    title: "Workshop Archives",
    description:
      "Slides, code repos, and recordings from every workshop we've hosted — from intro-level to advanced serverless patterns.",
    link: "#",
    linkLabel: "Browse workshops",
    accent: "bg-accent/10 text-accent",
  },
  {
    icon: Play,
    title: "AWS Skill Builder",
    description:
      "Access 600+ free digital courses, labs, and learning plans on AWS Skill Builder. Build hands-on skills at your own pace.",
    link: "https://skillbuilder.aws",
    linkLabel: "Start learning",
    accent: "bg-success/10 text-success",
  },
  {
    icon: FileCode2,
    title: "Project Starter Kits",
    description:
      "Boilerplates for common AWS patterns — REST APIs with Lambda, static sites on S3 + CloudFront, CI/CD with CodePipeline, and more.",
    link: "#",
    linkLabel: "Clone a starter",
    accent: "bg-info/10 text-info",
  },
  {
    icon: Award,
    title: "AWS Educate Credits",
    description:
      "Members get access to AWS Educate credits for hands-on practice. Build real projects without worrying about costs.",
    link: "#",
    linkLabel: "Apply for credits",
    accent: "bg-warning/10 text-warning",
  },
  {
    icon: BookOpen,
    title: "Community Blog",
    description:
      "Technical write-ups, project deep-dives, and certification journeys written by our members. Learn from real builder experiences.",
    link: "#",
    linkLabel: "Read posts",
    accent: "bg-secondary/10 text-secondary",
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

export function LearningHub() {
  return (
    <section id="learning-hub" className="bg-grid bg-noise relative overflow-hidden bg-bg min-h-screen">
      {/* Headline ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/4 top-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]"
      />
      {/* Secondary glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-1/4 bottom-0 h-[420px] w-[420px] translate-y-1/3 rounded-full bg-accent/6 blur-[130px]"
      />

      <div className="relative mx-auto max-w-content px-4 sm:px-6 pt-28 pb-16 md:pt-36 md:pb-24 lg:pt-40 lg:pb-32">
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
            Learning Hub
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="mt-4 font-display text-[32px] sm:text-[36px] md:text-[44px] font-semibold leading-[1.1] tracking-tight text-text-primary"
          >
            Resources to{" "}
            <span className="text-gradient">level up.</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-4 sm:mt-5 max-w-lg text-[15px] sm:text-[16px] leading-relaxed text-text-secondary"
          >
            Everything you need to go from cloud-curious to cloud-certified —
            free workshops, starter kits, credits, and a community to learn with.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {RESOURCES.map((resource) => {
            const Icon = resource.icon;
            return (
              <motion.a
                key={resource.title}
                href={resource.link}
                variants={itemVariants}
                className="group flex flex-col gap-4 rounded-xl border border-border bg-bg p-6 transition-all duration-300 hover:border-primary-light/30 hover:bg-white/[0.02]"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${resource.accent} transition-colors duration-200`}
                  >
                    <Icon size={20} strokeWidth={1.75} />
                  </span>
                  <ExternalLink
                    size={14}
                    className="text-muted opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:text-primary-light"
                  />
                </div>

                <h3 className="font-display text-[16px] font-semibold tracking-tight text-text-primary">
                  {resource.title}
                </h3>

                <p className="text-sm leading-relaxed text-text-secondary">
                  {resource.description}
                </p>

                <span className="mt-auto text-[13px] font-medium text-primary-light transition-colors group-hover:text-primary">
                  {resource.linkLabel} →
                </span>
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
