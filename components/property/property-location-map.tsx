/**
 * Milestone 21: replaces what was literally just printed lat/lng text in
 * a bordered box. Uses OpenStreetMap's embed endpoint — no API key
 * required, so this works out of the box instead of needing a Google
 * Maps/Mapbox key the person would have to go set up before it's useful.
 */
export function PropertyLocationMap({
  lat,
  lng,
  address,
}: {
  lat: number;
  lng: number;
  address: string;
}) {
  const delta = 0.006;
  const bbox = `${lng - delta}%2C${lat - delta}%2C${lng + delta}%2C${lat + delta}`;
  const embedSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`;
  const externalHref = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=16/${lat}/${lng}`;

  return (
    <div className="overflow-hidden rounded-[var(--radius-md)] border border-border">
      <iframe
        title={`Map showing ${address}`}
        src={embedSrc}
        className="h-[280px] w-full sm:h-[340px]"
        loading="lazy"
      />
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border bg-surface-muted px-4 py-2.5 text-xs text-muted-foreground">
        <span>{address}</span>
        <a href={externalHref} target="_blank" rel="noreferrer" className="font-medium text-accent-strong hover:underline">
          Open in Maps ↗
        </a>
      </div>
    </div>
  );
}
