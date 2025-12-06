/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { OrderData } from "@/types/orderTypes";
import { revalidateTag } from "next/cache";

interface CreateOrderPayload {
  serviceId: string;
}

// 🛒 Create order
export async function createOrder(payload: CreateOrderPayload) {
  try {
    const response = await serverFetch.post("/order", {
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.message || "Order creation failed");
    revalidateTag("order", { expire: 0 });
    return data.data;
  } catch (error: any) {
    console.error("createOrder error:", error);
    throw new Error(error.message || "Server error while creating order");
  }
}

// 💳 Initiate payment
export async function initiatePayment(orderId: string) {
  try {
    const response = await serverFetch.post(
      `/payment/init-payment/${orderId}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    if (!data.success || !data.data?.redirectGatewayURL)
      throw new Error(data.message || "Payment initiation failed");
    return data.data.redirectGatewayURL;
  } catch (error: any) {
    console.error("initiatePayment error:", error);
    throw new Error(error.message || "Server error while initiating payment");
  }
}

// 🔍 Fetch single order
export async function fetchOrderDetails(orderId: string): Promise<OrderData> {
  if (!orderId) throw new Error("Order ID is required.");
  try {
    const response = await serverFetch.get(`/order/${orderId}`);
    const data = await response.json();
    if (response.status === 401)
      throw new Error("Authentication Failed. Please login again.");
    if (!data.success)
      throw new Error(data.message || "Failed to retrieve order details.");
    return data.data;
  } catch (error: any) {
    console.error("fetchOrderDetails error:", error);
    throw new Error(
      error.message || "Server error while fetching order details."
    );
  }
}




export async function getAllOrders(): Promise<[] | any> {
  try {
    const response = await serverFetch.get("/order", {
      next: {
        tags: ["order"], 
        revalidate: 0, 
      },
    });
    const result = await response.json();
   
    if (!result.success) throw new Error("Failed to fetch order");
    return result.data;
  } catch (error: any) {
    console.error("getAllOrders error:", error);
    return [];
  }
}

export async function updateOrderStatus(
  orderId: string,
  newStatus: string
): Promise<any> {
  try {
    const response = await serverFetch.patch(`/order/${orderId}`, {
      body: JSON.stringify({ orderStatus: newStatus }),
      headers: { "Content-Type": "application/json" },
    });

    const result = await response.json();

    // ❌ Backend success=false handle করা
    if (!result.success) {
      throw new Error(result.message || "Failed to update order status");
    }

    // ✅ UI refresh
    revalidateTag("order", { expire: 0 });

    return result.data;
  } catch (error: any) {
    // ❌ throw করে StatusModal.catch block এ যাবে
    throw new Error(
      error.message || "Server error while updating order status"
    );
  }
}
