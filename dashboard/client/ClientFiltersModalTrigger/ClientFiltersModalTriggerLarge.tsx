"use client";

import { useModal } from "@/common/ModalManagerContext";
import { FilterButtonLarge } from "@/dashboard/common/FilterButton";
import { useSelectedClientFiltersCount } from "./useSelectedClientFiltersCount";

export function ClientFiltersModalTriggerLarge() {
  const { onOpenChange } = useModal("clientFilters");
  const selectedCount = useSelectedClientFiltersCount();

  return (
    <FilterButtonLarge
      data-test="client-filters-modal-trigger-large"
      selectedCount={selectedCount}
      onPress={() => onOpenChange(true)}
    />
  );
}
