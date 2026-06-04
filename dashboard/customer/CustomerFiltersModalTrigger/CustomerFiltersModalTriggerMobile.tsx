"use client";

import { useModal } from "@/common/ModalManagerContext";
import { FilterButtonMobile } from "@/dashboard/common/FilterButton";
import { useSelectedCustomerFiltersCount } from "./useSelectedCustomerFiltersCount";

export function CustomerFiltersModalTriggerMobile() {
  const { onOpenChange } = useModal("customerFilters");
  const selectedCount = useSelectedCustomerFiltersCount();

  return (
    <FilterButtonMobile
      mode="multiple"
      className="order-1"
      selectedCount={selectedCount}
      onPress={() => onOpenChange(true)}
    />
  );
}
