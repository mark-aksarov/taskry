import {
  AuthCard,
  AuthCardBody,
  AuthCardHeader,
  AuthCardHeading,
  AuthCardSubtitle,
} from "@/auth/AuthCard";
import { useTranslations } from "next-intl";
import { SignUpForm } from "@/auth/SignUpForm";
import { AuthCardSignInFooter } from "@/auth/AuthCardSignInFooter";

export function SignUpPage() {
  const t = useTranslations("app.SignUpPage");

  return (
    <AuthCard>
      <AuthCardHeader>
        <AuthCardHeading>{t("heading")}</AuthCardHeading>
        <AuthCardSubtitle>{t("subtitle")}</AuthCardSubtitle>
      </AuthCardHeader>
      <AuthCardBody>
        <SignUpForm />
      </AuthCardBody>
      <AuthCardSignInFooter />
    </AuthCard>
  );
}
