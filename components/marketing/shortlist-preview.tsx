import { propertyService } from "@/services/property.service";
import { ShortlistPreviewClient } from "./shortlist-preview-client";

/**
 * Milestone 10: server component fetches the suggestion set; all
 * interactivity (Redux reads, button dispatches) lives in the client
 * child so this stays server-rendered where it can be.
 */
export async function ShortlistPreview() {
  const suggestions = await propertyService.getFeatured(4);
  return <ShortlistPreviewClient suggestions={suggestions} />;
}
