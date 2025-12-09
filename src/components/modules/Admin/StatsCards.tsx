"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  Store,
  ShoppingCart,
  DollarSign,
  CreditCard,
  TrendingUp,
  UserCheck,
  Briefcase,
} from "lucide-react";

interface StatsCardsProps {
  stats: {
    totalUsers: number;
    totalSellers: number;
    totalClients: number;
    totalAdmins: number;
    totalServices: number;
    totalOrders: number;
    successfulPayments: number;
    totalRevenue: number;
    totalCommission: number;
  };
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-500/10 to-teal-500/10",
    },
    {
      title: "Platform Commission",
      value: `$${stats.totalCommission.toLocaleString()}`,
      icon: TrendingUp,
      gradient: "from-violet-500 to-purple-500",
      bgGradient: "from-violet-500/10 to-purple-500/10",
    },
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-500/10 to-cyan-500/10",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: ShoppingCart,
      gradient: "from-orange-500 to-amber-500",
      bgGradient: "from-orange-500/10 to-amber-500/10",
    },
    {
      title: "Active Sellers",
      value: stats.totalSellers,
      icon: UserCheck,
      gradient: "from-pink-500 to-rose-500",
      bgGradient: "from-pink-500/10 to-rose-500/10",
    },
    {
      title: "Total Clients",
      value: stats.totalClients,
      icon: Briefcase,
      gradient: "from-indigo-500 to-blue-500",
      bgGradient: "from-indigo-500/10 to-blue-500/10",
    },
    {
      title: "Active Services",
      value: stats.totalServices,
      icon: Store,
      gradient: "from-cyan-500 to-teal-500",
      bgGradient: "from-cyan-500/10 to-teal-500/10",
    },
    {
      title: "Successful Payments",
      value: stats.successfulPayments,
      icon: CreditCard,
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-500/10 to-emerald-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <Card
          key={card.title}
          className="relative overflow-hidden border-border/50 bg-card hover:shadow-lg transition-all duration-300 group"
        >
          <div
            className={`absolute inset-0 bg-linear-to-br ${card.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
          />
          <CardContent className="p-6 relative">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {card.value}
                </p>
              </div>
              <div
                className={`h-12 w-12 rounded-xl bg-linear-to-br ${card.gradient} flex items-center justify-center shadow-lg`}
              >
                <card.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
