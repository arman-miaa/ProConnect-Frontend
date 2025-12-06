// app/admin/dashboard/transactions/page.tsx

import TransactionTable from "@/components/modules/payment/TransactionTable";
import { getAllTransactions } from "@/services/transaction/transaction.service";

export default async function AdminTransactionsPage() {
  const transactions = await getAllTransactions();

  // অ্যাডমিনের জন্য কলাম (সম্পূর্ণ ডেটা দেখানোর জন্য)
  const columns = [
    { header: "ID", accessorKey: "_id" },
    { header: "Type", accessorKey: "type" },
    { header: "Amount", accessorKey: "amount" },
    { header: "User (Seller)", accessorKey: "userId" }, // User ID দেখাতে পারে
    { header: "Order ID", accessorKey: "relatedOrder" },
    { header: "Status", accessorKey: "status" },
    { header: "Date", accessorKey: "createdAt" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">💸 All Platform Transactions</h2>
      <TransactionTable data={transactions} columns={columns} />
    </div>
  );
}
