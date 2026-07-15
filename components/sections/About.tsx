"use client";

import * as React from "react";
import { Cloud, Users, Rocket, BookOpen } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

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

export function About() {
  const containerRef = React.useRef<HTMLElement>(null);

  useGSAP(() => {
    // Header text reveal
    gsap.from(".about-header-element", {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".about-header-container",
        start: "top 85%",
      },
    });

    // Grid items reveal
    gsap.from(".about-grid-item", {
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".about-grid-container",
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
    <section ref={containerRef} id="about" className="bg-grid bg-noise relative overflow-hidden bg-bg min-h-screen">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/4 top-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-content px-4 sm:px-6 pt-28 pb-16 md:pt-32 md:pb-24 lg:pt-32 lg:pb-32">
        <div className="max-w-2xl about-header-container">
          <p className="about-header-element text-[11px] uppercase tracking-[0.16em] text-muted">
            What we do
          </p>
          <h2 className="about-header-element mt-4 font-display text-[32px] sm:text-[36px] md:text-[44px] font-semibold leading-[1.1] tracking-tight text-text-primary">
            We don&apos;t just learn cloud.
            <br />
            <span className="text-gradient">We build on it.</span>
          </h2>
          <p className="about-header-element mt-4 sm:mt-5 max-w-lg text-[15px] sm:text-[16px] leading-relaxed text-text-secondary">
            AWS Student Builder Group is a community of makers who believe the
            best way to learn cloud is to build real projects, break things, and
            iterate fast — together.
          </p>
        </div>

        <div className="about-grid-container mt-16 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="about-grid-item group relative bg-bg p-8 transition-colors hover:bg-white/[0.02]"
              >
                <div className="mb-5 inline-flex rounded-lg bg-white/[0.04] p-3 text-primary transition-colors group-hover:bg-primary/10">
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className="mb-2 font-display text-[17px] font-medium text-text-primary">
                  {pillar.title}
                </h3>
                <p className="text-[14px] leading-relaxed text-text-secondary">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
