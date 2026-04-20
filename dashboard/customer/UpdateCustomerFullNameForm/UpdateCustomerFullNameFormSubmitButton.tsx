"use client";

import { useTranslations } from "next-intl";
import { FormBaseSubmitButton } from "@/dashboard/common/FormBase";
import { useUpdateCustomerFullName } from "../UpdateCustomerFullNameContext";

export function UpdateCustomerFullNameFormSubmitButton() {
  const t = useTranslations("dashboard.customers.UpdateCustomerFullNameForm");

  const { isPending } = useUpdateCustomerFullName();

  return (
    <FormBaseSubmitButton
      isPending={isPending}
      form="update-customer-full-name-form"
      label={t("submitButtonLabel")}
    />
  );
}
