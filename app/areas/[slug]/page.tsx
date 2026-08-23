import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { PropertyGrid } from "@/components/property/property-grid";
import { AgentCard } from "@/components/property/agent-card";
import { FaqAccordion } from "@/components/property/faq-accordion";
import { Button } from "@/components/ui/button";
import { areaService } from "@/services/area.service";
import { propertyService } from "@/services/property.service";
import { agents } from "@/data/agents";
import { formatBDT } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = await areaService.getBySlug(slug);
  if (!area) return { title: "Area not found" };
  return {
    title: `Flats for Sale & Rent in ${area.name}`,
    description: area.description,
  };
}

export default async function AreaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const area = await areaService.getBySlug(slug);
  if (!area) notFound();

  const properties = await propertyService.getByArea(slug);
  const areaAgents = agents.filter((a) => a.areasServed.some((served) => served.toLowerCase().includes(area.name.toLowerCase())));

  const faqs = [
    {
      question: `What is the average price per sqft in ${area.name}?`,
      answer: `Listings in ${area.name} currently average around ${formatBDT(area.averagePricePerSqft)} per sqft, though this varies by building age, floor, and exact location.`,
    },
    {
      question: `Is ${area.name} good for families?`,
      answer: `${area.name} has a mix of established residential blocks and newer developments — check individual listings for nearby schools and amenities.`,
    },
    {
      question: `How many properties are currently listed in ${area.name}?`,
      answer: `There are currently ${properties.length} active listings in ${area.name} on ListEasy BD, updated as agents add and update properties.`,
    },
  ];

  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative h-64 w-full overflow-hidden sm:h-80">
          <Image src={area.image} alt={area.name} fill sizes="100vw" className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-6 pb-8">
            <p className="ledger-label mb-2 text-white/80">Area Guide</p>
            <h1 className="font-display text-4xl text-white">{area.name}</h1>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-6 py-10">
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">{area.description}</p>

          <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-md)] border border-border bg-border sm:grid-cols-3">
            <div className="bg-surface p-4">
              <dt className="ledger-label">Avg. Price / sqft</dt>
              <dd className="ledger-value mt-1.5 text-xl text-foreground">{formatBDT(area.averagePricePerSqft)}</dd>
            </div>
            <div className="bg-surface p-4">
              <dt className="ledger-label">Active Listings</dt>
              <dd className="ledger-value mt-1.5 text-xl text-foreground">{properties.length}</dd>
            </div>
            <div className="bg-surface p-4">
              <dt className="ledger-label">Local Agents</dt>
              <dd className="ledger-value mt-1.5 text-xl text-foreground">{areaAgents.length}</dd>
            </div>
          </dl>

          <div className="mt-14 flex items-center justify-between">
            <h2 className="font-display text-2xl text-foreground">Properties in {area.name}</h2>
            <Button variant="link" asChild>
              <Link href={`/properties?area=${area.slug}`}>View all →</Link>
            </Button>
          </div>
          <div className="mt-6">
            <PropertyGrid properties={properties.slice(0, 6)} view="grid" />
          </div>

          {areaAgents.length > 0 && (
            <div className="mt-14">
              <h2 className="font-display text-2xl text-foreground">Agents serving {area.name}</h2>
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {areaAgents.map((agent) => (
                  <AgentCard key={agent.id} agent={agent} listingCount={properties.filter((p) => p.agentId === agent.id).length} />
                ))}
              </div>
            </div>
          )}

          <div className="mt-14 max-w-2xl">
            <h2 className="font-display text-2xl text-foreground">Frequently asked questions</h2>
            <div className="mt-6">
              <FaqAccordion items={faqs} />
            </div>
          </div>

          <div className="mt-14 flex flex-col items-center gap-4 rounded-[var(--radius-md)] border border-border bg-surface-muted px-6 py-12 text-center">
            <h2 className="font-display text-2xl text-foreground">Looking in {area.name}?</h2>
            <p className="max-w-md text-sm text-muted-foreground">
              Browse every active listing in the area, or talk to a local agent directly.
            </p>
            <Button asChild>
              <Link href={`/properties?area=${area.slug}`}>Browse {area.name} Properties</Link>
            </Button>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
