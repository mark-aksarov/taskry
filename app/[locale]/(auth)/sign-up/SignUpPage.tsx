import {
  AuthCard,
  AuthCardBody,
  AuthCardHeader,
  AuthCardFooter,
  AuthCardHeading,
  AuthCardSubtitle,
} from "@/components/auth/AuthCard";
import { useTranslations } from "next-intl";
import { SignUpForm } from "@/components/auth/SignUpForm";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { AuthCardFooterSignInItem } from "@/components/auth/AuthCardFooterSignInItem";
import { AuthCardFooterForgotPasswordItem } from "@/components/auth/AuthCardFooterForgotPasswordItem";

export function SignUpPage({
  action,
}: {
  action: ActionFn<ActionState, FormData>;
}) {
  const t = useTranslations("app.SignUpPage");

  return (
    <AuthCard>
      <AuthCardHeader>
        <AuthCardHeading>{t("heading")}</AuthCardHeading>
        <AuthCardSubtitle>{t("subtitle")}</AuthCardSubtitle>
      </AuthCardHeader>
      <AuthCardBody>
        <SignUpForm action={action} />
      </AuthCardBody>
      <AuthCardFooter>
        <AuthCardFooterSignInItem />
        <AuthCardFooterForgotPasswordItem />
      </AuthCardFooter>
    </AuthCard>
  );
}
