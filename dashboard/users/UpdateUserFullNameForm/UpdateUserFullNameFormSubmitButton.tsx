"use client";

import { useTranslations } from "next-intl";
import { FormBaseSubmitButton } from "@/dashboard/common/FormBase";
import { useUpdateUserFullName } from "../UpdateUserFullNameContext";

export function UpdateUserFullNameFormSubmitButton() {
  const t = useTranslations("dashboard.users.UpdateUserFullNameForm");

  const { isPending } = useUpdateUserFullName();

  return (
    <FormBaseSubmitButton
      isPending={isPending}
      form="update-user-full-name-form"
      label={t("submitButtonLabel")}
    />
  );
}
