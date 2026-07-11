"use client";

import * as React from "react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const PLACEHOLDERS = [
  { span: "sm:col-span-2 sm:row-span-2" },
  { span: "" },
  { span: "" },
  { span: "" },
  { span: "sm:col-span-2" },
  { span: "" },
];

export function Gallery() {
  return (
    <section id="gallery" className="bg-grid bg-noise relative bg-bg">
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 bottom-1/4 h-[380px] w-[380px] -translate-x-1/3 rounded-full bg-secondary/8 blur-[120px]"
      />

      <div className="relative mx-auto max-w-content px-4 sm:px-6 py-16 md:py-24 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[11px] uppercase tracking-[0.16em] text-muted">
            Gallery
          </p>
          <h2 className="mt-4 font-display text-[32px] sm:text-[36px] md:text-[44px] font-semibold leading-[1.1] tracking-tight text-text-primary">
            Moments from the{" "}
            <span className="text-gradient">community.</span>
          </h2>
          <p className="mt-4 sm:mt-5 max-w-lg text-[15px] sm:text-[16px] leading-relaxed text-text-secondary">
            Workshops, hackathons, study jams, and celebrations — a look at
            what happens when builders get together.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-3"
        >
          {PLACEHOLDERS.map((item, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className={`group relative overflow-hidden rounded-xl border border-border bg-white/[0.02] ${item.span}`}
            >
              <div className="flex aspect-[4/3] w-full items-center justify-center">
                <p className="text-[15px] font-medium tracking-wide text-muted">
                  Coming Soon
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
