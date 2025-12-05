/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ShoppingCart, LogIn, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { createOrder, initiatePayment } from "@/services/order/order.service";

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
      if (!isLoggedIn) {
        toast.error("Please login to order");
        router.push(`/login?redirect=/services/${serviceId}`);
        return;
      }

      if (!isClient) {
        toast.error("Only clients can order this service");
        return;
      }

      // Server-side order creation
      const order = await createOrder({ serviceId });
      toast.success("Order created successfully");

      // Server-side payment initiation
      const paymentURL = await initiatePayment(order._id);
      window.location.href = paymentURL;
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const getButtonContent = () => {
    if (isLoading) return <>Processing...</>;
    if (!isLoggedIn)
      return (
        <>
          <LogIn /> Login to Order
        </>
      );
    if (!isClient)
      return (
        <>
          <AlertCircle /> Client Only
        </>
      );
    return (
      <>
        <ShoppingCart /> Order Now
      </>
    );
  };

  return (
    <Button
      onClick={handleOrder}
      disabled={isLoading || (isLoggedIn && !isClient)}
    >
      {getButtonContent()}
    </Button>
  );
}
