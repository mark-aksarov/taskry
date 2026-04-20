"use client";

import { useTranslations } from "next-intl";
import { useModal } from "@/dashboard/common/ModalManagerContext";
import { FilterButtonMobile } from "@/dashboard/common/FilterButton";
import { useTaskFilters } from "../TaskFiltersContext";

export function TaskProjectFiltersModalTrigger() {
  const t = useTranslations("dashboard.tasks.TaskProjectFiltersModalTrigger");
  const { onOpenChange } = useModal("taskProjectFilters");
  const initialFilters = useTaskFilters();

  const selectedCount = initialFilters.projectIds?.length ?? 0;

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
