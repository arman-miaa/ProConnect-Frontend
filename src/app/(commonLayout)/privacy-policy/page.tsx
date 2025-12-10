"use client";
export const dynamic = "force-dynamic";

const PrivacyPolicyPage = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-foreground">Privacy Policy</h1>
      <p className="text-gray-700">
        Your privacy is important to us. We collect only the necessary data
        required for account creation, authentication, and improving your
        experience. All sensitive information is securely stored. Our app uses
        <span className="font-medium"> HttpOnly cookies </span> to store
        authentication tokens for secure login sessions.
      </p>
      <p className="text-gray-700">
        We never sell or share your personal information with third parties
        except to provide the requested service or comply with legal
        obligations.
      </p>
    </div>
  );
};

export default PrivacyPolicyPage;
