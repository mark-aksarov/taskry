"use client";

import { useTranslations } from "next-intl";
import { FilterButtonMobile } from "@/components/common/FilterButton";
import { useModal } from "@/components/common/ModalManagerContext";

export function ProjectStatusFiltersModalTrigger() {
  const t = useTranslations("projects.ProjectStatusFiltersModalTrigger");
  const { onOpenChange } = useModal("projectStatusFilters");

  return (
    <FilterButtonMobile
      mode="single"
      label={t("buttonLabel")}
      onPress={() => onOpenChange(true)}
    />
  );
}
