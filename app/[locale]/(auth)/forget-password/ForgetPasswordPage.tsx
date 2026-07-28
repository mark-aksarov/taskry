"use client";

import {
  AuthCard,
  AuthCardBody,
  AuthCardHeader,
  AuthCardHeading,
  AuthCardSubtitle,
} from "@/auth/AuthCard";
import { useTranslations } from "next-intl";
import { ForgetPasswordForm } from "@/auth/ForgetPasswordForm";
import { AuthCardSignInFooter } from "@/auth/AuthCardSignInFooter";

export function ForgetPasswordPage() {
  const t = useTranslations("app.ForgetPasswordPage");

  return (
    <AuthCard>
      <AuthCardHeader>
        <AuthCardHeading>{t("heading")}</AuthCardHeading>
        <AuthCardSubtitle>{t("subtitle")}</AuthCardSubtitle>
      </AuthCardHeader>
      <AuthCardBody>
        <ForgetPasswordForm />
      </AuthCardBody>
      <AuthCardSignInFooter />
    </AuthCard>
  );
}
