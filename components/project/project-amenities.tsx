import { Waves, Dumbbell, Trees, ShieldCheck, Car, type LucideIcon } from "lucide-react";
import type { ProjectAmenity } from "@/types/project";

const ICONS: Record<ProjectAmenity["icon"], LucideIcon> = {
  pool: Waves,
  gym: Dumbbell,
  garden: Trees,
  security: ShieldCheck,
  parking: Car,
};

export function ProjectAmenities({ amenities }: { amenities: ProjectAmenity[] }) {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
      {amenities.map((amenity) => {
        const Icon = ICONS[amenity.icon];
        return (
          <div
            key={amenity.label}
            className="flex flex-col items-start gap-3 border border-border/70 p-5"
          >
            <Icon className="size-5 text-foreground" strokeWidth={1.5} />
            <span className="text-sm font-medium text-foreground">
              {amenity.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}