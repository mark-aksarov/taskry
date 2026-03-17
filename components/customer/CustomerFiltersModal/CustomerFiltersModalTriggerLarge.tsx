"use client";

import { DialogTrigger } from "react-aria-components";
import { CustomerFiltersModal } from "./CustomerFiltersModal";
import { FilterButtonDesktop } from "@/components/common/FilterButton";

interface CustomerFiltersModalTriggerLargeProps {
  filtersFormContainer: React.ReactNode;
}

export function CustomerFiltersModalTriggerLarge({
  filtersFormContainer,
}: CustomerFiltersModalTriggerLargeProps) {
  return (
    <DialogTrigger>
      <FilterButtonDesktop />
      <CustomerFiltersModal filtersFormContainer={filtersFormContainer} />
    </DialogTrigger>
  );
}
