import {
  AuthCard,
  AuthCardBody,
  AuthCardHeader,
  AuthCardHeading,
  AuthCardSubtitle,
} from "@/auth/AuthCard";
import { useTranslations } from "next-intl";
import { ActionState } from "@/lib/actions/types";
import { AuthSignOutButton } from "@/auth/AuthSignOutButton";
import { SendVerificationEmailButton } from "@/auth/SendVerificationEmailButton";

interface VerifyEmailPageProps {
  email: string;
  signOut: () => Promise<ActionState>;
  sendVerificationEmail: (email: string) => Promise<ActionState>;
}

export function VerifyEmailPage({
  email,
  signOut,
  sendVerificationEmail,
}: VerifyEmailPageProps) {
  const t = useTranslations("app.VerifyEmailPage");

  return (
    <AuthCard data-test="verify-email-card">
      <AuthCardHeader>
        <AuthCardHeading>{t("heading")}</AuthCardHeading>
        <AuthCardSubtitle>{t("subtitle", { email })}</AuthCardSubtitle>
      </AuthCardHeader>
      <AuthCardBody className="gap-4">
        <SendVerificationEmailButton
          email={email}
          sendVerificationEmail={sendVerificationEmail}
        />
        <AuthSignOutButton signOut={signOut} />
      </AuthCardBody>
    </AuthCard>
  );
}
