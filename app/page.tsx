import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Hero } from "@/components/marketing/hero";
import { FeaturedProperties } from "@/components/marketing/featured-properties";
import { PopularAreas } from "@/components/marketing/popular-areas";
import { PropertyCategories } from "@/components/marketing/property-categories";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { ShortlistPreview } from "@/components/marketing/shortlist-preview";
import { AgentDiscovery } from "@/components/marketing/agent-discovery";
import { NewListings } from "@/components/marketing/new-listings";
import { PropertyInsights } from "@/components/marketing/property-insights";
import { AreaSeoLinks } from "@/components/marketing/area-seo-links";
import { CustomerStories } from "@/components/marketing/customer-stories";
import { OwnerConversion } from "@/components/marketing/owner-conversion";
import { WhyListEasy } from "@/components/marketing/why-listeasy";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <FeaturedProperties />
        <PopularAreas />
        <PropertyCategories />
        <HowItWorks />
        <ShortlistPreview />
        <AgentDiscovery />
        <NewListings />
        <PropertyInsights />
        <AreaSeoLinks />
        <CustomerStories />
        <OwnerConversion />
        <WhyListEasy />
      </main>
      <SiteFooter />
    </>
  );
}
