"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AuthSignOutButton } from "./AuthSignOutButton";
import { SendVerificationEmailButton } from "./SendVerificationEmailButton";

export function VerifyEmailContent({ email }: { email: string }) {
  const t = useTranslations("auth.VerifyEmailContent");
  const [hasError, setHasError] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      {hasError && (
        <p className="text-sm text-red-600 dark:text-red-400">{t("error")}</p>
      )}
      <SendVerificationEmailButton email={email} setHasError={setHasError} />
      <AuthSignOutButton />
    </div>
  );
}
