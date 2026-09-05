"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SearchX } from "lucide-react";

import { EmptyState } from "@/components/ui/empty-state";
import type { Project } from "@/types/project";

import { ProjectCard } from "./project-card";
import { HorizontalProjectCard } from "./horizontal-project-card";

interface ProjectGridProps {
  projects: Project[];
  view: "grid" | "list";
}

export function ProjectGrid({ projects, view }: ProjectGridProps) {
  const reduceMotion = useReducedMotion();

  if (projects.length === 0) {
    return (
      <div className="py-16">
        <EmptyState
          icon={SearchX}
          title="No projects found"
          description="Try widening your budget range or clearing a filter — new projects are added regularly."
        />
      </div>
    );
  }

  const itemAnimation = (index: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.7,
            delay: Math.min(index, 8) * 0.055,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        };

  // List view
  if (view === "list") {
    return (
      <div className="divide-y divide-border/50 border-y border-border/50">
        {projects.map((project, index) => (
          <motion.article
            key={project.id}
            {...itemAnimation(index)}
            className="py-5 first:pt-0 last:pb-0"
          >
            <HorizontalProjectCard project={project} />
          </motion.article>
        ))}
      </div>
    );
  }

  // Grid view
  return (
    <div className="grid grid-cols-1 gap-x-7 gap-y-14 sm:grid-cols-2 xl:grid-cols-3 xl:gap-x-8 xl:gap-y-16">
      {projects.map((project, index) => (
        <motion.article key={project.id} {...itemAnimation(index)}>
          <ProjectCard project={project} />
        </motion.article>
      ))}
    </div>
  );
}