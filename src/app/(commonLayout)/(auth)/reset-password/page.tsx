
import { Suspense } from "react";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
export const dynamic = "force-dynamic";
const ResetPasswordPage = () => {

  return (
    <div>
    
      <Suspense fallback={<div>Loading form...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
};

export default ResetPasswordPage;
