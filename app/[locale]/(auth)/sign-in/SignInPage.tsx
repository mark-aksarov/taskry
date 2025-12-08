import {
  AuthCard,
  AuthCardBody,
  AuthCardHeader,
  AuthCardFooter,
  AuthCardHeading,
  AuthCardSubtitle,
} from "@/components/auth/AuthCard";
import { useTranslations } from "next-intl";
import { SignInAction } from "@/lib/actions/types";
import { SignInForm } from "@/components/auth/SignInForm";
import { AuthCardFooterSignUpItem } from "@/components/auth/AuthCardFooterSignUpItem";
import { AuthCardFooterForgotPasswordItem } from "@/components/auth/AuthCardFooterForgotPasswordItem";

interface SignInPageProps {
  resetPasswordSuccess?: boolean;
  action: SignInAction;
}

export function SignInPage({ resetPasswordSuccess, action }: SignInPageProps) {
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
        <SignInForm action={action} />
      </AuthCardBody>
      <AuthCardFooter>
        <AuthCardFooterSignUpItem />
        <AuthCardFooterForgotPasswordItem />
      </AuthCardFooter>
    </AuthCard>
  );
}
