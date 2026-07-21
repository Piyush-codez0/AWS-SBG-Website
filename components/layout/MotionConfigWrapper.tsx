"use client";

import { MotionConfig, useReducedMotion } from "framer-motion";

/**
 * Global Framer Motion configuration that respects prefers-reduced-motion.
 *
 * When reduced motion is preferred, all Framer Motion animations use
 * a 0.01ms duration — matching the global CSS override in globals.css.
 * This keeps motion subtle (opacity/color transitions still work) but
 * removes all movement-based animation.
 *
 * Per Emil Kowalski's philosophy: reduced motion means fewer and gentler
 * animations, not zero.
 */
export function MotionConfigWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <MotionConfig
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : undefined
      }
    >
      {children}
    </MotionConfig>
  );
}