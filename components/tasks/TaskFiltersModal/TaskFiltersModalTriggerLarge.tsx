"use client";

import { DialogTrigger } from "react-aria-components";
import { TaskFiltersModal } from "./TaskFiltersModal";
import { FilterButtonDesktop } from "@/components/common/FilterButton";

interface TaskFiltersModalTriggerLargeProps {
  filtersFormContainer: React.ReactNode;
}

export function TaskFiltersModalTriggerLarge({
  filtersFormContainer,
}: TaskFiltersModalTriggerLargeProps) {
  return (
    <DialogTrigger>
      <FilterButtonDesktop />
      <TaskFiltersModal filtersFormContainer={filtersFormContainer} />
    </DialogTrigger>
  );
}
