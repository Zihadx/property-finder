"use client";

import { AlertTriangle } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";

export default function PropertyError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="mx-auto max-w-7xl px-6 py-20">
      <EmptyState
        icon={AlertTriangle}
        title="Something went wrong"
        description="We couldn't load this property. Please try again."
        action={
          <Button onClick={reset} variant="outline">
            Try again
          </Button>
        }
      />
    </main>
  );
}
