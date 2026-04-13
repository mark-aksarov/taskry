"use client";

import { useModal } from "@/components/common/ModalManagerContext";
import { FilterButtonMobile } from "@/components/common/FilterButton";
import { useCustomerFilters } from "../CustomerFiltersContext";

export function CustomerFiltersModalTriggerMobile() {
  const { onOpenChange } = useModal("customerFilters");
  const initialFilters = useCustomerFilters();

  const selectedCount =
    (initialFilters.companyIds?.length ?? 0) +
    (initialFilters.hasNoActiveProjects ? 1 : 0) +
    (initialFilters.hasActiveProjects ? 1 : 0) +
    (initialFilters.hasOverdueProjects ? 1 : 0);

  return (
    <FilterButtonMobile
      mode="multiple"
      selectedCount={selectedCount}
      onPress={() => onOpenChange(true)}
    />
  );
}
