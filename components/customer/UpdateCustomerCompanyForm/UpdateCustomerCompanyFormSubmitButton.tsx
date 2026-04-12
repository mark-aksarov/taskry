"use client";

import { useTranslations } from "next-intl";
import { FormBaseSubmitButton } from "@/components/common/FormBase";
import { useUpdateCustomerCompany } from "../UpdateCustomerCompanyContext";

export function UpdateCustomerCompanyFormSubmitButton() {
  const t = useTranslations("customers.UpdateCustomerCompanyForm");

  const { isPending } = useUpdateCustomerCompany();

  return (
    <FormBaseSubmitButton
      isPending={isPending}
      form="update-customer-company-form"
      label={t("submitButtonLabel")}
    />
  );
}
