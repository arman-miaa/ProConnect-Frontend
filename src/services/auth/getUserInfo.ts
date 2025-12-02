/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { UserInfo } from "@/types/user.interface";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getCookie } from "./tokenHandlers";

export const getUserInfo = async (): Promise<UserInfo | null> => {
  try {
    const [response, accessToken] = await Promise.all([
      serverFetch.get("/auth/me", {
        cache: "no-store",
        next: { tags: ["user-info"] },
      }),
      getCookie("accessToken"),
    ]);

    if (!accessToken) {
      throw new Error("No access token found");
    }

    const result = await response.json();

    if (!result.success || !result.data) {
      throw new Error("Invalid API response");
    }

    // Verify JWT
    const verifiedToken = jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_SECRET as string
    ) as JwtPayload;

    // Helper function to extract user data
    const extractUserData = (data: any, role: string): UserInfo => {
      const roleData = data[role.toLowerCase()];

      return {
        id: roleData?.id || data._id || "",
        name:
          roleData?.name || data.name || verifiedToken.name || "Unknown User",
        email: roleData?.email || data.email || verifiedToken.email || "",
        role: verifiedToken.role || role.toUpperCase(),
        ...(roleData || {}),
      };
    };

    // Determine user role and extract data
    const roleMap: Record<string, string> = {
      admin: "ADMIN",
      super_admin: "SUPER_ADMIN",
      seller: "SELLER",
      client: "CLIENT",
    };

    for (const [key, role] of Object.entries(roleMap)) {
      if (result.data[key]) {
        return extractUserData(result.data, role);
      }
    }
   

    // Fallback
    return extractUserData(result.data, verifiedToken.role || "USER");
  } catch (error: any) {
    console.error("getUserInfo Error:", error.message);
    return null; // Return null instead of default object
  }
};
