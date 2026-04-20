"use client";

import { useTranslations } from "next-intl";
import { useUpdateCustomerBio } from "../UpdateCustomerBioContext";
import { FormBaseSubmitButton } from "@/dashboard/common/FormBase";

export function UpdateCustomerBioFormSubmitButton() {
  const t = useTranslations("dashboard.customers.UpdateCustomerBioForm");

  const { isPending } = useUpdateCustomerBio();

  return (
    <FormBaseSubmitButton
      isPending={isPending}
      form="update-customer-bio-form"
      label={t("submitButtonLabel")}
    />
  );
}
