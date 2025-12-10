/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import StatusModal from "./StatusModal";
import Image from "next/image";
import ReviewModal from "../review/ReviewModal";

export default function OrderCard({ order, role }: any) {
  const [open, setOpen] = useState(false);


  return (
    <>
      <Card className="rounded-2xl shadow-md hover:shadow-lg transition border p-4">
        <CardHeader>
   
          <CardTitle className="text-lg font-semibold flex items-center justify-between">
            {order?.serviceId?.title}
            <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
              <Pencil className="w-5 h-5" />
            </Button>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Service Image */}
          {order?.serviceId?.image && (
            <Image
              alt="iamge"
              width={150}
              height={150}
              src={order.serviceId.image}
              className="h-40 w-full object-cover rounded-xl"
            />
          )}

          {/* Price Grid */}
          <div className="grid grid-cols-3 gap-3 text-sm bg-gray-50 p-3 rounded-lg">
            <div>
              <p className="text-gray-500">Total</p>
              <p className="font-semibold">${order.totalPrice}</p>
            </div>
            <div>
              <p className="text-gray-500">Platform Fee</p>
              <p className="font-semibold">${order.platformFee}</p>
            </div>
            <div>
              <p className="text-gray-500">Net Amount</p>
              <p className="font-semibold">${order.netAmount}</p>
            </div>
          </div>

          {/* Status Badges */}
          <div className="flex items-center gap-3">
            <Badge className="px-3 py-1">{order.orderStatus}</Badge>
            <Badge variant={order.isPaid ? "default" : "destructive"}>
              {order.isPaid ? "Paid" : "Unpaid"}
            </Badge>
          </div>

          {/* Client / Seller */}
          <div className="text-sm space-y-1">
            <p className="text-gray-600">
              <b>Client:</b> {order.clientId}
            </p>
            <p className="text-gray-600">
              <b>Seller:</b> {order.sellerId}
            </p>
          </div>

          {/* Dates */}
          <div className="text-xs text-gray-400 space-y-1">
            <p>Created: {new Date(order.createdAt).toLocaleDateString()}</p>
            {order?.deliveryDate && (
              <p>
                Delivery: {new Date(order.deliveryDate).toLocaleDateString()}
              </p>
            )}
          </div>
        </CardContent>
        {/* Review Button - Client only & Completed order */}
        {role === "CLIENT" && order.orderStatus === "COMPLETED" && (
          <ReviewModal orderId={order._id} />
        )}
      </Card>

      <StatusModal open={open} setOpen={setOpen} order={order} role={role} />
    </>
  );
}
