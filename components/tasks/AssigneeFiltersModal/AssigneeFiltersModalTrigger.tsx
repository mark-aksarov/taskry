"use client";

import { useTranslations } from "next-intl";
import { FilterButtonMobile } from "@/components/common/FilterButton";
import { useModal } from "@/components/common/ModalManagerContext";
import { useTaskFilters } from "../TaskFiltersContext";

export function AssigneeFiltersModalTrigger() {
  const t = useTranslations("tasks.AssigneeFiltersModalTrigger");
  const { onOpenChange } = useModal("assigneeFilters");
  const initialFilters = useTaskFilters();

  const selectedCount = initialFilters.assigneeIds?.length ?? 0;

  return (
    <FilterButtonMobile
      mode="single"
      selectedCount={selectedCount}
      label={t("buttonLabel")}
      onPress={() => onOpenChange(true)}
    />
  );
}
