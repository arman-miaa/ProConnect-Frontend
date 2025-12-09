import Link from "next/link";
export const dynamic = "force-dynamic";

const PaymentCancelPage = () => {
  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold text-yellow-600 mb-4">
        Payment Cancelled
      </h1>
      <p>Your payment was cancelled.</p>
      <Link href="/services">
        <button className="mt-4 px-4 py-2 bg-primary cursor-pointer text-white rounded">
          Back to Services
        </button>
      </Link>
    </div>
  );
};

export default PaymentCancelPage;
