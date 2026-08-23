import { PropertyFiltersForm } from "./property-filters-form";

export function PropertyFiltersSidebar() {
  return (
    <aside className="hidden shrink-0 rounded-[var(--radius-md)] border border-border bg-surface lg:block lg:w-72">
      <div className="border-b border-border px-5 py-4">
        <p className="font-display text-base text-foreground">Filters</p>
      </div>
      <PropertyFiltersForm />
    </aside>
  );
}
