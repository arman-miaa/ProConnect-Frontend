/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { serverFetch } from "@/lib/server-fetch";
import { IService } from "@/types/service.interface";
import { getUserInfo } from "../auth/getUserInfo";
import { zodValidator } from "@/lib/zodValidator"; // Assuming this utility exists
import {
  serviceZodSchema,
  updateServiceSchema,
} from "@/zod/service.validation"; // Assuming this file exists
import { revalidateTag } from "next/cache";


// 1️⃣ সমস্ত সার্ভিস fetch করা
export async function getAllServices(): Promise<IService[] | any> {
  try {
    const response = await serverFetch.get("/service", {
      cache: "no-store",
      next: { tags: ["services"] },
    });
    const result = await response.json();
    if (!result.success) throw new Error("Failed to fetch services");
    return result.data;
  } catch (error: any) {
    console.error("getAllServices error:", error);
    return [];
  }
}

// 2️⃣ নির্দিষ্ট সার্ভিস fetch করা
export async function getServiceById(
  serviceId: string
): Promise<IService | any> {
  try {
    const response = await serverFetch.get(`/service/${serviceId}`, {
      cache: "no-store",
    });
    const result = await response.json();

    if (!result.success) throw new Error("Service not found");
    return result.data;
  } catch (error: any) {
    console.error("getServiceById error:", error);
    return null;
  }
}

// 3️⃣ সার্ভিস create করা
// FIXED: Error handling and return format for useActionState
export async function createService(_prevState: any, formData: FormData) {
  try {
    const user = await getUserInfo();

    // --- 1. Validation Setup ---
    const validationPayload = {
      title: formData.get("title"),
      description: formData.get("description"),
      price: formData.get("price"),
      deliveryTime: formData.get("deliveryTime"),
      category: formData.get("category"),
      tags: formData.get("tags"),
      
      image: formData.get("image") as File | null,
    };

    const validatedPayload = zodValidator(validationPayload, serviceZodSchema);
console.log("validation payload=========",validatedPayload);
    if (!validatedPayload.success || !validatedPayload.data) {
      return {
        success: false,
        message: "Validation failed",
        errors: validatedPayload.errors, // Return validation errors
      };
    }


    
    // --- 2. Backend Payload Construction ---
    const backendPayload = {
      sellerId: user.id,
      title: validatedPayload.data.title,
      description: validatedPayload.data.description,
      price: validatedPayload.data.price,
      deliveryTime: validatedPayload.data.deliveryTime,
      category: validatedPayload.data.category,
      
      tags: validatedPayload.data.tags,
    };

    const newForm = new FormData();
    newForm.append("data", JSON.stringify(backendPayload));

    // Append image if present and valid (checked by Zod)
    if (validatedPayload.data.image) {
      newForm.append("file", validatedPayload.data.image as File);
    }

    console.log("new form data",newForm);

    // --- 3. API Call ---
    const response = await serverFetch.post("/service", { body: newForm });
    const result = await response.json();

    console.log("result=================",result);

    // --- 4. Final Response ---
    if (result.success) {
      revalidateTag("services",{expire:0});
      return { success: true, data: result.data };
    }

    // Handle API failure
    return {
      success: false,
      message: result.message || "Failed to create service via API.",
      errors: result.errors,
    };
  } catch (error: any) {
    console.error("createService error:", error);
    return {
      success: false,
      message: error.message || "An unexpected error occurred during creation.",
    };
  }
}

export async function getMyServices(): Promise<IService[] | any> {
  try {
    const response = await serverFetch.get(`/service/my-services`, {
      cache: "no-store",
      next: { tags: ["services"] },
    });
    const result = await response.json();

    if (!result.success) throw new Error("Failed to fetch your services");
    return result.data; // শুধু সেলারের সার্ভিস
  } catch (error: any) {
    console.error("getMyServices error:", error);
    return [];
  }
}

// 4️⃣ সার্ভিস update করা
// FIXED: Error handling and return format for useActionState
export async function updateService(
  serviceId: string,
  _prevState: any,
  formData: FormData
) {
  try {
    // --- 1. Validation Setup ---
    const validationPayload = {
      title: formData.get("title"),
      description: formData.get("description"),
      price: formData.get("price"),
      deliveryTime: formData.get("deliveryTime"),
      category: formData.get("category"),
      tags: formData.get("tags"),
      status: formData.get("status"),
  
      image: formData.get("image") as File | null,
    };

    console.log("data before validate....",validationPayload);

    const validatedPayload = zodValidator(
      validationPayload,
      updateServiceSchema
    );


    if (!validatedPayload.success && validatedPayload.errors) {

    
      return {
        success: validatedPayload.success,
        message: "Validation failed",
        formData: validationPayload,
        errors: validatedPayload.errors,
      };
    }
    if (!validatedPayload.data) {
      return {
        success: false,
        message: "Validation failed",
        formData: validationPayload,
      };
    }
    // --- 2. Backend Payload Construction ---
    // Remove image from backendPayload as it's handled separately
    const { image, ...restPayload } = validatedPayload.data;
    const backendPayload = { ...restPayload };

    const newForm = new FormData();
    newForm.append("data", JSON.stringify(backendPayload));

    // Append image if present (and valid, since Zod passed)
    if (image instanceof File && image.size > 0) {
      newForm.append("file", image);
    }

    console.log("new form data...",newForm);
    // --- 3. API Call ---
    const response = await serverFetch.patch(`/service/${serviceId}`, {
      body: newForm,
    });
    const result = await response.json();

    // --- 4. Final Response ---
    if (result.success) {
      revalidateTag("services",{expire:0});
      return { success: true, data: result.data };
    }

    // Handle API failure
    return {
      success: false,
      message: result.message || "Failed to update service via API.",
      errors: result.errors,
    };
  } catch (error: any) {
    console.error("updateService error:", error);
    return {
      success: false,
      message: error.message || "An unexpected error occurred during update.",
      
    };
  }
}

// 5️⃣ সার্ভিস delete করা
export async function deleteService(serviceId: string): Promise<boolean> {
  try {
    const response = await serverFetch.delete(`/service/${serviceId}`);
    const result = await response.json();
    revalidateTag("services", { expire: 0 });
    if (!result.success) throw new Error("Failed to delete service");
    return true;
  } catch (error: any) {
    console.error("deleteService error:", error);
    return false;
  }
}
                      