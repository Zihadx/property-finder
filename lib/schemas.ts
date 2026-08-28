import { z } from "zod";

export const inquirySchema = z.object({
  name: z.string().trim().min(2, "Enter your full name"),
  phone: z
    .string()
    .trim()
    .regex(/^(\+?880|0)1[3-9]\d{8}$/, "Enter a valid Bangladeshi phone number"),
  message: z.string().trim().max(500, "Keep your message under 500 characters").optional(),
});

export type InquiryFormValues = z.infer<typeof inquirySchema>;

export const siteVisitSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name"),
  phone: z
    .string()
    .trim()
    .regex(/^(\+?880|0)1[3-9]\d{8}$/, "Enter a valid Bangladeshi phone number"),
  preferredDate: z.string().min(1, "Choose a preferred date"),
  preferredTime: z.enum(["Morning", "Afternoon", "Evening"]),
});

export type SiteVisitFormValues = z.infer<typeof siteVisitSchema>;

export const propertyFormSchema = z.object({
  title: z.string().trim().min(5, "Enter a descriptive title"),
  type: z.string().min(1, "Select a property type"),
  purpose: z.enum(["Sale", "Rent"]),
  status: z.enum(["Available", "Sold", "Rented", "Under Offer"]),
  price: z.number({ error: "Enter a valid price" }).positive("Enter a valid price"),
  area: z.string().min(1, "Select an area"),
  address: z.string().trim().min(5, "Enter a full address"),
  bedrooms: z.number().min(0),
  bathrooms: z.number().min(0),
  areaSqft: z.number({ error: "Enter the area in sqft" }).positive("Enter the area in sqft"),
  agentId: z.string().min(1, "Assign an agent"),
  amenities: z.string().optional(),
  description: z.string().trim().min(20, "Add at least a short description"),
  featured: z.boolean().optional(),
});

export type PropertyFormValues = z.infer<typeof propertyFormSchema>;
