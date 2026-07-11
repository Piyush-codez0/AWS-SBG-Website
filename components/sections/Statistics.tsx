"use client";

import * as React from "react";
import { motion, useInView, animate } from "framer-motion";

type Stat = { label: string; value: number; suffix?: string };

const STATS: Stat[] = [
  { label: "Members", value: 420, suffix: "+" },
  { label: "Events Hosted", value: 38, suffix: "+" },
  { label: "Workshops", value: 52, suffix: "+" },
  { label: "Cloud Certifications", value: 96, suffix: "+" },
  { label: "Hackathons", value: 9 },
  { label: "Projects Shipped", value: 61, suffix: "+" },
];

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  React.useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(latest) {
        node.textContent = Math.round(latest).toString() + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, value, suffix]);

  return <span ref={ref}>{`0${suffix}`}</span>;
}

export function Statistics() {
  return (
    <section id="stats" className="border-t border-border bg-bg-surface/40">
      <div className="mx-auto max-w-content px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 border-l border-t border-border sm:grid-cols-3 lg:grid-cols-6"
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col gap-1.5 border-r border-b border-border px-5 py-8 text-center transition-colors duration-200 hover:bg-white/[0.02] sm:px-6"
            >
              <span className="font-display text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </span>
              <span className="text-[13px] text-text-secondary">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}