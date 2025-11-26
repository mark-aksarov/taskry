"use client";

import { use } from "react";
import { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { authClient } from "@/lib/auth-client";
import { ResetPasswordPage } from "./ResetPasswordPage";

export default function AppResetPassword({
  searchParams,
}: {
  searchParams: Promise<{ token: string }>;
}) {
  const { token } = use(searchParams);

  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    authClient.resetPassword(
      {
        newPassword: password,
        token,
      },
      {
        onSuccess: () => {
          router.push("/sign-in");
        },
        onError: (ctx) => {
          setIsSubmitting(false);
          setError(ctx.error.message || "Something went wrong.");
        },
      },
    );

    router.push("/sign-in");
  }

  if (!token) {
    return (
      <div>
        <p>Invalid token</p>
      </div>
    );
  }

  return (
    <ResetPasswordPage
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
}
