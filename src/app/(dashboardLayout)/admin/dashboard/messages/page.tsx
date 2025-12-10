/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  deleteMessage,
  getAllMessages,
} from "@/services/message/messages.service";
import Swal from "sweetalert2";
import { toast } from "sonner";

const AdminMessagesPage = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const data = await getAllMessages();
      setMessages(data || []); // fallback empty array
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || "Failed to fetch messages");
      setMessages([]); // ensure state is array even on error
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (message: any) => {
    const result = await Swal.fire({
      title: `Delete message from "${message.firstName} ${message.lastName}"?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteMessage(message._id);
        toast.success("Message deleted successfully");
        fetchMessages(); // refresh list
      } catch (error: any) {
        toast.error(error?.message || "Failed to delete message");
      }
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  if (loading) {
    return <p className="p-6 text-center">Loading messages...</p>;
  }

  if (!messages.length) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        No messages found.
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <h2 className="text-2xl font-bold">Contact & Support Messages</h2>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {messages.map((m) => (
          <div
            key={m._id}
            className="border rounded-lg shadow-sm p-4 bg-white flex flex-col justify-between w-full"
          >
            <div className="mb-2 grow">
              <p className="font-semibold wrap-break-word">
                {m.firstName} {m.lastName}
              </p>
              <p className="text-sm text-gray-600 wrap-break-word">{m.email}</p>
              <p className="text-sm text-gray-500">Type: {m.issueType}</p>

              <div className="mt-2 text-gray-800 whitespace-pre-line overflow-y-auto max-h-32 pr-2 wrap-break-word custom-scrollbar">
                {m.message}
              </div>
            </div>

            <div className="flex justify-end mt-4 shrink-0">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(m)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminMessagesPage;
