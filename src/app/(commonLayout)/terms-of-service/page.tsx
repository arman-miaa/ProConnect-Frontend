"use client";

export const dynamic = "force-dynamic";
const TermsOfServicePage = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-foreground">Terms of Service</h1>
      <p className="text-gray-700">
        By using our platform, you agree to comply with our rules and
        guidelines. Accounts must be used responsibly, and any misuse may result
        in account suspension or termination.
      </p>
      <p className="text-gray-700">
        Payment for services must be made as per the agreed terms. Refunds (if
        any) are handled according to our refund policy. We reserve the right to
        update these terms at any time.
      </p>
    </div>
  );
};

export default TermsOfServicePage;
