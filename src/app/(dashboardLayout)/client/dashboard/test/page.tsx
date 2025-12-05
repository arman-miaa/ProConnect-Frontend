/* eslint-disable @typescript-eslint/no-explicit-any */
import OrderCard from "@/components/modules/orders/OrderCard";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { getAllOrders } from "@/services/order/order.service";


export default async function OrderPage() {
  const orders = await getAllOrders();
  const user = await getUserInfo()
  console.log(user);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-6">
      {orders?.map((order: any) => (
        <OrderCard key={order._id} order={order} role={user.role} />
      ))}
    </div>
  );
}
