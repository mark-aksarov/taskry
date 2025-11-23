"use client";

import { useState } from "react";
import { SignInPage } from "./SignInPage";
import { authClient } from "@/lib/auth-client";
import { SignInPageError } from "./SignInPageError";
import { BetterFetchError } from "better-auth/react";

export default function AppSignInPage() {
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

  const sendVerificationEmail = async () => {
    await authClient.sendVerificationEmail({
      email,
      callbackURL: "/",
    });
  };

  if (error) {
    return (
      <SignInPageError
        error={error}
        sendVerificationEmail={sendVerificationEmail}
      />
    );
  }

  return (
    <SignInPage
      email={email}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      rememberMe={rememberMe}
      setRememberMe={setRememberMe}
      isSubmitting={isSubmitting}
      setIsSubmitting={setIsSubmitting}
      handleSubmit={handleSubmit}
    />
  );
}
