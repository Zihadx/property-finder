"use client";

import * as React from "react";
import { MessagesSquare, CalendarClock, TrendingUp, Info, Bell } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { cn } from "@/lib/utils";
import { notifications as initialNotifications, type Notification } from "@/data/notifications";

const iconMap: Record<Notification["type"], React.ElementType> = {
  inquiry: MessagesSquare,
  "site-visit": CalendarClock,
  listing: TrendingUp,
  system: Info,
};

type Filter = "all" | "unread";

export default function NotificationsPage() {
  const [items, setItems] = React.useState(initialNotifications);
  const [filter, setFilter] = React.useState<Filter>("all");

  const visible = filter === "unread" ? items.filter((n) => !n.read) : items;
  const unreadCount = items.filter((n) => !n.read).length;

  function markAllRead() {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  function toggleRead(id: string) {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n)));
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="ledger-label mb-2">Activity</p>
          <h1 className="font-display text-2xl text-foreground">Notifications</h1>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={markAllRead}>
            Mark all as read
          </Button>
        )}
      </div>

      <div className="flex gap-2">
        <FilterButton active={filter === "all"} onClick={() => setFilter("all")}>
          All ({items.length})
        </FilterButton>
        <FilterButton active={filter === "unread"} onClick={() => setFilter("unread")}>
          Unread ({unreadCount})
        </FilterButton>
      </div>

      {visible.length === 0 ? (
        <EmptyState icon={Bell} title="You're all caught up" description="New activity will show up here." />
      ) : (
        <div className="flex flex-col gap-2">
          {visible.map((notification) => {
            const Icon = iconMap[notification.type];
            return (
              <Card
                key={notification.id}
                className={cn("flex items-start gap-3 p-4 cursor-pointer", !notification.read && "border-accent/40 bg-accent-soft/30")}
                onClick={() => toggleRead(notification.id)}
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-muted">
                  <Icon className="h-4 w-4 text-accent" strokeWidth={1.75} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-foreground">{notification.title}</p>
                    {!notification.read && <span className="h-2 w-2 shrink-0 rounded-full bg-accent" />}
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground">{notification.description}</p>
                  <p className="mt-1.5 text-xs text-caption-foreground">
                    {new Date(notification.createdAt).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

function FilterButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-[var(--radius-sm)] border px-3.5 py-1.5 text-sm transition-colors",
        active ? "border-primary bg-primary text-primary-foreground" : "border-border-strong text-muted-foreground hover:bg-surface-muted"
      )}
    >
      {children}
    </button>
  );
}
