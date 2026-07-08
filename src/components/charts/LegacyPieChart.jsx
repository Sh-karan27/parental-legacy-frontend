import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const COLORS = { Mother: "#2563EB", Father: "#10B981" };

export default function LegacyPieChart({ data, height = 300 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={70} outerRadius={100} paddingAngle={2}>
          {data.map((entry) => (
            <Cell key={entry.name} fill={COLORS[entry.name] || "#94A3B8"} />
          ))}
        </Pie>
        <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #E2E8F0", fontSize: 12 }} />
        <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: 12, color: "#334155" }} />
      </PieChart>
    </ResponsiveContainer>
  );
}
