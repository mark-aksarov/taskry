"use client";

import { FilterButtonLarge } from "@/components/common/FilterButton";
import { useProjectFiltersModal } from "./ProjectFiltersModalContext";

export function ProjectFiltersModalTriggerLarge() {
  const { onOpenChange } = useProjectFiltersModal();

  return <FilterButtonLarge onPress={() => onOpenChange(true)} />;
}
