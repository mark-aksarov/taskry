"use client";

import { DialogTrigger } from "react-aria-components";
import { TaskFiltersModal } from "./TaskFiltersModal";
import { FilterButtonMobile } from "@/components/common/FilterButton";

interface TaskFiltersModalTriggerMobileProps {
  filtersFormContainer: React.ReactNode;
}

export function TaskFiltersModalTriggerMobile({
  filtersFormContainer,
}: TaskFiltersModalTriggerMobileProps) {
  return (
    <DialogTrigger>
      <FilterButtonMobile mode="multiple" />
      <TaskFiltersModal filtersFormContainer={filtersFormContainer} />
    </DialogTrigger>
  );
}
