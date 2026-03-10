"use client";

import { useTranslations } from "next-intl";
import { useCreateCustomer } from "./CreateCustomerContext";
import { EmptySectionButton } from "@/components/common/EmptySection";

export function CustomersEmptySectionCreateButton() {
  const t = useTranslations("customers.CustomersEmptySectionCreateButton");

  const { onModalOpenChange } = useCreateCustomer();

  return (
    <EmptySectionButton onPress={() => onModalOpenChange(true)}>
      {t("label")}
    </EmptySectionButton>
  );
}
