"use client";

import { FilterButtonLarge } from "@/components/common/FilterButton";
import { useModal } from "@/components/common/ModalManagerContext";

export function UserFiltersModalTriggerLarge() {
  const { onOpenChange } = useModal("userFilters");

  return (
    <FilterButtonLarge
      data-test="user-filters-modal-trigger-large"
      onClick={() => onOpenChange(true)}
    />
  );
}
