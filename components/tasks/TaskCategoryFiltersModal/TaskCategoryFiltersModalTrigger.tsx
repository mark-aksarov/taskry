"use client";

import { useTranslations } from "next-intl";
import { useModal } from "@/components/common/ModalManagerContext";
import { FilterButtonMobile } from "@/components/common/FilterButton";
import { useTaskFilters } from "../TaskFiltersContext";

export interface TaskCategoryFiltersModalTriggerProps {
  filtersFormContainer: React.ReactNode;
}

export function TaskCategoryFiltersModalTrigger() {
  const t = useTranslations("tasks.TaskCategoryFiltersModalTrigger");
  const { onOpenChange } = useModal("taskCategoryFilters");
  const initialFilters = useTaskFilters();

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
