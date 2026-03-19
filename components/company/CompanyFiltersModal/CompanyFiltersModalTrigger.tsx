"use client";

import { useTranslations } from "next-intl";
import { DialogTrigger } from "react-aria-components";
import { CompanyFiltersModal } from "./CompanyFiltersModal";
import { FilterButtonMobile } from "@/components/common/FilterButton";

export interface CompanyFiltersModalTriggerProps {
  filtersFormContainer: React.ReactNode;
}

export function CompanyFiltersModalTrigger({
  filtersFormContainer,
}: CompanyFiltersModalTriggerProps) {
  const t = useTranslations("company.CompanyFiltersModalTrigger");

  return (
    <DialogTrigger>
      <FilterButtonMobile mode="single" label={t("label")} />
      <CompanyFiltersModal filtersFormContainer={filtersFormContainer} />
    </DialogTrigger>
  );
}
