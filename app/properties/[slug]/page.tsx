import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  MapPin,
  Share2,
} from "lucide-react";

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
    return {
      title: "Property not found",
    };
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
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <SiteHeader />

      <main className="mx-auto w-full container pb-32 lg:pb-16">
        {/* =========================================================
            HERO / PROPERTY INTRO
        ========================================================= */}

        <section className="pt-8 sm:pt-10 lg:pt-12">
          <div className="flex items-center justify-between border-b border-border/50 pb-5">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-foreground/40" />

              <span className="text-[8px] font-medium uppercase tracking-[0.32em] text-muted-foreground/55">
                Property Collection
              </span>
            </div>

            <span className="hidden font-mono text-[8px] uppercase tracking-[0.18em] text-muted-foreground/35 sm:block">
              ListEasy BD / {property.type}
            </span>
          </div>

          <div className="grid gap-8 py-8 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-12 lg:py-10">
            <div className="max-w-4xl">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <Badge
                  variant={propertyStatusVariant[property.status]}
                  className="rounded-none px-2.5 py-1 text-[8px] uppercase tracking-[0.16em]"
                >
                  {property.status}
                </Badge>

                {property.featured && (
                  <Badge
                    variant="accent"
                    className="rounded-none px-2.5 py-1 text-[8px] uppercase tracking-[0.16em]"
                  >
                    Featured
                  </Badge>
                )}

                <Badge
                  variant="outline"
                  className="rounded-none px-2.5 py-1 text-[8px] uppercase tracking-[0.16em]"
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

                  <p className="mt-1 text-xs text-muted-foreground/55">
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

        {/* =========================================================
            FEATURED GALLERY
        ========================================================= */}

        <section>
          <div className="relative">
            <PropertyGallery
              images={property.images}
              title={property.title}
            />

            {/* Gallery index */}
            <div className="pointer-events-none absolute bottom-4 left-4 hidden sm:block">
              <div className="flex items-center gap-3 border border-white/15 bg-black/25 px-3 py-2 backdrop-blur-md">
                <span className="font-mono text-[8px] tracking-[0.2em] text-white/75">
                  01
                </span>

                <span className="h-px w-6 bg-white/25" />

                <span className="text-[8px] uppercase tracking-[0.2em] text-white/55">
                  Gallery
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            MAIN CONTENT
        ========================================================= */}

        <section className="grid gap-12 pt-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16 lg:pt-14">
          {/* ---------------------------------------------------------
              LEFT
          --------------------------------------------------------- */}

          <div className="min-w-0">
            {/* Price + intro */}
            <div className="grid gap-8 border-b border-border/50 pb-10 sm:grid-cols-[1fr_auto] sm:items-end">
              <div>
                <span className="mb-3 block text-[8px] font-medium uppercase tracking-[0.3em] text-muted-foreground/45">
                  Asking Price
                </span>

                <PropertyPrice
                  price={property.price}
                  purpose={property.purpose}
                  size="lg"
                />
              </div>

              <div className="flex items-center gap-3 text-[9px] uppercase tracking-[0.2em] text-muted-foreground/40">
                <span className="h-px w-8 bg-border" />
                <span>
                  {property.purpose === "Rent"
                    ? "Available for rent"
                    : "Available for purchase"}
                </span>
              </div>
            </div>

            {/* Specs */}
            <div className="py-10">
              <div className="mb-7 flex items-center gap-4">
                <span className="text-[8px] font-medium uppercase tracking-[0.3em] text-muted-foreground/45">
                  Property Details
                </span>

                <span className="h-px flex-1 bg-border/60" />
              </div>

              <PropertySpecs property={property} />
            </div>

            {/* Description */}
            <section className="border-t border-border/50 py-10">
              <div className="grid gap-8 lg:grid-cols-[180px_1fr]">
                <div>
                  <span className="text-[8px] font-medium uppercase tracking-[0.3em] text-muted-foreground/45">
                    The Residence
                  </span>
                </div>

                <div>
                  <h2 className="max-w-xl font-display text-2xl leading-tight tracking-[-0.025em] text-foreground sm:text-3xl">
                    A considered address in{" "}
                    <span className="text-muted-foreground/45">
                      {property.location.area}.
                    </span>
                  </h2>

                  <p className="mt-6 max-w-2xl text-sm leading-7 text-muted-foreground">
                    {property.description}
                  </p>
                </div>
              </div>
            </section>

            {/* Amenities */}
            <section className="border-t border-border/50 py-10">
              <div className="mb-7 flex items-center justify-between">
                <span className="text-[8px] font-medium uppercase tracking-[0.3em] text-muted-foreground/45">
                  Amenities & Features
                </span>

                <span className="font-mono text-[8px] tracking-[0.15em] text-muted-foreground/30">
                  SELECTED
                </span>
              </div>

              <PropertyAmenities amenities={property.amenities} />
            </section>

            {/* Location */}
            <section className="border-t border-border/50 py-10">
              <div className="mb-7 flex items-end justify-between gap-4">
                <div>
                  <span className="mb-2 block text-[8px] font-medium uppercase tracking-[0.3em] text-muted-foreground/45">
                    Location
                  </span>

                  <h2 className="font-display text-2xl tracking-[-0.025em] text-foreground">
                    {property.location.area}
                  </h2>
                </div>

                <ArrowDown className="hidden h-4 w-4 text-muted-foreground/30 sm:block" />
              </div>

              <PropertyLocationMap
                lat={property.location.lat}
                lng={property.location.lng}
                address={property.location.address}
              />
            </section>
          </div>

          {/* ---------------------------------------------------------
              RIGHT / CONTACT
          --------------------------------------------------------- */}

          <aside className="hidden lg:block">
            <div className="sticky top-24">
              {agent && (
                <div className="overflow-hidden border border-border/70 bg-card">
                  {/* Agent header */}
                  <div className="border-b border-border/60 px-5 py-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] font-medium uppercase tracking-[0.28em] text-muted-foreground/45">
                        Represented By
                      </span>

                      <span className="font-mono text-[8px] tracking-[0.15em] text-muted-foreground/30">
                        AGENT
                      </span>
                    </div>
                  </div>

                  {/* Agent identity */}
                  <div className="p-5">
                    <div className="flex items-center gap-4">
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
                        <h3 className="truncate font-display text-lg text-foreground">
                          {agent.name}
                        </h3>

                        <p className="mt-0.5 text-[9px] uppercase tracking-[0.18em] text-muted-foreground/50">
                          {agent.position}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 flex items-center gap-2 border-t border-border/50 pt-4">
                      <span className="h-1.5 w-1.5 rounded-full bg-foreground/50" />

                      <span className="text-[9px] uppercase tracking-[0.18em] text-muted-foreground/50">
                        Local property specialist
                      </span>
                    </div>
                  </div>

                  {/* Existing contact component */}
                  <div className="border-t border-border/60 p-5">
                    <AgentContactCard
                      agent={agent}
                      propertyId={property.id}
                      propertyTitle={property.title}
                    />
                  </div>

                  {/* Bottom detail */}
                  <div className="border-t border-border/60 px-5 py-4">
                    <div className="grid grid-cols-2 divide-x divide-border/60">
                      <div className="pr-4">
                        <span className="block text-[8px] uppercase tracking-[0.2em] text-muted-foreground/40">
                          Experience
                        </span>

                        <span className="mt-1 block font-display text-lg text-foreground">
                          {agent.experienceYears}
                          <span className="ml-1 text-xs text-muted-foreground/50">
                            yrs
                          </span>
                        </span>
                      </div>

                      <div className="pl-4">
                        <span className="block text-[8px] uppercase tracking-[0.2em] text-muted-foreground/40">
                          Response
                        </span>

                        <span className="mt-1 block text-xs text-foreground/75">
                          {agent.responseTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </aside>
        </section>

        {/* =========================================================
            TRUST / PROPERTY NOTE
        ========================================================= */}

        <section className="mt-8 border-y border-border/50 py-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-border">
                <Check className="h-3.5 w-3.5 text-foreground/65" />
              </span>

              <div>
                <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-foreground/70">
                  Curated Listing
                </p>

                <p className="mt-0.5 text-xs text-muted-foreground/50">
                  Verified property information supplied by ListEasy BD.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <span className="hidden h-px w-10 bg-border sm:block" />

              <span className="font-mono text-[8px] tracking-[0.18em] text-muted-foreground/35">
                LISTEASY / BD
              </span>
            </div>
          </div>
        </section>

        {/* =========================================================
            SIMILAR PROPERTIES
        ========================================================= */}

        <section className="pt-16 lg:pt-20">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="h-px w-7 bg-foreground/30" />

                <span className="text-[8px] font-medium uppercase tracking-[0.3em] text-muted-foreground/45">
                  Continue Exploring
                </span>
              </div>

              <h2 className="font-display text-3xl tracking-[-0.035em] text-foreground sm:text-4xl">
                Similar residences
              </h2>
            </div>

            <ArrowUpRight className="mb-1 hidden h-5 w-5 text-muted-foreground/35 sm:block" />
          </div>

          <SimilarProperties properties={similar} />
        </section>

        {/* Editorial closing line */}
        <div className="mt-20 flex items-center gap-5">
          <span className="h-px flex-1 bg-border/50" />

          <span className="text-[7px] font-medium uppercase tracking-[0.3em] text-muted-foreground/30">
            Selected property · Dhaka
          </span>

          <span className="h-px flex-1 bg-border/50" />
        </div>
      </main>

      {/* Mobile contact */}
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