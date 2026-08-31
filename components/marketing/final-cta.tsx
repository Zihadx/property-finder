
"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

export function FinalCta() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /*
   * Smooth physical motion.
   * The spring removes the mechanical feeling from raw scroll values.
   */
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 22,
    mass: 0.8,
  });

  /*
   * IMAGE
   *
   * Large overscan + restrained movement = cinematic parallax
   * without looking like a gimmick.
   */
  const imageY = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    ["-7%", "0%", "7%"],
  );

  const imageScale = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    [1.1, 1.045, 1.1],
  );

  const imageX = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    ["-1%", "0%", "1%"],
  );

  /*
   * Very subtle image rotation creates depth.
   * Almost invisible — intentionally.
   */
  const imageRotate = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    ["0.35deg", "0deg", "-0.35deg"],
  );

  /*
   * Foreground content has a much smaller movement range,
   * creating visual depth between text and photography.
   */
  const contentY = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    ["28px", "0px", "-28px"],
  );

  /*
   * Light layer slowly breathes while scrolling.
   */
  const glowOpacity = useTransform(
    smoothProgress,
    [0, 0.35, 0.65, 1],
    [0.15, 0.32, 0.25, 0.12],
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
    >
      <div className="relative min-h-[34rem] w-full overflow-hidden sm:min-h-[38rem] lg:min-h-[44rem]">
        {/* =========================================================
            PARALLAX PHOTOGRAPHY
        ========================================================== */}

        <motion.div
          style={{
            y: imageY,
            x: imageX,
            scale: imageScale,
            rotate: imageRotate,
          }}
          className="absolute -inset-[8%] will-change-transform"
        >
          <Image
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=90"
            alt="Contemporary luxury residence"
            fill
            sizes="120vw"
            className="object-cover object-center"
          />
        </motion.div>

        {/* =========================================================
            CINEMATIC LIGHT / TONAL SYSTEM
        ========================================================== */}

        {/* Soft overall wash */}
        <div className="absolute inset-0 bg-black/8" />

        {/* Bottom cinematic depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/5" />

        {/* Left-to-right editorial shadow */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent" />

        {/* Soft center illumination */}
        <motion.div
          style={{ opacity: glowOpacity }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_55%_40%,rgba(255,255,255,0.18),transparent_48%)]"
        />

        {/* Subtle edge vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.28)_100%)]" />

        {/* =========================================================
            EDITORIAL FRAME
        ========================================================== */}

        <div className="pointer-events-none absolute inset-4 border border-white/15 sm:inset-6 lg:inset-8" />

        <div className="pointer-events-none absolute inset-4 border border-white/5 sm:inset-6 lg:inset-8">
          <div className="absolute left-0 top-0 h-10 w-10 border-l border-t border-white/35" />
          <div className="absolute bottom-0 right-0 h-10 w-10 border-b border-r border-white/35" />
        </div>

        {/* =========================================================
            CONTENT
        ========================================================== */}

        <motion.div
          style={{ y: contentY }}
          className="relative z-10 flex min-h-[34rem] items-end sm:min-h-[38rem] lg:min-h-[44rem]"
        >
          <div className="container mx-auto px-6 pb-8 sm:pb-10 lg:pb-14">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              {/* Main statement */}
              <div className="max-w-3xl">
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  whileInView={{ width: "2.5rem", opacity: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 0.9,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="mb-5 h-px bg-white/75"
                />

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="text-[0.6rem] font-medium uppercase tracking-[0.32em] text-white/55"
                >
                  Your next address
                </motion.p>

                <motion.h2
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 1,
                    delay: 0.16,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="mt-3 max-w-3xl font-display text-[2.7rem] leading-[0.94] tracking-[-0.035em] text-white sm:text-5xl lg:text-[4.75rem]"
                >
                  Find somewhere
                  <br />
                  <span className="text-white/55">
                    worth coming home to.
                  </span>
                </motion.h2>
              </div>

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.8,
                  delay: 0.28,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex shrink-0 flex-col items-start gap-3 sm:flex-row sm:items-center"
              >
                <Link
                  href="/properties"
                  className="group/link inline-flex items-center gap-3 border-b border-white/50 pb-2 text-xs font-medium uppercase tracking-[0.16em] text-white transition-all duration-500 hover:border-white"
                >
                  Explore properties

                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 ease-out group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                </Link>

                <span className="hidden h-4 w-px bg-white/20 sm:block" />

                <Link
                  href="/dashboard/properties/new"
                  className="text-xs uppercase tracking-[0.16em] text-white/50 transition-colors duration-500 hover:text-white"
                >
                  List a property
                </Link>
              </motion.div>
            </div>

            {/* =====================================================
                MICRO FOOTER
            ====================================================== */}

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.45 }}
              className="mt-8 flex items-center justify-between border-t border-white/15 pt-4"
            >
              <span className="text-[0.55rem] uppercase tracking-[0.2em] text-white/35">
                Property · People · Place
              </span>

              <span className="font-mono text-[0.55rem] tracking-[0.16em] text-white/30">
                LISTEASY / DHAKA
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

