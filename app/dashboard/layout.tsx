import * as React from "react";

import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { DashboardTopbar } from "@/components/dashboard/dashboard-topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <DashboardSidebar />

      <div className="min-w-0 lg:pl-62">
        <DashboardTopbar />

        <main className="min-h-[calc(100vh-64px)] px-5 py-7 sm:px-7 lg:px-10 lg:py-9">
          <div className="mx-auto w-full max-w-[1600px]">{children}</div>
        </main>
      </div>
    </div>
  );
}