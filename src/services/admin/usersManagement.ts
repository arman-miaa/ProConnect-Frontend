/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { revalidateTag } from "next/cache";

// ----------------------------
// সব ইউজার
// ----------------------------
export async function getAllUsers(): Promise<any[]> {
  try {
    const response = await serverFetch.get("/user/all-users", {
      next: { tags: ["users"], revalidate: 0 },
    });

    const data = await response.json();
    if (!data.success) throw new Error(data.message || "Failed to fetch users");

    return data.data;
  } catch (error: any) {
    console.error("getAllUsers error:", error);
    return [];
  }
}

// ----------------------------
// Admin/Super Admin → Update User
// ----------------------------
export async function adminUpdateUser(id: string, payload: any) {
  try {
    const response = await serverFetch.patch(`/user/admin/update-user/${id}`, {
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    if (!data.success) throw new Error(data.message || "User update failed");

    revalidateTag("users", { expire: 0 });
    return data.data;
  } catch (error: any) {
    console.error("adminUpdateUser error:", error);
    throw new Error(error.message || "Server error while updating user");
  }
}
