
"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

interface HeroMotionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function HeroMotion({
  children,
  className,
  delay = 0,
}: HeroMotionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={
        shouldReduceMotion
          ? false
          : {
              opacity: 0,
              y: 24,
            }
      }
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={
        shouldReduceMotion
          ? {
              duration: 0,
            }
          : {
              duration: 0.9,
              delay,
              ease: [0.22, 1, 0.36, 1],
            }
      }
    >
      {children}
    </motion.div>
  );
}

