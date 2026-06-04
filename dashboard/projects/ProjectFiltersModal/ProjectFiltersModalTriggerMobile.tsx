"use client";

import { useModal } from "@/common/ModalManagerContext";
import { FilterButtonMobile } from "@/dashboard/common/FilterButton";
import { useSelectedProjectFiltersCount } from "./useSelectedProjectFiltersCount";

export function ProjectFiltersModalTriggerMobile() {
  const { onOpenChange } = useModal("projectFilters");
  const selectedCount = useSelectedProjectFiltersCount();

  return (
    <FilterButtonMobile
      mode="multiple"
      selectedCount={selectedCount}
      className="order-1"
      onPress={() => onOpenChange(true)}
    />
  );
}
