"use client";

import { useTranslations } from "next-intl";
import { FilterButtonMobile } from "@/dashboard/common/FilterButton";
import { useModal } from "@/common/ModalManagerContext";
import { useClientFilters } from "../ClientFiltersContext";

export function ClientCompanyFiltersModalTrigger() {
  const t = useTranslations(
    "dashboard.clients.ClientCompanyFiltersModalTrigger",
  );
  const { onOpenChange } = useModal("clientCompanyFilters");
  const initialFilters = useClientFilters();

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
