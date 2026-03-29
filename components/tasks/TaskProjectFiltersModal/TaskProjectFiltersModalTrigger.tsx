"use client";

import { useTranslations } from "next-intl";
import { useModal } from "@/components/common/ModalManagerContext";
import { FilterButtonMobile } from "@/components/common/FilterButton";

export function TaskProjectFiltersModalTrigger() {
  const t = useTranslations("tasks.TaskProjectFiltersModalTrigger");
  const { onOpenChange } = useModal("taskProjectFilters");

  return (
    <FilterButtonMobile
      mode="single"
      label={t("buttonLabel")}
      onPress={() => onOpenChange(true)}
    />
  );
}
