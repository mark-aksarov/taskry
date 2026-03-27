"use client";

import { useTranslations } from "next-intl";
import { FilterButtonMobile } from "@/components/common/FilterButton";
import { useCustomerCompanyFiltersModal } from "../CustomerCompanyFiltersModal";

export function CustomerCompanyFiltersModalTrigger() {
  const t = useTranslations("customers.CustomerCompanyFiltersModalTrigger");
  const { onOpenChange } = useCustomerCompanyFiltersModal();

  return (
    <FilterButtonMobile
      mode="single"
      label={t("label")}
      onPress={() => onOpenChange(true)}
    />
  );
}
