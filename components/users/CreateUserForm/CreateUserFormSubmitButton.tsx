"use client";

import { useTranslations } from "next-intl";
import { useCreateUser } from "../CreateUserContext";
import { FormBaseSubmitButton } from "@/components/common/FormBase";

export function CreateUserFormSubmitButton() {
  const t = useTranslations("users.CreateUserForm");

  const { isPending } = useCreateUser();

  return (
    <FormBaseSubmitButton
      isPending={isPending}
      form="create-user-form"
      label={t("submitButtonLabel")}
    />
  );
}
