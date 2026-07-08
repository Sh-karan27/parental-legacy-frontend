import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function LegacyPieChart({ mother, father, height = 300 }) {
  const data = [
    { name: "Mother", value: mother },
    { name: "Father", value: father },
  ];
  const colors = ["#2563EB", "#10B981"];

  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={70}
          outerRadius={100}
          paddingAngle={2}
        >
          {data.map((entry, i) => (
            <Cell key={entry.name} fill={colors[i]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ borderRadius: 10, border: "1px solid #E2E8F0", fontSize: 12 }}
        />
        <Legend
          verticalAlign="bottom"
          iconType="circle"
          wrapperStyle={{ fontSize: 12, color: "#334155" }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
