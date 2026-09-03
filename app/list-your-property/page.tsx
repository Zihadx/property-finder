// app/list-your-property/page.tsx
import { ListingHero } from "@/components/marketing/listing-hero";

import { HowToList } from "@/components/marketing/how-to-list";
import { AgentConversion } from "@/components/marketing/agent-conversion";
import { ListingFinalCta } from "@/components/marketing/listing-final-cta";
import { WhyListEasy } from "@/components/marketing/why-listeasy";

export const metadata = {
  title: "List Your Property | ListEasy",
  description:
    "List your property or join as an agent on ListEasy — reach serious buyers and renters across Dhaka.",
};

export default function Page() {
  return (
    <>
      <ListingHero />
      <WhyListEasy />
      <HowToList />
      <AgentConversion />
      <ListingFinalCta />
    </>
  );
}