"use client";

import { ToolbarFiltersModalTrigger } from "@/components/common/Toolbar";
import { useTranslations } from "next-intl";

export function UserToolbarFiltersModalTrigger({
  filtersForm,
}: {
  filtersForm: React.ReactNode;
}) {
  const t = useTranslations("users.UserToolbarFiltersModalTrigger");

  return (
    <ToolbarFiltersModalTrigger
      title={t("title")}
      filtersForm={filtersForm}
      formId="user-filter-form"
    />
  );
}
