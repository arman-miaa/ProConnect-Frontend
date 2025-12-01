import { UserRole } from "@/lib/auth-utils";

export type IsActiveStatus = "ACTIVE" | "INACTIVE" | "BLOCKED";


export interface UserInfo {
  // কমন ফিল্ডস
  _id: string; // MongoDB ObjectId
  name: string;
  email: string;
  role: UserRole; // SUPER_ADMIN, ADMIN, CLIENT, SELLER (routes.ts থেকে)

  // স্ট্যাটাস এবং ভেরিফিকেশন
  isVerified: boolean;
  // আপনার দেখানো ডেটা এবং প্রয়োজন অনুযায়ী
  is_active: IsActiveStatus;
  status: IsActiveStatus; // যদি আপনার ব্যাকএন্ড is_active এর বদলে status ফিল্ড ব্যবহার করে থাকে

  // অন্যান্য স্ট্যাটাস
  needPasswordChange?: boolean;

  // প্রোফাইল ফিল্ডস (সব রোলের জন্য রুট লেভেলে)
  profilePicture?: string;
  contactNumber?: string;
  address?: string;

  // সেলার-নির্দিষ্ট ফিল্ডস (Seller-এর ক্ষেত্রে থাকবে, অন্যদের ক্ষেত্রে undefined)
  bio?: string;
  currentLocation?: string;
  skills?: string[];
  averageRating?: number;

  // টাইমস্ট্যাম্প
  createdAt: string;
  updatedAt: string;
}


