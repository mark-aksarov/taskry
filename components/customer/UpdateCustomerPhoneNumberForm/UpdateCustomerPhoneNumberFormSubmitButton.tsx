"use client";

import { useTranslations } from "next-intl";
import { FormBaseSubmitButton } from "@/components/common/FormBase";
import { useUpdateCustomerPhoneNumber } from "../UpdateCustomerPhoneNumberContext";

export function UpdateCustomerPhoneNumberFormSubmitButton() {
  const t = useTranslations("customers.UpdateCustomerPhoneNumberForm");

  const { isPending } = useUpdateCustomerPhoneNumber();

  return (
    <FormBaseSubmitButton
      isPending={isPending}
      form="update-customer-phone-number-form"
      label={t("submitButtonLabel")}
    />
  );
}
