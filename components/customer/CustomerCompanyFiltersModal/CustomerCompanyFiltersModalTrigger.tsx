"use client";

import { useTranslations } from "next-intl";
import { DialogTrigger } from "react-aria-components";
import { FilterButtonMobile } from "@/components/common/FilterButton";
import { CustomerCompanyFiltersModal } from "./CustomerCompanyFiltersModal";

export interface CustomerCompanyFiltersModalTriggerProps {
  filtersFormContainer: React.ReactNode;
}

export function CustomerCompanyFiltersModalTrigger({
  filtersFormContainer,
}: CustomerCompanyFiltersModalTriggerProps) {
  const t = useTranslations("customers.CustomerCompanyFiltersModalTrigger");

  return (
    <DialogTrigger>
      <FilterButtonMobile mode="single" label={t("label")} />
      <CustomerCompanyFiltersModal
        filtersFormContainer={filtersFormContainer}
      />
    </DialogTrigger>
  );
}
