"use client";

import { useTranslations } from "next-intl";
import { FilterButtonMobile } from "@/dashboard/common/FilterButton";
import { useModal } from "@/common/ModalManagerContext";
import { useTaskFilters } from "../TaskFiltersContext";

export function AssigneeFiltersModalTrigger() {
  const t = useTranslations("dashboard.tasks.AssigneeFiltersModalTrigger");
  const { onOpenChange } = useModal("assigneeFilters");
  const initialFilters = useTaskFilters();

  const selectedCount = initialFilters.assigneeIds?.length ?? 0;

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
