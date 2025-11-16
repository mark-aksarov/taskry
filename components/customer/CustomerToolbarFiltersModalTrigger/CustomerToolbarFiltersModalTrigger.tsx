"use client";

import { ToolbarFiltersModalTrigger } from "@/components/common/Toolbar";

export function CustomerToolbarFiltersModalTrigger({
  filtersForm,
}: {
  filtersForm: React.ReactNode;
}) {
  return (
    <ToolbarFiltersModalTrigger
      title="Customer Filters"
      filtersForm={filtersForm}
    />
  );
}
