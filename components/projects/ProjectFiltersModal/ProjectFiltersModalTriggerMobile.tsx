"use client";

import { FilterButtonMobile } from "@/components/common/FilterButton";
import { useModal } from "@/components/common/ModalManagerContext";

export function ProjectFiltersModalTriggerMobile() {
  const { onOpenChange } = useModal("projectFilters");

  return (
    <FilterButtonMobile mode="multiple" onPress={() => onOpenChange(true)} />
  );
}
