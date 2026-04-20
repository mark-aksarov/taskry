"use client";

import { useTranslations } from "next-intl";
import { useModal } from "@/dashboard/common/ModalManagerContext";
import { FilterButtonMobile } from "@/dashboard/common/FilterButton";
import { useTaskFilters } from "../TaskFiltersContext";

export interface TaskCategoryFiltersModalTriggerProps {
  filtersFormContainer: React.ReactNode;
}

export function TaskCategoryFiltersModalTrigger() {
  const t = useTranslations("dashboard.tasks.TaskCategoryFiltersModalTrigger");
  const { onOpenChange } = useModal("taskCategoryFilters");
  const initialFilters = useTaskFilters();

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
