"use client";

import { FilterButtonLarge } from "@/components/common/FilterButton";
import { useCustomerFiltersModal } from "../CustomerFiltersModal";

export function CustomerFiltersModalTriggerLarge() {
  const { onOpenChange } = useCustomerFiltersModal();

  return <FilterButtonLarge onPress={() => onOpenChange(true)} />;
}
