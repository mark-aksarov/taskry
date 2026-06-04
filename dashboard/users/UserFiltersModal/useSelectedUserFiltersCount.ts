import { useUserFilters } from "../UserFiltersContext";

export function useSelectedUserFiltersCount() {
  const initialFilters = useUserFilters();

  const selectedCount =
    (initialFilters.positionIds?.length ?? 0) +
    (initialFilters.hasNoActiveTasks ? 1 : 0) +
    (initialFilters.hasActiveTasks ? 1 : 0) +
    (initialFilters.hasOverdueTasks ? 1 : 0);

  return selectedCount;
}
