import {
  AuthCard,
  AuthCardBody,
  AuthCardHeader,
  AuthCardHeading,
  AuthCardSubtitle,
} from "@/components/auth/AuthCard";
import { useTranslations } from "next-intl";
import { SignInForm } from "@/components/auth/SignInForm";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { AuthLangMenuTrigger } from "@/components/auth/AuthLangMenuTrigger";
import { AuthCardSignUpFooter } from "@/components/auth/AuthCardSignUpFooter";

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
