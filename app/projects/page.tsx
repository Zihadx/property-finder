import type { Metadata } from "next";

import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

import { projectService } from "@/services/project.service";

import { ProjectCard } from "@/components/project/project-card";
import { ProjectFiltersSidebar } from "@/components/project/project-filters-sidebar";
import { ProjectToolbar } from "@/components/project/project-toolbar";

export const metadata: Metadata = {
  title: "New Developer Projects in Dhaka",
  description:
    "Browse upcoming and under-construction residential projects from trusted developers across Dhaka.",
};

interface ProjectsPageProps {
  searchParams: Promise<{
    q?: string;
    area?: string;
    budget?: string;
    minPrice?: string;
    maxPrice?: string;
    bedrooms?: string;
    handover?: string;
    sort?: string;
    view?: string;
  }>;
}

export default async function ProjectsPage({
  searchParams,
}: ProjectsPageProps) {
  const params = await searchParams;

  const projects = await projectService.list();

  const query = params.q?.trim().toLowerCase() ?? "";
  const area = params.area?.trim().toLowerCase() ?? "";
  const bedrooms = Number(params.bedrooms ?? 0);

  const minPrice = Number(params.minPrice ?? 0);
  const maxPrice = Number(params.maxPrice ?? 0);

  /*
   * ---------------------------------------------------------
   * FILTER
   * ---------------------------------------------------------
   */

  let filteredProjects = projects.filter((project) => {
    /* Keyword */
    if (query) {
      const searchableText = [
        project.name,
        project.tagline,
        project.description,
        project.location.area,
        project.location.address,
      ]
        .join(" ")
        .toLowerCase();

      if (!searchableText.includes(query)) {
        return false;
      }
    }

    /* Area */
    if (area) {
      const projectArea =
        project.location.area.toLowerCase();

      if (!projectArea.includes(area)) {
        return false;
      }
    }

    /* Budget */
    if (minPrice > 0) {
      if (project.startingPrice < minPrice) {
        return false;
      }
    }

    if (maxPrice > 0) {
      if (project.startingPrice > maxPrice) {
        return false;
      }
    }

    /* Bedrooms */
    if (bedrooms > 0) {
      const hasBedroomOption = project.unitTypes.some(
        (unit) => unit.bedrooms >= bedrooms
      );

      if (!hasBedroomOption) {
        return false;
      }
    }

    return true;
  });

  /*
   * ---------------------------------------------------------
   * SORT
   * ---------------------------------------------------------
   */

  const sort = params.sort ?? "newest";

  filteredProjects = [...filteredProjects].sort(
    (a, b) => {
      switch (sort) {
        case "price-asc":
          return (
            a.startingPrice -
            b.startingPrice
          );

        case "price-desc":
          return (
            b.startingPrice -
            a.startingPrice
          );

        case "progress":
          return (
            b.constructionProgress -
            a.constructionProgress
          );

        case "newest":
        default:
          return (
            Number(b.id.replace(/\D/g, "")) -
            Number(a.id.replace(/\D/g, ""))
          );
      }
    }
  );

  const view = params.view ?? "grid";

  return (
    <>
      <SiteHeader />

      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="border-b border-border/60">
          <div
            className="
              mx-auto max-w-[1600px]
              px-6 pb-12 pt-12
              sm:px-8
              lg:px-12 lg:pb-14 lg:pt-16
            "
          >
            <h1
              className="
                max-w-3xl
                font-display text-4xl font-normal
                leading-[0.95]
                tracking-[-0.045em]
                text-foreground
                sm:text-5xl lg:text-6xl
              "
            >
              New developer projects.
            </h1>

            <p
              className="
                mt-6 max-w-xl
                text-sm leading-7
                text-muted-foreground
              "
            >
              Explore under-construction and ready
              residential projects from trusted developers
              across Dhaka, with unit availability, payment
              plans and site visit booking.
            </p>
          </div>
        </section>

        {/* Listing */}
        <section
          className="
            mx-auto max-w-[1600px]
            px-6 py-10
            sm:px-8
            lg:px-12 lg:py-14
          "
        >
          <div
            className="
              grid gap-10
              lg:grid-cols-[280px_minmax(0,1fr)]
              xl:grid-cols-[300px_minmax(0,1fr)]
            "
          >
            {/* Sidebar */}
            <ProjectFiltersSidebar />

            {/* Results */}
            <div className="min-w-0">
              <ProjectToolbar
                resultCount={filteredProjects.length}
              />

              {filteredProjects.length === 0 ? (
                <div className="py-20 text-center">
                  <p className="text-sm text-muted-foreground">
                    No projects found.
                  </p>
                </div>
              ) : (
                <div
                  className={
                    view === "list"
                      ? "mt-8 flex flex-col gap-8"
                      : `
                        mt-8
                        grid grid-cols-1
                        gap-x-7 gap-y-14
                        sm:grid-cols-2
                        xl:grid-cols-3
                        xl:gap-x-8
                      `
                  }
                >
                  {filteredProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}