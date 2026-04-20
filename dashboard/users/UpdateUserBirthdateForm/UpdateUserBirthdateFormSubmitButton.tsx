"use client";

import { useTranslations } from "next-intl";
import { FormBaseSubmitButton } from "@/dashboard/common/FormBase";
import { useUpdateUserBirthdate } from "../UpdateUserBirthdateContext";

export function UpdateUserBirthdateFormSubmitButton() {
  const t = useTranslations("dashboard.users.UpdateUserBirthdateForm");

  const { isPending } = useUpdateUserBirthdate();

  return (
    <FormBaseSubmitButton
      isPending={isPending}
      form="update-user-birthdate-form"
      label={t("submitButtonLabel")}
    />
  );
}
