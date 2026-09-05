import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";

import { formatBDT } from "@/lib/currency";
import type { Project } from "@/types/project";

export function ProjectCard({ project }: { project: Project }) {
  const isComplete = project.constructionProgress >= 100;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block"
      aria-label={`View ${project.name}`}
    >
      {/* Image */}
      <div className="relative aspect-4/3 overflow-hidden bg-muted">
        <Image
          src={project.images[0]}
          alt={project.name}
          fill
          sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />

        {/* Cinematic overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-black/10 opacity-70 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Construction status */}
        <div className="absolute left-4 top-4">
          <span className="inline-flex items-center border border-white/25 bg-black/35 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-white backdrop-blur-md">
            {isComplete
              ? "Ready"
              : `${project.constructionProgress}% built`}
          </span>
        </div>

        {/* Arrow */}
        <div className="absolute right-4 top-4 flex size-9 translate-y-1 items-center justify-center rounded-full border border-white/20 bg-black/25 text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="size-4" strokeWidth={1.5} />
        </div>

        {/* Bottom location */}
        <div className="absolute inset-x-0 bottom-0 p-4">
          <div className="flex items-center gap-1.5 text-xs text-white/80">
            <MapPin className="size-3.5 shrink-0" strokeWidth={1.5} />
            <span>{project.location.area}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="pt-5">
        <h3 className="font-display text-2xl leading-tight tracking-tight text-foreground transition-colors duration-300 group-hover:text-foreground/75">
          {project.name}
        </h3>

        <p className="mt-2 line-clamp-2 max-w-xl text-sm leading-6 text-muted-foreground">
          {project.tagline}
        </p>

        {/* Meta */}
        <div className="mt-5 flex flex-col gap-3 border-t border-border/60 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{project.totalUnits} units</span>

            <span className="size-1 rounded-full bg-border" />

            <span>{project.bedroomRange}</span>
          </div>

          <div className="text-sm font-medium text-foreground">
            <span className="mr-1 text-muted-foreground">From</span>
            {formatBDT(project.startingPrice)}
          </div>
        </div>
      </div>
    </Link>
  );
}