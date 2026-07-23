"use client";

import { useTranslations } from "next-intl";
import { FormBaseSubmitButton } from "@/dashboard/common/FormBase";
import { useUpdateClientFullName } from "../UpdateClientFullNameContext";

export function UpdateClientFullNameFormSubmitButton() {
  const t = useTranslations("dashboard.clients.UpdateClientFullNameForm");

  const { isPending } = useUpdateClientFullName();

  return (
    <FormBaseSubmitButton
      isPending={isPending}
      form="update-client-full-name-form"
      label={t("submitButtonLabel")}
    />
  );
}
