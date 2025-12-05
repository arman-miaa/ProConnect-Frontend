"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image"; // Image কম্পোনেন্ট আমদানি করা হলো
import {
  AlertCircle,
  Clock,
  CheckCircle,
  XCircle,
  DollarSign,
  Loader,
  Hourglass,
  Truck,
} from "lucide-react"; // নতুন আইকন যোগ করা হলো
import { Button } from "@/components/ui/button";

interface ServiceDetails {
  title: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  // ✅ FIX 1: API Response অনুযায়ী deliveryTime serviceId এর ভেতরে যোগ করা হলো।
  deliveryTime: number;
}

interface OrderData {
  _id: string;
  totalPrice: number;
  // ✅ FIX 5: প্ল্যাটফর্ম কমিশন এবং সেলারের নিট অ্যামাউন্ট যোগ করা হলো
  platformFee: number;
  netAmount: number;
  // 🛑 FIX 2: deliveryTime এখান থেকে সরিয়ে ServiceDetails-এ নেওয়া হলো।
  serviceId: ServiceDetails; // Nesting ঠিক করা হলো
  sellerId: string;
  clientId: string;
  // ✅ FIX 4: backend Enum অনুযায়ী সমস্ত OrderStatus যোগ করা হলো।
  orderStatus:
    | "PENDING"
    | "ACCEPTED"
    | "IN_PROGRESS"
    | "DELIVERED"
    | "COMPLETED"
    | "CANCELLED"
    | "REFUNDED";
  isPaid: boolean;
}

// 💡 আপনার .env এ NEXT_PUBLIC_API_URL সংজ্ঞায়িত করা থাকতে হবে
const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

