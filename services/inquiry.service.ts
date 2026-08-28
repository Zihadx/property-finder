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
};
