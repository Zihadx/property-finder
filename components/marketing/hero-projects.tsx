"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

const projects = [
  {
    id: 1,
    title: "Envisio Lake City",
    location: "Dhaka, Bangladesh",
    status: "Completed",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400&q=85",
  },
  {
    id: 2,
    title: "Envisio Green House",
    location: "Dhaka, Bangladesh",
    status: "Completed",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1400&q=85",
  },
  {
    id: 3,
    title: "Envisio Bismillah Tower",
    location: "Dhaka, Bangladesh",
    status: "Featured",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&q=85",
  },
  {
    id: 4,
    title: "Riverview Residency",
    location: "Gulshan 2, Dhaka",
    status: "Available",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=85",
  },
];

export function HeroProjects() {
  const [active, setActive] = useState(2);
  const reduceMotion = useReducedMotion();

  return (
    <div className="absolute inset-x-0 bottom-0 z-20">
      <div className="mx-auto max-w-[1600px] px-6 pb-7 sm:px-8 lg:px-12">
        <div className="flex items-end justify-between gap-8">
          {/* =====================================================
              EXPANDING PROJECT STRIP
          ====================================================== */}

          <div className="min-w-0 flex-1 overflow-hidden">
            <div
              className="flex h-37.5 items-end gap-2 sm:h-41.25 sm:gap-3"
              onMouseLeave={() => setActive(2)}
            >
              {projects.map((project, index) => {
                const isActive = active === index;

                return (
                  <motion.div
                    key={project.id}
                    layout
                    animate={{
                      width: isActive
                        ? "clamp(250px, 29vw, 430px)"
                        : "clamp(115px, 12vw, 185px)",
                    }}
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : {
                            duration: 0.65,
                            ease: [0.22, 1, 0.36, 1],
                          }
                    }
                    className="relative h-full shrink-0 overflow-hidden border border-white/15 bg-black/30 backdrop-blur-sm"
                    onMouseEnter={() => setActive(index)}
                  >
                    <Link
                      href="/properties"
                      className="absolute inset-0"
                      aria-label={`View ${project.title}`}
                    >
                      <Image
                        src={project.image}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 45vw, 30vw"
                        className="object-cover transition-transform duration-1000 ease-out"
                      />

                      {/* Image darkness */}
                      <div className="absolute inset-0 bg-black/25 transition-colors duration-500 group-hover:bg-black/10" />

                      {/* Bottom linear */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent" />

                      {/* Active border */}
                      <motion.div
                        initial={false}
                        animate={{
                          opacity: isActive ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 border border-white/50"
                      />

                      {/* =================================================
                          COLLAPSED STATE
                      ================================================== */}

                      {!isActive && (
                        <div className="absolute inset-x-3 bottom-3">
                          <p className="truncate text-[9px] font-medium uppercase tracking-[0.12em] text-white/90">
                            {project.title}
                          </p>
                        </div>
                      )}

                      {/* =================================================
                          EXPANDED STATE
                      ================================================== */}

                      {isActive && (
                        <motion.div
                          initial={
                            reduceMotion
                              ? false
                              : {
                                  opacity: 0,
                                  y: 14,
                                }
                          }
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          transition={{
                            duration: reduceMotion ? 0 : 0.45,
                            delay: reduceMotion ? 0 : 0.12,
                          }}
                          className="absolute inset-x-5 bottom-5"
                        >
                          <div className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-white" />

                            <span className="text-[8px] font-medium uppercase tracking-[0.22em] text-white/65">
                              {project.status}
                            </span>
                          </div>

                          <h2 className="mt-2 font-display text-xl tracking-tight text-white sm:text-2xl">
                            {project.title}
                          </h2>

                          <p className="mt-1 text-[11px] text-white/60">
                            {project.location}
                          </p>

                          <div className="mt-4 flex items-center justify-between">
                            <span className="text-[8px] font-medium uppercase tracking-[0.2em] text-white/50">
                              Discover property
                            </span>

                            <span
                              aria-hidden="true"
                              className="text-white transition-transform duration-300"
                            >
                              →
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* =====================================================
              MINIMAL PROJECT COUNTER
          ====================================================== */}

          <div className="hidden shrink-0 items-center gap-4 md:flex">
            <div className="text-right">
              <p className="text-[8px] font-medium uppercase tracking-[0.2em] text-white/40">
                Featured properties
              </p>

              <p className="mt-1 font-mono text-xs text-white/70">
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(projects.length).padStart(2, "0")}
              </p>
            </div>

            <div className="h-10 w-px bg-white/15" />

            <div className="flex gap-1">
              {projects.map((project, index) => (
                <button
                  key={project.id}
                  type="button"
                  aria-label={`Show ${project.title}`}
                  onClick={() => setActive(index)}
                  className="group flex h-8 w-5 items-center justify-center"
                >
                  <span
                    className={`h-px transition-all duration-500 ${
                      active === index
                        ? "w-5 bg-white"
                        : "w-2 bg-white/30 group-hover:w-4 group-hover:bg-white/60"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom progress line */}
      <div className="h-px bg-white/10">
        <motion.div
          className="h-px bg-white/60"
          animate={{
            width: `${((active + 1) / projects.length) * 100}%`,
          }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : {
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }
          }
        />
      </div>
    </div>
  );
}
