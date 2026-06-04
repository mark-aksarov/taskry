"use client";

import { useModal } from "@/common/ModalManagerContext";
import { FilterButtonLarge } from "@/dashboard/common/FilterButton";
import { useSelectedTaskFiltersCount } from "./useSelectedTaskFiltersCount";

export function TaskFiltersModalTriggerLarge() {
  const { onOpenChange } = useModal("taskFilters");
  const selectedCount = useSelectedTaskFiltersCount();

  return (
    <FilterButtonLarge
      data-test="task-filters-modal-trigger-large"
      selectedCount={selectedCount}
      onPress={() => onOpenChange(true)}
    />
  );
}
