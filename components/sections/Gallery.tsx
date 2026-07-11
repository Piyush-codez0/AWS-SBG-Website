"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const GALLERY_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=640&h=420&fit=crop",
    alt: "AWS SBG Workshop session with students coding together",
    span: "sm:col-span-2 sm:row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop",
    alt: "Team collaboration during hackathon",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=300&fit=crop",
    alt: "Students presenting their cloud project",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop",
    alt: "Group study session for AWS certification",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=640&h=420&fit=crop",
    alt: "AWS community event keynote speaker",
    span: "sm:col-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    alt: "Brainstorming session with whiteboards",
    span: "",
  },
];

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

export function Gallery() {
  return (
    <section id="gallery" className="bg-grid bg-noise relative bg-bg">
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 bottom-1/4 h-[380px] w-[380px] -translate-x-1/3 rounded-full bg-secondary/8 blur-[120px]"
      />

      <div className="relative mx-auto max-w-content px-6 py-24 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[11px] uppercase tracking-[0.16em] text-muted">
            Gallery
          </p>
          <h2 className="mt-4 font-display text-[36px] font-semibold leading-[1.1] tracking-tight text-text-primary sm:text-[44px]">
            Moments from the{" "}
            <span className="text-gradient">community.</span>
          </h2>
          <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-text-secondary">
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
          {GALLERY_IMAGES.map((img) => (
            <motion.div
              key={img.alt}
              variants={itemVariants}
              className={`group relative overflow-hidden rounded-xl border border-border ${img.span}`}
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <p className="absolute bottom-0 left-0 right-0 p-4 text-[13px] text-text-secondary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {img.alt}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
