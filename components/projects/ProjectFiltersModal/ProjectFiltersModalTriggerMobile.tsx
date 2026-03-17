"use client";

import { DialogTrigger } from "react-aria-components";
import { ProjectFiltersModal } from "./ProjectFiltersModal";
import { FilterButtonMobile } from "@/components/common/FilterButton";

interface ProjectFiltersModalTriggerMobileProps {
  filtersFormContainer: React.ReactNode;
}

export function ProjectFiltersModalTriggerMobile({
  filtersFormContainer,
}: ProjectFiltersModalTriggerMobileProps) {
  return (
    <DialogTrigger>
      <FilterButtonMobile mode="multiple" />
      <ProjectFiltersModal filtersFormContainer={filtersFormContainer} />
    </DialogTrigger>
  );
}
