"use client";

import { salesChart } from "@/app/constants/data/dashboardData";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function SalesChart() {
  return (
    <ResponsiveContainer width="100%" height={120}>
      <AreaChart data={salesChart}>
        <XAxis dataKey="day" hide />
        <Tooltip />
        <Area type="monotone" dataKey="sales" stroke="#2563eb" fill="#bfdbfe" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
