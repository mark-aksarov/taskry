"use client";

import { ToolbarFiltersModalTrigger } from "@/components/common/Toolbar";

export function TaskToolbarFiltersModalTrigger({
  filtersForm,
}: {
  filtersForm: React.ReactNode;
}) {
  return (
    <ToolbarFiltersModalTrigger
      title="Task Filters"
      filtersForm={filtersForm}
    />
  );
}
