"use client";

import { useTranslations } from "next-intl";
import { useCreateCustomerModal } from "./CreateCustomerModal";
import { EmptySectionButton } from "@/components/common/EmptySection";

export function CustomersEmptySectionCreateButton() {
  const t = useTranslations("customers.CustomersEmptySectionCreateButton");

  const { onOpenChange: onCreateCustomerModalOpenChange } =
    useCreateCustomerModal();

  return (
    <EmptySectionButton onPress={() => onCreateCustomerModalOpenChange(true)}>
      {t("label")}
    </EmptySectionButton>
  );
}
