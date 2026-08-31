"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Building2, Layers, MapPinned, Store } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

type IconName = "building" | "layers" | "map" | "store";

type PropertyCategoryCardProps = {
  title: string;
  subtitle: string;
  href: string;
  count: number;
  image?: string;
  icon: IconName;
  index?: number;
};

const iconMap = {
  building: Building2,
  layers: Layers,
  map: MapPinned,
  store: Store,
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 35,
    scale: 0.98,
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

export function PropertyCategoryCard({
  title,
  subtitle,
  href,
  count,
  image,
  icon,
  index = 0,
}: PropertyCategoryCardProps) {
  const Icon = iconMap[icon];

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        delay: Math.min(index * 0.09, 0.35),
      }}
      className="shrink-0"
    >
      <Link
        href={href}
        className={cn(
          "group relative block h-[430px] w-[270px] overflow-hidden",
          "rounded-[3px] border border-white/[0.08]",
          "bg-[#091522]",
          "shadow-[0_20px_70px_rgba(0,0,0,0.14)]",
          "transition-all duration-700",
          "hover:-translate-y-2",
          "hover:shadow-[0_35px_100px_rgba(0,0,0,0.24)]",
          "focus-visible:outline-none",
          "focus-visible:ring-2",
          "focus-visible:ring-[#2095AE]/60",
          "sm:h-[470px] sm:w-[300px]"
        )}
      >
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            sizes="300px"
            className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]"
          />
        ) : (
          <div className="absolute inset-0 bg-[#0c1928]" />
        )}

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-black/[0.10] via-black/[0.10] to-black/[0.92]"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-black/[0.30] via-transparent to-transparent"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[#2095AE]/0 transition-colors duration-700 group-hover:bg-[#2095AE]/[0.08]"
        />

        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center border border-white/15 bg-black/20 backdrop-blur-md">
              <Icon className="h-[15px] w-[15px] text-white/80" />
            </span>

            <span className="text-[8px] font-semibold uppercase tracking-[0.25em] text-white/60">
              Collection
            </span>
          </div>

          <span className="font-mono text-[9px] tracking-[0.2em] text-white/35">
            0{index + 1}
          </span>
        </div>

        <span className="absolute right-5 top-20 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full border border-white/15 bg-black/20 opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4 text-white" />
        </span>

        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-6 bg-white/35" />

            <span className="text-[9px] font-medium uppercase tracking-[0.22em] text-white/55">
              {count} listings
            </span>
          </div>

          <h3 className="font-display text-[2rem] leading-[0.95] tracking-[-0.04em] text-white sm:text-[2.25rem]">
            {title}
          </h3>

          <p className="mt-3 text-[11px] tracking-wide text-white/50">
            {subtitle}
          </p>

          <div className="mt-6 flex items-center gap-3 overflow-hidden">
            <span className="translate-y-2 text-[9px] font-semibold uppercase tracking-[0.24em] text-white/0 transition-all duration-500 group-hover:translate-y-0 group-hover:text-white/75">
              Explore collection
            </span>

            <span className="h-px w-0 bg-white/40 transition-all duration-700 group-hover:w-10" />
          </div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-3 border border-white/[0.08] opacity-70 transition-all duration-700 group-hover:inset-2 group-hover:border-white/[0.18]"
        />

        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 h-px w-0 bg-white/50 transition-all duration-1000 group-hover:w-full"
        />
      </Link>
    </motion.div>
  );
}