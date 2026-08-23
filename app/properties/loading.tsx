import { SiteHeader } from "@/components/layout/site-header";
import { PropertyCardSkeleton, Skeleton } from "@/components/ui/skeleton";

export default function LoadingProperties() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-6 py-10">
        <Skeleton className="mb-2 h-4 w-40" />
        <Skeleton className="mb-8 h-9 w-96" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <PropertyCardSkeleton key={i} />
          ))}
        </div>
      </main>
    </>
  );
}
