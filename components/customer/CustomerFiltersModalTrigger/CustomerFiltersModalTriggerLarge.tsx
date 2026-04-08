"use client";

import { FilterButtonLarge } from "@/components/common/FilterButton";
import { useModal } from "@/components/common/ModalManagerContext";

export function CustomerFiltersModalTriggerLarge() {
  const { onOpenChange } = useModal("customerFilters");

  return (
    <FilterButtonLarge
      data-test="customer-filters-modal-trigger-large"
      onPress={() => onOpenChange(true)}
    />
  );
}
