export type PropertyType =
  | "Apartment"
  | "Luxury Apartment"
  | "Duplex"
  | "Penthouse"
  | "Plot"
  | "Commercial Space"
  | "Office"
  | "Shop"
  | "Land"
  | "House";

export type PropertyStatus = "Available" | "Sold" | "Rented" | "Under Offer";

export type ListingPurpose = "Sale" | "Rent";

export interface PropertyLocation {
  area: string;
  areaSlug: string;
  address: string;
  lat: number;
  lng: number;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  type: PropertyType;
  purpose: ListingPurpose;
  status: PropertyStatus;
  featured: boolean;
  price: number; // BDT
  location: PropertyLocation;
  bedrooms: number;
  bathrooms: number;
  areaSqft: number;
  floor?: string;
  totalFloors?: number;
  parking: number;
  amenities: string[];
  description: string;
  images: string[];
  agentId: string;
  listedAt: string; // ISO date
  views: number;
  inquiries: number;
}
