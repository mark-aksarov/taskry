"use client";

import { FilterButtonLarge } from "@/components/common/FilterButton";
import { useModal } from "@/components/common/ModalManagerContext";

export function ProjectFiltersModalTriggerLarge() {
  const { onOpenChange } = useModal("projectFilters");

  return (
    <FilterButtonLarge
      data-test="project-filters-modal-trigger-large"
      onPress={() => onOpenChange(true)}
    />
  );
}
