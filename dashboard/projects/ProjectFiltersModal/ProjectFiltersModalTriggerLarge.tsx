"use client";

import { useModal } from "@/common/ModalManagerContext";
import { FilterButtonLarge } from "@/dashboard/common/FilterButton";
import { useSelectedProjectFiltersCount } from "./useSelectedProjectFiltersCount";

export function ProjectFiltersModalTriggerLarge() {
  const { onOpenChange } = useModal("projectFilters");
  const selectedCount = useSelectedProjectFiltersCount();

  return (
    <FilterButtonLarge
      data-test="project-filters-modal-trigger-large"
      selectedCount={selectedCount}
      onPress={() => onOpenChange(true)}
    />
  );
}
