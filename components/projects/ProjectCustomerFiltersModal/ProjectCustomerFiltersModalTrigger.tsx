"use client";

import { useTranslations } from "next-intl";
import { useModal } from "@/components/common/ModalManagerContext";
import { FilterButtonMobile } from "@/components/common/FilterButton";

export function ProjectCustomerFiltersModalTrigger() {
  const t = useTranslations("projects.ProjectCustomerFiltersModalTrigger");
  const { onOpenChange } = useModal("projectCustomerFilters");

  return (
    <FilterButtonMobile
      mode="single"
      label={t("buttonLabel")}
      onPress={() => onOpenChange(true)}
    />
  );
}
