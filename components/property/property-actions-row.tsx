"use client";

import { Heart, Share2 } from "lucide-react";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleFavorite } from "@/redux/slices/favoritesSlice";
import { cn } from "@/lib/utils";

export function PropertyActionsRow({ propertyId, title }: { propertyId: string; title: string }) {
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector((state) => state.favorites.propertyIds.includes(propertyId));

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

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => dispatch(toggleFavorite(propertyId))}
        aria-pressed={isFavorite}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-border-strong hover:bg-surface-muted"
        aria-label={isFavorite ? "Remove from saved properties" : "Save property"}
      >
        <Heart className={cn("h-4 w-4", isFavorite ? "fill-danger text-danger" : "text-foreground")} />
      </button>
      <button
        type="button"
        onClick={handleShare}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-border-strong hover:bg-surface-muted"
        aria-label="Share property"
      >
        <Share2 className="h-4 w-4" />
      </button>
    </div>
  );
}
