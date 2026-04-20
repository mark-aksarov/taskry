"use client";

import { useTranslations } from "next-intl";
import { useModal } from "../common/ModalManagerContext";
import { EmptySectionButton } from "@/dashboard/common/EmptySection";

export function CustomersEmptySectionCreateButton() {
  const t = useTranslations(
    "dashboard.customers.CustomersEmptySectionCreateButton",
  );

  const { onOpenChange: onCreateCustomerModalOpenChange } =
    useModal("createCustomer");

  return (
    <EmptySectionButton
      data-test="customers-empty-section-create-button"
      onPress={() => onCreateCustomerModalOpenChange(true)}
    >
      {t("label")}
    </EmptySectionButton>
  );
}
