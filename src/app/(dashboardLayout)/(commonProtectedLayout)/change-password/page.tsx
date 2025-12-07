/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { changePassword } from "@/services/auth/auth.service";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner"; // 💡 নোটিফিকেশনের জন্য toast ব্যবহার করা হলো

export default function ChangePasswordForm() {
  const [loading, setLoading] = useState(false);
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // 💡 ফর্ম এলিমেন্টটিকে ধরুন
    const formElement = e.currentTarget as HTMLFormElement;
    const formData = new FormData(formElement);

    try {
      const res = await changePassword(formData);

      if (res.success) {
        toast.success(res.message || "Password changed successfully!");
        // 🚀 সফল হলে ফর্ম রিসেট
        formElement.reset();
      } else {
        throw new Error(res.message || "Failed to change password.");
      }
    } catch (err: any) {
      const errorMessage = err.message || "Something went wrong";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 border">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Change Your Password
        </h2>
        <p className="text-gray-500 text-center text-sm mt-1">
          Keep your account safe by updating your password regularly.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Old Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Old Password
            </label>
            <input
              type={showOld ? "text" : "password"}
              name="oldPassword"
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200 outline-none pr-10"
              placeholder="Enter old password"
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 mt-2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={() => setShowOld((prev) => !prev)}
            >
              {showOld ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* New Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type={showNew ? "text" : "password"}
              name="newPassword"
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200 outline-none pr-10"
              placeholder="Enter new password"
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 mt-2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={() => setShowNew((prev) => !prev)}
            >
              {showNew ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Changing..." : "Change Password"}
          </Button>
        </form>

       
      </div>
    </div>
  );
}
