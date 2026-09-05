import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "prj-001",
    slug: "listeasy-bd",
    name: "ListEasy BD",
    tagline: "Premium residences in Bashundhara.",
    description:
      "ListEasy BD brings 120 considered residences to Bashundhara R/A across two towers, each unit planned around natural light, airflow and privacy. Handover is scheduled for 2027, with construction currently 72% complete.",

    location: {
      area: "Bashundhara R/A",
      address: "Road 12, Bashundhara R/A, Dhaka",
      lat: 23.8103,
      lng: 90.431,
    },

    startingPrice: 8500000,

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
        startingPrice: 7800000,
      },
      {
        id: "type-b",
        name: "Type B",
        areaSqft: 1750,
        bedrooms: 4,
        startingPrice: 9500000,
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
          "Yes — every unit includes one covered parking space, with additional spaces available for purchase depending on availability.",
      },
      {
        question: "When is handover?",
        answer:
          "ListEasy BD is scheduled for handover in 2027. Construction is currently 72% complete and progressing according to schedule.",
      },
      {
        question: "What is the payment plan?",
        answer:
          "A 10% booking payment, 20% on the first installment, 40% spread across construction milestones, and the remaining 30% due at handover.",
      },
      {
        question: "Is bank financing available?",
        answer:
          "Yes. Buyers can explore home-loan financing through several partner banks, subject to their individual eligibility.",
      },
    ],
  },

  {
    id: "prj-002",
    slug: "arbor-residences",
    name: "Arbor Residences",
    tagline: "Quiet contemporary living in Gulshan.",
    description:
      "Arbor Residences is an intimate 48-unit development designed around privacy, greenery and generous living spaces. Located in one of Gulshan's established residential pockets, the project combines understated architecture with hotel-inspired amenities.",

    location: {
      area: "Gulshan 2",
      address: "Road 86, Gulshan 2, Dhaka",
      lat: 23.7937,
      lng: 90.4147,
    },

    startingPrice: 18500000,

    images: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2400&q=85",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=2400&q=85",
      "https://images.unsplash.com/photo-1600566753051-f0b89df2dd90?auto=format&fit=crop&w=2400&q=85",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2400&q=85",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=2400&q=85",
    ],

    towers: 1,
    totalUnits: 48,
    floors: 8,
    bedroomRange: "3 / 4 Bedroom",
    handoverLabel: "2026",
    salesPhone: "+8801711000001",

    unitTypes: [
      {
        id: "arbor-a",
        name: "Garden Residence",
        areaSqft: 1850,
        bedrooms: 3,
        startingPrice: 18500000,
      },
      {
        id: "arbor-b",
        name: "Sky Residence",
        areaSqft: 2350,
        bedrooms: 4,
        startingPrice: 23500000,
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
          { unitId: "7-A", status: "reserved" },
          { unitId: "7-B", status: "sold" },
        ],
      },
      {
        floor: 6,
        units: [
          { unitId: "6-A", status: "available" },
          { unitId: "6-B", status: "sold" },
        ],
      },
    ],

    floorPlans: [
      {
        id: "arbor-fp1",
        name: "3 Bedroom — Garden",
        bedrooms: 3,
        areaSqft: 1850,
        image:
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85",
      },
      {
        id: "arbor-fp2",
        name: "4 Bedroom — Sky",
        bedrooms: 4,
        areaSqft: 2350,
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85",
      },
    ],

    amenities: [
      { label: "Infinity pool", icon: "pool" },
      { label: "Private lounge", icon: "lounge" },
      { label: "Fitness studio", icon: "gym" },
      { label: "Rooftop garden", icon: "garden" },
      { label: "Concierge", icon: "security" },
    ],

    constructionProgress: 91,

    milestones: [
      { label: "Foundation", month: "Feb", complete: true },
      { label: "Structure", month: "May", complete: true },
      { label: "Brickwork", month: "Aug", complete: true },
      { label: "Finishing", month: "Dec", complete: false },
    ],

    paymentPlan: [
      { label: "Booking", percentage: 15 },
      { label: "Agreement", percentage: 15 },
      { label: "Construction", percentage: 40 },
      { label: "Handover", percentage: 30 },
    ],

    faqs: [
      {
        question: "How many units are in the project?",
        answer:
          "Arbor Residences contains 48 residences across a single eight-storey tower.",
      },
      {
        question: "Is there rooftop access?",
        answer:
          "Residents have access to a landscaped rooftop garden and private residents' lounge.",
      },
      {
        question: "When is handover?",
        answer:
          "Handover is targeted for late 2026, subject to final finishing and statutory approvals.",
      },
    ],
  },

  {
    id: "prj-003",
    slug: "the-verde-dhanmondi",
    name: "The Verde Dhanmondi",
    tagline: "Green living at the heart of Dhanmondi.",
    description:
      "The Verde Dhanmondi introduces 64 thoughtfully planned residences around a landscaped central courtyard. Designed for families who value walkability and calm, the project places schools, parks, healthcare and everyday conveniences within easy reach.",

    location: {
      area: "Dhanmondi",
      address: "Road 27, Dhanmondi, Dhaka",
      lat: 23.7461,
      lng: 90.3742,
    },

    startingPrice: 11200000,

    images: [
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=2400&q=85",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2400&q=85",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2400&q=85",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=2400&q=85",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2400&q=85",
    ],

    towers: 1,
    totalUnits: 64,
    floors: 10,
    bedroomRange: "2 / 3 Bedroom",
    handoverLabel: "2027",
    salesPhone: "+8801722000002",

    unitTypes: [
      {
        id: "verde-a",
        name: "Verde 2A",
        areaSqft: 1250,
        bedrooms: 2,
        startingPrice: 11200000,
      },
      {
        id: "verde-b",
        name: "Verde 3A",
        areaSqft: 1580,
        bedrooms: 3,
        startingPrice: 13900000,
      },
    ],

    availability: [
      {
        floor: 10,
        units: [
          { unitId: "10-A", status: "available" },
          { unitId: "10-B", status: "available" },
        ],
      },
      {
        floor: 9,
        units: [
          { unitId: "9-A", status: "sold" },
          { unitId: "9-B", status: "reserved" },
        ],
      },
      {
        floor: 8,
        units: [
          { unitId: "8-A", status: "available" },
          { unitId: "8-B", status: "sold" },
        ],
      },
    ],

    floorPlans: [
      {
        id: "verde-fp1",
        name: "2 Bedroom — Verde",
        bedrooms: 2,
        areaSqft: 1250,
        image:
          "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=85",
      },
      {
        id: "verde-fp2",
        name: "3 Bedroom — Courtyard",
        bedrooms: 3,
        areaSqft: 1580,
        image:
          "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1800&q=85",
      },
    ],

    amenities: [
      { label: "Central courtyard", icon: "garden" },
      { label: "Children's play area", icon: "play" },
      { label: "Community lounge", icon: "lounge" },
      { label: "Fitness room", icon: "gym" },
      { label: "Covered parking", icon: "parking" },
    ],

    constructionProgress: 58,

    milestones: [
      { label: "Foundation", month: "Mar", complete: true },
      { label: "Structure", month: "Jul", complete: true },
      { label: "Brickwork", month: "Oct", complete: false },
      { label: "Finishing", month: "Feb", complete: false },
    ],

    paymentPlan: [
      { label: "Booking", percentage: 10 },
      { label: "Agreement", percentage: 20 },
      { label: "Construction", percentage: 40 },
      { label: "Handover", percentage: 30 },
    ],

    faqs: [
      {
        question: "What makes the project family-friendly?",
        answer:
          "The project includes a landscaped courtyard, children's play area, community lounge and pedestrian-focused internal spaces.",
      },
      {
        question: "Are there two-bedroom units?",
        answer:
          "Yes. The project offers two-bedroom residences starting from approximately 1,250 square feet.",
      },
      {
        question: "What is the expected handover?",
        answer:
          "The current target for handover is 2027.",
      },
    ],
  },

  {
    id: "prj-004",
    slug: "lakeview-terraces",
    name: "Lakeview Terraces",
    tagline: "Elevated living beside Hatirjheel.",
    description:
      "Lakeview Terraces is a modern residential address positioned close to Hatirjheel, offering expansive balconies, carefully framed views and generous shared spaces. The project comprises 96 homes across two contemporary towers.",

    location: {
      area: "Tejgaon",
      address: "Hatirjheel Link Road, Tejgaon, Dhaka",
      lat: 23.7624,
      lng: 90.3995,
    },

    startingPrice: 9800000,

    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=85",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=2400&q=85",
      "https://images.unsplash.com/photo-1600607688960-e095ff83135c?auto=format&fit=crop&w=2400&q=85",
      "https://images.unsplash.com/photo-1600566753051-f0b89df2dd90?auto=format&fit=crop&w=2400&q=85",
    ],

    towers: 2,
    totalUnits: 96,
    floors: 14,
    bedroomRange: "2 / 3 Bedroom",
    handoverLabel: "2028",
    salesPhone: "+8801733000003",

    unitTypes: [
      {
        id: "lake-a",
        name: "Terrace 2A",
        areaSqft: 1180,
        bedrooms: 2,
        startingPrice: 9800000,
      },
      {
        id: "lake-b",
        name: "Terrace 3A",
        areaSqft: 1540,
        bedrooms: 3,
        startingPrice: 12600000,
      },
    ],

    availability: [
      {
        floor: 14,
        units: [
          { unitId: "14-A", status: "available" },
          { unitId: "14-B", status: "available" },
          { unitId: "14-C", status: "reserved" },
        ],
      },
      {
        floor: 13,
        units: [
          { unitId: "13-A", status: "sold" },
          { unitId: "13-B", status: "available" },
          { unitId: "13-C", status: "available" },
        ],
      },
    ],

    floorPlans: [
      {
        id: "lake-fp1",
        name: "2 Bedroom — Terrace",
        bedrooms: 2,
        areaSqft: 1180,
        image:
          "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1800&q=85",
      },
      {
        id: "lake-fp2",
        name: "3 Bedroom — Lakeview",
        bedrooms: 3,
        areaSqft: 1540,
        image:
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85",
      },
    ],

    amenities: [
      { label: "Sky lounge", icon: "lounge" },
      { label: "Rooftop pool", icon: "pool" },
      { label: "Fitness center", icon: "gym" },
      { label: "Jogging path", icon: "garden" },
      { label: "Multi-level parking", icon: "parking" },
    ],

    constructionProgress: 41,

    milestones: [
      { label: "Foundation", month: "Apr", complete: true },
      { label: "Structure", month: "Aug", complete: false },
      { label: "Brickwork", month: "Jan", complete: false },
      { label: "Finishing", month: "Jun", complete: false },
    ],

    paymentPlan: [
      { label: "Booking", percentage: 10 },
      { label: "1st installment", percentage: 15 },
      { label: "Construction", percentage: 45 },
      { label: "Handover", percentage: 30 },
    ],

    faqs: [
      {
        question: "Does every unit have a balcony?",
        answer:
          "Yes. Each residence is designed with a private outdoor balcony or terrace.",
      },
      {
        question: "How many towers are planned?",
        answer:
          "Lakeview Terraces consists of two residential towers with a combined 96 units.",
      },
    ],
  },

  {
    id: "prj-005",
    slug: "aurum-banani",
    name: "Aurum Banani",
    tagline: "A refined urban address in Banani.",
    description:
      "Aurum Banani is a boutique 36-residence development created for buyers seeking a more private urban lifestyle. The architecture combines warm natural materials, large openings and carefully considered common spaces.",

    location: {
      area: "Banani",
      address: "Road 11, Banani, Dhaka",
      lat: 23.7936,
      lng: 90.4043,
    },

    startingPrice: 16200000,

    images: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2400&q=85",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=2400&q=85",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2400&q=85",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2400&q=85",
      "https://images.unsplash.com/photo-1600566753051-f0b89df2dd90?auto=format&fit=crop&w=2400&q=85",
    ],

    towers: 1,
    totalUnits: 36,
    floors: 9,
    bedroomRange: "3 / 4 Bedroom",
    handoverLabel: "2026",
    salesPhone: "+8801744000004",

    unitTypes: [
      {
        id: "aurum-a",
        name: "Aurum Residence",
        areaSqft: 1720,
        bedrooms: 3,
        startingPrice: 16200000,
      },
      {
        id: "aurum-b",
        name: "Aurum Grand",
        areaSqft: 2180,
        bedrooms: 4,
        startingPrice: 20500000,
      },
    ],

    availability: [
      {
        floor: 9,
        units: [
          { unitId: "9-A", status: "available" },
          { unitId: "9-B", status: "reserved" },
        ],
      },
      {
        floor: 8,
        units: [
          { unitId: "8-A", status: "sold" },
          { unitId: "8-B", status: "sold" },
        ],
      },
    ],

    floorPlans: [
      {
        id: "aurum-fp1",
        name: "3 Bedroom — Residence",
        bedrooms: 3,
        areaSqft: 1720,
        image:
          "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85",
      },
      {
        id: "aurum-fp2",
        name: "4 Bedroom — Grand",
        bedrooms: 4,
        areaSqft: 2180,
        image:
          "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1800&q=85",
      },
    ],

    amenities: [
      { label: "Residents' lounge", icon: "lounge" },
      { label: "Private gym", icon: "gym" },
      { label: "Rooftop garden", icon: "garden" },
      { label: "Driver waiting lounge", icon: "security" },
      { label: "Basement parking", icon: "parking" },
    ],

    constructionProgress: 94,

    milestones: [
      { label: "Foundation", month: "Jan", complete: true },
      { label: "Structure", month: "Apr", complete: true },
      { label: "Brickwork", month: "Jul", complete: true },
      { label: "Finishing", month: "Oct", complete: false },
    ],

    paymentPlan: [
      { label: "Booking", percentage: 15 },
      { label: "Agreement", percentage: 15 },
      { label: "Construction", percentage: 40 },
      { label: "Handover", percentage: 30 },
    ],

    faqs: [
      {
        question: "How many residences are there?",
        answer:
          "Aurum Banani is limited to 36 residences, creating a more private residential environment.",
      },
      {
        question: "Are there larger four-bedroom residences?",
        answer:
          "Yes. The Grand residences offer approximately 2,180 square feet with four bedrooms.",
      },
    ],
  },

  {
    id: "prj-006",
    slug: "solace-uttara",
    name: "Solace Uttara",
    tagline: "Contemporary family homes in Uttara.",
    description:
      "Solace Uttara is a family-focused development offering 84 practical yet refined residences in Uttara Sector 10. Generous windows, efficient floor plans and shared recreational spaces make the project suited to modern city living.",

    location: {
      area: "Uttara Sector 10",
      address: "Road 12, Sector 10, Uttara, Dhaka",
      lat: 23.8748,
      lng: 90.3927,
    },

    startingPrice: 7200000,

    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=2400&q=85",
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=2400&q=85",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2400&q=85",
      "https://images.unsplash.com/photo-1600607688960-e095ff83135c?auto=format&fit=crop&w=2400&q=85",
    ],

    towers: 2,
    totalUnits: 84,
    floors: 10,
    bedroomRange: "2 / 3 Bedroom",
    handoverLabel: "2027",
    salesPhone: "+8801755000005",

    unitTypes: [
      {
        id: "solace-a",
        name: "Family 2A",
        areaSqft: 1080,
        bedrooms: 2,
        startingPrice: 7200000,
      },
      {
        id: "solace-b",
        name: "Family 3A",
        areaSqft: 1390,
        bedrooms: 3,
        startingPrice: 8900000,
      },
    ],

    availability: [
      {
        floor: 10,
        units: [
          { unitId: "10-A", status: "available" },
          { unitId: "10-B", status: "available" },
          { unitId: "10-C", status: "sold" },
        ],
      },
      {
        floor: 9,
        units: [
          { unitId: "9-A", status: "available" },
          { unitId: "9-B", status: "reserved" },
          { unitId: "9-C", status: "sold" },
        ],
      },
    ],

    floorPlans: [
      {
        id: "solace-fp1",
        name: "2 Bedroom — Family",
        bedrooms: 2,
        areaSqft: 1080,
        image:
          "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1800&q=85",
      },
      {
        id: "solace-fp2",
        name: "3 Bedroom — Family Plus",
        bedrooms: 3,
        areaSqft: 1390,
        image:
          "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1800&q=85",
      },
    ],

    amenities: [
      { label: "Swimming pool", icon: "pool" },
      { label: "Children's zone", icon: "play" },
      { label: "Community hall", icon: "lounge" },
      { label: "Fitness center", icon: "gym" },
      { label: "Visitor parking", icon: "parking" },
    ],

    constructionProgress: 63,

    milestones: [
      { label: "Foundation", month: "Feb", complete: true },
      { label: "Structure", month: "Jun", complete: true },
      { label: "Brickwork", month: "Oct", complete: false },
      { label: "Finishing", month: "Mar", complete: false },
    ],

    paymentPlan: [
      { label: "Booking", percentage: 10 },
      { label: "Agreement", percentage: 20 },
      { label: "Construction", percentage: 40 },
      { label: "Handover", percentage: 30 },
    ],

    faqs: [
      {
        question: "Is Solace Uttara suitable for families?",
        answer:
          "Yes. The project is designed around practical family layouts, children's facilities and shared recreational spaces.",
      },
      {
        question: "What unit sizes are available?",
        answer:
          "Current plans range from approximately 1,080 to 1,390 square feet.",
      },
    ],
  },

  {
    id: "prj-007",
    slug: "casa-mirage",
    name: "Casa Mirage",
    tagline: "Modern residences in Mirpur DOHS.",
    description:
      "Casa Mirage offers 56 contemporary residences in Mirpur DOHS, balancing efficient urban layouts with premium shared amenities. The development is positioned for residents looking for a quieter neighborhood without leaving Dhaka's connected northern corridor.",

    location: {
      area: "Mirpur DOHS",
      address: "Avenue 5, Mirpur DOHS, Dhaka",
      lat: 23.8256,
      lng: 90.3962,
    },

    startingPrice: 6800000,

    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=85",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=2400&q=85",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2400&q=85",
      "https://images.unsplash.com/photo-1600566753051-f0b89df2dd90?auto=format&fit=crop&w=2400&q=85",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2400&q=85",
    ],

    towers: 1,
    totalUnits: 56,
    floors: 9,
    bedroomRange: "2 / 3 Bedroom",
    handoverLabel: "2028",
    salesPhone: "+8801766000006",

    unitTypes: [
      {
        id: "mirage-a",
        name: "Mirage 2A",
        areaSqft: 1040,
        bedrooms: 2,
        startingPrice: 6800000,
      },
      {
        id: "mirage-b",
        name: "Mirage 3A",
        areaSqft: 1360,
        bedrooms: 3,
        startingPrice: 8200000,
      },
    ],

    availability: [
      {
        floor: 9,
        units: [
          { unitId: "9-A", status: "available" },
          { unitId: "9-B", status: "available" },
        ],
      },
      {
        floor: 8,
        units: [
          { unitId: "8-A", status: "available" },
          { unitId: "8-B", status: "reserved" },
        ],
      },
    ],

    floorPlans: [
      {
        id: "mirage-fp1",
        name: "2 Bedroom — Urban",
        bedrooms: 2,
        areaSqft: 1040,
        image:
          "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85",
      },
      {
        id: "mirage-fp2",
        name: "3 Bedroom — Signature",
        bedrooms: 3,
        areaSqft: 1360,
        image:
          "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1800&q=85",
      },
    ],

    amenities: [
      { label: "Rooftop terrace", icon: "garden" },
      { label: "Fitness room", icon: "gym" },
      { label: "Multipurpose hall", icon: "lounge" },
      { label: "Prayer room", icon: "lounge" },
      { label: "Secure parking", icon: "parking" },
    ],

    constructionProgress: 34,

    milestones: [
      { label: "Foundation", month: "May", complete: true },
      { label: "Structure", month: "Sep", complete: false },
      { label: "Brickwork", month: "Jan", complete: false },
      { label: "Finishing", month: "Jul", complete: false },
    ],

    paymentPlan: [
      { label: "Booking", percentage: 10 },
      { label: "Agreement", percentage: 20 },
      { label: "Construction", percentage: 45 },
      { label: "Handover", percentage: 25 },
    ],

    faqs: [
      {
        question: "What bedroom options are offered?",
        answer:
          "Casa Mirage currently offers two-bedroom and three-bedroom residences.",
      },
      {
        question: "What is the current construction status?",
        answer:
          "The project is currently in the early structural phase, with construction approximately 34% complete.",
      },
    ],
  },

  {
    id: "prj-008",
    slug: "maison-uttara",
    name: "Maison Uttara",
    tagline: "A sophisticated address in Sector 4.",
    description:
      "Maison Uttara brings a limited collection of 40 residences to one of Uttara's established sectors. The project emphasizes calm interiors, natural materials and generous daylight, with a private residents' lounge and landscaped rooftop.",

    location: {
      area: "Uttara Sector 4",
      address: "Road 7, Sector 4, Uttara, Dhaka",
      lat: 23.862,
      lng: 90.396,
    },

    startingPrice: 12500000,

    images: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2400&q=85",
      "https://images.unsplash.com/photo-1600607688960-e095ff83135c?auto=format&fit=crop&w=2400&q=85",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=85",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=2400&q=85",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2400&q=85",
    ],

    towers: 1,
    totalUnits: 40,
    floors: 8,
    bedroomRange: "3 / 4 Bedroom",
    handoverLabel: "2026",
    salesPhone: "+8801777000007",

    unitTypes: [
      {
        id: "maison-a",
        name: "Maison 3A",
        areaSqft: 1510,
        bedrooms: 3,
        startingPrice: 12500000,
      },
      {
        id: "maison-b",
        name: "Maison 4A",
        areaSqft: 1920,
        bedrooms: 4,
        startingPrice: 15400000,
      },
    ],

    availability: [
      {
        floor: 8,
        units: [
          { unitId: "8-A", status: "available" },
          { unitId: "8-B", status: "sold" },
        ],
      },
      {
        floor: 7,
        units: [
          { unitId: "7-A", status: "available" },
          { unitId: "7-B", status: "reserved" },
        ],
      },
    ],

    floorPlans: [
      {
        id: "maison-fp1",
        name: "3 Bedroom — Maison",
        bedrooms: 3,
        areaSqft: 1510,
        image:
          "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=85",
      },
      {
        id: "maison-fp2",
        name: "4 Bedroom — Grand Maison",
        bedrooms: 4,
        areaSqft: 1920,
        image:
          "https://images.unsplash.com/photo-1600607688960-e095ff83135c?auto=format&fit=crop&w=1800&q=85",
      },
    ],

    amenities: [
      { label: "Residents' lounge", icon: "lounge" },
      { label: "Rooftop garden", icon: "garden" },
      { label: "Fitness studio", icon: "gym" },
      { label: "CCTV security", icon: "security" },
      { label: "Covered parking", icon: "parking" },
    ],

    constructionProgress: 88,

    milestones: [
      { label: "Foundation", month: "Jan", complete: true },
      { label: "Structure", month: "Apr", complete: true },
      { label: "Brickwork", month: "Jul", complete: true },
      { label: "Finishing", month: "Oct", complete: false },
    ],

    paymentPlan: [
      { label: "Booking", percentage: 10 },
      { label: "Agreement", percentage: 20 },
      { label: "Construction", percentage: 40 },
      { label: "Handover", percentage: 30 },
    ],

    faqs: [
      {
        question: "How many residences are planned?",
        answer:
          "Maison Uttara contains 40 residences within a single eight-storey residential building.",
      },
      {
        question: "Are larger four-bedroom homes available?",
        answer:
          "Yes. Four-bedroom residences are approximately 1,920 square feet.",
      },
    ],
  },

  {
    id: "prj-009",
    slug: "the-arcadia-bashundhara",
    name: "The Arcadia",
    tagline: "Contemporary family living in Bashundhara.",
    description:
      "The Arcadia is a 144-residence development designed around modern family life in Bashundhara R/A. The project includes multiple recreational spaces, landscaped areas and a selection of two, three and four-bedroom layouts.",

    location: {
      area: "Bashundhara R/A",
      address: "Road 6, Bashundhara R/A, Dhaka",
      lat: 23.8195,
      lng: 90.4288,
    },

    startingPrice: 7900000,

    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=2400&q=85",
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=2400&q=85",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2400&q=85",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85",
      "https://images.unsplash.com/photo-1600566753051-f0b89df2dd90?auto=format&fit=crop&w=2400&q=85",
    ],

    towers: 2,
    totalUnits: 144,
    floors: 15,
    bedroomRange: "2 / 3 / 4 Bedroom",
    handoverLabel: "2028",
    salesPhone: "+8801788000008",

    unitTypes: [
      {
        id: "arcadia-a",
        name: "Arcadia 2A",
        areaSqft: 1120,
        bedrooms: 2,
        startingPrice: 7900000,
      },
      {
        id: "arcadia-b",
        name: "Arcadia 3A",
        areaSqft: 1490,
        bedrooms: 3,
        startingPrice: 9800000,
      },
      {
        id: "arcadia-c",
        name: "Arcadia 4A",
        areaSqft: 1880,
        bedrooms: 4,
        startingPrice: 12500000,
      },
    ],

    availability: [
      {
        floor: 15,
        units: [
          { unitId: "15-A", status: "available" },
          { unitId: "15-B", status: "available" },
          { unitId: "15-C", status: "reserved" },
        ],
      },
      {
        floor: 14,
        units: [
          { unitId: "14-A", status: "sold" },
          { unitId: "14-B", status: "available" },
          { unitId: "14-C", status: "available" },
        ],
      },
      {
        floor: 13,
        units: [
          { unitId: "13-A", status: "available" },
          { unitId: "13-B", status: "sold" },
          { unitId: "13-C", status: "sold" },
        ],
      },
    ],

    floorPlans: [
      {
        id: "arcadia-fp1",
        name: "2 Bedroom — Urban",
        bedrooms: 2,
        areaSqft: 1120,
        image:
          "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1800&q=85",
      },
      {
        id: "arcadia-fp2",
        name: "3 Bedroom — Family",
        bedrooms: 3,
        areaSqft: 1490,
        image:
          "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=85",
      },
      {
        id: "arcadia-fp3",
        name: "4 Bedroom — Grand",
        bedrooms: 4,
        areaSqft: 1880,
        image:
          "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1800&q=85",
      },
    ],

    amenities: [
      { label: "Swimming pool", icon: "pool" },
      { label: "Kids' play zone", icon: "play" },
      { label: "Club lounge", icon: "lounge" },
      { label: "Modern gym", icon: "gym" },
      { label: "Landscaped courtyard", icon: "garden" },
    ],

    constructionProgress: 29,

    milestones: [
      { label: "Foundation", month: "Jun", complete: true },
      { label: "Structure", month: "Oct", complete: false },
      { label: "Brickwork", month: "Feb", complete: false },
      { label: "Finishing", month: "Aug", complete: false },
    ],

    paymentPlan: [
      { label: "Booking", percentage: 10 },
      { label: "Agreement", percentage: 15 },
      { label: "Construction", percentage: 45 },
      { label: "Handover", percentage: 30 },
    ],

    faqs: [
      {
        question: "What unit sizes are available?",
        answer:
          "The Arcadia offers approximately 1,120, 1,490 and 1,880 square-foot layouts.",
      },
      {
        question: "Does the project have recreational facilities?",
        answer:
          "Yes. Planned facilities include a swimming pool, gym, club lounge, children's play zone and landscaped courtyard.",
      },
    ],
  },

  {
    id: "prj-010",
    slug: "meridian-residences",
    name: "Meridian Residences",
    tagline: "Elevated city living in Mohammadpur.",
    description:
      "Meridian Residences offers 72 contemporary homes in a well-connected Mohammadpur neighborhood. Designed with efficient circulation, generous living areas and practical family amenities, the development brings a polished residential experience to an established part of Dhaka.",

    location: {
      area: "Mohammadpur",
      address: "Ring Road, Mohammadpur, Dhaka",
      lat: 23.7639,
      lng: 90.3584,
    },

    startingPrice: 6500000,

    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=85",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2400&q=85",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=2400&q=85",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85",
      "https://images.unsplash.com/photo-1600607688960-e095ff83135c?auto=format&fit=crop&w=2400&q=85",
    ],

    towers: 1,
    totalUnits: 72,
    floors: 11,
    bedroomRange: "2 / 3 Bedroom",
    handoverLabel: "2027",
    salesPhone: "+8801799000009",

    unitTypes: [
      {
        id: "meridian-a",
        name: "Meridian 2A",
        areaSqft: 980,
        bedrooms: 2,
        startingPrice: 6500000,
      },
      {
        id: "meridian-b",
        name: "Meridian 3A",
        areaSqft: 1320,
        bedrooms: 3,
        startingPrice: 8200000,
      },
    ],

    availability: [
      {
        floor: 11,
        units: [
          { unitId: "11-A", status: "available" },
          { unitId: "11-B", status: "available" },
        ],
      },
      {
        floor: 10,
        units: [
          { unitId: "10-A", status: "reserved" },
          { unitId: "10-B", status: "sold" },
        ],
      },
      {
        floor: 9,
        units: [
          { unitId: "9-A", status: "available" },
          { unitId: "9-B", status: "available" },
        ],
      },
    ],

    floorPlans: [
      {
        id: "meridian-fp1",
        name: "2 Bedroom — Essential",
        bedrooms: 2,
        areaSqft: 980,
        image:
          "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1800&q=85",
      },
      {
        id: "meridian-fp2",
        name: "3 Bedroom — Signature",
        bedrooms: 3,
        areaSqft: 1320,
        image:
          "https://images.unsplash.com/photo-1600607688960-e095ff83135c?auto=format&fit=crop&w=1800&q=85",
      },
    ],

    amenities: [
      { label: "Rooftop garden", icon: "garden" },
      { label: "Fitness room", icon: "gym" },
      { label: "Community lounge", icon: "lounge" },
      { label: "24/7 security", icon: "security" },
      { label: "Basement parking", icon: "parking" },
    ],

    constructionProgress: 67,

    milestones: [
      { label: "Foundation", month: "Jan", complete: true },
      { label: "Structure", month: "May", complete: true },
      { label: "Brickwork", month: "Sep", complete: true },
      { label: "Finishing", month: "Jan", complete: false },
    ],

    paymentPlan: [
      { label: "Booking", percentage: 10 },
      { label: "Agreement", percentage: 20 },
      { label: "Construction", percentage: 40 },
      { label: "Handover", percentage: 30 },
    ],

    faqs: [
      {
        question: "What is the starting price?",
        answer:
          "Current two-bedroom residences start from approximately BDT 65 lakh, subject to floor and unit selection.",
      },
      {
        question: "What facilities are included?",
        answer:
          "Residents will have access to a rooftop garden, fitness room, community lounge, secure parking and 24/7 security.",
      },
      {
        question: "When is handover expected?",
        answer:
          "The current projected handover timeline is 2027.",
      },
    ],
  },
];