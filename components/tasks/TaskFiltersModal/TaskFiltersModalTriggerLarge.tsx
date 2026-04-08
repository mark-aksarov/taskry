"use client";

import { FilterButtonLarge } from "@/components/common/FilterButton";
import { useModal } from "@/components/common/ModalManagerContext";

export function TaskFiltersModalTriggerLarge() {
  const { onOpenChange } = useModal("taskFilters");

  return (
    <FilterButtonLarge
      data-test="task-filters-modal-trigger-large"
      onPress={() => onOpenChange(true)}
    />
  );
}
