import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, MapPin } from "lucide-react";

import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Badge } from "@/components/ui/badge";
import { PropertyGallery } from "@/components/property/property-gallery";
import { PropertyPrice } from "@/components/property/property-price";
import { PropertySpecs } from "@/components/property/property-specs";
import { PropertyAmenities } from "@/components/property/property-amenities";
import { PropertyActionsRow } from "@/components/property/property-actions-row";
import { AgentContactCard } from "@/components/property/agent-contact-card";
import { MobileActionBar } from "@/components/property/mobile-action-bar";
import { PropertyLocationMap } from "@/components/property/property-location-map";
import { SimilarProperties } from "@/components/property/similar-properties";
import { propertyStatusVariant } from "@/components/property/property-status";

import { propertyService } from "@/services/property.service";
import { agentService } from "@/services/agent.service";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = await propertyService.getBySlug(slug);

  if (!property) {
    return { title: "Property not found" };
  }

  return {
    title: property.title,
    description: property.description,
    openGraph: {
      title: property.title,
      description: property.description,
      images: property.images,
    },
  };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = await propertyService.getBySlug(slug);

  if (!property) {
    notFound();
  }

  const [agent, similar] = await Promise.all([
    agentService.getById(property.agentId),
    propertyService.getSimilar(property),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.description,
    url: `https://listeasy.example.com/properties/${property.slug}`,
    image: property.images,
    datePosted: property.listedAt,
    address: {
      "@type": "PostalAddress",
      streetAddress: property.location.address,
      addressLocality: property.location.area,
      addressCountry: "BD",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: property.location.lat,
      longitude: property.location.lng,
    },
    numberOfRooms: property.bedrooms,
    numberOfBathroomsTotal: property.bathrooms,
    floorSize: {
      "@type": "QuantitativeValue",
      value: property.areaSqft,
      unitCode: "FTK",
    },
    offers: {
      "@type": "Offer",
      price: property.price,
      priceCurrency: "BDT",
      availability:
        property.status === "Available"
          ? "https://schema.org/InStock"
          : "https://schema.org/SoldOut",
      businessFunction:
        property.purpose === "Rent"
          ? "http://purl.org/goodrelations/v1#LeaseOut"
          : "http://purl.org/goodrelations/v1#Sell",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SiteHeader />

      <main className="mx-auto w-full container px-4 pb-32 lg:pb-16">
        {/* Hero */}
        <section className="pt-8 sm:pt-10 lg:pt-12">
          <div className="border-b border-border/50 pb-4">
            <Link
              href="/properties"
              className="text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
              Properties
            </Link>
          </div>

          <div className="grid gap-8 py-8 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-12 lg:py-10">
            <div className="max-w-4xl">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <Badge
                  variant={propertyStatusVariant[property.status]}
                  className="rounded-none px-2.5 py-1 text-[11px] font-medium"
                >
                  {property.status}
                </Badge>

                {property.featured && (
                  <Badge
                    variant="accent"
                    className="rounded-none px-2.5 py-1 text-[11px] font-medium"
                  >
                    Featured
                  </Badge>
                )}

                <Badge
                  variant="outline"
                  className="rounded-none px-2.5 py-1 text-[11px] font-medium"
                >
                  {property.type}
                </Badge>
              </div>

              <h1 className="max-w-4xl font-display text-4xl font-normal leading-[0.94] tracking-[-0.045em] text-foreground sm:text-5xl lg:text-[4.25rem]">
                {property.title}
              </h1>

              <div className="mt-5 flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-foreground/50" />
                <div>
                  <p className="text-foreground/80">
                    {property.location.address}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground/70">
                    {property.location.area}, Dhaka
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:pb-1">
              <PropertyActionsRow
                propertyId={property.id}
                title={property.title}
              />
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section>
          <PropertyGallery images={property.images} title={property.title} />
        </section>

        {/* Main content */}
        <section className="grid gap-12 pt-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16 lg:pt-14">
          {/* Left column */}
          <div className="min-w-0">
            <div className="border-b border-border/50 pb-10">
              <h2 className="mb-4 font-display text-lg tracking-[-0.02em] text-foreground">
                Overview
              </h2>
              <PropertyPrice
                price={property.price}
                purpose={property.purpose}
                size="lg"
              />
            </div>

            <div className="py-10">
              <h2 className="mb-7 font-display text-lg tracking-[-0.02em] text-foreground">
                Property details
              </h2>
              <PropertySpecs property={property} />
            </div>

            <section className="border-t border-border/50 py-10">
              <h2 className="max-w-xl font-display text-2xl leading-tight tracking-tight text-foreground sm:text-3xl">
                A considered address in{" "}
                <span className="text-muted-foreground">
                  {property.location.area}.
                </span>
              </h2>
              <p className="mt-6 max-w-2xl text-sm leading-7 text-muted-foreground">
                {property.description}
              </p>
            </section>

            <section className="border-t border-border/50 py-10">
              <h2 className="mb-7 font-display text-lg tracking-[-0.02em] text-foreground">
                Amenities & features
              </h2>
              <PropertyAmenities amenities={property.amenities} />
            </section>

            <section className="border-t border-border/50 py-10">
              <h2 className="mb-7 font-display text-lg tracking-[-0.02em] text-foreground">
                {property.location.area}
              </h2>
              <PropertyLocationMap
                lat={property.location.lat}
                lng={property.location.lng}
                address={property.location.address}
              />
            </section>
          </div>

          {/* Right column / contact */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              {agent && (
                <div className="overflow-hidden border border-border/70 bg-card">
                  <div className="flex items-center gap-4 p-5">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-border">
                      <Image
                        src={agent.photo}
                        alt={agent.name}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[11px] text-muted-foreground">
                        Listed by
                      </p>
                      <h3 className="truncate font-display text-lg text-foreground">
                        {agent.name}
                      </h3>
                      <p className="mt-0.5 text-[12px] text-muted-foreground">
                        {agent.position}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-border/60 p-5">
                    <AgentContactCard
                      agent={agent}
                      propertyId={property.id}
                      propertyTitle={property.title}
                    />
                  </div>

                  <div className="grid grid-cols-2 divide-x divide-border/60 border-t border-border/60">
                    <div className="px-5 py-4">
                      <span className="block text-[11px] text-muted-foreground">
                        Experience
                      </span>
                      <span className="mt-1 block font-display text-lg text-foreground">
                        {agent.experienceYears}
                        <span className="ml-1 text-xs text-muted-foreground">
                          yrs
                        </span>
                      </span>
                    </div>

                    <div className="px-5 py-4">
                      <span className="block text-[11px] text-muted-foreground">
                        Responds in
                      </span>
                      <span className="mt-1 block text-sm text-foreground/80">
                        {agent.responseTime}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </aside>
        </section>

        {/* Trust note */}
        <section className="mt-8 flex items-center gap-3 border-y border-border/50 py-6">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border">
            <Check className="h-3.5 w-3.5 text-foreground/70" />
          </span>
          <p className="text-sm text-muted-foreground">
            Verified by ListEasy BD.
          </p>
        </section>

        {/* Similar properties */}
        <section className="pt-16 lg:pt-20">
          <div className="mb-8 flex items-end justify-between gap-4 border-b border-border/50 pb-4">
            <h2 className="font-display text-3xl tracking-[-0.03em] text-foreground sm:text-4xl">
              Similar residences
            </h2>
            <Link
              href="/properties"
              className="hidden items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors duration-300 hover:text-foreground sm:flex"
            >
              View all
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <SimilarProperties properties={similar} />
        </section>
      </main>

      {agent && (
        <MobileActionBar
          agent={agent}
          propertyId={property.id}
          propertyTitle={property.title}
        />
      )}

      <SiteFooter />
    </>
  );
}