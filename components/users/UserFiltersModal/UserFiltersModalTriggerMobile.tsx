"use client";

import { useModal } from "@/components/common/ModalManagerContext";
import { FilterButtonMobile } from "@/components/common/FilterButton";

export function UserFiltersModalTriggerMobile() {
  const { onOpenChange } = useModal("userFilters");

  return (
    <FilterButtonMobile mode="multiple" onPress={() => onOpenChange(true)} />
  );
}
