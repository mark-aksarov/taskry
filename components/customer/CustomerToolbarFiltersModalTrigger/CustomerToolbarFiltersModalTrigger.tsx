"use client";

import { ToolbarFiltersModalTrigger } from "@/components/common/Toolbar";
import { useTranslations } from "next-intl";

export function CustomerToolbarFiltersModalTrigger({
  filtersForm,
}: {
  filtersForm: React.ReactNode;
}) {
  const t = useTranslations("customers.CustomerToolbarFiltersModalTrigger");

  return (
    <ToolbarFiltersModalTrigger
      title={t("title")}
      filtersForm={filtersForm}
      formId="customer-filter-form"
    />
  );
}
