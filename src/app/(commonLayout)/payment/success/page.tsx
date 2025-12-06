import PaymentSuccessPageClient from '@/components/modules/payment/PaymentSuccessPageClient'
import { Suspense } from 'react'
export const dynamic = "force-dynamic";

const PaymentSuccessPage = () => {
  return (
    <div>
      <Suspense fallback={<p>Loading Payment Page...</p>}>
        <PaymentSuccessPageClient />
      </Suspense>
    </div>
  );
}

export default PaymentSuccessPage