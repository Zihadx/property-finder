"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

interface AgentConversionMotionProps {
  children: ReactNode;
  delay?: number;
}

export function AgentConversionMotion({
  children,
  delay = 0,
}: AgentConversionMotionProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.2,
      }}
      variants={containerVariants}
      transition={{
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}