"use client";

import { useModal } from "@/components/common/ModalManagerContext";
import { FilterButtonMobile } from "@/components/common/FilterButton";

export function TaskFiltersModalTriggerMobile() {
  const { onOpenChange } = useModal("taskFilters");

  return (
    <FilterButtonMobile mode="multiple" onPress={() => onOpenChange(true)} />
  );
}
