import {
  AuthCard,
  AuthCardBody,
  AuthCardHeader,
  AuthCardHeading,
  AuthCardSubtitle,
} from "@/components/auth/AuthCard";
import { useTranslations } from "next-intl";
import { SignUpForm } from "@/components/auth/SignUpForm";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { AuthLangMenuTrigger } from "@/components/auth/AuthLangMenuTrigger";
import { AuthCardSignInFooter } from "@/components/auth/AuthCardSignInFooter";

export function SignUpPage({
  action,
}: {
  action: ActionFn<ActionState, FormData>;
}) {
  const t = useTranslations("app.SignUpPage");

  return (
    <AuthCard>
      <AuthLangMenuTrigger />
      <AuthCardHeader>
        <AuthCardHeading>{t("heading")}</AuthCardHeading>
        <AuthCardSubtitle>{t("subtitle")}</AuthCardSubtitle>
      </AuthCardHeader>
      <AuthCardBody>
        <SignUpForm action={action} />
      </AuthCardBody>
      <AuthCardSignInFooter />
    </AuthCard>
  );
}
