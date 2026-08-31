
"use client";

import Image from "next/image";
import { ArrowUpRight, Quote } from "lucide-react";
import { motion, type Variants } from "framer-motion";

import { testimonials } from "@/data/testimonials";
import { SectionHeading } from "./section-heading";

const storyVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: index * 0.06,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export function CustomerStories() {
  return (
    <section className="border-t border-border">
      <div className="container mx-auto px-6 py-14 md:py-16">
        <SectionHeading
          eyebrow="Customer stories"
          title="Real searches. Real outcomes."
          description="A glimpse into how people found the right place."
        />

        <div className="mt-8 divide-y divide-border border-y border-border">
          {testimonials.map((story, index) => (
            <motion.article
              key={story.id}
              custom={index}
              variants={storyVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              className="group grid gap-5 py-6 md:grid-cols-[7rem_1fr_auto] md:items-center md:gap-7"
            >
              {/* Image */}
              <div className="relative aspect-4/3 overflow-hidden rounded-md bg-muted md:h-18 md:aspect-auto">
                <Image
                  src={story.image}
                  alt={story.propertyLabel}
                  fill
                  sizes="112px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/35 to-transparent" />
              </div>

              {/* Content */}
              <div className="min-w-0">
                <div className="mb-2 flex items-center gap-2">
                  <Quote className="size-3.5 text-accent" />

                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    {story.area}
                  </span>
                </div>

                <blockquote className="max-w-2xl font-display text-base leading-snug tracking-tight text-foreground sm:text-lg">
                  “{story.quote}”
                </blockquote>

                <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">
                    {story.customerName}
                  </span>

                  <span className="text-border-strong">/</span>

                  <span>{story.propertyLabel}</span>
                </div>
              </div>

              {/* Outcome */}
              <div className="flex items-center justify-between gap-4 border-t border-border pt-3 md:w-44 md:border-l md:border-t-0 md:pl-5 md:pt-0">
                <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                  {story.outcome}
                </p>

                <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-all duration-300 group-hover:border-foreground group-hover:text-foreground">
                  <ArrowUpRight className="size-3.5" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

