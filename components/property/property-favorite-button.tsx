"use client";

import { motion, useReducedMotion } from "motion/react";
import { Heart } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleFavorite } from "@/redux/slices/favoritesSlice";
import { cn } from "@/lib/utils";

/**
 * Shared save/favorite toggle. Guards against navigating when nested inside
 * a card that's itself a <Link> (compact/editorial/map variants) by
 * stopping propagation and default, so it's safe to drop into any variant.
 */
export function PropertyFavoriteButton({
  propertyId,
  size = "md",
  className,
}: {
  propertyId: string;
  size?: "sm" | "md";
  className?: string;
}) {
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector((state) => state.favorites.propertyIds.includes(propertyId));
  const reduceMotion = useReducedMotion();
  const box = size === "sm" ? "h-7 w-7" : "h-9 w-9";
  const icon = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";

  return (
    <button
      type="button"
      aria-label={isFavorite ? "Remove from saved properties" : "Save property"}
      aria-pressed={isFavorite}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(toggleFavorite(propertyId));
      }}
      className={cn(
        "flex items-center justify-center rounded-full bg-surface/90 backdrop-blur-sm transition-colors hover:bg-surface",
        box,
        className
      )}
    >
      <motion.span
        key={isFavorite ? "on" : "off"}
        initial={reduceMotion ? false : { scale: 0.6 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 15 }}
        className="flex"
      >
        <Heart
          className={cn(icon, "transition-colors", isFavorite ? "fill-danger text-danger" : "text-foreground")}
        />
      </motion.span>
    </button>
  );
}
