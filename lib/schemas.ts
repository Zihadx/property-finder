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
