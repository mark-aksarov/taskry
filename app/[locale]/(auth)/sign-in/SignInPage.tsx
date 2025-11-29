import {
  AuthCard,
  AuthCardBody,
  AuthCardHeader,
  AuthCardFooter,
  AuthCardHeading,
  AuthCardSubtitle,
} from "@/components/auth/AuthCard";
import { useTranslations } from "next-intl";
import { SignInForm } from "@/components/auth/SignInForm";
import { AuthCardFooterSignUpItem } from "@/components/auth/AuthCardFooterSignUpItem";
import { AuthCardFooterForgotPasswordItem } from "@/components/auth/AuthCardFooterForgotPasswordItem";

export function SignInPage() {
  const t = useTranslations("app.SignInPage");

  return (
    <AuthCard>
      <AuthCardHeader>
        <AuthCardHeading>{t("heading")}</AuthCardHeading>
        <AuthCardSubtitle>{t("subtitle")}</AuthCardSubtitle>
      </AuthCardHeader>
      <AuthCardBody>
        <SignInForm />
      </AuthCardBody>
      <AuthCardFooter>
        <AuthCardFooterSignUpItem />
        <AuthCardFooterForgotPasswordItem />
      </AuthCardFooter>
    </AuthCard>
  );
}
