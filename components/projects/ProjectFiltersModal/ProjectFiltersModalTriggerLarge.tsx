"use client";

import { FilterButtonLarge } from "@/components/common/FilterButton";
import { useModal } from "@/components/common/ModalManagerContext";

export function ProjectFiltersModalTriggerLarge() {
  const { onOpenChange } = useModal("projectFilters");

  return <FilterButtonLarge onPress={() => onOpenChange(true)} />;
}
