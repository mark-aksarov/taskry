"use client";

import { useTranslations } from "next-intl";
import { useModal } from "@/dashboard/common/ModalManagerContext";
import { FilterButtonMobile } from "@/dashboard/common/FilterButton";
import { useProjectFilters } from "../ProjectFiltersContext";

export function ProjectCategoryFiltersModalTrigger() {
  const t = useTranslations(
    "dashboard.projects.ProjectCategoryFiltersModalTrigger",
  );
  const { onOpenChange } = useModal("projectCategoryFilters");
  const initialFilters = useProjectFilters();

  const selectedCount = initialFilters.categoryIds?.length ?? 0;

  return (
    <FilterButtonMobile
      mode="single"
      selectedCount={selectedCount}
      className={selectedCount ? "order-2" : "order-3"}
      label={t("buttonLabel")}
      onPress={() => onOpenChange(true)}
    />
  );
}
