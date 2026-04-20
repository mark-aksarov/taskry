"use client";

import { useTranslations } from "next-intl";
import { useChangePassword } from "../ChangePasswordContext";
import { FormBaseSubmitButton } from "@/dashboard/common/FormBase";

export function ChangePasswordFormSubmitButton() {
  const t = useTranslations("dashboard.users.ChangePasswordForm");

  const { isPending } = useChangePassword();

  return (
    <FormBaseSubmitButton
      isPending={isPending}
      form="change-password-form"
      label={t("submitButtonLabel")}
    />
  );
}
