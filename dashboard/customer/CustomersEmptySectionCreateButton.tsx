"use client";

import { useTranslations } from "next-intl";
import { useModal } from "../../common/ModalManagerContext";
import { FallbackSectionButton } from "@/common/FallbackSection";

export function CustomersEmptySectionCreateButton() {
  const t = useTranslations(
    "dashboard.customers.CustomersEmptySectionCreateButton",
  );

  const { onOpenChange: onCreateCustomerModalOpenChange } =
    useModal("createCustomer");

  return (
    <FallbackSectionButton
      data-test="customers-empty-section-create-button"
      onPress={() => onCreateCustomerModalOpenChange(true)}
    >
      {t("label")}
    </FallbackSectionButton>
  );
}
