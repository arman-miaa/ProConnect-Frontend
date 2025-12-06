/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { updateOrderStatus } from "@/services/order/order.service";
import { toast } from "sonner";
import { useState } from "react";

const finalStatuses = ["COMPLETED", "CANCELLED", "REFUNDED"];

// Allowed status list
const roleAllowedStatuses: Record<string, string[]> = {
  SELLER: ["ACCEPTED", "IN_PROGRESS", "DELIVERED", "CANCELLED"],
  CLIENT: ["COMPLETED", "CANCELLED"],
};

export default function StatusModal({ open, setOpen, order, role }: any) {
  const [loading, setLoading] = useState(false);
  const allowedStatuses = roleAllowedStatuses[role] || [];
  const current = order.orderStatus;

  async function handleChange(newStatus: string) {
    try {
      setLoading(true);
      const result = await updateOrderStatus(order._id, newStatus);

      if (result) {
        toast.success(`Order status updated to ${newStatus}`);
        setOpen(false);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  }

  const filteredStatuses = allowedStatuses.filter((status) => {
    // ❌ FINAL = No action
    if (finalStatuses.includes(current)) return false;

    // ❌ DELIVERED হলে cancel আর allowed না (Seller/Client দুজনের জন্যই)
    if (current === "DELIVERED" && status === "CANCELLED") {
      return false;
    }

    // ===========================
    // 🟦 CLIENT LOGIC
    // ===========================
    if (role === "CLIENT") {
      if (status === "COMPLETED") {
        return current === "DELIVERED"; // completed only when delivered
      }
      if (status === "CANCELLED") {
        return current !== "DELIVERED" && !finalStatuses.includes(current);
      }
      return false;
    }

    // ===========================
    // 🟧 SELLER LOGIC
    // ===========================
    if (role === "SELLER") {
      if (status === "ACCEPTED") {
        return current === "PENDING";
      }
      if (status === "IN_PROGRESS") {
        return current === "ACCEPTED";
      }
      if (status === "DELIVERED") {
        return current === "IN_PROGRESS";
      }
      if (status === "CANCELLED") {
        return (
          current !== "DELIVERED" && // ❌ delivered হলে cancel show হবে না
          !finalStatuses.includes(current)
        );
      }
    }

    return false;
  });

  

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Order Status</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3 py-3">
          {filteredStatuses.length === 0 && (
            <p className="text-sm text-gray-500">No status change allowed.</p>
          )}

          {filteredStatuses.map((status) => (
            <Button
              key={status}
              variant="outline"
              className="w-full justify-start"
              onClick={() => handleChange(status)}
              disabled={loading}
            >
              {status}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
