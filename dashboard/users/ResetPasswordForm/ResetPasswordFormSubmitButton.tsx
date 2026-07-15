"use client";

import { useTranslations } from "next-intl";
import { useResetPassword } from "../ResetPasswordContext";
import { FormBaseSubmitButton } from "@/dashboard/common/FormBase";

export function ResetPasswordFormSubmitButton() {
  const t = useTranslations("dashboard.users.ResetPasswordForm");

  const { isPending } = useResetPassword();

  return (
    <FormBaseSubmitButton
      isPending={isPending}
      form="reset-password-form"
      label={t("submitButtonLabel")}
    />
  );
}
