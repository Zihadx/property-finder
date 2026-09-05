import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Pagination({
  currentPage,
  totalPages,
  buildHref,
}: {
  currentPage: number;
  totalPages: number;
  buildHref: (page: number) => string;
}) {

if (totalPages <= 1) return null;

const pages = Array.from(
  { length: totalPages },
  (_, i) => i + 1,
);

return (
  <nav
    className="mt-20 border-t border-border/60 pt-7"
    aria-label="Pagination"
  >
    <div className="flex items-center justify-between">
      {/* Previous */}
      <PageLink
        href={buildHref(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <ChevronLeft className="size-3.5" />
        <span className="hidden text-[8px] uppercase tracking-[0.2em] sm:inline">
          Previous
        </span>
      </PageLink>

      {/* Page numbers */}
      <div className="flex items-center gap-1">
        {pages.map((page) => (
          <PageLink
            key={page}
            href={buildHref(page)}
            active={page === currentPage}
          >
            <span className="font-mono text-[9px] tabular-nums">
              {String(page).padStart(2, "0")}
            </span>
          </PageLink>
        ))}
      </div>

      {/* Next */}
      <PageLink
    
        href={buildHref(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <span className="hidden text-[8px] uppercase tracking-[0.2em] sm:inline ">
          Next
        </span>
        <ChevronRight className="size-3.5" />
      </PageLink>
    </div>
  </nav>
);

function PageLink({
  href,
  active,
  disabled,
  children,
  ...props
}: {
  href: string;
  active?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (disabled) {
    return (
      <span
        className="
          flex h-9 min-w-9
          items-center justify-center gap-2
          text-muted-foreground/25
        "
      >
        {children}
      </span>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        `
          flex h-9 min-w-9
          items-center justify-center gap-2
          border
          px-2.5
          transition-all duration-300
        `,
        active
          ? "border-foreground bg-foreground text-background"
          : "border-transparent text-muted-foreground hover:border-border hover:text-foreground",
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
}

