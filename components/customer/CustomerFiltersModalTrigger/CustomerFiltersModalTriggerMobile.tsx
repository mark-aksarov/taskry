"use client";

import { useCustomerFiltersModal } from "../CustomerFiltersModal";
import { FilterButtonMobile } from "@/components/common/FilterButton";

export function CustomerFiltersModalTriggerMobile() {
  const { onOpenChange } = useCustomerFiltersModal();

  return (
    <FilterButtonMobile mode="multiple" onPress={() => onOpenChange(true)} />
  );
}
