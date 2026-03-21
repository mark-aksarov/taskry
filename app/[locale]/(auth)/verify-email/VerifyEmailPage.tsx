import {
  AuthCard,
  AuthCardBody,
  AuthCardHeader,
  AuthCardHeading,
  AuthCardSubtitle,
} from "@/components/auth/AuthCard";
import { useTranslations } from "next-intl";
import { VerifyEmailContent } from "@/components/auth/VerifyEmailContent";
import { AuthLangMenuTrigger } from "@/components/auth/AuthLangMenuTrigger";

interface VerifyEmailPageProps {
  email: string;
}

export function VerifyEmailPage({ email }: VerifyEmailPageProps) {
  const t = useTranslations("app.VerifyEmailPage");

  return (
    <AuthCard data-test="verify-email-card">
      <AuthLangMenuTrigger />
      <AuthCardHeader>
        <AuthCardHeading>{t("heading")}</AuthCardHeading>
        <AuthCardSubtitle>{t("subtitle", { email })}</AuthCardSubtitle>
      </AuthCardHeader>
      <AuthCardBody>
        <VerifyEmailContent email={email} />
      </AuthCardBody>
    </AuthCard>
  );
}