// নতুন কম্পোনেন্ট: এসক্রো এবং পেমেন্ট স্ট্যাটাস মেসেজ হ্যান্ডেল করার জন্য
const PaymentEscrowStatus = ({
  status,
}: {
  status: OrderData["orderStatus"];
}) => {
  let message = "";
  let icon = <Clock className="w-6 h-6 text-yellow-500" />;
  let bgColor = "bg-yellow-100 border-yellow-500";
  let textColor = "text-yellow-800";

  switch (status) {
    case "PENDING":
      message =
        "Your payment is securely held in Escrow. Funds will be released to the seller only after you confirm the successful completion of the service.";
      icon = <DollarSign className="w-6 h-6 text-blue-500" />;
      bgColor = "bg-blue-100 border-blue-500";
      textColor = "text-blue-800";
      break;

    case "ACCEPTED":
    case "IN_PROGRESS":
      message =
        "The seller has accepted your order and the work is in progress. Your payment remains securely held in Escrow until the service is delivered and approved by you.";
      icon = <Loader className="w-6 h-6 text-indigo-500 animate-spin" />;
      bgColor = "bg-indigo-100 border-indigo-500";
      textColor = "text-indigo-800";
      break;

    case "DELIVERED":
      message =
        "The service has been delivered by the seller. Please review the work and mark the order as complete to release the payment from Escrow.";
      icon = <Truck className="w-6 h-6 text-purple-500" />;
      bgColor = "bg-purple-100 border-purple-500";
      textColor = "text-purple-800";
      break;

    case "COMPLETED":
      message =
        "Success! The order is complete and your payment has been successfully released to the seller.";
      icon = <CheckCircle className="w-6 h-6 text-green-500" />;
      bgColor = "bg-green-100 border-green-500";
      textColor = "text-green-800";
      break;

    case "CANCELLED":
      message =
        "The order has been cancelled. A refund process will be initiated shortly. You will receive a separate notification when the refund is successful.";
      icon = <XCircle className="w-6 h-6 text-red-500" />;
      bgColor = "bg-red-100 border-red-500";
      textColor = "text-red-800";
      break;

    case "REFUNDED":
      message =
        "Refund successful. The full amount has been processed and returned to your original payment method. The refund may take 5-7 business days to reflect in your account.";
      icon = <Hourglass className="w-6 h-6 text-red-700" />;
      bgColor = "bg-red-200 border-red-700";
      textColor = "text-red-900";
      break;

    default:
      message =
        "The order status is currently undefined. Please check your order history for the latest updates.";
      icon = <Clock className="w-6 h-6 text-yellow-500" />;
      bgColor = "bg-yellow-100 border-yellow-500";
      textColor = "text-yellow-800";
      break;
  }

  return (
    <div
      className={`flex items-start p-4 mt-6 rounded-xl border-l-4 ${bgColor} ${textColor} transition-all duration-300`}
    >
      <div className="flex-shrink-0 mr-3 mt-1">{icon}</div>
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
};

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("orderId");
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🟢 FIX: orderId না থাকলে লোডিং বন্ধ করে এরর মেসেজ দেখানো
    if (!orderId || !API_BASE_URL) {
      setLoading(false);
      if (!orderId) {
        toast.error("Order ID is missing. Please check your payment history.");
      }
      return;
    }

    const fetchOrderDetails = async () => {
      setLoading(true);
      try {
        // 🟢 FIX: আপনার .env থেকে আসা API URL ব্যবহার করা
        const res = await fetch(`${API_BASE_URL}/order/${orderId}`, {
          credentials: "include",
        });

        // 💡 FIX: যদি 403 বা 404 আসে, তবে এরর মেসেজ দেখান
        if (!res.ok) {
          const errorData = await res.json();
          // 403 Forbidden এরর বা অন্য কোনো এরর টোস্টে দেখান
          toast.error(
            errorData.message ||
              "Failed to fetch order details due to permission or invalid ID."
          );
          setOrder(null); // order সেট না করে null রাখুন যাতে এরর কার্ডটি দেখানো যায়
          return;
        }

        const data = await res.json();

        if (data.success && data.data) {
          setOrder(data.data);
          // টোস্ট মেসেজ অর্ডারের বর্তমান স্ট্যাটাস অনুযায়ী কাস্টমাইজ করা হলো
          if (data.data.orderStatus === "PENDING") {
            toast.success("Payment Successful! Order details loaded.");
          } else {
            toast.info(
              `Order details loaded. Current status: ${data.data.orderStatus}.`
            );
          }
        } else {
          toast.error(data.message || "Failed to fetch order details.");
        }
      } catch (error) {
        console.error("Order fetch error:", error);
        toast.error("Network error during order retrieval.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
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

  // orderId না থাকলে বা fetch ব্যর্থ হলে (403 Forbidden এর ক্ষেত্রেও এটি দেখানো হবে)
  if (!order || !orderId) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-red-50 p-6">
        <div className="p-8 bg-white rounded-xl shadow-2xl text-center border-t-4 border-red-500">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-red-700 mb-2">
            Order Not Found!
          </h1>
          <p className="text-slate-600 mb-4">
            The Order ID ({orderId || "N/A"}) is missing or invalid, or you do
            not have permission to view it. Please contact support.
          </p>
          <Button onClick={() => router.push("/client/dashboard/my-orders")}>
            Go to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  // কমিশন শতাংশ গণনা করা
  const commissionPercentage =
    order.totalPrice > 0
      ? ((order.platformFee / order.totalPrice) * 100).toFixed(2)
      : 0;

  // সফলভাবে ডেটা লোড হলে
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-2xl border-t-8 border-green-500">
        <div className="flex flex-col items-center text-center mb-8">
          <svg
            className="w-16 h-16 text-green-500 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <h1 className="text-4xl font-extrabold text-slate-800">
            Payment Successful!
          </h1>
          <p className="text-xl text-green-600 mt-2">
            Your order has been placed successfully.
          </p>
        </div>

        {/* 🟢 নতুন: Escrow Status Message */}
        <PaymentEscrowStatus status={order.orderStatus} />

        <div className="grid md:grid-cols-3 gap-6 border-t pt-6 mt-6">
          {/* Order Info Summary */}
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-2xl font-bold text-slate-800 border-b pb-2 mb-4">
              Order Summary
            </h2>

            {/* Total Price */}
            <div className="flex justify-between items-center bg-green-50 p-3 rounded-lg border border-green-200">
              <span className="font-semibold text-green-700">
                Order Total (Paid):
              </span>
              <span className="text-2xl font-extrabold text-green-800">
                ${order.totalPrice.toFixed(2)}
              </span>
            </div>

            {/* Commission Breakdown */}
            <div className="space-y-2 pt-2 text-slate-700 text-sm">
              <div className="flex justify-between border-b pb-1">
                <span>Platform Fee (Commission):</span>
                <span className="font-medium text-red-500">
                  -${order.platformFee.toFixed(2)}{" "}
                  {/* ✅ FIX 6: কমিশন শতাংশ যোগ করা হলো */}
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
            {/* ✅ FIX 3: deliveryTime এখন order.serviceId থেকে আসছে */}
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
          {/* Service Image */}
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
          <Button
            className=""
            onClick={() => router.push("/client/dashboard/my-orders")}
          >
            Go to My Orders
          </Button>
        </div>
      </div>
    </div>
  );
}
