"use client";

import {
  AuthCard,
  AuthCardBody,
  AuthCardHeader,
  AuthCardFooter,
  AuthCardHeading,
  AuthCardSubtitle,
} from "@/components/auth/AuthCard";
import { useTranslations } from "next-intl";
import { ForgetPasswordAction } from "@/lib/actions/types";
import { ForgetPasswordForm } from "@/components/auth/ForgetPasswordForm";
import { AuthCardFooterSignInItem } from "@/components/auth/AuthCardFooterSignInItem";

export function ForgetPasswordPage({
  action,
}: {
  action: ForgetPasswordAction;
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
      <AuthCardFooter>
        <AuthCardFooterSignInItem />
      </AuthCardFooter>
    </AuthCard>
  );
}
