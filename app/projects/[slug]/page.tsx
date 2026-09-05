import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowUpRight } from "lucide-react";

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

/* -------------------------------------------------------------------------- */
/* Metadata                                                                    */
/* -------------------------------------------------------------------------- */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const project = await projectService.getBySlug(slug);

  if (!project) {
    return {
      title: "Project not found | ListEasy BD",
      description: "The requested property project could not be found.",
    };
  }

  return {
    title: `${project.name} — ${project.location.area} | ListEasy BD`,
    description: project.description || project.tagline,

    keywords: [
      project.name,
      project.location.area,
      "apartments",
      "real estate",
      "property",
      "Bangladesh",
      "ListEasy BD",
    ],

    openGraph: {
      title: `${project.name} — ${project.location.area}`,
      description: project.description || project.tagline,
      type: "website",
      images: project.images?.length
        ? project.images.map((image) => ({
            url: image,
            alt: project.name,
          }))
        : undefined,
    },

    twitter: {
      card: "summary_large_image",
      title: `${project.name} — ${project.location.area}`,
      description: project.description || project.tagline,
      images: project.images?.[0] ? [project.images[0]] : undefined,
    },
  };
}

/* -------------------------------------------------------------------------- */
/* Static params                                                               */
/* -------------------------------------------------------------------------- */

export async function generateStaticParams() {
  const projects = await projectService.list();

  return projects.map((project) => ({
    slug: project.slug,
  }));
}

