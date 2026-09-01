import { PropertyFiltersForm } from "./property-filters-form";


export function PropertyFiltersSidebar() {
  return (
    <aside
      className="
        hidden shrink-0 lg:block
        lg:w-70
        xl:w-75
      "
    >
      <div className="sticky top-28">
        {/* Header */}
        <div className="border-b border-border/70 pb-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-muted-foreground/60">
                Refine
              </p>

              <h2 className="mt-2 font-display text-xl tracking-tight text-foreground">
                Find a property
              </h2>
            </div>

            <span className="font-mono text-[8px] tracking-[0.18em] text-muted-foreground/40">
              FILTER
            </span>
          </div>
        </div>

        {/* Form */}
        <div className="mt-1 border-b border-border/50">
          <PropertyFiltersForm />
        </div>

        {/* Bottom detail */}
        <div className="mt-5 flex items-center gap-3">
          <span className="h-px w-6 bg-border" />

          <span className="text-[8px] uppercase tracking-[0.25em] text-muted-foreground/40">
            Curated Search
          </span>
        </div>
      </div>
    </aside>
  );
}


