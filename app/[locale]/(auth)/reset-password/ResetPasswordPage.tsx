import {
  AuthCard,
  AuthCardBody,
  AuthCardHeader,
  AuthCardHeading,
  AuthCardSubtitle,
} from "@/components/auth/AuthCard";
import { useTranslations } from "next-intl";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import { AuthLangMenuTrigger } from "@/components/auth/AuthLangMenuTrigger";
import { AuthCardSignInFooter } from "@/components/auth/AuthCardSignInFooter";

interface ResetPasswordPageProps {
  resetPassword: ActionFn<ActionState, FormData>;
}

export function ResetPasswordPage({ resetPassword }: ResetPasswordPageProps) {
  const t = useTranslations("app.ResetPasswordPage");

  return (
    <AuthCard>
      <AuthLangMenuTrigger />
      <AuthCardHeader>
        <AuthCardHeading>{t("heading")}</AuthCardHeading>
        <AuthCardSubtitle>{t("subtitle")}</AuthCardSubtitle>
      </AuthCardHeader>
      <AuthCardBody>
        <ResetPasswordForm resetPassword={resetPassword} />
      </AuthCardBody>
      <AuthCardSignInFooter />
    </AuthCard>
  );
}
