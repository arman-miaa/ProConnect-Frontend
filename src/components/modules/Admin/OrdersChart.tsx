"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface MonthlyOrder {
  month: string;
  completed: number;
  cancelled: number;
  refunded?: number;
  pending: number;
}

interface OrdersChartProps {
  monthlyOrders: MonthlyOrder[];
}

export function OrdersChart({ monthlyOrders }: OrdersChartProps) {
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

  const ordersData = months.map((m) => {
    const data = monthlyOrders.find((x) => x.month === m);
    

    return {
      month: m,
      completed: data?.completed || 0,
      cancelled: data?.cancelled || 0,
      pending: data?.pending || 0,
    };
  });

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle>Orders Analytics</CardTitle>
        <CardDescription>Order status breakdown by month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ordersData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="completed" fill="#10b981" />
              <Bar dataKey="pending" fill="#f59e0b" />
              <Bar dataKey="cancelled" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
