import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";

import { formatBDT } from "@/lib/currency";
import type { Project } from "@/types/project";

export function HorizontalProjectCard({ project }: { project: Project }) {
  const isComplete = project.constructionProgress >= 100;

  return (
    <Link
      href={`/projects/${project.slug}`}
      aria-label={`View ${project.name}`}
      className="group block"
    >
      <article className="flex overflow-hidden border border-border/70 bg-card transition-colors duration-300 hover:border-foreground/30">
        {/* Image */}
        <div className="relative h-[110px] w-[145px] shrink-0 overflow-hidden bg-muted sm:h-[130px] sm:w-[190px] lg:h-[145px] lg:w-[220px]">
          <Image
            src={project.images[0]}
            alt={project.name}
            fill
            sizes="220px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute left-2.5 top-2.5 border border-white/30 bg-black/40 px-2 py-1 text-xs font-medium text-white backdrop-blur">
            {isComplete ? "Ready" : `${project.constructionProgress}% built`}
          </span>
        </div>

        {/* Content */}
        <div className="flex min-w-0 flex-1 flex-col justify-center px-4 py-3 sm:px-5">
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="size-3.5 shrink-0" strokeWidth={1.5} />
            <span className="truncate">{project.location.area}</span>
          </p>

          <h3 className="mt-1 truncate font-display text-lg tracking-[-0.02em] text-foreground sm:text-xl">
            {project.name}
          </h3>

          <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
            {project.tagline}
          </p>

          <div className="mt-3 flex items-center justify-between gap-3 border-t border-border/60 pt-3">
            <p className="min-w-0 truncate text-xs text-muted-foreground">
              {project.totalUnits} units · {project.bedroomRange}
            </p>

            <div className="flex shrink-0 items-center gap-3">
              <span className="hidden text-sm font-medium text-foreground sm:inline">
                From {formatBDT(project.startingPrice)}
              </span>

              <span className="flex size-7 items-center justify-center rounded-full border border-border text-foreground transition-colors duration-300 group-hover:border-foreground group-hover:bg-foreground group-hover:text-background">
                <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}