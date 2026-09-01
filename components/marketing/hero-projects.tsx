"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

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

  // ---- drag-to-scroll with inertia (mouse/pen); touch keeps native OS momentum ----
  const railRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({
    isDown: false,
    startX: 0,
    startScroll: 0,
    moved: false,
    lastX: 0,
    lastT: 0,
    velocity: 0,
  });
  const momentumFrame = useRef<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    return () => {
      if (momentumFrame.current !== null) {
        cancelAnimationFrame(momentumFrame.current);
      }
    };
  }, []);

  const stopMomentum = () => {
    if (momentumFrame.current !== null) {
      cancelAnimationFrame(momentumFrame.current);
      momentumFrame.current = null;
    }
  };

  const snapToNearestCard = () => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector<HTMLElement>("[data-rail-card]");
    if (!card) return;

    const cardWidth = card.offsetWidth + 12; // width + gap-3 (12px)
    const nearest = Math.round(rail.scrollLeft / cardWidth) * cardWidth;

    rail.scrollTo({ left: nearest, behavior: "smooth" });
  };

  const runMomentum = () => {
    const rail = railRef.current;
    if (!rail) return;

    const friction = 0.94;
    const step = () => {
      dragState.current.velocity *= friction;

      if (Math.abs(dragState.current.velocity) < 0.15) {
        momentumFrame.current = null;
        snapToNearestCard();
        return;
      }

      rail.scrollLeft -= dragState.current.velocity;
      momentumFrame.current = requestAnimationFrame(step);
    };

    momentumFrame.current = requestAnimationFrame(step);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") return; // native touch scrolling stays untouched
    const rail = railRef.current;
    if (!rail) return;

    stopMomentum();

    dragState.current = {
      isDown: true,
      startX: e.clientX,
      startScroll: rail.scrollLeft,
      moved: false,
      lastX: e.clientX,
      lastT: performance.now(),
      velocity: 0,
    };
    setIsDragging(true);
    rail.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") return;
    const rail = railRef.current;
    const state = dragState.current;
    if (!rail || !state.isDown) return;

    const delta = e.clientX - state.startX;

    if (Math.abs(delta) > 4) {
      state.moved = true;
    }

    rail.scrollLeft = state.startScroll - delta;

    const now = performance.now();
    const dt = now - state.lastT;
    if (dt > 0) {
      const instantV = (e.clientX - state.lastX) / dt;
      // smooth the velocity sample so release isn't jumpy
      state.velocity = state.velocity * 0.7 + instantV * 16 * 0.3;
    }
    state.lastX = e.clientX;
    state.lastT = now;
  };

  const endDrag = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") return;
    const rail = railRef.current;
    if (rail && rail.hasPointerCapture(e.pointerId)) {
      rail.releasePointerCapture(e.pointerId);
    }
    dragState.current.isDown = false;
    setIsDragging(false);

    if (Math.abs(dragState.current.velocity) > 0.15) {
      runMomentum();
    } else {
      snapToNearestCard();
    }
  };

  // Suppress the click-through-to-Link navigation if the pointer actually
  // dragged (so a swipe doesn't accidentally fire the link).
  const handleClickCapture = (e: React.MouseEvent) => {
    if (dragState.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      dragState.current.moved = false;
    }
  };

  return (
    <div className="absolute inset-x-0 bottom-0 z-20">
      {/* =========================================================
          DESKTOP
      ========================================================= */}
      <div className="mx-auto hidden max-w-[1600px] px-6 pb-7 sm:px-8 lg:block lg:px-12">
        <div className="flex items-end justify-between gap-8">
          <div className="min-w-0 flex-1">
            <div className="flex h-41.25 items-end gap-3 overflow-hidden">
              {projects.map((project, index) => {
                const isActive = active === index;

                return (
                  <motion.div
                    key={project.id}
                    animate={{
                      width: isActive
                        ? "clamp(280px, 29vw, 430px)"
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
                    className="relative h-full shrink-0 overflow-hidden border border-white/15 bg-black/30"
                    onMouseEnter={() => setActive(index)}
                  >
                    <Link
                      href="/properties"
                      className="group absolute inset-0"
                      aria-label={`View ${project.title}`}
                    >
                      <Image
                        src={project.image}
                        alt=""
                        fill
                        sizes="430px"
                        draggable={false}
                        className="object-cover transition-transform duration-1400 ease-out group-hover:scale-[1.045]"
                      />

                      {/* Image treatment */}
                      <div className="absolute inset-0 bg-black/30 transition-colors duration-700 group-hover:bg-black/15" />

                      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />

                      {/* Premium frame */}
                      <motion.div
                        initial={false}
                        animate={{
                          opacity: isActive ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 border border-white/50"
                      />

                      {/* Collapsed */}
                      {!isActive && (
                        <div className="absolute inset-x-3 bottom-3">
                          <p className="truncate text-[9px] font-medium uppercase tracking-[0.12em] text-white/90">
                            {project.title}
                          </p>
                        </div>
                      )}

                      {/* Expanded */}
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
                              className="text-white transition-transform duration-300 group-hover:translate-x-1"
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

          {/* Desktop counter */}
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

      {/* =========================================================
          MOBILE — REAL HORIZONTAL RAIL
      ========================================================= */}
      <div className="block w-full sm:block lg:hidden">
        <div
          ref={railRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={endDrag}
          onClickCapture={handleClickCapture}
          onDragStart={(e) => e.preventDefault()}
          className={`
            w-full
            snap-x snap-mandatory
            scroll-smooth
            overflow-x-auto
            overflow-y-hidden
            overscroll-x-contain
            px-5
            pb-5
            touch-pan-x
            select-none
            [-ms-overflow-style:none]
            scrollbar-none
            [&::-webkit-scrollbar]:hidden
            ${isDragging ? "cursor-grabbing" : "cursor-grab"}
          `}
        >
          <div
            className="
              flex
              w-max
              min-w-full
              items-stretch
              gap-3
              pr-5
            "
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                data-rail-card
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        x: 20,
                      }
                }
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : {
                        duration: 0.55,
                        delay: index * 0.07,
                        ease: [0.22, 1, 0.36, 1],
                      }
                }
                className="
                  relative
                  h-39.5
                  w-[78vw]
                  max-w-82.5
                  shrink-0
                  snap-start
                  overflow-hidden
                  border
                  border-white/20
                  bg-black/30
                  shadow-[0_18px_50px_rgba(0,0,0,0.35)]
                "
              >
                <Link
                  href="/properties"
                  draggable={false}
                  onDragStart={(e) => e.preventDefault()}
                  className="group absolute inset-0"
                  aria-label={`View ${project.title}`}
                >
                  {/* Image */}
                  <Image
                    src={project.image}
                    alt=""
                    fill
                    sizes="78vw"
                    draggable={false}
                    className="
                      object-cover
                      transition-transform
                      duration-1200
                      ease-out
                      group-active:scale-[1.02]
                    "
                  />

                  {/* Cinematic treatment */}
                  <div className="absolute inset-0 bg-black/25" />

                  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/35 to-transparent" />

                  {/* Top status */}
                  <div className="absolute left-4 top-4 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.7)]" />

                    <span className="text-[8px] font-medium uppercase tracking-[0.23em] text-white/75">
                      {project.status}
                    </span>
                  </div>

                  {/* Number */}
                  <div className="absolute right-4 top-4">
                    <span className="font-mono text-[8px] tracking-[0.2em] text-white/45">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="absolute inset-x-4 bottom-4">
                    <h3 className="font-display text-[20px] leading-none tracking-[-0.035em] text-white">
                      {project.title}
                    </h3>

                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-[9px] uppercase tracking-[0.12em] text-white/50">
                        {project.location}
                      </p>

                      <span className="flex h-7 w-7 items-center justify-center border border-white/20 text-white/70">
                        ↗
                      </span>
                    </div>
                  </div>

                  {/* Inner frame ===============*/}
                  <div className="pointer-events-none absolute inset-0 border border-white/8" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile rail label */}
        <div className="flex justify-between items-center gap-2 px-5 pb-4">
          <div className="flex items-center gap-2">
            <span className="h-px w-7 bg-white/60" />

            <span className="text-[8px] font-medium uppercase tracking-[0.25em] text-white/45">
              Curated collection
            </span>
          </div>
          <span className="text-[8px] font-medium uppercase tracking-[0.25em] text-white/45 animate-pulse duration-500">
            Swipe to explore ↔
          </span>
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
