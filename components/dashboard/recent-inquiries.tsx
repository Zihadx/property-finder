import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Inquiry } from "@/types/inquiry";

const statusVariant: Record<Inquiry["status"], "warning" | "accent" | "success" | "neutral"> = {
  New: "warning",
  Contacted: "accent",
  "Site Visit Scheduled": "success",
  Closed: "neutral",
};

export function RecentInquiries({ inquiries }: { inquiries: Inquiry[] }) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <p className="font-display text-base text-foreground">Recent inquiries</p>
        <Link href="/dashboard/leads" className="text-xs text-accent-strong hover:underline">
          View all
        </Link>
      </div>
      <ul className="mt-4 divide-y divide-border">
        {inquiries.map((inquiry) => (
          <li key={inquiry.id} className="flex items-center justify-between gap-3 py-3">
            <div className="min-w-0">
              <p className="truncate text-sm text-foreground">{inquiry.customerName}</p>
              <p className="truncate text-xs text-muted-foreground">{inquiry.message}</p>
            </div>
            <Badge variant={statusVariant[inquiry.status]} className="shrink-0">
              {inquiry.status}
            </Badge>
          </li>
        ))}
      </ul>
    </Card>
  );
}
