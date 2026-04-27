"use client";

import { FilterButtonMobile } from "@/dashboard/common/FilterButton";
import { useModal } from "@/common/ModalManagerContext";
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
      className="order-1"
      onPress={() => onOpenChange(true)}
    />
  );
}
