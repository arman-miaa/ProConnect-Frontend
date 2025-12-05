/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ShoppingCart, AlertCircle, LogIn } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface OrderButtonProps {
  serviceId: string;
  isLoggedIn?: boolean;
  userRole?: string;
}

export default function OrderButton({
  serviceId,
  isLoggedIn,
  userRole,
}: OrderButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const isClient = userRole === "CLIENT";

  const handleOrder = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      // 1️⃣ Check login
      if (!isLoggedIn) {
        toast.error("Please login to order");
        router.push(`/login?redirect=/services/${serviceId}`);
        return;
      }

      // 2️⃣ Check role
      if (!isClient) {
        toast.error("Only clients can order this service");
        return;
      }

      // 3️⃣ Create Order
      const orderRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/order`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ serviceId }),
        }
      );
      const orderData = await orderRes.json();

      if (!orderRes.ok || !orderData?.data?._id) {
        toast.error(orderData.message || "Order creation failed");
        return;
      }

      const orderId = orderData.data._id; // নিশ্চিতভাবে ধরল orderId
      toast.success("Order created successfully. Proceeding to payment...");

      // 4️⃣ Initiate Payment
      const paymentRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/payment/init-payment/${orderId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      const paymentData = await paymentRes.json();

      if (!paymentRes.ok || !paymentData?.data?.redirectGatewayURL) {
        toast.error(paymentData?.message || "Payment initiation failed");
        return;
      }

      // 5️⃣ Redirect to Payment Gateway
      window.location.href = paymentData.data.redirectGatewayURL;
    } catch (err: any) {
      console.error("Order/Payment error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getButtonContent = () => {
    if (isLoading)
      return (
        <>
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Processing...
        </>
      );

    if (!isLoggedIn)
      return (
        <>
          <LogIn className="w-5 h-5" />
          Login to Order
        </>
      );

    if (!isClient)
      return (
        <>
          <AlertCircle className="w-5 h-5" />
          Client Access Only
        </>
      );

    return (
      <>
        <ShoppingCart className="w-5 h-5" />
        Order Now
      </>
    );
  };

  return (
    <Button
      onClick={handleOrder}
      disabled={isLoading || (isLoggedIn && !isClient)}
      className={`w-full py-6 text-lg font-semibold rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl flex items-center justify-center gap-2 text-white disabled:opacity-60 disabled:cursor-not-allowed`}
    >
      {getButtonContent()}
    </Button>
  );
}
