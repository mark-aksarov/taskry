"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import { AuthCardForm } from "./AuthCard";
import { Button, TextField } from "../ui";
import { authClient } from "@/lib/auth-client";
import { useTranslations } from "next-intl";

export function ResetPasswordForm({ token }: { token: string }) {
  const t = useTranslations("auth.ResetPasswordForm");

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

  return (
    <AuthCardForm onSubmit={handleSubmit}>
      <TextField
        label={t("password.label")}
        type="password"
        placeholder={t("password.placeholder")}
        value={password}
        onChange={setPassword}
      />
      <Button
        size="medium"
        label={t("submit.label")}
        className="justify-center py-4"
      />
    </AuthCardForm>
  );
}
