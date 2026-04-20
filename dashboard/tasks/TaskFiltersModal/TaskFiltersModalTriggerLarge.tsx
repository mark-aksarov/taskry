"use client";

import { FilterButtonLarge } from "@/dashboard/common/FilterButton";
import { useModal } from "@/dashboard/common/ModalManagerContext";

export function TaskFiltersModalTriggerLarge() {
  const { onOpenChange } = useModal("taskFilters");

  return (
    <FilterButtonLarge
      data-test="task-filters-modal-trigger-large"
      onPress={() => onOpenChange(true)}
    />
  );
}
