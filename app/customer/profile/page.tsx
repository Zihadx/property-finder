import type { Metadata } from "next";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "My Profile" };

export default function CustomerProfilePage() {
  return (
    <div className="max-w-lg">
      <Card>
        <CardHeader>
          <p className="font-display text-base text-foreground">Contact details</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Used so agents can reach you about saved properties and site visits.
          </p>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <label className="block">
            <span className="ledger-label mb-2 block">Full name</span>
            <Input placeholder="Your name" />
          </label>
          <label className="block">
            <span className="ledger-label mb-2 block">Phone number</span>
            <Input placeholder="01XXXXXXXXX" />
          </label>
          <label className="block">
            <span className="ledger-label mb-2 block">Email (optional)</span>
            <Input type="email" placeholder="you@example.com" />
          </label>
          <Button type="button" className="mt-2 self-start" disabled>
            Save Changes
          </Button>
          <p className="text-xs text-caption-foreground">
            Account persistence isn&apos;t wired to a backend yet — this form is a preview of the profile screen.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
