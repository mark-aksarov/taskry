"use client";

import { useTranslations } from "next-intl";
import { useModal } from "@/components/common/ModalManagerContext";
import { FilterButtonMobile } from "@/components/common/FilterButton";

export function ProjectCategoryFiltersModalTrigger() {
  const t = useTranslations("projects.ProjectCategoryFiltersModalTrigger");
  const { onOpenChange } = useModal("projectCategoryFilters");

  return (
    <FilterButtonMobile
      mode="single"
      label={t("buttonLabel")}
      onPress={() => onOpenChange(true)}
    />
  );
}
