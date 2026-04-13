"use client";

import { useTranslations } from "next-intl";
import { useModal } from "@/components/common/ModalManagerContext";
import { FilterButtonMobile } from "@/components/common/FilterButton";
import { useProjectFilters } from "../ProjectFiltersContext";

export function ProjectCustomerFiltersModalTrigger() {
  const t = useTranslations("projects.ProjectCustomerFiltersModalTrigger");
  const { onOpenChange } = useModal("projectCustomerFilters");
  const initialFilters = useProjectFilters();

  const selectedCount = initialFilters.customerIds?.length ?? 0;

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
