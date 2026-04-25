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
  mode?: "reset" | "invite";
  signIn: ActionFn<ActionState, FormData>;
}

export function SignInPage({ mode, signIn }: SignInPageProps) {
  const t = useTranslations("app.SignInPage");

  const subtitleMap = {
    reset: t("resetPasswordSubtitle"),
    invite: t("setPasswordSubtitle"),
    default: t("subtitle"),
  };

  return (
    <AuthCard>
      <AuthLangMenuTrigger />
      <AuthCardHeader>
        <AuthCardHeading>{t("heading")}</AuthCardHeading>
        <AuthCardSubtitle>{subtitleMap[mode || "default"]}</AuthCardSubtitle>
      </AuthCardHeader>
      <AuthCardBody>
        <SignInForm signIn={signIn} />
      </AuthCardBody>
      <AuthCardSignUpFooter />
    </AuthCard>
  );
}
