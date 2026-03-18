"use client";

import { DialogTrigger } from "react-aria-components";
import { UserFiltersModal } from "./UserFiltersModal";
import { FilterButtonMobile } from "@/components/common/FilterButton";

interface UserFiltersModalTriggerMobileProps {
  filtersFormContainer: React.ReactNode;
}

export function UserFiltersModalTriggerMobile({
  filtersFormContainer,
}: UserFiltersModalTriggerMobileProps) {
  return (
    <DialogTrigger>
      <FilterButtonMobile mode="multiple" />
      <UserFiltersModal filtersFormContainer={filtersFormContainer} />
    </DialogTrigger>
  );
}
