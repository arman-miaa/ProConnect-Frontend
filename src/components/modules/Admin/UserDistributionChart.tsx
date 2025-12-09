"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface UserDistributionChartProps {
  stats: {
    totalSellers: number;
    totalClients: number;
    totalAdmins: number;
  };
}

export function UserDistributionChart({ stats }: UserDistributionChartProps) {
  const data = [
    { name: "Clients", value: stats.totalClients, color: "#3b82f6" }, // blue
    { name: "Sellers", value: stats.totalSellers, color: "#10b981" }, // green
    { name: "Admins", value: stats.totalAdmins, color: "#f59e0b" }, // amber
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="border-border/50 h-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          User Distribution
        </CardTitle>
        <CardDescription>Breakdown by user role</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                dataKey="value"
                paddingAngle={5}
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number, name: string) => [value, name]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 space-y-2">
          {data.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm">{item.name}</span>
              </div>
              <span className="text-sm font-medium">
                {item.value} ({Math.round((item.value / total) * 100)}%)
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
