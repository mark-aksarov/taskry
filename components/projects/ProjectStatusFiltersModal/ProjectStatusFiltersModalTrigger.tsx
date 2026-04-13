"use client";

import { useTranslations } from "next-intl";
import { useProjectFilters } from "../ProjectFiltersContext";
import { useModal } from "@/components/common/ModalManagerContext";
import { FilterButtonMobile } from "@/components/common/FilterButton";

export function ProjectStatusFiltersModalTrigger() {
  const t = useTranslations("projects.ProjectStatusFiltersModalTrigger");
  const { onOpenChange } = useModal("projectStatusFilters");
  const initialFilters = useProjectFilters();

  const selectedCount = initialFilters.statuses?.length ?? 0;

  return (
    <FilterButtonMobile
      mode="single"
      selectedCount={selectedCount}
      label={t("buttonLabel")}
      onPress={() => onOpenChange(true)}
    />
  );
}
