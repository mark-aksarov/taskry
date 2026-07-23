"use client";

import { useTranslations } from "next-intl";
import { FormBaseSubmitButton } from "@/dashboard/common/FormBase";
import { useUpdateClientCompany } from "../UpdateClientCompanyContext";

export function UpdateClientCompanyFormSubmitButton() {
  const t = useTranslations("dashboard.clients.UpdateClientCompanyForm");

  const { isPending } = useUpdateClientCompany();

  return (
    <FormBaseSubmitButton
      isPending={isPending}
      form="update-client-company-form"
      label={t("submitButtonLabel")}
    />
  );
}
