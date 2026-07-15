"use client";

import * as React from "react";
import ProfileCard from "@/components/ui/ProfileCard";
import LightRays from "@/components/ui/LightRays";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Member = {
  name: string;
  role: string;
  avatar: string;
  handle: string;
  status: string;
  avatarScale?: number;
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
    handle: "piyush-lingwal",
    status: "Building AI",
    socials: { github: "https://github.com/piyush-lingwal/", linkedin: "https://linkedin.com/" }
  },
  {
    name: "Piyush Rawat",
    role: "Revealing soon...",
    avatar: "/members/piyushrawat.png",
    handle: "Piyush-codez0",
    status: "Operating",
    socials: { github: "https://github.com/Piyush-codez0/", linkedin: "https://linkedin.com/" }
  },
  {
    name: "Gaurav Shukla",
    role: "Revealing soon...",
    avatar: "/members/gauravshukla.png",
    handle: "gauravshukla",
    status: "Building",
    avatarScale: 1.35,
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

export function Team() {
  const containerRef = React.useRef<HTMLElement>(null);

  useGSAP(() => {
    // Header reveal
    gsap.from(".team-header-el", {
      opacity: 0,
      y: 20,
      stagger: 0.15,
      duration: 0.7,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".team-header-container",
        start: "top 85%",
      },
    });

    // Team members reveal
    gsap.from(".team-member", {
      opacity: 0,
      y: 30,
      stagger: 0.15,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".team-members-container",
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
    <section ref={containerRef} id="team" className="bg-grid bg-noise relative overflow-hidden bg-bg min-h-screen">
      {/* Dynamic WebGL Light Rays */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: "hidden", opacity: 0.25 }}>
        <LightRays
          raysOrigin="top-center"
          raysColor="#A855F7"
          raysSpeed={0.8}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={false}
          mouseInfluence={0}
          noiseAmount={0.1}
          distortion={0.05}
          saturation={1.4}
        />
      </div>

      {/* Headline ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/4 top-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]"
      />
      {/* Secondary glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 bottom-1/4 h-[450px] w-[450px] translate-x-1/3 rounded-full bg-primary/10 blur-[140px]"
      />

      <div className="relative mx-auto max-w-content px-4 sm:px-6 pt-28 pb-16 md:pt-32 md:pb-24 lg:pt-32 lg:pb-32">
        <div className="team-header-container text-left">
          <p className="team-header-el text-[11px] uppercase tracking-[0.16em] text-muted">
            The Team
          </p>
          <h2 className="team-header-el mt-4 font-display text-[32px] sm:text-[36px] md:text-[44px] font-semibold leading-[1.1] tracking-tight text-text-primary">
            Builders behind the{" "}
            <span className="text-gradient">builders.</span>
          </h2>
          <p className="team-header-el mt-4 sm:mt-5 max-w-lg text-[15px] sm:text-[16px] leading-relaxed text-text-secondary">
            Students who organise, teach, mentor, and keep the community
            running.
          </p>
        </div>

        <div className="team-members-container mt-10 sm:mt-20 grid gap-4 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {TEAM.map((member) => (
            <div key={member.name} className="team-member w-full max-w-[340px]">
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
                avatarScale={member.avatarScale}
                socials={member.socials}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
