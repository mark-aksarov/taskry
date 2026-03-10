import {
  AuthCard,
  AuthCardBody,
  AuthCardHeader,
  AuthCardFooter,
  AuthCardHeading,
  AuthCardSubtitle,
} from "@/components/auth/AuthCard";
import { useTranslations } from "next-intl";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import { AuthCardFooterSignInItem } from "@/components/auth/AuthCardFooterSignInItem";

interface ResetPasswordPageProps {
  resetPassword: ActionFn<ActionState, FormData>;
}

export function ResetPasswordPage({ resetPassword }: ResetPasswordPageProps) {
  const t = useTranslations("app.ResetPasswordPage");

  return (
    <AuthCard>
      <AuthCardHeader>
        <AuthCardHeading>{t("heading")}</AuthCardHeading>
        <AuthCardSubtitle>{t("subtitle")}</AuthCardSubtitle>
      </AuthCardHeader>
      <AuthCardBody>
        <ResetPasswordForm resetPassword={resetPassword} />
      </AuthCardBody>
      <AuthCardFooter>
        <AuthCardFooterSignInItem />
      </AuthCardFooter>
    </AuthCard>
  );
}
