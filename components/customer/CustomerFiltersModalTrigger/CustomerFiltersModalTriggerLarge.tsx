"use client";

import { FilterButtonLarge } from "@/components/common/FilterButton";
import { useModal } from "@/components/common/ModalManagerContext";

export function CustomerFiltersModalTriggerLarge() {
  const { onOpenChange } = useModal("customerFilters");

  return <FilterButtonLarge onPress={() => onOpenChange(true)} />;
}
