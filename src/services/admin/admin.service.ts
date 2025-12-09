/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";


export const getAdminDashboard = async () => {
  try {
    const response = await serverFetch.get("/state/dashboard", {
      cache: "no-store",
    });

    const result = await response.json();

    return result;
  } catch (error: any) {
    console.log(error);
  }
};
