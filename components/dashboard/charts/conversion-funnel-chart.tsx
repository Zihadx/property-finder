"use client";

import { FunnelChart, Funnel, Cell, LabelList, Tooltip, ResponsiveContainer } from "recharts";

const colors = ["var(--primary)", "var(--secondary)", "var(--accent)", "var(--border-strong)"];

export function ConversionFunnelChart({ data }: { data: { stage: string; value: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <FunnelChart>
        <Tooltip
          contentStyle={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-sm)",
            fontSize: 12,
          }}
        />
        <Funnel dataKey="value" data={data} isAnimationActive>
          {data.map((entry, index) => (
            <Cell key={entry.stage} fill={colors[index % colors.length]} />
          ))}
          <LabelList
            position="right"
            dataKey="stage"
            fill="var(--foreground)"
            stroke="none"
            fontSize={12}
          />
        </Funnel>
      </FunnelChart>
    </ResponsiveContainer>
  );
}
