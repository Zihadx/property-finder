export type InquiryStatus = "New" | "Contacted" | "Site Visit Scheduled" | "Closed";
export type InquiryPriority = "Low" | "Medium" | "High";
export type LeadSource = "Website" | "Facebook" | "WhatsApp" | "Referral" | "Walk-in";

export interface Inquiry {
  id: string;
  propertyId: string;
  agentId: string;
  customerName: string;
  customerPhone: string;
  message: string;
  status: InquiryStatus;
  priority: InquiryPriority;
  source: LeadSource;
  createdAt: string; // ISO date
}

export interface SiteVisit {
  id: string;
  propertyId: string;
  agentId: string;
  customerName: string;
  customerPhone: string;
  scheduledAt: string; // ISO date
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
}
