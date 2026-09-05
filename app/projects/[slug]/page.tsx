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

  const galleryRest = project.images.slice(1);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SiteHeader />

      <main className="pb-28 lg:pb-0">
        {/* Hero */}
        <section className="relative">
          <div className="relative h-[56vh] min-h-[380px] w-full overflow-hidden bg-muted sm:h-[64vh] lg:h-[70vh]">
            <Image
              src={project.images[0]}
              alt={project.name}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
          </div>

          <div className="absolute inset-x-0 bottom-0">
            <div className="mx-auto max-w-[1600px] px-5 pb-8 sm:px-8 sm:pb-10 lg:px-12 lg:pb-14">
              <h1 className="font-display text-[2rem] font-normal leading-[1] tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">
                {project.name}
              </h1>
              <p className="mt-2 max-w-xl text-sm text-white/85 sm:mt-3 sm:text-lg">
                {project.tagline}
              </p>

              <div className="mt-3 flex items-center gap-2 text-sm text-white/75">
                <MapPin className="size-4 shrink-0" />
                {project.location.area}
              </div>

              <div className="mt-6 flex flex-col gap-4 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-end sm:gap-6">
                <div>
                  <p className="text-xs uppercase tracking-wide text-white/60">
                    Starting from
                  </p>
                  <p className="mt-1 font-display text-2xl text-white sm:text-3xl lg:text-4xl">
                    {formatBDT(project.startingPrice)}
                  </p>
                </div>

                <Button
                  asChild
                  className="relative
    h-12
    w-full
    sm:w-auto
    rounded-none
    px-8
    overflow-hidden
    bg-white/10
    text-gray-50
    border
    border-white/40
    backdrop-blur-[20px]
    backdrop-saturate-150
    shadow-lg
    transition-all
    duration-300
    hover:bg-white/30
    hover:border-white/60"
                >
                  <a href="#site-visit">Book a site visit</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
          <div className="border-b border-border/50 py-4">
            <Link
              href="/projects"
              className="text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
              Projects
            </Link>
          </div>

          {/* Overview */}
          <section className="grid grid-cols-2 gap-x-6 gap-y-6 py-8 sm:grid-cols-3 sm:gap-8 sm:py-10 lg:grid-cols-5">
            <Stat label="Towers" value={project.towers} />
            <Stat label="Units" value={project.totalUnits} />
            <Stat label="Floors" value={project.floors} />
            <Stat label="Bedrooms" value={project.bedroomRange} />
            <Stat
              label="Handover"
              value={project.handoverLabel}
              className="col-span-2 sm:col-span-1"
            />
          </section>

          {/* Gallery */}
          <Section title="Project gallery">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted sm:aspect-video">
              <Image
                src={project.images[0]}
                alt={`${project.name} photo 1`}
                fill
                sizes="(min-width: 1024px) 1200px, 100vw"
                className="object-cover"
              />
            </div>

            {galleryRest.length > 0 && (
              <div className="mt-3 flex gap-3 overflow-x-auto pb-1 sm:grid sm:grid-cols-4 sm:overflow-visible sm:pb-0">
                {galleryRest.map((image, index) => (
                  <div
                    key={image}
                    className="relative aspect-square w-28 shrink-0 overflow-hidden bg-muted sm:w-auto"
                  >
                    <Image
                      src={image}
                      alt={`${project.name} photo ${index + 2}`}
                      fill
                      sizes="(min-width: 640px) 25vw, 30vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </Section>

          {/* Unit types */}
          <Section title="Unit types">
            <UnitTypes unitTypes={project.unitTypes} />
          </Section>

          {/* Availability */}
          <Section
            title="Unit availability"
            subtitle="Tap an available unit to enquire."
          >
            <UnitAvailabilityGrid floors={project.availability} />
          </Section>

          {/* Floor plans */}
          <Section title="Floor plans">
            <FloorPlans plans={project.floorPlans} />
          </Section>

          {/* Amenities */}
          <Section title="Amenities & features">
            <ProjectAmenities amenities={project.amenities} />
          </Section>

          {/* Construction progress */}
          <Section title="Construction progress">
            <ConstructionProgress
              percentComplete={project.constructionProgress}
              milestones={project.milestones}
            />
          </Section>

          {/* Payment plan */}
          <Section title="Payment plan">
            <PaymentPlan steps={project.paymentPlan} />
          </Section>

          {/* Location */}
          <Section title={project.location.area}>
            <PropertyLocationMap
              lat={project.location.lat}
              lng={project.location.lng}
              address={project.location.address}
            />
          </Section>

          {/* EMI calculator */}
          <Section
            id="emi-calculator"
            title="Estimate your monthly payment"
            subtitle="Adjust the numbers to see what fits your budget."
          >
            <EmiCalculator
              defaultPrice={project.startingPrice}
              salesPhone={project.salesPhone}
            />
          </Section>

          {/* FAQ */}
          <Section title="Frequently asked questions">
            <ProjectFaqAccordion faqs={project.faqs} />
          </Section>

          {/* Site visit CTA */}
          <Section
            id="site-visit"
            title="Schedule a private site visit"
            subtitle="Tell us when works for you — an advisor will confirm by phone."
          >
            <SiteVisitForm projectName={project.name} />
          </Section>
        </div>
      </main>

      <ProjectStickyCta salesPhone={project.salesPhone} />

      <SiteFooter />
    </>
  );
}

function Stat({
  label,
  value,
  className,
}: {
  label: string;
  value: string | number;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-xl text-foreground sm:text-2xl">
        {value}
      </p>
    </div>
  );
}

function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="border-t border-border/60 py-10 sm:py-12 lg:py-14"
    >
      <div className="mb-6 sm:mb-8">
        <h2 className="font-display text-xl tracking-[-0.02em] text-foreground sm:text-2xl lg:text-3xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
      {children}
    </section>
  );
}
