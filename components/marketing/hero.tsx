
import Link from "next/link";
import { ArrowUpRight, ChevronDown, MapPin, Sparkles } from "lucide-react";
import { HeroProjects } from "./hero-projects";

export function Hero() {
  return (
    <section className="relative isolate h-[100svh] min-h-[720px] overflow-hidden bg-[#06101f] text-white">
      {/* =========================================================
          CINEMATIC BACKGROUND
      ========================================================== */}

      <video
        className="absolute inset-0 h-full w-full object-cover scale-[1.02]"
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

      {/* Cinematic color treatment */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[#06152b]/45"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-[#020914]/50 via-transparent to-[#020914]/95"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-[#020914]/80 via-[#06152b]/20 to-transparent"
      />

      {/* Subtle cinematic grain */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.7'/%3E%3C/svg%3E\")",
        }}
      />

      {/* =========================================================
          TOP EDITORIAL META
      ========================================================== */}

      <div className="absolute left-0 right-0 top-0 z-20">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-7 sm:px-8 lg:px-12">
          {/* Left */}
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center border border-white/20 bg-white/[0.06] backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-white/80" />
            </span>

            <div className="hidden sm:block">
              <p className="text-[8px] font-medium uppercase tracking-[0.28em] text-white/45">
                Curated Living
              </p>
              <p className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-white/75">
                Dhaka · Bangladesh
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="hidden items-center gap-8 md:flex">
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
          HERO CONTENT
      ========================================================== */}

      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-[1600px] px-6 pb-44 pt-28 sm:px-8 lg:px-12">
          <div className="max-w-5xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-4">
              <span
                aria-hidden="true"
                className="h-px w-12 bg-white/60"
              />

              <span className="text-[9px] font-medium uppercase tracking-[0.34em] text-white/65">
                Premium real estate · Bangladesh
              </span>
            </div>

            {/* Main title */}
            <h1 className="mt-7 max-w-5xl font-display text-[clamp(4rem,8.8vw,9rem)] font-normal leading-[0.82] tracking-[-0.07em]">
              Find your
              <br />

              <span className="text-white/35">next</span>{" "}

              <em className="font-normal not-italic text-white">
                address.
              </em>
            </h1>

            {/* Supporting content */}
            <div className="mt-9 flex flex-col gap-8 sm:flex-row sm:items-end sm:gap-14">
              <p className="max-w-md text-[13px] leading-6 text-white/60 sm:text-sm">
                Discover distinctive residences, investment opportunities,
                and landmark developments across Dhaka — thoughtfully
                curated in one trusted collection.
              </p>

              {/* Mini trust statement */}
              <div className="hidden border-l border-white/15 pl-5 sm:block">
                <p className="text-[8px] uppercase tracking-[0.28em] text-white/35">
                  The ListEasy Standard
                </p>
                <p className="mt-2 text-[10px] tracking-wide text-white/60">
                  Curated · Verified · Distinctive
                </p>
              </div>
            </div>

            {/* CTA row */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/properties"
                className="group inline-flex h-13 items-center bg-white px-7 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#071321] transition-all duration-500 hover:bg-white/90"
              >
                Explore Properties

                <span className="ml-8 flex h-7 w-7 items-center justify-center border border-[#071321]/15 transition-all duration-500 group-hover:translate-x-1 group-hover:border-[#071321]/30">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </Link>

              <Link
                href="/areas"
                className="group inline-flex h-13 items-center gap-3 border border-white/20 bg-white/[0.04] px-6 text-[10px] font-medium uppercase tracking-[0.18em] text-white/80 backdrop-blur-md transition-all duration-500 hover:border-white/40 hover:bg-white/[0.08]"
              >
                <MapPin className="h-3.5 w-3.5 text-white/50" />
                Explore Areas
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          FLOATING PROPERTY STAT
      ========================================================== */}

      <div className="absolute bottom-[15.5rem] right-6 z-20 hidden lg:block xl:right-12">
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
          PROJECT CARDS
      ========================================================== */}

      <HeroProjects />

    
      {/* Vertical editorial line */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-8 top-24 hidden w-px bg-gradient-to-b from-transparent via-white/10 to-transparent xl:block"
      />
    </section>
  );
}

