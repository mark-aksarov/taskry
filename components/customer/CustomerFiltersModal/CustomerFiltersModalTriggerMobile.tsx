"use client";

import { DialogTrigger } from "react-aria-components";
import { CustomerFiltersModal } from "./CustomerFiltersModal";
import { FilterButtonMobile } from "@/components/common/FilterButton";

interface CustomerFiltersModalTriggerMobileProps {
  filtersFormContainer: React.ReactNode;
}

export function CustomerFiltersModalTriggerMobile({
  filtersFormContainer,
}: CustomerFiltersModalTriggerMobileProps) {
  return (
    <DialogTrigger>
      <FilterButtonMobile mode="multiple" />
      <CustomerFiltersModal filtersFormContainer={filtersFormContainer} />
    </DialogTrigger>
  );
}
