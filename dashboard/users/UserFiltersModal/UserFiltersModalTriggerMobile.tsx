"use client";

import { useModal } from "@/common/ModalManagerContext";
import { FilterButtonMobile } from "@/dashboard/common/FilterButton";
import { useSelectedUserFiltersCount } from "./useSelectedUserFiltersCount";

export function UserFiltersModalTriggerMobile() {
  const { onOpenChange } = useModal("userFilters");
  const selectedCount = useSelectedUserFiltersCount();

  return (
    <FilterButtonMobile
      mode="multiple"
      selectedCount={selectedCount}
      className="order-1"
      onPress={() => onOpenChange(true)}
    />
  );
}
