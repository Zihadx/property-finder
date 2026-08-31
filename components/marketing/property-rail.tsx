"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface PropertyRailProps {
  children: React.ReactNode;
  className?: string;
}

export function PropertyRail({
  children,
  className,
}: PropertyRailProps) {
  const railRef = React.useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = React.useState(false);

  const dragState = React.useRef({
    startX: 0,
    scrollLeft: 0,
  });

  const handlePointerDown = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    const rail = railRef.current;

    if (!rail) return;

    dragState.current = {
      startX: event.clientX,
      scrollLeft: rail.scrollLeft,
    };

    setIsDragging(true);

    rail.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    const rail = railRef.current;

    if (!rail || !isDragging) return;

    const distance =
      event.clientX - dragState.current.startX;

    rail.scrollLeft =
      dragState.current.scrollLeft - distance;
  };

  const stopDragging = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    const rail = railRef.current;

    if (!rail) return;

    setIsDragging(false);

    if (rail.hasPointerCapture(event.pointerId)) {
      rail.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div
      ref={railRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
      onPointerLeave={(event) => {
        if (isDragging) {
          stopDragging(event);
        }
      }}
      className={cn(
        "flex gap-3 overflow-x-auto pb-4 select-none",
        "touch-pan-x overscroll-x-contain",
        "scrollbar-none",
        "[-ms-overflow-style:none]",
        "[&::-webkit-scrollbar]:hidden",
        "sm:gap-4",
        isDragging
          ? "cursor-grabbing"
          : "cursor-grab",
        className,
      )}
    >
      {children}
    </div>
  );
}