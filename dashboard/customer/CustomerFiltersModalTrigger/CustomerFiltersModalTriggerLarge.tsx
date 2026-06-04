"use client";

import { useModal } from "@/common/ModalManagerContext";
import { FilterButtonLarge } from "@/dashboard/common/FilterButton";
import { useSelectedCustomerFiltersCount } from "./useSelectedCustomerFiltersCount";

export function CustomerFiltersModalTriggerLarge() {
  const { onOpenChange } = useModal("customerFilters");
  const selectedCount = useSelectedCustomerFiltersCount();

  return (
    <FilterButtonLarge
      data-test="customer-filters-modal-trigger-large"
      selectedCount={selectedCount}
      onPress={() => onOpenChange(true)}
    />
  );
}
