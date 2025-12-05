// Order এবং Service সংক্রান্ত সমস্ত টাইপ এখানে রাখা হলো

export type OrderStatus =
  | "PENDING"
  | "ACCEPTED"
  | "IN_PROGRESS"
  | "DELIVERED"
  | "COMPLETED"
  | "CANCELLED"
  | "REFUNDED";

export interface ServiceDetails {
  title: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  deliveryTime: number;
}

export interface OrderData {
  _id: string;
  totalPrice: number;
  platformFee: number;
  netAmount: number;
  serviceId: ServiceDetails;
  sellerId: string;
  clientId: string;
  orderStatus: OrderStatus;
  isPaid: boolean;
}
