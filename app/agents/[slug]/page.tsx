
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";

import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { PropertyGrid } from "@/components/property/property-grid";
import { Button } from "@/components/ui/button";
import { agentService } from "@/services/agent.service";
import { propertyService } from "@/services/property.service";

type AgentProfilePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: AgentProfilePageProps): Promise<Metadata> {
  const { slug } = await params;

  const agent = await agentService.getBySlug(slug);

  if (!agent) {
    return {
      title: "Agent Not Found",
    };
  }

  return {
    title: `${agent.name} — ListEasy BD`,
    description:
      agent.bio ||
      `${agent.name}, ${agent.position} at ListEasy BD.`,
  };
}

export default async function AgentProfilePage({
  params,
}: AgentProfilePageProps) {
  const { slug } = await params;

  const agent = await agentService.getBySlug(slug);

  if (!agent) {
    notFound();
  }

  const listings = await propertyService.getByAgent(agent.id);

  const whatsappNumber = agent.whatsapp.replace(/[^\d]/g, "");

  const phoneNumber = agent.phone.replace(/[^\d+]/g, "");

  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hi ${agent.name}, I found your profile on ListEasy BD.`
  )}`;

  return (
    <>
      <SiteHeader />

      <main className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-10">
        {/* ============================================================
            PROFILE HERO
        ============================================================ */}

        <section className="relative border-b border-border/60 py-10 sm:py-12 lg:py-14">
          {/* Top editorial navigation */}
          <div className="mb-8 flex items-center justify-between">
            <Link
              href="/agents"
              className="
                group
                inline-flex
                items-center
                gap-2
                text-[9px]
                font-medium
                uppercase
                tracking-[0.24em]
                text-muted-foreground/60
                transition-colors
                duration-300
                hover:text-foreground
              "
            >
              <ArrowLeft
                className="
                  h-3.5
                  w-3.5
                  transition-transform
                  duration-300
                  group-hover:-translate-x-1
                "
              />
              All Agents
            </Link>

            <span
              className="
                hidden
                font-mono
                text-[8px]
                tabular-nums
                tracking-[0.2em]
                text-muted-foreground/35
                sm:block
              "
            >
              LISTEASY BD / ADVISORY
            </span>
          </div>

          {/* Main profile */}
          <div
            className="
              grid
              grid-cols-1
              gap-8
              lg:grid-cols-[280px_minmax(0,1fr)]
              lg:gap-12
              xl:grid-cols-[300px_minmax(0,1fr)]
            "
          >
            {/* --------------------------------------------------------
                Portrait
            --------------------------------------------------------- */}

            <div>
              <div
                className="
                  group
                  relative
                  mx-auto
                  aspect-[4/5]
                  w-full
                  max-w-[300px]
                  overflow-hidden
                  bg-muted
                  lg:mx-0
                "
              >
                <Image
                  src={agent.photo}
                  alt={agent.name}
                  fill
                  priority
                  sizes="
                    (min-width: 1280px) 300px,
                    (min-width: 1024px) 280px,
                    300px
                  "
                  className="
                    object-cover
                    grayscale-[8%]
                    transition-transform
                    duration-[1200ms]
                    ease-[cubic-bezier(0.22,1,0.36,1)]
                    group-hover:scale-[1.035]
                  "
                />

                {/* Cinematic gradient */}
                <div
                  aria-hidden="true"
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/45
                    via-transparent
                    to-black/[0.04]
                  "
                />

                {/* Image frame */}
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    inset-3
                    border
                    border-white/15
                    transition-colors
                    duration-700
                    group-hover:border-white/30
                  "
                />

                {/* Image index */}
                <div
                  className="
                    absolute
                    left-5
                    top-5
                    font-mono
                    text-[8px]
                    tracking-[0.2em]
                    text-white/60
                  "
                >
                  01
                </div>

                {/* Bottom image label */}
                <div
                  className="
                    absolute
                    bottom-5
                    left-5
                    right-5
                    flex
                    items-center
                    justify-between
                  "
                >
                  <span
                    className="
                      text-[8px]
                      font-medium
                      uppercase
                      tracking-[0.25em]
                      text-white/65
                    "
                  >
                    ListEasy BD
                  </span>

                  <span className="h-px w-8 bg-white/30" />
                </div>
              </div>
            </div>

            {/* --------------------------------------------------------
                Profile information
            --------------------------------------------------------- */}

            <div className="flex min-w-0 flex-col justify-center">
              {/* Eyebrow */}
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-foreground/30" />

                <span
                  className="
                    text-[8px]
                    font-medium
                    uppercase
                    tracking-[0.3em]
                    text-muted-foreground/55
                  "
                >
                  Private Property Advisor
                </span>
              </div>

              {/* Name */}
              <h1
                className="
                  max-w-3xl
                  font-display
                  text-4xl
                  font-normal
                  leading-[0.95]
                  tracking-[-0.05em]
                  text-foreground
                  sm:text-5xl
                  lg:text-6xl
                "
              >
                {agent.name}
              </h1>

              {/* Position */}
              <p
                className="
                  mt-4
                  text-xs
                  font-medium
                  uppercase
                  tracking-[0.2em]
                  text-muted-foreground/60
                "
              >
                {agent.position}
              </p>

              {/* Divider */}
              <div className="my-7 h-px w-full max-w-2xl bg-border/70" />

              {/* Bio */}
              <div className="max-w-2xl">
                <p
                  className="
                    text-sm
                    leading-7
                    text-muted-foreground
                    sm:text-[15px]
                  "
                >
                  {agent.bio}
                </p>
              </div>

              {/* Location + response */}
              <div
                className="
                  mt-7
                  flex
                  flex-col
                  gap-4
                  sm:flex-row
                  sm:items-center
                  sm:gap-8
                "
              >
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-foreground/50" />

                  <span
                    className="
                      text-[10px]
                      font-medium
                      uppercase
                      tracking-[0.16em]
                      text-muted-foreground
                    "
                  >
                    {agent.areasServed.join(" · ")}
                  </span>
                </div>

                <div className="hidden h-3 w-px bg-border sm:block" />

                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-foreground/50" />

                  <span
                    className="
                      text-[10px]
                      font-medium
                      uppercase
                      tracking-[0.16em]
                      text-muted-foreground
                    "
                  >
                    Responds {agent.responseTime}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div
                className="
                  mt-8
                  flex
                  flex-col
                  gap-2
                  sm:flex-row
                "
              >
                <Button
                  asChild
                  className="
                    h-11
                    rounded-none
                    px-6
                    text-[9px]
                    font-medium
                    uppercase
                    tracking-[0.2em]
                    shadow-none
                    transition-all
                    duration-500
                  "
                >
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MessageCircle className="mr-2 h-3.5 w-3.5" />
                    WhatsApp
                  </a>
                </Button>

                <Button
                  variant="outline"
                  asChild
                  className="
                    h-11
                    rounded-none
                    border-border
                    px-6
                    text-[9px]
                    font-medium
                    uppercase
                    tracking-[0.2em]
                    shadow-none
                    transition-all
                    duration-500
                  "
                >
                  <a href={`tel:${phoneNumber}`}>
                    <Phone className="mr-2 h-3.5 w-3.5" />
                    Call Advisor
                  </a>
                </Button>

                <Button
                  variant="ghost"
                  asChild
                  className="
                    h-11
                    rounded-none
                    px-5
                    text-[9px]
                    font-medium
                    uppercase
                    tracking-[0.2em]
                    text-muted-foreground
                    shadow-none
                    transition-all
                    duration-500
                    hover:bg-transparent
                    hover:text-foreground
                  "
                >
                  <a href={`mailto:${agent.email}`}>
                    <Mail className="mr-2 h-3.5 w-3.5" />
                    Email
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* ==========================================================
              METRICS
          =========================================================== */}

          <div
            className="
              mt-10
              grid
              grid-cols-2
              border-y
              border-border/60
              sm:grid-cols-4
            "
          >
            <Metric
              label="Experience"
              value={`${agent.experienceYears}`}
              suffix="Years"
            />

            <Metric
              label="Active Portfolio"
              value={`${listings.length}`}
              suffix="Listings"
            />

            <Metric
              label="Response"
              value={agent.responseTime}
            />

            <Metric
              label="Primary Market"
              value="Dhaka"
            />
          </div>
        </section>

        {/* ============================================================
            LISTINGS
        ============================================================ */}

        <section className="py-14 sm:py-16 lg:py-20">
          {/* Section header */}
          <div
            className="
              mb-8
              flex
              flex-col
              gap-5
              border-b
              border-border/60
              pb-6
              sm:flex-row
              sm:items-end
              sm:justify-between
            "
          >
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="h-px w-7 bg-foreground/30" />

                <span
                  className="
                    text-[8px]
                    font-medium
                    uppercase
                    tracking-[0.3em]
                    text-muted-foreground/50
                  "
                >
                  Current Portfolio
                </span>
              </div>

              <h2
                className="
                  font-display
                  text-3xl
                  font-normal
                  leading-none
                  tracking-[-0.04em]
                  text-foreground
                  sm:text-4xl
                "
              >
                Properties represented
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <span
                className="
                  font-mono
                  text-[9px]
                  tabular-nums
                  tracking-[0.18em]
                  text-muted-foreground/45
                "
              >
                {String(listings.length).padStart(2, "0")}
              </span>

              <span className="text-[8px] uppercase tracking-[0.2em] text-muted-foreground/35">
                Residences
              </span>
            </div>
          </div>

          {/* Property grid */}
          <PropertyGrid properties={listings} view="grid" />

          {/* Bottom closure */}
          {listings.length > 0 && (
            <div className="mt-16 flex items-center gap-5">
              <span className="h-px flex-1 bg-border/50" />

              <span
                className="
                  text-[7px]
                  font-medium
                  uppercase
                  tracking-[0.3em]
                  text-muted-foreground/30
                "
              >
                End of portfolio
              </span>

              <span className="h-px flex-1 bg-border/50" />
            </div>
          )}
        </section>

        {/* ============================================================
            CONTACT STRIP
        ============================================================ */}

        <section className="pb-16">
          <div
            className="
              relative
              overflow-hidden
              border
              border-border/60
              bg-foreground
              px-6
              py-8
              sm:px-8
              lg:px-10
            "
          >
            {/* Decorative line */}
            <div
              aria-hidden="true"
              className="
                absolute
                right-0
                top-0
                h-full
                w-px
                bg-background/10
              "
            />

            <div
              className="
                relative
                flex
                flex-col
                gap-6
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              <div>
                <p
                  className="
                    mb-2
                    text-[8px]
                    font-medium
                    uppercase
                    tracking-[0.3em]
                    text-background/45
                  "
                >
                  Private consultation
                </p>

                <h3
                  className="
                    font-display
                    text-2xl
                    font-normal
                    tracking-[-0.03em]
                    text-background
                    sm:text-3xl
                  "
                >
                  Looking for the right address?
                </h3>
              </div>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="
                  group
                  inline-flex
                  shrink-0
                  items-center
                  gap-3
                  border
                  border-background/20
                  px-5
                  py-3
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.22em]
                  text-background
                  transition-all
                  duration-500
                  hover:border-background/50
                "
              >
                Speak with {agent.name.split(" ")[0]}

                <ArrowUpRight
                  className="
                    h-3.5
                    w-3.5
                    transition-transform
                    duration-500
                    group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5
                  "
                />
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

/* ================================================================
   METRIC
================================================================ */

function Metric({
  label,
  value,
  suffix,
}: {
  label: string;
  value: string;
  suffix?: string;
}) {
  return (
    <div
      className="
        flex
        min-h-[82px]
        flex-col
        justify-center
        border-border/60
        px-4
        py-5
        sm:px-5
        [&:not(:nth-child(2))]:border-r
        sm:[&:not(:last-child)]:border-r
      "
    >
      <span
        className="
          text-[7px]
          font-medium
          uppercase
          tracking-[0.25em]
          text-muted-foreground/45
        "
      >
        {label}
      </span>

      <div className="mt-2 flex items-baseline gap-1.5">
        <span
          className="
            font-display
            text-xl
            font-normal
            tracking-[-0.03em]
            text-foreground
          "
        >
          {value}
        </span>

        {suffix && (
          <span
            className="
              text-[8px]
              font-medium
              uppercase
              tracking-[0.16em]
              text-muted-foreground/50
            "
          >
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

