"use client";

import { useTranslations } from "next-intl";
import { FormBaseSubmitButton } from "@/dashboard/common/FormBase";
import { useUpdateClientEmail } from "../UpdateClientEmailContext";

export function UpdateClientEmailFormSubmitButton() {
  const t = useTranslations("dashboard.clients.UpdateClientEmailForm");

  const { isPending } = useUpdateClientEmail();

  return (
    <FormBaseSubmitButton
      isPending={isPending}
      form="update-client-email-form"
      label={t("submitButtonLabel")}
    />
  );
}
