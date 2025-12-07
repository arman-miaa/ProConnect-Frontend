/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { revalidateTag } from "next/cache";

// ----------------------------
// ১️⃣ Create Admin
// ----------------------------
export async function createAdmin(payload: any) {
  try {
    const response = await serverFetch.post("/user/create-admin", {
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    if (!data.success) throw new Error(data.message || "Admin creation failed");

    revalidateTag("admins", { expire: 0 });
    return data.data;
  } catch (error: any) {
    console.error("createAdmin error:", error);
    throw new Error(error.message || "Server error while creating admin");
  }
}

// ----------------------------
// ২️⃣ Get all Admins
// ----------------------------
export async function getAllAdmins(): Promise<any[]> {
  try {
    const response = await serverFetch.get("/user/all-admins", {
      next: { tags: ["admins"], revalidate: 0 },
    });

    const data = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to fetch admins");

    return data.data;
  } catch (error: any) {
    console.error("getAllAdmins error:", error);
    return [];
  }
}

// ----------------------------
// ৩️⃣ Delete Admin
// ----------------------------
export async function deleteAdmin(adminId: string) {
  try {
    const response = await serverFetch.delete(`/user/delete-admin/${adminId}`);
    const data = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to delete admin");

    revalidateTag("admins", { expire: 0 });
    return data.data;
  } catch (error: any) {
    console.error("deleteAdmin error:", error);
    throw new Error(error.message || "Server error while deleting admin");
  }
}
