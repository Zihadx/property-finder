import { ProjectFiltersForm } from "./project-filters-form";

export function ProjectFiltersSidebar() {
  return (
    <aside className="hidden shrink-0 lg:block lg:w-70 xl:w-75">
      <div className="sticky top-28">
        <div className="border-b border-border/70 pb-5">
          <h2 className="font-display text-xl tracking-tight text-foreground">
            Find a project
          </h2>
        </div>

        <div className="border-b border-border/50">
          <ProjectFiltersForm />
        </div>
      </div>
    </aside>
  );
}