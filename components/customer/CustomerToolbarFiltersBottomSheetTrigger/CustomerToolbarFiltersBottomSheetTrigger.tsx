"use client";

import { ToolbarFiltersBottomSheetTrigger } from "@/components/common/Toolbar";

export function CustomerToolbarFiltersBottomSheetTrigger({
  filtersForm,
}: {
  filtersForm: React.ReactNode;
}) {
  return (
    <ToolbarFiltersBottomSheetTrigger
      title="Customer Filters"
      filtersForm={filtersForm}
    />
  );
}
