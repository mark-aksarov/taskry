"use client";

import { useTranslations } from "next-intl";
import { DialogTrigger } from "react-aria-components";
import { FilterButtonMobile } from "@/components/common/FilterButton";
import { ProjectCustomerFiltersModal } from "./ProjectCustomerFiltersModal";

export interface ProjectCustomerFiltersModalTriggerProps {
  filtersFormContainer: React.ReactNode;
}

export function ProjectCustomerFiltersModalTrigger({
  filtersFormContainer,
}: ProjectCustomerFiltersModalTriggerProps) {
  const t = useTranslations("projects.ProjectCustomerFiltersModalTrigger");

  return (
    <DialogTrigger>
      <FilterButtonMobile mode="single" label={t("buttonLabel")} />
      <ProjectCustomerFiltersModal
        filtersFormContainer={filtersFormContainer}
      />
    </DialogTrigger>
  );
}
