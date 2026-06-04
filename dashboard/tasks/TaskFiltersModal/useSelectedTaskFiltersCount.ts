import { useTaskFilters } from "../TaskFiltersContext";

export function useSelectedTaskFiltersCount() {
  const initialFilters = useTaskFilters();

  const selectedCount =
    (initialFilters.statuses?.length ?? 0) +
    (initialFilters.categoryIds?.length ?? 0) +
    (initialFilters.projectIds?.length ?? 0) +
    (initialFilters.assigneeIds?.length ?? 0) +
    (initialFilters.onlyMyTasks ? 1 : 0) +
    (initialFilters.deadlineFrom ? 1 : 0) +
    (initialFilters.deadlineTo ? 1 : 0);

  return selectedCount;
}
