"use client";

import { ToolbarFiltersModalTrigger } from "@/components/common/Toolbar";
import { useTranslations } from "next-intl";

export function TaskToolbarFiltersModalTrigger({
  filtersForm,
}: {
  filtersForm: React.ReactNode;
}) {
  const t = useTranslations("tasks.TaskToolbarFiltersModalTrigger");

  return (
    <ToolbarFiltersModalTrigger
      title={t("title")}
      filtersForm={filtersForm}
      formId="task-filter-form"
    />
  );
}
