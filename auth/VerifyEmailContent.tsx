"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ErrorBanner } from "@/common/ErrorBanner";
import { AuthSignOutButton } from "./AuthSignOutButton";
import { SendVerificationEmailButton } from "./SendVerificationEmailButton";

export function VerifyEmailContent({ email }: { email: string }) {
  const t = useTranslations("auth.VerifyEmailContent");
  const [hasError, setHasError] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <SendVerificationEmailButton email={email} setHasError={setHasError} />
      {hasError && <ErrorBanner>{t("error")}</ErrorBanner>}
      <AuthSignOutButton />
    </div>
  );
}
