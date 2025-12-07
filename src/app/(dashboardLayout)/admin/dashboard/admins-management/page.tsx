/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/admin/AdminPage.tsx


import AdminClientPage from "@/components/modules/Admin/AdminsManagement.tsx/AdminClientPage";
import { getAllAdmins } from "@/services/admin/adminsManagement"; // সার্ভার 
import { getUserInfo } from "@/services/auth/getUserInfo";

export default async function AdminPage() {
  let initialAdmins = [];
  let userRole = null;
  let error = null;

  try {
    // 1. সার্ভার-সাইড থেকে অ্যাডমিন ডেটা ফেচ
    initialAdmins = await getAllAdmins();
  } catch (err: any) {
    console.error("Failed to fetch initial admins:", err);
    error = err.message || "Failed to load initial admin data";
  }

  try {
    // 2. সার্ভার-সাইড থেকে ব্যবহারকারীর রোল ফেচ
    userRole = await getUserInfo();
  } catch (err) {
    console.error("Failed to fetch user role on server:", err);
  }

  // ক্লায়েন্ট কম্পোনেন্টকে সার্ভার থেকে ফেচ করা ডেটা পাস করা
  return (
    <AdminClientPage
      initialAdmins={initialAdmins}
      initialError={error}
      userRole={userRole.role}
    />
  );
}
