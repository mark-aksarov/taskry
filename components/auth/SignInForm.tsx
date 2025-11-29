"use client";

import { useState } from "react";
import { AuthCardForm } from "./AuthCard";
import { useTranslations } from "next-intl";
import { authClient } from "@/lib/auth-client";
import { Button, Checkbox, TextField } from "../ui";
import { BetterFetchError } from "better-auth/react";

export function SignInForm() {
  const t = useTranslations("auth.SignInForm");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<
    (BetterFetchError & Record<string, any>) | null
  >(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    authClient.signIn.email(
      {
        email,
        password,
        callbackURL: "/",
        rememberMe,
      },
      {
        onError: (ctx) => {
          setIsSubmitting(false);
          setError(ctx.error);
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
