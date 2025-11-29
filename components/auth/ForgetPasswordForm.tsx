import { useState } from "react";
import { AuthCardForm } from "./AuthCard";
import { Button, TextField } from "../ui";
import { authClient } from "@/lib/auth-client";
import { useTranslations } from "next-intl";

export function ForgetPasswordForm() {
  const t = useTranslations("auth.ForgetPasswordForm");

  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    authClient.requestPasswordReset(
      {
        email,
        redirectTo: "/reset-password",
      },
      {
        onSuccess: () => {
          setIsSubmitting(false);
          setIsSubmitted(true);
        },
        onError: (ctx) => {
          setIsSubmitting(false);
          setError(ctx.error.message || "Something went wrong.");
        },
      },
    );
  };

  return (
    <AuthCardForm onSubmit={handleSubmit}>
      <TextField
        label={t("email.label")}
        type="Email"
        placeholder={t("email.placeholder")}
        value={email}
        onChange={setEmail}
      />
      <Button
        size="medium"
        label={t("submit.label")}
        className="justify-center py-4"
      />
    </AuthCardForm>
  );
}
