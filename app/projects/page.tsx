import type { Metadata } from "next";

import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Pagination } from "@/components/ui/pagination";

import { ProjectFiltersSidebar } from "@/components/project/project-filters-sidebar";
import { ProjectToolbar } from "@/components/project/project-toolbar";
import { ProjectGrid } from "@/components/project/project-grid";

import { projectService, type ProjectSort } from "@/services/project.service";

export const metadata: Metadata = {
  title: "New Developer Projects in Dhaka",
  description:
    "Browse upcoming and under-construction residential projects from trusted developers across Dhaka.",
};

const PAGE_SIZE = 9;

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
    page?: string;
  }>;
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const params = await searchParams;

  const query = params.q?.trim() || undefined;
  const area = params.area?.trim() || undefined;
  const minPrice = params.minPrice ? Number(params.minPrice) : undefined;
  const maxPrice = params.maxPrice ? Number(params.maxPrice) : undefined;
  const bedrooms = params.bedrooms ? Number(params.bedrooms) : undefined;
  const sort = (params.sort as ProjectSort) ?? "newest";
  const view = params.view === "list" ? "list" : "grid";

  const rawPage = Number(params.page ?? "1");
  const page = Number.isFinite(rawPage) ? Math.max(1, rawPage) : 1;

  // Fetch, filter and sort
  const allProjects = await projectService.list(
    { query, area, minPrice, maxPrice, bedrooms },
    sort
  );

  // Paginate
  const totalPages = Math.max(1, Math.ceil(allProjects.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageProjects = allProjects.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  function buildHref(targetPage: number) {
    const search = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (typeof value === "string" && key !== "page") search.set(key, value);
    }
    if (targetPage > 1) search.set("page", String(targetPage));
    const qs = search.toString();
    return qs ? `/projects?${qs}` : "/projects";
  }

  return (
    <>
      <SiteHeader />

      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="border-b border-border/60">
          <div className="mx-auto max-w-[1600px] px-6 pb-12 pt-12 sm:px-8 lg:px-12 lg:pb-14 lg:pt-16">
            <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
              <div className="max-w-3xl">
                <h1 className="max-w-4xl font-display text-4xl font-normal leading-[0.95] tracking-[-0.045em] text-foreground sm:text-5xl lg:text-6xl xl:text-7xl">
                  New developer
                  <br />
                  <span className="text-foreground/80">projects.</span>
                </h1>

                <p className="mt-6 max-w-xl text-sm leading-7 text-muted-foreground">
                  Explore under-construction and ready residential projects
                  from trusted developers across Dhaka, with unit
                  availability, payment plans and site visit booking.
                </p>
              </div>

              <div className="hidden shrink-0 text-right lg:block">
                <p className="text-sm font-medium text-foreground">
                  {allProjects.length}{" "}
                  {allProjects.length === 1 ? "project" : "projects"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Listing */}
        <section className="mx-auto max-w-[1600px] px-6 py-10 sm:px-8 lg:px-12 lg:py-14">
          <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
            <ProjectFiltersSidebar />

            <div className="min-w-0 flex-1">
              <ProjectToolbar resultCount={allProjects.length} />

              <div className="mt-8">
                <ProjectGrid projects={pageProjects} view={view} />
              </div>

              {allProjects.length > 0 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  buildHref={buildHref}
                />
              )}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}