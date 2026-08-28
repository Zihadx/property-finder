import Link from "next/link";
import { Card } from "@/components/ui/card";

export function TopInterestList({
  items,
}: {
  items: { title: string; slug: string; inquiries: number; views: number }[];
}) {
  return (
    <Card className="p-5">
      <p className="font-display text-base text-foreground">Property interest this month</p>
      <ol className="mt-4 space-y-3">
        {items.map((item, index) => (
          <li key={item.slug} className="flex items-center gap-3">
            <span className="ledger-value flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface-muted text-xs text-muted-foreground">
              {index + 1}
            </span>
            <Link href={`/properties/${item.slug}`} className="min-w-0 flex-1 truncate text-sm text-foreground hover:text-accent">
              {item.title}
            </Link>
            <span className="ledger-value shrink-0 text-xs text-muted-foreground">
              {item.inquiries} inq · {item.views} views
            </span>
          </li>
        ))}
      </ol>
    </Card>
  );
}
