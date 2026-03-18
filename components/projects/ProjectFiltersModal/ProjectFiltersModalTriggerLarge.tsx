"use client";

import { DialogTrigger } from "react-aria-components";
import { ProjectFiltersModal } from "./ProjectFiltersModal";
import { FilterButtonLarge } from "@/components/common/FilterButton";

interface ProjectFiltersModalTriggerLargeProps {
  filtersFormContainer: React.ReactNode;
}

export function ProjectFiltersModalTriggerLarge({
  filtersFormContainer,
}: ProjectFiltersModalTriggerLargeProps) {
  return (
    <DialogTrigger>
      <FilterButtonLarge />
      <ProjectFiltersModal filtersFormContainer={filtersFormContainer} />
    </DialogTrigger>
  );
}
