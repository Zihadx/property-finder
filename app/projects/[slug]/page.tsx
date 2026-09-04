import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";

import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Button } from "@/components/ui/button";
import { PropertyLocationMap } from "@/components/property/property-location-map";

import { UnitTypes } from "@/components/project/unit-types";
import { UnitAvailabilityGrid } from "@/components/project/unit-availability-grid";
import { FloorPlans } from "@/components/project/floor-plans";
import { ProjectAmenities } from "@/components/project/project-amenities";
import { ConstructionProgress } from "@/components/project/construction-progress";
import { PaymentPlan } from "@/components/project/payment-plan";
import { ProjectFaqAccordion } from "@/components/project/project-faq";
import { EmiCalculator } from "@/components/project/emi-calculator";
import { SiteVisitForm } from "@/components/project/site-visit-form";
import { ProjectStickyCta } from "@/components/project/project-sticky-cta";

import { projectService } from "@/services/project.service";
import { formatBDT } from "@/lib/currency";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await projectService.getBySlug(slug);

  if (!project) return { title: "Project not found" };

  return {
    title: `${project.name} — ${project.location.area}`,
    description: project.tagline,
    openGraph: {
      title: project.name,
      description: project.tagline,
      images: project.images,
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await projectService.getBySlug(slug);

  if (!project) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ApartmentComplex",
    name: project.name,
    description: project.description,
    numberOfAccommodationUnits: project.totalUnits,
    address: {
      "@type": "PostalAddress",
      streetAddress: project.location.address,
      addressLocality: project.location.area,
      addressCountry: "BD",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: project.location.lat,
      longitude: project.location.lng,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SiteHeader />

      <main className="pb-24 lg:pb-0">
        {/* Hero */}
        <section className="relative">
          <div className="relative h-[70vh] min-h-[420px] w-full overflow-hidden bg-muted">
            <Image
              src={project.images[0]}
              alt={project.name}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          </div>

          <div className="absolute inset-x-0 bottom-0">
            <div className="mx-auto max-w-[1600px] px-6 pb-10 sm:px-8 lg:px-12 lg:pb-14">
              <h1 className="font-display text-4xl font-normal leading-[0.95] tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">
                {project.name}
              </h1>
              <p className="mt-3 max-w-xl text-base text-white/85 sm:text-lg">
                {project.tagline}
              </p>

              <div className="mt-4 flex items-center gap-2 text-sm text-white/75">
                <MapPin className="size-4 shrink-0" />
                {project.location.area}
              </div>

              <div className="mt-8 flex flex-wrap items-end gap-6">
                <div>
                  <p className="text-xs uppercase text-white/60">Starting from</p>
                  <p className="mt-1 font-display text-3xl text-white sm:text-4xl">
                    {formatBDT(project.startingPrice)}
                  </p>
                </div>

                <Button asChild className="h-12 rounded-none px-8 bg-transparent text-background">
                  <a href="#site-visit">Book a site visit</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-[1600px] px-6 sm:px-8 lg:px-12">
          <div className="border-b border-border/50 py-4">
            <Link
              href="/projects"
              className="text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
              Projects
            </Link>
          </div>

          {/* Overview */}
          <section className="grid grid-cols-2 gap-8 border-b border-border/60 py-10 sm:grid-cols-3 lg:grid-cols-5">
            <Stat label="Towers" value={project.towers} />
            <Stat label="Units" value={project.totalUnits} />
            <Stat label="Floors" value={project.floors} />
            <Stat label="Bedrooms" value={project.bedroomRange} />
            <Stat label="Handover" value={project.handoverLabel} />
          </section>

          {/* Gallery */}
          <section className="py-14">
            <SectionHeading title="Project gallery" />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {project.images.slice(1).map((image, index) => (
                <div
                  key={image}
                  className={`relative aspect-square overflow-hidden bg-muted ${
                    index === 0 ? "col-span-2 row-span-2 aspect-auto" : ""
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${project.name} photo ${index + 2}`}
                    fill
                    sizes="(min-width: 640px) 25vw, 50vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Unit types */}
          <section className="border-t border-border/60 py-14">
            <SectionHeading title="Unit types" />
            <UnitTypes unitTypes={project.unitTypes} />
          </section>

          {/* Availability */}
          <section className="border-t border-border/60 py-14">
            <SectionHeading
              title="Unit availability"
              subtitle="Tap an available unit to enquire."
            />
            <UnitAvailabilityGrid floors={project.availability} />
          </section>

          {/* Floor plans */}
          <section className="border-t border-border/60 py-14">
            <SectionHeading title="Floor plans" />
            <FloorPlans plans={project.floorPlans} />
          </section>

          {/* Amenities */}
          <section className="border-t border-border/60 py-14">
            <SectionHeading title="Amenities & features" />
            <ProjectAmenities amenities={project.amenities} />
          </section>

          {/* Construction progress */}
          <section className="border-t border-border/60 py-14">
            <SectionHeading title="Construction progress" />
            <ConstructionProgress
              percentComplete={project.constructionProgress}
              milestones={project.milestones}
            />
          </section>

          {/* Payment plan */}
          <section className="border-t border-border/60 py-14">
            <SectionHeading title="Payment plan" />
            <PaymentPlan steps={project.paymentPlan} />
          </section>

          {/* Location */}
          <section className="border-t border-border/60 py-14">
            <SectionHeading title={project.location.area} />
            <PropertyLocationMap
              lat={project.location.lat}
              lng={project.location.lng}
              address={project.location.address}
            />
          </section>

          {/* EMI calculator */}
          <section id="emi-calculator" className="border-t border-border/60 py-14">
            <SectionHeading
              title="Estimate your monthly payment"
              subtitle="Adjust the numbers to see what fits your budget."
            />
            <EmiCalculator
              defaultPrice={project.startingPrice}
              salesPhone={project.salesPhone}
            />
          </section>

          {/* FAQ */}
          <section className="border-t border-border/60 py-14">
            <SectionHeading title="Frequently asked questions" />
            <ProjectFaqAccordion faqs={project.faqs} />
          </section>

          {/* Site visit CTA */}
          <section id="site-visit" className="border-t border-border/60 py-14">
            <SectionHeading
              title="Schedule a private site visit"
              subtitle="Tell us when works for you — an advisor will confirm by phone."
            />
            <SiteVisitForm projectName={project.name} />
          </section>
        </div>
      </main>

      <ProjectStickyCta salesPhone={project.salesPhone} />

      <SiteFooter />
    </>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-2xl text-foreground">{value}</p>
    </div>
  );
}

function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-8">
      <h2 className="font-display text-2xl tracking-[-0.02em] text-foreground sm:text-3xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
}