export type UnitStatus = "available" | "reserved" | "sold";

export interface ProjectUnitType {
  id: string;
  name: string;
  areaSqft: number;
  bedrooms: number;
  startingPrice: number;
}

export interface FloorUnit {
  unitId: string;
  status: UnitStatus;
}

export interface ProjectFloor {
  floor: number;
  units: FloorUnit[];
}

export interface FloorPlan {
  id: string;
  name: string;
  bedrooms: number;
  areaSqft: number;
  image: string;
}

export type AmenityIcon =
  | "pool"
  | "gym"
  | "garden"
  | "security"
  | "parking";

export interface ProjectAmenity {
  label: string;
  icon: AmenityIcon;
}

export interface ConstructionMilestone {
  label: string;
  month: string;
  complete: boolean;
}

export interface PaymentPlanStep {
  label: string;
  percentage: number;
}

export interface ProjectFaq {
  question: string;
  answer: string;
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  location: {
    area: string;
    address: string;
    lat: number;
    lng: number;
  };
  startingPrice: number;
  images: string[];
  towers: number;
  totalUnits: number;
  floors: number;
  bedroomRange: string;
  handoverLabel: string;
  salesPhone: string;
  unitTypes: ProjectUnitType[];
  availability: ProjectFloor[];
  floorPlans: FloorPlan[];
  amenities: ProjectAmenity[];
  constructionProgress: number;
  milestones: ConstructionMilestone[];
  paymentPlan: PaymentPlanStep[];
  faqs: ProjectFaq[];
}