import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Hero } from "@/components/marketing/hero";
import { FeaturedProperties } from "@/components/marketing/featured-properties";
import { PopularAreas } from "@/components/marketing/popular-areas";
import { WhyListEasy } from "@/components/marketing/why-listeasy";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <FeaturedProperties />
        <PopularAreas />
        <WhyListEasy />
      </main>
      <SiteFooter />
    </>
  );
}
