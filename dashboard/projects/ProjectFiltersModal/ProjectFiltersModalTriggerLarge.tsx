"use client";

import { FilterButtonLarge } from "@/dashboard/common/FilterButton";
import { useModal } from "@/dashboard/common/ModalManagerContext";

export function ProjectFiltersModalTriggerLarge() {
  const { onOpenChange } = useModal("projectFilters");

  return (
    <FilterButtonLarge
      data-test="project-filters-modal-trigger-large"
      onPress={() => onOpenChange(true)}
    />
  );
}
