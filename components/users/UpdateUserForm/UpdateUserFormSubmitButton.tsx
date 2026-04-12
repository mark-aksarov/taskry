"use client";

import { useTranslations } from "next-intl";
import { useUpdateUser } from "../UpdateUserContext";
import { FormBaseSubmitButton } from "@/components/common/FormBase";

export function UpdateUserFormSubmitButton() {
  const t = useTranslations("users.UpdateUserForm");

  const { isPending } = useUpdateUser();

  return (
    <FormBaseSubmitButton
      isPending={isPending}
      form="update-user-form"
      label={t("submitButtonLabel")}
    />
  );
}
