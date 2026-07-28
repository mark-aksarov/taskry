import {
  AuthCard,
  AuthCardBody,
  AuthCardHeader,
  AuthCardHeading,
  AuthCardSubtitle,
} from "@/auth/AuthCard";
import { useTranslations } from "next-intl";
import { SignInForm } from "@/auth/SignInForm";
import { AuthCardSignUpFooter } from "@/auth/AuthCardSignUpFooter";

interface SignInPageProps {
  resetPasswordSuccess?: boolean;
}

export function SignInPage({ resetPasswordSuccess }: SignInPageProps) {
  const t = useTranslations("app.SignInPage");

  return (
    <AuthCard>
      <AuthCardHeader>
        <AuthCardHeading>{t("heading")}</AuthCardHeading>
        <AuthCardSubtitle>
          {resetPasswordSuccess ? t("resetPasswordSubtitle") : t("subtitle")}
        </AuthCardSubtitle>
      </AuthCardHeader>
      <AuthCardBody>
        <SignInForm />
      </AuthCardBody>
      <AuthCardSignUpFooter />
    </AuthCard>
  );
}
