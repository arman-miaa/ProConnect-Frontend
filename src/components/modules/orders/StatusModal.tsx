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

const roleAllowedStatuses: Record<string, string[]> = {
  SELLER: ["ACCEPTED", "IN_PROGRESS", "DELIVERED", "CANCELLED"],
  CLIENT: ["COMPLETED", "CANCELLED"],
 
};



export default function StatusModal({ open, setOpen, order, role }: any) {
  const [loading, setLoading] = useState(false);
    const allowedStatuses = roleAllowedStatuses[role] || [];
    
    

  async function handleChange(newStatus: string) {
    try {
      setLoading(true);
      const result = await updateOrderStatus(order._id, newStatus);

      if (result) {
        toast.success(`Order status updated to ${newStatus}`);
        setOpen(false); // ✅ Success হলে modal বন্ধ হবে
      }
    } catch (error: any) {
      console.error(error);
      // ✅ Error হলে toast দেখাবে এবং modal খোলা থাকবে
      toast.error(error.message || "Failed to update order status");
    } finally {
      setLoading(false);
    }
  }
const filteredStatuses = allowedStatuses.filter((status) => {
  if (role === "CLIENT" && status === "COMPLETED") {
    return order.orderStatus === "DELIVERED"; // only show if delivered
  }
  return true;
});
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Order Status</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3 py-3">
          {allowedStatuses.length === 0 && (
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
