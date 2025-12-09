"use server";

import { verifyAccessToken } from "@/lib/jwtHanlders";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { forgotPasswordSchema, } from "@/zod/auth.validation";
import { parse } from "cookie";

import { revalidateTag } from "next/cache";

import { deleteCookie, getCookie, setCookie } from "./tokenHandlers";

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function updateMyProfile(formData: FormData) {
  try {
    const uploadFormData = new FormData();
    const data: any = {};

    formData.forEach((value, key) => {
      if (key !== "file" && value) {
        if (key === "skills") {
          data.skills = String(value)
            .split(",")
            .map((s) => s.trim())
            .filter((s) => s.length > 0);
        } else {
          data[key] = value;
        }
      }
    });

    uploadFormData.append("data", JSON.stringify(data));

    const file = formData.get("file");
    if (file && file instanceof File && file.size > 0) {
      uploadFormData.append("file", file);
    }

    const response = await serverFetch.patch(`/user/update-profile`, {
      body: uploadFormData,
    });

    const result = await response.json();

    revalidateTag("user-info", { expire: 0 });
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong",
    };
  }
}

export async function changePassword(formData: FormData) {
  const newPassword = formData.get("newPassword") as string;
  const oldPassword = formData.get("oldPassword") as string;

  const accessToken = await getCookie("accessToken");
  if (!accessToken) throw new Error("User not authenticated");

  const response = await serverFetch.post("/auth/change-password", {
    body: JSON.stringify({ oldPassword, newPassword }),
    headers: {
      Authorization: accessToken,
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();
  if (!result.success)
    throw new Error(result.message || "Password change failed");

  revalidateTag("user-info", { expire: 0 });
  return result;
}






export async function forgotPassword(_prevState: any, formData: FormData) {
  // Build validation payload
  const validationPayload = {
    email: formData.get("email") as string,
  };

  // Validate
  const validatedPayload = zodValidator(
    validationPayload,
    forgotPasswordSchema
  );

  if (!validatedPayload.success && validatedPayload.errors) {
    return {
      success: false,
      message: "Validation failed",
      formData: validationPayload,
      errors: validatedPayload.errors,
    };
  }

  try {
    // API Call
    const response = await serverFetch.post("/auth/forgot-password", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: validationPayload.email,
      }),
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || "Failed to send reset link");
    }

    return {
      success: true,
      message: "Password reset link has been sent to your email!",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Something went wrong",
      formData: validationPayload,
    };
  }
}




export async function getNewAccessToken() {
  try {
    const accessToken = await getCookie("accessToken");
    const refreshToken = await getCookie("refreshToken");

    //Case 1: Both tokens are missing - user is logged out
    if (!accessToken && !refreshToken) {
      return {
        tokenRefreshed: false,
      };
    }

    // Case 2 : Access Token exist- and need to verify
    if (accessToken) {
      const verifiedToken = await verifyAccessToken(accessToken);

      if (verifiedToken.success) {
        return {
          tokenRefreshed: false,
        };
      }
    }

    //Case 3 : refresh Token is missing- user is logged out
    if (!refreshToken) {
      return {
        tokenRefreshed: false,
      };
    }

    //Case 4: Access Token is invalid/expired- try to get a new one using refresh token
    // This is the only case we need to call the API

    // Now we know: accessToken is invalid/missing AND refreshToken exists
    // Safe to call the API
    let accessTokenObject: null | any = null;
    let refreshTokenObject: null | any = null;

    // API Call - serverFetch will skip getNewAccessToken for /auth/refresh-token endpoint
    const response = await serverFetch.post("/auth/refresh-token", {
      headers: {
        Cookie: `refreshToken=${refreshToken}`,
      },
    });

    const result = await response.json();

    console.log("access token refreshed!!");

    const setCookieHeaders = response.headers.getSetCookie();

    if (setCookieHeaders && setCookieHeaders.length > 0) {
      setCookieHeaders.forEach((cookie: string) => {
        const parsedCookie = parse(cookie);

        if (parsedCookie["accessToken"]) {
          accessTokenObject = parsedCookie;
        }
        if (parsedCookie["refreshToken"]) {
          refreshTokenObject = parsedCookie;
        }
      });
    } else {
      throw new Error("No Set-Cookie header found");
    }

    if (!accessTokenObject) {
      throw new Error("Tokens not found in cookies");
    }

    if (!refreshTokenObject) {
      throw new Error("Tokens not found in cookies");
    }

    await deleteCookie("accessToken");
    await setCookie("accessToken", accessTokenObject.accessToken, {
      secure: true,
      httpOnly: true,
      maxAge: parseInt(accessTokenObject["Max-Age"]) || 1000 * 60 * 60,
      path: accessTokenObject.Path || "/",
      sameSite: accessTokenObject["SameSite"] || "none",
    });

    await deleteCookie("refreshToken");
    await setCookie("refreshToken", refreshTokenObject.refreshToken, {
      secure: true,
      httpOnly: true,
      maxAge:
        parseInt(refreshTokenObject["Max-Age"]) || 1000 * 60 * 60 * 24 * 90,
      path: refreshTokenObject.Path || "/",
      sameSite: refreshTokenObject["SameSite"] || "none",
    });

    if (!result.success) {
      throw new Error(result.message || "Token refresh failed");
    }

    return {
      tokenRefreshed: true,
      success: true,
      message: "Token refreshed successfully",
    };
  } catch (error: any) {
    return {
      tokenRefreshed: false,
      success: false,
      message: error?.message || "Something went wrong",
    };
  }
}






