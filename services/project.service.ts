
import type { Project } from "@/types/project";

/**
 * Sample projects used until this is wired to a real backend/CMS.
 * Images currently use Unsplash source URLs.
 */

const SAMPLE_PROJECT: Project = {
  id: "prj-001",
  slug: "nexora-heights",
  name: "Nexora Heights",
  tagline: "Premium residences in Bashundhara.",
  description:
    "Nexora Heights brings 120 considered residences to Bashundhara R/A across two towers, each unit planned around light, air flow and privacy. Handover is scheduled for 2027, with construction currently 72% complete.",

  location: {
    area: "Bashundhara R/A",
    address: "Road 12, Bashundhara R/A, Dhaka",
    lat: 23.8103,
    lng: 90.431,
  },

  startingPrice: 8_500_000,

  images: [
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=85",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2400&q=85",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2400&q=85",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=2400&q=85",
  ],

  towers: 2,
  totalUnits: 120,
  floors: 12,
  bedroomRange: "3 / 4 Bedroom",
  handoverLabel: "2027",
  salesPhone: "+8801700000000",

  unitTypes: [
    {
      id: "type-a",
      name: "Type A",
      areaSqft: 1450,
      bedrooms: 3,
      startingPrice: 7_800_000,
    },
    {
      id: "type-b",
      name: "Type B",
      areaSqft: 1750,
      bedrooms: 4,
      startingPrice: 9_500_000,
    },
  ],

  availability: [
    {
      floor: 12,
      units: [
        { unitId: "12-A", status: "available" },
        { unitId: "12-B", status: "sold" },
        { unitId: "12-C", status: "available" },
      ],
    },
    {
      floor: 11,
      units: [
        { unitId: "11-A", status: "sold" },
        { unitId: "11-B", status: "available" },
        { unitId: "11-C", status: "reserved" },
      ],
    },
    {
      floor: 10,
      units: [
        { unitId: "10-A", status: "available" },
        { unitId: "10-B", status: "available" },
        { unitId: "10-C", status: "sold" },
      ],
    },
  ],

  floorPlans: [
    {
      id: "fp-2a",
      name: "2 Bedroom — Compact",
      bedrooms: 2,
      areaSqft: 1150,
      image:
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=85",
    },
    {
      id: "fp-3a",
      name: "3 Bedroom — Type A",
      bedrooms: 3,
      areaSqft: 1450,
      image:
        "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1800&q=85",
    },
    {
      id: "fp-4a",
      name: "4 Bedroom — Type B",
      bedrooms: 4,
      areaSqft: 1750,
      image:
        "https://images.unsplash.com/photo-1600607688960-e095ff83135c?auto=format&fit=crop&w=1800&q=85",
    },
  ],

  amenities: [
    { label: "Swimming pool", icon: "pool" },
    { label: "Gymnasium", icon: "gym" },
    { label: "Landscaped garden", icon: "garden" },
    { label: "24/7 security", icon: "security" },
    { label: "Covered parking", icon: "parking" },
  ],

  constructionProgress: 72,

  milestones: [
    { label: "Foundation", month: "Jan", complete: true },
    { label: "Structure", month: "Mar", complete: true },
    { label: "Brickwork", month: "Jun", complete: true },
    { label: "Finishing", month: "Sep", complete: false },
  ],

  paymentPlan: [
    { label: "Booking", percentage: 10 },
    { label: "1st installment", percentage: 20 },
    { label: "Construction", percentage: 40 },
    { label: "Handover", percentage: 30 },
  ],

  faqs: [
    {
      question: "Is parking included?",
      answer:
        "Yes — every unit includes one covered parking space, with additional spaces available for purchase depending on floor availability.",
    },
    {
      question: "When is handover?",
      answer:
        "Nexora Heights is scheduled for handover in 2027. Construction is currently 72% complete and on schedule.",
    },
    {
      question: "What is the payment plan?",
      answer:
        "A 10% booking payment, 20% on the first installment, 40% spread across construction milestones, and the remaining 30% due at handover.",
    },
    {
      question: "Is bank financing available?",
      answer:
        "Yes, we work with several partner banks for home loan financing. Our property advisors can help you compare pre-approved rates.",
    },
  ],
};

const SAMPLE_PROJECT_2: Project = {
  id: "prj-002",
  slug: "meridian-court",
  name: "Meridian Court",
  tagline: "Low-rise family living in Uttara.",
  description:
    "Meridian Court is a single-tower, 48-unit development in Uttara built around a shared courtyard, aimed at families who want more space without leaving the city.",

  location: {
    area: "Uttara",
    address: "Sector 11, Uttara, Dhaka",
    lat: 23.8759,
    lng: 90.3795,
  },

  startingPrice: 6_200_000,

  images: [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85",
    "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=2400&q=85",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=2400&q=85",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2400&q=85",
  ],

  towers: 1,
  totalUnits: 48,
  floors: 8,
  bedroomRange: "2 / 3 Bedroom",
  handoverLabel: "2026",
  salesPhone: "+8801700000001",

  unitTypes: [
    {
      id: "type-a",
      name: "Type A",
      areaSqft: 1050,
      bedrooms: 2,
      startingPrice: 6_200_000,
    },
    {
      id: "type-b",
      name: "Type B",
      areaSqft: 1400,
      bedrooms: 3,
      startingPrice: 7_900_000,
    },
  ],

  availability: [
    {
      floor: 8,
      units: [
        { unitId: "8-A", status: "available" },
        { unitId: "8-B", status: "available" },
      ],
    },
    {
      floor: 7,
      units: [
        { unitId: "7-A", status: "sold" },
        { unitId: "7-B", status: "reserved" },
      ],
    },
  ],

  floorPlans: [
    {
      id: "fp-2a",
      name: "2 Bedroom — Type A",
      bedrooms: 2,
      areaSqft: 1050,
      image:
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=85",
    },
    {
      id: "fp-3a",
      name: "3 Bedroom — Type B",
      bedrooms: 3,
      areaSqft: 1400,
      image:
        "https://images.unsplash.com/photo-1600607688960-e095ff83135c?auto=format&fit=crop&w=1800&q=85",
    },
  ],

  amenities: [
    { label: "Landscaped garden", icon: "garden" },
    { label: "24/7 security", icon: "security" },
    { label: "Covered parking", icon: "parking" },
  ],

  constructionProgress: 91,

  milestones: [
    { label: "Foundation", month: "Feb", complete: true },
    { label: "Structure", month: "May", complete: true },
    { label: "Brickwork", month: "Aug", complete: true },
    { label: "Finishing", month: "Nov", complete: true },
  ],

  paymentPlan: [
    { label: "Booking", percentage: 15 },
    { label: "1st installment", percentage: 25 },
    { label: "Construction", percentage: 35 },
    { label: "Handover", percentage: 25 },
  ],

  faqs: [
    {
      question: "Is parking included?",
      answer: "Yes, one covered space per unit is included in the price.",
    },
    {
      question: "When is handover?",
      answer:
        "Handover is scheduled for 2026 — construction is 91% complete.",
    },
  ],
};

const PROJECTS: Project[] = [
  SAMPLE_PROJECT,
  SAMPLE_PROJECT_2,
];

export const projectService = {
  async list(): Promise<Project[]> {
    return PROJECTS;
  },

  async getBySlug(slug: string): Promise<Project | null> {
    return PROJECTS.find((project) => project.slug === slug) ?? null;
  },
};

