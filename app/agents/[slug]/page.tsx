import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Phone, MessageCircle, Mail, MapPin, Clock } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { PropertyGrid } from "@/components/property/property-grid";
import { Button } from "@/components/ui/button";
import { agentService } from "@/services/agent.service";
import { propertyService } from "@/services/property.service";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const agent = await agentService.getBySlug(slug);
  if (!agent) return { title: "Agent not found" };
  return { title: agent.name, description: agent.bio };
}

export default async function AgentProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const agent = await agentService.getBySlug(slug);
  if (!agent) notFound();

  const listings = await propertyService.getByAgent(agent.id);
  const whatsappHref = `https://wa.me/${agent.whatsapp.replace(/[^\d]/g, "")}?text=${encodeURIComponent(
    `Hi ${agent.name}, I found your profile on ListEasy BD.`
  )}`;

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-full border border-border lg:mx-0">
              <Image src={agent.photo} alt={agent.name} fill sizes="128px" className="object-cover" />
            </div>
            <h1 className="mt-4 text-center font-display text-2xl text-foreground lg:text-left">{agent.name}</h1>
            <p className="text-center text-sm text-muted-foreground lg:text-left">{agent.position}</p>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-caption-foreground lg:justify-start">
              <Clock className="h-3.5 w-3.5" />
              {agent.responseTime}
            </p>
            <p className="mt-1 flex items-start justify-center gap-1.5 text-sm text-muted-foreground lg:justify-start">
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              {agent.areasServed.join(", ")}
            </p>

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{agent.bio}</p>

            <div className="mt-6 flex flex-col gap-2.5">
              <Button asChild>
                <a href={whatsappHref} target="_blank" rel="noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  WhatsApp
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href={`tel:${agent.phone.replace(/\s/g, "")}`}>
                  <Phone className="mr-2 h-4 w-4" />
                  {agent.phone}
                </a>
              </Button>
              <Button variant="ghost" asChild>
                <a href={`mailto:${agent.email}`}>
                  <Mail className="mr-2 h-4 w-4" />
                  {agent.email}
                </a>
              </Button>
            </div>

            <p className="mt-6 border-t border-border pt-4 text-sm text-muted-foreground">
              <span className="ledger-value text-foreground">{agent.experienceYears}</span> years of
              experience · <span className="ledger-value text-foreground">{listings.length}</span> total
              listings
            </p>
          </aside>

          <div>
            <h2 className="font-display text-xl text-foreground">
              Listings from {agent.name.split(" ")[0]}
            </h2>
            <div className="mt-6">
              <PropertyGrid properties={listings} view="grid" />
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
