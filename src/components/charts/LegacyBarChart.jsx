import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function LegacyBarChart({ data, height = 300 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke="#F1F5F9" />
        <XAxis
          dataKey="factor"
          tick={{ fontSize: 11, fill: "#64748B" }}
          axisLine={{ stroke: "#E2E8F0" }}
          tickLine={false}
          interval={0}
          angle={-20}
          textAnchor="end"
          height={60}
        />
        <YAxis tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{ borderRadius: 10, border: "1px solid #E2E8F0", fontSize: 12 }}
        />
        <Bar dataKey="mother" fill="#2563EB" radius={[4, 4, 0, 0]} />
        <Bar dataKey="father" fill="#10B981" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
