"use client";

import { useTranslations } from "next-intl";
import { FilterButtonMobile } from "@/components/common/FilterButton";
import { useModal } from "@/components/common/ModalManagerContext";

export function AssigneeFiltersModalTrigger() {
  const t = useTranslations("tasks.AssigneeFiltersModalTrigger");
  const { onOpenChange } = useModal("assigneeFilters");

  return (
    <FilterButtonMobile
      mode="single"
      label={t("buttonLabel")}
      onPress={() => onOpenChange(true)}
    />
  );
}
