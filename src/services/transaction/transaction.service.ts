/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";

// -------------------------------------------------------------------------
// ১. 👥 ক্লায়েন্টের লেনদেন দেখা (GET /transactions/client) - CLIENT
// -------------------------------------------------------------------------
export async function getClientTransactions(): Promise<any> {
  try {
    const response = await serverFetch.get(`/transaction/my-history`, {
      cache: "no-store",
    });
    const result = await response.json();

    if (!result.success) {
      if (response.status === 404) return [];
      throw new Error(result.message || "Failed to fetch client transactions.");
    }
    return result.data;
  } catch (error: any) {
    throw new Error(
      error.message || "Server error while fetching client transactions"
    );
  }
}


// -------------------------------------------------------------------------
// ২. 💼 সেলারের পেমেন্ট হিস্টোরি দেখা (GET /transactions/seller) - SELLER
// -------------------------------------------------------------------------
export async function getSellerPaymentHistory(): Promise<any> {
  try {
    const response = await serverFetch.get(`/transaction/my-history`, {
      // FE রাউট ঠিক করা
      cache: "no-store",
    });
    const result = await response.json();

    if (!result.success) {
      if (response.status === 404) return [];
      throw new Error(
        result.message || "Failed to fetch seller payment history"
      );
    }
    return result.data;
  } catch (error: any) {
    throw new Error(
      error.message || "Server error while fetching seller payment history"
    );
  }
}


// -------------------------------------------------------------------------
// ৩. 👑 অ্যাডমিনের সমস্ত লেনদেন দেখা (GET /transactions/all) - ADMIN
// -------------------------------------------------------------------------
export async function getAllTransactions(): Promise<any> {
  try {
    const response = await serverFetch.get(`/transaction/all-history`, {
      // extra " দূরে
      cache: "no-store",
    });
    const result = await response.json();

    if (!result.success) {
      if (response.status === 404) return [];
      throw new Error(result.message || "Failed to fetch all transactions");
    }
    return result.data;
  } catch (error: any) {
    throw new Error(
      error.message || "Server error while fetching all transactions"
    );
  }
}



// 💸 Withdrawal request (SELLER)
export async function requestWithdrawalAPI(amount: number): Promise<any> {
  
  try {
    console.log("Withdrawal amount (before send):", amount, typeof amount);
    const res = await serverFetch.post("/transaction/withdrawal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }), // ✅ body object
      
    });

    const data = await res.json();
     console.log("Response from server:", data);

    if (!res.ok || !data.success) {
      throw new Error(data.message || "Failed to request withdrawal");
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message || "Server error during withdrawal");
  }
}



// -------------------------------------------------------------------------
// 💡 নতুন ফাংশন: সেলারের আর্থিক সারসংক্ষেপ (GET /earnings/summary) - SELLER
// -------------------------------------------------------------------------
export async function getSellerFinancialSummary(): Promise<any> {
  try {
    const response = await serverFetch.get(`/transaction/earnings/summary`, {
      cache: "no-store",
    });
    const result = await response.json();

    if (!result.success) {
      return { totalEarned: 0, availableBalance: 0, totalWithdrawn: 0 };
    }
    return result.data;
  } catch (error: any) {
    console.error("Error fetching financial summary:", error.message);
    return { totalEarned: 0, availableBalance: 0, totalWithdrawn: 0 };
  }
}

