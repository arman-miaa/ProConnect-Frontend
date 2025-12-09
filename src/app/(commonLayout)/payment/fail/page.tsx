import Link from "next/link";

export const dynamic = "force-dynamic";
const PaymentFailPage = () => {
  return (
    <div className="p-6 text-center ">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Payment Failed</h1>
      <p>There was a problem processing your payment.</p>
      <Link href="/services">
        <button className="mt-4 px-4 py-2 bg-primary cursor-pointer text-white rounded">
          Back to Services
        </button>
      </Link>
    </div>
  );
};

export default PaymentFailPage;
