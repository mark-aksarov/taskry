"use client";

import {
  AuthCard,
  AuthCardBody,
  AuthCardHeader,
  AuthCardHeading,
  AuthCardSubtitle,
} from "@/auth/AuthCard";
import { useTranslations } from "next-intl";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { ForgetPasswordForm } from "@/auth/ForgetPasswordForm";
import { AuthCardSignInFooter } from "@/auth/AuthCardSignInFooter";

export function ForgetPasswordPage({
  action,
}: {
  action: ActionFn<ActionState, FormData>;
}) {
  const t = useTranslations("app.ForgetPasswordPage");

  return (
    <AuthCard>
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
