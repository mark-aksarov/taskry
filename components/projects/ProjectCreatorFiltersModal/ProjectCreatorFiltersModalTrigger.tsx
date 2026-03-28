"use client";

import { useTranslations } from "next-intl";
import { useModal } from "@/components/common/ModalManagerContext";
import { FilterButtonMobile } from "@/components/common/FilterButton";

export function ProjectCreatorFiltersModalTrigger() {
  const t = useTranslations("projects.ProjectCreatorFiltersModalTrigger");
  const { onOpenChange } = useModal("projectCreatorFilters");

  return (
    <FilterButtonMobile
      mode="single"
      label={t("buttonLabel")}
      onPress={() => onOpenChange(true)}
    />
  );
}
