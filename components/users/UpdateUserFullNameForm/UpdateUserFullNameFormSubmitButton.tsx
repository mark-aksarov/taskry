"use client";

import { useTranslations } from "next-intl";
import { FormBaseSubmitButton } from "@/components/common/FormBase";
import { useUpdateUserFullName } from "../UpdateUserFullNameContext";

export function UpdateUserFullNameFormSubmitButton() {
  const t = useTranslations("users.UpdateUserFullNameForm");

  const { isPending } = useUpdateUserFullName();

  return (
    <FormBaseSubmitButton
      isPending={isPending}
      form="update-user-full-name-form"
      label={t("submitButtonLabel")}
    />
  );
}
