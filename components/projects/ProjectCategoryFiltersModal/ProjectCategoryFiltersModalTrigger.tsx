"use client";

import { useTranslations } from "next-intl";
import { DialogTrigger } from "react-aria-components";
import { ProjectCategoryFiltersModal } from "./ProjectCategoryFiltersModal";
import { FilterButtonMobile } from "@/components/common/FilterButton";

export interface ProjectCategoryFiltersModalTriggerProps {
  filtersFormContainer: React.ReactNode;
}

export function ProjectCategoryFiltersModalTrigger({
  filtersFormContainer,
}: ProjectCategoryFiltersModalTriggerProps) {
  const t = useTranslations("projects.ProjectCategoryFiltersModalTrigger");

  return (
    <DialogTrigger>
      <FilterButtonMobile mode="single" label={t("buttonLabel")} />
      <ProjectCategoryFiltersModal
        filtersFormContainer={filtersFormContainer}
      />
    </DialogTrigger>
  );
}
