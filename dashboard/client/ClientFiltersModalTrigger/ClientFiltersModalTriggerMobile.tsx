"use client";

import { useModal } from "@/common/ModalManagerContext";
import { FilterButtonMobile } from "@/dashboard/common/FilterButton";
import { useSelectedClientFiltersCount } from "./useSelectedClientFiltersCount";

export function ClientFiltersModalTriggerMobile() {
  const { onOpenChange } = useModal("clientFilters");
  const selectedCount = useSelectedClientFiltersCount();

  return (
    <FilterButtonMobile
      mode="multiple"
      className="order-1"
      selectedCount={selectedCount}
      onPress={() => onOpenChange(true)}
    />
  );
}
