/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import PaymentEscrowStatus from "./PaymentEscrowStatus";
import { OrderData } from "@/types/orderTypes";
import { fetchOrderDetails } from "@/services/order/order.service";


export default function PaymentSuccessPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("orderId");
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) {
      toast.error("Order ID is missing. Please check your payment history.");
      setLoading(false);
      return;
    }

    const getOrder = async () => {
      setLoading(true);
      try {
        const data = await fetchOrderDetails(orderId); // server action call
        setOrder(data);
        toast.success("Order details loaded successfully.");
      } catch (err: any) {
        console.error(err);
        toast.error(err.message || "Failed to fetch order details.");
      } finally {
        setLoading(false);
      }
    };

    getOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-50">
        <div className="flex flex-col items-center p-8 bg-white rounded-xl shadow-2xl">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-lg text-slate-700 font-semibold">
            Loading Order Details...
          </p>
          <p className="text-sm text-slate-500 mt-1">
            Order ID: {orderId || "Waiting for ID..."}
          </p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-red-50 p-6">
        <div className="p-8 bg-white rounded-xl shadow-2xl text-center border-t-4 border-red-500">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-red-700 mb-2">
            Order Not Found!
          </h1>
          <p className="text-slate-600 mb-4">
            The Order ID ({orderId || "N/A"}) is missing or invalid, or you do
            not have permission to view it.
          </p>
          <Button onClick={() => router.push("/client/dashboard/my-orders")}>
            Go to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const commissionPercentage =
    order.totalPrice > 0
      ? ((order.platformFee / order.totalPrice) * 100).toFixed(2)
      : 0;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-2xl border-t-8 border-green-500">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <svg
            className="w-16 h-16 text-green-500 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h1 className="text-4xl font-extrabold text-slate-800">
            Payment Successful!
          </h1>
          <p className="text-xl text-green-600 mt-2">
            Your order has been placed successfully.
          </p>
        </div>

        {/* Escrow Status */}
        <PaymentEscrowStatus status={order.orderStatus} />

        {/* Order Summary & Service Image */}
        <div className="grid md:grid-cols-3 gap-6 border-t pt-6 mt-6">
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-2xl font-bold text-slate-800 border-b pb-2 mb-4">
              Order Summary
            </h2>
            <div className="flex justify-between items-center bg-green-50 p-3 rounded-lg border border-green-200">
              <span className="font-semibold text-green-700">
                Order Total (Paid):
              </span>
              <span className="text-2xl font-extrabold text-green-800">
                ${order.totalPrice.toFixed(2)}
              </span>
            </div>
            <div className="space-y-2 pt-2 text-slate-700 text-sm">
              <div className="flex justify-between border-b pb-1">
                <span>Platform Fee (Commission):</span>
                <span className="font-medium text-red-500">
                  -${order.platformFee.toFixed(2)}{" "}
                  <span className="text-xs text-slate-500">
                    ({commissionPercentage}%)
                  </span>
                </span>
              </div>
              <div className="flex justify-between pt-1 font-bold border-t border-slate-300">
                <span>Seller Net Earning:</span>
                <span className="text-blue-600">
                  ${order.netAmount.toFixed(2)}
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-600 pt-4">
              <span className="font-medium">Order ID:</span> {order._id}
            </p>
            <p className="text-sm text-slate-600">
              <span className="font-medium">Delivery Time:</span>{" "}
              {order.serviceId.deliveryTime} days
            </p>
            <p className="text-sm text-slate-600">
              <span className="font-medium">Status:</span>
              <span className="ml-2 inline-block px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700 capitalize">
                {order.orderStatus}
              </span>
            </p>
          </div>

          <div className="md:col-span-1 flex justify-center items-center">
            <Image
              width={250}
              height={150}
              src={
                order.serviceId.image ||
                "https://via.placeholder.com/250x150?text=Service+Image"
              }
              alt={order.serviceId.title}
              className="w-full h-auto rounded-xl shadow-lg object-cover"
              unoptimized
            />
          </div>
        </div>

        {/* Service Details */}
        <div className="mt-8 pt-6 border-t">
          <h3 className="text-xl font-bold text-slate-800 mb-3">
            {order.serviceId.title}
          </h3>
          <p className="text-slate-700 leading-relaxed mb-4">
            {order.serviceId.description}
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 text-sm rounded-full bg-slate-100 text-slate-700">
              {order.serviceId.category}
            </span>
            {order.serviceId.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm rounded-full bg-indigo-100 text-indigo-700"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-10 pt-6 border-t flex justify-center">
          <Button onClick={() => router.push("/all-orders")}>
            Go to My Orders
          </Button>
        </div>
      </div>
    </div>
  );
}
