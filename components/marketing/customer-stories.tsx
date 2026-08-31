import Image from "next/image";
import { testimonials } from "@/data/testimonials";
import { SectionHeading } from "./section-heading";
import { cn } from "@/lib/utils";

/**
 * Milestone 15: alternating editorial rows rather than three identical
 * testimonial cards. Each story pairs a placeholder property photo with a
 * quote and a process-outcome line — never a business metric (customer
 * count, revenue), since this dataset has no real numbers to back that
 * kind of claim. See data/testimonials.ts for the swap-out note.
 */
export function CustomerStories() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
      <SectionHeading
        eyebrow="From real searches"
        title="What finding a place actually looked like"
        description="A few stories from people who went through the process — not a highlight reel."
      />

      <div className="mt-14 flex flex-col gap-16">
        {testimonials.map((story, index) => (
          <div
            key={story.id}
            className={cn(
              "flex flex-col gap-6 lg:items-center lg:gap-12",
              index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
            )}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-md)] bg-surface-muted lg:w-2/5">
              <Image
                src={story.image}
                alt={story.propertyLabel}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="lg:w-3/5">
              <p className="font-display text-xl leading-snug text-foreground sm:text-2xl">
                &ldquo;{story.quote}&rdquo;
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{story.outcome}</p>
              <p className="mt-4 text-sm font-medium text-foreground">
                {story.customerName}
                <span className="ml-2 font-normal text-muted-foreground">searching in {story.area}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
