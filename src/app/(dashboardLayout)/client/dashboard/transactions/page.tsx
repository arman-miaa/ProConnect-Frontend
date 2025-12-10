import TransactionTable from "@/components/modules/payment/TransactionTable";
import { getSellerPaymentHistory } from "@/services/transaction/transaction.service";

export default async function SellerPaymentHistoryPage() {
  let history = [];
  try {
    history = await getSellerPaymentHistory();
  } catch (err) {
    console.error("Failed to fetch payment history:", err);
    history = [];
  }

  // fallback
  if (!history || history.length === 0) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        💸 No payment history available  .
      </div>
    );
  }

  const columns = [
    { header: "Type", accessorKey: "type" },
    { header: "Net Amount", accessorKey: "amount" },
    { header: "Order ID", accessorKey: "relatedOrder" },
    { header: "Status", accessorKey: "status" },
    { header: "Date", accessorKey: "createdAt" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        💰 Payment History (Earnings & Withdrawals)
      </h2>
      <TransactionTable data={history} columns={columns} />
    </div>
  );
}
