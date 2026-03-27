"use client";

import { FilterButtonMobile } from "@/components/common/FilterButton";
import { useProjectFiltersModal } from "./ProjectFiltersModalContext";

export function ProjectFiltersModalTriggerMobile() {
  const { onOpenChange } = useProjectFiltersModal();

  return (
    <FilterButtonMobile mode="multiple" onPress={() => onOpenChange(true)} />
  );
}
