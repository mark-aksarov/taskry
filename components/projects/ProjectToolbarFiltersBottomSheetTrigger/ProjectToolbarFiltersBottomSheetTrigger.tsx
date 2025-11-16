"use client";

import { ToolbarFiltersBottomSheetTrigger } from "@/components/common/Toolbar";

export function ProjectToolbarFiltersBottomSheetTrigger({
  filtersForm,
}: {
  filtersForm: React.ReactNode;
}) {
  return (
    <ToolbarFiltersBottomSheetTrigger
      title="Project Filters"
      filtersForm={filtersForm}
    />
  );
}
