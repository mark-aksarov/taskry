"use client";

import { useModal } from "@/components/common/ModalManagerContext";
import { FilterButtonMobile } from "@/components/common/FilterButton";

export function CustomerFiltersModalTriggerMobile() {
  const { onOpenChange } = useModal("customerFilters");

  return (
    <FilterButtonMobile mode="multiple" onPress={() => onOpenChange(true)} />
  );
}
