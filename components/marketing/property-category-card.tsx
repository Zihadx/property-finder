"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  Layers,
  MapPinned,
  Store,
} from "lucide-react";
import { motion } from "framer-motion";

type IconName = "building" | "layers" | "map" | "store";

export interface PropertyCategoryCardProps {
  title: string;
  subtitle: string;
  href: string;
  count: number;
  image?: string;
  icon: IconName;
  index?: number;
}

const ICONS: Record<IconName, React.ElementType> = {
  building: Building2,
  layers: Layers,
  map: MapPinned,
  store: Store,
};

const EASE = [0.22, 1, 0.36, 1] as const;

export function PropertyCategoryCard({
  title,
  subtitle,
  href,
  count,
  image,
  icon,
  index = 0,
}: PropertyCategoryCardProps) {
  const Icon = ICONS[icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay: Math.min(index * 0.08, 0.3), ease: EASE }}
      className="size-full"
    >
      <Link
        href={href}
        className="group relative block h-105 sm:h-115 lg:h-120 w-full overflow-hidden
          border border-white/10 bg-[#091522] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
          hover:-translate-y-1 hover:border-white/20 hover:shadow-lg
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2095AE]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {/* Image */}
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 639px) 82vw, (max-width: 767px) 72vw, (max-width: 1023px) 48vw, (max-width: 1279px) 30vw, 25vw"
            className="object-cover scale-[1.01] transition-transform duration-1800 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
          />
        ) : (
          <div className="absolute inset-0 bg-[#0b1825]" />
        )}

        {/* Combined gradient / tonal wash / vignette in one overlay stack */}
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-b from-black/5 via-black/20 to-black/95"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-r from-black/30 via-black/5 to-transparent"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[#2095AE]/0 opacity-70 shadow-[inset_0_0_100px_rgba(0,0,0,0.28)]
            transition-[background-color,opacity] duration-1000 group-hover:bg-[#2095AE]/5 group-hover:opacity-100"
        />

        {/* Top bar */}
        <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <span
              className="flex size-9 items-center justify-center border border-white/15 bg-black/20 text-white/80
                backdrop-blur-xl transition-all duration-500 group-hover:border-white/25 group-hover:bg-black/30"
            >
              <Icon aria-hidden className="size-3.75 stroke-[1.5]" />
            </span>
            <span className="text-[9px] font-medium uppercase tracking-[0.3em] text-white/55">
              Collection
            </span>
          </div>
          <span className="font-mono text-[9px] tabular-nums tracking-[0.2em] text-white/35">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Floating arrow */}
        <span
          aria-hidden
          className="absolute right-5 top-20 z-10 flex size-10 translate-y-2 items-center justify-center rounded-full
            border border-white/15 bg-black/20 opacity-0 backdrop-blur-xl transition-all duration-500 ease-out
            group-hover:translate-y-0 group-hover:opacity-100 group-hover:border-white/25 group-hover:bg-black/30"
        >
          <ArrowUpRight className="size-4 text-white transition-transform duration-500 group-hover:rotate-6" />
        </span>

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-white/40 transition-all duration-700 group-hover:w-12 group-hover:bg-white/70" />
            <span className="text-[9px] font-medium uppercase tracking-[0.24em] text-white/55">
              {count} {count === 1 ? "Listing" : "Listings"}
            </span>
          </div>

          <h3
            className="max-w-[92%] font-display text-[2rem] sm:text-[2.25rem] lg:text-[2.35rem] font-normal
              leading-[0.94] tracking-[-0.045em] text-white transition-transform duration-700
              ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5"
          >
            {title}
          </h3>

          <p className="mt-3 max-w-[90%] text-[11px] leading-relaxed tracking-[0.03em] text-white/50 transition-colors duration-500 group-hover:text-white/65">
            {subtitle}
          </p>

          <div className="mt-6 flex items-center gap-3 overflow-hidden">
            <span
              className="translate-y-2 text-[9px] font-semibold uppercase tracking-[0.26em] text-white/0
                transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:text-white/80"
            >
              Explore Collection
            </span>
            <span className="h-px w-0 bg-white/50 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-12" />
          </div>
        </div>

        {/* Bottom accent + corner detail */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 z-20 h-px origin-left scale-x-0 bg-white/70 transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
        />
        <div
          aria-hidden
          className="absolute bottom-5 right-5 sm:bottom-6 sm:right-6 z-10 size-2 border-r border-b border-white/30 opacity-0 transition-all duration-500 group-hover:opacity-100"
        />
      </Link>
    </motion.div>
  );
}