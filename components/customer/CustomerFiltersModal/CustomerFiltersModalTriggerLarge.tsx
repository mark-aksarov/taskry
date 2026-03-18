"use client";

import { DialogTrigger } from "react-aria-components";
import { CustomerFiltersModal } from "./CustomerFiltersModal";
import { FilterButtonLarge } from "@/components/common/FilterButton";

interface CustomerFiltersModalTriggerLargeProps {
  filtersFormContainer: React.ReactNode;
}

export function CustomerFiltersModalTriggerLarge({
  filtersFormContainer,
}: CustomerFiltersModalTriggerLargeProps) {
  return (
    <DialogTrigger>
      <FilterButtonLarge />
      <CustomerFiltersModal filtersFormContainer={filtersFormContainer} />
    </DialogTrigger>
  );
}
