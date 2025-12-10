"use client";


const CookiePolicyPage = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-foreground">Cookie Policy</h1>
      <p className="text-gray-700">
        Our website uses cookies to enhance user experience, track usage
        analytics, and secure authentication. We primarily use
        <span className="font-medium"> HttpOnly cookies </span> to store your
        authentication tokens.
      </p>
      <p className="text-gray-700">
        By continuing to use our platform, you consent to the use of cookies
        according to this policy. You can manage or disable cookies via your
        browser settings.
      </p>
    </div>
  );
};

export default CookiePolicyPage;
