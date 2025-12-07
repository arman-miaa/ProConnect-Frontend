"use server";
import { serverFetch } from "@/lib/server-fetch";


export async function getAllMessages() {
  const res = await serverFetch.get("/message/all", {
    next: { revalidate: 0 },
  });
  const data = await res.json();
  return data.data;
}

export async function deleteMessage(id: string) {
  const res = await serverFetch.delete(`/message/${id}`);
  const data = await res.json();
  return data.data;
}
