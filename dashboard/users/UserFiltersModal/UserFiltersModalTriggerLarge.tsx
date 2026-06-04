"use client";

import { useModal } from "@/common/ModalManagerContext";
import { FilterButtonLarge } from "@/dashboard/common/FilterButton";
import { useSelectedUserFiltersCount } from "./useSelectedUserFiltersCount";

export function UserFiltersModalTriggerLarge() {
  const { onOpenChange } = useModal("userFilters");
  const selectedCount = useSelectedUserFiltersCount();

  return (
    <FilterButtonLarge
      data-test="user-filters-modal-trigger-large"
      selectedCount={selectedCount}
      onClick={() => onOpenChange(true)}
    />
  );
}
