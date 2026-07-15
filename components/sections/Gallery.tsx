"use client";

import * as React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const PLACEHOLDERS = [
  { span: "sm:col-span-2 sm:row-span-2" },
  { span: "" },
  { span: "" },
  { span: "" },
  { span: "sm:col-span-2" },
  { span: "" },
];

export function Gallery() {
  const containerRef = React.useRef<HTMLElement>(null);

  useGSAP(() => {
    // Header reveal
    gsap.from(".gallery-header-el", {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".gallery-header-container",
        start: "top 85%",
      },
    });

    // Batched Gallery Items reveal for optimized staggered loading
    ScrollTrigger.batch(".gallery-item", {
      onEnter: (elements) => {
        gsap.fromTo(elements, 
          { opacity: 0, scale: 0.9, y: 30 },
          { 
            opacity: 1, 
            scale: 1, 
            y: 0, 
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            overwrite: true
          }
        );
      },
      start: "top 90%",
    });

    // Refresh ScrollTrigger to calculate offsets correctly after DOM is fully laid out
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => clearTimeout(refreshTimer);
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="gallery" className="bg-grid bg-noise relative overflow-hidden bg-bg min-h-screen">
      {/* Headline ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/4 top-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]"
      />
      {/* Secondary glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 bottom-1/4 h-[380px] w-[380px] -translate-x-1/3 rounded-full bg-secondary/8 blur-[120px]"
      />

      <div className="relative mx-auto max-w-content px-4 sm:px-6 pt-28 pb-16 md:pt-32 md:pb-24 lg:pt-32 lg:pb-32">
        <div className="gallery-header-container">
          <p className="gallery-header-el text-[11px] uppercase tracking-[0.16em] text-muted">
            Gallery
          </p>
          <h2 className="gallery-header-el mt-4 font-display text-[32px] sm:text-[36px] md:text-[44px] font-semibold leading-[1.1] tracking-tight text-text-primary">
            Moments from the{" "}
            <span className="text-gradient">community.</span>
          </h2>
          <p className="gallery-header-el mt-4 sm:mt-5 max-w-lg text-[15px] sm:text-[16px] leading-relaxed text-text-secondary">
            Workshops, hackathons, study jams, and celebrations — a look at
            what happens when builders get together.
          </p>
        </div>

        <div className="gallery-grid-container mt-14 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {PLACEHOLDERS.map((item, i) => (
            <div
              key={i}
              className={`gallery-item group relative overflow-hidden rounded-xl border border-border bg-white/[0.02] ${item.span}`}
            >
              <div className="flex aspect-[4/3] w-full items-center justify-center">
                <p className="text-[15px] font-medium tracking-wide text-muted">
                  Coming Soon
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
