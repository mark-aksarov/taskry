import {
  AuthCard,
  AuthCardBody,
  AuthCardHeader,
  AuthCardHeading,
  AuthCardSubtitle,
} from "@/auth/AuthCard";
import { useTranslations } from "next-intl";
import { ResetPasswordForm } from "@/auth/ResetPasswordForm";
import { AuthCardSignInFooter } from "@/auth/AuthCardSignInFooter";

export function ResetPasswordPage() {
  const t = useTranslations("app.ResetPasswordPage");

  return (
    <AuthCard>
      <AuthCardHeader>
        <AuthCardHeading>{t("heading")}</AuthCardHeading>
        <AuthCardSubtitle>{t("subtitle")}</AuthCardSubtitle>
      </AuthCardHeader>
      <AuthCardBody>
        <ResetPasswordForm />
      </AuthCardBody>
      <AuthCardSignInFooter />
    </AuthCard>
  );
}
