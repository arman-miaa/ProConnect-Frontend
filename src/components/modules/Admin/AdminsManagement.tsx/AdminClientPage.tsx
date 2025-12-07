/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// ক্লায়েন্ট কম্পোনেন্টে অ্যাকশন ফাংশনগুলো ইম্পোর্ট করা
import {
  createAdmin,
  deleteAdmin,
  getAllAdmins,
} from "@/services/admin/adminsManagement";

import AdminTable from "@/components/modules/Admin/AdminsManagement.tsx/AdminTable";
import CreateAdminModal from "@/components/modules/Admin/AdminsManagement.tsx/CreateAdminModal";

interface Props {
  initialAdmins: any[];
  initialError: string | null;
  userRole: string | null; // সার্ভার থেকে আসা role
}

export default function AdminClientPage({
  initialAdmins,
  initialError,
  userRole,
}: Props) {
  // সার্ভার থেকে আসা ডেটা দিয়ে State initialize করা
  const [admins, setAdmins] = useState<any[]>(initialAdmins);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // যদি সার্ভার-সাইড ফেচিং-এ কোনো error হয়, তা ক্লায়েন্ট-সাইডে টোস্ট করা
  useEffect(() => {
    if (initialError) {
      toast.error(initialError);
    }
  }, [initialError]);

  // --- ডেটা রি-ফেচিং ফাংশন (এখনও ক্লায়েন্ট-সাইড) ---
  const fetchAdmins = async () => {
    setLoading(true);
    try {
      // এটি ক্লায়েন্ট-সাইড থেকে রি-ফেচ করছে, যদি আপনি সার্ভার অ্যাকশন ব্যবহার করতে চান, তবে লজিক পরিবর্তন করতে হবে।
      const data = await getAllAdmins();
      setAdmins(data);
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch admins");
    } finally {
      setLoading(false);
    }
  };

  // --- CRUD হ্যান্ডলার্স ---
  const handleCreateAdmin = async (payload: any) => {
    try {
      await createAdmin(payload);
      toast.success("Admin created successfully!");
      setIsModalOpen(false);
      fetchAdmins(); // সফল হলে ডেটা রি-ফেচ
    } catch (error: any) {
      toast.error(error.message || "Failed to create admin");
    }
  };

  const handleDeleteAdmin = async (adminId: string) => {
    try {
      await deleteAdmin(adminId);
      toast.success("Admin deleted successfully!");
      fetchAdmins(); // সফল হলে ডেটা রি-ফেচ
    } catch (error: any) {
      toast.error(error.message || "Failed to delete admin");
    }
  };

  const canCreateAdmin = userRole === "SUPER_ADMIN" || userRole === "OWNER"; // আপনার প্রয়োজন মত role পরিবর্তন করুন

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Admin Management</h2>

        {/* Role এর ভিত্তিতে Create Admin বাটন শর্তাধীন করা */}
        {canCreateAdmin && (
          <Button onClick={() => setIsModalOpen(true)} disabled={loading}>
            + Create Admin
          </Button>
        )}
      </div>

      {loading && <p>Loading admins...</p>}

      {/* AdminTable-এ ক্লায়েন্ট-সাইড State থেকে ডেটা পাস করা */}
      {!loading && (
        <AdminTable
          admins={admins}
          onDelete={handleDeleteAdmin}
          currentUserRole={userRole}
        />
      )}

      <CreateAdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateAdmin}
      />
    </div>
  );
}
