"use client";

import { useUserFiltersModal } from "./UserFiltersModalContext";
import { FilterButtonMobile } from "@/components/common/FilterButton";

export function UserFiltersModalTriggerMobile() {
  const { onOpenChange } = useUserFiltersModal();

  return (
    <FilterButtonMobile mode="multiple" onPress={() => onOpenChange(true)} />
  );
}
