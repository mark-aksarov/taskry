"use client";

import { useTranslations } from "next-intl";
import { useModal } from "@/components/common/ModalManagerContext";
import { FilterButtonMobile } from "@/components/common/FilterButton";
import { useTaskFilters } from "../TaskFiltersContext";

export function TaskProjectFiltersModalTrigger() {
  const t = useTranslations("tasks.TaskProjectFiltersModalTrigger");
  const { onOpenChange } = useModal("taskProjectFilters");
  const initialFilters = useTaskFilters();

  const selectedCount = initialFilters.projectIds?.length ?? 0;

  return (
    <FilterButtonMobile
      mode="single"
      selectedCount={selectedCount}
      label={t("buttonLabel")}
      onPress={() => onOpenChange(true)}
    />
  );
}
