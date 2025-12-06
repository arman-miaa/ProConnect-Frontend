/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { getAllOrders } from "@/services/order/order.service";
import OrderCard from "@/components/modules/orders/OrderCard";
import { getUserInfo } from "@/services/auth/getUserInfo";

export default function OrderPageClient() {
  const [orders, setOrders] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      const u = await getUserInfo();
      setUser(u);
      const o = await getAllOrders();
      setOrders(o);
    }
    fetchData();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-6">
      {orders?.map((order: any) => (
        <OrderCard key={order._id} order={order} role={user.role} />
      ))}
    </div>
  );
}
