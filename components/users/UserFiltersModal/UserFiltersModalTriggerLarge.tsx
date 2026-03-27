"use client";

import { FilterButtonLarge } from "@/components/common/FilterButton";
import { useUserFiltersModal } from "./UserFiltersModalContext";

export function UserFiltersModalTriggerLarge() {
  const { onOpenChange } = useUserFiltersModal();

  return <FilterButtonLarge onClick={() => onOpenChange(true)} />;
}
