"use client";

import { useTranslations } from "next-intl";
import { useModal } from "@/components/common/ModalManagerContext";
import { FilterButtonMobile } from "@/components/common/FilterButton";
import { useProjectFilters } from "../ProjectFiltersContext";

export function ProjectCategoryFiltersModalTrigger() {
  const t = useTranslations("projects.ProjectCategoryFiltersModalTrigger");
  const { onOpenChange } = useModal("projectCategoryFilters");
  const initialFilters = useProjectFilters();

  const selectedCount = initialFilters.categoryIds?.length ?? 0;

  return (
    <FilterButtonMobile
      mode="single"
      selectedCount={selectedCount}
      label={t("buttonLabel")}
      onPress={() => onOpenChange(true)}
    />
  );
}
