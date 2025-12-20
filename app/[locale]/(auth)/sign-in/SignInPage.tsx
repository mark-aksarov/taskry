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
import { ActionFn, ActionState } from "@/lib/actions/types";
import { AuthCardFooterSignUpItem } from "@/components/auth/AuthCardFooterSignUpItem";
import { AuthCardFooterForgotPasswordItem } from "@/components/auth/AuthCardFooterForgotPasswordItem";

interface SignInPageProps {
  resetPasswordSuccess?: boolean;
  action: ActionFn<ActionState, FormData>;
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
