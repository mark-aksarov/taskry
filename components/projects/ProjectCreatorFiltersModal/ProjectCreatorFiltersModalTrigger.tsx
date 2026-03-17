"use client";

import { useTranslations } from "next-intl";
import { DialogTrigger } from "react-aria-components";
import { FilterButtonMobile } from "@/components/common/FilterButton";
import { ProjectCreatorFiltersModal } from "./ProjectCreatorFiltersModal";

export interface ProjectCreatorFiltersModalTriggerProps {
  filtersFormContainer: React.ReactNode;
}

export function ProjectCreatorFiltersModalTrigger({
  filtersFormContainer,
}: ProjectCreatorFiltersModalTriggerProps) {
  const t = useTranslations("projects.ProjectCreatorFiltersModalTrigger");

  return (
    <DialogTrigger>
      <FilterButtonMobile mode="single" label={t("buttonLabel")} />
      <ProjectCreatorFiltersModal filtersFormContainer={filtersFormContainer} />
    </DialogTrigger>
  );
}
