"use client";

import { useTranslations } from "next-intl";
import { FilterButtonMobile } from "@/components/common/FilterButton";
import { useProjectCustomerFiltersModal } from "./ProjectCustomerFiltersModalContext";

export function ProjectCustomerFiltersModalTrigger() {
  const t = useTranslations("projects.ProjectCustomerFiltersModalTrigger");
  const { onOpenChange } = useProjectCustomerFiltersModal();

  return (
    <FilterButtonMobile
      mode="single"
      label={t("buttonLabel")}
      onPress={() => onOpenChange(true)}
    />
  );
}
