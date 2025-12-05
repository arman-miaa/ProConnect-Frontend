import PaymentSuccessPageClient from '@/components/modules/payment/PaymentSuccessPageClient'
import  { Suspense } from 'react'

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