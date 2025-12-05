"use client";
import { OrderStatus } from "@/types/orderTypes";
import {
  Clock,
  DollarSign,
  Loader,
  Truck,
  CheckCircle,
  XCircle,
  Hourglass,
} from "lucide-react";


interface PaymentEscrowStatusProps {
  status: OrderStatus;
}

export default function PaymentEscrowStatus({
  status,
}: PaymentEscrowStatusProps) {
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
      <div className="shrink-0 mr-3 mt-1">{icon}</div>
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}
