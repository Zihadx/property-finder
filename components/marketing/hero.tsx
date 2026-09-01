
"use client";

import Link from "next/link";
import { ArrowUpRight, MapPin, Sparkles } from "lucide-react";
import { HeroProjects } from "./hero-projects";

export function Hero() {
  return (
    <section className="relative isolate min-h-190 overflow-hidden bg-[#06101f] text-white sm:min-h-205 lg:h-svh lg:min-h-190">
      {/* =========================================================
          CINEMATIC BACKGROUND
      ========================================================== */}

      <video
        className="absolute inset-0 h-full w-full object-cover scale-[1.025]"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/images/hero-poster.jpg"
        aria-hidden="true"
      >
        <source src="/videos/hero-property.mp4" type="video/mp4" />
      </video>

      {/* Primary cinematic wash */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[#06152b]/45"
      />

      {/* Vertical cinematic gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-b from-[#020914]/65 via-[#06152b]/10 via-55% to-[#020914]/98"
      />

      {/* Horizontal depth */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-r from-[#020914]/85 via-[#06152b]/25 to-transparent"
      />

      {/* Mobile readability layer */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[#020914]/20 sm:bg-transparent"
      />

      {/* Cinematic grain */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.7'/%3E%3C/svg%3E\")",
        }}
      />

      {/* =========================================================
          TOP META
      ========================================================== */}

      <div className="absolute inset-x-0 top-0 z-30">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-5 sm:px-8 sm:py-7 lg:px-12">
          {/* Brand / location */}
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center border border-white/20 bg-white/6 backdrop-blur-md sm:h-9 sm:w-9">
              <Sparkles className="h-3.5 w-3.5 text-white/80" />
            </span>

            <div>
              <p className="text-[7px] font-medium uppercase tracking-[0.28em] text-white/45 sm:text-[8px]">
                Curated Living
              </p>

              <p className="mt-1 text-[9px] uppercase tracking-[0.16em] text-white/75 sm:text-[10px] sm:tracking-[0.18em]">
                Dhaka · Bangladesh
              </p>
            </div>
          </div>

          {/* Desktop editorial metadata */}
          <div className="hidden items-center gap-7 md:flex lg:gap-8">
            <div className="text-right">
              <p className="text-[8px] uppercase tracking-[0.25em] text-white/40">
                Collection
              </p>

              <p className="mt-1 text-[10px] tracking-[0.12em] text-white/70">
                2026 / VOL. 01
              </p>
            </div>

            <div className="h-8 w-px bg-white/15" />

            <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-white/60">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300/80 shadow-[0_0_12px_rgba(110,231,183,0.8)]" />
              Live Collection
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          MAIN CONTENT
      ========================================================== */}

      <div className="relative z-10 flex min-h-190 items-center sm:min-h-205 lg:h-full lg:min-h-0">
        <div className="mx-auto w-full max-w-[1600px] px-5 pb-72 pt-36 sm:px-8 sm:pb-72 sm:pt-40 lg:px-12 lg:pb-56 lg:pt-28">
          <div className="max-w-5xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 sm:gap-4">
              <span
                aria-hidden="true"
                className="h-px w-8 bg-white/60 sm:w-12"
              />

              <span className="text-[8px] font-medium uppercase tracking-[0.28em] text-white/65 sm:text-[9px] sm:tracking-[0.34em]">
                Premium real estate · Bangladesh
              </span>
            </div>

            {/* Headline */}
            <h1 className="mt-6 max-w-225 font-display text-[clamp(3.5rem,13vw,9rem)] font-normal leading-[0.84] tracking-[-0.065em] sm:mt-7 sm:text-[clamp(4.5rem,9vw,9rem)]">
              Find your
              <br />
              <span className="text-white/35">next</span>{" "}
              <em className="font-normal not-italic text-white">
                address.
              </em>
            </h1>

            {/* Supporting content */}
            <div className="mt-7 flex flex-col gap-6 sm:mt-9 sm:flex-row sm:items-end sm:gap-12 lg:gap-14">
              <p className="max-w-97.5 text-[12px] leading-5 text-white/60 sm:text-[13px] sm:leading-6 md:text-sm">
                Discover distinctive residences, investment opportunities,
                and landmark developments across Dhaka — thoughtfully curated
                in one trusted collection.
              </p>

              <div className="hidden border-l border-white/15 pl-5 sm:block">
                <p className="text-[8px] uppercase tracking-[0.28em] text-white/35">
                  The ListEasy Standard
                </p>

                <p className="mt-2 text-[10px] tracking-wide text-white/60">
                  Curated · Verified · Distinctive
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-7 flex w-full flex-col gap-2.5 sm:mt-9 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
              <Link
                href="/properties"
                className="group inline-flex h-12 w-full items-center justify-between bg-white px-5 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#071321] transition-all duration-500 hover:bg-white/90 sm:h-13 sm:w-auto sm:min-w-51.25 sm:px-7"
              >
                <span>Explore Properties</span>

                <span className="ml-6 flex h-7 w-7 items-center justify-center border border-[#071321]/15 transition-all duration-500 group-hover:translate-x-1 group-hover:border-[#071321]/30">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </Link>

              <Link
                href="/areas"
                className="group inline-flex h-12 w-full items-center justify-center gap-3 border border-white/20 bg-white/4 px-5 text-[9px] font-medium uppercase tracking-[0.18em] text-white/80 backdrop-blur-md transition-all duration-500 hover:border-white/40 hover:bg-white/8 sm:h-13 sm:w-auto sm:px-6"
              >
                <MapPin className="h-3.5 w-3.5 text-white/50 transition-colors group-hover:text-white/80" />
                Explore Areas
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          MARKET STAT
      ========================================================== */}

      <div className="absolute bottom-75 right-5 z-20 hidden lg:block xl:right-12">
        <div className="border border-white/15 bg-black/15 px-5 py-4 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-white/70" />

            <span className="text-[8px] uppercase tracking-[0.25em] text-white/45">
              Featured Market
            </span>
          </div>

          <div className="mt-3 flex items-end gap-5">
            <div>
              <p className="font-display text-2xl tracking-[-0.04em]">
                Dhaka
              </p>

              <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-white/40">
                Metropolitan Area
              </p>
            </div>

            <div className="h-8 w-px bg-white/15" />

            <div>
              <p className="font-display text-2xl tracking-[-0.04em]">
                150+
              </p>

              <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-white/40">
                Listings
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          PROJECTS
      ========================================================== */}

      <HeroProjects />

      {/* Editorial vertical line */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-8 top-24 z-10 hidden w-px bg-linear-to-b from-transparent via-white/10 to-transparent xl:block"
      />
    </section>
  );
}

