import type { Metadata } from "next";
import { Building2, CheckCircle2, MessagesSquare, CalendarClock } from "lucide-react";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { InsightCard } from "@/components/dashboard/insight-card";
import { ChartContainer } from "@/components/dashboard/chart-container";
import { InquiryTrendChart } from "@/components/dashboard/charts/inquiry-trend-chart";
import { StatusDonutChart } from "@/components/dashboard/charts/status-donut-chart";
import { ListingsByAreaChart } from "@/components/dashboard/charts/listings-by-area-chart";
import { RecentInquiries } from "@/components/dashboard/recent-inquiries";
import { TopInterestList } from "@/components/dashboard/top-interest-list";
import { analyticsService } from "@/services/analytics.service";
import { inquiryService } from "@/services/inquiry.service";
import { formatBDT } from "@/lib/utils";

export const metadata: Metadata = { title: "Dashboard" };

export default async function DashboardOverviewPage() {
  const [overview, trend, statusBreakdown, listingsByArea, recentInquiries, topInterest, insights] = await Promise.all([
    analyticsService.getOverview(),
    analyticsService.getInquiryTrend(),
    analyticsService.getStatusBreakdown(),
    analyticsService.getListingsByArea(),
    inquiryService.getRecent(5),
    analyticsService.getTopInterest(5),
    analyticsService.getInsights(),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="ledger-label mb-2">Agency Overview</p>
        <h1 className="font-display text-2xl text-foreground">Good to see you back</h1>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Total Listings" value={overview.totalListings} icon={Building2} />
        <KpiCard label="Available" value={overview.available} icon={CheckCircle2} />
        <KpiCard
          label="New Leads"
          value={overview.newLeadsThisWeek}
          icon={MessagesSquare}
          trend={overview.leadsChangePct}
        />
        <KpiCard label="Site Visit Requests" value={overview.siteVisitRequests} icon={CalendarClock} />
      </div>

      <InsightCard insights={insights} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ChartContainer title="Inquiry trend" description="Last 14 days">
            <InquiryTrendChart data={trend} />
          </ChartContainer>
        </div>
        <ChartContainer title="Listing status">
          <StatusDonutChart data={statusBreakdown} />
        </ChartContainer>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ChartContainer title="Listings by area" description="Top 8 areas by active listing count">
          <ListingsByAreaChart data={listingsByArea} />
        </ChartContainer>
        <TopInterestList items={topInterest} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentInquiries inquiries={recentInquiries} />
        <div className="rounded-[var(--radius-md)] border border-border bg-surface p-5">
          <p className="font-display text-base text-foreground">Estimated available inventory value</p>
          <p className="ledger-value mt-3 text-3xl text-foreground">
            {formatBDT(overview.estimatedListingValue)}
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            Sum of asking prices across all currently available listings.
          </p>
        </div>
      </div>
    </div>
  );
}
