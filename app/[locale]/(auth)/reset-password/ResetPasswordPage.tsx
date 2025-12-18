import {
  AuthCard,
  AuthCardBody,
  AuthCardHeader,
  AuthCardFooter,
  AuthCardHeading,
  AuthCardSubtitle,
} from "@/components/auth/AuthCard";
import { useTranslations } from "next-intl";
import { ActionFn, ResetPasswordState } from "@/lib/actions/types";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import { AuthCardFooterSignInItem } from "@/components/auth/AuthCardFooterSignInItem";

interface ResetPasswordPageProps {
  action: ActionFn<ResetPasswordState>;
}

export function ResetPasswordPage({ action }: ResetPasswordPageProps) {
  const t = useTranslations("app.ResetPasswordPage");

  return (
    <AuthCard>
      <AuthCardHeader>
        <AuthCardHeading>{t("heading")}</AuthCardHeading>
        <AuthCardSubtitle>{t("subtitle")}</AuthCardSubtitle>
      </AuthCardHeader>
      <AuthCardBody>
        <ResetPasswordForm action={action} />
      </AuthCardBody>
      <AuthCardFooter>
        <AuthCardFooterSignInItem />
      </AuthCardFooter>
    </AuthCard>
  );
}
