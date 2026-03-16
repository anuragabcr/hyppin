"use client";

import { returnsChart } from "@/app/constants/data/dashboardData";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#2563eb", "#facc15"];

export default function ReturnsChart() {
  return (
    <ResponsiveContainer width="100%" height={120}>
      <PieChart>
        <Pie
          data={returnsChart}
          innerRadius={35}
          outerRadius={50}
          dataKey="value"
        >
          {returnsChart.map((entry, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