/* -------------------------------------------------------------------------- */
/* Page                                                                        */
/* -------------------------------------------------------------------------- */

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = await projectService.getBySlug(slug);

  if (!project) {
    notFound();
  }

  const galleryImages = project.images?.slice(1) ?? [];

  /* ------------------------------------------------------------------------ */
  /* JSON-LD                                                                   */
  /* ------------------------------------------------------------------------ */

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ApartmentComplex",

    name: project.name,

    description: project.description,

    url: `/projects/${project.slug}`,

    numberOfAccommodationUnits: project.totalUnits,

    numberOfRooms: project.bedroomRange,

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

    image: project.images,

    offers: {
      "@type": "Offer",
      priceCurrency: "BDT",
      price: project.startingPrice,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      {/* -------------------------------------------------------------------- */}
      {/* Structured data                                                      */}
      {/* -------------------------------------------------------------------- */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <SiteHeader />

      <main className="pb-24 lg:pb-0">
        {/* ================================================================== */}
        {/* HERO                                                               */}
        {/* ================================================================== */}

        <section className="relative isolate">
          <div className="relative h-[72svh] min-h-[520px] w-full overflow-hidden bg-muted">
            {project.images?.[0] ? (
              <Image
                src={project.images[0]}
                alt={project.name}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-muted" />
            )}

            {/* Cinematic overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/5" />

            <div className="absolute inset-x-0 bottom-0">
              <div className="mx-auto max-w-[1600px] px-5 pb-8 sm:px-8 sm:pb-12 lg:px-12 lg:pb-16">
                {/* Location */}
                <div className="mb-4 flex items-center gap-2 text-sm text-white/75">
                  <MapPin className="size-4 shrink-0" />
                  <span>{project.location.area}</span>
                </div>

                {/* Title */}
                <h1 className="max-w-4xl font-display text-4xl font-normal leading-[0.94] tracking-[-0.04em] text-white sm:text-5xl lg:text-7xl">
                  {project.name}
                </h1>

                {/* Tagline */}
                <p className="mt-4 max-w-2xl text-sm leading-6 text-white/80 sm:text-base lg:text-lg">
                  {project.tagline}
                </p>

                {/* Price + CTA */}
                <div className="mt-7 flex flex-col gap-5 sm:mt-9 sm:flex-row sm:items-end sm:gap-8">
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                      Starting from
                    </p>

                    <p className="mt-1 font-display text-3xl tracking-[-0.03em] text-white sm:text-4xl">
                      {formatBDT(project.startingPrice)}
                    </p>
                  </div>

                  <Button
                    asChild
                    className="h-12 w-full rounded-none bg-white px-7 text-black shadow-none transition-all duration-300 hover:bg-white/90 sm:w-auto"
                  >
                    <a href="#site-visit">
                      Book a site visit
                      <ArrowUpRight className="ml-2 size-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* CONTENT                                                            */}
        {/* ================================================================== */}

        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
          {/* Breadcrumb */}
          <div className="border-b border-border/50 py-4">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
              <span>Projects</span>
              <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* ================================================================= */}
          {/* OVERVIEW                                                          */}
          {/* ================================================================= */}

          <section
            aria-label="Project overview"
            className="grid grid-cols-2 gap-x-6 gap-y-8 border-b border-border/60 py-10 sm:grid-cols-3 lg:grid-cols-5 lg:gap-8"
          >
            <Stat label="Towers" value={project.towers} />

            <Stat label="Units" value={project.totalUnits} />

            <Stat label="Floors" value={project.floors} />

            <Stat label="Bedrooms" value={project.bedroomRange} />

            <Stat label="Handover" value={project.handoverLabel} />
          </section>

          {/* ================================================================= */}
          {/* DESCRIPTION                                                       */}
          {/* ================================================================= */}

          <section className="grid gap-8 border-b border-border/60 py-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <SectionHeading
              title="About the project"
              subtitle="A closer look at the development."
            />

            <div>
              <p className="max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                {project.description}
              </p>
            </div>
          </section>

          {/* ================================================================= */}
          {/* GALLERY                                                           */}
          {/* ================================================================= */}

          {galleryImages.length > 0 && (
            <section className="py-14">
              <SectionHeading title="Project gallery" />

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
                {galleryImages.map((image, index) => {
                  const isFeatured = index === 0;

                  return (
                    <div
                      key={`${image}-${index}`}
                      className={[
                        "relative overflow-hidden bg-muted",
                        "aspect-square",
                        isFeatured
                          ? "col-span-2 row-span-2 aspect-square sm:aspect-auto"
                          : "",
                      ].join(" ")}
                    >
                      <Image
                        src={image}
                        alt={`${project.name} — gallery image ${index + 2}`}
                        fill
                        sizes={
                          isFeatured
                            ? "(min-width: 640px) 50vw, 100vw"
                            : "(min-width: 640px) 25vw, 50vw"
                        }
                        className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                      />
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* ================================================================= */}
          {/* UNIT TYPES                                                        */}
          {/* ================================================================= */}

          <section className="border-t border-border/60 py-14">
            <SectionHeading
              title="Unit types"
              subtitle="Explore the layouts and starting prices available in this project."
            />

            <UnitTypes unitTypes={project.unitTypes} />
          </section>

          {/* ================================================================= */}
          {/* AVAILABILITY                                                      */}
          {/* ================================================================= */}

          <section className="border-t border-border/60 py-14">
            <SectionHeading
              title="Unit availability"
              subtitle="Tap an available unit to enquire."
            />

            <UnitAvailabilityGrid floors={project.availability} />
          </section>

          {/* ================================================================= */}
          {/* FLOOR PLANS                                                        */}
          {/* ================================================================= */}

          <section className="border-t border-border/60 py-14">
            <SectionHeading
              title="Floor plans"
              subtitle="Review the available apartment layouts."
            />

            <FloorPlans plans={project.floorPlans} />
          </section>

          {/* ================================================================= */}
          {/* AMENITIES                                                          */}
          {/* ================================================================= */}

          <section className="border-t border-border/60 py-14">
            <SectionHeading
              title="Amenities & features"
              subtitle="Everything designed around comfortable everyday living."
            />

            <ProjectAmenities amenities={project.amenities} />
          </section>

          {/* ================================================================= */}
          {/* CONSTRUCTION                                                       */}
          {/* ================================================================= */}

          <section className="border-t border-border/60 py-14">
            <SectionHeading
              title="Construction progress"
              subtitle="Track the project's development milestones."
            />

            <ConstructionProgress
              percentComplete={project.constructionProgress}
              milestones={project.milestones}
            />
          </section>

          {/* ================================================================= */}
          {/* PAYMENT PLAN                                                       */}
          {/* ================================================================= */}

          <section className="border-t border-border/60 py-14">
            <SectionHeading
              title="Payment plan"
              subtitle="Understand how the purchase can be structured."
            />

            <PaymentPlan steps={project.paymentPlan} />
          </section>

          {/* ================================================================= */}
          {/* LOCATION                                                           */}
          {/* ================================================================= */}

          <section className="border-t border-border/60 py-14">
            <SectionHeading
              title={project.location.area}
              subtitle={project.location.address}
            />

            <PropertyLocationMap
              lat={project.location.lat}
              lng={project.location.lng}
              address={project.location.address}
            />
          </section>

          {/* ================================================================= */}
          {/* EMI CALCULATOR                                                     */}
          {/* ================================================================= */}

          <section
            id="emi-calculator"
            className="border-t border-border/60 py-14"
          >
            <SectionHeading
              title="Estimate your monthly payment"
              subtitle="Adjust the numbers to see what fits your budget."
            />

            <EmiCalculator
              defaultPrice={project.startingPrice}
              salesPhone={project.salesPhone}
            />
          </section>

          {/* ================================================================= */}
          {/* FAQ                                                                */}
          {/* ================================================================= */}

          <section className="border-t border-border/60 py-14">
            <SectionHeading
              title="Frequently asked questions"
              subtitle="Everything you may want to know before enquiring."
            />

            <ProjectFaqAccordion faqs={project.faqs} />
          </section>

          {/* ================================================================= */}
          {/* SITE VISIT                                                         */}
          {/* ================================================================= */}

          <section
            id="site-visit"
            className="border-t border-border/60 py-14 scroll-mt-20"
          >
            <SectionHeading
              title="Schedule a private site visit"
              subtitle="Tell us when works for you — an advisor will confirm by phone."
            />

            <SiteVisitForm projectName={project.name} />
          </section>
        </div>
      </main>

      {/* Mobile / sticky conversion CTA */}
      <ProjectStickyCta salesPhone={project.salesPhone} />

      <SiteFooter />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Stat                                                                        */
/* -------------------------------------------------------------------------- */

function Stat({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </p>

      <p className="mt-1 font-display text-2xl tracking-[-0.025em] text-foreground sm:text-3xl">
        {value}
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Section heading                                                             */
/* -------------------------------------------------------------------------- */

function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-8">
      <h2 className="font-display text-2xl tracking-[-0.025em] text-foreground sm:text-3xl lg:text-4xl">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
          {subtitle}
        </p>
      )}
    </div>
  );
}