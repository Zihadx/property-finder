import Link from "next/link";
import { Building2, Users, ClipboardList, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  { icon: Building2, text: "A professional listing page for every property you manage" },
  { icon: Users, text: "Reach buyers and renters already searching by area and budget" },
  { icon: ClipboardList, text: "Structured inquiries and site-visit requests instead of scattered chats" },
  { icon: LineChart, text: "See which listings are getting real interest, not just guesses" },
];

/**
 * Milestone 16: property-owner conversion path. Inverted color treatment
 * (dark section on an otherwise light site) is the visual distinction the
 * master doc asks for between this and the buyer-facing sections — a
 * genuine break, not just a different heading. The CTA links to the real
 * property-intake form that already exists at /dashboard/properties/new
 * rather than a dead link or a duplicate mock form.
 */
export function OwnerConversion() {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-16 md:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="ledger-label text-primary-foreground/60">For property owners</p>
          <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">
            Your property, in front of people already looking for it
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-primary-foreground/75">
            Skip the scattered WhatsApp forwards and Facebook posts. List once, reach serious buyers and renters, and
            work with an agent who actually knows the listing.
          </p>
          <Button asChild size="lg" variant="accent" className="mt-8">
            <Link href="/dashboard/properties/new">List Your Property</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {benefits.map(({ icon: Icon, text }) => (
            <div key={text} className="rounded-[var(--radius-md)] border border-primary-foreground/15 p-4">
              <Icon className="h-5 w-5 text-primary-foreground/70" />
              <p className="mt-3 text-sm leading-relaxed text-primary-foreground/90">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
