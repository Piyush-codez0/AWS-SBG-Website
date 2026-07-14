"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/Button";
import LightRays from "@/components/ui/LightRays";
import { FlipText } from "@/components/ui/flip-text";

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.11, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

// Loose network topology — nodes + edges, standing in for the
// "cloud" the community builds on. Not decoration: the shape is
// meant to read as infrastructure, not a blob.
const NODES = [
  { id: "n1", x: 420, y: 90, r: 5, delay: 0 },
  { id: "n2", x: 520, y: 170, r: 4, delay: 0.6 },
  { id: "n3", x: 470, y: 270, r: 7, delay: 0.2, pulse: true },
  { id: "n4", x: 360, y: 220, r: 4, delay: 0.9 },
  { id: "n5", x: 560, y: 340, r: 5, delay: 0.4 },
  { id: "n6", x: 400, y: 380, r: 4, delay: 1.1 },
  { id: "n7", x: 320, y: 320, r: 5, delay: 0.7 },
];

const EDGES: [string, string][] = [
  ["n1", "n2"],
  ["n2", "n3"],
  ["n1", "n4"],
  ["n3", "n4"],
  ["n3", "n5"],
  ["n3", "n7"],
  ["n4", "n7"],
  ["n5", "n6"],
  ["n6", "n7"],
];

function nodeById(id: string) {
  return NODES.find((n) => n.id === id)!;
}

export function Hero() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const springX = useSpring(mvX, { stiffness: 60, damping: 22, mass: 0.4 });
  const springY = useSpring(mvY, { stiffness: 60, damping: 22, mass: 0.4 });
  const networkX = useTransform(springX, [-1, 1], [-14, 14]);
  const networkY = useTransform(springY, [-1, 1], [-10, 10]);
  const glowX = useTransform(springX, [-1, 1], [8, -8]);
  const glowY = useTransform(springY, [-1, 1], [8, -8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const relY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    mvX.set(relX);
    mvY.set(relY);
  };

  return (
    <section
      id="top"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="bg-grid bg-noise relative flex min-h-screen items-center overflow-hidden bg-bg pt-16"
    >
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
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
      {/* Ambient glow */}
      <motion.div
        aria-hidden
        style={{ x: glowX, y: glowY }}
        className="pointer-events-none absolute left-1/2 top-1/3 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-[420px] w-[420px] translate-x-1/4 translate-y-1/4 rounded-full bg-secondary/10 blur-[120px]"
      />

      {/* Signature: floating cloud-node network, right side, asymmetric */}
      <motion.svg
        aria-hidden
        style={{ x: networkX, y: networkY }}
        viewBox="0 0 620 460"
        className="animate-float-slower pointer-events-none absolute -right-16 top-1/2 hidden h-[560px] w-[560px] -translate-y-1/2 opacity-[0.55] md:block lg:-right-6 xl:right-8"
      >
        <defs>
          <filter id="node-glow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {EDGES.map(([a, b], i) => {
          const na = nodeById(a);
          const nb = nodeById(b);
          return (
            <motion.line
              key={`${a}-${b}`}
              x1={na.x}
              y1={na.y}
              x2={nb.x}
              y2={nb.y}
              stroke="#A78BFA"
              strokeWidth="1"
              strokeOpacity="0.35"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.4, delay: 0.5 + i * 0.08, ease: "easeOut" }}
            />
          );
        })}

        {NODES.map((n) => (
          <g key={n.id} filter="url(#node-glow)">
            <motion.circle
              cx={n.x}
              cy={n.y}
              r={n.r}
              fill={n.pulse ? "#C084FC" : "#A78BFA"}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: n.delay }}
            />
            {n.pulse && (
              <motion.circle
                cx={n.x}
                cy={n.y}
                r={n.r}
                fill="none"
                stroke="#C084FC"
                strokeWidth="1.5"
                initial={{ opacity: 0.6, scale: 1 }}
                animate={{ opacity: 0, scale: 2.6 }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
              />
            )}
          </g>
        ))}
      </motion.svg>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative mx-auto max-w-content px-4 sm:px-6 py-16 md:py-24"
      >
        <div className="max-w-2xl">
          <motion.div
            variants={itemVariants}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.03] px-3.5 py-1.5 text-[13px] text-text-secondary"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-pulse-dot absolute inline-flex h-full w-full rounded-full bg-primary-light" />
            </span>
            Applications open for 2026
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="font-display text-[36px] sm:text-[44px] md:text-[56px] lg:text-[68px] font-semibold leading-[1.08] tracking-tight text-text-primary"
          >
            <FlipText duration={2.2}>AWS Student Builders</FlipText>
            <br />
            <span className="text-gradient">
              at Tula's University.
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-4 sm:mt-5 max-w-lg text-[15px] sm:text-[17px] leading-relaxed text-muted"
          >
            The official AWS Cloud Club in Dehradun for students who'd rather build than just read about it. Join our community for hands-on workshops, hackathons, AWS credits, and a peer group that ships real cloud projects together.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-8 sm:mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
            <Button size="lg" className="glow-primary w-full sm:w-auto justify-center">
              Join Community
              <ArrowRight
                size={16}
                className="ml-2 transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Button>
            <Button size="lg" variant="secondary" className="w-full sm:w-auto justify-center">
              <CalendarDays size={16} className="mr-2" />
              Explore Events
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="pointer-events-none absolute bottom-9 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
      >
        <span className="text-[11px] uppercase tracking-[0.16em] text-muted">
          Scroll to explore
        </span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="h-8 w-px bg-gradient-to-b from-muted to-transparent"
        />
      </motion.div>
    </section>
  );
}
