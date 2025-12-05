/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { IService } from "@/types/service.interface";
import { getUserInfo } from "../auth/getUserInfo";

// 1️⃣ সমস্ত সার্ভিস fetch করা
export async function getAllServices(): Promise<IService[] | any> {
  try {
    const response = await serverFetch.get("/service", {
      cache: "no-store",
      next: { tags: ["services"] },
    });
    const result = await response.json();
    if (!result.success) throw new Error("Failed to fetch services");
    return result.data;
  } catch (error: any) {
    console.error("getAllServices error:", error);
    return [];
  }
}

// 2️⃣ নির্দিষ্ট সার্ভিস fetch করা
export async function getServiceById(
  serviceId: string
): Promise<IService | any> {
  try {
    const response = await serverFetch.get(`/service/${serviceId}`, {
      cache: "no-store",
    });
    const result = await response.json();
  
    if (!result.success) throw new Error("Service not found");
    return result.data;
  } catch (error: any) {
    console.error("getServiceById error:", error);
    return null;
  }
}

// 3️⃣ সার্ভিস create করা
export async function createService(payload: any): Promise<IService | any> {
  try {
    const user = await getUserInfo(); // user info নিতে পারবে
    const response = await serverFetch.post("/service", {
      body: JSON.stringify({ ...payload, sellerId: user.id }),
      headers: { "Content-Type": "application/json" },
    });
    const result = await response.json();
    if (!result.success) throw new Error("Failed to create service");
    return result.data;
  } catch (error: any) {
    console.error("createService error:", error);
    return null;
  }
}

// 4️⃣ সার্ভিস update করা
export async function updateService(
  serviceId: string,
  payload: any
): Promise<IService | any> {
  try {
    const response = await serverFetch.patch(`/service/${serviceId}`, {
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });
    const result = await response.json();
    if (!result.success) throw new Error("Failed to update service");
    return result.data;
  } catch (error: any) {
    console.error("updateService error:", error);
    return null;
  }
}

// 5️⃣ সার্ভিস delete করা
export async function deleteService(serviceId: string): Promise<boolean> {
  try {
    const response = await serverFetch.delete(`/service/${serviceId}`);
    const result = await response.json();
    if (!result.success) throw new Error("Failed to delete service");
    return true;
  } catch (error: any) {
    console.error("deleteService error:", error);
    return false;
  }
}
