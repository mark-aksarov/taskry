import { ToolbarFiltersModalTrigger } from "@/components/common/Toolbar";

export function ProjectToolbarFiltersModalTrigger({
  filtersForm,
}: {
  filtersForm: React.ReactNode;
}) {
  return (
    <ToolbarFiltersModalTrigger
      title="Project Filters"
      filtersForm={filtersForm}
    />
  );
}
