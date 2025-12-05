/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { OrderData } from "@/types/orderTypes";

interface CreateOrderPayload {
  serviceId: string;
}

export async function createOrder(payload: CreateOrderPayload) {
  try {
    // serverFetch automatically includes credentials/cookies
    const response = await serverFetch.post("/order", {
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    if (!data.success) throw new Error(data.message || "Order creation failed");

    return data.data; // order data
  } catch (error: any) {
    console.error("createOrder error:", error);
    throw new Error(error.message || "Server error while creating order");
  }
}

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


export async function fetchOrderDetails(orderId: string): Promise<OrderData> {
  if (!orderId) {
    throw new Error("Order ID is required.");
  }

  try {
    // serverFetch automatically includes cookies from the request
    const response = await serverFetch.get(`/order/${orderId}`);

    const data = await response.json();

    if (response.status === 401) {
      throw new Error("Authentication Failed. Please login again.");
    }

    if (!data.success) {
      throw new Error(data.message || "Failed to retrieve order details.");
    }

    return data.data; // OrderData
  } catch (error: any) {
    console.error("fetchOrderDetails error:", error);
    // 401/403 এরর হলে ক্লায়েন্টকে সুস্পষ্ট মেসেজ দিন
    throw new Error(
      error.message || "Server error while fetching order details."
    );
  }
}