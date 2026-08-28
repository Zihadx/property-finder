"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const colors: Record<string, string> = {
  Available: "var(--secondary)",
  Sold: "var(--danger)",
  Rented: "var(--muted-foreground)",
  "Under Offer": "var(--accent)",
};

export function StatusDonutChart({ data }: { data: { name: string; value: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={55} outerRadius={80} paddingAngle={2}>
          {data.map((entry) => (
            <Cell key={entry.name} fill={colors[entry.name] ?? "var(--border-strong)"} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-sm)",
            fontSize: 12,
          }}
        />
        <Legend
          verticalAlign="bottom"
          height={32}
          formatter={(value) => <span style={{ fontSize: 12, color: "var(--muted-foreground)" }}>{value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
