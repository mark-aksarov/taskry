"use client";

import { useTranslations } from "next-intl";
import { useChangePassword } from "../ChangePasswordContext";
import { FormBaseSubmitButton } from "@/components/common/FormBase";

export function ChangePasswordFormSubmitButton() {
  const t = useTranslations("users.ChangePasswordForm");

  const { isPending } = useChangePassword();

  return (
    <FormBaseSubmitButton
      isPending={isPending}
      form="change-password-form"
      label={t("submitButtonLabel")}
    />
  );
}
