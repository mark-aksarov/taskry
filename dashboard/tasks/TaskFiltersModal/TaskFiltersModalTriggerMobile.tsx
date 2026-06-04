"use client";

import { useModal } from "@/common/ModalManagerContext";
import { FilterButtonMobile } from "@/dashboard/common/FilterButton";
import { useSelectedTaskFiltersCount } from "./useSelectedTaskFiltersCount";

export function TaskFiltersModalTriggerMobile() {
  const { onOpenChange } = useModal("taskFilters");
  const selectedCount = useSelectedTaskFiltersCount();

  return (
    <FilterButtonMobile
      mode="multiple"
      selectedCount={selectedCount}
      className="order-1"
      onPress={() => onOpenChange(true)}
    />
  );
}
