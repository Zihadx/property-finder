import { properties } from "@/data/properties";
import { inquiries } from "@/data/inquiries";
import { siteVisits } from "@/data/site-visits";
import { areas } from "@/data/areas";
import type { PropertyStatus } from "@/types/property";
import type { LeadSource } from "@/types/inquiry";

export interface DashboardOverview {
  totalListings: number;
  available: number;
  sold: number;
  rented: number;
  newLeadsThisWeek: number;
  leadsChangePct: number;
  siteVisitRequests: number;
  savedInterest: number;
  estimatedListingValue: number;
}

export const analyticsService = {
  async getOverview(): Promise<DashboardOverview> {
    const statusCounts = countBy(properties, (p) => p.status);
    const now = new Date("2026-08-23");
    const weekAgo = new Date(now);
    weekAgo.setDate(now.getDate() - 7);
    const twoWeeksAgo = new Date(now);
    twoWeeksAgo.setDate(now.getDate() - 14);

    const thisWeekLeads = inquiries.filter((i) => new Date(i.createdAt) >= weekAgo).length;
    const lastWeekLeads = inquiries.filter(
      (i) => new Date(i.createdAt) >= twoWeeksAgo && new Date(i.createdAt) < weekAgo
    ).length;
    const leadsChangePct = lastWeekLeads === 0 ? 100 : Math.round(((thisWeekLeads - lastWeekLeads) / lastWeekLeads) * 100);

    return {
      totalListings: properties.length,
      available: statusCounts["Available"] ?? 0,
      sold: statusCounts["Sold"] ?? 0,
      rented: statusCounts["Rented"] ?? 0,
      newLeadsThisWeek: thisWeekLeads,
      leadsChangePct,
      siteVisitRequests: siteVisits.filter((v) => v.status === "Pending" || v.status === "Confirmed").length,
      savedInterest: properties.reduce((sum, p) => sum + p.inquiries, 0),
      estimatedListingValue: properties.filter((p) => p.status === "Available").reduce((sum, p) => sum + p.price, 0),
    };
  },

  async getInquiryTrend(): Promise<{ date: string; inquiries: number }[]> {
    const days = 14;
    const now = new Date("2026-08-23");
    const buckets: Record<string, number> = {};
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      buckets[d.toISOString().slice(0, 10)] = 0;
    }
    for (const inq of inquiries) {
      const key = inq.createdAt.slice(0, 10);
      if (key in buckets) buckets[key] += 1;
    }
    return Object.entries(buckets).map(([date, count]) => ({
      date: new Date(date).toLocaleDateString("en-GB", { day: "2-digit", month: "short" }),
      inquiries: count,
    }));
  },

  async getStatusBreakdown(): Promise<{ name: PropertyStatus; value: number }[]> {
    const counts = countBy(properties, (p) => p.status);
    return (Object.keys(counts) as PropertyStatus[]).map((name) => ({ name, value: counts[name] }));
  },

  async getListingsByArea(): Promise<{ area: string; count: number }[]> {
    return areas
      .map((a) => ({ area: a.name, count: properties.filter((p) => p.location.areaSlug === a.slug).length }))
      .filter((a) => a.count > 0)
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);
  },

  async getLeadsBySource(): Promise<{ source: LeadSource; count: number }[]> {
    const counts = countBy(inquiries, (i) => i.source);
    return (Object.keys(counts) as LeadSource[]).map((source) => ({ source, count: counts[source] }));
  },

  async getConversionFunnel(): Promise<{ stage: string; value: number }[]> {
    const totalViews = properties.reduce((sum, p) => sum + p.views, 0);
    const totalInquiries = inquiries.length;
    const totalVisits = siteVisits.length;
    const closed = inquiries.filter((i) => i.status === "Closed").length;
    return [
      { stage: "Visitors", value: totalViews },
      { stage: "Inquiries", value: totalInquiries * 40 }, // scaled for readable funnel alongside view counts
      { stage: "Site Visits", value: totalVisits * 40 },
      { stage: "Closed", value: closed * 40 },
    ];
  },

  async getTopInterest(limit = 5): Promise<{ title: string; slug: string; inquiries: number; views: number }[]> {
    return [...properties]
      .sort((a, b) => b.inquiries - a.inquiries)
      .slice(0, limit)
      .map((p) => ({ title: p.title, slug: p.slug, inquiries: p.inquiries, views: p.views }));
  },

  /**
   * Computes a small set of plain-language business insights from the
   * mock dataset's actual numbers — every sentence here traces back to a
   * real calculation below, not a canned string. Swap the underlying
   * data source and these keep working unchanged.
   */
  async getInsights(): Promise<string[]> {
    const insights: string[] = [];
    const now = new Date("2026-08-23");

    // 1. Week-over-week lead change (reuses the same window as getOverview)
    const weekAgo = shiftDays(now, -7);
    const twoWeeksAgo = shiftDays(now, -14);
    const thisWeek = inquiries.filter((i) => new Date(i.createdAt) >= weekAgo).length;
    const lastWeek = inquiries.filter((i) => new Date(i.createdAt) >= twoWeeksAgo && new Date(i.createdAt) < weekAgo).length;
    if (thisWeek > 0 || lastWeek > 0) {
      const pct = lastWeek === 0 ? 100 : Math.round(((thisWeek - lastWeek) / lastWeek) * 100);
      insights.push(`${thisWeek} new inquiries this week, ${pct >= 0 ? "up" : "down"} ${Math.abs(pct)}% vs last week.`);
    }

    // 2. Area generating the most inquiries relative to its listing count
    const areaStats = areas
      .map((area) => {
        const areaProperties = properties.filter((p) => p.location.areaSlug === area.slug);
        const areaInquiryCount = areaProperties.reduce(
          (sum, p) => sum + inquiries.filter((i) => i.propertyId === p.id).length,
          0
        );
        return { name: area.name, listings: areaProperties.length, inquiryCount: areaInquiryCount };
      })
      .filter((a) => a.listings >= 2);
    const topArea = [...areaStats].sort((a, b) => b.inquiryCount / b.listings - a.inquiryCount / a.listings)[0];
    if (topArea && topArea.inquiryCount > 0) {
      const perListing = (topArea.inquiryCount / topArea.listings).toFixed(1);
      insights.push(`${topArea.name} listings are averaging ${perListing} inquiries each — the strongest demand-per-listing of any area right now.`);
    }

    // 3. Pending site visits that need follow-up
    const pendingVisits = siteVisits.filter((v) => v.status === "Pending").length;
    if (pendingVisits > 0) {
      insights.push(`${pendingVisits} site visit${pendingVisits === 1 ? " is" : "s are"} still pending confirmation — follow up before they go cold.`);
    }

    // 4. Listing with outlier interest (views well above the dataset average)
    const avgViews = properties.reduce((sum, p) => sum + p.views, 0) / properties.length;
    const outlier = [...properties].sort((a, b) => b.views - a.views)[0];
    if (outlier && outlier.views > avgViews * 1.5) {
      const multiple = (outlier.views / avgViews).toFixed(1);
      insights.push(`"${outlier.title}" is getting ${multiple}x the average listing's views — consider featuring it or following up on its inquiries directly.`);
    }

    // 5. Busiest lead source this period
    const sourceCounts = countBy(inquiries, (i) => i.source);
    const topSource = Object.entries(sourceCounts).sort((a, b) => b[1] - a[1])[0];
    if (topSource) {
      const share = Math.round((topSource[1] / inquiries.length) * 100);
      insights.push(`${topSource[0]} is your top lead source, responsible for ${share}% of inquiries.`);
    }

    return insights.slice(0, 4);
  },
};

function shiftDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function countBy<T, K extends string>(items: T[], keyFn: (item: T) => K): Record<K, number> {
  const result = {} as Record<K, number>;
  for (const item of items) {
    const key = keyFn(item);
    result[key] = (result[key] ?? 0) + 1;
  }
  return result;
}
