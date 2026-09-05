

export const siteConfig = {
  /* ==========================================================
   * BRAND
   * ========================================================== */

  brand: {
    name: "ListEasy BD",
    shortName: "ListEasy",
    legalName: "ListEasy BD Ltd.",

    tagline: "Find a place worth calling home.",
    description:
      "A modern real estate platform for discovering properties, projects and trusted property opportunities.",

    logo: {
      text: "ListEasy",
      mark: "LE",
    },

    /**
     * Used throughout the UI.
     *
     * Change these values to rebrand the project.
     */
    colors: {
      primary: "#2095AE",
      primaryForeground: "#FFFFFF",

      secondary: "#0F172A",
      secondaryForeground: "#FFFFFF",

      accent: "#2095AE",

      background: "#F7F7F5",
      foreground: "#111111",

      muted: "#F1F1EE",
      mutedForeground: "#6B6B68",

      border: "#E4E4DF",

      card: "#FFFFFF",
      cardForeground: "#111111",
    },

    /**
     * Tailwind-friendly class tokens.
     *
     * Useful when you want controlled design changes
     * without changing every component.
     */
    tokens: {
      radius: "rounded-none",

      button:
        "rounded-none",

      card:
        "border border-border/60",

      glass:
        "border border-white/10 bg-white/5 backdrop-blur-xl",
    },
  },

  /* ==========================================================
   * COMPANY
   * ========================================================== */

  company: {
    name: "ListEasy BD",
    legalName: "ListEasy BD Ltd.",

    email: "hello@listeasybd.com",
    supportEmail: "support@listeasybd.com",

    phone: "+880 1XXX-XXXXXX",
    salesPhone: "+880 1XXX-XXXXXX",

    address: {
      line1: "Gulshan Avenue",
      city: "Dhaka",
      country: "Bangladesh",
      postalCode: "1212",
    },

    hours: {
      weekdays: "9:00 AM – 7:00 PM",
      weekend: "10:00 AM – 5:00 PM",
    },
  },

  /* ==========================================================
   * SOCIAL
   * ========================================================== */

  social: {
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    linkedin: "https://linkedin.com/",
    youtube: "https://youtube.com/",
    whatsapp: "https://wa.me/",
  },

  /* ==========================================================
   * NAVIGATION
   * ========================================================== */

  navigation: [
    {
      label: "Properties",
      href: "/properties",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Discover",
      href: "/discover",
    },
    {
      label: "About",
      href: "/about",
    },
  ],

  /* ==========================================================
   * CTA
   * ========================================================== */

  cta: {
    primary: {
      label: "Explore properties",
      href: "/properties",
    },

    secondary: {
      label: "Talk to an advisor",
      href: "#site-visit",
    },

    contact: {
      label: "Get in touch",
      href: "/contact",
    },

    project: {
      label: "View project",
    },

    property: {
      label: "View property",
    },

    enquiry: {
      label: "Make an enquiry",
    },
  },

  /* ==========================================================
   * SEO
   * ========================================================== */

  seo: {
    title: "ListEasy BD — Find a place worth calling home.",

    description:
      "Discover premium properties and residential projects across Bangladesh with ListEasy BD.",

    keywords: [
      "real estate Bangladesh",
      "property Bangladesh",
      "Dhaka property",
      "apartments Dhaka",
      "real estate Dhaka",
      "residential projects Bangladesh",
    ],

    ogImage: "/og-image.jpg",

    twitterHandle: "@listeasybd",
  },

  /* ==========================================================
   * BUSINESS SETTINGS
   * ========================================================== */

  business: {
    currency: "BDT",
    currencySymbol: "৳",

    locale: "en-BD",

    country: "Bangladesh",

    defaultCity: "Dhaka",

    propertyUnit: "sq ft",

    phonePrefix: "+880",
  },

  /* ==========================================================
   * FOOTER
   * ========================================================== */

  footer: {
    description:
      "A smarter way to discover properties, residential projects and places to call home.",

    copyright:
      "© 2026 ListEasy BD. All rights reserved.",

    links: {
      company: [
        {
          label: "About",
          href: "/about",
        },
        {
          label: "Projects",
          href: "/projects",
        },
        {
          label: "Properties",
          href: "/properties",
        },
        {
          label: "Contact",
          href: "/contact",
        },
      ],

      resources: [
        {
          label: "Guides",
          href: "/guides",
        },
        {
          label: "FAQ",
          href: "/faq",
        },
        {
          label: "Privacy",
          href: "/privacy",
        },
        {
          label: "Terms",
          href: "/terms",
        },
      ],
    },
  },
} as const;

export type SiteConfig = typeof siteConfig;