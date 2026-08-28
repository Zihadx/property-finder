import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin } from "lucide-react";
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
import { SimilarProperties } from "@/components/property/similar-properties";
import { propertyService } from "@/services/property.service";
import { agentService } from "@/services/agent.service";

const statusVariant: Record<string, "success" | "danger" | "warning" | "neutral"> = {
  Available: "success",
  Sold: "danger",
  Rented: "neutral",
  "Under Offer": "warning",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = await propertyService.getBySlug(slug);
  if (!property) return { title: "Property not found" };
  return {
    title: property.title,
    description: property.description,
    openGraph: { title: property.title, description: property.description, images: property.images },
  };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = await propertyService.getBySlug(slug);
  if (!property) notFound();

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
        property.status === "Available" ? "https://schema.org/InStock" : "https://schema.org/SoldOut",
      businessFunction:
        property.purpose === "Rent" ? "http://purl.org/goodrelations/v1#LeaseOut" : "http://purl.org/goodrelations/v1#Sell",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-6 py-10 pb-28 lg:pb-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
          <div className="min-w-0">
            <PropertyGallery images={property.images} title={property.title} />

            <div className="mt-8 flex items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant={statusVariant[property.status]}>{property.status}</Badge>
                  {property.featured && <Badge variant="accent">Featured</Badge>}
                  <Badge variant="outline">{property.type}</Badge>
                </div>
                <h1 className="mt-3 font-display text-3xl text-foreground">{property.title}</h1>
                <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {property.location.address}
                </p>
              </div>
              <PropertyActionsRow propertyId={property.id} title={property.title} />
            </div>

            <div className="mt-4">
              <PropertyPrice price={property.price} purpose={property.purpose} size="lg" />
            </div>

            <div className="mt-8">
              <PropertySpecs property={property} />
            </div>

            <div className="mt-10">
              <h2 className="font-display text-xl text-foreground">About this property</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {property.description}
              </p>
            </div>

            <div className="mt-10">
              <PropertyAmenities amenities={property.amenities} />
            </div>

            <div className="mt-10">
              <h2 className="font-display text-xl text-foreground">Location</h2>
              <div className="mt-4 flex aspect-[16/7] items-center justify-center rounded-[var(--radius-md)] border border-border bg-surface-muted text-sm text-muted-foreground">
                Map view — {property.location.address} ({property.location.lat.toFixed(4)},{" "}
                {property.location.lng.toFixed(4)})
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-24">{agent && <AgentContactCard agent={agent} propertyTitle={property.title} />}</div>
          </div>
        </div>

        <SimilarProperties properties={similar} />
      </main>

      {agent && <MobileActionBar agent={agent} propertyTitle={property.title} />}
      <SiteFooter />
    </>
  );
}
