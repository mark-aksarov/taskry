"use client";

import { useTranslations } from "next-intl";
import { FormBaseSubmitButton } from "@/components/common/FormBase";
import { useUpdateCustomerPublicLink } from "../UpdateCustomerPublicLinkContext";

export function UpdateCustomerPublicLinkFormSubmitButton() {
  const t = useTranslations("customers.UpdateCustomerPublicLinkForm");

  const { isPending } = useUpdateCustomerPublicLink();

  return (
    <FormBaseSubmitButton
      isPending={isPending}
      form="update-customer-public-link-form"
      label={t("submitButtonLabel")}
    />
  );
}
