"use client";

import {
  AuthCard,
  AuthCardBody,
  AuthCardHeader,
  AuthCardHeading,
  AuthCardSubtitle,
} from "@/components/auth/AuthCard";
import { useTranslations } from "next-intl";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { ForgetPasswordForm } from "@/components/auth/ForgetPasswordForm";
import { AuthLangMenuTrigger } from "@/components/auth/AuthLangMenuTrigger";
import { AuthCardSignInFooter } from "@/components/auth/AuthCardSignInFooter";

export function ForgetPasswordPage({
  action,
}: {
  action: ActionFn<ActionState, FormData>;
}) {
  const t = useTranslations("app.ForgetPasswordPage");

  return (
    <AuthCard>
      <AuthLangMenuTrigger />
      <AuthCardHeader>
        <AuthCardHeading>{t("heading")}</AuthCardHeading>
        <AuthCardSubtitle>{t("subtitle")}</AuthCardSubtitle>
      </AuthCardHeader>
      <AuthCardBody>
        <ForgetPasswordForm action={action} />
      </AuthCardBody>
      <AuthCardSignInFooter />
    </AuthCard>
  );
}
