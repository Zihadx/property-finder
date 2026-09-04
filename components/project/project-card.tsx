import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { formatBDT } from "@/lib/currency";
import type { Project } from "@/types/project";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden border border-border/70 bg-muted">
        <Image
          src={project.images[0]}
          alt={project.name}
          fill
          sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 border border-white/30 bg-black/40 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
          {project.constructionProgress === 100 ? "Ready" : `${project.constructionProgress}% built`}
        </span>
      </div>

      <div className="mt-4">
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="size-3.5 shrink-0" />
          {project.location.area}
        </p>

        <h3 className="mt-1 font-display text-xl text-foreground">
          {project.name}
        </h3>

        <p className="mt-1 text-sm text-muted-foreground">{project.tagline}</p>

        <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-4 text-sm">
          <span className="text-muted-foreground">
            {project.totalUnits} units · {project.bedroomRange}
          </span>
          <span className="font-medium text-foreground">
            From {formatBDT(project.startingPrice)}
          </span>
        </div>
      </div>
    </Link>
  );
}