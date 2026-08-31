"use client";

import { Share2 } from "lucide-react";
import { toast } from "sonner";
import { PropertyFavoriteButton } from "./property-favorite-button";
import { PropertyCompareButton } from "./property-compare-button";

/**
 * Milestone 21: was reimplementing the same favorite toggle already
 * abstracted into PropertyFavoriteButton back in Milestone 05 — swapped
 * to the shared atom (with a style override for this page's plain
 * background) and added the compare toggle, which was missing here
 * entirely even though Compare is a first-class feature everywhere else.
 */
export function PropertyActionsRow({ propertyId, title }: { propertyId: string; title: string }) {
  async function handleShare() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // user cancelled — no-op
      }
      return;
    }
    await navigator.clipboard.writeText(url);
    toast.success("Link copied", { description: "Share it with your customer on WhatsApp or SMS." });
  }

  const plainButtonClass = "border border-border-strong bg-transparent backdrop-blur-none hover:bg-surface-muted";

  return (
    <div className="flex items-center gap-2">
      <PropertyFavoriteButton propertyId={propertyId} className={plainButtonClass} />
      <PropertyCompareButton propertyId={propertyId} className={plainButtonClass} />
      <button
        type="button"
        onClick={handleShare}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-border-strong hover:bg-surface-muted"
        aria-label="Share property"
      >
        <Share2 className="h-4 w-4" />
      </button>
    </div>
  );
}
