"use client";

import { DialogTrigger } from "react-aria-components";
import { UserFiltersModal } from "./UserFiltersModal";
import { FilterButtonLarge } from "@/components/common/FilterButton";

interface UserFiltersModalTriggerLargeProps {
  filtersFormContainer: React.ReactNode;
}

export function UserFiltersModalTriggerLarge({
  filtersFormContainer,
}: UserFiltersModalTriggerLargeProps) {
  return (
    <DialogTrigger>
      <FilterButtonLarge />
      <UserFiltersModal filtersFormContainer={filtersFormContainer} />
    </DialogTrigger>
  );
}
