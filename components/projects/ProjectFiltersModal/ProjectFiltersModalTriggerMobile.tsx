"use client";

import { FilterButtonMobile } from "@/components/common/FilterButton";
import { useModal } from "@/components/common/ModalManagerContext";
import { useProjectFilters } from "../ProjectFiltersContext";

export function ProjectFiltersModalTriggerMobile() {
  const { onOpenChange } = useModal("projectFilters");
  const initialFilters = useProjectFilters();

  const selectedCount =
    (initialFilters.statuses?.length ?? 0) +
    (initialFilters.categoryIds?.length ?? 0) +
    (initialFilters.customerIds?.length ?? 0) +
    (initialFilters.creatorIds?.length ?? 0) +
    (initialFilters.noActiveTasks ? 1 : 0) +
    (initialFilters.deadlineFrom ? 1 : 0) +
    (initialFilters.deadlineTo ? 1 : 0);

  return (
    <FilterButtonMobile
      mode="multiple"
      selectedCount={selectedCount}
      onPress={() => onOpenChange(true)}
    />
  );
}
