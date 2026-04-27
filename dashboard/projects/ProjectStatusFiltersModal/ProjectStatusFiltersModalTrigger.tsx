"use client";

import { useTranslations } from "next-intl";
import { useProjectFilters } from "../ProjectFiltersContext";
import { useModal } from "@/common/ModalManagerContext";
import { FilterButtonMobile } from "@/dashboard/common/FilterButton";

export function ProjectStatusFiltersModalTrigger() {
  const t = useTranslations(
    "dashboard.projects.ProjectStatusFiltersModalTrigger",
  );
  const { onOpenChange } = useModal("projectStatusFilters");
  const initialFilters = useProjectFilters();

  const selectedCount = initialFilters.statuses?.length ?? 0;

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
