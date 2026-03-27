"use client";

import { useTranslations } from "next-intl";
import { FilterButtonMobile } from "@/components/common/FilterButton";
import { useProjectCategoryFiltersModal } from "./ProjectCategoryFiltersModalContext";

export function ProjectCategoryFiltersModalTrigger() {
  const t = useTranslations("projects.ProjectCategoryFiltersModalTrigger");
  const { onOpenChange } = useProjectCategoryFiltersModal();

  return (
    <FilterButtonMobile
      mode="single"
      label={t("buttonLabel")}
      onPress={() => onOpenChange(true)}
    />
  );
}
