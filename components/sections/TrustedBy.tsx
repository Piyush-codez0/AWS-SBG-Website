"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const PARTNERS = [
  { name: "AWS", logo: "/logos/AWS_logo.png", width: 80, height: 48 },
  { name: "Tulas Institute", logo: "/logos/tulaslogo.png", width: 140, height: 48 },
  { name: "SBG", logo: "/logos/SBG_logo.png", width: 100, height: 48 },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export function TrustedBy() {
  return (
    <section id="trusted-by" className="border-t border-border bg-bg">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.6 }}
        className="mx-auto max-w-content px-6 py-16"
      >
        <motion.p
          variants={itemVariants}
          className="text-center text-[11px] uppercase tracking-[0.16em] text-muted"
        >
          Backed by the builder ecosystem
        </motion.p>

        <motion.ul
          variants={containerVariants}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 sm:justify-evenly"
        >
          {PARTNERS.map((partner) => (
            <motion.li
              key={partner.name}
              variants={itemVariants}
              className="flex items-center justify-center opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={partner.width}
                height={partner.height}
                className="h-10 w-auto object-contain sm:h-12"
              />
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}