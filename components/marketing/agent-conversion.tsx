import Link from "next/link";
import { Building2, MessagesSquare, CalendarClock, Check } from "lucide-react";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { Button } from "@/components/ui/button";
import { analyticsService } from "@/services/analytics.service";

const capabilities = [
  "Organize every listing in one place instead of scattered folders and chats",
  "Manage inquiries and site-visit requests from a single queue",
  "Showcase properties with a professional page and a shareable URL",
  "Keep your agent profile — response time, specialization, contact — up to date",
];

/**
 * Milestone 17: the B2B counterpart to Milestone 16, deliberately laid
 * out differently (checklist + live KPI preview instead of an icon-tile
 * grid) so two consecutive conversion sections don't read as the same
 * template with different words. The preview panel reuses the actual
 * KpiCard component and analyticsService.getOverview() — the numbers
 * agents would see are the real dashboard numbers, not a mockup.
 */
export async function AgentConversion() {
  const overview = await analyticsService.getOverview();

  return (
    <section className="border-t border-border bg-surface-muted">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-16 md:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="ledger-label mb-3">For agents & agencies</p>
          <h2 className="font-display text-3xl leading-tight text-foreground sm:text-4xl">
            Run your listings like it&apos;s your job — because it is
          </h2>
          <ul className="mt-6 flex flex-col gap-3">
            {capabilities.map((capability) => (
              <li key={capability} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-strong" />
                {capability}
              </li>
            ))}
          </ul>
          <Button asChild size="lg" className="mt-8">
            <Link href="/dashboard">Join as an Agent</Link>
          </Button>
        </div>

        <div>
          <p className="ledger-label mb-3 text-muted-foreground">A live look at your dashboard</p>
          <div className="grid grid-cols-2 gap-4">
            <KpiCard label="Total listings" value={overview.totalListings} icon={Building2} />
            <KpiCard
              label="New leads this week"
              value={overview.newLeadsThisWeek}
              icon={MessagesSquare}
              trend={overview.leadsChangePct}
            />
            <KpiCard label="Site visit requests" value={overview.siteVisitRequests} icon={CalendarClock} />
            <KpiCard label="Available now" value={overview.available} icon={Building2} />
          </div>
        </div>
      </div>
    </section>
  );
}
