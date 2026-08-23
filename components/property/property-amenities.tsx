import { Check } from "lucide-react";

export function PropertyAmenities({ amenities }: { amenities: string[] }) {
  if (amenities.length === 0) return null;
  return (
    <div>
      <h2 className="font-display text-xl text-foreground">Amenities</h2>
      <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
        {amenities.map((amenity) => (
          <li key={amenity} className="flex items-center gap-2.5 text-sm text-foreground">
            <Check className="h-4 w-4 shrink-0 text-accent" strokeWidth={2} />
            {amenity}
          </li>
        ))}
      </ul>
    </div>
  );
}
