import type { SiteVisit } from "@/types/inquiry";

export const siteVisits: SiteVisit[] = [
  { id: "vst-001", propertyId: "prp-007", agentId: "agt-001", customerName: "James Whitfield", customerPhone: "01911000003", scheduledAt: "2026-08-25T11:00:00", status: "Confirmed" },
  { id: "vst-002", propertyId: "prp-014", agentId: "agt-004", customerName: "Delwar Hossain", customerPhone: "01511000010", scheduledAt: "2026-08-24T15:30:00", status: "Pending" },
  { id: "vst-003", propertyId: "prp-001", agentId: "agt-001", customerName: "Tanvir Hasan", customerPhone: "01711000001", scheduledAt: "2026-08-24T10:00:00", status: "Pending" },
  { id: "vst-004", propertyId: "prp-016", agentId: "agt-003", customerName: "Nasima Begum", customerPhone: "01511000005", scheduledAt: "2026-08-23T16:00:00", status: "Confirmed" },
  { id: "vst-005", propertyId: "prp-006", agentId: "agt-004", customerName: "Older Buyer", customerPhone: "01611000099", scheduledAt: "2026-08-12T13:00:00", status: "Completed" },
];
