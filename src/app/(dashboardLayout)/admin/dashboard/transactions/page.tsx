import TransactionTable from "@/components/modules/payment/TransactionTable";
import { getAllTransactions } from "@/services/transaction/transaction.service";

export default async function AdminTransactionsPage() {
  let transactions = [];
  try {
    transactions = await getAllTransactions();
  } catch (err) {
    console.error("Failed to fetch transactions:", err);
    transactions = [];
  }

  // fallback
  if (!transactions || transactions.length === 0) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        💸 No transactions available.
      </div>
    );
  }

  const columns = [
    { header: "ID", accessorKey: "_id" },
    { header: "Type", accessorKey: "type" },
    { header: "Amount", accessorKey: "amount" },
    { header: "User (Seller)", accessorKey: "userId" },
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
