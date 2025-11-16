"use client";

import { ToolbarFiltersBottomSheetTrigger } from "@/components/common/Toolbar";

export function TaskToolbarFiltersBottomSheetTrigger({
  filtersForm,
}: {
  filtersForm: React.ReactNode;
}) {
  return (
    <ToolbarFiltersBottomSheetTrigger
      title="Task Filters"
      filtersForm={filtersForm}
    />
  );
}
