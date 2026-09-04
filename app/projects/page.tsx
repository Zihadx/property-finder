import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

import { projectService } from "@/services/project.service";
import { ProjectCard } from "@/components/project/project-card";

export const metadata: Metadata = {
  title: "New Developer Projects in Dhaka",
  description:
    "Browse upcoming and under-construction residential projects from trusted developers across Dhaka.",
};

export default async function ProjectsPage() {
  const projects = await projectService.list();

  return (
    <>
      <SiteHeader />

      <main className="min-h-screen bg-background">
        <section className="border-b border-border/60">
          <div className="mx-auto max-w-[1600px] px-6 pb-12 pt-12 sm:px-8 lg:px-12 lg:pb-14 lg:pt-16">
            <h1 className="max-w-3xl font-display text-4xl font-normal leading-[0.95] tracking-[-0.045em] text-foreground sm:text-5xl lg:text-6xl">
              New developer projects.
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-7 text-muted-foreground">
              Explore under-construction and ready residential projects from
              trusted developers across Dhaka, with unit availability,
              payment plans and site visit booking.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-[1600px] px-6 py-10 sm:px-8 lg:px-12 lg:py-14">
          <p className="mb-8 text-sm text-foreground">
            <span className="font-medium">{projects.length}</span>{" "}
            <span className="text-muted-foreground">
              {projects.length === 1 ? "project" : "projects"}
            </span>
          </p>

          {projects.length === 0 ? (
            <p className="py-16 text-center text-sm text-muted-foreground">
              No projects listed yet — check back soon.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-x-7 gap-y-14 sm:grid-cols-2 xl:grid-cols-3 xl:gap-x-8">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </section>
      </main>

      <SiteFooter />
    </>
  );
}