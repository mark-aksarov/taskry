"use client";

import { FilterButtonLarge } from "@/dashboard/common/FilterButton";
import { useModal } from "@/common/ModalManagerContext";

export function UserFiltersModalTriggerLarge() {
  const { onOpenChange } = useModal("userFilters");

  return (
    <FilterButtonLarge
      data-test="user-filters-modal-trigger-large"
      onClick={() => onOpenChange(true)}
    />
  );
}
