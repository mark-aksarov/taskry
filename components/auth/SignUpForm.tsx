"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import { AuthCardForm } from "./AuthCard";
import { useTranslations } from "next-intl";
import { authClient } from "@/lib/auth-client";
import { Button, Checkbox, TextField } from "../ui";

export function SignUpForm() {
  const t = useTranslations("auth.SignUpForm");

  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    authClient.signUp.email(
      {
        name,
        email,
        password,
      },
      {
        onSuccess: () => {
          router.push(`/verify-email?email=${email}`);
        },
        onError: (ctx) => {
          setIsSubmitting(false);
          setError(ctx.error.message || "Something went wrong.");
        },
      },
    );
  }

  return (
    <AuthCardForm onSubmit={handleSubmit}>
      <TextField
        label={t("email.label")}
        type="Email"
        placeholder={t("email.placeholder")}
        value={email}
        onChange={setEmail}
      />
      <TextField
        label={t("password.label")}
        type="password"
        placeholder={t("password.placeholder")}
        value={password}
        onChange={setPassword}
      />
      <TextField
        label={t("repeatPassword.label")}
        type="password"
        placeholder={t("repeatPassword.placeholder")}
        value={repeatPassword}
        onChange={setRepeatPassword}
      />
      <Checkbox
        className="font-normal"
        isSelected={rememberMe}
        onChange={setRememberMe}
      >
        {t("rememberMe")}
      </Checkbox>
      <Button
        size="medium"
        label={t("submit.label")}
        className="justify-center py-4"
      />
    </AuthCardForm>
  );
}
