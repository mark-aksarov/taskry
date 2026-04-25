import {
  AuthCard,
  AuthCardBody,
  AuthCardHeader,
  AuthCardHeading,
  AuthCardSubtitle,
} from "@/auth/AuthCard";
import { useTranslations } from "next-intl";
import { ResetPasswordMode } from "@/lib/types";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { ResetPasswordForm } from "@/auth/ResetPasswordForm";
import { AuthLangMenuTrigger } from "@/auth/AuthLangMenuTrigger";
import { AuthCardSignInFooter } from "@/auth/AuthCardSignInFooter";

interface ResetPasswordPageProps {
  mode: ResetPasswordMode;
  resetPassword: ActionFn<ActionState, FormData>;
}

export function ResetPasswordPage({
  mode,
  resetPassword,
}: ResetPasswordPageProps) {
  const t = useTranslations("app.ResetPasswordPage");

  return (
    <AuthCard>
      <AuthLangMenuTrigger />
      <AuthCardHeader>
        <AuthCardHeading>{t(`${mode}.heading` as never)}</AuthCardHeading>
        <AuthCardSubtitle>{t(`${mode}.subtitle` as never)}</AuthCardSubtitle>
      </AuthCardHeader>
      <AuthCardBody>
        <ResetPasswordForm mode={mode} resetPassword={resetPassword} />
      </AuthCardBody>
      <AuthCardSignInFooter />
    </AuthCard>
  );
}
