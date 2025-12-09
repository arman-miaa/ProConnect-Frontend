/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { TrendingUp } from "lucide-react";

interface RevenueChartProps {
  stats: {
    monthlyStats: {
      month: string;
      revenue: number;
      commission: number;
    }[];
  };
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card p-3 rounded-lg shadow-lg border border-border">
        <p className="text-sm font-medium mb-1">{label}</p>
        {payload.map((entry: any) => (
          <div key={entry.dataKey} className="flex items-center gap-2 text-sm">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="capitalize">{entry.dataKey}</span>
            <span className="font-semibold">
              ${entry.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function RevenueChart({ stats }: RevenueChartProps) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const revenueData = months.map((m) => {
    const realData = stats.monthlyStats?.find((x) => x.month === m);

    return {
      month: m,
      revenue: realData?.revenue ?? 0,
      commission: realData?.commission ?? 0,
    };
  });

  return (
    <Card className="border-border/50 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <CardTitle className="text-lg font-semibold">
            Revenue Overview
          </CardTitle>
          <CardDescription>
            Monthly revenue and commission trends
          </CardDescription>
        </div>
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-sm text-muted-foreground">Revenue</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-violet-500" />
            <span className="text-sm text-muted-foreground">Commission</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-emerald-500 font-medium">
          <TrendingUp className="h-4 w-4" />
          <span className="bg-emerald-100 px-2 py-0.5 rounded-full">
            +23.5%
          </span>
        </div>
      </CardHeader>

      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={revenueData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id="revenueGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient
                  id="commissionGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(v) => `$${v}`} />
              <Tooltip content={<CustomTooltip />} />

              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#10b981"
                fill="url(#revenueGradient)"
                strokeWidth={2}
              />

              <Area
                type="monotone"
                dataKey="commission"
                stroke="#8b5cf6"
                fill="url(#commissionGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>


      </CardContent>
    </Card>
  );
}
