"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, MessageCircle, Phone } from "lucide-react";
import type { Agent } from "@/types/agent";

type AgentCardProps = {
  agent: Agent;
  listingCount: number;
  index?: number;
};

export function AgentCard({ agent, listingCount, index = 0 }: AgentCardProps) {
  const whatsappHref = `https://wa.me/${agent.whatsapp.replace(/[^\d]/g, "")}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.55,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group py-8"
    >
      <div className="relative overflow-hidden rounded-xl border border-border/70 bg-background p-3.5 transition-all duration-500 hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-[0_16px_40px_-24px_rgba(0,0,0,0.3)]">
        {/* Subtle hover accent */}
        <div className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-foreground transition-transform duration-500 group-hover:scale-x-100" />
        {/* Profile */}
        <div className="flex items-center gap-3">
          <Link
            href={`/agents/${agent.slug}`}
            className="relative size-14 shrink-0 overflow-hidden rounded-lg"
            aria-label={`View ${agent.name}'s profile`}
          >
            <Image
              src={agent.photo}
              alt={agent.name}
              fill
              sizes="56px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
          </Link>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <Link href={`/agents/${agent.slug}`} className="min-w-0">
                <h3 className="truncate font-display text-base leading-tight tracking-[-0.02em] text-foreground transition-colors group-hover:text-foreground/70">
                  {agent.name}
                </h3>
              </Link>

              <Link
                href={`/agents/${agent.slug}`}
                aria-label={`View ${agent.name}`}
                className="flex size-7 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 hover:border-foreground hover:bg-foreground hover:text-background"
              >
                <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-px group-hover:-translate-y-px" />
              </Link>
            </div>

            <p className="mt-0.5 truncate text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
              {agent.position}
            </p>

            <div className="mt-1.5 flex items-center gap-1.5">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-foreground/30" />
                <span className="relative size-1.5 rounded-full bg-foreground/70" />
              </span>

              <span className="truncate text-[10px] text-muted-foreground">
                {agent.responseTime}
              </span>
            </div>
          </div>
        </div>
        {/* Location */}
        <div className="mt-3 flex items-center gap-1.5 border-t border-border/60 pt-3">
          <MapPin className="size-3 shrink-0 text-muted-foreground" />

          <p className="truncate text-[10px] text-muted-foreground">
            {agent.areasServed.join(" · ")}
          </p>
        </div>
        {/* Metrics */}
        <div className="mt-3 grid grid-cols-2 overflow-hidden rounded-lg border border-border/60 bg-surface-muted/40">
          <div className="px-3 py-2.5">
            <p className="text-[8px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
              Listings
            </p>

            <p className="mt-0.5 font-display text-lg leading-none text-foreground">
              {listingCount}
            </p>
          </div>

          <div className="border-l border-border/60 px-3 py-2.5">
            <p className="text-[8px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
              Experience
            </p>

            <p className="mt-0.5 font-display text-lg leading-none text-foreground">
              {agent.experienceYears}
              <span className="ml-1 text-[9px] text-muted-foreground">yrs</span>
            </p>
          </div>
        </div>
        {/* Actions */}
        <div className="mt-3 flex gap-1.5">
          <a
            href={`tel:${agent.phone.replace(/\s/g, "")}`}
            className="flex h-8 flex-1 items-center justify-center gap-1.5 rounded-md border border-border text-[10px] font-medium text-foreground transition-all duration-300 hover:border-foreground hover:bg-foreground hover:text-background"
          >
            <Phone className="size-3" />
            Call
          </a>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 flex-1 items-center justify-center gap-1.5 rounded-md bg-foreground text-[10px] font-medium text-background transition-all duration-300 hover:bg-foreground/85"
          >
            <MessageCircle className="size-3" />
            WhatsApp
          </a>
        </div>
      </div>
    </motion.article>
  );
}
