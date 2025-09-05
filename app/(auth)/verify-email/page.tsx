"use client";

import { use, useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ email: string }>;
}) {
  const { email } = use(searchParams);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sendVerificationEmail = () => {
    setIsSubmitting(true);
    setError(null);

    authClient.sendVerificationEmail(
      {
        email,
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          setIsSubmitting(false);
        },
        onError: (ctx) => {
          setIsSubmitting(false);
          setError(ctx.error.message || "Something went wrong.");
        },
      },
    );
  };

  return (
    <main className="mx-auto flex h-screen max-w-md flex-col items-center justify-center space-y-4 p-6 text-white">
      <h1 className="text-2xl font-bold text-black">Verify Email</h1>

      {error && <p className="text-red-500">{error}</p>}

      <p className="text-center text-sm text-black">
        We have sent a verification link to your {email}. Please check your
        inbox and click the link to continue.
      </p>
      <button
        onClick={() => sendVerificationEmail()}
        disabled={isSubmitting}
        className="w-full rounded-md bg-white px-4 py-2 font-medium text-black hover:bg-gray-200 disabled:cursor-default disabled:opacity-50"
      >
        {isSubmitting ? "Sending..." : "Send again"}
      </button>
    </main>
  );
}
