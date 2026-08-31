
"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";
import { motion } from "framer-motion";

import { cn, formatBDT } from "@/lib/utils";
import type { Area } from "@/types/area";

type AreaCardProps = {
  area: Area;
  size?: "sm" | "md" | "lg";
  className?: string;
  priority?: boolean;
  index?: number;
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 45,
    scale: 0.97,
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function AreaCard({
  area,
  size = "md",
  className,
  priority = false,
  index = 0,
}: AreaCardProps) {
  const isLarge = size === "lg";

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.18,
      }}
      transition={{
        delay: Math.min(index * 0.08, 0.4),
      }}
      className={cn("h-full min-h-0", className)}
    >
      <Link
        href={`/areas/${area.slug}`}
        className={cn(
          "group relative block h-full min-h-0 overflow-hidden",
          "rounded-[2px]",
          "border border-white/[0.12]",
          "bg-[#0b1828]",
          "shadow-[0_20px_60px_rgba(0,0,0,0.22)]",
          "transition-all duration-700",
          "hover:-translate-y-1",
          "hover:border-white/[0.28]",
          "hover:shadow-[0_30px_90px_rgba(0,0,0,0.38)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
        )}
      >
        {/* Image */}
        <Image
          src={area.image}
          alt={`${area.name} real estate`}
          fill
          priority={priority}
          sizes={
            isLarge
              ? "(min-width: 1024px) 50vw, 100vw"
              : "(min-width: 1024px) 25vw, 50vw"
          }
          className={cn(
            "object-cover",
            "transition-transform duration-[1400ms]",
            "ease-[cubic-bezier(0.22,1,0.36,1)]",
            "group-hover:scale-[1.075]"
          )}
        />

        {/* Cinematic image treatment */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-black/[0.05] via-black/[0.08] to-black/[0.88]"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-black/[0.28] via-transparent to-transparent"
        />

        {/* Subtle premium vignette */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        >
          <div className="absolute inset-0 bg-[#2095AE]/[0.06]" />
        </div>

        {/* Top metadata */}
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4 sm:p-5">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-black/20 backdrop-blur-md">
              <MapPin className="h-3 w-3 text-white/80" />
            </span>

            <span className="text-[9px] font-medium uppercase tracking-[0.24em] text-white/65">
              Dhaka
            </span>
          </div>

          {/* Arrow */}
          <span className="flex h-9 w-9 translate-y-1 items-center justify-center rounded-full border border-white/15 bg-black/20 opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight className="h-4 w-4 text-white" />
          </span>
        </div>

        {/* Bottom content */}
        <div
          className={cn(
            "absolute inset-x-0 bottom-0",
            isLarge ? "p-6 sm:p-8" : "p-4 sm:p-5"
          )}
        >
          {/* Small label */}
          <p
            className={cn(
              "mb-2 font-medium uppercase tracking-[0.2em] text-white/45",
              isLarge ? "text-[10px]" : "text-[8px]"
            )}
          >
            {area.propertyCount} residences
          </p>

          {/* Area name */}
          <h3
            className={cn(
              "font-display font-normal leading-[0.95] tracking-[-0.035em] text-white",
              isLarge
                ? "text-3xl sm:text-4xl lg:text-5xl"
                : "text-xl sm:text-2xl"
            )}
          >
            {area.name}
          </h3>

          {/* Price + divider */}
          <div
            className={cn(
              "mt-4 flex items-center gap-3",
              isLarge ? "text-sm" : "text-[11px]"
            )}
          >
            <span className="h-px w-5 bg-white/30" />

            <span className="font-medium tracking-wide text-white/65">
              From{" "}
              <span className="text-white/90">
                {formatBDT(area.averagePricePerSqft)}
              </span>
              /sqft
            </span>
          </div>

          {/* Description only on large card */}
          {isLarge && (
            <p className="mt-4 max-w-md text-xs leading-5 text-white/50 sm:text-sm">
              {area.description}
            </p>
          )}

          {/* Hover exploration line */}
          <div className="mt-5 flex items-center gap-3 overflow-hidden">
            <span className="text-[9px] font-semibold uppercase tracking-[0.24em] text-white/0 transition-all duration-500 group-hover:text-white/65">
              Explore neighbourhood
            </span>

            <span className="h-px w-0 bg-white/30 transition-all duration-700 group-hover:w-12" />
          </div>
        </div>

        {/* Inner border / luxury framing */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 border border-white/[0.04] transition-colors duration-700 group-hover:border-white/[0.12]"
        />
      </Link>
    </motion.div>
  );
}

