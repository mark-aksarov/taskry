"use client";

import { useTranslations } from "next-intl";
import { FormBaseSubmitButton } from "@/dashboard/common/FormBase";
import { useUpdateCustomerCompany } from "../UpdateCustomerCompanyContext";

export function UpdateCustomerCompanyFormSubmitButton() {
  const t = useTranslations("dashboard.customers.UpdateCustomerCompanyForm");

  const { isPending } = useUpdateCustomerCompany();

  return (
    <FormBaseSubmitButton
      isPending={isPending}
      form="update-customer-company-form"
      label={t("submitButtonLabel")}
    />
  );
}
