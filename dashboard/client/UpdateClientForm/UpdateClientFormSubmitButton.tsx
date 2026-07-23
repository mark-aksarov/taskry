"use client";

import { useTranslations } from "next-intl";
import { useUpdateClient } from "../UpdateClientContext";
import { FormBaseSubmitButton } from "@/dashboard/common/FormBase";

export function UpdateClientFormSubmitButton() {
  const t = useTranslations("dashboard.clients.UpdateClientForm");

  const { isPending } = useUpdateClient();

  return (
    <FormBaseSubmitButton
      isPending={isPending}
      form="update-client-form"
      label={t("submitButtonLabel")}
    />
  );
}
