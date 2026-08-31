import { inquiries } from "@/data/inquiries";
import type { Inquiry } from "@/types/inquiry";

export const inquiryService = {
  async list(): Promise<Inquiry[]> {
    return [...inquiries].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },
  async getRecent(limit = 5): Promise<Inquiry[]> {
    return (await this.list()).slice(0, limit);
  },
  async getByStatus(status: Inquiry["status"]): Promise<Inquiry[]> {
    return inquiries.filter((i) => i.status === status);
  },
  /**
   * Mock "backend": pushes directly into the in-memory array that list()/
   * getByStatus() read from, so a submission from the public inquiry form
   * actually shows up in /dashboard/leads on the next load — not just a
   * toast that goes nowhere. A real API would replace this one function
   * without touching InquiryDialog or the leads page.
   */
  async create(input: {
    propertyId: string;
    agentId: string;
    customerName: string;
    customerPhone: string;
    message: string;
  }): Promise<Inquiry> {
    const inquiry: Inquiry = {
      id: `inq-${Date.now()}`,
      propertyId: input.propertyId,
      agentId: input.agentId,
      customerName: input.customerName,
      customerPhone: input.customerPhone,
      message: input.message || "No message provided.",
      status: "New",
      priority: "Medium",
      source: "Website",
      createdAt: new Date().toISOString().slice(0, 10),
    };
    inquiries.unshift(inquiry);
    return inquiry;
  },
};
