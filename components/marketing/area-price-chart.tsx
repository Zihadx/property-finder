"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { formatBDT } from "@/lib/utils";

/**
 * Same visual convention as the dashboard's ListingsByAreaChart (CSS-var
 * theming, horizontal bars) — this is the public-facing counterpart, so it
 * should read as part of the same design system, not a different chart style.
 */
export function AreaPriceChart({ data }: { data: { area: string; pricePerSqft: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} layout="vertical" margin={{ top: 4, right: 16, left: 8, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
        <XAxis
          type="number"
          tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(value: number) => formatBDT(value)}
        />
        <YAxis
          type="category"
          dataKey="area"
          tick={{ fontSize: 12, fill: "var(--foreground)" }}
          axisLine={false}
          tickLine={false}
          width={90}
        />
        <Tooltip
          cursor={{ fill: "var(--surface-muted)" }}
          formatter={(value) => [`${formatBDT(Number(value))}/sqft`, "Avg. price"]}
          contentStyle={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-sm)",
            fontSize: 12,
          }}
        />
        <Bar dataKey="pricePerSqft" fill="var(--accent)" radius={[0, 3, 3, 0]} barSize={14} />
      </BarChart>
    </ResponsiveContainer>
  );
}
