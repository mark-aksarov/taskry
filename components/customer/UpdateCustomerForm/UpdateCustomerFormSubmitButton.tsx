"use client";

import { useTranslations } from "next-intl";
import { useUpdateCustomer } from "../UpdateCustomerContext";
import { FormBaseSubmitButton } from "@/components/common/FormBase";

export function UpdateCustomerFormSubmitButton() {
  const t = useTranslations("customers.UpdateCustomerForm");

  const { isPending } = useUpdateCustomer();

  return (
    <FormBaseSubmitButton
      isPending={isPending}
      form="update-customer-form"
      label={t("submitButtonLabel")}
    />
  );
}
