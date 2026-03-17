"use client";

import { DialogTrigger } from "react-aria-components";
import { ProjectFiltersModal } from "./ProjectFiltersModal";
import { FilterButtonDesktop } from "@/components/common/FilterButton";

interface ProjectFiltersModalTriggerLargeProps {
  filtersFormContainer: React.ReactNode;
}

export function ProjectFiltersModalTriggerLarge({
  filtersFormContainer,
}: ProjectFiltersModalTriggerLargeProps) {
  return (
    <DialogTrigger>
      <FilterButtonDesktop />
      <ProjectFiltersModal filtersFormContainer={filtersFormContainer} />
    </DialogTrigger>
  );
}
