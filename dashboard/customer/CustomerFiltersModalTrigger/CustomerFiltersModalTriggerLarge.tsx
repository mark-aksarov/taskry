"use client";

import { FilterButtonLarge } from "@/dashboard/common/FilterButton";
import { useModal } from "@/dashboard/common/ModalManagerContext";

export function CustomerFiltersModalTriggerLarge() {
  const { onOpenChange } = useModal("customerFilters");

  return (
    <FilterButtonLarge
      data-test="customer-filters-modal-trigger-large"
      onPress={() => onOpenChange(true)}
    />
  );
}
