// app/seller/dashboard/payment-history/page.tsx

import TransactionTable from "@/components/modules/payment/TransactionTable";
import { getSellerPaymentHistory } from "@/services/transaction/transaction.service";

export default async function SellerPaymentHistoryPage() {
  // 1. সমস্ত লেনদেনের ডেটা ফেচ করা
  const history = await getSellerPaymentHistory();

  // 2. সেলারের জন্য টেবিলের কলাম ডেটা সেট করুন
  const columns = [
    { header: "Date", accessorKey: "createdAt" },
    { header: "Type", accessorKey: "type" }, // EARNINGS, WITHDRAWAL, REFUND
    { header: "Amount", accessorKey: "amount" },
    { header: "Order ID", accessorKey: "relatedOrder" }, // বা referenceId
    { header: "Status", accessorKey: "status" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">
        🧾 Detailed Transaction History
      </h2>
      <TransactionTable data={history} columns={columns} />
    </div>
  );
}
