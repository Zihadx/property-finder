export interface Testimonial {
  id: string;
  customerName: string;
  area: string;
  quote: string;
  outcome: string;
  image: string;
  propertyLabel: string;
}

/**
 * Placeholder customer stories — swap for real ones before launch. Each
 * `outcome` describes the search process only (time-to-shortlist, number
 * of visits, response time), never a business metric like revenue or a
 * customer count, since this dataset has no real numbers to back that up.
 * Images are distinct picsum placeholders (same convention as
 * data/properties.ts) rather than reusing an actual listing photo that
 * already appears elsewhere on the page.
 */
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    customerName: "Farhana Akter",
    area: "Dhanmondi",
    quote: "I'd spent three weeks messaging different pages on Facebook with nothing solid to show for it.",
    outcome:
      "Filtered by budget and area, shortlisted two Dhanmondi apartments the same evening, and visited both within two days.",
    image: "https://picsum.photos/seed/story-dhanmondi/1200/900",
    propertyLabel: "Apartment search in Dhanmondi",
  },
  {
    id: "t2",
    customerName: "Tanvir Ahmed",
    area: "Banani",
    quote: "Every listing I'd seen for this budget in Banani turned out to already be taken by the time I called.",
    outcome:
      "Saw the listing marked Available before reaching out, and the agent confirmed it hadn't changed in the minutes since.",
    image: "https://picsum.photos/seed/story-banani/1200/900",
    propertyLabel: "Duplex search in Banani",
  },
  {
    id: "t3",
    customerName: "Nusrat Jahan",
    area: "Uttara",
    quote: "I wanted to compare a few places side by side, not remember details from five different phone calls.",
    outcome: "Shortlisted three apartments in Sector 11, compared them on one screen, and picked the one with better light.",
    image: "https://picsum.photos/seed/story-uttara/1200/900",
    propertyLabel: "Apartment search in Uttara",
  },
  {
    id: "t4",
    customerName: "Imran Kabir",
    area: "Gulshan",
    quote: "Finding commercial space usually means going through brokers who don't talk to each other.",
    outcome: "Reached the listing agent directly through the page and had a site visit booked within the day.",
    image: "https://picsum.photos/seed/story-gulshan/1200/900",
    propertyLabel: "Commercial space search in Gulshan",
  },
];
