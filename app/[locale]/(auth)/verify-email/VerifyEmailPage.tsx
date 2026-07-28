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
}

export function VerifyEmailPage({ email }: VerifyEmailPageProps) {
  const t = useTranslations("app.VerifyEmailPage");

  return (
    <AuthCard data-test="verify-email-card">
      <AuthCardHeader>
        <AuthCardHeading>{t("heading")}</AuthCardHeading>
        <AuthCardSubtitle>{t("subtitle", { email })}</AuthCardSubtitle>
      </AuthCardHeader>
      <AuthCardBody className="gap-4">
        <SendVerificationEmailButton />
        <AuthSignOutButton />
      </AuthCardBody>
    </AuthCard>
  );
}
