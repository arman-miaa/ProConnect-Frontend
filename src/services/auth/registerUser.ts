/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { registerUserValidationZodSchema } from "@/zod/auth.validation";
import { loginUser } from "./loginUser";

export const registerUser = async (
  _currentState: any,
  formData: any
): Promise<any> => {
  try {
    const payload = {
      name: formData.get("name"),
      address: formData.get("address"),
      email: formData.get("email"),
      // নিশ্চিত করুন যে role এখানে আছে
      role: formData.get("role"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };

    if (
      zodValidator(payload, registerUserValidationZodSchema).success === false
    ) {
      return zodValidator(payload, registerUserValidationZodSchema);
    }

    const validatedPayload: any = zodValidator(
      payload,
      registerUserValidationZodSchema
    ).data;

    // Express সার্ভার (user.services.ts) প্রত্যাশা অনুযায়ী ফ্ল্যাট পেলোড তৈরি
    const finalJSONPayload = {
      email: validatedPayload.email,
      password: validatedPayload.password,
      role: validatedPayload.role,
      name: validatedPayload.name,
      address: validatedPayload.address,
    };

    console.log("data before send", finalJSONPayload);
    const res = await serverFetch.post("/user/register", {
      body: JSON.stringify(finalJSONPayload),

      headers: { "Content-Type": "application/json" },
    });

    const result = await res.json();

    if (result.success) {
      await loginUser(_currentState, formData);
    }

    return result;
  } catch (error: any) {
    // Re-throw NEXT_REDIRECT errors so Next.js can handle them
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Registration Failed. Please try again."
      }`,
    };
  }
};
