import {
  Baby,
  Car,
  Dumbbell,
  ShieldCheck,
  Sofa,
  Trees,
  Waves,
} from "lucide-react";

import type { ProjectAmenity } from "@/types/project";

const ICONS = {
  pool: Waves,
  gym: Dumbbell,
  garden: Trees,
  security: ShieldCheck,
  parking: Car,
  lounge: Sofa,
  play: Baby,
} as const;

interface ProjectAmenitiesProps {
  amenities: ProjectAmenity[];
}

export function ProjectAmenities({
  amenities,
}: ProjectAmenitiesProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {amenities.map((amenity) => {
        const Icon = ICONS[amenity.icon];

        return (
          <div
            key={`${amenity.icon}-${amenity.label}`}
            className="group flex min-h-[120px] flex-col items-start justify-between border border-border/70 p-5 transition-all duration-300 hover:border-foreground/30 hover:bg-muted/40"
          >
            <Icon
              className="size-5 text-foreground"
              strokeWidth={1.5}
            />

            <span className="text-sm font-medium leading-5 text-foreground">
              {amenity.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}