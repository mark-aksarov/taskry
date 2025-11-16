"use client";

import { ToolbarFiltersModalTrigger } from "@/components/common/Toolbar";

export function UserToolbarFiltersModalTrigger({
  filtersForm,
}: {
  filtersForm: React.ReactNode;
}) {
  return (
    <ToolbarFiltersModalTrigger
      title="User Filters"
      filtersForm={filtersForm}
    />
  );
}
