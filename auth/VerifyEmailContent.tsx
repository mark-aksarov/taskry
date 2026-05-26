"use client";

import { useTranslations } from "next-intl";
import { ActionState } from "@/lib/actions/types";
import { AuthSignOutButton } from "./AuthSignOutButton";
import { SendVerificationEmailButton } from "./SendVerificationEmailButton";

interface VerifyEmailContentProps {
  email: string;
  signOut: () => Promise<ActionState>;
  sendVerificationEmail: (email: string) => Promise<ActionState>;
}

export function VerifyEmailContent({
  email,
  signOut,
  sendVerificationEmail,
}: VerifyEmailContentProps) {
  const t = useTranslations("auth.VerifyEmailContent");

  return (
    <div className="flex flex-col gap-4">
      <SendVerificationEmailButton
        email={email}
        sendVerificationEmail={sendVerificationEmail}
      />
      <AuthSignOutButton signOut={signOut} />
    </div>
  );
}
