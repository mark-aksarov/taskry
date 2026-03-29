"use client";

import { useTranslations } from "next-intl";
import { useModal } from "@/components/common/ModalManagerContext";
import { FilterButtonMobile } from "@/components/common/FilterButton";

export interface TaskCategoryFiltersModalTriggerProps {
  filtersFormContainer: React.ReactNode;
}

export function TaskCategoryFiltersModalTrigger() {
  const t = useTranslations("tasks.TaskCategoryFiltersModalTrigger");
  const { onOpenChange } = useModal("taskCategoryFilters");

  return (
    <FilterButtonMobile
      mode="single"
      label={t("buttonLabel")}
      onPress={() => onOpenChange(true)}
    />
  );
}
