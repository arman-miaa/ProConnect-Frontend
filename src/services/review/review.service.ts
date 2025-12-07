/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { revalidateTag } from "next/cache";

// -------------------------------------------------------------------------
// ১. 📝 নতুন রিভিউ তৈরি (POST /reviews) - CLIENT
// -------------------------------------------------------------------------

export async function submitReview(payload: {
  orderId: string;
  rating: number;
  comment: string;
}) {
  try {
    const res = await serverFetch.post(`/review`, {
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message);

    revalidateTag("service-reviews", { expire: 0 });
revalidateTag("my-reviews", { expire: 0 });
    revalidateTag("user-info", { expire: 0 });
      revalidateTag("services", { expire: 0 });
    return data.data;
  } catch (error: any) {
    throw new Error(error.message || "Review submit failed");
  }
}


// -------------------------------------------------------------------------
// 🏢 ADMIN সব রিভিউ fetch করা (GET /reviews/admin/all) - ADMIN
// -------------------------------------------------------------------------
export async function getAllReviews(): Promise<any> {
  try {
    const response = await serverFetch.get(`/review/admin/all`, {
      next: { tags: ["all-reviews"], revalidate: 3600 },
    });
    const result = await response.json();

    if (!result.success) {
      if (response.status === 404) return [];
      throw new Error(result.message || "Failed to fetch all reviews");
    }
    return result.data;
  } catch (error: any) {
    throw new Error(
      error.message || "Server error while fetching all reviews"
    );
  }
}


// -------------------------------------------------------------------------
// ✅ সরাসরি export করা হলো
export async function getReviewsByServiceId(serviceId: string): Promise<any> {
  try {
    const response = await serverFetch.get(`/reviews/service/${serviceId}`, {
      next: { tags: ["service-reviews"], revalidate: 3600 },
    });
    const result = await response.json();

    if (!result.success) {
      if (response.status === 404) return [];
      throw new Error(result.message || "Failed to fetch service reviews");
    }
    return result.data;
  } catch (error: any) {
    throw new Error(
      error.message || "Server error while fetching service reviews"
    );
  }
}

// -------------------------------------------------------------------------
// ৩. 💼 সেলারের সমস্ত সার্ভিসের রিভিউ দেখা (GET /reviews/seller/:sellerId) - PUBLIC

export async function getReviewsBySellerId(sellerId: string): Promise<any> {
  try {
    const response = await serverFetch.get(`/review/seller/${sellerId}`, {
      next: { tags: ["seller-reviews"], revalidate: 3600 },
    });
    const result = await response.json();

    if (!result.success) {
      if (response.status === 404) return [];
      throw new Error(result.message || "Failed to fetch seller reviews");
    }
    return result.data;
  } catch (error: any) {
    throw new Error(
      error.message || "Server error while fetching seller reviews"
    );
  }
}

// -------------------------------------------------------------------------
// ৪. 👤 ক্লায়েন্টের দেওয়া নিজস্ব রিভিউ দেখা (GET /reviews/my-reviews) - CLIENT

export async function getMyReviews(): Promise<any> {
  try {
    const response = await serverFetch.get(`/review/my-reviews`, {
      cache: "no-store",
      next: { tags: ["my-reviews"] },
    });
    const result = await response.json();

    if (!result.success) {
      if (response.status === 404) return [];
      throw new Error(result.message || "Failed to fetch my reviews");
    }
    return result.data;
  } catch (error: any) {
    throw new Error(error.message || "Server error while fetching my reviews");
  }
}


export async function checkIfReviewed(orderId: string): Promise<boolean> {
  try {
    const myReviews = await getMyReviews();
    console.log("All my reviews:", myReviews);
    console.log("Current orderId:", orderId);

    return myReviews.some(
      (review: any) =>
        review.orderId === orderId || review.order?._id === orderId
    );
  } catch (error) {
    console.error(error);
    return false;
  }
}

