"use client";

import { ToolbarFiltersBottomSheetTrigger } from "@/components/common/Toolbar/ToolbarFiltersBottomSheetTrigger";

export function UserToolbarFiltersBottomSheetTrigger({
  filtersForm,
}: {
  filtersForm: React.ReactNode;
}) {
  return (
    <ToolbarFiltersBottomSheetTrigger
      title="User Filters"
      filtersForm={filtersForm}
    />
  );
}
