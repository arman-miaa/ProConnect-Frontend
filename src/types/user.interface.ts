import { UserRole } from "@/lib/auth-utils";

export type IsActiveStatus = "ACTIVE" | "INACTIVE" | "BLOCKED";


export interface UserInfo {
  _id: string;
  name: string;
  email: string;
  title?: string; // Optional করা হলো
  role: UserRole;

  isVerified: boolean;
  is_active: IsActiveStatus;
  status: IsActiveStatus;

  needPasswordChange?: boolean;

  profilePicture?: string;
  contactNumber?: string;
  address?: string;

  bio?: string;
  phone?: string;
  skills?: string[];
  averageRating?: number;

  createdAt: string;
  updatedAt: string;
}



