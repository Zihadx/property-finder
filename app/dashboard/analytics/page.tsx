import type { Metadata } from "next";
import { ChartContainer } from "@/components/dashboard/chart-container";
import { InquiryTrendChart } from "@/components/dashboard/charts/inquiry-trend-chart";
import { StatusDonutChart } from "@/components/dashboard/charts/status-donut-chart";
import { ListingsByAreaChart } from "@/components/dashboard/charts/listings-by-area-chart";
import { LeadsBySourceChart } from "@/components/dashboard/charts/leads-by-source-chart";
import { ConversionFunnelChart } from "@/components/dashboard/charts/conversion-funnel-chart";
import { TopInterestList } from "@/components/dashboard/top-interest-list";
import { analyticsService } from "@/services/analytics.service";

export const metadata: Metadata = { title: "Analytics" };

export default async function DashboardAnalyticsPage() {
  const [trend, statusBreakdown, listingsByArea, leadsBySource, funnel, topInterest] = await Promise.all([
    analyticsService.getInquiryTrend(),
    analyticsService.getStatusBreakdown(),
    analyticsService.getListingsByArea(),
    analyticsService.getLeadsBySource(),
    analyticsService.getConversionFunnel(),
    analyticsService.getTopInterest(6),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="ledger-label mb-2">Performance</p>
        <h1 className="font-display text-2xl text-foreground">Analytics</h1>
      </div>

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
        <ChartContainer title="Listings by area">
          <ListingsByAreaChart data={listingsByArea} />
        </ChartContainer>
        <ChartContainer title="Leads by source">
          <LeadsBySourceChart data={leadsBySource.map((d) => ({ source: d.source, count: d.count }))} />
        </ChartContainer>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ChartContainer title="Conversion funnel" description="Visitors → Inquiries → Site Visits → Closed (scaled for readability)">
          <ConversionFunnelChart data={funnel} />
        </ChartContainer>
        <TopInterestList items={topInterest} />
      </div>
    </div>
  );
}
