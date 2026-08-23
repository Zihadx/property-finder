export interface Agent {
  id: string;
  slug: string;
  name: string;
  position: string;
  photo: string;
  phone: string;
  whatsapp: string;
  email: string;
  areasServed: string[];
  experienceYears: number;
  responseTime: string; // e.g. "Usually responds within 1 hour"
  bio: string;
}
