"use client";

import { useModal } from "@/dashboard/common/ModalManagerContext";
import { FilterButtonMobile } from "@/dashboard/common/FilterButton";
import { useUserFilters } from "../UserFiltersContext";

export function UserFiltersModalTriggerMobile() {
  const { onOpenChange } = useModal("userFilters");
  const initialFilters = useUserFilters();

  const selectedCount =
    (initialFilters.positionIds?.length ?? 0) +
    (initialFilters.hasNoActiveTasks ? 1 : 0) +
    (initialFilters.hasActiveTasks ? 1 : 0) +
    (initialFilters.hasOverdueTasks ? 1 : 0);

  return (
    <FilterButtonMobile
      mode="multiple"
      selectedCount={selectedCount}
      className="order-1"
      onPress={() => onOpenChange(true)}
    />
  );
}
