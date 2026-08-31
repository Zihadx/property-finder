// Signature Easy BD property-card system (Milestone 05).
// Grid/list contexts use PropertyCard or HorizontalPropertyCard; use the
// others for their specific contexts — see each file's doc comment.
export { PropertyCard } from "./property-card";
export { HorizontalPropertyCard } from "./horizontal-property-card";
export { FeaturedPropertyCard } from "./featured-property-card";
export { CompactPropertyCard } from "./compact-property-card";
export { EditorialPropertyCard } from "./editorial-property-card";
export { MapPropertyCard } from "./map-property-card";

// Shared atoms, exported for composing new card contexts without duplicating markup.
export { PropertyPrice } from "./property-price";
export { PropertyFacts } from "./property-facts";
export { PropertyStatusBadges } from "./property-status-badges";
export { PropertyFavoriteButton } from "./property-favorite-button";
export { PropertyCompareButton } from "./property-compare-button";
export { propertyStatusVariant } from "./property-status";
