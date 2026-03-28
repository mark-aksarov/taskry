"use client";

import { useTranslations } from "next-intl";
import { FilterButtonMobile } from "@/components/common/FilterButton";
import { useModal } from "@/components/common/ModalManagerContext";

export function CustomerCompanyFiltersModalTrigger() {
  const t = useTranslations("customers.CustomerCompanyFiltersModalTrigger");
  const { onOpenChange } = useModal("customerCompanyFilters");

  return (
    <FilterButtonMobile
      mode="single"
      label={t("label")}
      onPress={() => onOpenChange(true)}
    />
  );
}
