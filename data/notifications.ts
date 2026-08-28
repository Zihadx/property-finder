export interface Notification {
  id: string;
  type: "inquiry" | "site-visit" | "listing" | "system";
  title: string;
  description: string;
  createdAt: string;
  read: boolean;
}

export const notifications: Notification[] = [
  { id: "ntf-001", type: "inquiry", title: "New inquiry received", description: "Tanvir Hasan asked about Riverview Residency, Gulshan 2.", createdAt: "2026-08-22T09:15:00", read: false },
  { id: "ntf-002", type: "site-visit", title: "Site visit confirmed", description: "James Whitfield confirmed a visit for the Baridhara Penthouse.", createdAt: "2026-08-22T08:40:00", read: false },
  { id: "ntf-003", type: "listing", title: "Listing performing well", description: "Luxury Flat, Block J received 3x more views than average this week.", createdAt: "2026-08-21T18:05:00", read: true },
  { id: "ntf-004", type: "inquiry", title: "New inquiry received", description: "Shirin Sultana asked about the Gulshan Avenue commercial space.", createdAt: "2026-08-21T14:22:00", read: true },
  { id: "ntf-005", type: "system", title: "Weekly summary ready", description: "Your agency's weekly performance summary is ready to view.", createdAt: "2026-08-20T07:00:00", read: true },
  { id: "ntf-006", type: "site-visit", title: "Site visit request pending", description: "Delwar Hossain requested a visit for the Banasree office.", createdAt: "2026-08-19T16:50:00", read: true },
];
