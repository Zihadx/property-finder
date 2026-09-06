"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-stone-50 px-6 py-24">
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-700/[0.04] blur-3xl"
      />

      <div className="relative z-10 w-full max-w-2xl text-center">
        {/* 404 */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-display text-[7rem] leading-none tracking-[-0.08em] text-stone-200 sm:text-[10rem]"
        >
          404
        </motion.p>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mt-2 flex items-center justify-center gap-4"
        >
          <span
            aria-hidden="true"
            className="h-px w-8 bg-cyan-700"
          />

          <span className="text-[9px] font-medium uppercase tracking-[0.38em] text-stone-500">
            Page not found
          </span>

          <span
            aria-hidden="true"
            className="h-px w-8 bg-cyan-700"
          />
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.2,
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-7 font-display text-4xl tracking-[-0.04em] text-stone-950 sm:text-5xl"
        >
          This address doesn&apos;t exist.
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mx-auto mt-5 max-w-md text-sm leading-7 text-stone-500"
        >
          The page you&apos;re looking for may have moved, been removed,
          or never existed.
        </motion.p>

        {/* Action */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mt-8 flex justify-center"
        >
          <Link
            href="/"
            className="group inline-flex h-12 items-center gap-2 rounded-full bg-stone-950 px-6 text-[10px] font-medium uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-cyan-700"
          >
            <ArrowLeft className="size-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
            Return home
          </Link>
        </motion.div>
      </div>
    </main>
  );
}