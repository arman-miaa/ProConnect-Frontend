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
      setMessages(data || []);
    } catch (error: any) {
      toast.error(error?.message || "Failed to fetch messages");
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (message: any) => {
    const result = await Swal.fire({
      title: "Delete this message?",
      text: `From ${message.firstName} ${message.lastName}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "#ef4444",
    });

    if (result.isConfirmed) {
      try {
        await deleteMessage(message._id);
        toast.success("Message deleted");
        fetchMessages();
      } catch (error: any) {
        toast.error(error?.message || "Delete failed");
      }
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  if (loading) {
    return (
      <p className="p-6 text-center text-muted-foreground">Loading messages…</p>
    );
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
      <div>
        <h2 className="text-2xl font-bold">Contact & Support Messages</h2>
        <p className="text-sm text-muted-foreground">
          Messages submitted by users
        </p>
      </div>

      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {messages.map((m) => (
          <div
            key={m._id}
            className="group relative rounded-2xl border bg-card text-card-foreground shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            {/* Top accent */}
            <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-linear-to-r from-indigo-500 to-purple-500" />

            <div className="p-5 flex flex-col h-full">
              {/* Header */}
              <div className="mb-3">
                <p className="font-semibold truncate">
                  {m.firstName} {m.lastName}
                </p>
                <p className="text-xs text-muted-foreground break-all">
                  {m.email}
                </p>
              </div>

              {/* Meta */}
              <div className="mb-3">
                <span className="inline-block rounded-full bg-muted px-2 py-0.5 text-xs font-medium">
                  {m.issueType}
                </span>
              </div>

              {/* Message */}
              <div className="flex-1 overflow-hidden">
                <p className="text-sm leading-relaxed rounded-lg bg-muted p-3 max-h-40 overflow-y-auto wrap-break-word">
                  {m.message}
                </p>
              </div>

              {/* Actions */}
              <div className="pt-4 flex justify-end">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(m)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminMessagesPage;
