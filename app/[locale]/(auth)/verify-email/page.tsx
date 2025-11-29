"use client";

import { use, useState } from "react";
import { VerifyEmailPage } from "./VerifyEmailPage";
import { authClient } from "@/lib/auth-client";

export default function AppVerifyEmailPage({
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

  return <VerifyEmailPage error={error || undefined} email={email} />;
}
