"use client";

import { useTranslations } from "next-intl";
import { FormBaseSubmitButton } from "@/dashboard/common/FormBase";
import { useUpdateCustomerEmail } from "../UpdateCustomerEmailContext";

export function UpdateCustomerEmailFormSubmitButton() {
  const t = useTranslations("dashboard.customers.UpdateCustomerEmailForm");

  const { isPending } = useUpdateCustomerEmail();

  return (
    <FormBaseSubmitButton
      isPending={isPending}
      form="update-customer-email-form"
      label={t("submitButtonLabel")}
    />
  );
}
