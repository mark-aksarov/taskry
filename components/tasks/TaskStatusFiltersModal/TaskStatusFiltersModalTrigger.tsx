"use client";

import { useTranslations } from "next-intl";
import { useModal } from "@/components/common/ModalManagerContext";
import { FilterButtonMobile } from "@/components/common/FilterButton";
import { useTaskFilters } from "../TaskFiltersContext";

export function TaskStatusFiltersModalTrigger() {
  const t = useTranslations("tasks.TaskStatusFiltersModalTrigger");
  const { onOpenChange } = useModal("taskStatusFilters");
  const initialFilters = useTaskFilters();

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
