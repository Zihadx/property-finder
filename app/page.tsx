import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Hero } from "@/components/marketing/hero";
import { FeaturedProperties } from "@/components/marketing/featured-properties";
import { PopularAreas } from "@/components/marketing/popular-areas";
import { PropertyCategories } from "@/components/marketing/property-categories";
import { ShortlistPreview } from "@/components/marketing/shortlist-preview";
import { AgentDiscovery } from "@/components/marketing/agent-discovery";
import { NewListings } from "@/components/marketing/new-listings";
import { AreaSeoLinks } from "@/components/marketing/area-seo-links";
import { CustomerStories } from "@/components/marketing/customer-stories";
import { OwnerConversion } from "@/components/marketing/owner-conversion";
import { FinalCta } from "@/components/marketing/final-cta";

export default function HomePage() {
  return (
    <>
    {/* Hero → Featured listings → Categories → Just listed → Area teaser (with link) → Agent teaser (with link) → One seller CTA banner → Testimonials → Closing CTA → Footer. */}

     <SiteHeader />
      <main>
        <Hero />
        <FeaturedProperties />
        <PopularAreas />           
        {/* keep — acts as area teaser, don't also need full AreaSeoLinks section here */}
        <PropertyCategories />


        <ShortlistPreview /> 

        {/* ============cut — check if this duplicates FeaturedProperties; if it's a genuinely different feature (saved/compare), keep but move below NewListings */}

        <AgentDiscovery /> 

        {/* ============move to /agents — replace with a 2-3 agent teaser card + "Meet all agents" link, or cut entirely from homepage */}

        <NewListings />

        <AreaSeoLinks />     

        {/* ===========move to /areas — full list belongs there, not homepage; keep for SEO on its own route */}

        <CustomerStories />
        <OwnerConversion />  

        {/*============ keep — this becomes your ONE seller CTA banner on homepage, linking to /list-your-property */}


        {/*============= merge into /list-your-property page, not homepage */}
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
