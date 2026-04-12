"use client";

import { useTranslations } from "next-intl";
import { FormBaseSubmitButton } from "@/components/common/FormBase";
import { useUpdateCustomerEmail } from "../UpdateCustomerEmailContext";

export function UpdateCustomerEmailFormSubmitButton() {
  const t = useTranslations("customers.UpdateCustomerEmailForm");

  const { isPending } = useUpdateCustomerEmail();

  return (
    <FormBaseSubmitButton
      isPending={isPending}
      form="update-customer-email-form"
      label={t("submitButtonLabel")}
    />
  );
}
