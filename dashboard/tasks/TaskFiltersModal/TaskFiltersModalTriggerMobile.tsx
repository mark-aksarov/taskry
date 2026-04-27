"use client";

import { useTaskFilters } from "../TaskFiltersContext";
import { useModal } from "@/common/ModalManagerContext";
import { FilterButtonMobile } from "@/dashboard/common/FilterButton";

export function TaskFiltersModalTriggerMobile() {
  const { onOpenChange } = useModal("taskFilters");
  const initialFilters = useTaskFilters();

  const selectedCount =
    (initialFilters.statuses?.length ?? 0) +
    (initialFilters.categoryIds?.length ?? 0) +
    (initialFilters.projectIds?.length ?? 0) +
    (initialFilters.assigneeIds?.length ?? 0) +
    (initialFilters.onlyMyTasks ? 1 : 0) +
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
