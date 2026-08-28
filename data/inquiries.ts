import type { Inquiry } from "@/types/inquiry";

export const inquiries: Inquiry[] = [
  { id: "inq-001", propertyId: "prp-001", agentId: "agt-001", customerName: "Tanvir Hasan", customerPhone: "01711000001", message: "Is this still available? Can I visit this weekend?", status: "New", priority: "High", source: "Facebook", createdAt: "2026-08-21" },
  { id: "inq-002", propertyId: "prp-004", agentId: "agt-002", customerName: "Farzana Akter", customerPhone: "01811000002", message: "What's the minimum lease term?", status: "Contacted", priority: "Medium", source: "Website", createdAt: "2026-08-20" },
  { id: "inq-003", propertyId: "prp-007", agentId: "agt-001", customerName: "James Whitfield", customerPhone: "01911000003", message: "Is the penthouse furnished? Need it for embassy staff.", status: "Site Visit Scheduled", priority: "High", source: "Referral", createdAt: "2026-08-19" },
  { id: "inq-004", propertyId: "prp-002", agentId: "agt-001", customerName: "Rafiq Islam", customerPhone: "01611000004", message: "Can the price be negotiated?", status: "New", priority: "Medium", source: "WhatsApp", createdAt: "2026-08-21" },
  { id: "inq-005", propertyId: "prp-016", agentId: "agt-003", customerName: "Nasima Begum", customerPhone: "01511000005", message: "Looking for something with rooftop access, this looks perfect.", status: "Contacted", priority: "High", source: "Website", createdAt: "2026-08-18" },
  { id: "inq-006", propertyId: "prp-003", agentId: "agt-003", customerName: "Kamrul Hasan", customerPhone: "01711000006", message: "Is parking included?", status: "Closed", priority: "Low", source: "Facebook", createdAt: "2026-08-10" },
  { id: "inq-007", propertyId: "prp-009", agentId: "agt-001", customerName: "Shirin Sultana", customerPhone: "01811000007", message: "Interested for a boutique. What's the frontage width?", status: "New", priority: "Medium", source: "Walk-in", createdAt: "2026-08-22" },
  { id: "inq-008", propertyId: "prp-005", agentId: "agt-003", customerName: "Mahin Chowdhury", customerPhone: "01911000008", message: "First-time buyer, need financing guidance.", status: "Contacted", priority: "Medium", source: "Website", createdAt: "2026-08-17" },
  { id: "inq-009", propertyId: "prp-012", agentId: "agt-001", customerName: "Ayesha Siddika", customerPhone: "01611000009", message: "Can I bring a pet?", status: "New", priority: "Low", source: "WhatsApp", createdAt: "2026-08-22" },
  { id: "inq-010", propertyId: "prp-014", agentId: "agt-004", customerName: "Delwar Hossain", customerPhone: "01511000010", message: "Need it move-in ready by next month.", status: "Site Visit Scheduled", priority: "High", source: "Referral", createdAt: "2026-08-15" },
  { id: "inq-011", propertyId: "prp-010", agentId: "agt-004", customerName: "Rima Aktar", customerPhone: "01711000011", message: "Is the flat vacant now?", status: "Closed", priority: "Low", source: "Facebook", createdAt: "2026-08-05" },
  { id: "inq-012", propertyId: "prp-008", agentId: "agt-003", customerName: "Habibur Rahman", customerPhone: "01811000012", message: "Is the gas line connection confirmed?", status: "New", priority: "Medium", source: "Website", createdAt: "2026-08-21" },
];
