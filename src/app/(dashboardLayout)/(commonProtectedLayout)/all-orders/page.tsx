/* eslint-disable @typescript-eslint/no-explicit-any */
import OrderCard from "@/components/modules/orders/OrderCard";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { getAllOrders } from "@/services/order/order.service";

export default async function OrderPage() {
  const orders = await getAllOrders();
  const user = await getUserInfo();
if (!orders || orders.length === 0) {
  return (
    <div className="text-center py-20">
      <h2 className="text-xl font-medium">You have no active orders.</h2>
      <p className="text-muted-foreground">
        Start exploring services to place your first order.
      </p>
    </div>
  );
}

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-6">
      {orders?.map((order: any) => (
        <OrderCard key={order._id} order={order} role={user.role} />
      ))}
    </div>
  );
}
