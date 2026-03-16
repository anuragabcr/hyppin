"use client";

import { ageChart } from "@/app/constants/data/dashboardData";
import { BarChart, Bar, XAxis, ResponsiveContainer } from "recharts";

export default function AgeChart() {
  return (
    <ResponsiveContainer width="100%" height={120}>
      <BarChart data={ageChart}>
        <XAxis dataKey="age" />
        <Bar dataKey="value" fill="#2563eb" />
      </BarChart>
    </ResponsiveContainer>
  );
}
