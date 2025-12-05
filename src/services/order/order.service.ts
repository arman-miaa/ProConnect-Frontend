/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";

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
