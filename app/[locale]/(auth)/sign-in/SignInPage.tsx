import {
  AuthCard,
  AuthCardBody,
  AuthCardHeader,
  AuthCardHeading,
  AuthCardSubtitle,
} from "@/auth/AuthCard";
import { useTranslations } from "next-intl";
import { SignInForm } from "@/auth/SignInForm";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { AuthLangMenuTrigger } from "@/auth/AuthLangMenuTrigger";
import { AuthCardSignUpFooter } from "@/auth/AuthCardSignUpFooter";

interface SignInPageProps {
  resetPasswordSuccess?: boolean;
  signIn: ActionFn<ActionState, FormData>;
}

export function SignInPage({ resetPasswordSuccess, signIn }: SignInPageProps) {
  const t = useTranslations("app.SignInPage");

  return (
    <AuthCard>
      <AuthLangMenuTrigger />
      <AuthCardHeader>
        <AuthCardHeading>{t("heading")}</AuthCardHeading>
        <AuthCardSubtitle>
          {resetPasswordSuccess ? t("resetPasswordSubtitle") : t("subtitle")}
        </AuthCardSubtitle>
      </AuthCardHeader>
      <AuthCardBody>
        <SignInForm signIn={signIn} />
      </AuthCardBody>
      <AuthCardSignUpFooter />
    </AuthCard>
  );
}
