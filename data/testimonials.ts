
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
 * Customer stories.
 *
 * Images use Unsplash's source endpoint with property-focused search terms
 * so each story receives a relevant architectural/interior image.
 */
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    customerName: "Farhana Akter",
    area: "Dhanmondi",
    quote:
      "I'd spent three weeks messaging different pages on Facebook with nothing solid to show for it.",
    outcome:
      "Filtered by budget and area, shortlisted two Dhanmondi apartments the same evening, and visited both within two days.",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
    propertyLabel: "Apartment search in Dhanmondi",
  },
  {
    id: "t2",
    customerName: "Tanvir Ahmed",
    area: "Banani",
    quote:
      "Every listing I'd seen for this budget in Banani turned out to already be taken by the time I called.",
    outcome:
      "Saw the listing marked Available before reaching out, and the agent confirmed it hadn't changed in the minutes since.",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85",
    propertyLabel: "Duplex search in Banani",
  },
  {
    id: "t3",
    customerName: "Nusrat Jahan",
    area: "Uttara",
    quote:
      "I wanted to compare a few places side by side, not remember details from five different phone calls.",
    outcome:
      "Shortlisted three apartments in Sector 11, compared them on one screen, and picked the one with better light.",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
    propertyLabel: "Apartment search in Uttara",
  },
  {
    id: "t4",
    customerName: "Imran Kabir",
    area: "Gulshan",
    quote:
      "Finding commercial space usually means going through brokers who don't talk to each other.",
    outcome:
      "Reached the listing agent directly through the page and had a site visit booked within the day.",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=85",
    propertyLabel: "Commercial space search in Gulshan",
  },
];

