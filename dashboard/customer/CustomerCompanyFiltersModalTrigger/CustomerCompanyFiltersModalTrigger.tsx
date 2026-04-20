"use client";

import { useTranslations } from "next-intl";
import { FilterButtonMobile } from "@/dashboard/common/FilterButton";
import { useModal } from "@/dashboard/common/ModalManagerContext";
import { useCustomerFilters } from "../CustomerFiltersContext";

export function CustomerCompanyFiltersModalTrigger() {
  const t = useTranslations(
    "dashboard.customers.CustomerCompanyFiltersModalTrigger",
  );
  const { onOpenChange } = useModal("customerCompanyFilters");
  const initialFilters = useCustomerFilters();

  const selectedCount = initialFilters.companyIds?.length ?? 0;

  return (
    <FilterButtonMobile
      mode="single"
      selectedCount={selectedCount}
      className={selectedCount ? "order-2" : "order-3"}
      label={t("label")}
      onPress={() => onOpenChange(true)}
    />
  );
}
